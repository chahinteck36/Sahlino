import React, { useState, useMemo } from 'react';
import { Activity, RefreshCw, Info, Heart, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface BmiCalculatorToolProps {
  onNavigate: (path: string) => void;
}

export const BmiCalculatorTool: React.FC<BmiCalculatorToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  // Calculations
  const { bmi, category, healthyRange, prime } = useMemo(() => {
    let weightInKg = weightKg;
    let heightInM = heightCm / 100;

    if (unit === 'imperial') {
      const totalInches = heightFt * 12 + heightIn;
      heightInM = totalInches * 0.0254;
      weightInKg = weightLbs * 0.45359237;
    }

    if (heightInM <= 0 || weightInKg <= 0) {
      return { bmi: 0, category: 'unknown', healthyRange: '0 - 0', prime: 0 };
    }

    const val = weightInKg / (heightInM * heightInM);
    const roundedBmi = parseFloat(val.toFixed(1));
    const bmiPrime = parseFloat((val / 25).toFixed(2));

    // Healthy weight range (BMI 18.5 - 24.9)
    const minHealthyKg = 18.5 * (heightInM * heightInM);
    const maxHealthyKg = 24.9 * (heightInM * heightInM);

    let rangeStr = `${minHealthyKg.toFixed(1)} - ${maxHealthyKg.toFixed(1)} kg`;
    if (unit === 'imperial') {
      rangeStr = `${(minHealthyKg * 2.20462).toFixed(1)} - ${(maxHealthyKg * 2.20462).toFixed(1)} lbs`;
    }

    let cat = 'normal';
    if (val < 18.5) cat = 'underweight';
    else if (val < 25) cat = 'normal';
    else if (val < 30) cat = 'overweight';
    else if (val < 35) cat = 'obese1';
    else cat = 'obese2';

    return {
      bmi: roundedBmi,
      category: cat,
      healthyRange: rangeStr,
      prime: bmiPrime,
    };
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  const categoryDetails: Record<string, { label: string; labelAr: string; color: string; bg: string }> = {
    underweight: { label: 'Underweight', labelAr: 'نقص في الوزن', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500' },
    normal: { label: 'Healthy Weight', labelAr: 'وزن مثالي وصحي', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500' },
    overweight: { label: 'Overweight', labelAr: 'وزن زائد', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500' },
    obese1: { label: 'Obesity Class I', labelAr: 'سمنة من الدرجة الأولى', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500' },
    obese2: { label: 'Obesity Class II/III', labelAr: 'سمنة مفرطة', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-600' },
    unknown: { label: 'Unknown', labelAr: 'غير معروف', color: 'text-slate-500', bg: 'bg-slate-400' },
  };

  const currentCat = categoryDetails[category];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="bmi-calculator"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'الحاسبات' : 'Calculators', item: 'https://www.sahlino.tech/categories/calculators' },
          { name: isAr ? 'حاسبة BMI' : 'BMI Calculator', item: 'https://www.sahlino.tech/bmi-calculator' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'الحاسبات' : 'Calculators', href: '/categories/calculators' },
            { label: isAr ? 'حاسبة مؤشر كتلة الجسم (BMI)' : 'BMI Calculator' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Activity className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'حاسبة مؤشر كتلة الجسم (BMI)' : 'Body Mass Index (BMI) Calculator'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAr
                ? 'احسب مؤشر كتلة جسمك واعرف وزنك المثالي وتصنيف منظمة الصحة العالمية بدقة'
                : 'Calculate your BMI and identify your ideal healthy weight based on WHO standards'}
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                unit === 'metric' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              {isAr ? 'متري (سم/كجم)' : 'Metric (cm/kg)'}
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                unit === 'imperial' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              {isAr ? 'إمبراطوري (قدم/باوند)' : 'Imperial (ft/lbs)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-5">
            {unit === 'metric' ? (
              <>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>{isAr ? 'الطول (سم)' : 'Height (cm)'}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                    <span>100 cm</span>
                    <span>175 cm</span>
                    <span>230 cm</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    <span>{isAr ? 'الوزن (كجم)' : 'Weight (kg)'}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                    <span>30 kg</span>
                    <span>70 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'الطول (أقدام)' : 'Height (Feet)'}
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'الطول (بوصات)' : 'Height (Inches)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الوزن (باوند / Lbs)' : 'Weight (Pounds / lbs)'}
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="450"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                  />
                </div>
              </>
            )}
          </div>

          {/* Results Badge & Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              {isAr ? 'مؤشر كتلة جسمك (BMI)' : 'Your Body Mass Index'}
            </span>
            <div className="text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight my-2">
              {bmi}
            </div>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${currentCat.color} bg-white dark:bg-slate-900 shadow-xs mb-4`}>
              {category === 'normal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span>{isAr ? currentCat.labelAr : currentCat.label}</span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-600 dark:text-slate-300 text-left">
              <div className="flex justify-between">
                <span>{isAr ? 'الوزن الصحي لطولك:' : 'Healthy Weight Range:'}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{healthyRange}</span>
              </div>
              <div className="flex justify-between">
                <span>BMI Prime:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{prime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BMI Categories Scale */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-3">
            {isAr ? 'تصنيفات مؤشر كتلة الجسم (منظمة الصحة العالمية WHO)' : 'WHO BMI Categories Reference'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border ${category === 'underweight' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'border-slate-200 dark:border-slate-800'}`}>
              <span className="font-bold block text-amber-600 dark:text-amber-400">{isAr ? 'نقص وزن' : 'Underweight'}</span>
              <span className="text-slate-500 text-[11px]">&lt; 18.5</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${category === 'normal' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' : 'border-slate-200 dark:border-slate-800'}`}>
              <span className="font-bold block text-emerald-600 dark:text-emerald-400">{isAr ? 'وزن مثالي' : 'Normal'}</span>
              <span className="text-slate-500 text-[11px]">18.5 – 24.9</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${category === 'overweight' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40' : 'border-slate-200 dark:border-slate-800'}`}>
              <span className="font-bold block text-orange-600 dark:text-orange-400">{isAr ? 'وزن زائد' : 'Overweight'}</span>
              <span className="text-slate-500 text-[11px]">25 – 29.9</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${category.startsWith('obese') ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'border-slate-200 dark:border-slate-800'}`}>
              <span className="font-bold block text-rose-600 dark:text-rose-400">{isAr ? 'سمنة' : 'Obese'}</span>
              <span className="text-slate-500 text-[11px]">&ge; 30.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Linking Bridge to Knowledge Center */}
      <RelatedArticlesSection toolSlug="bmi-calculator" onNavigate={onNavigate} />
    </div>
  );
};
