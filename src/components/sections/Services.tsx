'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME, ANIMATION } from '@/lib/constants';
import { SERVICES } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── Service Card ─────────────────────────────────────── */
function ServiceCard({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-10 lg:p-12 group cursor-pointer hover:bg-white/[0.03] transition-colors duration-500 relative overflow-hidden flex flex-col justify-between h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 to-transparent transition-all duration-700" />
      <div>
        <span className="text-[#C9A84C] opacity-15 font-heading font-black text-6xl block mb-6 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:-translate-y-1">
          {num}
        </span>
        <h3 className="text-white font-heading text-xl font-black uppercase tracking-[0.2em] mb-4">{title}</h3>
        <p className="text-[#666666] text-sm font-sans leading-relaxed group-hover:text-white/60 transition-colors">{desc}</p>
      </div>
      <div className="mt-8 w-0 h-[2px] group-hover:w-16 transition-all duration-500" style={{ background: THEME.GOLD_GRAD }} />
    </motion.div>
  );
}

/* ─── Main Services Component ──────────────────────────── */
export default function Services() {
  return (
    <section id="послуги" className="relative z-30 border-y border-white/[0.06] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=70')",
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-white/[0.06]">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} {...service} delay={i * ANIMATION.STAGGER} />
          ))}
        </div>
      </div>
    </section>
  );
}