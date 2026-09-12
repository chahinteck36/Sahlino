/**
 * Utilities for normalizing localized numerals and delimiters
 * Supports Eastern Arabic-Indic numerals (٠-٩) and Persian numerals (۰-۹)
 */

export function toAsciiDigits(str: string): string {
  if (!str) return '';
  return str
    .replace(/[٠۰]/g, '0')
    .replace(/[١۱]/g, '1')
    .replace(/[٢۲]/g, '2')
    .replace(/[٣۳]/g, '3')
    .replace(/[٤۴]/g, '4')
    .replace(/[٥۵]/g, '5')
    .replace(/[٦۶]/g, '6')
    .replace(/[٧۷]/g, '7')
    .replace(/[٨۸]/g, '8')
    .replace(/[٩۹]/g, '9')
    .replace(/[،,]/g, ',')
    .replace(/[—–־ـ]/g, '-');
}

export function parseLocalizedNumber(str: string | number): number {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  const normalized = toAsciiDigits(String(str)).trim();
  const val = parseFloat(normalized);
  return isNaN(val) ? 0 : val;
}

export function parseLocalizedInt(str: string | number, fallback = 0): number {
  if (typeof str === 'number') return Math.round(str);
  if (!str) return fallback;
  const normalized = toAsciiDigits(String(str)).trim();
  const val = parseInt(normalized, 10);
  return isNaN(val) ? fallback : val;
}

/**
 * Triggers safe client-side file download that works inside iframes and across all browsers
 */
export function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 200);
}
