import React, { useState, useMemo } from 'react';
import { Flame, Activity, Zap, TrendingDown, Target, TrendingUp } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface CalorieCalculatorToolProps {
  onNavigate: (path: string) => void;
}

export const CalorieCalculatorTool: React.FC<CalorieCalculatorToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178);
  const [activity, setActivity] = useState<number>(1.375); // Lightly active

  const { bmr, tdee, weightLoss, weightGain, extremeLoss } = useMemo(() => {
    // Mifflin-St Jeor Equation
    let baseBmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') {
      baseBmr += 5;
    } else {
      baseBmr -= 161;
    }

    const calculatedTdee = Math.round(baseBmr * activity);
    return {
      bmr: Math.round(baseBmr),
      tdee: calculatedTdee,
      weightLoss: Math.round(calculatedTdee - 500),
      extremeLoss: Math.round(calculatedTdee - 1000),
      weightGain: Math.round(calculatedTdee + 500),
    };
  }, [gender, age, weight, height, activity]);

  const activities = [
    { value: 1.2, name: 'Sedentary', nameAr: 'خامل (قليل أو لا تمارين)', desc: 'Little to no exercise, desk job' },
    { value: 1.375, name: 'Light Activity', nameAr: 'نشاط خفيف (1-3 أيام أسبوعياً)', desc: 'Light exercise 1-3 days/week' },
    { value: 1.55, name: 'Moderate Activity', nameAr: 'نشاط متوسط (3-5 أيام أسبوعياً)', desc: 'Moderate exercise 3-5 days/week' },
    { value: 1.725, name: 'Heavy Activity', nameAr: 'نشاط عالي (6-7 أيام أسبوعياً)', desc: 'Hard exercise 6-7 days/week' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="calorie-calculator"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'الحاسبات' : 'Calculators', item: 'https://www.sahlino.tech/categories/calculators' },
          { name: isAr ? 'حاسبة السعرات' : 'Calorie Calculator', item: 'https://www.sahlino.tech/calorie-calculator' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'الحاسبات' : 'Calculators', href: '/categories/calculators' },
            { label: isAr ? 'حاسبة السعرات الحرارية و TDEE' : 'Calorie & TDEE Calculator' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Flame className="w-7 h-7 text-amber-500" />
            <span>{isAr ? 'حاسبة السعرات اليومية و TDEE' : 'Daily Calorie & TDEE Calculator'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'احسب احتياج جسمك اليومي من السعرات الحرارية لإنقاص الوزن أو تثبيته أو بناء العضلات'
              : 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Gender Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isAr ? 'ذكر 👨' : 'Male 👨'}
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isAr ? 'أنثى 👩' : 'Female 👩'}
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'العمر' : 'Age'}
                </label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10) || 20)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الوزن (كجم)' : 'Weight (kg)'}
                </label>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 70)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الطول (سم)' : 'Height (cm)'}
                </label>
                <input
                  type="number"
                  min="120"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 170)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'مستوى النشاط البدني اليومي' : 'Daily Activity Level'}
              </label>
              <div className="space-y-2">
                {activities.map((act) => (
                  <button
                    key={act.value}
                    onClick={() => setActivity(act.value)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center transition-colors cursor-pointer ${
                      activity === act.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{isAr ? act.nameAr : act.name}</span>
                    <span className="text-[11px] opacity-70">{act.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              {isAr ? 'سعرات تثبيت الوزن (TDEE)' : 'Maintenance Calories (TDEE)'}
            </span>
            <div className="text-4xl sm:text-5xl font-black text-amber-500 font-mono tracking-tight my-2">
              {tdee} <span className="text-xs text-slate-500 font-normal">kcal/day</span>
            </div>
            <span className="text-[11px] text-slate-400 block mb-4">
              {isAr ? `معدل الحرق الأساسي BMR: ${bmr} سعرة` : `Basal Metabolic Rate BMR: ${bmr} kcal`}
            </span>

            {/* Target Breakdown */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2.5 text-xs text-left">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'خسارة وزن (0.5 كجم/أسبوع)' : 'Weight Loss (-0.5 kg/wk)'}</span>
                </div>
                <span className="font-mono font-black text-emerald-900 dark:text-emerald-100">{weightLoss} kcal</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>{isAr ? 'زيادة وزن وعضل (+0.5 كجم/أسبوع)' : 'Muscle Gain (+0.5 kg/wk)'}</span>
                </div>
                <span className="font-mono font-black text-blue-900 dark:text-blue-100">{weightGain} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="calorie-calculator" onNavigate={onNavigate} />
    </div>
  );
};
