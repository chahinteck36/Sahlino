import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowRightLeft, Copy, Check, Download } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { triggerDownload } from '../../utils/numberUtils';

interface TextReplaceToolProps {
  onNavigate: (path: string) => void;
}

export const TextReplaceTool: React.FC<TextReplaceToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const sampleAr =
    'ساهلينو هو موقع يقدم أدوات ويب مجانية. يتميز ساهلينو بالسرعة والخصوصية الفائقة لأن ساهلينو يعمل داخل المتصفح مباشرة.';
  const sampleEn =
    'The quick brown fox jumps over the lazy dog. The fox is fast and the fox is smart.';

  const [text, setText] = useState<string>(isAr ? sampleAr : sampleEn);
  const [findStr, setFindStr] = useState<string>(isAr ? 'ساهلينو' : 'fox');
  const [replaceStr, setReplaceStr] = useState<string>(isAr ? 'Sahlino' : 'cat');
  const [matchCase, setMatchCase] = useState<boolean>(false);
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (text === sampleAr && !isAr) {
      setText(sampleEn);
      setFindStr('fox');
      setReplaceStr('cat');
    } else if (text === sampleEn && isAr) {
      setText(sampleAr);
      setFindStr('ساهلينو');
      setReplaceStr('Sahlino');
    }
  }, [isAr]);

  const { resultText, matchCount } = useMemo(() => {
    if (!findStr) return { resultText: text, matchCount: 0 };

    try {
      let flags = 'g';
      if (!matchCase) flags += 'i';

      let pattern: RegExp;
      if (useRegex) {
        pattern = new RegExp(findStr, flags);
      } else {
        const escaped = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = new RegExp(escaped, flags);
      }

      const matches = text.match(pattern);
      const count = matches ? matches.length : 0;
      const res = text.replace(pattern, replaceStr);

      return { resultText: res, matchCount: count };
    } catch {
      return { resultText: text, matchCount: 0 };
    }
  }, [text, findStr, replaceStr, matchCase, useRegex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'replaced_text.txt');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="text-replace"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات النصوص' : 'Text Tools', item: 'https://www.sahlino.tech/categories/text-tools' },
          { name: isAr ? 'بحث واستبدال' : 'Find & Replace', item: 'https://www.sahlino.tech/text-replace' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات النصوص والمحتوى' : 'Text Tools', href: '/categories/text-tools' },
            { label: isAr ? 'البحث والاستبدال في النصوص' : 'Find & Replace' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Search className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'البحث والاستبدال السريع في النصوص' : 'Find & Replace Text Online'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'استبدل الكلمات والعبارات أو استخدم التعابير النمطية (RegEx) مع عداد المطابقات اللحظي'
              : 'Batch replace words, phrases, or Regular Expressions with live match counter'}
          </p>
        </div>

        {/* Inputs Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isAr ? 'ابحث عن' : 'Find text'}
            </label>
            <input
              type="text"
              value={findStr}
              onChange={(e) => setFindStr(e.target.value)}
              placeholder="e.g. fox"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isAr ? 'استبدال بـ' : 'Replace with'}
            </label>
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder="e.g. cat"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            />
          </div>
        </div>

        {/* Options & Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 mb-6 text-xs">
          <div className="flex items-center gap-4 font-bold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span>{isAr ? 'مطابقة حالة الأحرف (Case Sensitive)' : 'Match Case'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span>{isAr ? 'استخدام RegEx' : 'Use RegEx'}</span>
            </label>
          </div>

          <div className="font-bold text-emerald-600 dark:text-emerald-400">
            {isAr ? `عدد المطابقات: ${matchCount}` : `Matches found: ${matchCount}`}
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {isAr ? 'النص الأصلي' : 'Original Text'}
            </label>
            <textarea
              rows={9}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? 'النتيجة بعد الاستبدال' : 'Replaced Output'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>
                <button
                  type="button"
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
              rows={9}
              value={resultText}
              className="w-full p-3 bg-emerald-50/20 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="text-replace" onNavigate={onNavigate} />
    </div>
  );
};
