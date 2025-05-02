"use client";
import React from "react";
import Link from "next/link";
import styles from "../../styles/doctorsList.module.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    image: "doctors/doc1.avif",
    yearsOfExperience: 15,
    hospital: "AIIMS, New Delhi",
    about: "Dr. Ramesh Kumar is a leading cardiologist with expertise in interventional cardiology and heart failure management. He is committed to advancing cardiac care through research and patient-centered treatment."
  },
  {
    id: 2,
    name: "Dr. Aarya Sharma",
    specialty: "Pediatrician",
    image: "doctors/doc2.avif",
    yearsOfExperience: 10,
    hospital: "Fortis Healthcare, Mumbai",
    about: "Dr. Aarya Sharma specializes in pediatric care, focusing on preventive medicine and developmental disorders. She is known for her compassionate approach and dedication to children's health."
  },
  {
    id: 3,
    name: "Dr. Sunil Gupta",
    specialty: "Orthopedic Surgeon",
    image: "doctors/doc3.avif",
    yearsOfExperience: 20,
    hospital: "Max Hospital, Delhi",
    about: "Dr. Sunil Gupta is an expert in orthopedic surgery, with a focus on joint replacement and sports injuries. He has performed over 5,000 successful surgeries in his career."
  },
  {
    id: 4,
    name: "Dr. Neha Verma",
    specialty: "Neurologist",
    image: "doctors/doc4.avif",
    yearsOfExperience: 12,
    hospital: "NIMHANS, Bangalore",
    about: "Dr. Neha Verma is a neurologist specializing in epilepsy and neurodegenerative disorders. She is actively involved in clinical research and patient advocacy."
  },
];

function DoctorsList() {
  return (
    <div className={styles.doctorsList}>
      <h2 className={styles.title}>Our Doctors</h2>
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
              <h5>
                <Link href={`/doctors/${doctor.id}`} className={styles.doctorName}>
                  {doctor.name}
                </Link>
              </h5>
              <p className={styles.doctorSpeciality}>{doctor.specialty}</p>
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

export default DoctorsList;