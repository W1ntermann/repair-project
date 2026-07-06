'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check } from 'lucide-react';
import { THEME } from '@/lib/constants';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setName('');
      setPhone('');
      setMsg('');
      setTime('');
    }, 2400);
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
            transition={{ duration: 0.4, ease: THEME.EASE }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#161616]/95 backdrop-blur-2xl border border-white/10 p-10 overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(201,168,76,0.15)' }}
          >
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: THEME.GOLD_GRAD }} />

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
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
                  <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">ЗВОРОТНІЙ ЗВ'ЯЗОК</span>
                </div>
                <h3 className="text-white font-heading font-black text-3xl uppercase tracking-tight mb-8">
                  Обговоримо<br />
                  <span style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                    style={{ background: THEME.GOLD_GRAD }}
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