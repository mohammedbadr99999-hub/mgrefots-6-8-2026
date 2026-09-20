import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

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

        {/* Quick Page Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-extrabold text-[#A7B3C4]">
          <Link to="/" className="hover:text-[#F5A623] transition">
            {t.nav_home}
          </Link>
          <Link to="/products" className="hover:text-[#F5A623] transition">
            {isRtl ? 'المنتجات' : lang === 'rw' ? 'Ibicuruzwa' : 'Products'}
          </Link>
          <Link to="/about" className="hover:text-[#F5A623] transition">
            {isRtl ? 'عن الشركة' : lang === 'rw' ? 'Ibyerekeye sosiyete' : 'About Us'}
          </Link>
          <Link to="/contact" className="hover:text-[#F5A623] transition">
            {isRtl ? 'اتصل بنا' : lang === 'rw' ? 'Twandikire' : 'Contact'}
          </Link>
          <Link to="/faq" className="hover:text-[#F5A623] transition">
            {isRtl ? 'الأسئلة الشائعة' : lang === 'rw' ? 'Ibibazo bikunze kubazwa' : 'FAQ'}
          </Link>
          <Link to="/analysis" className="hover:text-[#F5A623] transition">
            {t.nav_analysis}
          </Link>
          <Link to="/supplements" className="hover:text-[#F5A623] transition">
            {t.nav_supps}
          </Link>
          <Link to="/knowledge" className="hover:text-[#F5A623] transition">
            {t.nav_knowledge || 'Knowledge'}
          </Link>
          <Link to="/chat" className="hover:text-[#F5A623] transition">
            {t.nav_chat}
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-[#94A3B8]">
          <a 
            href="mailto:info@mgrefots.com" 
            className="flex items-center gap-2 bg-[#091833] hover:bg-[#0B1F45] hover:text-white border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-2xl shadow-md transition" 
            dir="ltr"
            title="Send Email"
          >
            <Mail size={15} className="text-[#F5A623]" /> info@mgrefots.com
          </a>
          <a 
            href="https://maps.google.com/?q=Kigali,Rwanda" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-[#091833] hover:bg-[#0B1F45] hover:text-white border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-2xl shadow-md transition"
            title="View Location on Google Maps"
          >
            <MapPin size={15} className="text-[#FF8A00]" /> Kigali, Rwanda
          </a>
          <a 
            href="https://www.nasm.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-[#091833] hover:bg-[#0B1F45] border border-[#F5A623]/30 text-[#F5A623] hover:text-amber-300 px-4 py-2 rounded-2xl shadow-md transition"
            title="NASM Certification Standard"
          >
            <ShieldCheck size={15} className="text-[#F5A623]" /> NASM Formulated ↗
          </a>
          <a 
            href="https://wa.me/250792294432?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20MGREFOTS%D9%88%D8%A7%D8%AA%D8%B3%D8%A7%D8%A8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 px-4 py-2 rounded-2xl shadow-md font-black transition"
            title="WhatsApp Support"
          >
            <span>💬</span> WhatsApp Direct ↗
          </a>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.08)] text-[11px] font-medium text-[#94A3B8]" dir="ltr">
          {t.footer_rights}
        </div>
      </div>
    </footer>
  );
};
