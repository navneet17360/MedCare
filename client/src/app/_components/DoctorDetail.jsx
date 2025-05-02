"use client";
import styles from '../../styles/doctorDetail.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const doctors = [
    {
        id: 1,
        name: "Dr. Ramesh Kumar",
        specialty: "Cardiologist",
        image: "doctors/doc1.avif",
        yearsOfExperience: 15,
        hospital: "AIIMS, New Delhi",
        about: "Dr. Ramesh is a leading cardiologist with expertise in interventional cardiology and heart failure management. He is committed to advancing cardiac care through research and patient-centered treatment.",
        qualifications: [
            "MBBS",
            "MD (Cardiology)",
            "Fellowship in Interventional Cardiology"
        ],
        consultingSchedule: [
            "Mon-Fri: 9:00 AM - 1:00 PM",
            "Mon-Fri: 3:00 PM - 7:00 PM"
        ]
    },
    {
        id: 2,
        name: "Dr. Aarya Sharma",
        specialty: "Pediatrician",
        image: "doctors/doc2.avif",
        yearsOfExperience: 10,
        hospital: "Fortis Healthcare, Mumbai",
        about: "Dr. Aarya specializes in pediatric care, focusing on preventive medicine and developmental disorders. She is known for her compassionate approach and dedication to children's health.",
        qualifications: [
            "MBBS",
            "DCH (Diploma in Child Health)",
            "DNB (Pediatrics)"
        ],
        consultingSchedule: [
            "Tue-Thu: 10:00 AM - 2:00 PM",
            "Sat: 9:00 AM - 12:00 PM"
        ]
    },
    {
        id: 3,
        name: "Dr. Sunil Gupta",
        specialty: "Orthopedic Surgeon",
        image: "doctors/doc3.avif",
        yearsOfExperience: 20,
        hospital: "Max Hospital, Delhi",
        about: "Dr. Sunil is an expert in orthopedic surgery, with a focus on joint replacement and sports injuries. He has performed over 5,000 successful surgeries in his career.",
        qualifications: [
            "MBBS",
            "MS (Orthopedics)",
            "Fellowship in Joint Replacement"
        ],
        consultingSchedule: [
            "Mon-Wed-Fri: 8:00 AM - 12:00 PM",
            "Mon-Wed-Fri: 2:00 PM - 6:00 PM"
        ]
    },
    {
        id: 4,
        name: "Dr. Neha Verma",
        specialty: "Neurologist",
        image: "doctors/doc4.avif",
        yearsOfExperience: 12,
        hospital: "NIMHANS, Bangalore",
        about: "Dr. Neha is a neurologist specializing in epilepsy and neurodegenerative disorders. She is actively involved in clinical research and patient advocacy.",
        qualifications: [
            "MBBS",
            "DM (Neurology)",
            "PhD in Neuroscience"
        ],
        consultingSchedule: [
            "Mon-Fri: 9:00 AM - 1:00 PM",
            "Thu: 3:00 PM - 7:00 PM"
        ]
    },
];

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundDoctor = doctors.find((doc) => doc.id === parseInt(id));
        setDoctor(foundDoctor);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className={`container ${styles.profileContainer}`}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className={`container ${styles.profileContainer}`}>
                <p>Doctor not found.</p>
            </div>
        );
    }

    return (
        <div className={`container ${styles.profileContainer}`}>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className={`card ${styles.profileCard}`}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 d-flex flex-column align-items-center">
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={`/${doctor.image}`}
                                            alt={doctor.name}
                                            className={`img-fluid rounded-3 ${styles.doctorImage}`}
                                        />
                                    </div>
                                    <div className={styles.buttonSection}>
                                        <button className={styles.appointmentButton}>
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <h1 className={styles.doctorName}>{doctor.name}</h1>
                                    <h4 className={styles.specialty}>{doctor.specialty}</h4>
                                    <div className={styles.infoSection}>
                                        <p className="card-text">
                                            <img
                                                src="/icons/hospital.svg"
                                                alt="Hospital Icon"
                                                className={styles.icon}
                                            />
                                            {doctor.hospital}
                                        </p>
                                        <p className="card-text">
                                            <img
                                                src="/icons/experience.svg"
                                                alt="Experience Icon"
                                                className={styles.icon}
                                            />
                                            {doctor.yearsOfExperience} years of experience
                                        </p>
                                        <div className={`card-text ${styles.aboutBox}`}>
                                            {doctor.about}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className={styles.infoCard}>
                                                <h5>
                                                    <img
                                                        src="/icons/education.svg"
                                                        alt="Qualifications Icon"
                                                        className={styles.icon}
                                                    />
                                                    Qualifications
                                                </h5>
                                                <ul className={styles.qualificationsList} style={{ listStyleType: "disc" }}>
                                                    {doctor.qualifications.map((qual, index) => (
                                                        <li key={index}>{qual}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={styles.infoCard}>
                                                <h5>
                                                    <img
                                                        src="/icons/clock.svg"
                                                        alt="Schedule Icon"
                                                        className={styles.icon}
                                                    />
                                                    Consulting Schedule
                                                </h5>
                                                <ul className={styles.scheduleList}>
                                                    {doctor.consultingSchedule.map((schedule, index) => (
                                                        <li key={index}>{schedule}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;