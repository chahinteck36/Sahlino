export interface ToolStep {
  step: number;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
}

export interface ToolExample {
  title: string;
  titleAr: string;
  scenario: string;
  scenarioAr: string;
  input: string;
  inputAr: string;
  output: string;
  outputAr: string;
  explanation?: string;
  explanationAr?: string;
}

export interface ToolGuideItem {
  toolSlug: string;
  howToUseTitle?: string;
  howToUseTitleAr?: string;
  steps: ToolStep[];
  howItWorksTitle?: string;
  howItWorksTitleAr?: string;
  howItWorksText: string;
  howItWorksTextAr: string;
  howItWorksHighlights?: { title: string; titleAr: string; desc: string; descAr: string }[];
  examplesTitle?: string;
  examplesTitleAr?: string;
  examples?: ToolExample[];
  importantNotesTitle?: string;
  importantNotesTitleAr?: string;
  importantNotes?: { title: string; titleAr: string; desc: string; descAr: string }[];
}

export const TOOL_GUIDES: Record<string, ToolGuideItem> = {
  'image-converter': {
    toolSlug: 'image-converter',
    howToUseTitle: 'How to Convert Image Formats Online',
    howToUseTitleAr: 'كيفية تحويل صيغ الصور أونلاين',
    steps: [
      {
        step: 1,
        title: 'Upload Source Image',
        titleAr: 'رفع الصورة الأصلية',
        desc: 'Select or drag any JPG, PNG, WebP, or GIF image from your computer or phone.',
        descAr: 'اختر أو اسحب أي صورة بصيغة JPG أو PNG أو WebP أو GIF من جهازك.',
      },
      {
        step: 2,
        title: 'Choose Target Format',
        titleAr: 'اختيار الصيغة المستهدفة',
        desc: 'Select WebP for modern web performance, PNG for transparent graphics, or JPG for photographs.',
        descAr: 'اختر WebP لأفضل سرعة للمواقع، أو PNG للرسومات الشفافة، أو JPG للصور الفوتوغرافية.',
      },
      {
        step: 3,
        title: 'Adjust Quality Slider',
        titleAr: 'ضبط شريط جودة الضغط',
        desc: 'Fine-tune image compression quality between 30% and 100% to optimize balance between size and clarity.',
        descAr: 'اضبط جودة الضغط بين 30% و 100% لتحقيق التوازن المثالي بين حجم الملف والوضوح.',
      },
      {
        step: 4,
        title: 'Convert & Download',
        titleAr: 'التحويل والتحميل الفوري',
        desc: 'Click "Convert Now" to process the image locally and download your converted file immediately.',
        descAr: 'انقر على "تحويل الآن" لتتم المعالجة فورياً وتحميل ملف الصورة المحول مباشرة.',
      },
    ],
    howItWorksTitle: 'How In-Browser Image Conversion Works',
    howItWorksTitleAr: 'كيف تعمل تقنية تحويل الصور داخل المتصفح',
    howItWorksText:
      'Sahlino decodes your image into an in-memory HTML5 Canvas element. The browser graphics pipeline re-encodes raw pixel data into the target container format using native WebP, JPEG, or PNG encoders without sending a single byte to external servers.',
    howItWorksTextAr:
      'تعتمد ساهلينو على فك تشفير الصورة داخل عنصر HTML5 Canvas في ذاكرة المتصفح. يقوم محرك الرسوميات بإعادة ترميز مصفوفة البكسلات الخام إلى الصيغة المستهدفة باستخدام برامج الترميز الأصلية دون إرسال أي بايت لخوادم خارجية.',
    howItWorksHighlights: [
      {
        title: 'Next-Gen WebP Compression',
        titleAr: 'ضغط WebP عالي الكفاءة',
        desc: 'WebP reduces image file sizes by 25–34% compared to JPEG while preserving equivalent visual quality.',
        descAr: 'توفر صيغة WebP تقليصاً لحجم الملف بنسبة 25-34% مقارنة بـ JPEG مع الحفاظ على نفس جودة المشاهدة.',
      },
      {
        title: 'Canvas Re-sampling',
        titleAr: 'إعادة أخذ عينات البكسل',
        desc: 'Bilinear and bicubic pixel interpolation ensures smooth edges and crisp details during conversion.',
        descAr: 'تضمن خوارزميات الاستيفاء الثنائي الحفاظ على حواف ناعمة وتفاصيل حادة أثناء التحويل.',
      },
      {
        title: 'Zero Server Latency',
        titleAr: 'أمان وسرعة فورية',
        desc: 'No uploading queues or bandwidth consumption. Conversion runs at the full speed of your local device CPU/GPU.',
        descAr: 'بدون فترات انتظار للرفع أو استهلاك لبيانات الإنترنت، تتم المعالجة بسرعة معالج جهازك مباشرة.',
      },
    ],
    examples: [
      {
        title: 'Optimizing Heavy PNG to Modern WebP',
        titleAr: 'تحسين صورة PNG ثقيلة إلى WebP للمواقع',
        scenario: 'A web designer converting a 4.2 MB hero banner PNG to fast-loading WebP format.',
        scenarioAr: 'مصمم مواقع يريد تحويل صورة غلاف PNG بحجم 4.2 ميجابايت إلى WebP للتحميل السريع.',
        input: 'Hero-Banner.png (4.2 MB, 1920×1080)',
        inputAr: 'Hero-Banner.png (4.2 ميجابايت، أبعاد 1920×1080)',
        output: 'Hero-Banner.webp (420 KB at 85% quality)',
        outputAr: 'Hero-Banner.webp (420 كيلوبايت بجودة 85%)',
        explanation: 'Achieves a 90% size reduction with imperceptible loss in visual clarity, boosting Google PageSpeed scores.',
        explanationAr: 'تحقيق توفير بنسبة 90% في الحجم دون أي تراجع ملحوظ في نقاء الصورة مما يرفع سرعة الموقع.',
      },
      {
        title: 'Converting WebP to Universal JPG for Printing',
        titleAr: 'تحويل WebP إلى JPG للطباعة والمستندات',
        scenario: 'A student downloading web photos to insert into Microsoft Word or print on paper.',
        scenarioAr: 'طالب يحتاج إدراج صور من الإنترنت في مستند Word أو طباعتها على ورق.',
        input: 'diagram.webp (220 KB)',
        inputAr: 'diagram.webp (220 كيلوبايت)',
        output: 'diagram.jpg (310 KB, solid white background)',
        outputAr: 'diagram.jpg (310 كيلوبايت مع خلفية بيضاء نقية)',
        explanation: 'JPG ensures 100% compatibility across legacy photo viewers, Word documents, and home printers.',
        explanationAr: 'تضمن صيغة JPG توافقاً شاملاً مع كافة برامج المستندات والطباعة المنزلية والتطبيقات القديمة.',
      },
    ],
    importantNotes: [
      {
        title: 'Transparency Note',
        titleAr: 'ملاحظة الشفافية (Alpha Channel)',
        desc: 'JPEG does not support transparent backgrounds. Transparent areas will automatically be filled with white when converting to JPEG.',
        descAr: 'صيغة JPEG لا تدعم خلفيات الشفافية، وسيتم استبدال المساحات الشفافة بخلفية بيضاء نقية تلقائياً.',
      },
      {
        title: 'Quality Trade-off',
        titleAr: 'توازن الجودة والحجم',
        desc: 'For web publishing, an 80% to 85% quality setting provides the sweet spot between compression and sharpness.',
        descAr: 'لنشر الصور على الويب، تعد نسبة جودة بين 80% و 85% أفضل توازن بين سرعة التحميل والوضوح.',
      },
    ],
  },

  'image-cropper': {
    toolSlug: 'image-cropper',
    howToUseTitle: 'How to Crop Photos with Custom Aspect Ratios',
    howToUseTitleAr: 'طريقة قص الصور بنسب أبعاد مخصصة',
    steps: [
      {
        step: 1,
        title: 'Load Photo',
        titleAr: 'رفع الصورة المراد قصها',
        desc: 'Upload any image from your computer, tablet, or smartphone.',
        descAr: 'قم باختيار أو سحب أي صورة من هاتفك أو حاسوبك.',
      },
      {
        step: 2,
        title: 'Select Aspect Ratio',
        titleAr: 'اختيار نسبة الأبعاد (Aspect Ratio)',
        desc: 'Choose 1:1 Square (Avatar), 16:9 Landscape (YouTube/Header), 4:3 Standard, or Freeform.',
        descAr: 'اختر 1:1 مربع للصور الشخصية، 16:9 عريض للفيديو والبانر، 4:3 أو قص حر.',
      },
      {
        step: 3,
        title: 'Adjust Position & Crop Box',
        titleAr: 'ضبط إطار وموضع القص',
        desc: 'Drag the sliders or frame to center your focal point accurately.',
        descAr: 'حرّك الإطار لضبط مركز الصورة وتحديد الجزء الذي ترغب في الاحتفاظ به.',
      },
      {
        step: 4,
        title: 'Apply Crop & Download',
        titleAr: 'تطبيق القص والتحميل',
        desc: 'Click "Apply & Preview Crop" then download the cropped photo in crisp PNG format.',
        descAr: 'اضغط على "تطبيق القص والمعاينة" ثم حمل الصورة المقصوصة بصيغة PNG عالية الجودة.',
      },
    ],
    howItWorksTitle: 'Precision Pixel Cropping via HTML5 Canvas',
    howItWorksTitleAr: 'آلية القص الدقيق للبكسلات عبر محرك Canvas',
    howItWorksText:
      'The tool computes the normalized coordinates of your selection rectangle against the image natural resolution. The `drawImage` context method extracts only the selected pixel matrix directly to a new canvas buffer, preserving crisp 1:1 pixel fidelity.',
    howItWorksTextAr:
      'تقوم الأداة بحساب الإحداثيات الدقيقة لمربع التحديد ومقارنتها بالأبعاد الأصلية للصورة. يقوم المتصفح باستخراج مصفوفة البكسلات المحددة فقط وتصديرها مباشرة دون أي تشويه أو فقدان في الدقة.',
    howItWorksHighlights: [
      {
        title: 'Preserves Natural Resolution',
        titleAr: 'الحفاظ على دقة البكسل الأصلية',
        desc: 'Cropping extracts the original uncompressed pixels without downscaling or blurring.',
        descAr: 'يقوم القص باستخراج البكسلات الأصلية دون تصغير صناعي أو تشويش.',
      },
      {
        title: 'Social Media Presets',
        titleAr: 'مقاسات قياسية لشبكات التواصل',
        desc: 'Standardized ratios match Instagram profile pictures, LinkedIn banners, and Twitter headers.',
        descAr: 'نسب أبعاد متوافقة مع متطلبات صور الملف الشخصي والأغلفة على مختلف المنصات.',
      },
    ],
    examples: [
      {
        title: 'Creating a Square Profile Picture',
        titleAr: 'إنشاء صورة ملف شخصي مربعة (1:1)',
        scenario: 'A user needing a perfectly centered square profile avatar for WhatsApp or LinkedIn.',
        scenarioAr: 'مستخدم يحتاج صورة شخصية مربعة ومتناسقة لملفه على واتساب أو لينكد إن.',
        input: 'portrait-photo.jpg (3000×4000)',
        inputAr: 'portrait-photo.jpg (3000×4000)',
        output: 'avatar.png (3000×3000 cropped squarely on face)',
        outputAr: 'avatar.png (3000×3000 مقصوصة بدقة على الوجه)',
        explanation: 'Eliminates distracting backgrounds and ensures the headshot displays cleanly in circular avatars.',
        explanationAr: 'تستبعد الخلفيات المشتتة وتضمن ظهور الوجه بوضوح تام داخل الإطارات الدائرية.',
      },
    ],
    importantNotes: [
      {
        title: 'Lossless Crop',
        titleAr: 'قص بدون فقدان تفاصيل',
        desc: 'Cropped photos are exported as PNG to maintain alpha transparency and avoid re-compression artifacts.',
        descAr: 'يتم تصدير الصورة بصيغة PNG للحفاظ على الشفافية وتجنب ظهور تشوهات الضغط المتكرر.',
      },
    ],
  },

  'image-rotate': {
    toolSlug: 'image-rotate',
    howToUseTitle: 'How to Rotate and Flip Photos Online',
    howToUseTitleAr: 'طريقة تدوير وقلب الصور أونلاين',
    steps: [
      {
        step: 1,
        title: 'Upload Image',
        titleAr: 'رفع الصورة',
        desc: 'Drag and drop any picture that was taken in the wrong orientation.',
        descAr: 'اسحب وأفلت أي صورة التُقطت بالوضع المقلوب أو الخاطئ.',
      },
      {
        step: 2,
        title: 'Choose Rotation or Flip',
        titleAr: 'اختيار زاوية التدوير أو الانعكاس',
        desc: 'Rotate 90° Clockwise, 90° Counter-clockwise, 180°, or flip horizontally/vertically.',
        descAr: 'قم بالتدوير بزاوية 90 درجة يميناً أو يساراً، 180 درجة، أو اعكس الصورة أفقياً أو عمودياً.',
      },
      {
        step: 3,
        title: 'Instant Preview',
        titleAr: 'معاينة النتيجة فورياً',
        desc: 'Inspect the transformed image preview in real time.',
        descAr: 'شاهد معاينة الصورة بعد التدوير والانعكاس مباشرة في الشاشة.',
      },
      {
        step: 4,
        title: 'Download Corrected Photo',
        titleAr: 'تحميل الصورة المصححة',
        desc: 'Save the rotated photo with its new permanent orientation applied to the file.',
        descAr: 'احفظ الصورة الجديدة مع تطبيق اتجاهها الصحيح بشكل دائم داخل ملف الصورة.',
      },
    ],
    howItWorksTitle: 'Geometric Matrix Transformation',
    howItWorksTitleAr: 'التحويل الهندسي لمصفوفة بكسلات الصورة',
    howItWorksText:
      'Smartphone cameras sometimes store orientation tags in EXIF metadata that fail to display correctly on older software. Sahlino swaps the canvas width and height dimensions and physically transposes the underlying pixel matrix so the corrected orientation is permanently encoded in the image data.',
    howItWorksTextAr:
      'في بعض الأحيان تخزن كاميرات الهواتف الاتجاه في بيانات EXIF والتي قد لا تقرأها بعض البرامج. تقوم أداة ساهلينو بتبديل أبعاد الارتفاع والعرض فعلياً وإعادة رسم مصفوفة البكسلات بحيث يصبح الاتجاه الجديد ثابتاً ودائماً في الملف.',
    howItWorksHighlights: [
      {
        title: 'Permanent Orientation Fix',
        titleAr: 'تصحيح دائم للاتجاه',
        desc: 'Fixes sideways photos permanently so they open correctly in all viewers, websites, and emails.',
        descAr: 'تثبيت اتجاه الصورة بشكل نهائي لتعمل بشكل صحيح في كافة المواقع وبرامج البريد.',
      },
    ],
    examples: [
      {
        title: 'Fixing Sideways Mobile Photo',
        titleAr: 'تصحيح صورة هاتف التقطت بالعرض',
        scenario: 'A photo taken in vertical portrait mode uploaded sideways to a job application portal.',
        scenarioAr: 'صورة وثيقة التُقطت بالهاتف وظهرت مقلوبة على جنب عند رفعها لموقع توظيف.',
        input: 'Document-sideways.jpg (Rotate 90° Right)',
        inputAr: 'وثيقة-مقلوبة.jpg (تدوير 90 درجة لليمين)',
        output: 'Document-corrected.jpg (Upright portrait orientation)',
        outputAr: 'وثيقة-مصححة.jpg (وضع رأسي سليم تماماً)',
        explanation: 'Enables official portal reviewers to read the document easily without tilting their monitors.',
        explanationAr: 'يتيح للجهات المراجعة قراءة المستند بسهولة دون الحاجة لتدوير الشاشة.',
      },
    ],
    importantNotes: [
      {
        title: 'Dimension Swapping',
        titleAr: 'تبديل الأبعاد عند التدوير بـ 90 درجة',
        desc: 'Rotating 90° or 270° swaps the width and height of your image automatically.',
        descAr: 'تدوير الصورة بزاوية 90 أو 270 درجة يقوم بتبديل العرض والارتفاع تلقائياً ليناسب الاتجاه الجديد.',
      },
    ],
  },

  'images-to-pdf': {
    toolSlug: 'images-to-pdf',
    howToUseTitle: 'How to Convert and Merge Images into a Single PDF',
    howToUseTitleAr: 'طريقة دمج وتحويل الصور إلى ملف PDF واحد',
    steps: [
      {
        step: 1,
        title: 'Select Multiple Photos',
        titleAr: 'اختيار مجموعة صور',
        desc: 'Select or drag multiple JPG, PNG, or WebP images into the upload area.',
        descAr: 'قم بتحديد وسحب مجموعة صور (JPG, PNG, WebP) إلى صندوق الرفع.',
      },
      {
        step: 2,
        title: 'Arrange Page Sequence',
        titleAr: 'ترتيب تسلسل الصفحات',
        desc: 'Review the thumbnails and reorder or remove unwanted images.',
        descAr: 'راجع الصور المصغرة وقم بترتيب تسلسلها كما ترغب أن تظهر كصفحات في ملف PDF.',
      },
      {
        step: 3,
        title: 'Set Page Orientation',
        titleAr: 'تحديد اتجاه الصفحات',
        desc: 'Choose Portrait orientation for documents or Landscape orientation for wide charts.',
        descAr: 'اختر الوضع الرأسي (Portrait) للمستندات أو العرضي (Landscape) للرسوم والجداول العريضة.',
      },
      {
        step: 4,
        title: 'Generate PDF Document',
        titleAr: 'توليد ملف PDF وتحميله',
        desc: 'Click "Convert Images to PDF Now" to build and download your assembled document.',
        descAr: 'انقر على "تحويل الصور إلى PDF الآن" ليتم تجميع الملف وتحميله فوراً.',
      },
    ],
    howItWorksTitle: 'Client-Side PDF Compilation',
    howItWorksTitleAr: 'تجميع صفحات PDF داخل المتصفح بأعلى دقة',
    howItWorksText:
      'Using the jsPDF vector generation library, Sahlino compiles your image data into standard A4 PDF pages. Images are scaled with high-density DPI calculation to fit document margins cleanly without pixel blurring or aspect ratio distortion.',
    howItWorksTextAr:
      'باستخدام مكتبة توليد ملفات PDF المتطورة، تقوم ساهلينو بإنشاء صفحات A4 معيارية وإدراج الصور بدقة نقطية عالية (DPI) مع ضبط الهوامش تلقائياً دون أي تشويه في أبعاد الصورة أو ضغط جودتها.',
    howItWorksHighlights: [
      {
        title: 'Standard A4 Proportions',
        titleAr: 'أبعاد معيارية للطباعة (A4)',
        desc: 'Pages conform to international standard document printing dimensions with clean margins.',
        descAr: 'صفحات مطابقة لمقاسات الطباعة المكتبية القياسية A4 مع هوامش متناسقة.',
      },
      {
        title: 'Multi-Image Batch Handling',
        titleAr: 'معالجة دفعات متعددة من الصور',
        desc: 'Combine invoices, ID card scans, and study notes into a cohesive PDF booklet.',
        descAr: 'دمج الفواتير، صور بطاقات الهوية، ودفاتر المحاضرات في ملف منظم واحد.',
      },
    ],
    examples: [
      {
        title: 'Submitting Scanned Documents for Official Applications',
        titleAr: 'تجميع إيصالات وأوراق رسمية لمعاملة حكومية',
        scenario: 'Combining 4 photos of receipts and passport pages into one single PDF file.',
        scenarioAr: 'دمج 4 صور لإيصالات ورقية وجواز السفر في ملف PDF واحد لإرساله لجهة رسمية.',
        input: 'Page1.jpg, Page2.jpg, Page3.png, Page4.jpg',
        inputAr: 'صفحة1.jpg، صفحة2.jpg، صفحة3.png، صفحة4.jpg',
        output: 'Application-Documents.pdf (Single unified document)',
        outputAr: 'Application-Documents.pdf (مستند موحد عالي الدقة)',
        explanation: 'Replaces multiple scattered image attachments with one professional, easily archivable PDF.',
        explanationAr: 'يستبدل المرفقات المتفرقة بملف PDF منظم يسهل إرساله عبر البريد أو بوابات التقديم.',
      },
    ],
    importantNotes: [
      {
        title: 'Print Quality',
        titleAr: 'دقة الطباعة وجودة المستند',
        desc: 'High-resolution images will produce crisp, readable text when printed on paper.',
        descAr: 'الصور الأصلية عالية الدقة تضمن وضوح وقراءة النصوص والأختام بدقة تامة عند الطباعة.',
      },
    ],
  },

  'pdf-merge': {
    toolSlug: 'pdf-merge',
    howToUseTitle: 'How to Combine Multiple PDF Files Online',
    howToUseTitleAr: 'طريقة دمج عدة ملفات PDF أونلاين',
    steps: [
      {
        step: 1,
        title: 'Upload PDF Files',
        titleAr: 'اختيار ملفات PDF',
        desc: 'Select two or more PDF documents from your device.',
        descAr: 'اختر ملفين أو أكثر من ملفات PDF الموجودة على جهازك.',
      },
      {
        step: 2,
        title: 'Reorder Documents',
        titleAr: 'ترتيب الملفات بالترتيب المطلوب',
        desc: 'Use the arrow controls to set the exact order you want the documents to appear.',
        descAr: 'استخدم أسهم الترتيب لتحديد تسلسل الملفات حسب الترتيب الذي ترغب به في المستند المدمج.',
      },
      {
        step: 3,
        title: 'Merge PDF',
        titleAr: 'دمج المستندات فورياً',
        desc: 'Click "Merge PDFs Now" to combine all pages into a unified document stream.',
        descAr: 'اضغط على "دمج ملفات PDF الآن" ليتم تجميع كافة الصفحات في ملف واحد.',
      },
      {
        step: 4,
        title: 'Download Unified PDF',
        titleAr: 'تحميل الملف النهائي',
        desc: 'Save the assembled PDF document directly to your local file system.',
        descAr: 'احفظ المستند المدمج النهائي على جهازك بنقرة واحدة.',
      },
    ],
    howItWorksTitle: 'Non-Destructive PDF Stream Concatenation',
    howItWorksTitleAr: 'دمج مجرى الصفحات بدون إعادة ضغط أو فقدان جودة',
    howItWorksText:
      'Powered by PDF-Lib, Sahlino parses the internal Cross-Reference Table (XRef) and page object trees of each document. Pages, embedded font dictionaries, vector paths, and raster figures are merged cleanly into a new catalog tree without rasterization or quality degradation.',
    howItWorksTextAr:
      'باستخدام محرك PDF-Lib المتقدم، تقرأ الأداة جداول المراجع وأشجار كائنات الصفحات لكل ملف. يتم دمج الصفحات والخطوط المضمنة والمسارات المتجهة في فهرس موحد دون تحويلها لصور ودون أي فقدان في نقاء النصوص.',
    howItWorksHighlights: [
      {
        title: 'Vector & Text Fidelity',
        titleAr: 'الحفاظ الكامل على النصوص والخطوط',
        desc: 'Searchable text, embedded fonts, and vector illustrations remain 100% intact.',
        descAr: 'تظل النصوص قابلة للتحديد والبحث، وتظل الخطوط المضمنة والرسومات بدقتها الكاملة.',
      },
      {
        title: '100% In-Browser Security',
        titleAr: 'خصوصية تامة 100% داخل المتصفح',
        desc: 'Confidential contracts, legal filings, and financial statements never touch a remote server.',
        descAr: 'العقود السرية، والملفات القانونية، والقوائم المالية لا تخرج من جهازك أبداً.',
      },
    ],
    examples: [
      {
        title: 'Merging Contract Sections into One File',
        titleAr: 'دمج بنود العقد والملاحق في ملف واحد',
        scenario: 'A freelance developer assembling a proposal, statement of work, and contract terms.',
        scenarioAr: 'مستقل يريد دمج ملف العرض الفني وملف الشروط وملحق الأسعار في ملف رسمي موحد.',
        input: 'Proposal.pdf (3 pages) + SOW.pdf (5 pages) + Terms.pdf (2 pages)',
        inputAr: 'العرض_الفني.pdf (3 صفحات) + نطاق_العمل.pdf (5 صفحات) + الشروط.pdf (صفحتان)',
        output: 'Complete-Contract.pdf (10 pages total in order)',
        outputAr: 'العقد_الكامل.pdf (10 صفحات مدمجة بالترتيب الدقيق)',
        explanation: 'Creates a single clean PDF packet ready for digital signing and client presentation.',
        explanationAr: 'يمنحك ملفاً أنيقاً وموحداً جاهزاً للمشاركة والتوقيع الرقمي دون تشتيت العميل.',
      },
    ],
    importantNotes: [
      {
        title: 'Encrypted PDFs',
        titleAr: 'ملفات PDF المحمية بكلمة مرور',
        desc: 'Password-protected PDFs must be unlocked before merging.',
        descAr: 'إذا كان أحد الملفات مشفراً بكلمة مرور، يجب إزالة الحماية منه أولاً قبل التمكن من دمجه.',
      },
    ],
  },

  'pdf-split': {
    toolSlug: 'pdf-split',
    howToUseTitle: 'How to Split PDF Pages and Extract Chapters',
    howToUseTitleAr: 'طريقة تقسيم صفحات PDF واستخراج أجزاء محددة',
    steps: [
      {
        step: 1,
        title: 'Upload PDF Document',
        titleAr: 'رفع مستند PDF',
        desc: 'Select the large PDF file you want to split or extract pages from.',
        descAr: 'اختر ملف الـ PDF الكبير الذي ترغب في استخراج صفحات منه أو تقسيمه.',
      },
      {
        step: 2,
        title: 'Specify Page Range',
        titleAr: 'تحديد نطاق الصفحات المراد استخراجها',
        desc: 'Enter page ranges like "1-5", specific numbers like "2, 4, 7", or split into single pages.',
        descAr: 'أدخل نطاقاً مثل "1-5" أو صفحات محددة مثل "2, 4, 7" أو استخراج كل صفحة منفردة.',
      },
      {
        step: 3,
        title: 'Extract Pages',
        titleAr: 'استخراج الصفحات فورياً',
        desc: 'Click the extract button to create new targeted PDF documents in seconds.',
        descAr: 'اضغط على زر الاستخراج لإنشاء مستند PDF جديد بالصفحات المختارة فقط.',
      },
      {
        step: 4,
        title: 'Download New Document',
        titleAr: 'تحميل الملف المستخرج',
        desc: 'Save your customized lightweight PDF document.',
        descAr: 'قم بتحميل الملف الجديد الصغير الحجم والمناسب لاحتياجك.',
      },
    ],
    howItWorksTitle: 'Targeted Object Tree Extraction',
    howItWorksTitleAr: 'آلية استخراج فروع الصفحات من بنية المستند',
    howItWorksText:
      'Sahlino clones only the designated page dictionary objects from the PDF tree and references only the necessary font and image assets, keeping the extracted document compact and ultra-fast to open.',
    howItWorksTextAr:
      'تقوم الأداة بنسخ كائنات الصفحات المحددة فقط من هيكل المستند الأصلي وربط الخطوط والصور التابعة لها حصراً، مما يجعل الملف المستخرج خفيف الحجم وسريع الفتح.',
    examples: [
      {
        title: 'Extracting One Chapter from a Book',
        titleAr: 'استخراج فصل محدد من كتاب إلكتروني',
        scenario: 'A student extracting pages 45 to 60 from a 400-page textbook PDF.',
        scenarioAr: 'طالب يريد استخراج الصفحات من 45 إلى 60 من كتاب ضخم يحتوي على 400 صفحة.',
        input: 'Textbook.pdf (400 pages, 95 MB) with range: 45-60',
        inputAr: 'كتاب-دراسي.pdf (400 صفحة، 95 ميجابايت) بنطاق: 45-60',
        output: 'Chapter-3.pdf (16 pages, 3.4 MB)',
        outputAr: 'فصل-3.pdf (16 صفحة، بحجم 3.4 ميجابايت فقط)',
        explanation: 'Enables quick sharing via email and easy reading on mobile without lagging large PDF readers.',
        explanationAr: 'يسهل إرسال الفصل المطلوب عبر البريد أو قراءته على الهاتف دون ثقل الملف الأصلي.',
      },
    ],
  },

  'json-formatter': {
    toolSlug: 'json-formatter',
    howToUseTitle: 'How to Format, Validate, and Minify JSON',
    howToUseTitleAr: 'طريقة تنسيق والتحقق من صحة وضغط بيانات JSON',
    steps: [
      {
        step: 1,
        title: 'Paste Raw JSON',
        titleAr: 'لصق بيانات JSON الخام',
        desc: 'Paste minified, unformatted, or corrupted JSON data into the editor.',
        descAr: 'الصق كود JSON المضغوط أو المبعثر داخل محرر النصوص.',
      },
      {
        step: 2,
        title: 'Validate Syntax',
        titleAr: 'فحص واكتشاف أخطاء الصياغة',
        desc: 'The tool checks compliance with strict RFC 8259 syntax in real time.',
        descAr: 'تقوم الأداة فورياً بفحص سلامة الكود وفقاً للمعيار القياسي العالمي RFC 8259.',
      },
      {
        step: 3,
        title: 'Beautify or Minify',
        titleAr: 'تنسيق جمالي أو ضغط سطر واحد',
        desc: 'Choose 2-space or 4-space indentation for readability, or Minify to remove whitespace for production APIs.',
        descAr: 'اختر مسافتين أو 4 مسافات للمسافة البادئة لسهولة القراءة، أو اضغط على Minify لحذف الفراغات للإنتاج.',
      },
      {
        step: 4,
        title: 'Copy or Download',
        titleAr: 'نسخ الكود أو تحميل ملف .json',
        desc: 'Copy the result to your clipboard or download as a .json file.',
        descAr: 'انسخ النتيجة بضغطة زر أو حملها مباشرة كملف .json على جهازك.',
      },
    ],
    howItWorksTitle: 'Strict RFC 8259 Grammar Parsing',
    howItWorksTitleAr: 'التحليل النحوي الدقيق لمعيار RFC 8259',
    howItWorksText:
      'Sahlino parses JSON tokens into an Abstract Syntax Tree (AST). If parsing fails, lexical error tokenizers isolate the precise character index, line number, and column offset to guide you directly to the missing comma, unescaped quote, or bracket mismatch.',
    howItWorksTextAr:
      'يتم تحليل رموز JSON إلى شجرة نحوية مجردة (AST). وفي حال وجود خطأ في الصياغة، يقوم المحلل بتحديد رقم السطر والعمود بدقة متناهية وإرشادك لمكان الفاصلة المفقودة أو القوس غير المغلق.',
    examples: [
      {
        title: 'Beautifying Minified API Response',
        titleAr: 'تنسيق استجابة API مضغوطة في سطر واحد',
        scenario: 'A developer debugging a single-line 50KB API payload from a payment gateway.',
        scenarioAr: 'مطور يفحص بيانات استجابة بوابة دفع معقدة ومضغوطة في سطر واحد طويل.',
        input: '{"status":"ok","code":200,"data":{"orderId":"ORD-98","items":[{"id":1,"qty":2}]}}',
        inputAr: '{"status":"ok","code":200,"data":{"orderId":"ORD-98","items":[{"id":1,"qty":2}]}}',
        output: 'Clean indented JSON hierarchy with collapsible arrays and objects.',
        outputAr: 'بيانات منسقة هرمياً بمسافات بادئة واضحة تسهل القراءة واكتشاف الحقول.',
        explanation: 'Transforms illegible single-line strings into cleanly organized data trees.',
        explanationAr: 'يحول السطور الطويلة وغير المقروءة إلى هيكل بيانات منظم يسهل تصحيح الأخطاء فيه.',
      },
    ],
    importantNotes: [
      {
        title: 'Trailing Commas',
        titleAr: 'الفواصل الزائدة (Trailing Commas)',
        desc: 'Standard JSON does not allow trailing commas after the final key in an object or array.',
        descAr: 'المعيار القياسي لـ JSON لا يسمح بوجود فاصلة بعد العنصر الأخير في المصفوفة أو الكائن.',
      },
    ],
  },

  'word-counter': {
    toolSlug: 'word-counter',
    howToUseTitle: 'How to Count Words, Characters, and Reading Time',
    howToUseTitleAr: 'طريقة حساب الكلمات والحروف وزمن القراءة',
    steps: [
      {
        step: 1,
        title: 'Enter or Paste Text',
        titleAr: 'كتابة أو لصق النص',
        desc: 'Type directly or paste your article, essay, or social media caption.',
        descAr: 'اكتب مباشرة أو الصق مقالك، بحثك، أو منشورك في مربع النص.',
      },
      {
        step: 2,
        title: 'Inspect Live Counters',
        titleAr: 'متابعة العدادات الفورية',
        desc: 'View real-time tallies for total words, characters with spaces, and characters without spaces.',
        descAr: 'شاهد فورياً إجمالي عدد الكلمات، والحروف مع المسافات، والحروف بدون مسافات.',
      },
      {
        step: 3,
        title: 'Review Reading & Speaking Time',
        titleAr: 'الاطلاع على زمن القراءة والإلقاء',
        desc: 'Estimate audience reading duration based on standard 200 words-per-minute comprehension rates.',
        descAr: 'تقدير الوقت المستغرق لقراءة النص أو إلقائه بناءً على المعدل القياسي (200 كلمة/دقيقة).',
      },
    ],
    howItWorksTitle: 'Unicode Regex Tokenization',
    howItWorksTitleAr: 'التحليل المعجمي وتجزئة النصوص بنظام يونيكود',
    howItWorksText:
      'The counter utilizes Unicode-aware regular expressions (`\\p{L}+`) to ensure accurate tokenization across both Latin scripts and Arabic letters with diacritics (Tashkeel). It counts whitespace boundaries accurately without duplicate tallies for multiple consecutive spaces.',
    howItWorksTextAr:
      'تعتمد الأداة على تعبيرات نمطية متوافقة مع معايير Unicode لحساب الكلمات بدقة سواء باللغة الإنجليزية أو العربية مع التشكيل، مع تجاهل الفراغات المزدوجة المتتالية لتفادي الحساب الخاطئ.',
    examples: [
      {
        title: 'Checking Social Media & SEO Title Limits',
        titleAr: 'ضبط حدود عناوين محركات البحث وشبكات التواصل',
        scenario: 'A copywriter crafting a Google SEO title tag under the strict 60-character limit.',
        scenarioAr: 'كاتب محتوى يريد التأكد من أن عنوان المقال لا يتجاوز 60 حرفاً ليظهر كاملاً في جوجل.',
        input: 'Best Free Productivity Tools for Remote Engineers (58 characters with spaces)',
        inputAr: 'أفضل أدوات الإنتاجية المجانية للمطورين (40 حرفاً مع المسافات)',
        output: 'Words: 8 | Characters: 58 | Clean SEO compliance',
        outputAr: 'الكلمات: 6 | الحروف: 40 | مطابق لمعايير محركات البحث',
        explanation: 'Prevents title truncation with ellipses (...) on search engine result pages.',
        explanationAr: 'يضمن ظهور العنوان كاملاً في نتائج البحث دون أن تقتطعه جوجل بنقاط (...)',
      },
    ],
  },

  'qr-code-generator': {
    toolSlug: 'qr-code-generator',
    howToUseTitle: 'How to Generate Custom QR Codes for Links & WiFi',
    howToUseTitleAr: 'طريقة إنشاء باركود QR مخصص للروابط وشبكات الواي فاي',
    steps: [
      {
        step: 1,
        title: 'Choose Payload Type',
        titleAr: 'اختيار نوع البيانات',
        desc: 'Select Web URL, Plain Text, WiFi Network Credentials, or Contact Card (vCard).',
        descAr: 'اختر رابط موقع ويب، نص عادي، بيانات شبكة واي فاي، أو بطاقة اتصال vCard.',
      },
      {
        step: 2,
        title: 'Enter Details',
        titleAr: 'إدخال البيانات',
        desc: 'Provide your website link, SSID name, WiFi password, or message text.',
        descAr: 'أدخل رابط موقعك، اسم شبكة الواي فاي وكلمة المرور، أو النص المراد ترميزه.',
      },
      {
        step: 3,
        title: 'Preview QR Matrix',
        titleAr: 'معاينة رمز QR فورياً',
        desc: 'Test scanning the high-contrast matrix directly on your screen with your smartphone camera.',
        descAr: 'اختبر مسح الرمز مباشرة من شاشتك عبر كاميرا الهاتف الذكي للتأكد من سهولة قراءته.',
      },
      {
        step: 4,
        title: 'Download High-Res Image',
        titleAr: 'تحميل الرمز بدقة عالية',
        desc: 'Download your crisp QR code image ready for print menus, flyers, business cards, or websites.',
        descAr: 'حمل الصورة بدقة عالية لتكون جاهزة للطباعة على الكروت الشخصية، القوائم، أو المنشورات.',
      },
    ],
    howItWorksTitle: 'Reed-Solomon 2D Matrix Encoding',
    howItWorksTitleAr: 'تشفير مصفوفة البكسل بنظام تصحيح الأخطاء ريد-سولومون',
    howItWorksText:
      'QR codes encode information into a grid of black and white modules. Sahlino incorporates standard Reed-Solomon error correction polynomials, allowing the code to be scanned reliably even if up to 15%–30% of the surface is smudged, torn, or partially obscured.',
    howItWorksTextAr:
      'يقوم رمز الاستجابة السريعة بترميز البيانات في مصفوفة ثنائية الأبعاد من النقاط. تطبق الأداة خوارزميات تصحيح الأخطاء Reed-Solomon التي تضمن قراءة الرمز بنجاح حتى لو تضررت أو انطمست أجزاء من الورقة المطبوعة بنسبة تصل إلى 30%.',
    examples: [
      {
        title: 'Instant Guest WiFi Connection QR',
        titleAr: 'رمز QR للاتصال الفوري بالواي فاي بدون كتابة كلمة السر',
        scenario: 'A café or office owner allowing customers to scan and connect instantly to guest WiFi.',
        scenarioAr: 'مقهى أو مكتب يتيح للزوار الاتصال التلقائي بالواي فاي بمجرد توجيه الكاميرا.',
        input: 'WIFI:S:OfficeGuest;T:WPA;P:SecretPass2025;;',
        inputAr: 'WIFI:S:شبكة-الضيوف;T:WPA;P:كلمة-السر;;',
        output: 'Standardized WiFi QR code that triggers auto-join prompts on iOS and Android.',
        outputAr: 'رمز باركود يفتح نافذة الاتصال التلقائي بالشبكة بلمسة واحدة دون كتابة يدوية.',
        explanation: 'Eliminates mistyped passwords and improves guest onboarding speed.',
        explanationAr: 'يمنع أخطاء كتابة كلمات المرور المعقدة ويسهل تجربة الزائرين.',
      },
    ],
  },

  'loan-calculator': {
    toolSlug: 'loan-calculator',
    howToUseTitle: 'How to Calculate Loan Payments, Interest & Amortization',
    howToUseTitleAr: 'طريقة حساب أقساط القروض والفوائد وجدول السداد',
    steps: [
      {
        step: 1,
        title: 'Enter Principal Amount',
        titleAr: 'إدخال مبلغ القرض الأساسي (الأصل)',
        desc: 'Input the total borrowed financing amount (e.g. $250,000 for a mortgage).',
        descAr: 'أدخل إجمالي المبلغ المقترض (مثلاً 100,000 ريال/دولار).',
      },
      {
        step: 2,
        title: 'Set Annual Interest Rate',
        titleAr: 'تحديد نسبة الفائدة السنوية',
        desc: 'Specify the nominal annual interest rate percentage (APR).',
        descAr: 'حدد النسبة المئوية للفائدة السنوية المتفق عليها مع البنك.',
      },
      {
        step: 3,
        title: 'Choose Loan Term',
        titleAr: 'تحديد مدة القرض بالسنوات أو الشهور',
        desc: 'Select repayment duration (e.g. 5 years for car, 25 years for home mortgage).',
        descAr: 'اختر مدة السداد (مثلاً 5 سنوات للسيارة، أو 20 سنة للتمويل العقاري).',
      },
      {
        step: 4,
        title: 'Review Monthly Payment & Total Cost',
        titleAr: 'الاطلاع على القسط الشهري وإجمالي الفوائد',
        desc: 'See the exact monthly installment, total interest paid over life of loan, and total repayment amount.',
        descAr: 'شاهد فورياً قيمة القسط الشهري الثابت، وإجمالي الفوائد، والمبلغ الإجمالي المسدد.',
      },
    ],
    howItWorksTitle: 'Standard Monthly Amortization Formula',
    howItWorksTitleAr: 'المعادلة الرياضية الرسمية لحساب القسط الشهري (Amortization)',
    howItWorksText:
      'The calculator executes the standard fixed-rate annuity amortization formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ], where P is principal, i is monthly interest (annual rate / 12), and n is total monthly payments. It accurately differentiates how each payment is split between principal reduction and bank interest.',
    howItWorksTextAr:
      'تطبق الأداة معادلة الأقساط البنكية الثابتة المعتمدة عالمياً: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]؛ حيث P أصل المبلغ، وi الفائدة الشهرية، وn عدد الأقساط. وتحسب الأداة توزيع كل قسط بين سداد أصل الدين والفوائد.',
    examples: [
      {
        title: 'Car Loan Calculation',
        titleAr: 'حساب قسط تمويل سيارة',
        scenario: 'Financing a $30,000 vehicle at 5.5% annual interest over a 5-year repayment plan.',
        scenarioAr: 'شراء سيارة بقيمة 30,000 دولار بفائدة 5.5% سنوية على مدار 5 سنوات (60 شهراً).',
        input: 'Principal: $30,000 | Rate: 5.5% | Term: 5 Years',
        inputAr: 'المبلغ: 30,000 | الفائدة: 5.5% | المدة: 5 سنوات',
        output: 'Monthly Installment: $573.12 | Total Interest: $4,387.20 | Total Cost: $34,387.20',
        outputAr: 'القسط الشهري: $573.12 | إجمالي الفوائد: $4,387.20 | إجمالي المدفوعات: $34,387.20',
        explanation: 'Gives the borrower exact budgeting insight before signing financing contracts.',
        explanationAr: 'يمنح المقترض رؤية مالية واضحة ودقيقة للتكلفة الحقيقية قبل توقيع العقد.',
      },
    ],
  },

  'bmi-calculator': {
    toolSlug: 'bmi-calculator',
    howToUseTitle: 'How to Calculate Your Body Mass Index (BMI)',
    howToUseTitleAr: 'طريقة حساب مؤشر كتلة الجسم (BMI)',
    steps: [
      {
        step: 1,
        title: 'Choose Unit System',
        titleAr: 'اختيار نظام القياس (متري أو إمبراطوري)',
        desc: 'Select Metric (kg / cm) or Imperial (lbs / inches).',
        descAr: 'اختر النظام المتري (كجم / سم) أو الإمبراطوري (رطل / بوصة).',
      },
      {
        step: 2,
        title: 'Enter Weight and Height',
        titleAr: 'إدخال الوزن والطول',
        desc: 'Provide your current body weight and height in the inputs.',
        descAr: 'أدخل وزنك الحالي وطولك بدقة في الخانات المخصصة.',
      },
      {
        step: 3,
        title: 'Inspect Weight Category',
        titleAr: 'معرفة تصنيف الوزن الصحي',
        desc: 'View your BMI score mapped against World Health Organization (WHO) clinical ranges.',
        descAr: 'اطلع على نتيجتك الرقمية وتصنيفها المعتمد لدى منظمة الصحة العالمية (وزن طبيعي، زيادة، نحافة).',
      },
    ],
    howItWorksTitle: 'WHO Clinical Body Mass Index Formula',
    howItWorksTitleAr: 'المعادلة الطبية لمؤشر كتلة الجسم وفق منظمة الصحة العالمية',
    howItWorksText:
      'BMI is computed as weight in kilograms divided by height in meters squared: BMI = weight (kg) / [height (m)]^2. Clinical thresholds categorize scores into Underweight (<18.5), Normal Healthy Weight (18.5–24.9), Overweight (25–29.9), and Obesity (≥30).',
    howItWorksTextAr:
      'يُحسب مؤشر كتلة الجسم بقسمة الوزن بالكيلوجرام على مربع الطول بالمتر: BMI = الوزن ÷ (الطول × الطول). وتصنف منظمة الصحة العالمية النتائج إلى: نحافة (أقل من 18.5)، وزن صحي طبيعي (18.5 - 24.9)، زيادة وزن (25 - 29.9)، وسمنة (30 فأعلى).',
    examples: [
      {
        title: 'Adult Healthy Weight Assessment',
        titleAr: 'تقييم وزن طبيعي لشخص بالغ',
        scenario: 'An adult male measuring 180 cm tall and weighing 75 kg checking health status.',
        scenarioAr: 'شخص بالغ طوله 180 سم ووزنه 75 كجم يريد معرفة مدى تناسق وزنه صحياً.',
        input: 'Weight: 75 kg | Height: 180 cm (1.80 m)',
        inputAr: 'الوزن: 75 كجم | الطول: 180 سم (1.80 م)',
        output: 'BMI: 23.15 kg/m² | Category: Normal Healthy Weight',
        outputAr: 'مؤشر كتلة الجسم: 23.15 | التصنيف: وزن صحي ومثالي',
        explanation: 'Falls squarely within the optimal 18.5–24.9 range, indicating lower statistical cardiovascular risk.',
        explanationAr: 'تقع النتيجة تماماً في النطاق الصحي المثالي مع انخفاض مخاطر الأمراض المرتبطة بالوزن.',
      },
    ],
  },

  'age-calculator': {
    toolSlug: 'age-calculator',
    howToUseTitle: 'How to Calculate Exact Chronological Age',
    howToUseTitleAr: 'طريقة حساب العمر الزمني الدقيق بالسنوات والشهور والأيام',
    steps: [
      {
        step: 1,
        title: 'Select Date of Birth',
        titleAr: 'تحديد تاريخ الميلاد',
        desc: 'Pick your year, month, and day of birth on the calendar picker.',
        descAr: 'اختر سنة وشهر ويوم ميلادك من محدد التقويم.',
      },
      {
        step: 2,
        title: 'Set Target Comparison Date',
        titleAr: 'تحديد التاريخ المستهدف',
        desc: 'Defaults to today, or choose a future/past date to calculate age on that specific milestone.',
        descAr: 'تلقائياً هو تاريخ اليوم، أو حدد تاريخاً مستقبلياً لمعرفة كم سيكون عمرك في ذلك الوقت.',
      },
      {
        step: 3,
        title: 'View Breakdown',
        titleAr: 'مشاهدة التفاصيل الدقيقة',
        desc: 'Get exact age in years, months, days, total weeks, hours lived, and days until next birthday.',
        descAr: 'احصل على العمر بالسنوات والشهور والأيام، وإجمالي الأسابيع والساعات، والأيام المتبقية لعيد ميلادك القادم.',
      },
    ],
    howItWorksTitle: 'Borrowing Algorithm with Leap Year Handling',
    howItWorksTitleAr: 'خوارزمية الاستعارة التقويمية وحساب السنوات الكبيسة',
    howItWorksText:
      'The calculation performs chronological borrowing across calendar boundaries. If target day is less than birth day, it borrows the exact number of days from the preceding month (accounting for 28, 29, 30, or 31 days including leap February) before subtracting months and years.',
    howItWorksTextAr:
      'تطبق الأداة خوارزمية الاستعارة التقويمية الدقيقة. إذا كان يوم التاريخ المستهدف أصغر من يوم الميلاد، تستعير الأداة عدد الأيام الفعلي للشهر السابق (28 أو 29 أو 30 أو 31 يوماً مع مراعاة السنوات الكبيسة بدقة) قبل حساب الشهور والسنوات.',
    examples: [
      {
        title: 'Exact Milestone Age Calculation',
        titleAr: 'حساب العمر الدقيق لمناسبة أو تسجيل رسمي',
        scenario: 'Determining exact age on January 1, 2026 for a person born on March 15, 1995.',
        scenarioAr: 'معرفة العمر الدقيق في 1 يناير 2026 لشخص مولود في 15 مارس 1995.',
        input: 'Birth Date: March 15, 1995 | Comparison Date: January 1, 2026',
        inputAr: 'تاريخ الميلاد: 15 مارس 1995 | تاريخ المقارنة: 1 يناير 2026',
        output: '30 Years, 9 Months, 17 Days | Total Days: 11,249',
        outputAr: '30 سنة و9 شهور و17 يوماً | إجمالي الأيام: 11,249 يوماً',
        explanation: 'Provides the exact official age needed for passport renewals, school admissions, or retirement forms.',
        explanationAr: 'يوفر العمر الرسمي المعتمد المطلوب في معاملات الجوازات أو التقديم المدرسي أو التقاعد.',
      },
    ],
  },

  'discount-calculator': {
    toolSlug: 'discount-calculator',
    howToUseTitle: 'How to Calculate Discounts, Savings & Sales Tax',
    howToUseTitleAr: 'طريقة حساب الخصم والتوفير وضريبة المبيعات',
    steps: [
      {
        step: 1,
        title: 'Enter Original Price',
        titleAr: 'إدخال السعر الأصلي للسلعة',
        desc: 'Input the item sticker price before any discounts or sales promotions.',
        descAr: 'أدخل سعر السلعة المعروض قبل الخصم.',
      },
      {
        step: 2,
        title: 'Enter Discount Percentage',
        titleAr: 'إدخال نسبة الخصم المئوية',
        desc: 'Specify the promotional discount rate (e.g. 20%, 35%, 50%).',
        descAr: 'حدد نسبة التخفيض (مثلاً 20% أو 30% أو 50%).',
      },
      {
        step: 3,
        title: 'Optionally Add Sales Tax / VAT',
        titleAr: 'إضافة ضريبة القيمة المضافة / المبيعات (اختياري)',
        desc: 'Input local sales tax percentage (e.g. 5%, 15%) to see the real out-of-pocket register total.',
        descAr: 'أدخل نسبة الضريبة (مثلاً 15% أو 5%) لحساب السعر النهائي بعد احتساب الضريبة.',
      },
      {
        step: 4,
        title: 'View Final Price & Money Saved',
        titleAr: 'معرفة السعر النهائي والمبلغ الموفر',
        desc: 'Review exactly how much money you save and the final amount you pay.',
        descAr: 'شاهد مقدار المبلغ الذي ستوفره بالتمام والسعر الصافي للدفع.',
      },
    ],
    howItWorksTitle: 'Discount & Tax Compounding Formula',
    howItWorksTitleAr: 'المعادلة الحسابية للخصم والضريبة المضافة',
    howItWorksText:
      'The savings amount is computed as: Savings = Original Price × (Discount Rate / 100). The discounted subtotal is: Subtotal = Original Price - Savings. If tax is enabled, Tax = Subtotal × (Tax Rate / 100), yielding Final Total = Subtotal + Tax.',
    howItWorksTextAr:
      'يُحسب مبلغ التوفير عبر: التوفير = السعر الأصلي × (نسبة الخصم ÷ 100). ويكون السعر المخفض = السعر الأصلي - التوفير. وإذا أضيفت الضريبة: الضريبة = السعر المخفض × (نسبة الضريبة ÷ 100)، ويكون السعر النهائي = السعر المخفض + الضريبة.',
    examples: [
      {
        title: 'Shopping Season Discount with VAT',
        titleAr: 'حساب تخفيضات التسوق مع ضريبة القيمة المضافة',
        scenario: 'A $120 jacket discounted by 30% with a 15% sales tax applied.',
        scenarioAr: 'معطف سعره 120 دولار عليه خصم 30% وتطبق عليه ضريبة 15%.',
        input: 'Price: $120 | Discount: 30% | Tax: 15%',
        inputAr: 'السعر: 120$ | الخصم: 30% | الضريبة: 15%',
        output: 'Savings: $36.00 | Subtotal: $84.00 | Tax: $12.60 | Final: $96.60',
        outputAr: 'التوفير: 36$ | السعر بعد الخصم: 84$ | الضريبة: 12.60$ | الإجمالي النهائي: 96.60$',
        explanation: 'Reveals true savings of $23.40 compared to original sticker price even after tax.',
        explanationAr: 'يوضح التوفير الحقيقي الصافي مقارنة بالسعر الأصلي حتى بعد إضافة الضريبة.',
      },
    ],
  },

  'text-cleaner': {
    toolSlug: 'text-cleaner',
    howToUseTitle: 'How to Clean Messy Text & Remove Duplicate Lines',
    howToUseTitleAr: 'طريقة تنظيف النصوص وحذف الأسطر المكررة والفراغات',
    steps: [
      {
        step: 1,
        title: 'Paste Text Data',
        titleAr: 'لصق النص أو القائمة',
        desc: 'Paste text copied from spreadsheets, PDFs, or scrape logs.',
        descAr: 'الصق النص المنسوخ من جداول البيانات أو ملفات PDF أو رسائل البريد.',
      },
      {
        step: 2,
        title: 'Toggle Cleaning Filters',
        titleAr: 'تفعيل خيارات التنظيف',
        desc: 'Choose to remove duplicate lines, strip trailing spaces, delete blank lines, or trim whitespace.',
        descAr: 'اختر حذف الأسطر المكررة، إزالة الفراغات الزائدة، أو حذف الأسطر الفارغة.',
      },
      {
        step: 3,
        title: 'Copy Cleaned Output',
        titleAr: 'نسخ النص المنظف',
        desc: 'Copy the sanitized list directly to your clipboard.',
        descAr: 'انسخ القائمة المفلترة والمنظمة بنقرة واحدة.',
      },
    ],
    howItWorksTitle: 'Set Deduplication & Whitespace Normalization',
    howItWorksTitleAr: 'خوارزمية إزالة التكرارات وضبط المسافات البيضاء',
    howItWorksText:
      'The tool splits string buffers by newline characters (`\\r?\\n`), trims bounding whitespace using string normalization routines, and inserts unique lines into a JavaScript Set data structure preserving O(n) algorithmic deduplication speed.',
    howItWorksTextAr:
      'تقوم الأداة بتفكيك الأسطر وحذف المسافات الطرفية الزائدة، ثم تمرير الأسطر عبر هيكل بيانات Set لضمان حذف التكرارات بسرعة زمنية O(n) فائقة مع الحفاظ على ترتيب العناصر.',
    examples: [
      {
        title: 'Deduplicating Email Subscriber List',
        titleAr: 'تنظيف قائمة بريدية وإزالة العناوين المكررة',
        scenario: 'A marketer cleaning a raw mailing list containing accidental duplicate emails and empty rows.',
        scenarioAr: 'مسوق ينظف قائمة بريدية تحتوي على إيميلات مكررة وأسطر فارغة غير مرغوبة.',
        input: 'user@test.com\\nuser@test.com\\n\\nadmin@test.com',
        inputAr: 'user@test.com\\nuser@test.com\\n\\nadmin@test.com',
        output: 'user@test.com\\nadmin@test.com (2 unique clean lines)',
        outputAr: 'user@test.com\\nadmin@test.com (سطران فريدان ونظيفان)',
        explanation: 'Reduces bounce rates and cleans messy database dumps.',
        explanationAr: 'يمنع إرسال رسائل مكررة وينظف القوائم البريدية قبل إطلاق الحملات الإعلانية.',
      },
    ],
  },
  "word-to-pdf": {
    toolSlug: "word-to-pdf",
    howToUseTitle: "How to Convert Word Documents to PDF",
    howToUseTitleAr: "طريقة تحويل مستندات Word إلى PDF",
    steps: [
      { step: 1, title: "Upload DOCX Document", titleAr: "رفع مستند Word (.docx)", desc: "Select any Word document from your local storage.", descAr: "اختر أي ملف Word من جهازك أو هاتفك." },
      { step: 2, title: "Parse Document Tree", titleAr: "معالجة النصوص والتنسيقات", desc: "The parser extracts headers, bold text, tables, and paragraphs.", descAr: "يقوم المحلل باستخراج العناوين والنصوص العريضة والجداول بدقة." },
      { step: 3, title: "Generate PDF", titleAr: "توليد ملف PDF", desc: "Convert text formatting into standard PDF page objects.", descAr: "تحويل التنسيقات إلى صفحات PDF متناسقة." },
      { step: 4, title: "Download PDF File", titleAr: "تحميل المستند النهائي", desc: "Save your read-only PDF file ready for distribution.", descAr: "احفظ المستند كملف PDF ثابت وجاهز للمشاركة والطباعة." }
    ],
    howItWorksTitle: "Client-Side OpenXML Extraction",
    howItWorksTitleAr: "استخراج بيانات OpenXML وبناء صفحات PDF",
    howItWorksText: "DOCX files are compressed XML archives. Sahlino extracts the word/document.xml payload, traverses typographic run nodes, and renders them into vector PDF canvases without third-party cloud converters.",
    howItWorksTextAr: "ملفات DOCX عبارة عن أرشيف XML مضغوط. تقوم ساهلينو بقراءة شجرة المستند وتحويل التنسيقات والفقرات مباشرة إلى كائنات PDF قياسية دون الحاجة لأي خادم وسيط."
  },
  "text-to-pdf": {
    toolSlug: "text-to-pdf",
    howToUseTitle: "How to Convert Plain Text into PDF",
    howToUseTitleAr: "طريقة تحويل النصوص العادية إلى مستند PDF",
    steps: [
      { step: 1, title: "Type or Paste Text", titleAr: "كتابة أو لصق النص", desc: "Enter plain text, code, or article notes into the text box.", descAr: "أدخل النص أو الملاحظات التي ترغب في طباعتها في المربع." },
      { step: 2, title: "Configure Page Setup", titleAr: "ضبط خيارات الصفحة", desc: "Select page size (A4), font style, and margin sizes.", descAr: "حدد حجم الصفحة (A4) ونوع الخط والهوامش المناسبة." },
      { step: 3, title: "Build & Download PDF", titleAr: "إنشاء وتحميل PDF", desc: "Generate a clean, printable PDF document instantly.", descAr: "أنشئ مستند PDF نظيفاً وجاهزاً للطباعة فورياً." }
    ],
    howItWorksTitle: "Typesetting & Margin Geometry",
    howItWorksTitleAr: "تنسيق الطباعة وحساب هوامش الصفحات",
    howItWorksText: "The tool splits text streams into lines calculated against page width and automatic word-wrapping rules, creating new pages whenever vertical line heights exceed printable page limits.",
    howItWorksTextAr: "تقوم الأداة بحساب عرض الأسطر والهوامش وتطبيق الالتفاف التلقائي للكلمات وإنشاء صفحات جديدة عند تجاوز ارتفاع الصفحة المطبوعة."
  },
  "pdf-rotate": {
    toolSlug: "pdf-rotate",
    howToUseTitle: "How to Permanently Rotate PDF Pages",
    howToUseTitleAr: "طريقة تدوير صفحات PDF بشكل دائم",
    steps: [
      { step: 1, title: "Upload Scanned PDF", titleAr: "رفع ملف PDF المقلوب", desc: "Upload the document with sideways or inverted pages.", descAr: "اختر ملف الـ PDF الذي يحتوي على صفحات مقلوبة أو مائلة." },
      { step: 2, title: "Select Rotation Angle", titleAr: "تحديد زاوية التدوير", desc: "Rotate all pages 90° Clockwise, Counter-Clockwise, or 180°.", descAr: "اختر تدوير الصفحات 90 درجة يميناً أو يساراً أو 180 درجة." },
      { step: 3, title: "Save Rotated Document", titleAr: "حفظ المستند المعدل", desc: "Download the corrected PDF with permanent page orientation.", descAr: "احفظ المستند مع تثبيت الاتجاه الصحيح بشكل نهائي." }
    ],
    howItWorksTitle: "Page Dictionary /Rotate Key Update",
    howItWorksTitleAr: "تعديل مفتاح التدوير في بنية صفحات PDF",
    howItWorksText: "PDF pages define an explicit /Rotate integer entry (0, 90, 180, 270) in their page dictionary. Sahlino updates this value directly, rotating the viewport permanently without re-compressing underlying document vectors.",
    howItWorksTextAr: "تحدد كل صفحة في مستند PDF زاوية عرض /Rotate (0، 90، 180، 270). تقوم الأداة بتحديث هذه القيمة مباشرة مما يثبت الاتجاه الصحيح دون أي ضغط أو مساس بجودة النصوص والصور."
  },
  "base64-encoder": {
    toolSlug: "base64-encoder",
    howToUseTitle: "How to Encode and Decode Base64 Data",
    howToUseTitleAr: "طريقة تشفير وفك تشفير نصوص وبيانات Base64",
    steps: [
      { step: 1, title: "Choose Mode", titleAr: "اختيار الوضع", desc: "Select Encode to turn plain text into Base64, or Decode to read Base64.", descAr: "اختر تشفير (Encode) أو فك تشفير (Decode)." },
      { step: 2, title: "Enter Data", titleAr: "إدخال البيانات", desc: "Paste your UTF-8 text or raw Base64 string.", descAr: "الصق النص أو الكود المراد تحويله." },
      { step: 3, title: "Copy Result", titleAr: "نسخ النتيجة", desc: "Copy the sanitized 64-character alphabet string.", descAr: "انسخ النتيجة الناتجة مباشرة إلى الحافظة." }
    ],
    howItWorksTitle: "RFC 4648 6-Bit Binary Representation",
    howItWorksTitleAr: "التمثيل الثنائي بستة بتات وفق RFC 4648",
    howItWorksText: "Base64 splits 8-bit byte sequences into 6-bit chunks, mapping each chunk to one of 64 ASCII characters (A-Z, a-z, 0-9, +, /) with = padding.",
    howItWorksTextAr: "يقوم نظام Base64 بتقسيم كل 3 بايتات (24 بت) إلى 4 مجموعات من 6 بتات، ومطابقة كل مجموعة مع 64 حرفاً قياسياً لضمان النقل الآمن عبر الشبكات."
  },
  "url-encoder": {
    toolSlug: "url-encoder",
    howToUseTitle: "How to Percent-Encode and Decode URLs",
    howToUseTitleAr: "طريقة ترميز وفك ترميز روابط URL (Percent-Encoding)",
    steps: [
      { step: 1, title: "Choose Action", titleAr: "اختيار نوع العملية", desc: "Select Encode URL or Decode URL.", descAr: "اختر تشفير الرابط أو فك تشفيره." },
      { step: 2, title: "Paste URL or Query String", titleAr: "لصق الرابط أو المعاملات", desc: "Enter URLs with special characters, Arabic letters, or spaces.", descAr: "الصق الرابط الذي يحتوي على مسافات أو حروف عربية أو رموز خاصة." },
      { step: 3, title: "Get RFC 3986 Result", titleAr: "الحصول على الرابط الآمن", desc: "Copy the percent-encoded URL safe for HTTP transmission.", descAr: "انسخ الرابط المشفر بالنسب المئوية (%20) والجاهز للاستخدام البرمجي." }
    ],
    howItWorksTitle: "RFC 3986 Percent-Encoding Specification",
    howItWorksTitleAr: "معيار RFC 3986 للترميز بالنسبة المئوية",
    howItWorksText: "Reserved characters (:/?#[]@!$&) and non-ASCII glyphs are converted into their UTF-8 byte hexadecimal representation preceded by a % symbol.",
    howItWorksTextAr: "تستبدل الأداة الرموز المحجوزة والحروف غير اللاتينية بقيمها السداسية عشرية بنظام UTF-8 مسبوقة برمز % لضمان عدم تعطل متصفحات الويب وخوادم HTTP."
  },
  "uuid-generator": {
    toolSlug: "uuid-generator",
    howToUseTitle: "How to Generate Cryptographically Secure UUID v4",
    howToUseTitleAr: "طريقة توليد معرفات UUID v4 عشوائية آمنة",
    steps: [
      { step: 1, title: "Choose Quantity & Format", titleAr: "تحديد العدد والصيغة", desc: "Pick uppercase or lowercase and how many UUIDs to generate.", descAr: "اختر حروفاً كبيرة أو صغيرة، وحدد عدد المعرفات المطلوبة." },
      { step: 2, title: "Generate Keys", titleAr: "توليد المفاتيح", desc: "Click Generate to invoke browser crypto.randomUUID().", descAr: "اضغط على زر التوليد لتشغيل خوارزمية التشفير العشوائية." },
      { step: 3, title: "Copy to Clipboard", titleAr: "نسخ المعرفات", desc: "Copy single UUID or all generated keys for database seeding.", descAr: "انسخ المعرفات لاستخدامها في قواعد البيانات ومفاتيح الـ Primary Keys." }
    ],
    howItWorksTitle: "RFC 4122 Version 4 Pseudo-Random Entropy",
    howItWorksTitleAr: "معيار RFC 4122 والإنتروبيا العشوائية لمعرفات v4",
    howItWorksText: "UUID v4 generates 128-bit identifiers with 122 bits of true cryptographic entropy from window.crypto.getRandomValues(). The probability of a collision is approximately 1 in 2.71 quintillion.",
    howItWorksTextAr: "تنتج معرفات UUID v4 ما مقداره 128 بت من البيانات العشوائية المشفرة من واجهة المتصفح الآمنة، مع نسبة تصادم تكاد تكون معدومة إحصائياً."
  },
  "hash-generator": {
    toolSlug: "hash-generator",
    howToUseTitle: "How to Compute SHA-256 and Cryptographic Hashes",
    howToUseTitleAr: "طريقة حساب بصمات التشفير SHA-256 و MD5",
    steps: [
      { step: 1, title: "Enter Input String", titleAr: "كتابة النص المراد تشفيره", desc: "Paste any password, token, or verification string.", descAr: "الصق النص أو كلمة المرور أو رمز التحقق في المربع." },
      { step: 2, title: "Select Algorithm", titleAr: "اختيار خوارزمية التشفير", desc: "Choose SHA-256, SHA-512, SHA-1, or MD5.", descAr: "اختر SHA-256 أو SHA-512 أو MD5." },
      { step: 3, title: "Inspect Hex Digest", titleAr: "الاطلاع على البصمة المشفرة", desc: "Get the fixed-length hexadecimal cryptographic checksum.", descAr: "احصل على البصمة الرقمية السداسية عشرية الثابتة الطول." }
    ],
    howItWorksTitle: "SubtleCrypto Web API Hashing",
    howItWorksTitleAr: "التجزئة التشفيرية عبر واجهة SubtleCrypto",
    howItWorksText: "Hashes are one-way cryptographic functions. Sahlino utilizes hardware-accelerated Web Cryptography (SubtleCrypto.digest) to compute deterministic message digests.",
    howItWorksTextAr: "دوال التجزئة هي دوال أحادية الاتجاه يستحيل عكسها رياضياً. تستخدم الأداة محرك التشفير المدمج بالمتصفح لحساب البصمات فورياً بأمان مطلق."
  },
  "calorie-calculator": {
    toolSlug: "calorie-calculator",
    howToUseTitle: "How to Calculate Daily Caloric Needs (TDEE & BMR)",
    howToUseTitleAr: "طريقة حساب السعرات الحرارية اليومية ومعدل الأيض (BMR & TDEE)",
    steps: [
      { step: 1, title: "Enter Biometrics", titleAr: "إدخال البيانات الحيوية", desc: "Provide age, gender, height, and current weight.", descAr: "أدخل العمر، الجنس، الطول، والوزن الحالي." },
      { step: 2, title: "Select Activity Level", titleAr: "تحديد مستوى النشاط البدني", desc: "Choose from sedentary office desk to intense athletic training.", descAr: "اختر نمط حياتك من مكتبي خامل إلى تمرين رياضي مكثف." },
      { step: 3, title: "Pick Weight Goal", titleAr: "تحديد الهدف (تثبيت، نزول، زيادة)", desc: "Maintain weight, mild deficit (-250 kcal), or moderate fat loss (-500 kcal).", descAr: "اختر تثبيت الوزن، أو حرق الدهون بنقص 500 سعرة، أو بناء العضلات." }
    ],
    howItWorksTitle: "Mifflin-St Jeor Clinical Equation",
    howItWorksTitleAr: "معادلة ميفلين سانت جور المعتمدة سريرياً",
    howItWorksText: "Basal Metabolic Rate is calculated via Mifflin-St Jeor: Men: 10×W + 6.25×H - 5×A + 5; Women: 10×W + 6.25×H - 5×A - 161. Multiplying BMR by the PAL activity coefficient yields total daily energy expenditure (TDEE).",
    howItWorksTextAr: "تعتمد الأداة معادلة Mifflin-St Jeor الطبية الأكثر دقة لحساب معدل الحرق الأساسي للجسم أثناء الراحة (BMR)، ثم ضربه في معامل النشاط للحصول على استهلاك الطاقة اليومي الكامل (TDEE)."
  },
  "date-calculator": {
    toolSlug: "date-calculator",
    howToUseTitle: "How to Calculate Date Differences and Countdowns",
    howToUseTitleAr: "طريقة حساب الفرق بين تاريخين والعد التنازلي",
    steps: [
      { step: 1, title: "Pick Start & End Dates", titleAr: "تحديد تاريخ البداية والنهاية", desc: "Select two calendar dates to measure duration.", descAr: "اختر التاريخ الأول والتاريخ الثاني لقياس الفارق بينهما." },
      { step: 2, title: "View Unit Conversions", titleAr: "الاطلاع على الفارق بالوحدات", desc: "View results in total days, weeks, months, and exact years.", descAr: "اطلع على النتيجة بإجمالي الأيام والأسابيع والشهور والسنوات." },
      { step: 3, title: "Add or Subtract Days", titleAr: "إضافة أو طرح أيام من تاريخ", desc: "Calculate future deadlines by adding specific calendar days.", descAr: "احسب المواعيد النهائية المستقبلية بإضافة أو طرح عدد محدد من الأيام." }
    ],
    howItWorksTitle: "Gregorian Epoch Timestamp Difference",
    howItWorksTitleAr: "حساب فوارق الطوابع الزمنية الميلادية",
    howItWorksText: "Calculates the exact elapsed milliseconds between UTC midnight timestamps, accounting for variable month lengths (28, 30, 31) and leap year cycles.",
    howItWorksTextAr: "تقوم الأداة بحساب الميللي ثانية الفاصلة بدقة تامة مع معالجة الشهور غير المتساوية والسنوات الكبيسة بدقة رياضية متناهية."
  },
  "business-days-calculator": {
    toolSlug: "business-days-calculator",
    howToUseTitle: "How to Calculate Business Days (Excluding Weekends)",
    howToUseTitleAr: "طريقة حساب أيام العمل الرسمية (مع استبعاد عطلات نهاية الأسبوع)",
    steps: [
      { step: 1, title: "Select Date Span", titleAr: "تحديد الفترة الزمنية", desc: "Pick start and target completion dates.", descAr: "اختر تاريخ البداية وتاريخ النهاية للمشروع أو المعاملة." },
      { step: 2, title: "Configure Weekend Schedule", titleAr: "ضبط أيام عطلة نهاية الأسبوع", desc: "Select Saturday/Sunday or Friday/Saturday weekend systems.", descAr: "حدد نظام العطلة الأسبوعية (الجمعة/السبت أو السبت/الأحد)." },
      { step: 3, title: "Get Working Day Tally", titleAr: "معرفة عدد أيام العمل الصافية", desc: "View exact business working days remaining.", descAr: "احصل على عدد أيام الدوام والعمل الصافية لإنجاز المهام." }
    ],
    howItWorksTitle: "Day-of-Week Modulo Iteration",
    howItWorksTitleAr: "خوارزمية فحص أيام الأسبوع واستبعاد العطلات",
    howItWorksText: "Iterates through calendar dates testing date.getDay() to exclude designated non-business weekend days, providing exact project milestone scheduling.",
    howItWorksTextAr: "تختبر الأداة مؤشر اليوم في الأسبوع (Day of Week) وتستثني تلقائياً أيام العطلات الأسبوعية لحساب فترات تسليم المشاريع بدقة."
  },
  "time-zone-converter": {
    toolSlug: "time-zone-converter",
    howToUseTitle: "How to Compare Time Zones Across World Cities",
    howToUseTitleAr: "طريقة تحويل ومقارنة الأوقات بين مدن العالم",
    steps: [
      { step: 1, title: "Set Base Time", titleAr: "تحديد الوقت الحالي", desc: "Choose your home city and preferred meeting hour.", descAr: "اختر مدينتك ووقت الاجتماع المقترح." },
      { step: 2, title: "Add Target Cities", titleAr: "إضافة المدن المستهدفة", desc: "Add multiple global cities (London, New York, Tokyo, Dubai, Riyadh).", descAr: "أضف المدن التي يتواجد فيها فريق عملك (لندن، نيويورك، الرياض، دبي)." },
      { step: 3, title: "Review Simultaneous Times", titleAr: "مقارنة الساعات والتاريخ", desc: "See converted local times side-by-side with daylight saving precision.", descAr: "قارن الأوقات المتزامنة مع مراعاة التوقيت الصيفي وفرق الأيام تلقائياً." }
    ],
    howItWorksTitle: "IANA Olson Timezone Database",
    howItWorksTitleAr: "قاعدة بيانات المناطق الزمنية العالمية IANA",
    howItWorksText: "Leverages standard Intl.DateTimeFormat with IANA zone identifiers to compute dynamic UTC offsets, DST transitions, and calendar date boundaries.",
    howItWorksTextAr: "تعتمد الأداة على معرفات المناطق الزمنية الرسمية IANA لحساب فروق التوقيت والتنقل الصيفي والشتوي بدقة فائقة."
  },
  "length-converter": {
    toolSlug: "length-converter",
    howToUseTitle: "How to Convert Units (Length, Weight, Temp)",
    howToUseTitleAr: "طريقة تحويل الوحدات القياسية (أطوال، أوزان، حرارة)",
    steps: [
      { step: 1, title: "Choose Unit Category", titleAr: "اختيار نوع الوحدة", desc: "Select Length, Mass/Weight, Temperature, or Volume.", descAr: "اختر الطول، الوزن، درجة الحرارة، أو الحجم." },
      { step: 2, title: "Input Number and From/To Units", titleAr: "إدخال القيمة واختيار الوحدات", desc: "Convert between meters, feet, inches, kilometers, miles, kilograms, and pounds.", descAr: "حول بين الأمتار، الأقدام، البوصات، الكيلوجرامات، والأرطال." },
      { step: 3, title: "View Precise Result", titleAr: "مشاهدة النتيجة الفورية", desc: "Get high-precision decimal conversions with conversion formulas.", descAr: "احصل على القيمة المحولة بدقة مع إيضاح معامل التحويل." }
    ],
    howItWorksTitle: "SI Base Normalization",
    howItWorksTitleAr: "التحويل عبر الوحدات المرجعية الدولية (SI)",
    howItWorksText: "All units are normalized to SI base standards (meters, kilograms, Kelvin) before projecting into the desired destination unit, eliminating cumulative rounding errors.",
    howItWorksTextAr: "يتم تحويل أي وحدة إلى الوحدة المعيارية الدولية أولاً، ثم تحويلها إلى الوحدة المستهدفة لضمان أعلى درجات الدقة دون أخطاء تقريب تراكمية."
  },
  "data-storage-converter": {
    toolSlug: "data-storage-converter",
    howToUseTitle: "How to Convert Bytes, KB, MB, GB, and TB",
    howToUseTitleAr: "طريقة تحويل وحدات تخزين البيانات والذاكرة",
    steps: [
      { step: 1, title: "Enter Data Amount", titleAr: "إدخال حجم البيانات", desc: "Type the file or drive capacity in numbers.", descAr: "أدخل السعة الرقمية لملفك أو قرص التخزين." },
      { step: 2, title: "Select Source Unit", titleAr: "تحديد الوحدة الأصلية", desc: "Choose Byte, KB, MB, GB, TB, or PB.", descAr: "اختر بايت، كيلوبايت، ميجابايت، جيجابايت، أو تيرابايت." },
      { step: 3, title: "Compare Binary vs Decimal", titleAr: "مقارنة النظام الثنائي والعشري", desc: "See both binary 1024 (KiB/GiB) and decimal 1000 (KB/GB) conversions.", descAr: "اطلع على الحجم بالنظام الثنائي (1024) والنظام العشري التجاري (1000)." }
    ],
    howItWorksTitle: "IEC Binary (1024) vs SI Decimal (1000)",
    howItWorksTitleAr: "الفارق بين النظام الثنائي IEC (1024) والنظام العشري SI (1000)",
    howItWorksText: "Operating systems display file sizes in powers of 2 (1 GiB = 1,073,741,824 bytes), whereas drive manufacturers label drives in powers of 10 (1 GB = 1,000,000,000 bytes). Sahlino bridges both systems clearly.",
    howItWorksTextAr: "تتعامل أنظمة التشغيل بمضاعفات الرقم 2 (الجيبي بايت = 1024 ميبي بايت)، بينما تسوق شركات الأقراص بمضاعفات 1000، مما يفسر سبب ظهور سعة القرص أقل قليلاً في ويندوز."
  },
  "number-base-converter": {
    toolSlug: "number-base-converter",
    howToUseTitle: "How to Convert Binary, Octal, Decimal & Hexadecimal",
    howToUseTitleAr: "طريقة التحويل بين الأنظمة العددية (ثنائي، عشري، سداسي عشر)",
    steps: [
      { step: 1, title: "Enter Number in Any Base", titleAr: "إدخال الرقم في أي نظام", desc: "Type binary (0/1), decimal (0-9), or hexadecimal (0-9, A-F).", descAr: "اكتب رقماً ثنائياً (0/1) أو عشرياً أو سداسي عشر." },
      { step: 2, title: "View Real-Time Conversions", titleAr: "مشاهدة التحويل الفوري", desc: "All four number systems update simultaneously as you type.", descAr: "تتحدث كافة الأنظمة العددية تلقائياً في نفس اللحظة." },
      { step: 3, title: "Copy Programmatic Values", titleAr: "نسخ القيم البرمجية", desc: "Copy 0x prefix hex or 0b binary strings for code.", descAr: "انسخ القيم مع البادئات البرمجية (0x أو 0b) لاستخدامها في البرمجة." }
    ],
    howItWorksTitle: "Positional Radix Notation",
    howItWorksTitleAr: "أنظمة العد الموضعية وقوى الأساس",
    howItWorksText: "Numbers are parsed to BigInt primitives using base radix parsing (parseInt(str, radix)) and projected via radix.toString(targetRadix) preventing 32-bit integer overflow.",
    howItWorksTextAr: "يتم تحليل الأرقام كأعداد صحيحة كبيرة (BigInt) وتحويلها بين الأسس العددية (2، 8، 10، 16) دون فقدان الدقة حتى مع الأرقام الكبيرة جداً."
  },
  "currency-converter": {
    toolSlug: "currency-converter",
    howToUseTitle: "How to Convert World Currencies",
    howToUseTitleAr: "طريقة تحويل العملات وأسعار الصرف العالمية",
    steps: [
      { step: 1, title: "Input Amount", titleAr: "إدخال المبلغ المالي", desc: "Enter money value to convert.", descAr: "أدخل المبلغ المراد تحويله." },
      { step: 2, title: "Choose Currency Pair", titleAr: "اختيار العملتين", desc: "Pick From and To currencies (USD, EUR, SAR, AED, GBP, etc.).", descAr: "اختر عملة المصدر وعملة الوجهة (دولار، يورو، ريال، درهم، جنيه)." },
      { step: 3, title: "View Converted Value", titleAr: "الاطلاع على القيمة وسعر الصرف", desc: "Review the converted total with exchange rate reference.", descAr: "اطلع على المبلغ المحول وسعر الصرف المعياري." }
    ],
    howItWorksTitle: "Cross-Rate Calculation",
    howItWorksTitleAr: "حساب أسعار الصرف المتقاطعة (Cross-Rates)",
    howItWorksText: "Calculates exchange rates using USD base currency pivot math: Amount × (TargetRate / SourceRate).",
    howItWorksTextAr: "تقوم الأداة بحساب سعر الصرف المتقاطع عبر عملة الارتكاز لحساب القيمة الدقيقة للتحويل المالي بين أي عملتين."
  },
  "password-generator": {
    toolSlug: "password-generator",
    howToUseTitle: "How to Generate Strong, Unhackable Passwords",
    howToUseTitleAr: "طريقة توليد كلمات مرور قوية ومعقدة يصعب اختراقها",
    steps: [
      { step: 1, title: "Set Password Length", titleAr: "تحديد طول كلمة المرور", desc: "Choose 12 to 32 characters (16+ recommended for critical accounts).", descAr: "اختر طولاً بين 12 و 32 حرفاً (يوصى بـ 16 حرفاً للحسابات الحساسة)." },
      { step: 2, title: "Toggle Character Sets", titleAr: "تحديد أنواع الرموز", desc: "Include uppercase letters, lowercase, numbers, and symbols (!@#$%).", descAr: "فعل الحروف الكبيرة، الصغيرة، الأرقام، والرموز الخاصة." },
      { step: 3, title: "Copy Strong Password", titleAr: "نسخ كلمة المرور الآمنة", desc: "Copy your cryptographically generated password immediately.", descAr: "انسخ كلمة المرور المتولدة محلياً لاستخدامها في حسابك." }
    ],
    howItWorksTitle: "CSPRNG Cryptographic Randomness",
    howItWorksTitleAr: "التوليد التشفيري العشوائي الآمن (CSPRNG)",
    howItWorksText: "Generates entropy using window.crypto.getRandomValues(), ensuring high Shannon entropy and resistance against brute-force and dictionary attacks.",
    howItWorksTextAr: "تعتمد الأداة على محرك الأرقام العشوائية التشفيري المدمج بنظام التشغيل لضمان عدم إمكانية التنبؤ بكلمة المرور وحمايتها من هجمات القوة الغاشمة."
  },
  "meta-tag-generator": {
    toolSlug: "meta-tag-generator",
    howToUseTitle: "How to Generate SEO & Social Share Meta Tags",
    howToUseTitleAr: "طريقة توليد وسوم الميتا لمحركات البحث وشبكات التواصل",
    steps: [
      { step: 1, title: "Enter Page Information", titleAr: "إدخال بيانات الصفحة", desc: "Provide website title, meta description, canonical URL, and author.", descAr: "أدخل عنوان الصفحة، الوصف التعريفي، الرابط الأصلي، وصورة المشاركة." },
      { step: 2, title: "Review Live Snippet", titleAr: "معاينة المظهر في جوجل وفيسبوك", desc: "Inspect Google search preview, Facebook OpenGraph, and Twitter card.", descAr: "شاهد كيف ستظهر صفحتك في نتائج بحث جوجل وبطاقات المشاركة في تويتر وفيسبوك." },
      { step: 3, title: "Copy HTML Code", titleAr: "نسخ كود HTML ولصقه", desc: "Copy the generated <meta> tags directly into your site <head> section.", descAr: "انسخ وسوم الميتا الجاهزة وضعها مباشرة داخل وسم <head> في موقعك." }
    ],
    howItWorksTitle: "OpenGraph & Schema Standards",
    howItWorksTitleAr: "معايير بروتوكول OpenGraph والـ SEO التقني",
    howItWorksText: "Formats compliant HTML tags according to Google search snippet guidelines (under 60 chars title, under 160 chars description) and OpenGraph standards.",
    howItWorksTextAr: "تولد الأداة وسوماً برمجية مطابقة لتوصيات جوجل الرسمية لضمان عدم اقتطاع العناوين والأوصاف، مع ضبط بطاقات المعاينة على منصات التواصل."
  }

};

export const getToolGuide = (slug: string): ToolGuideItem | undefined => {
  return TOOL_GUIDES[slug];
};
