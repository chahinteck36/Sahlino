import React, { useState } from 'react';
import {
  Binary,
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

export const Base64Tool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('base64-encoder') || {
    slug: 'base64-encoder',
    name: 'Base64 Encoder & Decoder',
    description: 'Encode text or binary data into Base64 format and decode Base64 back to readable text with UTF-8 support.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    seoTitle: 'Base64 Encoder & Decoder Online - Free UTF-8 & URL Safe',
    seoDescription: 'Encode to Base64 and decode Base64 strings safely with full UTF-8 Unicode support and 100% in-browser privacy.',
    faqs: [],
  };

  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [input, setInput] = useState<string>('Hello Sahlino! Make It Easy.');
  const [output, setOutput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Unicode safe Base64 encoding/decoding
  const processBase64 = () => {
    setErrorMsg(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutput(b64);
      } else {
        // Decode
        let sanitized = input.trim();
        if (urlSafe || sanitized.includes('-') || sanitized.includes('_')) {
          sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/');
          while (sanitized.length % 4) {
            sanitized += '=';
          }
        }
        const binary = atob(sanitized);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        setOutput(decoder.decode(bytes));
      }
    } catch (err: unknown) {
      setErrorMsg(
        mode === 'decode'
          ? 'Invalid Base64 payload. Please ensure the input is valid Base64.'
          : 'Failed to encode input into Base64.'
      );
      setOutput('');
    }
  };

  React.useEffect(() => {
    processBase64();
  }, [input, mode, urlSafe]);

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
        canonicalPath="/base64-encoder"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('developer-tools', 'Developer Tools'),
            onClick: () => onNavigate('/categories/developer-tools'),
          },
          { label: getToolName('base64-encoder', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('base64-encoder', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('base64-encoder', toolData.description)}
        </p>
      </div>

      {/* Mode Switches */}
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
              {t('base64.encode', 'Encode to Base64')}
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'decode'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('base64.decode', 'Decode from Base64')}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span>{t('base64.urlSafe', 'URL-Safe Base64')}</span>
            </label>

            {output && (
              <button
                onClick={handleSwap}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{t('base64.swap', 'Swap')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mode === 'encode' ? t('base64.plainInput', 'Plain Text Input') : t('base64.encodedInput', 'Base64 Encoded Input')}
              </label>
              <button
                onClick={() => setInput('')}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                {t('base64.clear', 'Clear')}
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 here...'}
              rows={8}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
            />
          </div>

          {/* Output Panel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mode === 'encode' ? t('base64.encodedOutput', 'Base64 Encoded Output') : t('base64.decodedOutput', 'Decoded Plain Text Output')}
              </label>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('base64.copied', 'Copied!') : t('base64.copy', 'Copy')}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              rows={8}
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
        currentSlug="base64-encoder"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
