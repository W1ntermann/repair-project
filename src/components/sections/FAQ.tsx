'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { THEME, ANIMATION } from '@/lib/constants';
import { FAQ as FAQ_DATA } from '@/data/faq';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

/* ─── FAQ Item ─────────────────────────────────────────── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * ANIMATION.STAGGER }}
      className="border-b border-white/[0.08] last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5 text-[#C9A84C] opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-white font-heading font-bold text-lg uppercase tracking-wider group-hover:text-[#C9A84C] transition-colors">
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-[#C9A84C]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: THEME.EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-12">
              <p className="text-white/60 font-sans text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main FAQ Component ───────────────────────────────── */
interface FAQProps {
  onContact: () => void;
}

export default function FAQ({ onContact }: FAQProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="faq" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">FAQ</span>
            <div className="w-12 h-[2px]" style={{ background: THEME.GOLD_GRAD }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            ЧАСТІ <span className="text-[#C9A84C]">ПИТАННЯ</span>
          </h2>
          <p className="text-white/50 font-sans text-sm max-w-2xl mx-auto">
            Відповіді на найпоширеніші запитання про наші послуги
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] p-8 md:p-12">
            {FAQ_DATA.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 font-sans text-sm mb-6">
            Не знайшли відповідь на своє питання?
          </p>
          <button
            onClick={onContact}
            className="px-8 py-4 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e] inline-flex items-center gap-3 group"
            style={{ background: THEME.GOLD_GRAD }}
          >
            <span className="relative z-10">ЗВ'ЯЗАТИСЯ З НАМИ</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}