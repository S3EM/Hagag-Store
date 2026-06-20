import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { translations } from './translations';

const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
const CheckoutPage = React.lazy(() => import('./CheckoutPage'));

import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import SafetySection from './components/SafetySection';
import TechSection from './components/TechSection';
import PerfSection from './components/PerfSection';
import SpecsSection from './components/SpecsSection';
import MiniFeatures from './components/MiniFeatures';
import CTASection from './components/CTASection';

import {
  Sun,
  Moon
} from 'lucide-react';

interface LandingPageProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  setLang: React.Dispatch<React.SetStateAction<'ar' | 'en'>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function LandingPage({ t, lang, setLang, darkMode, setDarkMode }: LandingPageProps) {
  const navigate = useNavigate();

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
      {/* HEADER / CTA */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
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

      <main className={`max-w-md mx-auto pb-20 pt-16 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
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
        <PerfSection t={t} lang={lang} />

        {/* SPECS SECTION */}
        <SpecsSection t={t} />

        {/* MINI FEATURES */}
        <MiniFeatures t={t} />

        {/* CTA FOOTER */}
        <CTASection t={t} setIsCheckout={handleCheckout} lang={lang} />
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
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <CheckoutPage onBack={() => navigate('/')} t={t} lang={lang} />
    </React.Suspense>
  );
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(true);

  React.useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
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
      document.body.classList.add('bg-slate-900', 'text-white');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-slate-900', 'text-white');
    }
  }, [darkMode]);

  const t = translations[lang];

  return (
    <Router>
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
  );
}
