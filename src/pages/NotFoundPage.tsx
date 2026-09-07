import React, { useState } from 'react';
import { Search, Home, Wrench, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenSearch }) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  const isAr = language === 'ar';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else if (onOpenSearch) {
      onOpenSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      {/* Crucial for SEO: 404 must set noindex, nofollow */}
      <SEOHead
        title={isAr ? '404 - الصفحة غير موجودة | ساهلينو' : '404 - Page Not Found | Sahlino'}
        description={
          isAr
            ? 'عذراً، الصفحة المطلوبة غير موجودة. استكشف أدوات ساهلينو المجانية أو عُد للصفحة الرئيسية.'
            : 'The requested page could not be found on Sahlino. Browse our free browser-based tools or return to the homepage.'
        }
        canonicalPath="/404"
        robots="noindex, nofollow"
      />

      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-black text-3xl mb-6 shadow-sm">
        404
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
        {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </h1>

      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
        {isAr
          ? 'الرابط الذي تحاول الوصول إليه غير متاح، أو ربما تم تغيير عنوانه. يمكنك البحث عن الأداة أو تصفح الأقسام أدناه.'
          : 'The page you are looking for might have been moved, removed, or the link may be incorrect.'}
      </p>

      {/* Quick In-Page Search */}
      <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن أداة (مثل: json, pdf, صور)...' : 'Search for a tool (e.g. json, pdf, image)...'}
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm rtl:pr-11 rtl:pl-24"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-2 rtl:right-auto rtl:left-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {t('btn.search', 'Search')}
          </button>
        </div>
      </form>

      {/* Primary Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onNavigate('/');
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>{t('nav.home', 'Back to Home')}</span>
        </a>

        <a
          href="/tools"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onNavigate('/tools');
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm"
        >
          <Wrench className="w-4 h-4" />
          <span>{t('nav.tools', 'All Tools')}</span>
        </a>

        <a
          href="/categories"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onNavigate('/categories');
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm"
        >
          <Layers className="w-4 h-4" />
          <span>{t('nav.categories', 'Categories')}</span>
        </a>
      </div>
    </div>
  );
};
