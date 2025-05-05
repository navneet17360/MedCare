"use client";

import React, { useState } from "react";
import styles from "../../styles/categorySearch.module.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

function CategorySearch() {
  const { isSignedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setSearchResults([]);

    if (!isSignedIn) {
      toast.error("Please log in first to search doctors!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!searchQuery.trim()) {
      toast.warn("Please enter a doctor's name or specialty to search!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsSearching(true);
    try {
      console.log("Fetching doctors from API...");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors`,
        {
          timeout: 5000,
        }
      );
      console.log("API response:", response.data);
      const doctors = response.data;
      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("Filtered doctors:", filteredDoctors);
      setSearchResults(filteredDoctors);
      if (filteredDoctors.length === 0) {
        toast.info("No doctors found matching your search.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      let errorMessage = "Failed to fetch doctors. Please try again.";
      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Check if the API server is running.";
      } else if (error.response) {
        errorMessage = `API error: ${error.response.status} - ${
          error.response.data.message || "Unknown error"
        }`;
      } else if (error.request) {
        errorMessage =
          "Network error: Unable to reach the API. Check CORS or server status.";
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  return (
    <div className="px-5 mb-5 mt-2 d-flex align-items-center flex-column gap-2">
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
          placeholder="Enter doctor's name or specialty..."
          className={`${styles.input} rounded-2`}
          style={{ width: "20%" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className={`btn text-white ${styles.searchButton}`}
          style={{ backgroundColor: "#20b2aa", padding: "8px 16px" }}
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? <span className={styles.spinner}></span> : "Search"}
        </button>
      </div>

      {error && (
        <div className="w-100 mt-4 text-danger">
          <p>{error}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="w-100 mt-4">
          <h3 className="fw-bold">Search Results</h3>
          <div className={styles.searchResultsContainer}>
            {searchResults.map((doctor) => (
              <Link
                href={`/our_doctors/${doctor.id}`}
                key={doctor.id}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.searchResultCard}>
                  <img
                    src={
                      doctor.image_url && doctor.image_url !== "Not-available"
                        ? doctor.image_url
                        : "/dummyDoc.jpg"
                    }
                    alt={doctor.name}
                    className={styles.searchResultImage}
                    onError={(e) => {
                      e.target.src = "/dummyDoc.jpg";
                    }}
                  />
                  <div className={styles.searchResultName}>{doctor.name}</div>
                  <div className={styles.searchResultSpecialty}>
                    {doctor.specialty}
                  </div>
                  <div className={styles.searchResultHospital}>
                    {doctor.hospital_name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2 className="mt-5 fw-bold display-6">
        Find <span style={{ color: "#20b2aa" }}>Experts</span> by Field
      </h2>
      <p className="fs-4 text-muted">
        From dermatology to cardiology, explore trusted options.
      </p>
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
