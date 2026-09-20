import { KnowledgeArticle } from '../../types';
import { creatineDuringWeightLoss } from './creatineDuringWeightLoss';

// Each article lives in its own file so n8n can safely add, review, and publish
// content without rewriting the rest of the Knowledge Center data.
export const ARTICLES: KnowledgeArticle[] = [creatineDuringWeightLoss];

export const getArticleBySlug = (slug: string) =>
  ARTICLES.find((article) => article.slug === slug);
