import React, { useState } from 'react';
import {
  Percent,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface PercentageCalculatorToolProps {
  onNavigate: (path: string) => void;
}

type CalcMode = 'modeA' | 'modeB' | 'modeC' | 'modeD' | 'modeE' | 'modeF';

interface ModeConfig {
  id: CalcMode;
  label: string;
  title: string;
  formula: string;
  exampleText: string;
  inputXLabel: string;
  inputYLabel: string;
  inputXPlaceholder: string;
  inputYPlaceholder: string;
  sampleX: number;
  sampleY: number;
}

const MODES: ModeConfig[] = [
  {
    id: 'modeA',
    label: 'What is X% of Y?',
    title: 'Calculate X% of Y',
    formula: 'Result = (X / 100) × Y',
    exampleText: 'What is 15% of $80? -> (15 / 100) × 80 = $12',
    inputXLabel: 'Percentage (X %)',
    inputYLabel: 'Of Value (Y)',
    inputXPlaceholder: 'e.g. 15',
    inputYPlaceholder: 'e.g. 80',
    sampleX: 15,
    sampleY: 80,
  },
  {
    id: 'modeB',
    label: 'X is what % of Y?',
    title: 'X is what percentage of Y?',
    formula: 'Result = (X / Y) × 100%',
    exampleText: '25 is what percentage of 200? -> (25 / 200) × 100% = 12.5%',
    inputXLabel: 'Value (X)',
    inputYLabel: 'Total / Base (Y)',
    inputXPlaceholder: 'e.g. 25',
    inputYPlaceholder: 'e.g. 200',
    sampleX: 25,
    sampleY: 200,
  },
  {
    id: 'modeC',
    label: 'Percentage Increase',
    title: 'Calculate Percentage Increase',
    formula: 'Increase = ((Y - X) / X) × 100%',
    exampleText: 'Price goes from $50 to $75 -> ((75 - 50) / 50) × 100 = 50% increase',
    inputXLabel: 'Starting Value (X)',
    inputYLabel: 'Increased Value (Y)',
    inputXPlaceholder: 'e.g. 50',
    inputYPlaceholder: 'e.g. 75',
    sampleX: 50,
    sampleY: 75,
  },
  {
    id: 'modeD',
    label: 'Percentage Decrease',
    title: 'Calculate Percentage Decrease',
    formula: 'Decrease = ((X - Y) / X) × 100%',
    exampleText: 'Price drops from $100 to $70 -> ((100 - 70) / 100) × 100 = 30% discount/decrease',
    inputXLabel: 'Original Value (X)',
    inputYLabel: 'Discounted Value (Y)',
    inputXPlaceholder: 'e.g. 100',
    inputYPlaceholder: 'e.g. 70',
    sampleX: 100,
    sampleY: 70,
  },
  {
    id: 'modeE',
    label: 'Percentage Difference',
    title: 'Calculate Percentage Difference between two numbers',
    formula: 'Difference = (|X - Y| / ((X + Y) / 2)) × 100%',
    exampleText: 'Difference between 40 and 50 -> (|40 - 50| / 45) × 100 = 22.22%',
    inputXLabel: 'First Value (X)',
    inputYLabel: 'Second Value (Y)',
    inputXPlaceholder: 'e.g. 40',
    inputYPlaceholder: 'e.g. 50',
    sampleX: 40,
    sampleY: 50,
  },
  {
    id: 'modeF',
    label: 'Percentage Change',
    title: 'Calculate Percentage Change (Increase or Decrease)',
    formula: 'Change = ((New - Old) / |Old|) × 100%',
    exampleText: 'Change from 80 to 60 -> ((60 - 80) / 80) × 100 = -25% (25% decrease)',
    inputXLabel: 'Old / Initial Value (X)',
    inputYLabel: 'New / Final Value (Y)',
    inputXPlaceholder: 'e.g. 80',
    inputYPlaceholder: 'e.g. 60',
    sampleX: 80,
    sampleY: 60,
  },
];

export const PercentageCalculatorTool: React.FC<PercentageCalculatorToolProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('percentage-calculator')!;

  const [activeMode, setActiveMode] = useState<CalcMode>('modeA');
  const [valX, setValX] = useState<string>('15');
  const [valY, setValY] = useState<string>('80');
  const [copied, setCopied] = useState<boolean>(false);

  const currentMode = MODES.find((m) => m.id === activeMode)!;

  // Calculate logic
  const calculateResult = () => {
    const x = parseFloat(valX);
    const y = parseFloat(valY);

    if (isNaN(x) || isNaN(y)) {
      return { result: null, explanation: 'Please enter valid numerical values for X and Y.' };
    }

    switch (activeMode) {
      case 'modeA': {
        const res = (x / 100) * y;
        return {
          result: `${res}`,
          formatted: `${x}% of ${y} is ${res}`,
          steps: `(${x} ÷ 100) × ${y} = ${(x / 100).toFixed(4)} × ${y} = ${res}`,
        };
      }
      case 'modeB': {
        if (y === 0) return { result: null, explanation: 'Division by zero is undefined. Base value (Y) cannot be 0.' };
        const res = (x / y) * 100;
        return {
          result: `${parseFloat(res.toFixed(4))}%`,
          formatted: `${x} is ${parseFloat(res.toFixed(4))}% of ${y}`,
          steps: `(${x} ÷ ${y}) × 100% = ${(x / y).toFixed(6)} × 100% = ${parseFloat(res.toFixed(4))}%`,
        };
      }
      case 'modeC': {
        if (x === 0) return { result: null, explanation: 'Initial value cannot be 0 for percentage increase.' };
        const diff = y - x;
        const res = (diff / x) * 100;
        return {
          result: `${parseFloat(res.toFixed(4))}%`,
          formatted: `An increase from ${x} to ${y} is +${parseFloat(res.toFixed(4))}%`,
          steps: `((${y} - ${x}) ÷ ${x}) × 100% = (${diff} ÷ ${x}) × 100% = ${parseFloat(res.toFixed(4))}%`,
        };
      }
      case 'modeD': {
        if (x === 0) return { result: null, explanation: 'Original value cannot be 0 for percentage decrease.' };
        const diff = x - y;
        const res = (diff / x) * 100;
        return {
          result: `${parseFloat(res.toFixed(4))}%`,
          formatted: `A decrease from ${x} to ${y} is -${parseFloat(res.toFixed(4))}%`,
          steps: `((${x} - ${y}) ÷ ${x}) × 100% = (${diff} ÷ ${x}) × 100% = ${parseFloat(res.toFixed(4))}%`,
        };
      }
      case 'modeE': {
        const avg = (x + y) / 2;
        if (avg === 0) return { result: null, explanation: 'Average of both values is 0.' };
        const diff = Math.abs(x - y);
        const res = (diff / Math.abs(avg)) * 100;
        return {
          result: `${parseFloat(res.toFixed(4))}%`,
          formatted: `Percentage difference between ${x} and ${y} is ${parseFloat(res.toFixed(4))}%`,
          steps: `(|${x} - ${y}| ÷ ((${x} + ${y}) ÷ 2)) × 100% = (${diff} ÷ ${avg}) × 100% = ${parseFloat(res.toFixed(4))}%`,
        };
      }
      case 'modeF': {
        if (x === 0) return { result: null, explanation: 'Old value cannot be 0 for percentage change.' };
        const diff = y - x;
        const res = (diff / Math.abs(x)) * 100;
        const direction = res >= 0 ? 'increase' : 'decrease';
        return {
          result: `${parseFloat(res.toFixed(4))}%`,
          formatted: `Percentage change from ${x} to ${y} is ${res >= 0 ? '+' : ''}${parseFloat(res.toFixed(4))}% (${direction})`,
          steps: `((${y} - ${x}) ÷ |${x}|) × 100% = (${diff} ÷ ${Math.abs(x)}) × 100% = ${parseFloat(res.toFixed(4))}%`,
        };
      }
      default:
        return { result: null, explanation: '' };
    }
  };

  const output = calculateResult();

  const handleReset = () => {
    setValX('');
    setValY('');
  };

  const handleLoadSample = () => {
    setValX(String(currentMode.sampleX));
    setValY(String(currentMode.sampleY));
  };

  const handleCopy = () => {
    if (!output.result) return;
    navigator.clipboard.writeText(output.formatted || output.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = (mode: CalcMode) => {
    setActiveMode(mode);
    const m = MODES.find((item) => item.id === mode)!;
    setValX(String(m.sampleX));
    setValY(String(m.sampleY));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/percentage-calculator"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Sahlino Percentage Calculator',
          url: 'https://sahlino.com/percentage-calculator',
          applicationCategory: 'CalculatorApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: toolData.seoDescription,
        }}
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('calculators', 'Calculators'),
            onClick: () => onNavigate('/categories/calculators'),
          },
          { label: getToolName(toolData.slug, toolData.name) },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName(toolData.slug, toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <Calculator className="w-3.5 h-3.5" /> 6 Mathematical Modes
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc(toolData.slug, toolData.description)}
        </p>
      </div>

      {/* Mode Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => switchMode(m.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeMode === m.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Calculator Workspace */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentMode.title}
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              Enter the numbers below to compute the result in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Load Example
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Inputs and Output Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Input Controls */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                {currentMode.inputXLabel}
              </label>
              <input
                type="number"
                step="any"
                value={valX}
                onChange={(e) => setValX(e.target.value)}
                placeholder={currentMode.inputXPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-base font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                {currentMode.inputYLabel}
              </label>
              <input
                type="number"
                step="any"
                value={valY}
                onChange={(e) => setValY(e.target.value)}
                placeholder={currentMode.inputYPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-base font-bold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => {
                // Calculation runs reactively, but clicking gives immediate affirmation
              }}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Result</span>
            </button>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  Calculation Result
                </span>
                {output.result && (
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white bg-indigo-100/80 dark:bg-indigo-900/50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                )}
              </div>

              {output.result ? (
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                    {output.result}
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                    {output.formatted}
                  </div>
                  {output.steps && (
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 font-mono text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-sans font-bold text-slate-500 block mb-1 text-[11px] uppercase tracking-wider">Step-by-step solution:</span>
                      {output.steps}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-slate-500 text-sm font-medium">
                  {output.explanation || 'Enter values to see calculation result.'}
                </div>
              )}
            </div>

            {/* Formula & Example preview */}
            <div className="mt-6 pt-4 border-t border-indigo-200/60 dark:border-indigo-900/40 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <strong className="text-slate-900 dark:text-white">Formula: </strong>
                <code className="font-mono font-bold bg-indigo-100/60 dark:bg-indigo-900/40 px-2 py-0.5 rounded-md text-indigo-800 dark:text-indigo-200">
                  {currentMode.formula}
                </code>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Example: </strong>
                <span className="font-medium">{currentMode.exampleText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="ad-slot-percentage-middle" />

      {/* Educational Guide */}
      <section className="my-10 space-y-6" aria-label="Educational Guides">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Understanding Percentage Formulas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 tracking-tight">
              Percentage Increase vs. Decrease
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              When calculating a percentage increase or decrease, the starting value is always in the denominator. If a product price increases from $50 to $75, the growth is calculated relative to the original $50: (75 - 50) / 50 = +50%.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="font-black text-base text-slate-900 dark:text-white mb-2 tracking-tight">
              Why Percentage Difference Differs from Change
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Percentage change specifies a chronological direction (old value vs. new value). Percentage difference compares two values without direction by dividing the difference by their average.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={toolData.faqs || []} />

      {/* Internal Linking */}
      <RelatedTools
        currentSlug={toolData.slug}
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
