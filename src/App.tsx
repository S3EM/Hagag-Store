import React, { useState } from 'react';
import { motion } from 'motion/react';
import { translations } from './translations';
import AdminDashboard from './AdminDashboard';
import {
  Battery,
  Wind,
  ShieldCheck,
  Package,
  Zap,
  CheckCircle2,
  ChevronDown,
  Truck,
  RefreshCcw
} from 'lucide-react';

// ... (دالة ProblemImage و CheckoutPage كما هما في كودك) ...

export default function App() {
  const [isCheckout, setIsCheckout] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = translations[lang];

  if (isCheckout) {
    return <CheckoutPage onBack={() => setIsCheckout(false)} t={t} lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-800 bg-slate-900/80">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-xl text-red-500">Hagag <span className="text-white">Store</span></div>
          <button onClick={() => setIsCheckout(true)} className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">{t.orderNow}</button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-20 pt-16">
        {/* Hero Section */}
        <section className="px-4 py-12 flex flex-col items-center text-center">
          <h1 className="text-3xl font-black text-white leading-tight mb-4">{t.heroTitle1} <br /> <span className="text-red-500">{t.heroTitle2}</span></h1>
          <img src="/hero.webp" alt="Hero" className="w-full rounded-2xl mb-8" />
        </section>

        {/* Features Section */}
        <section className="px-4 py-8">
           <img src="/features.webp" alt="Features" className="w-full rounded-2xl" />
        </section>

        {/* Problem Section - تأكد أن الأسماء تطابق ما في public */}
        <section className="px-4 py-8 grid grid-cols-2 gap-4">
           <img src="/pain1.webp" alt="Problem" className="rounded-xl" />
           <img src="/pain2.webp" alt="Problem" className="rounded-xl" />
        </section>

        {/* Specs Section */}
        <section className="px-4 py-8">
           <img src="/specs.webp" alt="Specs" className="w-full rounded-2xl" />
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-6">{t.ctaTitle}</h2>
          <button onClick={() => setIsCheckout(true)} className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-lg">
            {t.orderNow}
          </button>
        </section>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 border-t border-slate-800 z-50">
        <button onClick={() => setIsCheckout(true)} className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold">
          {t.orderNow}
        </button>
      </div>
    </div>
  );
}
