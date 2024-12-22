import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GiAce, GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';
import ParticleBackground from './ParticleBackground';
import Tooltip from '@components/Tooltip';

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
      href: 'https://drive.proton.me/urls/BR24YA9V6M#Ggg6OmLV3baa',
      icon: <GiAce className='w-5 h-5' />,
      tooltipText: 'CV',
    },
  ];

  return (
    <section className='relative flex items-center justify-center min-h-[calc(100dvh-64px)] bg-gradient-to-b from-tuna-50 to-shark-300 dark:from-shark-950 dark:to-tuna-700 overflow-hidden'>
      <ParticleBackground />

      <motion.div
        className='relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <motion.div
          className='mb-8'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <img
            src='/personal_photo.jpg'
            alt='Redwan'
            className='rounded-full w-32 h-32 object-cover shadow-lg ring-4 ring-tertiary-400/30 dark:ring-tertiary-500/30'
          />
        </motion.div>

        <motion.div
          className='space-y-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          <h1 className='text-5xl font-bold text-tuna-950 dark:text-gallery-100'>Redwan Sarif</h1>
          <p className='text-2xl font-medium text-tuna-800 dark:text-gallery-200'>Fullstack Developer</p>
          <p className='text-lg italic text-tuna-700 dark:text-gallery-300 max-w-2xl mx-auto'>
            "{t('banner_tagline')}"
          </p>
        </motion.div>

        <motion.div
          className='flex gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}>
          {socialLinks.map((link, index) => (
            <Tooltip key={index} text={link.tooltipText}>
              <motion.a
                href={link.href}
                target='_blank'
                rel='noreferrer'
                className='flex items-center justify-center w-10 h-10 rounded-xl bg-tertiary-400/20 hover:bg-tertiary-400/40 dark:bg-tertiary-500/20 dark:hover:bg-tertiary-500/40 text-tertiary-600 dark:text-tertiary-300 transition-all duration-300'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}>
                {link.icon}
              </motion.a>
            </Tooltip>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
