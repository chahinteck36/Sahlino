import { CategoryInfo, ToolItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'document-tools',
    name: 'Document & PDF Tools',
    slug: 'document-tools',
    description: 'Merge, split, compress, and convert PDF documents and images completely in your browser.',
    iconName: 'Files',
    color: 'emerald',
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Format, validate, encode, and debug code and data payloads directly in your browser.',
    iconName: 'Code',
    color: 'blue',
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Resize, compress, convert, and crop images with 100% in-browser privacy.',
    iconName: 'Image',
    color: 'purple',
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count words, convert casing, clean text, and format strings effortlessly.',
    iconName: 'FileText',
    color: 'rose',
  },
  {
    id: 'converters',
    name: 'Converters',
    slug: 'converters',
    description: 'Convert units, data storage, length, temperature, and currency seamlessly.',
    iconName: 'RefreshCw',
    color: 'cyan',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    slug: 'calculators',
    description: 'Fast, precise everyday and business calculation tools with step-by-step formulas.',
    iconName: 'Calculator',
    color: 'indigo',
  },
  {
    id: 'date-and-time',
    name: 'Date & Time',
    slug: 'date-and-time',
    description: 'Convert time zones, compute business days, count days, and plan schedules across cities.',
    iconName: 'Clock',
    color: 'amber',
  },
  {
    id: 'security-tools',
    name: 'Security & Privacy',
    slug: 'security-tools',
    description: 'Generate strong passwords, generate cryptographically secure hashes, and protect your privacy.',
    iconName: 'ShieldCheck',
    color: 'teal',
  },
  {
    id: 'seo-web-tools',
    name: 'SEO & Web Tools',
    slug: 'seo-web-tools',
    description: 'Generate meta tags, optimize content, analyze URLs, and preview social share cards.',
    iconName: 'Globe',
    color: 'sky',
  },
];

