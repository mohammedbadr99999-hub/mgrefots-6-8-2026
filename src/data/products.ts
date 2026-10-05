import { Product } from '../types';

const ORIGINAL_PRODUCTS: Product[] = [
  {
    id: 'creatine-monohydrate',
    name: {
      en: 'MGREFOTS Creatine Monohydrate',
      ar: 'كرياتين مونهيديرات MGREFOTS',
      rw: 'Creatine Monohydrate MGREFOTS'
    },
    subtitle: {
      en: '100% Pure Micronized Powder for Explosive Power & Muscle Volume',
      ar: 'مسحوق كرياتين ميكروني نقي ١٠٠٪ للقوة الانفجارية والضخامة العضلية',
      rw: 'Puwederi ya Creatine 100% ku bubahe n’ingufu z’imikaya'
    },
    category: 'power',
    badge: {
      en: '100% Pure Micronized',
      ar: 'ميكروني نقي ١٠٠٪',
      rw: '100% Pure Micronized'
    },
    badgeColor: 'bg-amber-500 text-white',
    gradient: 'from-amber-600 via-blue-900 to-slate-950',
    accentColor: 'text-amber-500',
    iconName: 'Zap',
    price: '45,000 RWF',
    image: '/images/products/creatine-monohydrate.png',
    servings: '60 Servings',
    size: '300g Powder',
    rating: 5.0,
    reviewsCount: 412,
    buyersCount: 2840,
    description: {
      en: 'MGREFOTS Creatine Monohydrate delivers ultra-pure, micronized creatine to rapidly replenish cellular ATP energy during high-intensity training. Accelerates muscle cell hydration, strength gains, and muscular endurance.',
      ar: 'يوفر كرياتين مونهيديرات MGREFOTS كرياتين ميكروني شديد النقاء لإعادة شحن طاقة ATP الخلوية بسرعة أثناء التمارين عالية الشدة. يعزز ترطيب الخلايا العضلية وزيادة القوة والتحمل العضلي.',
      rw: 'Creatine Monohydrate ya MGREFOTS itanga creatine y’umwimerere ifasha kugarura ingufu za ATP mu gihe ukora imyitozo ikomeye. Yongera amazi mu mikaya n’ingufu.'
    },
    highlights: {
      en: [
        '5g Pure Micronized Creatine Monohydrate per serving',
        'Accelerates ATP energy synthesis & rep count',
        'Enhances intracellular hydration & muscle fullness',
        'Zero fillers, unflavored, mixes instantly'
      ],
      ar: [
        '٥ جرام كرياتين مونهيديرات ميكروني نقي لكل حصة',
        'يسرع تصنيع طاقة ATP وزيادة التكرارات',
        'يعزز الترطيب داخل الخلايا واملاء العضلات',
        'خالٍ من المواد المالئة، بدون نكهة، يذوب فوراً'
      ],
      rw: [
        'Gramu 5 z’umwimerere wa Creatine Monohydrate kuri buri funguro',
        'Yongera ingufu za ATP no gukora imyitozo myinshi',
        'Yongera amazi mu mikaya ikamera neza',
        'Nta bintu biongeewemo, ivanga vuba'
      ]
    },
    usage: {
      en: 'Mix 1 scoop (5g) with 250ml of water or your favorite beverage daily. Take post-workout or in the morning.',
      ar: 'يمزج مكيال واحد (٥ جم) مع ٢٥٠ مل من الماء أو مشروبك المفضل يومياً. يتناول بعد التمرين أو صباحاً.',
      rw: 'Vanga igipimo 1 (5g) n’amazi 250ml buri munsi nyuma y’imyitozo cyangwa mu gitondo.'
    },
    ingredients: {
      en: '100% Pure Pharmaceutical Grade Micronized Creatine Monohydrate.',
      ar: '١٠٠٪ كرياتين مونهيديرات ميكروني بنقاء صيدلاني.',
      rw: '100% Creatine Monohydrate y’umwimerere.'
    },
    scienceNote: {
      en: 'Creatine donates a phosphate group to ADP to rapidly regenerate ATP (adenosine triphosphate), the primary source of muscular fuel during maximal short-burst exertion.',
      ar: 'يعطي الكرياتين مجموعة فوسفات لـ ADP لإعادة تدوير الـ ATP بسرعة، وهو مصدر الطاقة الرئيسي للعضلات في التمارين الانفجارية.',
      rw: 'Creatine itanga fosphate kuri ADP kugira ngo ikore ATP nshya itanga ingufu mu mikaya.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS Creatine Monohydrate (300g).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن كرياتين مونهيديرات MGREFOTS (300g).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri Creatine Monohydrate MGREFOTS (300g).'
    }
  },
  {
    id: 'citrulline',
    name: {
      en: 'MGREFOTS Pure Citrulline',
      ar: 'سيترولين MGREFOTS النقي',
      rw: 'Citrulline MGREFOTS Pure'
    },
    subtitle: {
      en: '100% Pure L-Citrulline Powder (3000mg/serving) for Explosive Nitric Oxide Pump',
      ar: 'مسحوق سيترولين نقي ١٠٠٪ (٣٠٠٠ مجم/جرعة) لضخ الدم والنيتريك أوكسايد بدون ماليت',
      rw: 'Puwederi ya Citrulline 100% pure (3000mg) ku gutembereza amaraso no gukora pump'
    },
    category: 'pump',
    badge: {
      en: '100% Pure Citrulline · 3000mg',
      ar: 'سيترولين نقي ١٠٠٪ · ٣٠٠٠ مجم',
      rw: '100% Pure Citrulline · 3000mg'
    },
    badgeColor: 'bg-rose-600 text-white',
    gradient: 'from-rose-700 via-red-900 to-slate-950',
    accentColor: 'text-red-500',
    iconName: 'Activity',
    price: '40,000 RWF',
    image: '/images/products/citrulline.png',
    servings: '30 Servings',
    size: '90g Powder',
    rating: 5.0,
    reviewsCount: 315,
    buyersCount: 1850,
    description: {
      en: 'MGREFOTS Pure Citrulline delivers 3000mg of 100% pure unflavored L-Citrulline per serving without malate. Designed to optimize vascular dilation, maximize Nitric Oxide pump, reduce lactic acid buildup, and accelerate recovery.',
      ar: 'يوفر سيترولين MGREFOTS النقي ٣٠٠٠ مجم من ل-سيترولين النقي 100% بدون حمض المالك لكل حصة. مصمم لتوسيع الأوعية الدموية لأقصى ضخ عضلي ونيتريك أوكسايد وتأخير الإجهاد والاستشفاء السريع.',
      rw: 'Citrulline ya MGREFOTS itanga 3000mg za pure L-Citrulline nta malate. Ifasha gufungura imitsi y’amaraso n’ingufu z’imikaya.'
    },
    highlights: {
      en: [
        '3000mg Pure L-Citrulline per serving (Zero Malic Acid / Pure Formula)',
        '90g Powder Container / 30 Clinical Servings',
        'Elevates Nitric Oxide (NO) synthesis & vasodilation efficiently',
        'Delays muscular fatigue & enhances vascular muscle fullness'
      ],
      ar: [
        '٣٠٠٠ مجم سيترولين نقي ١٠٠٪ لكل جرعة (بدون سيترولين ماليت)',
        'عبوة ٩٠ جرام باودر / ٣٠ جرعة مركزة',
        'يرفع مستويات النيتريك أوكسايد وتوسع الأوعية الدموية بكفاءة فائقة',
        'يؤخر حرقان العضلات والإجهاد ويعزز بروز العروق والضخ العضلي'
      ],
      rw: [
        '3000mg za pure L-Citrulline buri funguro (nta malate)',
        'Ungano ya 90g puwederi / 30 servings',
        'Yongera Nitric Oxide mu maraso n’umuvuduko mwiza',
        'Itinza umunaniro n’ubushyuhe mu mikaya'
      ]
    },
    usage: {
      en: 'Mix 1 scoop (3000mg) with 200-300ml of water or pre-workout 20-30 minutes prior to training.',
      ar: 'يمزج مكيال واحد (٣٠٠٠ مجم) مع ٢٠٠-٣٠٠ مل من الماء قبل التمرين بـ ٢٠-٣٠ دقيقة.',
      rw: 'Vanga igipimo 1 (3000mg) n’amazi 200-300ml iminota 20-30 mbere y’imyitozo.'
    },
    ingredients: {
      en: '100% Pure Pharmaceutical Grade Unflavored L-Citrulline Powder.',
      ar: '١٠٠٪ مسحوق ل-سيترولين نقي بنقاء صيدلاني بدون نكهة.',
      rw: '100% Pure L-Citrulline Powder.'
    },
    scienceNote: {
      en: 'Pure L-Citrulline directly converts to L-Arginine in the kidneys, fueling endothelial Nitric Oxide Synthase (eNOS) for maximal muscle vasodilation and nutrient delivery.',
      ar: 'يتناول جسمك السيترولين النقي ليتحول في الكليتين مباشرة إلى أرجينين نقي، مما يغذي إنزيم eNOS لأقصى اتساع شرياني وضخ دمي للعضلات.',
      rw: 'Pure L-Citrulline ihinduka Arginine mu rinzo ikongera umuvuduko w’amaraso mu mitsi.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS Pure Citrulline (90g / 30 Servings).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن سيترولين MGREFOTS النقي (90g / 30 جرعة).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri Citrulline MGREFOTS Pure (90g).'
    }
  },
  {
    id: 'l-carnitine',
    name: {
      en: 'MGREFOTS L-Carnitine',
      ar: 'ال كارنتين MGREFOTS',
      rw: 'L-Carnitine MGREFOTS'
    },
    subtitle: {
      en: '750mg High-Potency L-Carnitine Capsules (60 Capsules / 30 Servings)',
      ar: '٧٥٠ مجم ال كارنتين عالي الفعالية (٦٠ كبسولة / ٣٠ جرعة)',
      rw: '750mg L-Carnitine Capsules (60 Capsules / 30 Servings)'
    },
    category: 'energy',
    badge: {
      en: '750mg / Serving · 60 Caps',
      ar: '٧٥٠ مجم / جرعة · ٦٠ كبسولة',
      rw: '750mg / Serving · 60 Caps'
    },
    badgeColor: 'bg-orange-600 text-white',
    gradient: 'from-orange-600 via-amber-900 to-slate-950',
    accentColor: 'text-orange-500',
    iconName: 'Flame',
    price: '50,000 RWF',
    image: '/images/products/l-carnitine.png',
    servings: '30 Servings',
    size: '60 Capsules',
    rating: 4.8,
    reviewsCount: 240,
    buyersCount: 1420,
    description: {
      en: 'MGREFOTS L-Carnitine provides 750mg per serving in convenient capsules (60 capsules per bottle, 30 servings). Shuttles stored fatty acids directly into mitochondria to burn for cellular ATP energy, aiding fat loss and stamina.',
      ar: 'يوفر ال كارنتين MGREFOTS جرعة ٧٥٠ مجم لكل حصة في عبوة تحتوي على ٦٠ كبسولة (٣٠ جرعة). ينقل الأحماض الدهنية إلى الميتوكندريا لحرقها وتحويلها لطاقة مع تعزيز الاستشفاء بدقة.',
      rw: 'L-Carnitine ya MGREFOTS itanga 750mg mu igipimo kumwe (capsules 60, servings 30). Itwara ibinure mu bitse by’ingufu (mitochondria) ikabihinduramo ingufu.'
    },
    highlights: {
      en: [
        '750mg High-Potency L-Carnitine per serving',
        '60 Capsules Bottle / 30 Servings (2 capsules per serving)',
        'Transfers stored long-chain fatty acids into mitochondria for energy',
        'Supports fat metabolism & reduces post-workout muscle soreness'
      ],
      ar: [
        'جرعة ٧٥٠ مجم L-Carnitine عالية الفعالية لكل حصة',
        'العلبة ٦٠ كبسولة / ٣٠ جرعة (كبسولتان لكل جرعة)',
        'ينقل الدهون المخزنة للميتوكندريا لإنتاج الطاقة',
        'يدعم معدل الأيض والتنشيف ويقلل آلام ما بعد التمرين'
      ],
      rw: [
        '750mg za L-Carnitine mu igipimo kumwe',
        'Acupa ibamo capsules 60 (servings 30)',
        'Ihindura ibinure ingufu mu gihe ukora imyitozo',
        'Fasha metabolism n’ingufu z’imikaya'
      ]
    },
    usage: {
      en: 'Take 1 serving (2 capsules = 750mg L-Carnitine) 30 minutes before training or cardio session.',
      ar: 'تناول حصة واحدة (كبسولتان = ٧٥٠ مجم ال كارنتين) قبل التمرين أو الكارديو بـ ٣٠ دقيقة.',
      rw: 'Fata caps 2 (750mg) iminota 30 mbere y’imyitozo.'
    },
    ingredients: {
      en: 'L-Carnitine L-Tartrate (750mg equivalent per serving), Pharmaceutical Gelatin Capsule, Magnesium Stearate.',
      ar: 'ال-كارنتين ال-تارترات (ما يعادل ٧٥٠ مجم لكل جرعة)، كبسولة جيلاتين صيدلانية، ماغنسيوم ستيرات.',
      rw: 'L-Carnitine L-Tartrate (750mg), Gelatin Capsule.'
    },
    scienceNote: {
      en: 'Carnitine palmitoyltransferase-1 (CPT-1) requires carnitine to transport fatty acyl-CoA molecules across the inner mitochondrial membrane for beta-oxidation.',
      ar: 'يتطلب إنزيم CPT-1 وجود الكارنتين لنقل أحماض الدهن عبر غشاء الميتوكندريا الداخلي لإجراء عملية الأكسدة وحرق الدهون.',
      rw: 'Carnitine ifasha kwinjiza fatty acids mu mitochondria kumenya niba zitwikwa.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS L-Carnitine (60 Caps / 750mg).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن ال كارنتين MGREFOTS (60 كبسولة / 750 مجم).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri L-Carnitine MGREFOTS (60 Caps).'
    }
  },
  {
    id: 'protein-pea-rice',
    name: {
      en: 'MGREFOTS Protein (70% Pea & 30% Rice)',
      ar: 'بروتين MGREFOTS 70% بازلاء & 30% أرز',
      rw: 'Poroteyine MGREFOTS (70% Pea & 30% Rice)'
    },
    subtitle: {
      en: '81.3% Tested Protein Synergy — 70% Pea & 30% Rice Complete Amino Acid Profile',
      ar: '٨١.٣٪ بروتين مثبت بالتحاليل — خليط ٧٠٪ بازلاء & ٣٠٪ أرز بأعلى ملف أحماض أمينية كامل',
      rw: '81.3% Poroteyine yuzuye — 70% Pea & 30% Rice Complete Amino Acids'
    },
    category: 'protein',
    badge: {
      en: 'Sold Out · Out of Stock',
      ar: 'نفدت الكمية · Sold Out',
      rw: 'Sold Out · Out of Stock'
    },
    badgeColor: 'bg-red-700 text-white',
    gradient: 'from-emerald-700 via-teal-900 to-slate-950',
    accentColor: 'text-emerald-500',
    iconName: 'Shield',
    price: 'Sold Out',
    isSoldOut: true,
    image: '/images/products/protein-pea-rice.png',
    servings: '30 Servings',
    size: '1kg (1000g) Tub',
    rating: 4.9,
    reviewsCount: 380,
    buyersCount: 2150,
    description: {
      en: 'MGREFOTS Protein features an 81.3% lab-tested protein concentration combining 70% Pea Protein Isolate & 30% Organic Rice Protein. We are the FIRST company to apply this blend in practice to produce a 100% complete amino acid profile matching whey protein at an ideal price. Delivers 26.8g pure protein per scoop.',
      ar: 'يتميز بروتين MGREFOTS بنسبة ٨١.٣٪ بروتين نقية بناءً على التحاليل المخبرية المعتمدة للمنتج، تجمع بين ٧٠٪ بروتين بازلاء معزول و٣٠٪ بروتين أرز عضوي. نحن أول شركة تطبق هذا الخليط على أرض الواقع لإنتاج ملف أحماض أمينية كامل يضاهي واي بروتين بسعر مثالي. يحتوي السكوب على ٢٦.٨ جم بروتين صافي.',
      rw: 'Poroteyine ya MGREFOTS ifite 81.3% ya poroteyine mu bizami bya lab. Ni 70% Pea na 30% Rice itanga amino acids zose 100%. 26.8g za poroteyine kuri scoop.'
    },
    highlights: {
      en: [
        'Lab-tested 81.3% high-purity protein content with complete amino acid profile',
        '26.8g Pure Protein per scoop',
        'Pioneer Formula: First company to execute this 70/30 synergy in practice for maximum muscle growth at an ideal price',
        '100% Complete Amino Acid Profile (PDCAAS = 1.0), Hypoallergenic & Lactose-Free'
      ],
      ar: [
        'نسبة بروتين ٨١.٣٪ ناتجة من واقع التحاليل المخبرية للمنتج مع ملف أحماض أمينية كامل',
        'السكوب المحتوي على ٢٦.٨ جم بروتين صافي',
        'أول شركة تطبق هذا الخليط (٧٠٪ بازلاء & ٣٠٪ أرز) على أرض الواقع لإنتاج ملف أحماض أمينية كامل بسعر مثالي',
        'كامل الأحماض الأمينية، خالٍ من اللاكتوز ومسببات الحساسية، سهل الهضم ومثالي للبناء العضلي'
      ],
      rw: [
        '81.3% za Poroteyine mu bizami bya laboratwari hamwe na amino acids zose',
        'Scoop irimo 26.8g za Poroteyine y’umwimerere',
        'Ikigo cya mbere gishyize mu bikorwa 70% Pea & 30% Rice mu biciro byiza',
        'Amino acids zose 100%, nta lactose, yoroshye mu igogorwa'
      ]
    },
    usage: {
      en: 'Mix 1 scoop (containing 26.8g protein) with 300ml of water or plant milk post-workout or as a high-protein supplement.',
      ar: 'يمزج مكيال واحد (يمنحك ٢٦.٨ جم بروتين) مع ٣٠٠ مل من الماء أو حليب النبات بعد التمرين مباشرة أو كوجبة بروتين.',
      rw: 'Vanga igipimo 1 (26.8g protein) n’amazi 300ml nyuma y’imyitozo.'
    },
    ingredients: {
      en: '70% Yellow Pea Protein Isolate (Lab-tested 81.3% protein total), 30% Whole Grain Brown Rice Protein, Natural Flavors, Stevia.',
      ar: '٧٠٪ بروتين البازلاء الصفراء المعزول (تركيز بروتين ٨١.٣٪ بالتحاليل)، ٣٠٪ بروتين الأرز البني الكامل، نكهات طبيعية، ستيفيا.',
      rw: '70% Pea Protein Isolate (81.3% protein in lab), 30% Rice Protein, Stevia.'
    },
    scienceNote: {
      en: 'Pea protein is exceptionally high in Lysine while Rice protein is rich in Methionine & Cysteine. The 70/30 synergy solves the plant amino acid bottleneck, resulting in a 26.8g protein scoop with 100% biological completeness.',
      ar: 'بروتين البازلاء غني جداً باللايسين، بينما بروتين الأرز غني بالميثيونين والسستين. التآزر ٧٠/٣٠ يحقق التوازن الكامل للأحماض الأمينية ليمنحك ٢٦.٨ جم بروتين في السكوب بأعلى قيمة حيوية.',
      rw: 'Pea protein ifite Lysine, Rice protein ifite Methionine. Guhuza 70/30 bitanga poroteyine yuzuye 26.8g kuri scoop.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS 81.3% Protein (70% Pea & 30% Rice).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن بروتين MGREFOTS 81.3% (70% بازلاء & 30% أرز).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri Poroteyine MGREFOTS 70/30.'
    }
  },
  {
    id: 'c-zinc',
    name: {
      en: 'MGREFOTS C-Zinc',
      ar: 'سي زنك MGREFOTS',
      rw: 'C-Zinc MGREFOTS'
    },
    subtitle: {
      en: '1000mg Vitamin C + 20mg Zinc Bisglycinate Immunity & Antioxidant Shield',
      ar: '١٠٠٠ مجم فيتامين سي + ٢٠ مجم زنك بيسجلايسينات لدرع المناعة والأكسدة',
      rw: 'Vitamine C (1000mg) + Zinc Bisglycinate (20mg) ku burinzi bwa immune'
    },
    category: 'immunity',
    badge: {
      en: '1000mg C + 20mg Zinc',
      ar: '١٠٠٠مجم سي + ٢٠مجم زنك',
      rw: '1000mg C + 20mg Zinc'
    },
    badgeColor: 'bg-blue-600 text-white',
    gradient: 'from-blue-700 via-sky-900 to-slate-950',
    accentColor: 'text-sky-400',
    iconName: 'ShieldAlert',
    price: '25,000 RWF',
    image: '/images/products/c-zinc.png',
    servings: '30 Servings',
    size: '30 Vegan Capsules',
    rating: 4.7,
    reviewsCount: 195,
    buyersCount: 980,
    description: {
      en: 'MGREFOTS C-Zinc combines 1000mg Vitamin C with 20mg highly bioavailable Zinc Bisglycinate Chelate. Fortifies white blood cell immune defenses, accelerates tissue & collagen repair, and counters oxidative stress.',
      ar: 'يجمع سي زنك MGREFOTS بين ١٠٠٠ مجم فيتامين سي مع ٢٠ مجم زنك بيسجلايسينات مخلبي عالي الامتصاص. يقوي الجهاز المناعي وخلايا الدم البيضاء، يدعم بناء الكولاجين للمفاصل والجلد، ويحمي الخلايا من الإجهاد التأكسدي.',
      rw: 'C-Zinc ya MGREFOTS ivanga 1000mg Vitamine C na 20mg Zinc Bisglycinate. Ifasha kugarura ubudahangarwa n’imikaya.'
    },
    highlights: {
      en: [
        '1000mg Vitamin C + 20mg Bioavailable Zinc Bisglycinate',
        'Enhances White Blood Cell immune response & systemic recovery',
        'Essential cofactor for collagen synthesis & joint tissue repair',
        'Protects against oxidative stress & muscular inflammation'
      ],
      ar: [
        '١٠٠٠ مجم فيتامين سي + ٢٠ مجم زنك بيسجلايسينات مخلبي عالي الامتصاص',
        'يعزز استجابة خلايا الدم البيضاء واستشفاء الجهاز المناعي',
        'عنصر محفز أساسي لتصنيع الكولاجين وترميم المفاصل والجلد',
        'يحمي الخلايا من الشوارد الحرة والالتهابات التأكسدية'
      ],
      rw: [
        '1000mg ya Vitamine C + 20mg za Zinc Bisglycinate',
        'Yongera ubudahangarwa bw’amaraso y’umweru',
        'Ifasha kubaka collagen no gukiza ingingo',
        'Irinda cells ubushyuhe n’ubulwayi'
      ]
    },
    usage: {
      en: 'Take 1 vegan capsule daily with a meal and water.',
      ar: 'تناول كبسولة واحدة يومياً مع الوجبة والماء.',
      rw: 'Fata capsule 1 buri munsi hamwe n’ifunguro n’amazi.'
    },
    ingredients: {
      en: 'Ascorbic Acid (1000mg Vitamin C), Zinc Bisglycinate Chelate (20mg Elemental Zinc), Vegetable Cellulose Capsule.',
      ar: 'حامض الأسكوربيك (١٠٠٠ مجم فيتامين سي)، زنك بيسجلايسينات مخلبي (٢٠ مجم زنك)، كبسولة سليلوز نباتية.',
      rw: 'Vitamine C 1000mg, Zinc Bisglycinate 20mg, Vegetable Capsule.'
    },
    scienceNote: {
      en: 'Vitamin C stimulates neutrophil migration to infection sites, while Zinc Bisglycinate regulates T-lymphocyte maturation without gastric distress. Together, they form a synergistic cellular shield.',
      ar: 'يحفز فيتامين سي حركة خلايا النيوتروفيل المناعية، بينما ينظم زنك بيسجلايسينات نضج خلايا T الليمفاوية بدون إجهاد للمعدة. ينشآن معاً درعاً خلوياً متآزراً.',
      rw: 'Vitamine C na Zinc Bisglycinate bikorera hamwe ku kurinda ubudahangarwa bwawe.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS C-Zinc (1000mg C + 20mg Zinc).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن سي زنك MGREFOTS (1000مجم سي + 20مجم زنك).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri C-Zinc MGREFOTS.'
    }
  },
  {
    id: 'b-complex',
    name: {
      en: 'MGREFOTS B-Complex',
      ar: 'بي كومبلكس MGREFOTS',
      rw: 'B-Complex MGREFOTS'
    },
    subtitle: {
      en: 'Complete High-Potency B-Vitamin Matrix + Vitamin C (60 Caps) • Iron Strength',
      ar: 'مجموعة فيتامين ب المركب عالي الفعالية + فيتامين سي (٦٠ كبسولة) • القوة الحديدية',
      rw: 'Vitamine B-Complex y’imbaraga nyinshi + Vitamine C (60 Caps)'
    },
    category: 'immunity',
    badge: {
      en: '60 Caps · Iron Strength',
      ar: '٦٠ كبسولة · القوة الحديدية',
      rw: '60 Caps · Iron Strength'
    },
    badgeColor: 'bg-purple-600 text-white',
    gradient: 'from-purple-700 via-indigo-900 to-slate-950',
    accentColor: 'text-purple-400',
    iconName: 'Zap',
    price: '50,000 RWF',
    image: '/images/products/b-complex.png',
    servings: '60 Servings',
    size: '60 Capsules',
    rating: 4.9,
    reviewsCount: 260,
    buyersCount: 1260,
    description: {
      en: 'MGREFOTS B-Complex (Iron Strength) offers a complete, ultra-potent blend of 8 essential B-Vitamins plus Vitamin C. Optimized for cellular energy conversion, nervous system support, red blood cell formation, and heavy athletic resilience.',
      ar: 'يقدم بي كومبلكس MGREFOTS (القوة الحديدية) تركيبة متكاملة وعالية التركيز تضم ٨ فيتامينات ب أساسية بالإضافة إلى فيتامين سي. مصممة لدعم تحويل الطاقة الخلوية، صحة الجهاز العصبي، تكوين خلايا الدم الحمراء، وتعزيز الصلابة العضلية.',
      rw: 'MGREFOTS B-Complex itanga vitamine B zose hamwe na Vitamine C. Ifasha kugarura ingufu mu selile, ubwonko, n’imitsi.'
    },
    highlights: {
      en: [
        'Complete B-Complex Spectrum + 60mg Vitamin C per capsule',
        'Vitamin B12 1000mcg (41,167% DV) & Biotin B7 1000mcg (3,333% DV)',
        'Folic Acid (DFE 680mcg), B1 (25mg), B2 (20mg), B3 (25mg), B5 (5.5mg), B6 (5mg)',
        'Non-GMO · Gluten Free · Soy Free'
      ],
      ar: [
        'طيف كامل من فيتامينات ب المركبة + ٦٠ مجم فيتامين سي لكل كبسولة',
        'فيتامين B12 بتركيز ١٠٠٠ ميكروجرام (٤١,١٦٧٪ DV) وبيوتين B7 بتركيز ١٠٠٠ ميكروجرام (٣,٣٣٣٪ DV)',
        'حمض الفوليك B9 (DFE 680mcg), B1 (25mg), B2 (20mg), B3 (25mg), B5 (5.5mg), B6 (5mg)',
        'خالٍ من الكائنات المعدلة وراثياً · خالٍ من الجلوتين · خالٍ من الصويا'
      ],
      rw: [
        'Vitamine B zose hamwe na 60mg Vitamine C ku capsule',
        'Vitamine B12 1000mcg & Biotin 1000mcg',
        'Folic Acid, B1, B2, B3, B5, B6 mu igipimo cyiza',
        'Non-GMO · Gluten Free · Soy Free'
      ]
    },
    usage: {
      en: 'Take 1 capsule daily with food and a glass of water.',
      ar: 'تناول كبسولة واحدة يومياً مع الوجبة وكوب من الماء.',
      rw: 'Fata capsule 1 buri munsi hamwe n’ifunguro n’amazi.'
    },
    ingredients: {
      en: 'Vitamin C (60mg), Vitamin B1 (25mg), Vitamin B2 (20mg), Niacin B3 (25mg), Pantothenic Acid B5 (5.5mg), Vitamin B6 (5mg), Biotin B7 (1000mcg), Folate B9 (DFE 680mcg), Vitamin B12 (1000mcg).',
      ar: 'فيتامين سي (٦٠ مجم)، فيتامين B1 (٢٥ مجم)، فيتامين B2 (٢٠ مجم)، نياسين B3 (٢٥ مجم)، حمض البانتوثنيك B5 (٥.٥ مجم)، فيتامين B6 (٥ مجم)، بيوتين B7 (١٠٠٠ ميكروجرام)، فولات B9 (DFE 680mcg)، فيتامين B12 (١٠٠٠ ميكروجرام).',
      rw: 'Vitamine C (60mg), Vitamine B1, B2, B3, B5, B6, Biotin B7, Folate B9, Vitamine B12.'
    },
    otherIngredients: {
      en: 'Gelatin, Sodium Lauryl Sulfate, Aerosil (Colloidal Silicon Dioxide), Titanium Dioxide (77891), Brilliant Blue (42090), Magnesium Stearate.',
      ar: 'جيلاتين، صوديوم لاوريل سلفات، ايروسيل (ثاني أكسيد السيليكون الغروي)، ثاني أكسيد التيتانيوم (77891)، بريليانت بلو (42090)، ماغنسيوم ستيرات.',
      rw: 'Gelatin, Sodium Lauryl Sulfate, Aerosil, Titanium Dioxide, Brilliant Blue, Magnesium Stearate.'
    },
    claims: ['Non-GMO', 'Gluten Free', 'Soy Free'],
    supplementFacts: [
      { ingredient: 'Vitamin C', amount: '60 mg', dv: '67%' },
      { ingredient: 'Vitamin B1 (Thiamine HCI)', amount: '25 mg', dv: '2,083%' },
      { ingredient: 'Vitamin B2 (Riboflavin)', amount: '20 mg', dv: '1,538%' },
      { ingredient: 'Vitamin B3 (Niacinamide)', amount: '25 mg', dv: '156%' },
      { ingredient: 'Vitamin B5 (Pantothenic Acid)', amount: '5.5 mg', dv: '110%' },
      { ingredient: 'Vitamin B6 (Pyridoxine HCI)', amount: '5 mg', dv: '294%' },
      { ingredient: 'Vitamin B7 (Biotin)', amount: '1000 mcg', dv: '3,333%' },
      { ingredient: 'Vitamin B9 (Folic Acid)', amount: 'DFE 680 mcg (400 mcg)', dv: '170%' },
      { ingredient: 'Vitamin B12 (Cyanocobalamin)', amount: '1000 mcg', dv: '41,167%' }
    ],
    scienceNote: {
      en: 'B-Vitamins act as essential coenzymes in cellular Krebs cycle energy production and neurotransmitter synthesis, while Vitamin C enhances systemic absorption and cellular antioxidant status.',
      ar: 'تعمل فيتامينات ب كإنزيمات مساعدة أساسية في دورة كريبس لإنتاج الطاقة الخلوية وتخليق النواقل العصبية، بينما يحسن فيتامين سي الامتصاص ومستوى حماية الخلايا.',
      rw: 'Vitamine B zifatanya na Vitamine C mu gukora ingufu mu selile n’ubwonko.'
    },
    whatsappText: {
      en: 'Hello MGREFOTS, I would like to order or inquire about MGREFOTS B-Complex (60 Capsules).',
      ar: 'مرحباً MGREFOTS، أرغب في طلب أو الاستفسار عن بي كومبلكس MGREFOTS (60 كبسولة).',
      rw: 'Mwaramutse MGREFOTS, ndashaka kugura cyangwa kubaza kuri B-Complex MGREFOTS.'
    }
  }
];

