"use client";
import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-light py-5">
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
              <a className="footer-link" href="#">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <ul className="list-inline">
          <li className="list-inline-item mx-2">
            <a href="#" target="_blank" rel="noreferrer" className="text-dark">
              <i className="bi bi-facebook fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" target="_blank" rel="noreferrer" className="text-dark">
              <i className="bi bi-instagram fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" target="_blank" rel="noreferrer" className="text-dark">
              <i className="bi bi-twitter fs-4"></i>
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="#" target="_blank" rel="noreferrer" className="text-dark">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </li>
        </ul>

        <p className="text-muted mt-4">
          © 2025 Doctor Appointment Service. All Rights Reserved.
        </p>
      </div>

      <style jsx>{`
        /* Footer link styles */
        .list-inline .footer-link {
          color: #000;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .list-inline .footer-link:hover {
          color: #00675b;
        }

        /* Icon styles */
        .list-inline-item i {
          font-size: 1.5rem;
          color: #000;
          transition: color 0.3s ease;
        }

        .list-inline-item i:hover {
          color: #008080;
        }

        /* General footer styles */
        footer {
          background-color: #f8f9fa;
          padding: 50px 0;
        }

        footer .container {
          text-align: center;
        }

        .list-inline-item {
          margin: 0 10px;
        }
      `}</style>
    </footer>
  );
}

export default Footer;