import React, { useState, useMemo } from 'react';
import { BadgePercent, DollarSign, Tag, Calculator } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { toAsciiDigits } from '../../utils/numberUtils';

interface DiscountCalculatorToolProps {
  onNavigate: (path: string) => void;
}

export const DiscountCalculatorTool: React.FC<DiscountCalculatorToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [originalPriceStr, setOriginalPriceStr] = useState<string>('120');
  const [discountPercentStr, setDiscountPercentStr] = useState<string>('25');
  const [extraDiscountPercentStr, setExtraDiscountPercentStr] = useState<string>('0');
  const [taxPercentStr, setTaxPercentStr] = useState<string>('15');

  const { savings, priceAfterDiscount, taxAmount, finalPrice } = useMemo(() => {
    const rawPrice = parseFloat(toAsciiDigits(originalPriceStr)) || 0;
    const rawD1 = parseFloat(toAsciiDigits(discountPercentStr)) || 0;
    const rawD2 = parseFloat(toAsciiDigits(extraDiscountPercentStr)) || 0;
    const rawTax = parseFloat(toAsciiDigits(taxPercentStr)) || 0;

    const price = Math.max(0, rawPrice);
    const d1 = Math.min(100, Math.max(0, rawD1));
    const d2 = Math.min(100, Math.max(0, rawD2));
    const tax = Math.max(0, rawTax);

    // Primary discount
    const discountAmount1 = price * (d1 / 100);
    const subtotal = price - discountAmount1;

    // Additional promo coupon on subtotal
    const discountAmount2 = subtotal * (d2 / 100);
    const discountedTotal = subtotal - discountAmount2;
    const totalSavings = discountAmount1 + discountAmount2;

    // Sales Tax / VAT
    const taxVal = discountedTotal * (tax / 100);
    const finalTotal = discountedTotal + taxVal;

    return {
      savings: totalSavings.toFixed(2),
      priceAfterDiscount: discountedTotal.toFixed(2),
      taxAmount: taxVal.toFixed(2),
      finalPrice: finalTotal.toFixed(2),
    };
  }, [originalPriceStr, discountPercentStr, extraDiscountPercentStr, taxPercentStr]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="discount-calculator"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'الحاسبات' : 'Calculators', item: 'https://www.sahlino.tech/categories/calculators' },
          { name: isAr ? 'حاسبة الخصم' : 'Discount Calculator', item: 'https://www.sahlino.tech/discount-calculator' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'الحاسبات' : 'Calculators', href: '/categories/calculators' },
            { label: isAr ? 'حاسبة الخصم والضريبة' : 'Discount Calculator' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <BadgePercent className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'حاسبة الخصومات وضريبة القيمة المضافة' : 'Discount & Sales Tax Calculator'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'احسب السعر النهائي بعد التخفيض وكوبون الخصم الإضافي مع ضريبة المبيعات وتعرف على إجمالي توفيرك'
              : 'Calculate final prices after store discounts, stacked promo codes, and sales tax (VAT)'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'السعر الأصلي' : 'Original Price'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={originalPriceStr}
                  onChange={(e) => setOriginalPriceStr(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'نسبة الخصم (%)' : 'Discount (%)'}
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={discountPercentStr}
                  onChange={(e) => setDiscountPercentStr(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
                />
                <div className="flex gap-1.5 mt-2">
                  {[10, 20, 25, 50, 70].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercentStr(String(pct))}
                      className="px-2 py-1 text-[11px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'كوبون إضافي (%)' : 'Extra Coupon (%)'}
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={extraDiscountPercentStr}
                  onChange={(e) => setExtraDiscountPercentStr(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'الضريبة / القيمة المضافة (%)' : 'Sales Tax / VAT (%)'}
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={taxPercentStr}
                onChange={(e) => setTaxPercentStr(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
              {isAr ? 'السعر النهائي للدفع' : 'Final Price to Pay'}
            </span>
            <div className="text-5xl font-black text-emerald-950 dark:text-emerald-100 font-mono tracking-tight my-2">
              {finalPrice}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold text-emerald-800 bg-emerald-100 dark:bg-emerald-900/60 dark:text-emerald-200 mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>{isAr ? `توفير إجمالي: ${savings}` : `Total Savings: ${savings}`}</span>
            </div>

            <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800/80 text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>{isAr ? 'السعر بعد الخصم مباشرة:' : 'Price after discount:'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{priceAfterDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'مبلغ الضريبة المضافة:' : 'Estimated Tax / VAT:'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{taxAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="discount-calculator" onNavigate={onNavigate} />
    </div>
  );
};
