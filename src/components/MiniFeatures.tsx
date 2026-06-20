import React from 'react';
import { Package, Zap, Heart } from 'lucide-react';
import { translations } from '../translations';

interface MiniFeaturesProps {
  t: typeof translations.ar;
}

const MiniFeatures = React.memo(function MiniFeatures({ t }: MiniFeaturesProps) {
  return (
    <section className="px-4 pb-14 pt-12 bg-zinc-50 text-zinc-900 border-t border-zinc-200 rounded-b-[2.5rem] shadow-sm relative z-10">
      <div className="space-y-6">
        <div className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-zinc-100">
          <Package className="text-red-500 shrink-0" size={32} />
          <div>
            <h4 className="font-bold">{t.feature1Title}</h4>
            <p className="text-xs text-zinc-500 mt-1">{t.feature1Desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-zinc-100">
          <Zap className="text-red-500 shrink-0" size={32} />
          <div>
            <h4 className="font-bold">{t.feature2Title}</h4>
            <p className="text-xs text-zinc-500 mt-1">{t.feature2Desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-zinc-100">
          <Heart className="text-red-500 shrink-0" size={32} />
          <div>
            <h4 className="font-bold">{t.feature3Title}</h4>
            <p className="text-xs text-zinc-500 mt-1">{t.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MiniFeatures;
