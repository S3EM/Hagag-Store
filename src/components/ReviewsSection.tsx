import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { translations } from '../translations';

interface ReviewsSectionProps {
  t: typeof translations.ar;
  lang: 'ar' | 'en';
  darkMode: boolean;
}

const ReviewsSection = React.memo(function ReviewsSection({ t, lang, darkMode }: ReviewsSectionProps) {
  const isAr = lang === 'ar';

  const reviews = [
    {
      name: isAr ? "أبو أحمد - 64 سنة" : "Abu Ahmed - 64 years",
      role: isAr ? "تحسين المفاصل وآلام الظهر" : "Joint Mobility & Back Relief",
      img: "/images/avatar_elder.jpg",
      rating: 5,
      date: isAr ? "منذ يومين" : "2 days ago",
      comment: isAr 
        ? "جهاز رائع، ساعدني كثيراً في تخفيف آلام أسفل الظهر وتحسين الحركة دون بذل مجهود أو فوضى الحجامة التقليدية. وزنه خفيف وسهل الاستخدام للغاية."
        : "A wonderful device. It helped me a lot in relieving lower back pain and improving mobility without the effort or mess of traditional cupping. It is lightweight and very easy to use."
    },
    {
      name: isAr ? "كابتن حازم" : "Captain Hazem",
      role: isAr ? "رياضي وبناء أجسام" : "Athlete & Bodybuilder",
      img: "/images/avatar_athlete.jpg",
      rating: 5,
      date: isAr ? "منذ 5 أيام" : "5 days ago",
      comment: isAr 
        ? "كرياضي، أستخدمه بانتظام بعد التمرين المكثف لتخفيف تشنج العضلات والتعافي السريع. قوة الشفط والحرارة ممتازة ومثالية للعضلات العميقة."
        : "As an athlete, I use it regularly after intense workouts to relieve muscle spasms and speed up recovery. The suction power and heat are excellent and perfect for deep muscles."
    },
    {
      name: isAr ? "أم أمير" : "Um Amir",
      role: isAr ? "ربة منزل (استخدام عائلي)" : "Homemaker (Family Use)",
      img: "/images/avatar_child.jpg",
      rating: 5,
      date: isAr ? "منذ أسبوع" : "1 week ago",
      comment: isAr 
        ? "لقد جربته على ظهر ابنتي برفق مع مستوى الشفط الخفيف، فآمن جداً وساعدها على الاسترخاء. ميزة الإغلاق التلقائي تمنح الراحة والاطمئنان."
        : "I tried it gently on my daughter's back with the lowest suction level, it's very safe and helped her relax. The auto shut-off feature gives complete peace of mind."
    },
    {
      name: isAr ? "سارة م." : "Sara M.",
      role: isAr ? "موظفة مكتبية" : "Office Worker",
      initials: "SM",
      rating: 5,
      date: isAr ? "منذ أسبوعين" : "2 weeks ago",
      comment: isAr 
        ? "أستخدمه في المكتب لتخفيف آلام الرقبة والكتف بسبب الجلوس الطويل أمام الشاشة. تصميمه مريح ويمكن شحنه بـ USB في أي مكان بسهولة."
        : "I use it at the office to relieve neck and shoulder pain from long hours of sitting in front of a screen. Its design is ergonomic and can be charged via USB anywhere easily."
    }
  ];

  return (
    <section 
      id="reviews-section" 
      className={`px-4 py-12 relative overflow-hidden transition-colors border-b ${
        darkMode 
          ? 'bg-slate-900/50 border-slate-800' 
          : 'bg-white border-slate-100'
      }`}
    >
      {/* Background Decorative Gradient Radial */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-red-500 text-xs font-bold uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full">
            {isAr ? "آراء العملاء حقيقية" : "Genuine Customer Stories"}
          </span>
          <h2 className={`text-3xl font-extrabold mt-3 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {isAr ? "تجارب عملائنا السعداء" : "Happy Customer Reviews"}
          </h2>
          <p className={`text-sm mt-2 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            {isAr 
              ? "انظر ماذا يقول الذين غيروا حياتهم مع جهاز الحجامة الذكي السحري S3EM." 
              : "See what people who transformed their lives with S3EM Smart Cupping have to say."}
          </p>
        </div>

        {/* Customer Video Review Showcase */}
        <div className={`mb-8 p-4 rounded-3xl border ${
          darkMode 
            ? 'bg-slate-950/60 border-zinc-800' 
            : 'bg-slate-50 border-slate-200/60 shadow-sm'
        }`}>
          <h3 className={`text-xs font-extrabold mb-3 flex items-center gap-2 justify-center ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {isAr ? "شاهد تجربة استخدام حقيقية وتقييم سريع للمنتج:" : "Watch real user demonstration & verdict:"}
          </h3>
          <div className="relative aspect-[9/16] w-full max-w-[240px] mx-auto rounded-3xl overflow-hidden shadow-lg border border-red-500/20 bg-zinc-950 flex items-center justify-center">
            <video 
              src="/customer-review.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="none"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] relative overflow-hidden ${
                darkMode 
                  ? 'bg-slate-950/60 border-zinc-800 hover:border-red-500/30' 
                  : 'bg-slate-50 border-slate-200/60 hover:border-red-500/20'
              }`}
            >
              {/* Semi-transparent decorative quotation mark icon */}
              <div className="absolute right-3 top-3 opacity-5 pointer-events-none text-red-500">
                <Quote size={48} />
              </div>

              <div className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-sm truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {review.name}
                  </h3>
                  <span className={`text-[10px] shrink-0 ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                    {review.date}
                  </span>
                </div>
                
                <p className={`text-[11px] font-medium mt-1 ${darkMode ? 'text-zinc-400/85' : 'text-slate-500'}`}>
                  {review.role}
                </p>

                <div className={`flex items-center gap-1.5 mt-2 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>
                  
                  <span className="flex items-center gap-0.5 text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                    <ShieldCheck size={11} className="stroke-[2.5]" />
                    {isAr ? "مشتري مؤكد" : "Verified Buyer"}
                  </span>
                </div>

                {/* Review Comment Body */}
                <p className={`text-xs mt-4 leading-relaxed font-normal ${isAr ? 'text-right' : 'text-left'} ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ReviewsSection;
