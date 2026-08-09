import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KnowledgeCenter } from '../components/KnowledgeCenter';
import { Language, Product } from '../types';

interface KnowledgePageProps {
  lang: Language;
  onSelectProductModal: (p: Product) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({ lang, onSelectProductModal }) => {
  const { guideId } = useParams<{ guideId?: string }>();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <KnowledgeCenter
        lang={lang}
        onSelectProductModal={(p) => {
          onSelectProductModal(p);
          navigate(`/products/${p.id}`);
        }}
        onNavigateToChat={() => navigate('/chat')}
        initialGuideId={guideId || null}
        onClearInitialGuide={() => navigate('/knowledge', { replace: true })}
      />
    </div>
  );
};