const PRODUCT_UPDATES: Record<string, Partial<Product>> = {
  "creatine-monohydrate": {
    "name": {
      "en": "MGREFOTS Creatine Monohydrate",
      "ar": "كرياتين مونوهيدرات MGREFOTS",
      "rw": "MGREFOTS Creatine Monohydrate"
    },
    "subtitle": {
      "en": "99.8% · 200 Mesh",
      "ar": "99.8% · 200 Mesh",
      "rw": "99.8% · 200 Mesh"
    },
    "badge": {
      "en": "99.8% · 200 Mesh",
      "ar": "99.8% · 200 Mesh",
      "rw": "99.8% · 200 Mesh"
    },
    "size": "300g Powder",
    "isSoldOut": false,
    "description": {
      "en": "MGREFOTS Creatine Monohydrate. 300g Powder. Creatine monohydrate. 5g per serving, 60 servings.",
      "ar": "كرياتين مونوهيدرات MGREFOTS. 300g Powder. Creatine monohydrate. 5g per serving, 60 servings.",
      "rw": "MGREFOTS Creatine Monohydrate. 300g Powder. Creatine monohydrate. 5g per serving, 60 servings."
    },
    "highlights": {
      "en": [
        "300g Powder",
        "Creatine monohydrate. 5g per serving, 60 servings."
      ],
      "ar": [
        "300g Powder",
        "Creatine monohydrate. 5g per serving, 60 servings."
      ],
      "rw": [
        "300g Powder",
        "Creatine monohydrate. 5g per serving, 60 servings."
      ]
    },
    "ingredients": {
      "en": "Creatine monohydrate. 5g per serving, 60 servings.",
      "ar": "Creatine monohydrate. 5g per serving, 60 servings.",
      "rw": "Creatine monohydrate. 5g per serving, 60 servings."
    },
    "usage": {
      "en": "Follow the directions on the product packaging.",
      "ar": "اتبع تعليمات الاستخدام المدونة على العبوة.",
      "rw": "Follow the directions on the product packaging."
    },
    "scienceNote": {
      "en": "See the product packaging for the complete product information.",
      "ar": "راجع العبوة للحصول على معلومات المنتج الكاملة.",
      "rw": "See the product packaging for the complete product information."
    },
    "whatsappText": {
      "en": "Hello, I would like to ask about MGREFOTS Creatine Monohydrate.",
      "ar": "مرحباً، أود الاستفسار عن كرياتين مونوهيدرات MGREFOTS.",
      "rw": "Hello, I would like to ask about MGREFOTS Creatine Monohydrate."
    },
    "image": "/images/products/creatine-monohydrate-oct2026.webp"
  },
  "citrulline": {
    "name": {
      "en": "MGREFOTS L-Citrulline",
      "ar": "إل سيترولين MGREFOTS",
      "rw": "MGREFOTS L-Citrulline"
    },
    "subtitle": {
      "en": "99.3% · 150g",
      "ar": "99.3% · 150g",
      "rw": "99.3% · 150g"
    },
    "badge": {
      "en": "99.3% · 150g",
      "ar": "99.3% · 150g",
      "rw": "99.3% · 150g"
    },
    "size": "150g Powder",
    "isSoldOut": false,
    "description": {
      "en": "MGREFOTS L-Citrulline. 150g Powder. L-Citrulline. 5g per serving, 30 servings.",
      "ar": "إل سيترولين MGREFOTS. 150g Powder. L-Citrulline. 5g per serving, 30 servings.",
      "rw": "MGREFOTS L-Citrulline. 150g Powder. L-Citrulline. 5g per serving, 30 servings."
    },
    "highlights": {
      "en": [
        "150g Powder",
        "L-Citrulline. 5g per serving, 30 servings."
      ],
      "ar": [
        "150g Powder",
        "L-Citrulline. 5g per serving, 30 servings."
      ],
      "rw": [
        "150g Powder",
        "L-Citrulline. 5g per serving, 30 servings."
      ]
    },
    "ingredients": {
      "en": "L-Citrulline. 5g per serving, 30 servings.",
      "ar": "L-Citrulline. 5g per serving, 30 servings.",
      "rw": "L-Citrulline. 5g per serving, 30 servings."
    },
    "usage": {
      "en": "Follow the directions on the product packaging.",
      "ar": "اتبع تعليمات الاستخدام المدونة على العبوة.",
      "rw": "Follow the directions on the product packaging."
    },
    "scienceNote": {
      "en": "See the product packaging for the complete product information.",
      "ar": "راجع العبوة للحصول على معلومات المنتج الكاملة.",
      "rw": "See the product packaging for the complete product information."
    },
    "whatsappText": {
      "en": "Hello, I would like to ask about MGREFOTS L-Citrulline.",
      "ar": "مرحباً، أود الاستفسار عن إل سيترولين MGREFOTS.",
      "rw": "Hello, I would like to ask about MGREFOTS L-Citrulline."
    },
    "image": "/images/products/citrulline-oct2026.webp"
  },
  "l-carnitine": {
    "name": {
      "en": "MEPACO L-Carnitine",
      "ar": "إل كارنيتين ميباكو",
      "rw": "MEPACO L-Carnitine"
    },
    "subtitle": {
      "en": "350mg · 30 Capsules",
      "ar": "350mg · 30 Capsules",
      "rw": "350mg · 30 Capsules"
    },
    "badge": {
      "en": "350mg · 30 Capsules",
      "ar": "350mg · 30 Capsules",
      "rw": "350mg · 30 Capsules"
    },
    "size": "30 Hard Gelatin Capsules",
    "isSoldOut": false,
    "description": {
      "en": "MEPACO L-Carnitine. 30 Hard Gelatin Capsules. L-Carnitine 350mg per capsule.",
      "ar": "إل كارنيتين ميباكو. 30 Hard Gelatin Capsules. L-Carnitine 350mg per capsule.",
      "rw": "MEPACO L-Carnitine. 30 Hard Gelatin Capsules. L-Carnitine 350mg per capsule."
    },
    "highlights": {
      "en": [
        "30 Hard Gelatin Capsules",
        "L-Carnitine 350mg per capsule."
      ],
      "ar": [
        "30 Hard Gelatin Capsules",
        "L-Carnitine 350mg per capsule."
      ],
      "rw": [
        "30 Hard Gelatin Capsules",
        "L-Carnitine 350mg per capsule."
      ]
    },
    "ingredients": {
      "en": "L-Carnitine 350mg per capsule.",
      "ar": "L-Carnitine 350mg per capsule.",
      "rw": "L-Carnitine 350mg per capsule."
    },
    "usage": {
      "en": "Follow the directions on the product packaging.",
      "ar": "اتبع تعليمات الاستخدام المدونة على العبوة.",
      "rw": "Follow the directions on the product packaging."
    },
    "scienceNote": {
      "en": "See the product packaging for the complete product information.",
      "ar": "راجع العبوة للحصول على معلومات المنتج الكاملة.",
      "rw": "See the product packaging for the complete product information."
    },
    "whatsappText": {
      "en": "Hello, I would like to ask about MEPACO L-Carnitine.",
      "ar": "مرحباً، أود الاستفسار عن إل كارنيتين ميباكو.",
      "rw": "Hello, I would like to ask about MEPACO L-Carnitine."
    },
    "image": "/images/products/l-carnitine-oct2026.webp",
    "servings": "30 Capsules"
  },
  "c-zinc": {
    "name": {
      "en": "C Zinc",
      "ar": "سي زنك",
      "rw": "C Zinc"
    },
    "subtitle": {
      "en": "500mg Vitamin C · 12.5mg Zinc",
      "ar": "500mg Vitamin C · 12.5mg Zinc",
      "rw": "500mg Vitamin C · 12.5mg Zinc"
    },
    "badge": {
      "en": "500mg Vitamin C · 12.5mg Zinc",
      "ar": "500mg Vitamin C · 12.5mg Zinc",
      "rw": "500mg Vitamin C · 12.5mg Zinc"
    },
    "size": "30 Hard Gelatin Capsules",
    "isSoldOut": false,
    "description": {
      "en": "C Zinc. 30 Hard Gelatin Capsules. Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule.",
      "ar": "سي زنك. 30 Hard Gelatin Capsules. Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule.",
      "rw": "C Zinc. 30 Hard Gelatin Capsules. Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule."
    },
    "highlights": {
      "en": [
        "30 Hard Gelatin Capsules",
        "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule."
      ],
      "ar": [
        "30 Hard Gelatin Capsules",
        "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule."
      ],
      "rw": [
        "30 Hard Gelatin Capsules",
        "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule."
      ]
    },
    "ingredients": {
      "en": "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule.",
      "ar": "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule.",
      "rw": "Vitamin C 500mg; zinc bisglycinate 62.5mg, equivalent to elemental zinc 12.5mg per capsule."
    },
    "usage": {
      "en": "Follow the directions on the product packaging.",
      "ar": "اتبع تعليمات الاستخدام المدونة على العبوة.",
      "rw": "Follow the directions on the product packaging."
    },
    "scienceNote": {
      "en": "See the product packaging for the complete product information.",
      "ar": "راجع العبوة للحصول على معلومات المنتج الكاملة.",
      "rw": "See the product packaging for the complete product information."
    },
    "whatsappText": {
      "en": "Hello, I would like to ask about C Zinc.",
      "ar": "مرحباً، أود الاستفسار عن سي زنك.",
      "rw": "Hello, I would like to ask about C Zinc."
    },
    "image": "/images/products/c-zinc-oct2026.webp",
    "servings": "30 Capsules"
  }
};

