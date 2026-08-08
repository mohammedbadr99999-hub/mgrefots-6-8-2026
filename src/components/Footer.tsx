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
    <footer className="bg-[#030914] text-[#94A3B8] py-14 border-t border-[rgba(255,255,255,0.08)] mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#F5A623]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
        <div className="flex items-center justify-center gap-3.5">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#0B1F45] to-[#173A73] border border-[#F5A623]/50 rounded-2xl flex items-center justify-center text-[#F5A623] font-black text-sm shadow-xl">
            MG
          </div>
          <span className="text-2xl font-black text-white tracking-widest" dir="ltr">
            MGREFOTS LTD
          </span>
        </div>

        <p className="text-xs font-semibold text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          {t.footer_tagline}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-[#94A3B8]">
          <span className="flex items-center gap-2 bg-[#091833] border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-2xl shadow-md" dir="ltr">
            <Mail size={15} className="text-[#F5A623]" /> info@mgrefots.com
          </span>
          <span className="flex items-center gap-2 bg-[#091833] border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-2xl shadow-md">
            <MapPin size={15} className="text-[#FF8A00]" /> Kigali, Rwanda
          </span>
          <span className="flex items-center gap-2 bg-[#091833] border border-[#F5A623]/30 text-[#F5A623] px-4 py-2 rounded-2xl shadow-md">
            <ShieldCheck size={15} className="text-[#F5A623]" /> NASM Formulated
          </span>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.08)] text-[11px] font-medium text-[#94A3B8]" dir="ltr">
          {t.footer_rights}
        </div>
      </div>
    </footer>
  );
};
