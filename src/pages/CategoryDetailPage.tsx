import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { CATEGORIES, getToolsByCategory } from '../data/tools';
import { ToolCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CategoryDetailPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categorySlug,
  onNavigate,
}) => {
  const { t, getCategoryName, getCategoryDesc, getToolName, getToolDesc } = useLanguage();
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('category.notFound', 'Category Not Found')}</h1>
        <button
          onClick={() => onNavigate('/categories')}
          className="text-indigo-600 hover:underline font-bold"
        >
          {t('category.return', 'Return to All Categories')}
        </button>
      </div>
    );
  }

  const tools = getToolsByCategory(category.id);
  const localizedCategoryName = getCategoryName(category.slug, category.name);
  const localizedCategoryDesc = getCategoryDesc(category.slug, category.description);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`${localizedCategoryName} - Sahlino`}
        description={localizedCategoryDesc}
        canonicalPath={`/categories/${category.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: t('nav.categories', 'Categories'), onClick: () => onNavigate('/categories') },
          { label: localizedCategoryName },
        ]}
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40">
            <DynamicIcon name={category.iconName} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {localizedCategoryName}
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl">
          {localizedCategoryDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const isAvailable = tool.status === 'available';
          return (
            <div
              key={tool.id}
              onClick={() => {
                if (isAvailable) onNavigate(`/${tool.slug}`);
              }}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isAvailable
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg cursor-pointer group'
                  : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                    <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                  </div>
                  {tool.popular && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
                      {t('badge.popular', 'Popular')}
                    </span>
                  )}
                  {!isAvailable && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {t('badge.comingSoon', 'Coming Soon')}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 tracking-tight">
                  {getToolName(tool.slug, tool.name)}
                </h3>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {getToolDesc(tool.slug, tool.description)}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-black text-indigo-600 dark:text-indigo-400">
                <span>{isAvailable ? t('btn.openTool', 'Open Tool') : t('badge.comingSoon', 'Coming Soon')}</span>
                {isAvailable && <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform rtl:rotate-180" />}
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder slotId="ad-slot-category-detail-bottom" />
    </div>
  );
};
