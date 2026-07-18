"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useRole } from "@/lib/RoleContext";
import { getFontClass, isRtl } from "@/lib/i18n";
import { FadeIn } from "@/components/Animations";

// Localized strings for the premium 404 page
const dict = {
  title: {
    en: "404 — Asset Not Found",
    ar: "٤٠٤ — لم يتم العثور على الأصل",
    zh: "404 — 未找到相关资产"
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
      className="relative w-full min-h-[75vh] flex flex-col justify-center items-center overflow-hidden bg-navy px-4 sm:px-8 py-20 text-center select-none"
    >
      {/* Scope custom keyframes inside this page to prevent CSS leaking */}
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

      {/* 1. Immersive Schematic Background Grid */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F0A020" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3045]/30 via-[#1E3045]/70 to-[#1E3045]" />
        
        {/* Soft premium golden ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gold/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />
      </div>

      {/* 2. Immersive Rotating Telemetry / HUD (Industrial Owner's Engineer theme) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.07] sm:opacity-[0.11]">
        {/* Outer telemetry ring */}
        <div className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full border border-gold/40 border-dashed animate-spin-slow" />
        {/* Middle telemetry ring with double borders */}
        <div className="absolute w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] rounded-full border-2 border-gold/20 border-double animate-spin-slow-reverse" />
        {/* Inner ring */}
        <div className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full border border-gold/15" />
        {/* Crosshair horizontal */}
        <div className="absolute w-[420px] sm:w-[680px] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        {/* Crosshair vertical */}
        <div className="absolute w-[1px] h-[420px] sm:h-[680px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      {/* 3. Content Container (with glassmorphic box for depth and clarity) */}
      <div className="relative z-10 max-w-[520px] w-full px-4 sm:px-0">
        <div className="bg-gradient-to-b from-[#1b2b3d]/50 to-[#121f2d]/50 backdrop-blur-md border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 xs:p-6 sm:p-10 rounded-sm flex flex-col justify-center items-center space-y-6 select-text">
          
          {/* Glowing Warning Icon */}
          <FadeIn className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(240,160,32,0.15)] relative select-none">
              <AlertTriangle className="w-5.5 h-5.5 text-gold animate-bounce" />
              <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-30 duration-1000" />
            </div>
          </FadeIn>

          {/* Giant Glowing 404 */}
          <FadeIn delay={0.1}>
            <h1 className="text-[80px] sm:text-[130px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gold/90 to-gold-light/10 font-[family-name:var(--font-display)] select-none drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
              404
            </h1>
          </FadeIn>

          {/* Localized Error Metadata */}
          <FadeIn delay={0.2} className="space-y-4 w-full flex flex-col items-center">
            <span className={`${fcUi} text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-gold bg-gold/10 px-3 py-1.5 rounded-sm border border-gold/15 inline-block select-none`}>
              {dict.title[locale]}
            </span>
            <h2 className={`${fcDisplay} text-[15px] sm:text-2xl text-cloud font-medium tracking-tight leading-snug max-w-[90%] sm:max-w-none`}>
              {dict.headline[locale]}
            </h2>
            <p className={`${fcBody} text-[11px] sm:text-sm font-light text-silver/70 leading-relaxed max-w-[420px]`}>
              {dict.desc[locale]}
            </p>
          </FadeIn>

          {/* Back Button */}
          <FadeIn delay={0.3}>
            <a
              href="/"
              className={`inline-flex items-center gap-2 group border border-gold/30 hover:border-gold hover:bg-gold/5 text-gold text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase px-5 py-3 rounded-sm transition-all duration-300 ${fcUi}`}
            >
              <span>{dict.backBtn[locale]}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </a>
          </FadeIn>
        </div>
      </div>

      {/* 4. Telemetry coordinate display footer (Owner's Engineer HUD details) */}
      <div className="absolute bottom-6 left-6 text-left hidden md:block select-none pointer-events-none">
        <span className="block font-mono text-[9px] text-gold/30 tracking-widest uppercase">Base Coordinates</span>
        <span className="block font-mono text-[10px] text-silver/45 tracking-wider mt-0.5">30.0444° N, 31.2357° E — Cairo, Egypt</span>
      </div>
      <div className="absolute bottom-6 right-6 text-right hidden md:block select-none pointer-events-none">
        <span className="block font-mono text-[9px] text-gold/30 tracking-widest uppercase">Telemetry System</span>
        <span className="block font-mono text-[10px] text-silver/45 tracking-wider mt-0.5">CHNL: 404 | STAT: PING_OK</span>
      </div>
    </div>
  );
}
