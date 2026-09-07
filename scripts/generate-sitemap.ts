import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS, CATEGORIES } from '../src/data/tools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.sahlino.tech';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

function generateSitemapXml(): string {
  const entries: SitemapEntry[] = [
    // Core Platform Pages
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/tools', changefreq: 'weekly', priority: '0.9' },
    { path: '/categories', changefreq: 'weekly', priority: '0.9' },

    // Category Pages
    ...CATEGORIES.map((cat) => ({
      path: `/categories/${cat.slug}`,
      changefreq: 'weekly' as const,
      priority: '0.8',
    })),

    // Available Public Tools
    ...TOOLS.filter((tool) => tool.status === 'available').map((tool) => ({
      path: `/${tool.slug}`,
      changefreq: 'weekly' as const,
      priority: '0.85',
    })),

    // Public Informational & Legal Pages
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.4' },
    { path: '/terms', changefreq: 'monthly', priority: '0.4' },
    { path: '/cookie-policy', changefreq: 'monthly', priority: '0.4' },
  ];

  const languages = ['en', 'ar', 'fr', 'es', 'de'];

  const urlElements = entries
    .map((entry) => {
      const loc = entry.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${entry.path}`;

      const hreflangTags = [
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`,
        ...languages.map(
          (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}" />`
        ),
      ].join('\n');

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${hreflangTags}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
