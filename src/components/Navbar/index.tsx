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
  const fullText = 'kernel@wanrif';
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
      className='sticky top-0 z-40 border-b border-gallery-800/80 bg-shark-950/94 px-3 py-2.5 backdrop-blur-xl sm:px-5 sm:py-3'>
      <div className='mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-2.5 md:grid-cols-[1fr_auto]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={typingVariants}
          className='flex flex-wrap items-center gap-2.5'>
          <div className='flex items-center gap-1.5 rounded-xl border border-gallery-700/85 bg-shark-900/80 px-2 py-1'>
            <span className='h-2 w-2 rounded-full bg-tuna-400/90' />
            <span className='h-2 w-2 rounded-full bg-tertiary-300/85' />
            <span className='h-2 w-2 rounded-full bg-tertiary-500/80' />
          </div>
          <p className='font-display text-xs sm:text-sm font-semibold tracking-[0.14em] text-gallery-100 terminal-caret'>
            /sys/users/{displayText}
          </p>
          <span className='terminal-chip terminal-chip-accent'>tty0</span>
          <span className='terminal-chip'>shell: zsh</span>
        </motion.div>

        <div className='hidden items-center gap-2.5 md:flex'>
          <div className='rounded-xl border border-gallery-700/85 bg-shark-900/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-gallery-300'>
            <span className='text-tertiary-300'>proc</span> portfolio-ui
          </div>
          <p className='rounded-xl border border-tertiary-700/50 bg-shark-900/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-gallery-300'>
            <span className='text-tertiary-300'>$</span> run session --layout terminal-os
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
