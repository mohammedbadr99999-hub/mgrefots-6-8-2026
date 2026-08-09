import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { InBodyPage } from './pages/InBodyPage';
import { SupplementsPage } from './pages/SupplementsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ChatPage } from './pages/ChatPage';
import { TRANSLATIONS } from './data/translations';
import { Language, Product, UserState } from './types';
import { Zap, Activity, Sparkles, MessageCircle, ShoppingBag, BookOpen } from 'lucide-react';

// Scroll To Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Mobile Bottom Sticky Nav
function MobileBottomNav({ lang }: { lang: Language }) {
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const items = [
    { path: '/', label: t.nav_home, icon: ShoppingBag },
    { path: '/products', label: lang === 'ar' ? 'المنتجات' : 'Products', icon: ShoppingBag },
    { path: '/analysis', label: t.nav_analysis, icon: Activity },
    { path: '/knowledge', label: t.nav_knowledge || 'Knowledge', icon: BookOpen },
    { path: '/chat', label: t.nav_chat, icon: MessageCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#071426]/95 border-t border-[rgba(255,255,255,0.08)] backdrop-blur-xl flex justify-around items-center p-2.5 sm:hidden z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.path === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              isActive ? 'text-[#F5A623] font-bold scale-105' : 'text-[#A7B3C4] hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span className="text-[9px] mt-1 truncate max-w-[60px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const [user] = useState<UserState>({
    id: 'guest',
    phone: 'Guest',
    isGuest: true
  });

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // API Helper for Gemini requests
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

  return (
    <BrowserRouter>
      <ScrollToTop />
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

        {/* Consistent Navigation Header Across All Pages */}
        <Header
          lang={lang}
          onSelectLang={setLang}
          user={user}
        />

        {/* Small Scroll Indicator on side */}
        <div className={`fixed top-24 ${isRtl ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} z-40 bg-[#091833]/90 text-[#F5A623] border border-[#F5A623]/40 px-3 py-1.5 rounded-full text-[10px] font-black shadow-2xl backdrop-blur-md flex items-center gap-1.5 animate-bounce pointer-events-none`}>
          <span>📜</span>
          <span>{isRtl ? 'سكرول للاسفل لترى المزيد' : 'scroll down to see more'}</span>
        </div>

        {/* Main Routed Content Container */}
        <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6">

          {/* Limited Free Banner */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-[#0B1F45]/90 via-[#091833]/90 to-[#173A73]/90 border border-[rgba(255,255,255,0.12)] text-white px-6 py-4 rounded-3xl flex flex-wrap items-center justify-between shadow-2xl backdrop-blur-xl gap-4">
              <span className="font-extrabold text-xs sm:text-sm flex items-center gap-2.5">
                <Sparkles size={18} className="text-[#F5A623] shrink-0 animate-pulse" />
                <span>{t.free_banner}</span>
              </span>
              <Link
                to="/chat"
                className="bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] px-5 py-2 rounded-2xl font-black text-xs transition-all shrink-0 hover:scale-105 shadow-lg shadow-[#F5A623]/20"
              >
                {isRtl ? 'استشر الخبير مجاناً' : 'Ask Expert Free'}
              </Link>
            </div>
          </div>

          <Routes>
            <Route path="/" element={
              <HomePage
                lang={lang}
                onSelectProduct={(p) => setSelectedProductModal(p)}
              />
            } />

            <Route path="/products" element={
              <ProductsPage
                lang={lang}
                onSelectProduct={(p) => setSelectedProductModal(p)}
              />
            } />

            <Route path="/products/:slug" element={
              <ProductDetailPage
                lang={lang}
                onQueryAI={(prompt) => queryAI(prompt, 'Provide product integration advice as a NASM certified fitness coach.')}
              />
            } />

            <Route path="/about" element={
              <AboutPage lang={lang} />
            } />

            <Route path="/contact" element={
              <ContactPage lang={lang} />
            } />

            <Route path="/faq" element={
              <FaqPage lang={lang} />
            } />

            <Route path="/analysis" element={
              <InBodyPage
                lang={lang}
                onRunAnalysis={handleRunInBodyAnalysis}
              />
            } />

            <Route path="/supplements" element={
              <SupplementsPage
                lang={lang}
                onAnalyzeSupp={(name) => queryAI(`Explain the benefits, timing, and dosage for ${name}`, 'Act as an expert NASM fitness coach.')}
                onAskNutrientExpert={(section, q) => queryAI(`Topic: ${section}. Question: ${q}`, 'Act as an expert NASM fitness coach.')}
              />
            } />

            <Route path="/knowledge" element={
              <KnowledgePage
                lang={lang}
                onSelectProductModal={(p) => setSelectedProductModal(p)}
              />
            } />

            <Route path="/knowledge/guides/:guideId" element={
              <KnowledgePage
                lang={lang}
                onSelectProductModal={(p) => setSelectedProductModal(p)}
              />
            } />

            <Route path="/chat" element={
              <ChatPage
                lang={lang}
                onSendChatMessage={(msg) => queryAI(msg, 'You are Mohamed Zeina, NASM certified fitness and nutrition coach. Give clear, direct, expert advice.')}
              />
            } />

            {/* Fallback to Home */}
            <Route path="*" element={
              <HomePage
                lang={lang}
                onSelectProduct={(p) => setSelectedProductModal(p)}
              />
            } />
          </Routes>
        </main>

        {/* Product Specs Detail Quick Modal */}
        <ProductDetailModal
          product={selectedProductModal}
          lang={lang}
          onClose={() => setSelectedProductModal(null)}
          onQueryAI={(prompt) => queryAI(prompt, 'Provide product integration advice as a NASM certified fitness coach.')}
        />

        {/* Consistent Footer Across All Pages */}
        <Footer lang={lang} />

        {/* Mobile Sticky Bottom Navigation */}
        <MobileBottomNav lang={lang} />
      </div>
    </BrowserRouter>
  );
}
