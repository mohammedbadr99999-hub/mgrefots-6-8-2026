import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CertificationsBanner } from '../components/CertificationsBanner';
import { EgyptianOfferBanner } from '../components/EgyptianOfferBanner';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { Language, Product } from '../types';
import { Sparkles, Award, ShieldCheck, ArrowRight, BookOpen, Activity, Zap, MessageCircle } from 'lucide-react';

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

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Brand Hero Heading */}
      <div className="text-center space-y-4 max-w-4xl mx-auto py-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black tracking-wider uppercase shadow-lg">
          <Sparkles size={14} className="text-[#F5A623]" />
          <span>MGREFOTS Ltd. — Sports Nutrition Brand</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {t.hero_products_title}
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed max-w-3xl mx-auto">
          {t.hero_products_sub}
        </p>

        {/* Quick Route Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <span>{isRtl ? 'عرض كل المكملات' : 'Explore All Products'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>

          <Link
            to="/knowledge/guides/married-men-health-guide"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <span>💍</span>
            <span>{isRtl ? 'دليل الرجال المتزوجين' : 'Married Men\'s Guide'}</span>
          </Link>

          <Link
            to="/analysis"
            className="px-4 py-2.5 rounded-2xl bg-[#091833] hover:bg-[#0B1F45] text-white border border-[rgba(255,255,255,0.12)] font-bold text-xs transition flex items-center gap-1.5"
          >
            <Activity size={15} className="text-[#F5A623]" />
            <span>{t.nav_analysis}</span>
          </Link>

          <Link
            to="/supplements"
            className="px-4 py-2.5 rounded-2xl bg-[#091833] hover:bg-[#0B1F45] text-white border border-[rgba(255,255,255,0.12)] font-bold text-xs transition flex items-center gap-1.5"
          >
            <Zap size={15} className="text-[#F5A623]" />
            <span>{t.nav_supps}</span>
          </Link>
        </div>
      </div>

      {/* Egyptian Special Offer Banner */}
      <EgyptianOfferBanner />

      {/* Quality Certifications Banner */}
      <CertificationsBanner lang={lang} />

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

      {/* Brand Value Propositions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[rgba(255,255,255,0.08)]">
        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <Award size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'أسس علمية موثوقة' : 'Science-Backed Formulations'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'مكونات نقية بجرعات سريرية مثبتة علمياً لضمان النتائج.' : 'Clinical dosages engineered to force progressive muscle adaptation.'}
          </p>
        </div>

        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <ShieldCheck size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'خالٍ من المواد الحافظة' : 'Zero Fillers & 100% Pure'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'منتجات عالية الجودة بدون سكريات مضافة أو مكونات ضارة.' : 'Highest pharmaceutical grade ingredients without hidden additives.'}
          </p>
        </div>

        <div className="glass-card glass-card-hover p-7 rounded-3xl text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-2xl flex items-center justify-center text-[#F5A623] mx-auto shadow-xl">
            <Sparkles size={28} />
          </div>
          <h4 className="font-black text-white text-base sm:text-lg">
            {isRtl ? 'استشارات كابتن محمد زينة' : 'Coach Mohamed Zeina Guidance'}
          </h4>
          <p className="text-xs font-semibold text-[#94A3B8] leading-relaxed">
            {isRtl ? 'توجيهات واستشارات مباشرة لكيفية استخدام المنتجات وفقاً لهدفك.' : 'Get direct tailored advice from Coach Mohamed Zeina on structuring your supplements.'}
          </p>
        </div>
      </div>
    </div>
  );
};
