import React, { useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Wrench,
  Globe,
  ChevronDown,
  Layers,
  Palette,
  Check,
} from 'lucide-react';
import { useTheme, COLOR_THEMES } from '../../context/ThemeContext';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { isDark, toggleTheme, colorTheme, setColorTheme, activeColorConfig } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  const navLinks = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('nav.tools', 'Tools'), path: '/tools' },
    { label: t('nav.categories', 'Categories'), path: '/categories' },
    { label: language === 'ar' ? 'مركز المعرفة' : 'Knowledge Hub', path: '/knowledge' },
    { label: t('nav.about', 'About'), path: '/about' },
    { label: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Tagline */}
          <button
            id="navbar-brand-logo"
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-start focus:outline-hidden group cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeColorConfig.gradientClass} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all`}>
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Sahlino
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider leading-tight mt-1 hidden sm:block">
                {t('brand.tagline', 'Make It Easy.')}
              </span>
            </div>
          </button>

          {/* Search Trigger Button */}
          <button
            id="navbar-search-btn"
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold w-64 lg:w-80 transition-colors cursor-pointer"
            aria-label="Search tools"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="truncate flex-1 text-start">{t('nav.search', 'Search for a tool...')}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-bold tracking-tight transition-colors cursor-pointer ${
                    isActive
                      ? `${activeColorConfig.badgeClass} font-extrabold border`
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Controls: Search icon (mobile), Language Selector, Color Theme, Dark/Light Mode */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Select language"
              >
                <Globe className={`w-3.5 h-3.5 ${activeColorConfig.accentClass}`} />
                <span className="uppercase font-black text-[11px] tracking-wide">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute end-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                      {t('nav.selectLanguage', 'Select Language')}
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as SupportedLanguage);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold cursor-pointer ${
                          language === lang.code
                            ? `${activeColorConfig.accentClass} font-black bg-slate-100/70 dark:bg-slate-800`
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xs">{lang.nativeName}</span>
                          <span className="text-[10px] font-normal text-slate-400">({lang.name})</span>
                        </span>
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Website Colors Palette Dropdown */}
            <div className="relative">
              <button
                id="color-theme-selector-btn"
                onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label={t('theme.colorTheme', 'Website Colors')}
                title={t('theme.colorTheme', 'Website Colors')}
              >
                <Palette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span
                  className="w-3 h-3 rounded-full ring-1 ring-black/10 dark:ring-white/20"
                  style={{ backgroundColor: activeColorConfig.primaryHex }}
                />
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
              </button>

              {colorDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setColorDropdownOpen(false)}
                  />
                  <div className="absolute end-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                      <span>{t('theme.colorTheme', 'Website Colors')}</span>
                      <Palette className="w-3 h-3 text-slate-400" />
                    </div>
                    {COLOR_THEMES.map((themeOption) => {
                      const isSelected = colorTheme === themeOption.id;
                      return (
                        <button
                          key={themeOption.id}
                          onClick={() => {
                            setColorTheme(themeOption.id);
                            setColorDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold cursor-pointer ${
                            isSelected
                              ? 'bg-slate-100/90 dark:bg-slate-800 text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                              style={{ backgroundColor: themeOption.primaryHex }}
                            />
                            <span>{language === 'ar' ? themeOption.nameAr : themeOption.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-slate-800 dark:text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-start transition-colors cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <Globe className={`w-3.5 h-3.5 ${activeColorConfig.accentClass}`} />
              <span>{t('nav.selectLanguage', 'Select Language')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    language === lang.code
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-black'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="text-[10px] uppercase font-mono opacity-70">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Color Theme Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 px-1 mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('theme.colorTheme', 'Website Colors')}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {COLOR_THEMES.map((themeOption) => {
                const isSelected = colorTheme === themeOption.id;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => {
                      setColorTheme(themeOption.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                      isSelected
                        ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                      style={{ backgroundColor: themeOption.primaryHex }}
                    />
                    <span className="truncate text-[11px]">{language === 'ar' ? themeOption.nameAr : themeOption.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
