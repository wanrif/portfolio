import BannerRevamp from '@components/BannerRevamp';
import Contact from '@components/Contact';
import Experiences from '@components/Experiences';
import FloatingMenuRevamp from '@components/FloatingMenuRevamp';
import MySkill from '@components/MySkill';
import NavbarRevamp from '@components/NavbarRevamp';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { setTheme } from './reducer';
import { selectTheme } from './selectors';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    if (theme === 'dark' || (isEmpty(theme) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      dispatch(setTheme('dark'));
      document.documentElement.classList.add('dark');
    } else {
      dispatch(setTheme('light'));
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <NavbarRevamp />
      <main className='box-border relative antialiased transition-all scroll-smooth'>
        <BannerRevamp />
        <Experiences />
        {/* <MySkill />
        <Contact /> */}
      </main>
      <FloatingMenuRevamp />
    </>
  );
}

export default App;
