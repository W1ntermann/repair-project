'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import CostCalculator from '@/components/CostCalculator';

export default function CalculatorSection({ onContact }: { onContact: () => void }) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="калькулятор" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">КАЛЬКУЛЯТОР</span>
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            ОРІЄНТОВНА <span className="text-[#C9A84C]">ВАРТІСТЬ</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CostCalculator onContact={onContact} />
        </motion.div>
      </div>
    </section>
  );
}