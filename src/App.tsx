import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TRANSLATIONS } from './data/translations';
import { Language, Product } from './types';
import { Sparkles, MessageCircle, ShoppingBag, BookOpen } from 'lucide-react';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((module) => ({ default: module.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then((module) => ({ default: module.FaqPage })));
const SupplementsPage = lazy(() => import('./pages/SupplementsPage').then((module) => ({ default: module.SupplementsPage })));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage').then((module) => ({ default: module.KnowledgePage })));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then((module) => ({ default: module.ArticlesPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((module) => ({ default: module.ArticlePage })));
const ChatPage = lazy(() => import('./pages/ChatPage').then((module) => ({ default: module.ChatPage })));
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal').then((module) => ({ default: module.ProductDetailModal })));

const SUPPORTED_LANGUAGES: Language[] = ['en', 'rw', 'ar'];

function getInitialLanguage(): Language {
  const savedLanguage = window.localStorage.getItem('mgrefots-language') as Language | null;
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) return savedLanguage;
  return 'en';
}

function PageLoading({ lang }: { lang: Language }) {
  const label = lang === 'ar' ? 'جارٍ تحميل الصفحة' : lang === 'rw' ? 'Urupapuro rurimo gutangira' : 'Loading page';

  return (
    <div className="min-h-[45vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="flex items-center gap-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#091833]/80 px-5 py-3 text-sm font-bold text-[#A7B3C4]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#F5A623]/30 border-t-[#F5A623]" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}

// Scroll To Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = `https://www.mgrefots.com${pathname === '/' ? '/' : pathname}`;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const openGraphUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');

    canonical?.setAttribute('href', canonicalUrl);
    openGraphUrl?.setAttribute('content', canonicalUrl);
  }, [pathname]);

  return null;
}

