import React, { useState, useEffect } from 'react';
import {
  Link,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ArrowRightLeft,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const UrlEncoderTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('url-encoder') || {
    slug: 'url-encoder',
    name: 'URL Encoder & Decoder',
    description: 'Encode special characters into percent-encoding for URLs and decode URL parameters back to readable text.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    seoTitle: 'URL Encoder & Decoder Online - Free URL Percent Encoding Tool',
    seoDescription: 'Safely encode and decode URL queries and URI components online. 100% free with local in-browser execution.',
    faqs: [],
  };

  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeAll, setEncodeAll] = useState<boolean>(false); // encodeURI vs encodeURIComponent
  const [input, setInput] = useState<string>('https://sahlino.com/search?query=online tools & free=true');
  const [output, setOutput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setErrorMsg(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeAll ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err: unknown) {
      setErrorMsg('Invalid URL sequence. Could not decode the input.');
      setOutput('');
    }
  }, [input, mode, encodeAll]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInput(output);
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/url-encoder"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('developer-tools', 'Developer Tools'),
            onClick: () => onNavigate('/categories/developer-tools'),
          },
          { label: getToolName('url-encoder', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('url-encoder', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('url-encoder', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('encode')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'encode'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('urlEncoder.encode', 'Encode URL')}
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'decode'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('urlEncoder.decode', 'Decode URL')}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {mode === 'encode' && (
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={encodeAll}
                  onChange={(e) => setEncodeAll(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span>{t('urlEncoder.encodeAll', 'Encode All Characters (encodeURIComponent)')}</span>
              </label>
            )}

            {output && (
              <button
                onClick={handleSwap}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{t('urlEncoder.swap', 'Swap')}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mode === 'encode' ? t('urlEncoder.rawInput', 'Raw URL / String Input') : t('urlEncoder.encodedInput', 'Percent-Encoded URL Input')}
              </label>
              <button
                onClick={() => setInput('')}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                {t('urlEncoder.clear', 'Clear')}
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste URL or string here..."
              rows={6}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mode === 'encode' ? t('urlEncoder.encodedOutput', 'Encoded Output') : t('urlEncoder.decodedOutput', 'Decoded Output')}
              </label>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('urlEncoder.copied', 'Copied!') : t('urlEncoder.copy', 'Copy')}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              rows={6}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:outline-none resize-y"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="url-encoder"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
