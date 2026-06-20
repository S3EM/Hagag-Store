import React from 'react';
import { Battery, Wind, ShieldCheck } from 'lucide-react';
import { translations } from '../translations';

interface SpecCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
}

function SpecCard({ icon: Icon, title, desc }: SpecCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
        <Icon size={24} />
      </div>
      <div className="pt-1">
        <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 font-medium">{desc}</p>
      </div>
    </div>
  );
}

interface SpecsSectionProps {
  t: typeof translations.ar;
}

const SpecsSection = React.memo(function SpecsSection({ t }: SpecsSectionProps) {
  return (
    <section className="px-4 py-12 bg-white text-zinc-900 rounded-t-[2.5rem] mt-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black">{t.specsTitle}</h2>
      </div>

      <div className="space-y-8">
        <SpecCard icon={Battery} title={t.spec1Title} desc={t.spec1Desc} />
        <SpecCard icon={Wind} title={t.spec2Title} desc={t.spec2Desc} />
        <SpecCard icon={ShieldCheck} title={t.spec3Title} desc={t.spec3Desc} />
      </div>

      <div className="flex flex-col gap-6 mt-10 w-full overflow-hidden">
        <div className="relative w-full aspect-[448/288] bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <img 
            src="/rrrr.webp" 
            alt="Specs" 
            width={448} 
            height={288} 
            loading="lazy" 
            sizes="(max-width: 448px) 100vw, 448px" 
            className="rounded-2xl object-contain w-full h-full" 
            style={{ aspectRatio: '448 / 288' }}
          />
        </div>
      </div>
    </section>
  );
});

export default SpecsSection;
