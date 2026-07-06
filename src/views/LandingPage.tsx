'use client';

import React, { useState } from 'react';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import CalculatorSection from '@/components/sections/Calculator';
import Testimonials from '@/components/sections/Testimonials';
import TimelineSection from '@/components/sections/Timeline';
import CTASection from '@/components/sections/CTA';
import FAQSection from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/sections/ContactModal';
import TrustBar from '@/components/TrustBar';
import ScrollProgress from '@/components/ScrollProgress';
import MouseFollower from '@/components/MouseFollower';
import SectionNav from '@/components/SectionNav';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingSocial from '@/components/FloatingSocial';
import { type Project } from '@/data/projects';

export default function LandingPage() {
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans selection:bg-[#C9A84C] selection:text-[#0e0e0e] overflow-x-hidden">
      <ContactModal open={modal} onClose={() => setModal(false)} />

      {/* Overlays */}
      <div>
        {showAllProjects && !selectedProject && (
          <div>All Projects overlay - to be implemented</div>
        )}
        {selectedProject && (
          <div>Project Detail overlay - to be implemented</div>
        )}
      </div>

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
        <Portfolio onSelectProject={setSelectedProject} onShowAll={() => setShowAllProjects(true)} />
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