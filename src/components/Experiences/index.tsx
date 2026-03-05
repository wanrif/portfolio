import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { selectLocale, useAppStore } from '@stores/app/store';
import { getLoopTempo } from '@utils/loopTempo';
import { getLocalizedModule } from '@utils/mdxLocale';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { GiOfficeChair } from 'react-icons/gi';

interface IExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

interface NowEntry {
  date: string;
  title: string;
  detail: string;
}

interface NowChangelogModule {
  default: React.ComponentType;
  entries?: NowEntry[];
}

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  const locale = useAppStore(selectLocale);
  const sectionRef = useRef<HTMLElement | null>(null);
  const feedPacketRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const tempo = getLoopTempo(isMobile);

    const context = gsap.context(() => {
      if (feedPacketRef.current) {
        const packetElement = feedPacketRef.current;
        gsap.fromTo(
          packetElement,
          {
            y: () => -packetElement.offsetHeight,
            opacity: 0.65,
          },
          {
            y: () => packetElement.parentElement?.clientHeight ?? 0,
            opacity: 0.9,
            duration: tempo.sweep,
            ease: 'none',
            repeat: -1,
            repeatDelay: tempo.sweepPause,
            repeatRefresh: true,
          },
        );
      }

      gsap.fromTo(
        '.js-now-dot',
        {
          opacity: 0.35,
          scale: 0.72,
        },
        {
          opacity: 0.88,
          scale: 0.94,
          duration: tempo.pulseSlow,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: tempo.stagger,
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const experiences: IExperience[] = [
    {
      title: 'Frontend Developer',
      company: 'PT Indocyber Global Teknologi',
      startDate: '2025-08-01',
      endDate: 'present',
      description:
        'Contributed as Frontend Developer on the internal Satu Wings project, building reusable and accessible UI components in a multi-zone micro-frontend architecture and integrating REST APIs with backend teams.',
      skills: ['Next.js 15', 'TypeScript', 'Material UI', 'Zustand', 'SSE', 'Tailwind CSS'],
    },
    {
      title: 'Frontend Developer — Raisecall CRM',
      company: 'PHINCON • Raisecall',
      startDate: '2024-12-01',
      endDate: '2025-06-01',
      description:
        'Integrated live chat and voice channels into the CRM platform, built reusable embeddable chat widgets, and implemented real-time agent notification flows for customer communication.',
      skills: ['Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Socket.IO', 'TypeScript'],
    },
    {
      title: 'Fullstack Developer — MyTelkomsel Web Team',
      company: 'PHINCON • MyTelkomsel',
      startDate: '2023-10-01',
      endDate: '2024-12-01',
      description:
        'Developed and maintained new and existing platform features, supported SIT/UAT/regression cycles, and helped stabilize releases through testing and deployment support.',
      skills: ['React', 'Express.js', 'MySQL', 'Jest', 'Testing', 'Production Deployment'],
    },
    {
      title: 'Fullstack Developer Trainee',
      company: 'PHINCON',
      startDate: '2023-07-01',
      endDate: '2023-09-01',
      description:
        'Completed an intensive fullstack training program by building end-to-end web apps, including React-based frontend development and Express.js backend services with media and auth workflows.',
      skills: ['React', 'Redux', 'Express.js', 'Cloudinary', 'Redis', 'MySQL'],
    },
  ];

  const nowContent = useMemo(() => {
    const modules = import.meta.glob<NowChangelogModule>('../../content/now/*.mdx', {
      eager: true,
    });
    const firstModule = getLocalizedModule(modules, locale);

    return {
      entries: firstModule?.entries ?? [],
      Body: firstModule?.default ?? null,
    };
  }, [locale]);

  const countExperience = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = endDate === 'present' ? new Date() : new Date(endDate);

    const diff = end.getTime() - start.getTime();
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor(totalDays % 30);

    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${t('experiences_years')}${years > 1 && locale === 'en' ? 's' : ''}`);
    }
    if (months > 0) {
      parts.push(`${months} ${t('experiences_months')}${months > 1 && locale === 'en' ? 's' : ''}`);
    }
    if (days > 0) {
      parts.push(`${days} ${t('experiences_days')}${days > 1 && locale === 'en' ? 's' : ''}`);
    }

    const result = parts.join(', ').replace(/,([^,]*)$/, locale === 'en' ? ' and$1' : ' dan$1');
    return `${result} ${t('experiences_subtitle')}`;
  };

  return (
    <section id='now' ref={sectionRef} className='terminal-section relative px-4 py-16'>
      <div className='terminal-grid-bg' />
      <div className='relative z-10 container mx-auto max-w-6xl'>
        <div className='mb-7 space-y-2'>
          <p className='terminal-prompt'>module: career.timeline</p>
          <h2 className='terminal-heading font-display text-3xl font-bold'>{t('now_title')}</h2>
          <h3 className='text-base font-semibold text-gallery-300 sm:text-lg'>
            {countExperience('2023-07-01', new Date().toISOString().split('T')[0])}
          </h3>
        </div>

        <div className='grid gap-4 lg:grid-cols-[1.25fr_0.75fr]'>
          <div className='terminal-window overflow-hidden rounded-2xl'>
            <div className='terminal-titlebar'>
              <span>log / employment.events</span>
              <span className='terminal-chip'>{experiences.length} entries</span>
            </div>
            <div className='space-y-3 p-4'>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  {...makeStaggerInViewMotion(index)}
                  {...cardInteractionMotion()}
                  className='terminal-subcard rounded-xl p-4'
                >
                  <div className='mb-3 flex items-start gap-3'>
                    <div className='rounded-xl border border-gallery-700 p-2'>
                      <GiOfficeChair className='h-5 w-5 text-tertiary-300' />
                    </div>
                    <div>
                      <h3 className='text-base font-semibold text-gallery-100 sm:text-lg'>
                        {exp.title}
                      </h3>
                      <p className='text-sm font-medium text-tertiary-300'>{exp.company}</p>
                      <p className='text-xs text-gallery-400 sm:text-sm'>
                        {new Date(exp.startDate).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                        })}{' '}
                        -{' '}
                        {exp.endDate === 'present'
                          ? t('experiences_present')
                          : new Date(exp.endDate).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: 'long',
                            })}
                      </p>
                    </div>
                  </div>
                  <p className='mb-3 text-sm text-gallery-300 sm:text-base'>{exp.description}</p>
                  <div className='flex flex-wrap gap-2'>
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className='terminal-chip'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className='terminal-window overflow-hidden rounded-2xl'
            {...sectionInViewMotion()}
          >
            <div className='terminal-titlebar'>
              <span>feed / now.updates</span>
              <span className='terminal-chip terminal-chip-accent'>{t('now_changelog_title')}</span>
            </div>
            <div className='relative space-y-3 p-4'>
              <div className='terminal-feed-track' aria-hidden>
                <span ref={feedPacketRef} className='terminal-feed-packet' />
              </div>
              {nowContent.entries.map((entry) => (
                <div
                  key={`${entry.date}-${entry.title}`}
                  className='terminal-subcard rounded-xl p-3'
                >
                  <div className='mb-1 flex items-center gap-2'>
                    <span className='js-now-dot terminal-now-dot' aria-hidden />
                    <p className='text-xs text-tertiary-300'>{entry.date}</p>
                  </div>
                  <p className='font-medium text-gallery-100'>{entry.title}</p>
                  <p className='text-sm text-gallery-300'>{entry.detail}</p>
                </div>
              ))}

              {nowContent.Body && (
                <div className='rounded-xl border border-gallery-700/70 bg-shark-950/55 p-3 text-sm text-gallery-300'>
                  <nowContent.Body />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
