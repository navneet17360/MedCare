"use client";
import React from "react";
import styles from "../../styles/categorySearch.module.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";

function CategorySearch() {
  const { isSignedIn } = useAuth();
  const specialties = [
    { name: "Dental", icon: "/icons/tooth.svg" },
    { name: "Cardiology", icon: "/icons/heart.svg" },
    { name: "Dermatology", icon: "/icons/skin.svg" },
    { name: "Neurology", icon: "/icons/brain.svg" },
    { name: "Otology", icon: "/icons/ear.svg" },
    { name: "Physician", icon: "/icons/physician.svg" },
    { name: "Ophthalmology", icon: "/icons/eye.svg" },
  ];

  const handleSpecialtyClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      toast.error("Please log in first to view doctors!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="px-5 my-5 d-flex align-items-center flex-column gap-2">
      <ToastContainer />
      <h2 className="fw-bold ps-3 display-6 mb-0">
        Search <span style={{ color: "#20b2aa" }}>Doctors</span>
      </h2>
      <p className="fs-4 ps-3 text-muted mb-0">
        Search, select, and schedule your doctor’s appointment in just a few
        clicks.
      </p>

      <div className="d-flex w-100 align-items-center justify-content-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Start your search..."
          className={`rounded-2 border border-2`}
          style={{ width: "20%", padding: "8px" }}
        />
        <button
          type="submit"
          className={`btn text-white`}
          style={{ backgroundColor: "#20b2aa", padding: "8px 16px" }}
        >
          Search
        </button>
      </div>

      <div className={styles.specialtiesContainer}>
        {specialties.map((specialty, index) => (
          <Link
            href={`/doctors/specialty/${specialty.name.toLowerCase()}`}
            key={index}
            style={{ textDecoration: "none" }}
            onClick={handleSpecialtyClick}
          >
            <div className={styles.specialtyCard}>
              <img
                src={specialty.icon}
                alt={specialty.name}
                width="40"
                height="40"
              />
              <span className={styles.specialtyName}>{specialty.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySearch;
