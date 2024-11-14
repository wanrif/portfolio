import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contactLinks = [
    {
      icon: <GoMention className='w-6 h-6' />,
      label: 'Email',
      href: 'mailto:redwan_work@pm.me',
      value: 'redwan_work@pm.me',
      delay: 0.1,
      gradientColors: 'from-blue-400 to-blue-600',
    },
    {
      icon: <GiLinkedRings className='w-6 h-6' />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/wanrif/',
      value: 'linkedin.com/in/wanrif',
      delay: 0.2,
      gradientColors: 'from-cyan-400 to-cyan-600',
    },
    {
      icon: <GiCat className='w-6 h-6' />,
      label: 'GitHub',
      href: 'https://github.com/wanrif',
      value: 'github.com/wanrif',
      delay: 0.3,
      gradientColors: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section
      id='contacts'
      className='bg-gradient-to-b from-shark-300 to-tuna-50 dark:from-tuna-700 dark:to-shark-950 -mt-[1px] sm:mt-0 py-16 min-h-[40dvh]'
    >
      <div className='container mx-auto px-4 max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-gallery-950 dark:text-tertiary-300 mb-4'>
            {t('contact_title')}
          </h2>
          <p className='text-lg text-gallery-800 dark:text-tertiary-400 max-w-2xl mx-auto'>{t('contact_subtitle')}</p>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          {contactLinks.map((link) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: link.delay, duration: 0.3 }}
              className='group relative'
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.gradientColors} opacity-0 
                  group-hover:opacity-10 dark:group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
              />

              <motion.a
                href={link.href}
                target='_blank'
                rel='noreferrer'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='relative block p-6 rounded-xl bg-tuna-50/50 dark:bg-shark-950/50 backdrop-blur-sm
                  shadow-lg hover:shadow-xl
                  transition-all duration-300 ease-in-out
                  border border-tertiary-400/10 dark:border-tertiary-500/10
                  hover:border-tertiary-400/30 dark:hover:border-tertiary-500/30'
              >
                <div className='flex flex-col items-center'>
                  <div
                    className='mb-4 p-3 rounded-xl bg-tertiary-400 dark:bg-tertiary-500 
                    group-hover:bg-gradient-to-br group-hover:scale-110
                    transition-all duration-300'
                  >
                    {link.icon}
                  </div>
                  <h3 className='text-lg font-semibold text-tertiary-600 dark:text-tertiary-300 mb-2'>{link.label}</h3>
                  <p
                    className='text-sm text-tertiary-500 dark:text-tertiary-400 text-center
                    group-hover:text-tertiary-600 dark:group-hover:text-tertiary-300 transition-colors'
                  >
                    {link.value}
                  </p>

                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                      text-tertiary-500 dark:text-tertiary-400 transition-opacity duration-300'
                  >
                    →
                  </motion.span>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
