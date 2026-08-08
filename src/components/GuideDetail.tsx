import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Calendar, UserCheck, ShieldCheck, BookOpen, 
  Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink, 
  HelpCircle, ChevronDown, ChevronUp, Share2, Bookmark, MessageSquare, ShoppingBag
} from 'lucide-react';
import { KnowledgeGuide, Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';

interface GuideDetailProps {
  guide: KnowledgeGuide;
  lang: Language;
  onBack: () => void;
  onSelectGuide: (guideId: string) => void;
  onSelectProductModal?: (product: Product) => void;
}

export const GuideDetail: React.FC<GuideDetailProps> = ({
  guide,
  lang,
  onBack,
  onSelectGuide,
  onSelectProductModal
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(guide.sections[0]?.id || '');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const relatedProduct = PRODUCTS.find((p) => p.id === guide.relatedProductId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Structured Data JSON-LD for Search Engines & AI Answer Engines (AEO)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://mgrefots.com/knowledge/guide/${guide.slug}#article`,
        'isPartOf': { '@id': 'https://mgrefots.com/knowledge#website' },
        'headline': guide.title[lang] || guide.title.en,
        'description': guide.summary[lang] || guide.summary.en,
        'datePublished': '2026-08-01',
        'dateModified': '2026-08-07',
        'mainEntityOfPage': `https://mgrefots.com/knowledge/guide/${guide.slug}`,
        'author': {
          '@type': 'Person',
          'name': guide.author.name,
          'jobTitle': guide.author.role[lang] || guide.author.role.en,
          'description': guide.author.credentials,
          'worksFor': {
            '@type': 'Organization',
            'name': 'MGREFOTS Ltd.'
          }
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'MGREFOTS Ltd.',
          'url': 'https://mgrefots.com',
          'logo': 'https://mgrefots.com/logo.png'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': guide.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question[lang] || faq.question.en,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer[lang] || faq.answer.en
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': isRtl ? 'الرئيسية' : 'Home',
            'item': 'https://mgrefots.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': isRtl ? 'المكتبة المعرفية' : 'Knowledge Center',
            'item': 'https://mgrefots.com/knowledge'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': guide.title[lang] || guide.title.en,
            'item': `https://mgrefots.com/knowledge/guide/${guide.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Inject Structured Data Schema for AI Search Engines (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Top Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-extrabold text-[#94A3B8] overflow-x-auto py-1">
        <button onClick={onBack} className="hover:text-[#F5A623] transition flex items-center gap-1 shrink-0">
          <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة للمكتبة' : 'Back to Knowledge Center'}</span>
        </button>
        <span>/</span>
        <span className="text-[#F5A623] shrink-0 font-black">{guide.category}</span>
        <span>/</span>
        <span className="text-white truncate max-w-xs">{guide.title[lang] || guide.title.en}</span>
      </nav>

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1F45] via-[#091833] to-[#173A73] border border-[#F5A623]/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F5A623]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 text-xs font-black uppercase tracking-wider">
                {guide.badge[lang] || guide.badge.en}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#030914]/80 text-[#94A3B8] border border-[rgba(255,255,255,0.08)] text-xs font-bold flex items-center gap-1.5">
                <Clock size={13} className="text-[#F5A623]" />
                <span>{guide.readingTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-[#091833] border border-[rgba(255,255,255,0.1)] hover:border-[#F5A623] text-white text-xs font-bold transition flex items-center gap-1.5"
                title="Share Guide"
              >
                <Share2 size={15} className="text-[#F5A623]" />
                <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'مشاركة' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-wide mb-3">
              {guide.title[lang] || guide.title.en}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-[#94A3B8] leading-relaxed max-w-4xl">
              {guide.subtitle[lang] || guide.subtitle.en}
            </p>
          </div>

          {/* Author & Reviewer Info Box */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5A623] to-[#FF8A00] p-0.5 flex items-center justify-center font-black text-[#030914] text-sm shadow-md">
                MZ
              </div>
              <div>
                <span className="block font-black text-white text-sm flex items-center gap-1">
                  <span>{guide.author.name}</span>
                  <UserCheck size={14} className="text-[#F5A623]" />
                </span>
                <span className="text-[11px] font-bold text-[#F5A623]">
                  {guide.author.role[lang] || guide.author.role.en}
                </span>
                <span className="block text-[10px] text-[#94A3B8]">
                  {guide.author.credentials}
                </span>
              </div>
            </div>

            <div className="bg-[#030914]/80 p-3 rounded-2xl border border-[rgba(255,255,255,0.08)] flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-extrabold text-[#94A3B8]">
                  {isRtl ? 'المراجعة الطبية والسريرية' : 'Medical Review'}
                </span>
                <span className="text-xs font-black text-white">
                  {guide.medicalReviewer.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid (TOC Sidebar + Guide Article Sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sticky Table of Contents Navigation */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="lg:sticky lg:top-28 p-5 bg-[#071426] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F5A623] mb-4 flex items-center gap-2 pb-2 border-b border-[rgba(255,255,255,0.08)]">
              <BookOpen size={16} />
              <span>{isRtl ? 'جدول المحتويات' : 'Table of Contents'}</span>
            </h3>

            <nav className="space-y-1.5 text-xs font-extrabold">
              {guide.sections.map((sec, idx) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`block p-2.5 rounded-xl transition line-clamp-2 ${
                      isActive
                        ? 'bg-[#0B1F45] text-[#F5A623] border border-[#F5A623]/40 font-black'
                        : 'text-[#94A3B8] hover:text-white hover:bg-[#0E2247]'
                    }`}
                  >
                    {sec.title[lang] || sec.title.en}
                  </a>
                );
              })}

              {guide.faqs.length > 0 && (
                <a
                  href="#faq-section"
                  className="block p-2.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#0E2247] transition"
                >
                  {isRtl ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
                </a>
              )}

              {guide.references.length > 0 && (
                <a
                  href="#references-section"
                  className="block p-2.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#0E2247] transition"
                >
                  {isRtl ? 'المراجع العلمية (PubMed)' : 'Scientific References'}
                </a>
              )}
            </nav>

            {/* Quick Ask Coach WhatsApp Action */}
            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <a
                href={`https://wa.me/250792294432?text=${encodeURIComponent(`مرحبا coach Mohamed Zeina معك اريد الاستفسار عن دليل ${guide.title.en}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#0B1F45] hover:bg-[#173A73] text-white rounded-xl text-[11px] font-black transition border border-[#F5A623]/30 flex flex-col items-center text-center p-2"
              >
                <span className="flex items-center gap-1.5 text-[#F5A623]">
                  <MessageSquare size={13} />
                  <span>{isRtl ? 'استشر الكابتن مباشرة' : 'Ask Coach Direct'}</span>
                </span>
                <span className="text-[10px] text-[#94A3B8]">Mohamed Zeina</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Article Body */}
        <article className="lg:col-span-3 space-y-8 text-[#F5F7FA]">
          
          {/* Executive Summary Card */}
          <div className="p-6 bg-[#091833] rounded-3xl border border-[#F5A623]/30 shadow-xl space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#F5A623] flex items-center gap-2">
              <Sparkles size={18} />
              <span>{isRtl ? 'الملخص التنفيذي والأهمية العلمية' : 'Executive Scientific Summary'}</span>
            </h3>
            <p className="text-sm sm:text-base font-medium leading-relaxed text-[#F5F7FA]">
              {guide.summary[lang] || guide.summary.en}
            </p>
          </div>

          {/* Guide Sections Loop */}
          {guide.sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="p-6 sm:p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-5 shadow-xl"
            >
              <h2 className="text-xl sm:text-2xl font-black text-white pb-3 border-b border-[rgba(255,255,255,0.08)]">
                {sec.title[lang] || sec.title.en}
              </h2>

              <p className="text-sm sm:text-base font-normal leading-relaxed text-[#CBD5E1] whitespace-pre-line">
                {sec.content[lang] || sec.content.en}
              </p>

              {/* Optional Callout Box */}
              {sec.callout && (
                <div
                  className={`p-5 rounded-2xl border ${
                    sec.callout.type === 'warning'
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : sec.callout.type === 'tip'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-[#0B1F45] border-[#F5A623]/40 text-[#F5F7FA]'
                  } space-y-2 shadow-md`}
                >
                  <div className="flex items-center gap-2 font-black text-sm">
                    {sec.callout.type === 'warning' ? (
                      <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                    ) : sec.callout.type === 'tip' ? (
                      <Lightbulb size={18} className="text-emerald-400 shrink-0" />
                    ) : (
                      <CheckCircle2 size={18} className="text-[#F5A623] shrink-0" />
                    )}
                    <span>{sec.callout.title[lang] || sec.callout.title.en}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {sec.callout.text[lang] || sec.callout.text.en}
                  </p>
                </div>
              )}

              {/* Optional Data Table */}
              {sec.table && (
                <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#030914]">
                  <table className="w-full text-left text-xs sm:text-sm" dir={isRtl ? 'rtl' : 'ltr'}>
                    <thead className="bg-[#0B1F45] text-[#F5A623] font-black uppercase text-[11px]">
                      <tr>
                        {(sec.table.headers[lang] || sec.table.headers.en).map((h, i) => (
                          <th key={i} className="p-3.5 border-b border-[rgba(255,255,255,0.08)]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-[#CBD5E1] font-medium">
                      {(sec.table.rows[lang] || sec.table.rows.en).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#091833]/50 transition">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Recommended MGREFOTS Products Section */}
          {relatedProduct && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1F45] via-[#091833] to-[#173A73] border border-[#F5A623]/40 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.1)] pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] block">
                    {isRtl ? 'منتج مكمل غذائي موصى به علمياً' : 'Scientifically Formulated Supplement'}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {relatedProduct.name[lang] || relatedProduct.name.en}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F5A623] text-[#030914] font-black text-xs">
                  {relatedProduct.price}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <p className="text-xs sm:text-sm font-medium text-[#CBD5E1] leading-relaxed">
                    {relatedProduct.description[lang] || relatedProduct.description.en}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold text-[#F5A623]">
                    <span className="bg-[#030914] px-3 py-1 rounded-full border border-[#F5A623]/30">
                      ✨ {relatedProduct.servings}
                    </span>
                    <span className="bg-[#030914] px-3 py-1 rounded-full border border-[#F5A623]/30">
                      ⚡ {relatedProduct.size}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {onSelectProductModal && (
                    <button
                      onClick={() => onSelectProductModal(relatedProduct)}
                      className="w-full py-3 bg-[#030914] hover:bg-[#0B1F45] text-white font-black text-xs uppercase rounded-xl transition border border-[#F5A623]/40 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingBag size={15} className="text-[#F5A623]" />
                      <span>{t.btn_view_specs}</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/250792294432?text=${encodeURIComponent(relatedProduct.whatsappText[lang] || relatedProduct.whatsappText.en)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] font-black text-xs uppercase rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare size={15} />
                    <span>{t.btn_order_whatsapp}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Accordion Section */}
          {guide.faqs.length > 0 && (
            <section id="faq-section" className="p-6 sm:p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4 shadow-xl">
              <h2 className="text-xl font-black text-white flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                <HelpCircle size={22} className="text-[#F5A623]" />
                <span>{isRtl ? 'الأسئلة الشائعة والإجابات العلمية' : 'Frequently Asked Questions'}</span>
              </h2>

              <div className="space-y-3">
                {guide.faqs.map((faq, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#091833] border border-[rgba(255,255,255,0.08)] overflow-hidden transition"
                    >
                      <button
                        onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#F5A623] transition"
                        dir={isRtl ? 'rtl' : 'ltr'}
                      >
                        <span>{faq.question[lang] || faq.question.en}</span>
                        {isExpanded ? <ChevronUp size={18} className="text-[#F5A623]" /> : <ChevronDown size={18} className="text-[#94A3B8]" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 text-xs sm:text-sm font-medium text-[#94A3B8] leading-relaxed border-t border-[rgba(255,255,255,0.05)]">
                          {faq.answer[lang] || faq.answer.en}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Scientific References Section */}
          {guide.references.length > 0 && (
            <section id="references-section" className="p-6 sm:p-8 bg-[#071426] rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4 shadow-xl">
              <h2 className="text-lg font-black text-white flex items-center gap-2 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                <ExternalLink size={18} className="text-[#F5A623]" />
                <span>{isRtl ? 'المراجع العلمية والأبحاث السريرة (PubMed & ISSN)' : 'Scientific References & PubMed Citations'}</span>
              </h2>

              <ol className="list-decimal list-inside space-y-3 text-xs text-[#94A3B8] font-medium">
                {guide.references.map((ref) => (
                  <li key={ref.id} className="leading-relaxed bg-[#030914] p-3 rounded-xl border border-[rgba(255,255,255,0.05)]">
                    <span className="font-black text-white">{ref.authors} ({ref.year}).</span>{' '}
                    <span className="italic text-[#CBD5E1]">"{ref.title}".</span>{' '}
                    <span className="text-[#F5A623] font-bold">{ref.journal}.</span>
                    {ref.doiOrUrl && (
                      <a
                        href={ref.doiOrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#F5A623] hover:underline ml-2"
                      >
                        [PubMed Link] <ExternalLink size={12} />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};
