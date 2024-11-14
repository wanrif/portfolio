import ThemeMode from '@components/ThemeMode';
import { selectLocale } from '@containers/app/selectors';
import Language from '@containers/language';
import { useGSAP } from '@gsap/react';
import { useAppSelector } from '@stores/hooks';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { GiAngelWings, GiBugleCall, GiJetFighter, GiSkills } from 'react-icons/gi';
import { animateTooltip, containerVariants, menuItemVariants } from './animations';

const FloatingMenu: React.FC = () => {
  const locale = useAppSelector(selectLocale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipAnimationRef = useRef<GSAPTween | null>(null);

  const scrollObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      threshold: 0,
      rootMargin: '0px',
    };

    scrollObserver.current = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    }, options);

    const target = document.getElementById('header') || document.body;
    scrollObserver.current.observe(target);

    return () => scrollObserver.current?.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const menuList = useMemo(
    () => [
      {
        component: <GiAngelWings className='w-7 h-7' />,
        handleClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        tooltip: 'About',
      },
      {
        component: <GiJetFighter className='w-7 h-7' />,
        handleClick: () => scrollToSection('experiences'),
        tooltip: 'Experiences',
      },
      {
        component: <GiSkills className='w-7 h-7' />,
        handleClick: () => scrollToSection('skills'),
        tooltip: 'My Skills',
      },
      {
        component: <GiBugleCall className='w-7 h-7' />,
        handleClick: () => scrollToSection('contacts'),
        tooltip: 'Contacts',
      },
      {
        component: <ThemeMode />,
        tooltip: 'Theme',
      },
      {
        component: <Language />,
        tooltip: locale,
      },
    ],
    [locale, scrollToSection]
  );

  const handleMouseEnter = useCallback((index: number) => {
    setTooltipIndex(index);
    if (tooltipRef.current) {
      tooltipAnimationRef.current?.kill();
      tooltipAnimationRef.current = animateTooltip(tooltipRef.current, true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tooltipRef.current) {
      tooltipAnimationRef.current?.kill();
      tooltipAnimationRef.current = animateTooltip(tooltipRef.current, false);
    }
  }, []);

  useGSAP(() => {
    const items = gsap.utils.toArray('.menu-item');
    gsap.set(items, { opacity: 0, y: 50 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
      rotation: (i: number) => (i % 2 === 0 ? 15 : -15),
    });
  }, []);

  return (
    <div className='fixed bottom-0 py-4 w-screen flex justify-center items-center'>
      <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={containerVariants}
        className={`${
          isScrolled ? 'backdrop-blur-lg bg-white/30 dark:bg-black/30' : 'bg-gallery-50 dark:bg-tuna-950'
        } shadow-md rounded-full py-2 px-4 w-fit flex items-center gap-x-4 relative`}
        id='floating-menu-container'
      >
        <div
          id='tooltip'
          ref={tooltipRef}
          className='absolute bottom-full px-3 py-1 bg-shark-200/50 dark:bg-tuna-900/50 backdrop-blur text-sm rounded-full border border-shark-500 pointer-events-none opacity-0 capitalize'
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            overflow: 'hidden',
          }}
        >
          <div
            id='tooltip-track'
            style={{
              transform: `translateX(${-tooltipIndex * 100}px)`,
              transition: 'transform 0.3s ease-in-out',
              whiteSpace: 'nowrap',
            }}
          >
            {menuList.map((item, index) => (
              <span
                id='tooltip-text'
                key={index}
                style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}
                className='text-tertiary-500 dark:text-gallery-100'
              >
                {item.tooltip}
              </span>
            ))}
          </div>
        </div>
        {menuList.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={menuItemVariants}
            whileHover={{ scale: 1.2, rotate: 0, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 1.1, rotate: 0 }}
            className='font-semibold cursor-pointer select-none text-tertiary-500 dark:text-gallery-100'
            onClick={item.handleClick}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.component}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(FloatingMenu);
