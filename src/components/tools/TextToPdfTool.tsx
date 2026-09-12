import React, { useState, useEffect } from 'react';
import { FileText, Download, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { triggerDownload } from '../../utils/numberUtils';

interface TextToPdfToolProps {
  onNavigate: (path: string) => void;
}

export const TextToPdfTool: React.FC<TextToPdfToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const defaultSampleAr =
    'مرحباً بك في ساهلينو!\n\nهذا مستند تجريبي تم إنشاؤه بالكامل داخل متصفحك. يمكنك كتابة أو لصق أي مذكرات، أو أبحاث، أو مقالات، أو نصوص، وتخصيص حجم الخط وهوامش الصفحة، ثم تنزيل ملف PDF فائق الوضوح بجودة طباعة دون إرسال بياناتك إلى أي خادم خارجي.';

  const defaultSampleEn =
    'Welcome to Sahlino!\n\nThis is a sample document generated directly inside your browser. You can type or paste notes, essays, articles, or code, adjust formatting, and instantly download a high-resolution PDF document with zero server uploads.';

  const [text, setText] = useState<string>(isAr ? defaultSampleAr : defaultSampleEn);
  const [docTitle, setDocTitle] = useState<string>(isAr ? 'مستند' : 'Document');
  const [fontSize, setFontSize] = useState<number>(14);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [margin, setMargin] = useState<number>(20);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    // If text matches the other language's default, switch it
    if (text === defaultSampleAr && !isAr) {
      setText(defaultSampleEn);
      setDocTitle('Document');
    } else if (text === defaultSampleEn && isAr) {
      setText(defaultSampleAr);
      setDocTitle('مستند');
    }
  }, [isAr]);

  const handleGeneratePdf = async () => {
    if (!text.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      // Check if text is predominantly RTL
      const hasArabic = /[\u0600-\u06FF\u0750-\u077F]/.test(text);
      const isLandscape = orientation === 'l';

      // A4 at 150 DPI
      const canvasWidth = isLandscape ? 1754 : 1240;
      const canvasHeight = isLandscape ? 1240 : 1754;

      // Scale factors from mm to px
      const scale = canvasWidth / (isLandscape ? 297 : 210);
      const marginPx = margin * scale;
      const contentWidthPx = canvasWidth - marginPx * 2;
      const contentHeightPx = canvasHeight - marginPx * 2;

      const fontPx = Math.round(fontSize * (scale / 2.83)); // pt to px
      const lineHeightPx = Math.round(fontPx * 1.6);

      // Create measurement canvas
      const measureCanvas = document.createElement('canvas');
      const measureCtx = measureCanvas.getContext('2d');
      if (!measureCtx) throw new Error('Canvas not supported');

      const fontDeclaration = `${fontPx}px 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      measureCtx.font = fontDeclaration;

      // Word wrapping
      const rawLines = text.split('\n');
      const wrappedLines: string[] = [];

      for (const rawLine of rawLines) {
        if (rawLine === '') {
          wrappedLines.push('');
          continue;
        }

        const words = rawLine.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = measureCtx.measureText(testLine).width;

          if (testWidth > contentWidthPx && currentLine) {
            wrappedLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          wrappedLines.push(currentLine);
        }
      }

      // Group lines into pages
      const linesPerPage = Math.max(1, Math.floor(contentHeightPx / lineHeightPx));
      const pages: string[][] = [];
      for (let i = 0; i < wrappedLines.length; i += linesPerPage) {
        pages.push(wrappedLines.slice(i, i + linesPerPage));
      }
      if (pages.length === 0) pages.push(['']);

      // Setup jsPDF
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidthMm = isLandscape ? 297 : 210;
      const pdfHeightMm = isLandscape ? 210 : 297;

      for (let pIdx = 0; pIdx < pages.length; pIdx++) {
        if (pIdx > 0) {
          pdf.addPage('a4', isLandscape ? 'landscape' : 'portrait');
        }

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = canvasHeight;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Text setup
        ctx.fillStyle = '#0f172a';
        ctx.font = fontDeclaration;
        ctx.textBaseline = 'top';

        const pageLines = pages[pIdx];
        let y = marginPx;

        for (const line of pageLines) {
          if (line !== '') {
            const lineHasRtl = /[\u0600-\u06FF]/.test(line);
            if (lineHasRtl || (hasArabic && isAr)) {
              ctx.direction = 'rtl';
              ctx.textAlign = 'right';
              ctx.fillText(line, canvasWidth - marginPx, y);
            } else {
              ctx.direction = 'ltr';
              ctx.textAlign = 'left';
              ctx.fillText(line, marginPx, y);
            }
          }
          y += lineHeightPx;
        }

        // Page number footer
        ctx.font = `${Math.round(fontPx * 0.75)}px sans-serif`;
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.direction = 'ltr';
        ctx.fillText(`${pIdx + 1} / ${pages.length}`, canvasWidth / 2, canvasHeight - marginPx / 2);

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm);
      }

      const cleanTitle = docTitle.trim().replace(/[^a-zA-Z0-9_\u0600-\u06FF-]/g, '_') || 'document';
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      triggerDownload(blobUrl, `${cleanTitle}.pdf`);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err: any) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="text-to-pdf"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المستندات' : 'Document Tools', item: 'https://www.sahlino.tech/categories/document-tools' },
          { name: isAr ? 'تحويل النص إلى PDF' : 'Text to PDF', item: 'https://www.sahlino.tech/text-to-pdf' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المستندات و PDF' : 'Document Tools', href: '/categories/document-tools' },
            { label: isAr ? 'تحويل النص إلى PDF' : 'Text to PDF Converter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'تحويل النصوص والمذكرات إلى ملف PDF' : 'Text to PDF Converter Online'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'اكتب أو الصق أي نص أو مقال وحوله إلى مستند PDF فائق الوضوح يدعم اللغة العربية والإنجليزية وتخصيص الهوامش بالكامل'
              : 'Convert plain text, notes, and articles into clean, printable PDF documents with full Arabic & multilingual support'}
          </p>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'اسم المستند' : 'File Name'}
            </label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'حجم الخط' : 'Font Size'}
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <option value={11}>{isAr ? '11 pt (صغير)' : '11 pt (Small)'}</option>
              <option value={14}>{isAr ? '14 pt (قياسي)' : '14 pt (Standard)'}</option>
              <option value={16}>{isAr ? '16 pt (متوسط)' : '16 pt (Medium)'}</option>
              <option value={18}>{isAr ? '18 pt (كبير)' : '18 pt (Large)'}</option>
              <option value={22}>{isAr ? '22 pt (عريض)' : '22 pt (Extra Large)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'اتجاه الصفحة' : 'Orientation'}
            </label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as any)}
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <option value="p">{isAr ? 'عمودي (Portrait)' : 'Portrait'}</option>
              <option value="l">{isAr ? 'أفقي (Landscape)' : 'Landscape'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'الهامش (ملم)' : 'Margin (mm)'}
            </label>
            <input
              type="number"
              min="5"
              max="40"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
            />
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            {isAr ? 'محتوى النص' : 'Document Text Content'}
          </label>
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isAr ? 'اكتب أو الصق النص هنا...' : 'Type or paste your text here...'}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500 font-sans"
          />
        </div>

        <button
          onClick={handleGeneratePdf}
          disabled={!text.trim() || isGenerating}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          <span>{isGenerating ? (isAr ? 'جارٍ إنشاء PDF...' : 'Generating PDF...') : (isAr ? 'توليد وتحميل مستند PDF' : 'Generate & Download PDF')}</span>
        </button>
      </div>

      <RelatedArticlesSection toolSlug="text-to-pdf" onNavigate={onNavigate} />
    </div>
  );
};
