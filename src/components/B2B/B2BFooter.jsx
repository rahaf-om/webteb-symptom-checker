import React from 'react';

const B2BFooter = ({ t }) => {
    if (!t) return null;
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content reveal">
                    <div className="footer-section">
                        <h3>{t.about_title}</h3>
                        <p>{t.about_desc}</p>
                    </div>
                    <div className="footer-section">
                        <h3>{t.contact_title}</h3>
                        <ul className="contact-info">
                            <li>📧 {t.email}</li>
                            <li>📍 {t.location}</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>{t.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default B2BFooter;
