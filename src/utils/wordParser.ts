import mammoth from 'mammoth';

/**
 * Result of Word document parsing
 */
export interface WordParseResult {
  success: boolean;
  html: string;
  text: string;
  isLegacyFormat?: boolean;
  warning?: string;
  error?: string;
}

/**
 * Check if buffer starts with PK (ZIP archive signature)
 */
export function isZipArchive(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 4) return false;
  const bytes = new Uint8Array(buffer, 0, 4);
  // 'P' 'K' 0x03 0x04 or 0x05 0x06 (empty zip) or 0x07 0x08
  return bytes[0] === 0x50 && bytes[1] === 0x4b;
}

/**
 * Check if buffer has OLE2 / Compound File Binary Format signature (.doc Word 97-2003)
 */
export function isLegacyDoc(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 8) return false;
  const bytes = new Uint8Array(buffer, 0, 8);
  // D0 CF 11 E0 A1 B1 1A E1
  return (
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1
  );
}

/**
 * Check if buffer starts with RTF signature {\rtf
 */
export function isRtf(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 5) return false;
  const bytes = new Uint8Array(buffer, 0, 5);
  return (
    bytes[0] === 0x7b && // {
    bytes[1] === 0x5c && // \
    bytes[2] === 0x72 && // r
    bytes[3] === 0x74 && // t
    bytes[4] === 0x66    // f
  );
}

/**
 * Extract clean text from RTF content
 */
export function extractTextFromRtf(buffer: ArrayBuffer): string {
  try {
    const raw = new TextDecoder('windows-1252').decode(buffer);
    
    // Remove group definitions like {\fonttbl ...}, {\colortbl ...}, {\stylesheet ...}, {\* ...}
    let text = raw.replace(/\{\\(?:fonttbl|colortbl|stylesheet|info|pict|\*)[^}]*\}/gi, '');
    
    // Convert paragraph and line break controls
    text = text.replace(/\\par(?:\s+)?/gi, '\n');
    text = text.replace(/\\line(?:\s+)?/gi, '\n');
    text = text.replace(/\\tab(?:\s+)?/gi, '\t');
    
    // Decode unicode escapes \uNNNN?
    text = text.replace(/\\u(-?\d+)(?:\?)?/g, (_, codeStr) => {
      const code = parseInt(codeStr, 10);
      return String.fromCharCode(code < 0 ? code + 65536 : code);
    });

    // Decode hex escapes \'xx
    text = text.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => {
      const charCode = parseInt(hex, 16);
      return String.fromCharCode(charCode);
    });

    // Strip remaining control words \word123
    text = text.replace(/\\[a-zA-Z]+(-?\d+)?(?:\s+)?/g, '');
    
    // Remove remaining braces
    text = text.replace(/[{}]/g, '');

    // Normalize whitespace and newlines
    return cleanAndFormatExtractedText(text);
  } catch {
    return '';
  }
}

/**
 * Extract text from legacy Microsoft Word 97-2003 (.doc) binary format
 * Extracts runs of UTF-16LE and ANSI text blocks while skipping OLE system tables
 */
