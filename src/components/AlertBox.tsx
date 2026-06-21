import React from 'react';
import { Sparkles } from 'lucide-react';

interface AlertBoxProps {
  lang: 'ar' | 'en';
}

export default function AlertBox({ lang }: AlertBoxProps) {
  const isAr = lang === 'ar';

  const textAr = (
    <span className="leading-relaxed">
      🚀 <strong className="text-red-400 font-extrabold">توصيل سريع ومجاني!</strong>{' '}
      <span className="inline-block animate-pulse duration-1000 scale-110">🎁</span> اطلب جهازك الآن من{' '}
      <span className="text-white font-bold underline decoration-red-500 decoration-2 underline-offset-4 bg-red-950/60 px-1.5 py-0.5 rounded">Hagag Store</span>
      ، وسنتكفل نحن بمصاريف الشحن حتى باب بيتك.
    </span>
  );

  const textEn = (
    <span className="leading-relaxed">
      🚀 <strong className="text-red-400 font-extrabold">Fast & Free Delivery!</strong>{' '}
      <span className="inline-block animate-pulse duration-1000 scale-110">🎁</span> Order your device now from{' '}
      <span className="text-white font-bold underline decoration-red-500 decoration-2 underline-offset-4 bg-red-950/60 px-1.5 py-0.5 rounded">Hagag Store</span>
      , and we'll cover the shipping costs directly to your door!
    </span>
  );

  return (
    <div
      id="shipping-alert-banner"
      className="relative w-full overflow-hidden bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 border-b border-red-500/20 shadow-[0_2px_15px_rgba(220,38,38,0.2)] backdrop-blur-md"
    >
      {/* Decorative top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      
      <div 
        className="max-w-md mx-auto px-4 py-2 flex items-center justify-center text-center text-[11px] md:text-xs text-zinc-100 font-semibold"
        style={{ direction: isAr ? 'rtl' : 'ltr' }}
      >
        <div className="flex items-center justify-center gap-2 select-none py-0.5">
          {/* Subtle pulsing/spinning sparkles */}
          <Sparkles size={11} className="text-red-400 animate-pulse shrink-0" />
          
          <div className="leading-relaxed text-zinc-200">
            {isAr ? textAr : textEn}
          </div>
          
          <Sparkles size={11} className="text-red-400 animate-pulse shrink-0" />
        </div>
      </div>
      
      {/* Subtle laser highlight pulse */}
      <div className="absolute -left-1/4 top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-red-500/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />
    </div>
  );
}

