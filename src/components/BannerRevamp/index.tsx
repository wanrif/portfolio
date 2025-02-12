import Tooltip from '@components/Tooltip';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GiAce, GiCat, GiLinkedRings } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';

interface ISocialLink {
  href: string;
  icon: React.ReactNode;
  tooltipText: string;
}

const BannerRevamp = () => {
  const { t } = useTranslation();

  const socialLinks: ISocialLink[] = [
    { href: 'mailto:redwan_work@pm.me', icon: <GoMention className='w-6 h-6' />, tooltipText: 'redwan_work@pm.me' },
    {
      href: 'https://www.linkedin.com/in/wanrif/',
      icon: <GiLinkedRings className='w-6 h-6' />,
      tooltipText: 'linkedIn',
    },
    { href: 'https://github.com/wanrif', icon: <GiCat className='w-6 h-6' />, tooltipText: 'Github' },
    {
      href: 'https://drive.proton.me/urls/BR24YA9V6M#Ggg6OmLV3baa',
      icon: <GiAce className='w-6 h-6' />,
      tooltipText: 'CV',
    },
  ];

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-gunmetal-950 via-gunmetal-900 to-iris-900 dark:from-gunmetal-950 dark:via-gunmetal-900 dark:to-iris-900'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(123,90,255,0.1),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.1),transparent_70%)]' />

      <motion.div
        className='relative z-10 container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100dvh-64px)]'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='flex-1 text-center lg:text-left mb-12 lg:mb-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='space-y-6'
          >
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-fluorescent-cyan-400 via-vista-blue-400 to-iris-400 text-transparent bg-clip-text'>
              Redwan Sarif
            </h1>
            <h2 className='text-2xl md:text-3xl font-medium text-tea-green-200'>Fullstack Developer</h2>
            <p className='text-lg md:text-xl text-vista-blue-200 max-w-2xl'>"{t('banner_tagline')}"</p>

            <div className='flex gap-4 justify-center lg:justify-start'>
              {socialLinks.map((link, index) => (
                <Tooltip key={index} text={link.tooltipText}>
                  <motion.a
                    href={link.href}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center justify-center w-12 h-12 rounded-2xl bg-gunmetal-800/50 hover:bg-iris-800/50 text-fluorescent-cyan-400 hover:text-fluorescent-cyan-300 transition-all duration-300 backdrop-blur-sm'
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className='flex-1 relative'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className='relative w-64 h-64 md:w-80 md:h-80 mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-tr from-iris-500 to-vista-blue-500 rounded-3xl rotate-6 blur-2xl opacity-20' />
            <img
              src='/personal_photo.jpg'
              alt='Redwan'
              className='relative z-10 w-full h-full object-cover rounded-3xl ring-4 ring-vista-blue-400/20'
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BannerRevamp;
