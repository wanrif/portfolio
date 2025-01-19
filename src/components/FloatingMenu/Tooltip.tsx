import cn from '@utils/cn';
import { forwardRef } from 'react';

interface TooltipProps {
  isActive: boolean;
  tooltipIndex: number;
  items: { tooltip: string }[];
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ isActive, tooltipIndex, items }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute bottom-full px-3 py-1 bg-shark-200/50 dark:bg-tuna-900/50 backdrop-blur text-sm rounded-full border border-shark-500 pointer-events-none opacity-0 capitalize',
      !isActive ? 'hidden' : ''
    )}
    style={{
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        transform: `translateX(${-tooltipIndex * 100}px)`,
        transition: 'transform 0.3s ease-in-out',
        whiteSpace: 'nowrap',
      }}
    >
      {items.map((item, index) => (
        <span
          key={index}
          style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}
          className='text-tertiary-500 dark:text-gallery-100'
        >
          {item.tooltip}
        </span>
      ))}
    </div>
  </div>
));

Tooltip.displayName = 'Tooltip';
export default Tooltip;
