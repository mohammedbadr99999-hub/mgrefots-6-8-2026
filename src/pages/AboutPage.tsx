import React from 'react';
import { Link } from 'react-router-dom';
import { CertificationsBanner } from '../components/CertificationsBanner';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { ShieldCheck, Award, Sparkles, MapPin, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="bg-[#091833]/90 border border-[rgba(255,255,255,0.08)] p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black uppercase tracking-wider">
          <Award size={14} />
          <span>MGREFOTS Ltd. — Excellence in Sports Biochemistry</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRtl ? 'عن شركة MGREFOTS ورؤيتنا العلمية' : 'About MGREFOTS & Our Science Standard'}
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] font-medium max-w-3xl mx-auto leading-relaxed">
          {isRtl
            ? 'نحن شركة رائدة عالمياً مكرسة لابتكار المكملات الرياضية عالية النقاء الخالية تماماً من المواد الحافظة أو الحشوات، تحت قيادة الخبير المعتمد كابتن محمد زينة وفق أعلى المعايير الدولية.'
            : 'A global sports nutrition brand engineered for physical transformation, combining 100% pure clinical active ingredients with NASM sports physiology and pharmaceutical grade quality standards.'}
        </p>
      </div>

      {/* Leadership & Coach Section */}
      <div className="bg-[#091833]/80 border border-[rgba(255,255,255,0.08)] p-8 sm:p-10 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl border-2 border-[#F5A623]/50">
            MZ
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Coach Mohamed Zeina</h3>
            <span className="text-xs font-bold text-[#F5A623]">
              {isRtl ? 'مدير تطوير التغذية الرياضية · NASM Master Certified' : 'Sports Nutrition Director · NASM Certified'}
            </span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="text-[#F5A623]" size={20} />
            <span>{isRtl ? 'فلسفة التصنيع والنقاء العلمي' : 'Formulation Philosophy & Absolute Purity'}</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#A7B3C4] font-medium leading-relaxed">
            {isRtl
              ? 'تعتمد MGREFOTS على مبدأ عدم المساومة على الجودة. يتم حساب كل الجرعات في منتجاتنا بالجرام والميكروجرام لتطابق ما أثبتته الدراسات السريرية المعتمدة في المجلات الرياضية العالمية، دون إخفاء أي مكونات خفية خلف خلطات سرية.'
              : 'Every single gram of active ingredient in MGREFOTS products is backed by published clinical literature. We strictly eliminate artificial fillers, hidden proprietary blends, or excessive sugars, delivering 100% active functional nutrition.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#030914] p-3 rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <CheckCircle2 size={16} className="text-[#F5A623]" />
              <span>{isRtl ? '١٠٠٪ جرعات سريرية مثبتة' : '100% Clinical Dosages'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#030914] p-3 rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <CheckCircle2 size={16} className="text-[#F5A623]" />
              <span>{isRtl ? 'صفر مواد حافظة خفية' : 'Zero Preservatives or Fillers'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#030914] p-3 rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <CheckCircle2 size={16} className="text-[#F5A623]" />
              <span>{isRtl ? 'اعتمادات ISO 22000 & HACCP' : 'ISO 22000 & HACCP Certified'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#030914] p-3 rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <CheckCircle2 size={16} className="text-[#F5A623]" />
              <span>{isRtl ? 'تراخيص الشحن الدولي من كيجالي' : 'Global Dispatch from Kigali HQ'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Certifications Banner Component */}
      <CertificationsBanner lang={lang} />

      {/* Global Location & Action Row */}
      <div className="bg-[#091833] p-8 rounded-3xl border border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-black text-[#F5A623] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <MapPin size={15} />
            <span>HQ Location</span>
          </span>
          <h4 className="text-lg font-black text-white">
            MGREFOTS Ltd. — Kigali, Rwanda
          </h4>
          <p className="text-xs text-[#94A3B8] font-medium">
            {isRtl ? 'خدمة الشحن والتوزيع المباشرة لمختلف دول أفريقيا والشرق الأوسط.' : 'Direct distribution & international fulfillment across Africa & Middle East.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span>{isRtl ? 'تواصل معنا' : 'Contact Us'}</span>
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 rounded-2xl bg-[#0B1F45] hover:bg-[#173A73] text-white border border-[rgba(255,255,255,0.1)] font-bold text-xs transition flex items-center gap-1.5"
          >
            <span>{isRtl ? 'تصفح المنتجات' : 'View Products'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </div>
  );
};
