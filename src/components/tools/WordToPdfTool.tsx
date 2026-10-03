import { getToolBySlug } from '../../data/tools';
import { FAQSection } from '../common/FAQSection';
import { ToolGuideSection } from '../common/ToolGuideSection';
import { RelatedTools } from '../common/RelatedTools';
import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Download,
  Settings,
  Eye,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileCode,
  Layers,
} from 'lucide-react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { parseWordDocument } from '../../utils/wordParser';

interface WordToPdfToolProps {
  onNavigate: (path: string) => void;
}

export const WordToPdfTool: React.FC<WordToPdfToolProps> = ({ onNavigate }) => {
  const { language, isRTL } = useLanguage();
  const toolData = getToolBySlug('word-to-pdf');
  const isAr = language === 'ar';
  const isRtl = isRTL;

  // File & Document State
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string>('');
  const [extractedHtml, setExtractedHtml] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parseWarning, setParseWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'text'>('preview');

  // PDF Layout Options
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [fontSize, setFontSize] = useState<number>(14);
  const [margin, setMargin] = useState<number>(20);
  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample document to allow instant testing
  const loadSampleDocument = () => {
    const sampleArTitle = 'تقرير_المشروع_ساهلينو.docx';
    const sampleEnTitle = 'Sahlino_Project_Report.docx';
    const sampleTitle = isAr ? 'تقرير ومستند تجريبي' : 'Project Summary Report';

    const sampleArText = `تقرير إنجاز مشروع وتوثيق تقني
منصة ساهلينو للأدوات الرقمية

1. المقدمة والأهداف العامة
يهدف هذا المستند إلى توثيق إنجازات مرحلة التطوير التقني الأولى لمنصة ساهلينو (Sahlino)، والتي صُممت لتوفير أدوات متصفح عالية الأداء بدون إرسال البيانات إلى خوادم خارجية، مع ضمان الخصوصية التامة للمستخدمين وسرعة الاستجابة.

2. الميزات الرئيسية للمنصة
• معالجة محلية بنسبة 100%: تتم جميع عمليات التحويل والضغط والحسابات داخل المتصفح.
• دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (RTL).
• توافق شامل مع كافة أحجام الشاشات والأجهزة اللوحية والهواتف الذكية.
• واجهة عصرية وسريعة خالية من الإعلانات المزعجة أو متطلبات تسجيل الحساب.

3. خطة العمل والتوصيات المستقبلية
نوصي بالاستمرار في توسيع نطاق أدوات المستندات وتحويل الصيغ وإضافة المزيد من الأدلة الإرشادية والشروحات التفاعلية في مركز المعرفة لمساعدة المستخدمين في إنجاز أعمالهم اليومية بيسر وسهولة.

تاريخ التقرير: سبتمبر 2026
إعداد: فريق تطوير ساهلينو التقني`;

    const sampleEnText = `Executive Project Report & Documentation
Sahlino Digital Tools Platform

1. Introduction and Core Objectives
This document summarizes the technical achievements and architectural milestones of the Sahlino browser tools suite. The platform is designed to provide high-performance client-side digital utilities with zero remote server data uploads, ensuring strict privacy and instant speed.

2. Key Platform Highlights
• 100% Client-Side Processing: All file conversions, image compression, and calculations happen inside the user's browser.
• Full internationalization support with native Right-to-Left (RTL) and Arabic typography.
• Responsive design optimized across mobile phones, tablets, and ultra-wide desktop monitors.
• Zero mandatory registrations, subscriptions, or intrusive third-party trackers.

3. Next Steps & Recommendations
Continue expanding the document conversion pipeline, adding deeper file format transformations, and publishing actionable step-by-step guides in the Knowledge Center.

Report Date: September 2026
Prepared by: Sahlino Technical Team`;

    const textToUse = isAr ? sampleArText : sampleEnText;
    setFileName(isAr ? sampleArTitle : sampleEnTitle);
    setFileSize('24.5 KB');
    setDocumentTitle(sampleTitle);
    setExtractedText(textToUse);
    setExtractedHtml(`
      <h1 style="color:#0f172a; font-size: 1.5rem; margin-bottom: 0.5rem; font-weight: bold;">${isAr ? 'تقرير إنجاز مشروع وتوثيق تقني' : 'Executive Project Report & Documentation'}</h1>
      <p style="color:#64748b; font-weight: 600; margin-bottom: 1.5rem;">${isAr ? 'منصة ساهلينو للأدوات الرقمية' : 'Sahlino Digital Tools Platform'}</p>
      <h2 style="color:#1e293b; font-size: 1.2rem; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: bold;">${isAr ? '1. المقدمة والأهداف العامة' : '1. Introduction and Core Objectives'}</h2>
      <p style="line-height: 1.7; margin-bottom: 1rem;">${isAr ? 'يهدف هذا المستند إلى توثيق إنجازات مرحلة التطوير التقني الأولى لمنصة ساهلينو (Sahlino)، والتي صُممت لتوفير أدوات متصفح عالية الأداء بدون إرسال البيانات إلى خوادم خارجية، مع ضمان الخصوصية التامة للمستخدمين وسرعة الاستجابة.' : 'This document summarizes the technical achievements and architectural milestones of the Sahlino browser tools suite. The platform is designed to provide high-performance client-side digital utilities with zero remote server data uploads, ensuring strict privacy and instant speed.'}</p>
      <h2 style="color:#1e293b; font-size: 1.2rem; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: bold;">${isAr ? '2. الميزات الرئيسية للمنصة' : '2. Key Platform Highlights'}</h2>
      <ul style="padding-right: 1.2rem; padding-left: 1.2rem; margin-bottom: 1rem; line-height: 1.7;">
        <li>${isAr ? 'معالجة محلية بنسبة 100%: تتم جميع عمليات التحويل والضغط والحسابات داخل المتصفح.' : '100% Client-Side Processing: All conversions happen inside the browser.'}</li>
        <li>${isAr ? 'دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (RTL).' : 'Full internationalization support with native Right-to-Left (RTL) rendering.'}</li>
        <li>${isAr ? 'توافق شامل مع كافة أحجام الشاشات والأجهزة الذكية.' : 'Responsive layout across mobile, tablet, and desktop.'}</li>
      </ul>
      <h2 style="color:#1e293b; font-size: 1.2rem; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: bold;">${isAr ? '3. خطة العمل والتوصيات' : '3. Next Steps & Recommendations'}</h2>
      <p style="line-height: 1.7;">${isAr ? 'نوصي بالاستمرار في توسيع نطاق أدوات المستندات ونشر المزيد من الأدلة الإرشادية في مركز المعرفة لمساعدة المستخدمين في إنجاز أعمالهم بيسر وسهولة.' : 'Continue expanding the document conversion pipeline and publishing actionable step-by-step guides in the Knowledge Center.'}</p>
    `);
    setParseError(null);
  };

  // Handle Word File Upload & Parsing
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Reset input value so selecting the same file again triggers onChange
    e.target.value = '';
    processWordFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processWordFile(droppedFile);
    }
  };

  const processWordFile = async (inputFile: File) => {
    setParseError(null);
    setParseWarning(null);
    setIsParsing(true);
    setFileName(inputFile.name);

    // Format file size
    const sizeInKb = (inputFile.size / 1024).toFixed(1);
    setFileSize(
      inputFile.size > 1024 * 1024
        ? `${(inputFile.size / (1024 * 1024)).toFixed(2)} MB`
        : `${sizeInKb} KB`
    );

    // Derive document title from file name
    const cleanTitle = inputFile.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    setDocumentTitle(cleanTitle);

    try {
      const arrayBuffer = await inputFile.arrayBuffer();

      // Robust Word parsing pipeline (DOCX, legacy DOC, RTF, plain text)
      const parseResult = await parseWordDocument(arrayBuffer, isAr);

      if (!parseResult.success) {
        setParseError(
          parseResult.error ||
            (isAr
              ? 'تعذر استخراج نصوص صالحة من هذا الملف. يرجى التأكد من أن المستند بتنسيق docx صالح أو تجربة النموذج التجريبي.'
              : 'Could not extract valid text from this document. Please ensure it is a valid .docx file or try the sample document.')
        );
        setFile(null);
        setExtractedHtml('');
        setExtractedText('');
        setIsParsing(false);
        return;
      }

      setFile(inputFile);
      setExtractedHtml(parseResult.html);
      setExtractedText(parseResult.text);
      if (parseResult.warning) {
        setParseWarning(parseResult.warning);
      }
      setIsParsing(false);
    } catch {
      setParseError(
        isAr
          ? 'حدث خطأ غير متوقع أثناء معالجة المستند. يرجى التأكد من سلامة ملف Word أو تجربة نموذج المستند الجاهز.'
          : 'An unexpected error occurred while reading the Word document. Please ensure the file is valid or try the sample document.'
      );
      setFile(null);
      setIsParsing(false);
    }
  };

  // Generate and Download PDF using Canvas + jsPDF
  const handleGeneratePdf = async () => {
    if (!extractedText.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const isLandscape = orientation === 'l';

      // High-resolution A4 dimensions at 150 DPI
      const canvasWidth = isLandscape ? 1754 : 1240;
      const canvasHeight = isLandscape ? 1240 : 1754;

      const scale = canvasWidth / (isLandscape ? 297 : 210);
      const marginPx = margin * scale;
      const contentWidthPx = canvasWidth - marginPx * 2;
      const contentHeightPx = canvasHeight - marginPx * 2;

      const fontPx = Math.round(fontSize * (scale / 2.83)); // pt to px
      const lineHeightPx = Math.round(fontPx * 1.6);
      const titleFontPx = Math.round(fontPx * 1.5);
      const titleLineHeightPx = Math.round(titleFontPx * 1.5);

      // Create measurement canvas
      const measureCanvas = document.createElement('canvas');
      const measureCtx = measureCanvas.getContext('2d');
      if (!measureCtx) throw new Error('Canvas not supported');

      const fontDeclaration = `${fontPx}px 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      const titleFontDeclaration = `bold ${titleFontPx}px 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

      measureCtx.font = fontDeclaration;

      // Word wrapping logic
      const rawParagraphs = extractedText.split('\n');
      const wrappedLines: { text: string; isTitle?: boolean; isBullet?: boolean }[] = [];

      // Add document title if provided
      if (documentTitle.trim()) {
        measureCtx.font = titleFontDeclaration;
        const titleWords = documentTitle.trim().split(' ');
        let curTitleLine = '';
        for (const w of titleWords) {
          const testLine = curTitleLine ? `${curTitleLine} ${w}` : w;
          if (measureCtx.measureText(testLine).width > contentWidthPx && curTitleLine) {
            wrappedLines.push({ text: curTitleLine, isTitle: true });
            curTitleLine = w;
          } else {
            curTitleLine = testLine;
          }
        }
        if (curTitleLine) {
          wrappedLines.push({ text: curTitleLine, isTitle: true });
        }
        // Blank line after title
        wrappedLines.push({ text: '' });
      }

      measureCtx.font = fontDeclaration;

      for (const p of rawParagraphs) {
        const trimmedP = p.trim();
        if (!trimmedP) {
          wrappedLines.push({ text: '' });
          continue;
        }

        const isBullet = trimmedP.startsWith('•') || trimmedP.startsWith('-') || /^\d+\./.test(trimmedP);
        const words = trimmedP.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = measureCtx.measureText(testLine).width;

          if (testWidth > contentWidthPx && currentLine) {
            wrappedLines.push({ text: currentLine, isBullet });
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          wrappedLines.push({ text: currentLine, isBullet });
        }
      }

      // Paginate lines
      const headerSpacePx = 60;
      const footerSpacePx = showPageNumbers ? 60 : 20;
      const usableHeightPx = contentHeightPx - headerSpacePx - footerSpacePx;
      const linesPerPage = Math.max(1, Math.floor(usableHeightPx / lineHeightPx));

      const pages: { text: string; isTitle?: boolean; isBullet?: boolean }[][] = [];
      let currentPage: { text: string; isTitle?: boolean; isBullet?: boolean }[] = [];

      for (const line of wrappedLines) {
        if (currentPage.length >= linesPerPage) {
          pages.push(currentPage);
          currentPage = [];
        }
        currentPage.push(line);
      }
      if (currentPage.length > 0 || pages.length === 0) {
        pages.push(currentPage);
      }

      // Initialize jsPDF (A4 in mm)
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: 'a4',
      });

      const pdfPageWidthMm = isLandscape ? 297 : 210;
      const pdfPageHeightMm = isLandscape ? 210 : 297;

      for (let pIdx = 0; pIdx < pages.length; pIdx++) {
        if (pIdx > 0) {
          pdf.addPage('a4', orientation);
        }

        const pageLines = pages[pIdx];
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = canvasHeight;

        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        // Clean white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Header line
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(marginPx, marginPx + 40, contentWidthPx, 1);

        // Header title
        ctx.font = `14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'left';
        ctx.fillText('Sahlino Document Converter', marginPx, marginPx + 25);

        // Render page lines
        let currentY = marginPx + headerSpacePx + fontPx;

        for (const lineObj of pageLines) {
          if (!lineObj.text) {
            currentY += Math.round(lineHeightPx * 0.75);
            continue;
          }

          const hasArabic = /[\u0600-\u06FF\u0750-\u077F]/.test(lineObj.text);

          if (lineObj.isTitle) {
            ctx.font = titleFontDeclaration;
            ctx.fillStyle = '#0f172a';
          } else {
            ctx.font = fontDeclaration;
            ctx.fillStyle = '#1e293b';
          }

          if (hasArabic) {
            ctx.textAlign = 'right';
            ctx.fillText(lineObj.text, canvasWidth - marginPx, currentY);
          } else {
            ctx.textAlign = 'left';
            ctx.fillText(lineObj.text, marginPx, currentY);
          }

          currentY += lineObj.isTitle ? titleLineHeightPx : lineHeightPx;
        }

        // Footer & Page Number
        if (showPageNumbers) {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(marginPx, canvasHeight - marginPx - 40, contentWidthPx, 1);

          ctx.font = `14px 'Cairo', 'Tajawal', sans-serif`;
          ctx.fillStyle = '#64748b';
          ctx.textAlign = 'center';
          const pageNumText = isAr
            ? `صفحة ${pIdx + 1} من ${pages.length}`
            : `Page ${pIdx + 1} of ${pages.length}`;
          ctx.fillText(pageNumText, canvasWidth / 2, canvasHeight - marginPx - 15);
        }

        // Convert page canvas to image and add to PDF
        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfPageWidthMm, pdfPageHeightMm, undefined, 'FAST');
      }

      // Download
      const outputName = `${documentTitle.trim().replace(/\s+/g, '_') || 'converted_document'}.pdf`;
      pdf.save(outputName);
    } catch (err: any) {
      console.error('PDF Generation Error:', err);
      alert(isAr ? 'حدث خطأ أثناء إنشاء ملف PDF.' : 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Word count & stats
  const wordCount = extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0;
  const charCount = extractedText.length;
  const estimatedPages = Math.max(1, Math.ceil(wordCount / 350));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      <SEOHead
        toolSlug="word-to-pdf"
        title={isAr ? 'تحويل Word إلى PDF مجاناً وبأعلى جودة | ساهلينو' : 'Word to PDF Converter Online - Free & Private | Sahlino'}
        description={
          isAr
            ? 'حوّل مستندات وورد Word (.docx و .doc) إلى ملفات PDF احترافية قابلة للطباعة بنقرة واحدة داخل متصفحك مع الحفاظ على التنسيق والخصوصية 100%.'
            : 'Convert Microsoft Word (.docx) documents into professional, high-resolution PDF files for free in your browser with 100% privacy.'
        }
        canonicalUrl="https://www.sahlino.tech/word-to-pdf"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المستندات والـ PDF' : 'Document Tools', item: 'https://www.sahlino.tech/categories/document-tools' },
          { name: isAr ? 'محول Word إلى PDF' : 'Word to PDF Converter', item: 'https://www.sahlino.tech/word-to-pdf' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
              { label: isAr ? 'أدوات المستندات والـ PDF' : 'Document Tools', href: '/categories/document-tools' },
              { label: isAr ? 'تحويل Word إلى PDF' : 'Word to PDF' },
            ]}
            onNavigate={onNavigate}
          />
        </div>

        {/* Hero Header */}
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-bold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>{isAr ? 'محول مستندات وورد فائق السرعة' : 'Instant In-Browser DOCX to PDF'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            {isAr ? 'تحويل مستندات Word إلى PDF' : 'Convert Word (.docx) to PDF Online'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'حوّل ملفات Word (.docx) إلى مستندات PDF منسقة ومعدة للطباعة بجودة قياسية. معالجة محلية 100% في ذاكرة جهازك دون رفع ملفاتك إلى أي خادم.'
              : 'Convert your Microsoft Word documents into clean, portable, ready-to-print PDF files. 100% processed in your browser with zero server uploads.'}
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
          {/* Top Upload Zone */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
            {!extractedText ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all bg-slate-50/60 dark:bg-slate-950/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {isParsing ? (
                    <RefreshCw className="w-8 h-8 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {isParsing
                    ? isAr
                      ? 'جارٍ قراءة وفك تشفير مستند Word...'
                      : 'Parsing Word Document...'
                    : isAr
                    ? 'اسحب وأفلت ملف Word هنا، أو انقر للاختيار'
                    : 'Drag and drop your Word file here, or click to browse'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  {isAr
                    ? 'يدعم ملفات Microsoft Word (.docx). يتم فحص وتنسيق المستند فورياً داخل المتصفح.'
                    : 'Supports Microsoft Word (.docx). Fast, private, client-side extraction.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isAr ? 'اختيار ملف Word (.docx)' : 'Select Word File'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      loadSampleDocument();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? 'تجربة نموذج مستند جاهز' : 'Try Sample Document'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                        {fileName}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {fileSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>{wordCount} {isAr ? 'كلمة' : 'words'}</span>
                      <span>•</span>
                      <span>{charCount} {isAr ? 'حرف' : 'characters'}</span>
                      <span>•</span>
                      <span>{isAr ? `نحو ${estimatedPages} صفحة` : `~${estimatedPages} page(s)`}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      setFile(null);
                      setExtractedText('');
                      setExtractedHtml('');
                      setFileName('');
                      setDocumentTitle('');
                      setParseError(null);
                      setParseWarning(null);
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تغيير الملف' : 'Change File'}</span>
                  </button>

                  <button
                    onClick={handleGeneratePdf}
                    disabled={isGenerating}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>{isGenerating ? (isAr ? 'جارٍ التحويل...' : 'Converting...') : (isAr ? 'تنزيل PDF' : 'Download PDF')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Parsing Warning / Format Notice */}
            {parseWarning && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{parseWarning}</p>
              </div>
            )}

            {/* Parsing Error with Quick Recovery Actions */}
            {parseError && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">
                      {isAr ? 'تنبيه بشأن ملف Word' : 'Word Document Notice'}
                    </p>
                    <p className="leading-relaxed text-rose-700 dark:text-rose-300 mb-3">{parseError}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={loadSampleDocument}
                        className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-950/80 text-rose-900 dark:text-rose-200 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isAr ? 'تجربة نموذج مستند جاهز' : 'Try Sample Document'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setParseError(null);
                          fileInputRef.current?.click();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isAr ? 'اختيار ملف DOCX آخر' : 'Choose Another DOCX File'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Document Customization & Preview (Shown when document is loaded) */}
          {extractedText && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Controls Column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? 'إعدادات وتنسيق مستند الـ PDF' : 'PDF Output Settings'}</span>
                  </div>

                  {/* Title Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isAr ? 'عنوان المستند الرئيسي' : 'Document Header Title'}
                    </label>
                    <input
                      type="text"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      placeholder={isAr ? 'عنوان التقرير أو المستند...' : 'Document Title...'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Page Orientation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      {isAr ? 'اتجاه الصفحة' : 'Page Orientation'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrientation('p')}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          orientation === 'p'
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isAr ? 'عمودي (Portrait)' : 'Portrait (A4)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrientation('l')}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          orientation === 'l'
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isAr ? 'أفقي (Landscape)' : 'Landscape (A4)'}
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span>{isAr ? 'حجم الخط' : 'Font Size'}</span>
                      <span className="text-blue-600 dark:text-blue-400">{fontSize} pt</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[12, 14, 16, 18].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFontSize(size)}
                          className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            fontSize === size
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {size} pt
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Margins */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span>{isAr ? 'هوامش الصفحة' : 'Page Margins'}</span>
                      <span className="text-blue-600 dark:text-blue-400">{margin} mm</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: isAr ? 'ضيقة' : 'Compact', val: 15 },
                        { label: isAr ? 'قياسية' : 'Standard', val: 20 },
                        { label: isAr ? 'واسعة' : 'Wide', val: 25 },
                      ].map((m) => (
                        <button
                          key={m.val}
                          type="button"
                          onClick={() => setMargin(m.val)}
                          className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            margin === m.val
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Page numbers checkbox */}
                  <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={showPageNumbers}
                      onChange={(e) => setShowPageNumbers(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                    />
                    <span>{isAr ? 'إدراج أرقام الصفحات في التذييل' : 'Include page numbers in footer'}</span>
                  </label>

                  {/* Convert CTA Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleGeneratePdf}
                      disabled={isGenerating}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      <span>{isGenerating ? (isAr ? 'جارٍ إنشاء ملف PDF...' : 'Generating PDF...') : (isAr ? 'تحويل وتنزيل PDF الآن' : 'Convert & Download PDF')}</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      {isAr ? 'إنشاء فوري بجودة A4 قياسية • مجاني 100%' : 'High-resolution A4 vector PDF • 100% Free'}
                    </p>
                  </div>
                </div>

                {/* Right Preview Column */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {isAr ? 'معاينة محتوى المستند' : 'Document Content Preview'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'preview'
                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {isAr ? 'معاينة منسقة' : 'Formatted'}
                      </button>
                      <button
                        onClick={() => setActiveTab('text')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'text'
                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {isAr ? 'محرر النص' : 'Plain Text'}
                      </button>
                    </div>
                  </div>

                  {activeTab === 'preview' ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[420px] max-h-[560px] overflow-y-auto text-slate-800 dark:text-slate-200 leading-relaxed">
                      {documentTitle && (
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                          {documentTitle}
                        </h2>
                      )}
                      <div
                        className="prose dark:prose-invert max-w-none text-sm sm:text-base space-y-3"
                        dangerouslySetInnerHTML={{ __html: extractedHtml }}
                      />
                    </div>
                  ) : (
                    <div>
                      <textarea
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        rows={16}
                        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder={isAr ? 'النص المستخرج من ملف الوورد...' : 'Extracted Word text...'}
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isAr
                          ? 'يمكنك تعديل أو إضافة أي نصوص مباشرة هنا قبل التنزيل.'
                          : 'You can modify or append text here before generating the PDF.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'خصوصية 100% داخل المتصفح' : '100% In-Browser Privacy'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {isAr
                ? 'يتم فك تشفير مستندات وورد وتنسيقها محلياً بالكامل. ملفاتك وسجلاتك المالية لا تُرفع إلى أي خادم إطلاقاً.'
                : 'Word documents are parsed and converted entirely on your device. Your sensitive files are never uploaded.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'تنسيق قياسي عالي الوضوح' : 'Crisp Vector Output'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {isAr
                ? 'ملفات PDF ناتجة متوافقة مع قياسات A4 القياسية ومعدة للطباعة ومشاركة المعاملات الرسمية.'
                : 'Outputs sharp, standardized A4 PDF files ready for printing and professional submissions.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'دعم العربية واللغات الأجنبية' : 'Bilingual & RTL Ready'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {isAr
                ? 'معالجة ذكية لمحاذاة النصوص من اليمين إلى اليسار (RTL) والحفاظ على ترتيب الكلمات العربية والإنجليزية.'
                : 'Native RTL handling preserves Arabic, English, and multi-language word flow accurately.'}
            </p>
          </div>
        </div>

        {/* Step-by-Step Tutorial & Knowledge Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {isAr ? 'كيف تحول مستند Word إلى PDF بسهولة على ساهلينو؟' : 'How to Convert Word to PDF Step-by-Step'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">1</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isAr ? 'ارفع ملف Word' : 'Upload File'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'اسحب ملف .docx من جهازك أو اختره يدوياً.' : 'Drag and drop your .docx file or select it.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">2</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isAr ? 'معاينة فورية' : 'Live Preview'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'راجع النص والتنسيق المستخرج في نافذة المعاينة.' : 'Inspect the extracted text and structure instantly.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">3</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isAr ? 'تخصيص الإعدادات' : 'Configure Layout'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'اضبط اتجاه الصفحة وحجم الخط والهوامش.' : 'Customize margins, font sizes, and orientation.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">4</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isAr ? 'تنزيل PDF' : 'Download PDF'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'احفظ مستندك بصيغة PDF فوراً دون أي قيود.' : 'Save your converted PDF file directly to your device.'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
              {/* FAQ Section */}
      {/* Educational Guide */}
      <ToolGuideSection toolSlug="word-to-pdf" />

      <FAQSection faqs={toolData?.faqs || []} />

      {/* Internal Linking: Related Tools */}
      {toolData && (
        <RelatedTools
          currentSlug={toolData.slug}
          category={toolData.category}
          categoryName={toolData.categoryName}
          onNavigate={onNavigate}
        />
      )}

      <RelatedArticlesSection toolSlug="word-to-pdf" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
