import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SITE_URL, getCanonicalUrl } from '../../utils/seo';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { t } = useLanguage();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      if (items[0]?.onClick) {
        items[0].onClick();
      } else {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap text-sm text-slate-500 dark:text-slate-400">
      <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Item 1: Home - Root canonical */}
        <li
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a
            href="/"
            itemProp="item"
            onClick={handleHomeClick}
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span itemProp="name">{t('nav.home', 'Home')}</span>
          </a>
          <link itemProp="item" href={`${SITE_URL}/`} />
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic Breadcrumb Levels */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          // Resolve path intelligently:
          // 1. Explicit item.href if provided
          // 2. If current leaf item, use currentPath
          // 3. If onClick contains navigation path (e.g. onNavigate('/categories/...')), extract it
          let resolvedPath = item.href;
          if (!resolvedPath) {
            if (isLast) {
              resolvedPath = currentPath;
            } else if (item.onClick) {
              const match = item.onClick.toString().match(/['"](\/[^'"]+)['"]/);
              if (match) {
                resolvedPath = match[1];
              }
            }
          }

          const absoluteUrl = resolvedPath ? getCanonicalUrl(resolvedPath) : `${SITE_URL}/`;
          const relativeHref = resolvedPath || '#';

          const handleClick = (e: React.MouseEvent) => {
            if (item.onClick && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              item.onClick();
            }
          };

          return (
            <li
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400 dark:text-slate-600 shrink-0 rtl:rotate-180" />

              {isLast ? (
                // Current Page Leaf
                <span
                  className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200 line-clamp-1"
                  aria-current="page"
                >
                  <span itemProp="name">{item.label}</span>
                  <link itemProp="item" href={absoluteUrl} />
                </span>
              ) : (
                // Intermediate Level (e.g. Category)
                <a
                  href={relativeHref}
                  itemProp="item"
                  onClick={handleClick}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer line-clamp-1"
                >
                  <span itemProp="name">{item.label}</span>
                  <link itemProp="item" href={absoluteUrl} />
                </a>
              )}

              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
