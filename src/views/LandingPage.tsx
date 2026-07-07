'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import WhyUs from '@/components/sections/WhyUs';
import ContactModal from '@/components/sections/ContactModal';
import TrustBar from '@/components/TrustBar';
import ScrollProgress from '@/components/ScrollProgress';
import MouseFollower from '@/components/MouseFollower';
import SectionNav from '@/components/SectionNav';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingSocial from '@/components/FloatingSocial';

// Below-the-fold sections are code-split to shrink the initial JS bundle on mobile.
const Pricing = dynamic(() => import('@/components/sections/Pricing').then((m) => m.default), { ssr: true });
const CalculatorSection = dynamic(() => import('@/components/sections/Calculator').then((m) => m.default), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then((m) => m.default), { ssr: true });
const TimelineSection = dynamic(() => import('@/components/sections/Timeline').then((m) => m.default), { ssr: true });
const CTASection = dynamic(() => import('@/components/sections/CTA').then((m) => m.default), { ssr: true });
const FAQSection = dynamic(() => import('@/components/sections/FAQ').then((m) => m.default), { ssr: true });
const Footer = dynamic(() => import('@/components/sections/Footer').then((m) => m.default), { ssr: true });

export default function LandingPage() {
  const [modal, setModal] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans selection:bg-[#C9A84C] selection:text-[#0e0e0e] overflow-x-hidden">
      <ContactModal open={modal} onClose={() => setModal(false)} />

      <Header onOpenModal={() => setModal(true)} onScrollTo={scrollTo} />
      <ScrollProgress />
      <MouseFollower />
      <SectionNav />
      <ScrollToTop />
      <FloatingSocial />

      <main>
        <Hero onOpenModal={() => setModal(true)} onScrollTo={scrollTo} />
        <Services />
        <About onOpenModal={() => setModal(true)} onScrollTo={scrollTo} />
        <Portfolio />
        <TrustBar />
        <WhyUs />
        <Testimonials />
        <TimelineSection />
        <Pricing onContact={() => setModal(true)} />
        <CalculatorSection onContact={() => setModal(true)} />
        <FAQSection onContact={() => setModal(true)} />
        <CTASection onOpenModal={() => setModal(true)} />
      </main>

      <Footer onOpenModal={() => setModal(true)} />
    </div>
  );
}
