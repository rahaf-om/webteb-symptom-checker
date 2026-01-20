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

            <div className="container mt-5">
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
                                className="benefit-card stat-card"
                                tabIndex="0"
                                role="article"
                                aria-label={`${item.title}: ${item.desc}`}
                            >
                                <div className="benefit-stat-num">
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

export default B2BStats;

