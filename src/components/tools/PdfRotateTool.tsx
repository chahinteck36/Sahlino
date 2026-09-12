import React, { useState } from 'react';
import { RotateCw, Upload, FileText, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { triggerDownload } from '../../utils/numberUtils';

interface PdfRotateToolProps {
  onNavigate: (path: string) => void;
}

export const PdfRotateTool: React.FC<PdfRotateToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [scope, setScope] = useState<'all' | 'odd' | 'even'>('all');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setDownloadUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setFile(selected);
      setTotalPages(pdf.getPageCount());
    } catch {
      setErrorMsg(isAr ? 'تعذر قراءة ملف PDF.' : 'Failed to read PDF file.');
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = doc.getPages();

      pages.forEach((page, idx) => {
        const pageNum = idx + 1;
        let shouldRotate = true;
        if (scope === 'odd' && pageNum % 2 === 0) shouldRotate = false;
        if (scope === 'even' && pageNum % 2 !== 0) shouldRotate = false;

        if (shouldRotate) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + rotationAngle) % 360));
        }
      });

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      setErrorMsg(err.message || (isAr ? 'حدث خطأ أثناء تدوير الملف' : 'Failed to rotate PDF'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadFile = () => {
    if (!downloadUrl || !file) return;
    const filename = `rotated_${file.name.replace(/\.pdf$/i, '')}.pdf`;
    triggerDownload(downloadUrl, filename);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="pdf-rotate"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات المستندات' : 'Document Tools', item: 'https://www.sahlino.tech/categories/document-tools' },
          { name: isAr ? 'تدوير PDF' : 'Rotate PDF', item: 'https://www.sahlino.tech/pdf-rotate' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات المستندات و PDF' : 'Document Tools', href: '/categories/document-tools' },
            { label: isAr ? 'تدوير صفحات PDF' : 'Rotate PDF Pages' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <RotateCw className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'تدوير صفحات PDF وتصحيح الاتجاه' : 'Rotate PDF Pages Online'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'قم بتدوير صفحات PDF المقلوبة بمقدار 90 أو 180 أو 270 درجة وحفظها فوراً بجودة أصلية كاملة'
              : 'Permanently rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees in browser'}
          </p>
        </div>

        {!file ? (
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'اختر ملف PDF لتدويره' : 'Select a PDF file to rotate'}
            </span>
            <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{file.name}</h3>
                  <span className="text-xs text-slate-500">{totalPages} {isAr ? 'صفحة' : 'pages'}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs text-rose-600 hover:text-rose-700 cursor-pointer font-semibold"
              >
                {isAr ? 'تغيير الملف' : 'Change File'}
              </button>
            </div>

            {/* Rotation Angle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'زاوية التدوير' : 'Rotation Angle'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { angle: 90, label: isAr ? '90° (مع عقارب الساعة)' : '90° (Clockwise)' },
                  { angle: 180, label: isAr ? '180° (عكس رأساً على عقب)' : '180° (Upside-Down)' },
                  { angle: 270, label: isAr ? '270° (عكس عقارب الساعة)' : '270° (Counter-Clockwise)' },
                ].map((item) => (
                  <button
                    key={item.angle}
                    onClick={() => setRotationAngle(item.angle)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      rotationAngle === item.angle
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'نطاق التطبيق' : 'Apply To'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'all', label: isAr ? 'جميع الصفحات' : 'All Pages' },
                  { id: 'odd', label: isAr ? 'الصفحات الفردية فقط' : 'Odd Pages Only' },
                  { id: 'even', label: isAr ? 'الصفحات الزوجية فقط' : 'Even Pages Only' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScope(s.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      scope === s.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRotate}
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RotateCw className="w-4 h-4" />}
                <span>{isProcessing ? (isAr ? 'جارٍ التدوير...' : 'Rotating...') : (isAr ? 'تدوير الملف وحفظه' : 'Rotate and Save PDF')}</span>
              </button>

              {downloadUrl && (
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل الملف المدور' : 'Download Rotated PDF'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <RelatedArticlesSection toolSlug="pdf-rotate" onNavigate={onNavigate} />
    </div>
  );
};
