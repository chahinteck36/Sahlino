import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

// MVP Tools
import { JsonFormatterTool } from './components/tools/JsonFormatterTool';
import { ImageResizerTool } from './components/tools/ImageResizerTool';
import { TimeZoneConverterTool } from './components/tools/TimeZoneConverterTool';
import { PercentageCalculatorTool } from './components/tools/PercentageCalculatorTool';
import { BusinessDaysCalculatorTool } from './components/tools/BusinessDaysCalculatorTool';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Route Dispatcher
  const renderContent = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    // 1. Home
    if (cleanPath === '/') {
      return <HomePage onNavigate={navigate} onOpenSearchModal={() => setIsSearchModalOpen(true)} />;
    }

    // 2. All Tools
    if (cleanPath === '/tools') {
      return <ToolsPage onNavigate={navigate} />;
    }

    // 3. Categories
    if (cleanPath === '/categories') {
      return <CategoriesPage onNavigate={navigate} />;
    }

    // 4. Category Details (/categories/:slug)
    if (cleanPath.startsWith('/categories/')) {
      const slug = cleanPath.replace('/categories/', '');
      return <CategoryDetailPage categorySlug={slug} onNavigate={navigate} />;
    }

    // 5. MVP Tools
    if (cleanPath === '/json-formatter') {
      return <JsonFormatterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/image-resizer') {
      return <ImageResizerTool onNavigate={navigate} />;
    }
    if (cleanPath === '/time-zone-converter') {
      return <TimeZoneConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/percentage-calculator') {
      return <PercentageCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/business-days-calculator') {
      return <BusinessDaysCalculatorTool onNavigate={navigate} />;
    }

    // 6. Information & Legal Pages
    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (cleanPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (cleanPath === '/terms') {
      return <TermsPage />;
    }
    if (cleanPath === '/cookie-policy') {
      return <CookiePolicyPage />;
    }

    // 7. 404 Fallback
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold mb-4">
          404 Not Found
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-3">
          Page or Tool Not Found
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto mb-8">
          The tool or page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate('/tools')}
            className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Browse All Tools
          </button>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-200">
          {/* Header Navigation */}
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 pb-16">{renderContent()}</main>

          {/* Global Footer */}
          <Footer onNavigate={navigate} />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onSelectTool={(slug) => navigate('/' + slug)}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
