import React, { useState } from 'react';
import { ArrowLeftRight, Upload, Download, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';

interface ImageConverterToolProps {
  onNavigate: (path: string) => void;
}

export const ImageConverterTool: React.FC<ImageConverterToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<'webp' | 'jpeg' | 'png'>('webp');
  const [quality, setQuality] = useState<number>(0.85);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<string>('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setFileSize((file.size / 1024).toFixed(1) + ' KB');
    setConvertedUrl(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white background for JPEG
      if (targetFormat === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const mime = `image/${targetFormat}`;
      const dataUrl = canvas.toDataURL(mime, quality);
      setConvertedUrl(dataUrl);

      // Estimate size
      const head = `data:${mime};base64,`;
      const sizeBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
      setConvertedSize((sizeBytes / 1024).toFixed(1) + ' KB');
    };
    img.src = imageSrc;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="image-converter"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات الصور' : 'Image Tools', item: 'https://www.sahlino.tech/categories/image-tools' },
          { name: isAr ? 'محول صيغ الصور' : 'Image Converter', item: 'https://www.sahlino.tech/image-converter' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات الصور والتصميم' : 'Image Tools', href: '/categories/image-tools' },
            { label: isAr ? 'محول صيغ الصور (WebP, JPG, PNG)' : 'Image Format Converter' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <ArrowLeftRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'محول صيغ الصور الفوري (WebP, JPG, PNG)' : 'Instant Image Format Converter'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'حول الصور بين WebP و PNG و JPG مع التحكم في جودة الضغط بنقرة واحدة داخل المتصفح'
              : 'Convert photos seamlessly between WebP, PNG, and JPG with instant compression control'}
          </p>
        </div>

        {!imageSrc ? (
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'اختر صورة لتحويلها' : 'Select an image to convert'}
            </span>
            <span className="text-xs text-slate-400">
              {isAr ? 'يدعم PNG, JPG, JPEG, WebP, GIF' : 'Supports PNG, JPG, JPEG, WebP, GIF'}
            </span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="max-h-56 w-full flex items-center justify-center overflow-hidden rounded-xl mb-3">
                  <img src={imageSrc} alt="Source" className="max-h-56 object-contain rounded-lg shadow-xs" />
                </div>
                <div className="flex justify-between w-full text-xs text-slate-500 px-1">
                  <span>{fileName}</span>
                  <span>{fileSize}</span>
                </div>
              </div>

              {/* Conversion Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    {isAr ? 'الصيغة المستهدفة' : 'Target Format'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'webp', label: 'WebP (موصى به)' },
                      { id: 'jpeg', label: 'JPG / JPEG' },
                      { id: 'png', label: 'PNG' },
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setTargetFormat(fmt.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          targetFormat === fmt.id
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {targetFormat !== 'png' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>{isAr ? 'جودة الصورة' : 'Image Quality'}</span>
                      <span className="text-emerald-600 font-mono">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleConvert}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isAr ? 'تحويل الآن' : 'Convert Now'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setImageSrc(null);
                      setConvertedUrl(null);
                    }}
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    {isAr ? 'صورة أخرى' : 'New Image'}
                  </button>
                </div>
              </div>
            </div>

            {/* Converted Result */}
            {convertedUrl && (
              <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                      {isAr ? 'تم التحويل بنجاح!' : 'Converted Successfully!'}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      {isAr ? `الحجم الجديد: ${convertedSize} (${targetFormat.toUpperCase()})` : `New size: ${convertedSize} (${targetFormat.toUpperCase()})`}
                    </p>
                  </div>
                </div>

                <a
                  href={convertedUrl}
                  download={`${fileName}.${targetFormat}`}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل الصورة' : 'Download Image'}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <RelatedArticlesSection toolSlug="image-converter" onNavigate={onNavigate} />
    </div>
  );
};
