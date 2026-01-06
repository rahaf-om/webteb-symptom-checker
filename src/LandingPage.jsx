import { useState, useEffect } from 'react'
import { useContent } from './cms/hooks/useContent'
import B2BNavbar from './components/B2B/B2BNavbar'
import B2BHero from './components/B2B/B2BHero'
import B2BStats from './components/B2B/B2BStats'
import B2BBenefits from './components/B2B/B2BBenefits'
import B2BHowItWorks from './components/B2B/B2BHowItWorks'
import B2BFooter from './components/B2B/B2BFooter'
import './styles.css'

import ContactSection from './components/ContactSection'

function LandingPage() {
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en')
    const { content: cmsContent } = useContent()

    const t = cmsContent[lang] || cmsContent['en']

    // Update HTML attributes for language
    useEffect(() => {
        document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en')
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
        localStorage.setItem('language', lang)
    }, [lang])

    // Scroll Reveal Animation Hook
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active')
                }
            })
        }, { threshold: 0.1 })

        const revealedElements = document.querySelectorAll('.reveal')
        revealedElements.forEach(el => observer.observe(el))

        return () => revealedElements.forEach(el => observer.unobserve(el))
    }, [t])

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'ar' : 'en')
    }

    if (!t) return null;

    return (
        <div className="app">
            <B2BNavbar t={t.nav} lang={lang} toggleLang={toggleLang} />
            <B2BHero t={t.hero} />
            <B2BStats t={t.stats} />
            <B2BBenefits t={t.benefits} />
            <B2BHowItWorks t={t.how} />
            <ContactSection t={t.contactSection} />
            <B2BFooter t={t.footer} />
        </div>
    )
}

export default LandingPage
