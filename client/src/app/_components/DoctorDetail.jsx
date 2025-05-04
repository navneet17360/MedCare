"use client";
import styles from "../../styles/doctorDetail.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import BookAppointment from "./BookAppointment";

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:5000/api/doctors");
        const doctors = response.data;
        const foundDoctor = doctors.find((doc) => doc.id === parseInt(id));
        setDoctor(foundDoctor);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctor details.");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className={`container ${styles.profileContainer}`}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container ${styles.profileContainer}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className={`container ${styles.profileContainer}`}>
        <p>Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className={`container ${styles.profileContainer}`}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className={`card ${styles.profileCard}`}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 d-flex flex-column align-items-center">
                  <div className={styles.imageContainer}>
                    <img
                      src={
                        doctor.image_url && doctor.image_url !== "Not-available"
                          ? doctor.image_url
                          : "/doctors.jpg"
                      }
                      alt={doctor.name}
                      className={`img-fluid rounded-3 ${styles.doctorImage}`}
                      onError={(e) => {
                        e.target.src = "/doctors.jpg"; // Fallback image
                      }}
                    />
                  </div>
                  <div className={styles.buttonSection}>
                    <BookAppointment doctorId={doctor.id} />
                  </div>
                </div>
                <div className="col-md-8">
                  <h1 className={styles.doctorName}>{doctor.name}</h1>
                  <h4 className={styles.specialty}>{doctor.specialty}</h4>
                  <div className={styles.infoSection}>
                    <p className="card-text">
                      <img
                        src="/icons/hospital.svg"
                        alt="Hospital Icon"
                        className={styles.icon}
                      />
                      {doctor.hospital_name}
                    </p>
                    <p className="card-text">
                      <img
                        src="/icons/experience.svg"
                        className={styles.icon}
                        alt="Experience Icon"
                      />
                      {doctor.years_experience} years of experience
                    </p>
                    <p className="card-text">
                      <img
                        src="/icons/fees.svg"
                        alt="Charges Icon"
                        className={styles.icon}
                      />
                      Consultation Fee: ₹{doctor.charges}
                    </p>
                    <div className={`card-text ${styles.aboutBox}`}>
                      {doctor.description}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.infoCard}>
                        <h5>
                          <img
                            src="/icons/clock.svg"
                            alt="Schedule Icon"
                            className={styles.icon}
                          />
                          Availability
                        </h5>
                        <ul className={styles.scheduleList}>
                          <li>{doctor.availability}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.infoCard}>
                        <h5>
                          <img
                            src="/icons/address.svg"
                            alt="Schedule Icon"
                            className={styles.icon}
                          />
                          Address
                        </h5>
                        <ul className={styles.scheduleList}>
                          <li>{doctor.address}</li>
                        </ul>
                        <h5>
                          <img
                            src="/icons/contact.svg"
                            alt="Schedule Icon"
                            className={styles.icon}
                          />
                          Contact
                        </h5>
                        <ul className={styles.scheduleList}>
                          <li>{doctor.contact}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;