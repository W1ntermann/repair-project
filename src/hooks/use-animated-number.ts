'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseAnimatedNumberOptions {
  target: number;
  suffix?: string;
  duration?: number;
  enabled?: boolean;
  threshold?: number;
}

export function useAnimatedNumber({
  target,
  suffix = '',
  duration = 1600,
  enabled = true,
  threshold = -60,
}: UseAnimatedNumberOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: `${threshold}px` });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!enabled || !inView) return;

    let start = 0;
    let rafId: number;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));

      if (p < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, inView, target, duration]);

  return { ref, val, suffix };
}