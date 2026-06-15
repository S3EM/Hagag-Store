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

function CheckoutPage({ onBack, t, lang }: { onBack: () => void, t: typeof translations.ar, lang: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', governorate: '', address: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', governorate: '', address: '' });

  const governorates = t.govs;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let newErrors = { name: '', phone: '', governorate: '', address: '' };
    let isValid = true;

    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) {
      newErrors.name = t.nameError;
      isValid = false;
    }

    // Phone validation: starts with 01, followed by 9 digits
    if (!/^01\d{9}$/.test(formData.phone)) {
      newErrors.phone = t.phoneError;
      isValid = false;
    }

    if (!formData.governorate) {
      newErrors.governorate = t.govError;
      isValid = false;
    }

    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = t.addressError;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsLoading(true);
      try {
        const generatedId = `HG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const payload = {
          orderId: generatedId,
          name: formData.name,
          phone: formData.phone,
          gov: formData.governorate,
          address: formData.address,
          product: "جهاز الحجامة الذكي",
          timestamp: new Date().toISOString()
        };

        await fetch('https://script.google.com/macros/s/AKfycbwMwoEOrZ1SagOwOojfTqL0DPQN0yObc3Ai4dN-wmfDxwkt6S_ftq8JBxG6P9Nhb3xv2g/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        setCurrentOrderId(generatedId);
        setIsSuccess(true);
      } catch (error) {
        console.error('Submission error:', error);
        alert(t.networkError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-sm w-full border border-teal-500/20">
          <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t.successTitle}</h2>
          <p className="text-slate-400 text-sm mb-6">{t.successDesc}</p>
          
          <div className="bg-slate-900/50 rounded-xl p-4 mb-8 border border-slate-700">
            <p className="text-slate-300 font-medium mb-1">{t.orderIdPrefix} <span className="font-bold text-white text-lg tracking-wider block mt-1">{currentOrderId}</span></p>
            <p className="text-xs text-slate-500 mt-3">{t.keepOrderInfo}</p>
          </div>

          <button 
            onClick={onBack}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
          >
            {t.backHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <header className="sticky top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ChevronDown className={lang === 'ar' ? "rotate-90" : "-rotate-90"} size={18} />
            <span className="font-medium text-sm">{t.backHome}</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white border-b border-slate-800 pb-4">{t.checkoutTitle}</h1>

        {/* Product Summary */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex gap-4 mb-8">
          <div className="w-24 h-24 bg-slate-700 rounded-xl overflow-hidden shrink-0">
            <img src="/hero.png" alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between py-1">
            <div>
              <h3 className="font-bold text-lg leading-tight mb-2">{t.productName}</h3>
              <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold px-2 py-1 rounded">
                {t.freeShipping}
              </div>
            </div>
            <div className="font-black text-xl text-white">{t.price}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold mb-4">{t.deliveryInfo}</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.fullName}</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={isLoading}
                className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-slate-500 disabled:opacity-50`} 
                placeholder={t.fullNamePlaceholder} 
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.phone}</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={isLoading}
                className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white text-right focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-slate-500 disabled:opacity-50`} 
                placeholder={t.phonePlaceholder} 
                dir="ltr" 
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1.5 text-right">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.governorate}</label>
              <div className="relative">
                <select 
                  value={formData.governorate}
                  onChange={(e) => setFormData({...formData, governorate: e.target.value})}
                  disabled={isLoading}
                  className={`w-full bg-slate-800 border ${errors.governorate ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50`}
                >
                  <option value="">{t.govSelect}</option>
                  {governorates.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                <div className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 pointer-events-none text-slate-400`}>
                  <ChevronDown size={16} />
                </div>
              </div>
              {errors.governorate && <p className="text-red-400 text-xs mt-1.5">{errors.governorate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.addressDetails}</label>
              <textarea 
                rows={3} 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                disabled={isLoading}
                className={`w-full bg-slate-800 border ${errors.address ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none placeholder:text-slate-500 disabled:opacity-50`} 
                placeholder={t.addressPlaceholder}
              ></textarea>
              {errors.address && <p className="text-red-400 text-xs mt-1.5">{errors.address}</p>}
            </div>
          </div>

          {/* Total & Submit */}
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-6">
            <div className="flex justify-between items-center mb-3 text-slate-300">
              <span>{t.total}</span>
              <span>{t.price}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-slate-300">
              <span>{t.delivery}</span>
              <span className="text-teal-400 font-bold">{t.free}</span>
            </div>
            <div className="h-px bg-slate-700 w-full mb-4" />
            <div className="flex justify-between items-center font-black text-xl mb-6">
              <span>{t.grandTotal}</span>
              <span className="text-teal-400">{t.price}</span>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-teal-700 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(13,148,136,0.4)] transition-all flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.sending}
                </>
              ) : (
                t.confirmOrder
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={16} /> {t.safeCash}
        </p>
      </main>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || window.location.pathname);
  const [isCheckout, setIsCheckout] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.hash || window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  React.useEffect(() => {
    if (darkMode) {
      document.body.className = 'bg-slate-900 text-white font-tajawal overflow-x-hidden antialiased';
    } else {
      document.body.className = 'bg-slate-50 text-slate-900 font-tajawal overflow-x-hidden antialiased';
    }
  }, [darkMode]);

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
      {/* HEADER / CTA */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-xl text-red-500 tracking-tight">Hagag <span className={darkMode ? 'text-white' : 'text-slate-900'}>Store</span></div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`font-semibold text-xs px-2.5 py-1.5 rounded-md transition-colors ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 rounded-lg border-2 transition-colors ${darkMode ? 'border-yellow-600/50 text-yellow-500 hover:bg-yellow-500/10' : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500/10'}`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
              onClick={() => setIsCheckout(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)] mr-1">
              {t.orderNow}
            </button>
          </div>
        </div>
      </header>

      <main className={`max-w-md mx-auto pb-20 pt-16 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        
        {/* HERO SECTION */}
        <section className="relative px-4 py-12 flex flex-col items-center text-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-red-900/20 blur-[100px] pointer-events-none rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 mb-8 shadow-2xl backdrop-blur-sm"
          >
            <h1 className="text-3xl font-black text-white leading-tight mb-4">
              {t.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">{t.heroTitle2}</span>
            </h1>
            <p className="text-zinc-300 text-sm font-medium leading-relaxed">
              {t.heroDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-72 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.3)] border border-red-500/20"
          >
            <img 
              src="/hero.png" 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </motion.div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="px-4 py-10 bg-zinc-900/30 border-y border-white/5 relative">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t.problemTitle1} <br />
            <span className="text-red-500 text-3xl block mt-2">{t.problemTitle2}</span>
          </h2>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            <ProblemImage src="/pain1.png" alt={t.pain1} />
            <ProblemImage src="/pain2.png" alt={t.pain2} />
            <ProblemImage src="/pain3.png" alt={t.pain3} />
          </div>
          
          <p className="text-center text-sm text-zinc-400 font-medium leading-relaxed px-2">
            {t.problemDesc}
          </p>
        </section>

        {/* SOLUTION SECTION */}
        <section className="flex flex-col bg-zinc-950 border-y border-zinc-800 relative z-10">
          <div className="relative w-full h-[400px]">
            <img src="/solution.webp" alt="Solution" className="w-full h-full object-cover object-center opacity-80" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent h-48" />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-transparent h-24" />
          </div>
          <div className="relative z-10 px-4 pb-12 -mt-6">
            <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-red-900/10 blur-xl" />
              <p className="text-white text-sm font-medium leading-relaxed relative z-10">
                {t.solutionDesc}
              </p>
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE / SAFETY */}
        <section className="px-4 py-12 bg-zinc-900/50 border-y border-white/5 relative overflow-hidden">
          {/* Sci-Fi rings background */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
             <div className="w-[800px] h-[800px] rounded-full border border-red-500" />
             <div className="absolute w-[600px] h-[600px] rounded-full border border-red-500" />
             <div className="absolute w-[400px] h-[400px] rounded-full border border-red-500" />
          </div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="inline-block text-3xl font-black text-white border-y border-red-500/30 px-6 py-2 bg-red-950/20 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              {t.safeTitle}
            </h2>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Child */}
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 p-0.5 relative z-10">
                  <img src="https://images.unsplash.com/photo-1588534827557-0477123bc65b?w=200&q=80" alt="Child" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full -z-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-300 leading-snug">
                  {t.childDesc} <span className="text-red-400 font-bold ml-1 text-xs px-1.5 py-0.5 bg-red-500/10 rounded">20-40</span>
                </p>
              </div>
            </div>

            {/* Athlete */}
            <div className={`flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm flex-row-reverse text-left ${lang === 'en' ? 'mr-4' : 'ml-4'}`}>
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 p-0.5 relative z-10">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80" alt="Athlete" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full -z-10" />
              </div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-zinc-300 leading-snug">
                  {t.athleteDesc} <span className="text-red-400 font-bold ml-1 text-xs px-1.5 py-0.5 bg-red-500/10 rounded">30-40+</span>
                </p>
              </div>
            </div>

            {/* Elder */}
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 p-0.5 relative z-10">
                  <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80" alt="Elder" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full -z-10" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-300 leading-snug">
                  {t.elderDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY EXPOSURE */}
        <section className="flex flex-col bg-zinc-950 border-y border-red-500/20 mt-8">
          {/* Image Container */}
          <div className="relative w-full h-[500px]">
            <img 
              src="/technology.png" 
              alt="Technology" 
              className="w-full h-full object-cover object-center opacity-90"
            />
            {/* Gradients to blend with page */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent h-48" />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-zinc-950/90 via-transparent to-transparent h-24" />
          </div>
          
          <div className="relative z-10 text-center px-4 pb-12 -mt-16">
             <h2 className="text-2xl font-bold text-red-500 mb-5 relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
               {t.techTitle1} <br/> <span className="text-white text-3xl drop-shadow-lg">{t.techTitle2}</span>
             </h2>
             <div className="relative">
               <div className="absolute inset-0 bg-red-900/20 blur-xl rounded-full" />
               <p className="relative z-20 text-sm text-zinc-300 font-medium leading-relaxed bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl border border-red-500/30 shadow-2xl">
                 {t.techDesc}
               </p>
             </div>
          </div>
        </section>

        {/* PERFORMANCE CHART */}
        <section className="px-4 py-12 bg-zinc-900/30">
           <h2 className="text-2xl font-bold text-center mb-8">{t.perfTitle}</h2>
           
           <div className="bg-black/60 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
              {/* Fake Radar/Pie Chart concept using bars representing radar spokes */}
              <div className="flex justify-between items-center mb-8 relative">
                 <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    {/* Concentric Circles for Chart */}
                    <div className="absolute inset-0 rounded-full border border-zinc-800" />
                    <div className="absolute inset-4 rounded-full border border-zinc-800" />
                    <div className="absolute inset-8 rounded-full border border-zinc-700" />
                    
                    {/* SVG Shape to simulate the red area */}
                    <svg className="absolute inset-0 w-full h-full text-red-500/80 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" viewBox="0 0 100 100">
                      <polygon points="50,10 90,40 70,90 20,80 10,40" fill="currentColor" stroke="#f87171" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    
                    <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 bg-zinc-900 shadow-lg">
                      <img src="/performance.png" alt="Device" className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <div className={`flex-1 space-y-4 text-xs font-bold ${lang === 'en' ? 'ml-4' : 'mr-4'}`}>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>{t.speed}</span>
                      <div className="flex-1 mx-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                        <div className="h-full bg-red-500 w-[100%]" />
                      </div>
                      <span className={`w-8 text-red-400 ${lang === 'en' ? 'text-right' : 'text-left'}`}>100%</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>{t.efficiency}</span>
                      <div className="flex-1 mx-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                        <div className="h-full bg-red-500 w-[100%]" />
                      </div>
                      <span className={`w-8 text-red-400 ${lang === 'en' ? 'text-right' : 'text-left'}`}>100%</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>{t.comfort}</span>
                      <div className="flex-1 mx-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                        <div className="h-full bg-red-500 w-[100%]" />
                      </div>
                      <span className={`w-8 text-red-400 ${lang === 'en' ? 'text-right' : 'text-left'}`}>100%</span>
                    </div>
                 </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed text-center">
                {t.perfDesc}
              </p>
           </div>
        </section>

        {/* SPECS SECTION */}
        <section className="px-4 py-12 bg-white text-zinc-900 rounded-t-[2.5rem] mt-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black">{t.specsTitle}</h2>
          </div>

          <div className="space-y-8">
            {/* Spec 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                <Battery size={24} />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  {t.spec1Title}
                </h3>
                <p className="text-sm text-zinc-600 font-medium">{t.spec1Desc}</p>
              </div>
            </div>

            {/* Spec 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                <Wind size={24} />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  {t.spec2Title}
                </h3>
                <p className="text-sm text-zinc-600 font-medium">{t.spec2Desc}</p>
              </div>
            </div>

            {/* Spec 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  {t.spec3Title}
                </h3>
                <p className="text-sm text-zinc-600 font-medium">{t.spec3Desc}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-10 w-full overflow-hidden">
            <img src="/spec2.png" alt="Specs" className="rounded-2xl object-contain w-full h-auto bg-zinc-50 border border-zinc-100 shadow-sm" />
          </div>
        </section>

        {/* MINI FEATURES */}
        <section className="px-4 py-12 bg-zinc-50 text-zinc-900 border-t border-zinc-200">
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <Package className="text-red-500 shrink-0" size={32} />
              <div>
                <h4 className="font-bold">{t.feature1Title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{t.feature1Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <Zap className="text-red-500 shrink-0" size={32} />
              <div>
                <h4 className="font-bold">{t.feature2Title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{t.feature2Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
              <Heart className="text-red-500 shrink-0" size={32} />
              <div>
                <h4 className="font-bold">{t.feature3Title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{t.feature3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="bg-zinc-950 border-t border-zinc-800 relative pb-env-bottom flex flex-col">
          <div className="relative w-full h-[400px]">
            <img 
              src="/cta-bg.png" 
              alt="CTA" 
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent h-32" />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-transparent h-16" />
          </div>
          
          <div className="relative px-4 pb-28 pt-8 text-center z-10">
            <h2 className="text-3xl font-black text-white mb-2">{t.ctaTitle}</h2>
            <p className="text-zinc-400 font-medium mb-8">{t.ctaDesc}</p>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8 text-xs font-bold text-zinc-300">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="text-green-500" size={16} /> {t.quality}</div>
              <div className="flex items-center gap-1.5"><Truck className="text-green-500" size={16} /> {t.fastDelivery}</div>
              <div className="flex items-center gap-1.5"><Headset className="text-green-500" size={16} /> {t.support}</div>
            </div>

            {/* Secret Admin Link */}
            <div className="flex justify-center mt-2 mb-10">
              <button 
                onClick={() => {
                  window.location.hash = '#/admin-secret';
                }}
                className="opacity-10 hover:opacity-100 transition-opacity text-white p-2 rounded-full"
                title="Admin Dashboard"
              >
                <Lock size={12} />
              </button>
            </div>

            {/* Sticky Buy Button Container */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-zinc-950/90 backdrop-blur border-t border-zinc-800 z-50">
              <div className="flex gap-4">
                <div className="bg-zinc-900 rounded-xl px-4 py-3 border border-zinc-800 flex flex-col justify-center items-center shrink-0 w-1/3">
                  <span className="text-xs text-zinc-400">{t.priceLabel}</span>
                  <span className="font-black text-xl text-white">{t.priceValue} <span className="text-xs">{t.currency}</span></span>
                </div>
                <button 
                  onClick={() => setIsCheckout(true)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2">
                  {t.orderNow}
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

