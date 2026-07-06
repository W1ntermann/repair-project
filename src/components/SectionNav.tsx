'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'головна', label: 'Головна' },
  { id: 'послуги', label: 'Послуги' },
  { id: 'про-нас', label: 'Про нас' },
  { id: 'портфоліо', label: 'Портфоліо' },
  { id: 'переваги', label: 'Переваги' },
  { id: 'відгуки', label: 'Відгуки' },
  { id: 'прайс', label: 'Прайс' },
];

export default function SectionNav() {
  const [active, setActive] = useState('головна');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3"
          title={label}
        >
          <span className={`text-[8px] font-heading font-black uppercase tracking-[0.2em] transition-all duration-300
            ${active === id ? 'text-[#C9A84C] opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}>
            {label}
          </span>
          <div className="relative w-3 h-3 flex items-center justify-center">
            <div
              className={`w-[2px] transition-all duration-300 ${
                active === id ? 'h-3 bg-[#C9A84C]' : 'h-2 bg-white/20 group-hover:h-3 group-hover:bg-white/40'
              }`}
            />
            {active === id && (
              <motion.div
                layoutId="nav-dot"
                className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                style={{ boxShadow: '0 0 8px rgba(201,168,76,0.6)' }}
              />
            )}
          </div>
        </button>
      ))}
    </nav>
  );
}