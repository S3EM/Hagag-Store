import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { translations } from './translations';
import AdminDashboard from './AdminDashboard';
import {
  Battery,
  Wind,
  ShieldCheck,
  Package,
  Zap,
  Heart,
  CheckCircle2,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';

function ProblemImage({ src, alt }: { src: string; alt: string }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div 
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
      className={`aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800 transition-all duration-300 relative cursor-pointer ${isActive ? 'grayscale-0 ring-1 ring-red-500' : 'grayscale'}`}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`} 
      />
    </div>
  );
}

// [وظائف CheckoutPage كما هي تماماً]
// (تم اختصارها هنا لتوفير المساحة، تأكد من إبقائها كاملة في ملفك)

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || window.location.pathname);
  const [isCheckout, setIsCheckout] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(true);

  // ... (تأثيرات useEffect كما هي في كودك) ...

  const t = translations[lang];

  if (isCheckout) {
    return <CheckoutPage onBack={() => setIsCheckout(false)} t={t} lang={lang} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-xl text-red-500 tracking-tight">Hagag <span className={darkMode ? 'text-white' : 'text-slate-900'}>Store</span></div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="font-semibold text-xs px-2.5 py-1.5 rounded-md bg-slate-800 text-slate-200">{lang === 'ar' ? 'EN' : 'AR'}</button>
            <button onClick={() => setIsCheckout(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-bold">{t.orderNow}</button>
          </div>
        </div>
      </header>

      <main className={`max-w-md mx-auto pb-20 pt-16 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        {/* HERO SECTION */}
        <section className="relative px-4 py-12 flex flex-col items-center text-center overflow-hidden">
          <img src="/hero1.webp" alt="Hero" className="w-full rounded-2xl" />
        </section>

        {/* PROBLEM SECTION */}
        <section className="px-4 py-10 bg-zinc-900/30 border-y border-white/5">
          <div className="grid grid-cols-3 gap-2 mb-6">
            <ProblemImage src="/hero2.webp" alt="Pain 1" />
            <ProblemImage src="/hero3.webp" alt="Pain 2" />
            <ProblemImage src="/hero4.webp" alt="Pain 3" />
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="relative w-full h-[400px]">
          <img src="/hero5.webp" alt="Solution" className="w-full h-full object-cover" />
        </section>

        {/* TECH EXPOSURE */}
        <section className="relative w-full h-[500px]">
          <img src="/hero6.webp" alt="Technology" className="w-full h-full object-cover" />
        </section>

        {/* CTA FOOTER */}
        <section className="relative w-full h-[400px]">
          <img src="/hero7.webp" alt="CTA" className="w-full h-full object-cover" />
        </section>
      </main>
    </div>
  );
}
