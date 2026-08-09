import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { Language, Product } from '../types';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  lang: Language;
  onSelectProduct: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ lang, onSelectProduct }) => {
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
    <div className="space-y-10 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#091833]/90 border border-[rgba(255,255,255,0.08)] p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black uppercase tracking-wider">
          <ShoppingBag size={14} />
          <span>MGREFOTS Sports Nutrition Catalog</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRtl ? 'المجموعات والمكملات الرياضية النقية' : 'Clinical Grade Supplements'}
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] font-medium max-w-2xl mx-auto leading-relaxed">
          {isRtl
            ? 'تصفح جميع مكملات MGREFOTS المصممة بجرعات سريرية دقيقة وبدون أي مواد حافظة أو مالئة زائدة.'
            : 'Explore our complete range of pharmaceutical grade formulations engineered for power, vasodilation, recovery, and immune cellular protection.'}
        </p>
      </div>

      {/* Category Filters */}
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

      {/* Products Grid */}
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
    </div>
  );
};
