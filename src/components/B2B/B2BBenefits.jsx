import React from 'react';

const B2BBenefits = ({ t }) => {
    if (!t) return null;
    return (
        <section id="benefits" className="benefits section">
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

export default B2BBenefits;
