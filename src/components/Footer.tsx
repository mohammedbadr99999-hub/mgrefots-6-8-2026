import React from 'react';
import { Mail, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#071426] text-[#A7B3C4] py-12 border-t border-[rgba(255,255,255,0.08)] mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#0B1F45] to-[#173A73] border border-[#F5A623]/40 rounded-xl flex items-center justify-center text-[#F5A623] font-black text-sm">
            MG
          </div>
          <span className="text-xl font-black text-white tracking-widest" dir="ltr">
            MGREFOTS LTD
          </span>
        </div>

        <p className="text-xs font-semibold text-[#A7B3C4] max-w-md mx-auto">
          {t.footer_tagline}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-[#A7B3C4]">
          <span className="flex items-center gap-1.5" dir="ltr">
            <Mail size={15} className="text-[#F5A623]" /> info@mgrefots.com
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-[#FF8A00]" /> Kigali, Rwanda
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#F5A623]" /> NASM Formulated
          </span>
        </div>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] text-[11px] font-medium text-[#A7B3C4]" dir="ltr">
          {t.footer_rights}
        </div>
      </div>
    </footer>
  );
};
