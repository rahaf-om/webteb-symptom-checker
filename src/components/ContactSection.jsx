import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactSection.css';

const ContactSection = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        setFormData({ name: '', email: '', organization: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
    };

    if (!t) return null;

    return (
        <section id="contact" className="contact-section reveal">
            <div className="contact-container">
                <div className="contact-grid centered-form">
                    <div className="contact-form-wrapper">
                        {status === 'success' ? (
                            <div className="success-message">
                                <div className="success-icon">🎉</div>
                                <h3>Thank you for reaching out!</h3>
                                <p>We've received your message and will get back to you within 24 hours.</p>
                                <button className="btn-reset" onClick={() => setStatus('idle')}>Send another message</button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">{t.form?.name || "Full Name"}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Dr. John Doe"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">{t.form?.email || "Email Address"}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@hospital.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="organization" className="form-label">{t.form?.organization || "Organization"}</label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        className="form-input"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        required
                                        placeholder="Health Medical Center"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">{t.form?.message || "Message"}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-input"
                                        rows="3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="I'm interested in..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? (
                                        <span className="spinner"></span>
                                    ) : (
                                        t.primaryBtn || "Send Message"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;
