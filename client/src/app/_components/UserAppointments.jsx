"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/userAppointments.module.css";

function UserAppointments() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, doctorsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/appointments"),
          axios.get("http://127.0.0.1:5000/api/doctors"),
        ]);

        const appointments = appointmentsResponse.data;
        const doctors = doctorsResponse.data;

        const appointmentsWithDoctorDetails = appointments
          .filter((appointment) => appointment.status !== "Cancelled") // Filter out cancelled appointments
          .map((appointment) => {
            const doctor = doctors.find((doc) => doc.id === appointment.doctor_id) || {};
            const invalidImages = ["Not-available", "not available", "NA", "", null, undefined];
            const isValidImage = doctor.image_url && !invalidImages.includes(doctor.image_url.trim());

            return {
              ...appointment,
              doctorName: doctor.name || "Unknown Doctor",
              specialty: doctor.specialty || "Unknown Specialty",
              image: isValidImage ? doctor.image_url : "/dummy.png",
              hospital: doctor.hospital_name || "Unknown Hospital",
              phone: doctor.contact || "Unknown Phone",
              status: appointment.status === "Scheduled" ? "Booked" : appointment.status,
            };
          });

        setAppointmentsList(appointmentsWithDoctorDetails);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      // Send PUT request to update appointment status in the backend
      await axios.put(`http://127.0.0.1:5000/api/appointments/${id}`, {
        status: "Cancelled",
      });

      // Remove the cancelled appointment from the UI
      setAppointmentsList(
        appointmentsList.filter((appointment) => appointment.id !== id)
      );
      setCancelError(null); // Clear any previous error
    } catch (err) {
      setCancelError("Failed to cancel appointment. Please try again.");
    }
  };

  if (loading) return <div className={styles.loading}>Loading appointments...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.appointmentsList}>
      <h2 className={styles.title}>Your Appointments</h2>
      {cancelError && <div className={styles.error}>{cancelError}</div>}
      <div className={styles.cardContainer}>
        {appointmentsList.length === 0 ? (
          <p>No active appointments found.</p>
        ) : (
          appointmentsList.map((appointment) => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.imageContainer}>
                <img
                  src={appointment.image}
                  alt={appointment.doctorName}
                  className={styles.doctorImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h5>{appointment.doctorName}</h5>
                <div className={styles.infoContainer}>
                  <p className={styles.specialty}>{appointment.specialty}</p>
                  <p>{appointment.hospital}</p>
                  <p>{appointment.phone}</p>
                  <p>Patient: {appointment.patient_name}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p className={styles.status}>Status: {appointment.status}</p>
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
          ))
        )}
      </div>
    </div>
  );
}

export default UserAppointments;