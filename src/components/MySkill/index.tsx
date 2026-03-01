import React from 'react';
import { useTranslation } from 'react-i18next';

import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';

import { motion } from 'framer-motion';

interface ISkill {
  title: string;
  skills: string[];
}

const MySkill: React.FC = () => {
  const { t } = useTranslation();

  const skillData: ISkill[] = [
    {
      title: t('skill_runtime'),
      skills: ['Node.js', 'Bun', 'Yarn'],
    },
    {
      title: t('skill_backend'),
      skills: [
        'Express',
        'Hono',
        'Laravel',
        'MySQL',
        'PostgreSQL',
        'Redis',
        'MongoDB',
        'Drizzle ORM',
      ],
    },
    {
      title: t('skill_frontend'),
      skills: [
        'React',
        'Next.js',
        'Vue',
        'Nuxt.js',
        'TypeScript',
        'Tailwind CSS',
        'SCSS',
        'Material UI',
        'Zustand',
        'Redux Toolkit',
      ],
    },
    {
      title: t('skill_infrastructure'),
      skills: ['Docker', 'Nginx', 'CI/CD', 'Linux'],
    },
    {
      title: t('skill_tools'),
      skills: ['Git', 'GitHub', 'GitLab', 'Postman', 'Figma'],
    },
  ];

  return (
    <section id='skills' className='terminal-section relative px-4 py-16'>
      <div className='terminal-grid-bg' />
      <div className='relative z-10 container mx-auto max-w-6xl'>
        <p className='terminal-prompt mb-2'>module: capability.matrix</p>
        <motion.h2
          {...sectionInViewMotion()}
          className='terminal-heading mb-2 font-display text-3xl font-bold'
        >
          {t('my_skill_title')}
        </motion.h2>
        <p className='mb-8 text-gallery-300'>{t('skills_subtitle')}</p>

        <div className='terminal-window overflow-hidden rounded-2xl'>
          <div className='terminal-titlebar'>
            <span>matrix / tech.groups</span>
            <span className='terminal-chip'>{skillData.length} groups</span>
          </div>

          <div className='grid gap-3 p-4 sm:p-5'>
            {skillData.map((category, idx) => (
              <motion.div
                key={idx}
                {...makeStaggerInViewMotion(idx)}
                {...cardInteractionMotion()}
                className='grid gap-3 rounded-xl border border-gallery-700/80 bg-shark-950/65 p-3 sm:grid-cols-[180px_1fr] sm:items-start'
              >
                <h3 className='flex items-center text-sm font-semibold tracking-wider text-tertiary-300 uppercase sm:text-base'>
                  {category.title}
                </h3>

                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      {...makeStaggerInViewMotion(idx + index * 0.15)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className='terminal-chip transition-all duration-300'
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkill;
