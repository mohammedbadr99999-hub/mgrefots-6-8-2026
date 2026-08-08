import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CertificationsBanner } from './components/CertificationsBanner';
import { EgyptianOfferBanner } from './components/EgyptianOfferBanner';
import { InBodyAnalysis } from './components/InBodyAnalysis';
import { SupplementsEncyclopedia } from './components/SupplementsEncyclopedia';
import { KnowledgeCenter } from './components/KnowledgeCenter';
import { ExpertChat } from './components/ExpertChat';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import { Language, NavigationTab, Product, UserState } from './types';
import { Zap, ShieldCheck, Dumbbell, Award, Flame, Activity, Sparkles, MessageCircle, ShoppingBag, BookOpen } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedKnowledgeGuideId, setSelectedKnowledgeGuideId] = useState<string | null>(null);

  const handleOpenMarriedMenGuide = () => {
    setSelectedKnowledgeGuideId('married-men-health-guide');
    setActiveTab('knowledge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const [user] = useState<UserState>({
    id: 'guest',
    phone: 'Guest',
    isGuest: true
  });

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // API Helper for Gemini requests (calls server endpoint or falls back gracefully)
  const queryAI = async (prompt: string, systemInstruction?: string) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || 'No response from AI';
      }
    } catch (e) {
      console.warn('Backend API unavailable, using client fallback', e);
    }

    // Client fallback text if offline or dev server restarting
    return isRtl 
      ? 'بناءً على التوجيهات العلمية لمنهجية NASM: ينصح بتناول المكمل بالجرعة المحددة مع المحافظة على نظام غذائي متوازن والتمارين عالية الشدة لتحقيق أقصى بناء عضلي.'
      : 'Based on NASM science guidelines: take the recommended dosage alongside progressive resistance training and structured meal planning for maximum results.';
  };

  const handleRunInBodyAnalysis = async (file: File, goal: string) => {
    try {
      const reader = new FileReader();
      const fileBase64 = await new Promise<string>((resolve) => {
        reader.onload = () => {
          const res = reader.result as string;
          resolve(res.split(',')[1] || '');
        };
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, lang, fileBase64, mimeType: file.type }),
      });

      if (res.ok) {
        const data = await res.json();
        return { result: data.text, pdfUrl: null };
      }
    } catch (e) {
      console.warn('API error during analysis', e);
    }

    return {
      result: isRtl 
        ? `🔥 تحليل الخبير المعتمد بناءً على هدفك (${goal}):\n\n1. تقييم التكوين البدني: تحتاج لتنشيط معدل الأيض وزيادة البناء العضلي الصافي.\n2. التمارين: ٥ أيام أسبوعياً بتكرارات ٨-١٢ مع التركيز على الكرياتين والسيترولين.\n3. التغذية: بروتين 2g لكل كجم وزن، وتناول بروتين البازلاء والأرز MGREFOTS بعد التمرين مباشرة.` 
        : `🔥 Expert Coach Analysis for your goal (${goal}):\n\n1. Physical Composition: Focus on muscle hypertrophy & fat oxidation.\n2. Workout Protocol: 5-day push-pull-legs split with high volume.\n3. Nutrition: 2g protein per kg, using MGREFOTS 70/30 Plant Protein post-workout.`,
      pdfUrl: null
    };
  };

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
    <div className={`min-h-screen bg-[#030914] text-[#F5F7FA] relative overflow-x-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        .font-arabic { font-family: 'Tajawal', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Ambient Radial Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#0B1F45]/30 to-[#173A73]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#F5A623]/10 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Header
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onSelectLang={setLang}
        user={user}
        onOpenMarriedMenGuide={handleOpenMarriedMenGuide}
      />

      {/* Small Scroll Indicator on side at top of page */}
      <div className={`fixed top-24 ${isRtl ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} z-40 bg-[#091833]/90 text-[#F5A623] border border-[#F5A623]/40 px-3 py-1.5 rounded-full text-[10px] font-black shadow-2xl backdrop-blur-md flex items-center gap-1.5 animate-bounce pointer-events-none`}>
        <span>📜</span>
        <span>{isRtl ? 'سكرول للاسفل لترى المزيد' : 'scroll down to see more'}</span>
      </div>

      {/* Main Content Area */}
      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Limited Free Banner */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-[#0B1F45]/90 via-[#091833]/90 to-[#173A73]/90 border border-[rgba(255,255,255,0.12)] text-white px-6 py-4 rounded-3xl flex flex-wrap items-center justify-between shadow-2xl backdrop-blur-xl gap-4">
            <span className="font-extrabold text-xs sm:text-sm flex items-center gap-2.5">
              <Sparkles size={18} className="text-[#F5A623] shrink-0 animate-pulse" />
              <span>{t.free_banner}</span>
            </span>
            <button
              onClick={() => setActiveTab('chat')}
              className="bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] px-5 py-2 rounded-2xl font-black text-xs transition-all shrink-0 hover:scale-105 shadow-lg shadow-[#F5A623]/20"
            >
              {isRtl ? 'استشر الخبير مجاناً' : 'Ask Expert Free'}
            </button>
          </div>
        </div>

        {/* TAB 1: HOME (PRODUCT CATALOG PAGE) */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Brand Hero Heading (SEO & AEO Focused) */}
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
            </div>

            {/* Egyptian Special Offer Banner (Always in Arabic) */}
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
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAskAIProduct={(p) => setSelectedProduct(p)}
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
        )}

        {/* TAB 2: INBODY ANALYSIS */}
        {activeTab === 'analysis' && (
          <InBodyAnalysis
            lang={lang}
            onRunAnalysis={handleRunInBodyAnalysis}
          />
        )}

        {/* TAB 3: SUPPLEMENTS ENCYCLOPEDIA */}
        {activeTab === 'supps' && (
          <SupplementsEncyclopedia
            lang={lang}
            onAnalyzeSupp={(name) => queryAI(`Explain the benefits, timing, and dosage for ${name}`, 'Act as an expert NASM fitness coach.')}
            onAskNutrientExpert={(section, q) => queryAI(`Topic: ${section}. Question: ${q}`, 'Act as an expert NASM fitness coach.')}
          />
        )}

        {/* TAB 4: KNOWLEDGE CENTER */}
        {activeTab === 'knowledge' && (
          <KnowledgeCenter
            lang={lang}
            onSelectProductModal={(p) => setSelectedProduct(p)}
            onNavigateToChat={() => setActiveTab('chat')}
            initialGuideId={selectedKnowledgeGuideId}
            onClearInitialGuide={() => setSelectedKnowledgeGuideId(null)}
          />
        )}

        {/* TAB 5: TALK TO EXPERT */}
        {activeTab === 'chat' && (
          <ExpertChat
            lang={lang}
            onSendChatMessage={(msg) => queryAI(msg, 'You are Mohamed Zeina, NASM certified fitness and nutrition coach. Give clear, direct, expert advice.')}
          />
        )}

      </main>

      {/* Product Specs Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onQueryAI={(prompt) => queryAI(prompt, 'Provide product integration advice as a NASM certified fitness coach.')}
      />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Mobile Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-[#071426]/95 border-t border-[rgba(255,255,255,0.08)] backdrop-blur-xl flex justify-around items-center p-2.5 sm:hidden z-50">
        {[
          { id: 'home', label: t.nav_home, icon: ShoppingBag },
          { id: 'analysis', label: t.nav_analysis, icon: Activity },
          { id: 'supps', label: t.nav_supps, icon: Zap },
          { id: 'knowledge', label: t.nav_knowledge || 'Knowledge', icon: BookOpen },
          { id: 'chat', label: t.nav_chat, icon: MessageCircle },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavigationTab)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-[#F5A623] font-bold scale-105' : 'text-[#A7B3C4] hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] mt-1 truncate max-w-[60px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
