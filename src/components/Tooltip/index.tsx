import React from 'react';

import cn from '@utils/cn';

type TooltipPosition = 'top' | 'bottom';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom' }) => {
  const tooltipStyles = {
    top: '-top-10',
    bottom: 'top-[50px]',
  };

  const arrowStyles = {
    top: '-bottom-1 rotate-45',
    bottom: '-top-1 rotate-45',
  };

  return (
    <div className='group relative'>
      {children}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 rounded border border-tertiary-700/55 bg-shark-900 px-2 py-1 text-[11px] tracking-wide whitespace-nowrap text-tertiary-300 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          tooltipStyles[position],
        )}
      >
        {'$ '}
        {text}
        <div
          className={cn(
            'absolute left-1/2 h-2 w-2 -translate-x-1/2 border border-tertiary-700/55 bg-shark-900',
            arrowStyles[position],
          )}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
