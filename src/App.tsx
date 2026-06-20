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
      className={`aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800 transition-all duration-300 relative cursor-pointer ${isActive ? 'grayscale-0 ring-1 ring-red-500' : 'grayscale'}`}
    >
      <img 
        src={src} 
        alt={alt}
        width="300"
        height="400"
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
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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
          </div>
          <button onClick={onBack} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
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
        
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex gap-4 mb-8">
          <div className="w-24 h-24 bg-slate-700 rounded-xl overflow-hidden shrink-0">
            <img src="/hero.webp" alt="Product" width="96" height="96" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between py-1">
            <div>
              <h3 className="font-bold text-lg leading-tight mb-2">{t.productName}</h3>
              <div className="inline-block bg-teal-500/20 text-teal-400 text-xs font-bold px-2 py-1 rounded">{t.freeShipping}</div>
            </div>
            <div className="font-black text-xl text-white">{t.price}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold mb-4">{t.deliveryInfo}</h2>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.fullName}</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={isLoading} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500" placeholder={t.fullNamePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.phone}</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isLoading} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-right focus:outline-none focus:border-teal-500" dir="ltr" placeholder={t.phonePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.governorate}</label>
              <select value={formData.governorate} onChange={(e) => setFormData({...formData, governorate: e.target.value})} disabled={isLoading} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500">
                <option value="">{t.govSelect}</option>
                {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">{t.addressDetails}</label
