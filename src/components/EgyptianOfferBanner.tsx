import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export const EgyptianOfferBanner: React.FC = () => {
  const whatsappUrl = "https://wa.me/250796348633?text=" + encodeURIComponent("مرحباً MGREFOTS، أنا مصري وأرغب في معرفة الأسعار والعروض الخاصة للمصريين 🇪🇬");

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-red-950 border-2 border-amber-500/60 p-4 sm:p-5 shadow-2xl mb-8 group animate-fade-in">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right" dir="rtl">
        {/* Banner Text Content */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            🇪🇬
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
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
          className="shrink-0 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/60 hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-emerald-400/40"
        >
          <MessageSquare size={16} />
          <span>تواصل واتساب للأسعار الخاصة</span>
        </a>
      </div>
    </div>
  );
};
