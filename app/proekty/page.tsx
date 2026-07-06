'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { THEME, ANIMATION } from '@/lib/constants';
import { PROJECTS } from '@/data/projects';
import { ArrowRight, Calendar, MapPin, Ruler } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
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
            <span className="text-[#C9A84C] font-heading uppercase tracking-[0.3em] text-xs font-bold">Портфоліо</span>
            <div className="h-[2px] w-12" style={{ background: THEME.GOLD_GRAD }} />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight mb-6">
            НАШІ<br />
            <span style={{ background: THEME.GOLD_GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ПРОЄКТИ
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-sans max-w-2xl mx-auto">
            Більше 500 реалізованих проєктів по всій Україні. Кожен — унікальний.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              ВСІ ПРОЄКТИ
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * ANIMATION.STAGGER }}
              >
                <Link href={`/proekty/${project.id}`}>
                  <div className="group cursor-pointer border border-white/[0.06] hover:border-[#C9A84C]/30 transition-all duration-500 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-2 text-[#C9A84C] text-xs uppercase tracking-wider font-heading">
                          <span>Дивитися проєкт</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-[#C9A84C] text-xs uppercase tracking-wider font-heading mb-2">
                        {project.type}
                      </div>
                      <h3 className="text-white font-heading font-bold text-xl uppercase tracking-wide mb-4 group-hover:text-[#C9A84C] transition-colors">
                        {project.title}
                      </h3>

                      <div className="space-y-2 text-white/50 text-xs font-sans">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-3 h-3 text-[#C9A84C]" />
                          <span>{project.area}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-[#C9A84C]" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-[#C9A84C]" />
                          <span>{project.year} рік</span>
                        </div>
                      </div>

                      {project.price && (
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <span className="text-[#C9A84C] font-heading font-bold text-sm">
                            {project.price}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white/[0.02]">
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
                ХОЧЕТЕ ТАКИЙ ЖЕ?
              </h2>
              <p className="text-white/60 text-lg font-sans max-w-xl mx-auto mb-10">
                Обговоріть ваш проєкт з нашими спеціалістами. Ми реалізуємо будь-яку ідею.
              </p>
              <Link href="/#контакти">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-10 py-5 text-sm uppercase font-heading font-bold tracking-[0.2em] group"
                >
                  <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: THEME.GOLD_GRAD }} />
                  <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗАМОВИТИ КОНСУЛЬТАЦІЮ</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}