export function extractTextFromLegacyDoc(buffer: ArrayBuffer): string {
  try {
    const uint8 = new Uint8Array(buffer);
    const length = uint8.length;
    const extractedParagraphs: string[] = [];
    
    // System strings to filter out
    const ignoredSystemWords = new Set([
      'root entry',
      'worddocument',
      '1table',
      '0table',
      'summaryinformation',
      'documentsummaryinformation',
      'compobj',
      'data',
      'times new roman',
      'calibri',
      'arial',
      'courier new',
      'normal.dotm',
      'normal.dot',
      'microsoft word'
    ]);

    // 1. Scan for UTF-16LE text sequences (standard in Word 97-2003)
    let currentUtf16Chars: string[] = [];
    for (let i = 512; i < length - 1; i += 2) {
      const charCode = uint8[i] | (uint8[i + 1] << 8);

      // Check if character is valid printable text:
      // Basic Latin (32..126), Latin Supplement, Arabic (0x0600..0x06FF),
      // Arabic Extended (0x0750..0x077F), Arabic Presentation Forms (0xFB50..0xFDFF, 0xFE70..0xFEFC),
      // General Punctuation (0x2000..0x206F), or newline/tab (10, 13, 9)
      const isArabic = (charCode >= 0x0600 && charCode <= 0x06ff) || (charCode >= 0xfb50 && charCode <= 0xfefc);
      const isLatin = charCode >= 32 && charCode <= 126;
      const isAllowedPunctuation = charCode >= 0x2010 && charCode <= 0x2026;
      const isWhitespace = charCode === 10 || charCode === 13 || charCode === 9;

      if (isArabic || isLatin || isAllowedPunctuation || isWhitespace) {
        if (charCode === 13 || charCode === 10 || charCode === 7) {
          // Cell mark or paragraph break in Word
          if (currentUtf16Chars.length > 0) {
            const line = currentUtf16Chars.join('').trim();
            if (line.length >= 3 && !ignoredSystemWords.has(line.toLowerCase())) {
              extractedParagraphs.push(line);
            }
            currentUtf16Chars = [];
          }
        } else {
          currentUtf16Chars.push(String.fromCharCode(charCode));
        }
      } else {
        if (currentUtf16Chars.length >= 5) {
          const line = currentUtf16Chars.join('').trim();
          if (line.length >= 4 && !ignoredSystemWords.has(line.toLowerCase())) {
            extractedParagraphs.push(line);
          }
        }
        currentUtf16Chars = [];
      }
    }

    // 2. If UTF-16LE yielded insufficient text, scan for 8-bit ANSI runs
    if (extractedParagraphs.join(' ').length < 50) {
      let currentAnsiChars: string[] = [];
      for (let i = 512; i < length; i++) {
        const byte = uint8[i];
        const isPrintable = (byte >= 32 && byte <= 126) || byte === 9;
        const isBreak = byte === 10 || byte === 13 || byte === 7;

        if (isPrintable) {
          currentAnsiChars.push(String.fromCharCode(byte));
        } else if (isBreak) {
          if (currentAnsiChars.length >= 4) {
            const line = currentAnsiChars.join('').trim();
            if (line.length >= 3 && !ignoredSystemWords.has(line.toLowerCase())) {
              extractedParagraphs.push(line);
            }
          }
          currentAnsiChars = [];
        } else {
          if (currentAnsiChars.length >= 5) {
            const line = currentAnsiChars.join('').trim();
            if (line.length >= 4 && !ignoredSystemWords.has(line.toLowerCase())) {
              extractedParagraphs.push(line);
            }
          }
          currentAnsiChars = [];
        }
      }
    }

    const combined = extractedParagraphs.join('\n\n');
    return cleanAndFormatExtractedText(combined);
  } catch {
    return '';
  }
}

/**
 * Check if the buffer is plain UTF-8 text or HTML
 */
