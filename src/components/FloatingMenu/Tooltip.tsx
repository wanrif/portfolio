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
      'hidden sm:block rounded-2xl corner-superellipse/2 pointer-events-none absolute bottom-full border border-tertiary-700/45 bg-shark-950/95 px-3 py-1 text-[11px] uppercase tracking-wider opacity-0 backdrop-blur',
      !isActive ? 'hidden' : '',
    )}
    style={{
      left: '50%',
      transform: 'translateX(-50%)',
      width: '126px',
      overflow: 'hidden',
    }}>
    <div
      style={{
        transform: `translateX(${-tooltipIndex * 106}px)`,
        transition: 'transform 0.3s ease-in-out',
        whiteSpace: 'nowrap',
      }}>
      {items.map((item, index) => (
        <span
          key={index}
          style={{ display: 'inline-block', width: '106px', textAlign: 'center' }}
          className='text-tertiary-300'>
          {'$ '}
          {item.tooltip}
        </span>
      ))}
    </div>
  </div>
));

Tooltip.displayName = 'Tooltip';
export default Tooltip;
