import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { Mail, MapPin, MessageCircle, Send, ShieldCheck, Sparkles, Phone, Clock, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    // Send via direct WhatsApp format
    const text = `*New Contact Inquiry from Website*\nName: ${formName || 'Guest'}\nEmail: ${formEmail || 'N/A'}\nPhone: ${formPhone || 'N/A'}\nMessage: ${formMessage}`;
    const url = `https://wa.me/250792294432?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setSubmitted(true);
    setFormMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#091833]/90 border border-[rgba(255,255,255,0.08)] p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F45] border border-[#F5A623]/40 text-[#F5A623] text-xs font-black uppercase tracking-wider">
          <MessageCircle size={14} />
          <span>MGREFOTS Ltd. — Global Customer Support</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRtl ? 'تواصل مع فريق MGREFOTS والكابتن محمد زينة' : 'Contact MGREFOTS Team & Coach'}
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] font-medium max-w-2xl mx-auto leading-relaxed">
          {isRtl
            ? 'نحن هنا للإجابة على استفساراتك حول المكملات الشحن أو المساعدة في اختيار البروتوكول الرياضي المناسب لك.'
            : 'Get in touch for order inquiries, wholesale distribution, or direct consultation with Coach Mohamed Zeina.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info Cards */}
        <div className="space-y-4">
          <a
            href="https://wa.me/250792294432?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20MGREFOTS%D9%88%D8%A7%D8%AA%D8%B3%D8%A7%D8%A8"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 hover:from-emerald-900 hover:to-teal-900 border border-emerald-600/40 rounded-3xl transition shadow-xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                💬
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
                  {isRtl ? 'محادثة فورية (WhatsApp Direct)' : 'Instant Direct WhatsApp'}
                </span>
                <span className="text-base font-black text-white group-hover:text-emerald-300 transition-colors" dir="ltr">
                  +250 792 294 432
                </span>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {isRtl ? 'اضغط للتحدث المباشر مع الخبير فوراً' : 'Click for instant direct WhatsApp support'}
                </p>
              </div>
            </div>
          </a>

          <a
            href="mailto:info@mgrefots.com"
            className="block p-6 bg-[#091833]/80 hover:bg-[#0B1F45] border border-[rgba(255,255,255,0.08)] rounded-3xl transition shadow-xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1F45] border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#F5A623] uppercase tracking-widest block">
                  {isRtl ? 'البريد الإلكتروني الرسمي' : 'Official Email Address'}
                </span>
                <span className="text-base font-black text-white group-hover:text-[#F5A623] transition-colors" dir="ltr">
                  info@mgrefots.com
                </span>
                <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
                  {isRtl ? 'للاستفسارات الرسمية والتجارية' : 'For official & corporate inquiries'}
                </p>
              </div>
            </div>
          </a>

          <a
            href="https://maps.google.com/?q=Kigali,Rwanda"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-[#091833]/80 hover:bg-[#0B1F45] border border-[rgba(255,255,255,0.08)] rounded-3xl transition shadow-xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1F45] border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                <MapPin size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#F5A623] uppercase tracking-widest block">
                  {isRtl ? 'مقر الشركة والشحن' : 'Headquarters & Shipping'}
                </span>
                <span className="text-base font-black text-white group-hover:text-[#F5A623] transition-colors" dir="ltr">
                  Kigali, Rwanda
                </span>
                <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
                  {isRtl ? 'عرض الموقع المباشر على خرائط جوجل ↗' : 'View location on Google Maps ↗'}
                </p>
              </div>
            </div>
          </a>

          <div className="p-5 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.08)] flex items-center gap-3">
            <Clock size={18} className="text-[#F5A623] shrink-0" />
            <div className="text-xs font-medium text-[#94A3B8]">
              <span className="text-white font-bold block">{isRtl ? 'ساعات الدعم والعمل:' : 'Customer Support Hours:'}</span>
              <span>{isRtl ? 'طوال أيام الأسبوع: ٩:٠٠ صباحاً - ٩:٠٠ مساءً (توقيت كيجالي / القاهرة)' : '7 Days a Week: 9:00 AM – 9:00 PM (CAT / EET)'}</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#091833]/90 border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#F5A623]" />
              <span>{isRtl ? 'أرسل رسالة فورية إلى الخبير' : 'Send Message to Expert Team'}</span>
            </h3>
            <p className="text-xs text-[#94A3B8] font-medium">
              {isRtl ? 'سيتم توجيه رسالتك مباشرة لرسائل الواتساب للتواصل الفوري.' : 'Your message will be formatted for instant direct messaging.'}
            </p>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#A7B3C4] mb-1.5">
                {isRtl ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={isRtl ? 'أدخل اسمك' : 'Your name'}
                className="w-full px-4 py-3 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.1)] text-xs text-white outline-none focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A7B3C4] mb-1.5">
                {isRtl ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
              </label>
              <input
                type="text"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+250..."
                className="w-full px-4 py-3 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.1)] text-xs text-white outline-none focus:border-[#F5A623]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A7B3C4] mb-1.5">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.1)] text-xs text-white outline-none focus:border-[#F5A623]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A7B3C4] mb-1.5">
                {isRtl ? 'نص الاستفسار أو الرسالة' : 'Message / Inquiry'}
              </label>
              <textarea
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Type your question or goal...'}
                className="w-full p-4 bg-[#030914] rounded-2xl border border-[rgba(255,255,255,0.1)] text-xs text-white outline-none focus:border-[#F5A623]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#F5A623] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#F5A623] text-[#030914] font-black text-sm rounded-2xl transition shadow-xl flex items-center justify-center gap-2"
            >
              <Send size={18} />
              <span>{isRtl ? 'إرسال عبر الواتساب' : 'Send via WhatsApp'}</span>
            </button>

            {submitted && (
              <div className="p-3 bg-[#0B1F45] border border-[#F5A623]/40 rounded-xl text-center text-xs font-bold text-[#F5A623] flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>{isRtl ? 'تم فتح تطبيق الواتساب لإرسال رسالتك.' : 'WhatsApp chat launched to send message.'}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
