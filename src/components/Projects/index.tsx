import React, { useMemo, useState } from 'react';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { selectLocale, useAppStore } from '@stores/app/store';
import { getLocalizedModules, stableSortByName } from '@utils/mdxLocale';

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
    const modules = import.meta.glob<CaseStudyModule>('../../content/case-studies/*.mdx', { eager: true });
    const selectedModules = getLocalizedModules(modules, locale);
    return stableSortByName(selectedModules);
  }, [locale]);

  return (
    <section id='projects' className='border-b border-gallery-800 bg-shark-950 px-4 py-16'>
      <div className='container mx-auto max-w-5xl'>
        <p className='terminal-prompt mb-2'>{'>'} section: projects</p>
        <motion.h2 className='terminal-heading mb-2 font-display text-3xl font-bold' {...sectionInViewMotion()}>
          {t('projects_title')}
        </motion.h2>
        <motion.p className='text-gallery-300 mb-10' {...sectionInViewMotion()}>
          {t('projects_subtitle')}
        </motion.p>

        <div className='space-y-8'>
          {caseStudies.map((entry: CaseStudyModule, index) => {
            const { meta, default: CaseStudyBody } = entry;
            const isOpen = activeSlug === meta.slug;
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
                className='terminal-window rounded-3xl corner-superellipse/2 p-5'
                {...makeStaggerInViewMotion(index)}
                {...cardInteractionMotion()}>
                <div className='mb-4 flex flex-wrap items-center gap-3'>
                  <h3 className='font-display text-xl font-semibold text-gallery-100 terminal-caret'>{meta.name}</h3>
                  {badgeConfig && (
                    <span
                      className={`rounded-2xl corner-bevel border px-2 py-0.5 text-xs font-medium uppercase ${badgeConfig.className}`}>
                      {badgeConfig.label}
                    </span>
                  )}
                </div>
                <p className='text-gallery-300 mb-4'>{meta.summary}</p>
                <ul className='space-y-2 text-gallery-300 leading-relaxed text-sm sm:text-base'>
                  <li>
                    <span className='text-tertiary-300'>[problem]</span> {meta.problem}
                  </li>
                  <li>
                    <span className='text-tertiary-300'>[architecture]</span> {meta.architecture}
                  </li>
                  <li>
                    <span className='text-tertiary-300'>[stack]</span> {meta.stack.join(', ')}
                  </li>
                  <li>
                    <span className='text-tertiary-300'>[tradeoffs]</span> {meta.tradeoffs}
                  </li>
                </ul>
                <div className='flex flex-wrap gap-4 mt-4'>
                  <a
                    href={meta.repo}
                    target='_blank'
                    rel='noreferrer'
                    className='terminal-btn-secondary rounded-2xl corner-bevel px-3 py-1'>
                    {t('projects_repo_frontend')}
                  </a>
                  <a
                    href={meta.demo}
                    target='_blank'
                    rel='noreferrer'
                    className='terminal-btn-secondary rounded-2xl corner-bevel px-3 py-1'>
                    {t('projects_repo_backend')}
                  </a>
                  <button
                    type='button'
                    onClick={() => setActiveSlug(isOpen ? null : meta.slug)}
                    className='terminal-btn-secondary rounded-2xl corner-bevel px-3 py-1'>
                    {isOpen ? t('projects_close_case_study') : t('projects_open_case_study')}
                  </button>
                </div>

                {isOpen && (
                  <div className='mt-5 border-t border-gallery-800 pt-4 text-gallery-300 space-y-3'>
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
