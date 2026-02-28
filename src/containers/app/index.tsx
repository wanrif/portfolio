import Banner from '@components/Banner';
import Contact from '@components/Contact';
import Experiences from '@components/Experiences';
import FloatingMenu from '@components/FloatingMenu';
import MySkill from '@components/MySkill';
import Navbar from '@components/Navbar';
import Projects from '@components/Projects';
import { selectTheme, useAppStore } from '@stores/app/store';
import { useEffect } from 'react';

function App() {
  const theme = useAppStore(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='relative min-h-dvh bg-shark-950 px-2 pb-24 pt-2 text-gallery-100 sm:px-4 sm:pt-4'>
      <div className='mx-auto w-full max-w-7xl terminal-shell overflow-hidden'>
        <Navbar />
        <main className='box-border relative font-sans antialiased transition-all scroll-smooth'>
          <Banner />
          <Projects />
          <Experiences />
          <MySkill />
          <Contact />
        </main>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default App;
