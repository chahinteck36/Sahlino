import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getRelatedTools } from '../../data/tools';
import { DynamicIcon } from './DynamicIcon';
import { useLanguage } from '../../context/LanguageContext';

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
  categoryName: string;
  onNavigate: (path: string) => void;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  currentSlug,
  category,
  categoryName,
  onNavigate,
}) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const related = getRelatedTools(currentSlug, category, 3);

  if (related.length === 0) return null;

  const localizedCatName = getCategoryName(category, categoryName);

  return (
    <section className="my-12 pt-8 border-t border-slate-200 dark:border-slate-800" aria-label="Related Tools">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('tools.relatedTools', 'Related Tools')}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {t('tools.moreIn', 'More browser-based tools in')}{' '}
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{localizedCatName}</span>
          </p>
        </div>
        <button
          onClick={() => onNavigate(`/categories/${category}`)}
          className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{localizedCatName}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onNavigate(`/${tool.slug}`)}
            className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-indigo-400 dark:hover:border-indigo-600/70 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40">
                  <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                </div>
                {tool.popular && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-900/60">
                    <Sparkles className="w-2.5 h-2.5" /> {t('badge.popular', 'Popular')}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {getToolName(tool.slug, tool.name)}
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {getToolDesc(tool.slug, tool.description)}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-black text-indigo-600 dark:text-indigo-400">
              <span>{t('btn.useTool', 'Use Tool')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
