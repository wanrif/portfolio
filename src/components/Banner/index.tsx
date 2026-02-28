import Tooltip from '@components/Tooltip';
import { iconInteractionMotion, pageEnterMotion, sectionInViewMotion } from '@utils/motion';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
    { href: 'mailto:redwan_work@pm.me', icon: <GoMention className='w-5 h-5' />, tooltipText: 'redwan_work@pm.me' },
    {
      href: 'https://www.linkedin.com/in/wanrif/',
      icon: <GiLinkedRings className='w-5 h-5' />,
      tooltipText: 'linkedIn',
    },
    { href: 'https://github.com/wanrif', icon: <GiCat className='w-5 h-5' />, tooltipText: 'Github' },
    {
      href: 'https://drive.proton.me/urls/253KWW5VM4#Tw7dKlEuPOPr',
      icon: <GiAce className='w-5 h-5' />,
      tooltipText: 'CV',
    },
  ];

  return (
    <section
      id='top'
      className='relative flex items-center justify-center min-h-[calc(100dvh-72px)] overflow-hidden border-b border-gallery-800 bg-shark-950'>
      <ParticleBackground />

      <motion.div
        className='relative z-10 grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-6'
        {...pageEnterMotion()}>
        <div className='terminal-window p-5 sm:p-6'>
          <p className='terminal-prompt'>{t('hero_available')}</p>

          <motion.div className='mb-7 mt-4 space-y-4 text-left' {...sectionInViewMotion()}>
            <p className='text-tertiary-300'>
              {'>'} {t('hero_terminal_line')}
            </p>
            <h1 className='font-display text-4xl font-bold leading-tight text-gallery-100 sm:text-6xl'>
              Redwan Sarif
              <br />
              <span className='text-tertiary-400'>{t('hero_role')}</span>
            </h1>
            <p className='max-w-3xl text-lg text-gallery-300'>{t('hero_intro')}</p>
          </motion.div>

          <motion.div className='flex flex-wrap items-center gap-3' {...sectionInViewMotion()}>
            <a href='#projects' className='terminal-btn-primary rounded-2xl corner-bevel px-4 py-2 transition-colors'>
              {t('hero_primary_cta')}
            </a>
            <a
              href='https://github.com/wanrif'
              target='_blank'
              rel='noreferrer'
              className='terminal-btn-secondary rounded-2xl corner-bevel px-4 py-2 transition-colors'>
              {t('hero_secondary_cta')}
            </a>

            {socialLinks.map((link, index) => (
              <Tooltip key={index} text={link.tooltipText}>
                <motion.a
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-2xl corner-bevel flex h-10 w-10 items-center justify-center border border-gallery-700 bg-shark-950/70 text-tertiary-300 transition-colors duration-300 hover:border-tertiary-400'
                  {...iconInteractionMotion()}>
                  {link.icon}
                </motion.a>
              </Tooltip>
            ))}
          </motion.div>
        </div>

        <div className='terminal-window p-5'>
          <p className='terminal-prompt mb-3'>
            {'>'} {t('hero_panel_title')}
          </p>

          <div className='space-y-3'>
            <div className='terminal-subcard rounded-2xl corner-bevel px-3 py-2'>
              <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_current_role_label')}</p>
              <p className='text-gallery-100'>{t('hero_current_role_value')}</p>
            </div>

            <div className='terminal-subcard rounded-2xl corner-bevel px-3 py-2'>
              <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_focus_label')}</p>
              <p className='text-gallery-100'>{t('hero_focus_value')}</p>
            </div>

            <div className='terminal-subcard rounded-2xl corner-bevel px-3 py-2'>
              <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_open_to_label')}</p>
              <p className='text-gallery-100'>{t('hero_open_to_value')}</p>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Material UI', 'Express.js', 'Hono'].map((item) => (
              <span
                key={item}
                className='rounded-2xl corner-bevel border border-gallery-700 px-2.5 py-1 text-xs text-tertiary-300'>
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
