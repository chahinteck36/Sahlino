import React, { useState } from 'react';
import { FileText, Download, Settings2, FileType, Check } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface TextToPdfToolProps {
  onNavigate: (path: string) => void;
}

export const TextToPdfTool: React.FC<TextToPdfToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [text, setText] = useState<string>(
    'Welcome to Sahlino!\n\nThis is a sample document generated directly in your browser. You can type or paste any notes, essay, code, or article, customize formatting, and instantly download a high-resolution PDF without sending your data to any remote server.'
  );
  const [docTitle, setDocTitle] = useState<string>('Document');
  const [fontSize, setFontSize] = useState<number>(12);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [margin, setMargin] = useState<number>(15);

  const handleGeneratePdf = () => {
    if (!text.trim()) return;

    const doc = new jsPDF({
      orientation: orientation === 'p' ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - margin * 2;

    doc.setFontSize(fontSize);

    // Split text to fit page width
    const lines = doc.splitTextToSize(text, maxLineWidth);
    let cursorY = margin + 5;
    const lineHeight = fontSize * 0.45;

    lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin + 5;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    const filename = `${docTitle.trim().replace(/[^a-zA-Z0-9_\u0600-\u06FF-]/g, '_') || 'document'}.pdf`;
    doc.save(filename);
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
              ? 'اكتب أو الصق أي نص أو مقال وحوله إلى مستند PDF قابل للطباعة مع تحكم بحجم الخط والهوامش'
              : 'Convert plain text, notes, and articles into clean, formatted printable PDF documents'}
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
              {isAr ? 'حجم الخط' : 'Font Size (pt)'}
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <option value={10}>10 pt (صغير)</option>
              <option value={12}>12 pt (قياسي)</option>
              <option value={14}>14 pt (متوسط)</option>
              <option value={16}>16 pt (كبير)</option>
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
          disabled={!text.trim()}
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isAr ? 'توليد وتحميل مستند PDF' : 'Generate and Download PDF'}</span>
        </button>
      </div>

      <RelatedArticlesSection toolSlug="text-to-pdf" onNavigate={onNavigate} />
    </div>
  );
};
