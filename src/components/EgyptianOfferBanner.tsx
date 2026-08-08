import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export const EgyptianOfferBanner: React.FC = () => {
  const whatsappUrl = "https://wa.me/250792294432?text=" + encodeURIComponent("مرحباً MGREFOTS، أنا مصري وأرغب في معرفة الأسعار والعروض الخاصة للمصريين 🇪🇬");

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-[#F5A623]/60 p-5 sm:p-6 shadow-[0_10px_40px_rgba(245,166,35,0.15)] mb-8 group animate-fade-in">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F5A623]/20 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-right" dir="rtl">
        {/* Banner Text Content */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FF8A00] text-[#030914] flex items-center justify-center font-black text-3xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            🇪🇬
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles size={16} className="text-[#F5A623] animate-pulse" />
              <span className="text-xs font-black uppercase text-[#F5A623] tracking-wider">
                عرض خاص للمصريين 🇪🇬
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white leading-snug">
              المصريين لهم أسعار خاصة! يرجى التواصل عبر واتساب للحصول عليها
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
          <span>تواصل واتساب للأسعار الخاصة</span>
        </a>
      </div>
    </div>
  );
};
