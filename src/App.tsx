import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { NotFoundPage } from './pages/NotFoundPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

// Dynamic Lazy-Loaded Tools (Optimized code splitting for high performance)
const JsonFormatterTool = lazy(() => import('./components/tools/JsonFormatterTool').then(m => ({ default: m.JsonFormatterTool })));
const ImageResizerTool = lazy(() => import('./components/tools/ImageResizerTool').then(m => ({ default: m.ImageResizerTool })));
const TimeZoneConverterTool = lazy(() => import('./components/tools/TimeZoneConverterTool').then(m => ({ default: m.TimeZoneConverterTool })));
const PercentageCalculatorTool = lazy(() => import('./components/tools/PercentageCalculatorTool').then(m => ({ default: m.PercentageCalculatorTool })));
const BusinessDaysCalculatorTool = lazy(() => import('./components/tools/BusinessDaysCalculatorTool').then(m => ({ default: m.BusinessDaysCalculatorTool })));
const PdfMergeTool = lazy(() => import('./components/tools/PdfMergeTool').then(m => ({ default: m.PdfMergeTool })));
const ImagesToPdfTool = lazy(() => import('./components/tools/ImagesToPdfTool').then(m => ({ default: m.ImagesToPdfTool })));
const QrCodeGeneratorTool = lazy(() => import('./components/tools/QrCodeGeneratorTool').then(m => ({ default: m.QrCodeGeneratorTool })));
const WordCounterTool = lazy(() => import('./components/tools/WordCounterTool').then(m => ({ default: m.WordCounterTool })));
const CaseConverterTool = lazy(() => import('./components/tools/CaseConverterTool').then(m => ({ default: m.CaseConverterTool })));
const Base64Tool = lazy(() => import('./components/tools/Base64Tool').then(m => ({ default: m.Base64Tool })));
const UrlEncoderTool = lazy(() => import('./components/tools/UrlEncoderTool').then(m => ({ default: m.UrlEncoderTool })));
const UuidGeneratorTool = lazy(() => import('./components/tools/UuidGeneratorTool').then(m => ({ default: m.UuidGeneratorTool })));
const HashGeneratorTool = lazy(() => import('./components/tools/HashGeneratorTool').then(m => ({ default: m.HashGeneratorTool })));
const ImageCropperTool = lazy(() => import('./components/tools/ImageCropperTool').then(m => ({ default: m.ImageCropperTool })));
const UnitConverterTool = lazy(() => import('./components/tools/UnitConverterTool').then(m => ({ default: m.UnitConverterTool })));
const DataStorageConverterTool = lazy(() => import('./components/tools/DataStorageConverterTool').then(m => ({ default: m.DataStorageConverterTool })));
const NumberBaseConverterTool = lazy(() => import('./components/tools/NumberBaseConverterTool').then(m => ({ default: m.NumberBaseConverterTool })));
const PasswordGeneratorTool = lazy(() => import('./components/tools/PasswordGeneratorTool').then(m => ({ default: m.PasswordGeneratorTool })));
const AgeCalculatorTool = lazy(() => import('./components/tools/AgeCalculatorTool').then(m => ({ default: m.AgeCalculatorTool })));
const MetaTagGeneratorTool = lazy(() => import('./components/tools/MetaTagGeneratorTool').then(m => ({ default: m.MetaTagGeneratorTool })));

