import React, { useState, useMemo } from 'react';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface ColorConverterToolProps {
  onNavigate: (path: string) => void;
}

export const ColorConverterTool: React.FC<ColorConverterToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [hex, setHex] = useState<string>('#10B981');
  const [copied, setCopied] = useState<string | null>(null);

  const { rgb, hsl, cmyk, compHex } = useMemo(() => {
    let cleanHex = hex.trim().replace(/^#/, '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }
    if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      cleanHex = '10B981';
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);

    // Complementary color (invert)
    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');

    return {
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`,
      cmyk: `cmyk(${Math.round((1 - rNorm) * 100)}%, ${Math.round((1 - gNorm) * 100)}%, ${Math.round((1 - bNorm) * 100)}%)`,
      compHex: `#${compR}${compG}${compB}`.toUpperCase(),
    };
  }, [hex]);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="color-converter"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المطورين' : 'Developer Tools', item: 'https://www.sahlino.tech/categories/developer-tools' },
          { name: isAr ? 'محول الألوان' : 'Color Converter', item: 'https://www.sahlino.tech/color-converter' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المطورين والبرمجة' : 'Developer Tools', href: '/categories/developer-tools' },
            { label: isAr ? 'محول الألوان (HEX, RGB, HSL)' : 'Color Converter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Palette className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'محول الألوان الذكي (HEX, RGB, HSL)' : 'Color Code Converter & Palette'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'حول أكواد الألوان بين HEX و RGB و HSL مع معاينة بصرية حية واقتراح اللون المكمل'
              : 'Convert color codes between HEX, RGB, and HSL formats with complementary colors'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Swatch & Color Picker */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className="w-full h-44 rounded-3xl shadow-lg border border-black/10 flex items-center justify-center transition-colors duration-200 relative overflow-hidden"
              style={{ backgroundColor: hex }}
            >
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <span className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold pointer-events-none">
                {isAr ? 'انقر لتغيير اللون' : 'Click to Pick Color'}
              </span>
            </div>

            <div className="w-full flex gap-3 mt-4">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="flex-1 p-3 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
              />
            </div>
          </div>

          {/* Formats Conversion Cards */}
          <div className="lg:col-span-7 space-y-3">
            {[
              { label: 'HEX', val: hex, key: 'hex' },
              { label: 'RGB', val: rgb, key: 'rgb' },
              { label: 'HSL', val: hsl, key: 'hsl' },
              { label: 'Complementary HEX', val: compHex, key: 'comp' },
            ].map((item) => (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-0.5">{item.label}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{item.val}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.val, item.key)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  {copied === item.key ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === item.key ? (isAr ? 'تم' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="color-converter" onNavigate={onNavigate} />
    </div>
  );
};
