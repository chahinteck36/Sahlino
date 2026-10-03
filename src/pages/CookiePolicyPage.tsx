import React from 'react';
import { Cookie, Info } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const CookiePolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const canonicalUrl = 'https://www.sahlino.tech/cookie-policy';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <SEOHead
        title={isAr ? 'سياسة ملفات تعريف الارتباط (Cookies) | Sahlino' : 'Cookie Policy | Sahlino'}
        description={
          isAr
            ? 'سياسة ملفات تعريف الارتباط والكوكيز المستخدمة على منصة ساهلينو وكيفية إدارتها.'
            : 'Cookie Policy of Sahlino. How cookies and local browser storage are used and managed.'
        }
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'ملفات تعريف الارتباط' : 'Cookie Policy', item: canonicalUrl },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'ملفات تعريف الارتباط' : 'Cookie Policy' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
              <Cookie className="w-3.5 h-3.5" />
              <span>{isAr ? 'شفافية كاملة' : 'Transparent Cookies'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'سياسة ملفات تعريف الارتباط (Cookie Policy)' : 'Cookie Policy'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isAr ? 'آخر تحديث: أكتوبر 2026' : 'Last Updated: October 2026'}
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'ما هي ملفات تعريف الارتباط؟' : 'What Are Cookies?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزن على جهازك لتذكر تفضيلاتك مثل الوضع الليلي (Dark Mode) أو لغة الواجهة (العربية / الإنجليزية).'
                : 'Cookies are small text files stored on your device that help remember your user preferences such as Dark Mode or Language selection.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '2. التخزين المحلي وملفات التفضيلات (Local Storage)' : '2. Local Preferences & Storage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'تعتمد ساهلينو بشكل أساسي على التخزين المحلي داخل المتصفح (HTML5 localStorage) لتذكر خياراتك التفضيلية غير الشخصية، مثل تفعيل الوضع الليلي (Dark Mode) واختيار لغة الواجهة (العربية أو الإنجليزية). هذه البيانات مخزنة على جهازك حصراً ولا يتم إرسالها إلى أي خوادم.'
                : 'Sahlino primarily utilizes client-side HTML5 localStorage to preserve your non-personal preferences, such as Dark Mode toggles and interface language selection (Arabic or English). This data remains strictly in your local browser and is never transmitted to remote servers.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '3. ملفات تعريف الارتباط للإعلانات الرقمية' : '3. Digital Advertising Cookies'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'لتمويل استمرار وتطوير منصة ساهلينو كخدمة مجانية بالكامل لجميع المستخدمين، قد تعرض المنصة وحدات إعلانية رقمية بالتعاون مع شبكات إعلانية معتمدة وموثوقة. عند تفعيل هذه الوحدات الإعلانية، قد تستخدم الشبكات الإعلانية ملفات تعريف الارتباط (Cookies) أو معرفات رقمية قياسية لتقديم إعلانات ملائمة، ومنع تكرار ظهور نفس الإعلان، وحساب إحصاءات المشاهدة وفقاً للمعايير والأنظمة الدولية لحماية الخصوصية.'
                : 'To support and sustain the Sahlino platform as a 100% free resource for users worldwide, the platform may display non-intrusive digital advertisements through accredited advertising networks. When advertising units are active, third-party advertising partners may set standard browser cookies or digital identifiers to deliver contextual advertisements, prevent repetitive impressions, and generate aggregate delivery metrics in compliance with applicable privacy standards.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'كيفية التحكم في ملفات تعريف الارتباط' : 'How to Manage Cookies'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'يمكنك تعديل إعدادات متصفحك لرفض الكوكيز أو تنبيهك عند إرسالها. يرجى ملاحظة أن تعطيل بعض الملفات قد يؤثر على تذكر تفضيلاتك في الموقع.'
                : 'You can configure your web browser to block or delete cookies. Please note that disabling cookies may affect website functionality such as saved theme or language preferences.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
