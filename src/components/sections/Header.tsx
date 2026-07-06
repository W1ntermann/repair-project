'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { THEME } from '@/lib/constants';
import { NAV_ITEMS } from '@/data/services';

interface HeaderProps {
  onOpenModal: () => void;
  onScrollTo: (id: string) => void;
}

export default function Header({ onOpenModal, onScrollTo }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={scrolled
        ? { backgroundColor: 'rgba(14,14,14,0.85)', backdropFilter: 'blur(24px)', borderBottomColor: 'rgba(201,168,76,0.18)' }
        : { backgroundColor: 'rgba(14,14,14,0)', backdropFilter: 'blur(0px)', borderBottomColor: 'rgba(255,255,255,0.06)' }
      }
      transition={{ duration: 0.4 }}
      className="fixed w-full top-0 left-0 z-50 border-b h-20 flex items-center"
      style={{ WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)' } as React.CSSProperties}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />

        <nav className="hidden xl:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
              onClick={() => onScrollTo(item.id)}
              className="text-[#f0f0f0]/80 text-[11px] font-heading font-bold uppercase tracking-[0.2em] hover:text-[#C9A84C] transition-colors relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                style={{ background: THEME.GOLD_GRAD }} />
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
            onClick={onOpenModal}
            className="relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-[11px] uppercase font-heading font-bold tracking-[0.2em] group"
          >
            <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: THEME.GOLD_GRAD }} />
            <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗВОРОТНІЙ ДЗВІНОК</span>
          </motion.button>
        </div>

        <button className="xl:hidden text-white hover:text-[#C9A84C] transition-colors" onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.4, ease: THEME.EASE }}
            className="fixed inset-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-2xl flex flex-col p-8 pt-32 xl:hidden"
          >
            <nav className="flex flex-col gap-6 mb-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="text-left text-white text-3xl font-heading font-black uppercase tracking-widest hover:text-[#C9A84C] transition-colors"
                  onClick={() => { onScrollTo(item.id); setMobileOpen(false); }}
                >{item.label}</motion.button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-8">
              <a href="tel:+380980050505" className="flex items-center gap-3 text-[#f0f0f0] font-heading text-xl font-bold">
                <Phone className="w-5 h-5 text-[#C9A84C]" /> +38 (098) 005-05-05
              </a>
              <button onClick={onOpenModal}
                className="py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
                style={{ background: THEME.GOLD_GRAD }}>
                ЗВОРОТНІЙ ДЗВІНОК
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}