import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { searchTools, TOOLS } from '../../data/tools';
import { DynamicIcon } from './DynamicIcon';
import { ToolItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const { t, getToolName, getToolDesc } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: ToolItem[] = query.trim()
    ? TOOLS.filter((tool) => {
        const q = query.toLowerCase().trim();
        const localizedName = getToolName(tool.slug, tool.name).toLowerCase();
        const localizedDesc = getToolDesc(tool.slug, tool.description).toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          localizedName.includes(q) ||
          localizedDesc.includes(q) ||
          tool.tags.some((tg) => tg.toLowerCase().includes(q))
        );
      })
    : TOOLS.filter((t) => t.popular);

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="global-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder', 'Search tools by name, keyword, or category (e.g. json, image, time)...')}
            className="w-full px-3 py-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden text-base font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto p-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-2">
            {query.trim()
              ? `${t('search.matchingTools', 'Matching Tools')} (${results.length})`
              : t('search.popularTools', 'Popular Tools')}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                {t('tools.noResults', 'No matching tools found')} &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.slug);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-start transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/40">
                      <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {getToolName(tool.slug, tool.name)}
                        </span>
                        {tool.popular && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-md">
                            <Sparkles className="w-2.5 h-2.5" /> {t('badge.popular', 'Popular')}
                          </span>
                        )}
                        {tool.status === 'coming_soon' && (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                            {t('badge.comingSoon', 'Coming Soon')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {getToolDesc(tool.slug, tool.description)}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 shrink-0 ms-2 rtl:rotate-180" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>{t('badge.clientPrivacy', 'Zero Server Uploads • 100% Client-Side Speed')}</span>
          <span>⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
