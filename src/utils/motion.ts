const isMobileViewport = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

export const pageEnterMotion = () => {
  const isMobile = isMobileViewport();

  return {
    initial: { opacity: 0, y: isMobile ? 14 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.4 : 0.5, ease: 'easeOut' as const },
  };
};

export const sectionInViewMotion = () => {
  const isMobile = isMobileViewport();

  return {
    initial: { opacity: 0, y: isMobile ? 10 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: isMobile ? 0.1 : 0.2 },
    transition: { duration: isMobile ? 0.32 : 0.4, ease: 'easeOut' as const },
  };
};

export const makeStaggerInViewMotion = (index: number, step = 0.08) => ({
  initial: { opacity: 0, y: isMobileViewport() ? 10 : 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: isMobileViewport() ? 0.1 : 0.15 },
  transition: {
    duration: isMobileViewport() ? 0.28 : 0.35,
    delay: index * (isMobileViewport() ? Math.min(step, 0.045) : step),
    ease: 'easeOut' as const,
  },
});

export const cardInteractionMotion = () => ({
  whileHover: { scale: isMobileViewport() ? 1.01 : 1.02 },
  whileTap: { scale: isMobileViewport() ? 0.99 : 0.98 },
});

export const iconInteractionMotion = () => ({
  whileHover: { scale: isMobileViewport() ? 1.04 : 1.08 },
  whileTap: { scale: isMobileViewport() ? 0.98 : 0.95 },
});
