import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Copy, Download, Trash2, ArrowUpDown, Check, Filter } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { triggerDownload } from '../../utils/numberUtils';

interface TextCleanerToolProps {
  onNavigate: (path: string) => void;
}

export const TextCleanerTool: React.FC<TextCleanerToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const sampleAr = 'تفاح\nموز\n   تفاح   \nبرتقال\n\nموز\nعنب\nبرتقال\nمانجو';
  const sampleEn = 'Apple\nBanana\n   Apple   \nOrange\n\nBanana\nGrape\nOrange\nMango';

  const [input, setInput] = useState<string>(isAr ? sampleAr : sampleEn);
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState<boolean>(true);
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('asc');
  const [stripHtml, setStripHtml] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (input === sampleAr && !isAr) {
      setInput(sampleEn);
    } else if (input === sampleEn && isAr) {
      setInput(sampleAr);
    }
  }, [isAr]);

  const { output, beforeLines, afterLines, removedCount } = useMemo(() => {
    let lines = input.split('\n');
    const totalBefore = lines.length;

    if (stripHtml) {
      lines = lines.map((l) => l.replace(/<[^>]*>?/gm, ''));
    }

    if (trimWhitespace) {
      lines = lines.map((l) => l.trim());
    }

    if (removeEmptyLines) {
      lines = lines.filter((l) => l.length > 0);
    }

    if (removeDuplicates) {
      lines = Array.from(new Set(lines));
    }

    if (sortOrder === 'asc') {
      lines.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'desc') {
      lines.sort((a, b) => b.localeCompare(a));
    }

    const res = lines.join('\n');
    const totalAfter = lines.length;

    return {
      output: res,
      beforeLines: totalBefore,
      afterLines: totalAfter,
      removedCount: Math.max(0, totalBefore - totalAfter),
    };
  }, [input, removeDuplicates, removeEmptyLines, trimWhitespace, sortOrder, stripHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'cleaned_text.txt');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="text-cleaner"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات النصوص' : 'Text Tools', item: 'https://www.sahlino.tech/categories/text-tools' },
          { name: isAr ? 'منظف النصوص' : 'Text Cleaner', item: 'https://www.sahlino.tech/text-cleaner' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات النصوص والمحتوى' : 'Text Tools', href: '/categories/text-tools' },
            { label: isAr ? 'منظف النصوص وإزالة التكرار' : 'Text Cleaner' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'منظف النصوص وحذف الأسطر المكررة' : 'Text Cleaner & Duplicate Remover'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'احذف التكرارات، ونظف الفراغات الزائدة، ورتب الأسطر أبجدياً بنقرة واحدة فائقة السرعة'
              : 'Remove duplicate lines, strip unwanted spaces, and sort text alphabetically in seconds'}
          </p>
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mb-6 text-xs font-bold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>{isAr ? 'حذف الأسطر المكررة' : 'Remove Duplicate Lines'}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>{isAr ? 'حذف الأسطر الفارغة' : 'Remove Empty Lines'}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>{isAr ? 'إزالة الفراغات الجانبية' : 'Trim Leading/Trailing Spaces'}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={(e) => setStripHtml(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>{isAr ? 'إزالة وسوم HTML' : 'Strip HTML Tags'}</span>
          </label>

          <div className="flex items-center gap-1 ml-auto">
            <span>{isAr ? 'الترتيب:' : 'Sort:'}</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            >
              <option value="none">{isAr ? 'بدون ترتيب' : 'No Sort'}</option>
              <option value="asc">{isAr ? 'أبجدي أ-ي (A-Z)' : 'A-Z'}</option>
              <option value="desc">{isAr ? 'عكسي ي-أ (Z-A)' : 'Z-A'}</option>
            </select>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-500 block mb-0.5">{isAr ? 'الأسطر قبل' : 'Original Lines'}</span>
            <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{beforeLines}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-emerald-700 dark:text-emerald-300 block mb-0.5">{isAr ? 'الأسطر بعد' : 'Cleaned Lines'}</span>
            <span className="text-lg font-black text-emerald-900 dark:text-emerald-100 font-mono">{afterLines}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-amber-700 dark:text-amber-300 block mb-0.5">{isAr ? 'الأسطر المحذوفة' : 'Lines Removed'}</span>
            <span className="text-lg font-black text-amber-900 dark:text-amber-100 font-mono">{removedCount}</span>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {isAr ? 'النص الأصلي (المدخلات)' : 'Original Text'}
            </label>
            <textarea
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? 'النص المنظف (النتيجة)' : 'Cleaned Output'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="text-xs text-slate-500 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تحميل' : 'Download'}</span>
                </button>
              </div>
            </div>
            <textarea
              readOnly
              rows={10}
              value={output}
              className="w-full p-3.5 bg-emerald-50/20 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="text-cleaner" onNavigate={onNavigate} />
    </div>
  );
};
