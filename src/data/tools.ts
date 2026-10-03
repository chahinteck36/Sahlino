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
    relatedArticles: ["how-to-format-validate-json-payloads"],
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
    relatedArticles: ["how-to-compress-images-without-losing-quality","difference-between-jpg-png-webp"],
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
    relatedArticles: ["how-to-calculate-percentages-and-discounts","how-to-calculate-loan-interest-and-installments"],
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
    relatedArticles: ["how-to-merge-pdf-files-online","how-to-split-pdf-pages","how-to-convert-word-to-pdf"],
    faqs: [
      {
        question: 'Are my uploaded PDF files safe?',
        answer: 'Yes, 100%! All PDF parsing and merging operations run entirely within your local browser memory using pdf-lib. No files are uploaded to any server.',
      },
      {
        question: 'Can I reorder the PDF pages before merging?',
        answer: 'Yes. You can re-arrange the files up or down in the queue before clicking Merge to ensure the final document follows your desired order.',
      },
      {
        question: 'Will merging degrade original text or image sharpness?',
        answer: 'No. Sahlino merges PDF streams losslessly, maintaining crisp vector typography and full-resolution graphics.',
      },
      {
        question: 'Can I merge password-protected PDF files?',
        answer: 'Encrypted PDFs must have their security password unlocked prior to merging so the browser engine can assemble the pages.',
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
    relatedArticles: ["how-to-convert-word-to-pdf","difference-between-jpg-png-webp"],
    faqs: [
      {
        question: 'What image formats can I convert to PDF?',
        answer: 'You can convert standard JPG, JPEG, PNG, and WebP image formats into single or multi-page PDF files.',
      },
      {
        question: 'Is there any limit to the number of images?',
        answer: 'You can convert dozens of images in one batch with smooth client-side performance.',
      },
      {
        question: 'Can I set portrait or landscape orientation per image?',
        answer: 'Yes! Sahlino fits your images onto standardized A4 pages with customizable orientation and margin spacing.',
      },
      {
        question: 'Are my photos uploaded to any remote server?',
        answer: 'Never. All PDF compilation is performed locally on your device with 100% privacy.',
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
    relatedArticles: ["how-to-format-validate-json-payloads"],
    faqs: [
      {
        question: "What is Base64 encoding used for?",
        answer: "Base64 translates binary assets (such as images, fonts, and encrypted strings) into an ASCII radix-64 text representation. This allows binary payloads to be embedded directly inside HTML, CSS data URIs, or JSON API payloads without character corruption.",
      },
      {
        question: "Does Base64 encryption provide security?",
        answer: "No. Base64 is an encoding format, not encryption. Anyone can decode a Base64 string instantly. Never use Base64 alone to protect private or confidential passwords without cryptographic encryption.",
      },
      {
        question: "Does Sahlino support UTF-8 and Arabic text encoding?",
        answer: "Yes! Sahlino uses safe UTF-8 byte serialization, ensuring Arabic text, emojis, and international characters encode and decode without distortion.",
      },
      {
        question: "Is my encoded text private?",
        answer: "100% private. All encoding and decoding runs in your browser memory sandbox; no text or files are uploaded to external servers.",
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
    relatedArticles: ["how-to-count-words-characters-for-seo"],
    faqs: [
      {
        question: "Why do URLs require percent-encoding?",
        answer: "URLs can only contain a limited set of ASCII characters. Characters like spaces, question marks, ampersands, slashes, and Arabic letters must be percent-encoded (e.g. space becomes %20, ampersand becomes %26) to prevent breaking web server routing.",
      },
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer: "encodeURI is designed for complete URLs and preserves protocol/domain delimiters (like http://, ?, &). encodeURIComponent encodes every special character, making it essential for query parameter values.",
      },
      {
        question: "Can I decode complex tracking URLs with multiple parameters?",
        answer: "Yes! Paste any long tracking URL or encoded redirect link into Sahlino to reveal the human-readable destination and parameters immediately.",
      },
      {
        question: "Are my encoded URLs tracked or logged?",
        answer: "No. Everything is decoded client-side in your browser. We never log or inspect your URLs.",
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
        question: "What is a UUID / GUID and how random is version 4?",
        answer: "A Universally Unique Identifier (UUID v4) is a 128-bit label generated using cryptographically strong pseudo-random numbers. The odds of a collision among trillions of generated IDs are infinitesimally close to zero.",
      },
      {
        question: "Does Sahlino use cryptographic randomness for UUIDs?",
        answer: "Yes! Sahlino uses the browser native crypto.getRandomValues API, guaranteeing cryptographically secure entropy suitable for database primary keys and session tokens.",
      },
      {
        question: "Can I generate bulk UUIDs at once?",
        answer: "Yes! You can generate up to 50 UUIDs in one click, choose uppercase or lowercase, and include or omit hyphens.",
      },
      {
        question: "What is the format of a standard UUID v4?",
        answer: "It consists of 32 hexadecimal characters displayed in five groups separated by hyphens: 8-4-4-4-12 (for example: 3f2504e0-4f89-41d3-9a0c-0305e82c3301).",
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
        question: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
        answer: "MD5 (128-bit) and SHA-1 (160-bit) are legacy algorithms suitable for basic file checksums. SHA-256 (256-bit) and SHA-512 (512-bit) provide military-grade collision resistance and are standard for modern security, blockchain, and password hashing.",
      },
      {
        question: "Can a cryptographic hash be decrypted or reversed?",
        answer: "No. Hash functions are one-way mathematical algorithms. You cannot decrypt a hash back into its original input; verification is achieved by hashing new input and comparing the resulting digests.",
      },
      {
        question: "Does Sahlino Hash Generator use Web Cryptography API?",
        answer: "Yes! Sahlino utilizes the hardware-accelerated Web Cryptography API (crypto.subtle) built directly into modern browsers for instant, secure hashing.",
      },
      {
        question: "Are my passwords or secret strings sent to any server?",
        answer: "Never. Hashes are computed 100% in your local browser sandbox; no text ever leaves your device.",
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
    relatedArticles: ["how-to-create-custom-qr-codes"],
    faqs: [
      {
        question: "Do QR codes created on Sahlino ever expire?",
        answer: "Never. Sahlino generates static, direct QR codes where your URL, WiFi configuration, or text is encoded directly into the matrix with zero intermediate redirects.",
      },
      {
        question: "What is the recommended print size for a QR code?",
        answer: "For business cards and brochures, a minimum of 2x2 cm (0.8x0.8 inches) is recommended. For outdoor banners or posters, scale the width to at least 10% of the expected viewing distance.",
      },
      {
        question: "How do WiFi QR codes work?",
        answer: "Sahlino encodes the standard WIFI:S:SSID;T:WPA;P:password;; schema. When guests scan the code with their smartphone camera, their phone automatically connects to the network without typing.",
      },
      {
        question: "What error correction level should I choose?",
        answer: "Level M (15% recovery) is ideal for web links. Use Level H (30% recovery) if you plan to print the code outdoors or overlay a custom company logo.",
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
    relatedArticles: ["how-to-compress-images-without-losing-quality","difference-between-jpg-png-webp"],
    faqs: [
      {
        question: "How does client-side image cropping protect my privacy?",
        answer: "Your original high-resolution photo is loaded directly into an HTML5 Canvas element inside your browser RAM. It is never transmitted across the network or stored on any server.",
      },
      {
        question: "What aspect ratios are supported for social media?",
        answer: "Sahlino provides ready aspect ratio presets including 1:1 (Square for Instagram/avatars), 16:9 (Widescreen for YouTube/banners), 4:3 (Classic photography), and Freeform custom cropping.",
      },
      {
        question: "Will cropping an image reduce its sharpness?",
        answer: "Cropping extracts pixels from your source file without resampling degradation. Sahlino exports your cropped region in crisp PNG, JPG, or WebP.",
      },
      {
        question: "Can I crop large camera photos (e.g. 20MB)?",
        answer: "Yes! Thanks to client-side hardware canvas acceleration, high-resolution DSLR photos can be cropped smoothly without server limits.",
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
    relatedArticles: ["how-to-count-words-characters-for-seo","how-to-clean-and-deduplicate-text"],
    faqs: [
      {
        question: "How are character counts calculated with and without spaces?",
        answer: "Characters with spaces count every single keystroke including spaces, tabs, and punctuation. Characters without spaces strip whitespace characters, which is essential for certain academic essays and print layout density.",
      },
      {
        question: "What are the character limits for Google SEO titles and descriptions?",
        answer: "Google search results display up to ~55-60 characters for titles and ~150-160 characters for meta descriptions before truncating with an ellipsis.",
      },
      {
        question: "How is estimated reading and speaking time calculated?",
        answer: "Reading time is calculated based on standard adult silent reading speed (225 words per minute), while speaking presentation time is estimated at 130 words per minute.",
      },
      {
        question: "Does Sahlino count Arabic and English words accurately?",
        answer: "Yes! The word segmentation engine accurately recognizes Arabic diacritics, multilingual phrases, and hyphenated compound words.",
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
    relatedArticles: ["how-to-count-words-characters-for-seo","how-to-clean-and-deduplicate-text"],
    faqs: [
      {
        question: "What text cases can I convert between?",
        answer: "You can convert text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case in one click.",
      },
      {
        question: "What is the difference between camelCase and snake_case in programming?",
        answer: "camelCase (e.g. userProfileData) capitalizes each word without spaces and is standard in JavaScript/TypeScript. snake_case (e.g. user_profile_data) separates lowercase words with underscores, common in Python and SQL.",
      },
      {
        question: "How does Title Case handle small conjunctions and prepositions?",
        answer: "Standard Title Case capitalizes the primary words while keeping minor prepositions and conjunctions (such as in, on, of, the, and) lowercase unless they are the first word.",
      },
      {
        question: "Is my pasted text saved anywhere?",
        answer: "No. All case transformations are computed locally in your browser memory and cleared when you close the tab.",
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
        question: "What length and distance units are supported?",
        answer: "You can convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches with high floating-point precision.",
      },
      {
        question: "What is the exact conversion factor between inches and centimeters?",
        answer: "By international agreement (1959), 1 inch is defined as exactly 2.54 centimeters.",
      },
      {
        question: "How do I convert meters to feet quickly in my head?",
        answer: "Multiply meters by 3.28 (e.g. 10 meters is approximately 32.8 feet).",
      },
      {
        question: "Are scientific and engineering conversion decimals preserved?",
        answer: "Yes! Sahlino avoids premature rounding and displays clean, accurate results for both everyday tasks and engineering calculations.",
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
        question: "What is the difference between decimal (MB/GB) and binary (MiB/GiB)?",
        answer: "Decimal storage (SI) uses powers of 1,000 (1 KB = 1,000 Bytes, 1 MB = 1,000,000 Bytes). Binary storage (IEC) uses powers of 1,024 (1 KiB = 1,024 Bytes, 1 MiB = 1,048,576 Bytes). This explains why a 1TB hard drive appears as ~931 GB in Windows.",
      },
      {
        question: "How many Megabytes are in a Gigabyte?",
        answer: "In standard consumer storage, 1 Gigabyte (GB) equals 1,000 Megabytes (MB). In binary operating systems like Windows, 1 GiB equals 1,024 MiB.",
      },
      {
        question: "What units can I convert on Sahlino?",
        answer: "Convert between Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB) instantaneously.",
      },
      {
        question: "Why do internet service providers measure speed in Mbps instead of MB/s?",
        answer: "Broadband speeds are marketed in Megabits per second (Mbps). Since 8 bits equal 1 Byte, an 80 Mbps connection downloads data at a maximum speed of 10 Megabytes per second (MB/s).",
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
        question: "What number bases can I convert between?",
        answer: "Convert seamlessly between Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16), and Octal (Base 8).",
      },
      {
        question: "Why is Hexadecimal widely used in computer science?",
        answer: "Hexadecimal provides a human-friendly representation of binary-coded values. One hex digit corresponds directly to four binary bits (one nibble), making memory addresses and color codes (like #FFFFFF) compact.",
      },
      {
        question: "How does binary conversion work?",
        answer: "Binary expresses numbers using only 0 and 1, representing powers of 2. For example, decimal 13 equals binary 1101 (8 + 4 + 0 + 1).",
      },
      {
        question: "Does Sahlino support large integers without overflow?",
        answer: "Yes, Sahlino handles high-precision integers safely using JavaScript BigInt primitives to prevent rounding errors.",
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
    relatedArticles: ["how-to-calculate-exact-age-and-birthdays"],
    faqs: [
      {
        question: "How does Sahlino calculate exact chronological age?",
        answer: "Sahlino calculates the exact difference between your date of birth and the current date, accounting for varying month lengths (28 to 31 days) and leap years.",
      },
      {
        question: "How many days are left until my next birthday?",
        answer: "Sahlino displays a live countdown showing the exact days, hours, and day of the week for your upcoming birthday celebration.",
      },
      {
        question: "Can I see my total life duration in weeks, days, and hours?",
        answer: "Yes! The summary card breaks down your total existence into total months, weeks, days, hours, and minutes lived.",
      },
      {
        question: "Is my birth date kept private?",
        answer: "100% private. All date calculations run inside your browser runtime memory and are never saved or sent to any server.",
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
        question: "How secure are passwords generated by Sahlino?",
        answer: "Sahlino generates passwords using the browser native crypto.getRandomValues API, ensuring cryptographically secure entropy that cannot be predicted by brute-force attackers.",
      },
      {
        question: "What makes a password strong against dictionary attacks?",
        answer: "A strong password should be at least 16 characters long and combine uppercase letters, lowercase letters, numbers, and symbols while avoiding dictionary words, sequential characters, and personal information.",
      },
      {
        question: "Does Sahlino store or transmit my generated passwords?",
        answer: "Never. Passwords exist only in your device temporary memory. When you copy your password or close the tab, it disappears completely.",
      },
      {
        question: "Can I exclude ambiguous characters like 0, O, 1, and l?",
        answer: "Yes! You can toggle the \"Exclude ambiguous characters\" option to ensure your passwords are easy to read and type accurately on mobile devices.",
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
        question: "What are meta tags and why are they vital for SEO?",
        answer: "Meta tags are HTML snippets placed in the <head> section of a webpage that tell search engines (Google, Bing) and social platforms (Facebook, Twitter, LinkedIn) what your page is about and how to display it in search snippets and link preview cards.",
      },
      {
        question: "What is the purpose of Open Graph (OG) tags?",
        answer: "Open Graph tags (og:title, og:description, og:image, og:url) standardize how links appear when shared on social networks and messaging apps like WhatsApp and Slack.",
      },
      {
        question: "What are Twitter Card meta tags?",
        answer: "Twitter cards control rich media summaries (summary or summary_large_image) when links are posted to X / Twitter, dramatically improving social click-through rates.",
      },
      {
        question: "How do I copy the generated tags into my website?",
        answer: "Simply fill in your page details, preview the generated HTML code block, and click \"Copy Meta Tags\" to paste them directly into your website <head> tag.",
      },
    ],
    relatedArticles: ['how-to-create-custom-qr-codes'],
  },

  // 1. BMI Calculator
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator (Body Mass Index)',
    slug: 'bmi-calculator',
    description: 'Calculate your Body Mass Index (BMI), ideal healthy weight range, and WHO classification instantly in metric or imperial units.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'Activity',
    popular: true,
    status: 'available',
    tags: ['bmi', 'calculator', 'body mass index', 'weight', 'health', 'fitness', 'ideal weight', 'metric', 'imperial', 'حاسبة BMI', 'مؤشر كتلة الجسم'],
    seoTitle: 'Free BMI Calculator Online - Body Mass Index & Ideal Weight',
    seoDescription: 'Calculate your exact Body Mass Index (BMI) and find your healthy weight range with instant WHO categories. Fast, free, and accurate.',
    faqs: [
      {
        question: 'What is a healthy BMI range?',
        answer: 'According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal and healthy for adults.',
      },
      {
        question: 'What is the formula for calculating BMI?',
        answer: 'In metric units: BMI = Weight (kg) / [Height (m)]². In imperial: BMI = 703 * Weight (lbs) / [Height (inches)]².',
      },
      {
        question: 'Is BMI accurate for muscular athletes?',
        answer: 'BMI does not differentiate between dense muscle mass and adipose fat tissue. Muscular athletes may register as overweight despite low body fat. Pair BMI with waist circumference for a complete evaluation.',
      },
      {
        question: 'What is the ideal weight range for my height?',
        answer: 'Sahlino calculates your specific healthy weight boundaries based on a normal BMI range of 18.5 to 24.9 for your exact height.',
      },
    ],
    relatedArticles: ['how-to-calculate-bmi-healthy-weight'],
  },

  // 2. Discount Calculator
  {
    id: 'discount-calculator',
    name: 'Discount & Sales Tax Calculator',
    slug: 'discount-calculator',
    description: 'Calculate final price after store discounts, stacked promo coupons, and sales tax (VAT) with step-by-step savings breakdown.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'BadgePercent',
    popular: true,
    status: 'available',
    tags: ['discount', 'calculator', 'sales tax', 'vat', 'promo', 'coupon', 'savings', 'shopping', 'حاسبة الخصم', 'تخفيض'],
    seoTitle: 'Discount Calculator Online - Calculate Sales Price & Savings',
    seoDescription: 'Calculate final prices after discounts, percentage off, extra coupons, and sales tax. Free instant shopping math tool.',
    faqs: [
      {
        question: "How do I calculate a discount price quickly?",
        answer: "Multiply the original price by (1 - discount percentage as a decimal). For a $120 item with a 25% discount: 120 x (1 - 0.25) = 120 x 0.75 = $90 final price ($30 savings).",
      },
      {
        question: "Can Sahlino calculate extra stacked discounts?",
        answer: "Yes! If a store offers an additional coupon discount on top of a sale price, Sahlino calculates the compounded final price and total money saved.",
      },
      {
        question: "How does sales tax affect the discounted price?",
        answer: "Sahlino allows you to specify a sales tax rate, applying tax to the discounted subtotal so you know the exact final checkout cost.",
      },
      {
        question: "How do I calculate the original price from a sale tag?",
        answer: "Divide the sale price by (1 - discount rate). If you paid $60 after a 40% discount: 60 / 0.60 = $100 original price.",
      },
    ],
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
  },

  // 3. Loan & Mortgage Calculator
  {
    id: 'loan-calculator',
    name: 'Loan & Mortgage Payment Calculator',
    slug: 'loan-calculator',
    description: 'Compute monthly loan installments, total interest paid, and total loan payback cost with interactive term duration.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'Landmark',
    popular: true,
    status: 'available',
    tags: ['loan', 'calculator', 'mortgage', 'interest', 'monthly payment', 'finance', 'emi', 'car loan', 'حاسبة القرض', 'الفوائد'],
    seoTitle: 'Loan Payment Calculator - Calculate Monthly Installment & Interest',
    seoDescription: 'Calculate exact monthly loan payments, total interest costs, and total repayment amounts for personal, auto, and home loans.',
    faqs: [
      {
        question: "What is the standard amortization formula for monthly payments?",
        answer: "Monthly payment M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], where P is principal borrowed, r is monthly interest rate, and n is total number of monthly payments.",
      },
      {
        question: "What is the difference between APR and interest rate?",
        answer: "The interest rate represents the direct annual cost of borrowing. APR (Annual Percentage Rate) includes both the interest rate and mandatory lender fees and origination expenses.",
      },
      {
        question: "How does paying extra toward the principal save money?",
        answer: "Principal prepayments reduce the compounding balance directly, shrinking the interest charged in all remaining months and shortening the loan duration significantly.",
      },
      {
        question: "Does Sahlino Loan Calculator calculate total interest paid?",
        answer: "Yes! Sahlino displays your monthly installment, total interest paid over the loan lifespan, and the total cost of credit.",
      },
    ],
    relatedArticles: ['how-to-calculate-loan-interest-and-installments'],
  },

  // 4. Calorie & TDEE Calculator
  {
    id: 'calorie-calculator',
    name: 'Daily Calorie & TDEE Calculator',
    slug: 'calorie-calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) for weight loss, maintenance, or muscle gain.',
    category: 'calculators',
    categoryName: 'Calculators',
    iconName: 'Flame',
    popular: true,
    status: 'available',
    tags: ['calorie', 'calculator', 'tdee', 'bmr', 'diet', 'nutrition', 'weight loss', 'macros', 'حاسبة السعرات', 'السعرات الحرارية'],
    seoTitle: 'Free Calorie & TDEE Calculator - Daily Calories for Weight Goals',
    seoDescription: 'Calculate your exact BMR and daily calorie requirements (TDEE) based on age, gender, activity level, and weight goals.',
    faqs: [
      {
        question: "How does Sahlino calculate daily calorie needs?",
        answer: "Sahlino utilizes the clinically validated Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), then multiplies it by your physical activity factor to determine Total Daily Energy Expenditure (TDEE).",
      },
      {
        question: "What is Basal Metabolic Rate (BMR)?",
        answer: "BMR is the baseline number of calories your body burns at rest to maintain essential vital functions such as breathing, heart circulation, and cell regeneration.",
      },
      {
        question: "How many calories should I subtract to lose weight safely?",
        answer: "A caloric deficit of 500 calories per day typically results in approximately 0.5 kg (1 lb) of fat loss per week, which is considered a sustainable, healthy rate by clinical dietitians.",
      },
      {
        question: "How do activity multipliers affect daily calorie expenditure?",
        answer: "Sedentary lifestyles multiply BMR by 1.2, moderate exercise (3-5 days/week) multiplies BMR by 1.55, and intense athletic training multiplies BMR by 1.725 to 1.9.",
      },
    ],
    relatedArticles: ['how-to-calculate-bmi-healthy-weight'],
  },

  // 5. Date Difference & Countdown Calculator
  {
    id: 'date-calculator',
    name: 'Date Difference & Countdown Calculator',
    slug: 'date-calculator',
    description: 'Calculate exact days, weeks, and months between two dates, or add/subtract days from any starting date.',
    category: 'date-and-time',
    categoryName: 'Date & Time',
    iconName: 'Calendar',
    popular: false,
    status: 'available',
    tags: ['date', 'calculator', 'days between dates', 'countdown', 'calendar', 'time difference', 'حاسبة التاريخ', 'فرق الأيام'],
    seoTitle: 'Date Difference Calculator - Days Between Two Dates Online',
    seoDescription: 'Calculate the exact number of days, weeks, and months between two dates or add/subtract days with instant countdown.',
    faqs: [
      {
        question: "What calculations can I perform with Date Calculator?",
        answer: "Calculate the exact number of days, weeks, and months between two dates, or add/subtract custom days, weeks, or years from any starting date.",
      },
      {
        question: "Does the calculator account for leap years and month variations?",
        answer: "Yes! The calendar algorithm accounts for leap years, 28/29/30/31-day months, and daylight saving shifts automatically.",
      },
      {
        question: "How many business days are between two dates?",
        answer: "You can exclude weekends (Saturdays and Sundays or Fridays and Saturdays) to calculate official working days for project deadlines.",
      },
      {
        question: "Can I find the date 90 days from today?",
        answer: "Yes! Select the \"Add / Subtract Days\" mode, enter 90 days, and Sahlino will instantly reveal the exact future date and day of the week.",
      },
    ],
    relatedArticles: ['how-to-calculate-exact-age-and-birthdays'],
  },

  // 6. Split PDF
  {
    id: 'pdf-split',
    name: 'Split PDF Pages & Extract',
    slug: 'pdf-split',
    description: 'Split large PDF documents into separate pages or extract selected custom page ranges with 100% in-browser privacy.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'Scissors',
    popular: true,
    status: 'available',
    tags: ['pdf', 'split', 'extract pages', 'separate', 'cut pdf', 'divide', 'documents', 'تقسيم pdf', 'فصل صفحات'],
    seoTitle: 'Split PDF Online Free - Extract Pages from PDF in Browser',
    seoDescription: 'Split PDF files and extract specific pages online for free. Fast, client-side, secure, and preserves original resolution.',
    faqs: [
      {
        question: "How do I extract specific page ranges from a PDF?",
        answer: "Enter individual numbers separated by commas (e.g. \"1, 4, 7\") or continuous ranges separated by hyphens (e.g. \"3-8\") to extract only the pages you need.",
      },
      {
        question: "Will text searchability (OCR) and fonts be preserved?",
        answer: "Yes. Sahlino preserves underlying vector fonts, bookmarks, and searchable text layers without flattening or rasterization.",
      },
      {
        question: "Is my document uploaded to any cloud server?",
        answer: "Never. Splitting is executed 100% locally in your browser memory via pdf-lib; your files never touch remote infrastructure.",
      },
      {
        question: "Can I split password-protected PDF files?",
        answer: "Encrypted PDFs must have their security password removed before extraction so the browser sandbox can read and split page byte streams.",
      },
    ],
    relatedArticles: ['how-to-split-pdf-pages', 'how-to-merge-pdf-files-online'],
  },

  // 7. Rotate PDF
  {
    id: 'pdf-rotate',
    name: 'Rotate PDF Pages Online',
    slug: 'pdf-rotate',
    description: 'Permanently rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees and download immediately.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'RotateCw',
    popular: false,
    status: 'available',
    tags: ['pdf', 'rotate', 'turn pages', 'orientation', 'upside down', 'تدوير pdf', 'تعديل اتجاه'],
    seoTitle: 'Rotate PDF Online - Turn PDF Pages 90, 180, or 270 Degrees',
    seoDescription: 'Rotate individual or all pages of your PDF document permanently online for free. 100% private in-browser tool.',
    faqs: [
      {
        question: "How do I rotate upside-down or sideways PDF pages?",
        answer: "Upload your document, select 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees, and apply the rotation to all pages or selected pages.",
      },
      {
        question: "Is page rotation permanent in the downloaded PDF?",
        answer: "Yes! Sahlino updates the internal PDF page dictionary rotation angle tags, ensuring the document opens correctly in all PDF viewers and printers.",
      },
      {
        question: "Does rotating a PDF reduce document quality?",
        answer: "No. Rotating modifies metadata coordinate vectors without re-compressing images or text, maintaining 100% original quality.",
      },
      {
        question: "Is my PDF private during rotation?",
        answer: "100% private. Processing occurs locally in your browser memory without uploading your document to external servers.",
      },
    ],
    relatedArticles: ['how-to-merge-pdf-files-online'],
  },

  // Word to PDF Converter
  {
    id: 'word-to-pdf',
    name: 'Word to PDF Converter',
    slug: 'word-to-pdf',
    description: 'Convert Microsoft Word documents (.docx) to high-quality PDF files for free in your browser with 100% privacy.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'FileText',
    popular: true,
    status: 'available',
    tags: ['word to pdf', 'docx to pdf', 'convert word', 'word converter', 'doc to pdf', 'تحويل word الى pdf', 'تحويل وورد الى pdf', 'مستندات'],
    seoTitle: 'Convert Word to PDF Online - Free DOCX to PDF Converter | Sahlino',
    seoDescription: 'Convert Microsoft Word (.docx) documents to professional PDF files in seconds. 100% free, private, client-side conversion with zero server uploads.',
    faqs: [
      {
        question: 'Is my Word document uploaded to any server?',
        answer: 'No. The conversion is performed 100% locally in your browser memory. Your private documents never leave your computer.',
      },
      {
        question: 'Which Word formats are supported?',
        answer: 'Modern Microsoft Word (.docx) files are fully supported with headings, paragraphs, bullet points, and formatting preservation.',
      },
      {
        question: 'Can I customize font size and margins before downloading?',
        answer: 'Yes! You can choose page orientation (Portrait or Landscape), adjust font size, adjust margins, and preview before downloading.',
      },
    ],
    relatedArticles: ['how-to-convert-word-to-pdf', 'how-to-merge-pdf-files-online'],
  },

  // 8. Text to PDF
  {
    id: 'text-to-pdf',
    name: 'Text & Document to PDF Converter',
    slug: 'text-to-pdf',
    description: 'Convert typed or pasted text and notes into a clean, printable PDF document with customizable margins and font sizes.',
    category: 'document-tools',
    categoryName: 'Document & PDF Tools',
    iconName: 'FileText',
    popular: true,
    status: 'available',
    tags: ['text to pdf', 'convert text', 'txt to pdf', 'word to pdf', 'create pdf', 'print text', 'تحويل النص إلى pdf', 'مستند'],
    seoTitle: 'Convert Text to PDF Online - Free Plain Text & Document to PDF',
    seoDescription: 'Convert plain text, notes, or articles into polished PDF documents. Customize fonts, line heights, and margins with instant download.',
    faqs: [
      {
        question: "How does Text to PDF conversion work in Sahlino?",
        answer: "Type or paste plain text into the editor, customize font family, text size, line height, margins, and page orientation, and click Download to generate a professional PDF.",
      },
      {
        question: "Does Sahlino Text to PDF support Arabic and RTL text?",
        answer: "Yes! Full right-to-left (RTL) Arabic, Hebrew, and multilingual scripts are natively supported with proper ligatures and clean alignment.",
      },
      {
        question: "Can I print the resulting PDF on standard A4 paper?",
        answer: "Yes, the generated document conforms strictly to international A4 dimensions ready for immediate printing or digital sharing.",
      },
      {
        question: "Are my notes or articles uploaded to any server?",
        answer: "Never. Everything is rendered locally inside your browser client memory.",
      },
    ],
    relatedArticles: ['how-to-convert-word-to-pdf'],
  },

  // 9. Image Format Converter
  {
    id: 'image-converter',
    name: 'Image Format Converter (WebP, JPG, PNG)',
    slug: 'image-converter',
    description: 'Convert images seamlessly between JPG, PNG, and WebP formats with adjustable compression quality in your browser.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    iconName: 'ArrowLeftRight',
    popular: true,
    status: 'available',
    tags: ['image converter', 'webp to jpg', 'png to jpg', 'jpg to png', 'png to webp', 'format', 'convert', 'تحويل صيغ الصور'],
    seoTitle: 'Image Format Converter Online - Convert WebP, JPG, PNG Free',
    seoDescription: 'Convert images between WebP, PNG, and JPG formats effortlessly in your browser. Fast, free, high quality, and 100% private.',
    faqs: [
      {
        question: "What image formats can I convert between?",
        answer: "Convert freely between JPG, PNG, and WebP formats with adjustable compression quality settings.",
      },
      {
        question: "Why should I convert images to WebP?",
        answer: "WebP provides superior compression, reducing file size by 25% to 35% compared to JPG at equivalent visual quality, which accelerates website loading speeds.",
      },
      {
        question: "What happens to transparency when converting PNG to JPG?",
        answer: "Because JPG does not support alpha transparency, transparent areas are automatically replaced with a clean solid background color.",
      },
      {
        question: "Is there a file upload size limit?",
        answer: "Because images are processed locally using your device RAM, you can convert high-resolution photos up to 30MB smoothly.",
      },
    ],
    relatedArticles: ['difference-between-jpg-png-webp', 'how-to-compress-images-without-losing-quality'],
  },

  // 10. Rotate & Flip Image
  {
    id: 'image-rotate',
    name: 'Rotate & Flip Image Online',
    slug: 'image-rotate',
    description: 'Rotate images by 90, 180, or 270 degrees and flip horizontally or vertically with live instant canvas preview.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    iconName: 'FlipHorizontal',
    popular: false,
    status: 'available',
    tags: ['rotate image', 'flip image', 'mirror photo', 'turn picture', 'orientation', 'تدوير الصور', 'قلب الصورة'],
    seoTitle: 'Rotate & Flip Image Online Free - Mirror and Turn Photos',
    seoDescription: 'Rotate images 90 degrees clockwise or counter-clockwise, and flip horizontally or vertically with instant download.',
    faqs: [
      {
        question: "How does client-side image rotation work?",
        answer: "Your image is loaded into an HTML5 Canvas and rotated 90 degrees clockwise, 90 degrees counter-clockwise, or flipped horizontally/vertically in real time.",
      },
      {
        question: "Does rotating an image degrade its visual quality?",
        answer: "Sahlino preserves maximum pixel fidelity and allows you to download the rotated image in lossless PNG or optimized WebP/JPG.",
      },
      {
        question: "Can I flip an image as a mirror reflection?",
        answer: "Yes! Use the horizontal or vertical flip buttons to mirror selfie photos or invert graphic orientations.",
      },
      {
        question: "Are my photos uploaded to any external server?",
        answer: "No. All image canvas operations run strictly inside your local browser.",
      },
    ],
    relatedArticles: ['how-to-compress-images-without-losing-quality'],
  },

  // 11. Text Cleaner & Duplicate Remover
  {
    id: 'text-cleaner',
    name: 'Text Cleaner & Duplicate Line Remover',
    slug: 'text-cleaner',
    description: 'Remove duplicate lines, eliminate unnecessary whitespace, sort lines alphabetically, and clean up messy text strings.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'Sparkles',
    popular: true,
    status: 'available',
    tags: ['text cleaner', 'remove duplicate lines', 'trim spaces', 'sort lines', 'clean text', 'deduplicate', 'تنظيف النصوص', 'حذف المكرر'],
    seoTitle: 'Text Cleaner Online - Remove Duplicate Lines & Extra Spaces',
    seoDescription: 'Clean up text by removing duplicate rows, stripping empty spaces, sorting alphabetically, and normalizing line breaks.',
    faqs: [
      {
        question: "What text formatting issues does Sahlino Text Cleaner fix?",
        answer: "Remove duplicate lines, delete extra spaces, strip blank empty lines, convert letter case, and fix broken multi-line paragraphs from PDF copy-pasting.",
      },
      {
        question: "Is duplicate line removal case-sensitive?",
        answer: "You can choose between case-sensitive deduplication or case-insensitive matching to ensure exact cleaning for your dataset.",
      },
      {
        question: "Can I clean large lists of email addresses or data entries?",
        answer: "Yes! Sahlino handles tens of thousands of lines of text in milliseconds using optimized browser regex routines.",
      },
      {
        question: "Is my pasted data kept confidential?",
        answer: "100% confidential. No text is ever uploaded, cached, or logged on remote servers.",
      },
    ],
    relatedArticles: ['how-to-clean-and-deduplicate-text'],
  },

  // 12. Find & Replace Text
  {
    id: 'text-replace',
    name: 'Find and Replace Text Online',
    slug: 'text-replace',
    description: 'Search and replace words, phrases, or regular expression (RegEx) patterns in large blocks of text with live match counter.',
    category: 'text-tools',
    categoryName: 'Text Tools',
    iconName: 'Search',
    popular: false,
    status: 'available',
    tags: ['find and replace', 'search text', 'regex replace', 'word replace', 'batch replace', 'بحث واستبدال'],
    seoTitle: 'Find and Replace Text Online - Batch String & RegEx Replacer',
    seoDescription: 'Find and replace words, sentences, and RegEx patterns in your text with instant match preview and counter.',
    faqs: [
      {
        question: "Can I replace text using Regular Expressions (Regex)?",
        answer: "Yes! Toggle the Regex mode to use powerful pattern matching, capturing groups, and regular expression flags (g, i, m).",
      },
      {
        question: "What is the difference between Replace and Replace All?",
        answer: "Replace modifies only the first occurrence of your search term. Replace All substitutes every single occurrence throughout the entire document.",
      },
      {
        question: "Can I match case-sensitive terms?",
        answer: "Yes, toggle the \"Match Case\" option to distinguish between uppercase and lowercase letters during replacement.",
      },
      {
        question: "Does the tool show how many replacements were made?",
        answer: "Yes, Sahlino displays a live counter showing the exact number of matching terms found and replaced.",
      },
    ],
    relatedArticles: ['how-to-clean-and-deduplicate-text'],
  },

  // 13. HTML & CSS Formatter & Minifier
  {
    id: 'html-css-formatter',
    name: 'HTML & CSS Formatter & Minifier',
    slug: 'html-css-formatter',
    description: 'Beautify unformatted HTML and CSS with clean indentation or minify code for maximum web page loading speed.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'CodeXml',
    popular: true,
    status: 'available',
    tags: ['html formatter', 'css beautifier', 'minify html', 'minify css', 'developer', 'code clean', 'تنسيق html و css'],
    seoTitle: 'HTML & CSS Formatter & Minifier Online - Beautify Code',
    seoDescription: 'Format, beautify, and minify HTML and CSS code online for free. Clean syntax, indent properly, and compress file size.',
    faqs: [
      {
        question: "What is the benefit of formatting HTML and CSS code?",
        answer: "Formatting adds standardized indentation (2 or 4 spaces) and clean line breaks, making complex code structures easy to read, maintain, and debug.",
      },
      {
        question: "Can I minify HTML and CSS for production deployment?",
        answer: "Yes! Toggle the Minify mode to strip all comments, extra whitespaces, and blank lines, reducing payload bandwidth for faster web performance.",
      },
      {
        question: "Does Sahlino format code locally?",
        answer: "Yes! Parsing and beautification run 100% in your browser sandbox, keeping your proprietary code and template markup safe.",
      },
      {
        question: "Does the formatter detect unclosed HTML tags?",
        answer: "Yes, the parser checks document tree balance and highlights structural discrepancies in your HTML hierarchy.",
      },
    ],
    relatedArticles: ['how-to-format-validate-json-payloads'],
  },

  // 14. Unix Timestamp & Epoch Converter
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp & Epoch Converter',
    slug: 'timestamp-converter',
    description: 'Convert Unix epoch timestamps (seconds and milliseconds) to human-readable dates (UTC and Local), or generate timestamps from dates.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Clock',
    popular: false,
    status: 'available',
    tags: ['timestamp', 'epoch', 'unix time', 'converter', 'developer', 'utc', 'seconds to date', 'محول التوقيت الزمني'],
    seoTitle: 'Unix Timestamp Converter Online - Epoch to Human Readable Date',
    seoDescription: 'Convert Unix epoch timestamps to human-readable local and UTC dates, or generate timestamps from date pickers with live clock.',
    faqs: [
      {
        question: "What is Unix Epoch time?",
        answer: "Unix Epoch time is the total number of seconds (or milliseconds) that have elapsed since midnight Coordinated Universal Time (UTC) on January 1, 1970.",
      },
      {
        question: "Does Sahlino support both seconds and milliseconds timestamps?",
        answer: "Yes! Sahlino automatically detects 10-digit (seconds) and 13-digit (milliseconds) timestamps and converts them to human-readable dates.",
      },
      {
        question: "Can I convert a human date back into a Unix timestamp?",
        answer: "Yes! Select any date and time on the interactive calendar to instantly generate its corresponding Unix timestamp in UTC and local time.",
      },
      {
        question: "How do timezones affect Unix timestamps?",
        answer: "Unix timestamps are universal and independent of time zones. Sahlino displays the equivalent date in both UTC and your local device time zone.",
      },
    ],
    relatedArticles: ['how-to-format-validate-json-payloads'],
  },

  // 15. Color Converter (HEX, RGB, HSL)
  {
    id: 'color-converter',
    name: 'Color Converter (HEX, RGB, HSL)',
    slug: 'color-converter',
    description: 'Convert color codes between HEX, RGB, HSL, and CSS formats with interactive color picker and contrast checker.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Palette',
    popular: false,
    status: 'available',
    tags: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl', 'color picker', 'css color', 'محول الألوان'],
    seoTitle: 'Color Code Converter Online - HEX to RGB, HSL, and CSS',
    seoDescription: 'Convert colors between HEX, RGB, and HSL formats with live color preview, complementary palette, and easy copy buttons.',
    faqs: [
      {
        question: "What color formats can I convert between?",
        answer: "Convert seamlessly between HEX (#RRGGBB), RGB (Red, Green, Blue), HSL (Hue, Saturation, Lightness), and CMYK (Cyan, Magenta, Yellow, Key/Black).",
      },
      {
        question: "What is the difference between RGB and CMYK color spaces?",
        answer: "RGB is an additive color model designed for digital light-emitting displays (screens, phones). CMYK is a subtractive color model designed for physical ink printing.",
      },
      {
        question: "Can I copy color codes with one click?",
        answer: "Yes! Each color format includes a quick copy button and interactive color picker for immediate web design and CSS styling.",
      },
      {
        question: "How does HSL help in web design?",
        answer: "HSL makes it intuitive to create color variations. You can easily create lighter tints or darker shades by adjusting only the Lightness percentage while keeping Hue constant.",
      },
    ],
    relatedArticles: ['how-to-create-custom-qr-codes'],
  },

  // 16. Currency Converter
  {
    id: 'currency-converter',
    name: 'Currency Converter & Exchange Rates',
    slug: 'currency-converter',
    description: 'Convert between 30+ world currencies including USD, EUR, GBP, SAR, AED, EGP, KWD with quick comparison rates.',
    category: 'converters',
    categoryName: 'Converters',
    iconName: 'Coins',
    popular: true,
    status: 'available',
    tags: ['currency converter', 'exchange rates', 'usd to eur', 'sar to usd', 'aed', 'egp', 'money', 'forex', 'محول العملات', 'أسعار الصرف'],
    seoTitle: 'Currency Converter Online - Real-Time Exchange Rates Calculator',
    seoDescription: 'Convert between major global and regional currencies (USD, EUR, SAR, AED, EGP, GBP, JPY). Fast, accurate, and easy to use.',
    faqs: [
      {
        question: "How are foreign currency exchange rates determined?",
        answer: "Exchange rates represent global foreign exchange market values comparing national currencies (such as USD, EUR, GBP, SAR, AED, EGP, and JPY).",
      },
      {
        question: "Can I calculate two-way conversions and swap currencies?",
        answer: "Yes! Click the swap button to instantly reverse conversion between your source and target currencies.",
      },
      {
        question: "Does Sahlino save my financial calculation inputs?",
        answer: "No. Currency conversions run entirely in your local browser runtime memory with zero logging.",
      },
      {
        question: "What currencies are supported?",
        answer: "Major world currencies including US Dollar (USD), Euro (EUR), British Pound (GBP), Saudi Riyal (SAR), UAE Dirham (AED), Egyptian Pound (EGP), Japanese Yen (JPY), and more.",
      },
    ],
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
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

export function getAllCategories(): CategoryInfo[] {
  return CATEGORIES;
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === id || c.slug === id);
}
