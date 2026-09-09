import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Wrench,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Share2,
  Check,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { getToolBySlug } from '../data/tools';
import { NotFoundPage } from './NotFoundPage';

interface ArticleDetailPageProps {
  slug?: string;
  articleSlug?: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  articleSlug,
  onNavigate,
  onOpenSearch,
}) => {
  const effectiveSlug = articleSlug || slug || '';
  const { language, isRTL } = useLanguage();
  const isRtl = isRTL;
  const isAr = language === 'ar';

  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const article = getArticleBySlug(effectiveSlug);

  if (!article) {
    return <NotFoundPage onNavigate={onNavigate} onOpenSearch={onOpenSearch} />;
  }

  const relatedTool = article.relatedToolSlug ? getToolBySlug(article.relatedToolSlug) : null;
  const relatedArticles = getRelatedArticles(article.slug, 3);

  const title = isAr ? article.titleAr : article.title;
  const description = isAr ? article.descriptionAr : article.description;
  const categoryName = isAr ? article.categoryNameAr : article.categoryName;
  const readTime = isAr ? article.readTimeAr : article.readTime;
  const faqs = isAr && article.faqsAr ? article.faqsAr : article.faqs || [];

  const canonicalUrl = `https://www.sahlino.tech/knowledge/${article.slug}`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: 'https://www.sahlino.tech/og-image.png',
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Sahlino Team',
      url: 'https://www.sahlino.tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sahlino',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sahlino.tech/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      <SEOHead
        title={`${title} | Sahlino`}
        description={description}
        canonicalUrl={canonicalUrl}
        customJsonLd={articleSchema}
        faqs={faqs}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'مركز المعرفة' : 'Knowledge Center', item: 'https://www.sahlino.tech/knowledge' },
          { name: title, item: canonicalUrl },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'مركز المعرفة' : 'Knowledge Center', href: '/knowledge' },
              { label: title },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        {/* Article Header Card */}
        <header className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold">
              {categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span>
              {isAr ? 'فريق تحرير ساهلينو التقني' : 'Published by Sahlino Editorial Team'}
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (isAr ? 'تم نسخ الرابط' : 'Link Copied') : (isAr ? 'مشاركة الرابط' : 'Share Link')}</span>
            </button>
          </div>
        </header>

        {/* Featured "Try this tool on Sahlino" Callout Banner */}
        {relatedTool && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? 'جرّب الأداة المباشرة الآن' : 'Interactive Sahlino Tool'}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {relatedTool.name}
                </h3>
                <p className="text-xs text-emerald-100 line-clamp-1 mt-0.5">
                  {relatedTool.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate(`/${relatedTool.slug}`)}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-extrabold shadow-md transition-all shrink-0 cursor-pointer inline-flex items-center gap-2 justify-center"
            >
              <span>{isAr ? 'فتح الأداة وتجربتها' : 'Open & Try Tool'}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Article Body Content */}
        <article className="space-y-8 mb-12">
          {article.sections.map((section, idx) => {
            const heading = isAr ? section.headingAr : section.heading;
            const body = isAr ? section.bodyAr : section.body;
            const bullets = isAr && section.bulletsAr ? section.bulletsAr : section.bullets;
            const tip = isAr && section.tipAr ? section.tipAr : section.tip;

            return (
              <section
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                  <span className="w-2 h-6 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                  <span>{heading}</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {body}
                </p>

                {bullets && bullets.length > 0 && (
                  <ul className="space-y-2.5 my-4 bg-slate-50 dark:bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {tip && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{tip}</p>
                  </div>
                )}
              </section>
            );
          })}
        </article>

        {/* FAQs Accordion */}
        {faqs.length > 0 && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isAr ? 'الأسئلة الشائعة والإجابات' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div key={fIdx} className="py-4">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 gap-4 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-6">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAr ? 'مقالات ذات صلة' : 'Related Guides'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/knowledge/${rel.slug}`)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block mb-1">
                      {isAr ? rel.categoryNameAr : rel.categoryName}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                      {isAr ? rel.titleAr : rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {isAr ? rel.descriptionAr : rel.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                    <span>{isAr ? 'اقرأ المزيد' : 'Read more'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
