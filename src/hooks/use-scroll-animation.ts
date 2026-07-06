'use client';

import { useRef } from 'react';
import { useInView, type Variants } from 'framer-motion';

interface UseScrollAnimationOptions {
  once?: boolean;
  margin?: string;
  amount?: 'some' | 'all' | number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin ?? '-80px',
    amount: options.amount ?? 'some',
  } as Parameters<typeof useInView>[1]);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 48 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return {
    ref,
    inView,
    variants: fadeUpVariants,
    initial: 'hidden',
    animate: inView ? 'show' : 'hidden',
  };
}