"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/doctorsList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Explore() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Fetch doctors from API using axios
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("Fetching doctors from API...");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/doctors`,
          {
            timeout: 5000, // 5-second timeout
          }
        );
        console.log("API response:", response.data);
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load doctors. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchDoctors();
  }, []);

  // Handle click on doctor name
  const handleDoctorClick = (doctorId) => {
    if (!isSignedIn) {
      toast.error("Please log in to view doctor details!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      router.push(`/our_doctors/${doctorId}`);
    }
  };

  // Group doctors by specialty
  const groupBySpecialty = (doctors) => {
    return doctors.reduce((acc, doctor) => {
      const specialty = doctor.specialty || "Other";
      if (!acc[specialty]) {
        acc[specialty] = [];
      }
      acc[specialty].push(doctor);
      return acc;
    }, {});
  };

  const groupedDoctors = groupBySpecialty(doctors);

  if (loading) {
    return (
      <div className={styles.doctorsList}>
        <ToastContainer />
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Loading Doctors...</h2>
        </div>
        <div className={styles.cardContainer}>
          {[...Array(3)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonTextShort}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.doctorsList}>
        <ToastContainer />
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.doctorsList}>
      <ToastContainer />
      {Object.keys(groupedDoctors).length === 0 ? (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>No Doctors Available</h2>
        </div>
      ) : (
        Object.keys(groupedDoctors).map((specialty) => (
          <div key={specialty} className={styles.specialtySection}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                {capitalizeFirstLetter(specialty)}
              </h2>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {groupedDoctors[specialty].map((doctor) => (
                <SwiperSlide key={doctor.id} className="mb-4 ms-1">
                  <div className={`${styles.doctorCard} docCard`}>
                    <div className={styles.cardContent}>
                      <div className={styles.imageContainer}>
                        <img
                          src={
                            doctor.image_url &&
                            doctor.image_url !== "Not-available"
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
                      <h5>
                        <span
                          onClick={() => handleDoctorClick(doctor.id)}
                          className={styles.doctorName}
                          style={{ cursor: "pointer" }}
                        >
                          {doctor.name}
                        </span>
                      </h5>
                      <p>{capitalizeFirstLetter(doctor.specialty)}</p>
                      <p>{doctor.years_experience} years of experience</p>
                      <p>{doctor.hospital_name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))
      )}
    </div>
  );
}

export default Explore;
