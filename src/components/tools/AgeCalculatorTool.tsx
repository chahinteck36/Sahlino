import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Clock,
  Cake,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const AgeCalculatorTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('age-calculator') || {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and find countdown to your next birthday.',
    category: 'calculators',
    categoryName: 'Calculators',
    seoTitle: 'Age Calculator Online - Calculate Exact Age in Years, Days, Hours',
    seoDescription: 'Calculate your exact chronological age from your date of birth with days, hours, and next birthday countdown.',
    faqs: [],
  };

  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const stats = useMemo(() => {
    if (!birthDate || !targetDate) return null;
    const b = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (isNaN(b.getTime()) || isNaN(tDate.getTime()) || b > tDate) return null;

    let years = tDate.getFullYear() - b.getFullYear();
    let months = tDate.getMonth() - b.getMonth();
    let days = tDate.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = tDate.getTime() - b.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday
    const currentYear = tDate.getFullYear();
    let nextBday = new Date(currentYear, b.getMonth(), b.getDate());
    if (nextBday < tDate) {
      nextBday = new Date(currentYear + 1, b.getMonth(), b.getDate());
    }
    const daysUntilNextBday = Math.ceil((nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysUntilNextBday,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/age-calculator"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('calculators', 'Calculators'),
            onClick: () => onNavigate('/categories/calculators'),
          },
          { label: getToolName('age-calculator', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('age-calculator', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('age-calculator', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Calculate Age at Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {stats ? (
          <div className="space-y-6">
            {/* Primary Age Display */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Exact Chronological Age
              </span>
              <div className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
                {stats.years} <span className="text-xl font-bold text-slate-500">years</span> {stats.months} <span className="text-xl font-bold text-slate-500">months</span> {stats.days} <span className="text-xl font-bold text-slate-500">days</span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Days
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {stats.totalDays.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Weeks
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {stats.totalWeeks.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Hours
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {stats.totalHours.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                  <Cake className="w-3.5 h-3.5 text-pink-500" /> Next Birthday
                </span>
                <div className="text-2xl font-black text-pink-600 dark:text-pink-400 mt-1">
                  {stats.daysUntilNextBday} <span className="text-xs">days</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold">
            Please enter a valid birth date prior to the target date.
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="age-calculator"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
