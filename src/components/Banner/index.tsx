import React from 'react';
import { useTranslation } from 'react-i18next';

import Tooltip from '@components/Tooltip';
import { iconInteractionMotion, pageEnterMotion, sectionInViewMotion } from '@utils/motion';
import scrollToSection from '@utils/scrollToSection';

import { motion } from 'framer-motion';
import { GiAce, GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';

import ParticleBackground from './ParticleBackground';

interface ISocialLink {
  href: string;
  icon: React.ReactNode;
  tooltipText: string;
}

const Banner: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks: ISocialLink[] = [
    {
      href: 'mailto:redwan_work@pm.me',
      icon: <GoMention className='h-5 w-5' />,
      tooltipText: 'redwan_work@pm.me',
    },
    {
      href: 'https://www.linkedin.com/in/wanrif/',
      icon: <GiLinkedRings className='h-5 w-5' />,
      tooltipText: 'linkedIn',
    },
    {
      href: 'https://github.com/wanrif',
      icon: <GiCat className='h-5 w-5' />,
      tooltipText: 'Github',
    },
    {
      href: 'https://drive.proton.me/urls/253KWW5VM4#Tw7dKlEuPOPr',
      icon: <GiAce className='h-5 w-5' />,
      tooltipText: 'CV',
    },
  ];

  return (
    <section id='top' className='terminal-section relative overflow-hidden px-4 sm:px-6'>
      <ParticleBackground />

      <motion.div
        className='relative z-10 mx-auto grid w-full max-w-6xl items-start gap-4 xl:grid-cols-[minmax(0,1.34fr)_minmax(0,0.66fr)]'
        {...pageEnterMotion()}
      >
        <div className='terminal-window overflow-hidden'>
          <div className='terminal-titlebar'>
            <span>workspace / hero.session</span>
            <span className='terminal-chip terminal-chip-accent'>{t('hero_available')}</span>
          </div>

          <div className='grid items-start gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 lg:p-6'>
            <motion.div className='space-y-4' {...sectionInViewMotion()}>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>{t('hero_terminal_line')}</span>
              </div>

              <h1 className='font-display text-3xl leading-[1.1] font-bold text-gallery-100 sm:text-5xl'>
                Redwan Sarif
                <span className='mt-1.5 block text-xl text-tertiary-300 sm:text-3xl'>
                  {t('hero_role')}
                </span>
              </h1>

              <p className='max-w-xl text-gallery-300'>{t('hero_intro')}</p>

              <div className='flex flex-wrap items-center gap-2 pt-1'>
                <button
                  type='button'
                  onClick={() => scrollToSection('projects')}
                  className='terminal-btn-primary rounded-xl px-4 py-2 transition-colors corner-bevel'
                >
                  {t('hero_primary_cta')}
                </button>
                <a
                  href='https://github.com/wanrif'
                  target='_blank'
                  rel='noreferrer'
                  className='terminal-btn-secondary rounded-xl px-4 py-2 transition-colors corner-bevel'
                >
                  {t('hero_secondary_cta')}
                </a>
              </div>

              <div className='grid max-w-md grid-cols-2 gap-2 sm:grid-cols-4'>
                {socialLinks.map((link, index) => (
                  <Tooltip key={index} text={link.tooltipText}>
                    <motion.a
                      href={link.href}
                      target='_blank'
                      rel='noreferrer'
                      className='terminal-subcard flex h-11 items-center justify-center rounded-xl text-tertiary-300 transition-colors duration-300 corner-bevel hover:border-tertiary-400'
                      {...iconInteractionMotion()}
                    >
                      {link.icon}
                    </motion.a>
                  </Tooltip>
                ))}
              </div>

              <div className='terminal-subcard rounded-xl p-2'>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Next.js',
                    'TypeScript',
                    'React',
                    'Tailwind CSS',
                    'Material UI',
                    'Express.js',
                    'Hono',
                  ].map((item) => (
                    <span key={item} className='terminal-chip'>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className='space-y-3 self-start'>
              <div className='terminal-subcard rounded-2xl p-1.5 corner-bevel'>
                <img
                  src='/personal_photo.webp'
                  alt={t('hero_photo_alt')}
                  loading='eager'
                  className='aspect-4/3 w-full rounded-xl object-cover object-center'
                  onError={(event) => {
                    const imageElement = event.currentTarget;
                    if (imageElement.dataset.fallbackApplied === 'true') return;
                    imageElement.dataset.fallbackApplied = 'true';
                    imageElement.src = '/personal_photo.jpg';
                  }}
                />
              </div>
              <p className='terminal-prompt'>module :: profile.meta</p>
              <div className='grid gap-3'>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_current_role_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_current_role_value')}</p>
                </div>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_focus_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_focus_value')}</p>
                </div>
                <div className='terminal-subcard rounded-2xl p-3 corner-bevel'>
                  <p className='text-xs tracking-wide text-gallery-400 uppercase'>
                    {t('hero_open_to_label')}
                  </p>
                  <p className='text-gallery-100'>{t('hero_open_to_value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='terminal-window h-fit self-start overflow-hidden'>
          <div className='terminal-titlebar'>
            <span>runtime / signals</span>
            <span className='terminal-chip'>live</span>
          </div>
          <div className='space-y-3 p-4 sm:p-5'>
            <div className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>system.bus</p>
              <p className='text-sm text-gallery-200'>
                Building scalable frontend systems with stable DX and maintainable patterns.
              </p>
            </div>
            <div className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>deploy.target</p>
              <p className='text-sm text-gallery-200'>
                Products for users, internal teams, and integration-heavy enterprise workflows.
              </p>
            </div>
            <div className='terminal-subcard rounded-xl p-3'>
              <p className='terminal-prompt mb-2'>ops.state</p>
              <p className='text-sm text-tertiary-300'>ready_for_collaboration=true</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
