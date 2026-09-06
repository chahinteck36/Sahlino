import React from 'react';
import {
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Layers,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={`Sahlino — ${t('brand.tagline', 'Make It Easy.')}`}
        description={t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ label: t('nav.about', 'About') }]} />

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sahlino</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {t('brand.tagline', 'Make It Easy.')}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('hero.subtitle', 'Free online tools for developers, creators, businesses and everyday tasks.')}
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-8 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-12">
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            1. Client-Side Privacy by Architecture
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Most online utilities require you to transmit your files, code, or personal data to remote servers where they may be stored, analyzed, or leaked. At Sahlino, your data never leaves your browser. JSON is formatted in your browser&apos;s JavaScript engine, and images are resized directly on an in-memory HTML5 Canvas.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            2. Frictionless Performance
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            You don&apos;t need an account, a verification email, or a subscription tier to use Sahlino. Every tool opens immediately and executes with zero server latency. We optimize for Core Web Vitals so the platform stays lightning fast on phones, tablets, and desktops alike.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            3. Built for a Global Audience
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sahlino is engineered from day one with internationalization support, standard IANA timezones, customizable global workweeks (accommodating diverse cultural and regional standards), and intuitive interface accessibility.
          </p>
        </div>
      </div>

      <AdPlaceholder slotId="ad-slot-about-middle" />

      {/* CTA section */}
      <div className="p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-center">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
          Ready to experience faster, safer tools?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 max-w-md mx-auto">
          Explore our collection of browser utilities or get in touch with feature suggestions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/tools')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            {t('btn.viewAllTools', 'Explore Tools')}
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {t('nav.contact', 'Contact Us')}
          </button>
        </div>
      </div>
    </div>
  );
};
