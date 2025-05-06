"use client";

import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle route change events for loading state
  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.events?.on("routeChangeStart", handleRouteChangeStart);
    router.events?.on("routeChangeComplete", handleRouteChangeComplete);
    router.events?.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  // Function to select 6 doctors: 2 Dental, 2 Neurology, 2 Dermatology, sorted by experience
  const getSelectedDoctors = (doctorsList) => {
    // Sort by years_experience in descending order
    const sortByExperience = (a, b) => b.years_experience - a.years_experience;

    // Filter doctors by specialty
    const dentalDoctors = doctorsList
      .filter((doctor) => doctor.specialty.toLowerCase() === "dental")
      .sort(sortByExperience);
    const neurologyDoctors = doctorsList
      .filter((doctor) => doctor.specialty.toLowerCase() === "neurology")
      .sort(sortByExperience);
    const dermatologyDoctors = doctorsList
      .filter((doctor) => doctor.specialty.toLowerCase() === "dermatology")
      .sort(sortByExperience);

    const selected = [];

    // Add up to 2 Dental doctors (most experienced)
    selected.push(...dentalDoctors.slice(0, 2));

    // Add up to 2 Neurology doctors (most experienced)
    selected.push(...neurologyDoctors.slice(0, 2));

    // Add up to 2 Dermatology doctors (most experienced)
    selected.push(...dermatologyDoctors.slice(0, 2));

    // Ensure we return exactly 6 doctors (or fewer if not enough data)
    return selected.slice(0, 6);
  };

  // Get the selected doctors
  const displayDoctors = getSelectedDoctors(doctors);

  // Handle click on doctor name
  const handleDoctorClick = (doctorId) => {
    if (!isSignedIn) {
      toast.error("Please log in to view doctor details!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setIsLoading(true); // Trigger loading state
      router.push(`/our_doctors/${doctorId}`);
    }
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in first to view all doctors!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setIsLoading(true); // Trigger loading state
      router.push("/explore");
    }
  };

  if (loading) {
    return (
      <div className={styles.doctorsList}>
        <ToastContainer />
        <div className={styles.titleContainer}>
          {/* Loading Spinner Overlay for View All Button */}
          {isLoading && (
            <div className={styles.loadingOverlay} aria-busy="true" aria-label="Loading">
              <div className={styles.spinner}></div>
            </div>
          )}
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
    return (
      <div className={styles.doctorsList}>
        <ToastContainer />
        Error: {error}
      </div>
    );
  }

  return (
    <div className={styles.doctorsList}>
      <ToastContainer />
      <div className={styles.titleContainer}>
        {/* Loading Spinner Overlay for View All Button */}
        {isLoading && (
          <div className={styles.loadingOverlay} aria-busy="true" aria-label="Loading">
            <div className={styles.spinner}></div>
          </div>
        )}
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
        {displayDoctors.length === 0 ? (
          <SwiperSlide>
            <div className={styles.doctorCard}>
              <p>No doctors found.</p>
            </div>
          </SwiperSlide>
        ) : (
          displayDoctors.map((doctor) => (
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
                    <span
                      onClick={() => handleDoctorClick(doctor.id)}
                      className={styles.doctorName}
                      style={{ cursor: "pointer" }}
                    >
                      {doctor.name}
                    </span>
                  </h5>
                  <p className={styles.doctorSpeciality}>
                    {capitalizeFirstLetter(doctor.specialty)}
                  </p>
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