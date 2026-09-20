import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, Clock, Search } from 'lucide-react';
import { ARTICLES } from '../content/articles';
import { Language } from '../types';

interface ArticlesPageProps {
  lang: Language;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ lang }) => {
  const [query, setQuery] = React.useState('');
  const isRtl = lang === 'ar';

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = 'Sports Nutrition Articles & Research | MGREFOTS Rwanda';
    description?.setAttribute('content', 'Evidence-based creatine, protein, fitness, and supplement articles for athletes and active adults in Rwanda and East Africa.');

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
    };
  }, []);

  const articles = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return ARTICLES;

    return ARTICLES.filter((article) => {
      const title = article.title[lang] || article.title.en;
      const excerpt = article.excerpt[lang] || article.excerpt.en;
      return [title, excerpt, article.category, ...article.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [lang, query]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 animate-fade-in">
      <section className="relative overflow-hidden rounded-3xl border border-[#F5A623]/30 bg-gradient-to-br from-[#0B1F45] via-[#091833] to-[#173A73] p-8 shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F5A623]/15 blur-3xl" />
        <div className="relative max-w-3xl space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/40 bg-[#F5A623]/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#F5A623]">
            <BookOpen size={15} />
            {lang === 'ar' ? 'مقالات MGREFOTS' : lang === 'rw' ? 'Inyandiko za MGREFOTS' : 'MGREFOTS Articles'}
          </span>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            {lang === 'ar' ? 'مقالات عملية مبنية على الأدلة' : lang === 'rw' ? 'Inyandiko zishingiye ku bushakashatsi' : 'Practical, Evidence-Based Nutrition Articles'}
          </h1>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-[#CBD5E1] sm:text-base">
            {lang === 'ar'
              ? 'إجابات واضحة حول التغذية الرياضية والمكملات، مع مصادر علمية وروابط للمنتجات ذات الصلة.'
              : lang === 'rw'
                ? 'Ibisobanuro byoroshye ku mirire na supplements, bishingiye ku bushakashatsi.'
                : 'Clear answers about sports nutrition and supplements, with peer-reviewed sources and practical guidance for athletes across Rwanda and East Africa.'}
          </p>
        </div>
      </section>

      <div className="relative max-w-xl">
        <Search className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#F5A623] ${isRtl ? 'right-4' : 'left-4'}`} size={19} />
        <input
          type="search"
          aria-label={lang === 'ar' ? 'البحث في المقالات' : lang === 'rw' ? 'Shakisha inyandiko' : 'Search articles'}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={lang === 'ar' ? 'ابحث في المقالات…' : lang === 'rw' ? 'Shakisha inyandiko…' : 'Search articles…'}
          className={`w-full rounded-2xl border border-white/10 bg-[#071426] py-3.5 text-sm text-white outline-none transition focus:border-[#F5A623] ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
        />
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.id} className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#071426] p-6 shadow-xl transition hover:border-[#F5A623]/50 hover:bg-[#091833]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#0B1F45] px-3 py-1 font-black uppercase text-[#F5A623]">{article.category}</span>
                  {article.status !== 'published' && (
                    <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 font-black uppercase text-sky-300">Preview</span>
                  )}
                </div>
                <span className="flex items-center gap-1.5"><Calendar size={13} />{article.lastUpdated}</span>
              </div>
              <h2 className="text-xl font-black leading-snug text-white">{article.title[lang] || article.title.en}</h2>
              <p className="text-sm font-medium leading-relaxed text-[#94A3B8]">{article.excerpt[lang] || article.excerpt.en}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#94A3B8]"><Clock size={13} />{article.readingTime}</span>
              <Link
                to={`/articles/${article.slug}`}
                className="flex items-center gap-1.5 text-xs font-black text-[#F5A623] transition hover:translate-x-1"
              >
                {lang === 'ar' ? 'اقرأ المقال' : lang === 'rw' ? 'Soma inyandiko' : 'Read article'}
                <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
