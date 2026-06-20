import React from 'react';
import { translations } from '../translations';

interface PerfSectionProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
}

const PerfSection = React.memo(function PerfSection({ t, lang }: PerfSectionProps) {
  return (
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
                  <img 
                    src="/one.webp" 
                    alt="Device" 
                    width={64} 
                    height={64} 
                    loading="lazy" 
                    sizes="64px" 
                    className="w-full h-full object-cover" 
                    style={{ aspectRatio: '1 / 1' }}
                  />
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
  );
});

export default PerfSection;
