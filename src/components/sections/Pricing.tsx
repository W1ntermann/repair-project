'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { PRICING } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── Pricing Card ─────────────────────────────────────── */
function PricingCard({ name, price, desc, featured, features, delay, onContact }: {
  name: string; price: string; desc: string; featured: boolean;
  features: readonly string[]; delay: number; onContact: () => void;
}) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`backdrop-blur-xl p-10 relative flex flex-col h-full
        ${featured
          ? 'bg-white/[0.06] border-2 border-[#C9A84C] lg:-translate-y-4'
          : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03] transition-all'
        }`}
      style={{ boxShadow: featured ? '0 0 80px rgba(201,168,76,0.15)' : undefined }}
    >
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 font-heading font-black text-[10px] uppercase tracking-[0.2em] text-[#0e0e0e] flex items-center gap-2"
          style={{ background: THEME.GOLD_GRAD }}>
          <Sparkles className="w-3 h-3" />
          ПОПУЛЯРНИЙ
        </div>
      )}

      {/* Card header with icon */}
      <div className="mb-6">
        <div className={`w-14 h-14 flex items-center justify-center mb-4 ${featured ? 'bg-[#C9A84C]/10 border border-[#C9A84C]/30' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
          <div className={`w-8 h-8 ${featured ? 'text-[#C9A84C]' : 'text-white/60'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h3 className="text-white font-heading font-black text-2xl uppercase tracking-widest">{name}</h3>
      </div>

      <div className={`text-5xl font-heading font-black mb-2 ${featured ? 'text-transparent bg-clip-text' : 'text-white'}`}
        style={featured ? { backgroundImage: THEME.GOLD_GRAD } : {}}>
        {price}
      </div>
      <div className="text-[#666666] text-sm font-sans mb-6">/ м²</div>
      <p className="text-[#666666] font-sans text-sm mb-8 leading-relaxed">{desc}</p>

      <ul className="space-y-3 mb-10 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-white/70 font-sans text-sm">
            <div className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${featured ? 'bg-[#C9A84C]/10 border border-[#C9A84C]/30' : 'border border-[#C9A84C]/50'}`}>
              <Check className="w-3 h-3 text-[#C9A84C]" />
            </div>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContact}
        className={`w-full py-4 uppercase font-heading font-black tracking-[0.2em] text-[13px] transition-all relative overflow-hidden group
          ${featured ? 'text-[#0e0e0e]' : 'border border-[#C9A84C]/50 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10'}`}
        style={featured ? { background: THEME.GOLD_GRAD } : {}}
      >
        <span className="relative z-10">ЗАМОВИТИ ПРОРАХУНОК</span>
        {!featured && (
          <div className="absolute inset-0 bg-[#C9A84C]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
        )}
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Pricing Component ───────────────────────────── */
interface PricingProps {
  onContact: () => void;
}

export default function Pricing({ onContact }: PricingProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="прайс" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=70')",
          opacity: 0.12,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/60" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ПРАЙС</span>
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            ВАРТІСТЬ <span className="text-[#C9A84C]">ПОСЛУГ</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING.map((plan, i) => (
            <PricingCard
              key={plan.name}
              {...plan}
              delay={i * 0.15}
              onContact={onContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
}