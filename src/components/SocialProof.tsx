import React from 'react';
import { Users, Truck, Sparkles, Star } from 'lucide-react';
import { translations } from '../translations';

interface SocialProofProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  darkMode: boolean;
}

const SocialProof = React.memo(function SocialProof({ t, lang, darkMode }: SocialProofProps) {
  const isAr = lang === 'ar';

  const stats = [
    {
      icon: Users,
      number: isAr ? "+١٢٠٠" : "1,200+",
      label: isAr ? "عميل سعيد بالنتائج" : "Happy Customers",
      desc: isAr ? "تخلصوا من آلام الظهر وشد العضلات" : "Found relief from chronic muscle pain"
    },
    {
      icon: Truck,
      number: isAr ? "+٥٠٠" : "500+",
      label: isAr ? "شحن آمن ناجح" : "Successful Deliveries",
      desc: isAr ? "توصيل آمن وسريع لجميع المحافظات" : "Free & safe delivery across Egypt"
    },
    {
      icon: Sparkles,
      number: "4.9",
      label: isAr ? "تقييم الرضا العام" : "Overall Satisfaction Rating",
      isRating: true,
      desc: isAr ? "من بين مئات المراجعات الموثقة للعملاء" : "Based on hundreds of verified online reviews"
    }
  ];

  return (
    <section 
      id="social-proof-section" 
      className={`px-4 py-8 relative transition-colors border-b ${
        darkMode 
          ? 'bg-slate-900/30 border-slate-900/80 text-white' 
          : 'bg-white border-slate-100 text-zinc-900'
      }`}
    >
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all duration-300 relative group flex flex-col justify-between ${
                  darkMode 
                    ? 'bg-slate-950/40 border-zinc-800/60 hover:border-red-500/20' 
                    : 'bg-slate-50/80 border-slate-200/50 hover:border-red-500/10 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Miniature Top Icon Accent */}
                  <div className="mx-auto w-7 h-7 rounded-lg bg-red-500/10 dark:bg-red-500/15 text-red-500 flex items-center justify-center mb-2">
                    <Icon size={14} className="stroke-[2.5]" />
                  </div>

                  {/* High Accent Bold Number */}
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="font-extrabold text-lg md:text-xl tracking-tight text-red-500 font-sans">
                      {stat.number}
                    </span>
                    {stat.isRating && (
                      <Star size={11} fill="currentColor" className="text-amber-400 stroke-none mb-1 shrink-0" />
                    )}
                  </div>
                </div>

                <div className="mt-1.5">
                  <h3 className={`font-bold text-[10px] md:text-xs leading-snug ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                    {stat.label}
                  </h3>
                  <p className={`text-[8px] md:text-[9px] mt-0.5 leading-normal ${darkMode ? 'text-zinc-500' : 'text-slate-400 font-medium'}`}>
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default SocialProof;
