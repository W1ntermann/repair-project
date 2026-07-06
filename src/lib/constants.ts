export const THEME = {
  GOLD: '#C9A84C',
  GOLD_LIGHT: '#E2C97E',
  GOLD_GRAD: 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)',
  DARK: '#0e0e0e',
  EASE: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const;

export const ANIMATION = {
  DURATION: {
    FAST: 0.4,
    NORMAL: 0.6,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
  },
  STAGGER: 0.1,
  VIEWPORT_MARGIN: '-80px',
} as const;

export const PHONE = '+380980050505';
export const EMAIL = 'info@pro-repair.ua';
export const COMPANY_NAME = 'Pro Repair';