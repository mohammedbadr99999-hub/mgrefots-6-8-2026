import React from 'react';
import { SupplementsEncyclopedia } from '../components/SupplementsEncyclopedia';
import { Language } from '../types';

interface SupplementsPageProps {
  lang: Language;
  onAnalyzeSupp: (name: string) => Promise<string>;
  onAskNutrientExpert: (section: string, q: string) => Promise<string>;
}

export const SupplementsPage: React.FC<SupplementsPageProps> = ({
  lang,
  onAnalyzeSupp,
  onAskNutrientExpert
}) => {
  return (
    <div className="animate-fade-in">
      <SupplementsEncyclopedia
        lang={lang}
        onAnalyzeSupp={onAnalyzeSupp}
        onAskNutrientExpert={onAskNutrientExpert}
      />
    </div>
  );
};