export function extractTextFromPlainOrHtml(buffer: ArrayBuffer): string | null {
  try {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const text = decoder.decode(buffer);
    
    // Check if the content is predominantly readable text (not raw binary)
    let printableCount = 0;
    const sampleLength = Math.min(text.length, 2000);
    for (let i = 0; i < sampleLength; i++) {
      const code = text.charCodeAt(i);
      if (code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126) || code > 128) {
        printableCount++;
      }
    }

    if (sampleLength > 0 && printableCount / sampleLength > 0.85) {
      // Check if it's HTML
      if (text.includes('<html') || text.includes('<body') || text.includes('<!DOCTYPE')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        return cleanAndFormatExtractedText(doc.body?.textContent || text);
      }
      return cleanAndFormatExtractedText(text);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Clean and format extracted text into neat paragraphs
 */
function cleanAndFormatExtractedText(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove repeated control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Replace 3 or more consecutive newlines with 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Convert plain text paragraphs into clean HTML representation
 */
export function textToHtml(text: string): string {
  const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);
  if (paragraphs.length === 0) {
    return `<p>${text || ''}</p>`;
  }

  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      // Check if paragraph looks like a heading (short, no period, or starts with #/number)
      if (
        (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.includes('\n')) ||
        /^(?:\d+[\.\)]|#+)\s+/.test(trimmed)
      ) {
        return `<h2 style="font-weight: bold; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #1e293b; font-size: 1.2rem;">${escapeHtml(trimmed)}</h2>`;
      }
      // Check if it's bullet list items
      if (trimmed.includes('\n• ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .map((item) => item.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean);
        return `<ul style="margin-bottom: 1rem; padding-inline-start: 1.5rem; line-height: 1.7;">${items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('')}</ul>`;
      }
      return `<p style="line-height: 1.7; margin-bottom: 1rem;">${escapeHtml(trimmed).replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Master Word Document Parsing Pipeline
 * Handles modern .docx (ZIP), legacy .doc (Word 97-2003 OLE2), RTF, and plain text
 */
export async function parseWordDocument(
  arrayBuffer: ArrayBuffer,
  isAr: boolean
): Promise<WordParseResult> {
  // Check format characteristics
  const isZip = isZipArchive(arrayBuffer);
  const isLegacy = isLegacyDoc(arrayBuffer);
  const isRtfDoc = isRtf(arrayBuffer);

  // 1. If it's a ZIP archive, Mammoth is the gold standard for DOCX
  if (isZip) {
    try {
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
      const rawResult = await mammoth.extractRawText({ arrayBuffer });

      const text = (rawResult.value || '').trim();
      const html = htmlResult.value || textToHtml(text);

      if (text.length > 0 || html.length > 0) {
        return {
          success: true,
          html: html || `<p>${text}</p>`,
          text: text || html.replace(/<[^>]+>/g, ' '),
        };
      }
    } catch {
      // Mammoth failed (e.g. zip file is not a valid DOCX or has missing parts)
      // Fall through to fallback extractors below
    }
  }

  // 2. If it is RTF format
  if (isRtfDoc) {
    const text = extractTextFromRtf(arrayBuffer);
    if (text.length >= 10) {
      return {
        success: true,
        html: textToHtml(text),
        text,
        warning: isAr
          ? 'تم استخراج النص من تنسيق RTF بنجاح.'
          : 'Text successfully extracted from RTF document.',
      };
    }
  }

  // 3. If it is a legacy Word 97-2003 (.doc) binary file
  if (isLegacy) {
    const text = extractTextFromLegacyDoc(arrayBuffer);
    if (text.length >= 10) {
      return {
        success: true,
        html: textToHtml(text),
        text,
        isLegacyFormat: true,
        warning: isAr
          ? 'تم استخراج محتوى النص من مستند Word القديم (.doc) بنجاح.'
          : 'Text successfully recovered from legacy Word (.doc) document.',
      };
    }
  }

  // 4. Try plain text / HTML decoding (in case it's a text/html file with .doc/.docx extension)
  const plainText = extractTextFromPlainOrHtml(arrayBuffer);
  if (plainText && plainText.length >= 10) {
    return {
      success: true,
      html: textToHtml(plainText),
      text: plainText,
      warning: isAr
        ? 'تم قراءة الملف كمستند نصي بنجاح.'
        : 'File parsed as formatted text document.',
    };
  }

  // 5. If everything failed, produce a friendly, user-centric message (NO JSZip internal errors!)
  let friendlyMessage = '';
  if (isLegacy) {
    friendlyMessage = isAr
      ? 'هذا الملف بصيغة Word القديمة (.doc). تعذر استخراج النصوص التالفة منه تلقائياً. يرجى فتحه في برنامج Word وحفظه بصيغة (.docx) الحديثة، أو تجربة نموذج المستند الجاهز.'
      : 'This file is in the legacy Word (.doc) format and could not be fully read. Please open it in Microsoft Word and save as modern (.docx), or try the sample document.';
  } else if (!isZip) {
    friendlyMessage = isAr
      ? 'الملف الذي تم اختياره ليس بتنسيق DOCX صالح (قد يكون ملفاً تالفاً أو امتداده غير مطابق). يرجى التأكد من اختيار ملف بصيغة .docx الحديثة، أو نسخ النص مباشرة في المحرر.'
      : 'The selected file is not a valid DOCX document (it may be corrupted or an unsupported format). Please ensure you upload a modern .docx file, or paste your text directly.';
  } else {
    friendlyMessage = isAr
      ? 'تعذر قراءة محتوى مستند Word هذا. يرجى التأكد من أن المستند غير تالف ويحتوي على نصوص، أو تجربة نموذج المستند الجاهز.'
      : 'Could not read text from this Word document. Please ensure it is not corrupted and contains readable text, or try the sample document.';
  }

  return {
    success: false,
    html: '',
    text: '',
    error: friendlyMessage,
  };
}
