import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'ad-slot-default',
  format = 'horizontal',
  className = '',
}) => {
  return (
    <div
      id={slotId}
      className={`my-8 w-full flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[10px] tracking-wider uppercase font-black text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        Advertisement
      </span>
      <div
        className={`w-full rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 flex flex-col items-center justify-center text-center p-4 min-h-[90px] max-w-4xl mx-auto ${
          format === 'rectangle' ? 'max-w-sm h-64' : 'h-24 md:h-28'
        }`}
      >
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Sponsored Space • Sahlino Ad Network Prepared</span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-600 mt-1 max-w-xs">
          Clean, non-intrusive ad placement optimized for Core Web Vitals.
        </p>
      </div>
    </div>
  );
};
