import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const typingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Navbar: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const fullText = 'wanrif';
  const typingSpeed = 140;

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && loopIndex < fullText.length) {
        // Typing forward
        setDisplayText((prev) => prev + fullText[loopIndex]);
        setLoopIndex((prev) => prev + 1);
      } else if (isDeleting && loopIndex > 0) {
        // Deleting backwards
        setDisplayText((prev) => prev.slice(0, -1));
        setLoopIndex((prev) => prev - 1);
      } else if (loopIndex === fullText.length && !isDeleting) {
        // Pause after typing the full word
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (loopIndex === 0 && isDeleting) {
        // Reset after deleting the entire word
        setIsDeleting(false);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [displayText, isDeleting, loopIndex]);

  return (
    <header
      id='header'
      className='sticky top-0 z-40 border-b border-gallery-800/70 bg-shark-950/90 px-3 py-3 backdrop-blur-xl sm:px-5'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-3'>
        <motion.div initial='hidden' animate='visible' variants={typingVariants} className='flex items-center gap-3'>
          <div className='flex items-center gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-full bg-red-400/80' />
            <span className='h-2.5 w-2.5 rounded-full bg-yellow-400/80' />
            <span className='h-2.5 w-2.5 rounded-full bg-tertiary-400/80' />
          </div>
          <p className='font-display text-base font-semibold tracking-wider text-gallery-100 terminal-caret'>
            ~/{displayText}
          </p>
        </motion.div>

        <div className='hidden rounded-2xl corner-superellipse/2 border border-gallery-700 bg-shark-900/80 px-3 py-1.5 text-xs text-gallery-300 md:block'>
          <span className='text-tertiary-300'>$</span> portfolio --theme hacker --status live
        </div>
      </div>
    </header>
  );
};

export default Navbar;
