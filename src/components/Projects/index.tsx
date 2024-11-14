import React from 'react';
import { useTranslation } from 'react-i18next';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id='projects'
      className='flex flex-col py-10 items-center justify-center bg-gradient-to-b from-tuna-50 to-shark-300 dark:from-shark-950 dark:to-tuna-700 px-4 min-h-[50dvh]'
    >
      <div className='container mx-auto p-4 max-w-4xl'>
        <h2 className='text-3xl font-bold text-center text-gallery-950 dark:text-tertiary-300'>
          {t('my_skill_title')}
        </h2>
      </div>
    </section>
  );
};

export default Projects;
