import { motion } from 'framer-motion';
import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GiAce, GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';

interface IContactLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
  delay: number;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contactLinks: IContactLink[] = [
    {
      icon: <GoMention className='w-6 h-6' />,
      label: t('contact_label_email'),
      href: 'mailto:redwan_work@pm.me',
      value: 'redwan_work@pm.me',
      delay: 0.1,
    },
    {
      icon: <GiLinkedRings className='w-6 h-6' />,
      label: t('contact_label_linkedin'),
      href: 'https://www.linkedin.com/in/wanrif/',
      value: 'linkedin.com/in/wanrif',
      delay: 0.2,
    },
    {
      icon: <GiCat className='w-6 h-6' />,
      label: t('contact_label_github'),
      href: 'https://github.com/wanrif',
      value: 'github.com/wanrif',
      delay: 0.3,
    },
    {
      icon: <GiAce className='w-5 h-5' />,
      label: t('contact_label_cv'),
      href: 'https://drive.proton.me/urls/253KWW5VM4#Tw7dKlEuPOPr',
      value: t('contact_value_cv'),
      delay: 0.3,
    },
  ];

  return (
    <section id='contacts' className='bg-shark-950 py-16 min-h-[40dvh]'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <motion.div {...sectionInViewMotion()} className='mb-12'>
          <p className='terminal-prompt mb-2'>{'>'} section: contacts</p>
          <h2 className='terminal-heading mb-4 font-display text-3xl font-bold md:text-4xl'>{t('contact_title')}</h2>
          <p className='text-lg text-gallery-300 max-w-2xl'>{t('contact_subtitle')}</p>
          <p className='text-gallery-400 mt-3'>
            {'>'} {t('contact_palette_hint')}
          </p>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-4'>
          {contactLinks.map((link) => (
            <motion.div key={link.label} {...makeStaggerInViewMotion(link.delay * 10, 0.03)} className='group relative'>
              <motion.a
                href={link.href}
                target='_blank'
                rel='noreferrer'
                {...cardInteractionMotion()}
                className='terminal-window terminal-subcard corner-superellipse/2 relative block rounded-3xl p-6 transition-all duration-300 ease-in-out hover:border-tertiary-400'>
                <div className='flex flex-col items-center'>
                  <div className='rounded-2xl corner-bevel mb-4 border border-gallery-700 bg-shark-950/70 p-3 transition-all duration-300 group-hover:scale-110'>
                    {link.icon}
                  </div>
                  <h3 className='text-lg font-semibold text-tertiary-300 mb-2'>{link.label}</h3>
                  <p className='text-sm text-gallery-300 text-center group-hover:text-gallery-100 transition-colors'>
                    {link.value}
                  </p>

                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                      text-tertiary-300 transition-opacity duration-300'>
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
