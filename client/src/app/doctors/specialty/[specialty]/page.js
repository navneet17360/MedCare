"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../../styles/specialtyDoctorsPage.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";

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
    specialty: "Orthopedic",
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

const specialties = [
  "Dentist",
  "Cardiologist",
  "Orthopedic",
  "Neurologist",
  "Otology",
  "Physician",
  "Ophthalmologist",
];

function SpecialtyDoctorsPage() {
  const { isSignedIn } = useAuth();
  const { specialty } = useParams();
  const router = useRouter();
  const initialSpecialty = specialty || "cardiologist";
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    initialSpecialty.toLowerCase()
  );

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
  );

  const handleSpecialtyClick = (specialty) => {
    const specialtyLower = specialty.toLowerCase();
    setSelectedSpecialty(specialtyLower);
    router.push(`/doctors/specialty/${specialtyLower}`);
  };

  const handleBookClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      toast.error("Please log in first to book an appointment!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Replace with actual booking logic or navigation
      toast.success("Proceeding to book appointment!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
        <div className={styles.doctorList}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
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
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.bookButton}
                    onClick={handleBookClick}
                  >
                    Book now
                  </button>
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