// Mobile Bottom Sticky Nav
function MobileBottomNav({ lang }: { lang: Language }) {
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const items = [
    { path: '/', label: t.nav_home, icon: ShoppingBag },
    { path: '/products', label: lang === 'ar' ? 'المنتجات' : lang === 'rw' ? 'Ibicuruzwa' : 'Products', icon: ShoppingBag },
    { path: '/analysis', label: t.nav_analysis, icon: MessageCircle },
    { path: '/knowledge', label: t.nav_knowledge || 'Knowledge', icon: BookOpen },
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
            aria-current={isActive ? 'page' : undefined}
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
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [quickQuestion, setQuickQuestion] = useState('');
  const [quickAnswer, setQuickAnswer] = useState('');
  const [isQuickAnswering, setIsQuickAnswering] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const quickExpertCopy = {
    en: {
      placeholder: 'Put your question here and press ASK to get the answer',
      label: 'Ask the MGREFOTS AI Expert',
      loading: 'Preparing your answer…',
      fullPage: 'Open full expert consultation'
    },
    rw: {
      placeholder: 'Andika ikibazo cyawe hano, ukande ASK ubone igisubizo',
      label: 'Baza Impuguke ya AI ya MGREFOTS',
      loading: 'Turimo gutegura igisubizo…',
      fullPage: 'Fungura urupapuro rw’impuguke'
    },
    ar: {
      placeholder: 'ضع سؤالك هنا واضغط على ASK وستحصل على الإجابة',
      label: 'اسأل خبير MGREFOTS بالذكاء الاصطناعي',
      loading: 'جارٍ إعداد الإجابة…',
      fullPage: 'افتح صفحة الاستشارة الكاملة'
    }
  }[lang];

  useEffect(() => {
    window.localStorage.setItem('mgrefots-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  // API Helper for Gemini requests
  const queryAI = async (prompt: string, systemInstruction?: string) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction, lang }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || 'No response from AI';
      }
    } catch (e) {
      console.warn('Backend API unavailable, using client fallback', e);
    }

    return lang === 'ar'
      ? 'تعذر الوصول إلى الخبير الآن. حاول مرة أخرى أو تواصل مباشرة عبر واتساب.'
      : lang === 'rw'
        ? 'Ntitwashoboye kugera ku nzobere ubu. Ongera ugerageze cyangwa uyivugishe kuri WhatsApp.'
        : 'The AI expert is temporarily unavailable. Please try again or contact the human expert on WhatsApp.';
  };

  const handleQuickExpertQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = quickQuestion.trim();
    if (!question || isQuickAnswering) return;

    setIsQuickAnswering(true);
    setQuickAnswer('');
    try {
      const answer = await queryAI(question, 'This question comes from the homepage quick-answer box. Answer directly and concisely while following the approved MGREFOTS expert methodology.');
      setQuickAnswer(answer);
    } finally {
      setIsQuickAnswering(false);
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteMetadata />
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
        />

        {/* Small Scroll Indicator on side */}
        <div className={`fixed top-24 ${isRtl ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} z-40 bg-[#091833]/90 text-[#F5A623] border border-[#F5A623]/40 px-3 py-1.5 rounded-full text-[10px] font-black shadow-2xl backdrop-blur-md flex items-center gap-1.5 animate-bounce pointer-events-none`}>
          <span>📜</span>
          <span>{isRtl ? 'مرّر لأسفل لرؤية المزيد' : lang === 'rw' ? 'Manuka hasi urebe ibindi' : 'Scroll down to see more'}</span>
        </div>

        {/* Main Routed Content Container */}
        <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6">

          {/* Homepage quick expert question */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-[#0B1F45]/90 via-[#091833]/90 to-[#173A73]/90 border border-[rgba(255,255,255,0.12)] text-white px-4 sm:px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleQuickExpertQuestion} className="flex flex-col sm:flex-row items-stretch gap-3">
                <label htmlFor="quick-expert-question" className="sr-only">{quickExpertCopy.label}</label>
                <div className="relative flex-1">
                  <Sparkles size={17} className={`absolute top-1/2 -translate-y-1/2 text-[#F5A623] ${isRtl ? 'right-4' : 'left-4'}`} aria-hidden="true" />
                  <input
                    id="quick-expert-question"
                    type="text"
                    value={quickQuestion}
                    onChange={(event) => setQuickQuestion(event.target.value)}
                    maxLength={12000}
                    placeholder={quickExpertCopy.placeholder}
                    className={`min-h-[48px] w-full rounded-2xl border border-white/10 bg-[#030914]/75 py-3 text-sm font-bold text-white outline-none transition placeholder:text-[#94A3B8] focus:border-[#F5A623]/70 ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isQuickAnswering || !quickQuestion.trim()}
                  className="min-h-[48px] rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] px-8 py-3 text-sm font-black text-[#030914] shadow-lg shadow-[#F5A623]/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isQuickAnswering ? '…' : 'ASK'}
                </button>
              </form>

              <div aria-live="polite" aria-busy={isQuickAnswering}>
                {isQuickAnswering ? (
                  <p className={`mt-3 animate-pulse text-xs font-bold text-[#F5A623] ${isRtl ? 'text-right' : 'text-left'}`}>{quickExpertCopy.loading}</p>
                ) : quickAnswer ? (
                  <div className={`mt-4 rounded-2xl border border-[#F5A623]/25 bg-[#030914]/70 p-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <p className="whitespace-pre-wrap text-sm font-medium leading-7 text-[#E2E8F0]">{quickAnswer}</p>
                    <Link to="/analysis" className="mt-3 inline-flex text-xs font-black text-[#F5A623] hover:text-white transition">
                      {quickExpertCopy.fullPage}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <Suspense fallback={<PageLoading lang={lang} />}>
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
              <ChatPage
                lang={lang}
                onSendChatMessage={(msg) => queryAI(msg, 'This is the main Ask the Expert page. Answer the visitor directly and use the approved MGREFOTS methodology.')}
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

            <Route path="/articles" element={
              <ArticlesPage lang={lang} />
            } />

            <Route path="/articles/:slug" element={
              <ArticlePage
                lang={lang}
                onSelectProductModal={(p) => setSelectedProductModal(p)}
              />
            } />

            <Route path="/chat" element={
              <ChatPage
                lang={lang}
                onSendChatMessage={(msg) => queryAI(msg, 'This legacy route uses the same MGREFOTS AI Expert methodology as the main consultation page.')}
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
          </Suspense>
        </main>

        {/* Product Specs Detail Quick Modal */}
        <Suspense fallback={null}>
          <ProductDetailModal
            product={selectedProductModal}
            lang={lang}
            onClose={() => setSelectedProductModal(null)}
            onQueryAI={(prompt) => queryAI(prompt, 'Provide product integration advice as a NASM certified fitness coach.')}
          />
        </Suspense>

        {/* Consistent Footer Across All Pages */}
        <Footer lang={lang} />

        {/* Mobile Sticky Bottom Navigation */}
        <MobileBottomNav lang={lang} />
      </div>
    </BrowserRouter>
  );
}
