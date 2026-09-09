import React, { useState, useMemo } from 'react';
import { Landmark, DollarSign, Calendar, Percent, PieChart } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface LoanCalculatorToolProps {
  onNavigate: (path: string) => void;
}

export const LoanCalculatorTool: React.FC<LoanCalculatorToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [principal, setPrincipal] = useState<number>(25000);
  const [annualRate, setAnnualRate] = useState<number>(5.5);
  const [termYears, setTermYears] = useState<number>(4);

  const { monthlyPayment, totalPayment, totalInterest, principalPercent, interestPercent } = useMemo(() => {
    const P = Math.max(0, principal || 0);
    const rYear = Math.max(0, annualRate || 0);
    const years = Math.max(1, termYears || 1);
    const n = years * 12;

    if (P === 0) {
      return { monthlyPayment: '0.00', totalPayment: '0.00', totalInterest: '0.00', principalPercent: 100, interestPercent: 0 };
    }

    if (rYear === 0) {
      const m = P / n;
      return {
        monthlyPayment: m.toFixed(2),
        totalPayment: P.toFixed(2),
        totalInterest: '0.00',
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const rMonth = rYear / 100 / 12;
    const factor = Math.pow(1 + rMonth, n);
    const m = (P * rMonth * factor) / (factor - 1);
    const total = m * n;
    const interest = total - P;

    const pPct = Math.round((P / total) * 100);
    const iPct = 100 - pPct;

    return {
      monthlyPayment: m.toFixed(2),
      totalPayment: total.toFixed(2),
      totalInterest: interest.toFixed(2),
      principalPercent: pPct,
      interestPercent: iPct,
    };
  }, [principal, annualRate, termYears]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="loan-calculator"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'الحاسبات' : 'Calculators', item: 'https://www.sahlino.tech/categories/calculators' },
          { name: isAr ? 'حاسبة القروض' : 'Loan Calculator', item: 'https://www.sahlino.tech/loan-calculator' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'الحاسبات' : 'Calculators', href: '/categories/calculators' },
            { label: isAr ? 'حاسبة الأقساط والقروض' : 'Loan Payment Calculator' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Landmark className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'حاسبة الأقساط الشهرية وفوائد القروض' : 'Loan & Mortgage Payment Calculator'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'احسب القسط الشهري الثابت وإجمالي الفوائد وتكلفة السداد الكلية للقروض والتمويلات الشخصية'
              : 'Calculate monthly loan installments, total interest costs, and total repayment amounts'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'مبلغ القرض (أصل التمويل)' : 'Loan Principal Amount'}
              </label>
              <input
                type="number"
                min="100"
                step="1000"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'نسبة الفائدة السنوية (%)' : 'Annual Interest Rate (%)'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'مدة السداد (بالسنوات)' : 'Loan Term (Years)'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={termYears}
                  onChange={(e) => setTermYears(parseInt(e.target.value, 10) || 1)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Quick Years Selector */}
            <div className="flex gap-2">
              {[1, 2, 3, 5, 10, 15, 20, 30].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTermYears(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    termYears === yr
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {yr} {isAr ? 'سنوات' : 'yr'}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              {isAr ? 'القسط الشهري المقدر' : 'Estimated Monthly Payment'}
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight my-2">
              {monthlyPayment}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-xs space-y-2.5 text-slate-600 dark:text-slate-300 text-left">
              <div className="flex justify-between">
                <span>{isAr ? 'إجمالي السداد مع الفوائد:' : 'Total Repayment Amount:'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{totalPayment}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'إجمالي مبلغ الفوائد:' : 'Total Interest Paid:'}</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">{totalInterest}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'عدد الأقساط الكلية:' : 'Total Installments:'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{termYears * 12} {isAr ? 'شهر' : 'months'}</span>
              </div>

              {/* Progress Bar of Principal vs Interest */}
              <div className="pt-3">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-emerald-600 dark:text-emerald-400">{isAr ? `الأصل ${principalPercent}%` : `Principal ${principalPercent}%`}</span>
                  <span className="text-rose-600 dark:text-rose-400">{isAr ? `الفائدة ${interestPercent}%` : `Interest ${interestPercent}%`}</span>
                </div>
                <div className="w-full h-2.5 bg-rose-500 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${principalPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="loan-calculator" onNavigate={onNavigate} />
    </div>
  );
};
