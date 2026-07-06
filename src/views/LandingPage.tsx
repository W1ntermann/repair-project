import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion, useScroll, useTransform, useInView,
  AnimatePresence, type Variants, type PanInfo,
} from 'framer-motion';
import {
  Menu, X, ArrowDown, Play, Phone, Instagram, Facebook, Youtube,
  Check, ArrowUpRight, MapPin, Mail, ChevronLeft, ChevronRight,
  Shield, Clock, Award, Wrench, Eye, Gem, Box, Headphones, Send,
  ZoomIn,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollReveal from '@/components/ScrollReveal';
import MouseFollower from '@/components/MouseFollower';
import TrustBar from '@/components/TrustBar';
import TestimonialSlider from '@/components/TestimonialSlider';
import Timeline from '@/components/Timeline';
import PortfolioGrid from '@/components/PortfolioGrid';
import SectionNav from '@/components/SectionNav';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingSocial from '@/components/FloatingSocial';

/* ─── Constants ──────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E2C97E';
const GOLD_GRAD = 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)';
const DARK = '#0e0e0e';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ─── Section background helper ─────────────────────── */
function SectionBg({
  src, opacity = 0.18, blur = false,
}: { src: string; opacity?: number; blur?: boolean }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src={src}
        alt=""
        className={`w-full h-full object-cover ${blur ? 'blur-sm' : ''}`}
        style={{ opacity }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#0e0e0e]/80" />
    </div>
  );
}

/* ─── Small helpers ──────────────────────────────────── */
function GlowOrb({ x, y, size, color }: { x: string; y: string; size: string; color: string }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full blur-[100px] opacity-20 animate-pulse"
      style={{ left: x, top: y, width: size, height: size, background: color, animationDuration: '7s' }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-12 h-[2px] bg-[#C9A84C] origin-left"
      />
      <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">{children}</span>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'}
      variants={fadeUp} transition={{ delay }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Contact Modal ──────────────────────────────────── */
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); setName(''); setPhone(''); setMsg(''); setTime(''); }, 2400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#161616]/95 backdrop-blur-2xl border border-white/10 p-10 overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(201,168,76,0.15)' }}
          >
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: GOLD_GRAD }} />

            <button onClick={onClose}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-[#C9A84C] flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3 className="text-white font-heading font-black text-2xl uppercase tracking-widest mb-3">
                  Дякуємо!
                </h3>
                <p className="text-[#666666] font-sans text-sm">Ми зв'яжемося з вами протягом 15 хвилин.</p>
              </motion.div>
            ) : (
              <>
                <SectionLabel>ЗВОРОТНІЙ ЗВ'ЯЗОК</SectionLabel>
                <h3 className="text-white font-heading font-black text-3xl uppercase tracking-tight mb-8">
                  Обговоримо<br />
                  <span style={{ background: GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ваш проєкт
                  </span>
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    required value={name} onChange={e => setName(e.target.value)}
                    placeholder="Ваше ім'я"
                    className="bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors w-full"
                  />
                  <input
                    required value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="Номер телефону"
                    type="tel"
                    className="bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors w-full"
                  />
                  <textarea
                    value={msg} onChange={e => setMsg(e.target.value)}
                    placeholder="Розкажіть про ваш об'єкт (площа, тип, побажання)"
                    rows={2}
                    className="bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none w-full"
                  />
                  <input
                    value={time} onChange={e => setTime(e.target.value)}
                    placeholder="Зручний час для дзвінка"
                    className="bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors w-full"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="mt-2 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e] flex items-center justify-center gap-3"
                    style={{ background: GOLD_GRAD }}
                  >
                    НАДІСЛАТИ ЗАЯВКУ <Send className="w-4 h-4" />
                  </motion.button>
                  <p className="text-white/20 font-sans text-xs text-center">
                    Надсилаючи заявку, ви погоджуєтесь з <a href="#" className="underline hover:text-white/50 transition-colors">політикою конфіденційності</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Why Us Carousel ────────────────────────────────── */
/* ─── Project data ───────────────────────────────────── */
type Project = {
  id: number; title: string; type: string; area: string;
  duration: string; style: string; year: string;
  cover: string; gallery: string[];
  price?: string;
};

const PROJECTS: Project[] = [
  {
    id: 1, title: 'Апартаменти «Марина»', type: 'Ремонт під ключ',
    area: '120 м²', duration: '4 місяці', style: 'Сучасний мінімалізм', year: '2024',
    price: 'від 540 000 ₴',
    cover: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80',
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=900&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80',
    ],
  },
  {
    id: 2, title: 'Вілла «Монако»', type: 'Будівництво',
    area: '320 м²', duration: '14 місяців', style: 'Класичний стиль', year: '2024',
    price: 'від 2 560 000 ₴',
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      'https://images.unsplash.com/photo-1617104678098-de229db51175?w=900&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80',
    ],
  },
  {
    id: 3, title: 'Пентхаус «Небо»', type: 'Дизайн + Ремонт',
    area: '200 м²', duration: '6 місяців', style: 'Contemporary', year: '2023',
    price: 'від 1 600 000 ₴',
    cover: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80',
    ],
  },
  {
    id: 4, title: 'Резиденція «Ліс»', type: 'Будівництво',
    area: '450 м²', duration: '18 місяців', style: 'Природні матеріали', year: '2023',
    price: 'від 4 050 000 ₴',
    cover: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702a8e?w=900&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    ],
  },
  {
    id: 5, title: 'Студія «Урбан»', type: 'Дизайн інтер\'єру',
    area: '65 м²', duration: '2 місяці', style: 'Лофт', year: '2024',
    price: 'від 292 500 ₴',
    cover: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=900&q=80',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=900&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
      'https://images.unsplash.com/photo-1564540574859-0dfb63985953?w=900&q=80',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80',
    ],
  },
  {
    id: 6, title: 'ЖК «Преміум»', type: 'Ремонт під ключ',
    area: '90 м²', duration: '3 місяці', style: 'Скандинавський', year: '2024',
    price: 'від 720 000 ₴',
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80',
    ],
  },
  {
    id: 7, title: 'Офіс «Атріум»', type: 'Комерційна нерухомість',
    area: '240 м²', duration: '5 місяців', style: 'Бізнес-преміум', year: '2023',
    price: 'від 1 920 000 ₴',
    cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=900&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80',
    ],
  },
  {
    id: 8, title: 'Таунхаус «Садовий»', type: 'Ремонт під ключ',
    area: '180 м²', duration: '7 місяців', style: 'Еклектика', year: '2023',
    price: 'від 1 440 000 ₴',
    cover: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80',
    ],
  },
  {
    id: 9, title: 'Котедж «Берег»', type: 'Будівництво',
    area: '380 м²', duration: '16 місяців', style: 'Середземноморський', year: '2022',
    price: 'від 3 040 000 ₴',
    cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702a8e?w=900&q=80',
    ],
  },
];

