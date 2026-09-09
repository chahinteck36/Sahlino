export type ToolCategory =
  | 'document-tools'
  | 'image-tools'
  | 'text-tools'
  | 'developer-tools'
  | 'converters'
  | 'calculators'
  | 'date-and-time'
  | 'security-tools'
  | 'seo-web-tools';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  categoryName: string;
  iconName: string;
  popular?: boolean;
  status: 'available' | 'coming_soon';
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  faqs?: FAQItem[];
  relatedArticles?: string[]; // Slugs of relevant knowledge articles
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
}

export type ArticleCategory =
  | 'pdf-documents'
  | 'images'
  | 'calculators'
  | 'converters'
  | 'web-tools'
  | 'productivity'
  | 'guides';

export interface ArticleContentSection {
  heading: string;
  headingAr: string;
  body: string;
  bodyAr: string;
  bullets?: string[];
  bulletsAr?: string[];
  tip?: string;
  tipAr?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: ArticleCategory;
  categoryName: string;
  categoryNameAr: string;
  readTime: string;
  readTimeAr: string;
  publishedDate: string;
  modifiedDate?: string;
  relatedToolSlug?: string; // Slug of the primary Sahlino tool linked
  relatedArticles?: string[]; // Slugs of other related articles
  sections: ArticleContentSection[];
  faqs?: FAQItem[];
  faqsAr?: FAQItem[];
}

export type SupportedLanguage = 'en' | 'fr' | 'es' | 'de' | 'ar';

export type ColorTheme = 'emerald' | 'indigo' | 'ocean' | 'rose' | 'amber';
