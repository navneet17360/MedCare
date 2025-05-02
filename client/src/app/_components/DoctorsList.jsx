"use client";
import React from "react";
import styles from "../../styles/doctorsList.module.css";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const doctors = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    image: "doctors/doc1.avif",
    yearsOfExperience: 15,
    hospital: "AIIMS, New Delhi",
  },
  {
    id: 2,
    name: "Dr. Aarya Sharma",
    specialty: "Pediatrician",
    image: "doctors/doc2.avif",
    yearsOfExperience: 10,
    hospital: "Fortis Healthcare, Mumbai",
  },
  {
    id: 3,
    name: "Dr. Sunil Gupta",
    specialty: "Orthopedic Surgeon",
    image: "doctors/doc3.avif",
    yearsOfExperience: 20,
    hospital: "Max Hospital, Delhi",
  },
  {
    id: 4,
    name: "Dr. Neha Verma",
    specialty: "Neurologist",
    image: "doctors/doc4.avif",
    yearsOfExperience: 12,
    hospital: "NIMHANS, Bangalore",
  },
  {
    id: 5,
    name: "Dr. Priya Mehta",
    specialty: "Dermatologist",
    image: "doctors/doc5.avif",
    yearsOfExperience: 8,
    hospital: "Apollo Hospital, Chennai",
  },
  {
    id: 6,
    name: "Dr. Neha Sharma",
    specialty: "ENT Specialist",
    image: "doctors/doc6.avif",
    yearsOfExperience: 14,
    hospital: "Manipal Hospital, Hyderabad",
  },
];

function DoctorsList() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

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

  return (
    <div className={styles.doctorsList}>
      <ToastContainer />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Trusted Doctors</h2>
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
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div className={styles.doctorCard}>
              <div className={styles.cardContent}>
                <div className={styles.imageContainer}>
                  <img
                    src={`/${doctor.image}`}
                    alt={doctor.name}
                    className={styles.doctorImage}
                  />
                </div>
                <h5>{doctor.name}</h5>
                <p>{doctor.specialty}</p>
                <p>{doctor.yearsOfExperience} years of experience</p>
                <p>{doctor.hospital}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#20b2aa",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    width: "50%",
                  }}
                >
                  Book now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DoctorsList;
