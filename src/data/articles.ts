import { ArticleItem } from '../types';

export const ARTICLE_CATEGORIES = [
  { id: 'all', name: 'All Articles', nameAr: 'جميع المقالات' },
  { id: 'pdf-documents', name: 'PDF & Documents', nameAr: 'PDF والمستندات' },
  { id: 'images', name: 'Images & Photos', nameAr: 'الصور والتصميم' },
  { id: 'calculators', name: 'Calculators & Finance', nameAr: 'الحاسبات والمالية' },
  { id: 'converters', name: 'Unit Converters', nameAr: 'تحويل الوحدات' },
  { id: 'web-tools', name: 'Web & Dev Tools', nameAr: 'أدوات الويب والمطورين' },
  { id: 'productivity', name: 'Productivity & Text', nameAr: 'الإنتاجية والنصوص' },
  { id: 'guides', name: 'Guides & Tips', nameAr: 'شروحات ونصائح' },
];

export const ARTICLES: ArticleItem[] = [
  {
    id: 'how-to-convert-word-to-pdf',
    slug: 'how-to-convert-word-to-pdf',
    title: 'How to Convert Word Documents and Text to PDF for Free',
    titleAr: 'كيفية تحويل المستندات والنصوص إلى PDF مجاناً وبأعلى جودة',
    description: 'Learn the easiest and most secure methods to convert text, Word files, and documents to professional PDF files without losing formatting.',
    descriptionAr: 'تعرف على أسهل الطرق الآمنة لتحويل النصوص والمستندات إلى ملفات PDF احترافية دون فقدان التنسيق وبأعلى معايير الخصوصية.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-01-15',
    modifiedDate: '2025-03-01',
    relatedToolSlug: 'text-to-pdf',
    relatedArticles: ['how-to-merge-pdf-files-online', 'how-to-split-pdf-pages'],
    sections: [
      {
        heading: 'Why Convert Documents and Text to PDF?',
        headingAr: 'لماذا نحتاج إلى تحويل المستندات والنصوص إلى صيغة PDF؟',
        body: 'PDF (Portable Document Format) is the global gold standard for sharing business proposals, academic papers, and official invoices. Unlike Word (.docx) or plain text (.txt) files which may change appearance across different devices or operating systems, a PDF file preserves fonts, layouts, margins, and graphics exactly as created.',
        bodyAr: 'تعد صيغة PDF المعيار العالمي المفضل لمشاركة المستندات والتقارير الرسمية والأوراق الأكاديمية. على عكس ملفات Word أو النصوص العادية التي قد يتغير مظهرها أو خطوطها عند فتحها على أجهزة مختلفة، يحافظ ملف PDF على الخطوط والتنسيقات والهوامش بدقة تامة على كل جهاز.',
        bullets: [
          'Universal compatibility across smartphones, tablets, Windows, Mac, and Linux.',
          'Prevention of accidental text editing or unwanted layout shifts.',
          'Secure sharing with built-in compression for lightweight email attachments.',
        ],
        bulletsAr: [
          'توافق شامل مع جميع الأجهزة (الهواتف الذكية، الحواسيب، الأجهزة اللوحية).',
          'حماية المحتوى من التعديل العرضي أو تشوه التنسيق عند الطباعة.',
          'مشاركة سهلة مع ضغط مناسب لتقليل حجم المرفقات في البريد الإلكتروني.',
        ],
      },
      {
        heading: 'Step-by-Step: Converting Text to PDF in Your Browser',
        headingAr: 'خطوات تحويل النص إلى PDF مباشرة في المتصفح',
        body: 'With modern browser technology, you no longer need expensive desktop software or suspicious file upload services that compromise your confidential information. You can generate clean, paginated PDFs right inside Sahlino.',
        bodyAr: 'مع التقنيات الحديثة، لم تعد بحاجة لشراء برامج باهظة الثمن أو رفع ملفاتك الحساسة إلى خوادم غير موثوقة. يمكنك تحويل النصوص والمستندات مباشرة داخل متصفحك عبر منصة ساهلينو بكل أمان.',
        bullets: [
          'Step 1: Open Sahlino Text to PDF tool from the Documents category.',
          'Step 2: Paste or type your document text into the editor.',
          'Step 3: Customize font size, page margins, and orientation (Portrait or Landscape).',
          'Step 4: Click "Generate & Download PDF" to instantly save your file.',
        ],
        bulletsAr: [
          'الخطوة الأولى: افتح أداة "تحويل النص إلى PDF" على منصة ساهلينو.',
          'الخطوة الثانية: الصق النص أو اكتب المستند الذي ترغب في تحويله.',
          'الخطوة الثالثة: خصص حجم الخط، الهوامش، واتجاه الصفحة (عمودي أو أفقي).',
          'الخطوة الرابعة: اضغط على "تنزيل ملف PDF" ليتم إنشاء المستند وحفظه فوراً على جهازك.',
        ],
        tip: 'For multi-page reports, ensure clear heading breaks so your text flows naturally across page boundaries.',
        tipAr: 'نصيحة: للمستندات الطويلة، استخدم فقرات واضحة وعناوين فرعية لضمان تقسيم الصفحات بشكل مريح للقراءة.',
      },
    ],
    faqs: [
      {
        question: 'Will my confidential document be uploaded to your servers?',
        answer: 'Never. Sahlino utilizes client-side JavaScript to render PDFs directly in your web browser. Your text never leaves your device.',
      },
      {
        question: 'Can I print the generated PDF document directly?',
        answer: 'Yes, the generated PDF standard A4 file can be opened in Adobe Acrobat, Chrome, or any viewer and sent directly to standard printers.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يتم رفع مستنداتي إلى خوادم خارجية؟',
        answer: 'أبداً. تتم جميع عمليات التحويل والإنشاء بالكامل داخل متصفحك باستخدام تقنيات المعالجة المحلية، ولا تغادر بياناتك جهازك مطلقاً.',
      },
      {
        question: 'هل يدعم الملف الناتج الطباعة بمقاس A4 القياسي؟',
        answer: 'نعم، يتم إنشاء ملف PDF متوافق تماماً مع قياسات A4 العالمية ويمكن طباعته مباشرة بجودة ممتازة.',
      },
    ],
  },
  {
    id: 'how-to-compress-images-without-losing-quality',
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'How to Compress and Resize Images Without Losing Quality',
    titleAr: 'أفضل طريقة لتقليل حجم الصور وضغطها بدون فقدان الجودة',
    description: 'Discover how image compression algorithms work and how to reduce file sizes by up to 80% while maintaining crisp visual clarity.',
    descriptionAr: 'اكتشف كيف تعمل خوارزميات ضغط الصور وكيف تخفض حجم ملفاتك بنسبة تصل إلى 80% مع الحفاظ على وضوح التفاصيل ونقاء الألوان.',
    category: 'images',
    categoryName: 'Images & Photos',
    categoryNameAr: 'الصور والتصميم',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-01-20',
    modifiedDate: '2025-02-28',
    relatedToolSlug: 'image-resizer',
    relatedArticles: ['difference-between-jpg-png-webp', 'how-to-create-custom-qr-codes'],
    sections: [
      {
        heading: 'Lossy vs Lossless Image Compression Explained',
        headingAr: 'ما الفرق بين الضغط مع فقدان طفيف (Lossy) والضغط بدون فقدان (Lossless)؟',
        body: 'When resizing images for websites, emails, or government application forms, choosing between lossy and lossless compression determines the final file size and visual fidelity. Lossless compression removes redundant metadata while keeping every pixel identical. Lossy compression smartly discards color data imperceptible to the human eye, resulting in dramatically smaller file sizes.',
        bodyAr: 'عند إعداد الصور للمواقع أو التقديم على الوظائف أو إرسالها عبر البريد، يلعب نوع الضغط دوراً حاسماً. الضغط غير الفاقد (Lossless) يزيل البيانات الوصفية الزائدة مع الإبقاء على كل بكسل كما هو، بينما الضغط الذكي (Lossy) يقلل تدرجات لونية غير ملحوظة للعين البشرية مما ينتج ملفات أصغر بنسبة تصل إلى 80%.',
        bullets: [
          'JPEG: Best for photographs, portraits, and complex color scenery.',
          'PNG: Essential for screenshots, logos, and graphics requiring transparent backgrounds.',
          'WebP: Next-gen web standard offering 30% superior compression compared to old JPEG.',
        ],
        bulletsAr: [
          'صيغة JPEG: ممتازة للصور الفوتوغرافية وتوفر أصغر حجم للملف.',
          'صيغة PNG: مثالية للشعارات والرسومات التي تتطلب خلفية شفافة وتفاصيل نصوص حادة.',
          'صيغة WebP: الصيغة الحديثة الأقوى الموصى بها من Google لتقليل الحجم وتسريع المواقع.',
        ],
      },
      {
        heading: 'Practical Steps to Reduce Photo Sizes with Sahlino',
        headingAr: 'خطوات عملية لتقليل حجم الصورة عبر أداة ساهلينو',
        body: 'With Sahlino Image Resizer & Compressor, you can fine-tune dimensions (width & height in pixels), adjust the compression quality slider (80-85% is the sweet spot), and preview the resulting kilobyte size before saving.',
        bodyAr: 'من خلال أداة تغيير حجم وضغط الصور على ساهلينو، يمكنك ضبط الأبعاد المطلوبة ونسبة الجودة (85% هي النسبة المثالية)، ومعاينة الحجم المتوقع بالـ KB قبل التنزيل.',
        bullets: [
          'Upload your picture by clicking or dragging into the box.',
          'Lock aspect ratio so the photo never stretches abnormally.',
          'Set compression quality to 80-85% for the best balance.',
          'Download your compressed image instantly.',
        ],
        bulletsAr: [
          'اسحب الصورة وأفلتها في صندوق الأداة أو اخترها من جهازك.',
          'فعّل خيار الحفاظ على نسبة الأبعاد لتجنب تشوه الصورة.',
          'اختر جودة ضغط بين 80% و85% لتحصل على أصغر حجم دون أي تشويش.',
          'اضغط تنزيل لحفظ الصورة المحسنة فوراً.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the recommended photo size for website performance?',
        answer: 'Aim for under 150 KB for standard blog images, and under 300 KB for large hero banner images.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هو الحجم المثالي للصور عند نشرها على الإنترنت؟',
        answer: 'يفضل أن يكون حجم صور المقالات أقل من 150 كيلوبايت، وصور البانر الكبيرة أقل من 300 كيلوبايت لتفادي بطء تحميل الموقع.',
      },
    ],
  },
  {
    id: 'difference-between-jpg-png-webp',
    slug: 'difference-between-jpg-png-webp',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Use?',
    titleAr: 'الفرق بين صيغ الصور JPG و PNG و WebP ومتى تختار كل صيغة؟',
    description: 'A comprehensive guide comparing JPG, PNG, and WebP formats. Learn which format delivers the fastest loading speeds, sharpest transparency, and smallest file size.',
    descriptionAr: 'دليل شامل للمقارنة بين صيغ الصور الأكثر انتشاراً: JPG و PNG و WebP. متى تستخدم كل صيغة لتحقيق أقصى سرعة تحميل وأفضل نقاء بصري.',
    category: 'images',
    categoryName: 'Images & Photos',
    categoryNameAr: 'الصور والتصميم',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-01-25',
    modifiedDate: '2025-03-02',
    relatedToolSlug: 'image-converter',
    relatedArticles: ['how-to-compress-images-without-losing-quality'],
    sections: [
      {
        heading: 'Understanding Image Formats at a Glance',
        headingAr: 'نظرة سريعة على أهم صيغ الصور واستخداماتها',
        body: 'Choosing the right format can slash your webpage loading times in half and prevent blurry graphics. While JPEG has been the internet mainstay since 1992, modern formats like WebP offer superior mathematical efficiency.',
        bodyAr: 'اختيار الصيغة المناسبة يمكن أن يضاعف سرعة تحميل موقعك ويوفر مساحات تخزين ضخمة. بينما ظلت صيغة JPEG هي الأقدم، أحدثت صيغ WebP ثورة تقنية جعلت محركات البحث تفضلها بقوة.',
        bullets: [
          'JPEG / JPG: Ideal for photographic content with rich gradients. Does not support transparent backgrounds.',
          'PNG: Ideal for icons, logos, screenshots, and artwork where sharp text and transparent layers are required.',
          'WebP: Developed by Google to combine the photographic strengths of JPEG and the transparency of PNG at 25-35% smaller sizes.',
        ],
        bulletsAr: [
          'JPG / JPEG: الأفضل للصور الفوتوغرافية الطبيعية والشخصية (لا يدعم الخلفية الشفافة).',
          'PNG: الأفضل للشعارات والرسومات التوضيحية ولقطات الشاشة التي تتطلب شفافية تامة.',
          'WebP: صيغة العصر الحديث من Google تجمع بين خفة JPG وشفافية PNG بحجم أقل بنسبة 30%.',
        ],
      },
      {
        heading: 'How to Convert Between Formats on Sahlino',
        headingAr: 'كيفية تحويل الصور بين الصيغ بنقرة واحدة على ساهلينو',
        body: 'Using the Sahlino Image Format Converter, you can seamlessly convert PNG to WebP, WebP to JPG, or JPG to PNG directly inside your web browser. No software installation needed.',
        bodyAr: 'عبر أداة تحويل صيغ الصور في ساهلينو، يمكنك تحويل صورك بين WebP و PNG و JPG في أجزاء من الثانية وبأعلى نقاء، مباشرة داخل متصفحك دون إرسال بياناتك للخارج.',
      },
    ],
    faqs: [
      {
        question: 'Can all browsers open WebP images?',
        answer: 'Yes! All modern browsers including Google Chrome, Safari, Apple iOS, Android, Firefox, and Edge have full 100% native support for WebP.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تدعم جميع الأجهزة والمتصفحات صيغة WebP؟',
        answer: 'نعم، جميع المتصفحات الحديثة (Chrome, Safari, iOS, Android, Firefox, Edge) تدعم عرض وتنزيل WebP بنسبة 100%.',
      },
    ],
  },
  {
    id: 'how-to-merge-pdf-files-online',
    slug: 'how-to-merge-pdf-files-online',
    title: 'How to Merge Multiple PDF Files into One Document for Free',
    titleAr: 'طريقة دمج ملفات PDF متعددة في ملف واحد بسرعة وبأمان تام',
    description: 'Combine contracts, invoices, and study notes into a single organized PDF file effortlessly without software downloads.',
    descriptionAr: 'تعلم كيفية تجميع العقود والفواتير والمستندات في ملف PDF واحد مرتب دون الحاجة لتثبيت برامج وبأمان تام.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-01-28',
    modifiedDate: '2025-02-25',
    relatedToolSlug: 'pdf-merge',
    relatedArticles: ['how-to-split-pdf-pages', 'how-to-convert-word-to-pdf'],
    sections: [
      {
        heading: 'Why Merging PDF Documents is Essential',
        headingAr: 'أهمية دمج ملفات PDF في ملف واحد منظم',
        body: 'Submitting multiple scattered PDF attachments for visa applications, job submissions, or client presentations frequently results in lost documents and unprofessional presentations. Combining your files into one clean sequence makes review seamless.',
        bodyAr: 'تقديم عدة ملفات متفرقة عند التقديم للوظائف أو المعاملات الرسمية قد يسبب ضياع بعض الأوراق أو إرباك المراجعين. دمجها في ملف واحد يحمل تسلسلاً منطقياً يضمن احترافية تقديمك وسهولة تصفحه.',
        bullets: [
          'Create single consolidated dossiers for official submissions.',
          'Reorder pages and files logically before generating the output.',
          'Save storage and simplify file management on all your devices.',
        ],
        bulletsAr: [
          'إنشاء ملف موحد وشامل للمعاملات الإدارية والرسمية.',
          'ترتيب المستندات بالتسلسل المطلوب قبل التجميع النهائي.',
          'تسهيل الأرشفة والمشاركة عبر رسالة بريد واحدة.',
        ],
      },
      {
        heading: 'How Sahlino Merges PDFs Client-Side with 100% Privacy',
        headingAr: 'كيف تدمج ملفات PDF محلياً في متصفحك عبر ساهلينو',
        body: 'Most online PDF tools upload your sensitive financial statements and private IDs to remote cloud servers. Sahlino is different: our PDF engine runs directly on your computer hardware using WebAssembly and Javascript.',
        bodyAr: 'تطلب معظم المواقع الأخرى رفع مستنداتك وسجلاتك إلى خوادمها، بينما تستخدم ساهلينو محرك معالجة محلي يعمل على ذاكرة متصفحك مباشرة لضمان سرية وثائقك 100%.',
      },
    ],
    faqs: [
      {
        question: 'Is there any limit to the number of PDF files I can merge?',
        answer: 'You can merge dozens of files easily as long as your browser has sufficient local memory.',
      },
    ],
    faqsAr: [
      {
        question: 'هل هناك حد أقصى لعدد الملفات التي يمكن دمجها؟',
        answer: 'يمكنك دمج عشرات الملفات بكل سلاسة طالما تسمح ذاكرة جهازك، فالأداة مجانية وبدون قيود اصطناعية.',
      },
    ],
  },
  {
    id: 'how-to-split-pdf-pages',
    slug: 'how-to-split-pdf-pages',
    title: 'How to Split PDF Files and Extract Specific Pages',
    titleAr: 'كيفية تقسيم ملفات PDF واستخراج صفحات محددة بسهولة',
    description: 'Extract single pages or custom page ranges from large PDF documents without re-scanning or Adobe Acrobat subscriptions.',
    descriptionAr: 'طريقة استخراج صفحات محددة أو تقسيم كتاب ومستند PDF كبير إلى عدة ملفات صغيرة ومخصصة بضغطة زر.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '3 min read',
    readTimeAr: 'قراءة في 3 دقائق',
    publishedDate: '2025-02-02',
    modifiedDate: '2025-03-05',
    relatedToolSlug: 'pdf-split',
    relatedArticles: ['how-to-merge-pdf-files-online', 'how-to-convert-word-to-pdf'],
    sections: [
      {
        heading: 'When Do You Need to Split a PDF?',
        headingAr: 'متى تحتاج إلى تقسيم ملف PDF؟',
        body: 'Often a multi-hundred page PDF manual, bank statement, or contract contains only 2 or 3 pages you actually need to share with a partner, accountant, or authority. Splitting allows you to protect the privacy of unrelated pages and drastically reduce file size.',
        bodyAr: 'في كثير من الأحيان يحتوي كشف الحساب أو الكتاب على صفحات خاصة أو غير لازمة للمعاملة. يتيح لك تقسيم الـ PDF استخراج الصفحات التي تهمك فقط ومشاركتها مع الحفاظ على خصوصية باقي المستند.',
      },
    ],
  },
  {
    id: 'how-to-calculate-percentages-and-discounts',
    slug: 'how-to-calculate-percentages-and-discounts',
    title: 'How to Calculate Percentages, Discounts, and Sales Tax',
    titleAr: 'كيفية حساب النسبة المئوية والخصومات والضرائب بسهولة',
    description: 'Master practical percentage math formulas for everyday shopping, business profits, price markups, and discount calculations.',
    descriptionAr: 'دليل عملي شامل لحساب النسبة المئوية وخصومات المتاجر وضريبة القيمة المضافة ومعدلات التغير المالي بدقة.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-05',
    modifiedDate: '2025-03-01',
    relatedToolSlug: 'percentage-calculator',
    relatedArticles: ['how-to-calculate-bmi-healthy-weight', 'how-to-calculate-loan-interest-and-installments'],
    sections: [
      {
        heading: 'The Core Percentage Formulas Everyone Needs',
        headingAr: 'المعادلات الأساسية لحساب النسب المئوية التي يحتاجها الجميع',
        body: 'A percentage represents parts per hundred. Calculating what X is as a percentage of Y, or finding the result of a 25% discount on an item, follows simple mathematical steps.',
        bodyAr: 'النسبة المئوية هي تعبير عن قيمة بالنسبة إلى الرقم 100. لمعرفة نسبة رقم من رقم آخر، أو حساب سعر منتج بعد خصم 30% مع الضريبة، تحتاج لمعادلات واضحة توفر عليك الحسابات المعقدة.',
        bullets: [
          'What is P% of Number X? Formula: (P / 100) * X',
          'Percentage Difference between Old and New: ((New - Old) / Old) * 100',
          'Discounted Price: Original Price * (1 - (Discount% / 100))',
        ],
        bulletsAr: [
          'حساب كم يساوي X% من رقم: (النسبة ÷ 100) × الرقم الأساسي.',
          'حساب نسبة الزيادة أو النقصان: ((القيمة الجديدة - القديمة) ÷ القديمة) × 100.',
          'حساب السعر بعد الخصم: السعر الأصلي × (1 - (نسبة الخصم ÷ 100)).',
        ],
      },
    ],
  },
  {
    id: 'how-to-calculate-bmi-healthy-weight',
    slug: 'how-to-calculate-bmi-healthy-weight',
    title: 'How to Calculate Body Mass Index (BMI) and Find Your Healthy Weight',
    titleAr: 'دليل حساب مؤشر كتلة الجسم BMI وكيفية معرفة وزنك المثالي',
    description: 'Learn the scientific formula for BMI, what the classification categories mean, and practical steps toward achieving a healthy lifestyle.',
    descriptionAr: 'تعرف على المعادلة الطبية المعتمدة لحساب مؤشر كتلة الجسم وتصنيفات الوزن من النحافة إلى الوزن المثالي والسمنة.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-10',
    modifiedDate: '2025-03-04',
    relatedToolSlug: 'bmi-calculator',
    relatedArticles: ['how-to-calculate-exact-age-and-birthdays'],
    sections: [
      {
        heading: 'What is BMI and Why Does it Matter?',
        headingAr: 'ما هو مؤشر كتلة الجسم (BMI) ولماذا هو مهم؟',
        body: 'Body Mass Index (BMI) is a clinical screening tool defined by the World Health Organization (WHO) that compares an individual\'s weight against their height squared (Weight in kg / (Height in meters)^2).',
        bodyAr: 'مؤشر كتلة الجسم هو مقياس طبي معتمد من منظمة الصحة العالمية لتقييم مدى ملاءمة وزن الشخص لطوله، ويحسب بقسمة الوزن بالكيلوجرام على مربع الطول بالمتر.',
        bullets: [
          'Underweight: BMI below 18.5',
          'Normal / Healthy Weight: BMI between 18.5 and 24.9',
          'Overweight: BMI between 25 and 29.9',
          'Obese: BMI 30 and above',
        ],
        bulletsAr: [
          'نقص في الوزن: أقل من 18.5',
          'وزن مثالي وصحي: من 18.5 إلى 24.9',
          'وزن زائد: من 25 إلى 29.9',
          'سمنة: 30 فما فوق',
        ],
      },
    ],
  },
  {
    id: 'how-to-calculate-exact-age-and-birthdays',
    slug: 'how-to-calculate-exact-age-and-birthdays',
    title: 'How to Calculate Exact Chronological Age in Years, Months, and Days',
    titleAr: 'طريقة حساب العمر الدقيق بالسنوات والأشهر والأيام وحساب المواليد',
    description: 'Discover how chronological age calculations account for leap years, days in each month, and how to count down to upcoming birthdays.',
    descriptionAr: 'اكتشف كيف يتم حساب العمر الزمني بدقة متناهية مع مراعاة السنوات الكبيسة وتفاوت أيام الشهور والعد التنازلي لعيد ميلادك القادم.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '3 min read',
    readTimeAr: 'قراءة في 3 دقائق',
    publishedDate: '2025-02-12',
    modifiedDate: '2025-03-06',
    relatedToolSlug: 'age-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'The Nuances of Accurate Age Computation',
        headingAr: 'أسرار الحساب الدقيق للعمر ومراعاة السنوات الكبيسة',
        body: 'Simple division of days by 365 produces inaccurate ages because leap years contain 366 days and months range from 28 to 31 days. A proper chronological age tool calculates exact date boundaries.',
        bodyAr: 'القسمة التقليدية للأيام على 365 تعطي أرقاماً غير دقيقة بسبب تباين أيام الأشهر بين 28 و31 ووجود السنوات الكبيسة. حاسبة ساهلينو تطبق خوارزمية دقيقة تحسب الأيام الفعلية بدقة.',
      },
    ],
  },
  {
    id: 'how-to-create-custom-qr-codes',
    slug: 'how-to-create-custom-qr-codes',
    title: 'How to Generate Custom QR Codes for WiFi, Links, and Contacts',
    titleAr: 'كيفية إنشاء وتخصيص رمز QR للواي فاي والمواقع وجهات الاتصال',
    description: 'Create high-resolution, branded QR codes for your business cards, menus, WiFi networks, and marketing materials.',
    descriptionAr: 'طريقة توليد رموز QR احترافية ومخصصة بشعارك وألوانك لمشاركة شبكات الواي فاي ومواقع الويب وقوائم المطاعم بسهولة.',
    category: 'web-tools',
    categoryName: 'Web & Dev Tools',
    categoryNameAr: 'أدوات الويب والمطورين',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-02-15',
    modifiedDate: '2025-03-02',
    relatedToolSlug: 'qr-code-generator',
    relatedArticles: ['how-to-compress-images-without-losing-quality'],
    sections: [
      {
        heading: 'Why QR Codes Dominate Modern Quick Sharing',
        headingAr: 'لماذا أصبحت رموز الاستجابة السريعة (QR) ركيزة التفاعل الحديث؟',
        body: 'With native smartphone camera scanning, QR codes bridge the physical and digital worlds. From connecting visitors instantly to your home or office WiFi without typing long passwords, to opening product pages and digital menus.',
        bodyAr: 'بفضل قدرة كاميرات الهواتف الذكية على قراءة الرموز فوراً، أصبحت رموز QR أسرع وسيلة لربط العالم الحقيقي بالعالم الرقمي، كالاتصال التلقائي بشبكة الواي فاي أو فتح صفحات الدفع والروابط.',
      },
    ],
  },
  {
    id: 'how-to-count-words-characters-for-seo',
    slug: 'how-to-count-words-characters-for-seo',
    title: 'How to Count Words and Characters Accurately for Content Writers and SEO',
    titleAr: 'كيفية حساب عدد الكلمات والأحرف وقراءة المقالات لكتاب المحتوى',
    description: 'Learn optimal character lengths for Google meta descriptions, social media character limits, and blog readability analysis.',
    descriptionAr: 'تعرف على الحدود المثلى لعدد الكلمات والأحرف في مقالات المدونات ووسوم ميتا في جوجل ومنشورات وسائل التواصل الاجتماعي.',
    category: 'productivity',
    categoryName: 'Productivity & Text',
    categoryNameAr: 'الإنتاجية والنصوص',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-02-18',
    modifiedDate: '2025-03-05',
    relatedToolSlug: 'word-counter',
    relatedArticles: ['how-to-format-validate-json-payloads'],
    sections: [
      {
        heading: 'Recommended Text Lengths for Digital Publishing',
        headingAr: 'الأطوال والحدود الموصى بها في كتابة المحتوى الرقمي',
        body: 'Search engines and social platforms enforce strict character bounds. Keeping your titles and descriptions within safe limits prevents truncation with ellipses in search results.',
        bodyAr: 'تفرض محركات البحث وشبكات التواصل حدوداً صارمة على عدد الأحرف. مراعاة هذه الحدود يضمن عدم اقتطاع عناوينك في نتائج البحث وتوصيل رسالتك كاملة.',
        bullets: [
          'Google Title Tag: 50-60 characters (580 pixels max).',
          'Google Meta Description: 150-160 characters.',
          'X / Twitter post: 280 characters standard limit.',
          'In-depth SEO Blog Post: 1,200 to 2,500 words.',
        ],
        bulletsAr: [
          'عنوان صفحة Google (Title): بين 50 و60 حرفاً.',
          'وصف الميتا في Google (Description): بين 150 و160 حرفاً.',
          'منشور منصة X (تويتر سابقاً): 280 حرفاً كحد أقصى للحسابات العادية.',
          'المقالات المتعمقة المتصدرة في SEO: من 1200 إلى 2500 كلمة.',
        ],
      },
    ],
  },
  {
    id: 'how-to-format-validate-json-payloads',
    slug: 'how-to-format-validate-json-payloads',
    title: 'How to Format, Validate, and Debug JSON Payloads Like a Pro',
    titleAr: 'دليل المطور: كيفية تنسيق وفحص أكواد JSON وتصحيح أخطاء بناء الجملة',
    description: 'Understand common JSON syntax errors like trailing commas, unescaped quotes, and learn how to beautify minified API responses.',
    descriptionAr: 'افهم أسباب أشهر أخطاء بناء جمل JSON مثل الفواصل الزائدة وعلامات التنصيص غير المغلقة وطرق تجميل البيانات وتصحيحها فورياً.',
    category: 'web-tools',
    categoryName: 'Web & Dev Tools',
    categoryNameAr: 'أدوات الويب والمطورين',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-02-22',
    modifiedDate: '2025-03-07',
    relatedToolSlug: 'json-formatter',
    relatedArticles: ['how-to-count-words-characters-for-seo'],
    sections: [
      {
        heading: 'The 3 Most Common JSON Syntax Mistakes',
        headingAr: 'أكثر 3 أخطاء شائعة في كتابة وبناء ملفات JSON',
        body: 'JSON is strict by design. Even one extraneous character will cause parsers to fail with a syntax error.',
        bodyAr: 'صيغة JSON صارمة جداً في قواعدها، وأي خطأ بسيط في علامات الترقيم سيؤدي لفشل قراءة البيانات من قبل واجهات API.',
        bullets: [
          'Trailing commas after the final object property or array item.',
          'Using single quotes instead of double quotes for property keys.',
          'Unescaped special characters or newlines inside string values.',
        ],
        bulletsAr: [
          'وضع فاصلة زائدة (Trailing comma) بعد آخر عنصر في الكائن أو المصفوفة.',
          'استخدام علامات تنصيص فردية بدل المزدوجة في تسمية المفاتيح والقيم.',
          'عدم إغلاق الأقواس أو تضمين حروف خاصة غير مهربة داخل النصوص.',
        ],
      },
    ],
  },
  {
    id: 'how-to-calculate-loan-interest-and-installments',
    slug: 'how-to-calculate-loan-interest-and-installments',
    title: 'How to Calculate Monthly Loan Payments, Total Interest, and Amortization',
    titleAr: 'كيفية حساب أقساط القروض والفوائد الشهرية وجداول السداد بسهولة',
    description: 'Learn how banking interest rates, loan terms, and principal balances determine your monthly payment and total cost of borrowing.',
    descriptionAr: 'تعلم كيف تؤثر معدلات الفائدة البنكية وفترة التمويل في قيمة القسط الشهري وإجمالي الفائدة المدفوعة على مدار القرض.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-25',
    modifiedDate: '2025-03-08',
    relatedToolSlug: 'loan-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'How Fixed Monthly Installments are Calculated',
        headingAr: 'كيف يتم حساب القسط الشهري الثابت (الأقساط المتساوية)؟',
        body: 'Most personal, auto, and home mortgage loans use standard amortization where payments remain identical each month, but the proportion going toward principal versus interest shifts over time.',
        bodyAr: 'تعتمد أغلب القروض الشخصية وتمويل السيارات والعقارات على نظام الأقساط الشهرية الثابتة، حيث تسدد في الشهور الأولى نسبة فوائد أعلى بينما تزيد نسبة سداد أصل المبلغ تدريجياً.',
      },
    ],
  },
  {
    id: 'how-to-clean-and-deduplicate-text',
    slug: 'how-to-clean-and-deduplicate-text',
    title: 'How to Clean Up Messy Text, Remove Duplicates, and Format Lines',
    titleAr: 'طريقة تنظيف النصوص وإزالة الأسطر المكررة والمسافات الزائدة',
    description: 'Clean up copied lists, CSV rows, and messy text entries by eliminating duplicate lines, stripping empty spaces, and sorting alphabetically.',
    descriptionAr: 'نظف القوائم والبيانات العشوائية عبر حذف الأسطر المكررة وإزالة المسافات الفارغة وترتيب النصوص أبجدياً بنقرة واحدة.',
    category: 'productivity',
    categoryName: 'Productivity & Text',
    categoryNameAr: 'الإنتاجية والنصوص',
    readTime: '3 min read',
    readTimeAr: 'قراءة في 3 دقائق',
    publishedDate: '2025-03-01',
    modifiedDate: '2025-03-09',
    relatedToolSlug: 'text-cleaner',
    relatedArticles: ['how-to-count-words-characters-for-seo'],
    sections: [
      {
        heading: 'Why Text Cleaning Saves Hours of Manual Work',
        headingAr: 'لماذا يوفر تنظيف النصوص ساعات من العمل اليدوي المرهق؟',
        body: 'Whether working with email lists, product SKUs, research survey responses, or code snippets, duplicate rows and inconsistent spacing create clutter and spreadsheet errors. An automated text cleaner solves these problems instantaneously.',
        bodyAr: 'سواء كنت تتعامل مع قوائم بريد أو أرقام هواتف أو بيانات تم نسخها من جداول مختلفة، فإن وجود فراغات أو أسطر مكررة يعطل أعمالك. أداة تنظيف النصوص تنجز المهمة في لحظة واحدة.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categoryId: string): ArticleItem[] {
  if (categoryId === 'all') return ARTICLES;
  return ARTICLES.filter((a) => a.category === categoryId);
}

export function getRelatedArticles(currentSlug: string, limit = 3): ArticleItem[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return ARTICLES.slice(0, limit);

  if (current.relatedArticles && current.relatedArticles.length > 0) {
    const explicit = ARTICLES.filter((a) => current.relatedArticles?.includes(a.slug));
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  const sameCategory = ARTICLES.filter((a) => a.category === current.category && a.slug !== currentSlug);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const others = ARTICLES.filter((a) => a.slug !== currentSlug);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getArticlesForTool(toolSlug: string): ArticleItem[] {
  return ARTICLES.filter((a) => a.relatedToolSlug === toolSlug);
}

export function searchArticles(query: string): ArticleItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];
  return ARTICLES.filter((a) => {
    return (
      a.title.toLowerCase().includes(clean) ||
      a.titleAr.includes(clean) ||
      a.description.toLowerCase().includes(clean) ||
      a.descriptionAr.includes(clean) ||
      a.categoryName.toLowerCase().includes(clean) ||
      a.categoryNameAr.includes(clean)
    );
  });
}
