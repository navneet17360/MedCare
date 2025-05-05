"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dayjs from "dayjs";
import styles from "../../styles/userAppointments.module.css";
 
// Utility function to convert 24-hour time to 12-hour with AM/PM
const formatTimeTo12Hour = (time24) => {
  if (!time24) return "";
  return dayjs(`2023-01-01 ${time24}`).format("h:mm A"); // e.g., "2:30 PM"
};
 
// Utility function to convert 12-hour time to 24-hour
const convertTo24Hour = (hour, minute, period) => {
  if (!hour || !minute || !period) return "";
  let hoursNum = parseInt(hour, 10);
  if (period === "PM" && hoursNum !== 12) hoursNum += 12;
  if (period === "AM" && hoursNum === 12) hoursNum = 0;
  return `${hoursNum.toString().padStart(2, "0")}:${minute}`; // e.g., "14:30"
};
 
function UserAppointments() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const [editError, setEditError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient_name: "",
    date: "",
    hour: "1",
    minute: "00",
    period: "AM",
    doctor_id: "",
  });
  const { user } = useUser();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, doctorsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/appointments"),
          axios.get("http://127.0.0.1:5000/api/doctors"),
        ]);
 
        const appointments = appointmentsResponse.data;
        setDoctors(doctorsResponse.data);
 
        const appointmentsWithDoctorDetails = appointments
          .filter((appointment) => appointment.status !== "Cancelled")
          .map((appointment) => {
            const doctor =
              doctorsResponse.data.find(
                (doc) => doc.id === appointment.doctor_id
              ) || {};
            const invalidImages = [
              "Not-available",
              "not available",
              "NA",
              "",
              null,
              undefined,
            ];
            const isValidImage =
              doctor.image_url &&
              !invalidImages.includes(doctor.image_url.trim());
 
            return {
              ...appointment,
              doctorName: doctor.name || "Unknown Doctor",
              specialty: doctor.specialty || "Unknown Specialty",
              image: isValidImage ? doctor.image_url : "/dummy.png",
              hospital: doctor.hospital_name || "Unknown Hospital",
              phone: doctor.contact || "Unknown Phone",
              status:
                appointment.status === "Scheduled"
                  ? "Booked"
                  : appointment.status,
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
      const appointment = appointmentsList.find((appt) => appt.id === id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
 
      const response = await axios.put(
        `http://127.0.0.1:5000/api/appointments/${id}`,
        {
          status: "Cancelled",
        }
      );
 
      const toEmail =
        user?.primaryEmailAddress?.emailAddress?.trim() ||
        "fallback@example.com";
 
      if (
        !appointment.patient_name ||
        !appointment.date ||
        !appointment.time ||
        !appointment.doctorName
      ) {
        console.warn("Missing required appointment data:", appointment);
        throw new Error("Incomplete appointment data for email");
      }
 
      const emailData = {
        to_email: toEmail,
        patient_name: appointment.patient_name,
        appointment_date: appointment.date,
        appointment_time: formatTimeTo12Hour(appointment.time),
        doctor_name: appointment.doctorName,
        appointment_id: id,
      };
 
      console.log("EmailJS emailData:", JSON.stringify(emailData, null, 2));
 
      try {
        const result = await emailjs.send(
          "service_0wt7ljc", // Replace with your EmailJS Service ID
          "template_084ed1s", // Replace with your EmailJS Cancel Template ID
          emailData,
          "dYUrn5Sm0t1bkY2Yk" // Replace with your EmailJS Public Key
        );
        console.log("Cancellation email sent successfully:", result);
        toast.success(`✅ Appointment cancelled! Confirmation email sent.`, {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (emailError) {
        console.error("Cancellation email sending failed:", emailError);
        toast.warn(
          `✅ Appointment cancelled, but failed to send email: ${
            emailError.message || emailError.text || "Unknown error"
          }`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
 
      setAppointmentsList(
        appointmentsList.filter((appointment) => appointment.id !== id)
      );
      setCancelError(null);
    } catch (err) {
      console.error("Cancellation error:", err);
      setCancelError("Failed to cancel appointment. Please try again.");
      toast.error(`⚠️ Failed to cancel appointment: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
 
  const openEditModal = (appointment) => {
    setSelectedAppointment(appointment);
    const timeParts = formatTimeTo12Hour(appointment.time).split(" "); // e.g., "2:30 PM" -> ["2:30", "PM"]
    const [hour, minute] = timeParts[0].split(":"); // e.g., "2:30" -> ["2", "30"]
    setFormData({
      patient_name: appointment.patient_name,
      date: appointment.date,
      hour: hour || "1",
      minute: minute || "00",
      period: timeParts[1] || "AM",
      doctor_id: appointment.doctor_id.toString(),
    });
    setIsModalOpen(true);
  };
 
  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setEditError(null);
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const updateAppointment = async (e) => {
    e.preventDefault();
    try {
      const time24 = convertTo24Hour(
        formData.hour,
        formData.minute,
        formData.period
      );
      const response = await axios.put(
        `http://127.0.0.1:5000/api/appointments/${selectedAppointment.id}`,
        {
          patient_name: formData.patient_name,
          date: formData.date,
          time: time24,
          doctor_id: parseInt(formData.doctor_id),
        }
      );
 
      const toEmail =
        user?.primaryEmailAddress?.emailAddress?.trim() ||
        "fallback@example.com";
      const doctorName =
        doctors.find((doc) => doc.id === parseInt(formData.doctor_id))?.name ||
        "Unknown Doctor";
      const emailData = {
        to_email: toEmail,
        patient_name: formData.patient_name,
        appointment_date: formData.date,
        appointment_time: `${formData.hour}:${formData.minute} ${formData.period}`,
        doctor_name: doctorName,
        appointment_id: selectedAppointment.id,
        from_name: "Appointment Team",
      };
 
      emailjs
        .send(
          "service_0wt7ljc", // Replace with your EmailJS Service ID
          "template_oi5zsvh", // Replace with your EmailJS Update Template ID
          emailData,
          "dYUrn5Sm0t1bkY2Yk" // Replace with your EmailJS Public Key
        )
        .then(
          (result) => {
            console.log("Update email sent successfully:", result.text);
            toast.success(
              `✅ Appointment updated for ${formData.hour}:${formData.minute} ${formData.period}! Confirmation email sent.`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
          },
          (error) => {
            console.error("Update email sending failed:", error);
            toast.warn(
              `✅ Appointment updated, but failed to send email: ${error.message || "Unknown error"}`,
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
          }
        );
 
      setAppointmentsList((prev) =>
        prev.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? {
                ...appointment,
                patient_name: formData.patient_name,
                date: formData.date,
                time: time24,
                doctor_id: parseInt(formData.doctor_id),
                doctorName:
                  doctors.find((doc) => doc.id === parseInt(formData.doctor_id))
                    ?.name || "Unknown Doctor",
                specialty:
                  doctors.find((doc) => doc.id === parseInt(formData.doctor_id))
                    ?.specialty || "Unknown Specialty",
                hospital:
                  doctors.find((doc) => doc.id === parseInt(formData.doctor_id))
                    ?.hospital_name || "Unknown Hospital",
                phone:
                  doctors.find((doc) => doc.id === parseInt(formData.doctor_id))
                    ?.contact || "Unknown Phone",
              }
            : appointment
        )
      );
 
      closeEditModal();
    } catch (err) {
      setEditError("Failed to update appointment. Please try again.");
      toast.error("⚠️ Failed to update appointment. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
 
  if (loading)
    return <div className={styles.loading}>Loading appointments...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
 
  return (
    <div className={styles.appointmentsList}>
      <h2 className={styles.title}>Your Appointments</h2>
      {(cancelError || editError) && (
        <div className={styles.error}>{cancelError || editError}</div>
      )}
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
                  <p>Time: {formatTimeTo12Hour(appointment.time)}</p>
                  <p className={styles.status}>Status: {appointment.status}</p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {appointment.status === "Booked" && (
                  <>
                    <span
                      onClick={() => openEditModal(appointment)}
                      className={styles.editIcon}
                      title="Edit Appointment"
                    >
                      ✏️
                    </span>
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
 
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Appointment</h3>
            <form onSubmit={updateAppointment}>
              <div className={styles.formGroup}>
                <label htmlFor="patient_name">Patient Name</label>
                <input
                  type="text"
                  id="patient_name"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleInputChange}
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
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Time</label>
                <div className={styles.timeInputContainer}>
                  <select
                    name="hour"
                    value={formData.hour}
                    onChange={handleInputChange}
                    required
                  >
                    {[...Array(12).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <span>:</span>
                  <select
                    name="minute"
                    value={formData.minute}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                  <select
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="doctor_id">Doctor</label>
                <select
                  id="doctor_id"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </option>
                  ))}
                </select>
              </div>
              {editError && <div className={styles.error}>{editError}</div>}
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className={styles.cancelModalButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
 
export default UserAppointments;