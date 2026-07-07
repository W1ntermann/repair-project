'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MouseFollower() {
  const isMobile = useIsMobile();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { stiffness: 200, damping: 30 });
  const dotY = useSpring(cursorY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[999] w-6 h-6 rounded-full border border-[#C9A84C]/40 mix-blend-difference hidden lg:block"
      style={{
        x: dotX,
        y: dotY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
}
