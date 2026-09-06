import React, { useState, useMemo } from 'react';
import {
  FileText,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Clock,
  Mic,
  AlignLeft,
  Hash,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const WordCounterTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('word-counter') || {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, sentences, paragraphs, reading and speaking times instantly with keyword density.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    seoTitle: 'Word Counter & Character Counter Online - Free Text Analyzer',
    seoDescription: 'Count words, characters, spaces, sentences, paragraphs, and reading time in real time with 100% in-browser privacy.',
    faqs: [],
  };

  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Compute metrics
  const stats = useMemo(() => {
    const raw = text;
    const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
    const charsWithSpaces = raw.length;
    const charsWithoutSpaces = raw.replace(/\s/g, '').length;
    const sentences = raw.trim() ? (raw.match(/[.!?]+(\s|$)/g) || []).length || 1 : 0;
    const paragraphs = raw.trim() ? raw.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

    // Reading speed ~ 200 words per minute, speaking speed ~ 130 words per minute
    const readingTimeMinutes = Math.ceil(words / 200);
    const speakingTimeMinutes = Math.ceil(words / 130);

    // Keyword density
    const cleanWords = raw
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const freqMap: Record<string, number> = {};
    for (const w of cleanWords) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }

    const sortedKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / (cleanWords.length || 1)) * 100).toFixed(1),
      }));

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences: raw.trim() ? sentences : 0,
      paragraphs,
      readingTime: words === 0 ? 0 : readingTimeMinutes,
      speakingTime: words === 0 ? 0 : speakingTimeMinutes,
      keywords: sortedKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/word-counter"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('text-tools', 'Text Tools'),
            onClick: () => onNavigate('/categories/text-tools'),
          },
          { label: getToolName('word-counter', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('word-counter', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('word-counter', toolData.description)}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.words', 'Words')}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {stats.charsWithSpaces.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.characters', 'Characters')}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {stats.charsWithoutSpaces.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.noSpaces', 'No Spaces')}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {stats.sentences.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.sentences', 'Sentences')}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {stats.paragraphs.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.paragraphs', 'Paragraphs')}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.readingTime} <span className="text-sm font-bold">min</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            {t('wordCounter.readingTime', 'Read Time')}
          </div>
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('wordCounter.sourceLabel', 'Enter or Paste Text')}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('wordCounter.copied', 'Copied') : t('wordCounter.copy', 'Copy')}</span>
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 disabled:opacity-40 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('wordCounter.clear', 'Clear')}</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('wordCounter.placeholder', 'Start typing or paste your text here (articles, essays, emails, social posts)...')}
          rows={10}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white text-base leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
        />

        {/* Keyword Density list */}
        {stats.keywords.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              {t('wordCounter.keywordDensity', 'Top Keyword Density')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {stats.keywords.map((kw) => (
                <div
                  key={kw.word}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium"
                >
                  <span className="font-bold">{kw.word}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                    {kw.count}x ({kw.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="word-counter"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
