import React, { useState } from 'react';
import {
  Type,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const CaseConverterTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('case-converter') || {
    slug: 'case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and Sentence case.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    seoTitle: 'Text Case Converter Online - Free Title Case & Capitalizer',
    seoDescription: 'Easily convert text casing to uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case for free.',
    faqs: [],
  };

  const [input, setInput] = useState<string>('Make it easy with Sahlino online tools for developers and creators!');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Conversion helpers
  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());
  };

  const toPascalCase = (str: string) => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const toConstantCase = (str: string) => {
    return toSnakeCase(str).toUpperCase();
  };

  const cases = [
    { key: 'sentence', label: t('caseConverter.sentence', 'Sentence case'), value: toSentenceCase(input) },
    { key: 'lower', label: t('caseConverter.lower', 'lowercase'), value: input.toLowerCase() },
    { key: 'upper', label: t('caseConverter.upper', 'UPPERCASE'), value: input.toUpperCase() },
    { key: 'title', label: t('caseConverter.title', 'Title Case'), value: toTitleCase(input) },
    { key: 'camel', label: t('caseConverter.camel', 'camelCase'), value: toCamelCase(input) },
    { key: 'pascal', label: t('caseConverter.pascal', 'PascalCase'), value: toPascalCase(input) },
    { key: 'snake', label: t('caseConverter.snake', 'snake_case'), value: toSnakeCase(input) },
    { key: 'kebab', label: t('caseConverter.kebab', 'kebab-case'), value: toKebabCase(input) },
    { key: 'constant', label: t('caseConverter.constant', 'CONSTANT_CASE'), value: toConstantCase(input) },
  ];

  const handleCopy = (textVal: string, key: string) => {
    navigator.clipboard.writeText(textVal);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/case-converter"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('text-tools', 'Text Tools'),
            onClick: () => onNavigate('/categories/text-tools'),
          },
          { label: getToolName('case-converter', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('case-converter', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('case-converter', toolData.description)}
        </p>
      </div>

      {/* Input Box */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('caseConverter.sourceLabel', 'Source Text')}
          </label>
          <button
            onClick={() => setInput('')}
            className="text-xs font-bold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('caseConverter.clear', 'Clear')}</span>
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('caseConverter.placeholder', 'Type or paste your text to convert...')}
          rows={4}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
        />
      </div>

      {/* Conversion Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) => {
          const isCopied = copiedKey === c.key;
          return (
            <div
              key={c.key}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {c.label}
                  </span>
                  <button
                    onClick={() => handleCopy(c.value, c.key)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? t('caseConverter.copied', 'Copied') : t('caseConverter.copy', 'Copy')}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 break-all select-all font-mono">
                  {c.value || <span className="text-slate-400 italic">{t('caseConverter.noText', 'No text')}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="case-converter"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
