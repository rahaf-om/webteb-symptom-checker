import React from 'react';
import { Link } from 'react-router-dom';
import dashboardImg from '../../assets/hero-dashboard.png';

const B2BHero = ({ t }) => {
    if (!t) return null;
    return (
        <section id="hero" className="hero">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

            <div className="hero-content container reveal">
                <div className="hero-text-col">
                    <h1 className="hero-headline">{t.title}</h1>
                    <div
                        className="hero-subheading"
                        dangerouslySetInnerHTML={{ __html: t.subtitle }}
                    />
                    <div className="hero-cta">
                        <a
                            href="#contact"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {t.cta}
                        </a>
                    </div>
                </div>
                <div className="hero-image-col">
                    <a
                        href="https://www.webteb.com/symptom-checker"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-img-link"
                        title="Open WebTeb Symptom Checker Interactive Tool"
                    >
                        <div className="hero-img-wrapper">
                            <img
                                src={dashboardImg}
                                alt="WebTeb Health Dashboard Platform"
                                className="hero-dashboard-img"
                            />

                            {/* New Feature: Click to Try Guide */}
                            <div className="float-badge badge-try d-flex align-items-center">
                                <span className="pulse-dot"></span>
                                <div className="badge-text">
                                    <span className="badge-label" style={{ fontSize: '0.7rem', opacity: 0.8 }}>Interactive Preview</span>
                                    <span className="badge-value" style={{ color: '#16c1f5' }}>Try Symptom Checker</span>
                                </div>
                                <svg className="ms-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16c1f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </div>

                            {/* Floating Feature 2: Active Users/Doctors */}
                            <div className="float-badge badge-doctors">
                                <div className="badge-group-avatars">
                                    <div className="avatar av-1"></div>
                                    <div className="avatar av-2"></div>
                                    <div className="avatar av-3"></div>
                                </div>
                                <div className="badge-text">
                                    <span className="badge-label">Trusted by</span>
                                    <span className="badge-value">500+ Clinics</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default B2BHero;


