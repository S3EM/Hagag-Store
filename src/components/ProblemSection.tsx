import React, { useState } from 'react';
import { translations } from '../translations';

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
      style={{ aspectRatio: '3 / 4' }}
    >
      <img 
        src={src} 
        alt={alt} 
        width={140}
        height={186}
        loading="lazy"
        sizes="(max-width: 448px) 33vw, 140px"
        className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`} 
        style={{ aspectRatio: '3 / 4' }}
      />
    </div>
  );
}

interface ProblemSectionProps {
  t: typeof translations.ar;
}

const ProblemSection = React.memo(function ProblemSection({ t }: ProblemSectionProps) {
  return (
    <section className="px-4 py-10 bg-zinc-900/30 border-y border-white/5 relative">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t.problemTitle1} <br />
        <span className="text-red-500 text-3xl block mt-2">{t.problemTitle2}</span>
      </h2>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        <ProblemImage src="/photo6.webp" alt={t.pain1} />
        <ProblemImage src="/photo7.webp" alt={t.pain2} />
        <ProblemImage src="/photo8.webp" alt={t.pain3} />
      </div>
      
      <p className="text-center text-sm text-zinc-400 font-medium leading-relaxed px-2">
        {t.problemDesc}
      </p>
    </section>
  );
});

export default ProblemSection;
