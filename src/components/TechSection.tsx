import React from 'react';
import { translations } from '../translations';

interface TechSectionProps {
  t: typeof translations.ar;
}

const TechSection = React.memo(function TechSection({ t }: TechSectionProps) {
  return (
    <section className="flex flex-col bg-zinc-950 border-y border-red-500/20 mt-8">
      {/* Image Container */}
      <div className="relative w-full h-[500px]">
        <img 
          src="/red.webp" 
          alt="Technology" 
          width={448}
          height={500}
          loading="lazy"
          sizes="(max-width: 448px) 100vw, 448px"
          className="w-full h-full object-cover object-center opacity-90"
          style={{ aspectRatio: '448 / 500' }}
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
  );
});

export default TechSection;
