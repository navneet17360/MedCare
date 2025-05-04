"use client";
import React, { useState } from "react";
import styles from "../../styles/ContactUs.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

function ContactUs() {
  const { isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    name: isSignedIn ? user?.fullName || "" : "",
    email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "" : "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

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
    if (validateForm()) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          toast.success("Your message has been sent successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          setFormData({
            name: isSignedIn ? user?.fullName || "" : "",
            email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "" : "",
            phone: "",
            description: "",
          });
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        toast.error("Failed to send message. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please fix the errors in the form!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className={styles.backgroundWrapper}>
        {/* Add alt and src to avoid error if Image is from 'next/image' */}
        <Image src="/contact-us.png" alt="Contact Us Background"
          fill
          className="img-fluid"
          objectFit="cover" />
        <h2 className={styles.title}>Contact Us</h2>
      </div>
        <p className={styles.subtitle}>
          We’re here to help! Fill out the form below, and we’ll get back to you soon.
        </p>
        <div className={styles.container}>
        <ToastContainer />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Message</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.description ? styles.errorInput : ""}`}
              placeholder="Describe your query or issue"
              rows="5"
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
