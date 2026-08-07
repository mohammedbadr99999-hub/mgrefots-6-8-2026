import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquare, Sparkles, Send, Clock, Beaker, FileText, Star, ShoppingCart, ThumbsUp, ShieldCheck, ListCheck } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  lang: Language;
  onClose: () => void;
  onQueryAI: (prompt: string) => Promise<string>;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
  onQueryAI
}) => {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [modalUserRating, setModalUserRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const name = product.name[lang] || product.name.en;
  const subtitle = product.subtitle[lang] || product.subtitle.en;
  const description = product.description[lang] || product.description.en;
  const usage = product.usage[lang] || product.usage.en;
  const ingredients = product.ingredients[lang] || product.ingredients.en;
  const otherIngredients = product.otherIngredients ? (product.otherIngredients[lang] || product.otherIngredients.en) : null;
  const science = product.scienceNote[lang] || product.scienceNote.en;
  const whatsappMsg = product.whatsappText[lang] || product.whatsappText.en;
  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(whatsappMsg)}`;

  const handleRateProduct = (score: number) => {
    setModalUserRating(score);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 4000);
  };

  const handleSendAiQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsLoadingAI(true);
    setAiResponse('');
    try {
      const prompt = `Product: ${name}. Question: ${aiQuestion}. Provide an expert, science-backed NASM response in ${lang === 'ar' ? 'Arabic' : lang === 'rw' ? 'Kinyarwanda' : 'English'}.`;
      const reply = await onQueryAI(prompt);
      setAiResponse(reply);
    } catch (err) {
      setAiResponse(isRtl ? 'حدث خطأ أثناء الاتصال بالمساعد الذكي.' : 'Error contacting AI assistant.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#071426] border border-[rgba(255,255,255,0.08)] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#F5F7FA] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#0B1F45] hover:bg-[#173A73] border border-[rgba(255,255,255,0.08)] text-[#A7B3C4] hover:text-white flex items-center justify-center font-black transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Price / Sold Out Badge */}
            <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md ${
              product.isSoldOut 
                ? 'bg-red-950 text-red-400 border border-red-800' 
                : 'bg-[#0B1F45] text-[#F5A623] border border-[#F5A623]/40'
            }`}>
              {product.isSoldOut ? (isRtl ? 'نفدت الكمية' : 'Sold Out') : product.price}
            </span>

            <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/30 px-3 py-1 rounded-full">
              {product.size} · {product.servings}
            </span>

            {/* Rating Pill */}
            <span className="text-xs font-black text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/30 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={13} fill="currentColor" />
              <span>{product.rating.toFixed(1)} / 5.0</span>
            </span>

            {/* Buyers count */}
            <span className="text-xs font-extrabold text-[#F5F7FA] bg-[#0B1F45] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full flex items-center gap-1">
              <ShoppingCart size={13} className="text-[#F5A623]" />
              <span>{product.buyersCount.toLocaleString()} {isRtl ? 'مشتري' : 'buyers'}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {name}
          </h2>
          <p className="text-sm font-semibold text-[#A7B3C4] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Customer Interactive Rating (1 to 10) */}
        <div className="bg-[#0E2247] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-[#F5F7FA] flex items-center gap-1.5">
              <ThumbsUp size={15} className="text-[#F5A623]" />
              <span>{isRtl ? 'قيم هذا المنتج (من 1 إلى 10):' : 'Rate this product (1-10):'}</span>
            </span>
            {modalUserRating && (
              <span className="text-xs font-extrabold text-[#071426] bg-[#F5A623] px-2.5 py-0.5 rounded-full">
                {modalUserRating}/10 ⭐
              </span>
            )}
          </div>

          <div className="grid grid-cols-10 gap-1.5" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = modalUserRating === num;
              return (
                <button
                  key={num}
                  onClick={() => handleRateProduct(num)}
                  className={`py-2 rounded-xl font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#071426] shadow-lg scale-110 ring-2 ring-[#F5A623]'
                      : 'bg-[#0B1F45] text-[#A7B3C4] hover:bg-[#173A73] hover:text-white border border-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-2.5 text-xs font-bold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/40 p-2.5 rounded-xl text-center animate-fade-in">
              {isRtl
                ? `شغف ورأيك يهمنا! تم تسجيل تقييمك (${modalUserRating}/10) بنجاح.`
                : `Thank you! Your rating of (${modalUserRating}/10) was submitted successfully.`}
            </div>
          )}
        </div>

        {/* Product Details Grid */}
        <div className="space-y-6 mb-8">
          {/* Description Box */}
          <div className="bg-[#0E2247] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)]">
            <p className="text-sm text-[#F5F7FA] leading-relaxed font-medium">
              {description}
            </p>

            {/* Claims tags if any */}
            {product.claims && product.claims.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                {product.claims.map((claim, idx) => (
                  <span key={idx} className="bg-[#0B1F45] border border-[#F5A623]/30 text-[#F5A623] text-xs font-black px-3 py-1 rounded-full">
                    ✓ {claim}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Supplement Facts Table (If present e.g. B-Complex) */}
          {product.supplementFacts && product.supplementFacts.length > 0 && (
            <div className="bg-[#0E2247] p-5 rounded-2xl border border-[#F5A623]/30">
              <h4 className="font-black text-[#F5A623] text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <ListCheck size={18} className="text-[#F5A623]" />
                <span>{isRtl ? 'جدول القيمة الغذائية التفصيلية (Supplement Facts)' : 'Supplement Facts'}</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#F5F7FA] font-medium">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.08)] text-[#A7B3C4] font-bold uppercase text-[10px]">
                      <th className="py-2 px-3">{isRtl ? 'المكون' : 'Ingredient'}</th>
                      <th className="py-2 px-3">{isRtl ? 'الكمية/الجرعة' : 'Amount / Serving'}</th>
                      <th className="py-2 px-3">{isRtl ? 'النسبة اليومية (%DV)' : '% Daily Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.supplementFacts.map((fact, idx) => (
                      <tr key={idx} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[#0B1F45]/60 transition">
                        <td className="py-2 px-3 font-semibold text-white">{fact.ingredient}</td>
                        <td className="py-2 px-3 font-mono text-[#F5A623]">{fact.amount}</td>
                        <td className="py-2 px-3 font-mono text-[#FF8A00]">{fact.dv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dosage & Timing */}
          <div className="bg-[#0E2247] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] flex items-start gap-4">
            <div className="p-3 bg-[#0B1F45] rounded-xl text-[#F5A623] shrink-0 border border-[#F5A623]/30">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="font-black text-[#F5A623] text-sm mb-1 uppercase tracking-wider">
                {t.modal_usage}
              </h4>
              <p className="text-sm text-[#F5F7FA] font-medium leading-relaxed">
                {usage}
              </p>
            </div>
          </div>

          {/* Key Ingredients */}
          <div className="bg-[#0E2247] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] flex items-start gap-4">
            <div className="p-3 bg-[#0B1F45] rounded-xl text-[#F5A623] shrink-0 border border-[#F5A623]/30">
              <Beaker size={22} />
            </div>
            <div>
              <h4 className="font-black text-[#F5A623] text-sm mb-1 uppercase tracking-wider">
                {t.modal_ingredients}
              </h4>
              <p className="text-sm text-[#F5F7FA] font-medium leading-relaxed">
                {ingredients}
              </p>

              {otherIngredients && (
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="block text-xs font-bold text-[#A7B3C4] mb-1">
                    {isRtl ? 'المكونات الأخرى:' : 'Other Ingredients:'}
                  </span>
                  <p className="text-xs text-[#A7B3C4] font-normal leading-relaxed">
                    {otherIngredients}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NASM Science Note */}
          <div className="bg-[#0E2247] p-5 rounded-2xl border border-[#F5A623]/30 flex items-start gap-4">
            <div className="p-3 bg-[#0B1F45] rounded-xl text-[#F5A623] shrink-0 border border-[#F5A623]/30">
              <FileText size={22} />
            </div>
            <div>
              <h4 className="font-black text-[#F5A623] text-sm mb-1 uppercase tracking-wider">
                {t.modal_science}
              </h4>
              <p className="text-xs text-[#F5F7FA] font-medium leading-relaxed">
                {science}
              </p>
            </div>
          </div>
        </div>

        {/* AI Query Box inside Modal */}
        <div className="p-6 bg-[#0E2247] rounded-2xl border border-[rgba(255,255,255,0.08)] mb-8">
          <h4 className="font-black text-sm text-white mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-[#F5A623]" />
            <span>{t.modal_ask_ai_title}</span>
          </h4>

          <form onSubmit={handleSendAiQuestion} className="space-y-3">
            <textarea
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={t.modal_ai_placeholder}
              rows={2}
              className="w-full p-4 bg-[#071426] rounded-xl border border-[rgba(255,255,255,0.08)] focus:border-[#F5A623] text-[#F5F7FA] text-sm font-medium outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoadingAI || !aiQuestion.trim()}
              className="w-full py-3 bg-[#0B1F45] hover:bg-[#173A73] text-white font-black text-xs uppercase tracking-wider rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.08)] shadow-lg"
            >
              {isLoadingAI ? (
                <span className="animate-pulse text-[#F5A623]">Consulting AI...</span>
              ) : (
                <>
                  <Send size={15} className="text-[#F5A623]" />
                  <span>{t.modal_ai_btn}</span>
                </>
              )}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-4 p-4 bg-[#071426] rounded-xl border border-[#F5A623]/30 text-xs text-[#F5F7FA] leading-relaxed font-medium animate-fade-in">
              {aiResponse}
            </div>
          )}
        </div>

        {/* Order WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#071426] rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-3 transition hover:scale-[1.01]"
        >
          <MessageSquare size={20} className="text-[#071426]" />
          <span>{t.btn_order_whatsapp}</span>
        </a>
      </div>
    </div>,
    document.body
  );
};
