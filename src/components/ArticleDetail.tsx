import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Calendar, UserCheck, ShieldCheck, 
  Sparkles, ExternalLink, Share2, Tag, MessageSquare, ShoppingBag 
} from 'lucide-react';
import { KnowledgeArticle, Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';

interface ArticleDetailProps {
  article: KnowledgeArticle;
  lang: Language;
  onBack: () => void;
  onSelectProductModal?: (product: Product) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  lang,
  onBack,
  onSelectProductModal
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const relatedProduct = PRODUCTS.find((p) => p.id === article.relatedProductId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title[lang] || article.title.en,
    'description': article.excerpt[lang] || article.excerpt.en,
    'datePublished': article.publishedDate,
    'dateModified': article.lastUpdated,
    'author': {
      '@type': 'Person',
      'name': article.author.name,
      'jobTitle': article.author.role[lang] || article.author.role.en
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'MGREFOTS Ltd.'
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Top Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-extrabold text-[#94A3B8]">
        <button onClick={onBack} className="hover:text-[#F5A623] transition flex items-center gap-1">
          <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة للمكتبة المعرفية' : 'Back to Knowledge Center'}</span>
        </button>
        <span>/</span>
        <span className="text-[#F5A623]">{article.category}</span>
      </nav>

      {/* Main Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#071426] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-[#0B1F45] text-[#F5A623] text-xs font-black uppercase tracking-wider border border-[#F5A623]/30">
            {article.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-bold">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-[#F5A623]" />
              {article.readingTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-[#F5A623]" />
              {article.lastUpdated}
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-[#091833] border border-[rgba(255,255,255,0.1)] hover:border-[#F5A623] text-white text-xs transition"
            >
              <Share2 size={14} className="text-[#F5A623]" />
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug">
          {article.title[lang] || article.title.en}
        </h1>

        <p className="text-sm sm:text-base font-medium text-[#94A3B8] leading-relaxed">
          {article.excerpt[lang] || article.excerpt.en}
        </p>

        {/* Author / Reviewer Info */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5A623] to-[#FF8A00] flex items-center justify-center font-black text-[#030914]">
              MZ
            </div>
            <div>
              <span className="block font-black text-white">{article.author.name}</span>
              <span className="text-[#94A3B8] text-[11px]">{article.author.role[lang] || article.author.role.en}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <article className="space-y-6">
        {article.sections.map((sec) => (
          <section key={sec.id} className="p-6 sm:p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
            <h2 className="text-xl font-black text-white border-b border-[rgba(255,255,255,0.08)] pb-3">
              {sec.title[lang] || sec.title.en}
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed whitespace-pre-line">
              {sec.content[lang] || sec.content.en}
            </p>
          </section>
        ))}

        {/* Product Educational Integration */}
        {relatedProduct && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#F5A623]">
                {isRtl ? 'المنتج المرتبط بالبحث العلمي' : 'Related Scientific Supplement'}
              </span>
              <span className="text-sm font-black text-white">{relatedProduct.price}</span>
            </div>
            <h3 className="text-lg font-black text-white">
              {relatedProduct.name[lang] || relatedProduct.name.en}
            </h3>
            <p className="text-xs text-[#CBD5E1] font-medium">
              {relatedProduct.description[lang] || relatedProduct.description.en}
            </p>
            <div className="flex gap-3">
              {onSelectProductModal && (
                <button
                  onClick={() => onSelectProductModal(relatedProduct)}
                  className="px-4 py-2.5 bg-[#030914] text-white rounded-xl text-xs font-black border border-[#F5A623]/30 flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} className="text-[#F5A623]" />
                  <span>{t.btn_view_specs}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
