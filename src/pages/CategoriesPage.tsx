import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { CATEGORIES, TOOLS } from '../data/tools';
import { useLanguage } from '../context/LanguageContext';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const { t, getCategoryName, getCategoryDesc, getToolName } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`${t('home.categoriesTitle', 'Browse by Category')} - Sahlino`}
        description={t('home.categoriesSubtitle', 'Find the exact utility you need organized across functional categories.')}
        canonicalPath="/categories"
      />

      <Breadcrumbs items={[{ label: t('nav.categories', 'Categories') }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          {t('home.categoriesTitle', 'Browse by Category')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl">
          {t('home.categoriesSubtitle', 'Find the exact utility you need organized across functional categories.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const categoryTools = TOOLS.filter((item) => item.category === cat.id);

          return (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categories/${cat.slug}`)}
              className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-400 dark:hover:border-indigo-600/60 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={cat.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {categoryTools.length} {t('tools.count', 'Tools')}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 tracking-tight">
                  {getCategoryName(cat.slug, cat.name)}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {getCategoryDesc(cat.slug, cat.description)}
                </p>

                {/* Micro preview of tools in category */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {categoryTools.slice(0, 3).map((tool) => (
                    <div
                      key={tool.id}
                      className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 truncate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span className="truncate">{getToolName(tool.slug, tool.name)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-black text-indigo-600 dark:text-indigo-400">
                <span>{getCategoryName(cat.slug, cat.name)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform rtl:rotate-180" />
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder slotId="ad-slot-categories-bottom" />
    </div>
  );
};
