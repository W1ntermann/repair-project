'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const LOGOS = [
  { name: 'Нова Пошта', color: '#E81A1A' },
  { name: 'Sense Bank', color: '#3A7BDE' },
  { name: 'OKKO', color: '#FFD200' },
  { name: 'Rozetka', color: '#E60000' },
  { name: 'Київстар', color: '#004AAD' },
  { name: 'ПриватБанк', color: '#0F5B8C' },
  { name: 'MEGOGO', color: '#E5242B' },
  { name: 'Comfy', color: '#FF6B00' },
  { name: 'Epicentr', color: '#A3202A' },
  { name: 'Фокстрот', color: '#1A7F37' },
];

export default function TrustBar() {
  const [showAll, setShowAll] = useState(false);
  const visibleLogos = showAll ? LOGOS : LOGOS.slice(0, 5);

  return (
    <div className="relative py-12 border-y border-white/[0.06] overflow-hidden">
      <div className="relative z-10 mb-6 text-center">
        <p className="text-white/30 font-heading text-[10px] uppercase tracking-[0.3em] font-black">
          НАМ ДОВІРЯЮТЬ
        </p>
      </div>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex shrink-0 gap-16 items-center"
          animate={showAll ? { x: ['0%', '-50%'] } : { x: 0 }}
          transition={{
            duration: 30,
            repeat: showAll ? Infinity : 0,
            ease: 'linear',
          }}
        >
          {(showAll ? [...LOGOS, ...LOGOS] : visibleLogos).map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-16 px-6"
            >
              <div
                className="text-2xl font-heading font-black uppercase tracking-widest whitespace-nowrap"
                style={{
                  color: `${logo.color}20`,
                  textShadow: `0 0 20px ${logo.color}10`,
                }}
              >
                {logo.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Show all / hide button */}
      <div className="relative z-10 text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-white/20 hover:text-[#C9A84C] transition-colors font-heading text-[9px] uppercase tracking-[0.3em] font-black"
        >
          {showAll ? 'ЗГОРНУТИ' : `ДИВИТИСЬ ВСІХ (${LOGOS.length})`}
        </button>
      </div>
    </div>
  );
}
