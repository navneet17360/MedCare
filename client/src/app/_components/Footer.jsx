"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/footer.module.css";

function Footer() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find a Doctor", path: "/explore" },
    { name: "Appointment", path: "/appointments" },
  ];

  const supportLinks = [
    { name: "Contact Us", path: "/contact-us" },
    { name: "FAQ", path: "/faq" },
  ];

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in first to continue!", {
        position: "top-right",
        autoClose: 2000, // Reduced toast duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setIsLoading(true);
      router.push(path, { scroll: false }); // Disable scroll for faster navigation
    }
  };

  // Handle route change events with minimal timeout
  useEffect(() => {
    const handleRouteChangeStart = () => {
      console.log("Footer: Route change started");
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      console.log("Footer: Route change completed");
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      console.log("Footer: Route change error");
      setIsLoading(false);
    };

    // Minimal timeout (2 seconds)
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Footer: Loading timeout reached (2s), hiding spinner.");
        setIsLoading(false);
      }
    }, 2000);

    router.events?.on("routeChangeStart", handleRouteChangeStart);
    router.events?.on("routeChangeComplete", handleRouteChangeComplete);
    router.events?.on("routeChangeError", handleRouteChangeError);

    return () => {
      clearTimeout(timeout);
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeError);
    };
  }, [router, isLoading]);

  return (
    <>
      {/* Health Section */}
      <div
        className={`container py-md-4 my-md-5 position-relative ${styles.mobileHealthContainer}`}
      >
        <div className="container h-100">
          <div className="row align-items-center text-white h-100 justify-content-start">
            <div
              className={`col-md-7 col-12 rounded-start-5 ps-5 py-5 ${styles.mobileHealthCard}`}
              style={{ backgroundColor: "#24216e", height: "280px" }}
            >
              <h3
                className={`display-6 fw-bold mb-2 w-75 ${styles.mobileHealthTitle}`}
              >
                Don’t Let Your Health Take a Backseat!
              </h3>
              <p className={`lead w-75 ${styles.mobileHealthText}`}>
                Schedule an appointment with Udaipur's experienced medical
                professionals today!
              </p>
            </div>
            <div
              className={`col-md-5 col-12 text-center position-absolute ${styles.mobileHealthImageWrapper}`}
              style={{ right: "5%", top: "-10px" }}
            >
              <Image
                src="/health.jpg"
                alt="Doctor Illustration"
                width={560}
                height={560}
                className={`img-fluid rounded-4 ${styles.mobileHealthImage}`}
                priority // Optimize image loading
                sizes="(max-width: 767px) 300px, 560px"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <div className="row justify-content-between">
            {/* Logo Column */}
            <div className="col-12 col-md-3 mb-4">
              <div className="row gap-5">
                <div className="col-3">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="d-block mx-auto"
                    priority
                    sizes="100px"
                  />
                </div>
                <div className="col-5 d-flex justify-content-center align-items-center">
                  <h1 className="fw-semibold">MedCare</h1>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <p className="text-muted">
                    At MedCare, we help you connect with trusted healthcare
                    professionals for all your medical needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links Column */}
            <div className="col-12 col-md-2 mb-4">
              {/* Loading Spinner Overlay */}
              {isLoading && (
                <div className={styles.loadingOverlay} aria-busy="true">
                  <div className={styles.spinner}></div>
                </div>
              )}
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                {navLinks.map(({ name, path }, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={path}
                      className={styles.footerLink}
                      prefetch={true}
                      onClick={() => setIsLoading(true)}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links Column */}
            <div className="col-12 col-md-2 mb-4">
              {/* Loading Spinner Overlay */}
              {isLoading && (
                <div className={styles.loadingOverlay} aria-busy="true">
                  <div className={styles.spinner}></div>
                </div>
              )}
              <h5 className="mb-3">Support</h5>
              <ul className="list-unstyled">
                {supportLinks.map(({ name, path }, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={path}
                      className={styles.footerLink}
                      prefetch={true}
                      onClick={() => setIsLoading(true)}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Icons Column */}
            <div className="col-12 col-md-2 mb-4">
              <h5 className="mb-3">Follow Us</h5>
              <ul className="list-inline">
                {["facebook", "instagram", "twitter", "linkedin"].map(
                  (platform) => (
                    <li key={platform} className="list-inline-item mx-2">
                      <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.icon} ${styles[platform]}`}
                      >
                        <i className={`bi bi-${platform} fs-4`}></i>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="text-center pb-4">
            <p className="text-muted mb-0">© 2025 MedCare All Rights Reserved.</p>
          </div>
        </div>
        <ToastContainer />
      </footer>
    </>
  );
}

export default Footer;