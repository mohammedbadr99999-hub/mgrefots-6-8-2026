import { KnowledgeArticle } from '../../types';
import { creatineStrengthPerformance } from './creatineStrengthPerformance';

// Each article lives in its own file so n8n can safely add, review, and publish
// content without rewriting the rest of the Knowledge Center data.
export const ARTICLES: KnowledgeArticle[] = [creatineStrengthPerformance];

export const getArticleBySlug = (slug: string) =>
  ARTICLES.find((article) => article.slug === slug);
