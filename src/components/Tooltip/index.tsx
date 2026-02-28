import cn from '@utils/cn';
import React from 'react';

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
    <div className='relative group'>
      {children}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-shark-900 text-tertiary-300 text-[11px] uppercase tracking-wide rounded border border-tertiary-700/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap',
          tooltipStyles[position],
        )}>
        {'$ '}
        {text}
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-shark-900 border border-tertiary-700/55',
            arrowStyles[position],
          )}></div>
      </div>
    </div>
  );
};

export default Tooltip;
