import React, { useState } from 'react';
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Upload, Download, Rotate3d, RefreshCw } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { RelatedArticlesSection } from '../common/RelatedArticlesSection';
import { useLanguage } from '../../context/LanguageContext';
import { triggerDownload } from '../../utils/numberUtils';

interface ImageRotateToolProps {
  onNavigate: (path: string) => void;
}

export const ImageRotateTool: React.FC<ImageRotateToolProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const angleRad = (rotation * Math.PI) / 180;
      const is90or270 = rotation % 180 !== 0;

      canvas.width = is90or270 ? img.naturalHeight : img.naturalWidth;
      canvas.height = is90or270 ? img.naturalWidth : img.naturalHeight;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angleRad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      const dataUrl = canvas.toDataURL('image/png');
      triggerDownload(dataUrl, `rotated_${fileName.replace(/\.[^/.]+$/, '') || 'image'}.png`);
    };
    img.src = imageSrc;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOHead
        toolSlug="image-rotate"
        breadcrumbs={[
          { name: isAr ? 'الرئيسية' : 'Home', item: 'https://www.sahlino.tech/' },
          { name: isAr ? 'أدوات الصور' : 'Image Tools', item: 'https://www.sahlino.tech/categories/image-tools' },
          { name: isAr ? 'تدوير وقلب الصور' : 'Rotate Image', item: 'https://www.sahlino.tech/image-rotate' },
        ]}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
            { label: isAr ? 'أدوات الصور والتصميم' : 'Image Tools', href: '/categories/image-tools' },
            { label: isAr ? 'تدوير وقلب الصور' : 'Rotate & Flip Image' },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <RotateCw className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'تدوير وقلب الصور أفقياً وعمودياً' : 'Rotate & Flip Image Online'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'قم بتدوير الصور يميناً أو يساراً وعكس اتجاهها بدون أي فقدان في الدقة والجودة'
              : 'Rotate images clockwise/counter-clockwise and flip horizontally or vertically with zero quality loss'}
          </p>
        </div>

        {!imageSrc ? (
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {isAr ? 'اختر صورة لتدويرها' : 'Select an image to rotate'}
            </span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        ) : (
          <div className="space-y-6">
            {/* Live Interactive Preview Canvas Container */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[300px] overflow-hidden">
              <img
                src={imageSrc}
                alt="Preview"
                className="max-h-72 object-contain transition-transform duration-300 rounded-lg shadow-sm"
                style={{
                  transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                }}
              />
            </div>

            {/* Rotation Status Badge */}
            <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
              <span>{isAr ? 'الزاوية الحالية:' : 'Current Rotation:'} <strong className="text-emerald-600">{rotation}°</strong></span>
              {(flipH || flipV) && (
                <span className="text-emerald-600 font-medium">
                  {flipH && flipV
                    ? (isAr ? 'معكوس أفقياً وعمودياً' : 'Flipped H & V')
                    : flipH
                    ? (isAr ? 'معكوس أفقياً' : 'Flipped Horizontally')
                    : (isAr ? 'معكوس عمودياً' : 'Flipped Vertically')}
                </span>
              )}
            </div>

            {/* Controls Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? '90° يسار' : '90° Left'}</span>
              </button>

              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCw className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? '90° يمين' : '90° Right'}</span>
              </button>

              <button
                onClick={() => setFlipH((f) => !f)}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  flipH
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <FlipHorizontal className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'قلب أفقي' : 'Flip Horizontal'}</span>
              </button>

              <button
                onClick={() => setFlipV((f) => !f)}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  flipV
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <FlipVertical className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'قلب عمودي' : 'Flip Vertical'}</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'حفظ وتحميل الصورة' : 'Download Rotated Image'}</span>
              </button>

              <button
                onClick={() => setImageSrc(null)}
                className="px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                {isAr ? 'صورة جديدة' : 'New Image'}
              </button>
            </div>
          </div>
        )}
      </div>

      <RelatedArticlesSection toolSlug="image-rotate" onNavigate={onNavigate} />
    </div>
  );
};
