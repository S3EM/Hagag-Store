import React from 'react';
import { motion } from 'motion/react';
import { translations } from '../translations';

interface HeroSectionProps {
  t: typeof translations.ar;
}

const HeroSection = React.memo(function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="hero-section relative px-4 py-12 flex flex-col items-center text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-red-900/20 blur-[100px] pointer-events-none rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-card z-10 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 mb-8 shadow-2xl backdrop-blur-sm"
      >
        <h1 className="hero-title text-3xl font-black text-white leading-tight mb-4">
          {t.heroTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">{t.heroTitle2}</span>
        </h1>
        <p className="text-zinc-300 text-sm font-medium leading-relaxed">
          {t.heroDesc}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="hero-image-container relative w-full h-72 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.3)] border border-red-500/20"
      >
        <img 
          src="/packgrowend.webp" 
          alt="Hero" 
          width={448}
          height={288}
          fetchPriority="high"
          sizes="(max-width: 448px) 100vw, 448px"
          className="w-full h-full object-cover"
          style={{ aspectRatio: '448 / 288' }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </motion.div>
    </section>
  );
});

export default HeroSection;
