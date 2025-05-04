"use client";
import React, { useState } from "react";
import styles from "../../styles/userAppointments.module.css";

// Sample data for appointments
const appointments = [
  {
    id: 1,
    doctorName: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    image: "doctors/doc1.avif",
    hospital: "AIIMS, New Delhi",
    phone: "+91 123 456 7890",
    status: "Booked",
  },
  {
    id: 2,
    doctorName: "Dr. Aarya Sharma",
    specialty: "Pediatrician",
    image: "doctors/doc2.avif",
    hospital: "Fortis Healthcare, Mumbai",
    phone: "+91 987 654 3210",
    status: "Booked",
  },
  {
    id: 3,
    doctorName: "Dr. Sunil Gupta",
    specialty: "Orthopedic Surgeon",
    image: "doctors/doc3.avif",
    hospital: "Max Hospital, Delhi",
    phone: "+91 112 233 4455",
    status: "Cancelled",
  },
];

function UserAppointments() {
  const [appointmentsList, setAppointmentsList] = useState(appointments);

  const cancelAppointment = (id) => {
    setAppointmentsList(
      appointmentsList.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  return (
    <div className={styles.appointmentsList}>
      <h2 className={styles.title}>Your Appointments</h2>
      <div className={styles.cardContainer}>
        {appointmentsList.map((appointment) => (
          <div key={appointment.id} className={styles.appointmentCard}>
            <div className={styles.imageContainer}>
              <img
                src={`/${appointment.image}`}
                alt={appointment.doctorName}
                className={styles.doctorImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h5>{appointment.doctorName}</h5>
              <div className={styles.infoContainer}>
                <p>{appointment.specialty}</p>
                <p>{appointment.hospital}</p>
                <p>{appointment.phone}</p>
                <p>Status: {appointment.status}</p>
              </div>
            </div>
            {appointment.status === "Booked" && (
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className={styles.cancelButton}
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAppointments;
