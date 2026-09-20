import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Info, Sparkles, Star, ShoppingCart, ThumbsUp, ChevronDown } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ProductGraphic } from './ProductGraphic';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAskAIProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelectProduct,
  onAskAIProduct
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [userRating, setUserRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const name = product.name[lang] || product.name.en;
  const subtitle = product.subtitle[lang] || product.subtitle.en;
  const description = product.description[lang] || product.description.en;
  const badgeText = product.badge[lang] || product.badge.en;
  const highlights = product.highlights[lang] || product.highlights.en;
  const whatsappMsg = product.whatsappText[lang] || product.whatsappText.en;

  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(whatsappMsg)}`;
  const coachMessage = lang === 'ar'
    ? 'مرحباً كابتن محمد زينة، أحتاج مساعدتك في اختيار المكمل المناسب لهدفي.'
    : lang === 'rw'
      ? 'Muraho Coach Mohamed Zeina, nkeneye ubufasha bwo guhitamo inyunganiramirire ijyanye n’intego yanjye.'
      : 'Hello Coach Mohamed Zeina, I need help choosing the right supplement for my goal.';
  const coachWhatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(coachMessage)}`;

  const handleRateProduct = (score: number) => {
    setUserRating(score);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 4000);
  };

  const moreBtnLabel = {
    ar: { more: 'التفاصيل والمكونات', less: 'إخفاء التفاصيل' },
    en: { more: 'Details & ingredients', less: 'Hide details' },
    rw: { more: 'Ibisobanuro n’ibigize', less: 'Hisha ibisobanuro' }
  }[lang] || { more: 'More Details', less: 'Hide Details' };

  const ui = {
    ar: { soldOut: 'نفدت الكمية', reviews: 'تقييم', buyers: 'مشتري', rate: 'قيّم المنتج (من 1 إلى 10):', thanks: 'شكرًا! تم تسجيل تقييمك بنجاح.' },
    en: { soldOut: 'Sold out', reviews: 'reviews', buyers: 'buyers', rate: 'Rate this product (1–10):', thanks: 'Thank you! Your rating was submitted.' },
    rw: { soldOut: 'Yarashize', reviews: 'ibitekerezo', buyers: 'abaguzi', rate: 'Tanga amanota (1–10):', thanks: 'Murakoze! Amanota yawe yakiriwe.' }
  }[lang];

  return (
    <div className="group relative bg-[#091833]/70 backdrop-blur-xl rounded-3xl border border-[rgba(255,255,255,0.08)] hover:border-[#F5A623]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,166,35,0.15)] hover:-translate-y-1.5 overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F5A623]/20 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#0B1F45]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Graphic Banner */}
      <div className="relative mb-4">
        <ProductGraphic
          productId={product.id}
          name={name}
          category={product.category}
          gradient={product.gradient}
          image={product.image}
        />
        
        {/* Floating Category Badge */}
        <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} ${product.badgeColor} text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xl backdrop-blur-md border border-white/20`}>
          {badgeText}
        </div>
      </div>

      {/* Product Header: Name right under Graphic Box */}
      <div className="mb-3 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F5A623] transition-colors leading-snug">
            {name}
          </h3>
          {/* Price Badge */}
          <span className={`shrink-0 px-3.5 py-1 rounded-full text-xs font-black shadow-xl ${
            product.isSoldOut
              ? 'bg-red-950/90 text-red-400 border border-red-800/80'
              : 'bg-gradient-to-r from-[#0B1F45] to-[#173A73] text-[#F5A623] border border-[#F5A623]/40 shadow-lg'
          }`}>
            {product.isSoldOut
              ? ui.soldOut
              : product.price}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">{product.size}</span>
          <span className="text-xs font-black text-[#F5A623] bg-[#030914]/80 border border-[#F5A623]/30 px-3 py-0.5 rounded-full shadow-inner">
            {product.servings}
          </span>
        </div>

        {/* ALWAYS VISIBLE: Star Ratings & Buyers Count */}
        <div className="flex items-center justify-between bg-[#030914]/80 p-3 rounded-2xl border border-[rgba(255,255,255,0.08)] mb-3 shadow-inner">
          {/* Star Rating & Review count */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-[#F5A623]">
              <Star size={15} fill="currentColor" />
            </div>
            <span className="text-xs font-black text-[#F5A623]">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] font-bold text-[#94A3B8]">
              ({product.reviewsCount} {ui.reviews})
            </span>
          </div>

          {/* Buyers count */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/30 px-2.5 py-1 rounded-xl shadow-md">
            <ShoppingCart size={13} className="text-[#F5A623]" />
            <span>{product.buyersCount.toLocaleString(lang === 'ar' ? 'ar-EG' : lang === 'rw' ? 'rw-RW' : 'en-US')} {ui.buyers}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4" aria-label={lang === 'ar' ? 'أهم الفوائد' : lang === 'rw' ? 'Inyungu z’ingenzi' : 'Key benefits'}>
          {highlights.slice(0, 2).map((highlight, index) => (
            <div key={`${product.id}-benefit-${index}`} className="flex items-start gap-2 text-sm text-[#E2E8F0]">
              <CheckCircle2 size={16} className="text-[#F5A623] shrink-0 mt-0.5" />
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] mb-2.5 py-3.5 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:brightness-110 text-[#071426] rounded-2xl font-black text-sm transition-all shadow-lg shadow-[#F5A623]/20 flex items-center justify-center gap-2.5"
        >
          <MessageSquare size={18} className="text-[#071426]" />
          <span>{t.btn_order_whatsapp}</span>
        </a>

        {/* More Details Toggle Button */}
        <button
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#0B1F45]/90 hover:bg-[#173A73] text-[#F5A623] hover:text-white text-xs font-black uppercase tracking-wider border border-[#F5A623]/30 flex items-center justify-between transition-all duration-200 shadow-lg group/btn"
        >
          <span className="flex items-center gap-2">
            <Info size={14} className="text-[#F5A623]" />
            <span>{showMoreDetails ? moreBtnLabel.less : moreBtnLabel.more}</span>
          </span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${showMoreDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Collapsible Additional Details */}
      {showMoreDetails && (
        <div className="flex-1 space-y-4 mb-4 animate-fade-in pt-3 border-t border-[rgba(255,255,255,0.08)]">
          <div>
            <p className="text-xs font-semibold text-[#A7B3C4] leading-relaxed mb-2">
              {subtitle}
            </p>

            <p className="text-sm font-medium text-[#F5F7FA] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Highlights List */}
          <div className="space-y-2 pt-3 border-t border-[rgba(255,255,255,0.08)]">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#F5F7FA] leading-tight">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Customer Rating Section (1 to 10) */}
          <div className="bg-[#071426] p-3.5 rounded-2xl border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-[#F5F7FA] flex items-center gap-1.5">
                <ThumbsUp size={13} className="text-[#F5A623]" />
                <span>{ui.rate}</span>
              </span>
              {userRating && (
                <span className="text-[11px] font-extrabold text-[#071426] bg-[#F5A623] px-2 py-0.5 rounded-full">
                  {userRating}/10 ⭐
                </span>
              )}
            </div>

            {/* 10 Buttons Scale */}
            <div className="grid grid-cols-10 gap-1" dir="ltr">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isSelected = userRating === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleRateProduct(num)}
                    className={`py-1.5 rounded-lg font-black text-xs transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#071426] shadow-md scale-110 font-black ring-2 ring-[#F5A623]'
                        : 'bg-[#0E2247] text-[#A7B3C4] hover:bg-[#0B1F45] hover:text-white border border-[rgba(255,255,255,0.08)]'
                    }`}
                    title={`Rate ${num}/10`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mt-2 text-[10px] font-bold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/40 p-2 rounded-xl text-center animate-fade-in">
                {ui.thanks} ({userRating}/10)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-3 border-t border-[rgba(255,255,255,0.08)]">
        {/* Secondary Actions Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full min-h-[44px] py-2.5 bg-[#0B1F45] hover:bg-[#173A73] text-white rounded-xl font-bold text-xs transition border border-[rgba(255,255,255,0.08)] flex items-center justify-center gap-1.5"
          >
            <Info size={15} className="text-[#F5A623]" />
            <span className="truncate">{t.btn_view_specs}</span>
          </button>

          <a
            href={coachWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-1.5 bg-[#0B1F45] hover:bg-[#173A73] text-white rounded-xl font-bold transition border border-[rgba(255,255,255,0.08)] flex flex-col items-center justify-center text-center px-1"
          >
            <span className="text-xs font-black text-white flex items-center gap-1">
              <Sparkles size={13} className="text-[#F5A623]" />
              <span>{t.btn_ask_coach || 'Ask Coach'}</span>
            </span>
            <span className="text-[10px] font-bold text-[#F5A623]">
              Mohamed Zeina
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
