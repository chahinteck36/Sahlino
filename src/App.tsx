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

    // 5. Active Tools
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
