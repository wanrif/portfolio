import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Banner from '@components/Banner';
import Contact from '@components/Contact';
import Experiences from '@components/Experiences';
import FloatingMenu from '@components/FloatingMenu';
import MySkill from '@components/MySkill';
import Navbar from '@components/Navbar';
import Projects from '@components/Projects';
import { selectTheme, useAppStore } from '@stores/app/store';

function App() {
  const { t } = useTranslation();
  const theme = useAppStore(selectTheme);
  const [showBootOverlay, setShowBootOverlay] = useState(true);
  const [isBootFading, setIsBootFading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('amber-crt', theme !== 'dark');
  }, [theme]);

  useEffect(() => {
    const bootCompleteTimer = setTimeout(() => setIsBootFading(true), 2350);
    const bootUnmountTimer = setTimeout(() => setShowBootOverlay(false), 2850);

    return () => {
      clearTimeout(bootCompleteTimer);
      clearTimeout(bootUnmountTimer);
    };
  }, []);

  return (
    <div className='relative min-h-dvh bg-shark-950 px-2 pt-2 pb-24 text-gallery-100 sm:px-4 sm:pt-4'>
      {showBootOverlay && (
        <div
          aria-live='polite'
          className={`boot-overlay fixed inset-0 z-120 flex items-center justify-center px-4 transition-opacity duration-500 ${
            isBootFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className='boot-panel terminal-window w-full max-w-2xl overflow-hidden rounded-2xl'>
            <div className='terminal-titlebar'>
              <span>{t('boot_title')}</span>
              <span className='terminal-chip terminal-chip-accent'>v2.0.4</span>
            </div>
            <div className='space-y-2 p-4 sm:p-5'>
              <p className='boot-line text-sm text-gallery-200'>{t('boot_line_1')}</p>
              <p className='boot-line text-sm text-gallery-200'>{t('boot_line_2')}</p>
              <p className='boot-line text-sm text-gallery-200'>{t('boot_line_3')}</p>
              <p className='boot-line text-sm text-tertiary-300'>{t('boot_line_4')}</p>
              <div className='mt-3 h-2 w-full overflow-hidden rounded-full border border-gallery-700/80 bg-shark-950/70'>
                <div className='boot-progress h-full w-full' />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(59,255,196,0.12),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(255,180,48,0.09),transparent_34%)]' />
      <div className='terminal-shell mx-auto w-full max-w-7xl overflow-hidden'>
        <div className='terminal-topbar'>
          <span className='terminal-dot bg-tuna-400' />
          <span className='terminal-dot bg-tertiary-300' />
          <span className='terminal-dot bg-tertiary-500' />
          <span className='ml-2 truncate'>wanrif-os :: workspace / portfolio.terminal</span>
        </div>
        <Navbar />
        <main className='relative box-border scroll-smooth font-sans antialiased transition-all'>
          <Banner />
          <Projects />
          <Experiences />
          <MySkill />
          <Contact />
        </main>
        <div className='terminal-statusbar'>
          <span className='hidden sm:inline'>session: interactive</span>
          <span className='text-tertiary-300'>runtime: stable</span>
          <span className='truncate'>hint: ctrl+k command palette</span>
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default App;
