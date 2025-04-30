import React from "react";
import Image from "next/image";

function Hero() {
    return (
        <section>
            <div className="container py-5">
                <div className="row align-items-center justify-content-between g-5" >

                    <div className="col-md-6">
                        <div className="text-wrapper">
                            <h2 className="fw-bold text-dark fs-1">
                                Connecting You to <span style={{ color: "#20b2aa" }}>Udaipur's</span> Healthcare Professionals
                            </h2>

                            <p className="mt-3 text-secondary fs-5">
                                Get connected to trusted care providers near you. Book appointments, <br />manage your health, and stay on top of your well-being with ease! <br /> Simplifying your healthcare experience, one step at a time.
                            </p>
                            <button className="btn fw-bold rounded-3 py-2 mt-3 text-white" style={{ backgroundColor: "#20b2aa" }}>Explore Now</button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <Image
                            src="/doctors.jpg"
                            className="img-fluid rounded-5"
                            alt=""
                            width={800}
                            height={800}
                        />
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Hero;