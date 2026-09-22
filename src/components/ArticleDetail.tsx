import React, { useEffect, useMemo, useState } from 'react';
import { 
  ArrowLeft, Clock, Calendar, UserCheck, ShieldCheck, 
  ExternalLink, Share2, ShoppingBag, HelpCircle, BookOpen
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
  const ui = {
    en: { category: 'Creatine', minutes: 'min read', updated: 'Updated', copied: 'Article link copied', copy: 'Copy article link', related: 'Related Scientific Supplement', source: 'Source' },
    rw: { category: 'Creatine', minutes: 'min yo gusoma', updated: 'Byavuguruwe', copied: 'Link y’inyandiko yakoporowe', copy: 'Koporora link y’inyandiko', related: 'Inyongeramirire ijyanye n’ubushakashatsi', source: 'Inkomoko' },
    ar: { category: 'الكرياتين', minutes: 'دقائق قراءة', updated: 'آخر تحديث', copied: 'تم نسخ رابط المقال', copy: 'نسخ رابط المقال', related: 'المنتج المرتبط بالبحث العلمي', source: 'المصدر' }
  }[lang];

  const relatedProduct = PRODUCTS.find((p) => p.id === article.relatedProductId);

  const pageTitle = article.seo?.title[lang] || article.seo?.title.en || article.title[lang] || article.title.en;
  const pageDescription = article.seo?.description[lang] || article.seo?.description.en || article.excerpt[lang] || article.excerpt.en;
  const canonicalUrl = `https://www.mgrefots.com/articles/${article.slug}`;
  const authorInitials = article.author.name === 'MGREFOTS Editorial Team' ? 'MG' : 'MZ';

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogType = document.querySelector<HTMLMetaElement>('meta[property="og:type"]');
    const keywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const previousDescription = description?.content;
    const previousOgTitle = ogTitle?.content;
    const previousOgDescription = ogDescription?.content;
    const previousOgType = ogType?.content;
    const previousKeywords = keywords?.content;

    document.title = pageTitle;
    description?.setAttribute('content', pageDescription);
    ogTitle?.setAttribute('content', pageTitle);
    ogDescription?.setAttribute('content', pageDescription);
    ogType?.setAttribute('content', 'article');
    if (article.seo?.keywords.length) keywords?.setAttribute('content', article.seo.keywords.join(', '));

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
      if (previousOgTitle) ogTitle?.setAttribute('content', previousOgTitle);
      if (previousOgDescription) ogDescription?.setAttribute('content', previousOgDescription);
      if (previousOgType) ogType?.setAttribute('content', previousOgType);
      if (previousKeywords) keywords?.setAttribute('content', previousKeywords);
    };
  }, [article.seo?.keywords, pageDescription, pageTitle]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        'headline': article.title[lang] || article.title.en,
        'description': article.excerpt[lang] || article.excerpt.en,
        'datePublished': article.publishedAt || article.publishedDate,
        'dateModified': article.updatedAt || article.lastUpdated,
        'mainEntityOfPage': canonicalUrl,
        'author': {
          '@type': 'Organization',
          'name': article.author.name
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'MGREFOTS Ltd.',
          'url': 'https://www.mgrefots.com/'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': article.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question[lang] || faq.question.en,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer[lang] || faq.answer.en
          }
        }))
      }
    ]
  }), [article, canonicalUrl, lang]);

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
          <span>{isRtl ? 'العودة للمقالات' : lang === 'rw' ? 'Subira ku nyandiko' : 'Back to Articles'}</span>
        </button>
        <span>/</span>
        <span className="text-[#F5A623]">{article.category === 'Creatine' ? ui.category : article.category}</span>
      </nav>

      {/* Main Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#071426] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-[#0B1F45] text-[#F5A623] text-xs font-black uppercase tracking-wider border border-[#F5A623]/30">
            {article.category === 'Creatine' ? ui.category : article.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-bold">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-[#F5A623]" />
              {article.readingTime.replace(/ min read$/i, '')} {ui.minutes}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-[#F5A623]" />
              {ui.updated}: {article.updatedAt ? new Intl.DateTimeFormat(lang === 'rw' ? 'rw-RW' : lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${article.updatedAt}T00:00:00Z`)) : article.lastUpdated}
            </span>
            <button
              onClick={handleShare}
              type="button"
              aria-label={copied ? ui.copied : ui.copy}
              title={copied ? ui.copied : ui.copy}
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
              {authorInitials}
            </div>
            <div>
              <span className="block font-black text-white">{article.author.name}</span>
              <span className="text-[#94A3B8] text-[11px]">{article.author.role[lang] || article.author.role.en}</span>
              <span className="mt-1 block text-[10px] text-[#64748B]">{article.medicalReviewer.role[lang] || article.medicalReviewer.role.en}</span>
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
            {sec.callout && (
              <div className="rounded-2xl border border-[#F5A623]/30 bg-[#0B1F45]/70 p-4">
                <p className="mb-1 text-xs font-black uppercase tracking-wide text-[#F5A623]">
                  {sec.callout.title[lang] || sec.callout.title.en}
                </p>
                <p className="text-sm font-medium leading-relaxed text-[#CBD5E1]">
                  {sec.callout.text[lang] || sec.callout.text.en}
                </p>
              </div>
            )}
          </section>
        ))}

        {article.faqs.length > 0 && (
          <section className="space-y-4 rounded-3xl border border-white/10 bg-[#071426] p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-black text-white">
              <HelpCircle className="text-[#F5A623]" size={21} />
              {isRtl ? 'الأسئلة الشائعة' : lang === 'rw' ? 'Ibibazo bikunze kubazwa' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq) => (
                <details key={faq.question.en} className="group rounded-2xl border border-white/10 bg-[#091833] p-4">
                  <summary className="cursor-pointer list-none pr-6 text-sm font-black text-white marker:hidden">
                    {faq.question[lang] || faq.question.en}
                  </summary>
                  <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-[#CBD5E1]">
                    {faq.answer[lang] || faq.answer.en}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {article.references.length > 0 && (
          <section className="space-y-4 rounded-3xl border border-white/10 bg-[#071426] p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-black text-white">
              <BookOpen className="text-[#F5A623]" size={21} />
              {isRtl ? 'المصادر العلمية' : lang === 'rw' ? 'Inkomoko z’ubushakashatsi' : 'Scientific references'}
            </h2>
            <ol className="space-y-4">
              {article.references.map((reference, index) => (
                <li key={reference.id} className="text-sm leading-relaxed text-[#CBD5E1]">
                  <span className="font-black text-[#F5A623]">{index + 1}.</span>{' '}
                  <span className="font-bold text-white">{reference.title}.</span>{' '}
                  {reference.authors} {reference.journal} ({reference.year}).{' '}
                  {reference.doiOrUrl && (
                    <a href={reference.doiOrUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-[#F5A623] hover:underline">
                      {ui.source} <ExternalLink size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Product Educational Integration */}
        {relatedProduct && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#F5A623]">
                {ui.related}
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
