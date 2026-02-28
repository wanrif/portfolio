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
    { href: 'mailto:redwan_work@pm.me', icon: <GoMention className='h-5 w-5' />, tooltipText: 'redwan_work@pm.me' },
    {
      href: 'https://www.linkedin.com/in/wanrif/',
      icon: <GiLinkedRings className='h-5 w-5' />,
      tooltipText: 'linkedIn',
    },
    { href: 'https://github.com/wanrif', icon: <GiCat className='h-5 w-5' />, tooltipText: 'Github' },
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
        className='relative z-10 mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[1.34fr_0.66fr]'
        {...pageEnterMotion()}>
        <div className='terminal-window overflow-hidden'>
          <div className='terminal-titlebar'>
            <span>workspace / hero.session</span>
            <span className='terminal-chip terminal-chip-accent'>{t('hero_available')}</span>
          </div>

          <div className='grid gap-4 p-4 sm:p-5 md:grid-cols-[1.18fr_0.82fr] md:p-6'>
            <motion.div className='space-y-4.5' {...sectionInViewMotion()}>
              <div className='terminal-command-row'>
                <span className='text-tertiary-300'>$</span>
                <span>{t('hero_terminal_line')}</span>
              </div>

              <h1 className='font-display text-3xl font-bold leading-[1.1] text-gallery-100 sm:text-5xl'>
                Redwan Sarif
                <span className='mt-1.5 block text-xl text-tertiary-300 sm:text-3xl'>{t('hero_role')}</span>
              </h1>

              <p className='max-w-2xl text-gallery-300'>{t('hero_intro')}</p>

              <div className='flex flex-wrap items-center gap-2 pt-1'>
                <a
                  href='#projects'
                  className='terminal-btn-primary rounded-xl corner-bevel px-4 py-2 transition-colors'>
                  {t('hero_primary_cta')}
                </a>
                <a
                  href='https://github.com/wanrif'
                  target='_blank'
                  rel='noreferrer'
                  className='terminal-btn-secondary rounded-xl corner-bevel px-4 py-2 transition-colors'>
                  {t('hero_secondary_cta')}
                </a>
              </div>

              <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                {socialLinks.map((link, index) => (
                  <Tooltip key={index} text={link.tooltipText}>
                    <motion.a
                      href={link.href}
                      target='_blank'
                      rel='noreferrer'
                      className='terminal-subcard rounded-xl corner-bevel flex h-11 items-center justify-center text-tertiary-300 transition-colors duration-300 hover:border-tertiary-400'
                      {...iconInteractionMotion()}>
                      {link.icon}
                    </motion.a>
                  </Tooltip>
                ))}
              </div>
            </motion.div>

            <div className='space-y-3.5'>
              <p className='terminal-prompt'>module :: profile.meta</p>
              <div className='terminal-subcard rounded-2xl corner-bevel p-3'>
                <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_current_role_label')}</p>
                <p className='text-gallery-100'>{t('hero_current_role_value')}</p>
              </div>
              <div className='terminal-subcard rounded-2xl corner-bevel p-3'>
                <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_focus_label')}</p>
                <p className='text-gallery-100'>{t('hero_focus_value')}</p>
              </div>
              <div className='terminal-subcard rounded-2xl corner-bevel p-3'>
                <p className='text-xs uppercase tracking-wide text-gallery-400'>{t('hero_open_to_label')}</p>
                <p className='text-gallery-100'>{t('hero_open_to_value')}</p>
              </div>
              <div className='flex flex-wrap gap-2 pt-1'>
                {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Material UI', 'Express.js', 'Hono'].map((item) => (
                  <span key={item} className='terminal-chip'>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='terminal-window overflow-hidden'>
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
