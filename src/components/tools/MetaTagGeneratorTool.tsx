import React, { useState, useMemo } from 'react';
import {
  Globe,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const MetaTagGeneratorTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('meta-tag-generator') || {
    slug: 'meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    description: 'Generate Google, Open Graph (Facebook), and Twitter Card meta tags with live social preview.',
    category: 'seo-web-tools',
    categoryName: 'SEO & Web Tools',
    seoTitle: 'SEO Meta Tag Generator Online - Open Graph & Twitter Cards',
    seoDescription: 'Generate comprehensive HTML meta tags for Google SEO, Open Graph, and Twitter Cards with real-time social card preview.',
    faqs: [],
  };

  const [siteTitle, setSiteTitle] = useState('Sahlino - Make It Easy');
  const [description, setDescription] = useState('Free all-in-one privacy-first online tools for creators and developers.');
  const [url, setUrl] = useState('https://sahlino.com');
  const [image, setImage] = useState('https://sahlino.com/og-image.png');
  const [twitterUser, setTwitterUser] = useState('@sahlino');
  const [copied, setCopied] = useState(false);

  const generatedCode = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${siteTitle}</title>
<meta name="title" content="${siteTitle}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${siteTitle}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${siteTitle}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">
<meta property="twitter:creator" content="${twitterUser}">`;
  }, [siteTitle, description, url, image, twitterUser]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/meta-tag-generator"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('seo-web-tools', 'SEO & Web Tools'),
            onClick: () => onNavigate('/categories/seo-web-tools'),
          },
          { label: getToolName('meta-tag-generator', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('meta-tag-generator', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('meta-tag-generator', toolData.description)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Input Form */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Website Title ({siteTitle.length}/60 chars)
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Page Description ({description.length}/160 chars)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Canonical URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              OG Image URL (1200x630 px)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Twitter Creator Handle
            </label>
            <input
              type="text"
              value={twitterUser}
              onChange={(e) => setTwitterUser(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Live Preview & Code Output */}
        <div className="lg:col-span-6 space-y-6">
          {/* Social Card Preview */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Social Card Preview
            </span>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
              <div className="h-36 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                {image ? (
                  <img src={image} alt="OG preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  '1200 x 630 Preview Image'
                )}
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block truncate">
                  {url.replace(/^https?:\/\//, '')}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {siteTitle || 'Website Title'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {description || 'Website description will be rendered here for social sharing.'}
                </p>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                HTML &lt;head&gt; Code
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={generatedCode}
              rows={7}
              className="w-full p-3 font-mono text-xs rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 focus:outline-none resize-none select-all"
            />
          </div>
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="meta-tag-generator"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
