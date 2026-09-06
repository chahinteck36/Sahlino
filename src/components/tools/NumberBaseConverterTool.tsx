import React, { useState, useMemo } from 'react';
import {
  Binary,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const NumberBaseConverterTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('number-base-converter') || {
    slug: 'number-base-converter',
    name: 'Number Base Converter (Binary, Dec, Hex)',
    description: 'Convert numbers instantly between Decimal, Binary, Hexadecimal, and Octal bases with bit representations.',
    category: 'converters',
    categoryName: 'Converters',
    seoTitle: 'Binary to Decimal & Hex Converter Online - Number Base Calculator',
    seoDescription: 'Convert numbers between Decimal, Binary, Hexadecimal, and Octal bases instantly with 100% in-browser accuracy.',
    faqs: [],
  };

  const [activeBase, setActiveBase] = useState<2 | 8 | 10 | 16>(10);
  const [inputValue, setInputValue] = useState<string>('255');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Parse decimal value
  const parsedDecimal = useMemo(() => {
    try {
      const clean = inputValue.trim();
      if (!clean) return 0n;
      let dec: bigint;
      if (activeBase === 2) {
        if (!/^[01]+$/.test(clean)) return null;
        dec = BigInt('0b' + clean);
      } else if (activeBase === 8) {
        if (!/^[0-7]+$/.test(clean)) return null;
        dec = BigInt('0o' + clean);
      } else if (activeBase === 10) {
        if (!/^[0-9]+$/.test(clean)) return null;
        dec = BigInt(clean);
      } else {
        if (!/^[0-9a-fA-F]+$/.test(clean)) return null;
        dec = BigInt('0x' + clean);
      }
      return dec;
    } catch {
      return null;
    }
  }, [inputValue, activeBase]);

  const results = useMemo(() => {
    if (parsedDecimal === null) return null;
    return {
      decimal: parsedDecimal.toString(10),
      binary: parsedDecimal.toString(2),
      hex: parsedDecimal.toString(16).toUpperCase(),
      octal: parsedDecimal.toString(8),
    };
  }, [parsedDecimal]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/number-base-converter"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('converters', 'Converters'),
            onClick: () => onNavigate('/categories/converters'),
          },
          { label: getToolName('number-base-converter', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('number-base-converter', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('number-base-converter', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        {/* Source selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { base: 10, label: 'Decimal (Base 10)' },
            { base: 2, label: 'Binary (Base 2)' },
            { base: 16, label: 'Hexadecimal (Base 16)' },
            { base: 8, label: 'Octal (Base 8)' },
          ].map((item) => (
            <button
              key={item.base}
              onClick={() => {
                if (results) {
                  if (item.base === 10) setInputValue(results.decimal);
                  if (item.base === 2) setInputValue(results.binary);
                  if (item.base === 16) setInputValue(results.hex);
                  if (item.base === 8) setInputValue(results.octal);
                }
                setActiveBase(item.base as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeBase === item.base
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${activeBase === 2 ? 'binary (0,1)' : activeBase === 16 ? 'hex (0-9, A-F)' : 'number'}...`}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Results grid */}
        {results ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'dec', label: 'Decimal (Base 10)', val: results.decimal },
              { key: 'bin', label: 'Binary (Base 2)', val: results.binary },
              { key: 'hex', label: 'Hexadecimal (Base 16)', val: results.hex },
              { key: 'oct', label: 'Octal (Base 8)', val: results.octal },
            ].map((item) => (
              <div
                key={item.key}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.label}
                  </span>
                  <button
                    onClick={() => copyVal(item.val, item.key)}
                    className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                    title="Copy"
                  >
                    {copiedKey === item.key ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white break-all select-all">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid characters for selected base {activeBase}.</span>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="number-base-converter"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
