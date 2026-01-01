import React from 'react';

const B2BStats = ({ t }) => {
    if (!t) return null;
    return (
        <section id="stats" className="stats section bg-gray">
            <div className="wave-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            <div className="container">
                <div className="section-title reveal">
                    <h2>{t.title}</h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>
                <div className="benefits-grid">
                    {t.items?.map((item, index) => (
                        <div key={index} className="benefit-card reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="benefit-icon">{item.icon}</div>
                            <h3 className="benefit-title">{item.title}</h3>
                            <p className="benefit-description">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default B2BStats;
