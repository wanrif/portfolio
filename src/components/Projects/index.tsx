import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectLocale, useAppStore } from '@stores/app/store';
import { getLoopTempo } from '@utils/loopTempo';
import { getLocalizedModules, stableSortByName } from '@utils/mdxLocale';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface CaseStudyMeta {
  slug: string;
  name: string;
  image?: string;
  status?: 'in-progress' | 'completed';
  inProgress?: boolean;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  tradeoffs: string;
  repo?: string;
  demo?: string;
}

interface CaseStudyModule {
  default: React.ComponentType;
  meta: CaseStudyMeta;
}

const DEFAULT_PROJECT_IMAGE = '/project-default.svg';

const getProjectImageSrc = (meta: CaseStudyMeta): string => {
  return meta.image ?? `/${meta.slug}.webp`;
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const locale = useAppStore(selectLocale);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const caseStudies = useMemo(() => {
    const modules = import.meta.glob<CaseStudyModule>('../../content/case-studies/*.mdx', {
      eager: true,
    });
    const selectedModules = getLocalizedModules(modules, locale);
    return stableSortByName(selectedModules);
  }, [locale]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const tempo = getLoopTempo(isMobile);
    const cardCleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.js-project-card');

      cards.forEach((card) => {
        const scanElement = card.querySelector<HTMLElement>('.js-project-scan');
        if (!scanElement) return;

        gsap.set(scanElement, {
          x: () => -scanElement.offsetWidth,
          opacity: 0,
        });

        const playScan = () => {
          gsap.killTweensOf(scanElement);
          gsap.fromTo(
            scanElement,
            {
              x: -scanElement.offsetWidth,
              opacity: 0.14,
            },
            {
              x: () => card.clientWidth,
              opacity: 0.44,
              duration: tempo.pulseSlow,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(scanElement, {
                  opacity: 0,
                  duration: tempo.hover,
                  overwrite: true,
                });
              },
            },
          );
        };

        const hideScan = () => {
          gsap.killTweensOf(scanElement);
          gsap.to(scanElement, {
            opacity: 0,
            duration: tempo.hover,
            overwrite: true,
          });
        };

        card.addEventListener('pointerenter', playScan);
        card.addEventListener('focusin', playScan);
        card.addEventListener('pointerleave', hideScan);
        card.addEventListener('focusout', hideScan);

        cardCleanups.push(() => {
          card.removeEventListener('pointerenter', playScan);
          card.removeEventListener('focusin', playScan);
          card.removeEventListener('pointerleave', hideScan);
          card.removeEventListener('focusout', hideScan);
        });
      });
    }, sectionRef);

    return () => {
      cardCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section id='projects' ref={sectionRef} className='terminal-section relative px-4 py-16'>
      <div className='terminal-grid-bg' />
      <div className='relative z-10 container mx-auto max-w-6xl'>
        <p className='terminal-prompt mb-2'>module: project.registry</p>
        <motion.h2
          className='terminal-heading mb-2 font-display text-3xl font-bold'
          {...sectionInViewMotion()}
        >
          {t('projects_title')}
        </motion.h2>
        <motion.p className='mb-8 text-gallery-300' {...sectionInViewMotion()}>
          {t('projects_subtitle')}
        </motion.p>

        <div className='space-y-5'>
          {caseStudies.map((entry: CaseStudyModule, index) => {
            const { meta, default: CaseStudyBody } = entry;
            const isOpen = activeSlug === meta.slug;
            const hasFrontendRepo = Boolean(meta.repo?.includes('github.com'));
            const hasBackendRepo = Boolean(meta.demo?.includes('github.com'));
            const projectStatus = meta.status ?? (meta.inProgress ? 'in-progress' : undefined);

            const badgeConfig =
              projectStatus === 'completed'
                ? {
                    label: t('projects_completed'),
                    className: 'border-gallery-500 text-gallery-200',
                  }
                : projectStatus === 'in-progress'
                  ? {
                      label: t('projects_in_progress'),
                      className: 'border-tertiary-400 text-tertiary-300',
                    }
                  : null;

            return (
              <motion.article
                key={meta.slug}
                className='js-project-card terminal-window relative overflow-hidden rounded-2xl corner-superellipse/2'
                {...makeStaggerInViewMotion(index)}
                {...cardInteractionMotion()}
              >
                <span className='js-project-scan terminal-project-scan' aria-hidden />
                <div className='terminal-titlebar'>
                  <div className='flex items-center gap-2'>
                    <span className='terminal-chip'>unit-{String(index + 1).padStart(2, '0')}</span>
                    <h3 className='terminal-caret font-display text-sm font-semibold tracking-wider text-gallery-100'>
                      {meta.name}
                    </h3>
                  </div>
                  {badgeConfig && (
                    <span
                      className={`rounded-xl border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${badgeConfig.className}`}
                    >
                      {badgeConfig.label}
                    </span>
                  )}
                </div>
                <div className='grid gap-4 p-4 md:grid-cols-[0.9fr_1.1fr] md:p-5'>
                  <div className='space-y-3'>
                    <img
                      src={getProjectImageSrc(meta)}
                      alt={`${meta.name} preview`}
                      loading='lazy'
                      className='h-44 w-full rounded-xl border border-gallery-700/80 bg-shark-950/55 object-cover'
                      onError={(event) => {
                        const imageElement = event.currentTarget;
                        if (imageElement.dataset.fallbackApplied === 'true') return;
                        imageElement.dataset.fallbackApplied = 'true';
                        imageElement.src = DEFAULT_PROJECT_IMAGE;
                      }}
                    />
                    <p className='text-gallery-300'>{meta.summary}</p>
                    <div className='terminal-subcard rounded-xl p-3 text-sm text-gallery-200'>
                      <p className='terminal-prompt mb-1'>problem</p>
                      <p>{meta.problem}</p>
                    </div>
                    <div className='terminal-subcard rounded-xl p-3 text-sm text-gallery-200'>
                      <p className='terminal-prompt mb-1'>tradeoffs</p>
                      <p>{meta.tradeoffs}</p>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='terminal-subcard rounded-xl p-3 text-sm text-gallery-200'>
                      <p className='terminal-prompt mb-1'>architecture</p>
                      <p>{meta.architecture}</p>
                    </div>
                    <div className='terminal-subcard rounded-xl p-3'>
                      <p className='terminal-prompt mb-2'>stack</p>
                      <div className='flex flex-wrap gap-2'>
                        {meta.stack.map((item) => (
                          <span key={item} className='terminal-chip'>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {hasFrontendRepo && (
                        <a
                          href={meta.repo}
                          target='_blank'
                          rel='noreferrer'
                          className='terminal-btn-secondary rounded-xl px-3 py-1.5 corner-bevel'
                        >
                          {t('projects_repo_frontend')}
                        </a>
                      )}
                      {meta.demo && (
                        <a
                          href={meta.demo}
                          target='_blank'
                          rel='noreferrer'
                          className='terminal-btn-secondary rounded-xl px-3 py-1.5 corner-bevel'
                        >
                          {hasBackendRepo ? t('projects_repo_backend') : t('projects_live_demo')}
                        </a>
                      )}
                      <button
                        type='button'
                        onClick={() => setActiveSlug(isOpen ? null : meta.slug)}
                        className='terminal-btn-primary rounded-xl px-3 py-1.5 corner-bevel'
                      >
                        {isOpen ? t('projects_close_case_study') : t('projects_open_case_study')}
                      </button>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className='mx-4 mb-4 rounded-xl border border-gallery-700/80 bg-shark-950/55 p-4 text-gallery-300 md:mx-5 md:mb-5'>
                    <CaseStudyBody />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