PRODUCT_UPDATES['creatine-monohydrate'].price = '50,000 RWF';
PRODUCT_UPDATES['c-zinc'].price = '27,000 RWF';
PRODUCT_UPDATES['l-carnitine'].price = '40,000 RWF';

export const PRODUCTS: Product[] = ORIGINAL_PRODUCTS.map(product => PRODUCT_UPDATES[product.id] ? { ...product, ...PRODUCT_UPDATES[product.id] } : { ...product, isSoldOut: true });
PRODUCTS.push({
  "id": "milga-advance",
  "name": {
    "en": "Milga Advance",
    "ar": "ميلجا أدفانس",
    "rw": "Milga Advance"
  },
  "subtitle": {
    "en": "30 Film Coated Tablets",
    "ar": "٣٠ قرص مغلف",
    "rw": "30 Film Coated Tablets"
  },
  "category": "immunity",
  "badge": {
    "en": "30 Tablets",
    "ar": "٣٠ قرص",
    "rw": "30 Tablets"
  },
  "badgeColor": "bg-red-700 text-white",
  "gradient": "from-red-700 via-blue-900 to-slate-950",
  "accentColor": "text-red-400",
  "iconName": "Zap",
  "price": "50,000 RWF",
  "image": "/images/products/milga-advance-oct2026.webp",
  "servings": "30 Tablets",
  "size": "30 Film Coated Tablets",
  "rating": 0,
  "reviewsCount": 0,
  "buyersCount": 0,
  "description": {
    "en": "Milga Advance by EVA Pharma. 30 film coated tablets.",
    "ar": "ميلجا أدفانس من إيفا فارما. ٣٠ قرص مغلف.",
    "rw": "Milga Advance by EVA Pharma. 30 film coated tablets."
  },
  "highlights": {
    "en": [
      "Benfotiamine 300mg",
      "Vitamin B6 100mg",
      "Vitamin B12 250mcg"
    ],
    "ar": [
      "Benfotiamine 300mg",
      "Vitamin B6 100mg",
      "Vitamin B12 250mcg"
    ],
    "rw": [
      "Benfotiamine 300mg",
      "Vitamin B6 100mg",
      "Vitamin B12 250mcg"
    ]
  },
  "usage": {
    "en": "Follow the product leaflet or pharmacist’s directions.",
    "ar": "اتبع النشرة الداخلية أو تعليمات الصيدلي.",
    "rw": "Follow the product leaflet or pharmacist’s directions."
  },
  "ingredients": {
    "en": "Benfotiamine 300mg, vitamin B6 100mg, vitamin B12 250mcg.",
    "ar": "بنفوتيامين ٣٠٠ مجم، فيتامين ب٦ ١٠٠ مجم، فيتامين ب١٢ ٢٥٠ ميكروجرام.",
    "rw": "Benfotiamine 300mg, vitamin B6 100mg, vitamin B12 250mcg."
  },
  "scienceNote": {
    "en": "See the product leaflet for complete information.",
    "ar": "راجع النشرة الداخلية لمعلومات المنتج الكاملة.",
    "rw": "See the product leaflet for complete information."
  },
  "whatsappText": {
    "en": "Hello, I would like to ask about Milga Advance.",
    "ar": "مرحباً، أود الاستفسار عن ميلجا أدفانس.",
    "rw": "Hello, I would like to ask about Milga Advance."
  }
});
