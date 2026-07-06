'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD_GRAD = 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)';

interface Testimonial {
  name: string;
  role: string;
  project: string;
  text: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Олена Ковальчук',
    role: 'Власниця апартаментів',
    project: '120 м², ЖК "Марина"',
    text: 'Звернулися до Pro Repair за рекомендацією друзів. Результат перевершив усі очікування! Ремонт зробили рівно за 4 місяці, як і обіцяли. Кожен етап узгоджували, дизайн-проєкт був настільки детальним, що ми одразу побачили свою майбутню квартиру. Дуже вдячні команді за професіоналізм та увагу до деталей!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=200&q=80',
  },
  {
    name: 'Михайло Гриценко',
    role: 'Власник вілли',
    project: '320 м², Вілла "Монако"',
    text: 'Будували будинок "під ключ". Pro Repair запропонували найкраще рішення по плануванню, зробили 3D-візуалізацію, яка повністю відповідає реальності. Окрема подяка за авторський нагляд — архітектор був на об\'єкті щотижня. Якість робіт на найвищому рівні. Рекомендую!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80',
  },
  {
    name: 'Тетяна Мороз',
    role: 'Директор компанії',
    project: '240 м², Офіс "Атріум"',
    text: 'Робили ремонт в офісі площею 240 м². Дуже важливо було вкластися в терміни, і Pro Repair це зробили! Якість робіт відмінна, матеріали преміум-класу. Окремо хочу відзначити меблі власного виробництва — виготовили за індивідуальними ескізами, все ідеально підійшло.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80',
  },
  {
    name: 'Андрій Мельник',
    role: 'Власник пентхаусу',
    project: '200 м², Пентхаус "Небо"',
    text: 'Це вже другий наш проєкт з Pro Repair. Перший був 3 роки тому, і ми настільки задоволені якістю, що знову звернулися. За 3 роки жодних нарікань — все працює ідеально. Гарантійне обслуговування на висоті. Дуже рекомендуємо!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Наталія Шевченко',
    role: 'Власниця квартири',
    project: '90 м², ЖК "Преміум"',
    text: 'Довго шукали надійну компанію для ремонту. Pro Repair сподобалися тим, що дали чіткий кошторис без прихованих платежів. Фіксована ціна, яка не змінилася в процесі. Дуже задоволені результатом — сучасно, стильно, якісно. Дякуємо!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const autoRef = useRef<ReturnType<typeof setInterval>>(null!);

  const goTo = useCallback((idx: number) => {
    const total = TESTIMONIALS.length;
    setDirection(idx > active ? 1 : -1);
    setActive(((idx % total) + total) % total);
  }, [active]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  };

  const t = TESTIMONIALS[active];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: EASE }}
          className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-10 md:p-14 relative overflow-hidden"
        >
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: GOLD_GRAD }} />

          {/* Quote icon */}
          <Quote className="absolute top-8 right-8 w-16 h-16 text-[#C9A84C]/10" />

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative w-24 h-24 overflow-hidden border-2 border-[#C9A84C]/30">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/40 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>

              <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-white font-heading font-black text-lg uppercase tracking-wider">
                    {t.name}
                  </h4>
                  <p className="text-[#666] font-sans text-sm">
                    {t.role} · {t.project}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => { prev(); resetAuto(); }}
          className="w-10 h-10 border border-white/10 hover:border-[#C9A84C]/60 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetAuto(); }}
              className="relative h-[3px] transition-all duration-500 overflow-hidden"
              style={{
                width: i === active ? 28 : 8,
                background: i === active ? 'transparent' : 'rgba(255,255,255,0.15)',
              }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0"
                  style={{ background: GOLD_GRAD }}
                  layoutId="testimonial-dot"
                />
              )}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => { next(); resetAuto(); }}
          className="w-10 h-10 border border-white/10 hover:border-[#C9A84C]/60 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Counter */}
      <div className="text-center mt-3">
        <span className="text-[#C9A84C] font-heading font-black text-xs">
          {String(active + 1).padStart(2, '0')}
        </span>
        <span className="text-white/20 font-heading text-xs">
          {' '}/ {String(TESTIMONIALS.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}