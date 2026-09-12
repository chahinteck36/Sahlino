import React, { useState } from 'react';
import { Scissors, Upload, FileText, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { toAsciiDigits, triggerDownload } from '../../utils/numberUtils';

interface PdfSplitToolProps {
  onNavigate: (path: string) => void;
}

export const PdfSplitTool: React.FC<PdfSplitToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setDownloadUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg(isAr ? 'يرجى اختيار ملف بصيغة PDF فقط.' : 'Please select a valid PDF file.');
      return;
    }

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setFile(selected);
      setTotalPages(count);
      setPageRange(count > 1 ? `1-${Math.min(count, 3)}` : '1');
    } catch {
      setErrorMsg(isAr ? 'تعذر قراءة ملف PDF. قد يكون محمياً بكلمة مرور.' : 'Failed to read PDF. It may be password protected.');
    }
  };

  const parseRanges = (input: string, max: number): number[] => {
    const pages = new Set<number>();
    const normalized = toAsciiDigits(input);
    const parts = normalized.split(',').map((p) => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr.trim(), 10);
        const end = parseInt(endStr.trim(), 10);
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.max(1, Math.min(start, end));
          const e = Math.min(max, Math.max(start, end));
          for (let i = s; i <= e; i++) pages.add(i);
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= max) {
          pages.add(page);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || totalPages === 0) return;
    setIsProcessing(true);
    setErrorMsg(null);
    setDownloadUrl(null);

    try {
      const targetPages = parseRanges(pageRange, totalPages);
      if (targetPages.length === 0) {
        setErrorMsg(isAr ? 'يرجى تحديد أرقام صفحات صالحة من 1 إلى ' + totalPages : 'Please provide valid page numbers from 1 to ' + totalPages);
        setIsProcessing(false);
        return;
      }

      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      // pdf-lib indices are 0-based
      const indices = targetPages.map((p) => p - 1);
      const copiedPages = await newDoc.copyPages(srcDoc, indices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      setErrorMsg(err.message || (isAr ? 'حدث خطأ أثناء استخراج الصفحات' : 'Failed to split PDF'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadFile = () => {
    if (!downloadUrl || !file) return;
    const filename = `split_${file.name.replace(/\.pdf$/i, '')}.pdf`;
    triggerDownload(downloadUrl, filename);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="pdf-split"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المستندات' : 'Document Tools', item: 'https://www.sahlino.tech/categories/document-tools' },
          { name: isAr ? 'تقسيم PDF' : 'Split PDF', item: 'https://www.sahlino.tech/pdf-split' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المستندات و PDF' : 'Document Tools', href: '/categories/document-tools' },
            { label: isAr ? 'تقسيم واستخراج صفحات PDF' : 'Split PDF' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Scissors className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'تقسيم واستخراج صفحات PDF' : 'Split PDF & Extract Pages'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'استخرج صفحات معينة من ملف PDF أو قسّم الملف إلى صفحات منفصلة داخل متصفحك بأمان تام 100%'
              : 'Extract specific pages or page ranges from PDF files directly in your browser with 100% privacy'}
          </p>
        </div>

        {/* Upload Box */}
        {!file ? (
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'اختر ملف PDF أو اسحبه وأفلته هنا' : 'Choose a PDF file or drag & drop here'}
            </span>
            <span className="text-xs text-slate-400">
              {isAr ? 'يتم فحص وتقسيم الملف محلياً دون رفعه إلى أي خادم' : 'Processed locally in your browser — zero server uploads'}
            </span>
            <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{file.name}</h3>
                  <span className="text-xs text-slate-500">
                    {isAr ? `إجمالي الصفحات: ${totalPages} صفحة` : `Total Pages: ${totalPages}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setTotalPages(0);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                {isAr ? 'تغيير الملف' : 'Change File'}
              </button>
            </div>

            {/* Range Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isAr ? 'الصفحات المراد استخراجها (مثال: 1-3, 5)' : 'Pages to Extract (e.g. 1-3, 5)'}
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="1-3, 5"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setPageRange('1')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer font-medium"
                >
                  {isAr ? 'الصفحة الأولى فقط' : 'First Page'}
                </button>
                {totalPages >= 3 && (
                  <button
                    type="button"
                    onClick={() => setPageRange(`1-${Math.min(totalPages, 3)}`)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer font-medium"
                  >
                    {isAr ? 'أول 3 صفحات (1-3)' : 'First 3 Pages'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPageRange(`1-${totalPages}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer font-medium"
                >
                  {isAr ? `كل الصفحات (1-${totalPages})` : `All Pages (1-${totalPages})`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const odds: number[] = [];
                    for (let i = 1; i <= totalPages; i += 2) odds.push(i);
                    setPageRange(odds.join(', '));
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer font-medium"
                >
                  {isAr ? 'الصفحات الفردية' : 'Odd Pages'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const evens: number[] = [];
                    for (let i = 2; i <= totalPages; i += 2) evens.push(i);
                    setPageRange(evens.join(', '));
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer font-medium"
                >
                  {isAr ? 'الصفحات الزوجية' : 'Even Pages'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {isAr
                  ? `أدخل أرقام الصفحات مفصولة بفواصل أو نطاقات مثل: 1-${Math.min(totalPages, 5)}`
                  : `Enter comma-separated page numbers or ranges between 1 and ${totalPages}`}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSplit}
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-60"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
                <span>{isProcessing ? (isAr ? 'جارٍ الاستخراج...' : 'Extracting...') : (isAr ? 'استخراج الصفحات' : 'Extract Pages')}</span>
              </button>

              {downloadUrl && (
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل الملف المستخرج' : 'Download Extracted PDF'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <RelatedArticlesSection toolSlug="pdf-split" onNavigate={onNavigate} />
    </div>
  );
};
