import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoadingNavbar = () => (
    <nav className="header" style={{ background: 'white', padding: '1rem 0' }}>
        <div className="container header-content d-flex justify-content-between align-items-center">
            <div className="skeleton" style={{ width: '120px', height: '40px' }}></div>
            <div className="d-none d-lg-flex gap-4 mx-auto">
                {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton" style={{ width: '80px', height: '20px' }}></div>
                ))}
            </div>
            <div className="skeleton" style={{ width: '140px', height: '40px', borderRadius: '50px' }}></div>
        </div>
    </nav>
);

const B2BNavbar = ({ t, lang, toggleLang }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes or strictly when clicking links
    const handleLinkClick = () => {
        setIsOpen(false);
        // Only scroll to top if it's a route change, but hrefs might be anchors.
        // If it's an anchor link, default behavior applies. 
    };

    if (!t) return <LoadingNavbar />;

    return (
        <nav
            className={`navbar navbar-expand-lg fixed-top header ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="container">
                {/* Logo Container */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                    onClick={handleLinkClick}
                >
                    <img src="/webteb-logo.png" alt="WebTeb" height="40" className="d-inline-block align-text-top" />
                </Link>

                {/* React Controlled Toggler */}
                <button
                    className={`navbar-toggler border-0 ${isOpen ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarContent"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                {/* Collapsible Content */}
                <div
                    className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
                    id="navbarContent"
                >
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 text-center">
                        {t.items?.map((item, i) => (
                            <li key={i} className="nav-item">
                                <a
                                    href={item.href}
                                    className="nav-link px-3 fw-medium text-dark-emphasis"
                                    onClick={() => setIsOpen(false)} // Just close for anchors
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side Actions */}
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
                        <button
                            onClick={() => { toggleLang(); setIsOpen(false); }}
                            className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 px-3 py-2 border-opacity-25"
                            style={{ minWidth: '120px', justifyContent: 'center' }}
                            aria-label="Switch Language"
                        >
                            <span>🌐</span>
                            <span className="text-nowrap pb-1" style={{ lineHeight: 1 }}>{lang === 'en' ? 'العربية' : 'English'}</span>
                        </button>

                        <a
                            href="#contact"
                            className="btn btn-primary rounded-pill px-4 w-100 w-lg-auto d-flex align-items-center justify-content-center"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }}
                        >
                            {t.cta}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default B2BNavbar;



