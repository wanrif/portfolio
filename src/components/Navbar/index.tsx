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
  const fullText = 'Wanrif';
  const typingSpeed = 200; // Typing speed in ms

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
    <div className='flex justify-center p-2 bg-tuna-50 dark:bg-shark-950'>
      <div className='flex justify-center w-full items-center min-h-[48px]'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={typingVariants}
          className='font-franchise text-5xl uppercase select-none tracking-wider dark:text-tuna-200 text-tertiary-500'
        >
          {displayText}
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
