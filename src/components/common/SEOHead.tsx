import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  generateToolStructuredData,
  generateBreadcrumbStructuredData,
} from '../../utils/seo';
import { TOOLS } from '../../data/tools';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  robots?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  toolSlug?: string;
  breadcrumbs?: { name: string; path: string }[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
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

function setOrCreateLink(rel: string, href: string, hreflang?: string, id?: string) {
  let selector = `link[rel="${rel}"]`;
  if (hreflang) {
    selector += `[hreflang="${hreflang}"]`;
  }
  if (id) {
    selector = `#${id}`;
  }

  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) element.setAttribute('hreflang', hreflang);
    if (id) element.id = id;
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  robots = 'index, follow',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  toolSlug,
  breadcrumbs,
  structuredData,
}) => {
  const { language, getToolName, getToolDesc, getCategoryName } = useLanguage();

  useEffect(() => {
    // 1. Calculate full absolute canonical URL
    const fullCanonical = getCanonicalUrl(canonicalPath);

    // 2. Title & Formatting
    const cleanTitle = title.includes('Sahlino') ? title : `${title} - ${SITE_NAME}`;
    document.title = cleanTitle;

    // 3. Document language & direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // 4. Standard Meta Tags
    setOrCreateMeta('meta[name="description"]', 'name', 'description', description);
    setOrCreateMeta('meta[name="robots"]', 'name', 'robots', robots);
    setOrCreateMeta('meta[name="googlebot"]', 'name', 'googlebot', robots);

    // 5. Open Graph Meta Tags
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', cleanTitle);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    const currentLocale = SUPPORTED_LOCALES[language] || 'en_US';
    setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', currentLocale);

    // 6. Twitter Cards Meta Tags
    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', cleanTitle);
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setOrCreateMeta('meta[name="twitter:site"]', 'name', 'twitter:site', '@sahlino');

    // 7. Canonical Link Tag
    setOrCreateLink('canonical', fullCanonical);

    // 8. Multilingual hreflang alternate tags
    setOrCreateLink('alternate', fullCanonical, 'x-default', 'hreflang-default');
    Object.keys(SUPPORTED_LOCALES).forEach((langCode) => {
      setOrCreateLink('alternate', fullCanonical, langCode, `hreflang-${langCode}`);
    });

    // 9. Structured Data JSON-LD
    const scriptId = 'sahlino-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    let schemas: Record<string, unknown>[] = [];

    if (Array.isArray(structuredData)) {
      schemas = [...structuredData];
    } else if (structuredData && typeof structuredData === 'object') {
      schemas = [structuredData];
    }

    // Identify if this is a tool
    const inferredSlug =
      toolSlug ||
      TOOLS.find((t) => `/${t.slug}` === canonicalPath || t.slug === canonicalPath)?.slug;

    if (inferredSlug) {
      const toolItem = TOOLS.find((t) => t.slug === inferredSlug);
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

    return () => {
      // Cleanup if needed
    };
  }, [
    title,
    description,
    canonicalPath,
    robots,
    ogType,
    ogImage,
    toolSlug,
    breadcrumbs,
    structuredData,
    language,
    getToolName,
    getToolDesc,
    getCategoryName,
  ]);

  return null;
};
