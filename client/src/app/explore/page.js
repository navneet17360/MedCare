"use client";
import React from "react";
import styles from "../../styles/doctorsList.module.css";

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
];

function Explore() {
  return (
    <div className={styles.doctorsList}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Trusted Doctors</h2>
      </div>
      <div className={styles.cardContainer}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className={styles.doctorCard}>
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
        ))}
      </div>
    </div>
  );
}

export default Explore;
