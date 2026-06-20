import React from 'react';
import { translations } from '../translations';

interface SolutionSectionProps {
  t: typeof translations.ar;
}

const SolutionSection = React.memo(function SolutionSection({ t }: SolutionSectionProps) {
  return (
    <section className="flex flex-col bg-zinc-950 border-y border-zinc-800 relative z-10">
      <div className="relative w-full h-[400px]">
        <img 
          src="/solution.webp" 
          alt="Solution" 
          width={448} 
          height={400} 
          loading="lazy" 
          sizes="(max-width: 448px) 100vw, 448px" 
          className="w-full h-full object-cover object-center opacity-80" 
          style={{ aspectRatio: '448 / 400' }}
        />
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
  );
});

export default SolutionSection;
