import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  Download,
  Trash2,
  Minimize2,
  FileCode,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface JsonFormatterToolProps {
  onNavigate: (path: string) => void;
}

const SAMPLE_JSON = `{
  "platform": "Sahlino",
  "version": "1.0.0",
  "tagline": "Make It Easy.",
  "features": [
    "Fast browser processing",
    "100% Client-side privacy",
    "No account required",
    "Zero server uploads"
  ],
  "stats": {
    "toolsAvailable": 5,
    "rating": 4.9,
    "globalUsers": true
  }
}`;

export const JsonFormatterTool: React.FC<JsonFormatterToolProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('json-formatter')!;
  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [outputJson, setOutputJson] = useState<string>('');
  const [indentSize, setIndentSize] = useState<number | 'tab'>(2);
  const [errorInfo, setErrorInfo] = useState<{ message: string; line?: number; col?: number } | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Helper to parse line & column from JSON parse error
  const parseJsonError = (err: Error, text: string) => {
    const message = err.message;
    let line: number | undefined;
    let col: number | undefined;

    // Pattern: at position X
    const posMatch = message.match(/position\s+(\d+)/i);
    if (posMatch && posMatch[1]) {
      const position = parseInt(posMatch[1], 10);
      const lines = text.substring(0, position).split('\n');
      line = lines.length;
      col = lines[lines.length - 1].length + 1;
    } else {
      // Pattern: line X column Y
      const lineColMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        col = parseInt(lineColMatch[2], 10);
      }
    }

    return { message, line, col };
  };

  const handleFormat = () => {
    setValidationSuccess(null);
    if (!inputJson.trim()) {
      setErrorInfo({ message: 'Please enter JSON data to format.' });
      setOutputJson('');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const indent = indentSize === 'tab' ? '\t' : indentSize;
      const formatted = JSON.stringify(parsed, null, indent);
      setOutputJson(formatted);
      setErrorInfo(null);
      setValidationSuccess('JSON is valid and successfully formatted!');
    } catch (err: unknown) {
      const parsedErr = parseJsonError(err as Error, inputJson);
      setErrorInfo(parsedErr);
      setOutputJson('');
    }
  };

  const handleValidate = () => {
    if (!inputJson.trim()) {
      setErrorInfo({ message: 'Input is empty. Please enter or paste JSON to validate.' });
      setValidationSuccess(null);
      return;
    }

    try {
      JSON.parse(inputJson);
      setErrorInfo(null);
      setValidationSuccess('Valid JSON! Syntax complies with RFC 8259 specifications.');
    } catch (err: unknown) {
      const parsedErr = parseJsonError(err as Error, inputJson);
      setErrorInfo(parsedErr);
      setValidationSuccess(null);
    }
  };

  const handleMinify = () => {
    setValidationSuccess(null);
    if (!inputJson.trim()) {
      setErrorInfo({ message: 'Please enter JSON data to minify.' });
      setOutputJson('');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setErrorInfo(null);
      setValidationSuccess('JSON minified successfully! Whitespace and newlines removed.');
    } catch (err: unknown) {
      const parsedErr = parseJsonError(err as Error, inputJson);
      setErrorInfo(parsedErr);
      setOutputJson('');
    }
  };

  const handleCopy = async () => {
    const textToCopy = outputJson || inputJson;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setErrorInfo(null);
    setValidationSuccess(null);
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    setOutputJson('');
    setErrorInfo(null);
    setValidationSuccess(null);
  };

  const handleDownload = () => {
    const content = outputJson || inputJson;
    if (!content.trim()) return;

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted-toolora.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Live input stats
  const stats = useMemo(() => {
    const lines = inputJson ? inputJson.split('\n').length : 0;
    const chars = inputJson.length;
    const sizeKB = (new Blob([inputJson]).size / 1024).toFixed(2);
    return { lines, chars, sizeKB };
  }, [inputJson]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/json-formatter"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Sahlino JSON Formatter & Validator',
          url: 'https://toolora.app/json-formatter',
          applicationCategory: 'DeveloperApplication',
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
            label: getCategoryName('developer-tools', 'Developer Tools'),
            onClick: () => onNavigate('/categories/developer-tools'),
          },
          { label: getToolName(toolData.slug, toolData.name) },
        ]}
      />

      {/* Header section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName(toolData.slug, toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc(toolData.slug, toolData.description)}
        </p>
      </div>

      {/* Main Tool Editor Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs overflow-hidden">
        {/* Controls Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-format-json"
              onClick={handleFormat}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <FileCode className="w-4 h-4" />
              <span>Format / Beautify</span>
            </button>
            <button
              id="btn-validate-json"
              onClick={handleValidate}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Validate</span>
            </button>
            <button
              id="btn-minify-json"
              onClick={handleMinify}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Minify</span>
            </button>
          </div>

          {/* Indent selector & secondary actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => {
                  const val = e.target.value === 'tab' ? 'tab' : parseInt(e.target.value, 10);
                  setIndentSize(val);
                }}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
              >
                <option value={2} className="dark:bg-slate-900">2 Spaces</option>
                <option value={4} className="dark:bg-slate-900">4 Spaces</option>
                <option value="tab" className="dark:bg-slate-900">Tabs</option>
              </select>
            </div>

            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer"
              title="Load sample JSON"
            >
              Sample JSON
            </button>

            <button
              id="btn-copy-json"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
              title="Copy result"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              id="btn-download-json"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
              title="Download JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              id="btn-clear-json"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Validation / Error Feedback Banner */}
        {errorInfo && (
          <div className="px-5 py-3.5 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
            <div>
              <span className="font-bold">Invalid JSON Syntax:</span> {errorInfo.message}
              {errorInfo.line !== undefined && (
                <div className="mt-1 font-mono text-xs bg-rose-100/70 dark:bg-rose-900/50 inline-block px-2 py-0.5 rounded text-rose-800 dark:text-rose-200 font-bold">
                  Approximate Location: Line {errorInfo.line}, Column {errorInfo.col}
                </div>
              )}
            </div>
          </div>
        )}

        {validationSuccess && !errorInfo && (
          <div className="px-5 py-3 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{validationSuccess}</span>
          </div>
        )}

        {/* Two-Panel Layout (Desktop) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Panel 1: Input Editor */}
          <div className="flex flex-col h-[400px] sm:h-[480px]">
            <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-black uppercase tracking-wider text-[11px] text-slate-600 dark:text-slate-300">Input JSON</span>
              <span className="font-medium">{stats.lines} lines • {stats.chars} chars • {stats.sizeKB} KB</span>
            </div>
            <textarea
              id="json-input-editor"
              value={inputJson}
              onChange={(e) => {
                setInputJson(e.target.value);
                if (errorInfo) setErrorInfo(null);
                if (validationSuccess) setValidationSuccess(null);
              }}
              placeholder="Paste raw or unformatted JSON here..."
              className="w-full flex-1 p-5 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none focus:outline-hidden leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Panel 2: Formatted Output */}
          <div className="flex flex-col h-[400px] sm:h-[480px] bg-slate-50/40 dark:bg-slate-950/30">
            <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-black uppercase tracking-wider text-[11px] text-slate-600 dark:text-slate-300">Formatted / Minified Output</span>
              {outputJson && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Ready</span>
              )}
            </div>
            <textarea
              id="json-output-editor"
              readOnly
              value={outputJson}
              placeholder="Formatted output will appear here after clicking 'Format / Beautify'..."
              className="w-full flex-1 p-5 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none focus:outline-hidden leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Ad placement between tool and educational content */}
      <AdPlaceholder slotId="ad-slot-json-middle" />

      {/* Educational Content: "What is JSON?", "How to format JSON?", "How to validate JSON?" */}
      <section className="my-10 space-y-8" aria-label="Educational Guides">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            What is JSON?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            JSON, or <strong>JavaScript Object Notation</strong>, is the universal open standard format for transferring data between servers, web applications, and APIs. Built upon simple key-value pairs and ordered lists, it offers an optimal balance between machine parseability and human readability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2 tracking-tight">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              How to Format JSON?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              <li>Paste your unformatted or minified JSON string into the left editor.</li>
              <li>Select your desired indentation depth (2 spaces, 4 spaces, or tabs).</li>
              <li>Click <strong>&quot;Format / Beautify&quot;</strong> to render a clean, indented tree structure.</li>
              <li>Click <strong>&quot;Copy&quot;</strong> or <strong>&quot;Download&quot;</strong> to export your result.</li>
            </ol>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2 tracking-tight">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              How to Validate JSON?
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              To check whether your payload complies with strict RFC standards, click <strong>&quot;Validate&quot;</strong>. If an error exists—such as a missing quote, unescaped character, or trailing comma—Sahlino flags the approximate line and column so you can rectify it immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={toolData.faqs || []} />

      {/* Internal Linking / Related Tools */}
      <RelatedTools
        currentSlug={toolData.slug}
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
