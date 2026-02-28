import { motion } from 'framer-motion';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
      skills: ['Express', 'Hono', 'Laravel', 'MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
    },
    {
      title: t('skill_frontend'),
      skills: ['React', 'Next.js', 'Vue', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
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
    <section id='skills' className='border-b border-gallery-800 bg-shark-950 py-16'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <p className='terminal-prompt mb-2'>{'>'} section: skills</p>
        <motion.h2 {...sectionInViewMotion()} className='terminal-heading mb-2 font-display text-3xl font-bold'>
          {t('my_skill_title')}
        </motion.h2>
        <p className='text-gallery-300 mb-8'>{t('skills_subtitle')}</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {skillData.map((category, idx) => (
            <motion.div
              key={idx}
              {...makeStaggerInViewMotion(idx)}
              {...cardInteractionMotion()}
              className='terminal-window rounded-3xl corner-superellipse/2 p-5 transition-all duration-300 ease-in-out hover:border-tertiary-600'>
              <div className='flex items-center gap-3 mb-4'>
                <h3 className='text-lg font-semibold text-tertiary-300'>{category.title}</h3>
              </div>

              <div className='flex flex-wrap gap-2'>
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    {...makeStaggerInViewMotion(idx + index * 0.15)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className='rounded-2xl corner-bevel border border-gallery-700 px-3 py-1.5 text-sm text-gallery-200 transition-all duration-300'>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MySkill;
