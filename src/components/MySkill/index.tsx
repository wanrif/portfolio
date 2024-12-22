import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GiBackpack, GiConfrontation, GiToolbox, GiTripleYin } from 'react-icons/gi';

interface ISkill {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

const MySkill: React.FC = () => {
  const { t } = useTranslation();

  const skillData: ISkill[] = [
    {
      title: t('my_skill_frontend'),
      skills: ['React', 'Next.js', 'Vue', 'Nuxt', 'Tailwind CSS', 'SCSS'],
      icon: <GiConfrontation className='w-8 h-8 text-white' />,
    },
    {
      title: t('my_skill_backend'),
      skills: ['Node.js', 'Express', 'Laravel', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
      icon: <GiBackpack className='w-8 h-8 text-white' />,
    },
    {
      title: t('my_skill_tools'),
      skills: ['Git', 'GitHub', 'GitLab', 'Figma', 'Postman'],
      icon: <GiToolbox className='w-8 h-8 text-white' />,
    },
    {
      title: t('my_skill_markup'),
      skills: ['JavaScript', 'TypeScript', 'PHP', 'HTML5', 'CSS3', 'SCSS'],
      icon: <GiTripleYin className='w-8 h-8 text-white' />,
    },
  ];

  return (
    <section
      id='skills'
      className='py-16 bg-gradient-to-b from-tuna-50 to-shark-300 dark:from-shark-950 dark:to-tuna-700 min-h-[50dvh]'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-3xl font-bold text-center text-gallery-950 dark:text-tertiary-300 mb-12'>
          {t('my_skill_title')}
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {skillData.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className='group relative bg-tuna-50/80 dark:bg-shark-950/80 backdrop-blur-sm rounded-2xl p-6 
                hover:shadow-lg hover:shadow-tertiary-400/20 dark:hover:shadow-tertiary-500/20 
                transition-all duration-300 ease-in-out'>
              <div className='flex items-center gap-3 mb-6'>
                <div
                  className='p-3 rounded-xl bg-tertiary-400 dark:bg-tertiary-500 
                  group-hover:bg-tertiary-500 dark:group-hover:bg-tertiary-600 transition-colors'>
                  {category.icon}
                </div>
                <h3 className='text-xl font-semibold text-tertiary-600 dark:text-tertiary-300'>{category.title}</h3>
              </div>

              <div className='flex flex-wrap gap-2'>
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2, delay: idx * 0.1 + index * 0.05 }}
                    className='px-3 py-1.5 text-sm rounded-lg bg-tertiary-400/10 dark:bg-tertiary-500/10 
                      text-tertiary-600 dark:text-tertiary-300
                      hover:bg-tertiary-400/20 dark:hover:bg-tertiary-500/20
                      border border-tertiary-400/20 dark:border-tertiary-500/20
                      transition-all duration-300'>
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
