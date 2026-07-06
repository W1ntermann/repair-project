'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Instagram, Facebook, Youtube,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { THEME } from '@/lib/constants';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/data/services';

const ICON_MAP: Record<string, React.ElementType> = {
  Instagram, Facebook, Youtube,
};

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-white/[0.06]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=1920&q=70')",
          opacity: 0.07,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Logo className="mb-6" />
            <p className="text-[#666666] text-sm leading-relaxed mb-8 pr-4">
              Преміальний ремонт під ключ в Одесі. Створюємо простори, що відображають ваш статус та бездоганний смак.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href }, i) => {
                const SocialIcon = ICON_MAP[Icon];
                return (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#0e0e0e] hover:border-transparent transition-all"
                    style={{ background: undefined }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = THEME.GOLD_GRAD)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {SocialIcon && <SocialIcon className="w-4 h-4" />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">НАВІГАЦІЯ</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group"
                  >
                    <span className="w-0 h-[1px] bg-[#C9A84C] group-hover:w-5 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">ПОСЛУГИ</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.services.map((service) => (
                <li key={service.label}>
                  {service.href === '#' ? (
                    <button
                      onClick={onOpenModal}
                      className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group text-left"
                    >
                      <span className="w-0 h-[1px] bg-[#C9A84C] group-hover:w-5 transition-all duration-300" />
                      {service.label}
                    </button>
                  ) : (
                    <a
                      href={service.href}
                      className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group"
                    >
                      <span className="w-0 h-[1px] bg-[#C9A84C] group-hover:w-5 transition-all duration-300" />
                      {service.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-heading font-black text-sm uppercase tracking-widest mb-6">КОНТАКТИ</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <span className="text-[#666666] text-sm leading-relaxed">м. Одеса, Україна<br />вул. Дерибасівська, 1</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                  <Phone className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <a href="tel:+380980050505" className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm">
                  +38 (098) 005-05-05
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center shrink-0 bg-white/[0.02]">
                  <Mail className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <a href="mailto:info@pro-repair.ua" className="text-[#666666] hover:text-[#C9A84C] transition-colors text-sm">
                  info@pro-repair.ua
                </a>
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenModal}
              className="mt-8 w-full py-4 uppercase font-heading font-black tracking-[0.15em] text-sm text-[#0e0e0e]"
              style={{ background: THEME.GOLD_GRAD }}
            >
              ЗАМОВИТИ ДЗВІНОК
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666666] text-xs">© 2025 Pro Repair. Всі права захищено.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#666666] hover:text-white transition-colors text-xs">Політика конфіденційності</a>
            <a href="#" className="text-[#666666] hover:text-white transition-colors text-xs">Умови використання</a>
          </div>
        </div>
      </div>
    </footer>
  );
}