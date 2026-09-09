import React from 'react';
import { BookOpen, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getArticlesForTool, ARTICLES } from '../../data/articles';

interface RelatedArticlesSectionProps {
  toolSlug: string;
  onNavigate: (path: string) => void;
}

export const RelatedArticlesSection: React.FC<RelatedArticlesSectionProps> = ({
  toolSlug,
  onNavigate,
}) => {
  const { language, isRTL } = useLanguage();
  const isRtl = isRTL;
  const isAr = language === 'ar';

  let articles = getArticlesForTool(toolSlug);
  if (articles.length === 0) {
    // Show top 3 general guide articles if no direct match
    articles = ARTICLES.slice(0, 3);
  }

  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'مقالات وشروحات مفيدة' : 'Related Guides & Articles'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAr
                ? 'تعرف على أفضل الممارسات وطرق الاستخدام المتقدمة لهذه الأداة'
                : 'Discover tips, best practices, and deep dives for this tool'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/knowledge')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <span>{isAr ? 'كل المقالات' : 'All Articles'}</span>
          {isRtl ? <ChevronRight className="w-3.5 h-3.5 rotate-180" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => {
          const title = isAr ? article.titleAr : article.title;
          const description = isAr ? article.descriptionAr : article.description;
          const readTime = isAr ? article.readTimeAr : article.readTime;
          const categoryName = isAr ? article.categoryNameAr : article.categoryName;

          return (
            <div
              key={article.id}
              onClick={() => onNavigate(`/knowledge/${article.slug}`)}
              className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1.5">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{isAr ? 'اقرأ المقال' : 'Read Guide'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
