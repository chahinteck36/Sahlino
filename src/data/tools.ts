import { CategoryInfo, ToolItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
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
    id: 'calculators',
    name: 'Calculators',
    slug: 'calculators',
    description: 'Fast, precise everyday and business calculation tools with step-by-step formulas.',
    iconName: 'Calculator',
    color: 'emerald',
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

  // Architecture Readiness: Future Planned Tools (as listed in prompt specification)
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder & Decoder',
    slug: 'base64-encoder',
    description: 'Convert strings, binaries, and data into Base64 format and decode Base64 strings back to plain text.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Binary',
    status: 'coming_soon',
    tags: ['base64', 'encode', 'decode', 'developer', 'string', 'binary'],
    seoTitle: 'Base64 Encoder & Decoder Online - Free Tool',
    seoDescription: 'Encode and decode Base64 data online for free. Fast, safe, client-side conversion.',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder & Decoder',
    slug: 'url-encoder',
    description: 'Encode special characters into percent-encoded URL formats and decode escaped URL query parameters.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Link',
    status: 'coming_soon',
    tags: ['url', 'encoder', 'decoder', 'uri', 'percent', 'query'],
    seoTitle: 'URL Encoder & Decoder Online - Sahlino',
    seoDescription: 'Encode and decode URLs and URI query parameters quickly and securely in your browser.',
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    slug: 'uuid-generator',
    description: 'Generate standard UUID v4 identifiers in bulk with uppercase, lowercase, and hyphen format options.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Hash',
    status: 'coming_soon',
    tags: ['uuid', 'guid', 'v4', 'generator', 'random', 'developer'],
    seoTitle: 'UUID / GUID Generator Online - Sahlino',
    seoDescription: 'Generate random UUID v4 identifiers instantly in your browser.',
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    slug: 'image-cropper',
    description: 'Crop photos and graphics with custom aspect ratios, circle crops, and instant download.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    iconName: 'Crop',
    status: 'coming_soon',
    tags: ['image', 'crop', 'cropper', 'photo', 'cut'],
    seoTitle: 'Image Cropper Online - Sahlino',
    seoDescription: 'Crop images online for free with custom aspect ratios directly in your browser.',
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, and reading time in real-time.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'AlignLeft',
    status: 'coming_soon',
    tags: ['word', 'counter', 'character', 'reading', 'time', 'text'],
    seoTitle: 'Word Counter Online - Count Words and Characters Free',
    seoDescription: 'Real-time online word counter, character counter, reading time estimator, and sentence counter.',
  },
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    slug: 'case-converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, and snake_case.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'Type',
    status: 'coming_soon',
    tags: ['case', 'converter', 'uppercase', 'lowercase', 'titlecase', 'camelcase'],
    seoTitle: 'Text Case Converter Online - Sahlino',
    seoDescription: 'Easily convert text between uppercase, lowercase, title case, camelCase and more.',
  },
  {
    id: 'length-converter',
    name: 'Length & Distance Converter',
    slug: 'length-converter',
    description: 'Convert between meters, kilometers, feet, inches, miles, centimeters, and nautical miles.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'Ruler',
    status: 'coming_soon',
    tags: ['length', 'converter', 'distance', 'meters', 'feet', 'miles'],
    seoTitle: 'Length Converter Online - Sahlino',
    seoDescription: 'Convert length and distance units online with instant precision.',
  },
  {
    id: 'data-storage-converter',
    name: 'Data Storage Converter',
    slug: 'data-storage-converter',
    description: 'Convert between Bits, Bytes, KB, MB, GB, TB, and PB in both decimal and binary (KiB, MiB) units.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'HardDrive',
    status: 'coming_soon',
    tags: ['data', 'storage', 'converter', 'bytes', 'mb', 'gb', 'tb'],
    seoTitle: 'Data Storage Converter Online - Sahlino',
    seoDescription: 'Convert bits, bytes, kilobytes, megabytes, gigabytes, and terabytes effortlessly.',
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
