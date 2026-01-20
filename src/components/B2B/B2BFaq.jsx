import React from 'react';

const B2BFaq = ({ t }) => {
    if (!t) return null;

    return (
        <section id="faq" className="faq section bg-gray">
            <div className="container">
                <div className="section-title reveal mb-5">
                    <h2 className="text-center">{t.title}</h2>
                    <p className="section-subtitle text-center mx-auto" style={{ maxWidth: '700px' }}>{t.subtitle}</p>
                </div>

                <div className="accordion reveal" id="faqAccordion" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {t.items?.map((item, index) => (
                        <div key={index} className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold py-4`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded={index === 0}
                                    aria-controls={`collapse${index}`}
                                    style={{ fontSize: '1.1rem', backgroundColor: 'white' }}
                                >
                                    {item.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body bg-white text-secondary pb-4 px-4" style={{ lineHeight: '1.7' }}>
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default B2BFaq;
