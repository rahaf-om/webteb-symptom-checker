import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import B2BNavbar from './components/B2B/B2BNavbar';
import B2BFooter from './components/B2B/B2BFooter';
import { useContent } from './cms/hooks/useContent';
import './ContactFormPage.css';

const ContactFormPage = () => {
    const navigate = useNavigate();
    const { content: cmsContent } = useContent();
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en');

    const t = cmsContent[lang] || cmsContent['en'];

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phonePrefix: '+962', // Default to Jordan
        phoneNumber: '',
        hearAbout: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    // Load saved draft from localStorage on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem('contactFormDraft');
        if (savedDraft) {
            setFormData(JSON.parse(savedDraft));
        }
    }, []);

    // Save draft to localStorage on change
    useEffect(() => {
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    }, [formData]);

    // Cleanup draft on successful submission
    useEffect(() => {
        if (submitStatus === 'success') {
            localStorage.removeItem('contactFormDraft');
        }
    }, [submitStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Business Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (formData.message.length > 500) newErrors.message = "Message cannot exceed 500 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Mock API Call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Logic to simulate success/failure
            const success = true;

            if (success) {
                setSubmitStatus('success');
                // Optional: redirect after some time
                // setTimeout(() => navigate('/'), 3000);
            } else {
                throw new Error("Failed to submit form");
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'ar' : 'en';
        setLang(newLang);
        localStorage.setItem('language', newLang);
        // Force reload or just state update? LandingPage reloads attribs in effect, let's do the same here.
    };

    // Update HTML dir/lang attributes
    useEffect(() => {
        document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }, [lang]);

    if (!t) return null;

    if (submitStatus === 'success') {
        return (
            <div className="contact-page">
                <B2BNavbar t={t.nav} lang={lang} toggleLang={toggleLang} />
                <div className="contact-hero">
                    <div className="submission-status submission-success">
                        <h2>{lang === 'en' ? 'Thank You!' : 'شكراً لك!'}</h2>
                        <p>{lang === 'en' ? 'Your message has been received. Our team will contact you shortly.' : 'تم استلام رسالتك. سيتصل بك فريقنا قريباً.'}</p>
                        <button className="submit-btn" onClick={() => navigate('/')} style={{ marginTop: '1rem', width: 'auto' }}>
                            {lang === 'en' ? 'Return Home' : 'العودة للرئيسية'}
                        </button>
                    </div>
                </div>
                <B2BFooter t={t.footer} />
            </div>
        );
    }

    return (
        <div className="contact-page">
            <B2BNavbar t={t.nav} lang={lang} toggleLang={toggleLang} />

            <div className="contact-hero">
                <h1>{lang === 'en' ? 'Get in Touch with Our Solutions Team' : 'تواصل مع فريق حلول الأعمال'}</h1>
                <p>
                    {lang === 'en'
                        ? 'Ready to optimize your patient flow? Fill out the form below and we will get back to you within 24 hours.'
                        : 'مستعد لتحسين تدفق المرضى لديك؟ املأ النموذج أدناه وسنعود إليك خلال ٢٤ ساعة.'}
                </p>
            </div>

            <div className="contact-form-container">
                {submitStatus === 'error' && (
                    <div className="submission-status submission-error">
                        {lang === 'en' ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'Full Name' : 'الاسم الكامل'} <span className="required-mark">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-input"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={lang === 'en' ? 'John Doe' : 'الاسم الكامل'}
                        />
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>

                    {/* Company Name */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'Company Name' : 'اسم الشركة'} <span className="required-mark">*</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            className="form-input"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder={lang === 'en' ? 'Hospital / Clinic Name' : 'اسم المستشفى / العيادة'}
                        />
                        {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'Business Email' : 'بريد العمل'} <span className="required-mark">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@company.com"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                        </label>
                        <div className="phone-group">
                            <select
                                name="phonePrefix"
                                className="form-select phone-prefix"
                                value={formData.phonePrefix}
                                onChange={handleInputChange}
                            >
                                <option value="+962">JO (+962)</option>
                                <option value="+966">SA (+966)</option>
                                <option value="+971">AE (+971)</option>
                                <option value="+20">EG (+20)</option>
                                <option value="+1">US (+1)</option>
                                <option value="+44">UK (+44)</option>
                            </select>
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="form-input"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="79 123 4567"
                            />
                        </div>
                    </div>

                    {/* How did you hear? */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'How did you hear about us?' : 'كيف سمعت عنا؟'}
                        </label>
                        <select
                            name="hearAbout"
                            className="form-select"
                            value={formData.hearAbout}
                            onChange={handleInputChange}
                        >
                            <option value="">{lang === 'en' ? 'Select an option' : 'اختر خياراً'}</option>
                            <option value="search">{lang === 'en' ? 'Search Engine' : 'محرك بحث'}</option>
                            <option value="social">{lang === 'en' ? 'Social Media' : 'وسائل التواصل الاجتماعي'}</option>
                            <option value="referral">{lang === 'en' ? 'Referral' : 'توصية'}</option>
                            <option value="other">{lang === 'en' ? 'Other' : 'أخرى'}</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                        <label className="form-label">
                            {lang === 'en' ? 'Message / Requirements' : 'الرسالة / المتطلبات'}
                        </label>
                        <textarea
                            name="message"
                            className="form-textarea"
                            value={formData.message}
                            onChange={handleInputChange}
                            maxLength={500}
                            placeholder={lang === 'en' ? 'Tell us about your needs...' : 'أخبرنا عن احتياجاتك...'}
                        />
                        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#6c757d' }}>
                            {formData.message.length}/500
                        </div>
                        {errors.message && <span className="error-message">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting
                            ? (lang === 'en' ? 'Sending...' : 'جاري الإرسال...')
                            : (lang === 'en' ? 'Send Message' : 'إرسال الرسالة')}
                    </button>
                </form>
            </div>

            <B2BFooter t={t.footer} />
        </div>
    );
};

export default ContactFormPage;
