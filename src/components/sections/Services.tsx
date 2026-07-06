'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { THEME, ANIMATION } from '@/lib/constants';
import { SERVICES } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Wrench, Palette, Building2, Sofa } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Wrench,
  Palette,
  Building2,
  Sofa,
};

const SERVICE_LINKS: Record<string, string> = {
  '01': '/uslugi/remont',
  '02': '/uslugi/dizajn',
  '03': '/uslugi/remont',
  '04': '/uslugi/mebli',
};

/* ─── Service Card ─────────────────────────────────────── */
function ServiceCard({ num, title, desc, icon, delay }: { num: string; title: string; desc: string; icon: string; delay: number }) {
  const { ref, inView } = useScrollAnimation();
  const IconComponent = ICON_MAP[icon] || Wrench;
  const href = SERVICE_LINKS[num] || '#';

  return (
    <Link href={href} className="block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="p-10 lg:p-12 group cursor-pointer hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full border border-transparent hover:border-white/[0.08]"
      >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 to-transparent transition-all duration-700" />
      <div>
        <div className="flex items-start justify-between mb-6">
          <span className="text-[#C9A84C] opacity-15 font-heading font-black text-6xl block group-hover:opacity-60 transition-opacity duration-500 transform group-hover:-translate-y-1">
            {num}
          </span>
          <div className="relative">
            <div className="absolute inset-0 bg-[#C9A84C]/20 blur-lg rounded-full" />
            <div className="relative w-12 h-12 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-[#C9A84C]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <h3 className="text-white font-heading text-xl font-black uppercase tracking-[0.2em] mb-4 group-hover:text-[#C9A84C] transition-colors">{title}</h3>
        <p className="text-[#666666] text-sm font-sans leading-relaxed group-hover:text-white/60 transition-colors">{desc}</p>
      </div>
      <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="h-[2px] flex-1" style={{ background: THEME.GOLD_GRAD }} />
        <span className="text-[#C9A84C] text-xs font-sans uppercase tracking-wider">Детальніше</span>
      </div>
      </motion.div>
    </Link>
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

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} {...service} delay={i * ANIMATION.STAGGER} />
          ))}
        </div>
      </div>
    </section>
  );
}