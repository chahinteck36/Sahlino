import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap text-sm text-slate-500 dark:text-slate-400">
      <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <button
            onClick={() => {
              if (items[0]?.onClick) items[0].onClick();
              else {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">{t('nav.home', 'Home')}</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400 dark:text-slate-600 shrink-0 rtl:rotate-180" />
              {isLast || !item.onClick ? (
                <span
                  className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200 line-clamp-1"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer line-clamp-1"
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
