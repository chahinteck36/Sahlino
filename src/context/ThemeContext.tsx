import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorTheme } from '../types';

export type Theme = 'light' | 'dark' | 'system';

export interface ColorThemeOption {
  id: ColorTheme;
  name: string;
  nameAr: string;
  primaryHex: string;
  primaryBgClass: string;
  accentClass: string;
  btnClass: string;
  badgeClass: string;
  gradientClass: string;
}

export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: 'emerald',
    name: 'Emerald Green',
    nameAr: 'أخضر زمردي (ساهل)',
    primaryHex: '#10b981',
    primaryBgClass: 'bg-emerald-600',
    accentClass: 'text-emerald-600 dark:text-emerald-400',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    gradientClass: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'indigo',
    name: 'Classic Indigo',
    nameAr: 'بنفسجي نيلي',
    primaryHex: '#6366f1',
    primaryBgClass: 'bg-indigo-600',
    accentClass: 'text-indigo-600 dark:text-indigo-400',
    btnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    gradientClass: 'from-indigo-600 to-violet-700',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    nameAr: 'أزرق محيطي',
    primaryHex: '#0284c7',
    primaryBgClass: 'bg-sky-600',
    accentClass: 'text-sky-600 dark:text-sky-400',
    btnClass: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-500/20',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    gradientClass: 'from-sky-600 to-blue-700',
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    nameAr: 'وردي قرمزي',
    primaryHex: '#e11d48',
    primaryBgClass: 'bg-rose-600',
    accentClass: 'text-rose-600 dark:text-rose-400',
    btnClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    gradientClass: 'from-rose-600 to-pink-700',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    nameAr: 'عنبري دافئ',
    primaryHex: '#d97706',
    primaryBgClass: 'bg-amber-600',
    accentClass: 'text-amber-600 dark:text-amber-400',
    btnClass: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    gradientClass: 'from-amber-600 to-orange-700',
  },
];

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colorTheme: ColorTheme;
  activeColorConfig: ColorThemeOption;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('sahlino_theme') as Theme;
    return saved || 'system';
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('sahlino_color_theme') as ColorTheme;
    if (saved && ['emerald', 'indigo', 'ocean', 'rose', 'amber'].includes(saved)) {
      return saved;
    }
    return 'emerald';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('sahlino_theme') as Theme;
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      let resolvedDark = false;
      if (theme === 'dark') {
        resolvedDark = true;
      } else if (theme === 'light') {
        resolvedDark = false;
      } else {
        resolvedDark = mediaQuery.matches;
      }

      setIsDark(resolvedDark);
      if (resolvedDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', colorTheme);
  }, [colorTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('sahlino_theme', newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const setColorTheme = (newColor: ColorTheme) => {
    setColorThemeState(newColor);
    localStorage.setItem('sahlino_color_theme', newColor);
  };

  const activeColorConfig = COLOR_THEMES.find((c) => c.id === colorTheme) || COLOR_THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        colorTheme,
        activeColorConfig,
        setTheme,
        toggleTheme,
        setColorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

