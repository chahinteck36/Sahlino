import React, { useState } from 'react';
import {
  Hash,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const UuidGeneratorTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('uuid-generator') || {
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    description: 'Generate cryptographically random UUID v4 and GUID identifiers in bulk with custom casing and hyphens.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    seoTitle: 'UUID Generator Online - Free v4 UUID & GUID Bulk Generator',
    seoDescription: 'Generate secure Version-4 UUIDs online for free. Support for uppercase, lowercase, hyphens, and bulk export.',
    faqs: [],
  };

  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate crypto v4 UUID
  const generateSingleUuid = (withHyphens: boolean, isUpper: boolean) => {
    let u: string;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      u = crypto.randomUUID();
    } else {
      // Standard RFC 4122 v4 fallback
      u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!withHyphens) {
      u = u.replace(/-/g, '');
    }
    return isUpper ? u.toUpperCase() : u.toLowerCase();
  };

  const handleGenerate = () => {
    const list: string[] = [];
    const count = Math.min(Math.max(1, quantity), 100);
    for (let i = 0; i < count; i++) {
      list.push(generateSingleUuid(hyphens, uppercase));
    }
    setUuids(list);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [quantity, uppercase, hyphens]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySingle = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const downloadTxt = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${uuids.length}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/uuid-generator"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('developer-tools', 'Developer Tools'),
            onClick: () => onNavigate('/categories/developer-tools'),
          },
          { label: getToolName('uuid-generator', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('uuid-generator', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('uuid-generator', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-6">
        {/* Settings Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                {t('uuidGen.quantity', 'Quantity (1-100)')}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-24 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span>{t('uuidGen.uppercase', 'Uppercase')}</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span>{t('uuidGen.includeHyphens', 'Include Hyphens')}</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('uuidGen.regenerate', 'Regenerate')}</span>
            </button>
            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? t('uuidGen.copiedAll', 'Copied All') : t('uuidGen.copyAll', 'Copy All')}</span>
            </button>
            <button
              onClick={downloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all"
              title={t('uuidGen.download', 'Download .txt')}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-2">
          {uuids.map((u, idx) => {
            const isCopied = copiedIndex === idx;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-6 text-right">
                    {idx + 1}.
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 select-all">
                    {u}
                  </span>
                </div>
                <button
                  onClick={() => copySingle(u, idx)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  title="Copy UUID"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="uuid-generator"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
