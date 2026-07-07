'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown, Play, Phone, ArrowUpRight, Sparkles, Shield, Clock,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { THEME, ANIMATION } from '@/lib/constants';
import { HERO_STATS } from '@/data/services';
import { useAnimatedNumber } from '@/hooks/use-animated-number';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── Helpers ──────────────────────────────────────────── */
function GlowOrb({ x, y, size, color }: { x: string; y: string; size: string; color: string }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full blur-[100px] opacity-20 animate-pulse"
      style={{ left: x, top: y, width: size, height: size, background: color, animationDuration: '7s' }}
    />
  );
}

/* ─── Stat Card ────────────────────────────────────────── */
function HeroStatCard({ n, suf, label, delay = 0 }: { n: number; suf: string; label: string; delay?: number }) {
  const { ref, val } = useAnimatedNumber({ target: n, suffix: suf });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay }}
      className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] px-8 py-5 flex items-center gap-5 w-64"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
    >
      <span ref={ref} className="text-4xl font-heading font-black text-[#C9A84C]">
        {val}{suf}
      </span>
      <span className="text-white/50 font-heading text-[11px] uppercase tracking-[0.25em] font-black">{label}</span>
    </motion.div>
  );
}

/* ─── Main Hero Component ──────────────────────────────── */
interface HeroProps {
  onOpenModal: () => void;
  onScrollTo: (id: string) => void;
}

export default function Hero({ onOpenModal, onScrollTo }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ['0%', '20%']);

  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  return (
    <section ref={heroRef} id="головна" className="relative h-[100dvh] min-h-[800px] flex items-center overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: "url('/for-hero.jpg')", y: bgY }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0e0e0e]/60 via-transparent to-transparent" />
      <GlowOrb x="68%" y="18%" size="600px" color={THEME.GOLD} />
      <GlowOrb x="80%" y="65%" size="350px" color="#8B6914" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.4em] text-[10px] font-black">
              АРХІТЕКТУРНЕ БЮРО · ОДЕСА
            </span>
          </motion.div>

          <div className="flex flex-col gap-1 mb-10">
            {['БУДУЄМО', 'ДОСКОНАЛІСТЬ', 'ВАШОГО ПРОСТОРУ'].map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: THEME.EASE }}
                className="text-6xl md:text-[80px] lg:text-[100px] font-heading font-black uppercase tracking-tight leading-[0.92]"
                style={i === 1 ? {
                  background: THEME.GOLD_GRAD,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : { color: '#fff' }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/60 max-w-xl text-lg leading-relaxed border-l-2 border-[#C9A84C] pl-6 mb-8"
          >
            Преміальний ремонт під ключ з 17-річним досвідом. Кожен проєкт — витвір мистецтва.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-white/50 text-xs font-sans uppercase tracking-wider">Преміум якість</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-white/50 text-xs font-sans uppercase tracking-wider">Гарантія 5 років</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-white/50 text-xs font-sans uppercase tracking-wider">Точні терміни</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenModal}
              className="px-10 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
              style={{ background: THEME.GOLD_GRAD, boxShadow: '0 8px 40px rgba(201,168,76,0.4)' }}
            >
              ОБГОВОРИТИ ПРОЄКТ
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              onClick={() => onScrollTo('портфоліо')}
              className="border border-white/20 text-white px-10 py-5 uppercase font-heading font-bold tracking-[0.2em] text-[13px] flex items-center justify-center gap-4 transition-colors group"
            >
              <Play className="w-4 h-4 text-[#C9A84C] group-hover:scale-125 transition-transform" />
              ПЕРЕГЛЯНУТИ РОБОТИ
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-center gap-3">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="text-[#C9A84C] w-6 h-6" />
        </motion.div>
        <span className="text-white/30 font-heading text-[9px] font-black tracking-[0.5em] uppercase -rotate-90 translate-y-12 hidden md:block">
          SCROLL
        </span>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: THEME.EASE }}
        className="absolute right-10 bottom-12 z-20 hidden lg:flex flex-col gap-4"
      >
        {HERO_STATS.map((stat, i) => (
          <HeroStatCard key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute top-32 right-10 z-20 hidden xl:block"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#C9A84C]/20 blur-xl rounded-full" />
          <div className="relative backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] px-6 py-3 flex items-center gap-3"
            style={{ boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}>
            <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-white/80 text-xs font-sans uppercase tracking-wider">Відкрито для проєктів 2025</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}