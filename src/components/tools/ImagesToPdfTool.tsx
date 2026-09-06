import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  FileImage,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface ImageItem {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
}

export const ImagesToPdfTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const { activeColorConfig } = useTheme();
  const toolData = getToolBySlug('images-to-pdf') || {
    slug: 'images-to-pdf',
    name: 'Images to PDF Converter',
    description: 'Convert JPG, PNG, and WebP photos into a clean PDF document directly in your browser.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    seoTitle: 'Images to PDF Online - Free JPG & PNG to PDF Converter',
    seoDescription: 'Convert multiple photos, scans, and screenshots into a single PDF document in seconds with 100% in-browser privacy.',
    faqs: [],
  };

  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [margin, setMargin] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selected = Array.from(e.target.files) as File[];
    const valid = selected.filter((f) => f.type.startsWith('image/'));

    if (valid.length === 0) {
      setErrorMsg('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    const items: ImageItem[] = valid.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      file: f,
      name: f.name,
      size: f.size,
      previewUrl: URL.createObjectURL(f),
    }));

    setImages((prev) => [...prev, ...items]);
    setErrorMsg(null);
    setPdfBlobUrl(null);
    e.target.value = '';
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const doc = new jsPDF({
        orientation,
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage('a4', orientation);

        const imgItem = images[i];
        const img = new Image();
        img.src = imgItem.previewUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Compute aspect ratio fitting
        const availableW = pageWidth - margin * 2;
        const availableH = pageHeight - margin * 2;
        const imgRatio = img.width / img.height;
        const boxRatio = availableW / availableH;

        let renderW = availableW;
        let renderH = availableH;

        if (imgRatio > boxRatio) {
          renderH = availableW / imgRatio;
        } else {
          renderW = availableH * imgRatio;
        }

        const posX = margin + (availableW - renderW) / 2;
        const posY = margin + (availableH - renderH) / 2;

        // Render to canvas to get standardized JPEG data url for jsPDF
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          doc.addImage(dataUrl, 'JPEG', posX, posY, renderW, renderH);
        }
      }

      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(url);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('An error occurred during PDF generation. Please try with different images.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/images-to-pdf"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('document-tools', 'Document & PDF Tools'),
            onClick: () => onNavigate('/categories/document-tools'),
          },
          { label: getToolName('images-to-pdf', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('images-to-pdf', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('images-to-pdf', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8">
        {/* Upload box */}
        <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-3xl p-8 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/20 transition-all group">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeColorConfig.gradientClass} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md`}>
            <Upload className="w-8 h-8" />
          </div>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            {t('imagesToPdf.dropzone', 'Click to upload or drag & drop images (JPG, PNG, WebP)')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('imagesToPdf.dropzoneSub', 'Reorder images to set page order in the resulting PDF')}
          </p>
        </label>

        {/* Options */}
        {images.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('imagesToPdf.orientation', 'Page Orientation')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrientation('p')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      orientation === 'p'
                        ? `${activeColorConfig.primaryBgClass} text-white shadow-sm`
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t('imagesToPdf.portrait', 'Portrait')}
                  </button>
                  <button
                    onClick={() => setOrientation('l')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      orientation === 'l'
                        ? `${activeColorConfig.primaryBgClass} text-white shadow-sm`
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t('imagesToPdf.landscape', 'Landscape')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('imagesToPdf.margins', 'Page Margins')}: {margin} mm
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Images Grid */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>{images.length} {t('pdfMerge.filesSelected', 'files selected')}</span>
                <button
                  onClick={() => setImages([])}
                  className="text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer font-bold"
                >
                  {t('pdfMerge.clearAll', 'Clear All')}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 p-2"
                  >
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 rounded-2xl">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded-md bg-white/80 hover:bg-white text-slate-900 disabled:opacity-30 cursor-pointer"
                        title={t('pdfMerge.moveUp', 'Move Up')}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === images.length - 1}
                        className="p-1 rounded-md bg-white/80 hover:bg-white text-slate-900 disabled:opacity-30 cursor-pointer"
                        title={t('pdfMerge.moveDown', 'Move Down')}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeImage(img.id)}
                        className="p-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                        title={t('pdfMerge.remove', 'Remove')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate mt-1 text-center">
                      {img.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={convertToPdf}
                disabled={isProcessing || images.length === 0}
                className={`inline-flex items-center gap-2 px-6 py-3 ${activeColorConfig.primaryBgClass} disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer transition-all`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? t('imagesToPdf.converting', 'Generating PDF in browser...') : t('imagesToPdf.convertBtn', 'Convert Images to PDF Now')}</span>
              </button>

              {pdfBlobUrl && (
                <a
                  href={pdfBlobUrl}
                  download="images-sahlino.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('imagesToPdf.download', 'Download PDF Document')}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="images-to-pdf"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
