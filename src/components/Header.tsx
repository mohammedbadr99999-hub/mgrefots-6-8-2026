import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Activity, ShoppingBag, MessageCircle, Menu, X, BookOpen, Info, HelpCircle, ChevronDown, Newspaper } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onSelectLang
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const mainCategoryItems = [
    { path: '/products', label: isRtl ? 'المنتجات' : lang === 'rw' ? 'Ibicuruzwa' : 'Products', icon: ShoppingBag, badge: isRtl ? 'المكملات' : lang === 'rw' ? 'Urutonde' : 'Catalog' },
    { path: '/articles', label: isRtl ? 'المقالات' : lang === 'rw' ? 'Inyandiko' : 'Articles', icon: Newspaper, badge: isRtl ? 'جديد' : lang === 'rw' ? 'Ubushakashatsi' : 'Research' },
    { path: '/analysis', label: t.nav_analysis, icon: Activity, badge: 'InBody' },
    { path: '/supplements', label: t.nav_supps, icon: Zap, badge: isRtl ? 'موسوعة' : lang === 'rw' ? 'Inyoborabuhanga' : 'Guide' },
    { path: '/knowledge', label: t.nav_knowledge || 'Knowledge Center', icon: BookOpen, badge: isRtl ? 'المكتبة' : lang === 'rw' ? 'Isomero' : 'Library' },
  ];

  const otherNavItems = [
    { path: '/', label: t.nav_home, icon: ShoppingBag },
    { path: '/about', label: isRtl ? 'عن الشركة' : lang === 'rw' ? 'Ibyerekeye' : 'About', icon: Info },
    { path: '/contact', label: isRtl ? 'اتصل بنا' : lang === 'rw' ? 'Twandikire' : 'Contact', icon: MessageCircle },
    { path: '/faq', label: isRtl ? 'الأسئلة الشائعة' : lang === 'rw' ? 'Ibibazo' : 'FAQ', icon: HelpCircle },
    { path: '/chat', label: t.nav_chat, icon: MessageCircle },
  ];

  const allNavItems = [...mainCategoryItems, ...otherNavItems];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#030914]/85 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
              <Link
              to="/"
              aria-current={location.pathname === '/' ? 'page' : undefined}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            aria-label="MGREFOTS home"
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
          </Link>

          {/* Desktop & Main Dropdown Menu Button ("قائمة منسدلة" with 3 lines) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border ${
                location.pathname === '/'
                  ? 'bg-[#0B1F45] text-[#F5A623] border-[#F5A623]/40 shadow-md'
                  : 'bg-[#091833]/60 text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:text-white'
              }`}
            >
              {t.nav_home}
            </Link>

            {/* 3-Lines Dropdown Menu ("قائمة منسدلة") */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-controls="desktop-navigation-menu"
                aria-label={isRtl ? 'فتح قائمة الموقع' : lang === 'rw' ? 'Fungura ibice by’urubuga' : 'Open site navigation'}
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#091833] to-[#0B1F45] hover:from-[#0B1F45] hover:to-[#173A73] text-white border border-[#F5A623]/50 shadow-xl transition-all duration-300 font-black text-xs uppercase tracking-wider group cursor-pointer"
              >
                {/* 3 lines / hamburger icon with animation */}
                <div className="flex flex-col gap-1 w-4 shrink-0">
                  <span className={`h-0.5 w-full bg-[#F5A623] rounded-full transition-all duration-300 ${isDropdownOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`h-0.5 w-full bg-[#F5A623] rounded-full transition-all duration-300 ${isDropdownOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full bg-[#F5A623] rounded-full transition-all duration-300 ${isDropdownOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>

                <span className="text-[#F5A623] font-black tracking-wide text-xs">
                  {isRtl ? 'أقسام الموقع' : lang === 'rw' ? 'Ibice by’urubuga' : 'Site Menu'}
                </span>

                <ChevronDown size={15} className={`text-[#F5A623] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Card */}
              {isDropdownOpen && (
                <div id="desktop-navigation-menu" aria-label="Site navigation" className={`absolute top-full mt-3 ${isRtl ? 'right-0' : 'left-0'} w-80 bg-[#071426]/95 backdrop-blur-2xl border border-[rgba(255,255,255,0.15)] rounded-3xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-fade-in space-y-2`}>
                  <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-[#F5A623] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-base">☰</span>
                      <span>{isRtl ? 'أقسام الموقع' : lang === 'rw' ? 'Ibice by’urubuga' : 'Site Navigation'}</span>
                    </span>
                    <span className="text-[10px] bg-[#0B1F45] text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">MGREFOTS</span>
                  </div>

                  {/* Main Sections (المنتجات, تحليل InBody, موسوعة المكملات, المكتبة المعرفية) */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-extrabold text-[#94A3B8] px-3 pt-1 uppercase tracking-widest">
                      {isRtl ? 'الأقسام الرئيسية' : lang === 'rw' ? 'Ibice by’ingenzi' : 'Main Sections'}
                    </div>
                    {mainCategoryItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname.startsWith(item.path);

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsDropdownOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-[#0B1F45] to-[#173A73] text-[#F5A623] border border-[#F5A623]/40 shadow-md font-black scale-[1.01]'
                              : 'text-[#F5F7FA] hover:bg-[#0B1F45]/60 hover:text-[#F5A623]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#F5A623] text-[#030914]' : 'bg-[#091833] text-[#F5A623] border border-[rgba(255,255,255,0.08)]'}`}>
                              <Icon size={16} />
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] font-extrabold text-[#94A3B8] bg-[#030914] px-2 py-0.5 rounded-lg border border-[rgba(255,255,255,0.06)]">
                            {item.badge}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Other Pages */}
                  <div className="border-t border-[rgba(255,255,255,0.08)] pt-2 space-y-1">
                    <div className="text-[10px] font-extrabold text-[#94A3B8] px-3 uppercase tracking-widest">
                      {isRtl ? 'صفحات أخرى' : lang === 'rw' ? 'Izindi paji' : 'Other Pages'}
                    </div>
                    {otherNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.path === '/' 
                        ? location.pathname === '/' 
                        : location.pathname.startsWith(item.path);

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsDropdownOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-3 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                            isActive
                              ? 'bg-[#0B1F45] text-[#F5A623] border border-[#F5A623]/30'
                              : 'text-[#A7B3C4] hover:bg-[#0B1F45]/40 hover:text-white'
                          }`}
                        >
                          <Icon size={15} className={isActive ? 'text-[#F5A623]' : 'text-[#94A3B8]'} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Language switcher stays visually dominant; specialist guides live in the page journey. */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="flex bg-[#091833] rounded-full p-1 border border-[rgba(255,255,255,0.08)] shadow-inner" dir="ltr" role="group" aria-label="Language">
              {(['en', 'rw', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onSelectLang(l)}
                  type="button"
                  aria-pressed={lang === l}
                  aria-label={`Switch language to ${l === 'en' ? 'English' : l === 'rw' ? 'Kinyarwanda' : 'Arabic'}`}
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

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? (isRtl ? 'إغلاق القائمة' : lang === 'rw' ? 'Funga ibice' : 'Close navigation') : (isRtl ? 'فتح القائمة' : lang === 'rw' ? 'Fungura ibice' : 'Open navigation')}
              className="md:hidden p-2.5 rounded-2xl bg-[#091833] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav id="mobile-navigation-menu" aria-label="Mobile navigation" aria-hidden={!isMobileMenuOpen} className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-80 bg-[#071426] z-50 shadow-2xl flex flex-col md:hidden border-r border-[rgba(255,255,255,0.08)] transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0B1F45] border border-[#F5A623]/40 rounded-lg flex items-center justify-center font-black text-[#F5A623]">MG</div>
            <span className="text-lg font-black text-white tracking-wider" dir="ltr">MGREFOTS</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
            aria-label={isRtl ? 'إغلاق القائمة' : lang === 'rw' ? 'Funga ibice' : 'Close navigation'}
            className="w-9 h-9 rounded-full bg-[#0E2247] border border-[rgba(255,255,255,0.08)] text-[#A7B3C4] hover:text-white flex items-center justify-center font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto">
          <div className="text-[10px] font-extrabold text-[#F5A623] uppercase tracking-widest px-2 pt-2">
            {isRtl ? 'الأقسام الرئيسية' : lang === 'rw' ? 'Ibice by’ingenzi' : 'Main Sections'}
          </div>

          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-[#0B1F45] text-[#F5A623] border border-[#F5A623]/40 shadow-lg'
                    : 'text-[#A7B3C4] hover:bg-[#0E2247] hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-[rgba(255,255,255,0.08)] text-center">
          <p className="text-xs font-bold text-[#A7B3C4]" dir="ltr">© 2026 MGREFOTS LTD</p>
        </div>
      </nav>
    </>
  );
};
