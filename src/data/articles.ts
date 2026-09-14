import { ArticleItem } from '../types';
export type { ArticleItem };

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
  // 1. Word to PDF
  {
    id: 'how-to-convert-word-to-pdf',
    slug: 'how-to-convert-word-to-pdf',
    title: 'How to Convert Word Documents and Text to PDF for Free',
    titleAr: 'كيفية تحويل ملفات Word والمستندات والنصوص إلى PDF مجاناً وبأعلى جودة',
    description: 'Learn the easiest and most secure methods to convert Word (.docx), text files, and documents to professional PDF files without losing formatting.',
    descriptionAr: 'تعرف على أسهل الطرق الآمنة لتحويل ملفات Word (.docx) والنصوص إلى ملفات PDF احترافية دون فقدان التنسيق وبأعلى معايير الخصوصية.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-01-15',
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'word-to-pdf',
    relatedArticles: ['how-to-merge-pdf-files-online', 'how-to-split-pdf-pages'],
    sections: [
      {
        heading: 'Why Convert Word Documents and Text to PDF?',
        headingAr: 'لماذا نحتاج إلى تحويل مستندات Word والنصوص إلى صيغة PDF؟',
        body: 'PDF (Portable Document Format) is the global gold standard for sharing business proposals, academic papers, contracts, and official invoices. Unlike Word (.docx) or plain text (.txt) files which may change appearance across different devices, fonts, or operating systems, a PDF file preserves fonts, layouts, margins, and graphics exactly as created.',
        bodyAr: 'تعد صيغة PDF المعيار العالمي المفضل لمشاركة المستندات والتقارير الرسمية والأوراق الأكاديمية والعقود. على عكس ملفات Word أو النصوص العادية التي قد يتغير مظهرها أو خطوطها عند فتحها على أجهزة مختلفة أو برامج غير متوافقة، يحافظ ملف PDF على الخطوط والتنسيقات والهوامش بدقة تامة على كل جهاز وشاشة.',
        bullets: [
          'Universal compatibility across smartphones, tablets, Windows, Mac, and Linux.',
          'Prevention of accidental text editing, layout shifts, or missing fonts.',
          'Standardized printing ready for A4 paper and legal submissions.',
          'Built-in compression for lightweight email attachments and secure cloud sharing.',
        ],
        bulletsAr: [
          'توافق شامل مع جميع الأجهزة (الهواتف الذكية، الحواسيب، الأجهزة اللوحية بكافة أنظمتها).',
          'حماية المحتوى من التعديل العرضي أو تشوه التنسيق واختفاء الخطوط عند الطباعة.',
          'تنسيق قياسي معتمد للطباعة على ورق A4 والمعاملات الحكومية والرسمية.',
          'مشاركة سهلة مع ضغط مناسب لتقليل حجم المرفقات في البريد الإلكتروني.',
        ],
      },
      {
        heading: 'Step-by-Step: Converting Word (.docx) to PDF with Sahlino',
        headingAr: 'خطوات تحويل مستند Word إلى PDF مباشرة في المتصفح',
        body: 'With Sahlino Word to PDF tool, you no longer need expensive desktop software subscriptions or insecure upload services that compromise confidential contracts and resumes. The entire conversion happens directly in your browser memory.',
        bodyAr: 'مع أداة تحويل Word إلى PDF على منصة ساهلينو، لم تعد بحاجة لشراء برامج باهظة الثمن أو رفع ملفاتك وسيرتك الذاتية الحساسة إلى خوادم مجهولة. تتم جميع مراحل التحويل مباشرة داخل ذاكرة متصفحك.',
        bullets: [
          'Step 1: Open the Word to PDF Converter tool on Sahlino.',
          'Step 2: Drag and drop your .docx file into the upload box or select it from your device.',
          'Step 3: Preview the extracted formatted text and verify headings, lists, and paragraphs.',
          'Step 4: Adjust page orientation (Portrait or Landscape), margins, and font size if desired.',
          'Step 5: Click "Convert & Download PDF" to instantly save your file.',
        ],
        bulletsAr: [
          'الخطوة الأولى: افتح أداة "محول Word إلى PDF" على منصة ساهلينو.',
          'الخطوة الثانية: اسحب ملف Word (.docx) وأفلته في المربع أو اختره من جهازك.',
          'الخطوة الثالثة: عاين المستند المنسق وتأكد من اكتمال العناوين والفقرات والقوائم.',
          'الخطوة الرابعة: اختر اتجاه الصفحة (عمودي أو أفقي) وحجم الخط والهوامش المناسبة.',
          'الخطوة الخامسة: اضغط على "تحويل وتنزيل PDF" ليتم إنشاء المستند وحفظه فوراً على جهازك.',
        ],
        tip: 'For official resumes and business contracts, keep page margins standard (20mm) and ensure font size is set to 14pt for optimal legibility.',
        tipAr: 'نصيحة: للسير الذاتية والعقود الرسمية، يُفضل اختيار هوامش قياسية (20 ملم) وحجم خط 14pt لضمان مظهر احترافي ومريح للقراءة والطباعة.',
      },
      {
        heading: 'Privacy and Security: Zero Server Uploads',
        headingAr: 'الأمان والخصوصية: صفر رفع إلى الخوادم',
        body: 'Most online document converters send your files to remote servers where they may be stored, indexed, or analyzed. Sahlino utilizes modern client-side WebAssembly and JavaScript libraries. Your files are decrypted, parsed, and converted entirely inside your browser sandbox.',
        bodyAr: 'تقوم معظم مواقع التحويل التقليدية برفع مستنداتك إلى خوادم سحابية خارجية قد تحتفظ بنسخ منها. في ساهلينو، نعتمد على المعالجة المحلية داخل متصفحك، مما يضمن بقاء وثائقك الشخصية والمالية آمنة 100% داخل جهازك دون أن تلمس أي خادم.',
      },
    ],
    faqs: [
      {
        question: 'Will my confidential Word document be uploaded to your servers?',
        answer: 'Never. Sahlino utilizes client-side JavaScript to render PDFs directly in your web browser. Your text and files never leave your device.',
      },
      {
        question: 'Can I print the generated PDF document directly?',
        answer: 'Yes, the generated PDF standard A4 file can be opened in Adobe Acrobat, Chrome, or any viewer and sent directly to standard printers.',
      },
      {
        question: 'Does it support Arabic text and Right-to-Left (RTL) formatting?',
        answer: 'Yes! Sahlino fully supports Arabic, English, and multilingual text with automatic right-to-left line alignment and crisp typography.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يتم رفع مستنداتي أو ملفات الـ Word إلى خوادم خارجية؟',
        answer: 'أبداً. تتم جميع عمليات التحويل والإنشاء بالكامل داخل متصفحك باستخدام تقنيات المعالجة المحلية، ولا تغادر بياناتك جهازك مطلقاً.',
      },
      {
        question: 'هل يدعم الملف الناتج الطباعة بمقاس A4 القياسي؟',
        answer: 'نعم، يتم إنشاء ملف PDF متوافق تماماً مع قياسات A4 العالمية ويمكن طباعته مباشرة بجودة ممتازة.',
      },
      {
        question: 'هل تدعم الأداة اللغة العربية وتنسيق النصوص من اليمين لليسار؟',
        answer: 'نعم، تدعم الأداة اللغة العربية والنصوص ثنائية اللغة تلقائياً مع محاذاة صحيحة للسطور وجودة خطوط واضحة جداً.',
      },
    ],
  },

  // 2. Compress Images
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
    modifiedDate: '2026-09-14',
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
        tip: 'For website banners, resizing width to a maximum of 1920px before applying 80% quality compression can shrink a 10MB photo down to under 250KB.',
        tipAr: 'نصيحة: لصور المواقع والمدونات، قلل العرض إلى 1920 بكسل كحد أقصى مع نسبة جودة 80% لتحويل صورة بحجم 10 ميجابايت إلى أقل من 250 كيلوبايت.',
      },
    ],
    faqs: [
      {
        question: 'What is the recommended photo size for website performance?',
        answer: 'Aim for under 150 KB for standard blog images, and under 300 KB for large hero banner images.',
      },
      {
        question: 'Will compressing an image make it look blurry?',
        answer: 'At 80-85% quality, compression artifacts are virtually invisible to the human eye on modern high-DPI screens.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هو الحجم المثالي للصور عند نشرها على الإنترنت؟',
        answer: 'يفضل أن يكون حجم صور المقالات أقل من 150 كيلوبايت، وصور البانر الكبيرة أقل من 300 كيلوبايت لتفادي بطء تحميل الموقع.',
      },
      {
        question: 'هل يؤدي ضغط الصورة إلى تشويشها أو ضبابيتها؟',
        answer: 'عند اختيار نسبة جودة بين 80% و85%، يظل الفقدان اللوني غير ملحوظ إطلاقاً للعين البشرية حتى على شاشات الهواتف الحديثة.',
      },
    ],
  },

  // 3. Difference between JPG, PNG, WebP
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
    modifiedDate: '2026-09-14',
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
        bullets: [
          'Convert PNG with transparent backgrounds to WebP to save up to 70% storage.',
          'Convert camera JPG photos to WebP for lightning-fast website performance.',
          'Convert WebP to PNG or JPG if you need compatibility with legacy graphic editors.',
        ],
        bulletsAr: [
          'تحويل صور PNG ذات الخلفية الشفافة إلى WebP لتوفير 70% من المساحة.',
          'تحويل صور الكاميرا JPG إلى WebP لتسريع صفحات الويب بشكل كبير.',
          'تحويل WebP إلى PNG أو JPG عند الحاجة لتعديلها ببرامج تصميم قديمة لا تدعم WebP.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can all browsers open WebP images?',
        answer: 'Yes! All modern browsers including Google Chrome, Safari, Apple iOS, Android, Firefox, and Edge have full 100% native support for WebP.',
      },
      {
        question: 'Does converting WebP to PNG increase file size?',
        answer: 'Yes, because PNG is a less aggressively compressed format designed for lossless precision, converting WebP to PNG typically results in a larger file.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تدعم جميع الأجهزة والمتصفحات صيغة WebP؟',
        answer: 'نعم، جميع المتصفحات الحديثة (Chrome, Safari, iOS, Android, Firefox, Edge) تدعم عرض وتنزيل WebP بنسبة 100%.',
      },
      {
        question: 'هل يؤدي تحويل WebP إلى PNG لزيادة حجم الملف؟',
        answer: 'نعم، نظراً لأن PNG صيغة ضغط غير فاقدة ولا تستخدم خوارزميات التنبؤ المتقدمة لـ WebP، سيزداد حجم الملف بعد التحويل.',
      },
    ],
  },

  // 4. Merge PDF
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'pdf-merge',
    relatedArticles: ['how-to-split-pdf-pages', 'how-to-convert-word-to-pdf'],
    sections: [
      {
        heading: 'Why Merging PDF Documents is Essential',
        headingAr: 'أهمية دمج ملفات PDF في ملف واحد منظم',
        body: 'Submitting multiple scattered PDF attachments for visa applications, job submissions, or client presentations frequently results in lost documents and unprofessional presentations. Combining your files into one clean sequence makes review seamless.',
        bodyAr: 'تقديم عدة ملفات متفرقة عند التقديم للوظائف أو المعاملات الرسمية قد يسبب ضياع بعض الأوراق أو إرباك المراجعين. دمجها في ملف واحد يحمل تسلسلاً منطقياً يضمن احترافية تقديمك وسهولة تصفحه.',
        bullets: [
          'Create single consolidated dossiers for official submissions and government portals.',
          'Reorder pages and files logically before generating the output.',
          'Save storage and simplify file management on all your devices.',
          'Avoid email bounce errors caused by sending dozens of small attachments.',
        ],
        bulletsAr: [
          'إنشاء ملف موحد وشامل للمعاملات الإدارية والرسمية وبوابات التوظيف.',
          'ترتيب المستندات بالتسلسل المطلوب قبل التجميع النهائي.',
          'تسهيل الأرشفة والمشاركة عبر رسالة بريد واحدة.',
          'تجنب رفض رسائل البريد الإلكتروني بسبب كثرة المرفقات المنفصلة.',
        ],
      },
      {
        heading: 'How Sahlino Merges PDFs Client-Side with 100% Privacy',
        headingAr: 'كيف تدمج ملفات PDF محلياً في متصفحك عبر ساهلينو',
        body: 'Most online PDF tools upload your sensitive financial statements and private IDs to remote cloud servers. Sahlino is different: our PDF engine runs directly on your computer hardware using WebAssembly and Javascript.',
        bodyAr: 'تطلب معظم المواقع الأخرى رفع مستنداتك وسجلاتك إلى خوادمها، بينما تستخدم ساهلينو محرك معالجة محلي يعمل على ذاكرة متصفحك مباشرة لضمان سرية وثائقك 100%.',
        bullets: [
          'Step 1: Upload your PDF files in batch by dragging them into the merge box.',
          'Step 2: Drag or click the up/down arrows to reorder your documents.',
          'Step 3: Click "Merge PDF Files" to combine pages instantaneously.',
          'Step 4: Download your merged PDF directly to your device.',
        ],
        bulletsAr: [
          'الخطوة الأولى: ارفع ملفات الـ PDF دفعة واحدة بسحبها إلى صندوق الأداة.',
          'الخطوة الثانية: رتّب الملفات بسهولة باستخدام أسهم الترتيب لأعلى وأسفل.',
          'الخطوة الثالثة: اضغط على زر "دمج ملفات PDF" لتجميع الصفحات فورياً.',
          'الخطوة الرابعة: احفظ الملف المدمج النهائي مباشرة على جهازك.',
        ],
        tip: 'Check that all individual PDF files are not password protected before attempting to merge them.',
        tipAr: 'نصيحة: تأكد من فك كلمات المرور من أي ملف محمي قبل رفعه لتتمكن الأداة من قراءة صفحاته ودمجها بسلاسة.',
      },
    ],
    faqs: [
      {
        question: 'Is there any limit to the number of PDF files I can merge?',
        answer: 'You can merge dozens of files easily as long as your browser has sufficient local memory.',
      },
      {
        question: 'Does merging compress or reduce the resolution of pages?',
        answer: 'No. Sahlino preserves the original vector graphics, font data, and image resolution of each merged page.',
      },
    ],
    faqsAr: [
      {
        question: 'هل هناك حد أقصى لعدد الملفات التي يمكن دمجها؟',
        answer: 'يمكنك دمج عشرات الملفات بكل سلاسة طالما تسمح ذاكرة جهازك، فالأداة مجانية وبدون قيود اصطناعية.',
      },
      {
        question: 'هل يقلل الدمج من جودة ووضوح النصوص والصفحات الأصلية؟',
        answer: 'كلا، تحافظ أداة الدمج على دقة الرسوميات والخطوط وجودة الصور الأصلية دون أي تشويه.',
      },
    ],
  },

  // 5. Split PDF Pages
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
    readTime: '4 min read',
    readTimeAr: 'قراءة في 4 دقائق',
    publishedDate: '2025-02-02',
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'pdf-split',
    relatedArticles: ['how-to-merge-pdf-files-online', 'how-to-convert-word-to-pdf'],
    sections: [
      {
        heading: 'When Do You Need to Split a PDF?',
        headingAr: 'متى تحتاج إلى تقسيم ملف PDF واستخراج صفحات منه؟',
        body: 'Often a multi-hundred page PDF manual, bank statement, or contract contains only 2 or 3 pages you actually need to share with a partner, accountant, or authority. Splitting allows you to protect the privacy of unrelated pages and drastically reduce file size.',
        bodyAr: 'في كثير من الأحيان يحتوي كشف الحساب أو الكتاب على صفحات خاصة أو غير لازمة للمعاملة. يتيح لك تقسيم الـ PDF استخراج الصفحات التي تهمك فقط ومشاركتها مع الحفاظ على خصوصية باقي المستند وتقليل حجم الملف بشكل ملحوظ.',
        bullets: [
          'Extracting specific contract annexes, certificates, or signature pages.',
          'Dividing large e-books or study modules into digestible weekly reading chapters.',
          'Separating bank statements to share only the required transactions while concealing other accounts.',
          'Meeting email attachment size limits by omitting unneeded chapters.',
        ],
        bulletsAr: [
          'استخراج ملحقات عقود محددة، شهادات تخرج، أو صفحات التوقيع فقط.',
          'تقسيم الكتب الدراسية والكتالوجات الضخمة إلى فصول صغيرة يسهل تصفحها.',
          'فصل كشوف الحسابات لمشاركة المعاملة المطلوبة فقط مع إخفاء باقي البيانات المالية.',
          'تقليل حجم الملف ليناسب حدود الإرسال في البريد الإلكتروني والمنصات الحكومية.',
        ],
      },
      {
        heading: 'How to Extract Custom Page Ranges on Sahlino',
        headingAr: 'طريقة تحديد نطاقات الصفحات واستخراجها بنقرة واحدة',
        body: 'Sahlino Split PDF tool offers intuitive page range selection. You can extract individual pages, continuous chapters, or arbitrary combinations using simple notation.',
        bodyAr: 'توفر أداة تقسيم PDF في ساهلينو واجهة بسيطة لتحديد الصفحات المراد استخراجها، سواء كانت صفحات منفردة أو نطاقات متصلة أو تشكيلة مخصصة.',
        bullets: [
          'Single pages: Simply enter numbers like "1, 4, 7".',
          'Page ranges: Use hyphens like "1-5, 10-15".',
          'Mixed combinations: Combine both freely like "1-3, 5, 8, 12-14".',
          'Extract mode: Download each page as an independent PDF or combine selected pages into one focused document.',
        ],
        bulletsAr: [
          'صفحات مفردة: اكتب أرقام الصفحات مفصولة بفواصل مثل "1, 4, 7".',
          'نطاقات متصلة: استخدم الشرطة لكتابة المدى مثل "1-5, 10-15".',
          'تجميع مخصص: ادمج بين النطاقات والصفحات بحرية مثل "1-3, 5, 8, 12-14".',
          'وضع الاستخراج: يمكنك استخراج الصفحات المختارة في ملف واحد جديد فائق الترتيب.',
        ],
        tip: 'Always preview your original PDF page numbers in your viewer first, as printed page numbers in books can differ from the physical digital page count.',
        tipAr: 'نصيحة: تأكد من مراجعة رقم الصفحة الرقمي في قارئ الـ PDF، فقد يختلف ترقيم صفحات الكتاب المطبوعة عن ترتيب الصفحات الرقمية الفعلية.',
      },
      {
        heading: '100% In-Browser Privacy Protection',
        headingAr: 'حماية كاملة للخصوصية داخل جهازك',
        body: 'Because PDF files often contain passport copies, bank records, and legal agreements, Sahlino executes the entire splitting algorithm inside your browser using pdf-lib. No external server ever receives your document.',
        bodyAr: 'نظراً لأن ملفات الـ PDF غالباً ما تحتوي على وثائق سفر أو بيانات مالية أو اتفاقيات سرية، فإن عملية التقسيم تتم بالكامل داخل متصفحك دون إرسال أي بايت لخوادم خارجية.',
      },
    ],
    faqs: [
      {
        question: 'Can I split a PDF file that is password protected?',
        answer: 'You must first unlock the PDF by removing its password before splitting, as encryption prevents unauthorized page extraction.',
      },
      {
        question: 'Does splitting affect the clickable links or text searchability in the PDF?',
        answer: 'No. Sahlino preserves all underlying vector fonts, selectable text, and hyperlinks intact.',
      },
      {
        question: 'Is there any cost or page limit for splitting documents?',
        answer: 'No, the tool is completely free with no artificial page limits.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يمكنني تقسيم ملف PDF محمي بكلمة مرور؟',
        answer: 'يجب إزالة كلمة المرور أولاً قبل التقسيم، لأن التشفير يمنع قراءة واستخراج الصفحات برمجياً.',
      },
      {
        question: 'هل يؤثر التقسيم على إمكانية نسخ النص أو البحث داخله؟',
        answer: 'كلا، تظل النصوص قابلة للتحديد والنسخ والبحث بنسبة 100% كما كانت في المستند الأصلي.',
      },
      {
        question: 'هل توجد أي رسوم أو حد أقصى لعدد الصفحات التي يمكن استخراجها؟',
        answer: 'الأداة مجانية بالكامل وبدون أي قيود أو اشتراكات على عدد الصفحات أو حجم الملف.',
      },
    ],
  },

  // 6. Percentage Calculator
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
    modifiedDate: '2026-09-14',
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
          'X is what percentage of Y? Formula: (X / Y) * 100',
          'Percentage Difference between Old and New: ((New - Old) / Old) * 100',
          'Discounted Price: Original Price * (1 - (Discount% / 100))',
        ],
        bulletsAr: [
          'حساب كم يساوي X% من رقم: (النسبة ÷ 100) × الرقم الأساسي.',
          'العدد X يمثل كم بالمئة من Y: (X ÷ Y) × 100.',
          'حساب نسبة الزيادة أو النقصان: ((القيمة الجديدة - القديمة) ÷ القديمة) × 100.',
          'حساب السعر بعد الخصم: السعر الأصلي × (1 - (نسبة الخصم ÷ 100)).',
        ],
      },
      {
        heading: 'Calculating Shopping Discounts and Sales Tax (VAT)',
        headingAr: 'حساب خصومات التسوق وضريبة القيمة المضافة عملياً',
        body: 'Retail shopping often combines discounts with value-added tax (VAT). For example, if a jacket costs $120 with a 25% store discount and an 8% sales tax, calculating the order correctly prevents surprises at checkout.',
        bodyAr: 'في التسوق، غالباً ما تتداخل الخصومات مع ضريبة القيمة المضافة. على سبيل المثال، إذا كان سعر سلعة 200 ريال مع خصم 20% وضريبة 15%، فإن حساب الترتيب الرياضي الصحيح يضمن معرفة السعر الحقيقي بدقة.',
        bullets: [
          'Step 1 (Apply Discount): $120 * (1 - 0.25) = $90',
          'Step 2 (Apply Sales Tax): $90 * (1 + 0.08) = $97.20 final total',
          'Stacked discounts: A 20% discount followed by an extra 10% coupon is NOT 30% off. It equals 1 - (0.80 * 0.90) = 28% real discount.',
        ],
        bulletsAr: [
          'الخطوة الأولى (تطبيق الخصم): 200 × (1 - 0.20) = 160 ريال.',
          'الخطوة الثانية (إضافة الضريبة): 160 × (1 + 0.15) = 184 ريال كإجمالي نهائي.',
          'تنبيه الخصومات المزدوجة: خصم 20% مع كوبون إضافي 10% لا يعني 30%! بل السعر = 0.80 × 0.90 = 0.72، أي خصم فعلي 28%.',
        ],
        tip: 'Always apply discounts before adding tax, as sales tax is legally computed on the final transaction amount.',
        tipAr: 'نصيحة: طبّق نسبة الخصم أولاً على السعر الأصلي، ثم احسب الضريبة على المبلغ المتبقي، فالضريبة تحتسب نظامياً على قيمة البيع الفعلية.',
      },
      {
        heading: 'Using Sahlino Percentage Calculator',
        headingAr: 'استخدام حاسبة النسبة المئوية في ساهلينو',
        body: 'Sahlino Percentage Calculator includes 6 dedicated calculation modes. Simply enter the two numbers, and our engine outputs the result along with the step-by-step formula in real time.',
        bodyAr: 'توفر حاسبة ساهلينو 6 أنماط حسابية متخصصة. بمجرد إدخال الرقمين، تعرض لك الأداة النتيجة الفورية مع خطوات الحل والمعادلة الرياضية بوضوح.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between percentage change and percentage difference?',
        answer: 'Percentage change has a directional starting point (e.g. from last year to this year). Percentage difference compares two numbers symmetrically by dividing by their average.',
      },
      {
        question: 'Can percentages exceed 100%?',
        answer: 'Yes! If an investment grows from $100 to $300, it gained $200, which is a 200% increase.',
      },
    ],
    faqsAr: [
      {
        question: 'ما الفرق بين نسبة التغير والفارق المئوي؟',
        answer: 'نسبة التغير تقيس النمو أو الانخفاض من نقطة بداية زمنية معينة، بينما الفارق المئوي يقارن بين قيمتين متكافئتين دون ترتيب زمني.',
      },
      {
        question: 'هل يمكن أن تتجاوز النسبة المئوية 100%؟',
        answer: 'نعم بالتأكيد! إذا ارتفعت مبيعات متجر من 1000 إلى 3000 دولار، فإن مقدار الزيادة هو 2000 دولار أي زيادة بنسبة 200%.',
      },
    ],
  },

  // 7. BMI Calculator
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'bmi-calculator',
    relatedArticles: ['how-to-calculate-exact-age-and-birthdays', 'how-to-calculate-percentages-and-discounts'],
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
          'Obesity Class I: BMI between 30 and 34.9',
          'Obesity Class II & III: BMI 35 and above',
        ],
        bulletsAr: [
          'نقص في الوزن (نحافة): أقل من 18.5',
          'وزن طبيعي وصحي: من 18.5 إلى 24.9',
          'وزن زائد: من 25 إلى 29.9',
          'سمنة من الدرجة الأولى: من 30 إلى 34.9',
          'سمنة مفرطة (الدرجة الثانية والثالثة): 35 فما فوق',
        ],
      },
      {
        heading: 'Understanding the Limits of BMI',
        headingAr: 'حدود مقياس BMI وما لا يخبرك به عن صحتك',
        body: 'While BMI is an excellent rapid screening tool for the general population, it does not directly distinguish between muscle mass and fat tissue. Bodybuilders, professional athletes, and pregnant women often score high BMI despite having very low body fat percentages.',
        bodyAr: 'رغم أن مؤشر كتلة الجسم ممتاز للتقييم السريع، إلا أنه لا يفرق مباشرة بين كتلة العضلات والدهون. الرياضيون ولاعبو كمال الأجسام قد يظهر لديهم مؤشر مرتفع (وزن زائد) رغم أن نسبة الدهون لديهم منخفضة جداً بسبب الكتلة العضلية.',
        bullets: [
          'Athletes: Muscle is denser than fat, leading to higher BMI numbers.',
          'Older adults: Muscle loss may mask excess visceral fat.',
          'Waist circumference: A valuable supplementary measurement to evaluate abdominal fat risk.',
        ],
        bulletsAr: [
          'الرياضيون: العضلات أكثر كثافة ووزناً من الدهون، مما قد يرفع المؤشر.',
          'كبار السن: قد يقل وزن العضلات مع التقدم في السن مما يخفي نسبة الدهون الحقيقية.',
          'محيط الخصر: يُعد قياس محيط الخصر مكملاً ممتازاً لمؤشر BMI لتقييم دهون البطن.',
        ],
        tip: 'Use Sahlino BMI Calculator to also check your ideal healthy weight range according to your height.',
        tipAr: 'نصيحة: استخدم حاسبة BMI في ساهلينو لمعرفة نطاق وزنك الصحي المثالي بالكيلوجرام المناسب لطولك بالضبط.',
      },
    ],
    faqs: [
      {
        question: 'What is the ideal BMI for adults?',
        answer: 'A BMI between 18.5 and 24.9 is considered the globally recognized healthy range associated with the lowest risk of cardiovascular diseases.',
      },
      {
        question: 'How do I calculate BMI using imperial units (pounds and inches)?',
        answer: 'The imperial formula is: BMI = (Weight in lbs * 703) / (Height in inches)^2.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هو المعدل المثالي لمؤشر كتلة الجسم؟',
        answer: 'المعدل الطبيعي والصحي هو بين 18.5 و 24.9، ويرتبط بأقل معدلات مخاطر للإصابة بأمراض القلب وضغط الدم والسكري.',
      },
      {
        question: 'كيف أحسب مؤشر كتلة الجسم بالأرطال والبوصة؟',
        answer: 'المعادلة بالوحدات الإمبراطورية: (الوزن بالرطل × 703) ÷ (مربع الطول بالبوصة). حاسبة ساهلينو تدعم كلا النظامين تلقائياً.',
      },
    ],
  },

  // 8. Age Calculator
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'age-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'The Nuances of Accurate Age Computation',
        headingAr: 'أسرار الحساب الدقيق للعمر ومراعاة السنوات الكبيسة',
        body: 'Simple division of total elapsed days by 365 produces inaccurate ages because leap years contain 366 days and calendar months range from 28 to 31 days. A proper chronological age tool calculates exact date boundaries.',
        bodyAr: 'القسمة التقليدية للأيام على 365 تعطي أرقاماً غير دقيقة بسبب تباين أيام الأشهر بين 28 و31 ووجود السنوات الكبيسة. حاسبة ساهلينو تطبق خوارزمية دقيقة تحسب الأيام والشهور الفعلية.',
        bullets: [
          'Leap Year Rule: Every year divisible by 4 (except century years not divisible by 400) adds February 29.',
          'Borrowing days: When birth day exceeds current day, days are borrowed according to the preceding month\'s exact length.',
          'Total milestones: Calculating age in total days, hours, minutes, and seconds lived.',
        ],
        bulletsAr: [
          'قاعدة السنوات الكبيسة: كل سنة تقبل القسمة على 4 تضيف يوماً إضافياً (29 فبراير).',
          'استلاف الأيام: عند حساب الفرق بين الأيام، يتم استلاف أيام الشهر السابق الفعلية بدقة.',
          'إحصائيات شاملة: حساب إجمالي ما عشته بالأيام، والأسابيع، والساعات، والدقائق.',
        ],
      },
      {
        heading: 'Countdown to Next Birthday and Milestone Tracking',
        headingAr: 'العد التنازلي ليوم الميلاد القادم والمناسبات الخاصة',
        body: 'In addition to chronological age, knowing the exact days and hours until your next birthday helps with planning events, retirement milestones, school admissions, and insurance policy dates.',
        bodyAr: 'بالإضافة لمعرفة عمرك الدقيق، تتيح لك الأداة معرفة عدد الأيام والساعات المتبقية حتى حلول يوم ميلادك القادم، وهو أمر مفيد للتخطيط للمناسبات ومعاملات التقاعد والتأمين وتسجيل المدارس.',
      },
    ],
    faqs: [
      {
        question: 'Does the calculator support historical or future dates?',
        answer: 'Yes! You can compute age on any specific date in history or find your future age in a designated year.',
      },
      {
        question: 'Why do two people born in different months with the same day count differ in total days lived?',
        answer: 'Because months vary in length (February has 28 or 29 days while others have 30 or 31), the exact number of days lived depends on which specific months transpired.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يمكنني حساب عمري في تاريخ محدد سابق أو مستقبلي؟',
        answer: 'نعم! يمكنك اختيار تاريخ ميلادك ثم تحديد أي تاريخ هدف في الماضي أو المستقبل لحساب عمرك فيه بدقة.',
      },
      {
        question: 'لماذا تختلف أيام الشهور في حساب العمر؟',
        answer: 'نظراً لأن شهور السنة تختلف بين 28 و 29 و 30 و 31 يوماً، فإن الحساب الدقيق يراعي أيام كل شهر مر في حياتك بالتفصيل.',
      },
    ],
  },

  // 9. QR Code
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'qr-code-generator',
    relatedArticles: ['how-to-compress-images-without-losing-quality'],
    sections: [
      {
        heading: 'Why QR Codes Dominate Modern Quick Sharing',
        headingAr: 'لماذا أصبحت رموز الاستجابة السريعة (QR) ركيزة التفاعل الحديث؟',
        body: 'With native smartphone camera scanning, QR codes bridge the physical and digital worlds. From connecting visitors instantly to your home or office WiFi without typing long passwords, to opening product pages and digital menus.',
        bodyAr: 'بفضل قدرة كاميرات الهواتف الذكية على قراءة الرموز فوراً، أصبحت رموز QR أسرع وسيلة لربط العالم الحقيقي بالعالم الرقمي، كالاتصال التلقائي بشبكة الواي فاي أو فتح صفحات الدفع والروابط.',
        bullets: [
          'Website Links: Direct customers to landing pages, social profiles, and app stores.',
          'Instant WiFi: Connect guests without spelling out complex encryption keys.',
          'vCard Contacts: Save full phone, email, and address info in one tap.',
          'Plain Text & Notes: Share snippets, codes, and instructions offline.',
        ],
        bulletsAr: [
          'روابط المواقع: توجيه العملاء مباشرة لصفحات الهبوط وقوائم الطعام وحسابات التواصل.',
          'شبكات الواي فاي: اتصال الضيوف بالإنترنت فوراً دون الحاجة لكتابة كلمات مرور معقدة.',
          'بطاقات الأعمال (vCard): حفظ الاسم ورقم الهاتف والبريد بضغطة زر واحدة في جهات الاتصال.',
          'النصوص والملاحظات: مشاركة معلومات أو أكواد التحقق دون الحاجة للاتصال بالإنترنت.',
        ],
      },
      {
        heading: 'Design Best Practices: Contrast and Error Correction',
        headingAr: 'أفضل الممارسات لتصميم رمز QR يسهل مسحه من أي كاميرا',
        body: 'A beautiful QR code must remain easily readable by camera sensors. Following key design rules prevents scanning failures on printed flyers or poorly lit restaurant tables.',
        bodyAr: 'الرمز الناجح هو الذي تستطيع كاميرات الهواتف قراءته بسرعة حتى في الإضاءة الخافتة أو من مسافات بعيدة. الالتزام بإرشادات التباين يضمن نجاح القراءة 100%.',
        bullets: [
          'High Contrast: Always use a dark foreground on a clean light background.',
          'Quiet Zone: Maintain clear blank margins around the outer edges of the QR code.',
          'Error Correction (ECC): Levels range from L (7%) to H (30%), allowing codes to be scanned even if partially damaged or covered by a central logo.',
        ],
        bulletsAr: [
          'التباين العالي: احرص دائماً على أن يكون لون الرمز داكناً على خلفية فاتحة ونظيفة.',
          'منطقة الأمان (Quiet Zone): اترك هامشاً فارغاً حول أطراف الرمز الأربعة دون نصوص.',
          'مستوى تصحيح الخطأ: يوفر مستوى H حماية حتى 30% مما يسمح بقراءة الرمز حتى لو تعرض للخدش أو وُضع شعار في وسطه.',
        ],
        tip: 'Always test-scan your QR code on both an iOS iPhone and an Android device before sending marketing materials to the print shop.',
        tipAr: 'نصيحة: اختبر مسح الرمز بكاميرا هاتف آيفون وهاتف أندرويد قبل إرسال المطبوعات للمطبعة لضمان سهولة قراءته.',
      },
    ],
    faqs: [
      {
        question: 'Do QR codes created on Sahlino ever expire?',
        answer: 'No! Sahlino generates static QR codes where data is encoded directly into the pixel pattern. They work forever with no expiration date.',
      },
      {
        question: 'Can I download the QR code in high resolution for large posters?',
        answer: 'Yes, you can generate high-DPI images that remain sharp when printed on large promotional banners and billboards.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تنتهي صلاحية رموز الـ QR التي يتم إنشاؤها على ساهلينو؟',
        answer: 'كلا! الرموز المُنشأة هي رموز ثابتة (Static QR) يتم تشفير البيانات مباشرة داخل نمط النقاط، وتعمل إلى الأبد دون انتهاء صلاحية.',
      },
      {
        question: 'هل تتوفر الرموز بجودة عالية مناسبة للطباعة الكبيرة؟',
        answer: 'نعم، يتم تصدير الرمز بدقة فائقة تمنع أي تشويش عند طباعته على لافتات وبوسترات المتاجر الكبيرة.',
      },
    ],
  },

  // 10. Word Counter for SEO
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'word-counter',
    relatedArticles: ['how-to-format-validate-json-payloads', 'how-to-clean-and-deduplicate-text'],
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
          'SMS message: 160 characters (GSM-7) or 70 characters (Unicode/Arabic).',
        ],
        bulletsAr: [
          'عنوان صفحة Google (Title): بين 50 و60 حرفاً لتجنب الاقتطاع.',
          'وصف الميتا في Google (Description): بين 150 و160 حرفاً.',
          'منشور منصة X (تويتر سابقاً): 280 حرفاً كحد أقصى للحسابات العادية.',
          'المقالات المتعمقة المتصدرة في SEO: من 1200 إلى 2500 كلمة.',
          'الرسائل النصية القصيرة SMS: 160 حرفاً بالإنجليزية و70 حرفاً بالعربية لكل رسالة.',
        ],
      },
      {
        heading: 'Calculating Reading Time and Content Density',
        headingAr: 'حساب وقت القراءة المقدر ومؤشرات سلاسة المحتوى',
        body: 'The average adult reads between 200 and 250 words per minute. Providing an estimated reading time at the top of your articles sets expectations for busy readers and improves user engagement metrics.',
        bodyAr: 'يقرأ الشخص البالغ في المتوسط بين 200 و250 كلمة في الدقيقة. وضع وقت القراءة المقدر في بداية المقال يشجع الزوار على القراءة ويزيد من بقائهم داخل الموقع.',
        bullets: [
          'Formula: Total Words / 200 = Estimated minutes to read.',
          'Paragraph breaks: Keep paragraphs under 4-5 sentences for optimal mobile scanning.',
          'Keyword density: Natural writing maintains primary keywords under 1.5% - 2% of total word count.',
        ],
        bulletsAr: [
          'معادلة وقت القراءة: إجمالي الكلمات ÷ 200 = دقائق القراءة المقدرة.',
          'تقسيم الفقرات: اجعل الفقرة بين 3 إلى 5 أسطر لتسهيل القراءة على شاشات الهواتف.',
          'كثافة الكلمات المفتاحية: احرص على ألا تتجاوز الكلمة المستهدفة 1.5% إلى 2% من إجمالي النص لتفادي الحشو غير المرغوب.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does word count include spaces and punctuation?',
        answer: 'Word count measures discrete words separated by spaces. Character count can be measured with spaces included or without spaces.',
      },
      {
        question: 'How does Arabic word counting work?',
        answer: 'Arabic words connected with the conjunction "و" or prepositions are counted accurately based on standard unicode word boundaries.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يشمل عد الأحرف المسافات وعلامات الترقيم؟',
        answer: 'توفر أداة ساهلينو إحصائيتين: إجمالي الأحرف مع المسافات، وإجمالي الأحرف بدون المسافات لتقدير التكلفة والحدود بدقة.',
      },
      {
        question: 'كيف يتم حساب الكلمات العربية المتصلة بواو العطف؟',
        answer: 'تعتمد الأداة على معايير Unicode المعتمدة لفصل الكلمات والمفردات اللغوية بدقة تامة باللغتين العربية والإنجليزية.',
      },
    ],
  },

  // 11. JSON Formatter & Debugging
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
    modifiedDate: '2026-09-14',
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
          'Using single quotes instead of double quotes for property keys and string values.',
          'Unescaped special characters, tabs, or newlines inside string values.',
          'Missing matching closing curly braces "}" or square brackets "]".',
        ],
        bulletsAr: [
          'وضع فاصلة زائدة (Trailing comma) بعد آخر عنصر في الكائن أو المصفوفة.',
          'استخدام علامات تنصيص فردية بدل المزدوجة في تسمية المفاتيح والقيم النصية.',
          'عدم إغلاق الأقواس أو تضمين حروف خاصة غير مهربة داخل النصوص.',
          'استخدام قيم غير معرفة مثل undefined أو NaN التي لا تدعمها صيغة JSON القياسية.',
        ],
      },
      {
        heading: 'Beautifying vs Minifying: When to Use Which?',
        headingAr: 'الفرق بين التجميل (Beautify) والضغط (Minify) ومتى تستخدمهما؟',
        body: 'Beautifying adds 2 or 4 space indentation and newlines, making payloads instantly readable by humans during debugging. Minifying strips every extraneous whitespace character, reducing network bandwidth by up to 30% for production API payloads.',
        bodyAr: 'التجميل (Beautify) يضيف مسافات بادئة وأسطر جديدة لتسهيل قراءة البيانات وتتبع المشكلات، بينما الضغط (Minify) يحذف كافة المسافات الزائدة لتقليل حجم البيانات المنقولة عبر الشبكة وتسريع استجابة الخوادم.',
        tip: 'In Sahlino JSON Formatter, you can switch between 2 spaces, 4 spaces, and tabs indentation, or click Minify to generate clean production payloads.',
        tipAr: 'نصيحة: يمكنك في أداة ساهلينو التبديل بين مسافتين أو 4 مسافات أو ضغط الكود بالكامل بنقرة واحدة، مع التحقق من سلامة البناء فورياً.',
      },
    ],
    faqs: [
      {
        question: 'Does JSON support comments?',
        answer: 'Standard JSON (RFC 8259) strictly forbids comments like // or /* */. Configuration files requiring comments typically use JSONC or YAML.',
      },
      {
        question: 'Is it safe to paste API tokens or private data into Sahlino JSON tool?',
        answer: 'Yes, 100%! All JSON parsing, formatting, and validation runs locally in your browser memory. No data is sent to our servers.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تدعم صيغة JSON التعليقات التوضيحية؟',
        answer: 'وفق المعيار الرسمي RFC 8259، لا تدعم صيغة JSON القياسية التعليقات، وتتطلب إزالتها لتجنب أخطاء التحليل.',
      },
      {
        question: 'هل من الآمن فحص رموز API وبيانات الاعتماد الحساسة في ساهلينو؟',
        answer: 'نعم 100%، تتم كافة عمليات فحص وتنسيق JSON محلياً داخل متصفحك ولا يتم إرسال أي رمز أو استجابة إلى أي خادم.',
      },
    ],
  },

  // 12. Loan & Installments
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'loan-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'How Fixed Monthly Installments are Calculated',
        headingAr: 'كيف يتم حساب القسط الشهري الثابت (الأقساط المتساوية)؟',
        body: 'Most personal, auto, and home mortgage loans use standard amortization where payments remain identical each month, but the proportion going toward principal versus interest shifts over time.',
        bodyAr: 'تعتمد أغلب القروض الشخصية وتمويل السيارات والعقارات على نظام الأقساط الشهرية الثابتة، حيث تسدد في الشهور الأولى نسبة فوائد أعلى بينما تزيد نسبة سداد أصل المبلغ تدريجياً.',
        bullets: [
          'Principal (P): The actual borrowed money amount.',
          'Monthly Interest Rate (r): Annual rate divided by 12 months.',
          'Number of payments (n): Loan term in years multiplied by 12.',
          'Standard EMI Formula: P * [r(1+r)^n] / [(1+r)^n - 1]',
        ],
        bulletsAr: [
          'أصل التمويل (Principal): المبلغ الفعلي المقترض من البنك.',
          'معدل الفائدة الشهري: نسبة الفائدة السنوية مقسومة على 12 شهراً.',
          'عدد الأقساط: مدة التمويل بالسنوات مضروبة في 12.',
          'معادلة القسط الثابت (EMI): تضمن توزيع المبلغ والأرباح على أقساط شهرية متساوية.',
        ],
      },
      {
        heading: 'How Loan Term Length Impacts Total Interest Paid',
        headingAr: 'أثر مدة التمويل على إجمالي الأرباح والفوائد المدفوعة',
        body: 'Extending a loan term (e.g. from 3 years to 5 years) reduces your monthly installment but significantly increases the total interest paid over the life of the loan.',
        bodyAr: 'تمديد فترة سداد القرض (مثلاً من 3 سنوات إلى 5 سنوات) يقلل قيمة القسط الشهري لكنه يرفع إجمالي الأرباح والفوائد التي تدفعها للبنك بشكل ملحوظ.',
        bullets: [
          'Shorter term: Higher monthly payment, dramatically lower overall interest cost.',
          'Longer term: Lower monthly payment, much higher total cost of borrowing.',
          'Early repayments: Paying additional principal early directly reduces compounding interest.',
        ],
        bulletsAr: [
          'فترة سداد أقصر: قسط شهري أعلى، ولكن إجمالي فوائد أقل بكثير.',
          'فترة سداد أطول: قسط شهري أقل، ولكن تكلفة إجمالية أعلى للقرض.',
          'السداد المبكر: سداد دفعات إضافية مبكرة يقلل رصيد أصل المبلغ ويخفض الفوائد التراكمية.',
        ],
        tip: 'Use Sahlino Loan Calculator to experiment with different loan durations and see your exact monthly installment before signing bank papers.',
        tipAr: 'نصيحة: استخدم حاسبة القروض في ساهلينو لمقارنة خيارات السداد ومعرفة القسط الشهري وإجمالي الفائدة بدقة قبل توقيع عقود التمويل.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between flat interest rate and reducing balance rate?',
        answer: 'A flat rate calculates interest on the initial full principal for the entire term. A reducing balance rate calculates interest only on the remaining unpaid principal each month.',
      },
      {
        question: 'Can I calculate mortgage and car loans with Sahlino?',
        answer: 'Yes! The calculator works for personal loans, auto finance, home mortgages, and business loans with standard monthly amortization.',
      },
    ],
    faqsAr: [
      {
        question: 'ما الفرق بين الفائدة الثابتة والفائدة المتناقصة؟',
        answer: 'الفائدة الثابتة تحتسب الأرباح على كامل المبلغ الأصلي طوال المدة، بينما الفائدة المتناقصة تحتسب الفائدة فقط على المتبقي الفعلي من أصل القرض كل شهر.',
      },
      {
        question: 'هل تدعم الحاسبة قروض السيارات والتمويل العقاري؟',
        answer: 'نعم، تنطبق نفس المعادلة على التمويل الشخصي، وتمويل السيارات، والتمويل العقاري بنظام الأقساط الشهرية.',
      },
    ],
  },

  // 13. Text Cleaning
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
    modifiedDate: '2026-09-14',
    relatedToolSlug: 'text-cleaner',
    relatedArticles: ['how-to-count-words-characters-for-seo'],
    sections: [
      {
        heading: 'Why Text Cleaning Saves Hours of Manual Work',
        headingAr: 'لماذا يوفر تنظيف النصوص ساعات من العمل اليدوي المرهق؟',
        body: 'Whether working with email lists, product SKUs, research survey responses, or code snippets, duplicate rows and inconsistent spacing create clutter and spreadsheet errors. An automated text cleaner solves these problems instantaneously.',
        bodyAr: 'سواء كنت تتعامل مع قوائم بريد أو أرقام هواتف أو بيانات تم نسخها من جداول مختلفة، فإن وجود فراغات أو أسطر مكررة يعطل أعمالك. أداة تنظيف النصوص تنجز المهمة في لحظة واحدة.',
        bullets: [
          'Email Marketing: Remove duplicate addresses to avoid spam flags and reduce send costs.',
          'Data entry: Strip trailing whitespace and normalize spacing before database imports.',
          'Alphabetical Sorting: Organize names, tags, and keywords in A-Z or Z-A sequence.',
          'Empty line removal: Condense fragmented text blocks into clean, uniform paragraphs.',
        ],
        bulletsAr: [
          'التسويق البريدي: حذف العناوين المكررة لتفادي حظر الرسائل وخفض تكاليف الإرسال.',
          'إدخال البيانات: إزالة الفراغات الزائدة في البداية والنهاية قبل استيرادها إلى قواعد البيانات.',
          'الترتيب الأبجدي: تنظيم الأسماء والكلمات المفتاحية من الألف إلى الياء بضغطة واحدة.',
          'حذف الأسطر الفارغة: دمج النصوص المتفرقة وتنظيف الفراغات بين الفقرات.',
        ],
      },
      {
        heading: 'How to Use Sahlino Text Cleaner',
        headingAr: 'خطوات تنظيف القوائم والبيانات على ساهلينو',
        body: 'Paste your raw text into the input box, select the desired operations (e.g. Remove Duplicate Lines, Strip Extra Spaces, Sort Lines, Trim Lines), and copy the pristine result immediately.',
        bodyAr: 'الصق النص في محرر ساهلينو، وحدد الخيارات المطلوبة (حذف التكرار، مسح المسافات الزائدة، الترتيب الأبجدي، حذف الأسطر الفارغة)، وانسخ النتيجة النظيفة فوراً.',
        tip: 'Enable case-insensitive deduplication when cleaning email lists so that "user@example.com" and "User@example.com" are correctly recognized as duplicates.',
        tipAr: 'نصيحة: فعّل خيار تجاهل حالة الأحرف عند تنظيف قوائم البريد الإلكتروني للتعرف على العناوين المكررة حتى لو اختلفت الأحرف الكبيرة والصغيرة.',
      },
    ],
    faqs: [
      {
        question: 'Is my text sent to any server when cleaning?',
        answer: 'No. All string manipulation and regex cleaning happens locally in your browser memory with 100% privacy.',
      },
      {
        question: 'Can I clean very large lists with thousands of lines?',
        answer: 'Yes! Modern browsers handle tens of thousands of text lines in a few milliseconds without freezing.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يتم إرسال نصوصي أو قوائمي إلى أي خادم خارجي؟',
        answer: 'أبداً، تتم جميع عمليات معالجة وتنظيف النصوص محلياً بالكامل داخل متصفحك دون رفع أي بيانات.',
      },
      {
        question: 'هل تدعم الأداة القوائم الضخمة التي تحتوي آلاف الأسطر؟',
        answer: 'نعم، خوارزميات ساهلينو محسنة لمعالجة عشرات الآلاف من الأسطر في أجزاء من الثانية.',
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
  if (!current) {
    return ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, limit);
  }

  const seenSlugs = new Set<string>([currentSlug]);
  const result: ArticleItem[] = [];

  // 1. Explicitly configured related articles
  if (current.relatedArticles && current.relatedArticles.length > 0) {
    for (const slug of current.relatedArticles) {
      if (!seenSlugs.has(slug)) {
        const found = getArticleBySlug(slug);
        if (found) {
          seenSlugs.add(slug);
          result.push(found);
          if (result.length >= limit) return result;
        }
      }
    }
  }

  // 2. Articles in the same category
  const sameCategory = ARTICLES.filter((a) => a.category === current.category && !seenSlugs.has(a.slug));
  for (const article of sameCategory) {
    seenSlugs.add(article.slug);
    result.push(article);
    if (result.length >= limit) return result;
  }

  // 3. Other articles across categories
  const others = ARTICLES.filter((a) => !seenSlugs.has(a.slug));
  for (const article of others) {
    seenSlugs.add(article.slug);
    result.push(article);
    if (result.length >= limit) return result;
  }

  return result.slice(0, limit);
}

export function getArticlesForTool(toolSlug: string): ArticleItem[] {
  return ARTICLES.filter((a) => a.relatedToolSlug === toolSlug);
}

export function searchArticles(query: string): ArticleItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];
  return ARTICLES.filter((a) => {
    return (
      (a.title || '').toLowerCase().includes(clean) ||
      (a.titleAr || '').includes(clean) ||
      (a.description || '').toLowerCase().includes(clean) ||
      (a.descriptionAr || '').includes(clean) ||
      (a.categoryName || '').toLowerCase().includes(clean) ||
      (a.categoryNameAr || '').includes(clean)
    );
  });
}
