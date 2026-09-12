import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Wrench, Sparkles, Filter } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { ARTICLES, ARTICLE_CATEGORIES, getArticlesByCategory } from '../data/articles';
import { getToolBySlug } from '../data/tools';

interface KnowledgeHubPageProps {
  onNavigate: (path: string) => void;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({ onNavigate }) => {
  const { language, isRTL } = useLanguage();
  const isRtl = isRTL;
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    let list = getArticlesByCategory(selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((a) => {
        return (
          (a.title || '').toLowerCase().includes(q) ||
          (a.titleAr || '').includes(q) ||
          (a.description || '').toLowerCase().includes(q) ||
          (a.descriptionAr || '').includes(q)
        );
      });
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const featuredArticle = ARTICLES[0];

  const canonicalUrl = 'https://www.sahlino.tech/knowledge';
  const seoTitle = isAr
    ? 'مركز المعرفة — شروحات وأدلة مجانية لاستخدام الأدوات | Sahlino'
    : 'Knowledge Center — Free Guides, Tutorials & Tool Explanations | Sahlino';
  const seoDescription = isAr
    ? 'اكتشف شروحات وأدلة عملية لاستخدام أدوات PDF، تحويل الصور، حساب النسب المئوية، تنظيف النصوص، وأدوات المطورين مجاناً في ساهلينو.'
    : 'Explore in-depth guides, practical tutorials, and everyday math and file conversion tips from Sahlino Knowledge Center.';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'مركز المعرفة' : 'Knowledge Center', item: canonicalUrl },
        ]}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'مركز المعرفة' : 'Knowledge Center' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-10 lg:p-14 mb-10 shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4 text-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'مركز المعرفة والأدلة التفاعلية' : 'Knowledge Center & Tool Guides'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              {isAr ? 'دليلك لإنجاز المهام الرقمية بذكاء وسرعة' : 'Master Everyday Digital Tasks with Step-by-Step Guides'}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
              {isAr
                ? 'مقالات عملية وشروحات مبسطة تشرح لك كيفية التعامل مع ملفات PDF، الصور، الحسابات المالية، وأدوات الويب مع روابط مباشرة لتجربة الأدوات فوراً مجاناً.'
                : 'Clear, practical tutorials explaining how to process PDF files, compress images, calculate percentages, clean text, and debug code with direct in-browser tools.'}
            </p>

            {/* Search Box inside Hero */}
            <div className="relative max-w-xl">
              <Search className={`absolute top-3.5 w-5 h-5 text-slate-400 ${isRtl ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث في الشروحات والمقالات (مثل: تحويل PDF، ضغط الصور، حساب النسبة)...'
                    : 'Search guides and tutorials (e.g. Convert PDF, Compress Image, BMI)...'
                }
                className={`w-full py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-emerald-400 text-sm placeholder:text-slate-400 ${
                  isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-3.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer ${
                    isRtl ? 'left-4' : 'right-4'
                  }`}
                >
                  {isAr ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Article Banner */}
        {!searchQuery && selectedCategory === 'all' && featuredArticle && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'مقال مقترح ومميز' : 'Featured Guide'}</span>
            </div>

            <div
              onClick={() => onNavigate(`/knowledge/${featuredArticle.slug}`)}
              className="group p-6 sm:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-r from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer shadow-sm hover:shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-semibold">
                    {isAr ? featuredArticle.categoryNameAr : featuredArticle.categoryName}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isAr ? featuredArticle.readTimeAr : featuredArticle.readTime}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredArticle.publishedDate}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-3">
                  {isAr ? featuredArticle.titleAr : featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {isAr ? featuredArticle.descriptionAr : featuredArticle.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-all group-hover:gap-3">
                  <span>{isAr ? 'اقرأ الشرح الكامل' : 'Read Full Guide'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold px-2">
            <Filter className="w-3.5 h-3.5" />
            <span>{isAr ? 'التصنيف:' : 'Category:'}</span>
          </div>

          {ARTICLE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? cat.nameAr : cat.name}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'لا توجد مقالات مطابقة لبحثك' : 'No articles found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
              {isAr ? 'جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر.' : 'Try adjusting your search terms or filter category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              {isAr ? 'إعادة التعيين' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const title = isAr ? article.titleAr : article.title;
              const description = isAr ? article.descriptionAr : article.description;
              const readTime = isAr ? article.readTimeAr : article.readTime;
              const categoryName = isAr ? article.categoryNameAr : article.categoryName;
              const relatedTool = article.relatedToolSlug ? getToolBySlug(article.relatedToolSlug) : null;

              return (
                <article
                  key={article.id}
                  onClick={() => onNavigate(`/knowledge/${article.slug}`)}
                  className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Meta Top */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {categoryName}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2 leading-snug">
                      {title}
                    </h3>

                    {/* Snippet */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {description}
                    </p>
                  </div>

                  <div>
                    {/* Related Tool Badge */}
                    {relatedTool && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(`/${relatedTool.slug}`);
                        }}
                        className="mb-4 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 font-medium truncate">
                          <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">{isAr ? `الأداة المرتبطة: ${relatedTool.name}` : `Related Tool: ${relatedTool.name}`}</span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 underline shrink-0">
                          {isAr ? 'جرّب الآن' : 'Try Now'}
                        </span>
                      </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span>{isAr ? 'قراءة الشرح الكامل' : 'Read Full Guide'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
