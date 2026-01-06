import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactSection.css';

const ContactSection = ({ t }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    // If t is not provided yet, fallback or render nothing
    if (!t) return null;

    return (
        <section id="contact" className="contact-section reveal" ref={sectionRef}>
            <div className="contact-container">
                <div className="contact-content">
                    <h2 className="contact-heading">{t.heading}</h2>
                    <p className="contact-subheading">{t.subheading}</p>
                    <div className="contact-actions">
                        <button
                            className="contact-primary-btn"
                            onClick={() => navigate('/contact-form')}
                            aria-label={t.primaryBtn}
                        >
                            {t.primaryBtn}
                        </button>
                        <a href="#benefits" className="contact-secondary-link">
                            {t.secondaryLink}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
