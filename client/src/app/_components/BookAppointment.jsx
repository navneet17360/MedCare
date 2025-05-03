"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/BookAppointment.module.css";

function BookAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
  });

  const { user } = useUser();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const toEmail =
      user?.primaryEmailAddress?.emailAddress?.trim() || "fallback@example.com";

    const emailData = {
      to_email: toEmail,
      patient_name: formData.patientName,
      appointment_date: formData.date,
      appointment_time: formData.time,
    };

    console.log("Email data to send:", emailData);

    emailjs
      .send(
        "service_0wt7ljc",         // Replace with your EmailJS Service ID
        "template_oi5zsvh",        // Replace with your EmailJS Template ID
        emailData,
        "dYUrn5Sm0t1bkY2Yk"        // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          toast.success("✅ Appointment booked! Confirmation email sent.");
        },
        (error) => {
          console.error("Email sending failed:", error);
          toast.error("⚠️ Appointment booked, but failed to send email.");
        }
      );

    toggleModal();
  };

  return (
    <div className={styles.container}>
      <button className={styles.bookButton} onClick={toggleModal}>
        Book Appointment
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.modalTitle}>Book an Appointment</h5>
              <button className={styles.closeButton} onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="patientName">Patient Name</label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.modalFooter}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default BookAppointment;
