import React from 'react';
import { translations } from '../translations';

interface SafetySectionProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
}

const SafetySection = React.memo(function SafetySection({ t, lang }: SafetySectionProps) {
  return (
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
              <img 
                src="/images/avatar_child.jpg" 
                alt="Child" 
                width={64} 
                height={64} 
                loading="lazy" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full" 
                style={{ aspectRatio: '1 / 1' }}
              />
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
              <img 
                src="/images/avatar_athlete.jpg" 
                alt="Athlete" 
                width={64} 
                height={64} 
                loading="lazy" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full" 
                style={{ aspectRatio: '1 / 1' }}
              />
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
              <img 
                src="/images/avatar_elder.jpg" 
                alt="Elder" 
                width={64} 
                height={64} 
                loading="lazy" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full" 
                style={{ aspectRatio: '1 / 1' }}
              />
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
  );
});

export default SafetySection;
