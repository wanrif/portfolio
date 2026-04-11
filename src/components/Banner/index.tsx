import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Tooltip from '@components/Tooltip';
import { getLoopTempo } from '@utils/loopTempo';
import { iconInteractionMotion, pageEnterMotion, sectionInViewMotion } from '@utils/motion';
import scrollToSection from '@utils/scrollToSection';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { GiAce, GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';

import ParticleBackground from './ParticleBackground';

interface ISocialLink {
  href: string;
  icon: React.ReactNode;
  tooltipText: string;
}

const Banner: React.FC = () => {
  const { t } = useTranslation();
  const bannerRef = useRef<HTMLElement | null>(null);
  const commandScanRef = useRef<HTMLSpanElement | null>(null);
  const signalPacketRef = useRef<HTMLSpanElement | null>(null);
  const runtimeCardRef = useRef<HTMLDivElement | null>(null);
  const runtimeWindowRef = useRef<HTMLDivElement | null>(null);
  const rogueLayerRef = useRef<HTMLDivElement | null>(null);
  const rogueProbeRef = useRef<HTMLSpanElement | null>(null);
  const rogueFlashRef = useRef<HTMLSpanElement | null>(null);
  const portalRingRef = useRef<HTMLSpanElement | null>(null);
  const portalGlowRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const tempo = getLoopTempo(isMobile);
    let onRuntimeActive: (() => void) | undefined;
    let onRuntimeIdle: (() => void) | undefined;
    let onRuntimeWindowTrigger: (() => void) | undefined;
    const runtimeCardElement = runtimeCardRef.current;
    const runtimeWindowElement = runtimeWindowRef.current;

    const context = gsap.context(() => {
      gsap.to('.js-profile-float', {
        y: isMobile ? -2 : -6,
        duration: tempo.sway,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      if (!isMobile) {
        gsap.to('.js-terminal-orbit', {
          rotate: 360,
          duration: tempo.orbit,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });

        gsap.utils.toArray<HTMLElement>('.js-signal-chip').forEach((chip, index) => {
          gsap.to(chip, {
            y: index % 2 === 0 ? -5 : 5,
            x: index % 2 === 0 ? 2 : -2,
            duration: tempo.pulseSlow + index * tempo.beat,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      }

      if (commandScanRef.current) {
        const scanElement = commandScanRef.current;
        gsap.fromTo(
          scanElement,
          {
            x: () => -scanElement.offsetWidth,
          },
          {
            x: () => scanElement.parentElement?.clientWidth ?? 0,
            duration: tempo.sweep,
            ease: 'none',
            repeat: -1,
            repeatDelay: tempo.sweepPause,
            repeatRefresh: true,
          },
        );
      }

      if (signalPacketRef.current) {
        const packetElement = signalPacketRef.current;
        gsap.fromTo(
          packetElement,
          {
            x: () => -packetElement.offsetWidth,
            scale: isMobile ? 0.9 : 1,
            opacity: 0.72,
          },
          {
            x: () => packetElement.parentElement?.clientWidth ?? 0,
            duration: tempo.sweep,
            ease: 'none',
            repeat: -1,
            repeatDelay: tempo.sweepPause,
            repeatRefresh: true,
            opacity: 1,
          },
        );
      }

      gsap.fromTo(
        '.js-runtime-pulse-dot',
        {
          opacity: 0.34,
          scale: 0.72,
        },
        {
          opacity: 1,
          scale: 1.02,
          duration: tempo.pulseSlow,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: tempo.stagger,
        },
      );

      const runtimeBarTweens = gsap.utils
        .toArray<HTMLElement>('.js-runtime-bar')
        .map((bar, index) =>
          gsap.to(bar, {
            scaleY: isMobile ? 0.52 : 0.4,
            duration: tempo.barBase + (index % 3) * tempo.barStep,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: tempo.beat,
            delay: index * tempo.beat,
          }),
        );

      if (runtimeCardElement && runtimeBarTweens.length > 0) {
        const activeTimeScale = isMobile ? 1.2 : 1.5;

        onRuntimeActive = () => {
          gsap.to(runtimeBarTweens, {
            timeScale: activeTimeScale,
            duration: tempo.hover,
            overwrite: true,
          });
        };

        onRuntimeIdle = () => {
          gsap.to(runtimeBarTweens, {
            timeScale: 1,
            duration: tempo.hover,
            overwrite: true,
          });
        };

        runtimeCardElement.addEventListener('pointerenter', onRuntimeActive);
        runtimeCardElement.addEventListener('pointerleave', onRuntimeIdle);
        runtimeCardElement.addEventListener('focusin', onRuntimeActive);
        runtimeCardElement.addEventListener('focusout', onRuntimeIdle);
      }

      if (runtimeWindowElement && portalRingRef.current && portalGlowRef.current) {
        let isPortalRunning = false;

        gsap.set([portalRingRef.current, portalGlowRef.current], { autoAlpha: 0 });

        onRuntimeWindowTrigger = () => {
          if (isPortalRunning) return;
          isPortalRunning = true;

          const sparkElements = gsap.utils.toArray<HTMLElement>('.js-portal-spark');
          const portalTimeline = gsap.timeline({
            onComplete: () => {
              isPortalRunning = false;
            },
          });

          portalTimeline
            .fromTo(
              portalRingRef.current,
              {
                autoAlpha: 0,
                scale: 0.25,
                rotate: -26,
              },
              {
                autoAlpha: 1,
                scale: 1.1,
                rotate: 20,
                duration: tempo.pulseSlow,
                ease: 'power3.out',
              },
            )
            .to(
              portalGlowRef.current,
              {
                autoAlpha: 0.55,
                duration: tempo.hover,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut',
              },
              '<',
            )
            .fromTo(
              sparkElements,
              {
                autoAlpha: 0,
                scale: 0.2,
                x: 0,
                y: 0,
              },
              {
                autoAlpha: 1,
                scale: 1,
                x: (i: number) => [42, -36, 28, -44, 18][i % 5],
                y: (i: number) => [-30, -24, 36, 28, -40][i % 5],
                duration: tempo.pulse,
                stagger: tempo.beat,
                ease: 'power2.out',
              },
              '-=0.35',
            )
            .to(
              sparkElements,
              {
                autoAlpha: 0,
                duration: tempo.hover,
                stagger: tempo.beat / 2,
                ease: 'power2.in',
              },
              '>-0.08',
            )
            .to(
              portalRingRef.current,
              {
                autoAlpha: 0,
                scale: 1.35,
                rotate: 38,
                duration: tempo.pulse,
                ease: 'power2.inOut',
              },
              '<',
            );
        };

        runtimeWindowElement.addEventListener('pointerenter', onRuntimeWindowTrigger);
        runtimeWindowElement.addEventListener('focusin', onRuntimeWindowTrigger);
      }

      if (rogueLayerRef.current && rogueProbeRef.current && rogueFlashRef.current) {
        gsap.set(rogueLayerRef.current, { autoAlpha: 0 });

        const surpriseTimeline = gsap.timeline({ delay: tempo.pulseSlow * 1.5 });
        surpriseTimeline
          .to(rogueLayerRef.current, {
            autoAlpha: 1,
            duration: tempo.hover,
            ease: 'power2.out',
          })
          .fromTo(
            rogueProbeRef.current,
            {
              xPercent: -45,
              yPercent: 22,
              rotate: -16,
              scale: 0.68,
              opacity: 0,
            },
            {
              xPercent: 86,
              yPercent: -18,
              rotate: 7,
              scale: 1,
              opacity: 1,
              duration: tempo.sweep * 0.7,
              ease: 'power2.out',
            },
          )
          .to(rogueProbeRef.current, {
            xPercent: 8,
            yPercent: 46,
            rotate: -24,
            duration: tempo.sweep * 0.5,
            ease: 'power1.inOut',
          })
          .to(
            rogueFlashRef.current,
            {
              opacity: 0.6,
              duration: tempo.hover,
              yoyo: true,
              repeat: 1,
              ease: 'power1.inOut',
            },
            '-=0.25',
          )
          .to(
            rogueProbeRef.current,
            {
              xPercent: 118,
              yPercent: 4,
              scale: 0.58,
              opacity: 0,
              duration: tempo.sweep * 0.6,
              ease: 'power2.in',
            },
            '-=0.08',
          )
          .to(rogueLayerRef.current, {
            autoAlpha: 0,
            duration: tempo.pulse,
            ease: 'power1.out',
          });
      }
    }, bannerRef);

    return () => {
      if (runtimeCardElement && onRuntimeActive && onRuntimeIdle) {
        runtimeCardElement.removeEventListener('pointerenter', onRuntimeActive);
        runtimeCardElement.removeEventListener('pointerleave', onRuntimeIdle);
        runtimeCardElement.removeEventListener('focusin', onRuntimeActive);
        runtimeCardElement.removeEventListener('focusout', onRuntimeIdle);
      }

      if (runtimeWindowElement && onRuntimeWindowTrigger) {
        runtimeWindowElement.removeEventListener('pointerenter', onRuntimeWindowTrigger);
        runtimeWindowElement.removeEventListener('focusin', onRuntimeWindowTrigger);
      }

      context.revert();
    };
  }, []);

  const socialLinks: ISocialLink[] = [
    {
      href: 'mailto:redwan_work@pm.me',
      icon: <GoMention className='h-5 w-5' />,
      tooltipText: 'redwan_work@pm.me',
    },
    {
      href: 'https://www.linkedin.com/in/wanrif/',
      icon: <GiLinkedRings className='h-5 w-5' />,
      tooltipText: 'linkedIn',
    },
    {
      href: 'https://github.com/wanrif',
      icon: <GiCat className='h-5 w-5' />,
      tooltipText: 'Github',
    },
    {
      href: 'https://drive.proton.me/urls/253KWW5VM4#Tw7dKlEuPOPr',
      icon: <GiAce className='h-5 w-5' />,
      tooltipText: 'CV',
    },
  ];

  return (
    <section
      id='top'
      ref={bannerRef}
      className='terminal-section relative overflow-hidden px-4 sm:px-6'
    >
      <ParticleBackground />
      <div ref={rogueLayerRef} className='terminal-rogue-layer' aria-hidden>
        <span ref={rogueProbeRef} className='terminal-rogue-probe'>
          <span className='terminal-rogue-probe-core'>`&gt;_`</span>
        </span>
        <span ref={rogueFlashRef} className='terminal-rogue-flash' />
      </div>

      <motion.div
        className='relative z-10 mx-auto grid w-full max-w-6xl items-start gap-4 xl:grid-cols-[minmax(0,1.34fr)_minmax(0,0.66fr)]'
        {...pageEnterMotion()}
      >
        <div className='terminal-window overflow-hidden'>
          <div className='terminal-titlebar'>
            <span>workspace / hero.session</span>
            <span className='terminal-chip terminal-chip-accent'>{t('hero_available')}</span>
          </div>

          <div className='grid items-start gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 lg:p-6'>
            <motion.div className='space-y-4' {...sectionInViewMotion()}>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>{t('hero_terminal_line')}</span>
                <span ref={commandScanRef} aria-hidden className='terminal-command-scan' />
              </div>

              <h1 className='font-display text-3xl leading-[1.1] font-bold text-gallery-100 sm:text-5xl'>
                Redwan Sarif
                <span className='mt-1.5 block text-xl text-tertiary-300 sm:text-3xl'>
                  {t('hero_role')}
                </span>
              </h1>

              <p className='max-w-xl text-gallery-300'>{t('hero_intro')}</p>

              <div className='flex flex-wrap items-center gap-2 pt-1'>
                <button
                  type='button'
                  onClick={() => scrollToSection('projects')}
                  className='terminal-btn-primary rounded-xl px-4 py-2 transition-colors corner-bevel'
                >
                  {t('hero_primary_cta')}
                </button>
                <a
                  href='https://github.com/wanrif'
                  target='_blank'
                  rel='noreferrer'
                  className='terminal-btn-secondary rounded-xl px-4 py-2 transition-colors corner-bevel'
                >
                  {t('hero_secondary_cta')}
                </a>
              </div>

              <div className='grid max-w-md grid-cols-2 gap-2 sm:grid-cols-4'>
                {socialLinks.map((link, index) => (
                  <Tooltip key={index} text={link.tooltipText}>
                    <motion.a
                      href={link.href}
                      target='_blank'
                      rel='noreferrer'
                      className='terminal-subcard flex h-11 items-center justify-center rounded-xl text-tertiary-300 transition-colors duration-300 corner-bevel hover:border-tertiary-400'
                      {...iconInteractionMotion()}
                    >
                      {link.icon}
                    </motion.a>
                  </Tooltip>
                ))}
              </div>

              <div className='terminal-subcard rounded-xl p-2'>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Next.js',
                    'TypeScript',
                    'React',
                    'Tailwind CSS',
                    'Material UI',
                    'Express.js',
                    'Hono',
                  ].map((item) => (
                    <span key={item} className='terminal-chip'>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className='space-y-3 self-start'>
              <div className='js-profile-float relative isolate pb-2'>
                <div className='js-terminal-orbit terminal-orbit' aria-hidden>
                  <span className='js-signal-chip terminal-chip terminal-orbit-chip'>ping</span>
                  <span className='js-signal-chip terminal-chip terminal-orbit-chip'>sync</span>
                  <span className='js-signal-chip terminal-chip terminal-orbit-chip'>ship</span>
                </div>
                <div className='terminal-subcard rounded-2xl p-1.5 corner-bevel'>
                  <img
                    src='/personal_photo.webp'
                    alt={t('hero_photo_alt')}
                    loading='eager'
                    className='aspect-4/3 w-full rounded-xl object-cover object-center'
                    onError={(event) => {
                      const imageElement = event.currentTarget;
                      if (imageElement.dataset.fallbackApplied === 'true') return;
                      imageElement.dataset.fallbackApplied = 'true';
                      imageElement.src = '/personal_photo.jpg';
                    }}
                  />
                </div>
              </div>
              <p className='terminal-prompt'>module :: profile.meta</p>
              <div className='grid gap-3'>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_current_role_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_current_role_value')}</p>
                </div>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_focus_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_focus_value')}</p>
                </div>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_open_to_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_open_to_value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={runtimeWindowRef}
          className='terminal-window relative h-fit self-start overflow-hidden'
        >
          <div className='terminal-portal-layer' aria-hidden>
            <span ref={portalRingRef} className='terminal-portal-ring' />
            <span ref={portalGlowRef} className='terminal-portal-glow' />
            <span className='js-portal-spark terminal-portal-spark' />
            <span className='js-portal-spark terminal-portal-spark' />
            <span className='js-portal-spark terminal-portal-spark' />
            <span className='js-portal-spark terminal-portal-spark' />
            <span className='js-portal-spark terminal-portal-spark' />
          </div>
          <div className='terminal-titlebar'>
            <span>runtime / signals</span>
            <div className='terminal-live-group'>
              <span className='terminal-chip'>live</span>
              <div className='terminal-live-pulse' aria-hidden>
                <span className='js-runtime-pulse-dot terminal-live-dot' />
                <span className='js-runtime-pulse-dot terminal-live-dot' />
                <span className='js-runtime-pulse-dot terminal-live-dot' />
              </div>
            </div>
          </div>
          <div className='space-y-3 p-4 sm:p-5'>
            <div ref={runtimeCardRef} className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>system.bus</p>
              <p className='text-sm text-gallery-200'>
                Building scalable frontend systems with stable DX and maintainable patterns.
              </p>
              <div className='terminal-runtime-eq mt-3' aria-hidden>
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} className='js-runtime-bar terminal-runtime-eq-bar' />
                ))}
              </div>
            </div>
            <div className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>deploy.target</p>
              <p className='text-sm text-gallery-200'>
                Products for users, internal teams, and integration-heavy enterprise workflows.
              </p>
            </div>
            <div className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>ops.state</p>
              <p className='text-sm text-tertiary-300'>ready_for_collaboration=true</p>
              <div className='terminal-signal-track mt-2' aria-hidden>
                <span ref={signalPacketRef} className='terminal-signal-packet' />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
