import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  FilePlus,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export const PdfMergeTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const { activeColorConfig } = useTheme();
  const toolData = getToolBySlug('pdf-merge') || {
    slug: 'pdf-merge',
    name: 'PDF Merge',
    description: 'Merge multiple PDF documents into a single organized file in seconds directly in your browser.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    seoTitle: 'Merge PDF Online - Free PDF Joiner & Combiner',
    seoDescription: 'Combine multiple PDF files into one document for free. Fast, secure, and 100% in-browser client-side processing.',
    faqs: [],
  };

  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = Array.from(e.target.files) as File[];
    const pdfOnly = selected.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));

    if (pdfOnly.length === 0) {
      setErrorMsg('Please select valid PDF files.');
      return;
    }

    const newItems: PdfFileItem[] = [];
    for (const f of pdfOnly) {
      let pageCount: number | undefined;
      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        pageCount = doc.getPageCount();
      } catch {
        pageCount = undefined;
      }
      newItems.push({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        size: f.size,
        pageCount,
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
    setErrorMsg(null);
    setSuccessMsg(null);
    setMergedBlobUrl(null);
    e.target.value = '';
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMsg('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const bytes = await item.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedBlobUrl(url);
      setSuccessMsg(`Successfully merged ${files.length} PDFs into ${mergedPdf.getPageCount()} pages!`);
    } catch (err: unknown) {
      setErrorMsg('Failed to merge PDFs. Please ensure files are not encrypted or corrupted.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/pdf-merge"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('document-tools', 'Document & PDF Tools'),
            onClick: () => onNavigate('/categories/document-tools'),
          },
          { label: getToolName('pdf-merge', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('pdf-merge', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('pdf-merge', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8">
        {/* Drag and Drop / Select Area */}
        <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-3xl p-8 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/20 transition-all group">
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeColorConfig.gradientClass} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md`}>
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            {t('pdfMerge.dropzone', 'Click to upload or drag & drop PDF files')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('pdfMerge.dropzoneSub', 'Select two or more PDF files to combine them in order (100% browser-based)')}
          </p>
        </label>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>{files.length} {t('pdfMerge.filesSelected', 'files selected')}</span>
              <button
                onClick={() => setFiles([])}
                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer font-bold"
              >
                {t('pdfMerge.clearAll', 'Clear All')}
              </button>
            </div>

            <div className="space-y-2">
              {files.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <FileText className="w-5 h-5 text-rose-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatFileSize(item.size)} {item.pageCount ? `• ${item.pageCount} ${t('pdfMerge.pages', 'pages')}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ms-3">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                      title={t('pdfMerge.moveUp', 'Move Up')}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === files.length - 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                      title={t('pdfMerge.moveDown', 'Move Down')}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                      title={t('pdfMerge.remove', 'Remove')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleMerge}
                disabled={isProcessing || files.length < 2}
                className={`inline-flex items-center gap-2 px-6 py-3 ${activeColorConfig.primaryBgClass} disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer transition-all`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? t('pdfMerge.merging', 'Merging documents in browser...') : t('pdfMerge.mergeBtn', 'Merge PDF Files Now')}</span>
              </button>

              {mergedBlobUrl && (
                <a
                  href={mergedBlobUrl}
                  download="merged-sahlino.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('pdfMerge.download', 'Download Merged PDF')}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Feedback notices */}
        {errorMsg && (
          <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="pdf-merge"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
