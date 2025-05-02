import React, { useState } from "react";
import styles from "../../styles/BookAppointment.module.css";

function BookAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment booked:", formData);
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
    </div>
  );
}

export default BookAppointment;
