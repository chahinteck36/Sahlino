import { ToolItem, CategoryInfo, SupportedLanguage, ToolCategory } from '../types';

export const SITE_URL = 'https://www.sahlino.tech';
export const SITE_NAME = 'Sahlino';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

/**
 * Normalizes any relative or absolute path into an absolute canonical URL on https://www.sahlino.tech
 */
export function getCanonicalUrl(path = ''): string {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${cleanPath}`;
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
      url: `${SITE_URL}/`,
      description:
        'Free, fast, browser-based online tools for developers, creators, businesses, and everyday tasks. 100% in-browser privacy.',
      inLanguage: ['en', 'ar', 'fr', 'es', 'de'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/tools?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/icon.svg`,
      description: 'Provider of private, client-side, browser-based web utility tools.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
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
        url: `${SITE_URL}/`,
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
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `${SITE_URL}/categories/${tool.category}`,
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
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Categories',
          item: `${SITE_URL}/categories`,
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
 * Generates BreadcrumbList schema for any list of breadcrumb items
 */
export function generateBreadcrumbStructuredData(
  items: { name: string; path?: string; item?: string; href?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const rawTarget = item.item || item.path || item.href || '/';
      const itemUrl = rawTarget.startsWith('http://') || rawTarget.startsWith('https://')
        ? rawTarget
        : getCanonicalUrl(rawTarget);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}
