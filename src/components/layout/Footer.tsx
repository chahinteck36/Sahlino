import React from 'react';
import { Layers, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES, TOOLS } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, getToolName, getCategoryName } = useLanguage();
  const availableTools = TOOLS.filter((t) => t.status === 'available');

  return (
    <footer
      id="main-footer"
      className="border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] transition-colors mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-start group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Sahlino</span>
            </button>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('badge.clientPrivacy', 'Zero Server Uploads • 100% Client-Side Speed')}</span>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              {t('nav.tools', 'All Tools')}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {availableTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onNavigate(`/${tool.slug}`)}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-start cursor-pointer"
                  >
                    {getToolName(tool.slug, tool.name)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              {t('nav.categories', 'Categories')}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate(`/categories/${cat.slug}`)}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-start cursor-pointer"
                  >
                    {getCategoryName(cat.slug, cat.name)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              {t('footer.legal', 'Platform & Legal')}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.about', 'About')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.contact', 'Contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('footer.privacy', 'Privacy Policy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('footer.terms', 'Terms of Service')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/cookie-policy')}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('footer.cookies', 'Cookie Policy')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Sahlino. {t('footer.rights', 'All rights reserved.')}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t('brand.tagline', 'Make It Easy.')}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
