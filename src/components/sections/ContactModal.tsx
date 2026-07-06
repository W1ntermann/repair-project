'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, Phone, Mail, MapPin } from 'lucide-react';
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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return `+380 (${numbers}`;
    if (numbers.length <= 6) return `+380 (${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    if (numbers.length <= 8) return `+380 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `+380 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
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
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      required value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
                      placeholder="+380 (XX) XXX-XX-XX"
                      type="tel"
                      maxLength={19}
                      className="bg-white/[0.04] border border-white/[0.08] pl-12 pr-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors w-full"
                    />
                  </div>
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
                    className="mt-2 py-5 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e] flex items-center justify-center gap-3 relative overflow-hidden group"
                    style={{ background: THEME.GOLD_GRAD }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      НАДІСЛАТИ ЗАЯВКУ <Send className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </motion.button>
                  <p className="text-white/20 font-sans text-xs text-center">
                    Надсилаючи заявку, ви погоджуєтесь з <a href="#" className="underline hover:text-white/50 transition-colors">політикою конфіденційності</a>
                  </p>
                </form>
              </>
            )}

            {/* Contact info */}
            <div className="mt-8 pt-8 border-t border-white/[0.08]">
              <div className="grid grid-cols-1 gap-4">
                <a href="tel:+380980050505" className="flex items-center gap-3 text-white/50 hover:text-[#C9A84C] transition-colors group">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#C9A84C]/50 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Телефон</div>
                    <div className="text-sm font-sans">+380 (98) 005-05-05</div>
                  </div>
                </a>
                <a href="mailto:info@pro-repair.ua" className="flex items-center gap-3 text-white/50 hover:text-[#C9A84C] transition-colors group">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#C9A84C]/50 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Email</div>
                    <div className="text-sm font-sans">info@pro-repair.ua</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/50">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Адреса</div>
                    <div className="text-sm font-sans">м. Одеса, вул. Архітектурна, 1</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
