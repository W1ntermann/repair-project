'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import {
  Award, Shield, Clock, Box, Eye, Gem, Wrench, Headphones,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { THEME, ANIMATION } from '@/lib/constants';
import { WHY_CARDS } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── Icon mapping ─────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Award, Shield, Clock, Box, Eye, Gem, Wrench, Headphones,
};

/* ─── Why Us Carousel ──────────────────────────────────── */
export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const total = WHY_CARDS.length;
  const autoRef = useRef<ReturnType<typeof setInterval>>(null!);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Auto-play
  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4000);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragging(false);
    if (Math.abs(info.offset.x) > 60) {
      if (info.offset.x < 0) { next(); } else { prev(); }
      resetAuto();
    }
  };

  const { ref, inView } = useScrollAnimation();

  return (
    <section id="переваги" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=70')",
          opacity: 0.16,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[#0e0e0e]/50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">НАШІ ПЕРЕВАГИ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            ЧОМУ ОБИРАЮТЬ <span className="text-[#C9A84C]">НАС</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Cards track */}
          <div className="relative overflow-hidden" style={{ perspective: '1200px' }}>
            <div className="relative h-[340px] md:h-[280px]">
              {WHY_CARDS.map((card, i) => {
                const offset = ((i - active + total) % total);
                const normalised = offset > total / 2 ? offset - total : offset;
                const isActive = normalised === 0;
                const isVisible = Math.abs(normalised) <= 2;
                const Icon = ICON_MAP[card.Icon];

                return (
                  <motion.div
                    key={card.num}
                    drag={isActive ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={handleDragEnd}
                    animate={{
                      x: `${normalised * 105}%`,
                      scale: isActive ? 1 : 0.82,
                      opacity: isActive ? 1 : isVisible ? 0.35 : 0,
                      zIndex: isActive ? 10 : 5 - Math.abs(normalised),
                      rotateY: normalised * -8,
                    }}
                    transition={{ duration: 0.55, ease: THEME.EASE }}
                    onClick={() => { if (!dragging && !isActive) { goTo(i); resetAuto(); } }}
                    className={`absolute inset-x-[10%] md:inset-x-[15%] lg:inset-x-[22%] top-0 h-full
                      cursor-grab active:cursor-grabbing
                      backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]
                      ${isActive ? 'border-[#C9A84C]/40 bg-white/[0.07]' : ''}
                      p-8 md:p-10 flex flex-col justify-between overflow-hidden`}
                    style={{
                      boxShadow: isActive ? '0 0 60px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.07)' : 'none',
                    }}
                  >
                    {/* Gold top line animates on active */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                      animate={{ scaleX: isActive ? 1 : 0, background: THEME.GOLD_GRAD }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex items-start gap-6">
                      <div className={`w-14 h-14 shrink-0 flex items-center justify-center border
                        ${isActive ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10' : 'border-white/10'}`}
                      >
                        {Icon && <Icon className={`w-6 h-6 ${isActive ? 'text-[#C9A84C]' : 'text-white/30'}`} />}
                      </div>
                      <div>
                        <div className="text-[#C9A84C]/40 font-heading font-black text-sm tracking-[0.3em] mb-1">{card.num}</div>
                        <h3 className="text-white font-heading font-black text-xl md:text-2xl uppercase tracking-tight leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <p className={`font-sans text-base leading-relaxed mt-6
                      ${isActive ? 'text-white/70' : 'text-white/30'}`}>
                      {card.desc}
                    </p>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center gap-2 text-[#C9A84C] text-xs font-heading font-bold uppercase tracking-[0.25em]"
                      >
                        <div className="w-6 h-[1px] bg-[#C9A84C]" /> Наша перевага
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => { prev(); resetAuto(); }}
              className="w-12 h-12 border border-white/10 hover:border-[#C9A84C]/60 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {WHY_CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetAuto(); }}
                  className="relative h-[3px] transition-all duration-500 overflow-hidden"
                  style={{ width: i === active ? 32 : 12, background: i === active ? 'transparent' : 'rgba(255,255,255,0.15)' }}
                >
                  {i === active && (
                    <motion.div className="absolute inset-0" style={{ background: THEME.GOLD_GRAD }} layoutId="dot" />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => { next(); resetAuto(); }}
              className="w-12 h-12 border border-white/10 hover:border-[#C9A84C]/60 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-[#C9A84C] font-heading font-black text-sm">{String(active + 1).padStart(2, '0')}</span>
            <span className="text-white/20 font-heading text-sm"> / {String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}