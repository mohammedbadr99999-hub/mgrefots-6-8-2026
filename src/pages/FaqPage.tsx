import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface FaqPageProps {
  lang: Language;
}

export const FaqPage: React.FC<FaqPageProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const faqData = [
    {
      category: 'products',
      question: {
        en: 'How do I know which MGREFOTS supplement fits my goal?',
        ar: 'كيف أعرف أي مكمل من MGREFOTS يناسب هدفي الرياضي؟',
        rw: 'Nzi nte supplementation ya MGREFOTS inyanya neza?'
      },
      answer: {
        en: 'If your goal is explosive power & muscle volume, Creatine Monohydrate is essential. For vascular pumps & blood flow, choose Pure Citrulline. For fat loss & endurance, L-Carnitine is ideal. For recovery, our 81.3% Pea/Rice Protein delivers a complete amino profile.',
        ar: 'إذا كان هدفك القوة الانفجارية والضخامة العضلية، فإن الكرياتين مونهيديرات هو الخيار الأساسي. لضخ الدم والعروق، اختر السيترولين النقي. للتنشيف وحرق الدهون، ال كارنتين ممتاز. وللاستشفاء والبناء، فإن بروتين البازلاء والأرز 81.3% يوفر ملف أحماض أمينية كاملاً.',
        rw: 'Niba ushaka ingufu z’imikaya, Creatine ni ngombwa. Niba ushaka pump, Citrulline ni nziza. Niba ushaka kugabanya ibinure, L-Carnitine ni nziza.'
      }
    },
    {
      category: 'married',
      question: {
        en: 'What is the Married Men\'s Health protocol recommended by Coach Mohamed Zeina?',
        ar: 'ما هو بروتوكول صحة الرجال المتزوجين المعرف من كابتن محمد زينة؟',
        rw: 'Inyoborabuhanga y\'abagabo bashatse yateguwe na Coach Mohamed Zeina ni iyihe?'
      },
      answer: {
        en: 'Coach Mohamed Zeina created a specialized physiological protocol combining Pure Citrulline (for endothelial nitric oxide vasodilation) with C-Zinc (Zinc Bisglycinate for natural testosterone synthesis) and B-Complex. You can read the full guide under our Knowledge Center.',
        ar: 'صمم كابتن محمد زينة بروتوكولاً فسيولوجياً خاصاً يدمج السيترولين النقي (لتوسيع الأوعية الدموية ورفع نيتريك أوكسايد) مع سي زنك (بيسجلايسينات الزنك لدعم التستوستيرون الطبيعي) وبي كومبلكس. يمكنك قراءة الدليل الكامل في قسم مركز المعرفة.',
        rw: 'Coach Mohamed Zeina yateguye inyoborabuhanga ifasha abagabo bashatse ikoresheje Citrulline na C-Zinc na B-Complex.'
      }
    },
    {
      category: 'shipping',
      question: {
        en: 'How are orders shipped in Kigali, Rwanda and Internationally?',
        ar: 'كيف يتم شحن الطلبات في كيجالي رواندا ودولياً؟',
        rw: 'Gutuza ibicuruzwa bikorwa bite mu Rwanda no mu mahanga?'
      },
      answer: {
        en: 'Local deliveries within Kigali are completed same-day or next-day via direct dispatch. International shipments to Egypt, Gulf, and neighboring countries are processed with priority tracking through our Kigali HQ logistics center.',
        ar: 'التوصيل المحلي داخل كيجالي يتم في نفس اليوم أو اليوم التالي. الشحنات الدولية لمصر والدول المجاورة يتم تجهيزها فوراً عبر مركز الشحن في كيجالي مع تزويدك برقم التتبع.',
        rw: 'Mu Kigali gutuza bikorwa ku munsi umwe. Mu mahanga no muri Misiri bikorwa vuba ku kigo cyacu cy\'i Kigali.'
      }
    },
    {
      category: 'quality',
      question: {
        en: 'Are MGREFOTS products lab-tested and certified?',
        ar: 'هل منتجات MGREFOTS مفحوصة مخبرياً ومعتمدة؟',
        rw: 'Ibicuruzwa vya MGREFOTS birasuzumwa mu laboratwari?'
      },
      answer: {
        en: 'Yes, 100%. All MGREFOTS supplements undergo third-party laboratory analysis, manufactured under ISO 22000, HACCP, and GMP certified facilities to guarantee zero fillers and 100% label accuracy.',
        ar: 'نعم ١٠٠٪. تخضع جميع مكملات MGREFOTS للتحاليل المخبرية المعتمدة، وتصنع في مصانع حاصلة على شهادات ISO 22000 و HACCP و GMP لضمان مطابقة المكونات وعدم وجود أي مواد حافظة ضارة.',
        rw: 'Yego 100%. Ibicuruzwa byose binyura mu bizami bya laboratwari n\'inganda za ISO 22000 & HACCP.'
      }
    },
    {
      category: 'inbody',
      question: {
        en: 'How does the AI InBody Analysis scan tool work?',
        ar: 'كيف تعمل أداة تحليل InBody بالذكاء الاصطناعي في الموقع؟',
        rw: 'Igikoresho cy\'ubwenge bwasanzwe bwa InBody gikora gite?'
      },
      answer: {
        en: 'You can upload an image or PDF of your InBody body composition scan on our Analysis page. Our NASM-trained AI system processes your body fat %, skeletal muscle mass, and water ratios to generate a custom nutrition & supplement protocol.',
        ar: 'يمكنك رفع صورة أو ملف PDF لتقرير InBody الخاص بك في صفحة التحليل. يقوم نظام الذكاء الاصطناعي المدرب على منهجية NASM بتحليل نسبة الدهون، الكتلة العضلية، والماء لتقديم خطة مكملات وتغذية دقيقة.',
        rw: 'Shyiraho ifoto ya InBody yawe ku ipaji y\'isuzuma, ubwenge bwasanzwe bukuyobora ku buryo bwiza bwo gufata supplements.'
      }
    },
    {
      category: 'products',
      question: {
        en: 'What makes MGREFOTS Pea/Rice Protein superior to standard protein powder?',
        ar: 'ما الذي يجعل بروتين البازلاء والأرز من MGREFOTS متميزاً عن البروتينات العادية؟',
        rw: 'Ni iki gituma Poroteyine ya MGREFOTS iba nziza cane?'
      },
      answer: {
        en: 'We are the pioneer company to commercialize a precise 70% Pea Isolate & 30% Rice Protein blend. This synergy creates a 100% complete amino acid profile (PDCAAS = 1.0) matching whey protein, but with 0% lactose, zero bloating, and hypoallergenic digestion.',
        ar: 'نحن الشركة الأولى التي تطبق نسبة ٧٠٪ بازلاء و٣٠٪ أرز على أرض الواقع. هذا التآزر ينشئ ملف أحماض أمينية كاملاً يطابق الواي بروتين ولكن مع صفر لاكتوز، وسهولة تامة في الهضم وبدون انتفاخات.',
        rw: 'Guhuza 70% Pea na 30% Rice bitanga amino acids zose 100% nk\'amashereka, ariko nta lactose no kubimba mu nda.'
      }
    }
  ];

  const categories = [
    { id: 'all', label: isRtl ? 'الكل' : 'All FAQs' },
    { id: 'products', label: isRtl ? 'المكملات والجودة' : 'Supplements & Quality' },
    { id: 'married', label: isRtl ? 'دليل المتزوجين' : 'Married Men Protocol' },
    { id: 'shipping', label: isRtl ? 'الشحن والتوصيل' : 'Shipping & Dispatch' },
    { id: 'inbody', label: isRtl ? 'تحليل InBody' : 'InBody Scan' }
  ];

  const filteredFaqs = faqData.filter((f) => {
    const qText = (f.question[lang] || f.question.en).toLowerCase();
    const aText = (f.answer[lang] || f.answer.en).toLowerCase();
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || qText.includes(searchQuery.toLowerCase()) || aText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#091833]/90 border border-[rgba(255,255,255,0.08)] p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black uppercase tracking-wider">
          <HelpCircle size={14} />
          <span>Frequently Asked Questions & Help Center</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRtl ? 'الأسئلة الشائعة والإجابات العلمية' : 'Frequently Asked Questions'}
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] font-medium max-w-2xl mx-auto leading-relaxed">
          {isRtl
            ? 'إجابات شاملة لجميع الأسئلة المتعلقة بمكملات MGREFOTS، طريقة الاستخدام، الشحن، وبروتوكولات التدريب.'
            : 'Find clear, research-backed answers regarding dosages, shipping, InBody scan analysis, and coach advice.'}
        </p>

        {/* Live Search Input */}
        <div className="max-w-lg mx-auto relative pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? 'ابحث في الأسئلة (مثال: الكرياتين، الشحن، المتزوجين)...' : 'Search FAQ (e.g., Creatine, Shipping, Married)...'}
            className="w-full pl-11 pr-4 py-3.5 bg-[#030914]/90 rounded-2xl border border-[rgba(255,255,255,0.15)] text-xs text-white outline-none focus:border-[#F5A623] shadow-inner"
          />
          <Search size={18} className={`absolute top-6 ${isRtl ? 'right-4' : 'left-4'} text-[#94A3B8]`} />
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2" dir={isRtl ? 'rtl' : 'ltr'}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
              selectedCategory === c.id
                ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] border-transparent shadow-lg'
                : 'bg-[#091833] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 bg-[#091833] rounded-3xl text-center text-xs text-[#94A3B8] font-bold">
            {isRtl ? 'لم نجد نتائج مطابقة لجميع كلمات البحث.' : 'No matching questions found.'}
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const q = faq.question[lang] || faq.question.en;
            const a = faq.answer[lang] || faq.answer.en;

            return (
              <div
                key={idx}
                className="bg-[#091833]/80 border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-white hover:text-[#F5A623] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={16} className="text-[#F5A623] shrink-0" />
                    <span>{q}</span>
                  </span>
                  <ChevronDown size={18} className={`transition-transform duration-300 text-[#F5A623] shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(255,255,255,0.06)] text-xs sm:text-sm font-medium text-[#A7B3C4] leading-relaxed animate-fade-in">
                    {a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Cross Navigation */}
      <div className="p-6 bg-[#091833] rounded-3xl border border-[#F5A623]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-black text-white">
            {isRtl ? 'هل تريد قراءة المزيد من المقالات والأدلة المتقدمة؟' : 'Looking for complete research guides?'}
          </h4>
          <p className="text-xs text-[#94A3B8] font-medium">
            {isRtl ? 'تصفح أدلة مركز المعرفة الكاملة والاستشارات المباشرة.' : 'Visit our Knowledge Center or talk directly with Coach Mohamed Zeina.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            to="/knowledge"
            className="px-5 py-2.5 rounded-2xl bg-[#0B1F45] hover:bg-[#173A73] text-white font-bold text-xs transition border border-[rgba(255,255,255,0.1)] flex items-center gap-2"
          >
            <BookOpen size={16} className="text-[#F5A623]" />
            <span>{isRtl ? 'مركز المعرفة' : 'Knowledge Center'}</span>
          </Link>

          <Link
            to="/chat"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span>{isRtl ? 'استشر الخبير' : 'Ask Coach'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
