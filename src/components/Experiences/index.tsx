import { selectLocale } from '@containers/app/selectors';
import { useAppSelector } from '@stores/hooks';
import { motion } from 'framer-motion';
import React from 'react';
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

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  const locale = useAppSelector(selectLocale);

  const experiences: IExperience[] = [
    {
      title: 'Fullstack Developer',
      company: 'PT Phincon',
      startDate: '2023-10-03',
      endDate: 'present',
      description: 'Working on enterprise-level web applications using React and Express.',
      skills: ['Material-UI', 'SCSS', 'React', 'Redux', 'Express', 'Socket.IO'],
    },
  ];

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

    let result = parts.join(', ').replace(/,([^,]*)$/, locale === 'en' ? ' and$1' : ' dan$1');

    return `${result} ${t('experiences_subtitle')}`;
  };

  return (
    <section
      id='experiences'
      className='bg-gradient-to-b from-shark-300 to-tuna-50 dark:from-tuna-700 dark:to-shark-950 -mt-[1px] sm:mt-0 pb-10 min-h-[50dvh]'
    >
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='flex flex-col mb-8 space-y-2'>
          <h2 className='text-3xl font-bold text-center text-gallery-950 dark:text-tertiary-300'>
            {t('experiences_title')}
          </h2>
          <h3 className='text-xl font-semibold text-center text-gallery-800 dark:text-tertiary-400'>
            {countExperience('2023-10-03', new Date().toISOString().split('T')[0])}
          </h3>
        </div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-tertiary-400 dark:bg-tertiary-500' />

          <div className='relative'>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='relative mb-8 last:mb-0'
              >
                {/* Timeline dot */}
                <div
                  className={`absolute w-4 h-4 bg-tertiary-400 dark:bg-tertiary-500 rounded-full border-4 border-tuna-50 dark:border-shark-950
                    left-2 md:left-1/2 transform md:-translate-x-1/2 mt-6`}
                />

                {/* Experience card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`ml-10 md:ml-0 bg-tuna-50/80 dark:bg-shark-950/80 backdrop-blur p-6 rounded-xl shadow-lg 
                    hover:shadow-tertiary-400/20 dark:hover:shadow-tertiary-500/20 
                    transition-all duration-300 ease-in-out
                    md:w-[calc(50%-20px)]
                    ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 rounded-lg bg-tertiary-400 dark:bg-tertiary-500 p-2 flex items-center justify-center shrink-0'>
                      <GiOfficeChair className='w-8 h-8 text-white' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      {' '}
                      <h3 className='text-xl font-semibold text-tertiary-600 dark:text-tertiary-300'>{exp.title}</h3>
                      <p className='text-tertiary-500 dark:text-tertiary-400 font-medium'>{exp.company}</p>
                      <p className='text-sm text-tertiary-500 dark:text-tertiary-400 mb-2'>
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
                      <p className='text-tertiary-500 dark:text-tertiary-400 mb-3'>{exp.description}</p>
                      <div className='flex flex-wrap gap-2'>
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className='px-3 py-1 text-sm rounded-full bg-tertiary-400/20 dark:bg-tertiary-500/20 
                              text-tertiary-600 dark:text-tertiary-300'
                          >
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
      </div>
    </section>
  );
};

export default Experiences;
