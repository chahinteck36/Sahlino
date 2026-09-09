import React from 'react';
import { FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const canonicalUrl = 'https://www.sahlino.tech/terms';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <SEOHead
        title={isAr ? 'شروط الاستخدام | Sahlino' : 'Terms of Service | Sahlino'}
        description={
          isAr
            ? 'شروط وأحكام استخدام منصة وأدوات Sahlino الرقمية المجانية.'
            : 'Terms of Service and conditions for using the Sahlino free online utility platform.'
        }
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'شروط الاستخدام' : 'Terms of Service', item: canonicalUrl },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'شروط الاستخدام' : 'Terms of Service' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'شروط وأحكام الاستخدام' : 'Terms of Service'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isAr ? 'ساري المفعول اعتباراً من: مارس 2025' : 'Effective date: March 2025'}
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '1. قبول الشروط' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'باستخدامك لموقع وأدوات Sahlino، فإنك توافق على الالتزام بهذه الشروط وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يرجى التوقف عن استخدام الموقع.'
                : 'By accessing and using Sahlino tools, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part, you may not use the services.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '2. الاستخدام المسموح والمشروع' : '2. Permitted Use'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'تُقدم جميع الأدوات مجاناً للاستخدام الشخصي والمهني المشروع. يُحظر استخدام الأدوات لأي غرض غير قانوني، أو محاولة تعطيل الخوادم، أو استخراج البيانات عبر البوتات الضارة.'
                : 'All tools are provided free of charge for legitimate personal and commercial use. You agree not to misuse our services or engage in automated scraping or attacks targeting service availability.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '3. إخلاء المسؤولية' : '3. Disclaimer of Warranties'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'تُقدم الأدوات الحسابية ومحولات الصيغ "كما هي" دون أي ضمانات صريحة أو ضمنية. نحن نسعى دائماً لتحقيق أعلى درجات الدقة، ولكننا لا نتحمل المسؤولية عن أي خسائر ناتجة عن الاعتماد الحصري على النتائج المالية أو الرياضية دون مراجعة مختص.'
                : 'Tools, calculators, and converters are provided "as is" without warranty of any kind. While we strive for absolute mathematical precision, Sahlino shall not be held liable for damages or errors resulting from reliance on outputs without independent verification.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