const BmiCalculatorTool = lazy(() => import('./components/tools/BmiCalculatorTool').then(m => ({ default: m.BmiCalculatorTool })));
const DiscountCalculatorTool = lazy(() => import('./components/tools/DiscountCalculatorTool').then(m => ({ default: m.DiscountCalculatorTool })));
const LoanCalculatorTool = lazy(() => import('./components/tools/LoanCalculatorTool').then(m => ({ default: m.LoanCalculatorTool })));
const CalorieCalculatorTool = lazy(() => import('./components/tools/CalorieCalculatorTool').then(m => ({ default: m.CalorieCalculatorTool })));
const DateCalculatorTool = lazy(() => import('./components/tools/DateCalculatorTool').then(m => ({ default: m.DateCalculatorTool })));
const PdfSplitTool = lazy(() => import('./components/tools/PdfSplitTool').then(m => ({ default: m.PdfSplitTool })));
const PdfRotateTool = lazy(() => import('./components/tools/PdfRotateTool').then(m => ({ default: m.PdfRotateTool })));
const TextToPdfTool = lazy(() => import('./components/tools/TextToPdfTool').then(m => ({ default: m.TextToPdfTool })));
const WordToPdfTool = lazy(() => import('./components/tools/WordToPdfTool').then(m => ({ default: m.WordToPdfTool })));
const ImageConverterTool = lazy(() => import('./components/tools/ImageConverterTool').then(m => ({ default: m.ImageConverterTool })));
const ImageRotateTool = lazy(() => import('./components/tools/ImageRotateTool').then(m => ({ default: m.ImageRotateTool })));
const TextCleanerTool = lazy(() => import('./components/tools/TextCleanerTool').then(m => ({ default: m.TextCleanerTool })));
const TextReplaceTool = lazy(() => import('./components/tools/TextReplaceTool').then(m => ({ default: m.TextReplaceTool })));
const HtmlCssFormatterTool = lazy(() => import('./components/tools/HtmlCssFormatterTool').then(m => ({ default: m.HtmlCssFormatterTool })));
const TimestampConverterTool = lazy(() => import('./components/tools/TimestampConverterTool').then(m => ({ default: m.TimestampConverterTool })));
const ColorConverterTool = lazy(() => import('./components/tools/ColorConverterTool').then(m => ({ default: m.ColorConverterTool })));
const CurrencyConverterTool = lazy(() => import('./components/tools/CurrencyConverterTool').then(m => ({ default: m.CurrencyConverterTool })));

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

    // 5. Knowledge Hub & SEO Guides (/knowledge or /articles)
    if (cleanPath === '/knowledge' || cleanPath === '/articles') {
      return <KnowledgeHubPage onNavigate={navigate} />;
    }
    if (cleanPath.startsWith('/articles/')) {
      const slug = cleanPath.replace('/articles/', '');
      return <ArticleDetailPage articleSlug={slug} onNavigate={navigate} />;
    }
    if (cleanPath.startsWith('/knowledge/')) {
      const slug = cleanPath.replace('/knowledge/', '');
      return <ArticleDetailPage articleSlug={slug} onNavigate={navigate} />;
    }

    // 6. Active Tools
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
    if (cleanPath === '/pdf-merge') {
      return <PdfMergeTool onNavigate={navigate} />;
    }
    if (cleanPath === '/images-to-pdf') {
      return <ImagesToPdfTool onNavigate={navigate} />;
    }
    if (cleanPath === '/qr-code-generator') {
      return <QrCodeGeneratorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/word-counter') {
      return <WordCounterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/case-converter') {
      return <CaseConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/base64-encoder') {
      return <Base64Tool onNavigate={navigate} />;
    }
    if (cleanPath === '/url-encoder') {
      return <UrlEncoderTool onNavigate={navigate} />;
    }
    if (cleanPath === '/uuid-generator') {
      return <UuidGeneratorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/hash-generator') {
      return <HashGeneratorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/image-cropper') {
      return <ImageCropperTool onNavigate={navigate} />;
    }
    if (cleanPath === '/length-converter') {
      return <UnitConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/data-storage-converter') {
      return <DataStorageConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/number-base-converter') {
      return <NumberBaseConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/password-generator') {
      return <PasswordGeneratorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/age-calculator') {
      return <AgeCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/meta-tag-generator') {
      return <MetaTagGeneratorTool onNavigate={navigate} />;
    }

    // Newly Added Suite Tools
    if (cleanPath === '/bmi-calculator') {
      return <BmiCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/discount-calculator') {
      return <DiscountCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/loan-calculator') {
      return <LoanCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/calorie-calculator') {
      return <CalorieCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/date-calculator') {
      return <DateCalculatorTool onNavigate={navigate} />;
    }
    if (cleanPath === '/pdf-split') {
      return <PdfSplitTool onNavigate={navigate} />;
    }
    if (cleanPath === '/pdf-rotate') {
      return <PdfRotateTool onNavigate={navigate} />;
    }
    if (cleanPath === '/text-to-pdf') {
      return <TextToPdfTool onNavigate={navigate} />;
    }
    if (cleanPath === '/word-to-pdf') {
      return <WordToPdfTool onNavigate={navigate} />;
    }
    if (cleanPath === '/image-converter') {
      return <ImageConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/image-rotate') {
      return <ImageRotateTool onNavigate={navigate} />;
    }
    if (cleanPath === '/text-cleaner') {
      return <TextCleanerTool onNavigate={navigate} />;
    }
    if (cleanPath === '/text-replace') {
      return <TextReplaceTool onNavigate={navigate} />;
    }
    if (cleanPath === '/html-css-formatter') {
      return <HtmlCssFormatterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/timestamp-converter') {
      return <TimestampConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/color-converter') {
      return <ColorConverterTool onNavigate={navigate} />;
    }
    if (cleanPath === '/currency-converter') {
      return <CurrencyConverterTool onNavigate={navigate} />;
    }

    // 7. Information & Legal Pages
    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (cleanPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }
    if (cleanPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }
    if (cleanPath === '/cookie-policy') {
      return <CookiePolicyPage onNavigate={navigate} />;
    }

    // 7. 404 Fallback
    return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchModalOpen(true)} />;
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
          <main className="flex-1 pb-16">
            <Suspense
              fallback={
                <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="mt-4 text-xs font-bold text-slate-400">Loading Sahlino Tool...</span>
                </div>
              }
            >
              {renderContent()}
            </Suspense>
          </main>

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
