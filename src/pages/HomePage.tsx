import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CertificationsBanner } from '../components/CertificationsBanner';
import { EgyptianOfferBanner } from '../components/EgyptianOfferBanner';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { Language, Product } from '../types';
import { Sparkles, Award, ShieldCheck, ArrowRight, BookOpen, Activity, MessageCircle, Factory, FlaskConical } from 'lucide-react';

interface HomePageProps {
  lang: Language;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onSelectProduct }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const filteredProducts = PRODUCTS.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const filterButtons = [
    { id: 'all', label: t.filter_all },
    { id: 'power', label: t.filter_power },
    { id: 'pump', label: t.filter_pump },
    { id: 'energy', label: t.filter_energy },
    { id: 'protein', label: t.filter_protein },
    { id: 'immunity', label: t.filter_immunity },
  ];

  const heroCopy = {
    en: {
      eyebrow: 'Science-led sports nutrition for Rwanda & East Africa',
      title: 'Train Stronger. Recover Smarter.',
      body: 'Purpose-built supplements, evidence-based guidance, and direct local support for athletes who want measurable progress.',
      primary: 'Shop Performance Supplements',
      secondary: 'See the Science',
      productsTitle: 'Choose the support that fits your goal',
      productsBody: 'Compare benefits, servings, proof, and price without the clutter.',
      trust: ['Certified manufacturing facilities', 'Evidence-based formulations', 'Direct support in Rwanda'],
      guideTitle: 'Specialized health guidance, when you need it',
      guideBody: 'Explore the dedicated married men’s health guide without interrupting the main shopping journey.',
      guideCta: 'Open the guide'
    },
    rw: {
      eyebrow: 'Imirire ya siporo ishingiye kuri siyansi mu Rwanda no muri Afurika y’Iburasirazuba',
      title: 'Kora Imyitozo Ikomeye. Garura Imbaraga Neza.',
      body: 'Inyunganiramirire zifite intego, ubuyobozi bushingiye ku bushakashatsi n’ubufasha bwo mu Rwanda ku bashaka iterambere ripimika.',
      primary: 'Reba Inyunganiramirire',
      secondary: 'Reba Ubushakashatsi',
      productsTitle: 'Hitamo igufasha kugera ku ntego yawe',
      productsBody: 'Gereranya inyungu, ingano, ibimenyetso n’igiciro mu buryo bworoshye.',
      trust: ['Inganda zemewe', 'Imiterere ishingiye kuri siyansi', 'Ubufasha butaziguye mu Rwanda'],
      guideTitle: 'Ubuyobozi bwihariye ku buzima igihe ubukeneye',
      guideBody: 'Soma inyoborabuhanga y’ubuzima bw’abagabo bashatse utabangamiwe mu guhitamo ibicuruzwa.',
      guideCta: 'Fungura inyoborabuhanga'
    },
    ar: {
      eyebrow: 'تغذية رياضية قائمة على العلم لرواندا وشرق أفريقيا',
      title: 'تدرّب بقوة أكبر. واستشفِ بذكاء.',
      body: 'مكملات مصممة لهدف واضح، وإرشادات مبنية على الأدلة، ودعم محلي مباشر للرياضيين الباحثين عن تقدم قابل للقياس.',
      primary: 'تصفح مكملات الأداء',
      secondary: 'اطّلع على الأساس العلمي',
      productsTitle: 'اختر الدعم المناسب لهدفك',
      productsBody: 'قارن الفوائد وعدد الجرعات والدليل والسعر بسهولة ومن دون تشتيت.',
      trust: ['تصنيع داخل منشآت معتمدة', 'تركيبات قائمة على الأدلة', 'دعم مباشر داخل رواندا'],
      guideTitle: 'إرشادات صحية متخصصة عند الحاجة',
      guideBody: 'اطّلع على دليل صحة الرجال المتزوجين في قسم مخصص من دون تشتيت رحلة شراء المنتجات.',
      guideCta: 'افتح الدليل'
    }
  }[lang];

  return (
    <div className="space-y-14 animate-fade-in">
      {/* Brand Hero Heading */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B1F45] via-[#071426] to-[#030914] px-5 py-10 sm:px-10 sm:py-14 shadow-2xl">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 text-center space-y-5 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black tracking-wider uppercase shadow-lg">
          <Sparkles size={14} className="text-[#F5A623]" />
          <span>{heroCopy.eyebrow}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
          {heroCopy.title}
        </h1>
        <p className="text-base sm:text-lg text-[#CBD5E1] font-medium leading-relaxed max-w-2xl mx-auto">
          {heroCopy.body}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Link
            to="/products"
            className="min-h-[50px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-sm shadow-lg shadow-[#F5A623]/20 hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            <span>{heroCopy.primary}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>

          <Link
            to="/knowledge"
            className="min-h-[50px] px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-black text-sm transition flex items-center justify-center gap-2"
          >
            <BookOpen size={17} className="text-[#F5A623]" />
            <span>{heroCopy.secondary}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 max-w-3xl mx-auto">
          {[Factory, FlaskConical, MessageCircle].map((Icon, index) => (
            <div key={heroCopy.trust[index]} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/15 px-3 py-2.5 text-xs font-bold text-[#CBD5E1]">
              <Icon size={15} className="shrink-0 text-[#F5A623]" />
              <span>{heroCopy.trust[index]}</span>
            </div>
          ))}
        </div>
        <Link
          to="/knowledge/guides/married-men-health-guide"
          className="mx-auto mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs font-black text-amber-200 transition hover:bg-amber-300/15 hover:text-white"
        >
          <span aria-hidden="true">💍</span>
          <span>{isRtl ? 'دليل الصحة الجنسية وصحة الرجال المتزوجين' : lang === 'rw' ? 'Ubuzima bw’imyororokere n’abagabo bashatse' : 'Men’s Sexual Health & Married Men’s Guide'}</span>
        </Link>
      </div>
      </section>

      <section className="space-y-5" aria-labelledby="products-heading">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 id="products-heading" className="text-2xl sm:text-3xl font-black text-white">{heroCopy.productsTitle}</h2>
          <p className="text-sm sm:text-base text-[#A7B3C4]">{heroCopy.productsBody}</p>
        </div>

      {/* Product Category Filter Chips */}
      <div className="bg-[#091833]/60 backdrop-blur-md p-2 rounded-3xl border border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none" dir={isRtl ? 'rtl' : 'ltr'}>
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setCategoryFilter(btn.id)}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                categoryFilter === btn.id
                  ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] border-transparent shadow-xl shadow-[#F5A623]/25 scale-[1.02]'
                  : 'bg-[#0B1F45]/50 text-[#94A3B8] border-transparent hover:text-white hover:bg-[#0B1F45]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Modern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            lang={lang}
            onSelectProduct={(p) => {
              onSelectProduct(p);
              navigate(`/products/${p.id}`);
            }}
            onAskAIProduct={(p) => {
              onSelectProduct(p);
              navigate(`/products/${p.id}`);
            }}
          />
        ))}
      </div>
      </section>

      {/* Brand Value Propositions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[rgba(255,255,255,0.08)]">
        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <Award size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'أسس علمية موثوقة' : lang === 'rw' ? 'Imiterere ishingiye kuri siyansi' : 'Science-Backed Formulations'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'مكونات نقية بجرعات مدروسة علمياً لدعم التقدم الرياضي.' : lang === 'rw' ? 'Ingano zizewe na siyansi zigenewe gushyigikira iterambere mu myitozo.' : 'Evidence-based dosages designed to support progressive training adaptation.'}
          </p>
        </div>

        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <ShieldCheck size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'خالٍ من الحشوات ونقي 100%' : lang === 'rw' ? 'Nta byongerwamo kandi isukuye 100%' : 'Zero Fillers & 100% Pure'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'مكونات عالية الجودة بدون إضافات مخفية.' : lang === 'rw' ? 'Ibikoresho byiza cyane, nta byongerwamo bihishwe.' : 'High-quality ingredients without hidden additives.'}
          </p>
        </div>

        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <Sparkles size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'إرشادات الكابتن محمد زينة' : lang === 'rw' ? 'Ubuyobozi bwa Coach Mohamed Zeina' : 'Coach Mohamed Zeina Guidance'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'إرشادات مباشرة لاستخدام المنتجات وفقاً لهدفك.' : lang === 'rw' ? 'Habwa inama zihariye zijyanye n’intego yawe n’imikoreshereze y’inyongeramirire.' : 'Get direct, goal-specific guidance on structuring your supplements.'}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-5 rounded-3xl border border-white/10 bg-[#091833]/70 p-6 sm:p-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#F5A623] font-black text-xs uppercase tracking-wider">
            <Activity size={16} />
            <span>{isRtl ? 'دليل متخصص' : lang === 'rw' ? 'Inyoborabuhanga yihariye' : 'Specialized guide'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{heroCopy.guideTitle}</h2>
          <p className="text-sm text-[#A7B3C4] leading-relaxed max-w-3xl">{heroCopy.guideBody}</p>
        </div>
        <Link to="/knowledge/guides/married-men-health-guide" className="min-h-[46px] rounded-2xl border border-[#F5A623]/40 bg-[#0B1F45] px-5 py-3 text-sm font-black text-[#F5A623] hover:bg-[#173A73] transition flex items-center justify-center gap-2">
          <span>💍</span>
          <span>{heroCopy.guideCta}</span>
        </Link>
      </section>

      {/* Market offer follows the core product journey instead of interrupting it. */}
      <EgyptianOfferBanner lang={lang} />

      {/* Detailed manufacturing trust proof sits after products and brand value. */}
      <CertificationsBanner lang={lang} />
    </div>
  );
};
