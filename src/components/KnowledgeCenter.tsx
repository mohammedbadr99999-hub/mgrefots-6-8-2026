import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Sparkles, Filter, ShieldCheck, Flame, 
  HelpCircle, ChevronRight, ExternalLink, Activity, ArrowRight, 
  Clock, UserCheck, MessageSquare, Award, CheckCircle2, FileText, Zap
} from 'lucide-react';
import { KnowledgeGuide, KnowledgeArticle, Language, Product } from '../types';
import { 
  FEATURED_GUIDES, KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES, 
  KNOWLEDGE_GOALS, KNOWLEDGE_FAQS 
} from '../data/knowledgeCenterData';
import { GuideDetail } from './GuideDetail';
import { ArticleDetail } from './ArticleDetail';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';

interface KnowledgeCenterProps {
  lang: Language;
  onSelectProductModal?: (product: Product) => void;
  onNavigateToChat?: () => void;
  initialGuideId?: string | null;
  onClearInitialGuide?: () => void;
}

export const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({
  lang,
  onSelectProductModal,
  onNavigateToChat,
  initialGuideId,
  onClearInitialGuide
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(initialGuideId || null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (initialGuideId) {
      setSelectedGuideId(initialGuideId);
      setSelectedArticleId(null);
    }
  }, [initialGuideId]);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Active guide or article detail views
  const activeGuide = FEATURED_GUIDES.find((g) => g.id === selectedGuideId);
  const activeArticle = KNOWLEDGE_ARTICLES.find((a) => a.id === selectedArticleId);

  // Filtered guides based on search, category, goal
  const filteredGuides = useMemo(() => {
    return FEATURED_GUIDES.filter((g) => {
      const matchesSearch = 
        !searchQuery || 
        (g.title[lang] || g.title.en).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.summary[lang] || g.summary.en).toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || g.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesGoal = selectedGoal === 'all' || (g.targetGoal && g.targetGoal.toLowerCase().includes(selectedGoal.toLowerCase()));

      return matchesSearch && matchesCategory && matchesGoal;
    });
  }, [searchQuery, selectedCategory, selectedGoal, lang]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return KNOWLEDGE_FAQS;
    return KNOWLEDGE_FAQS.filter((faq) => 
      (faq.question[lang] || faq.question.en).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.answer[lang] || faq.answer.en).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, lang]);

  if (activeGuide) {
    return (
      <GuideDetail
        guide={activeGuide}
        lang={lang}
        onBack={() => {
          setSelectedGuideId(null);
          if (onClearInitialGuide) onClearInitialGuide();
        }}
        onSelectGuide={(id) => setSelectedGuideId(id)}
        onSelectProductModal={onSelectProductModal}
      />
    );
  }

  if (activeArticle) {
    return (
      <ArticleDetail
        article={activeArticle}
        lang={lang}
        onBack={() => setSelectedArticleId(null)}
        onSelectProductModal={onSelectProductModal}
      />
    );
  }

  return (
    <div className="space-y-12 animate-fade-in max-w-7xl mx-auto">
      
      {/* Knowledge Center Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#0B1F45] via-[#091833] to-[#173A73] border border-[#F5A623]/30 p-8 sm:p-12 shadow-2xl overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F5A623]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-black uppercase tracking-wider">
            <Award size={15} />
            <span>{isRtl ? 'المرجع العلمي المعتمد للتغذية الرياضية' : 'MGREFOTS Sports Nutrition Science Library'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-wide">
            {isRtl ? 'المكتبة المعرفية والبحثية الإحترافية' : 'Knowledge & Research Center'}
          </h1>

          <p className="text-sm sm:text-base font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl 
              ? 'أكبر قاعدة بيانات واستشارات علمية مبنية على أبحاث الكيمياء الحيوية السريرة ومطابقة لمنهجية NASM ومراجعة تحت إشراف الكابتن محمد زينة.' 
              : 'Comprehensive sports nutrition encyclopedias, clinical trials, and supplement mechanics curated under NASM standards and Coach Mohamed Zeina.'}
          </p>

          {/* Master Search Bar */}
          <div className="relative max-w-2xl pt-2">
            <div className="relative flex items-center">
              <Search size={22} className={`absolute ${isRtl ? 'right-4' : 'left-4'} text-[#F5A623] pointer-events-none`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'ابحث في الأدلة العلمية، المكملات، الأبحاث، أو الأسئلة الشائعة...' : 'Search guides, supplements, clinical studies, or FAQs...'}
                className={`w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-[#030914]/90 border-2 border-[#F5A623]/40 rounded-2xl text-white text-sm sm:text-base font-medium focus:border-[#F5A623] outline-none shadow-2xl transition`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-xs font-black text-[#94A3B8] hover:text-white bg-[#0B1F45] px-2.5 py-1 rounded-lg`}
                >
                  {isRtl ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
            <p className="text-[11px] font-bold text-[#94A3B8] mt-2 flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles size={13} className="text-[#F5A623]" />
              <span>{isRtl ? 'كلمات سريعة: الكرياتين، السيترولين، الكارنيتين، البروتين النباتي، الاستشفاء' : 'Popular: Creatine, Citrulline, L-Carnitine, Plant Protein, Kidney Safety'}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Filter Tabs: Categories & Goals */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Filter size={18} className="text-[#F5A623]" />
            <span>{isRtl ? 'تصفح حسب التخصص العلمي' : 'Browse Knowledge Categories'}</span>
          </h3>

          <button
            onClick={() => { setSelectedCategory('all'); setSelectedGoal('all'); setSearchQuery(''); }}
            className="text-xs font-black text-[#F5A623] hover:underline"
          >
            {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] shadow-md'
                : 'bg-[#071426] text-[#94A3B8] hover:text-white border border-[rgba(255,255,255,0.08)]'
            }`}
          >
            {isRtl ? 'الكل' : 'All Categories'}
          </button>

          {KNOWLEDGE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] shadow-md'
                    : 'bg-[#071426] text-[#94A3B8] hover:text-white border border-[rgba(255,255,255,0.08)]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title[lang] || cat.title.en}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Master Guides Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] block">
              {isRtl ? 'الأدلة الشاملة والمعتمدة' : 'Comprehensive Master Guides'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {isRtl ? 'أدلة المكملات والأداء الرياضي (Complete Guides)' : 'Master Supplement Guides'}
            </h2>
          </div>
        </div>

        {filteredGuides.length === 0 ? (
          <div className="p-8 text-center bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] text-[#94A3B8]">
            <p className="font-bold text-sm">{isRtl ? 'لم نجد أدلة تطابق بحثك الحالي.' : 'No guides found matching your search.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className="group relative bg-[#071426] hover:bg-[#091833] border border-[rgba(255,255,255,0.08)] hover:border-[#F5A623]/50 rounded-3xl p-6 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#0B1F45] text-[#F5A623] text-[10px] font-black uppercase border border-[#F5A623]/30">
                      {guide.badge[lang] || guide.badge.en}
                    </span>
                    <span className="text-[11px] font-bold text-[#94A3B8] flex items-center gap-1">
                      <Clock size={12} className="text-[#F5A623]" />
                      {guide.readingTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#F5A623] transition-colors leading-snug mb-2">
                      {guide.title[lang] || guide.title.en}
                    </h3>
                    <p className="text-xs font-medium text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {guide.summary[lang] || guide.summary.en}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5A623] text-[#030914] font-black text-[10px] flex items-center justify-center">
                      MZ
                    </div>
                    <span className="text-[11px] font-extrabold text-white">
                      {guide.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-black text-[#F5A623] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>{isRtl ? 'اقرأ الدليل الكامل' : 'Read Guide'}</span>
                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Browse by Health Condition & Sensitivity */}
      <section className="p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] block">
            {isRtl ? 'التصنيف حسب الحالة الصحية والحساسية' : 'Browse by Health Condition & Safety'}
          </span>
          <h2 className="text-2xl font-black text-white">
            {isRtl ? 'التغذية والمكملات المناسبة لكل حالة' : 'Targeted Health Conditions & Tolerability'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#091833] rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <span className="text-2xl">🥛</span>
            <h4 className="font-black text-white text-sm">
              {isRtl ? 'حساسية اللاكتوز والأمعاء' : 'Lactose Free & Intolerance'}
            </h4>
            <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">
              {isRtl ? 'بروتين البازلاء والأرز ٧٠/٣٠ خالي تماماً من اللاكتوز ومريح جداً للأمعاء.' : '100% dairy-free plant isolates engineered for delicate gut digestion.'}
            </p>
          </div>

          <div className="p-5 bg-[#091833] rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <span className="text-2xl">🩺</span>
            <h4 className="font-black text-white text-sm">
              {isRtl ? 'الأمان الكلوي والكبدي' : 'Kidney & Liver Protection'}
            </h4>
            <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">
              {isRtl ? 'الكرياتين النقي دقيق التنعيم لا يسبب أي عبء على وظائف الكلى لدى الأصحاء.' : 'Ultra-pure micronized forms evaluated under long-term clinical trials.'}
            </p>
          </div>

          <div className="p-5 bg-[#091833] rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <span className="text-2xl">🫀</span>
            <h4 className="font-black text-white text-sm">
              {isRtl ? 'ضغط الدم وخالي من المحفزات' : 'Non-Stimulant Vascularity'}
            </h4>
            <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">
              {isRtl ? 'السيترولين مالات يوسع الشرايين بطريقة طبيعية دون كافيين أو زيادة ضربات القلب.' : 'Pure L-Citrulline nitric oxide pumps without caffeine or jitters.'}
            </p>
          </div>

          <div className="p-5 bg-[#091833] rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <span className="text-2xl">🦴</span>
            <h4 className="font-black text-white text-sm">
              {isRtl ? 'صحة المفاصل والأربطة' : 'Joints & Tendon Resilience'}
            </h4>
            <p className="text-xs text-[#94A3B8] font-medium leading-relaxed">
              {isRtl ? 'فيتامين سي والماغنيسيوم والزنك لحماية الأنسجة الضامة والأوتار عند رفع الأوزان.' : 'Vitamin C & Collagen hydroxylation protocols for heavy lifters.'}
            </p>
          </div>
        </div>
      </section>

      {/* Scientific Research & Peer-Reviewed Papers */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] block">
            {isRtl ? 'الأبحاث والتحليلات السريرة' : 'Peer-Reviewed Clinical Papers'}
          </span>
          <h2 className="text-2xl font-black text-white">
            {isRtl ? 'أحدث الدراسات المنشورة (PubMed & ISSN)' : 'Latest Scientific Research Articles'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KNOWLEDGE_ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticleId(art.id)}
              className="p-6 bg-[#071426] hover:bg-[#091833] border border-[rgba(255,255,255,0.08)] hover:border-[#F5A623]/50 rounded-3xl transition duration-300 cursor-pointer space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#94A3B8]">
                <span className="px-3 py-1 rounded-full bg-[#0B1F45] text-[#F5A623] text-[10px] font-black uppercase">
                  {art.category}
                </span>
                <span>{art.publishedDate}</span>
              </div>

              <h3 className="text-lg font-black text-white hover:text-[#F5A623] transition-colors leading-snug">
                {art.title[lang] || art.title.en}
              </h3>

              <p className="text-xs font-medium text-[#94A3B8] leading-relaxed line-clamp-2">
                {art.excerpt[lang] || art.excerpt.en}
              </p>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs font-black text-[#F5A623]">
                <span>{isRtl ? 'اقرأ الدراسة والتحليل' : 'Read Paper Analysis'}</span>
                <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Center Accordion */}
      <section className="p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] block">
              {isRtl ? 'إجابات علمية سريعة' : 'Instant Scientific Answers'}
            </span>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <HelpCircle size={22} className="text-[#F5A623]" />
              <span>{isRtl ? 'الأسئلة الشائعة في مجال المكملات' : 'Knowledge Center FAQ Hub'}</span>
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#091833] border border-[rgba(255,255,255,0.08)] overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#F5A623] transition"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <span>{faq.question[lang] || faq.question.en}</span>
                  <span className="text-[#F5A623] text-lg font-black">{isExpanded ? '−' : '+'}</span>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 text-xs sm:text-sm font-medium text-[#94A3B8] leading-relaxed border-t border-[rgba(255,255,255,0.05)]">
                    {faq.answer[lang] || faq.answer.en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Expert WhatsApp Consultation CTA */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-[#0B1F45] via-[#091833] to-[#173A73] border border-[#F5A623]/40 shadow-2xl text-center space-y-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-xs font-black uppercase">
            {isRtl ? 'استشارة علمية مباشرة' : 'Direct Science Consultation'}
          </span>
          <h3 className="text-2xl font-black text-white">
            {isRtl ? 'هل لديك سؤال محدد يدور حول طبيعة جسمك؟' : 'Have a Specific Question About Your Routine?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-medium leading-relaxed">
            {isRtl 
              ? 'تحدث مباشرة مع الكابتن محمد زينة للحصول على استشارة دقيقة ومخصصة لجدول تمارينك ونظام المكملات.' 
              : 'Message Coach Mohamed Zeina directly on WhatsApp for personalized supplement timing and dosing strategies.'}
          </p>

          <a
            href={`https://wa.me/250792294432?text=${encodeURIComponent('مرحبا coach Mohamed Zeina معك ما هو هدفك الذي تريد ان تصل اليه في جسدك و عقلك')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] font-black text-sm uppercase rounded-2xl transition shadow-xl hover:scale-105"
          >
            <MessageSquare size={18} />
            <span>{isRtl ? 'استشر كابتن محمد زينة عبر الواتساب' : 'Consult Coach Mohamed Zeina'}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
