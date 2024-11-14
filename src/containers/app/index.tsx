import Banner from '@components/Banner';
import Contact from '@components/Contact';
import Experiences from '@components/Experiences';
import FloatingMenu from '@components/FloatingMenu';
import MySkill from '@components/MySkill';
import Navbar from '@components/Navbar';
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
      <Navbar />
      <main className='box-border relative antialiased transition-all scroll-smooth'>
        <Banner />
        <Experiences />
        <MySkill />
        <Contact />
      </main>
      <FloatingMenu />
    </>
  );
}

export default App;
