import React, { useState, useRef, useEffect } from 'react';
import {
  Crop,
  Download,
  RotateCw,
  Upload,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

export const ImageCropperTool: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('image-cropper') || {
    slug: 'image-cropper',
    name: 'Image Cropper',
    description: 'Crop images with preset aspect ratios (1:1, 4:3, 16:9, circular) or custom box cropping online.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    seoTitle: 'Image Cropper Online - Free Photo Crop & Trim Tool',
    seoDescription: 'Crop JPG, PNG, and WebP images online for free. Custom aspect ratios, circular avatar crop, and instant download.',
    faqs: [],
  };

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(1); // 1 = 1:1, 16/9, 4/3, null = free
  const [rotation, setRotation] = useState<number>(0);
  const [isCircular, setIsCircular] = useState<boolean>(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  // Crop area in percentage (0 to 100)
  const [cropBox, setCropBox] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });

  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setCroppedImageUrl(null);
    setRotation(0);
    setCropBox({ x: 10, y: 10, width: 80, height: 80 });
  };

  const setRatio = (ratio: number | null, circular = false) => {
    setAspectRatio(ratio);
    setIsCircular(circular);

    if (ratio === 1 || circular) {
      setCropBox({ x: 15, y: 15, width: 70, height: 70 });
    } else if (ratio === 16 / 9) {
      setCropBox({ x: 10, y: 20, width: 80, height: 45 });
    } else if (ratio === 4 / 3) {
      setCropBox({ x: 15, y: 15, width: 70, height: 52.5 });
    } else {
      setCropBox({ x: 10, y: 10, width: 80, height: 80 });
    }
  };

  const executeCrop = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;

    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / 100;
    const scaleY = img.naturalHeight / 100;

    const cropX = cropBox.x * scaleX;
    const cropY = cropBox.y * scaleY;
    const cropW = cropBox.width * scaleX;
    const cropH = cropBox.height * scaleY;

    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isCircular) {
      ctx.beginPath();
      ctx.arc(cropW / 2, cropH / 2, Math.min(cropW, cropH) / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const dataUrl = canvas.toDataURL('image/png');
    setCroppedImageUrl(dataUrl);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/image-cropper"
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('image-tools', 'Image Tools'),
            onClick: () => onNavigate('/categories/image-tools'),
          },
          { label: getToolName('image-cropper', toolData.name) },
        ]}
      />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName('image-cropper', toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc('image-cropper', toolData.description)}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        {!imageSrc ? (
          <label className="block border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-500 rounded-3xl p-12 text-center cursor-pointer bg-indigo-50/30 dark:bg-indigo-950/20 transition-all group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t('imageCropper.selectImage', 'Select an image to crop')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('imageCropper.supports', 'Supports JPG, PNG, WebP • 100% in-browser processing')}
            </p>
          </label>
        ) : (
          <div>
            {/* Aspect Ratio Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setRatio(1, false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    aspectRatio === 1 && !isCircular
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t('imageCropper.square', '1:1 Square')}
                </button>
                <button
                  onClick={() => setRatio(1, true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isCircular
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t('imageCropper.circle', 'Circle Avatar')}
                </button>
                <button
                  onClick={() => setRatio(16 / 9, false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    aspectRatio === 16 / 9
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t('imageCropper.landscape', '16:9 Landscape')}
                </button>
                <button
                  onClick={() => setRatio(4 / 3, false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    aspectRatio === 4 / 3
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t('imageCropper.standard', '4:3 Standard')}
                </button>
                <button
                  onClick={() => setRatio(null, false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    aspectRatio === null && !isCircular
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {t('imageCropper.freeform', 'Freeform')}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span>{t('imageCropper.changeImage', 'Change Image')}</span>
                </label>
              </div>
            </div>

            {/* Interactive Preview Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex justify-center bg-slate-100 dark:bg-slate-950 p-4 rounded-2xl relative overflow-hidden">
                <div className="relative inline-block max-w-full">
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Source to crop"
                    className="max-h-96 max-w-full block rounded-lg select-none"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />

                  {/* Crop overlay highlight */}
                  <div
                    className={`absolute border-2 border-indigo-500 shadow-2xl pointer-events-none transition-all ${
                      isCircular ? 'rounded-full' : 'rounded-lg'
                    }`}
                    style={{
                      left: `${cropBox.x}%`,
                      top: `${cropBox.y}%`,
                      width: `${cropBox.width}%`,
                      height: `${cropBox.height}%`,
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
                    }}
                  />
                </div>
              </div>

              {/* Adjustments & Result */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t('imageCropper.fineTune', 'Fine Tune Crop Box')}
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                      {t('imageCropper.boxDimensions', 'Box Width & Height')} ({cropBox.width}%)
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={cropBox.width}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCropBox((prev) => ({
                          ...prev,
                          width: val,
                          height: aspectRatio ? val * (1 / (aspectRatio || 1)) : prev.height,
                        }));
                      }}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <button
                    onClick={executeCrop}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Crop className="w-4 h-4" />
                    <span>{t('imageCropper.applyCrop', 'Apply & Preview Crop')}</span>
                  </button>
                </div>

                {croppedImageUrl && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3 shadow-xs">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      {t('imageCropper.croppedOutput', 'Cropped Output')}
                    </span>
                    <img
                      src={croppedImageUrl}
                      alt="Cropped Preview"
                      className={`max-h-48 mx-auto object-contain border border-slate-200 dark:border-slate-700 ${
                        isCircular ? 'rounded-full' : 'rounded-xl'
                      }`}
                    />
                    <a
                      href={croppedImageUrl}
                      download="cropped-sahlino.png"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t('imageCropper.downloadCropped', 'Download Cropped Photo')}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <FAQSection faqs={toolData.faqs || []} />
      <RelatedTools
        currentSlug="image-cropper"
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
