import React, { useState, useMemo } from 'react';
import { Calendar, Clock, ArrowRight, Plus, Minus, Check } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { toAsciiDigits } from '../../utils/numberUtils';

interface DateCalculatorToolProps {
  onNavigate: (path: string) => void;
}

export const DateCalculatorTool: React.FC<DateCalculatorToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>('2026-12-31');

  // Add/Subtract state
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [daysToAddStr, setDaysToAddStr] = useState<string>('30');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  // Difference Calculation
  const diffResult = useMemo(() => {
    if (!startDate || !endDate) return null;
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);

    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = (totalDays / 7).toFixed(1);
    const totalMonths = (totalDays / 30.4375).toFixed(1);

    return { totalDays, totalWeeks, totalMonths };
  }, [startDate, endDate]);

  // Add/Subtract result
  const calculatedDate = useMemo(() => {
    if (!baseDate) return '';
    const d = new Date(baseDate);
    const days = parseInt(toAsciiDigits(daysToAddStr), 10) || 0;
    const delta = operation === 'add' ? days : -days;
    d.setDate(d.getDate() + delta);
    return d.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [baseDate, daysToAddStr, operation, isAr]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="date-calculator"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات التاريخ' : 'Date & Time', item: 'https://www.sahlino.tech/categories/date-and-time' },
          { name: isAr ? 'حاسبة التاريخ' : 'Date Calculator', item: 'https://www.sahlino.tech/date-calculator' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات التاريخ والوقت' : 'Date & Time', href: '/categories/date-and-time' },
            { label: isAr ? 'حاسبة فرق التاريخ والأيام' : 'Date Difference Calculator' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="space-y-8 mb-8">
        {/* Module 1: Days Between Two Dates */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Calendar className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'حساب الفرق بين تاريخين' : 'Days Between Two Dates Calculator'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAr
                ? 'احسب عدد الأيام والأسابيع والشهور الفاصلة بين أي تاريخين بدقة متناهية'
                : 'Calculate the exact number of days, weeks, and months between any two dates'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'تاريخ البداية' : 'Start Date'}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'تاريخ النهاية' : 'End Date'}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {diffResult && (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                  {isAr ? 'إجمالي الأيام' : 'Total Days'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 font-mono">
                  {diffResult.totalDays}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'الأسابيع' : 'Weeks'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {diffResult.totalWeeks}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'الشهور التقديرية' : 'Months (approx)'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {diffResult.totalMonths}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Add or Subtract Days */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'إضافة أو طرح أيام من تاريخ' : 'Add or Subtract Days from Date'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'حدد تاريخاً وأضف أو اطرح منه عدداً من الأيام لتعرف التاريخ الناتج فوراً' : 'Add or subtract days, weeks, or months from any starting date'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'تاريخ الأساس' : 'Starting Date'}
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'العملية' : 'Operation'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOperation('add')}
                  className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                    operation === 'add' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة' : 'Add'}</span>
                </button>
                <button
                  onClick={() => setOperation('subtract')}
                  className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                    operation === 'subtract' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طرح' : 'Subtract'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'عدد الأيام' : 'Number of Days'}
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={daysToAddStr}
                onChange={(e) => setDaysToAddStr(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {isAr ? 'التاريخ الناتج:' : 'Resulting Date:'}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-100">
              {calculatedDate}
            </span>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="date-calculator" onNavigate={onNavigate} />
    </div>
  );
};
