import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArticleDetail } from '../components/ArticleDetail';
import { getArticleBySlug } from '../content/articles';
import { Language, Product } from '../types';

interface ArticlePageProps {
  lang: Language;
  onSelectProductModal: (product: Product) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ lang, onSelectProductModal }) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#071426] p-10 text-center">
        <h1 className="text-2xl font-black text-white">{lang === 'ar' ? 'المقال غير موجود' : lang === 'rw' ? 'Inyandiko ntiboneka' : 'Article not found'}</h1>
        <Link to="/articles" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#F5A623]">
          <ArrowLeft size={16} />
          {lang === 'ar' ? 'العودة للمقالات' : lang === 'rw' ? 'Subira ku nyandiko' : 'Back to articles'}
        </Link>
      </div>
    );
  }

  return (
    <ArticleDetail
      article={article}
      lang={lang}
      onBack={() => navigate('/articles')}
      onSelectProductModal={onSelectProductModal}
    />
  );
};
