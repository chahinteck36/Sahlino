import React from 'react';
import { ShieldCheck, Lock, EyeOff, Cookie, ServerOff, Mail } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const canonicalUrl = 'https://www.sahlino.tech/privacy-policy';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <SEOHead
        title={isAr ? 'سياسة الخصوصية | Sahlino' : 'Privacy Policy | Sahlino'}
        description={
          isAr
            ? 'سياسة الخصوصية لمنصة ساهلينو للأدوات الرقمية المجانية. نحن ملتزمون بحماية خصوصيتك ومعالجة البيانات محلياً في متصفحك.'
            : 'Privacy Policy of Sahlino. We are committed to protecting your privacy and processing your data locally in your browser.'
        }
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'سياسة الخصوصية' : 'Privacy Policy', item: canonicalUrl },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'حماية وخصوصية 100%' : '100% Client-Side Privacy'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isAr ? 'آخر تحديث: مارس 2025' : 'Last Updated: March 2025'}
            </p>
          </header>

          {/* Key Privacy Guarantee Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3.5">
            <ServerOff className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-1">
                {isAr ? 'مبدأ المعالجة المحلية بدون خوادم (Client-Side First)' : 'Client-Side Processing Guarantee'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
                {isAr
                  ? 'في منصة Sahlino، تتم معالجة ملفات PDF، وضغط الصور، وتنسيق الأكواد، والحسابات بالكامل داخل متصفحك عبر JavaScript وWebAssembly دون رفع أو حفظ أي ملف على خوادمنا.'
                  : 'At Sahlino, your PDF files, images, code snippets, and math calculations are processed entirely inside your local browser via WebAssembly and JavaScript. No files are uploaded or stored on remote servers.'}
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '1. البيانات التي نجمعها' : '1. Information We Collect'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'لا نطلب إنشاء حساب أو تسجيل دخول لاستخدام الأدوات. قد نقوم بجمع بيانات إحصائية مجهولة المصدر مثل نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها لتحسين أداء الموقع وسرعة استجابته.'
                : 'We do not require user registration or personal accounts to use our tools. We may collect anonymous aggregate telemetry such as browser type, operating system, and pages viewed to optimize platform performance and speed.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '2. إعلانات Google AdSense وملفات تعريف الارتباط' : '2. Google AdSense & Cookies'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'يستخدم الموقع خدمة Google AdSense لعرض الإعلانات التي تمول تطوير هذه الأدوات المجانية. تستخدم Google ملفات تعريف الارتباط (Cookies) لعرض إعلانات ملائمة بناءً على زيارات المستخدم السابقة لموقعنا أو مواقع أخرى. يمكنك تعطيل الإعلانات المخصصة عبر زيارة إعدادات إعلانات Google.'
                : 'This site uses Google AdSense to serve advertisements that fund our free utility tools. Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to our website or other sites on the internet. You can opt out of personalized advertising by visiting Google Ads Settings.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '3. أمن وخصوصية ملفاتك' : '3. Security of Your Files'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'ملفاتك وصورك ونصوصك تظل ملكك بنسبة 100%. يتم تفريغ الذاكرة المؤقتة للمتصفح فور إغلاق علامة التبويب أو إعادة تحميل الصفحة، ولا يملك أي طرف ثالث إمكانية الوصول إلى مدخلاتك.'
                : 'Your files, photos, and texts remain 100% yours. In-memory browser buffers are released immediately when you refresh the page or close the browser tab. No third party has access to your content.'}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isAr ? '4. تواصل معنا بخصوص الخصوصية' : '4. Contacting Us'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'إذا كان لديك أي استفسار حول سياسة الخصوصية أو ممارسات حماية البيانات، يمكنك مراسلتنا عبر: support@sahlino.tech'
                : 'If you have any questions regarding this privacy policy, please contact our privacy desk at: support@sahlino.tech'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
