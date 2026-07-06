'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Timeline from '@/components/Timeline';

export default function TimelineSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="історія" className="relative py-28 overflow-hidden border-y border-white/[0.06]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=70')",
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/60" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ІСТОРІЯ КОМПАНІЇ</span>
            <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            17 РОКІВ <span className="text-[#C9A84C]">ДОСКОНАЛОСТІ</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
}