export type ToolCategory =
  | 'developer-tools'
  | 'image-tools'
  | 'calculators'
  | 'date-and-time'
  | 'text-tools'
  | 'converters';

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
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
}

export type SupportedLanguage = 'en' | 'fr' | 'es' | 'de' | 'ar';
