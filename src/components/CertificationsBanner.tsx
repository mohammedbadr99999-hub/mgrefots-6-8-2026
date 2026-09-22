import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShieldCheck, CheckCircle2, X, Info } from 'lucide-react';
import { Language } from '../types';

interface CertificationsBannerProps {
  lang: Language;
}

interface CertificationItem {
  id: string;
  code: string;
  name: string;
  badgeColor: string;
  icon: string;
  details: {
    ar: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
    en: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
    rw: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
  };
}

export const CertificationsBanner: React.FC<CertificationsBannerProps> = ({ lang }) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const isRtl = lang === 'ar';

  const certifications: CertificationItem[] = [
    {
      id: 'iso9001',
      code: 'ISO 9001',
      name: isRtl ? 'إدارة الجودة الشاملة' : lang === 'rw' ? 'Imicungire y’ubuziranenge' : 'Quality Management System',
      badgeColor: 'from-blue-600 to-indigo-700',
      icon: '🏛️',
      details: {
        ar: {
          title: 'ISO 9001 - نظام إدارة الجودة الشاملة',
          standardCode: 'الاعتماد الدولي لإدارة ضبط الجودة',
          meaning: 'المعيار العالمي الأول الذي يثبت التزام المنشأة بأعلى معايير ضبط وضمان الجودة الموحدة والتطوير المستمر في جميع العمليات التشغيلية.',
          mgrefotsImpact: 'تُصنّع منتجات MGREFOTS من خلال منشأة شريكة تطبق نظام إدارة جودة حاصلًا على ISO 9001، بما يدعم ثبات العمليات والتوثيق والرقابة على الجودة.'
        },
        en: {
          title: 'ISO 9001 - Quality Management System',
          standardCode: 'International Quality Management Standard',
          meaning: 'The world’s recognized benchmark for quality management systems, continuous process control, and product consistency.',
          mgrefotsImpact: 'MGREFOTS products are made through a manufacturing partner operating an ISO 9001-certified quality management system, supporting consistent processes, documentation, and quality control.'
        },
        rw: {
          title: 'ISO 9001 - Ubuziranenge n\'Icuruzwa',
          standardCode: 'Standard Mpuzamahanga y\'Ubuziranenge',
          meaning: 'Standard mpuzamahanga yemewe ku isi hose mu kugenzura ubuziranenge n\'uburyo ibicuruzwa bikorwamo.',
          mgrefotsImpact: 'Ibicuruzwa bya MGREFOTS bikorerwa mu ruganda rw’umufatanyabikorwa rufite ISO 9001, bigafasha guhorana uburyo buhamye bwo gukora no kugenzura ubuziranenge.'
        }
      }
    },
    {
      id: 'iso22000',
      code: 'ISO 22000',
      name: isRtl ? 'سلامة الأغذية والتصنيع' : lang === 'rw' ? 'Imicungire y’umutekano w’ibiribwa' : 'Food Safety Management',
      badgeColor: 'from-emerald-600 to-teal-700',
      icon: '🛡️',
      details: {
        ar: {
          title: 'ISO 22000 - نظام إدارة سلامة الأغذية والتصنيع',
          standardCode: 'المعيار الدولي لمعايير أمان وتداول الأغذية والمكملات',
          meaning: 'نظام عالمي صارم يحدد متطلبات سلامة الأغذية ومنع أخطار التلوث البكتيري أو الكيميائي في كل خطوة من خطوات التصنيع والتعبئة.',
          mgrefotsImpact: 'تتم عمليات التصنيع لدى شريك MGREFOTS داخل نظام إدارة سلامة غذاء حاصل على ISO 22000 للسيطرة المنهجية على مخاطر السلامة أثناء الإنتاج والتعبئة.'
        },
        en: {
          title: 'ISO 22000 - Food Safety Management',
          standardCode: 'Global Food Safety & Hygiene Standard',
          meaning: 'A rigorous international framework designed to eliminate biological, chemical, and physical hazards across food and supplement production.',
          mgrefotsImpact: 'MGREFOTS manufacturing is performed by a partner operating an ISO 22000-certified food-safety system for structured hazard control throughout production and packing.'
        },
        rw: {
          title: 'ISO 22000 - Umutekano w\'Ibyo Kurya',
          standardCode: 'Standard Mpuzamahanga y\'Ubuziranenge bw\'Ibyo Kurya',
          meaning: 'Standard ikensera ko ibyo kurya n\'inyunganiramatsiko biba bifite umutekano ku buzima.',
          mgrefotsImpact: 'Umufatanyabikorwa ukora ibicuruzwa bya MGREFOTS akoresha uburyo bwemewe bwa ISO 22000 mu kugenzura ibyago by’umutekano mu gukora no gupakira.'
        }
      }
    },
    {
      id: 'fssc22000',
      code: 'FSSC 22000',
      name: isRtl ? 'اعتماد سلامة المنتجات' : lang === 'rw' ? 'Icyemezo cy’umutekano w’ibiribwa' : 'Food Safety Certification',
      badgeColor: 'from-cyan-600 to-blue-800',
      icon: '🔬',
      details: {
        ar: {
          title: 'FSSC 22000 - الاعتماد الأعلى عالمياً لسلامة المنتجات',
          standardCode: 'اعتماد المبادرة العالمية لسلامة الأغذية (GFSI)',
          meaning: 'الاعتماد الدولي الأرفع مستوى المعتمد من منظمات GFSI العالمية للتحقق من أمان سلاسل التوريد والوقاية من الغش والتحديث التكنولوجي.',
          mgrefotsImpact: 'يعمل شريك التصنيع وفق منظومة FSSC 22000 المعتمدة، ما يعزز رقابة سلامة الغذاء وتتبع سلسلة التوريد وإدارة مخاطر التصنيع.'
        },
        en: {
          title: 'FSSC 22000 - Food Safety System Certification',
          standardCode: 'GFSI Benchmarked World-Class Accreditation',
          meaning: 'The highest global standard recognized by GFSI for comprehensive food defense, supply-chain transparency, and authenticity.',
          mgrefotsImpact: 'Our manufacturing partner operates an FSSC 22000-certified system, strengthening food-safety controls, supply-chain traceability, and production risk management.'
        },
        rw: {
          title: 'FSSC 22000 - Icyemezo cyo ku Rwego rwo Hejuru rwa GFSI',
          standardCode: 'GFSI Benchmarked Global Standard',
          meaning: 'Icyemezo cyo ku rwego rwo hejuru k\'ubuziranenge bw\'ibiribwa gishimwa ku isi hose.',
          mgrefotsImpact: 'Umufatanyabikorwa wacu akoresha FSSC 22000 mu gukomeza umutekano w’ibiribwa, gukurikirana ibikoresho no kugenzura ibyago byo mu ruganda.'
        }
      }
    },
    {
      id: 'halal',
      code: 'HALAL',
      name: isRtl ? 'شهادة الحلال الإسلامية' : lang === 'rw' ? 'Ubuziranenge bwa Halal' : 'Halal Certified Quality',
      badgeColor: 'from-amber-600 to-yellow-700',
      icon: '🌙',
      details: {
        ar: {
          title: 'HALAL - شهادة المطابقة للأحكام الإسلامية',
          standardCode: 'شهادة الاعتماد والمطابقة الحلال 100%',
          meaning: 'شهادة رسمية تثبت مطابقة المكونات وعمليات التصنيع للشريعة الإسلامية وأخلاقيات التغذية السليمة.',
          mgrefotsImpact: 'تُنتج التركيبات المؤهلة لدى منشأة تصنيع شريكة حاصلة على اعتماد حلال، مع تطبيق متطلبات الفصل والتعامل مع المكونات وفق نطاق الشهادة.'
        },
        en: {
          title: 'HALAL - Certified Ethical & Pure Quality',
          standardCode: '100% Halal Compliant Ingredient Certification',
          meaning: 'Official accreditation verifying that all raw ingredients and processing comply strictly with Islamic dietary guidelines.',
          mgrefotsImpact: 'Eligible formulations are produced through a Halal-certified manufacturing partner, with ingredient handling and segregation managed within the certificate’s scope.'
        },
        rw: {
          title: 'HALAL - Icyemezo cya Halal',
          standardCode: 'Halal 100% Compliant Standard',
          meaning: 'Icyemezo cyo gukurikiza amategeko n\'amabwiriza ya Halal mu idini rya Islam.',
          mgrefotsImpact: 'Imiterere yujuje ibisabwa ikorerwa mu ruganda rw’umufatanyabikorwa rwemewe na Halal, hakurikijwe ibyo icyemezo gikubiyemo.'
        }
      }
    },
    {
      id: 'eu_organic',
      code: 'EU Organic',
      name: isRtl ? 'شهادة العضوية الأوروبية' : lang === 'rw' ? 'Organic yemewe n’Ubumwe bw’u Burayi' : 'EU Certified Organic',
      badgeColor: 'from-green-600 to-emerald-800',
      icon: '🌿',
      details: {
        ar: {
          title: 'EU Organic - شهادة العضوية الأوروبية',
          standardCode: 'معيار الزراعة العضوية للاتحاد الأوروبي',
          meaning: 'شهادة العضوية الأوروبية التي تحظر استخدام المبيدات الحشرية والأسمدة الكيميائية والتعديل الوراثي في المحاصيل الزراعية.',
          mgrefotsImpact: 'يمتلك شريك التصنيع اعتماد EU Organic للمواد وخطوط الإنتاج المؤهلة ضمن نطاق شهادته، وتُستخدم الصفة العضوية للمنتج فقط عندما يغطيها الاعتماد الخاص به.'
        },
        en: {
          title: 'EU Certified Organic Standard',
          standardCode: 'European Union Agriculture Organic Certification',
          meaning: 'Strict European standard banning synthetic pesticides, artificial fertilizers, and GMOs in crop cultivation.',
          mgrefotsImpact: 'Our manufacturing partner holds EU Organic certification for eligible materials and production lines within its certified scope. Product-level organic status is used only where specifically covered.'
        },
        rw: {
          title: 'EU Organic - Ubuziranenge bw\'Burayi',
          standardCode: 'EU Agriculture Organic Standard',
          meaning: 'Standard y\'Uburayi y\'ibimera bibazwe mu buryo bwa Organic ntamiti mibi.',
          mgrefotsImpact: 'Umufatanyabikorwa wacu afite EU Organic ku bikoresho n’imirongo yujuje ibisabwa; ijambo Organic rikoreshwa ku gicuruzwa gusa iyo icyemezo cyacyo kibyemera.'
        }
      }
    },
    {
      id: 'usda_organic',
      code: 'USDA Organic',
      name: isRtl ? 'شهادة العضوية الأمريكية' : lang === 'rw' ? 'Organic yemewe na USDA' : 'USDA Certified Organic',
      badgeColor: 'from-lime-600 to-green-700',
      icon: '🌱',
      details: {
        ar: {
          title: 'USDA Organic - شهادة العضوية الأمريكية الفيدرالية',
          standardCode: 'اعتماد وزارة الزراعة الأمريكية للمنتجات العضوية',
          meaning: 'المعيار الفيدرالي بالولايات المتحدة الأمريكية الذي يضمن الالتزام بالزراعة والتجهيز العضوي الخالي من الكيماويات والمواد الحافظة.',
          mgrefotsImpact: 'يحمل شريك التصنيع اعتماد USDA Organic للعمليات والمواد المؤهلة الواقعة ضمن نطاق الشهادة، مع الحفاظ على التتبع والفصل المطلوبين للإنتاج العضوي.'
        },
        en: {
          title: 'USDA Organic - Official US Certification',
          standardCode: 'United States Department of Agriculture Organic Seal',
          meaning: 'Official US federal certification guaranteeing non-GMO organic farming, zero chemical additives, and environmental stewardship.',
          mgrefotsImpact: 'Our manufacturing partner holds USDA Organic certification for eligible operations and materials within the certificate’s scope, including required traceability and segregation controls.'
        },
        rw: {
          title: 'USDA Organic - Ubuziranenge bwa Amerika',
          standardCode: 'USDA Organic Seal Standard',
          meaning: 'Icyemezo cya leta ya Amerika mu kugenzura ubuziranenge bwa Organic.',
          mgrefotsImpact: 'Umufatanyabikorwa wacu afite USDA Organic ku bikorwa n’ibikoresho biri mu cyemezo, harimo gukurikirana no gutandukanya umusaruro wa Organic.'
        }
      }
    }
  ];

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0E2247] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 shadow-2xl transition-all">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B1F45]/60 via-[#071426] to-transparent pointer-events-none" />
      
      {/* Top Header Label */}
      <div className="text-center mb-5 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#0B1F45] border border-[#F5A623]/40 px-3.5 py-1 rounded-full text-[11px] font-black text-[#F5A623] mb-2">
          <ShieldCheck size={14} className="text-[#F5A623]" />
          <span>
            {isRtl 
              ? 'تصنيع داخل منشآت حاصلة على اعتمادات دولية'
              : lang === 'rw' ? 'Bikorerwa mu nganda zemewe ku rwego mpuzamahanga' : 'Manufactured in internationally certified facilities'}
          </span>
        </div>

        <h2 className="text-sm sm:text-base font-black text-white leading-snug">
          {isRtl 
            ? 'تعمل MGREFOTS مع مصنع شريك حاصل على الاعتمادات التالية؛ اضغط على أي اعتماد لمعرفة نطاقه ودوره في التصنيع:'
            : lang === 'rw' ? 'MGREFOTS ikorana n’uruganda rw’umufatanyabikorwa rufite ibi byemezo; kanda kuri buri kimwe urebe uko gikoreshwa:' : 'MGREFOTS works with a manufacturing partner holding the following certifications. Select a badge to see its scope and role in production:'}
        </h2>
      </div>

      {/* Grid of 6 Certification Badges - Exact 6-column layout on md/lg screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group relative bg-[#071426] border border-[rgba(255,255,255,0.08)] hover:border-[#F5A623]/60 p-3.5 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.04] hover:shadow-xl cursor-pointer"
          >
            {/* Top Badge Icon */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white text-lg font-black shadow-md mb-2 group-hover:rotate-6 transition-transform`}>
              <span>{cert.icon}</span>
            </div>

            {/* Code */}
            <span className="text-xs font-black text-white tracking-wider font-mono">
              {cert.code}
            </span>

            {/* Name */}
            <span className="text-[10px] font-semibold text-[#A7B3C4] leading-tight mt-1 line-clamp-2">
              {cert.name}
            </span>

            {/* Click to view details prompt */}
            <div className="mt-2 flex items-center gap-1 text-[9px] font-extrabold text-[#F5A623] bg-[#0B1F45] border border-[#F5A623]/30 px-2 py-0.5 rounded-full">
              <Info size={10} />
              <span>{isRtl ? 'عرض الشرح' : lang === 'rw' ? 'Ibisobanuro' : 'Details'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Details Popup Modal */}
      {selectedCert && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#071426] border border-[rgba(255,255,255,0.08)] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden my-auto"
            dir={isRtl ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCert.badgeColor} flex items-center justify-center text-2xl font-black shadow-lg shrink-0`}>
                  <span>{selectedCert.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F5A623] font-mono block">
                    {selectedCert.details[lang]?.standardCode || selectedCert.details.ar.standardCode}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {selectedCert.details[lang]?.title || selectedCert.details.ar.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full bg-[#0B1F45] text-[#A7B3C4] hover:text-white hover:bg-[#173A73] border border-[rgba(255,255,255,0.08)] transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              {/* Meaning Section */}
              <div className="p-4 rounded-2xl bg-[#0E2247] border border-[rgba(255,255,255,0.08)] space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#F5A623] tracking-wider flex items-center gap-1.5">
                  <Info size={14} />
                  <span>{isRtl ? 'ماذا تعني هذه الشهادة؟' : lang === 'rw' ? 'Iki cyemezo gisobanura iki?' : 'What does this certification mean?'}</span>
                </h4>
                <p className="text-xs sm:text-sm font-medium text-[#F5F7FA]">
                  {selectedCert.details[lang]?.meaning || selectedCert.details.ar.meaning}
                </p>
              </div>

              {/* MGREFOTS Impact Section */}
              <div className="p-4 rounded-2xl bg-[#0B1F45] border border-[#F5A623]/30 space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#F5A623] tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>{isRtl ? 'دورها في تصنيع منتجات MGREFOTS:' : lang === 'rw' ? 'Uruhare rwacyo mu gukora ibicuruzwa bya MGREFOTS:' : 'How it supports MGREFOTS manufacturing:'}</span>
                </h4>
                <p className="text-xs sm:text-sm font-medium text-[#F5F7FA]">
                  {selectedCert.details[lang]?.mgrefotsImpact || selectedCert.details.ar.mgrefotsImpact}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-between items-center">
              <a
                href={selectedCert.id.includes('nasm') ? 'https://www.nasm.org' : 'https://www.iso.org'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#FF8A00] text-[#030914] font-black text-xs uppercase tracking-wider hover:opacity-95 transition text-center shadow-md flex items-center justify-center gap-1.5"
              >
                <span>{isRtl ? 'التحقق من الاعتماد الدولي الرسمي' : lang === 'rw' ? 'Reba ku rubuga rwemewe' : 'Verify Official Standard Portal'}</span>
                <span className="text-sm">↗</span>
              </a>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B1F45] hover:bg-[#173A73] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                {isRtl ? 'إغلاق النافذة' : lang === 'rw' ? 'Funga' : 'Close Window'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
