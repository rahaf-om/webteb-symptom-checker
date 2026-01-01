import React from 'react';

const B2BHero = ({ t }) => {
    if (!t) return null;
    return (
        <section id="hero" className="hero">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

            <div className="hero-content container reveal">
                <h1 className="hero-headline">{t.title}</h1>
                <div
                    className="hero-subheading"
                    dangerouslySetInnerHTML={{ __html: t.subtitle }}
                />
                <div className="hero-cta">
                    <a href="#contact" className="btn btn-primary">{t.cta_primary}</a>
                    <a href="#how" className="btn btn-secondary">{t.cta_secondary}</a>
                </div>
            </div>
        </section>
    );
};

export default B2BHero;
