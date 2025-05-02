"use client";
import React from "react";
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find a Doctor", path: "/explore" },
    { name: "Appointment", path: "/appointments" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleProtectedClick = (e, path) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in first to continue!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      router.push(path);
    }
  };

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
          {navLinks.map(({ name, path }, index) => (
            <li key={index} className="list-inline-item mx-2">
              <Link
                href={path}
                className={styles.footerLink}
                onClick={
                  name === "Find a Doctor" || name === "Appointment"
                    ? (e) => handleProtectedClick(e, path)
                    : undefined
                }
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="list-inline">
          {/* Social Media Icons */}
          {["facebook", "instagram", "twitter", "linkedin"].map((platform) => (
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
          ))}
        </ul>

        <p className="text-muted mt-4">© 2025 MedCare All Rights Reserved.</p>
      </div>
      <ToastContainer /> {/* Add toast container once */}
    </footer>
  );
}

export default Footer;