export const TOOLS: ToolItem[] = [
  // MVP 1: JSON Formatter & Validator
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    description: 'Format, beautify, validate, and minify JSON online. Fast, secure, and completely browser-based.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Braces',
    popular: true,
    status: 'available',
    tags: ['json', 'formatter', 'validator', 'beautifier', 'minify', 'developer', 'parse', 'syntax', 'format'],
    seoTitle: 'JSON Formatter & Validator Online - Free JSON Beautifier',
    seoDescription: 'Format, validate, beautify and minify JSON online for free. Fast, secure and easy to use with local in-browser processing.',
    faqs: [
      {
        question: 'What is JSON and why do we format it?',
        answer: 'JSON (JavaScript Object Notation) is a lightweight, human-readable data interchange format widely used in web APIs and configuration. Formatting or beautifying JSON organizes minified, unformatted data into clean indentation with line breaks for effortless inspection and debugging.',
      },
      {
        question: 'Is my JSON data uploaded or stored on any server?',
        answer: 'No. Sahlino processes all JSON formatting, validation, and minification 100% locally in your browser. Your sensitive API payloads, tokens, and data never leave your computer.',
      },
      {
        question: 'How does JSON validation detect errors?',
        answer: 'The validator parses your input according to strict RFC 8259 JSON specifications. If a syntax error is detected (such as a missing bracket, trailing comma, or unquoted key), Sahlino calculates the approximate line and column position with descriptive guidance on how to fix it.',
      },
      {
        question: 'Can I download the formatted JSON file?',
        answer: 'Yes! Click the "Download" button to save the cleaned and formatted JSON payload directly to your local file system as a .json file.',
      },
    ],
  },

  // MVP 2: Image Resizer & Compressor
  {
    id: 'image-resizer',
    name: 'Image Resizer & Compressor',
    slug: 'image-resizer',
    description: 'Resize, compress, and convert images online for free. Adjust dimensions, change format, and reduce file size.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    iconName: 'ImageIcon',
    popular: true,
    status: 'available',
    tags: ['image', 'resizer', 'compressor', 'photo', 'resize', 'compress', 'jpg', 'png', 'webp', 'dimension'],
    seoTitle: 'Image Resizer Online - Resize & Compress Images Free',
    seoDescription: 'Resize, compress and convert images online for free. Change image dimensions, reduce file size and download your image instantly.',
    faqs: [
      {
        question: 'How are images processed in Sahlino?',
        answer: 'All image rendering, resizing, and compression tasks are performed client-side using standard HTML5 Canvas and browser image APIs. Your pictures and private graphics are never uploaded to any remote server.',
      },
      {
        question: 'What image formats are supported?',
        answer: 'You can upload and convert between JPG, PNG, and WebP formats. WebP is highly recommended for modern websites because it provides superior compression without visible loss in visual fidelity.',
      },
      {
        question: 'How does preserving aspect ratio work?',
        answer: 'When "Preserve aspect ratio" is checked, changing the width will automatically recalculate the proportional height (and vice versa), ensuring your image remains distortion-free.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Because images are processed inside your browser memory, Sahlino safely handles high-resolution images up to 25–30MB smoothly without slowdown.',
      },
    ],
  },

  // MVP 3: Time Zone Converter
  {
    id: 'time-zone-converter',
    name: 'Time Zone Converter',
    slug: 'time-zone-converter',
    description: 'Convert times between world cities and time zones. Compare multiple cities side-by-side with automatic daylight saving.',
    category: 'date-and-time',
    categoryName: 'Date & Time',
    iconName: 'Globe',
    popular: true,
    status: 'available',
    tags: ['time', 'timezone', 'converter', 'clock', 'world', 'utc', 'gmt', 'cities', 'daylight', 'schedule'],
    seoTitle: 'Time Zone Converter - Convert Time Zones Online',
    seoDescription: 'Convert time between time zones worldwide. Compare cities and find the correct local time instantly with daylight saving precision.',
    faqs: [
      {
        question: 'How does Sahlino handle Daylight Saving Time (DST)?',
        answer: 'Sahlino leverages the browser standard internationalization API (Intl) and canonical IANA time zone database. DST shifts (spring forward and fall back) are calculated automatically based on the exact date and location you choose.',
      },
      {
        question: 'Can I compare multiple time zones simultaneously?',
        answer: 'Yes! Sahlino includes a multi-city comparison dashboard. You can add cities like London, New York, Tokyo, Dubai, Paris, Sydney, and Singapore to compare all local times side-by-side.',
      },
      {
        question: 'What is UTC and how does it relate to local time?',
        answer: 'Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. Every time zone is expressed as an offset from UTC (e.g., UTC+0, UTC-5, UTC+9).',
      },
    ],
  },

  // MVP 4: Percentage Calculator
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Compute percentages, percentage increases, decreases, differences, and changes with step-by-step formulas.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'Percent',
    popular: true,
    status: 'available',
    tags: ['percentage', 'calculator', 'increase', 'decrease', 'difference', 'math', 'discount', 'change', 'ratio'],
    seoTitle: 'Percentage Calculator - Calculate Percentages Online',
    seoDescription: 'Free online percentage calculator. Calculate percentages, percentage increase, decrease, difference and change instantly with clear formulas.',
    faqs: [
      {
        question: 'What calculation modes are included?',
        answer: 'Sahlino provides 6 specialized percentage calculation modes: (1) What is X% of Y?, (2) X is what percentage of Y?, (3) Percentage increase from X to Y, (4) Percentage decrease from X to Y, (5) Percentage difference between X and Y, and (6) Percentage change from X to Y.',
      },
      {
        question: 'What is the difference between percentage change and percentage difference?',
        answer: 'Percentage change compares an old initial value to a new value (such as growth or decay over time), so direction matters. Percentage difference compares two values without a chronological order, dividing the absolute difference by their average.',
      },
      {
        question: 'Can I use decimal values?',
        answer: 'Yes. Sahlino accepts integers, decimals, and negative numbers with high floating-point precision.',
      },
    ],
  },

  // MVP 5: Business Days Calculator
  {
    id: 'business-days-calculator',
    name: 'Business Days Calculator',
    slug: 'business-days-calculator',
    description: 'Calculate working days between two dates, exclude custom weekends and holidays, or add business days to a date.',
    category: 'date-and-time',
    categoryName: 'Date & Time',
    iconName: 'CalendarDays',
    popular: true,
    status: 'available',
    tags: ['business', 'days', 'calculator', 'working', 'weekdays', 'calendar', 'holidays', 'date', 'deadline', 'workdays'],
    seoTitle: 'Business Days Calculator - Calculate Working Days',
    seoDescription: 'Calculate the number of working days between two dates. Exclude weekends and custom holidays with this free business days calculator.',
    faqs: [
      {
        question: 'Can I customize which days are considered weekends?',
        answer: 'Yes! While Saturday and Sunday is standard in most countries, Sahlino allows you to easily switch to Friday and Saturday (common in the Middle East and parts of the world) or customize excluded days.',
      },
      {
        question: 'How do custom holidays work?',
        answer: 'You can add custom holiday dates that fall between your start and end dates. Sahlino will automatically deduct them from the final working day count if they fall on a scheduled workday.',
      },
      {
        question: 'Can I calculate a target date by adding business days?',
        answer: 'Yes. Switch to "Add / Subtract Days" mode, enter a start date and the number of business days (e.g., 15 days), and Sahlino will find the exact resulting target date.',
      },
    ],
  },

  // Document & PDF Tools
  {
    id: 'pdf-merge',
    name: 'Merge PDF Files',
    slug: 'pdf-merge',
    description: 'Combine multiple PDF documents into a single organized file in seconds with 100% in-browser privacy.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'Files',
    popular: true,
    status: 'available',
    tags: ['pdf', 'merge', 'combine', 'documents', 'join', 'pdf-lib', 'files'],
    seoTitle: 'Merge PDF Files Online - Free PDF Joiner',
    seoDescription: 'Combine and merge multiple PDF documents into a single file online. Fast, secure, client-side execution.',
    faqs: [
      {
        question: 'Are my uploaded PDF files safe?',
        answer: 'Yes, 100%! All PDF parsing and merging operations run entirely within your local browser memory using pdf-lib. No files are uploaded to any server.',
      },
      {
        question: 'Can I reorder the PDF pages before merging?',
        answer: 'Yes. You can re-arrange the files up or down in the queue before clicking Merge to ensure the final document follows your desired order.',
      },
    ],
  },
  {
    id: 'images-to-pdf',
    name: 'Images to PDF Converter',
    slug: 'images-to-pdf',
    description: 'Convert JPG, PNG, and WebP images into a clean, multi-page PDF document with custom margins and orientation.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'FileSpreadsheet',
    popular: true,
    status: 'available',
    tags: ['images', 'jpg to pdf', 'png to pdf', 'photos', 'document', 'convert', 'pdf'],
    seoTitle: 'Convert Images to PDF Online - Free JPG & PNG to PDF',
    seoDescription: 'Convert JPG, PNG, and WebP photos to high-quality PDF documents online. Reorder images, set page orientation, and download instantly.',
    faqs: [
      {
        question: 'What image formats can I convert to PDF?',
        answer: 'You can convert standard JPG, JPEG, PNG, and WebP image formats into single or multi-page PDF files.',
      },
      {
        question: 'Is there any limit to the number of images?',
        answer: 'You can convert dozens of images in one batch with smooth client-side performance.',
      },
    ],
  },

  // Developer Tools
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder & Decoder',
    slug: 'base64-encoder',
    description: 'Encode text into Base64 format and decode Base64 back to readable text with UTF-8 and URL-safe options.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Binary',
    popular: true,
    status: 'available',
    tags: ['base64', 'encode', 'decode', 'developer', 'string', 'binary', 'utf8'],
    seoTitle: 'Base64 Encoder & Decoder Online - Free UTF-8 & URL Safe',
    seoDescription: 'Encode to Base64 and decode Base64 strings safely with full UTF-8 Unicode support and 100% in-browser privacy.',
    faqs: [
      {
        question: 'Does this Base64 tool support Unicode/UTF-8?',
        answer: 'Yes! Unlike standard JavaScript atob/btoa functions which break on non-ASCII characters, Sahlino utilizes TextEncoder and TextDecoder for complete Unicode safety.',
      },
    ],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder & Decoder',
    slug: 'url-encoder',
    description: 'Encode special characters into percent-encoded URL formats and decode escaped URL query parameters.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Link',
    status: 'available',
    tags: ['url', 'encoder', 'decoder', 'uri', 'percent', 'query', 'params'],
    seoTitle: 'URL Encoder & Decoder Online - Sahlino',
    seoDescription: 'Encode and decode URLs and URI query parameters quickly and securely in your browser.',
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves standard URL delimiters such as :, /, ?, and & for full URLs, while encodeURIComponent encodes everything, making it ideal for query string parameters.',
      },
    ],
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    slug: 'uuid-generator',
    description: 'Generate standard cryptographically secure UUID v4 identifiers in bulk with custom casing and hyphens.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Hash',
    status: 'available',
    tags: ['uuid', 'guid', 'v4', 'generator', 'random', 'developer', 'crypto'],
    seoTitle: 'UUID / GUID Generator Online - Sahlino',
    seoDescription: 'Generate random UUID v4 identifiers instantly in your browser.',
    faqs: [
      {
        question: 'How are the UUIDs generated?',
        answer: 'All UUIDs are generated using the browser standard crypto.randomUUID() API for true cryptographic entropy.',
      },
    ],
  },
  {
    id: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    slug: 'hash-generator',
    description: 'Generate SHA-256, SHA-512, SHA-384, and SHA-1 cryptographic hashes securely in your browser.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Lock',
    status: 'available',
    tags: ['hash', 'sha256', 'sha512', 'sha1', 'checksum', 'crypto', 'digest'],
    seoTitle: 'Hash Generator Online - Free SHA-256, SHA-512 & SHA-1 Hasher',
    seoDescription: 'Generate secure cryptographic checksums and hashes online for free with 100% in-browser Web Crypto API.',
    faqs: [
      {
        question: 'Which hash algorithm is recommended for security?',
        answer: 'SHA-256 and SHA-512 are industry standard cryptographic algorithms for secure integrity checks and password verification.',
      },
    ],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate customized, high-resolution QR codes for URLs, text, Wi-Fi networks, and contacts with instant PNG download.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'QrCode',
    popular: true,
    status: 'available',
    tags: ['qr', 'code', 'generator', 'barcode', 'wifi', 'download', 'png'],
    seoTitle: 'QR Code Generator Online - Free Custom QR Codes',
    seoDescription: 'Create custom QR codes online for free. Support for URLs, text, and Wi-Fi with instant PNG download.',
    faqs: [
      {
        question: 'Do generated QR codes expire?',
        answer: 'No. The QR codes generated by Sahlino are static and encode your data directly. They will never expire.',
      },
    ],
  },

  // Image Tools
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    slug: 'image-cropper',
    description: 'Crop photos and graphics with custom aspect ratios, circle crops, and instant download.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    iconName: 'Crop',
    status: 'available',
    tags: ['image', 'crop', 'cropper', 'photo', 'cut', 'avatar', 'aspect ratio'],
    seoTitle: 'Image Cropper Online - Sahlino',
    seoDescription: 'Crop images online for free with custom aspect ratios directly in your browser.',
    faqs: [
      {
        question: 'Can I crop avatar circles?',
        answer: 'Yes! Select the Circle Avatar preset to create circular profile pictures with transparent backgrounds.',
      },
    ],
  },

  // Text Tools
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, reading and speaking times instantly with keyword density.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'AlignLeft',
    popular: true,
    status: 'available',
    tags: ['word', 'counter', 'character', 'reading', 'time', 'text', 'sentences', 'density'],
    seoTitle: 'Word Counter Online - Count Words and Characters Free',
    seoDescription: 'Real-time online word counter, character counter, reading time estimator, and sentence counter.',
    faqs: [
      {
        question: 'How is reading time estimated?',
        answer: 'Reading time is calculated based on an average adult reading speed of 200 words per minute, and speaking time at 130 words per minute.',
      },
    ],
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    slug: 'case-converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and Sentence case.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'Type',
    popular: true,
    status: 'available',
    tags: ['case', 'converter', 'uppercase', 'lowercase', 'titlecase', 'camelcase', 'kebab', 'snake'],
    seoTitle: 'Text Case Converter Online - Sahlino',
    seoDescription: 'Easily convert text between uppercase, lowercase, title case, camelCase and more.',
    faqs: [
      {
        question: 'What is camelCase vs kebab-case?',
        answer: 'camelCase capitalizes each word except the first without spaces (e.g., myVariableName), while kebab-case separates lowercase words with hyphens (e.g., my-variable-name).',
      },
    ],
  },

  // Converters
  {
    id: 'length-converter',
    name: 'Unit Converter (Length, Weight, Temp)',
    slug: 'length-converter',
    description: 'Convert between metric and imperial units of length, weight, temperature, area, and speed in real-time.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'Ruler',
    popular: true,
    status: 'available',
    tags: ['length', 'converter', 'distance', 'meters', 'feet', 'miles', 'weight', 'temp', 'speed'],
    seoTitle: 'Unit Converter Online - Free Metric & Imperial Converter',
    seoDescription: 'Convert length, weight, temperature, area, and speed with high precision. Free, instant, and in-browser.',
    faqs: [
      {
        question: 'Are both Metric and Imperial units supported?',
        answer: 'Yes! Sahlino provides complete bidirectional conversions between Metric (meters, kg, celsius) and Imperial (feet, miles, pounds, fahrenheit) systems.',
      },
    ],
  },
  {
    id: 'data-storage-converter',
    name: 'Data Storage Converter',
    slug: 'data-storage-converter',
    description: 'Convert between Bytes, KB, MB, GB, TB, and PB in both decimal (1000) and binary (1024) standards.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'HardDrive',
    status: 'available',
    tags: ['data', 'storage', 'converter', 'bytes', 'mb', 'gb', 'tb', 'binary', 'decimal'],
    seoTitle: 'Data Storage Converter Online - Sahlino',
    seoDescription: 'Convert bits, bytes, kilobytes, megabytes, gigabytes, and terabytes effortlessly.',
    faqs: [
      {
        question: 'What is the difference between decimal (1000) and binary (1024)?',
        answer: 'Hard drive manufacturers calculate storage using decimal (1 KB = 1000 Bytes), while computer operating systems measure memory using binary (1 KiB = 1024 Bytes). Sahlino supports both.',
      },
    ],
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter (Binary, Dec, Hex)',
    slug: 'number-base-converter',
    description: 'Convert numbers instantly between Decimal, Binary, Hexadecimal, and Octal bases.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'Binary',
    status: 'available',
    tags: ['binary', 'decimal', 'hex', 'hexadecimal', 'octal', 'number', 'base', 'convert'],
    seoTitle: 'Binary to Decimal & Hex Converter Online - Number Base Calculator',
    seoDescription: 'Convert numbers between Decimal, Binary, Hexadecimal, and Octal bases instantly with 100% in-browser accuracy.',
    faqs: [
      {
        question: 'Does this handle large integers?',
        answer: 'Yes, Sahlino uses BigInt arithmetic to handle arbitrarily large integers without precision loss.',
      },
    ],
  },

  // Calculators
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate your exact age in years, months, days, hours, and countdown to your next birthday.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'Cake',
    popular: true,
    status: 'available',
    tags: ['age', 'calculator', 'birthday', 'date', 'years', 'months', 'days'],
    seoTitle: 'Age Calculator Online - Calculate Exact Age in Years, Days, Hours',
    seoDescription: 'Calculate your exact chronological age from your date of birth with days, hours, and next birthday countdown.',
    faqs: [
      {
        question: 'How does it calculate leap years?',
        answer: 'The calculator uses calendar day math to accurately reflect leap years and differing month lengths.',
      },
    ],
  },

  // Security & Privacy
  {
    id: 'password-generator',
    name: 'Strong Password Generator',
    slug: 'password-generator',
    description: 'Generate ultra-secure, cryptographically random passwords and PINs with strength ratings.',
    category: 'security-tools',
    categoryName: 'Security & Privacy',
    iconName: 'KeyRound',
    popular: true,
    status: 'available',
    tags: ['password', 'generator', 'security', 'random', 'pin', 'entropy'],
    seoTitle: 'Strong Password Generator Online - Secure Random Passwords',
    seoDescription: 'Generate strong, unique, cryptographically random passwords and PINs online with 100% in-browser Web Crypto security.',
    faqs: [
      {
        question: 'Is this password generator secure?',
        answer: 'Yes! Passwords are generated directly on your device using the browser native crypto.getRandomValues API and are never transmitted over the internet.',
      },
    ],
  },

  // SEO & Web Tools
  {
    id: 'meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate Google, Open Graph (Facebook), and Twitter Card meta tags with live social preview.',
    category: 'seo-web-tools',
    categoryName: 'SEO & Web Tools',
    iconName: 'Globe',
    popular: true,
    status: 'available',
    tags: ['seo', 'meta', 'tags', 'opengraph', 'twitter', 'social', 'preview'],
    seoTitle: 'SEO Meta Tag Generator Online - Open Graph & Twitter Cards',
    seoDescription: 'Generate comprehensive HTML meta tags for Google SEO, Open Graph, and Twitter Cards with real-time social card preview.',
    faqs: [
      {
        question: 'Why are Open Graph tags important?',
        answer: 'Open Graph meta tags control how your links look when shared on social media platforms like Facebook, LinkedIn, Discord, and messaging apps.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId: string): ToolItem[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function getRelatedTools(currentSlug: string, categoryId: string, limit = 3): ToolItem[] {
  const sameCategory = TOOLS.filter((t) => t.category === categoryId && t.slug !== currentSlug);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = TOOLS.filter((t) => t.category !== categoryId && t.slug !== currentSlug && t.status === 'available');
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchTools(query: string): ToolItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];
  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(clean) ||
      tool.description.toLowerCase().includes(clean) ||
      tool.categoryName.toLowerCase().includes(clean) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(clean))
    );
  });
}
