import React, { useState, useEffect } from 'react';
import { Zap, Activity, ShoppingBag, MessageCircle, Menu, X, Globe, ShieldCheck, BookOpen } from 'lucide-react';
import { Language, NavigationTab, UserState } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  user: UserState | null;
  onOpenMarriedMenGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onSelectLang,
  user,
  onOpenMarriedMenGuide
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'home', label: t.nav_home, icon: ShoppingBag },
    { id: 'analysis', label: t.nav_analysis, icon: Activity },
    { id: 'supps', label: t.nav_supps, icon: Zap },
    { id: 'knowledge', label: t.nav_knowledge || 'Knowledge Center', icon: BookOpen },
    { id: 'chat', label: t.nav_chat, icon: MessageCircle },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#030914]/80 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] opacity-40 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <div className="relative w-11 h-11 bg-[#091833] border border-[#F5A623]/50 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:scale-105 transition-transform">
                <span className="bg-gradient-to-br from-[#F5A623] to-[#FF8A00] bg-clip-text text-transparent">MG</span>
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-white group-hover:text-[#F5A623] transition-colors" dir="ltr">
                MGREFOTS
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#F5A623]/90">
                Sports Nutrition
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#091833]/80 p-1.5 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0B1F45] to-[#173A73] text-[#F5A623] border border-[#F5A623]/40 shadow-lg shadow-[#0B1F45]/60 scale-[1.02]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#173A73]/30'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#F5A623]' : 'text-[#94A3B8]'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & User Status */}
          <div className="flex items-center gap-2.5">
            {/* Married Man Button */}
            <button
              onClick={() => {
                if (onOpenMarriedMenGuide) {
                  onOpenMarriedMenGuide();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300 border border-amber-300/80 shrink-0 cursor-pointer animate-pulse"
              title={lang === 'ar' ? 'دليل صحة الرجال المتزوجين' : lang === 'rw' ? 'Inyoborabuhanga y\'abagabo bashatse' : 'Married Men\'s Health Guide'}
            >
              <span className="text-sm">💍</span>
              <span className="whitespace-nowrap font-extrabold">
                {lang === 'ar' ? 'إذا كنت رجل متزوج اضغط هنا' : lang === 'rw' ? 'Niba uri umugabo washatse, kanda hano' : 'If you are a married man, click here'}
              </span>
            </button>

            {/* Language Selector */}
            <div className="flex bg-[#091833] rounded-full p-1 border border-[rgba(255,255,255,0.08)] shadow-inner" dir="ltr">
              {(['en', 'rw', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onSelectLang(l)}
                  className={`px-3 py-1 rounded-full text-[11px] font-black uppercase transition-all duration-200 ${
                    lang === l
                      ? 'bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] shadow-md shadow-[#F5A623]/20 font-black'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* User status tag */}
            <div className="hidden sm:flex items-center gap-2 bg-[#091833] text-[#F5A623] border border-[#F5A623]/30 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md">
              <ShieldCheck size={14} className="text-[#F5A623]" />
              <span>{t.guest_tag}</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#091833] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-80 bg-[#071426] z-50 shadow-2xl flex flex-col lg:hidden border-r border-[rgba(255,255,255,0.08)] transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0B1F45] border border-[#F5A623]/40 rounded-lg flex items-center justify-center font-black text-[#F5A623]">MG</div>
            <span className="text-lg font-black text-white tracking-wider" dir="ltr">MGREFOTS</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-[#0E2247] border border-[rgba(255,255,255,0.08)] text-[#A7B3C4] hover:text-white flex items-center justify-center font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-4 gap-3 flex-1 overflow-y-auto">
          {/* Married Men Mobile Button */}
          <button
            onClick={() => {
              if (onOpenMarriedMenGuide) {
                onOpenMarriedMenGuide();
              }
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl font-black text-xs bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 text-slate-950 shadow-lg border border-amber-300 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-lg">💍</span>
            <span>
              {lang === 'ar' ? 'إذا كنت رجل متزوج اضغط هنا' : lang === 'rw' ? 'Niba uri umugabo washatse, kanda hano' : 'If you are a married man, click here'}
            </span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-base transition-all ${
                  isActive
                    ? 'bg-[#0B1F45] text-[#F5A623] border border-[#F5A623]/40 shadow-lg'
                    : 'text-[#A7B3C4] hover:bg-[#0E2247] hover:text-white'
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 border-t border-[rgba(255,255,255,0.08)] text-center">
          <p className="text-xs font-bold text-[#A7B3C4]" dir="ltr">© 2026 MGREFOTS LTD</p>
        </div>
      </div>
    </>
  );
};
