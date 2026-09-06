import React, { useState, useMemo } from 'react';
import {
  Ruler,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Scale,
  Thermometer,
  Activity,
  Compass,
  ArrowRightLeft,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

type UnitType = 'length' | 'weight' | 'temperature' | 'area' | 'speed';

interface UnitDef {
  id: string;
  name: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

const CONVERSION_DATA: Record<UnitType, { name: string; icon: any; units: UnitDef[] }> = {
  length: {
    name: 'Length & Distance',
    icon: Ruler,
    units: [
      { id: 'm', name: 'Meters (m)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', name: 'Centimeters (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mm', name: 'Millimeters (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'in', name: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'ft', name: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'yd', name: 'Yards (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'mi', name: 'Miles (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ],
  },
  weight: {
    name: 'Weight & Mass',
    icon: Scale,
    units: [
      { id: 'kg', name: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', name: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mg', name: 'Milligrams (mg)', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'lb', name: 'Pounds (lb)', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      { id: 'ton', name: 'Metric Tons (t)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: [
      { id: 'c', name: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', name: 'Fahrenheit (°F)', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'k', name: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  area: {
    name: 'Area',
    icon: Compass,
    units: [
      { id: 'sqm', name: 'Square Meters (m²)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'sqkm', name: 'Square Kilometers (km²)', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'sqft', name: 'Square Feet (ft²)', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'acre', name: 'Acres', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: 'ha', name: 'Hectares (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    ],
  },
  speed: {
    name: 'Speed',
    icon: Activity,
    units: [
      { id: 'kmh', name: 'Kilometers / hour (km/h)', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', name: 'Miles / hour (mph)', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'ms', name: 'Meters / second (m/s)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'knot', name: 'Knots (kt)', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
};

export const UnitConverterTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('length-converter') || {
    slug: 'length-converter',
    name: 'Unit Converter (Length, Weight, Temp)',
    description: 'Convert between metric and imperial units of length, weight, temperature, area, and speed in real-time.',
    category: 'converters',
    categoryName: 'Converters',
    seoTitle: 'Unit Converter Online - Free Metric & Imperial Converter',
    seoDescription: 'Convert length, weight, temperature, area, and speed with high precision. Free, instant, and in-browser.',
    faqs: [],
  };

  const [activeCategory, setActiveCategory] = useState<UnitType>('length');
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  // Switch category
  const selectCategory = (type: UnitType) => {
    setActiveCategory(type);
    const units = CONVERSION_DATA[type].units;
    setFromUnit(units[0].id);
    setToUnit(units[1] ? units[1].id : units[0].id);
  };

  // Compute conversion
  const result = useMemo(() => {
    const group = CONVERSION_DATA[activeCategory];
    const fromDef = group.units.find((u) => u.id === fromUnit);
    const toDef = group.units.find((u) => u.id === toUnit);

    if (!fromDef || !toDef || isNaN(inputValue)) return 0;
    const baseValue = fromDef.toBase(inputValue);
    const targetValue = toDef.fromBase(baseValue);
    return Number(targetValue.toFixed(6));
  }, [activeCategory, inputValue, fromUnit, toUnit]);

  // All conversions in current category for quick reference
  const allConversions = useMemo(() => {
    const group = CONVERSION_DATA[activeCategory];
    const fromDef = group.units.find((u) => u.id === fromUnit);
    if (!fromDef || isNaN(inputValue)) return [];

    const baseVal = fromDef.toBase(inputValue);
    return group.units.map((u) => ({
      name: u.name,
      value: Number(u.fromBase(baseVal).toFixed(4)),
    }));
  }, [activeCategory, inputValue, fromUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/length-converter"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('converters', 'Converters'),
            onClick: () => onNavigate('/categories/converters'),
          },
          { label: getToolName('length-converter', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('length-converter', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('length-converter', toolData.description)}
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(CONVERSION_DATA) as UnitType[]).map((type) => {
          const item = CONVERSION_DATA[type];
          const Icon = item.icon;
          const isActive = activeCategory === type;
          const catLabel = t(`unitConverter.categories.${type}`, item.name);
          return (
            <button
              key={type}
              onClick={() => selectCategory(type)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{catLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Converter Main Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* From unit */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('unitConverter.from', 'From')}
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500"
            >
              {CONVERSION_DATA[activeCategory].units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <div className="md:col-span-1 flex justify-center py-2">
            <button
              onClick={swapUnits}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-400 flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700 transition-all shadow-xs"
              title={t('unitConverter.swap', 'Swap Units')}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To unit */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('unitConverter.to', 'To')}
            </label>
            <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-black text-lg truncate">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500"
            >
              {CONVERSION_DATA[activeCategory].units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            {t('unitConverter.equivalent', `Equivalent Values across all ${CONVERSION_DATA[activeCategory].name} units`).replace('{category}', t(`unitConverter.categories.${activeCategory}`, CONVERSION_DATA[activeCategory].name))}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allConversions.map((conv, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">
                  {conv.name}
                </p>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {conv.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="length-converter"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
