import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Globe2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQSection } from '../components/common/FAQSection';
import { CATEGORIES, TOOLS, searchTools } from '../data/tools';
import { ToolItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearchModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearchModal }) => {
  const { t, getToolName, getToolDesc, getCategoryName, getCategoryDesc } = useLanguage();
  const [inlineSearch, setInlineSearch] = useState('');

  const popularTools = TOOLS.filter((t) => t.popular);

  const searchResults = inlineSearch.trim() ? searchTools(inlineSearch) : null;

  const homeFaqs = [
    {
      question: t('home.faq1Q', 'Is Sahlino completely free to use?'),
      answer: t('home.faq1A', 'Yes! All tools on Sahlino are 100% free with no account registration, subscriptions, or hidden paywalls required.'),
    },
    {
      question: t('home.faq2Q', 'How does Sahlino protect my data privacy?'),
      answer: t('home.faq2A', 'All our tools run purely on the client side using your web browser’s native computing power. When you format JSON, resize images, or calculate time zones, your inputs and images never touch a backend server or database.'),
    },
    {
      question: t('home.faq3Q', 'Do I need to install any software or extensions?'),
      answer: t('home.faq3A', 'No. Sahlino works directly inside any modern web browser across desktop, laptop, tablet, and mobile devices.'),
    },
    {
      question: t('home.faq4Q', 'Can I use Sahlino offline?'),
      answer: t('home.faq4A', 'Because the core computation logic runs directly in your browser, once a tool page is loaded in your browser cache, most computations can continue running without a continuous internet connection.'),
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      <SEOHead
        title={`Sahlino — ${t('brand.tagline', 'Make It Easy.')}`}
        description={t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
        canonicalPath="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Sahlino',
          url: 'https://toolora.app/',
          description: 'Sahlino — Make It Easy. Fast, free online tools.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://toolora.app/tools?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-black uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('badge.clientPrivacy', 'Zero Server Uploads • 100% Client-Side Speed')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.06] mb-5">
          {t('hero.title', 'Simple tools. Instant results.')}
        </h1>

        <p className="text-base sm:text-xl font-medium text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
        </p>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-4">
          <div className="relative flex items-center shadow-xl rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 text-slate-400 ms-5 shrink-0" />
            <input
              type="text"
              id="hero-search-input"
              value={inlineSearch}
              onChange={(e) => setInlineSearch(e.target.value)}
              placeholder={t('hero.searchPlaceholder', 'Search for a tool... (e.g. json, image, time, percentage)')}
              className="w-full px-3 py-4 sm:py-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden text-sm sm:text-base font-medium"
            />
            {inlineSearch && (
              <button
                onClick={() => setInlineSearch('')}
                className="me-3 p-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {t('btn.clear', 'Clear')}
              </button>
            )}
            <button
              onClick={() => {
                if (inlineSearch.trim()) {
                  onNavigate('/tools');
                } else {
                  onOpenSearchModal();
                }
              }}
              className="me-2.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-colors cursor-pointer shrink-0 hidden sm:block"
            >
              {t('btn.search', 'Search')}
            </button>
          </div>

          {/* Instant dropdown results when typing */}
          {searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-30 text-start">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-4 py-2">
                {t('search.matchingTools', 'Matching Tools')} ({searchResults.length})
              </div>
              {searchResults.length === 0 ? (
                <div className="py-6 text-center text-xs font-medium text-slate-400">
                  {t('tools.noResults', 'No matching tools found')}
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.slice(0, 5).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onNavigate(`/${tool.slug}`)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-start transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40 shrink-0">
                          <DynamicIcon name={tool.iconName} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            {getToolName(tool.slug, tool.name)}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {getToolDesc(tool.slug, tool.description)}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Search Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
            {t('search.popularTools', 'Popular Tools')}:
          </span>
          {popularTools.slice(0, 5).map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(`/${tool.slug}`)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer"
            >
              {getToolName(tool.slug, tool.name)}
            </button>
          ))}
        </div>
      </section>

      {/* Ad slot between hero and popular tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="ad-slot-home-hero" />
      </div>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('home.popularTitle', 'Popular Free Online Tools')}
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              {t('home.popularSubtitle', 'The most utilized utilities, built for instant in-browser performance.')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('btn.viewAllTools', 'View all tools')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(`/${tool.slug}`)}
              className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-400 dark:hover:border-indigo-500/70 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 shadow-xs group-hover:scale-105 transition-transform">
                    <DynamicIcon name={tool.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
                    {getCategoryName(tool.category, tool.categoryName)}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 tracking-tight">
                  {getToolName(tool.slug, tool.name)}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {getToolDesc(tool.slug, tool.description)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-sm font-black text-indigo-600 dark:text-indigo-400">
                <span>{t('btn.openTool', 'Open Tool')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('home.categoriesTitle', 'Browse by Category')}
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              {t('home.categoriesSubtitle', 'Find the exact utility you need organized across functional categories.')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('btn.allCategories', 'All Categories')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/categories/${cat.slug}`)}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950 dark:group-hover:text-indigo-400 transition-colors">
                    <DynamicIcon name={cat.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                      {getCategoryName(cat.slug, cat.name)}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {count} {t('tools.count', 'Tools')}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 line-clamp-2">
                  {getCategoryDesc(cat.slug, cat.description)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Sahlino Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900/90 dark:to-slate-950 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-2">
              {t('home.whyTitle', 'Why Choose Sahlino?')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              {t('home.whySubtitle', 'Built for speed, privacy, and zero friction.')}
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
              <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
                {t('home.feature1Title', '100% In-Browser Privacy')}
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('home.feature1Desc', 'Your data and files never leave your computer. Processing happens locally in your browser memory with zero server uploads.')}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
              <Zap className="w-6 h-6 text-amber-500 mb-3" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
                {t('home.feature2Title', 'Instant Results')}
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('home.feature2Desc', 'Experience zero latency. No waiting for server queues or file uploads; results appear in milliseconds.')}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
              <Lock className="w-6 h-6 text-indigo-500 mb-3" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
                {t('home.feature3Title', 'Free Forever & No Sign-up')}
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('home.feature3Desc', 'Enjoy unrestricted access to all utilities without creating accounts, entering emails, or paying subscriptions.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad slot before FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="ad-slot-home-before-faq" />
      </div>

      {/* Homepage FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQSection
          title={t('home.faqsTitle', 'Frequently Asked Questions')}
          subtitle={t('brand.tagline', 'Simple tools. Instant results.')}
          faqs={homeFaqs}
        />
      </div>
    </div>
  );
};
