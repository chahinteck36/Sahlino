import React, { useState, useMemo } from 'react';
import {
  HardDrive,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ArrowRightLeft,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface StorageUnit {
  id: string;
  name: string;
  bytesDecimal: number;
  bytesBinary: number;
}

const STORAGE_UNITS: StorageUnit[] = [
  { id: 'b', name: 'Bytes (B)', bytesDecimal: 1, bytesBinary: 1 },
  { id: 'kb', name: 'Kilobytes (KB / KiB)', bytesDecimal: 1e3, bytesBinary: 1024 },
  { id: 'mb', name: 'Megabytes (MB / MiB)', bytesDecimal: 1e6, bytesBinary: 1024 ** 2 },
  { id: 'gb', name: 'Gigabytes (GB / GiB)', bytesDecimal: 1e9, bytesBinary: 1024 ** 3 },
  { id: 'tb', name: 'Terabytes (TB / TiB)', bytesDecimal: 1e12, bytesBinary: 1024 ** 4 },
  { id: 'pb', name: 'Petabytes (PB / PiB)', bytesDecimal: 1e15, bytesBinary: 1024 ** 5 },
];

export const DataStorageConverterTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('data-storage-converter') || {
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    description: 'Convert between Bytes, KB, MB, GB, TB, and PB in both decimal (base-10) and binary (base-2) standards.',
    category: 'converters',
    categoryName: 'Converters',
    seoTitle: 'Data Storage Converter Online - Free Bytes, MB, GB, TB Converter',
    seoDescription: 'Convert digital storage sizes between B, KB, MB, GB, TB, and PB with decimal 1000 and binary 1024 standards.',
    faqs: [],
  };

  const [value, setValue] = useState<number>(1024);
  const [fromUnit, setFromUnit] = useState<string>('mb');
  const [standard, setStandard] = useState<'binary' | 'decimal'>('binary'); // 1024 vs 1000

  const conversions = useMemo(() => {
    const fromDef = STORAGE_UNITS.find((u) => u.id === fromUnit) || STORAGE_UNITS[2];
    const byteMultiplier = standard === 'binary' ? fromDef.bytesBinary : fromDef.bytesDecimal;
    const totalBytes = value * byteMultiplier;

    return STORAGE_UNITS.map((u) => {
      const unitMult = standard === 'binary' ? u.bytesBinary : u.bytesDecimal;
      const converted = totalBytes / unitMult;
      return {
        id: u.id,
        name: u.name,
        value: converted,
        formatted: converted >= 1 ? converted.toLocaleString(undefined, { maximumFractionDigits: 4 }) : converted.toPrecision(4),
      };
    });
  }, [value, fromUnit, standard]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/data-storage-converter"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('converters', 'Converters'),
            onClick: () => onNavigate('/categories/converters'),
          },
          { label: getToolName('data-storage-converter', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('data-storage-converter', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('data-storage-converter', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        {/* Input Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-8">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Enter Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Source Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-indigo-500"
            >
              {STORAGE_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Standard
            </label>
            <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
              <button
                onClick={() => setStandard('binary')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  standard === 'binary'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Binary (1024)
              </button>
              <button
                onClick={() => setStandard('decimal')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  standard === 'decimal'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Decimal (1000)
              </button>
            </div>
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {conversions.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.id === fromUnit
                  ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.name}
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 break-all">
                {item.formatted}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="data-storage-converter"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
