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
import { NotFoundPage } from './pages/NotFoundPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

// MVP & Active Tools
import { JsonFormatterTool } from './components/tools/JsonFormatterTool';
import { ImageResizerTool } from './components/tools/ImageResizerTool';
import { TimeZoneConverterTool } from './components/tools/TimeZoneConverterTool';
import { PercentageCalculatorTool } from './components/tools/PercentageCalculatorTool';
import { BusinessDaysCalculatorTool } from './components/tools/BusinessDaysCalculatorTool';
import { PdfMergeTool } from './components/tools/PdfMergeTool';
import { ImagesToPdfTool } from './components/tools/ImagesToPdfTool';
import { QrCodeGeneratorTool } from './components/tools/QrCodeGeneratorTool';
import { WordCounterTool } from './components/tools/WordCounterTool';
import { CaseConverterTool } from './components/tools/CaseConverterTool';
import { Base64Tool } from './components/tools/Base64Tool';
import { UrlEncoderTool } from './components/tools/UrlEncoderTool';
import { UuidGeneratorTool } from './components/tools/UuidGeneratorTool';
import { HashGeneratorTool } from './components/tools/HashGeneratorTool';
import { ImageCropperTool } from './components/tools/ImageCropperTool';
import { UnitConverterTool } from './components/tools/UnitConverterTool';
import { DataStorageConverterTool } from './components/tools/DataStorageConverterTool';
import { NumberBaseConverterTool } from './components/tools/NumberBaseConverterTool';
import { PasswordGeneratorTool } from './components/tools/PasswordGeneratorTool';
import { AgeCalculatorTool } from './components/tools/AgeCalculatorTool';
import { MetaTagGeneratorTool } from './components/tools/MetaTagGeneratorTool';

// Expanded Suite Tools
import { BmiCalculatorTool } from './components/tools/BmiCalculatorTool';
import { DiscountCalculatorTool } from './components/tools/DiscountCalculatorTool';
import { LoanCalculatorTool } from './components/tools/LoanCalculatorTool';
import { CalorieCalculatorTool } from './components/tools/CalorieCalculatorTool';
import { DateCalculatorTool } from './components/tools/DateCalculatorTool';
import { PdfSplitTool } from './components/tools/PdfSplitTool';
import { PdfRotateTool } from './components/tools/PdfRotateTool';
import { TextToPdfTool } from './components/tools/TextToPdfTool';
import { ImageConverterTool } from './components/tools/ImageConverterTool';
import { ImageRotateTool } from './components/tools/ImageRotateTool';
import { TextCleanerTool } from './components/tools/TextCleanerTool';
import { TextReplaceTool } from './components/tools/TextReplaceTool';
import { HtmlCssFormatterTool } from './components/tools/HtmlCssFormatterTool';
import { TimestampConverterTool } from './components/tools/TimestampConverterTool';
import { ColorConverterTool } from './components/tools/ColorConverterTool';
import { CurrencyConverterTool } from './components/tools/CurrencyConverterTool';

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
