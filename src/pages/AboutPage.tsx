import React from 'react';
import { Sparkles, Shield, Zap, Globe, Heart } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const canonicalUrl = 'https://www.sahlino.tech/about';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <SEOHead
        title={isAr ? 'من نحن | منصة Sahlino' : 'About Us | Sahlino'}
        description={
          isAr
            ? 'تعرف على ساهلينو (Sahlino)، المنصة العربية والعالمية الرائدة للأدوات اليومية والمستندات والآلات الحاسبة الآمنة.'
            : 'Learn about Sahlino, the modern free online platform for browser-based utility tools and guides.'
        }
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'من نحن' : 'About Us', item: canonicalUrl },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'عن ساهلينو (من نحن)' : 'About Us' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              {isAr ? 'عن منصة ساهلينو (Sahlino)' : 'About Sahlino Platform'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'مهمتنا هي تمكين كل مستخدم ومصمم ومطور وطالب من إنجاز مهامه اليومية بسرعة فائقة وخصوصية مطلقة دون اشتراكات أو تعقيدات.'
                : 'Our mission is to empower professionals, students, and creators with instantaneous browser-native tools with zero paywalls and zero privacy compromise.'}
            </p>
          </header>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {isAr ? 'خصوصية كاملة 100%' : '100% Privacy'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isAr
                  ? 'معالجة محلية للملفات داخل المتصفح دون رفعها لأي خوادم خارجية.'
                  : 'All PDF, image, and text operations run client-side on your local machine.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {isAr ? 'سرعة فائقة' : 'Blazing Fast'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isAr
                  ? 'حسابات وتحويلات فورية بدون انتظار أو استهلاك غير ضروري للبيانات.'
                  : 'Immediate computation without server queues or round-trip network delays.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {isAr ? 'مجاني ومتاح للجميع' : 'Always Free'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isAr
                  ? 'أدوات رقمية مجانية ومفتوحة دون قيود أو برامج ضارة أو اشتراكات مخفية.'
                  : 'Free access for students, engineers, and everyday users worldwide.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
