"use client";
import React, { useState } from "react";
import styles from "../../styles/ContactUs.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function ContactUs() {
  const { isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    name: isSignedIn ? user?.fullName || "" : "",
    email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "" : "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("You must log in first!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#fff",
          color: "#ff4d4f",
          fontFamily: "inherit",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ff4d4f",
        },
      });
      return;
    }
    if (validateForm()) {
      try {
        console.log("Submitting form data:", formData);
        const response = await axios.post(
          "http://127.0.0.1:5000/api/contact-us/",
          formData
        );
        if (response.status >= 200 && response.status < 300) {
          toast.success("Your message has been sent successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => setIsSubmitted(true), 1000); // Delay to show toast
        } else {
          throw new Error(response.data?.error || "Unexpected response status");
        }
      } catch (error) {
        console.error("Submission error:", error.response || error.message);
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Failed to send message. Please try again!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          style: {
            background: "#fff",
            color: "#ff4d4f",
            fontFamily: "inherit",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ff4d4f",
          },
        });
      }
    } else {
      toast.error("Please fix the errors in the form!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#fff",
          color: "#ff4d4f",
          fontFamily: "inherit",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ff4d4f",
        },
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.backgroundWrapper}>
        <div
          className={`${styles.container} flex items-center justify-center min-h-[400px]`}
        >
          <div className={`${styles.form} text-center`}>
            <svg
              className="w-24 h-24 mx-auto mb-6"
              fill="none"
              stroke="#20b2aa"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className={`${styles.title} text-3xl`}>
              Thanks for contacting us!
            </h2>
            <p className={`${styles.subtitle} text-lg`}>
              We’ll get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.container}>
        <ToastContainer />
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          We’re here to help! Fill out the form below, and we’ll get back to you
          soon.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.name ? styles.errorInput : ""
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.email ? styles.errorInput : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.phone ? styles.errorInput : ""
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.textarea} ${
                errors.description ? styles.errorInput : ""
              }`}
              placeholder="Describe your query or issue"
              rows="5"
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
