import React from 'react';

const B2BHowItWorks = ({ t }) => {
    if (!t) return null;
    return (
        <section id="how" className="how-it-works section bg-gray">
            <div className="wave-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="container">
                <div className="section-title reveal">
                    <h2>{t.title}</h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>
                <div className="steps-container">
                    {t.steps?.map((step, index) => (
                        <div key={index} className="step reveal" style={{ transitionDelay: `${index * 150}ms` }}>
                            <div className="step-number">{step.num}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default B2BHowItWorks;
