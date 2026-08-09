import React from 'react';
import { InBodyAnalysis } from '../components/InBodyAnalysis';
import { Language } from '../types';

interface InBodyPageProps {
  lang: Language;
  onRunAnalysis: (file: File, goal: string) => Promise<{ result: string; pdfUrl: string | null }>;
}

export const InBodyPage: React.FC<InBodyPageProps> = ({ lang, onRunAnalysis }) => {
  return (
    <div className="animate-fade-in">
      <InBodyAnalysis
        lang={lang}
        onRunAnalysis={onRunAnalysis}
      />
    </div>
  );
};
