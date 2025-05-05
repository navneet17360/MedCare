"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import styles from "../../../../styles/specialtyDoctorsPage.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";

const specialties = [
  "Dental",
  "Cardiology",
  "Orthopedic",
  "Neurology",
  "Otology",
  "Physician",
  "Ophthalmology",
  "Dermatology",
];

function SpecialtyDoctorsPage() {
  const { isSignedIn } = useAuth();
  const { specialty } = useParams();
  const router = useRouter();
  const initialSpecialty = specialty || "cardiology";
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    initialSpecialty.toLowerCase()
  );
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/doctors/specialty/${selectedSpecialty}`
        );
        setDoctors(response.data); // Assuming the response is a list of doctors
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        toast.error("Failed to fetch doctor data.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  const handleSpecialtyClick = (specialty) => {
    const specialtyLower = specialty.toLowerCase();
    setSelectedSpecialty(specialtyLower);
    router.push(`/doctors/specialty/${specialtyLower}`);
  };

  // Capitalize the specialty for display
  const displaySpecialty =
    selectedSpecialty.charAt(0).toUpperCase() + selectedSpecialty.slice(1);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Specialties</h3>
        <ul className={styles.specialtyList}>
          {specialties.map((specialty, index) => (
            <li
              key={index}
              className={`${styles.specialtyItem} ${
                selectedSpecialty === specialty.toLowerCase()
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleSpecialtyClick(specialty)}
            >
              {specialty}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{`${displaySpecialty} Doctors`}</h2>
        {loading && <p>Loading doctors...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.doctorList}>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className={styles.doctorCard}>
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src={
                        doctor.image_url && doctor.image_url !== "Not-available"
                          ? doctor.image_url
                          : "/dummy.png"
                      }
                      alt={doctor.name}
                      className={styles.doctorImage}
                      onError={(e) => {
                        e.target.src = "/dummy.png"; // Fallback image
                      }}
                    />
                  </div>
                  <h5>{doctor.name}</h5>
                  <p>{doctor.specialty}</p>
                  <p>{doctor.years_experience} years of experience</p>
                  <p>{doctor.hospital_name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noDoctors}>
              No doctors found for this specialty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialtyDoctorsPage;
