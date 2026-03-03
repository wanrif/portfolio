import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectLocale, useAppStore } from '@stores/app/store';
import { getLocalizedModules, stableSortByName } from '@utils/mdxLocale';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';

import { motion } from 'framer-motion';

interface CaseStudyMeta {
  slug: string;
  name: string;
  status?: 'in-progress' | 'completed';
  inProgress?: boolean;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  tradeoffs: string;
  repo: string;
  demo: string;
}

interface CaseStudyModule {
  default: React.ComponentType;
  meta: CaseStudyMeta;
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const locale = useAppStore(selectLocale);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const caseStudies = useMemo(() => {
    const modules = import.meta.glob<CaseStudyModule>('../../content/case-studies/*.mdx', {
      eager: true,
    });
    const selectedModules = getLocalizedModules(modules, locale);
    return stableSortByName(selectedModules);
  }, [locale]);

  return (
    <section id='projects' className='terminal-section relative px-4 py-16'>
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
            const hasBackendRepo = meta.demo.includes('github.com');
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
                className='terminal-window overflow-hidden rounded-2xl corner-superellipse/2'
                {...makeStaggerInViewMotion(index)}
                {...cardInteractionMotion()}
              >
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
                      <a
                        href={meta.repo}
                        target='_blank'
                        rel='noreferrer'
                        className='terminal-btn-secondary rounded-xl px-3 py-1.5 corner-bevel'
                      >
                        {t('projects_repo_frontend')}
                      </a>
                      <a
                        href={meta.demo}
                        target='_blank'
                        rel='noreferrer'
                        className='terminal-btn-secondary rounded-xl px-3 py-1.5 corner-bevel'
                      >
                        {hasBackendRepo ? t('projects_repo_backend') : t('projects_live_demo')}
                      </a>
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
