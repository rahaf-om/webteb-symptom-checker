import React from 'react';

const B2BNavbar = ({ t, lang, toggleLang }) => {
    if (!t) return null;
    return (
        <header className="header">
            <div className="container header-content">
                <a href="#" className="logo">
                    <img src="/webteb-logo.png" alt="WebTeb" className="logo-image" />
                </a>
                <nav className="nav">
                    {t.items?.map((item, i) => (
                        <a key={i} href={item.href} className="nav-link">{item.label}</a>
                    ))}
                    <button onClick={toggleLang} className="language-switcher">
                        <span className="lang-icon">🌐</span>
                        <span className="lang-text">{lang === 'en' ? 'العربية' : 'English'}</span>
                    </button>
                    <a href="#contact" className="btn btn-primary">{t.cta}</a>
                </nav>
            </div>
        </header>
    );
};

export default B2BNavbar;
