import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { translations } from './translations';
import ErrorBoundary from './components/ErrorBoundary';
import { initMetaPixel, trackViewContent, trackInitiateCheckout } from './lib/metaPixel';

const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
const CheckoutPage = React.lazy(() => import('./CheckoutPage'));

import HeroSection from './components/HeroSection';
import AlertBox from './components/AlertBox';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import SafetySection from './components/SafetySection';
import TechSection from './components/TechSection';

const PerfSection = React.lazy(() => import('./components/PerfSection'));
const SpecsSection = React.lazy(() => import('./components/SpecsSection'));
const MiniFeatures = React.lazy(() => import('./components/MiniFeatures'));
const CTASection = React.lazy(() => import('./components/CTASection'));
const ReviewsSection = React.lazy(() => import('./components/ReviewsSection'));
const SocialProof = React.lazy(() => import('./components/SocialProof'));
const GuaranteeSection = React.lazy(() => import('./components/GuaranteeSection'));
const FAQSection = React.lazy(() => import('./components/FAQSection'));

import {
  Sun,
  Moon
} from 'lucide-react';

function SectionSkeleton({ darkMode }: { darkMode: boolean }) {
  const bgClass = darkMode ? 'bg-slate-800/40' : 'bg-slate-200/40';
  const textBgClass = darkMode ? 'bg-slate-800' : 'bg-slate-200';
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-pulse space-y-4">
      <div className={`h-6 ${textBgClass} rounded w-1/3 mx-auto`} />
      <div className={`h-24 ${bgClass} rounded-2xl w-full`} />
      <div className={`h-16 ${bgClass} rounded-2xl w-full`} />
    </div>
  );
}

