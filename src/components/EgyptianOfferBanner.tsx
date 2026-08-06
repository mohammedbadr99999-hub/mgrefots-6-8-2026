import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export const EgyptianOfferBanner: React.FC = () => {
  const whatsappUrl = "https://wa.me/250796348633?text=" + encodeURIComponent("مرحباً MGREFOTS، أنا مصري وأرغب في معرفة الأسعار والعروض الخاصة للمصريين 🇪🇬");

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1F45] via-[#0E2247] to-[#173A73] border-2 border-[#F5A623]/60 p-4 sm:p-5 shadow-2xl mb-8 group animate-fade-in">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#F5A623]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right" dir="rtl">
        {/* Banner Text Content */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FF8A00] text-[#071426] flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            🇪🇬
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles size={16} className="text-[#F5A623] animate-pulse" />
              <span className="text-xs font-black uppercase text-[#F5A623] tracking-wider">
                عرض خاص للمصريين 🇪🇬
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              المصريين لهم اسعار خاصه يرجى التواصل وتساب للحصول عليها
            </h3>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-3 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#071426] rounded-2xl font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-[#F5A623]/40"
        >
          <MessageSquare size={16} />
          <span>تواصل واتساب للأسعار الخاصة</span>
        </a>
      </div>
    </div>
  );
};
