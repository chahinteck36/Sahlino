import React, { useState, useMemo } from 'react';
import { Coins, ArrowRightLeft, RefreshCw, TrendingUp } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { toAsciiDigits } from '../../utils/numberUtils';

interface CurrencyConverterToolProps {
  onNavigate: (path: string) => void;
}

// Benchmark exchange rates against USD (base = 1.0)
const RATES_TO_USD: Record<string, { rate: number; name: string; nameAr: string; symbol: string }> = {
  USD: { rate: 1.0, name: 'US Dollar', nameAr: 'دولار أمريكي', symbol: '$' },
  EUR: { rate: 0.92, name: 'Euro', nameAr: 'يورو أوروبي', symbol: '€' },
  GBP: { rate: 0.78, name: 'British Pound', nameAr: 'جنيه إسترليني', symbol: '£' },
  SAR: { rate: 3.75, name: 'Saudi Riyal', nameAr: 'ريال سعودي', symbol: 'ر.س' },
  AED: { rate: 3.67, name: 'UAE Dirham', nameAr: 'درهم إماراتي', symbol: 'د.إ' },
  EGP: { rate: 50.2, name: 'Egyptian Pound', nameAr: 'جنيه مصري', symbol: 'ج.م' },
  KWD: { rate: 0.31, name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', symbol: 'د.ك' },
  QAR: { rate: 3.64, name: 'Qatari Riyal', nameAr: 'ريال قطري', symbol: 'ر.ق' },
  CAD: { rate: 1.39, name: 'Canadian Dollar', nameAr: 'دولار كندي', symbol: 'C$' },
  AUD: { rate: 1.54, name: 'Australian Dollar', nameAr: 'دولار أسترالي', symbol: 'A$' },
  JPY: { rate: 152.5, name: 'Japanese Yen', nameAr: 'ين ياباني', symbol: '¥' },
  TRY: { rate: 36.4, name: 'Turkish Lira', nameAr: 'ليرة تركية', symbol: '₺' },
};

export const CurrencyConverterTool: React.FC<CurrencyConverterToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [amountStr, setAmountStr] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('SAR');

  const amount = useMemo(() => {
    const clean = toAsciiDigits(amountStr).replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  }, [amountStr]);

  const { convertedAmount, exchangeRate } = useMemo(() => {
    const fromRate = RATES_TO_USD[fromCurrency]?.rate || 1;
    const toRate = RATES_TO_USD[toCurrency]?.rate || 1;

    // Convert from Currency -> USD -> to Currency
    const usdVal = amount / fromRate;
    const finalVal = usdVal * toRate;
    const directRate = toRate / fromRate;

    return {
      convertedAmount: finalVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      exchangeRate: directRate.toFixed(4),
    };
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="currency-converter"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'المحولات' : 'Converters', item: 'https://www.sahlino.tech/categories/converters' },
          { name: isAr ? 'محول العملات' : 'Currency Converter', item: 'https://www.sahlino.tech/currency-converter' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'المحولات ووحدات القياس' : 'Converters', href: '/categories/converters' },
            { label: isAr ? 'محول العملات وأسعار الصرف' : 'Currency Converter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Coins className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'محول العملات وأسعار الصرف العالمية' : 'Currency Converter & Exchange Rates'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'حول المبالغ النقدية فوراً بين الدولار والريال واليورو والجنيه والدرهم وباقي العملات العالمية'
              : 'Convert money between USD, EUR, SAR, AED, EGP, and major world currencies'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Amount input & presets */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? 'المبلغ المراد تحويله' : 'Amount to Convert'}
              </label>
              <div className="flex gap-1.5">
                {['50', '100', '500', '1000'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmountStr(preset)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-900 dark:text-white"
            />
          </div>

          {/* Currencies selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
            <div className="sm:col-span-5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'من عملة' : 'From Currency'}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold cursor-pointer"
              >
                {Object.entries(RATES_TO_USD).map(([code, cur]) => (
                  <option key={code} value={code}>
                    {code} - {isAr ? cur.nameAr : cur.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1 flex justify-center pt-5">
              <button
                onClick={handleSwap}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'إلى عملة' : 'To Currency'}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold cursor-pointer"
              >
                {Object.entries(RATES_TO_USD).map(([code, cur]) => (
                  <option key={code} value={code}>
                    {code} - {isAr ? cur.nameAr : cur.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
              {amount} {fromCurrency} =
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-950 dark:text-emerald-100 font-mono tracking-tight my-2">
              {convertedAmount} <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{toCurrency}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </div>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="currency-converter" onNavigate={onNavigate} />
    </div>
  );
};