interface LandingPageProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  setLang: React.Dispatch<React.SetStateAction<'ar' | 'en'>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function LandingPage({ t, lang, setLang, darkMode, setDarkMode }: LandingPageProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    trackViewContent();
  }, []);

  const handleToggleLang = React.useCallback(() => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  }, [setLang]);

  const handleToggleDarkMode = React.useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  const handleCheckout = React.useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* PERSISTENT TOP NAVIGATION WRAPPER */}
      <div className="fixed top-0 left-0 right-0 z-[60] w-full shadow-md flex flex-col">
        {/* HEADER / CTA */}
        <header className={`w-full backdrop-blur-md border-b transition-all duration-300 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-bold text-xl text-red-500 tracking-tight">Hagag <span className={darkMode ? 'text-white' : 'text-slate-900'}>Store</span></div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleToggleLang}
                className={`font-semibold text-xs px-2.5 py-1.5 rounded-md transition-colors ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}
                aria-label={lang === 'ar' ? "Switch to English" : "تغيير اللغة إلى العربية"}
              >
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>

              <button 
                onClick={handleToggleDarkMode}
                className={`p-1.5 rounded-lg border-2 transition-colors ${darkMode ? 'border-yellow-600/50 text-yellow-500 hover:bg-yellow-500/10' : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500/10'}`}
                aria-label={lang === 'ar' ? (darkMode ? "تفعيل الوضع المضيء" : "تفعيل الوضع المظلم") : (darkMode ? "Switch to light mode" : "Switch to dark mode")}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button 
                onClick={handleCheckout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)] mr-1"
              >
                {t.orderNow}
              </button>
            </div>
          </div>
        </header>

        {/* PERSISTENT ANNOUNCEMENT BAR */}
        <AlertBox lang={lang} />
      </div>

      <main className={`max-w-md mx-auto pb-20 pt-[108px] transition-all duration-300 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        {/* HERO SECTION */}
        <HeroSection t={t} />

        {/* PROBLEM SECTION */}
        <ProblemSection t={t} />

        {/* SOLUTION SECTION */}
        <SolutionSection t={t} />

        {/* TARGET AUDIENCE / SAFETY */}
        <SafetySection t={t} lang={lang} />

        {/* TECHNOLOGY EXPOSURE */}
        <TechSection t={t} />

        {/* PERFORMANCE CHART */}
        <React.Suspense fallback={<SectionSkeleton darkMode={darkMode} />}>
          <PerfSection t={t} lang={lang} />

          {/* SPECS SECTION */}
          <SpecsSection t={t} />

          {/* MINI FEATURES */}
          <MiniFeatures t={t} />

          {/* SOCIAL STATS AND PROOF */}
          <SocialProof t={t} lang={lang} darkMode={darkMode} />

          {/* REVIEWS SECTION */}
          <ReviewsSection t={t} lang={lang} darkMode={darkMode} />

          {/* BRAND & SERVICE GUARANTEES */}
          <GuaranteeSection t={t} lang={lang} darkMode={darkMode} />

          {/* FREQUENTLY ASKED QUESTIONS */}
          <FAQSection t={t} lang={lang} darkMode={darkMode} />

          {/* CTA FOOTER */}
          <CTASection t={t} setIsCheckout={handleCheckout} lang={lang} />
        </React.Suspense>
      </main>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
      <p className="text-zinc-400 text-sm font-medium">جاري التحميل...</p>
    </div>
  );
}

function AdminPageWrapper() {
  const navigate = useNavigate();
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <AdminDashboard onLogout={() => navigate('/')} />
    </React.Suspense>
  );
}

function CheckoutPageWrapper({ t, lang }: { t: typeof translations.ar; lang: 'ar' | 'en' }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    trackInitiateCheckout();
  }, []);

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <CheckoutPage onBack={() => navigate('/')} t={t} lang={lang} />
    </React.Suspense>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Update Canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.href);
  }, [pathname]);

  return null;
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const savedLang = localStorage.getItem('lang');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? savedMode === 'true' : true;
  });

  React.useEffect(() => {
    initMetaPixel();
  }, []);

  React.useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    // Dynamic SEO Metadata
    const isAr = lang === 'ar';
    const seoTitle = isAr 
      ? 'جهاز الحجامة الذكي المتكامل | راحة فورية لآلام الظهر والعضلات' 
      : 'Smart Integrated Cupping Device | Instant Relief for Back & Muscle Pain';
    const seoDesc = isAr
      ? 'تخلص من آلام الظهر وشد العضلات في 10 دقائق فقط مع جهاز الحجامة الذكي المتطور ذو تقنية الضوء الأحمر والتحكم الذكي بالحرارة والشفط لراحة تامة وأمنة لجميع أفراد العائلة.'
      : 'Relieve back pain and muscle tension in just 10 minutes with our advanced smart cupping therapy device. Built-in red light technology, smart temperature control, and adjustable suction for safe, comprehensive relief for the whole family.';

    document.title = seoTitle;

    // Helper to select or create meta tags
    const updateMeta = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const parts = selector.split('[');
        if (parts.length > 1) {
          const match = parts[1].match(/([a-zA-Z:-]+)=["']?([^"']+)["']?/);
          if (match) {
            element.setAttribute(match[1], match[2]);
          }
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    const ogImgUrl = window.location.origin + '/packgrowend.webp';
    updateMeta('meta[name="description"]', 'content', seoDesc);
    updateMeta('meta[property="og:title"]', 'content', seoTitle);
    updateMeta('meta[property="og:description"]', 'content', seoDesc);
    updateMeta('meta[property="og:image"]', 'content', ogImgUrl);
    updateMeta('meta[property="og:image:type"]', 'content', 'image/webp');
    updateMeta('meta[property="og:locale"]', 'content', isAr ? 'ar_AR' : 'en_US');
    updateMeta('meta[property="og:site_name"]', 'content', isAr ? 'سيم S3EM' : 'S3EM');
    updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMeta('meta[name="twitter:image"]', 'content', ogImgUrl);
  }, [lang]);

  React.useEffect(() => {
    // Add permanent layout and typography classes
    const permanentClasses = ['font-tajawal', 'overflow-x-hidden', 'antialiased'];
    permanentClasses.forEach(cls => document.body.classList.add(cls));

    return () => {
      permanentClasses.forEach(cls => document.body.classList.remove(cls));
    };
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark', 'bg-slate-900', 'text-white');
      document.documentElement.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-900', 'text-white');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
      document.documentElement.classList.add('bg-slate-50', 'text-slate-900');
      document.documentElement.classList.remove('dark', 'bg-slate-900', 'text-white');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-slate-900', 'text-white');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const t = translations[lang];

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                t={t} 
                lang={lang} 
                setLang={setLang} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
              />
            } 
          />
          <Route 
            path="/admin-secret" 
            element={
              <AdminPageWrapper />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPageWrapper t={t} lang={lang} />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
