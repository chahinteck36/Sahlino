import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  OFFICIAL_SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  generateToolStructuredData,
  generateBreadcrumbStructuredData,
} from '../../utils/seo';
import { TOOLS } from '../../data/tools';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  robots?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  toolSlug?: string;
  breadcrumbs?: { name?: string; label?: string; path?: string; item?: string; href?: string }[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  customJsonLd?: Record<string, unknown> | Record<string, unknown>[];
  faqs?: { question: string; answer: string }[];
}

const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'en_US',
  ar: 'ar_AR',
  fr: 'fr_FR',
  es: 'es_ES',
  de: 'de_DE',
};

function setOrCreateMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string, id?: string) {
  let selector = `link[rel="${rel}"]`;
  if (id) {
    selector = `#${id}`;
  }

  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (id) element.id = id;
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  robots = 'index, follow',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  toolSlug,
  breadcrumbs,
  structuredData,
  customJsonLd,
  faqs,
}) => {
  const { language, getToolName, getToolDesc, getCategoryName } = useLanguage();

  useEffect(() => {
    // 1. Identify tool if applicable
    const explicitTarget = canonicalUrl || canonicalPath || '';
    const inferredSlug =
      toolSlug ||
      TOOLS.find((t) => `/${t.slug}` === explicitTarget || t.slug === explicitTarget)?.slug;

    const toolItem = inferredSlug ? TOOLS.find((t) => t.slug === inferredSlug) : undefined;

    // 2. Resolve unified absolute canonical URL
    let effectiveTarget = explicitTarget;
    if (!effectiveTarget && toolItem) {
      effectiveTarget = `/${toolItem.slug}`;
    }
    const fullCanonical = getCanonicalUrl(effectiveTarget);

    // 3. Resolve title & description
    const resolvedTitle =
      title ||
      (toolItem ? `${getToolName(toolItem.slug, toolItem.name)}` : SITE_NAME);

    const resolvedDesc =
      description ||
      (toolItem ? getToolDesc(toolItem.slug, toolItem.seoDescription) : '');

    const cleanTitle =
      resolvedTitle.includes('Sahlino') || resolvedTitle.includes('ساهلينو')
        ? resolvedTitle
        : `${resolvedTitle} - ${SITE_NAME}`;
    document.title = cleanTitle;

    // 4. Document language & direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // 5. Standard Meta Tags
    setOrCreateMeta('meta[name="description"]', 'name', 'description', resolvedDesc);
    setOrCreateMeta('meta[name="robots"]', 'name', 'robots', robots);
    setOrCreateMeta('meta[name="googlebot"]', 'name', 'googlebot', robots);

    // 6. Open Graph Meta Tags
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', cleanTitle);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', resolvedDesc);
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    const currentLocale = SUPPORTED_LOCALES[language] || 'en_US';
    setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', currentLocale);

    // 7. Twitter Cards Meta Tags
    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', cleanTitle);
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', resolvedDesc);
    setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setOrCreateMeta('meta[name="twitter:site"]', 'name', 'twitter:site', '@sahlino');

    // 8. Canonical Link Tag (Strict single absolute URL)
    setOrCreateLink('canonical', fullCanonical, 'sahlino-canonical');

    // 9. Remove any fake hreflang tags to prevent Google Search Console indexing errors
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    // 10. Structured Data JSON-LD
    const scriptId = 'sahlino-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    let schemas: Record<string, unknown>[] = [];

    const rawData = customJsonLd || structuredData;
    if (Array.isArray(rawData)) {
      schemas = [...rawData];
    } else if (rawData && typeof rawData === 'object') {
      schemas = [rawData];
    }

    if (toolItem) {
      const localizedName = getToolName(toolItem.slug, toolItem.name);
      const localizedDesc = getToolDesc(toolItem.slug, toolItem.seoDescription);
      const localizedCatName = getCategoryName(toolItem.category, toolItem.categoryName);
      const toolSchemas = generateToolStructuredData(
        toolItem,
        localizedName,
        localizedDesc,
        localizedCatName
      );

      // Merge tool schemas if not already present
      toolSchemas.forEach((ts) => {
        const type = ts['@type'];
        const alreadyExists = schemas.some((s) => s['@type'] === type);
        if (!alreadyExists) {
          schemas.push(ts);
        }
      });
    }

    // Add FAQ schema if provided
    if (faqs && faqs.length > 0) {
      const hasFaq = schemas.some((s) => s['@type'] === 'FAQPage');
      if (!hasFaq) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }
    }

    // If explicit breadcrumbs provided and no BreadcrumbList exists yet
    if (breadcrumbs && breadcrumbs.length > 0) {
      const hasBreadcrumbs = schemas.some((s) => s['@type'] === 'BreadcrumbList');
      if (!hasBreadcrumbs) {
        schemas.push(generateBreadcrumbStructuredData(breadcrumbs));
      }
    }

    if (schemas.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [
    title,
    description,
    canonicalPath,
    canonicalUrl,
    robots,
    ogType,
    ogImage,
    toolSlug,
    breadcrumbs,
    structuredData,
    customJsonLd,
    faqs,
    language,
    getToolName,
    getToolDesc,
    getCategoryName,
  ]);

  return null;
};
