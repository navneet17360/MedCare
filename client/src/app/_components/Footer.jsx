"use client";
import React from "react";
import Image from "next/image";
import styles from "../../styles/footer.module.css"; // Import styles for footer

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container text-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={100}
          className="d-block mx-auto mb-4"
        />

        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "500px" }}>
          Book your doctor appointments online, anytime, anywhere. We help you
          connect with trusted healthcare professionals for all your medical
          needs.
        </p>

        <ul className="list-inline mb-4">
          {[
            "Home",
            "Find a Doctor",
            "Book Appointment",
            "Patient Portal",
            "Contact Us",
            "Privacy Policy",
          ].map((item, index) => (
            <li key={index} className="list-inline-item mx-2">
              <a className={styles.footerLink} href="#">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <ul className="list-inline">
          <li className="list-inline-item mx-2">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.facebook}`}
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.instagram}`}
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.twitter}`}
            >
              <i className="bi bi-twitter fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={`${styles.icon} ${styles.linkedin}`}
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </li>
        </ul>

        <p className="text-muted mt-4">
          © 2025 Doctor Appointment Service. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
