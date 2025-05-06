"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/faq.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const faqs = [
  {
    question: "Is there a fee to use this platform?",
    answer:
      "No, browsing doctors and booking appointments through our platform is completely free. Consultation charges (if any) are paid directly to the doctor or clinic.",
  },
  {
    question: "Can I view the doctor’s experience or hospital details?",
    answer:
      "Yes, each doctor’s card displays their experience, specialty, and affiliated hospital.",
  },
  {
    question: "Do I need to create an account to book an appointment?",
    answer:
      "While browsing is open to all, you’ll need to sign up or log in to confirm appointments and manage bookings.",
  },
  {
    question: "How do I know if the booking is successful?",
    answer:
      "You’ll see a confirmation message on the screen and also receive an email confirmation.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Currently, the platform does not include cancellation or rescheduling features.",
  },
];

const FAQ = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

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
    <div className={styles.faqContainer}>
      {/* Banner with FAQ text */}
      <div className={styles.banner}>
        <Image
          src="/faq.jpg"
          alt="FAQ Banner"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.bannerText}>
          <h1>Frequently Asked Questions</h1>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="container my-5 px-3 pb-3">
        <h2 className="text-center mb-4">Common Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item mb-3 border-0" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`${styles.accButton} accordion-button bg-transparent shadow-none`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if (el.style.color === "rgb(32, 178, 170)") {
                      el.style.color = ""; // Reset to default
                    } else {
                      el.style.color = "#20b2aa"; // Teal color
                    }
                  }}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className={`${styles.accBody} accordion-body`}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        {/* <div className="text-center mt-5">
          <h3>Ready to Get Started?</h3>
          <p>Find a doctor or book an appointment with ease.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              href="/explore"
              onClick={(e) => handleProtectedClick(e, "/explore")}
              style={{
                backgroundColor: "transparent",
                color: "#20b2aa",
                border: "1px solid #20b2aa",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#008080";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#20b2aa";
              }}
            >
              Find a Doctor
            </Link>

            <Link
              href="/appointments"
              onClick={(e) => handleProtectedClick(e, "/appointments")}
              style={{
                backgroundColor: "transparent",
                color: "#20b2aa",
                border: "1px solid #20b2aa",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#008080";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#20b2aa";
              }}
            >
              Book Appointment
            </Link>
          </div>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FAQ;
