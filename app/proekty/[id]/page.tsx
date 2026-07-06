'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { THEME, ANIMATION } from '@/lib/constants';
import { PROJECTS } from '@/data/projects';
import { ArrowLeft, Calendar, MapPin, Ruler, Phone, ArrowRight } from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/sections/ContactModal';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const project = PROJECTS.find(p => p.id === Number(params.id));

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-black uppercase mb-4">Проєкт не знайдено</h1>
          <Link href="/proekty" className="text-[#C9A84C] hover:underline">
            Повернутися до всіх проєктів
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = PROJECTS
    .filter(p => p.id !== project.id && p.type === project.type)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0]">
      <Header onOpenModal={() => setModalOpen(true)} onScrollTo={scrollTo} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${project.cover}')`,
            opacity: 0.2,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/60 via-transparent to-[#0e0e0e]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 container mx-auto px-6"
        >
          <Link href="/proekty"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#C9A84C] transition-colors mb-8 text-sm uppercase tracking-wider font-heading">
            <ArrowLeft className="w-4 h-4" />
            Всі проєкти
          </Link>

          <div className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] font-heading font-bold mb-4">
            {project.type}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight mb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/60 text-sm font-sans">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#C9A84C]" />
              <span>{project.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A84C]" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>{project.year} рік</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Project Info */}
      <section className="py-24 border-y border-white/[0.06]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-6">
                  ОПИС ПРОЄКТУ
                </h2>
                <div className="h-[2px] w-16 mb-8" style={{ background: THEME.GOLD_GRAD }} />
                <p className="text-white/70 text-lg font-sans leading-relaxed mb-6">
                  Проєкт "{project.title}" — це яскравій приклад нашого підходу до створення простору.
                  Площа {project.area} дозволила нам реалізувати повне технічне завдання та досягти високих стандартів якості.
                </p>
                <p className="text-white/70 text-lg font-sans leading-relaxed">
                  Стиль: <span className="text-[#C9A84C] font-bold">{project.style}</span>. Термін реалізації — {project.duration}.
                  Всі роботи виконані з використанням преміум матеріалів з гарантією 5 років.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-white/[0.06] p-8 sticky top-24"
              >
                <h3 className="text-white font-heading font-bold text-lg uppercase tracking-wider mb-6">
                  Характеристики
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-sm">Тип</span>
                    <span className="text-white text-sm font-bold">{project.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-sm">Площа</span>
                    <span className="text-white text-sm font-bold">{project.area}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-sm">Термін</span>
                    <span className="text-white text-sm font-bold">{project.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-sm">Стиль</span>
                    <span className="text-white text-sm font-bold">{project.style}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                    <span className="text-white/50 text-sm">Рік</span>
                    <span className="text-white text-sm font-bold">{project.year}</span>
                  </div>
                </div>

                {project.price && (
                  <div className="mb-6">
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Вартість</div>
                    <div className="text-[#C9A84C] font-heading font-black text-2xl">{project.price}</div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setModalOpen(true)}
                  className="w-full relative overflow-hidden border border-[#C9A84C] text-[#C9A84C] px-6 py-4 text-sm uppercase font-heading font-bold tracking-[0.2em] group"
                >
                  <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: THEME.GOLD_GRAD }} />
                  <span className="relative z-10 group-hover:text-[#0e0e0e] transition-colors duration-300">ЗАМОВИТИ ПОДІБНИЙ</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
              ГАЛЕРЕЯ
            </h2>
            <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${project.title} - ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0e0e0e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-white/50 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-white/[0.02]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4">
                СХОЖІ ПРОЄКТИ
              </h2>
              <div className="h-[2px] w-24 mx-auto" style={{ background: THEME.GOLD_GRAD }} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, i) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/proekty/${relatedProject.id}`}>
                    <div className="group cursor-pointer border border-white/[0.06] hover:border-[#C9A84C]/30 transition-all duration-500 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedProject.cover}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-[#C9A84C] text-xs uppercase tracking-wider font-heading mb-2">
                          {relatedProject.type}
                        </div>
                        <h3 className="text-white font-heading font-bold text-lg uppercase tracking-wide group-hover:text-[#C9A84C] transition-colors">
                          {relatedProject.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-2 text-white/50 text-xs">
                          <Ruler className="w-3 h-3" />
                          <span>{relatedProject.area}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                ХОЧЕТЕ ТАКИЙ ЖЕ ПРОЄКТ?
              </h2>
              <p className="text-white/60 text-lg font-sans max-w-xl mx-auto mb-10">
                Залиште заявку, і ми реалізуємо ваш проєкт з такою ж якістю
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
}
