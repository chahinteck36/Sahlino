import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { CATEGORIES, TOOLS, searchTools } from '../data/tools';
import { ToolCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ToolsPageProps {
  onNavigate: (path: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const localizedName = (getToolName(tool.slug, tool.name) || '').toLowerCase();
    const localizedDesc = (getToolDesc(tool.slug, tool.description) || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesQuery =
      !query ||
      (tool.name || '').toLowerCase().includes(query) ||
      (tool.description || '').toLowerCase().includes(query) ||
      localizedName.includes(query) ||
      localizedDesc.includes(query) ||
      (tool.tags || []).some((tg) => (tg || '').toLowerCase().includes(query));

    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`${t('tools.allTitle', 'All Online Tools')} - Sahlino`}
        description={t('tools.allSubtitle', 'Browse our suite of fast, client-side tools designed for instant results with zero accounts and zero downloads.')}
        canonicalPath="/tools"
      />

      <Breadcrumbs items={[{ label: t('nav.tools', 'All Tools') }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          {t('tools.allTitle', 'All Online Tools')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl">
          {t('tools.allSubtitle', 'Browse our suite of fast, client-side tools designed for instant results with zero accounts and zero downloads.')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('btn.allCategories', 'All Categories')} ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((item) => item.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {getCategoryName(cat.slug, cat.name)} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('tools.filterPlaceholder', 'Filter tools...')}
            className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="font-bold text-base mb-1">{t('tools.noResults', 'No tools match your query')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isAvailable = tool.status === 'available';
            return (
              <div
                key={tool.id}
                onClick={() => {
                  if (isAvailable) onNavigate(`/${tool.slug}`);
                }}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isAvailable
                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg cursor-pointer group'
                    : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 opacity-75 cursor-default'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                      <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
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
      )}

      <AdPlaceholder slotId="ad-slot-tools-bottom" />
    </div>
  );
};
