'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  style?: React.CSSProperties;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 48,
  className = '',
  once = true,
  margin = '-80px',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  const getVariants = (): Variants => {
    const hidden: Record<string, number | string> = { opacity: 0 };
    const show: Record<string, number | string> = { opacity: 1 };

    switch (direction) {
      case 'up':
        hidden.y = distance;
        show.y = 0;
        break;
      case 'down':
        hidden.y = -distance;
        show.y = 0;
        break;
      case 'left':
        hidden.x = distance;
        show.x = 0;
        break;
      case 'right':
        hidden.x = -distance;
        show.x = 0;
        break;
      case 'scale':
        hidden.scale = 0.85;
        show.scale = 1;
        break;
      case 'none':
        return {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration, ease: EASE, delay } },
        };
    }

    return {
      hidden,
      show: {
        ...show,
        transition: { duration, ease: EASE, delay },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={getVariants()}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}