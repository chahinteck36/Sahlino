import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Copy, Check, Calendar, ArrowDownUp } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { toAsciiDigits } from '../../utils/numberUtils';

interface TimestampConverterToolProps {
  onNavigate: (path: string) => void;
}

export const TimestampConverterTool: React.FC<TimestampConverterToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 16));
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert Epoch to Date
  const { localDate, utcDate, relativeTime } = (() => {
    const normalized = toAsciiDigits(epochInput.trim());
    const num = parseInt(normalized, 10);
    if (isNaN(num)) return { localDate: '-', utcDate: '-', relativeTime: '-' };

    // Handle milliseconds vs seconds
    const ms = normalized.length > 11 ? num : num * 1000;
    const d = new Date(ms);

    if (isNaN(d.getTime())) return { localDate: isAr ? 'تاريخ غير صالح' : 'Invalid Date', utcDate: isAr ? 'تاريخ غير صالح' : 'Invalid Date', relativeTime: '-' };

    return {
      localDate: d.toLocaleString(),
      utcDate: d.toUTCString(),
      relativeTime: d.toISOString(),
    };
  })();

  // Convert Date to Epoch
  const generatedEpoch = (() => {
    if (!dateInput) return 0;
    const d = new Date(dateInput);
    return Math.floor(d.getTime() / 1000);
  })();

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="timestamp-converter"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المطورين' : 'Developer Tools', item: 'https://www.sahlino.tech/categories/developer-tools' },
          { name: isAr ? 'محول التوقيت الزمني' : 'Timestamp Converter', item: 'https://www.sahlino.tech/timestamp-converter' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المطورين والبرمجة' : 'Developer Tools', href: '/categories/developer-tools' },
            { label: isAr ? 'محول الطابع الزمني Epoch' : 'Unix Timestamp Converter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="space-y-8 mb-8">
        {/* Live Clock Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-emerald-400" />
            <div>
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                {isAr ? 'الطابع الزمني الحالي (Unix Epoch Live)' : 'Current Unix Epoch Time'}
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {currentEpoch}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleCopy(String(currentEpoch), 'live')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 cursor-pointer"
          >
            {copied === 'live' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied === 'live' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الطابع اللحظي' : 'Copy Live')}</span>
          </button>
        </div>

        {/* Section 1: Epoch to Human Date */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>{isAr ? 'تحويل Epoch إلى تاريخ ووقت مقروء' : 'Epoch Timestamp to Human-Readable Date'}</span>
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
              placeholder="e.g. 1741525200"
              className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
            />
            <button
              onClick={() => setEpochInput(String(Math.floor(Date.now() / 1000)))}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {isAr ? 'الآن' : 'Now'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">{isAr ? 'التوقيت المحلي (Local Time)' : 'Local Time'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{localDate}</span>
              </div>
              <button
                onClick={() => handleCopy(localDate, 'local')}
                className="text-emerald-600 hover:underline cursor-pointer"
              >
                {copied === 'local' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">{isAr ? 'توقيت غرينتش (UTC / GMT)' : 'UTC / GMT Time'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{utcDate}</span>
              </div>
              <button
                onClick={() => handleCopy(utcDate, 'utc')}
                className="text-emerald-600 hover:underline cursor-pointer"
              >
                {copied === 'utc' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Human Date to Epoch */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
            {isAr ? 'تحويل تاريخ إلى طابع Unix Epoch' : 'Human-Readable Date to Unix Timestamp'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8">
              <input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
              />
            </div>

            <div className="sm:col-span-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 block">Epoch</span>
                <span className="font-mono font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                  {generatedEpoch}
                </span>
              </div>
              <button
                onClick={() => handleCopy(String(generatedEpoch), 'gen')}
                className="text-emerald-600 hover:underline cursor-pointer"
              >
                {copied === 'gen' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="timestamp-converter" onNavigate={onNavigate} />
    </div>
  );
};
