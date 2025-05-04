'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../../styles/faq.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const faqs = [
    {
        question: 'Is there a fee to use this platform?',
        answer:
            'No, browsing doctors and booking appointments through our platform is completely free. Consultation charges (if any) are paid directly to the doctor or clinic.',
    },
    {
        question: 'Can I view the doctor’s experience or hospital details?',
        answer:
            'Yes, each doctor’s card displays their experience, specialty, and affiliated hospital.',
    },
    {
        question: 'Do I need to create an account to book an appointment?',
        answer:
            'While browsing is open to all, you’ll need to sign up or log in to confirm appointments and manage bookings.',
    },
    {
        question: 'How do I know if the booking is successful?',
        answer:
            'You’ll see a confirmation message on the screen and also receive an email confirmation.',
    },
    {
        question: 'Can I cancel or reschedule an appointment?',
        answer:
            'Currently, the platform does not include cancellation or rescheduling features.',
    },
];

const FAQ = () => {
    return (
        <div className={styles.faqContainer}>
            {/* Banner with FAQ text */}
            <div className={styles.banner}>
                <Image
                    src="/faq.jpg" // Replace with your banner image path
                    alt="FAQ Banner"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className={styles.bannerText}>
                    <h1>Frequently Asked Questions</h1>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className="container my-5 px-3 pb-3">
                <h2 className="text-center mb-4"></h2>
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
                                        e.currentTarget.classList.toggle("text-primary");
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
                                <div className={`${styles.accBody} accordion-body`}>{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;