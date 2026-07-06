'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { PROJECTS } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── Portfolio Item ───────────────────────────────────── */
function PortfolioItem({ img, title, type, delay, onClick }: {
  img: string; title: string; type: string; delay: number; onClick: () => void;
}) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative group aspect-[4/3] overflow-hidden bg-[#0e0e0e] cursor-pointer"
      onClick={onClick}
    >
      <motion.img
        src={img}
        alt={title}
        className="w-full h-full object-cover opacity-60"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.9, ease: THEME.EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80" />
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: THEME.EASE }}
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

/* ─── Main Portfolio Component ─────────────────────────── */
interface PortfolioProps {
  onSelectProject: (project: typeof PROJECTS[0]) => void;
  onShowAll: () => void;
}

export default function Portfolio({ onSelectProject, onShowAll }: PortfolioProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="портфоліо" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=70')",
          opacity: 0.08,
        }}
      />

      <div className="container mx-auto px-6 mb-14 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ПОРТФОЛІО</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-black text-white uppercase tracking-tight">
            НАШІ <span className="text-[#C9A84C]">РОБОТИ</span>
          </h2>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={onShowAll}
          className="text-[#C9A84C] font-heading font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 hover:text-[#E2C97E] transition-colors"
        >
          ВСІ ПРОЄКТИ <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] bg-white/[0.04]">
          {PROJECTS.slice(0, 6).map((proj, i) => (
            <PortfolioItem
              key={proj.id}
              img={proj.cover}
              title={proj.title}
              type={proj.type}
              delay={i * 0.05}
              onClick={() => onSelectProject(proj)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}