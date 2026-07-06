'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD_GRAD = 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)';

const EVENTS = [
  { year: '2008', title: 'Заснування компанії', desc: 'Pro Repair розпочинає роботу в Одесі з командою з 5 майстрів.' },
  { year: '2011', title: 'Перший великий проєкт', desc: 'Ремонт бізнес-центру класу А площею 2000 м².' },
  { year: '2014', title: 'Власне виробництво', desc: 'Відкриття цеху з виготовлення корпусних та м\'яких меблів.' },
  { year: '2017', title: '100+ об\'єктів', desc: 'Компанія досягає позначки в 100 реалізованих проєктів.' },
  { year: '2020', title: 'Дизайн-студія', desc: 'Запуск власної дизайн-студії з 3D-візуалізацією.' },
  { year: '2023', title: '500+ об\'єктів', desc: 'Понад 500 завершених проєктів по всій Україні.' },
  { year: '2025', title: 'Преміум-сегмент', desc: 'Вихід на ринок преміум-нерухомості з індивідуальними проєктами.' },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2">
        <motion.div
          className="h-full w-full origin-top"
          style={{ background: GOLD_GRAD }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: EASE }}
        />
      </div>

      <div className="relative space-y-16">
        {EVENTS.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className={`flex items-center gap-8 md:gap-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-6 md:p-8 max-w-md ${isLeft ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className="text-3xl md:text-4xl font-heading font-black bg-clip-text text-transparent block mb-2"
                    style={{ backgroundImage: GOLD_GRAD }}
                  >
                    {event.year}
                  </span>
                  <h3 className="text-white font-heading font-black text-lg uppercase tracking-wider mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[#666] font-sans text-sm leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="relative z-10 shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  className="w-5 h-5 rounded-full border-2 border-[#C9A84C] bg-[#0e0e0e]"
                  style={{ boxShadow: '0 0 20px rgba(201,168,76,0.3)' }}
                />
              </div>

              {/* Spacer */}
              <div className="flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}