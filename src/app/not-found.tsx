"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import { useRole } from "@/lib/RoleContext";
import { getFontClass, isRtl } from "@/lib/i18n";
import { FadeIn } from "@/components/Animations";

// Localized strings for the premium 404 page
const dict = {
  title: {
    en: "404 — Asset Not Found",
    ar: "٤٠٤ — لم يتم العثور على الصفحة",
    zh: "404 — 未找到相关页面"
  },
  headline: {
    en: "Requested Route or Specification is Offline",
    ar: "المسار أو المواصفات الفنية المطلوبة غير متاحة",
    zh: "请求的路由或技术规范处于离线状态"
  },
  desc: {
    en: "The plant parameter, technical insight, or service directory you are looking for does not exist or has been relocated.",
    ar: "معلمة المصنع، أو الرؤية الفنية، أو دليل الخدمات الذي تبحث عنه غير موجود أو تم نقله.",
    zh: "您正在寻找的工厂参数、技术见解或服务目录不存在或已被重新定位。"
  },
  backBtn: {
    en: "Return to Control Room",
    ar: "العودة لغرفة التحكم الرئيسية",
    zh: "返回中控室"
  }
};

export default function NotFound() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);

  return (
    <div 
      dir={rtl ? "rtl" : "ltr"}
      className="relative w-full flex-1 min-h-[calc(100vh-140px)] flex flex-col justify-center items-center overflow-hidden bg-navy-deep px-6 py-10 md:py-14 text-center select-none"
    >
      {/* Scope custom keyframes inside this page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-counter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow-clockwise 45s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-counter 60s linear infinite;
        }
      `}} />

      {/* 1. Immersive Background Grid & Golden Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F0A020" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/90 to-navy-deep" />
        
        {/* Soft golden ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gold/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none animate-pulse duration-[6000ms]" />
      </div>

      {/* 2. Immersive Rotating Telemetry / HUD Rings */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.08] sm:opacity-[0.14]">
        {/* Outer telemetry ring */}
        <div className="absolute w-[360px] h-[360px] sm:w-[560px] sm:h-[560px] rounded-full border border-gold/40 border-dashed animate-spin-slow" />
        {/* Middle telemetry ring */}
        <div className="absolute w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] rounded-full border-2 border-gold/25 border-double animate-spin-slow-reverse" />
        {/* Inner ring */}
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full border border-gold/20" />
        {/* Crosshair horizontal */}
        <div className="absolute w-[420px] sm:w-[720px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        {/* Crosshair vertical */}
        <div className="absolute w-[1px] h-[420px] sm:h-[720px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
      </div>

      {/* 3. Open, Spacious Content Presentation (Wider container to fit headline on single line) */}
      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col justify-center items-center space-y-6 select-text">
        
        {/* Warning Icon Badge */}
        <FadeIn className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_25px_rgba(240,160,32,0.2)] relative select-none">
            <AlertTriangle className="w-6 h-6 text-gold animate-bounce" />
            <span className="absolute inset-0 rounded-full border border-gold/50 animate-ping opacity-30 duration-1000" />
          </div>
        </FadeIn>

        {/* Giant Metallic Golden 404 Header */}
        <FadeIn delay={0.1}>
          <h1 className="text-[100px] sm:text-[150px] md:text-[180px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gold/90 to-gold/20 font-[family-name:var(--font-display)] select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] my-0 py-0">
            404
          </h1>
        </FadeIn>

        {/* Error Metadata & Headline */}
        <FadeIn delay={0.2} className="space-y-3 w-full flex flex-col items-center">
          <span className={`${fcUi} text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 inline-block select-none mb-1`}>
            {dict.title[locale]}
          </span>
          
          <h2 className={`${fcDisplay} text-xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-cloud font-semibold tracking-tight leading-tight max-w-4xl lg:whitespace-nowrap px-4`}>
            {dict.headline[locale]}
          </h2>
          
          <p className={`${fcBody} text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-2xl mx-auto`}>
            {dict.desc[locale]}
          </p>
        </FadeIn>

        {/* Call-To-Action Button */}
        <FadeIn delay={0.3} className="pt-2">
          <a
            href="/"
            className={`inline-flex items-center gap-3 group bg-gold text-navy-deep hover:bg-gold-light font-bold text-xs sm:text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(240,160,32,0.25)] hover:shadow-[0_6px_25px_rgba(240,160,32,0.4)] hover:-translate-y-0.5 ${fcUi}`}
          >
            <span>{dict.backBtn[locale]}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </a>
        </FadeIn>

      </div>

      {/* 4. Telemetry Coordinates Footnote */}
      <div className="absolute bottom-4 left-6 text-left hidden md:block select-none pointer-events-none">
        <span className="block font-mono text-[9px] text-gold/40 tracking-widest uppercase">Base Coordinates</span>
        <span className="block font-mono text-[10px] text-silver/50 tracking-wider mt-0.5">30.0444° N, 31.2357° E — Cairo, Egypt</span>
      </div>
      <div className="absolute bottom-4 right-6 text-right hidden md:block select-none pointer-events-none">
        <span className="block font-mono text-[9px] text-gold/40 tracking-widest uppercase">Telemetry System</span>
        <span className="block font-mono text-[10px] text-silver/50 tracking-wider mt-0.5">CHNL: 404 | STAT: PING_OK</span>
      </div>
    </div>
  );
}
