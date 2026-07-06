'use client';

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
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
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
      {/* Gold line glow under */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-1/2 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
        }}
      />
    </div>
  );
}