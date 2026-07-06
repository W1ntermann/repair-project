'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { THEME, ANIMATION } from '@/lib/constants';
import { Sofa, CheckCircle2, Clock, Award, Phone } from 'lucide-react';
import ContactModal from '@/components/sections/ContactModal';

export default function MebliPage() {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const [modalOpen, setModalOpen] = React.useState(false);

  const features = [
    'Корпусні меблі на замовлення',
    'М\'які меблі за індивідуальним дизайном',
    'Кухні та шафи-купе',
    'Меблі для ванних кімнат',
    'Офісні меблі',
    'Вітальні та спальні комплекти',
  ];

  const process = [
    { num: '01', title: 'КОНСУЛЬТАЦІЯ', desc: 'Обговорення потреб, вимірювання, консультація дизайнера' },
    { num: '02', title: 'ДИЗАЙН-ПРОЄКТ', desc: 'Створення ескізів та 3D-візуалізації меблів' },
    { num: '03', title: 'ВИБІР МАТЕРІАЛІВ', desc: 'Підбір матеріалів, фурнітури та фурнітури преміум-класу' },
    { num: '04', title: 'ВИРОБНИЦТВО', desc: 'Виготовлення на власному виробничому комплексі' },
    { num: '05', title: 'ДОСТАВКА ТА МОНТАЖ', desc: 'Доставка, встановлення та налаштування меблів' },
  ];

  const materials = [
    'ДСП та МDF преміум-класу',
    'Масив деревини (дуб, ясен, бук)',
    'МДФ з шпоном',
    'Пластик ABL та HPL',
    'М\'гкі наповнювачі (поролон, пінополиуретан)',
    'Тканини та шкіра преміум-класу',
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0]">
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80')",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/50 via-transparent to-[#0e0e0e]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12" style={{ background: THEME.GOLD_GRAD }} />
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">Послуга</span>
            <div className="h-[2px] w-12" style={{ background: THEME.GOLD_GRAD }} />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight mb-6">
            МЕБЛІ<br />
            <span style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              НА ЗАМОВЛЕННЯ
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10">
            Власне виробництво корпусних та м\'яких меблів за індивідуальними ескізами. Якість від виробника.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(true)}
            className="relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-10 py-5 text-sm uppercase font-heading font-bold tracking-[0.2em] group"
          >
            <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: THEME.GOLD_GRAD }} />
            <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗАМОВИТИ КОНСУЛЬТАЦІЮ</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y border-white/[0.06]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              ЩО МИ ВИРОБЛЯЄМО
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * ANIMATION.STAGGER }}
                className="flex items-center gap-3 p-6 border border-white/[0.06] hover:border-[#C9A84C]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                <span className="text-white/80 font-sans text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              ПРОЦЕС ВИРОБНИЦТВА
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-heading font-black text-[#C9A84C]/10 mb-4">{step.num}</div>
                <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed">{step.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-[2px]" style={{ background: THEME.GOLD_GRAD, opacity: 0.3 }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              МАТЕРІАЛИ
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * ANIMATION.STAGGER }}
                className="flex items-center gap-3 p-6 border border-white/[0.06] hover:border-[#C9A84C]/30 transition-colors"
              >
                <Sofa className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                <span className="text-white/80 font-sans text-sm">{material}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              ПЕРЕВАГИ
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'ВЛАСНЕ ВИРОБНИЦТВО', desc: 'Без посередників — вища якість, нижча ціна, повний контроль' },
              { icon: Clock, title: 'ТОЧНІ ТЕРМІНИ', desc: 'Виготовлення від 14 днів. Дотримуємося домовленостей' },
              { icon: CheckCircle2, title: 'ГАРАНТІЯ 5 РОКІВ', desc: 'Повна гарантія на всі види меблів та фурнітури' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 border border-white/[0.06] hover:border-[#C9A84C]/30 transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-[#C9A84C]/30 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3 className="text-white font-heading font-bold text-lg uppercase tracking-wider mb-3">{benefit.title}</h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 border border-[#C9A84C]/20 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight mb-6">
                МЕБЛІ ВАШОЇ МРІЇ
              </h2>
              <p className="text-white/60 text-lg font-sans max-w-xl mx-auto mb-10">
                Залиште заявку, і наш дизайнер допоможе створити унікальні меблі для вашого простору
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setModalOpen(true)}
                  className="relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-10 py-5 text-sm uppercase font-heading font-bold tracking-[0.2em] group"
                >
                  <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: THEME.GOLD_GRAD }} />
                  <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗАЛИШИТИ ЗАЯВКУ</span>
                </motion.button>
                <a href="tel:+380980050505"
                  className="flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-5 text-sm uppercase font-heading font-bold tracking-[0.2em] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                  <Phone className="w-4 h-4" />
                  +38 (098) 005-05-05
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}