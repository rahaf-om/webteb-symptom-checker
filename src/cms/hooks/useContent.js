import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'webteb_cms_content';

const initialContent = {
  en: {
    nav: {
      items: [
        { label: "Home", href: "#hero" },
        { label: "Impact", href: "#stats" },
        { label: "Solutions", href: "#benefits" },
      ],
      cta: "Request Demo"
    },
    hero: {
      title: "The AI-Powered Front Door for Your Healthcare Institution",
      subtitle: "Empower your hospital with WebTeb's Symptom Checker. Clinically validated, bilingual, and designed to optimize patient flow and increase appointments.",
      cta_primary: "Partner With Us",
      cta_secondary: "View Product Demo"
    },
    stats: {
      title: "Proven Impact by the Numbers",
      subtitle: "Trusted technology that drives engagement and efficiency",
      items: [
        { icon: "🩺", title: "136 Symptoms", desc: "Comprehensive coverage including pediatric, OBGYN, and men's health" },
        { icon: "✅", title: "95% Accuracy", desc: "Harvard-validated algorithms ensuring safe patient guidance" },
        { icon: "👥", title: "5M+ Users", desc: "Technology already trusted by millions across MENA" },
        { icon: "🏥", title: "2,211 Pathways", desc: "Smart routing to your specific departments and specialists" }
      ]
    },
    benefits: {
      title: "Why Integrate WebTeb AI?",
      subtitle: "Drive operational efficiency and patient acquisition",
      items: [
        { icon: "📈", title: "Increase Bookings", desc: "Turn website visitors into booked appointments with targeted CTAs." },
        { icon: "🚑", title: "Reduce ER Overcrowding", desc: "Filter non-urgent cases effectively with preliminary AI triage." },
        { icon: "🎯", title: "Smart Routing", desc: "Automatically direct patients to the right specialty department." },
        { icon: "🔒", title: "Data Security", desc: "Enterprise-grade security compliant with healthcare regulations." }
      ]
    },
    how: {
      title: "How It Works for Your Patients",
      subtitle: "A seamless 3-step journey on your own platform",
      steps: [
        { num: "1", title: "Patient Checks Symptoms", desc: "User interacts with the white-labeled tool on your website/app." },
        { num: "2", title: "AI Analysis", desc: "Engine analyzes inputs against 2,500+ diagnostic questions." },
        { num: "3", title: "Conversion", desc: "Patient is directed to book an appointment with YOUR specialists." }
      ]
    },
    footer: {
      about_title: "WebTeb for Business",
      about_desc: "We provide digital health infrastructure for leading hospitals in MENA.",
      contact_title: "Integration Support",
      email: "business@webteb.com",
      location: "Amman, Jordan",
      copyright: "© 2025 WebTeb. All rights reserved."
    }
  },
  ar: {
    nav: {
      items: [
        { label: "الرئيسية", href: "#hero" },
        { label: "الأثر", href: "#stats" },
        { label: "الحلول", href: "#benefits" },
      ],
      cta: "اطلب تجربة"
    },
    hero: {
      title: "بوابتك الذكية لخدمات الرعاية الصحية المتطورة",
      subtitle: "مكّن مستشفاك باستخدام مشخص الأعراض من ويب طب. دقة طبية معتمدة، ثنائي اللغة، ومصمم لتحسين تدفق المرضى وزيادة الحجوزات.",
      cta_primary: "كن شريكاً معنا",
      cta_secondary: "شاهد العرض التوضيحي"
    },
    stats: {
      title: "أرقام تثبت الأثر",
      subtitle: "تقنية موثوقة تعزز التفاعل والكفاءة",
      items: [
        { icon: "🩺", title: "١٣٦ عرض طبي", desc: "تغطية شاملة تشمل الأطفال، النساء، وصحة الرجل" },
        { icon: "✅", title: "دقة ٩٥٪", desc: "خوارزميات معتمدة من هارفارد لضمان سلامة التوجيه" },
        { icon: "👥", title: "٥+ مليون مستخدم", desc: "تقنية يثق بها الملايين في المنطقة" },
        { icon: "🏥", title: "٢,٢١١ مسار توجيه", desc: "توجيه ذكي لأقسامك وتخصصاتك المحددة" }
      ]
    },
    benefits: {
      title: "لماذا تدمج تقنيات ويب طب؟",
      subtitle: "عزز الكفاءة التشغيلية واستقطاب المرضى",
      items: [
        { icon: "📈", title: "زيادة الحجوزات", desc: "حوّل زوار موقعك إلى مواعيد مؤكدة عبر توجيه ذكي." },
        { icon: "🚑", title: "تخفيف ضغط الطوارئ", desc: "فرز الحالات غير الطارئة بفعالية قبل وصولها للمستشفى." },
        { icon: "🎯", title: "توجيه ذكي", desc: "توجيه المريض آلياً للتخصص الطبي المناسب في منشأتك." },
        { icon: "🔒", title: "أمن البيانات", desc: "أمان بمعايير المؤسسات الكبرى متوافق مع اللوائح الصحية." }
      ]
    },
    how: {
      title: "كيف يعمل لمرضاك",
      subtitle: "رحلة سلسة من 3 خطوات على منصتك الخاصة",
      steps: [
        { num: "١", title: "فحص الأعراض", desc: "يتفاعل المستخدم مع الأداة مباشرة على موقعك أو تطبيقك." },
        { num: "٢", title: "تحليل الذكاء الاصطناعي", desc: "يحلل المحرك المدخلات مقابل أكثر من ٢٥٠٠ سؤال تشخيصي." },
        { num: "٣", title: "تحويل المريض", desc: "يتم توجيه المريض لحجز موعد مع أطبائك المختصين." }
      ]
    },
    footer: {
      about_title: "ويب طب للأعمال",
      about_desc: "نوفر البنية التحتية للصحة الرقمية لكبرى المستشفيات في المنطقة.",
      contact_title: "دعم التكامل",
      email: "business@webteb.com",
      location: "عمان، الأردن",
      copyright: "© ٢٠٢٥ ويب طب. جميع الحقوق محفوظة."
    }
  }
};

export const useContent = () => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialContent;
  });

  const updateContent = useCallback((newContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('cms-content-update', { detail: newContent }));
  }, []);

  useEffect(() => {
    const handleUpdate = (event) => {
      setContent(event.detail);
    };
    window.addEventListener('cms-content-update', handleUpdate);
    return () => window.removeEventListener('cms-content-update', handleUpdate);
  }, []);

  return {
    content,
    updateContent,
    isLoading: false
  };
};
