import { selectLocale, useAppStore } from '@stores/app/store';
import { getLocalizedModule } from '@utils/mdxLocale';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
    const modules = import.meta.glob<NowChangelogModule>('../../content/now/*.mdx', { eager: true });
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
    <section id='now' className='border-b border-gallery-800 bg-shark-950 px-4 py-16'>
      <div className='container mx-auto max-w-5xl'>
        <div className='flex flex-col mb-8 space-y-2'>
          <p className='terminal-prompt'>{'>'} section: now</p>
          <h2 className='terminal-heading font-display text-3xl font-bold'>{t('now_title')}</h2>
          <h3 className='text-lg font-semibold text-gallery-300'>
            {countExperience('2023-07-01', new Date().toISOString().split('T')[0])}
          </h3>
        </div>

        <div className='relative'>
          <div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-px h-full bg-gallery-700' />
          <div className='relative'>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                {...makeStaggerInViewMotion(index)}
                className='relative mb-8 last:mb-0'>
                <div
                  className={`absolute w-4 h-4 bg-tertiary-400 rounded-full border-4 border-shark-950
                    left-2 md:left-1/2 transform md:-translate-x-1/2 mt-6`}
                />
                <motion.div
                  {...cardInteractionMotion()}
                  className={`terminal-window rounded-3xl corner-superellipse/2 ml-10 p-6 md:ml-0 md:w-[calc(50%-20px)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className='flex items-start gap-4'>
                    <div className='rounded-2xl corner-bevel flex h-12 w-12 shrink-0 items-center justify-center border border-gallery-700 p-2'>
                      <GiOfficeChair className='w-8 h-8 text-tertiary-300' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-xl font-semibold text-gallery-100'>{exp.title}</h3>
                      <p className='text-tertiary-300 font-medium'>{exp.company}</p>
                      <p className='text-sm text-gallery-400 mb-2'>
                        {new Date(exp.startDate).toLocaleDateString(locale, { year: 'numeric', month: 'long' })} -{' '}
                        {exp.endDate === 'present'
                          ? t('experiences_present')
                          : new Date(exp.endDate).toLocaleDateString(locale, { year: 'numeric', month: 'long' })}
                      </p>
                      <p className='text-gallery-300 mb-3'>{exp.description}</p>
                      <div className='flex flex-wrap gap-2'>
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className='rounded-2xl corner-bevel border border-gallery-700 px-3 py-1 text-sm text-tertiary-300'>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className='terminal-window rounded-3xl corner-superellipse/2 mt-10 p-5' {...sectionInViewMotion()}>
          <h4 className='terminal-prompt mb-4'>{'>'} {t('now_changelog_title')}</h4>
          <div className='space-y-3'>
            {nowContent.entries.map((entry) => (
              <div key={`${entry.date}-${entry.title}`} className='terminal-subcard rounded-2xl corner-bevel p-3'>
                <p className='text-tertiary-300 text-sm'>{entry.date}</p>
                <p className='text-gallery-100 font-medium'>{entry.title}</p>
                <p className='text-gallery-300'>{entry.detail}</p>
              </div>
            ))}
          </div>

          {nowContent.Body && (
            <div className='mt-5 border-t border-gallery-800 pt-4 text-gallery-300 space-y-3'>
              <nowContent.Body />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experiences;
