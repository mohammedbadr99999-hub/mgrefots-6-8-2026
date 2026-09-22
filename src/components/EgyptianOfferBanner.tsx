import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Language } from '../types';

export const EgyptianOfferBanner: React.FC<{ lang: Language }> = ({ lang }) => {
  const copy = {
    en: {
      eyebrow: 'Special offer for Egyptians 🇪🇬',
      title: 'Egyptian customers receive special prices. Contact us on WhatsApp to request them.',
      cta: 'Get Egyptian prices on WhatsApp',
      message: 'Hello MGREFOTS, I am Egyptian and would like to know the special prices and offers for Egyptians 🇪🇬'
    },
    rw: {
      eyebrow: 'Igiciro cyihariye ku Banyamisiri 🇪🇬',
      title: 'Abakiriya b’Abanyamisiri bafite ibiciro byihariye. Twandikire kuri WhatsApp ubimenye.',
      cta: 'Baza ibiciro kuri WhatsApp',
      message: 'Muraho MGREFOTS, ndi Umunyamisiri kandi ndifuza kumenya ibiciro n’inyungu byihariye ku Banyamisiri 🇪🇬'
    },
    ar: {
      eyebrow: 'عرض خاص للمصريين 🇪🇬',
      title: 'المصريون لهم أسعار خاصة! يرجى التواصل عبر واتساب للحصول عليها.',
      cta: 'تواصل عبر واتساب للأسعار الخاصة',
      message: 'مرحباً MGREFOTS، أنا مصري وأرغب في معرفة الأسعار والعروض الخاصة للمصريين 🇪🇬'
    }
  }[lang];
  const whatsappUrl = "https://wa.me/250792294432?text=" + encodeURIComponent(copy.message);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-[#F5A623]/60 p-5 sm:p-6 shadow-[0_10px_40px_rgba(245,166,35,0.15)] mb-8 group animate-fade-in">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F5A623]/20 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center ${lang === 'ar' ? 'sm:text-right' : 'sm:text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Banner Text Content */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FF8A00] text-[#030914] flex items-center justify-center font-black text-3xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            🇪🇬
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles size={16} className="text-[#F5A623] animate-pulse" />
              <span className="text-xs font-black uppercase text-[#F5A623] tracking-wider">
                {copy.eyebrow}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white leading-snug">
              {copy.title}
            </h3>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3.5 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-[#F5A623]/25 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 border border-[#F5A623]/40"
        >
          <MessageSquare size={18} />
          <span>{copy.cta}</span>
        </a>
      </div>
    </div>
  );
};