const WHY_CARDS = [
  { Icon: Award,      num: '01', title: '17 РОКІВ ДОСВІДУ',      desc: 'Команда перевірених майстрів з сотнями реалізованих проєктів по всій Україні.' },
  { Icon: Shield,     num: '02', title: 'ГАРАНТІЯ ЯКОСТІ',       desc: 'Якщо вам не сподобається якість — ми переробимо за власний кошт. Письмова гарантія на приховані роботи 5 років.' },
  { Icon: Clock,      num: '03', title: 'ТОЧНІ ТЕРМІНИ',         desc: 'Фіксована ціна та чіткий графік — кожен день прострочки за наш рахунок.' },
  { Icon: Box,        num: '04', title: 'ВЛАСНЕ ВИРОБНИЦТВО',    desc: 'Меблі та оздоблення з власного цеху — без посередників, вища якість, нижча ціна.' },
  { Icon: Eye,        num: '05', title: 'АВТОРСЬКИЙ НАГЛЯД',     desc: 'Архітектор присутній на майданчику протягом усього будівництва.' },
  { Icon: Gem,        num: '06', title: 'ПРЕМІУМ МАТЕРІАЛИ',     desc: 'Тільки сертифіковані постачальники — жодного контрафакту, жодних компромісів.' },
  { Icon: Wrench,     num: '07', title: '3D ВІЗУАЛІЗАЦІЯ',       desc: 'Ви побачите кожну кімнату ще до початку робіт — у фотореалістичному рендері.' },
  { Icon: Headphones, num: '08', title: 'ПІДТРИМКА 3 РОКИ',      desc: 'Гарантійне обслуговування після здачі: усуваємо будь-які питання безкоштовно.' },
];

