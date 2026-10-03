import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS, CATEGORIES } from '../src/data/tools.ts';
import { ARTICLES } from '../src/data/articles.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.sahlino.tech';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemapXml(): string {
  const entries: SitemapEntry[] = [
    // 1. Core Platform Pages
    { loc: `${BASE_URL}/`, lastmod: TODAY, changefreq: 'daily', priority: '1.0' },
    { loc: `${BASE_URL}/tools`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_URL}/categories`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_URL}/knowledge`, lastmod: TODAY, changefreq: 'weekly', priority: '0.85' },

    // 2. Category Hub Pages
    ...CATEGORIES.map((cat) => ({
      loc: `${BASE_URL}/categories/${cat.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly' as const,
      priority: '0.8',
    })),

    // 3. Available Public Tools (Only live, non-draft, accessible tools)
    ...TOOLS.filter((tool) => tool.status === 'available').map((tool) => ({
      loc: `${BASE_URL}/${tool.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly' as const,
      priority: '0.85',
    })),

    // 4. In-Depth Knowledge Guides & Articles
    ...ARTICLES.map((article) => ({
      loc: `${BASE_URL}/knowledge/${article.slug}`,
      lastmod: article.modifiedDate || article.publishedDate || TODAY,
      changefreq: 'monthly' as const,
      priority: '0.8',
    })),

    // 5. Public Informational & Legal Pages
    { loc: `${BASE_URL}/about`, lastmod: TODAY, changefreq: 'monthly', priority: '0.6' },
    { loc: `${BASE_URL}/contact`, lastmod: TODAY, changefreq: 'monthly', priority: '0.6' },
    { loc: `${BASE_URL}/privacy-policy`, lastmod: TODAY, changefreq: 'monthly', priority: '0.4' },
    { loc: `${BASE_URL}/terms`, lastmod: TODAY, changefreq: 'monthly', priority: '0.4' },
    { loc: `${BASE_URL}/cookie-policy`, lastmod: TODAY, changefreq: 'monthly', priority: '0.4' },
  ];

  // Ensure no duplicate URLs
  const uniqueUrls = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    if (!uniqueUrls.has(entry.loc)) {
      uniqueUrls.set(entry.loc, entry);
    }
  }

  const urlElements = Array.from(uniqueUrls.values())
    .map((entry) => {
      return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>
`;
}

function run() {
  const xml = generateSitemapXml();

  // 1. Write to public/sitemap.xml
  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`[Sitemap] Successfully generated public sitemap: ${publicPath}`);

  // 2. Also write to dist/sitemap.xml if dist directory exists
  const distDir = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf-8');
    console.log(`[Sitemap] Successfully copied sitemap to dist: ${distPath}`);
  }
}

run();
