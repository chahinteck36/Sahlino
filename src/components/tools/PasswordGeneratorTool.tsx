import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const PasswordGeneratorTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('password-generator') || {
    slug: 'password-generator',
    name: 'Strong Password & PIN Generator',
    description: 'Generate ultra-secure, cryptographically random passwords and PINs in seconds.',
    category: 'security-tools',
    categoryName: 'Security & Privacy',
    seoTitle: 'Strong Password Generator Online - Secure Random Passwords',
    seoDescription: 'Generate strong, unique, cryptographically random passwords and PINs online with 100% in-browser Web Crypto security.',
    faqs: [],
  };

  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(false); // 0, O, l, 1, I
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Generate cryptographically secure random password
  const generatePassword = () => {
    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (avoidAmbiguous) {
      upperChars = upperChars.replace(/[OI]/g, '');
      lowerChars = lowerChars.replace(/[l]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
    }

    let charPool = '';
    if (useUpper) charPool += upperChars;
    if (useLower) charPool += lowerChars;
    if (useNumbers) charPool += numberChars;
    if (useSymbols) charPool += symbolChars;

    if (!charPool) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let res = '';
    for (let i = 0; i < length; i++) {
      res += charPool[randomValues[i] % charPool.length];
    }
    setPassword(res);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols, avoidAmbiguous]);

  // Calculate entropy & strength
  const getStrength = () => {
    let poolSize = 0;
    if (useUpper) poolSize += 26;
    if (useLower) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 26;

    const entropy = length * Math.log2(poolSize || 1);
    if (entropy < 40) return { label: 'Weak', color: 'text-rose-500 bg-rose-500', percent: 25 };
    if (entropy < 60) return { label: 'Medium', color: 'text-amber-500 bg-amber-500', percent: 50 };
    if (entropy < 80) return { label: 'Strong', color: 'text-emerald-500 bg-emerald-500', percent: 75 };
    return { label: 'Very Strong', color: 'text-indigo-500 bg-indigo-500', percent: 100 };
  };

  const strength = getStrength();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/password-generator"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('security-tools', 'Security & Privacy'),
            onClick: () => onNavigate('/categories/security-tools'),
          },
          { label: getToolName('password-generator', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('password-generator', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('password-generator', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-8">
        {/* Output box with strength */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white break-all select-all">
              {password || <span className="text-slate-400">Select options</span>}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={generatePassword}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-all"
                title="Regenerate"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Strength bar */}
          <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Strength: <strong className={strength.color.split(' ')[0]}>{strength.label}</strong>
            </span>
            <div className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color.split(' ')[1]} transition-all duration-300`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Configuration options */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Password Length ({length} characters)
              </label>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Uppercase Letters (A-Z)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Lowercase Letters (a-z)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Numbers (0-9)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Symbols (!@#$%^&*)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer sm:col-span-2">
              <input
                type="checkbox"
                checked={avoidAmbiguous}
                onChange={(e) => setAvoidAmbiguous(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Avoid Ambiguous Characters (O, 0, I, l, 1)
              </span>
            </label>
          </div>
        </div>
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="password-generator"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
