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
  Truck,
  RefreshCcw,
  Headset,
  ChevronDown,
  Sun,
  Moon,
  Lock
} from 'lucide-react';

// ... (باقي مكونات ProblemImage و CheckoutPage كما هي في كودك) ...

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || window.location.pathname);
  const [isCheckout, setIsCheckout] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(true);

  // ... (useEffect الخاص بالـ Path والـ Lang والـ DarkMode كما هو) ...

  const t = translations[lang];

  if (currentPath === '#/admin-secret' || currentPath === '/admin-secret') {
    return <AdminDashboard onLogout={() => {
      window.history.pushState({}, '', '/');
      window.location.hash = '';
      setCurrentPath('/');
    }} />;
  }

  if (isCheckout) {
    return <CheckoutPage onBack={() => setIsCheckout(false)} t={t} lang={lang} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* ... (الهيدر والهيرو وكل الأقسام السابقة كما هي) ... */}

      {/* CTA FOOTER */}
      <section className="bg-zinc-950 border-t border-zinc-800 relative pb-24 flex flex-col">
        <div className="relative w-full h-[400px]">
          <img src="/cta-bg.png" alt="CTA" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent h-32" />
        </div>
        
        <div className="relative px-4 pb-12 pt-8 text-center z-10">
          <h2 className="text-3xl font-black text-white mb-2">{t.ctaTitle}</h2>
          <p className="text-zinc-400 font-medium mb-8">{t.ctaDesc}</p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8 text-xs font-bold text-zinc-300">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="text-green-500" size={16} /> {t.quality}</div>
            <div className="flex items-center gap-1.5"><Truck className="text-red-500" size={16} /> {t.fastShipping}</div>
            <div className="flex items-center gap-1.5"><RefreshCcw className="text-blue-500" size={16} /> {t.returnPolicy}</div>
          </div>
        </div>
      </section>

      {/* STICKY FOOTER CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 z-50">
        <button 
          onClick={() => setIsCheckout(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform active:scale-95"
        >
          {t.orderNow}
        </button>
      </div>
    </div>
  );
}
