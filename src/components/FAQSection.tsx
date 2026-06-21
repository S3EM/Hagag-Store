import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { translations } from '../translations';

interface FAQSectionProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  darkMode: boolean;
}

const FAQSection = React.memo(function FAQSection({ t, lang, darkMode }: FAQSectionProps) {
  const isAr = lang === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: isAr 
        ? "هل الجهاز آمن للاستخدام المنزلي بدون خبير؟" 
        : "Is the device safe for home use without an expert?",
      answer: isAr 
        ? "نعم، الجهاز مصمم خصيصاً للاستخدام المنزلي الآمن بفضل تقنية التحكم الذكي بالحرارة وخاصية الإغلاق التلقائي بعد 20 دقيقة، مما يمنع حدوث أي حروق أو شفط زائد." 
        : "Yes, the device is specifically designed for safe home use with smart temperature control and an auto-shutoff safety feature after 20 minutes, preventing any burns or excessive suction."
    },
    {
      question: isAr 
        ? "هل يسبب الجهاز أي جروح أو ندبات؟" 
        : "Does the device cause any cuts or scars?",
      answer: isAr 
        ? "لا، على عكس الحجامة التقليدية التي تعتمد على التشريط والنار، يعتمد جهازنا على الشفط الهوائي الذكي والحرارة اللطيفة دون أي جروح أو ندبات على البشرة." 
        : "No, unlike traditional cupping which involves skin incisions and fire, our device uses intelligent pneumatic suction and gentle soothing heat without any cuts or permanent scarring."
    },
    {
      question: isAr 
        ? "كم من الوقت أحتاج لاستخدامه في الجلسة الواحدة؟" 
        : "How long do I need to use it per session?",
      answer: isAr 
        ? "ننصح بـ 10 إلى 15 دقيقة لكل منطقة عضلية. سيتوقف الجهاز تلقائياً بعد 20 دقيقة كإجراء أمان مدمج." 
        : "We recommend 10 to 15 minutes per muscle group. The device will automatically shut down after 20 minutes as a built-in safety measure."
    },
    {
      question: isAr 
        ? "كيف يتم شحن الجهاز وكم تدوم البطارية؟" 
        : "How is the device charged and how long does the battery last?",
      answer: isAr 
        ? "يتم شحن الجهاز بسهولة عبر كابل USB المرفق (مثل الهاتف الذكي)، وتكفي الشحنة الواحدة لجلسات متعددة تدوم لأسبوع من الاستخدام اليومي بفضل بطاريته الليثيوم القوية." 
        : "The device is easily charged via the included USB cable (just like a smartphone). A single full charge is enough for multiple sessions lasting up to a week of daily use."
    },
    {
      question: isAr 
        ? "هل يمكن لجميع أفراد العائلة استخدامه؟" 
        : "Can all family members use it?",
      answer: isAr 
        ? "نعم، بفضل مستويات الشفط الـ 12 والحرارة القابلة للتعديل، يمكن استخدامه برفق للأطفال (تحت إشراف عائلي)، أو للرياضيين لاستشفاء العضلات، أو لكبار السن لتسكين آلام المفاصل بسلامة." 
        : "Yes, thanks to the 12 adjustable suction and heating levels, it can be used gently for kids (with supervision), for athletes to recover muscles, or for the elderly to relieve joint stiffness safely."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section 
      id="faq-section" 
      className={`px-4 py-12 transition-colors border-b ${
        darkMode 
          ? 'bg-slate-950 border-slate-900 text-white' 
          : 'bg-zinc-50 border-slate-100 text-zinc-900'
      }`}
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <span className="text-red-500 text-xs font-bold uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full">
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className={`text-2xl font-black mt-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {isAr ? "هل لديك أي استفسار آخر؟" : "Have any questions?"}
          </h2>
          <p className={`text-xs mt-2 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            {isAr 
              ? "إليك إجابات مفصلة عن أكثر الأسئلة الواردة من عملائنا الكرام." 
              : "Here are detailed answers to the questions we get most from our valued customers."}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? (darkMode ? 'bg-slate-900/60 border-red-500/40 shadow-md' : 'bg-white border-red-500/30 shadow-md')
                    : (darkMode ? 'bg-slate-900/20 border-slate-800' : 'bg-white/80 border-slate-200/60')
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-4 text-start flex items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <HelpCircle className={`shrink-0 ${isOpen ? 'text-red-500' : 'text-slate-400'}`} size={16} />
                    <span className="font-bold text-xs md:text-sm leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'text-slate-400'}`} 
                    size={16} 
                  />
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 border-t border-slate-100/5 dark:border-slate-800/50' : 'max-h-0'
                  }`}
                  style={{ display: isOpen ? 'block' : 'none' }}
                >
                  <div className={`px-4 pb-4 pt-3 text-xs leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default FAQSection;
