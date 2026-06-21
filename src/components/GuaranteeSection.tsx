import React from 'react';
import { ShieldAlert, Truck, RotateCcw, Headphones } from 'lucide-react';
import { translations } from '../translations';

interface GuaranteeSectionProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  darkMode: boolean;
}

const GuaranteeSection = React.memo(function GuaranteeSection({ t, lang, darkMode }: GuaranteeSectionProps) {
  const isAr = lang === 'ar';

  const guarantees = [
    {
      icon: RotateCcw,
      title: isAr ? "ضمان استبدال واسترجاع 14 يومًا" : "14-Day Replacement Guarantee",
      desc: isAr 
        ? "إذا لم يعجبك المنتج أو واجهت أي مشكلة، يمكنك استبداله أو استرجاع أموالك بالكامل بكل سهولة وسلاسة دون شروط معقدة." 
        : "If you're not fully satisfied or encounter any issue, easily replace the device or request a refund without complex terms."
    },
    {
      icon: Truck,
      title: isAr ? "شحن ومراجعة آمنة عند الاستلام" : "Verify & Pay on Delivery",
      desc: isAr 
        ? "شحن مجاني سريع وآمن لجميع المحافظات. يحق لك فتح الشحنة ومراجعة مميزات الجهاز والتأكد من سلامته قبل دفع قرش واحد." 
        : "Free fast shipping to all governorates. You have the complete right to inspect the product thoroughly before making payment."
    },
    {
      icon: Headphones,
      title: isAr ? "دعم واستشارات مجانية 24/7" : "24/7 Premium Support",
      desc: isAr 
        ? "فريق خدمة عملاء ودعم فني متاح على مدار الساعة للإجابة عن أسئلتك، ومتابعة شحنتك، وتقديم نصائح مجانية للاستخدام الأمثل للجهاز." 
        : "Our customer service and technical support team is always available to assist with questions, trace shipments, and offer tips."
    }
  ];

  return (
    <section 
      id="guarantee-section" 
      className={`px-4 py-12 relative overflow-hidden transition-colors border-b ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900/40 to-slate-950/20 border-slate-900' 
          : 'bg-gradient-to-b from-red-500/[0.01]/10 to-red-500/[0.03] border-slate-100'
      }`}
    >
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full mb-3">
            <ShieldAlert size={12} className="stroke-[2.5]" />
            <span>{isAr ? "تسوق مطمئناً وبلا مخاطرة" : "Risk-free Shopping"}</span>
          </div>
          <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {isAr ? "ضمانات S3EM الذهبية لك" : "Our Golden Guarantees For You"}
          </h2>
          <p className={`text-xs mt-2 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            {isAr 
              ? "نحن نضع مصلحتك وراحتك في المقام الأول لنمنحك تجربة شراء لا تشوبها شائبة." 
              : "We prioritize your wellness and comfort to deliver a completely safe shopping experience."}
          </p>
        </div>

        <div className="space-y-5">
          {guarantees.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-900/40 border-zinc-800/60 hover:bg-slate-900/70 hover:border-red-500/30' 
                    : 'bg-white border-slate-200/50 hover:bg-white hover:border-red-500/20 shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center shrink-0 text-red-500">
                  <IconComponent size={22} className="stroke-[2]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className={`font-bold text-xs md:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] md:text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500/90'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default GuaranteeSection;
