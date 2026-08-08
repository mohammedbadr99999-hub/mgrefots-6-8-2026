import { Language } from '../types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav_home: "Products",
    nav_analysis: "InBody Analysis",
    nav_supps: "Supplement Encyclopedia",
    nav_knowledge: "Knowledge Center",
    nav_chat: "Talk to Coach",
    
    hero_products_title: "MGREFOTS Ltd. | Premier Sports Nutrition Brand",
    hero_products_sub: "MGREFOTS Ltd. is a specialized sports nutrition brand dedicated to developing, manufacturing, and marketing high-quality, science-backed dietary supplements for Africa and the Middle East (Rwanda & Egypt). Integrated with free body analysis to support your goals.",
    free_banner: "🌟 All body analyses & expert consultations are free supportive tools by MGREFOTS Ltd.!",
    login_guest_btn: "Enter Store as Guest (Free)",
    guest_tag: "Guest Active",
    
    filter_all: "All Products",
    filter_power: "Power & Strength",
    filter_pump: "Nitric Oxide Pump",
    filter_energy: "Fat Burn & Energy",
    filter_protein: "Plant Protein",
    filter_immunity: "Immunity & Health",
    
    btn_order_whatsapp: "Order via WhatsApp",
    btn_view_specs: "View Specs & Science",
    btn_ask_ai: "Ask Coach",
    btn_ask_coach: "Ask Coach",
    coach_sub_name: "Mohamed Zeina",
    btn_close: "Close",
    
    modal_ingredients: "Key Ingredients & Formula",
    modal_usage: "Recommended Dosage & Timing",
    modal_science: "NASM Science & Physiology",
    modal_ask_ai_title: "Consult Coach Mohamed Zeina about integrating this product into your routine",
    modal_ai_placeholder: "e.g., How should I combine this with my workout schedule for fast results?",
    modal_ai_btn: "Ask Coach Mohamed Zeina",
    
    analysis_title: "MGREFOTS InBody Analysis Service",
    analysis_subtitle: "A value-added feature by MGREFOTS Ltd.: Upload your InBody scan and state your goal. Our NASM-trained system will generate a personalized supplement strategy.",
    upload_placeholder: "Select InBody file (PDF, JPG, PNG)",
    goal_label: "What is your main fitness goal?",
    btn_analyze: "✨ Generate Custom Plan",
    support_files: "Supports PDF, JPG, PNG",
    pdf_ready: "PDF Report Ready for Download",
    download_pdf: "📥 Download Full PDF Report",
    
    supps_title: "Supplement Encyclopedia",
    supps_subtitle: "Click any nutrient or supplement for instant deep scientific analysis.",
    click_to_analyze: "Click for Scientific Analysis",
    
    chat_title: "Direct Expert Consultation",
    chat_desc: "Get immediate science-based advice trained on NASM methodology and Coach Mohamed Zeina's 13+ years of fitness experience.",
    chat_placeholder: "Ask anything about training split, diet macros, supplement timing...",
    chat_btn: "✨ Send to Coach Mohamed Zeina",
    contact_expert_direct: "Contact Mohamed Zeina Directly",
    
    nutrients_title: "Nutritional Components Breakdown",
    nutrients_legend_essential: "Essential = Engine & Fuel",
    nutrients_legend_non: "Non-Essential = Internal Systems",
    nutrients_legend_cond: "Conditional = Turbo Boost 🔥",
    ess_title: "Essential Nutrients",
    ess_sub: "~44 elements the human body cannot synthesize",
    ess_desc: "These elements are your body's 'Engine & Fuel'. The body cannot synthesize them at all. Without daily supply from food or targeted intake, vital processes decline.",
    ess_macro_title: "Macronutrients",
    ess_macros_list: [
      { name: "Water (Hydration)", desc: "The medium for all vital chemical reactions. Just a 2% drop in hydration reduces performance by up to 20%." },
      { name: "Carbohydrates", desc: "Primary energy source stored as muscle glycogen. Fuel for heavy lifting and preventing protein breakdown." },
      { name: "Protein", desc: "Essential amino acids responsible for repairing muscle tissue after intensive resistance training." },
      { name: "Healthy Fats", desc: "Essential precursor for anabolic hormones like Testosterone, joint lubrication, and membrane integrity." }
    ],
    ess_amino_title: "The 9 Essential Amino Acids",
    amino_list_detailed: [
      { name: "Leucine", desc: "The primary molecular trigger (mTOR pathway) for muscle protein synthesis." },
      { name: "Isoleucine", desc: "Regulates blood glucose and fuels muscular stamina during training." },
      { name: "Valine", desc: "Prevents muscle catabolism and delays central nervous system fatigue." },
      { name: "Histidine", desc: "Crucial for tissue repair and precursor to histamine for immune defense." },
      { name: "Lysine", desc: "Enhances calcium absorption and collagen formation for joints." },
      { name: "Methionine", desc: "Essential precursor for endogenous creatine production." },
      { name: "Phenylalanine", desc: "Synthesizes dopamine and epinephrine for intense mental focus." },
      { name: "Threonine", desc: "Maintains ligament elasticity and cardiovascular health." },
      { name: "Tryptophan", desc: "Converts to serotonin and melatonin for deep recovery sleep." }
    ],
    non_title: "Non-Essential Nutrients",
    non_sub: "Elements synthesized internally by the body",
    non_desc: "Your body can synthesize these internally. However, optimal supplemental amounts maximize peak performance under heavy physical demands.",
    non_list_detailed: [
      { name: "Creatine", desc: "Rapidly recycles ATP energy during explosive lifting.", icon: "⚡" },
      { name: "Alanine", desc: "Transports nitrogen from muscles to liver during intense effort.", icon: "🧬" },
      { name: "Taurine", desc: "Drives cellular hydration and enhances muscle contraction speed.", icon: "💧" },
      { name: "Cholesterol", desc: "Raw material for testosterone production and cellular walls.", icon: "🛡️" }
    ],
    cond_title: "Conditionally Essential Nutrients",
    cond_sub: "The Turbo Boost for Athletes",
    cond_desc: "During intense physical stress or heavy lifting, internal production falls short. Targeted supplementation acts as a turbo boost.",
    cond_cats: [
      { title: "Recovery & Anti-Catabolism", icon: "🩹", color: "text-red-600", bg: "bg-red-50", items: [{name: "Glutamine", desc: "Speeds up muscle recovery and flushes metabolic waste."}, {name: "Arginine", desc: "Converts to Nitric Oxide for intense muscle vascularity."}] },
      { title: "Mental Focus & Drive", icon: "🧠", color: "text-blue-600", bg: "bg-blue-50", items: [{name: "Tyrosine", desc: "Precursor to adrenaline for sharp focus under stress."}, {name: "Choline", desc: "Sharpens the Mind-Muscle Connection during heavy sets."}] },
      { title: "Power & Endurance", icon: "🔥", color: "text-orange-600", bg: "bg-orange-50", items: [{name: "Beta-Alanine", desc: "Buffers lactic acid to delay muscle burn."}, {name: "Proline", desc: "Builds collagen for bulletproof joint and tendon strength."}] }
    ],
    nutrient_chat_title: "Have a question about this section?",
    nutrient_chat_placeholder: "Ask your question here for an instant expert breakdown...",
    nutrient_chat_btn: "Ask Expert Coach",
    
    footer_rights: "© 2026 MGREFOTS LTD. All rights reserved.",
    footer_tagline: "MGREFOTS Ltd. — Premier Sports Nutrition & High-Performance Athletic Supplements Brand across Africa & Middle East (Rwanda & Egypt)."
  },
  ar: {
    nav_home: "المنتجات",
    nav_analysis: "تحليل InBody",
    nav_supps: "موسوعة المكملات",
    nav_knowledge: "المكتبة المعرفية",
    nav_chat: "تحدث مع الكابتن",
    
    hero_products_title: "شركة MGREFOTS Ltd. | التغذية الرياضية والمكملات الغذائية الاحترافية",
    hero_products_sub: "MGREFOTS Ltd. هي علامة تجارية متخصصة في تطوير وتصنيع وتسويق المكملات الغذائية الرياضية عالية الجودة والمصممة على أحدث الأسس العلمية، وتستهدف أسواق أفريقيا والشرق الأوسط، مع تواجدها المباشر ومقرها في رواندا ومصر. مع توفير أداة تحليل InBody كخدمة مضافة لدعم أهداف الرياضيين.",
    free_banner: "🌟 تحليلات الـ InBody والاستشارات هي خدمات مساندة مضافة ومجانية من شركة MGREFOTS Ltd.!",
    login_guest_btn: "دخول متجر المنتجات (مجاناً)",
    guest_tag: "زائر نشط",
    
    filter_all: "جميع المنتجات",
    filter_power: "القوة والضخامة",
    filter_pump: "ضخ الدم (Pump)",
    filter_energy: "حرق الدهون والطاقة",
    filter_protein: "بروتين نباتي كامل",
    filter_immunity: "المناعة والصحة",
    
    btn_order_whatsapp: "طلب عبر واتساب",
    btn_view_specs: "التفاصيل والتكوين العلمي",
    btn_ask_ai: "اسأل الكابتن",
    btn_ask_coach: "اسأل الكابتن",
    coach_sub_name: "Mohamed Zeina",
    btn_close: "إغلاق",
    
    modal_ingredients: "المكونات الرئيسية والتركيبة",
    modal_usage: "الجرعة المقترحة والتوقيت",
    modal_science: "الأساس العلمي والفيزيولوجي (NASM)",
    modal_ask_ai_title: "استشر كابتن محمد زينة حول كيفية دمج هذا المنتج في نظامك",
    modal_ai_placeholder: "مثال: كيف أدمج هذا المكمل مع تماريني للحصول على أسرع نتيجة؟",
    modal_ai_btn: "تحدث مع كابتن محمد زينة",
    
    analysis_title: "خدمة تحليل InBody من MGREFOTS",
    analysis_subtitle: "إحدى الخدمات التكنولوجية المضافة من شركة MGREFOTS Ltd.: ارفع نتيجة InBody الخاصة بك واكتب هدفك، وسيقوم النظام المطور وفق منهجية NASM بتحديد خطة المكملات والبرنامج المناسب لجسمك.",
    upload_placeholder: "اختر ملف الـ InBody (PDF / JPG / PNG)",
    goal_label: "ما هو هدفك الرياضي؟ (مثال: خسارة دهون، زيادة عضل)",
    btn_analyze: "✨ صمم خطتي الآن",
    support_files: "يدعم PDF, JPG, PNG",
    pdf_ready: "تقرير الـ PDF جاهز للتحميل",
    download_pdf: "📥 تحميل التقرير الكامل (PDF)",
    
    supps_title: "موسوعة المكملات الشاملة",
    supps_subtitle: "اضغط على أي مكمل لشرح فوائده العلمية وجرعاته لك فوراً.",
    click_to_analyze: "اضغط للتحليل بالتفصيل",
    
    chat_title: "استشارة الكابتن المباشرة",
    chat_desc: "نظام استشارة متدرب على خبرات كابتن محمد زينة المعتمدة من NASM لأكثر من ١٣ عاماً.",
    chat_placeholder: "اسأل أي سؤال عن التغذية، التمارين، المكملات، الجرعات...",
    chat_btn: "✨ تواصل مع كابتن محمد زينة",
    contact_expert_direct: "تحدث مع كابتن محمد زينة مباشرة",
    
    nutrients_title: "العناصر الغذائية المكونة للمكملات",
    nutrients_legend_essential: "الأساسي = الموتور والبنزين",
    nutrients_legend_non: "غير الأساسي = الأنظمة الداخلية",
    nutrients_legend_cond: "الشرطي = التيربو 🔥",
    ess_title: "العناصر الأساسية (Essential)",
    ess_sub: "~٤٤ عنصر لا يستطيع الجسم تصنيعها",
    ess_desc: "هذه العناصر هي «الموتور والبنزين» لجسمك. لا يستطيع الجسم تصنيعها نهائياً، وبدون توفيرها يومياً من الغذاء، تتوقف العمليات الحيوية ويبدأ الهدم العضلي وتتراجع مستويات الطاقة فوراً.",
    ess_macro_title: "المغذيات الكبرى (Macronutrients)",
    ess_macros_list: [
      { name: "الماء (Hydration)", desc: "الوسط السحري الذي تتم فيه كل التفاعلات الكيميائية وحرق الدهون. الجفاف بنسبة 2% فقط يهبط بقوتك وأدائك بنسبة تصل لـ 20%." },
      { name: "الكربوهيدرات (Carbs)", desc: "المصدر الأول والأسرع للطاقة (يُخزن كجلايكوجين). بدونها لن تجد الوقود اللازم لرفع أوزان ثقيلة بكفاءة وسيبدأ الجسم بتكسير العضلات." },
      { name: "البروتين (Protein)", desc: "أحجار البناء الأساسية (الأحماض الأمينية) المسؤولة عن إصلاح الألياف العضلية الممزقة بعد التمرين وتكوين الإنزيمات الحيوية." },
      { name: "الدهون الصحية (Fats)", desc: "المصنع الأساسي لإنتاج الهرمونات البنائية (مثل التستوستيرون)، والمسؤولة عن صحة المفاصل وامتصاص الفيتامينات." }
    ],
    ess_amino_title: "الأحماض الأمينية الأساسية الـ 9",
    amino_list_detailed: [
      { name: "ليوسين (Leucine)", desc: "المفتاح السحري (mTOR) الذي يطلق شرارة البناء العضلي بشكل مباشر." },
      { name: "آيزوليوسين (Isoleucine)", desc: "ينظم مستويات سكر الدم ويولد الطاقة بقوة أثناء التمرين." },
      { name: "فالين (Valine)", desc: "يمنع تكسير العضلات ويقلل الإرهاق العصبي المركزي." },
      { name: "هيسـتيدين (Histidine)", desc: "أساسي لإصلاح الأنسجة وتصنيع الهيستامين (للمناعة)." },
      { name: "لايسين (Lysine)", desc: "يعزز امتصاص الكالسيوم ويبني بروتين الكولاجين للمفاصل." },
      { name: "ميثيونين (Methionine)", desc: "حجر الأساس لتكوين الكرياتين ومضاد أكسدة جبار." },
      { name: "فينيل ألانين (Phenylalanine)", desc: "يصنع النواقل العصبية لزيادة التركيز واليقظة الذهنية." },
      { name: "ثريونين (Threonine)", desc: "يحافظ على قوة الأربطة والأنسجة الضامة وصحة القلب." },
      { name: "تربتوفان (Tryptophan)", desc: "يتحول لميلاتونين وسيروتونين لضمان جودة نوم وعمق استشفاء." }
    ],
    non_title: "العناصر غير الأساسية (Non-essential)",
    non_sub: "عناصر يستطيع الجسم تصنيعها داخليًا",
    non_desc: "يصنعها جسمك داخلياً من مواد أخرى، لذا لا يشترط أخذها من الغذاء. لكن توافرها الكافي والمدروس يحدد 'جودة ورفاهية' أدائك ويقلل العبء على الأعضاء الداخلية.",
    non_list_detailed: [
      { name: "الكرياتين (Creatine)", desc: "يعيد تدوير طاقة ATP في أول 10 ثوانٍ من الرفع الثقيل، مما يمنحك التكرارات الإضافية الحاسمة التي تبني العضلات.", icon: "⚡" },
      { name: "الألانين (Alanine)", desc: "يعمل كناقل للنيتروجين والسموم من العضلات إلى الكبد أثناء المجهود الشاق، لحمايتك من الإرهاق المبكر.", icon: "🧬" },
      { name: "التورين (Taurine)", desc: "يسحب السوائل لداخل الخلية العضلية (ترطيب خلوي) ويحسن قوة وسرعة الانقباض العضلي.", icon: "💧" },
      { name: "الكوليسترول (Cholesterol)", desc: "المادة الخام الأساسية التي يصنع منها جسمك هرمون الذكورة (التستوستيرون) وجدار الخلايا.", icon: "🛡️" }
    ],
    cond_title: "العناصر الشرطية (Conditionally Essential)",
    cond_sub: "أهم فئة للاعبي الجيم (التيربو)",
    cond_desc: "في أوقات الراحة، يصنعها الجسم بكفاءة. لكن تحت الضغط البدني القاسي (التمارين العنيفة)، يعجز الجسم عن تلبية الاحتياج الهائل، وهنا تلعب المكملات دور «التيربو» لدفعك لمستوى النخبة.",
    cond_cats: [
      { title: "فئة التعافي ومنع الهدم العضلي", icon: "🩹", color: "text-red-600", bg: "bg-red-50", items: [{name: "الجلوتامين (Glutamine)", desc: "الحمض الأكثر وفرة، يُستنزف بشدة أثناء التمرين. تناوله يسرع الاستشفاء ويطرد الأمونيا السامة."}, {name: "الأرجينين (Arginine)", desc: "يتحول لـ Nitric Oxide داخل الدم، مما يوسع الأوعية الدموية ويسبب ضخ دم خرافي (Pump)."}] },
      { title: "فئة الأداء الذهني والتركيز", icon: "🧠", color: "text-blue-600", bg: "bg-blue-50", items: [{name: "التيروزين (Tyrosine)", desc: "يُستخدم لصناعة الدوبامين والأدرينالين لضمان بقاء تركيزك حاداً تحت الضغط البدني."}, {name: "الكولين (Choline)", desc: "ينقي الاتصال العضلي العصبي (Mind-Muscle Connection) لضمان تجنيد أكبر عدد من الألياف."}] },
      { title: "فئة القوة وتأخير التعب", icon: "🔥", color: "text-orange-600", bg: "bg-orange-50", items: [{name: "بيتا ألانين (Beta-Alanine)", desc: "يتحد مع الهيستيدين لصنع الكارنوزين، الذي يسحب حمض اللاكتيك لتأخير حرقان العضلة."}, {name: "البرولين (Proline)", desc: "يعمل جنباً إلى جنب مع فيتامين سي لإنتاج الكولاجين، لبناء مفاصل وأوتار مضادة للرصاص."}] }
    ],
    nutrient_chat_title: "لديك استفسار حول هذا القسم؟",
    nutrient_chat_placeholder: "اكتب سؤالك هنا وسيجيبك الخبير بالتفصيل فوراً...",
    nutrient_chat_btn: "اسأل الكابتن",
    
    footer_rights: "© ٢٠٢٦ MGREFOTS LTD. جميع الحقوق محفوظة.",
    footer_tagline: "شركة MGREFOTS Ltd. — العلامة التجارية الرائدة في التغذية الرياضية والمكملات الغذائية الاحترافية في الشرق الأوسط وأفريقيا (رواندا ومصر)."
  },
  rw: {
    nav_home: "Ibyakozwe",
    nav_analysis: "Isuzuma rya InBody",
    nav_supps: "Inyongeramirire",
    nav_knowledge: "Shakisha Ubumenyi",
    nav_chat: "Vugisha Coach",
    
    hero_products_title: "MGREFOTS Ltd. | Inyongeramirire z'Ubuhanga",
    hero_products_sub: "MGREFOTS Ltd. ni sosiyete yihariye mu gukora, gutunganya n'icuruza rya inyongeramirire z'ubuhanga mu myitozo muri Afirika n'Iburasirazuba bwo Hafi (Rwanda & Misiri). Tukanakugeza ho n'isuzuma rya InBody.",
    free_banner: "🌟 Isuzuma rya InBody n'inshuti ni serivisi y'inyongera y'ubuntu ya MGREFOTS Ltd.!",
    login_guest_btn: "Injira mu Duka nk'Umushyitsi (Ubuntu)",
    guest_tag: "Umushyitsi",
    
    filter_all: "Ibyakozwe Byose",
    filter_power: "Ingufu n'Imikaya",
    filter_pump: "Umuvuduko w'Amaraso (Pump)",
    filter_energy: "Gutwika Ibinure",
    filter_protein: "Poroteyine y'Imera",
    filter_immunity: "Ubudahangangwa",
    
    btn_order_whatsapp: "Gura kuri WhatsApp",
    btn_view_specs: "Ubusobanuro bwimbitse",
    btn_ask_ai: "Baza Coach",
    btn_ask_coach: "Baza Coach",
    coach_sub_name: "Mohamed Zeina",
    btn_close: "Funga",
    
    modal_ingredients: "Ibiyigize n'Ingano",
    modal_usage: "Gahunda yo kunywa",
    modal_science: "Ubusobanuro bwa Gihanga (NASM)",
    modal_ask_ai_title: "Baza Coach Mohamed Zeina uko wabyoresha mu myitozo yawe",
    modal_ai_placeholder: "Andika ikibazo cyawe hano...",
    modal_ai_btn: "Baza Coach Mohamed Zeina",
    
    analysis_title: "Serivisi ya MGREFOTS yo Gusuzuma Umubiri",
    analysis_subtitle: "Serivisi y'inyongera ya MGREFOTS Ltd.: Shyiraho InBody yawe uone uko ushobora gukoresha inyongeramirire neza.",
    upload_placeholder: "Hitamo InBody (PDF/JPG/PNG)",
    goal_label: "Intego yawe ni iyihe?",
    btn_analyze: "✨ Kora Gahunda Yanjye",
    support_files: "Dushyigikiye PDF, JPG, PNG",
    pdf_ready: "Raporo ya PDF Yabonetse",
    download_pdf: "📥 Manura Raporo Yose (PDF)",
    
    supps_title: "Inyongeramirire",
    supps_subtitle: "Kanda ku nyongeramirire yose, ubone ibisobanuro byimbitse.",
    click_to_analyze: "Kanda urebe",
    
    chat_title: "Inama z'Inzobere",
    chat_desc: "Sisitimu yatojwe ubuhanga bwa Mohamed Zeina.",
    chat_placeholder: "Baza ikibazo cyawe...",
    chat_btn: "✨ Ohereza ku Nzubere",
    contact_expert_direct: "Vugisha Mohamed Zeina moja kwa moja",
    
    nutrients_title: "Ibigize Inyongeramirire",
    nutrients_legend_essential: "Iby'ibanze = Moteri",
    nutrients_legend_non: "Ibitari iby'ibanze = Sisitemu",
    nutrients_legend_cond: "Iby'ibihe byihariye = Turbo 🔥",
    ess_title: "Intungamubiri z'Ibanze",
    ess_sub: "~44 umubiri udashobora kwikorera",
    ess_desc: "Umubiri udashobora gukora. Tugomba kubikura mu biribwa kuko ariyo moteri y'umubiri.",
    ess_macro_title: "Intungamubiri Nini",
    ess_macros_list: [
      { name: "Amazi", desc: "Isoko y'imbaraga. Kugabanuka kwayo 2% bigabanya imbaraga zawe 20%." },
      { name: "Ibinyasukari", desc: "Isoko y'imbaraga zihuse kugira ngo ubashe guterura ibyuma biremereye." },
      { name: "Poroteyine", desc: "Kubaka no gukiza imikaya nyuma y'imyitozo ikomeye." },
      { name: "Ibinure Biza", desc: "Bikora imisemburo nka Testosterone kandi bifasha ingingo." }
    ],
    ess_amino_title: "Aside Amine z'Ibanze 9",
    amino_list_detailed: [
      { name: "Leucine", desc: "Urufunguzo rwo kubaka imikaya." },
      { name: "Isoleucine", desc: "Kuringaniza isukari mu maraso no kongera imbaraga." },
      { name: "Valine", desc: "Kurinda imikaya no kugabanya umunaniro." },
      { name: "Histidine", desc: "Gukiza inyama no kongera ubudahangarwa." },
      { name: "Lysine", desc: "Kwinjiza calcium no kubaka ingingo." },
      { name: "Methionine", desc: "Ishingiro rya Creatine." },
      { name: "Phenylalanine", desc: "Kongera ibyibukiro no kwibanda." },
      { name: "Threonine", desc: "Gukomeza imitsi n'ingingo." },
      { name: "Tryptophan", desc: "Gufasha gusinzira neza." }
    ],
    non_title: "Intungamubiri Zitari Iz'Ibanze",
    non_sub: "Ibyo umubiri wikorera",
    non_desc: "Ibyo umubiri wawe ukora. Byongera ubwiza bw'imikorere ntibigomba gusa kuva mu biribwa.",
    non_list_detailed: [
      { name: "Creatine", desc: "Itanga imbaraga z'ako kanya mu masegonda 10 ya mbere y'imyitozo.", icon: "⚡" },
      { name: "Alanine", desc: "Itwara uburozi mu mikaya ikabujyana mu mwijima.", icon: "🧬" },
      { name: "Taurine", desc: "Yongera amazi mu mikaya kandi igafasha gukanya vuba.", icon: "💧" },
      { name: "Cholesterol", desc: "Ni ishingiro ryo gukora imisemburo ya kigabo.", icon: "🛡️" }
    ],
    cond_title: "Iby'ibihe Byihariye",
    cond_sub: "Icyiciro cy'ingenzi (Turbo)",
    cond_desc: "Mu bihe bikomeye nko gukora imyitozo ihanitse, umubiri ntiwibasha. Inyongeramirire ni nka Turbo.",
    cond_cats: [
      { title: "Gukira no Kurinda Imikaya", icon: "🩹", color: "text-red-600", bg: "bg-red-50", items: [{name: "Glutamine", desc: "Yihutisha gukira vuba inasohora imyanda mu mubiri."}, {name: "Arginine", desc: "Yongera gutembereza amaraso bidasanzwe mu mikaya."}] },
      { title: "Ubwonko n'Ubwenge", icon: "🧠", color: "text-blue-600", bg: "bg-blue-50", items: [{name: "Tyrosine", desc: "Yongera imbaraga zo kwibanda no kwihangana mu bihe bigoye."}, {name: "Choline", desc: "Ifasha guhuza neza imikaya n'ubwonko."}] },
      { title: "Imbaraga Nyinshi", icon: "🔥", color: "text-orange-600", bg: "bg-orange-50", items: [{name: "Beta-Alanine", desc: "Itinza ukwotsa kw'imikaya kugira ngo ukore cyane."}, {name: "Proline", desc: "Yubaka ingingo zikomeye cyane."}] }
    ],
    nutrient_chat_title: "Ufite ikibazo kuri iki gice?",
    nutrient_chat_placeholder: "Andika ikibazo cyawe hano inzobere igusubize...",
    nutrient_chat_btn: "Baza Coach",
    
    footer_rights: "© 2026 MGREFOTS LTD. Uburenganzira bwose ni ubwacu.",
    footer_tagline: "MGREFOTS Ltd. — Inyongeramirire z'ubuhanga mu Rwanda, Misiri n'Afirika."
  }
};
