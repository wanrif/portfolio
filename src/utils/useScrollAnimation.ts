import React, { useEffect } from 'react';

import gsap from 'gsap';

const useScrollAnimation = (ref: React.RefObject<HTMLElement>, delay = 0) => {
  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, delay]);
};

export default useScrollAnimation;
