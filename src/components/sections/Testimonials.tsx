'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import TestimonialSlider from '@/components/TestimonialSlider';

export default function Testimonials() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="відгуки" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=70')",
          opacity: 0.13,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/50" />

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
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ВІДГУКИ КЛІЄНТІВ</span>
            <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            РЕАЛЬНІ <span className="text-[#C9A84C]">ВІДГУКИ</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </section>
  );
}