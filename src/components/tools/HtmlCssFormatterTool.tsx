import React, { useState } from 'react';
import { CodeXml, Copy, Check, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface HtmlCssFormatterToolProps {
  onNavigate: (path: string) => void;
}

export const HtmlCssFormatterTool: React.FC<HtmlCssFormatterToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [mode, setMode] = useState<'html' | 'css'>('html');
  const [inputCode, setInputCode] = useState<string>(
    '<div class="card"><h1>Hello Sahlino</h1><p>Fast and private tools.</p></div>'
  );
  const [outputCode, setOutputCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Format HTML
  const formatHtml = (html: string): string => {
    let tab = '  ';
    let result = '';
    let indent = 0;

    // Normalize tags
    const tokens = html
      .replace(/>\s*</g, '><')
      .replace(/</g, '~::~<')
      .replace(/\s*([a-zA-Z0-9-_]+)="([^"]*)"/g, ' $1="$2"')
      .split('~::~');

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i].trim();
      if (!token) continue;

      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        result += tab.repeat(indent) + token + '\n';
      } else if (token.startsWith('<') && !token.endsWith('/>') && !token.includes('</') && !token.startsWith('<!')) {
        // Void elements
        const isVoid = /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i.test(token);
        result += tab.repeat(indent) + token + '\n';
        if (!isVoid) indent++;
      } else {
        result += tab.repeat(indent) + token + '\n';
      }
    }
    return result.trim();
  };

  // Minify HTML
  const minifyHtml = (html: string): string => {
    return html
      .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/> </g, '><')
      .trim();
  };

  // Format CSS
  const formatCss = (css: string): string => {
    return css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/,\s*/g, ', ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  // Minify CSS
  const minifyCss = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .replace(/;\}/g, '}')
      .trim();
  };

  const handleBeautify = () => {
    if (mode === 'html') {
      setOutputCode(formatHtml(inputCode));
    } else {
      setOutputCode(formatCss(inputCode));
    }
  };

  const handleMinify = () => {
    if (mode === 'html') {
      setOutputCode(minifyHtml(inputCode));
    } else {
      setOutputCode(minifyCss(inputCode));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode || inputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="html-css-formatter"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المطورين' : 'Developer Tools', item: 'https://www.sahlino.tech/categories/developer-tools' },
          { name: isAr ? 'منسق HTML و CSS' : 'HTML & CSS Formatter', item: 'https://www.sahlino.tech/html-css-formatter' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المطورين والبرمجة' : 'Developer Tools', href: '/categories/developer-tools' },
            { label: isAr ? 'منسق وضواغط HTML و CSS' : 'HTML & CSS Formatter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <CodeXml className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'منسق وضواغط كود HTML و CSS' : 'HTML & CSS Formatter & Minifier'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAr
                ? 'نسق ونظف أكواد HTML و CSS بمسافات بادئة مرتبة أو اضغطها لتسريع تصفح الويب'
                : 'Beautify or minify HTML and CSS source code with clean indentation'}
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                setMode('html');
                setInputCode('<div class="box">\n<h1>Title</h1>\n<p>Hello world</p>\n</div>');
                setOutputCode('');
              }}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${mode === 'html' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'}`}
            >
              HTML
            </button>
            <button
              onClick={() => {
                setMode('css');
                setInputCode('.box{background:#fff;padding:20px;border-radius:12px;}');
                setOutputCode('');
              }}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${mode === 'css' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'}`}
            >
              CSS
            </button>
          </div>
        </div>

        {/* Buttons Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleBeautify}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{isAr ? 'تنسيق وترتيب (Beautify)' : 'Beautify & Indent'}</span>
          </button>

          <button
            onClick={handleMinify}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4" />
            <span>{isAr ? 'ضغط وتقليص الحجم (Minify)' : 'Minify (Compress)'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer flex items-center gap-2 ml-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ النتيجة' : 'Copy Output')}</span>
          </button>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {isAr ? 'الكود المدخل' : 'Input Code'}
            </label>
            <textarea
              rows={12}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {isAr ? 'الكود المنسق / المضغوط' : 'Formatted / Minified Output'}
            </label>
            <textarea
              readOnly
              rows={12}
              value={outputCode || inputCode}
              className="w-full p-4 bg-emerald-50/20 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>
        </div>
      </div>

      <RelatedArticlesSection toolSlug="html-css-formatter" onNavigate={onNavigate} />
    </div>
  );
};
