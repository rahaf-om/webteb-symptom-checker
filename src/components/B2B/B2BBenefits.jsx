import React from 'react';

const B2BBenefits = ({ t }) => {
    if (!t) return null;
    return (
        <section id="benefits" className="benefits section">
            <div className="container">
                <div className="section-title reveal mb-5">
                    <h2 className="text-center">{t.title}</h2>
                    <p className="section-subtitle text-center mx-auto" style={{ maxWidth: '700px' }}>{t.subtitle}</p>
                </div>

                <div className="row g-4">
                    {t.items?.map((item, index) => (
                        <div
                            key={index}
                            className="col-lg-3 col-md-6 col-12 reveal"
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div
                                className="benefit-card"
                                tabIndex="0"
                                role="article"
                                aria-label={`${item.title}: ${item.desc}`}
                            >
                                <div className="benefit-stat-num">
                                    {/* Using title as the prominent element, adding index if needed */}
                                    <span className="title-text">{item.title}</span>
                                    {item.icon && <span className="benefit-icon-sm" aria-hidden="true">{item.icon}</span>}
                                </div>
                                <div className="benefit-description">
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default B2BBenefits;

