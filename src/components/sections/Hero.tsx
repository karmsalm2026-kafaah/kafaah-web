"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Cpu, 
  Shield, 
  Factory, 
  Globe,
  Power,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import type { HeroContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { hero as heroDict, isRtl, getFontClass } from "@/lib/i18n";

interface Props {
  content?: HeroContent;
}

function HoverWords({ text, locale, isGradient = false }: { text: string; locale: string; isGradient?: boolean }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${
            isChinese ? "" : "mr-[0.28em] rtl:mr-0 rtl:ml-[0.28em]"
          } ${
            isGradient 
              ? "bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold font-black" 
              : ""
          }`}
          whileHover={{
            scale: 1.08,
            y: -3,
            filter: isGradient ? "drop-shadow(0 0 8px rgba(229, 193, 88, 0.6))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            color: isGradient ? undefined : "#f3e1b3",
            transition: { type: "spring", stiffness: 350, damping: 10 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function HoverSubcopy({ text, locale }: { text: string; locale: string }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${
            isChinese ? "" : "mr-[0.25em] rtl:mr-0 rtl:ml-[0.25em]"
          }`}
          whileHover={{
            scale: 1.04,
            y: -1,
            color: "#ffffff",
            textShadow: "0 0 4px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 12 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function HeroSection({ content }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const eyebrow = content?.eyebrow?.[locale] ?? heroDict.eyebrow[locale];
  const eyebrowParts = eyebrow.split(" | ");
  const headline = content?.headline?.[locale] ?? heroDict.headline[locale];
  const sub = content?.subCopy?.[locale] ?? heroDict.subCopy[locale];
  const primary = {
    label: content?.primaryCta?.label?.[locale] ?? heroDict.exploreServices[locale],
    href: content?.primaryCta?.href ?? "#services",
  };
  const secondary = {
    label: content?.secondaryCta?.label?.[locale] ?? heroDict.discussPlant[locale],
    href: content?.secondaryCta?.href ?? "#experience",
  };
  const stats = content?.stats?.map(s => ({ num: s.num, label: s.label[locale] })) ?? 
    heroDict.stats[locale].map(s => ({ num: s.value, label: s.label }));

  const builtInside = heroDict.builtInside;

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative min-h-[620px] xs:min-h-[660px] md:min-h-0 md:h-[100dvh] flex flex-col overflow-hidden bg-navy-deep">
      {/* Image Background with authoritative overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="w-full h-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <picture>
            {/* Mobile: same image for all locales */}
            <source media="(max-width: 768px)" srcSet="/hero-bg-mobile-828.webp" />
            {/* Desktop: Specific image for LTR languages (English, Chinese) */}
            {!rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-extended.webp" />}
            {/* Desktop: RTL-specific image for Arabic */}
            {rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-rtl-1920.webp" />}
            <img
              src="/hero-bg-extended.webp"
              alt="Engineering Team"
              className="w-full h-full object-cover object-right lg:object-center max-md:opacity-85 opacity-100 max-md:mix-blend-normal md:mix-blend-luminosity"
            />
          </picture>
        </motion.div>
        {/* Lighter Gradient Overlays for better image visibility */}
        <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-t md:bg-gradient-to-l" : "max-md:bg-gradient-to-t md:bg-gradient-to-r"} from-navy-deep/80 md:from-navy-deep/90 via-navy-deep/60 md:via-navy-deep/70 sm:via-navy-deep/50 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 sm:via-transparent via-transparent to-navy-deep/60" />
        {/* Mobile only dark overlay for high text contrast */}
        <div className="absolute inset-0 bg-navy-deep/75 md:hidden z-1 pointer-events-none" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-3 sm:px-6 lg:px-8 pt-20 pb-4 sm:pt-24 sm:pb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          {/* Left Column (Content) - exactly 65% screen width & aligned sides */}
          <StaggerChildren className="relative w-full lg:w-[65%] flex flex-col items-center lg:items-start text-center lg:text-start justify-center max-w-[500px] sm:max-w-[580px] lg:max-w-[620px] mx-auto lg:mx-0">
            {/* Eyebrow / Tag - aligned to boundaries with dynamic gold indicator */}
             <RevealItem className="w-full">
              <div className="mb-2 sm:mb-4.5 w-full flex items-center justify-center lg:justify-start gap-2.5">
                {/* Premium Solid Gold Pulse Circle (Start) */}
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold relative shadow-[0_0_10px_#d97706] flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60"></span>
                </div>
                <span className={`${locale !== "en" ? getFontClass(locale) + " text-[10px] sm:text-[11px] tracking-wider" : "font-[family-name:var(--font-ui)] tracking-[0.08em] sm:tracking-[0.16em] lg:tracking-[0.22em] uppercase text-[9.5px] xs:text-[10px] sm:text-[10px]"} font-semibold text-gold block text-center lg:text-start leading-normal sm:leading-none`}>
                  {eyebrowParts.length > 1 ? (
                    <>
                      {eyebrowParts[0]}
                      <br className="sm:hidden" />
                      {eyebrowParts[1]}
                    </>
                  ) : (
                    eyebrow
                  )}
                </span>
                {/* Premium Solid Gold Pulse Circle (End) */}
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold relative shadow-[0_0_10px_#d97706] flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60"></span>
                </div>
              </div>
            </RevealItem>

            {/* Headline – Exactly 2 lines on all screens */}
            <RevealItem className="w-full">
              <h1 className={`${locale === "ar" ? getFontClass(locale) + " text-[21px] xs:text-[24px] sm:text-[33px] lg:text-[42px] leading-[1.24] sm:leading-[1.2] tracking-normal font-black"
                : locale === "zh" ? getFontClass(locale) + " text-[20px] xs:text-[23px] sm:text-[31px] lg:text-[40px] leading-[1.24] sm:leading-[1.2] tracking-normal font-bold"
                  : "font-[family-name:var(--font-display)] text-[23px] xs:text-[26px] sm:text-[35px] lg:text-[45px] leading-[1.18] sm:leading-[1.1] tracking-[-0.01em]"
                } mb-3 sm:mb-6 w-full text-center lg:text-start`}
              >
                <span className="block sm:whitespace-nowrap text-white overflow-visible pb-1">
                  <HoverWords text={headline[0]} locale={locale} />
                </span>
                <span className="block sm:whitespace-nowrap overflow-visible pb-1">
                  <HoverWords text={headline[1]} locale={locale} isGradient={true} />
                </span>
              </h1>
            </RevealItem>

            {/* Sub copy - Clean typography aligned to edges */}
            <RevealItem className="w-full">
              <p className={`${locale !== "en" ? getFontClass(locale) : ""} text-[12.5px] xs:text-[13.5px] sm:text-base text-white/90 md:text-silver/85 w-full leading-relaxed mb-4 sm:mb-8 font-normal text-center lg:text-start mx-auto lg:mx-0`}>
                <HoverSubcopy text={sub} locale={locale} />
              </p>
            </RevealItem>

            {/* CTAs - Full width stack on mobile, 50:50 grid on tablet/desktop */}
            <RevealItem className="w-full">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mt-2 w-full">
                <Link
                  href={primary.href}
                 className={`group btn-premium-gold !gap-2.5 px-3 py-[11px] sm:py-3.5 ${locale !== "en" ? getFontClass(locale) + " text-[12.5px] xs:text-[13px] font-bold" : "font-[family-name:var(--font-ui)] text-[11.5px] xs:text-[12px] font-bold tracking-[0.12em] xs:tracking-[0.15em] uppercase"} w-full justify-center`}
                >
                  {/* Premium animated light sweep */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <Cpu className="w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="relative z-10 whitespace-nowrap">{primary.label}</span>
                </Link>

                <Link
                  href={secondary.href}
                 className={`group btn-premium-glass border border-white/10 hover:border-white/20 !gap-2.5 px-3 py-[11px] sm:py-3.5 ${locale !== "en" ? getFontClass(locale) + " text-[12.5px] xs:text-[13px] font-semibold" : "font-[family-name:var(--font-ui)] text-[11.5px] xs:text-[12px] font-semibold tracking-[0.06em] xs:tracking-[0.08em] uppercase"} w-full justify-center`}
                >
                  {/* Premium animated border */}
                  <div className="animated-border-box rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Factory className="w-4 h-4 flex-shrink-0 relative z-10 opacity-90 group-hover:opacity-100 group-hover:text-gold transition-all duration-500 group-hover:scale-110" />
                  <span className="relative z-10 whitespace-nowrap">{secondary.label}</span>
                </Link>
              </div>
            </RevealItem>

            {/* Built Inside Card (Sleek Unified Compact Card - aligned sides, hidden on mobile) */}
            <RevealItem className="w-full">
              <div className="hidden sm:block mt-8 sm:mt-10 p-4 sm:p-5 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-sm w-full relative group hover:border-gold/25 hover:bg-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Card Side accent line */}
                <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[2px] bg-gold/30 group-hover:bg-gold/80 transition-colors duration-300`} />

                {/* Card Title Header with Pulsating Status Dot */}
                <div className="flex items-center gap-2.5 mb-4 px-1">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold"></span>
                  </span>
                  <span className={`${locale !== "en" ? getFontClass(locale) + " font-bold text-[11px] sm:text-[12px]" : "font-[family-name:var(--font-ui)] tracking-[0.2em] font-semibold text-[10px] uppercase"} text-gold/80`}>
                    {builtInside.title[locale]}
                  </span>
                </div>

                {/* Compact Grid Items inside Card */}
                <div className="grid grid-cols-2 gap-x-5 gap-y-3 px-1">
                  {(builtInside.items[locale] || []).slice(0, 4).map((item, index) => {
                    let Icon = Power;
                    if (index === 0) Icon = Power;        // Commissioning & Startup
                    if (index === 1) Icon = Shield;       // Operational Stabilization
                    if (index === 2) Icon = TrendingUp;   // Performance Optimization
                    if (index === 3) Icon = ShieldCheck;  // Independent Technical Oversight
                    
                    return (
                      <div key={index} className="flex items-center gap-2.5 group/item">
                        <div className="flex-shrink-0 w-7 h-7 rounded-sm bg-gold/5 flex items-center justify-center border border-white/[0.06] group-hover/item:border-gold/30 group-hover/item:bg-gold/15 transition-all duration-300">
                          <Icon className="w-3.5 h-3.5 text-gold/90 group-hover/item:text-gold" />
                        </div>
                        <span className={`${locale !== "en" ? getFontClass(locale) + " text-[12px] sm:text-[13px] font-medium" : "text-[11px] sm:text-[12px] font-medium tracking-wide"} text-silver/85 group-hover/item:text-white transition-colors duration-200 leading-tight`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RevealItem>
          </StaggerChildren>
        </div>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <FadeIn delay={0.48} y={0}>
        <div className="relative z-10 border-t border-white/[0.12] bg-navy-deep/45 backdrop-blur-md pb-6 sm:pb-0">
          <div className="container mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => {
                return (
                  <div
                    key={stat.label}
                    className={`py-2.5 xs:py-3.5 sm:py-4 md:py-4.5 px-2.5 xs:px-4 md:px-6 lg:px-8 group cursor-default border-white/[0.1] transition-colors duration-300 hover:bg-white/[0.01] ${i === 1 || i === 3 ? "border-s" : ""
                      } ${i === 2 ? "max-md:border-s-0 md:border-s" : ""} ${i < 2 ? "border-b md:border-b-0" : ""
                      }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2 md:flex-row md:items-center md:text-start md:gap-3.5 h-full justify-center">
                      {/* Premium Gold Outline SVG Icon */}
                      {i === 0 && (
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-gold flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(229,193,88,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="9" r="6" strokeWidth={0.8} strokeDasharray="1.5 1.5" />
                          <circle cx="12" cy="9" r="5" />
                          <circle cx="12" cy="9" r="2.2" />
                          <path d="M9 14.5v6.5l3-2.5 3 2.5v-6.5" />
                          <path d="M12 4v1.5M7.5 7l1.1 1.1M16.5 7l-1.1 1.1" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-gold flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(229,193,88,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 2h4M12 2v3M7.8 19.5h8.4" />
                          <path d="M10 5v2.8a2 2 0 01-.35 1.12l-4.13 6.2A3 3 0 008 19.5h8a3 3 0 002.48-4.38l-4.13-6.2A2 2 0 0114 7.8V5" />
                          <circle cx="12" cy="15" r="0.8" strokeWidth={0.8} />
                          <circle cx="10" cy="12" r="0.6" strokeWidth={0.6} />
                          <circle cx="14" cy="16" r="0.6" strokeWidth={0.6} />
                          <line x1="7.2" y1="14" x2="16.8" y2="14" strokeWidth={0.8} strokeDasharray="1.5 1.5" />
                          <line x1="5.7" y1="16.5" x2="18.3" y2="16.5" strokeWidth={0.8} />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-gold flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(229,193,88,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="7" width="18" height="13" rx="1.5" />
                          <path d="M3 11h18M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                          <rect x="7" y="11" width="2" height="2" rx="0.5" />
                          <rect x="15" y="11" width="2" height="2" rx="0.5" />
                          <line x1="3" y1="7" x2="21" y2="20" strokeWidth={0.5} strokeDasharray="2 2" />
                        </svg>
                      )}
                      {i === 3 && (
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-gold flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(229,193,88,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3.6 9h16.8M3.6 15h16.8" />
                          <path d="M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
                          <line x1="12" y1="3" x2="12" y2="21" strokeWidth={1} />
                          <circle cx="14" cy="10.5" r="0.8" fill="currentColor" className="text-gold" />
                        </svg>
                      )}
                      
                      <div className="min-w-0 flex-1 flex flex-col items-center md:items-start">
                        <div className={`${locale !== "en" ? getFontClass(locale) + " font-bold" : "font-[family-name:var(--font-display)]"} text-base xs:text-lg sm:text-2xl text-white font-bold leading-none mb-1 group-hover:text-gold transition-colors duration-300`}>
                          {stat.num}
                        </div>
                        <div className={`text-[9px] xs:text-[10px] sm:text-[11px] leading-tight text-silver/60 group-hover:text-silver/85 transition-colors duration-300 ${locale !== "en" ? getFontClass(locale) + " font-medium" : "tracking-[0.06em] uppercase font-[family-name:var(--font-ui)]"}`}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Removed Scroll indicator as requested */}
    </section>
  );
}
