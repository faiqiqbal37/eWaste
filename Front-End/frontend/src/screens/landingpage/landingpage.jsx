import React from 'react';
import Navbar from "../../components/navbar";

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <section id="about" className="section">
                <h2>About Us</h2>
                <p>Welcome to eWaste! We are dedicated to proper electronic waste disposal and recycling.</p>
            </section>
            <section id="services" className="section">
                <h2>Our Services</h2>
                <p>Learn about our electronic waste pickup, recycling, and disposal services.</p>
            </section>
            <section id="contact" className="section">
                <h2>Contact Us</h2>
                <p>Get in touch with us for inquiries or to schedule a pickup.</p>
            </section>
        </div>
    );
};

export default LandingPage;
