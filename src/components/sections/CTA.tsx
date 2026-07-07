'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function CTASection({ onOpenModal }: { onOpenModal: () => void }) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="контакти" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-[#0e0e0e]/75 backdrop-blur-sm" />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/50" />

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-12 md:p-20"
          style={{ boxShadow: '0 0 80px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.06)' } as React.CSSProperties}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
            ГОТОВІ РОЗПОЧАТИ?
          </h2>
          <p className="text-xl font-heading font-bold uppercase tracking-widest mb-12"
            style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Безкоштовна консультація + замір об'єкта
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenModal}
              className="px-10 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
              style={{ background: THEME.GOLD_GRAD, boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}
            >
              ЗАЛИШИТИ ЗАЯВКУ
            </motion.button>
            <motion.a
              href="tel:+380980050505"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              className="border border-white/20 text-white px-10 py-5 uppercase font-heading font-bold tracking-[0.2em] text-[13px] flex items-center justify-center gap-3 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C9A84C]" /> ЗАТЕЛЕФОНУВАТИ
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}