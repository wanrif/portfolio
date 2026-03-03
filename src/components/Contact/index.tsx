import React from 'react';
import { useTranslation } from 'react-i18next';

import { cardInteractionMotion, makeStaggerInViewMotion, sectionInViewMotion } from '@utils/motion';

import { motion } from 'framer-motion';
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
      icon: <GoMention className='h-6 w-6' />,
      label: t('contact_label_email'),
      href: 'mailto:redwan_work@pm.me',
      value: 'redwan_work@pm.me',
      delay: 0.1,
    },
    {
      icon: <GiLinkedRings className='h-6 w-6' />,
      label: t('contact_label_linkedin'),
      href: 'https://www.linkedin.com/in/wanrif/',
      value: 'linkedin.com/in/wanrif',
      delay: 0.2,
    },
    {
      icon: <GiCat className='h-6 w-6' />,
      label: t('contact_label_github'),
      href: 'https://github.com/wanrif',
      value: 'github.com/wanrif',
      delay: 0.3,
    },
    {
      icon: <GiAce className='h-5 w-5' />,
      label: t('contact_label_cv'),
      href: 'https://drive.proton.me/urls/253KWW5VM4#Tw7dKlEuPOPr',
      value: t('contact_value_cv'),
      delay: 0.3,
    },
  ];

  return (
    <section id='contacts' className='terminal-section relative min-h-[40dvh] px-4'>
      <div className='terminal-grid-bg' />
      <div className='relative z-10 container mx-auto max-w-6xl'>
        <motion.div {...sectionInViewMotion()} className='mb-7'>
          <p className='terminal-prompt mb-2'>module: contact.endpoints</p>
          <h2 className='terminal-heading mb-2.5 font-display text-3xl font-bold md:text-4xl'>
            {t('contact_title')}
          </h2>
          <p className='max-w-2xl text-lg text-gallery-300'>{t('contact_subtitle')}</p>
          <p className='mt-3 text-gallery-400'>
            {'>'} {t('contact_palette_hint')}
          </p>
        </motion.div>

        <div className='grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='terminal-window overflow-hidden rounded-2xl'>
            <div className='terminal-titlebar'>
              <span>network / external.links</span>
              <span className='terminal-chip terminal-chip-accent'>online</span>
            </div>
            <div className='space-y-2.5 p-4 sm:p-5'>
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                  {...makeStaggerInViewMotion(link.delay * 10, 0.03)}
                  {...cardInteractionMotion()}
                  className='group grid items-center gap-3 rounded-xl border border-gallery-700/80 bg-shark-950/60 p-3 sm:grid-cols-[44px_160px_1fr_24px] sm:gap-3.5'
                >
                  <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-gallery-700 bg-shark-950/70 text-tertiary-300'>
                    {link.icon}
                  </div>
                  <p className='text-xs font-semibold tracking-[0.12em] text-tertiary-300 uppercase sm:text-sm'>
                    {link.label}
                  </p>
                  <p className='text-sm break-all text-gallery-300'>{link.value}</p>
                  <span className='text-tertiary-300 transition-transform duration-300 group-hover:translate-x-1'>
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className='terminal-window overflow-hidden rounded-2xl'>
            <div className='terminal-titlebar'>
              <span>help / quick.commands</span>
            </div>
            <div className='space-y-2.5 p-4 sm:p-5'>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>open --channel email</span>
              </div>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>open --channel linkedin</span>
              </div>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>download --resource cv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
