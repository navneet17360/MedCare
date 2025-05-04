"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/doctorsList.module.css";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function DoctorsList() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from API using axios
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("Fetching doctors from API...");
        const response = await axios.get("http://127.0.0.1:5000/api/doctors/", {
          timeout: 5000, // 5-second timeout
        });
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

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in first to view all doctors!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      router.push("/explore");
    }
  };

  if (loading) {
    return (
      <div className={styles.doctorsList}>
        <ToastContainer />
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Our Doctors</h2>
          <button className={styles.viewAllButton} disabled>
            View All
          </button>
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
          {/* Render 3 skeleton cards */}
          {[...Array(3)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonTextShort}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonButton}></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  if (error) {
    return <div className={styles.doctorsList}>Error: {error}</div>;
  }

  return (
    <div className={styles.doctorsList}>
      <ToastContainer />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Our Doctors</h2>
        <button className={styles.viewAllButton} onClick={handleViewAllClick}>
          View All
        </button>
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
        {doctors.length === 0 ? (
          <SwiperSlide>
            <div className={styles.doctorCard}>
              <p>No doctors found.</p>
            </div>
          </SwiperSlide>
        ) : (
          doctors.map((doctor) => (
            <SwiperSlide key={doctor.id} className="mb-4">
              <div className={styles.doctorCard}>
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
                  <h5>
                    <Link
                      href={`/our_doctors/${doctor.id}`}
                      className={styles.doctorName}
                    >
                      {doctor.name}
                    </Link>
                  </h5>
                  <p className={styles.doctorSpeciality}>{doctor.specialty}</p>
                  <p>{doctor.years_experience} years of experience</p>
                  <p>{doctor.hospital_name}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                ></div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default DoctorsList;
