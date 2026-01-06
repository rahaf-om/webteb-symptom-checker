/**
 * WebTeb B2B Landing Page - Interaction & Animation Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Logic
    const revealOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    // 2. Smooth Section Transition
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // 3. Dynamic Year Update
    const updateYear = () => {
        const yearEl = document.getElementById('current-year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    };

    // Initialize all components
    revealOnScroll();
    smoothScroll();
    updateYear();
});
