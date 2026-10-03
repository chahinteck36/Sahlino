import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const canonicalUrl = 'https://www.sahlino.tech/contact';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const mailtoUrl = `mailto:contact@sahlino.tech?subject=${encodeURIComponent(
      `[Sahlino Contact] ${subject || 'Feedback / Inquiry'}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent via Sahlino.tech Contact Form`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 sm:py-12">
      <SEOHead
        title={isAr ? 'اتصل بنا | الدعم الفني والملاحظات - Sahlino' : 'Contact Us | Support & Feedback - Sahlino'}
        description={
          isAr
            ? 'تواصل مع فريق ساهلينو للاقتراحات أو الإبلاغ عن أخطاء أو طلب إضافة أدوات جديدة.'
            : 'Contact the Sahlino team for tool requests, feedback, or technical support.'
        }
        canonicalUrl={canonicalUrl}
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'اتصل بنا' : 'Contact Us', item: canonicalUrl },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'اتصل بنا' : 'Contact Us' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <header className="border-b border-slate-100 dark:border-slate-800 pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'تواصل معنا' : 'Contact Support & Feedback'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isAr
                ? 'نسعد دائماً بسماع آرائكم واقتراحاتكم لتطوير أدوات جديدة مفيدة'
                : 'We would love to hear from you. Suggest new tools or report bugs.'}
            </p>
          </header>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                {isAr ? 'تم تجهيز رسالتك للإرسال' : 'Message Prepared for Sending'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                {isAr
                  ? 'تم فتح تطبيق البريد الخاص بك لإرسال الرسالة مباشرة إلى contact@sahlino.tech. إذا لم يفتح تطبيق البريد تلقائياً، يمكنك إرسال بريدك مباشرة إلى عنواننا الموضح أدناه.'
                  : 'Your email application has been launched to send your inquiry directly to contact@sahlino.tech. If your client did not open automatically, you can email us directly at the address below.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:contact@sahlino.tech?subject=${encodeURIComponent(
                    `[Sahlino Contact] ${subject || 'Feedback'}`
                  )}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\n${message}`
                  )}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة فتح تطبيق البريد' : 'Re-open Email App'}</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100/50 cursor-pointer"
                >
                  {isAr ? 'كتابة رسالة جديدة' : 'Compose New Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {isAr ? 'الاسم الكامل' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'موضوع الرسالة' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isAr ? 'اقتراح أداة جديدة / إبلاغ عن مشكلة' : 'Tool suggestion / Issue report'}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'نص الرسالة' : 'Message'}
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isAr ? 'اكتب رسالتك أو تفاصيل استفسارك بالتفصيل...' : 'Type your message or tool suggestions here...'}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'إرسال الرسالة الآن' : 'Send Message'}</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            {isAr ? 'يمكنك أيضاً مراسلتنا مباشرة عبر:' : 'Or email directly to:'}{' '}
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">contact@sahlino.tech</span>
          </div>
        </div>
      </div>
    </div>
  );
};
