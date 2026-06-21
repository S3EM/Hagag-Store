import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, Headset } from 'lucide-react';
import { translations } from '../translations';

interface CTASectionProps {
  t: typeof translations.ar;
  setIsCheckout: (checkout: boolean) => void;
  lang: 'ar' | 'en';
}

const CTASection = React.memo(function CTASection({ t, setIsCheckout, lang }: CTASectionProps) {
  return (
    <section className="bg-zinc-950 rounded-t-[2.5rem] overflow-hidden relative pb-env-bottom flex flex-col -mt-8 border-t border-zinc-850 shadow-[0_-12px_40px_rgba(0,0,0,0.3)]">
      <div className="relative w-full h-[400px] overflow-hidden rounded-t-[2.5rem]">
        <img 
          src="/photo4.webp" 
          alt="CTA" 
          width={448}
          height={400}
          loading="lazy"
          sizes="(max-width: 448px) 100vw, 448px"
          className="w-full h-full object-cover object-center opacity-90 rounded-t-[2.5rem]"
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
          <Link 
            to="/admin-secret"
            className="opacity-[0.02] hover:opacity-100 transition-opacity text-zinc-650 p-1 bg-zinc-900 rounded-full w-2 h-2"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          />
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
  );
});

export default CTASection;
