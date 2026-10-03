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
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-01-15',
    modifiedDate: '2026-09-20',
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
          'الخطوة الأولى: افتح أداة \"محول Word إلى PDF\" على منصة ساهلينو.',
          'الخطوة الثانية: اسحب ملف Word (.docx) وأفلته في المربع أو اختره من جهازك.',
          'الخطوة الثالثة: عاين المستند المنسق وتأكد من اكتمال العناوين والفقرات والقوائم.',
          'الخطوة الرابعة: اختر اتجاه الصفحة (عمودي أو أفقي) وحجم الخط والهوامش المناسبة.',
          'الخطوة الخامسة: اضغط على \"تحويل وتنزيل PDF\" ليتم إنشاء المستند وحفظه فوراً على جهازك.',
        ],
        tip: 'For official resumes and business contracts, keep page margins standard (20mm) and ensure font size is set to 14pt for optimal legibility.',
        tipAr: 'نصيحة: للسير الذاتية والعقود الرسمية، يُفضل اختيار هوامش قياسية (20 ملم) وحجم خط 14pt لضمان مظهر احترافي ومريح للقراءة والطباعة.',
      },
      {
        heading: 'Preserving Document Typography and Formatting',
        headingAr: 'الحفاظ على الخطوط والتنسيقات المعقدة للمستند',
        body: 'A frequent concern during document conversion is font substitution. When a target device lacks the specific font used in Word (like Aptos, Calibri, or custom Arabic calligraphy fonts), text can reflow unpredictably. Converting to PDF rasterizes or embeds glyph vectors so that line breaks, bullet indents, and headers remain locked in place.',
        bodyAr: 'من أكثر المشاكل شيوعاً عند فتح ملفات Word على أجهزة أخرى هي استبدال الخطوط التلقائي. عندما لا يحتوي جهاز المستلم على الخط الأصلي، تتبدل المسافات وتتداخل الأسطر. يؤدي تحويل المستند إلى PDF إلى تثبيت متجهات الخطوط والأشكال، مما يضمن بقاء فواصل الصفحات والمسافات البادئة ثابتة تماماً.',
        bullets: [
          'Headings (H1, H2, H3) maintain exact relative hierarchy and spacing.',
          'Bullet lists and numbered outlines preserve their precise tab alignments.',
          'Bilingual Arabic-English content maintains natural directional flow without inverted punctuation.',
        ],
        bulletsAr: [
          'العناوين الرئيسية والفرعية تحتفظ بتسلسلها الهرمي والمسافات الفاصلة بدقة.',
          'القوائم النقطية والرقمية تحافظ على محاذاتها العمودية.',
          'النصوص ثنائية اللغة (عربي وإنجليزي) تحافظ على اتجاه الكتابة الصحيح دون انقلاب علامات الترقيم.',
        ],
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
      {
        question: 'What is the maximum document size supported?',
        answer: 'Because all parsing happens inside your browser RAM, documents up to 50MB and hundreds of pages can be converted smoothly without server timeouts.',
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
      {
        question: 'ما هو الحد الأقصى لحجم الملف المدعوم؟',
        answer: 'نظراً لأن المعالجة تتم داخل ذاكرة المتصفح، يمكنك تحويل ملفات كبيرة تصل إلى 50 ميجابايت ومئات الصفحات دون أي تأخير.',
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
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-01-20',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'image-resizer',
    relatedArticles: ['difference-between-jpg-png-webp', 'how-to-create-custom-qr-codes'],
    sections: [
      {
        heading: 'How Image Compression Algorithms Work',
        headingAr: 'كيف تعمل خوارزميات ضغط ومعالجة الصور؟',
        body: 'Digital photos from smartphones and DSLR cameras contain millions of raw pixel values alongside heavy embedded metadata (EXIF camera settings, GPS location, thumbnails). Image compression aims to eliminate redundant data through two primary methodologies: Lossless and Lossy compression. Understanding which to apply is the key to minimizing kilobyte size without making graphics blurry.',
        bodyAr: 'تحتوي الصور الرقمية الحديثة على ملايين البكسلات بالإضافة إلى بيانات وصفية خفية (EXIF) مثل إحداثيات الموقع ونوع العدسة. تعمل خوارزميات الضغط على التخلص من التكرارات غير الضرورية عبر طريقتين: الضغط بدون فقدان (Lossless) والضغط الذكي (Lossy). فهم الفارق بينهما هو السر لتحقيق أصغر حجم للملف دون التضحية بنقاء الصورة.',
        bullets: [
          'Lossless Compression: Strips metadata, unifies identical adjacent pixel blocks, and creates an exact mathematical reconstruction without discarding a single color value.',
          'Lossy Compression: Exploits the human visual system (psychovisual model) by discarding subtle color gradations that the eye cannot detect on digital screens.',
          'Quantization & Chroma Subsampling: Groups color data in 4:2:0 or 4:2:2 blocks while preserving high-contrast luminance (brightness) detail.',
        ],
        bulletsAr: [
          'الضغط غير الفاقد (Lossless): يزيل البيانات الإضافية ويضغط كتل البكسلات المتطابقة دون حذف أي قيمة لونية، مما يحافظ على الصورة الأصلية 100%.',
          'الضغط الذكي (Lossy): يستفيد من محدودية العين البشرية في تمييز التدرجات الدقيقة جداً، فيحذف الفروق غير المرئية لتوفير 70-80% من المساحة.',
          'تقليل عينات الألوان (Chroma Subsampling): يحافظ على حدة الإضاءة والتفاصيل الدقيقة بينما يقلل كثافة بيانات الألوان غير المحسوسة.',
        ],
      },
      {
        heading: 'Finding the Compression Sweet Spot: 80% to 85%',
        headingAr: 'النسبة الذهبية لضغط الصور: بين 80% و 85%',
        body: 'Most users assume that 100% quality is required for crisp displays. In reality, saving a JPEG or WebP at 100% quality produces massive file sizes with almost zero noticeable visual improvement compared to 85%. At 80-85% quality, compression artifacts are invisible to human inspection even on high-density Retina screens, yet file size is often reduced by 70% to 85%.',
        bodyAr: 'يعتقد الكثيرون خطأً أن حفظ الصورة بنسبة 100% ضروري لوضوحها. عملياً، حفظ الصورة بجودة 100% يضاعف حجم الملف 4 إلى 5 أضعاف دون أي فرق يذكر للعين مقارنة بنسبة 85%. توفر نسبة 80% إلى 85% التوازن المثالي حيث يختفي أي تشويش تماماً حتى على شاشات Retina الحديثة، مع خفض الحجم بأكثر من 75%.',
        tip: 'Never compress a JPEG multiple times sequentially. Each re-compression compounds artifacts. Always perform your resizing and compression in a single step from the original source file.',
        tipAr: 'نصيحة: تجنب ضغط صورة JPEG عدة مرات متتالية لأن ذلك يراكم التشويش. قم دائماً بتغيير الأبعاد والضغط في خطوة واحدة انطلاقاً من الصورة الأصلية.',
      },
      {
        heading: 'Optimal Dimensions for Web and Social Media',
        headingAr: 'الأبعاد والقياسات الموصى بها لمواقع الويب والشبكات الاجتماعية',
        body: 'Excessive pixel dimensions are the number one cause of bloated image files. A 4000x3000px photo displayed in an 800px blog container wastes massive bandwidth and slows down mobile Core Web Vitals. Resizing width and height to match display requirements delivers immediate speed gains.',
        bodyAr: 'تعد الأبعاد المفرطة السبب الأول لبطء تحميل صفحات الإنترنت. عرض صورة بأبعاد 4000x3000 بكسل داخل مقال لا يتجاوز عرضه 800 بكسل يهدر باقات الإنترنت ويبطئ الموقع. ضبط الأبعاد بما يناسب الاستخدام الفعلي يوفر سرعة فورية.',
        bullets: [
          'Full-Width Hero Banners: Maximum 1920px width, 150-250 KB target weight.',
          'Blog Article Illustrations: Maximum 800-1200px width, 70-120 KB target weight.',
          'E-Commerce Product Galleries: 1000x1000px square with zoom capability, under 150 KB.',
          'Social Media Posts (Instagram / Twitter): 1080x1080px or 1200x675px landscape.',
        ],
        bulletsAr: [
          'بانرات المواقع الرئيسية: عرض أقصى 1920 بكسل، وحجم مستهدف بين 150 و 250 كيلوبايت.',
          'صور المقالات والمدونات: عرض أقصى 800 إلى 1200 بكسل، وحجم مستهدف بين 70 و 120 كيلوبايت.',
          'صور المنتجات للمتاجر: 1000x1000 بكسل مربعة تدعم التكبير، بحجم أقل من 150 كيلوبايت.',
          'منشورات التواصل الاجتماعي: 1080x1080 بكسل أو 1200x675 بكسل أفقية.',
        ],
      },
      {
        heading: 'Step-by-Step: Compressing Photos with Sahlino Image Resizer',
        headingAr: 'خطوات ضغط الصور عملياً باستخدام أداة ساهلينو',
        body: 'Using the free Sahlino Image Resizer & Compressor, all image operations execute in your browser via HTML5 Canvas hardware acceleration.',
        bodyAr: 'من خلال أداة ساهلينو المجانية لضغط وتغيير حجم الصور، تتم كل العمليات داخل متصفحك عبر معالجة Canvas السريعة.',
        bullets: [
          'Step 1: Drag your image into the dropzone or click to select from your device.',
          'Step 2: Keep the \"Lock aspect ratio\" checkbox checked to prevent stretching.',
          'Step 3: Enter your target width or use the percentage scale slider (e.g. 50%).',
          'Step 4: Select WebP format for modern compression or JPG for legacy compatibility.',
          'Step 5: Move the Quality slider to 80-85% and review the real-time KB preview before downloading.',
        ],
        bulletsAr: [
          'الخطوة الأولى: اسحب صورتك إلى مربع الرفع أو اضغط لاختيارها من جهازك.',
          'الخطوة الثانية: تأكد من تفعيل خيار قفل نسبة الأبعاد لمنع تشوه الصورة.',
          'الخطوة الثالثة: حدد العرض المطلوب بالبكسل أو استخدم شريط النسبة المئوية.',
          'الخطوة الرابعة: اختر صيغة WebP للحصول على أقصى توفير، أو JPG للتوافق الشامل.',
          'الخطوة الخامسة: اضبط مؤشر الجودة على 80-85% وعاين الحجم الجديد بالكيلوبايت قبل التنزيل.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the recommended photo size for website performance?',
        answer: 'Aim for under 100-150 KB for standard blog images, and under 250-300 KB for large hero banner images to pass Google Core Web Vitals.',
      },
      {
        question: 'Will compressing an image make it look blurry?',
        answer: 'At 80-85% quality, compression artifacts are virtually invisible to the human eye on modern high-DPI screens and mobile devices.',
      },
      {
        question: 'Does Sahlino strip private EXIF camera metadata?',
        answer: 'Yes! Re-encoding images via HTML5 Canvas automatically strips hidden GPS coordinates, camera serials, and timestamp metadata, protecting your location privacy.',
      },
      {
        question: 'Can I compress multiple formats including PNG and WebP?',
        answer: 'Yes, Sahlino supports JPG, PNG, and WebP, allowing seamless cross-format conversion and compression in one single click.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هو الحجم المثالي للصور عند نشرها على الإنترنت؟',
        answer: 'يفضل أن يكون حجم صور المقالات أقل من 100-150 كيلوبايت، وصور البانر الكبيرة أقل من 250-300 كيلوبايت لتفادي بطء تحميل الموقع وتحسين مؤشرات Core Web Vitals.',
      },
      {
        question: 'هل يؤدي ضغط الصورة إلى تشويشها أو ضبابيتها؟',
        answer: 'عند اختيار نسبة جودة بين 80% و85%، يظل الفقدان اللوني غير ملحوظ إطلاقاً للعين البشرية حتى على شاشات الهواتف وشاشات الحواسيب عالية الدقة.',
      },
      {
        question: 'هل تزيل أداة ساهلينو بيانات الموقع والكاميرا EXIF تلقائياً؟',
        answer: 'نعم! معالجة الصورة محلياً عبر Canvas تعيد رسم البكسلات وتستبعد بيانات الـ GPS الوصفية الحساسة، مما يحمي خصوصيتك وموقعك الجغرافي.',
      },
      {
        question: 'هل يمكنني تحويل وضغط صيغ متعددة مثل PNG و WebP؟',
        answer: 'نعم، تدعم الأداة صيغ JPG و PNG و WebP مع إمكانية التحويل بينها وضغطها معاً في خطوة واحدة.',
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
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'image-converter',
    relatedArticles: ['how-to-compress-images-without-losing-quality', 'how-to-create-custom-qr-codes'],
    sections: [
      {
        heading: 'The Three Dominant Web Image Formats',
        headingAr: 'الصيغ الثلاث المهيمنة على شبكة الإنترنت',
        body: 'Every digital image on the web relies on an encoding specification that dictates how pixel colors, transparency channels, and file compression are handled. Choosing the wrong format can cause logos to look fuzzy, backgrounds to turn solid black, or page load times to skyrocket. Here is how JPG, PNG, and WebP differ fundamentally.',
        bodyAr: 'تعتمد كل صورة رقمية على الإنترنت على معيار ترميز يحدد كيفية حفظ الألوان، الشفافية، وطريقة الضغط. اختيار الصيغة الخاطئة قد يسبب فقدان خلفية الشعار الشفافة، أو ظهور تشويش حول النصوص، أو تضخم حجم الصفحة. إليك الفروق الجوهرية بين JPG و PNG و WebP.',
        bullets: [
          'JPEG / JPG: Created in 1992 by the Joint Photographic Experts Group. Standard 24-bit lossy format tailored for natural photographic scenes.',
          'PNG (Portable Network Graphics): Created in 1996 to replace GIF. Lossless format with 8-bit or 24-bit color depth and full 8-bit alpha transparency.',
          'WebP: Created by Google in 2010. Modern container format supporting both lossy and lossless compression with transparent alpha channel capabilities.',
        ],
        bulletsAr: [
          'صيغة JPEG / JPG: أُطلقت عام 1992، وتعد المعيار الكلاسيكي للصور الفوتوغرافية بتدرجات لونية غنية وضغط Lossy فعال.',
          'صيغة PNG: صُممت لتحل محل GIF، وتتميز بالضغط غير الفاقد للجودة ودعم الخلفيات الشفافة تماماً.',
          'صيغة WebP: طورتها Google كصيغة جيل جديد تدعم كلاً من الضغط الفاقد وغير الفاقد مع الشفافية وحجم أصغر بنسبة 30%.',
        ],
      },
      {
        heading: 'When to Use JPG',
        headingAr: 'متى يجب أن تختار صيغة JPG؟',
        body: 'JPG is best suited for complex photographic images containing continuous tone color variations, portraits, landscapes, and real-world textures. Because JPG uses Discrete Cosine Transform (DCT) lossy compression, it easily condenses intricate gradients into remarkably compact files.',
        bodyAr: 'تعتبر صيغة JPG الخيار الأمثل للصور الفوتوغرافية الغنية بالتفاصيل والتدرجات الطبيعية مثل صور الطبيعة والأشخاص والمشاهد اليومية. نظراً لاعتمادها على ضغط التدرجات اللونية، تقدم أحجاماً خفيفة جداً لهذه الاستخدامات.',
        bullets: [
          'Best For: Camera photos, hero header photography, art paintings, and email newsletters.',
          'Avoid For: Screenshots with small text, line art drawings, vector icons, or graphics needing transparent backgrounds.',
        ],
        bulletsAr: [
          'أفضل استخدام: الصور الملتقطة بالكاميرا، صور الخلفيات الكبيرة، النشرات البريدية.',
          'تجنب استخدامها مع: لقطات الشاشة المحتوية على نصوص صغيرة، الشعارات، والرسومات التي تحتاج خلفية شفافة.',
        ],
      },
      {
        heading: 'When to Use PNG',
        headingAr: 'متى يجب أن تختار صيغة PNG؟',
        body: 'PNG uses DEFLATE lossless compression, meaning every pixel is identical to the source canvas. It supports an alpha channel with 256 levels of opacity, allowing drop shadows and seamless blending on any website background color.',
        bodyAr: 'تستخدم صيغة PNG ضغطاً غير فاقد للبيانات، مما يجعل كل بكسل مطابقاً للأصل. تدعم الصيغة قناة ألفا للشفافية بدرجات متفاوتة، مما يتيح دمج الشعارات والظلال بسلاسة فوق أي لون خلفية.',
        bullets: [
          'Best For: Brand logos, website favicons, software UI screenshots, charts, and technical diagrams.',
          'Avoid For: Large DSLR camera photos, as uncompressed PNG file sizes can easily exceed 5MB to 15MB.',
        ],
        bulletsAr: [
          'أفضل استخدام: شعارات الشركات، أيقونات المواقع، لقطات شاشة البرامج، المخططات البيانية.',
          'تجنب استخدامها مع: الصور الفوتوغرافية عالية الدقة لأن حجم ملف PNG سيكون ضخماً جداً (قد يتجاوز 10 ميجابايت).',
        ],
      },
      {
        heading: 'Why WebP is the Future of Web Performance',
        headingAr: 'لماذا تعد WebP الصيغة الأفضل لمواقع الويب الحديثة؟',
        body: 'According to Google performance studies, WebP lossy images are 25-34% smaller than comparable JPEG images, and WebP lossless images are 26% smaller than comparable PNGs. Furthermore, WebP natively supports alpha transparency even in lossy mode—a feature impossible with standard JPG.',
        bodyAr: 'تؤكد دراسات Google أن صور WebP أصغر حجماً بنسبة 25% إلى 34% مقارنة بصور JPEG عند نفس مستوى الجودة، وأصغر بنسبة 26% مقارنة بـ PNG. والأهم من ذلك أنها تدعم الشفافية حتى في وضع الضغط الفاقد، وهو ما يعجز عنه الـ JPG تماماً.',
        tip: 'Modern browsers (Chrome, Safari, Edge, Firefox) have over 98% native support for WebP. Converting your website assets to WebP improves Google PageSpeed scores immediately.',
        tipAr: 'نصيحة: تدعم جميع المتصفحات الحديثة صيغة WebP بنسبة تتجاوز 98%. تحويل صور موقعك إلى WebP يرفع فوراً درجات أداء الموقع في Google PageSpeed و Lighthouse.',
      },
    ],
    faqs: [
      {
        question: 'Do all modern web browsers support WebP?',
        answer: 'Yes, WebP has been universally supported across all major desktop and mobile browsers (Chrome, Safari iOS/macOS, Firefox, Edge) since 2020.',
      },
      {
        question: 'Can I convert PNG to JPG to save space?',
        answer: 'Yes, but be aware that converting PNG to JPG will replace transparent background areas with solid white, because JPG does not support alpha channels.',
      },
      {
        question: 'Does converting WebP back to JPG restore original quality?',
        answer: 'No. Once an image is compressed with lossy algorithms, discarded color data cannot be magically restored. However, converting WebP to JPG ensures legacy compatibility.',
      },
      {
        question: 'How do I convert images safely in Sahlino?',
        answer: 'Use the Sahlino Image Converter tool. Simply upload your files and pick your output format (JPG, PNG, or WebP) for instant in-browser conversion.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تدعم جميع المتصفحات الحديثة صيغة WebP؟',
        answer: 'نعم، أصبحت صيغة WebP مدعومة بنسبة 100% في جميع المتصفحات الرئيسية مثل Chrome و Safari على iOS والماك و Edge و Firefox منذ عام 2020.',
      },
      {
        question: 'هل يمكنني تحويل PNG إلى JPG لتوفير المساحة؟',
        answer: 'نعم، ولكن تذكر أن تحويل PNG الشفاف إلى JPG سيستبدل الأجزاء الشفافة بخلفية بيضاء مصمتة لأن JPG لا يدعم الشفافية.',
      },
      {
        question: 'هل إعادة تحويل WebP إلى JPG تستعيد الجودة الأصلية؟',
        answer: 'كلا، البيانات اللونية التي حُذفت أثناء الضغط لا يمكن استرجاعها، ولكن التحويل إلى JPG يفيدك لضمان التوافق مع برامج قديمة أو متطلبات طباعة محددة.',
      },
      {
        question: 'كيف أحول صوري بأمان وسرعة في ساهلينو؟',
        answer: 'استخدم أداة \"محول صيغ الصور\" على ساهلينو، حيث يمكنك رفع أي صورة واختيار الصيغة المطلوبة لتنزيلها محلياً في ثوانٍ معدودة.',
      },
    ],
  },

  // 4. Merge PDF
  {
    id: 'how-to-merge-pdf-files-online',
    slug: 'how-to-merge-pdf-files-online',
    title: 'How to Merge Multiple PDF Files into One Document for Free',
    titleAr: 'كيفية دمج عدة ملفات PDF في ملف واحد مجاناً وبترتيب مخصص',
    description: 'Combine multiple PDF documents, receipts, contracts, and scans into a single organized file in seconds with zero privacy risk.',
    descriptionAr: 'تعلم كيفية دمج ملفات PDF المتعددة والإيصالات والعقود في ملف واحد منظم وسهل المشاركة في ثوانٍ مع الحفاظ التام على سرية مستنداتك.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-01-28',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'pdf-merge',
    relatedArticles: ['how-to-convert-word-to-pdf', 'how-to-split-pdf-pages'],
    sections: [
      {
        heading: 'Why Consolidate Separate PDFs into a Single File?',
        headingAr: 'لماذا تحتاج إلى دمج ملفات الـ PDF المنفصلة في مستند واحد؟',
        body: 'In academic, administrative, and legal environments, dealing with dozens of separate PDF attachments is chaotic. Job applications, visa dossiers, mortgage packets, and monthly expense reports require unified presentation. Merging multiple individual PDFs into a cohesive, structured document ensures documents are reviewed in the intended chronological order.',
        bodyAr: 'في المعاملات الإدارية والتقديم على الوظائف أو التأشيرات، يكون إرسال عشرات المرفقات المنفصلة أمراً مربكاً وعرضة لضياع بعض الأوراق. دمج الملفات في مستند PDF واحد متسلسل يضمن سهولة تصفحها ومراجعتها بالترتيب الزمني الصحيح.',
        bullets: [
          'Prevents lost attachments in email threads and bureaucratic submissions.',
          'Maintains exact chronological page sequence for audits and contracts.',
          'Reduces recipient friction by presenting a single downloadable dossier.',
          'Facilitates sequential page numbering and organized digital archiving.',
        ],
        bulletsAr: [
          'منع ضياع المرفقات أو نسيان إرسال بعض الصفحات عبر البريد.',
          'الحفاظ على التسلسل المنطقي والزمني للأوراق والعقود الرسمية.',
          'تسهيل مهمة القارئ أو المسؤول بتنزيل ملف واحد متكامل.',
          'تنظيم الأرشفة الرقمية والطباعة المتتالية دون توقف.',
        ],
      },
      {
        heading: 'Step-by-Step Guide with Sahlino PDF Merge',
        headingAr: 'دليل عملي لدمج ملفات PDF عبر منصة ساهلينو',
        body: 'The Sahlino PDF Merge utility runs entirely in client-side memory using the pdf-lib engine. You can upload multiple PDFs, arrange their sequence visually, and combine them into a single file.',
        bodyAr: 'تعمل أداة دمج PDF في ساهلينو بالكامل داخل المتصفح عبر محرك pdf-lib المحلي. يمكنك إضافة عدة ملفات وترتيبها بالسحب والإفلات ودمجها بضغطة زر واحدة.',
        bullets: [
          'Step 1: Navigate to the PDF Merge tool on Sahlino.',
          'Step 2: Drag and drop two or more PDF files into the upload zone.',
          'Step 3: Use the drag handles or arrow buttons to arrange files in your desired reading order.',
          'Step 4: Click \"Merge PDF Files\" to compile the new document.',
          'Step 5: Download your unified PDF document instantly.',
        ],
        bulletsAr: [
          'الخطوة الأولى: افتح أداة \"دمج ملفات PDF\" على منصة ساهلينو.',
          'الخطوة الثانية: اسحب ملفين أو أكثر من ملفات PDF وأفلتها في نافذة الأداة.',
          'الخطوة الثالثة: استخدم أزرار الأسهم أو السحب لإعادة ترتيب الملفات وفق التسلسل المطلوب.',
          'الخطوة الرابعة: اضغط على زر \"دمج الملفات الآن\" لتوليد المستند الموحد.',
          'الخطوة الخامسة: نزّل الملف المدمج فوراً على جهازك أو هاتفك.',
        ],
        tip: 'Rename your individual files with numerical prefixes (e.g. 01_cover.pdf, 02_cv.pdf, 03_certificates.pdf) before uploading so they arrange in perfect order automatically.',
        tipAr: 'نصيحة: سمِّ ملفاتك بأرقام مسبقة (مثل 01_الغلاف.pdf و 02_السيرة.pdf) قبل رفعها ليتم ترتيبها تلقائياً بشكل مثالي.',
      },
      {
        heading: 'Privacy and Security Considerations with PDF Merging',
        headingAr: 'الأمان والسرية التامة عند دمج المستندات الحساسة',
        body: 'Legal contracts, bank statements, medical records, and passport scans contain confidential personal data. Traditional online converters upload these files to cloud servers where they may sit indefinitely. Sahlino merges PDF byte streams in local browser RAM without network transmission.',
        bodyAr: 'تحتوي كشوف الحسابات البنكية وصور الجوازات والعقود على بيانات شديدة الحساسية. مواقع الدمج التقليدية تخزن هذه الملفات على خوادمها، بينما تضمن ساهلينو معالجة تدفق البايتات محلياً في ذاكرة متصفحك دون إرسال أي بايت عبر الإنترنت.',
      },
    ],
    faqs: [
      {
        question: 'Is there a limit on how many PDF files I can merge?',
        answer: 'You can combine 10, 20, or more PDF files comfortably. Performance depends on your device memory since processing is 100% local.',
      },
      {
        question: 'Will merging PDFs degrade text or image quality?',
        answer: 'No. Sahlino merges document streams losslessly, preserving original vector fonts, high-resolution scans, and selectable text exactly as created.',
      },
      {
        question: 'Can I merge password-protected PDF files?',
        answer: 'Encrypted PDFs must be unlocked before merging because the browser sandbox cannot bypass document cryptographic passwords.',
      },
      {
        question: 'Do bookmarked outlines and links survive the merge?',
        answer: 'Standard page content and vector elements are preserved completely. Dynamic form fields and complex interactive scripts are flattened safely.',
      },
    ],
    faqsAr: [
      {
        question: 'هل يوجد حد أقصى لعدد ملفات PDF التي يمكن دمجها؟',
        answer: 'يمكنك دمج 10 أو 20 أو أكثر من الملفات بسلاسة؛ تعتمد السرعة على سعة ذاكرة جهازك لأن المعالجة تتم محلياً دون انتظار خوادم.',
      },
      {
        question: 'هل يتأثر وضوح النصوص أو جودة الصور بعد الدمج؟',
        answer: 'كلا، تحافظ الأداة على دقة الخطوط المتجهة وجودة الصور الأصلية كما هي تماماً دون أي ضغط أو تشويش.',
      },
      {
        question: 'هل يمكن دمج ملفات PDF محمية بكلمة مرور؟',
        answer: 'يجب إزالة كلمة المرور من الملفات المشفرة أولاً قبل دمجها حتى يتمكن المتصفح من قراءة صفحاتها بنجاح.',
      },
      {
        question: 'هل يمكن استخدام الأداة من الهاتف الذكي؟',
        answer: 'نعم، واجهة ساهلينو متجاوبة تماماً وتعمل بسلاسة على هواتف iPhone و Android وأجهزة iPad اللوحية.',
      },
    ],
  },

  // 5. Split PDF
  {
    id: 'how-to-split-pdf-pages',
    slug: 'how-to-split-pdf-pages',
    title: 'How to Split PDF Files and Extract Specific Pages',
    titleAr: 'كيفية تقسيم ملفات PDF واستخراج صفحات محددة بسهولة',
    description: 'Extract specific pages, page ranges, or separate multi-page PDF documents into individual files with complete privacy and zero installation.',
    descriptionAr: 'تعلم طريقة استخراج صفحات معينة أو نطاقات مخصصة من ملفات PDF وتقسيم المستندات الكبيرة محلياً في متصفحك بسرعة وأمان.',
    category: 'pdf-documents',
    categoryName: 'PDF & Documents',
    categoryNameAr: 'PDF والمستندات',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-02',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'pdf-split',
    relatedArticles: ['how-to-merge-pdf-files-online', 'how-to-convert-word-to-pdf'],
    sections: [
      {
        heading: 'Why Split Large PDF Documents?',
        headingAr: 'لماذا تحتاج إلى تقسيم ملفات الـ PDF الكبيرة؟',
        body: 'Large PDF documents like e-books, financial reports, municipal filings, and scanned contracts often bundle hundreds of pages when you only need one or two. Extracting only the required pages drastically reduces file size, protects unrelated private data, and satisfies upload limits on government portals.',
        bodyAr: 'غالباً ما يحتوي ملف الـ PDF على مئات الصفحات في حين أنك لا تحتاج سوى صفحة واحدة أو صفحتين لتقديمها لمعاملة حكومية أو إرسالها لعميل. استخراج الصفحات المطلوبة فقط يقلل حجم الملف بشكل هائل ويحمي خصوصية باقي البيانات غير المعنية.',
        bullets: [
          'Isolate confidential sections before forwarding documents to third parties.',
          'Extract signed signature pages and certificates from lengthy agreements.',
          'Satisfy strict email and portal file size upload limits (e.g. under 2MB or 5MB).',
          'Break massive scanned archives into manageable chapters and topic folders.',
        ],
        bulletsAr: [
          'عزل الصفحات الحساسة قبل مشاركة المستند مع أطراف خارجية.',
          'استخراج صفحات التوقيع والشهادات والإيصالات من العقود الطويلة.',
          'الالتزام بالحد الأقصى لحجم المرفقات على البوابات الإلكترونية (مثل 2 ميجابايت).',
          'تفكيك الكتب والتقارير الضخمة إلى فصول وأقسام يسهل فهرستها والرجوع إليها.',
        ],
      },
      {
        heading: 'Page Range Syntax: How to Target Specific Pages',
        headingAr: 'صيغة تحديد نطاق الصفحات المراد استخراجها',
        body: 'When splitting a PDF, entering clear page ranges ensures you extract exactly what you need in seconds. Sahlino supports flexible syntax conventions.',
        bodyAr: 'تتيح لك أداة تقسيم PDF في ساهلينو كتابة نطاقات ذكية ومرنة لتحديد الصفحات بدقة وسرعة متناهية.',
        bullets: [
          'Single Pages: Enter individual numbers separated by commas (e.g. \"1, 4, 7\").',
          'Continuous Ranges: Use a hyphen between start and end pages (e.g. \"3-8\" extracts pages 3, 4, 5, 6, 7, and 8).',
          'Combined Syntax: Mix single pages and ranges freely (e.g. \"1, 3-5, 12\").',
          'Extract All: Splits every single page of the document into its own standalone PDF file.',
        ],
        bulletsAr: [
          'صفحات فردية: اكتب أرقام الصفحات مفصولة بفواصل (مثال: \"1, 4, 7\").',
          'نطاق متصل: استخدم الشرطة بين الصفحة الأولى والأخيرة (مثال: \"3-8\" يستخرج الصفحات من 3 إلى 8).',
          'مزيج مرن: يمكنك الجمع بين الصفحات المنفصلة والنطاقات (مثال: \"1, 3-5, 12\").',
          'تقسيم كامل: تفكيك كل صفحة من المستند إلى ملف PDF مستقل بذاته.',
        ],
        tip: 'Double check whether your PDF starts with unnumbered cover pages so your requested page numbers correspond to the actual physical PDF page indices.',
        tipAr: 'نصيحة: تأكد دائماً مما إذا كان المستند يبدأ بصفحة غلاف غير مرقمة حتى تطابق الأرقام التي تكتبها الصفحات الفعلية في متصفح PDF.',
      },
      {
        heading: 'Step-by-Step Splitting with Sahlino',
        headingAr: 'خطوات استخراج وتقسيم الصفحات في ساهلينو',
        body: 'Execute your extraction cleanly with three simple steps inside the browser.',
        bodyAr: 'نفذ عملية التقسيم في ثوانٍ عبر خطوات بسيطة ومباشرة داخل المتصفح.',
        bullets: [
          'Step 1: Upload your PDF to the Sahlino PDF Split tool.',
          'Step 2: Enter your target page numbers or custom range in the input field.',
          'Step 3: Click \"Extract Pages\" and download your lightweight extracted PDF immediately.',
        ],
        bulletsAr: [
          'الخطوة الأولى: ارفع ملف PDF إلى أداة \"تقسيم PDF\" على ساهلينو.',
          'الخطوة الثانية: اكتب أرقام الصفحات المطلوبة أو النطاق في الحقل المخصص.',
          'الخطوة الثالثة: اضغط على \"استخراج الصفحات\" وحمل ملفك الجديد الخفيف فوراً.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does splitting a PDF damage text searchability or OCR?',
        answer: 'No. Sahlino preserves underlying font glyphs and embedded OCR text layers, ensuring your extracted pages remain fully searchable and copyable.',
      },
      {
        question: 'Can I extract non-consecutive pages into a single document?',
        answer: 'Yes! Specifying \"1, 5, 9\" creates a single 3-page PDF containing exactly those three selected pages in sequence.',
      },
      {
        question: 'Is my document secure during splitting?',
        answer: '100% secure. Everything happens in your device memory sandbox without cloud transmissions or permanent disk logging.',
      },
      {
        question: 'Can I split a document on my mobile phone?',
        answer: 'Yes, the Sahlino PDF Split tool works smoothly across iPhone Safari, Android Chrome, and mobile tablets.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تفقد الصفحات المستخرجة إمكانية البحث في النصوص (OCR)؟',
        answer: 'كلا، تظل طبقات النصوص والكلمات قابلة للتحديد والنسخ والبحث داخل الملف المستخرج تماماً كما في الملف الأصلي.',
      },
      {
        question: 'هل يمكن استخراج صفحات غير متتالية في ملف واحد؟',
        answer: 'نعم! إدخال نطاق مثل \"1, 5, 9\" ينتج ملف PDF واحداً مكوناً من تلك الصفحات الثلاث المحددة بالتسلسل.',
      },
      {
        question: 'هل بيانات مستندي آمنة أثناء التقسيم؟',
        answer: 'آمنة 100%، حيث تتم المعالجة بالكامل محلياً داخل ذاكرة متصفحك دون رفع أي صفحة إلى أي خادم خارجي.',
      },
      {
        question: 'هل الأداة متوافقة مع الهواتف الذكية؟',
        answer: 'نعم، تعمل أداة تقسيم الـ PDF بكفاءة عالية على جميع متصفحات الهواتف الذكية مثل Safari و Chrome.',
      },
    ],
  },

  // 6. Percentage Calculator
  {
    id: 'how-to-calculate-percentages-and-discounts',
    slug: 'how-to-calculate-percentages-and-discounts',
    title: 'How to Calculate Percentages, Discounts, and Sales Tax',
    titleAr: 'كيفية حساب النسبة المئوية والخصومات والضرائب بسهولة ودقة',
    description: 'Master practical percentage formulas for everyday retail shopping, restaurant tips, sales tax calculations, and percentage increases or decreases.',
    descriptionAr: 'دليل عملي شامل لحساب النسب المئوية، الخصومات التجارية، ضريبة القيمة المضافة، وحساب الزيادة والنقصان المئوي بخطوات وأمثلة حية.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-02-05',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'percentage-calculator',
    relatedArticles: ['how-to-calculate-loan-interest-and-installments', 'how-to-count-words-characters-for-seo'],
    sections: [
      {
        heading: 'The Foundational Percentage Formula',
        headingAr: 'القاعدة الأساسية لحساب النسبة المئوية',
        body: 'The word percent originates from the Latin \"per centum\", meaning \"by the hundred\". A percentage simply expresses a fraction or ratio as a portion out of 100. The foundational mathematical formula is: Percentage = (Part / Whole) × 100.',
        bodyAr: 'كلمة \"نسبة مئوية\" تعني جزءاً من مئة. الصيغة الرياضية الأساسية لحساب النسبة المئوية لأي جزء من الكل هي: النسبة المئوية = (الجزء ÷ الكل) × 100. على سبيل المثال، إذا حصل طالب على 45 درجة من أصل 50: (45 ÷ 50) × 100 = 90%.',
        bullets: [
          'Calculating X% of Y: Multiply Y by (X / 100). Example: 15% of $80 = (15 / 100) × 80 = $12.',
          'Finding What Percent X is of Y: Divide X by Y and multiply by 100. Example: 25 out of 200 = (25 / 200) × 100 = 12.5%.',
          'Mental Math Trick for 10%: Simply move the decimal point one place to the left ($45.00 -> $4.50).',
          'Mental Math Trick for 20%: Find 10% and double it ($4.50 × 2 = $9.00).',
        ],
        bulletsAr: [
          'حساب س% من ص: اضرب ص في (س ÷ 100). مثال: 15% من 80 ريال = 0.15 × 80 = 12 ريالاً.',
          'معرفة كم تمثل س من ص: اقسم س على ص ثم اضرب في 100. مثال: 25 من 200 = (25 ÷ 200) × 100 = 12.5%.',
          'حيلة الحساب الذهني لـ 10%: حرّك الفاصلة العشرية خانة واحدة لليسار (45.00 تصبح 4.50).',
          'حيلة الحساب الذهني لـ 20%: احسب 10% ثم ضاعف الناتج (4.50 × 2 = 9.00).',
        ],
      },
      {
        heading: 'Calculating Percentage Increase vs. Decrease (Discounts & Markups)',
        headingAr: 'حساب الزيادة والنقصان المئوي (الخصومات والأسعار الجديدة)',
        body: 'Percentage change measures the rate of growth or decline between an initial starting value and a final value. A critical rule is that the original starting value is ALWAYS placed in the denominator.',
        bodyAr: 'يقيس التغير المئوي مقدار النمو أو الانخفاض بين قيمة البداية والقيمة النهائية. القاعدة الذهبية التي يخطئ فيها الكثيرون هي أن القيمة الأصلية توضع دائماً في المقام (المقسوم عليه).',
        bullets: [
          'Percentage Increase Formula: ((New Value - Original Value) / Original Value) × 100%. If a stock rises from $50 to $75: ((75 - 50) / 50) × 100 = +50% increase.',
          'Percentage Decrease (Discount) Formula: ((Original Value - Discounted Value) / Original Value) × 100%. If a coat drops from $100 to $70: ((100 - 70) / 100) × 100 = 30% discount.',
          'Fast Discount Math: A 25% discount means you pay 75% of the sticker price (Price × 0.75).',
        ],
        bulletsAr: [
          'صيغة الزيادة المئوية: ((القيمة الجديدة - القيمة الأصلية) ÷ القيمة الأصلية) × 100%. إذا ارتفع سعر منتج من 50 إلى 75 ريال: ((75 - 50) ÷ 50) × 100 = زيادة بنسبة 50%.',
          'صيغة الخصم (النقصان): ((السعر الأصلي - سعر الخصم) ÷ السعر الأصلي) × 100%. معطف سعره 100 وخُفض إلى 70: ((100 - 70) ÷ 100) × 100 = خصم 30%.',
          'الحساب السريع للخصم: خصم 25% يعني أنك ستدفع 75% من السعر الأصلي (السعر × 0.75).',
        ],
        tip: 'Percentage difference is distinct from percentage change. Percentage difference is non-directional and compares two values by dividing their absolute difference by their average.',
        tipAr: 'نصيحة: يختلف \"الفرق المئوي\" عن \"التغير المئوي\". الفرق المئوي غير مرتبط بالزمن ويقارن بين رقمين بقسمة الفرق بينهما على متوسطهما الحسابي.',
      },
      {
        heading: 'Calculating Sales Tax and VAT (Value Added Tax)',
        headingAr: 'حساب ضريبة القيمة المضافة (VAT) والأسعار شاملة الضريبة',
        body: 'Sales tax or VAT is calculated by multiplying the pre-tax price by the tax rate decimal. To calculate the final price including a 15% VAT, multiply the base price by 1.15. To find the pre-tax price from a VAT-inclusive total, divide the gross amount by 1.15.',
        bodyAr: 'تُحسب ضريبة القيمة المضافة بضرب السعر قبل الضريبة في نسبة الضريبة العشرية. لمعرفة السعر النهائي شاملاً ضريبة 15%، اضرب السعر الأساسي في 1.15. ولمعرفة السعر قبل الضريبة من إجمالي الفاتورة، اقسم المبلغ الإجمالي على 1.15.',
        bullets: [
          'Example with 15% VAT: A service costs $200 before tax -> Tax = 200 × 0.15 = $30. Total = $230.',
          'Reverse VAT Calculation: Total invoice is $115 -> Base price = 115 / 1.15 = $100. Tax portion = $15.',
        ],
        bulletsAr: [
          'مثال على ضريبة 15%: سلعة بقيمة 200 ريال -> قيمة الضريبة = 200 × 0.15 = 30 ريالاً. الإجمالي = 230 ريالاً.',
          'حساب الضريبة العكسي: فاتورة إجمالية بقيمة 115 ريالاً -> السعر قبل الضريبة = 115 ÷ 1.15 = 100 ريال، ومبلغ الضريبة = 15 ريالاً.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the fastest way to calculate a 15% tip or tax in your head?',
        answer: 'Find 10% by shifting the decimal point left once, take half of that value to find 5%, and add the two numbers together.',
      },
      {
        question: 'What is the difference between percent (%) and percentage points?',
        answer: 'A percent measures relative change, while percentage points measure the absolute arithmetic difference between two percentages (e.g. from 10% to 15% is a 5 percentage point gain, but a 50% relative increase).',
      },
      {
        question: 'How do I calculate reverse percentage when I know the discounted price?',
        answer: 'Divide the discounted price by (1 - discount rate). If you paid $80 after a 20% discount: 80 / (1 - 0.20) = 80 / 0.80 = $100 original price.',
      },
      {
        question: 'Can Sahlino Percentage Calculator handle all these modes?',
        answer: 'Yes! Sahlino offers 6 specialized calculator modes covering X% of Y, percentage increase, decrease, differences, and reverse values.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هي أسرع طريقة ذهنية لحساب 15% دون استخدام آلة حاسبة؟',
        answer: 'احسب 10% بتحريك الفاصلة خانة لليسار، ثم خذ نصف هذا الناتج (وهو ما يمثل 5%)، واجمع القيمتين معاً لتحصل على 15% فوراً.',
      },
      {
        question: 'ما الفرق بين النسبة المئوية (%) ونقاط النسبة المئوية؟',
        answer: 'النسبة المئوية تقيس التغير النسبي، بينما نقاط النسبة تقيس الفارق الحسابي المباشر. الارتفاع من 10% إلى 15% يمثل زيادة بمقدار 5 نقاط مئوية، لكنه زيادة نسبية بمقدار 50%.',
      },
      {
        question: 'كيف أحسب السعر الأصلي إذا كنت أعرف السعر بعد الخصم فقط؟',
        answer: 'اقسم السعر بعد الخصم على (1 - نسبة الخصم). إذا دفعت 80 ريالاً بعد خصم 20%: 80 ÷ (1 - 0.20) = 80 ÷ 0.80 = 100 ريال هو السعر الأصلي.',
      },
      {
        question: 'هل تدعم حاسبة ساهلينو جميع هذه الأنواع؟',
        answer: 'نعم! توفر حاسبة النسب المئوية في ساهلينو 6 أوضاع حسابية ذكية تغطي حساب القيم المباشرة، نسب الزيادة والنقصان، الفروق المئوية، والحلول خطوة بخطوة.',
      },
    ],
  },

  // 7. BMI Calculator
  {
    id: 'how-to-calculate-bmi-healthy-weight',
    slug: 'how-to-calculate-bmi-healthy-weight',
    title: 'How to Calculate Body Mass Index (BMI) and Find Your Healthy Weight',
    titleAr: 'كيفية حساب مؤشر كتلة الجسم (BMI) ومعرفة الوزن المثالي الصحي',
    description: 'Understand the medical BMI formula, WHO weight categories, healthy weight ranges for your height, and the key limitations of BMI metrics.',
    descriptionAr: 'تعرف على المعادلة الطبية المعتمدة لحساب مؤشر كتلة الجسم (BMI)، تصنيفات منظمة الصحة العالمية، وكيف تحدد نطاق وزنك الصحي المثالي بدقة.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-02-10',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'bmi-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts', 'how-to-calculate-exact-age-and-birthdays'],
    sections: [
      {
        heading: 'What is Body Mass Index (BMI) and How is it Calculated?',
        headingAr: 'ما هو مؤشر كتلة الجسم (BMI) وكيف يتم حسابه طبياً؟',
        body: 'Body Mass Index (BMI), developed in the 19th century by Belgian mathematician Adolphe Quetelet, is a globally recognized screening tool used by healthcare professionals and the World Health Organization (WHO) to categorize body mass relative to stature.',
        bodyAr: 'مؤشر كتلة الجسم (Body Mass Index أو اختصاراً BMI) هو مقياس طبي معتمد عالمياً طوره عالم الرياضيات أدولف كيتليه، وتعتمد عليه منظمة الصحة العالمية (WHO) لتقييم تناسق وزن الفرد مع طوله وتحديد فئات النحافة والوزن الطبيعي والزيادة أو السمنة.',
        bullets: [
          'Metric Formula: BMI = Weight (kg) / [Height (m)]². Example: 70 kg and 1.75 m -> 70 / (1.75 × 1.75) = 70 / 3.0625 = 22.86 (Normal weight).',
          'Imperial Formula: BMI = [Weight (lbs) × 703] / [Height (inches)]².',
        ],
        bulletsAr: [
          'المعادلة المترية: مؤشر كتلة الجسم = الوزن (كجم) ÷ [الطول (بالمتر)]². مثال: شخص وزنه 70 كجم وطوله 1.75 م -> 70 ÷ (1.75 × 1.75) = 22.86 (وزن طبيعي).',
          'المعادلة الإمبراطورية: مؤشر كتلة الجسم = [الوزن (بالرطل) × 703] ÷ [الطول (بالبوصة)]².',
        ],
      },
      {
        heading: 'WHO International Weight Classification Categories',
        headingAr: 'تصنيفات مؤشر كتلة الجسم المعتمدة من منظمة الصحة العالمية (WHO)',
        body: 'Standard clinical thresholds categorized by the WHO define the health risk associated with body weight in adult men and women.',
        bodyAr: 'تحدد المعايير الطبية المعتمدة الفئات الصحية للبالغين من الرجال والنساء وفق نطاقات رقمية واضحة.',
        bullets: [
          'Underweight: BMI below 18.5. Indicates potential nutritional deficiency, low bone mineral density, or immune vulnerability.',
          'Normal Weight: BMI between 18.5 and 24.9. Associated with the lowest statistical risk of cardiovascular disease, hypertension, and type 2 diabetes.',
          'Overweight: BMI between 25.0 and 29.9. Suggests increased strain on joints and cardiovascular system.',
          'Obesity Class I: BMI between 30.0 and 34.9.',
          'Obesity Class II (Severe): BMI between 35.0 and 39.9.',
          'Obesity Class III (Morbid): BMI of 40.0 or higher.',
        ],
        bulletsAr: [
          'نقص الوزن (نحافة): أقل من 18.5. قد يشير إلى سوء تغذية أو نقص كثافة العظام.',
          'الوزن الطبيعي والصحي: من 18.5 إلى 24.9. النطاق الأمثل المرتبط بأقل معدلات الإصابة بأمراض القلب وضغط الدم والسكري.',
          'زيادة في الوزن: من 25.0 إلى 29.9. مؤشر على ضرورة مراجعة النظام الغذائي وزيادة النشاط البدني.',
          'سمنة من الدرجة الأولى: من 30.0 إلى 34.9.',
          'سمنة من الدرجة الثانية (شديدة): من 35.0 إلى 39.9.',
          'سمنة مفرطة من الدرجة الثالثة: 40.0 فما فوق.',
        ],
      },
      {
        heading: 'Key Limitations of BMI: Muscle vs. Fat',
        headingAr: 'حدود مقياس BMI ومتى يكون غير دقيق؟',
        body: 'While BMI is an excellent population screening tool, it does not directly measure body fat percentage. Dense muscle tissue weighs approximately 18% more than adipose fat tissue by volume. As a result, muscular athletes, bodybuilders, and fitness enthusiasts may register as \"overweight\" or \"obese\" despite having single-digit body fat levels and pristine cardiovascular markers.',
        bodyAr: 'على الرغم من أهمية مؤشر كتلة الجسم كمؤشر إحصائي عام، إلا أنه لا يقيس نسبة الدهون الحقيقية في الجسم. العضلات أكثر كثافة ووزناً من الدهون بحوالي 18% بنفس الحجم، ولذلك قد يصنف الرياضيون ولاعبو كمال الأجسام كأشخاص \"ذوي وزن زائد\" رغم امتلاكهم نسبة دهون منخفضة جداً ولياقة ممتازة.',
        bullets: [
          'Does not distinguish visceral fat (abdominal fat) from subcutaneous fat.',
          'May underestimate body fat in elderly individuals experiencing age-related muscle loss (sarcopenia).',
          'Not intended for pregnant women or children without age-adjusted percentile growth charts.',
        ],
        bulletsAr: [
          'لا يميز بين الدهون الحشوية العميقة الخطيرة والدهون السطحية تحت الجلد.',
          'قد يعطي نتائج مضللة لكبار السن بسبب تراجع الكتلة العضلية الطبيعي مع التقدم بالعمر.',
          'لا ينطبق مباشرة على الحوامل أو الأطفال دون استخدام منحنيات النمو المئوية المخصصة للأعمار.',
        ],
        tip: 'Combine BMI with waist circumference or waist-to-height ratio for a comprehensive health picture. A waist circumference under 94cm for men and under 80cm for women indicates lower metabolic risk.',
        tipAr: 'نصيحة: ادمج قراءة BMI مع قياس محيط الخصر؛ فمحيط الخصر الأقل من 94 سم للرجال و 80 سم للنساء يشير إلى انخفاض الدهون الحشوية وسلامة التمثيل الغذائي.',
      },
    ],
    faqs: [
      {
        question: 'What is the healthy weight range for my height?',
        answer: 'Calculate height in meters squared and multiply by 18.5 for the minimum healthy weight, and by 24.9 for the maximum healthy weight. For example, at 1.70m: 1.70² = 2.89. Healthy range = 53.5 kg to 72 kg.',
      },
      {
        question: 'Are BMI calculations different for adult men and women?',
        answer: 'The mathematical formula is identical for all adult men and women. However, women naturally carry a higher percentage of essential physiological body fat than men at the same BMI value.',
      },
      {
        question: 'How often should I recalculate my BMI?',
        answer: 'Recalculating once a month or during quarterly health checkups provides an accurate long-term trend without daily water-weight fluctuations.',
      },
      {
        question: 'Can Sahlino BMI Calculator show both metric and imperial units?',
        answer: 'Yes! Sahlino instantly converts between kilograms/centimeters and pounds/feet/inches with interactive health classification charts.',
      },
    ],
    faqsAr: [
      {
        question: 'كيف أحسب نطاق الوزن المثالي لطولي بدقة؟',
        answer: 'احسب مربع طولك بالمتر واضربه في 18.5 لمعرفة الحد الأدنى، وفي 24.9 لمعرفة الحد الأقصى للوزن الصحي. لشخص طوله 1.70 م: (1.70 × 1.70) = 2.89، النطاق الصحي = 53.5 كجم إلى 72 كجم.',
      },
      {
        question: 'هل تختلف معادلة BMI بين الرجال والنساء البالغين؟',
        answer: 'المعادلة الحسابية واحدة لكلا الجنسين من البالغين، ولكن جسد المرأة يحتوي فسيولوجياً على نسبة دهون أساسية أعلى من الرجل عند نفس رقم المؤشر.',
      },
      {
        question: 'كم مرة ينصح بحساب مؤشر كتلة الجسم؟',
        answer: 'يُفضل قياسه شهرياً أو كل بضعة أشهر لمراقبة الاتجاه العام وتفادي القلق من التغيرات اليومية الناتجة عن احتباس السوائل أو توقيت الوجبات.',
      },
      {
        question: 'هل تدعم حاسبة ساهلينو الوحدات المترية والإنجليزية؟',
        answer: 'نعم! تتيح لك حاسبة ساهلينو التبديل الفوري بين الكيلوجرام والسنتيمتر أو الباوند والأقدام والبوصات مع رسم بياني ملون يوضح فئتك بدقة.',
      },
    ],
  },

  // 8. Age Calculator
  {
    id: 'how-to-calculate-exact-age-and-birthdays',
    slug: 'how-to-calculate-exact-age-and-birthdays',
    title: 'How to Calculate Exact Chronological Age in Years, Months, and Days',
    titleAr: 'كيفية حساب العمر بدقة بالسنوات والشهور والأيام وساعات الحياة',
    description: 'Learn the exact mathematical method for calculating chronological age taking into account leap years, month length variations, and milestone countdowns.',
    descriptionAr: 'طريقة حساب العمر الزمني بدقة متناهية مع مراعاة السنوات الكبيسة وتفاوت أيام الشهور وحساب موعد عيد الميلاد القادم وساعات الحياة.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-12',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'age-calculator',
    relatedArticles: ['how-to-calculate-bmi-healthy-weight', 'how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'Why Accurate Chronological Age Matters',
        headingAr: 'أهمية الحساب الدقيق للعمر الزمني في المعاملات الرسمية',
        body: 'Calculating chronological age sounds trivial until you face official requirements: passport renewals, kindergarten enrollment deadlines, retirement pension eligibility, driving licenses, and life insurance actuarial tables. Simply subtracting your birth year from the current year fails to capture month and day boundaries, often resulting in legal discrepancies.',
        bodyAr: 'يبدو حساب العمر بسيطاً للوهلة الأولى، لكنه يصبح حاسماً عند تقديم الأوراق الرسمية: تسجيل الأطفال في المدارس حسب تاريخ ميلاد دقيق، استحقاق المعاش والتقاعد، استخراج رخص القيادة، أو حساب بوالص التأمين. الاكتفاء بطرح سنة الميلاد من السنة الحالية يعطي عمراً تقريبياً غير دقيق.',
        bullets: [
          'Accounting for Leap Years: A calendar year is not exactly 365 days; leap years insert February 29 every 4 years.',
          'Variable Month Lengths: Months fluctuate between 28, 29, 30, and 31 days, requiring calendar borrowing logic.',
          'Milestone Countdowns: Determining exact days remaining until the next birthday.',
        ],
        bulletsAr: [
          'حساب السنوات الكبيسة: السنة ليست 365 يوماً فقط؛ تضاف سنة كبيسة (29 فبراير) كل 4 سنوات لتصحيح الدوران الفلكي.',
          'تفاوت أيام الشهور: تتراوح أيام الشهور بين 28 و 31 يوماً، مما يتطلب استعارة الأيام بشكل دقيق عند الحساب اليدوي.',
          'العد التنازلي للمناسبات: حساب الأيام والساعات المتبقية بدقة حتى تاريخ الميلاد القادم.',
        ],
      },
      {
        heading: 'The Borrowing Algorithm for Chronological Age',
        headingAr: 'الخوارزمية الحسابية الدقيقة لحساب العمر يدوياً',
        body: 'To determine age manually on paper, write the current date (Year, Month, Day) and subtract your birth date. If the current day is smaller than the birth day, borrow one month (converted into the exact number of days of the preceding month). If the current month is smaller than the birth month, borrow 12 months from the year column.',
        bodyAr: 'لحساب العمر بدقة، اكتب التاريخ الحالي (سنة، شهر، يوم) واطرح منه تاريخ الميلاد. إذا كان يوم التاريخ الحالي أصغر من يوم الميلاد، نستعير شهراً كاملاً ونحوله إلى أيام بمقدار أيام الشهر السابق، وإذا كان الشهر أصغر نستعير 12 شهراً من خانة السنوات.',
        tip: 'Online calculators like Sahlino handle all calendar edge cases, timezone shifts, and leap year cycles automatically in microseconds.',
        tipAr: 'نصيحة: توفر حاسبة العمر في ساهلينو عناء الحساب اليدوي وتعطيك النتيجة فوراً بالسنوات والشهور والأيام وإجمالي الأسابيع وساعات حياتك.',
      },
      {
        heading: 'Cultural and Calendar Differences in Age Calculation',
        headingAr: 'الفروق الثقافية وأنظمة التقويم في حساب الأعمار',
        body: 'In the international Gregorian calendar, an individual turns 1 year old on their first anniversary. Historically in East Asian systems (such as traditional Korean age), a baby was considered 1 year old at birth and gained an additional year on New Year\'s Day. In Islamic jurisdictions, age may be calculated based on the Hijri lunar calendar, which is roughly 11 days shorter per year than solar calendars.',
        bodyAr: 'في التقويم الميلادي الشمسي، يُكمل الإنسان عامه الأول بعد مرور 365 يوماً من ولادته. بينما في التقويم الهجري القمري، تكون السنة أقصر بنحو 11 يوماً من السنة الشمسية، مما يجعل عمر الإنسان بالتقويم الهجري أكبر بنحو سنة واحدة كل 33 سنة شمسية.',
      },
    ],
    faqs: [
      {
        question: 'How do leap years affect my exact age in days?',
        answer: 'Each leap year lived adds an extra day (February 29) to your total days on Earth. Sahlino calculates every single leap year lived since your birth date.',
      },
      {
        question: 'How many days until my next birthday?',
        answer: 'Sahlino displays an instant countdown showing the exact days, hours, and day of the week for your upcoming birthday celebration.',
      },
      {
        question: 'Why does age differ between Gregorian and Hijri calendars?',
        answer: 'Because the lunar Hijri year has ~354 days compared to 365.25 days in the solar Gregorian year, a person aged 33 solar years is approximately 34 lunar years old.',
      },
      {
        question: 'Does Sahlino save my birth date on any server?',
        answer: 'No. Your birth date is processed only in your local browser runtime memory and is never logged or transmitted.',
      },
    ],
    faqsAr: [
      {
        question: 'كيف تؤثر السنوات الكبيسة على إجمالي أيامي على الأرض؟',
        answer: 'تضيف كل سنة كبيسة عشتها يوماً إضافياً (29 فبراير) إلى إجمالي الأيام، وتحسب أداة ساهلينو جميع السنوات الكبيسة التي مرت منذ ولادتك بدقة.',
      },
      {
        question: 'كيف أعرف كم يوماً متبقياً على عيد ميلادي القادم؟',
        answer: 'تعرض حاسبة ساهلينو عداداً فورياً يوضح عدد الأيام المتبقية واسم اليوم من الأسبوع الذي سيوافق عيد ميلادك القادم.',
      },
      {
        question: 'لماذا يختلف العمر بين التاريخ الهجري والميلادي؟',
        answer: 'لأن السنة الهجرية القمرية (354 يوماً تقريباً) أقصر بحوالي 11 يوماً من السنة الشمسية (365 يوماً)، مما يجعل العمر بالهجري أكبر بنحو عام كل 33 سنة.',
      },
      {
        question: 'هل تحتفظ منصة ساهلينو بتاريخ ميلادي على أي خادم؟',
        answer: 'أبداً. تجري المعالجة والحسابات بالكامل محلياً داخل متصفحك ولا يتم تسجيل أو مشاركة أي معلومة تخص تاريخ ميلادك.',
      },
    ],
  },

  // 9. QR Codes
  {
    id: 'how-to-create-custom-qr-codes',
    slug: 'how-to-create-custom-qr-codes',
    title: 'How to Generate Custom QR Codes for WiFi, Links, and Contacts',
    titleAr: 'دليل إنشاء رموز الاستجابة السريعة (QR Code) المخصصة للروابط والواي فاي',
    description: 'Learn how to generate scan-ready QR codes for websites, automated WiFi connections, vCards, and digital menus with proper error correction.',
    descriptionAr: 'تعلم كيفية توليد باركود ورموز QR احترافية للروابط وشبكات الواي فاي وبطاقات الأعمال vCard وقوائم المطاعم مع اختيار دقة تصحيح الأخطاء المناسبة.',
    category: 'images',
    categoryName: 'Images & Photos',
    categoryNameAr: 'الصور والتصميم',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-02-15',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'qr-code-generator',
    relatedArticles: ['difference-between-jpg-png-webp', 'how-to-compress-images-without-losing-quality'],
    sections: [
      {
        heading: 'Anatomy and Mechanics of a QR Code',
        headingAr: 'تشريح رمز الاستجابة السريعة (QR Code) وكيف يعمل؟',
        body: 'Invented in 1994 by the Japanese automotive company Denso Wave, the Quick Response (QR) code is a two-dimensional matrix barcode capable of encoding up to 7,089 numeric characters or 4,296 alphanumeric characters. Unlike traditional 1D barcodes scanned linearly, QR codes are read bidirectionally via camera sensors.',
        bodyAr: 'ابتُكر رمز الاستجابة السريعة (QR Code) عام 1994 في اليابان بواسطة شركة Denso Wave. يتميز بقدرته على تخزين آلاف الحروف والأرقام في مصفوفة ثنائية الأبعاد يمكن قراءتها من أي زاوية بسرعة فائقة عبر كاميرات الهواتف الذكية.',
        bullets: [
          'Finder Patterns: The three distinctive large squares in the corners allow scanners to recognize orientation and angle instantly.',
          'Alignment & Timing Patterns: Small internal grid marks correct for curved surfaces, skewed perspectives, or printed wrinkles.',
          'Data Payload Modules: Black and white binary cells encoding the actual URL, text string, or connection schema.',
          'Quiet Zone: The mandatory clean margin surrounding the code that prevents interference from nearby text and packaging graphics.',
        ],
        bulletsAr: [
          'مربعات التحديد الرئيسية (Finder Patterns): المربعات الثلاثة الكبيرة في الزوايا التي تمكن الكاميرا من معرفة زاوية الكود واتجاهه فوراً.',
          'نقاط المحاذاة والتوقيت: خطوط ونقاط داخلية تساعد في تصحيح التشويه إذا كان الكود مطبوعاً على سطح منحنٍ أو ورق مائل.',
          'خلايا البيانات الثنائية: البكسلات السوداء والبيضاء التي تحمل الرابط أو النص المشفر.',
          'منطقة الأمان (Quiet Zone): الهامش الأبيض المحيط بالكود، وهو ضروري لمنع تداخل التصاميم والكلمات المجاورة أثناء المسح.',
        ],
      },
      {
        heading: 'Understanding Reed-Solomon Error Correction Levels',
        headingAr: 'مستويات تصحيح الأخطاء (Reed-Solomon Error Correction)',
        body: 'One of the greatest engineering feats of QR codes is Reed-Solomon error correction. This mathematical algorithm embeds redundant parity data, allowing a smartphone to read the code successfully even if part of the printed surface is torn, smudged, scratched, or covered by a brand logo.',
        bodyAr: 'من أهم ميزات باركود QR هي خوارزمية تصحيح الأخطاء (Reed-Solomon)، والتي تدمج بيانات احتياطية تتيح للهاتف قراءة الرمز بنجاح حتى لو تلطخ جزء من الورق أو تمزق أو وضع شعار في المنتصف.',
        bullets: [
          'Level L (Low): Recovers up to 7% damaged data. Generates the simplest, least dense grid (ideal for low-resolution screens).',
          'Level M (Medium): Recovers up to 15% damaged data. The standard default for web links and marketing flyers.',
          'Level Q (Quartile): Recovers up to 25% damaged data. Ideal for industrial and commercial environments.',
          'Level H (High): Recovers up to 30% damaged data. Essential when superimposing custom icons, center logos, or outdoor signage exposed to weather.',
        ],
        bulletsAr: [
          'المستوى L (منخفض): يسترجع حتى 7% من البيانات المفقودة، وينتج كوداً بسيطاً خفيف الكثافة.',
          'المستوى M (متوسط): يسترجع حتى 15% من البيانات التالفة، وهو الخيار القياسي لمعظم الروابط والإعلانات.',
          'المستوى Q (مرتفع): يسترجع حتى 25% من التلف، ومناسب لبيئات العمل والمطارات.',
          'المستوى H (أقصى حماية): يسترجع حتى 30% من التلف، وهو الخيار الضروري إذا أردت وضع شعار شركتك في منتصف الكود أو للوحات الخارجية.',
        ],
        tip: 'Always maintain high contrast: dark modules on a clean light background. Inverting colors (white QR on black background) causes scanning failures on older budget smartphone cameras.',
        tipAr: 'نصيحة: حافظ دائماً على تباين عالٍ (كود داكن فوق خلفية فاتحة)، وتجنب عكس الألوان لأن بعض كاميرات الهواتف القديمة تعجز عن قراءة الكود الأبيض على خلفية سوداء.',
      },
      {
        heading: 'Popular QR Code Use Cases: WiFi and vCards',
        headingAr: 'أشهر استخدامات رموز QR: الاتصال السريع بالواي فاي وبطاقات الأعمال',
        body: 'Beyond simple web URLs, formatted schemas unlock instant hardware interactions.',
        bodyAr: 'إلى جانب روابط المواقع الإلكترونية، تتيح لك أنماط التشفير القياسية تنفيذ إجراءات ذكية بمسحة واحدة.',
        bullets: [
          'Direct WiFi Connection: Formatted as \"WIFI:S:NetworkName;T:WPA;P:Password;;\". Guests scan to connect automatically without typing lengthy passwords.',
          'Digital vCard Contacts: Encodes full name, phone number, email, and company into phone contact books instantly.',
          'Restaurant Menus: Digital contactless menus reducing physical printing costs.',
        ],
        bulletsAr: [
          'الاتصال المباشر بالواي فاي: يتيح للضيوف والعملاء الاتصال بالشبكة فوراً دون الحاجة لكتابة كلمة المرور يدوياً.',
          'بطاقات الأعمال الرقمية (vCard): حفظ رقم الهاتف والبريد واسم الشركة مباشرة في جهات اتصال الهاتف بمسحة واحدة.',
          'قوائم المطاعم والكافيهات: تسهيل تصفح المنيو الرقمي وتحديث الأسعار دون طباعة أوراق جديدة.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do QR codes created on Sahlino ever expire?',
        answer: 'Never! Sahlino generates static, direct QR codes. Your destination URL or WiFi text is baked directly into the pixel pattern with zero redirects and zero expiry dates.',
      },
      {
        question: 'What is the minimum recommended print size for a QR code?',
        answer: 'For handouts and business cards, print at least 2cm x 2cm (0.8 x 0.8 inches). For posters viewed from 1 meter away, make it at least 10cm wide.',
      },
      {
        question: 'Can a QR code carry a virus or malicious software directly?',
        answer: 'A QR code is just plain text. However, a malicious URL inside a code could lead to phishing websites. Always verify the domain preview in your camera before tapping.',
      },
      {
        question: 'Can I download my QR code as high-resolution PNG or SVG?',
        answer: 'Yes! Sahlino allows you to export crisp PNG images ready for digital screens or vector printing.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تنتهي صلاحية رموز الـ QR التي يتم إنشاؤها على ساهلينو؟',
        answer: 'أبداً! رموز QR المنشأة على ساهلينو هي رموز ثابتة (Static)، حيث يُدمج الرابط أو النص مباشرة في المصفوفة دون أي خوادم وسيطة ودون أي تاريخ انتهاء.',
      },
      {
        question: 'ما هو أصغر مقاس طباعة موصى به لرمز QR؟',
        answer: 'للبطاقات والمطبوعات الورقية الصغيرة، يُنصح بألا يقل المقاس عن 2×2 سم لضمان سهولة المسح من كاميرات جميع الهواتف.',
      },
      {
        question: 'هل يمكن للباركود أن ينقل فيروسات للهاتف؟',
        answer: 'الكود نفسه مجرد نص عادي ولا يحتوي على برمجيات، ولكن الروابط قد توجه لمواقع مشبوهة؛ لذلك يُنصح دائماً بمراجعة عنوان الرابط الذي يظهره هاتفك قبل فتحه.',
      },
      {
        question: 'هل يمكنني تنزيل رمز QR بدقة عالية؟',
        answer: 'نعم! تتيح لك أداة ساهلينو تنزيل الرمز كصورة PNG عالية الدقة جاهزة للطباعة أو الاستخدام الرقمي فوراً.',
      },
    ],
  },

  // 10. Word Counter
  {
    id: 'how-to-count-words-characters-for-seo',
    slug: 'how-to-count-words-characters-for-seo',
    title: 'How to Count Words and Characters Accurately for Content Writers and SEO',
    titleAr: 'دليل حساب الكلمات والحروف بدقة لكتاب المحتوى وخبراء الـ SEO',
    description: 'Learn strict character limits for Google SERP titles, meta descriptions, social media captions, academic essays, and translation billing.',
    descriptionAr: 'تعرف على الحدود القصوى للحروف والكلمات لعناوين وأوصاف محركات البحث Google، وتغريدات تويتر، والمقالات الأكاديمية وحساب تكاليف الترجمة.',
    category: 'productivity',
    categoryName: 'Productivity & Text',
    categoryNameAr: 'الإنتاجية والنصوص',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-02-18',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'word-counter',
    relatedArticles: ['how-to-clean-and-deduplicate-text', 'how-to-calculate-percentages-and-discounts'],
    sections: [
      {
        heading: 'Why Strict Character and Word Counts Matter in SEO',
        headingAr: 'أهمية ضبط عدد الحروف والكلمات في تحسين محركات البحث (SEO)',
        body: 'In digital marketing and search engine optimization, exceeding pixel and character limits triggers automatic truncation (the dreaded \"...\" ellipsis). When Google cuts off your meta title, potential readers miss your call to action or brand name, lowering your Organic Click-Through Rate (CTR).',
        bodyAr: 'في التسويق الرقمي والسيو (SEO)، يؤدي تجاوز الحد المسموح للحروف في عناوين صفحات الويب وأوصافها إلى قطع النص التلقائي من قبل Google وظهور علامة (...). عندما يُبتر العنوان، يفقد القارئ الفكرة الرئيسية أو اسم موقعك مما يقلل معدل النقر (CTR).',
        bullets: [
          'Google Title Tag: Optimal 50 to 60 characters (approximately 600 pixels width max). Anything longer gets truncated.',
          'Google Meta Description: Optimal 145 to 160 characters (approximately 960 pixels max on desktop, 680 pixels on mobile).',
          'Twitter / X Posts: Strict 280 characters limit for standard accounts.',
          'LinkedIn Posts: 3,000 characters maximum, but preview truncates after first 210 characters.',
          'SMS Marketing: 160 standard 7-bit GSM characters per single text segment, or 70 characters for Arabic/Unicode.',
        ],
        bulletsAr: [
          'عنوان الصفحة في Google (Title): من 50 إلى 60 حرفاً كحد مثالي (حوالي 600 بكسل عرضاً).',
          'وصف الصفحة (Meta Description): من 145 إلى 160 حرفاً (لتفادي بتر الوصف على شاشات الهواتف والكمبيوتر).',
          'منشورات منصة X (تويتر): حد أقصى 280 حرفاً للحسابات العادية.',
          'منشورات LinkedIn: 3000 حرف كحد أقصى، مع ظهور أول 210 حروف فقط قبل زر \"المزيد\".',
          'رسائل SMS الإعلانية: 160 حرفاً بالنظام الإنجليزي القياسي، أو 70 حرفاً للرسائل العربية ذات التشفير الموحد Unicode.',
        ],
      },
      {
        heading: 'Character Count: With Spaces vs. Without Spaces',
        headingAr: 'الفرق بين عدد الحروف مع المسافات وبدون المسافات',
        body: 'Why do word processors show two distinct character tallies? In technical translation and localization, translators are frequently compensated per word or per standard line (typically 55 characters including spaces). Conversely, book publishers and graphic designers setting typography within fixed grid boxes rely on character counts excluding spaces to gauge letter ink density.',
        bodyAr: 'غالباً ما تعرض برامج تحرير النصوص رقمين مختلفين للحروف. في قطاع الترجمة الاحترافية، يُحاسب المترجمون غالباً بناءً على عدد الكلمات أو الأسطر القياسية (55 حرفاً بالمسافات). بينما يحتاج المصممون لمطبعة الكتب لمعرفة الحروف بدون مسافات لحساب كثافة الحبر والمساحة الطباعية بدقة.',
        tip: 'Average adult reading speed is approximately 200 to 250 words per minute (WPM). A 1,000-word article takes about 4 to 5 minutes to read thoroughly.',
        tipAr: 'نصيحة: يبلغ متوسط سرعة القراءة للإنسان البالغ حوالي 200 إلى 250 كلمة في الدقيقة. مقال بطول 1000 كلمة يستغرق نحو 4 إلى 5 دقائق للقراءة الكاملة.',
      },
      {
        heading: 'Sahlino Word Counter Live Analysis',
        headingAr: 'التحليل الفوري مع عداد كلمات وحروف ساهلينو',
        body: 'The Sahlino Word Counter provides instantaneous metrics as you type or paste text.',
        bodyAr: 'توفر أداة عداد الكلمات في ساهلينو إحصائيات فورية بمجرد الكتابة أو لصق النص.',
        bullets: [
          'Total words, characters (with spaces), and characters (without spaces).',
          'Total sentences and paragraphs tally.',
          'Estimated reading time and speech presentation duration.',
          'Top keyword density frequency analysis to detect repetitive words.',
        ],
        bulletsAr: [
          'إجمالي الكلمات، الحروف شاملة المسافات، والحروف بدون مسافات.',
          'عدد الجمل والفقرات المستقلة.',
          'الوقت التقديري للقراءة الصامتة ووقت الإلقاء الصوتي للخطابات.',
          'تحليل تكرار الكلمات المفتاحية (Keyword Density) لاكتشاف التكرار الزائد.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best article word count for Google rankings?',
        answer: 'Search intent dictates optimal length. Focused how-to guides perform best between 800 and 1,500 words, while exhaustive cornerstone guides often range from 2,000 to 3,500 words.',
      },
      {
        question: 'Does Sahlino count hyphenated words as one word or two?',
        answer: 'Standard typographical hyphenated compounds (e.g. \"state-of-the-art\") are treated as unified word tokens matching standard publication style guidelines.',
      },
      {
        question: 'Can I paste private legal or business text safely?',
        answer: 'Yes! Sahlino executes counting algorithms 100% inside your browser memory. No text is ever uploaded or cached remotely.',
      },
      {
        question: 'How is estimated speaking time calculated?',
        answer: 'Speaking time is calculated based on standard comfortable presentation speech cadence of approximately 130 words per minute.',
      },
    ],
    faqsAr: [
      {
        question: 'ما هو الطول المثالي للمقال لتصدر نتائج محرك البحث Google؟',
        answer: 'يتوقف الطول على نية البحث؛ الأدلة الإرشادية المركزة تحقق أفضل النتائج بين 800 و 1500 كلمة، بينما الأدلة الشاملة تتراوح عادة بين 2000 و 3000 كلمة مفيدة.',
      },
      {
        question: 'كيف تتعامل الأداة مع علامات الترقيم والمسافات المتعددة؟',
        answer: 'تتجاهل الأداة المسافات الزائدة والفواصل المتكررة وتحسب الكلمات الحقيقية بدقة تامة لتفادي أي زيادة وهمية في العد.',
      },
      {
        question: 'هل نصوصي وعقودي آمنة عند لصقها في الأداة؟',
        answer: 'نعم، آمنة تماماً 100%، حيث لا يتم إرسال أي حرف إلى أي خادم، وتتم معالجة الإحصائيات مباشرة داخل جهازك.',
      },
      {
        question: 'كيف تحسب الأداة وقت الإلقاء والخطابة؟',
        answer: 'تعتمد الأداة على معدل الإلقاء الصوتي المريح للمتحدثين وهو حوالي 130 كلمة في الدقيقة للمساعدة في تجهيز العروض التقديمية والخطب.',
      },
    ],
  },

  // 11. JSON Formatter
  {
    id: 'how-to-format-validate-json-payloads',
    slug: 'how-to-format-validate-json-payloads',
    title: 'How to Format, Validate, and Debug JSON Payloads Like a Pro',
    titleAr: 'دليل المطور لتنسيق والتحقق من صحة بيانات JSON واكتشاف الأخطاء',
    description: 'Learn strict RFC 8259 JSON syntax standards, common parsing bugs, prettification vs minification, and safe client-side debugging practices.',
    descriptionAr: 'تعرف على معايير لغة JSON الرسمية، الأخطاء الشائعة في البرمجة، الفرق بين التنسيق والضغط، وكيف تتحقق من صحة الأكواد محلياً بأمان.',
    category: 'web-tools',
    categoryName: 'Web & Dev Tools',
    categoryNameAr: 'أدوات الويب والمطورين',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-02-22',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'json-formatter',
    relatedArticles: ['how-to-clean-and-deduplicate-text', 'how-to-create-custom-qr-codes'],
    sections: [
      {
        heading: 'The RFC 8259 Standard: Why Strict JSON Matters',
        headingAr: 'المعيار القياسي RFC 8259 وأهمية دقة صيغة JSON',
        body: 'JSON (JavaScript Object Notation), standardized under RFC 8259 and ECMA-404, is the de facto data interchange format powering modern REST APIs, GraphQL responses, Microservices, and NoSQL databases like MongoDB. While derived from JavaScript syntax, JSON is language-independent and enforces strict formatting rules.',
        bodyAr: 'تعد لغة JSON المعيار العالمي لتبادل البيانات بين خوادم الويب وتطبيقات الهواتف والواجهات البرمجية (REST APIs) وقواعد بيانات NoSQL. ورغم أنها مشتقة من لغة JavaScript، إلا أنها مستقلة تماماً وتخضع لقواعد بناء صارمة لا تقبل أي خطأ في البنية.',
        bullets: [
          'Keys MUST be enclosed in double quotes (\"key\": \"value\"). Single quotes (\'key\') are strictly invalid.',
          'Six primitive and structured data types only: string, number, boolean (true/false), null, array, and object.',
          'Undefined, functions, and comments (// or /* */) are forbidden under strict JSON specifications.',
          'Numbers must not have leading zeroes or hexadecimal representations (0x12 is invalid).',
        ],
        bulletsAr: [
          'المفاتيح (Keys) يجب أن تكون محاطة بعلامات تنصيص مزدوجة حصراً (\"name\"). علامات التنصيص الفردية (\'name\') تسبب خطأً فورياً.',
          'تدعم 6 أنواع بيانات فقط: النصوص، الأرقام، القيم المنطقية (true/false)، القيمة الفارغة (null)، المصفوفات، والكائنات.',
          'التعليقات البرمجية (//) والدوال غير مسموح بها إطلاقاً في معيار JSON القياسي.',
          'الأرقام لا يمكن أن تبدأ بأصفار زائدة أو بنظام سداسي عشر.',
        ],
      },
      {
        heading: 'Top 3 JSON Syntax Errors and How to Fix Them',
        headingAr: 'أشهر 3 أخطاء تسبب انهيار بيانات JSON وكيفية حلها',
        body: 'Debugging raw API responses often comes down to three classic pitfalls.',
        bodyAr: 'عند استدعاء الواجهات البرمجية، تعود معظم مشاكل تعطل التحليل (Parse Error) إلى 3 أخطاء شائعة.',
        bullets: [
          '1. Trailing Commas: Adding a comma after the final item in an object or array (e.g. {\"a\": 1, \"b\": 2,}) violates standard JSON parsers.',
          '2. Unescaped Characters: Double quotes or backslashes inside string values must be properly escaped with a backslash (\\\" or \\\\).',
          '3. Raw Line Breaks in Strings: Multi-line string values must use escaped \\n rather than literal keyboard enter returns.',
        ],
        bulletsAr: [
          '1. الفاصلة الختامية الزائدة (Trailing Comma): وضع فاصلة بعد آخر عنصر في الكائن أو المصفوفة مثل {\"a\": 1,} يعد من أكثر الأخطاء شيوعاً.',
          '2. الرموز غير المعالجة (Unescaped): استخدام علامات تنصيص داخل نص القيمة دون وضع شرطة مائلة قبلها (\\\").',
          '3. فواصل الأسطر المباشرة: لا يمكن النزول لسطر جديد بزر Enter داخل النص المشفر؛ بل يجب استخدام الرمز \\n.',
        ],
        tip: 'Sahlino JSON Formatter points out the exact line and character column where a parsing error occurs, highlighting syntax breaks instantly.',
        tipAr: 'نصيحة: يحدد محرر ومنسق JSON في ساهلينو رقم السطر والعمود المحدد الذي حدث فيه الخطأ البرمجي، مما يوفر ساعات من البحث اليدوي.',
      },
      {
        heading: 'Prettify vs. Minify: When to Use Each',
        headingAr: 'التنسيق الجمالي (Prettify) مقابل الضغط (Minify)',
        body: 'Prettifying adds indented whitespace (2 or 4 spaces per nesting level) making deeply nested configurations easy for human developers to read and debug. Conversely, Minifying removes all unnecessary spaces and line breaks, reducing payload bandwidth by 20% to 40% for production network transport.',
        bodyAr: 'يضيف التنسيق (Prettify) مسافات بادئة منظمة (مسافتين أو 4 مسافات) لتسهيل قراءة الكود المتداخل على المطورين. في المقابل، يزيل الضغط (Minify) جميع المسافات والأسطر الفارغة لتقليص حجم الملف بنسبة 20% إلى 40% لتسريع إرسال البيانات عبر الشبكة.',
      },
    ],
    faqs: [
      {
        question: 'Why does JSON strictly disallow comments?',
        answer: 'Douglas Crockford (JSON creator) removed comments intentionally to prevent developers from putting parsing directives into data payloads, ensuring pure cross-platform interoperability.',
      },
      {
        question: 'Can I format sensitive API tokens and keys safely on Sahlino?',
        answer: 'Yes! Sahlino parses and formats JSON 100% locally in your browser memory. Your private keys, JWTs, and database responses are never uploaded to any remote server.',
      },
      {
        question: 'Can I download the formatted JSON directly as a file?',
        answer: 'Yes, click the Download button to save your formatted payload as a .json file directly to your computer.',
      },
      {
        question: 'What is the maximum JSON payload size supported?',
        answer: 'Sahlino comfortably handles multi-megabyte JSON payloads up to 25MB without browser freezes.',
      },
    ],
    faqsAr: [
      {
        question: 'لماذا لا يسمح معيار JSON بوجود تعليقات برمجية؟',
        answer: 'حذف دوغلاس كروكفورد (مبتكر لغة JSON) التعليقات عمداً لمنع المطورين من استخدامها لتمرير أوامر برمجية خاصة، مما يضمن بقاء البيانات متوافقة بين جميع لغات البرمجة.',
      },
      {
        question: 'هل يمكنني فحص مفاتيح API وبيانات العملاء الحساسة بأمان؟',
        answer: 'نعم! تجري جميع عمليات التنسيق والتحقق محلياً 100% داخل ذاكرة متصفحك دون إرسال أي بايت لخوادم خارجية، مما يضمن أمان التوكنز والبيانات السرية.',
      },
      {
        question: 'هل يمكنني تنزيل ملف JSON المنسق مباشرة؟',
        answer: 'نعم، توفر الأداة زراً لتنزيل الكود المنسق فوراً كملف .json منظم وجاهز للاستخدام في مشروعك.',
      },
      {
        question: 'ما هو أكبر حجم بيانات JSON تدعمه الأداة؟',
        answer: 'تستطيع الأداة معالجة ملفات JSON ضخمة تصل إلى 25 ميجابايت بسلاسة وسرعة فائقة.',
      },
    ],
  },

  // 12. Loan Calculator
  {
    id: 'how-to-calculate-loan-interest-and-installments',
    slug: 'how-to-calculate-loan-interest-and-installments',
    title: 'How to Calculate Monthly Loan Payments, Total Interest, and Amortization',
    titleAr: 'كيفية حساب أقساط القروض والفوائد البنكية وجدول السداد الشهري',
    description: 'Master the standard loan amortization formula to calculate monthly payments, total interest costs, down payments, and prepayment savings.',
    descriptionAr: 'دليل مالي شامل لفهم معادلة القروض والرهن العقاري، وحساب القسط الشهري وإجمالي الفائدة ومزايا السداد المبكر ودفعة الشراء الأولى.',
    category: 'calculators',
    categoryName: 'Calculators & Finance',
    categoryNameAr: 'الحاسبات والمالية',
    readTime: '6 min read',
    readTimeAr: 'قراءة في 6 دقائق',
    publishedDate: '2025-02-25',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'loan-calculator',
    relatedArticles: ['how-to-calculate-percentages-and-discounts', 'how-to-calculate-bmi-healthy-weight'],
    sections: [
      {
        heading: 'The Standard Loan Amortization Formula',
        headingAr: 'المعادلة الرياضية الرسمية لحساب القسط الشهري (Amortization)',
        body: 'Whether financing a home mortgage, buying an automobile, or securing a commercial business loan, lenders calculate fixed monthly installments using the standard amortization formula: M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ].',
        bodyAr: 'سواء كنت تخطط للحصول على تمويل عقاري لشراء منزل، أو قرض سيارة، أو تمويل شخصي، تعتمد البنوك على معادلة الاستهلاك المالي القياسية لحساب القسط الشهري الثابت: M = P [ r(1 + r)^n ] ÷ [ (1 + r)^n - 1 ].',
        bullets: [
          'M = Total Monthly Installment payment.',
          'P = Principal loan amount borrowed (after subtracting your down payment).',
          'r = Monthly interest rate (annual interest rate divided by 12 months, e.g. 6% annual = 0.06 / 12 = 0.005).',
          'n = Total number of monthly payments (loan tenure in years multiplied by 12, e.g. 5 years = 60 months).',
        ],
        bulletsAr: [
          'M = قيمة القسط الشهري الثابت المستحق.',
          'P = أصل مبلغ التمويل (المبلغ الصافي المقترض بعد خصم الدفعة المقدمة).',
          'r = معدل الفائدة الشهري (نسبة الفائدة السنوية مقسومة على 12 شهراً، مثلاً 6% سنوياً = 0.06 ÷ 12 = 0.005).',
          'n = إجمالي عدد الأقساط الشهرية (عدد سنوات التمويل مضروباً في 12 شهراً، مثلاً 5 سنوات = 60 قسطاً).',
        ],
      },
      {
        heading: 'How Amortization Works: Principal vs. Interest Split',
        headingAr: 'كيف يعمل جدول السداد: توزيع القسط بين الأصل والفوائد',
        body: 'In the early years of a long-term loan (especially a 20 or 30-year mortgage), the vast majority of your monthly installment goes directly toward paying off accumulated interest, while only a small slice chips away at the actual principal. As the outstanding loan balance gradually shrinks, the monthly interest portion decreases, accelerating principal repayment in later years.',
        bodyAr: 'في السنوات الأولى من القروض طويلة الأجل (خاصة التمويل العقاري لمدة 20 أو 25 سنة)، تذهب النسبة الأكبر من قسطك الشهري لسداد الفائدة المتراكمة، بينما يذهب جزء يسير فقط لسداد أصل الدين. ومع تراجع رصيد القرض المتبقي بمرور السنوات، ينخفض جزء الفائدة ويتسارع سداد أصل المبلغ.',
        tip: 'Making a single extra payment per year directly toward the principal balance can shave years off a 30-year mortgage and save tens of thousands of dollars in total cumulative interest.',
        tipAr: 'نصيحة: سداد دفعة إضافية واحدة سنوياً موجهة بالكامل لخصم أصل الدين (Principal Prepayment) يمكن أن يقلص مدة التمويل العقاري بعدة سنوات ويوفر مبالغ طائلة من الفوائد التراكمية.',
      },
      {
        heading: 'The Impact of Loan Duration: 15-Year vs. 30-Year Loan',
        headingAr: 'مقارنة هامة: قرض لمدة 15 سنة مقابل قرض لمدة 30 سنة',
        body: 'Choosing a longer loan term lowers your mandatory monthly payment, making expensive properties seem affordable. However, the extended compounding interest significantly multiplies the total lifetime cost of credit.',
        bodyAr: 'اختيار فترة سداد أطول يقلل قيمة القسط الشهري، لكنه يضاعف إجمالي الفوائد التي تدفعها للبنك بنهاية المدة.',
        bullets: [
          '15-Year Loan: Higher monthly payment, but you pay substantially less total interest and build equity twice as fast.',
          '30-Year Loan: Lower monthly burden, but total interest paid over the life of the loan can often equal or exceed the original purchase price of the property.',
        ],
        bulletsAr: [
          'قرض 15 سنة: قسط شهري أعلى، ولكن إجمالي الفوائد المدفوعة أقل بنسبة تصل إلى 60% مع تملك العقار بسرعة.',
          'قرض 30 سنة: قسط شهري أقل، ولكن إجمالي مبالغ الفوائد التراكمية قد يعادل أو يفوق قيمة العقار نفسه.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between APR and interest rate?',
        answer: 'The interest rate is the base cost of borrowing the principal. APR (Annual Percentage Rate) includes both the interest rate AND mandatory lender fees, origination charges, and administrative expenses, reflecting the true cost of credit.',
      },
      {
        question: 'How does an early prepayment penalty work?',
        answer: 'Some financial institutions charge a contractual fee if a borrower pays off the balance early. Always review your loan agreement for prepayment clauses before making lump-sum payments.',
      },
      {
        question: 'How do larger down payments reduce loan cost?',
        answer: 'A higher down payment reduces the initial principal amount (P), which immediately lowers both your monthly installment and total compounding interest.',
      },
      {
        question: 'Does Sahlino Loan Calculator calculate total interest automatically?',
        answer: 'Yes! Sahlino instantly calculates monthly payments, total cumulative interest, and total cost of credit with interactive adjustment sliders.',
      },
    ],
    faqsAr: [
      {
        question: 'ما الفرق بين نسبة الفائدة الاسمية ومعدل النسبة السنوي (APR)؟',
        answer: 'نسبة الفائدة تمثل التكلفة المباشرة لاقتراض المبلغ، بينما يشمل معدل النسبة السنوي (APR) الفائدة مضافاً إليها الرسوم الإدارية ورسوم المعاملات البنكية، مما يعكس التكلفة الحقيقية الكاملة.',
      },
      {
        question: 'ما هي شروط السداد المبكر للقروض؟',
        answer: 'تنظم القوانين واللوائح المصرفية السداد المبكر؛ حيث تتيح معظم الأنظمة خصم الفوائد للشهور المتبقية مع احتساب كلفة تعويضية محدودة (عادة أرباح 3 أشهر كحد أقصى).',
      },
      {
        question: 'كيف تساهم الدفعة الأولى الكبيرة في تقليل التكاليف؟',
        answer: 'زيادة الدفعة المقدمة تقلل أصل مبلغ القرض (P)، مما يخفض قيمة القسط الشهري ويوفر مبالغ ضخمة من إجمالي الفوائد التراكمية.',
      },
      {
        question: 'هل توضح حاسبة ساهلينو إجمالي الفائدة والمبلغ الكلي؟',
        answer: 'نعم! تعرض حاسبة القروض في ساهلينو القسط الشهري، إجمالي مبالغ الفوائد، وإجمالي المبلغ المستحق سداده بدقة فورية.',
      },
    ],
  },

  // 13. Text Cleaner
  {
    id: 'how-to-clean-and-deduplicate-text',
    slug: 'how-to-clean-and-deduplicate-text',
    title: 'How to Clean Up Messy Text, Remove Duplicates, and Format Lines',
    titleAr: 'كيفية تنظيف النصوص المبعثرة وحذف الأسطر المكررة والفراغات الزائدة',
    description: 'Learn efficient techniques to remove duplicate lines, strip extra whitespaces, normalize capitalization, and clean messy copy-pasted data.',
    descriptionAr: 'دليل عملي لتنظيف القوائم والنصوص البرمجية، إزالة التكرار، توحيد المسافات والأسطر، وتنظيم البيانات المنسوخة من ملفات PDF وجداول البيانات.',
    category: 'productivity',
    categoryName: 'Productivity & Text',
    categoryNameAr: 'الإنتاجية والنصوص',
    readTime: '5 min read',
    readTimeAr: 'قراءة في 5 دقائق',
    publishedDate: '2025-03-01',
    modifiedDate: '2026-09-20',
    relatedToolSlug: 'text-cleaner',
    relatedArticles: ['how-to-count-words-characters-for-seo', 'how-to-format-validate-json-payloads'],
    sections: [
      {
        heading: 'Why Text Cleaning and Deduplication is Essential',
        headingAr: 'لماذا تحتاج إلى أدوات تنظيف النصوص وإزالة التكرارات؟',
        body: 'Copying data from PDFs, emails, legacy databases, or spreadsheets frequently introduces annoying formatting glitches: hard line breaks mid-sentence, double spaces, trailing tabs, mixed case formatting, and duplicated entries. Manually scanning and cleaning thousands of lines is exhausting and prone to human error.',
        bodyAr: 'عند نسخ النصوص من ملفات PDF أو رسائل البريد أو قواعد البيانات القديمة، تواجهك مشاكل مزعجة: أسطر متقطعة في منتصف الجملة، مسافات مزدوجة، أسطر فارغة متكررة، وعناصر مكررة تشوه البيانات. تنظيف هذه القوائم يدوياً أمر شاق ومعرض للخطأ دائماً.',
        bullets: [
          'Cleaning Email and Lead Lists: Stripping duplicates prevents sending duplicate marketing campaigns to the same subscriber.',
          'Fixing PDF Copy-Paste Formatting: Converting broken multi-line blocks into cohesive, fluid paragraphs.',
          'Stripping Unwanted Whitespaces: Removing leading, trailing, and repeated interior spaces.',
          'Sorting and Alphabetizing: Arranging lists logically from A to Z or reverse order.',
        ],
        bulletsAr: [
          'تنظيف قوائم البريد والبيانات: إزالة العناوين المكررة لمنع إرسال رسائل متكررة لنفس المشترك.',
          'إصلاح نصوص الـ PDF: دمج الأسطر المكسورة وتحويلها لفقرات متصلة ومريحة للقراءة.',
          'حذف المسافات الزائدة: إزالة الفراغات المزدوجة في بداية ونهاية الأسطر.',
          'الترتيب الأبجدي للقوائم: فرز الكلمات والأسماء تصاعدياً أو تنازلياً بنقرة واحدة.',
        ],
      },
      {
        heading: 'Core Text Cleaning Operations Supported in Sahlino',
        headingAr: 'العمليات الأساسية لتنظيف النصوص في ساهلينو',
        body: 'The Sahlino Text Cleaner & Deduplicator bundles multiple smart filters.',
        bodyAr: 'تجمع أداة تنظيف النصوص في ساهلينو عدة فلاتر ذكية تعمل بضغطة زر واحدة.',
        bullets: [
          'Deduplicate Lines: Identifies and eliminates identical duplicate rows while maintaining original sequence.',
          'Trim Whitespaces: Cleans leading and trailing spaces from every individual line.',
          'Remove Empty Blank Lines: Purges accidental blank returns without losing structure.',
          'Normalize Letter Case: Convert between UPPERCASE, lowercase, Title Case, or Sentence case.',
        ],
        bulletsAr: [
          'إزالة الأسطر المكررة: فحص القائمة وحذف أي سطر متكرر مع الحفاظ على الترتيب الأصلي.',
          'تنظيف المسافات (Trim): إزالة المسافات الفارغة قبل بداية كل سطر وبعد نهايته.',
          'حذف الأسطر الفارغة: مسح الأسطر الخالية تماماً للحصول على نص متماسك ومضغوط.',
          'توحيد حالة الحروف: التبديل بين الحروف الكبيرة، الصغيرة، وعناوين الكلمات.',
        ],
        tip: 'If processing sensitive customer email addresses or database entries, Sahlino ensures 100% confidentiality because all regex regex replacement happens in your browser RAM.',
        tipAr: 'نصيحة: عند تنظيف قوائم بيانات العملاء الحساسة، تضمن لك ساهلينو الخصوصية التامة لأن معالجة النصوص تجري محلياً في متصفحك دون إرسالها لأي خادم.',
      },
      {
        heading: 'Step-by-Step: Cleaning Messy Text in Seconds',
        headingAr: 'خطوات سريعة لتنظيف نصوصك في ثوانٍ معدودة',
        body: 'Execute your cleaning workflow effortlessly in browser.',
        bodyAr: 'اتبع هذه الخطوات البسيطة لتنظيم بياناتك بسهولة.',
        bullets: [
          'Step 1: Paste your unformatted text or list into the input box.',
          'Step 2: Toggle your desired cleaning options (Remove Duplicates, Trim Spaces, Remove Blank Lines).',
          'Step 3: Click \"Clean Text\" and copy the cleaned results directly to your clipboard.',
        ],
        bulletsAr: [
          'الخطوة الأولى: الصق النص أو القائمة المبعثرة في صندوق المدخلات.',
          'الخطوة الثانية: حدد خيارات التنظيف المطلوبة (إزالة التكرار، حذف المسافات، حذف الأسطر الفارغة).',
          'الخطوة الثالثة: اضغط على \"تنظيف النص\" وانسخ النتيجة المنظمة فوراً.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is text deduplication case-sensitive?',
        answer: 'You can choose between case-sensitive deduplication (where \"Apple\" and \"apple\" are treated as distinct) or case-insensitive cleaning.',
      },
      {
        question: 'Will text cleaner fix broken paragraph lines from PDF copy-pasting?',
        answer: 'Yes! The line unwrap filter removes accidental carriage returns within paragraphs while preserving genuine section breaks.',
      },
      {
        question: 'Is there a limit on how many lines of text I can clean at once?',
        answer: 'Sahlino handles tens of thousands of lines (up to 500,000 characters) instantly using browser memory regex engines.',
      },
      {
        question: 'Are my pasted notes or spreadsheets stored on any server?',
        answer: 'No. All string manipulation and regex cleaning happens locally in your browser memory with 100% privacy.',
      },
    ],
    faqsAr: [
      {
        question: 'هل تميز الأداة بين الحروف الكبيرة والصغيرة عند حذف التكرار؟',
        answer: 'يمكنك الاختيار بين المطابقة الحساسة لحالة الأحرف أو معالجة الكلمات المتشابهة بغض النظر عن كون الحرف كبيراً أو صغيراً.',
      },
      {
        question: 'هل تعالج الأداة تقطع السطور الناتج عن النسخ من ملفات PDF؟',
        answer: 'نعم! تدمج الأداة السطور المتقطعة داخل الفقرة الواحدة مع الإبقاء على الفواصل الحقيقية بين الفقرات المستقلة.',
      },
      {
        question: 'ما هو الحد الأقصى للنصوص التي يمكن تنظيفها دفعة واحدة؟',
        answer: 'تستطيع الأداة معالجة عشرات الآلاف من الأسطر ومئات آلاف الكلمات في أجزاء من الثانية.',
      },
      {
        question: 'هل يتم تخزين أي نصوص أو معلومات يتم لصقها في الأداة؟',
        answer: 'أبداً. لا يتم حفظ أو نقل أي نص، وتبقى بياناتك في ذاكرة جهازك المؤقتة حتى تغلق الصفحة.',
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
