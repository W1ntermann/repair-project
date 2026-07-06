'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { THEME, ANIMATION } from '@/lib/constants';
import { Wrench, CheckCircle2, Clock, Shield, Phone } from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/sections/ContactModal';

export default function RemontPage() {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const [modalOpen, setModalOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    'Демонтажні роботи',
    'Чорнові та чистові роботи',
    'Укладання плитки та кераміки',
    'Фарбування стін та стелі',
    'Монтаж сантехніки',
    'Електричні роботи',
    'Установка підлогів',
    'Монтаж гіпсокартону',
  ];

  const process = [
    { num: '01', title: 'ЗУСТРІЧ ТА ОГЛЯД', desc: 'Безкоштовний виїзд на об\'єкт, оцінка обсягів робіт' },
    { num: '02', title: 'ДИЗАЙН-ПРОЄКТ', desc: 'Розробка детального проєкту з 3D-візуалізацією' },
    { num: '03', title: 'КОМЕРЦІЙНА ПРОПОЗИЦІЯ', desc: 'Фіксована ціна, чіткий графік, договір' },
    { num: '04', title: 'РЕАЛІЗАЦІЯ', desc: 'Ремонт під наглядом прораба з регулярними звітами' },
    { num: '05', title: 'ЗДАЧА ОБ\'ЄКТУ', desc: 'Перевірка якості, прибирання, передача ключів' },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0]">
      <Header onOpenModal={() => setModalOpen(true)} onScrollTo={scrollTo} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
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
            РЕМОНТ<br />
            <span style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ПІД КЛЮЧ
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10">
            Комплексний ремонт від демонтажу до фінішного оздоблення. Фіксована ціна, гарантія 5 років.
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
              ЩО ВХОДИТЬ В РЕМОНТ
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              ПРОЦЕС РОБОТИ
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

      {/* Benefits Section */}
      <section className="py-24 bg-white/[0.02]">
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
              { icon: Clock, title: 'ТОЧНІ ТЕРМІНИ', desc: 'Фіксовані терміни в договорі. Кожен день прострочки — компенсація.' },
              { icon: Shield, title: 'ГАРАНТІЯ 5 РОКІВ', desc: 'Письмова гарантія на всі види робіт. Без прихованих умов.' },
              { icon: CheckCircle2, title: 'ФІКСОВАНА ЦІНА', desc: 'Ціна не змінюється під час ремонту. Всі умови в договорі.' },
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
                ГОТОВІ ПОЧАТИ?
              </h2>
              <p className="text-white/60 text-lg font-sans max-w-xl mx-auto mb-10">
                Залиште заявку, і ми зв\'яжемося з вами протягом 15 хвилин для безкоштовної консультації
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

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
}
