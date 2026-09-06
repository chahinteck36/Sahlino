import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Download,
  RotateCcw,
  Lock,
  Unlock,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { FAQSection } from '../common/FAQSection';
import { RelatedTools } from '../common/RelatedTools';
import { getToolBySlug } from '../../data/tools';
import { useLanguage } from '../../context/LanguageContext';

interface ImageResizerToolProps {
  onNavigate: (path: string) => void;
}

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export const ImageResizerTool: React.FC<ImageResizerToolProps> = ({ onNavigate }) => {
  const { t, getToolName, getToolDesc, getCategoryName } = useLanguage();
  const toolData = getToolBySlug('image-resizer')!;

  // Image source state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0); // in bytes

  // Target settings
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(100);
  const [format, setFormat] = useState<OutputFormat>('image/webp');
  const [quality, setQuality] = useState<number>(85); // 10 - 100

  // Output / Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  // Format bytes nicely
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Load a file into memory
  const handleLoadFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP, SVG, etc.).');
      return;
    }

    // Check size (30MB browser practical limit)
    const maxBytes = 30 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage('File exceeds the practical browser limit (30MB). Please select a smaller image for smooth client-side processing.');
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        imageElementRef.current = img;
        setImageSrc(src);
        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);
        setTargetWidth(img.naturalWidth);
        setTargetHeight(img.naturalHeight);
        setPercentage(100);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleLoadFile(e.dataTransfer.files[0]);
    }
  };

  // Sample Image for immediate testing
  const handleLoadSample = () => {
    setErrorMessage(null);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a nice gradient image
      const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(0.5, '#7c3aed');
      gradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 800);

      // Add text & shapes
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sahlino Sample Image', 600, 380);
      ctx.font = '28px system-ui, sans-serif';
      ctx.fillText('1200 x 800 px • Browser-Generated', 600, 440);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'sahlino-sample.jpg', { type: 'image/jpeg' });
          handleLoadFile(file);
        }
      }, 'image/jpeg', 0.95);
    }
  };

  // Handle Width change with aspect ratio
  const handleWidthChange = (val: number) => {
    const w = Math.max(1, Math.round(val));
    setTargetWidth(w);
    if (lockAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.max(1, Math.round(w * ratio)));
      setPercentage(Math.round((w / originalWidth) * 100));
    }
  };

  // Handle Height change with aspect ratio
  const handleHeightChange = (val: number) => {
    const h = Math.max(1, Math.round(val));
    setTargetHeight(h);
    if (lockAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.max(1, Math.round(h * ratio)));
      setPercentage(Math.round((h / originalHeight) * 100));
    }
  };

  // Handle percentage change
  const handlePercentageChange = (pct: number) => {
    setPercentage(pct);
    if (originalWidth > 0 && originalHeight > 0) {
      const factor = pct / 100;
      setTargetWidth(Math.max(1, Math.round(originalWidth * factor)));
      setTargetHeight(Math.max(1, Math.round(originalHeight * factor)));
    }
  };

  // Canvas process image
  const processImage = useCallback(() => {
    if (!imageElementRef.current || targetWidth <= 0 || targetHeight <= 0) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // Give browser a tick to update UI with spinner
    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Canvas 2D context unavailable.');
        }

        // High quality downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image resized
        ctx.drawImage(imageElementRef.current!, 0, 0, targetWidth, targetHeight);

        const qualityFactor = format === 'image/png' ? 1 : quality / 100;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setErrorMessage('Failed to compress image.');
              setIsProcessing(false);
              return;
            }

            if (processedUrl) {
              URL.revokeObjectURL(processedUrl);
            }

            const url = URL.createObjectURL(blob);
            setProcessedUrl(url);
            setProcessedSize(blob.size);
            setIsProcessing(false);
          },
          format,
          qualityFactor
        );
      } catch (err: unknown) {
        setErrorMessage(`Processing error: ${(err as Error).message}`);
        setIsProcessing(false);
      }
    }, 40);
  }, [targetWidth, targetHeight, format, quality, processedUrl]);

  // Trigger process automatically whenever settings change
  useEffect(() => {
    if (imageSrc && targetWidth > 0 && targetHeight > 0) {
      processImage();
    }
  }, [targetWidth, targetHeight, format, quality, imageSrc, processImage]);

  // Reset tool
  const handleReset = () => {
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setImageSrc(null);
    setProcessedUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setOriginalSize(0);
    setTargetWidth(0);
    setTargetHeight(0);
    setProcessedSize(0);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Download output
  const handleDownload = () => {
    if (!processedUrl) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `${fileName}-resized.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savingsPercent =
    originalSize > 0 && processedSize > 0
      ? Math.round(((originalSize - processedSize) / originalSize) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SEOHead
        title={toolData.seoTitle}
        description={toolData.seoDescription}
        canonicalPath="/image-resizer"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Sahlino Image Resizer & Compressor',
          url: 'https://toolora.app/image-resizer',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: toolData.seoDescription,
        }}
      />

      <Breadcrumbs
        items={[
          {
            label: getCategoryName('image-tools', 'Image Tools'),
            onClick: () => onNavigate('/categories/image-tools'),
          },
          { label: getToolName(toolData.slug, toolData.name) },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {getToolName(toolData.slug, toolData.name)}
          </h1>
          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5" /> {t('badge.clientPrivacy', '100% In-Browser Privacy')}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-3xl">
          {getToolDesc(toolData.slug, toolData.description)}
        </p>
      </div>

      {/* Error notification */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-700 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
          <div className="font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Tool Work Area */}
      {!imageSrc ? (
        /* Upload & Dropzone View */
        <div
          id="image-dropzone"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-16 text-center transition-all bg-white dark:bg-slate-900/50 flex flex-col items-center justify-center ${
            isDragOver
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 scale-[0.99]'
              : 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="image-file-input"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleLoadFile(e.target.files[0]);
              }
            }}
          />

          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Drag & Drop an image here, or browse
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Supports JPG, PNG, and WebP up to 30MB. Images are strictly processed in your browser memory for maximum privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              Choose Image File
            </button>
            <button
              onClick={handleLoadSample}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold transition-colors cursor-pointer"
            >
              Try Sample Image
            </button>
          </div>
        </div>
      ) : (
        /* Image Processing View */
        <div className="space-y-6">
          {/* Controls Bar & Status */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md tracking-tight">
                    {fileName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>Original: <strong className="text-slate-700 dark:text-slate-300">{originalWidth} × {originalHeight} px</strong></span>
                    <span>•</span>
                    <span>Original Size: <strong className="text-slate-700 dark:text-slate-300">{formatFileSize(originalSize)}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset / Change</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!processedUrl || isProcessing}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Processed Image</span>
                </button>
              </div>
            </div>

            {/* Adjustments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {/* 1. Dimensions (Width & Height) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Dimensions (px)
                  </label>
                  <button
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                      lockAspectRatio
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                    title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                  >
                    {lockAspectRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    <span>{lockAspectRatio ? 'Locked' : 'Unlocked'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">Width</span>
                    <input
                      type="number"
                      min={1}
                      max={12000}
                      value={targetWidth}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">Height</span>
                    <input
                      type="number"
                      min={1}
                      max={12000}
                      value={targetHeight}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Resize by Percentage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Resize Percentage
                  </label>
                  <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {percentage}%
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => handlePercentageChange(pct)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        percentage === pct
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={5}
                  max={200}
                  value={percentage}
                  onChange={(e) => handlePercentageChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* 3. Output Format */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Output Format
                </label>

                <div className="grid grid-cols-3 gap-1.5">
                  {(['image/webp', 'image/jpeg', 'image/png'] as OutputFormat[]).map((fmt) => {
                    const label = fmt === 'image/webp' ? 'WebP' : fmt === 'image/jpeg' ? 'JPG' : 'PNG';
                    return (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={`py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          format === fmt
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] font-medium text-slate-400">
                  {format === 'image/webp'
                    ? 'Recommended: WebP gives high compression with tiny file size.'
                    : format === 'image/jpeg'
                    ? 'Best for regular photography and social media.'
                    : 'Lossless quality, ideal for logos and graphics.'}
                </p>
              </div>

              {/* 4. Compression / Quality Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Quality / Compression
                  </label>
                  <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {format === 'image/png' ? 'Lossless' : `${quality}%`}
                  </span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  disabled={format === 'image/png'}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-40"
                />

                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Smaller File</span>
                  <span>Higher Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Results Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="font-black uppercase tracking-wider text-[11px] text-slate-900 dark:text-white">
                  Original Image
                </span>
                <span>{originalWidth} × {originalHeight} px • {formatFileSize(originalSize)}</span>
              </div>
              <div className="flex-1 min-h-[300px] rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-3 overflow-hidden border border-slate-200 dark:border-slate-800/80">
                <img
                  src={imageSrc}
                  alt="Original upload"
                  className="max-h-[360px] max-w-full object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Processed Result */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="font-black uppercase tracking-wider text-[11px] text-slate-900 dark:text-white">
                  Resized & Compressed Result
                </span>
                <div className="flex items-center gap-2">
                  <span>{targetWidth} × {targetHeight} px</span>
                  <span>•</span>
                  <span className="font-black text-slate-900 dark:text-white">{formatFileSize(processedSize)}</span>
                  {savingsPercent > 0 && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      -{savingsPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 min-h-[300px] rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-3 overflow-hidden border border-slate-200 dark:border-slate-800/80 relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <span className="text-xs font-bold">Processing image locally...</span>
                  </div>
                ) : processedUrl ? (
                  <img
                    src={processedUrl}
                    alt="Processed result"
                    className="max-h-[360px] max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Rendering preview...</span>
                )}
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Ready to save as <span className="font-black uppercase text-slate-900 dark:text-white">{format.split('/')[1]}</span>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!processedUrl || isProcessing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ad slot */}
      <AdPlaceholder slotId="ad-slot-image-middle" />

      {/* Educational Guide */}
      <section className="my-10 space-y-8" aria-label="Educational Guides">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Why Resize and Compress Images in the Browser?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            High-resolution camera photos and unoptimized PNGs can quickly slow down web page load times and exceed email attachment limits. Resizing the pixel dimensions and applying smart lossy compression dramatically reduces the byte footprint without sacrificing perceived quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              1. 100% Client-Side Privacy
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike other online image converters that upload your personal pictures to distant servers, Sahlino performs every resizing and compression calculation right inside your browser using HTML5 Canvas.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              2. Modern WebP Conversion
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Google developed WebP to provide superior compression for web images. Converting JPGs and PNGs to WebP typically slashes file weight by an extra 30% to 50% while preserving crisp details.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              3. Aspect Ratio Preservation
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Never worry about stretched or squished graphics. With the aspect ratio lock toggled on, altering the width automatically computes the mathematically correct proportional height.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={toolData.faqs || []} />

      {/* Internal Linking */}
      <RelatedTools
        currentSlug={toolData.slug}
        category={toolData.category}
        categoryName={toolData.categoryName}
        onNavigate={onNavigate}
      />
    </div>
  );
};