function WhyUsCarousel() {
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

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative">
      {/* Cards track */}
      <div className="relative overflow-hidden" style={{ perspective: '1200px' }}>
        <div className="relative h-[340px] md:h-[280px]">
          {WHY_CARDS.map((card, i) => {
            const offset = ((i - active + total) % total);
            const normalised = offset > total / 2 ? offset - total : offset;
            const isActive = normalised === 0;
            const isVisible = Math.abs(normalised) <= 2;

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
                transition={{ duration: 0.55, ease: EASE }}
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
                  animate={{ scaleX: isActive ? 1 : 0, background: GOLD_GRAD }}
                  transition={{ duration: 0.5 }}
                />

                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 shrink-0 flex items-center justify-center border
                    ${isActive ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10' : 'border-white/10'}`}
                  >
                    <card.Icon className={`w-6 h-6 ${isActive ? 'text-[#C9A84C]' : 'text-white/30'}`} />
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
                <motion.div className="absolute inset-0" style={{ background: GOLD_GRAD }} layoutId="dot" />
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
  );
}

/* ─── Card sub-components (hooks at top level) ───────── */
function ServiceCard({ num, title, desc, delay }: {
  num: string; title: string; desc: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
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
      <div className="mt-8 w-0 h-[2px] group-hover:w-16 transition-all duration-500" style={{ background: GOLD_GRAD }} />
    </motion.div>
  );
}

function StatCard({ n, suf, label, type, offset, delay }: {
  n: number; suf: string; label: string; type: 'glass' | 'gold'; offset?: number; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -6 }}
      className={`p-10 flex flex-col justify-center h-56 transition-all
        ${type === 'gold'
          ? 'text-[#0e0e0e]'
          : 'backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] text-white hover:border-[#C9A84C]/40'}`}
      style={{
        transform: offset ? `translateY(${offset}px)` : undefined,
        background: type === 'gold' ? GOLD_GRAD : undefined,
        boxShadow: type === 'gold' ? '0 8px 40px rgba(201,168,76,0.3)' : undefined,
      }}
    >
      <div className={`text-5xl lg:text-6xl font-heading font-black mb-4 ${type === 'gold' ? 'text-[#0e0e0e]' : 'text-[#C9A84C]'}`}>
        <AnimatedNumber target={n} suffix={suf} />
      </div>
      <div className={`text-[11px] font-heading uppercase tracking-[0.25em] font-black leading-loose whitespace-pre-line
        ${type === 'gold' ? 'text-[#0e0e0e]/70' : 'text-white/40'}`}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Project Detail overlay ─────────────────────────── */
function ProjectDetail({ project, onClose, onContact }: {
  project: Project; onClose: () => void; onContact: () => void;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const allPhotos = [project.cover, ...project.gallery];

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[90] bg-[#0e0e0e] overflow-y-auto"
    >
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(12px)' }}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all z-10">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={lightbox} alt="" onClick={e => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain"
              style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onClose}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-heading font-bold uppercase tracking-[0.15em] text-sm group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Назад до портфоліо
          </button>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[#C9A84C] font-heading font-bold uppercase tracking-[0.2em] text-xs border border-[#C9A84C]/40 px-4 py-2">
              {project.type}
            </span>
          </div>
          <Logo />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }} className="mb-10">
          <p className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold mb-3">{project.type}</p>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
            {project.title}
          </h1>
          {/* Specs row */}
          <div className="flex flex-wrap gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              { label: 'Площа', value: project.area },
              { label: 'Тривалість', value: project.duration },
              { label: 'Стиль', value: project.style },
              { label: 'Рік здачі', value: project.year },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 min-w-[120px] px-6 py-4 bg-[#0e0e0e]">
                <div className="text-[#666] font-sans text-xs uppercase tracking-wider mb-1">{label}</div>
                <div className="text-white font-heading font-black uppercase tracking-wide text-sm">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero photo + 4-photo grid */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[3px] mb-[3px]">
          {/* Hero */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden group cursor-zoom-in"
            onClick={() => setLightbox(allPhotos[0])}>
            <img src={allPhotos[0]} alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#0e0e0e]/20 group-hover:bg-[#0e0e0e]/10 transition-colors" />
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>
          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-[3px]">
            {allPhotos.slice(1, 5).map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group cursor-zoom-in"
                onClick={() => setLightbox(src)}>
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[#0e0e0e]/25 group-hover:bg-[#0e0e0e]/10 transition-colors" />
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5th photo full width strip + CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative aspect-[21/6] overflow-hidden group cursor-zoom-in mb-12"
          onClick={() => setLightbox(allPhotos[5] || allPhotos[4])}>
          <img src={allPhotos[5] || allPhotos[4]} alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/70 via-transparent to-[#0e0e0e]/70" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-white font-heading font-black text-2xl uppercase tracking-tight mb-2">
              Вам сподобався цей проєкт?
            </h3>
            <p className="text-[#666] font-sans text-sm">Ми реалізуємо схожий або кращий саме для вас.</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onContact}
            className="shrink-0 px-10 py-5 uppercase font-heading font-black tracking-[0.2em] text-sm text-[#0e0e0e] whitespace-nowrap"
            style={{ background: GOLD_GRAD, boxShadow: '0 8px 32px rgba(201,168,76,0.35)' }}>
            ЗАМОВИТИ СХОЖИЙ ПРОЄКТ
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── All Projects overlay ───────────────────────────── */
function AllProjects({ onClose, onSelect }: {
  onClose: () => void; onSelect: (p: Project) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-0 z-[89] bg-[#0e0e0e] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onClose}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-heading font-bold uppercase tracking-[0.15em] text-sm group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Назад
          </button>
          <Logo />
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px]" style={{ background: GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ПОРТФОЛІО</span>
          </div>
          <h2 className="text-5xl font-heading font-black text-white uppercase tracking-tight">
            ВСІ <span className="text-[#C9A84C]">ПРОЄКТИ</span>
          </h2>
          <p className="text-[#666] font-sans mt-3 text-sm">{PROJECTS.length} завершених об'єктів</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] bg-white/[0.04]">
          {PROJECTS.map((proj, i) => (
            <motion.div key={proj.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(proj)}
              className="relative group aspect-[4/3] overflow-hidden bg-[#0e0e0e] cursor-pointer"
            >
              <img src={proj.cover} alt={proj.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#C9A84C] text-[10px] font-heading font-black uppercase tracking-[0.25em] mb-1">{proj.type}</p>
                <h3 className="text-white font-heading font-black text-xl uppercase tracking-wide">{proj.title}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-white/40 text-xs font-sans">{proj.area}</span>
                  <span className="text-white/40 text-xs font-sans">{proj.year}</span>
                </div>
              </div>
              {/* Hover arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/0 border border-white/0 flex items-center justify-center
                group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-transparent group-hover:text-[#0e0e0e] transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioItem({ img, title, type, delay, onClick }: {
  img: string; title: string; type: string; delay: number; onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative group aspect-[4/3] overflow-hidden bg-[#0e0e0e] cursor-pointer"
    >
      <motion.img src={img} alt={title}
        className="w-full h-full object-cover opacity-60"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80" />
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute inset-0 p-6 flex items-end"
      >
        <div className="w-full backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] p-6"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }}>
          <span className="text-[#C9A84C] text-[10px] font-heading font-black uppercase tracking-[0.25em] block mb-2">{type}</span>
          <h3 className="text-white font-heading text-xl font-black uppercase tracking-wider">{title}</h3>
          <div className="mt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest font-heading">
            ПЕРЕГЛЯНУТИ <ArrowUpRight className="w-4 h-4 text-[#C9A84C]" />
          </div>
        </div>
      </motion.div>
      {/* always-visible title */}
      <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <p className="text-white font-heading font-bold uppercase tracking-wider text-sm">{title}</p>
      </div>
    </motion.div>
  );
}

function VideoCard({ img, name, project, delay }: {
  img: string; name: string; project: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden bg-[#0e0e0e]">
        <motion.img src={img} alt={name}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-30"
          whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.12 }}
            className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-[#C9A84C]/25 group-hover:border-[#C9A84C] transition-all duration-400"
          >
            <Play className="text-white w-6 h-6 ml-1 group-hover:text-[#C9A84C] transition-colors" fill="currentColor" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: GOLD_GRAD }} />
      </div>
      <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] border-t-0 p-6 text-left">
        <h4 className="text-white font-heading font-black text-lg uppercase tracking-wider mb-1">{name}</h4>
        <p className="text-[#666666] font-sans text-sm">{project}</p>
      </div>
    </motion.div>
  );
}

function PricingCard({ name, price, desc, featured, features, delay, onContact }: {
  name: string; price: string; desc: string; featured: boolean;
  features: string[]; delay: number; onContact: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`backdrop-blur-xl p-10 relative flex flex-col
        ${featured ? 'bg-white/[0.06] border-2 border-[#C9A84C] lg:-translate-y-4' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors'}`}
      style={{ boxShadow: featured ? '0 0 60px rgba(201,168,76,0.12)' : undefined }}
    >
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 font-heading font-black text-[10px] uppercase tracking-[0.2em] text-[#0e0e0e]"
          style={{ background: GOLD_GRAD }}>
          ПОПУЛЯРНИЙ
        </div>
      )}
      <h3 className="text-white font-heading font-black text-2xl uppercase tracking-widest mb-4">{name}</h3>
      <div className={`text-4xl font-heading font-black mb-3
        ${featured ? 'text-transparent bg-clip-text' : 'text-white'}`}
        style={featured ? { backgroundImage: GOLD_GRAD } : {}}>
        {price} <span className="text-lg text-[#666666] font-sans font-normal">/ м²</span>
      </div>
      <p className="text-[#666666] font-sans text-sm mb-8 leading-relaxed">{desc}</p>
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-4 text-white/70 font-sans text-sm">
            <div className="w-5 h-5 border border-[#C9A84C]/50 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#C9A84C]" />
            </div>
            {f}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={onContact}
        className={`w-full py-4 uppercase font-heading font-black tracking-[0.2em] text-[13px] transition-all
          ${featured ? 'text-[#0e0e0e]' : 'border border-[#C9A84C]/50 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10'}`}
        style={featured ? { background: GOLD_GRAD } : {}}
      >
        ЗАМОВИТИ ПРОРАХУНОК
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], ['0%', '20%']);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const openModal = () => { setModal(true); setMobileOpen(false); };

  const navItems = [
    { label: 'Ремонт',      id: 'послуги' },
    { label: 'Дизайн',      id: 'послуги' },
    { label: 'Будівництво', id: 'послуги' },
    { label: 'Послуги',     id: 'послуги' },
    { label: 'Меблі',       id: 'послуги' },
    { label: 'Прайс',       id: 'прайс' },
    { label: 'Портфоліо',   id: 'портфоліо' },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans selection:bg-[#C9A84C] selection:text-[#0e0e0e] overflow-x-hidden">
      <ContactModal open={modal} onClose={() => setModal(false)} />

      {/* ── Overlays ────────────────────────────────── */}
      <AnimatePresence>
        {showAllProjects && !selectedProject && (
          <AllProjects
            key="all-projects"
            onClose={() => setShowAllProjects(false)}
            onSelect={(p) => { setSelectedProject(p); }}
          />
        )}
        {selectedProject && (
          <ProjectDetail
            key={`project-${selectedProject.id}`}
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
            }}
            onContact={() => { setModal(true); setSelectedProject(null); }}
          />
        )}
      </AnimatePresence>

      {/* ── HEADER ─────────────────────────────────── */}
      <motion.header
        initial={false}
        animate={scrolled
          ? { backgroundColor: 'rgba(14,14,14,0.85)', backdropFilter: 'blur(24px)', borderBottomColor: 'rgba(201,168,76,0.18)' }
          : { backgroundColor: 'rgba(14,14,14,0)', backdropFilter: 'blur(0px)', borderBottomColor: 'rgba(255,255,255,0.06)' }
        }
        transition={{ duration: 0.4 }}
        className="fixed w-full top-0 left-0 z-50 border-b h-24 flex items-center"
        style={{ WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)' } as React.CSSProperties}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />

          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                onClick={() => scrollTo(item.id)}
                className="text-[#f0f0f0]/80 text-[11px] font-heading font-bold uppercase tracking-[0.2em] hover:text-[#C9A84C] transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                  style={{ background: GOLD_GRAD }} />
              </motion.button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+380980050505"
              className="flex items-center gap-2 text-[#f0f0f0] hover:text-[#C9A84C] transition-colors font-heading text-sm font-bold tracking-widest">
              <Phone className="w-4 h-4 text-[#C9A84C]" />
              +38 (098) 005-05-05
            </a>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={openModal}
              className="relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-[11px] uppercase font-heading font-bold tracking-[0.2em] group"
            >
              <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: GOLD_GRAD }} />
              <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗВОРОТНІЙ ДЗВІНОК</span>
            </motion.button>
            <div className="flex items-center gap-2 text-[11px] font-heading font-bold tracking-widest text-white/30">
              <button className="text-white">UA</button><span>/</span>
              <button className="hover:text-white transition-colors">RU</button>
            </div>
          </div>

          <button className="xl:hidden text-white hover:text-[#C9A84C] transition-colors" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-2xl flex flex-col p-8 pt-32"
          >
            <nav className="flex flex-col gap-6 mb-10">
              {navItems.map((item, i) => (
                <motion.button key={i}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="text-left text-white text-3xl font-heading font-black uppercase tracking-widest hover:text-[#C9A84C] transition-colors"
                  onClick={() => scrollTo(item.id)}
                >{item.label}</motion.button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-8">
              <a href="tel:+380980050505" className="flex items-center gap-3 text-[#f0f0f0] font-heading text-xl font-bold">
                <Phone className="w-5 h-5 text-[#C9A84C]" /> +38 (098) 005-05-05
              </a>
              <button onClick={openModal}
                className="py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
                style={{ background: GOLD_GRAD }}>
                ЗВОРОТНІЙ ДЗВІНОК
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <MouseFollower />
      <SectionNav />
      <ScrollToTop />
      <FloatingSocial />

      <main>
        {/* ── HERO ───────────────────────────────────── */}
        <section ref={heroRef} id="головна" className="relative h-[100dvh] min-h-[800px] flex items-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url('/for-hero.jpg')", y: bgY }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0e0e0e]/60 via-transparent to-transparent" />
          <GlowOrb x="68%" y="18%" size="600px" color="#C9A84C" />
          <GlowOrb x="80%" y="65%" size="350px" color="#8B6914" />

          <div className="container mx-auto px-6 relative z-20 pt-20">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-4 mb-10">
                <div className="w-12 h-[2px]" style={{ background: GOLD_GRAD }} />
                <span className="text-[#C9A84C] font-heading uppercase tracking-[0.4em] text-[10px] font-black">
                  АРХІТЕКТУРНЕ БЮРО · ОДЕСА
                </span>
              </motion.div>

              <div className="flex flex-col gap-1 mb-10">
                {['БУДУЄМО', 'ДОСКОНАЛІСТЬ', 'ВАШОГО ПРОСТОРУ'].map((line, i) => (
                  <motion.h1 key={i}
                    initial={{ opacity: 0, x: -40, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE }}
                    className="text-6xl md:text-[80px] lg:text-[100px] font-heading font-black uppercase tracking-tight leading-[0.92]"
                    style={i === 1 ? {
                      background: GOLD_GRAD,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    } : { color: '#fff' }}
                  >{line}</motion.h1>
                ))}
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-white/60 max-w-xl text-lg leading-relaxed border-l-2 border-[#C9A84C] pl-6 mb-12">
                Преміальний ремонт під ключ з 17-річним досвідом. Кожен проєкт — витвір мистецтва.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }} className="flex flex-col sm:flex-row gap-5">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={openModal}
                  className="px-10 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
                  style={{ background: GOLD_GRAD, boxShadow: '0 8px 40px rgba(201,168,76,0.4)' }}>
                  ОБГОВОРИТИ ПРОЄКТ
                </motion.button>
                <motion.button whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  onClick={() => scrollTo('портфоліо')}
                  className="border border-white/20 text-white px-10 py-5 uppercase font-heading font-bold tracking-[0.2em] text-[13px] flex items-center justify-center gap-4 transition-colors group">
                  <Play className="w-4 h-4 text-[#C9A84C] group-hover:scale-125 transition-transform" />
                  ПЕРЕГЛЯНУТИ РОБОТИ
                </motion.button>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-center gap-3">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowDown className="text-[#C9A84C] w-6 h-6" />
            </motion.div>
            <span className="text-white/30 font-heading text-[9px] font-black tracking-[0.5em] uppercase -rotate-90 translate-y-12 hidden md:block">SCROLL</span>
          </div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
            className="absolute right-10 bottom-12 z-20 hidden lg:flex flex-col gap-4">
            {[{ n: 17, suf: '+', label: 'РОКІВ' }, { n: 500, suf: '+', label: "ОБ'ЄКТІВ" }].map(({ n, suf, label }) => (
              <div key={label} className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] px-8 py-5 flex items-center gap-5 w-64"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <span className="text-4xl font-heading font-black text-[#C9A84C]">
                  <AnimatedNumber target={n} suffix={suf} />
                </span>
                <span className="text-white/50 font-heading text-[11px] uppercase tracking-[0.25em] font-black">{label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── SERVICES STRIP ──────────────────────────── */}
        <section id="послуги" className="relative z-30 border-y border-white/[0.06] overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=70" opacity={0.12} />
          <div className="relative z-10 container mx-auto px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-white/[0.06]">
              {[
                { num: '01', title: 'РЕМОНТ', desc: "Комплексний ремонт під ключ — від демонтажу до фінішного оздоблення" },
                { num: '02', title: 'ДИЗАЙН', desc: "Авторські дизайн-проєкти будь-якої складності з 3D-візуалізацією" },
                { num: '03', title: 'БУДІВНИЦТВО', desc: "Зведення котеджів та будинків преміум-класу під ключ" },
                { num: '04', title: 'МЕБЛІ', desc: "Власне виробництво корпусних та м'яких меблів за індивідуальними ескізами" },
              ].map((srv, i) => (
                <ServiceCard key={srv.num} {...srv} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT & STATS ───────────────────────────── */}
        <section id="про-нас" className="relative py-32 overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1920&q=70" opacity={0.14} />
          <GlowOrb x="-5%" y="40%" size="500px" color="#C9A84C" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <Reveal><SectionLabel>ПРО КОМПАНІЮ</SectionLabel></Reveal>
                <Reveal delay={0.1}>
                  <h2 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[1.1] mb-8">
                    МИ БУДУЄМО<br />
                    <span style={{ background: GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ВАШ КОМФОРТ
                    </span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-[#666666] text-lg leading-relaxed mb-5">
                    Pro Repair — студія елітного ремонту, де кожен етап контролюється до міліметра. Ми створюємо простори для тих, хто не звик до компромісів у якості.
                  </p>
                  <p className="text-[#666666] text-lg leading-relaxed mb-10">
                    Наша філософія — абсолютна досконалість. Від чорнових робіт до фінального декорування ми гарантуємо преміальний результат у точні терміни.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={openModal}
                      className="px-8 py-4 uppercase font-heading font-black tracking-[0.15em] text-sm text-[#0e0e0e]"
                      style={{ background: GOLD_GRAD }}>
                      ЗАМОВИТИ КОНСУЛЬТАЦІЮ
                    </motion.button>
                    <motion.button whileHover={{ x: 6 }}
                      onClick={() => scrollTo('портфоліо')}
                      className="text-[#C9A84C] font-heading font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 hover:text-[#E2C97E] transition-colors px-2 py-4">
                      НАШІ РОБОТИ <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </Reveal>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-0">
                <StatCard n={17}  suf="+"   label={"РОКІВ\nДОСВІДУ"}  type="glass" delay={0}   />
                <StatCard n={500} suf="+"   label={"ОБ'ЄКТІВ\nЗДАНО"} type="glass" delay={0.1} offset={32} />
                <StatCard n={100} suf="%"   label={"ГАРАНТІЯ\nЯКОСТІ"} type="gold" delay={0.2} offset={-32} />
                <StatCard n={3}   suf=" р." label={"ТЕХНІЧНОЇ\nПІДТРИМКИ"} type="glass" delay={0.3} />
              </div>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ───────────────────────────────── */}
        <section id="портфоліо" className="relative py-20 overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=70" opacity={0.08} />
          <div className="container mx-auto px-6 mb-14 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
            <Reveal>
              <SectionLabel>ПОРТФОЛІО</SectionLabel>
              <h2 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight">
                НАШІ <span className="text-[#C9A84C]">РОБОТИ</span>
              </h2>
            </Reveal>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <PortfolioGrid
              projects={PROJECTS}
              onSelect={(p: Project) => setSelectedProject(p)}
              onShowAll={() => setShowAllProjects(true)}
            />
          </div>
        </section>

        {/* ── WHY US CAROUSEL ─────────────────────────── */}
        <section id="переваги" className="relative py-28 overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=70" opacity={0.16} />
          <GlowOrb x="75%" y="25%" size="500px" color="#C9A84C" />
          <GlowOrb x="10%" y="70%" size="350px" color="#8B6914" />

          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="mb-16">
              <SectionLabel>НАШІ ПЕРЕВАГИ</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                ЧОМУ ОБИРАЮТЬ <span className="text-[#C9A84C]">НАС</span>
              </h2>
            </Reveal>
            <WhyUsCarousel />
          </div>
        </section>

        {/* ── TRUST BAR ───────────────────────────────── */}
        <TrustBar />

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section id="відгуки" className="relative py-28 overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=70" opacity={0.13} />
          <GlowOrb x="50%" y="30%" size="500px" color="#C9A84C" />
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="mb-16 text-center">
              <SectionLabel>
                <span className="flex items-center gap-4 justify-center">
                  <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
                  ВІДГУКИ КЛІЄНТІВ
                  <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
                </span>
              </SectionLabel>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                РЕАЛЬНІ <span className="text-[#C9A84C]">ВІДГУКИ</span>
              </h2>
            </Reveal>
            <TestimonialSlider />
          </div>
        </section>

        {/* ── TIMELINE ────────────────────────────────── */}
        <section id="історія" className="relative py-28 overflow-hidden border-y border-white/[0.06]">
          <SectionBg src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=70" opacity={0.1} />
          <GlowOrb x="30%" y="60%" size="400px" color="#8B6914" />
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="mb-16 text-center">
              <SectionLabel>
                <span className="flex items-center gap-4 justify-center">
                  <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
                  ІСТОРІЯ КОМПАНІЇ
                  <span className="w-10 h-[2px] bg-[#C9A84C] hidden sm:block" />
                </span>
              </SectionLabel>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                17 РОКІВ <span className="text-[#C9A84C]">ДОСКОНАЛОСТІ</span>
              </h2>
            </Reveal>
            <Timeline />
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────── */}
        <section id="прайс" className="relative py-28 overflow-hidden">
          <SectionBg src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=70" opacity={0.12} />
          <GlowOrb x="50%" y="50%" size="700px" color="#C9A84C" />

          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[2px]" style={{ background: GOLD_GRAD }} />
                <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ПРАЙС</span>
                <div className="w-12 h-[2px]" style={{ background: GOLD_GRAD }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                ВАРТІСТЬ <span className="text-[#C9A84C]">ПОСЛУГ</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
              <PricingCard
                name="БАЗОВИЙ" price="від 4 500 ₴" featured={false}
                desc="Косметичний ремонт та базове оздоблення приміщень будь-якої площі."
                features={['Чорнові роботи','Укладання плитки','Фарбування стін та стелі','Встановлення сантехніки']}
                delay={0} onContact={openModal}
              />
              <PricingCard
                name="СТАНДАРТ" price="від 8 000 ₴" featured={true}
                desc="Капітальний ремонт з індивідуальним дизайн-проєктом та авторськими матеріалами."
                features={['Всі базові роботи','Розробка дизайн-проєкту','3D-візуалізація','Підбір матеріалів','Авторський нагляд']}
                delay={0.15} onContact={openModal}
              />
              <PricingCard
                name="ПРЕМІУМ" price="від 15 000 ₴" featured={false}
                desc="Ексклюзивний ремонт з імпортними матеріалами, меблями та технікою під ключ."
                features={['Всі роботи Стандарту','Преміум матеріали','Виготовлення меблів','Smart-home системи','3 роки гарантії']}
                delay={0.3} onContact={openModal}
              />
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ──────────────────────────────── */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
              alt="" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="absolute inset-0 z-10 bg-[#0e0e0e]/75 backdrop-blur-sm" />
          <GlowOrb x="20%" y="30%" size="500px" color="#C9A84C" />
          <GlowOrb x="75%" y="65%" size="300px" color="#8B6914" />

          <div className="container mx-auto px-6 relative z-20">
            <Reveal className="max-w-3xl mx-auto text-center backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-12 md:p-20"
              style={{ boxShadow: '0 0 80px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.06)' } as React.CSSProperties}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: GOLD_GRAD }} />
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
                ГОТОВІ РОЗПОЧАТИ?
              </h2>
              <p className="text-xl font-heading font-bold uppercase tracking-widest mb-12"
                style={{ background: GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Безкоштовна консультація + замір об'єкта
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={openModal}
                  className="px-10 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
                  style={{ background: GOLD_GRAD, boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}>
                  ЗАЛИШИТИ ЗАЯВКУ
                </motion.button>
                <motion.a href="tel:+380980050505"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="border border-white/20 text-white px-10 py-5 uppercase font-heading font-bold tracking-[0.2em] text-[13px] flex items-center justify-center gap-3 transition-colors">
                  <Phone className="w-4 h-4 text-[#C9A84C]" /> ЗАТЕЛЕФОНУВАТИ
                </motion.a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="relative pt-20 pb-10 overflow-hidden border-t border-white/[0.06]">
        <SectionBg src="https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=1920&q=70" opacity={0.07} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <Logo className="mb-6" />
              <p className="text-[#666666] text-sm leading-relaxed mb-8 pr-4">
                Преміальний ремонт під ключ в Одесі. Створюємо простори, що відображають ваш статус та бездоганний смак.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Facebook, href: '#' },
                  { Icon: Youtube, href: '#' },
                ].map(({ Icon, href }, i) => (
                  <motion.a key={i} href={href} whileHover={{ y: -3 }}
                    className="w-10 h-10 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#0e0e0e] hover:border-transparent transition-all"
                    style={{ background: undefined }}
                    onMouseEnter={e => (e.currentTarget.style.background = GOLD_GRAD)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">НАВІГАЦІЯ</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Про нас',    id: 'про-нас' },
                  { label: 'Послуги',    id: 'послуги' },
                  { label: 'Портфоліо', id: 'портфоліо' },
                  { label: 'Переваги',  id: 'переваги' },
                  { label: 'Прайс',     id: 'прайс' },
                ].map(link => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)}
                      className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group">
                      <span className="w-0 h-[1px] bg-[#C9A84C] group-hover:w-5 transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">ПОСЛУГИ</h4>
              <ul className="space-y-4">
                {["Дизайн інтер'єру", 'Ремонт під ключ', 'Будівництво котеджів', 'Виготовлення меблів', 'Авторський нагляд'].map(s => (
                  <li key={s}>
                    <button onClick={openModal}
                      className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group text-left">
                      <span className="w-0 h-[1px] bg-[#C9A84C] group-hover:w-5 transition-all duration-300" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">КОНТАКТИ</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                    <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-[#666666] text-sm leading-relaxed">м. Одеса, Україна<br />вул. Дерибасівська, 1</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                    <Phone className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <a href="tel:+380980050505" className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm">
                    +38 (098) 005-05-05
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                    <Mail className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <a href="mailto:info@pro-repair.ua" className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm">
                    info@pro-repair.ua
                  </a>
                </li>
              </ul>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={openModal}
                className="mt-8 w-full py-4 uppercase font-heading font-black tracking-[0.15em] text-sm text-[#0e0e0e]"
                style={{ background: GOLD_GRAD }}>
                ЗАМОВИТИ ДЗВІНОК
              </motion.button>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#666666] text-xs">© 2025 Pro Repair. Всі права захищено.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#666666] hover:text-white transition-colors text-xs">Політика конфіденційності</a>
              <a href="#" className="text-[#666666] hover:text-white transition-colors text-xs">Умови використання</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
