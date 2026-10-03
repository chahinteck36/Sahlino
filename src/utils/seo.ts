import { ToolItem, CategoryInfo, SupportedLanguage, ToolCategory, ArticleItem } from '../types';

export const OFFICIAL_SITE_URL = 'https://www.sahlino.tech';
export const SITE_URL = OFFICIAL_SITE_URL;
export const SITE_NAME = 'Sahlino';
export const DEFAULT_OG_IMAGE = `${OFFICIAL_SITE_URL}/assets/og-image.png`;

/**
 * Normalizes any relative or absolute path into an absolute canonical URL strictly on https://www.sahlino.tech
 */
export function getCanonicalUrl(pathOrUrl = ''): string {
  if (!pathOrUrl || pathOrUrl === '/') {
    return `${OFFICIAL_SITE_URL}/`;
  }

  // If already an absolute URL, check domain and clean
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    try {
      const parsed = new URL(pathOrUrl);
      const cleanPathname = parsed.pathname.replace(/^\/+|\/+$/g, '');
      return cleanPathname ? `${OFFICIAL_SITE_URL}/${cleanPathname}` : `${OFFICIAL_SITE_URL}/`;
    } catch {
      // Fallback if URL parsing fails
    }
  }

  const cleanPath = pathOrUrl.replace(/^\/+|\/+$/g, '');
  return cleanPath ? `${OFFICIAL_SITE_URL}/${cleanPath}` : `${OFFICIAL_SITE_URL}/`;
}

/**
 * Maps tool categories to Schema.org applicationCategory values
 */
export function getApplicationCategory(category: ToolCategory): string {
  switch (category) {
    case 'developer-tools':
    case 'seo-web-tools':
      return 'DeveloperApplication';
    case 'image-tools':
      return 'MultimediaApplication';
    case 'document-tools':
      return 'BusinessApplication';
    case 'calculators':
    case 'converters':
    case 'date-and-time':
    case 'security-tools':
    case 'text-tools':
    default:
      return 'UtilitiesApplication';
  }
}

/**
 * Generates WebSite, Organization, and WebApplication structured data for the homepage
 */
export function generateHomeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: ['ساهلينو', 'Sahlino Online Tools', 'Sahlino Tools'],
      url: `${OFFICIAL_SITE_URL}/`,
      description:
        'Free, fast, browser-based online tools for developers, creators, businesses, and everyday tasks. 100% in-browser privacy.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${OFFICIAL_SITE_URL}/tools?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${OFFICIAL_SITE_URL}/`,
      logo: `${OFFICIAL_SITE_URL}/assets/icon.svg`,
      description: 'Provider of private, client-side, browser-based web utility tools.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: `${OFFICIAL_SITE_URL}/`,
      operatingSystem: 'Web',
      applicationCategory: 'UtilitiesApplication',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '100% Client-side privacy',
        'Zero server uploads',
        'Instant execution',
        'Multi-language support (Arabic, English, French, Spanish, German)',
        'Dark mode and accessible high-contrast themes',
      ],
    },
  ];
}

/**
 * Generates Schema.org WebApplication, BreadcrumbList, and FAQPage (if applicable) for a tool
 */
export function generateToolStructuredData(
  tool: ToolItem,
  localizedName?: string,
  localizedDesc?: string,
  localizedCatName?: string
) {
  const toolUrl = getCanonicalUrl(tool.slug);
  const name = localizedName || tool.name;
  const description = localizedDesc || tool.seoDescription || tool.description;
  const categoryName = localizedCatName || tool.categoryName;

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${name} - Sahlino`,
      url: toolUrl,
      operatingSystem: 'Web',
      applicationCategory: getApplicationCategory(tool.category),
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: `${OFFICIAL_SITE_URL}/`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${OFFICIAL_SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `${OFFICIAL_SITE_URL}/categories/${tool.category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: name,
          item: toolUrl,
        },
      ],
    },
  ];

  // If tool has FAQs, add FAQPage schema
  if (tool.faqs && tool.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}

/**
 * Generates CollectionPage / ItemList and BreadcrumbList for Category pages
 */
export function generateCategoryStructuredData(
  category: CategoryInfo,
  tools: ToolItem[],
  localizedName?: string,
  localizedDesc?: string
) {
  const categoryUrl = getCanonicalUrl(`categories/${category.slug}`);
  const catName = localizedName || category.name;
  const catDesc = localizedDesc || category.description;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${catName} - Sahlino`,
      description: catDesc,
      url: categoryUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: tools.map((t, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: t.name,
          url: getCanonicalUrl(t.slug),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${OFFICIAL_SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Categories',
          item: `${OFFICIAL_SITE_URL}/categories`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: catName,
          item: categoryUrl,
        },
      ],
    },
  ];
}

/**
 * Generates Schema.org Article, BreadcrumbList, and FAQPage (if applicable) for articles
 */
export function generateArticleStructuredData(
  article: ArticleItem,
  localizedTitle?: string,
  localizedDesc?: string,
  localizedCatName?: string,
  faqs?: { question: string; answer: string }[]
) {
  const canonicalUrl = getCanonicalUrl(`knowledge/${article.slug}`);
  const headline = localizedTitle || article.title;
  const description = localizedDesc || article.description;
  const catName = localizedCatName || article.categoryName;

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: headline,
      description: description,
      image: DEFAULT_OG_IMAGE,
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate || article.publishedDate,
      author: {
        '@type': 'Organization',
        name: `${SITE_NAME} Editorial Team`,
        url: `${OFFICIAL_SITE_URL}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${OFFICIAL_SITE_URL}/assets/icon.svg`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${OFFICIAL_SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Knowledge Center',
          item: `${OFFICIAL_SITE_URL}/knowledge`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: headline,
          item: canonicalUrl,
        },
      ],
    },
  ];

  if (faqs && faqs.length > 0) {
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

  return schemas;
}

/**
 * Generates BreadcrumbList schema for any list of breadcrumb items
 */
export function generateBreadcrumbStructuredData(
  items: { name?: string; label?: string; path?: string; item?: string; href?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const rawTarget = item.item || item.path || item.href || '/';
      const itemUrl = getCanonicalUrl(rawTarget);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name || item.label || 'Page',
        item: itemUrl,
      };
    }),
  };
}
