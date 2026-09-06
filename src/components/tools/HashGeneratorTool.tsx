import React, { useState, useEffect } from 'react';
import {
  Hash,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const HashGeneratorTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('hash-generator') || {
    slug: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    description: 'Generate SHA-256, SHA-512, SHA-384, and SHA-1 cryptographic hashes securely in your browser.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    seoTitle: 'Hash Generator Online - Free SHA-256, SHA-512 & SHA-1 Hasher',
    seoDescription: 'Generate secure cryptographic checksums and hashes online for free with 100% in-browser Web Crypto API.',
    faqs: [],
  };

  const [input, setInput] = useState<string>('Sahlino - Make It Easy');
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computeHashes = async () => {
    if (!input) {
      setHashes({});
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    const results: Record<string, string> = {};

    for (const algo of algos) {
      try {
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        let hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        if (uppercase) hashHex = hashHex.toUpperCase();
        results[algo] = hashHex;
      } catch (err) {
        console.error(err);
      }
    }

    setHashes(results);
  };

  useEffect(() => {
    computeHashes();
  }, [input, uppercase]);

  const copyHash = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/hash-generator"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('developer-tools', 'Developer Tools'),
            onClick: () => onNavigate('/categories/developer-tools'),
          },
          { label: getToolName('hash-generator', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('hash-generator', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('hash-generator', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Plain Text Input
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <span>{t('hashGen.uppercase', 'Uppercase Hex')}</span>
          </label>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('hashGen.placeholder', 'Enter text or string to hash...')}
          rows={3}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-6"
        />

        <div className="space-y-3">
          {['SHA-256', 'SHA-512', 'SHA-384', 'SHA-1'].map((algo) => {
            const h = hashes[algo] || '';
            const isCopied = copiedKey === algo;
            return (
              <div
                key={algo}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {algo}
                  </span>
                  <button
                    onClick={() => copyHash(h, algo)}
                    disabled={!h}
                    className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 cursor-pointer"
                    title={t('hashGen.copy', 'Copy Hash')}
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                  {h || <span className="text-slate-400 italic">{t('hashGen.noInput', 'No input')}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="hash-generator"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
