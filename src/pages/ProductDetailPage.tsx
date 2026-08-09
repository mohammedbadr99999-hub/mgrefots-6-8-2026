import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { Language, Product } from '../types';
import { ProductGraphic } from '../components/ProductGraphic';
import { 
  ArrowLeft, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, 
  Star, ShoppingCart, ThumbsUp, Zap, HelpCircle, FileText
} from 'lucide-react';

interface ProductDetailPageProps {
  lang: Language;
  onQueryAI: (prompt: string) => Promise<string>;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ lang, onQueryAI }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Match product by id or slug alias
  const product = PRODUCTS.find((p) => p.id === slug || p.id.replace(/-/g, '') === slug?.replace(/-/g, ''));

  if (!product) {
    return (
      <div className="text-center py-20 space-y-6 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {isRtl ? 'المنتج غير موجود' : 'Product Not Found'}
        </h2>
        <p className="text-slate-400 text-sm">
          {isRtl ? 'عذراً، لم نتمكن من العثور على المنتج المطلوب.' : 'Sorry, the requested product could not be located.'}
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة إلى المكملات' : 'Back to Products'}</span>
        </Link>
      </div>
    );
  }

  const name = product.name[lang] || product.name.en;
  const subtitle = product.subtitle[lang] || product.subtitle.en;
  const description = product.description[lang] || product.description.en;
  const highlights = product.highlights[lang] || product.highlights.en;
  const usage = product.usage[lang] || product.usage.en;
  const ingredients = product.ingredients[lang] || product.ingredients.en;
  const scienceNote = product.scienceNote[lang] || product.scienceNote.en;
  const whatsappMsg = product.whatsappText[lang] || product.whatsappText.en;
  const badgeText = product.badge[lang] || product.badge.en;

  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(whatsappMsg)}`;
  const coachWhatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(`مرحبا coach Mohamed Zeina أود الاستفسار عن كيفية استخدام ${name} مع برنامجي الرياضي`)}`;

  const handleRateProduct = (score: number) => {
    setUserRating(score);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 4000);
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiAnswer('');
    try {
      const response = await onQueryAI(
        `Product: ${product.name.en}. Question: ${aiQuestion}`
      );
      setAiAnswer(response);
    } catch (e) {
      setAiAnswer(isRtl ? 'عذراً، تعذر الاتصال بالخبير.' : 'Could not contact AI expert.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#091833] hover:bg-[#0B1F45] text-[#94A3B8] hover:text-white border border-[rgba(255,255,255,0.08)] font-bold text-xs transition"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'رجوع' : 'Back'}</span>
        </button>

        <div className="text-xs font-bold text-[#F5A623] bg-[#091833] border border-[#F5A623]/30 px-3 py-1 rounded-full">
          {product.category.toUpperCase()} · {badgeText}
        </div>
      </div>

      {/* Main Product Specs Card */}
      <div className="bg-[#091833]/80 backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Graphic */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
              <ProductGraphic
                productId={product.id}
                name={name}
                category={product.category}
                gradient={product.gradient}
                image={product.image}
              />
              <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} ${product.badgeColor} text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xl border border-white/20`}>
                {badgeText}
              </div>
            </div>

            {/* Ratings & Buyers Count Row */}
            <div className="flex items-center justify-between bg-[#030914] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-inner">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#F5A623]">
                  <Star size={18} fill="currentColor" />
                </div>
                <span className="text-sm font-black text-[#F5A623]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs font-bold text-[#94A3B8]">
                  ({product.reviewsCount} {isRtl ? 'تقييم' : 'reviews'})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/30 px-3 py-1.5 rounded-xl shadow-md">
                <ShoppingCart size={14} className="text-[#F5A623]" />
                <span>{product.buyersCount.toLocaleString()} {isRtl ? 'مشتري' : 'buyers'}</span>
              </div>
            </div>
          </div>

          {/* Right: Specs & Actions */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-2">
                {name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#F5A623]">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <div>
                <span className="text-[10px] font-bold text-[#94A3B8] block uppercase tracking-widest">
                  {isRtl ? 'السعر الرسمي' : 'Official Price'}
                </span>
                <span className={`text-xl sm:text-2xl font-black ${
                  product.isSoldOut ? 'text-red-400' : 'text-[#F5A623]'
                }`}>
                  {product.isSoldOut ? (isRtl ? 'نفدت الكمية (Sold Out)' : 'Sold Out') : product.price}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-[#94A3B8] block uppercase tracking-widest">
                  {isRtl ? 'الحجم والجرعات' : 'Size & Servings'}
                </span>
                <span className="text-xs font-black text-white">
                  {product.size} ({product.servings})
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-[#F5F7FA] leading-relaxed">
              {description}
            </p>

            {/* Primary Order Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] rounded-2xl font-black text-base transition shadow-xl shadow-[#F5A623]/20 flex items-center justify-center gap-3"
            >
              <MessageSquare size={20} />
              <span>{t.btn_order_whatsapp}</span>
            </a>

            {/* Direct Ask Coach Button */}
            <a
              href={coachWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#0B1F45] hover:bg-[#173A73] text-white rounded-2xl font-bold text-xs transition border border-[#F5A623]/40 flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles size={16} className="text-[#F5A623]" />
              <span>
                {isRtl ? 'تحدث مع الكابتن محمد زينة للحصول على الاستشارة' : 'Consult Coach Mohamed Zeina Directly'}
              </span>
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-4 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Zap size={18} className="text-[#F5A623]" />
            <span>{isRtl ? 'مميزات المكمل والفوائد السريرية' : 'Clinical Highlights & Key Benefits'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#030914]/60 p-3.5 rounded-2xl border border-[rgba(255,255,255,0.06)]">
                <CheckCircle2 size={18} className="text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#F5F7FA] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage & Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <div className="bg-[#030914] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} />
              <span>{isRtl ? 'طريقة الاستخدام والجرعة' : 'Directions & Dosage'}</span>
            </h4>
            <p className="text-xs font-medium text-[#A7B3C4] leading-relaxed">
              {usage}
            </p>
          </div>

          <div className="bg-[#030914] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-2">
            <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>{isRtl ? 'المكونات والنقاء' : 'Ingredients & Purity'}</span>
            </h4>
            <p className="text-xs font-medium text-[#A7B3C4] leading-relaxed">
              {ingredients}
            </p>
          </div>
        </div>

        {/* Supplement Facts Table if exists */}
        {product.supplementFacts && (
          <div className="space-y-3 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {isRtl ? 'حقائق المكمل الغذائي (Supplement Facts)' : 'Supplement Facts'}
            </h4>

            <div className="bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
              <table className="w-full text-left text-xs" dir="ltr">
                <thead className="bg-[#0B1F45] text-[#F5A623] font-black uppercase">
                  <tr>
                    <th className="p-3">Ingredient</th>
                    <th className="p-3">Amount per serving</th>
                    <th className="p-3">% Daily Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.06)] text-[#F5F7FA] font-medium">
                  {product.supplementFacts.map((row, i) => (
                    <tr key={i} className="hover:bg-[#0B1F45]/30">
                      <td className="p-3 font-semibold">{row.ingredient}</td>
                      <td className="p-3">{row.amount}</td>
                      <td className="p-3 text-[#F5A623]">{row.dv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Science Note */}
        <div className="bg-gradient-to-r from-[#0B1F45] to-[#091833] p-6 rounded-2xl border border-[#F5A623]/30 space-y-2">
          <span className="text-[11px] font-black text-[#F5A623] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} />
            <span>{isRtl ? 'ملاحظة الفسيولوجيا والبحث العلمي (NASM Note)' : 'NASM Physiology Note'}</span>
          </span>
          <p className="text-xs font-medium text-[#F5F7FA] leading-relaxed">
            {scienceNote}
          </p>
        </div>

        {/* Customer Rating Section (1-10) */}
        <div className="bg-[#030914] p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white flex items-center gap-2">
              <ThumbsUp size={15} className="text-[#F5A623]" />
              <span>{isRtl ? 'قيم هذا المنتج (من 1 إلى 10):' : 'Rate this product (1-10):'}</span>
            </span>
            {userRating && (
              <span className="text-xs font-extrabold text-[#071426] bg-[#F5A623] px-3 py-0.5 rounded-full">
                {userRating}/10 ⭐
              </span>
            )}
          </div>

          <div className="grid grid-cols-10 gap-1.5" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = userRating === num;
              return (
                <button
                  key={num}
                  onClick={() => handleRateProduct(num)}
                  className={`py-2 rounded-xl font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#071426] shadow-md scale-110 ring-2 ring-[#F5A623]'
                      : 'bg-[#0E2247] text-[#A7B3C4] hover:bg-[#0B1F45] hover:text-white border border-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="text-xs font-bold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/40 p-3 rounded-xl text-center animate-fade-in">
              {isRtl
                ? `شكراً لك! تم تسجيل تقييمك (${userRating}/10) بنجاح.`
                : `Thank you! Your rating of (${userRating}/10) was submitted successfully.`}
            </div>
          )}
        </div>

        {/* Interactive AI Assistant Query for this Product */}
        <div className="bg-[#030914] p-6 rounded-2xl border border-blue-900/50 space-y-4">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <HelpCircle size={16} className="text-blue-400" />
            <span>
              {isRtl ? `اسأل الخبير حول ${name}` : `Ask Coach AI About ${name}`}
            </span>
          </h4>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskAI();
              }}
              placeholder={isRtl ? 'مثال: متى أتناوله؟ وهل يتعارض مع التنشيف؟' : 'e.g. Can I stack this with Creatine?'}
              className="flex-1 px-4 py-3 bg-[#091833] rounded-xl border border-[rgba(255,255,255,0.1)] text-xs text-white outline-none focus:border-[#F5A623]"
            />
            <button
              onClick={handleAskAI}
              disabled={isAiLoading || !aiQuestion.trim()}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl disabled:opacity-50 transition shrink-0"
            >
              {isAiLoading ? '...' : (isRtl ? 'إرسال' : 'Ask')}
            </button>
          </div>

          {aiAnswer && (
            <div className="p-4 bg-[#091833] rounded-xl border border-blue-800/60 text-xs text-slate-200 leading-relaxed font-medium">
              <span className="font-bold text-[#F5A623] block mb-1">
                {isRtl ? 'إجابة خبير MGREFOTS:' : 'MGREFOTS Coach Advice:'}
              </span>
              {aiAnswer}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
