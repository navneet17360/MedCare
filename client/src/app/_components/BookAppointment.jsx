"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "../../styles/BookAppointment.module.css";
 
// Utility function to convert 24-hour time to 12-hour with AM/PM
const formatTimeTo12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hoursNum = parseInt(hours, 10);
  const period = hoursNum >= 12 ? "PM" : "AM";
  const hours12 = hoursNum % 12 || 12; // Convert 0 to 12 for midnight
  return `${hours12}:${minutes} ${period}`;
};
 
// Utility function to convert 12-hour time to 24-hour
const convertTo24Hour = (time12, period) => {
  if (!time12 || !period) return "";
  const [hours, minutes] = time12.split(":");
  let hoursNum = parseInt(hours, 10);
  if (period === "PM" && hoursNum !== 12) hoursNum += 12;
  if (period === "AM" && hoursNum === 12) hoursNum = 0;
  return `${hoursNum.toString().padStart(2, "0")}:${minutes}`;
};
 
function BookAppointment({ doctorId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    period: "AM",
    doctorId: doctorId ? doctorId.toString() : "",
  });
  const { user } = useUser();
 
  useEffect(() => {
    // Initialize EmailJS with public key
    emailjs.init("dYUrn5Sm0t1bkY2Yk"); // Replace with your EmailJS Public Key
 
    if (doctorId) {
      setFormData((prev) => ({ ...prev, doctorId: doctorId.toString() }));
    }
  }, [doctorId]);
 
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
 
    if (!user) {
      toast.error("Please log in first to book an appointment!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
      return;
    }
 
    const time24 = convertTo24Hour(formData.time, formData.period);
    if (!time24) {
      toast.error("Invalid time format. Please enter a valid time.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
      return;
    }
 
    const toEmail =
      user?.primaryEmailAddress?.emailAddress?.trim() || "fallback@example.com";
    const emailData = {
      to_email: toEmail,
      patient_name: formData.patientName,
      appointment_date: formData.date,
      appointment_time: formatTimeTo12Hour(time24),
      doctor_id: formData.doctorId,
      from_name: "Appointment Team",
    };
 
    const apiData = {
      patient_name: formData.patientName,
      date: formData.date,
      time: time24,
      doctor_id: parseInt(formData.doctorId),
    };
 
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/appointments",
        apiData
      );
      console.log("Booking successful:", response.data);
 
      emailjs
        .send(
          "service_0wt7ljc", // Replace with your EmailJS Service ID
          "template_oi5zsvh", // Replace with your EmailJS Template ID for booking
          emailData,
          "dYUrn5Sm0t1bkY2Yk" // Replace with your EmailJS Public Key
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
            toast.success(
              `✅ Appointment booked! Appointment ID: ${response.data.appointment_id}. Confirmation email sent.`,
              { position: "top-right", autoClose: 3000 }
            );
          },
          (error) => {
            console.error("Email sending failed:", error);
            toast.warn(
              `✅ Appointment booked (ID: ${response.data.appointment_id}), but failed to send email.`,
              { position: "top-right", autoClose: 3000 }
            );
          }
        );
 
      setFormData({
        patientName: "",
        date: "",
        time: "",
        period: "AM",
        doctorId: doctorId ? doctorId.toString() : "",
      });
      toggleModal();
    } catch (error) {
      let errorMessage = "⚠️ Booking failed: ";
      if (error.response) {
        errorMessage += error.response.data.error || error.message;
      } else if (error.request) {
        errorMessage +=
          "Unable to reach the server. Check if the backend is running.";
      } else {
        errorMessage += error.message;
      }
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
      console.error("Booking error:", error, error.response, error.request);
    } finally {
      setIsSubmitting(false);
    }
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
                  <div className={styles.timeInputContainer}>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                    <select
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="doctorId">Doctor ID</label>
                  <input
                    type="number"
                    id="doctorId"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    disabled={!!doctorId}
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
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
 
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
 
export default BookAppointment;