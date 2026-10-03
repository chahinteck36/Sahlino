import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdPlaceholderProps {
  slotId?: string;
  adSlot?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

const PUBLISHER_ID = 'ca-pub-9787537851833974';

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'ad-slot-default',
  adSlot,
  format = 'horizontal',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (adSlot && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Ignore initialization errors if ads are blocked or loading
      }
    }
  }, [adSlot]);

  return (
    <aside
      id={slotId}
      className={`my-8 w-full flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] tracking-wider uppercase font-black text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        Advertisement
      </span>

      {adSlot ? (
        <div className="w-full max-w-4xl mx-auto overflow-hidden text-center min-h-[90px]">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={PUBLISHER_ID}
            data-ad-slot={adSlot}
            data-ad-format={format === 'rectangle' ? 'rectangle' : 'auto'}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div
          className={`w-full rounded-2xl border border-dashed border-slate-300/80 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center p-4 min-h-[90px] max-w-4xl mx-auto ${
            format === 'rectangle' ? 'max-w-sm h-64' : 'h-24 md:h-28'
          }`}
        >
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80"></span>
            <span>Sponsored Space • Sahlino Ad Placement Ready</span>
          </div>
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-600 mt-1 max-w-xs">
            Non-intrusive placement optimized for Core Web Vitals and user experience.
          </p>
        </div>
      )}
    </aside>
  );
};

