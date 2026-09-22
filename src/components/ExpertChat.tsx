import React, { useState } from 'react';
import { Send, MessageCircle, Sparkles, ShieldCheck, Bot, CheckCircle2, UserRound, Paperclip, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { validateAIFile } from '../utils/aiFile';

interface ExpertChatProps {
  lang: Language;
  onSendChatMessage: (message: string, file?: File) => Promise<string>;
}

export const ExpertChat: React.FC<ExpertChatProps> = ({ lang, onSendChatMessage }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const alignClass = isRtl ? 'text-right' : 'text-left';

  const copy = {
    en: {
      eyebrow: 'MGREFOTS intelligent consultation', title: 'Ask. Understand. Make a better decision.',
      intro: 'Write any question. The AI expert identifies the topic, gives a direct professional answer, and only connects an MGREFOTS product when it genuinely fits your goal.',
      methodology: 'Approved nutrition methodology', multilingual: 'English · Kinyarwanda · Arabic', direct: 'Direct, practical answers', examples: 'Try a question',
      prompts: ['How can I improve strength and repeated-set performance?', 'How much protein do I need each day?', 'Build a simple nutrition plan around my training goal.', 'What should I check before choosing a supplement?'],
      thinking: 'Reviewing your question and preparing a clear answer…', response: 'MGREFOTS AI Expert', humanTitle: 'Prefer a human conversation?',
      humanBody: 'Contact Mohamed Zeina directly on WhatsApp for a personal follow-up.', whatsapp: 'Chat on WhatsApp',
      notice: 'AI guidance is educational. Urgent symptoms, diagnosis, medication interactions, pregnancy, or complex medical conditions require a licensed healthcare professional.',
      error: 'The AI expert could not answer right now. Please try again or use WhatsApp.',
      upload: 'Upload PDF or image', removeFile: 'Remove attached file', clear: 'Clear question and answer',
      typeError: 'Please choose a PDF, JPG, PNG, or WebP file.', sizeError: 'The file must be 10 MB or smaller.',
      privacy: 'Analyzed for this answer only — not added to the private book library.'
    },
    rw: {
      eyebrow: 'Inama z’ubwenge za MGREFOTS', title: 'Baza. Sobanukirwa. Fata icyemezo cyiza.',
      intro: 'Andika ikibazo icyo ari cyo cyose. Impuguke ya AI imenya ingingo, igatanga igisubizo cy’umwuga kandi igahuza igicuruzwa cya MGREFOTS gusa iyo gihuye n’intego yawe.',
      methodology: 'Uburyo bw’imirire bwemewe', multilingual: 'English · Kinyarwanda · Arabic', direct: 'Ibisubizo bisobanutse kandi bifatika', examples: 'Gerageza ikibazo',
      prompts: ['Nakongera nte imbaraga mu myitozo?', 'Nkeneye poroteyine ingana iki ku munsi?', 'Nkorerera gahunda yoroshye y’imirire ijyanye n’intego yanjye.', 'Ni iki ngomba kureba mbere yo guhitamo inyunganiramirire?'],
      thinking: 'Turimo gusuzuma ikibazo cyawe no gutegura igisubizo…', response: 'Impuguke ya AI ya MGREFOTS', humanTitle: 'Urashaka kuvugana n’umuntu?',
      humanBody: 'Vugisha Mohamed Zeina kuri WhatsApp kugira ngo agukurikirane ku giti cyawe.', whatsapp: 'Vugana kuri WhatsApp',
      notice: 'Inama za AI ni izigisha. Ibimenyetso bikomeye, indwara, imiti, gutwita cyangwa ikibazo gikomeye bisaba umuganga wemewe.',
      error: 'Impuguke ya AI ntishoboye gusubiza ubu. Ongera ugerageze cyangwa ukoreshe WhatsApp.',
      upload: 'Ohereza PDF cyangwa ifoto', removeFile: 'Kuraho dosiye', clear: 'Siba ikibazo n’igisubizo',
      typeError: 'Hitamo PDF, JPG, PNG cyangwa WebP.', sizeError: 'Dosiye ntigomba kurenza 10 MB.',
      privacy: 'Isesengurwa kuri iki gisubizo gusa — ntiyongerwa mu isomero ry’ibitabo.'
    },
    ar: {
      eyebrow: 'استشارة MGREFOTS الذكية', title: 'اسأل. افهم. واتخذ قرارًا أفضل.',
      intro: 'اكتب أي سؤال. يحدد خبير الذكاء الاصطناعي المجال، ويقدم إجابة مهنية مباشرة، ويربط أحد منتجات MGREFOTS فقط عندما يكون مناسبًا فعلًا لهدفك.',
      methodology: 'منهج تغذوي معتمد', multilingual: 'العربية · Kinyarwanda · English', direct: 'إجابات مباشرة وعملية', examples: 'جرّب أحد هذه الأسئلة',
      prompts: ['كيف أزيد القوة وأحافظ على أدائي بين المجموعات؟', 'ما كمية البروتين التي أحتاجها يوميًا؟', 'ضع لي تصورًا غذائيًا بسيطًا يناسب هدفي الرياضي.', 'ما الذي يجب التأكد منه قبل اختيار أي مكمل؟'],
      thinking: 'نراجع سؤالك ونُعد إجابة واضحة ومناسبة…', response: 'خبير MGREFOTS بالذكاء الاصطناعي', humanTitle: 'تفضّل التحدث مع شخص مباشرة؟',
      humanBody: 'تواصل مع محمد زينة عبر واتساب للمتابعة الشخصية المباشرة.', whatsapp: 'تواصل عبر واتساب',
      notice: 'إرشادات الذكاء الاصطناعي تعليمية. الأعراض العاجلة أو التشخيص أو تداخلات الأدوية أو الحمل أو الحالات الطبية المعقدة تحتاج إلى مختص صحي مرخّص.',
      error: 'تعذر الحصول على إجابة الآن. حاول مرة أخرى أو تواصل عبر واتساب.',
      upload: 'ارفع PDF أو صورة', removeFile: 'احذف الملف المرفق', clear: 'امسح السؤال والإجابة',
      typeError: 'اختر ملف PDF أو صورة JPG أو PNG أو WebP.', sizeError: 'يجب ألا يزيد حجم الملف على 10 ميجابايت.',
      privacy: 'يُحلَّل لهذه الإجابة فقط — ولا يُضاف إلى مكتبة الكتب الخاصة.'
    }
  }[lang];

  const whatsappMessage = lang === 'ar'
    ? 'مرحبًا محمد زينة، لدي استفسار وأرغب في استشارة مباشرة.'
    : lang === 'rw'
      ? 'Muraho Mohamed Zeina, mfite ikibazo kandi nifuza inama itaziguye.'
      : 'Hello Mohamed Zeina, I have a question and would like a direct consultation.';

  const handleSendMessage = async (suggestedQuestion?: string) => {
    const userMessage = (suggestedQuestion ?? chatInput).trim();
    if ((!userMessage && !attachedFile) || isChatting) return;
    setChatInput(suggestedQuestion ?? chatInput);
    setIsChatting(true);
    setChatResponse('');
    try {
      setChatResponse(await onSendChatMessage(userMessage, attachedFile ?? undefined));
    } catch {
      setChatResponse(copy.error);
    } finally {
      setIsChatting(false);
    }
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const error = validateAIFile(file);
    if (error) {
      setAttachedFile(null);
      setFileError(error === 'size' ? copy.sizeError : copy.typeError);
      return;
    }
    setAttachedFile(file);
    setFileError('');
  };

  const clearConsultation = () => {
    setChatInput('');
    setChatResponse('');
    setAttachedFile(null);
    setFileError('');
  };

  const formatText = (text: string) => text.split('\n').map((line, index) => {
    const cleaned = line.replace(/^#{1,4}\s*/, '').replace(/\*\*/g, '').trim();
    if (!cleaned) return <div key={`space-${index}`} className="h-2" />;
    const isBullet = /^[-•]\s+/.test(cleaned);
    return (
      <p key={`answer-${index}`} className={`mb-2 text-sm leading-7 text-[#E2E8F0] ${isBullet ? 'flex gap-2' : ''}`}>
        {isBullet ? <CheckCircle2 size={15} className="mt-1.5 shrink-0 text-[#F5A623]" /> : null}
        <span>{cleaned.replace(/^[-•]\s+/, '')}</span>
      </p>
    );
  });

  return (
    <section className="max-w-6xl mx-auto animate-fade-in space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/35 bg-[#0B1F45] px-4 py-1.5 text-xs font-black text-[#F5A623]">
          <Sparkles size={14} /><span>{copy.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white">{copy.title}</h1>
        <p className="text-sm sm:text-base leading-7 text-[#A7B3C4]">{copy.intro}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)] gap-6 items-start">
        <div className="rounded-[2rem] border border-white/10 bg-[#091833]/80 p-5 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7">
            {[
              { icon: ShieldCheck, text: copy.methodology }, { icon: Bot, text: copy.multilingual }, { icon: CheckCircle2, text: copy.direct },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#030914]/55 px-3 py-2.5 text-xs font-bold text-[#CBD5E1]">
                <Icon size={15} className="shrink-0 text-[#F5A623]" /><span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className={`mb-3 text-xs font-black uppercase tracking-wider text-[#F5A623] ${alignClass}`}>{copy.examples}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {copy.prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => handleSendMessage(prompt)} disabled={isChatting}
                  className={`rounded-xl border border-white/10 bg-[#0B1F45]/55 px-4 py-3 text-xs font-bold leading-5 text-[#CBD5E1] transition hover:border-[#F5A623]/45 hover:text-white disabled:opacity-50 ${alignClass}`}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="expert-question" className="sr-only">{t.chat_placeholder}</label>
          <textarea id="expert-question" value={chatInput} onChange={(event) => setChatInput(event.target.value)}
            dir="auto"
            onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSendMessage(); } }}
            rows={5} maxLength={12000} placeholder={t.chat_placeholder}
            className={`w-full resize-y rounded-2xl border border-white/10 bg-[#030914]/80 p-5 text-sm font-medium leading-6 text-white outline-none transition placeholder:text-[#64748B] focus:border-[#F5A623]/70 ${alignClass}`} />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <label className="min-h-[50px] cursor-pointer rounded-2xl border border-[#F5A623]/45 bg-[#091833] px-5 py-3 font-black text-[#F5A623] transition hover:border-[#F5A623] hover:bg-[#0B1F45] flex items-center justify-center gap-2">
              <Paperclip size={18} aria-hidden="true" /><span>{copy.upload}</span>
              <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={handleFileSelection} className="sr-only" />
            </label>
            <button type="button" onClick={() => handleSendMessage()} disabled={isChatting || (!chatInput.trim() && !attachedFile)}
              className="min-h-[50px] flex-1 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] px-5 py-3 font-black text-[#030914] shadow-lg shadow-[#F5A623]/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 flex items-center justify-center gap-2">
              {isChatting ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
              <span>{isChatting ? copy.thinking : t.chat_btn}</span>
            </button>
          </div>

          {attachedFile ? (
            <div className={`mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-[#CBD5E1] ${alignClass}`}>
              <Paperclip size={14} className="text-[#F5A623]" aria-hidden="true" />
              <span className="max-w-[70%] truncate" title={attachedFile.name}>{attachedFile.name}</span>
              <button type="button" onClick={() => setAttachedFile(null)} className="rounded-full p-1 text-[#94A3B8] transition hover:bg-white/10 hover:text-white" aria-label={copy.removeFile} title={copy.removeFile}>
                <X size={15} />
              </button>
              <span className="basis-full text-[#64748B]">{copy.privacy}</span>
            </div>
          ) : null}
          {fileError ? <p role="alert" className={`mt-2 text-xs font-bold text-red-400 ${alignClass}`}>{fileError}</p> : null}

          <div aria-live="polite" aria-busy={isChatting}>
            {(isChatting || chatResponse) ? (
              <div className={`relative mt-7 rounded-2xl border border-[#F5A623]/25 bg-[#030914]/75 p-5 sm:p-6 ${alignClass}`}>
                <button type="button" onClick={clearConsultation} className={`absolute top-4 rounded-full border border-white/10 bg-[#091833] p-1.5 text-[#94A3B8] transition hover:border-[#F5A623]/50 hover:text-white ${isRtl ? 'left-4' : 'right-4'}`} aria-label={copy.clear} title={copy.clear}>
                  <X size={16} />
                </button>
                <div className="mb-4 flex items-center gap-2 text-[#F5A623]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1F45]"><Bot size={18} /></div>
                  <span className="text-xs font-black uppercase tracking-wider">{copy.response}</span>
                </div>
                {isChatting ? <p className="animate-pulse text-sm font-bold text-[#94A3B8]">{copy.thinking}</p> : <div dir="auto" style={{ textAlign: 'start' }}>{formatText(chatResponse)}</div>}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-[2rem] border border-emerald-500/25 bg-gradient-to-br from-[#0B1F45] to-[#071426] p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400"><UserRound size={24} /></div>
            <h2 className="text-xl font-black text-white">{copy.humanTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-[#A7B3C4]">{copy.humanBody}</p>
            <a href={`https://wa.me/250792294432?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer"
              className="mt-5 min-h-[48px] w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-500 flex items-center justify-center gap-2">
              <MessageCircle size={19} /><span>{copy.whatsapp}</span>
            </a>
          </div>

          <div className={`rounded-2xl border border-white/10 bg-[#071426] p-4 text-xs leading-5 text-[#94A3B8] ${alignClass}`}>
            <div className="mb-2 flex items-center gap-2 font-black text-[#CBD5E1]">
              <ShieldCheck size={15} className="text-[#F5A623]" />
              <span>{isRtl ? 'استخدام مسؤول' : lang === 'rw' ? 'Gukoresha neza' : 'Responsible use'}</span>
            </div>
            <p>{copy.notice}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};
