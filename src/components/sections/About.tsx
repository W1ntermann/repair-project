'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { STATS } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useAnimatedNumber } from '@/hooks/use-animated-number';

/* ─── Stat Card ────────────────────────────────────────── */
function StatCard({ n, suf, label, type, offset = 0, delay = 0 }: {
  n: number; suf: string; label: string; type: 'glass' | 'gold'; offset?: number; delay: number;
}) {
  const { ref: numRef, val } = useAnimatedNumber({ target: n, suffix: suf });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -6 }}
      className={`p-10 flex flex-col justify-center h-56 transition-all
        ${type === 'gold'
          ? 'text-[#0e0e0e]'
          : 'backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] text-white hover:border-[#C9A84C]/40'}`}
      style={{
        transform: offset ? `translateY(${offset}px)` : undefined,
        background: type === 'gold' ? THEME.GOLD_GRAD : undefined,
        boxShadow: type === 'gold' ? '0 8px 40px rgba(201,168,76,0.3)' : undefined,
      }}
    >
      <div className={`text-5xl lg:text-6xl font-heading font-black mb-4 ${type === 'gold' ? 'text-[#0e0e0e]' : 'text-[#C9A84C]'}`}>
        <span ref={numRef as React.Ref<HTMLDivElement>}>{val}{suf}</span>
      </div>
      <div className={`text-[11px] font-heading uppercase tracking-[0.25em] font-black leading-loose whitespace-pre-line
        ${type === 'gold' ? 'text-[#0e0e0e]/70' : 'text-white/40'}`}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Main About Component ─────────────────────────────── */
interface AboutProps {
  onOpenModal: () => void;
  onScrollTo: (id: string) => void;
}

export default function About({ onOpenModal, onScrollTo }: AboutProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="про-нас" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1920&q=70')",
          opacity: 0.14,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/60" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
                <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ПРО КОМПАНІЮ</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[1.1] mb-8">
                МИ БУДУЄМО<br />
                <span style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ВАШ КОМФОРТ
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[#666666] text-lg leading-relaxed mb-5">
                Pro Repair — студія елітного ремонту, де кожен етап контролюється до міліметра. Ми створюємо простори для тих, хто не звик до компромісів у якості.
              </p>
              <p className="text-[#666666] text-lg leading-relaxed mb-10">
                Наша філософія — абсолютна досконалість. Від чорнових робіт до фінального декорування ми гарантуємо преміальний результат у точні терміни.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenModal}
                  className="px-8 py-4 uppercase font-heading font-black tracking-[0.15em] text-sm text-[#0e0e0e]"
                  style={{ background: THEME.GOLD_GRAD }}
                >
                  ЗАМОВИТИ КОНСУЛЬТАЦІЮ
                </motion.button>
                <motion.button
                  whileHover={{ x: 6 }}
                  onClick={() => onScrollTo('портфоліо')}
                  className="text-[#C9A84C] font-heading font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 hover:text-[#E2C97E] transition-colors px-2 py-4"
                >
                  НАШІ РОБОТИ <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-0">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                {...stat}
                type={i === 2 ? 'gold' : 'glass'}
                delay={i * 0.1}
                offset={i % 2 === 0 ? 0 : i === 1 ? 32 : -32}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}