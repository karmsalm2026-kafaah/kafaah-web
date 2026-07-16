"use client";

import { useRole } from "@/lib/RoleContext";
import { whyKafaah as whyDict, getFontClass, isRtl } from "@/lib/i18n";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";

export function WhyKafaahSection() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  const sectionLabel = whyDict.eyebrow[locale];
  const headline = whyDict.headline[locale];
  const reasons = whyDict.cards[locale] || [];

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-20 sm:py-28 bg-navy-deep overflow-hidden border-b border-white/[0.05]">
      {/* Subtle background noise/grid */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      
      {/* Volumetric Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/[0.025] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative container mx-auto px-3 sm:px-6 lg:px-8">
        {/* Eyebrow / Tag - aligned with Hero design */}
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-5 justify-start">
            {/* Glowing Golden Pulse Circular Dot with Fixed Border */}
            <div className="flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 rounded-full border border-gold/35 relative">
              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-gold/50 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-gold shadow-[0_0_8px_#d97706]"></span>
            </div>
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold leading-none`}>
              {sectionLabel}
            </span>
          </div>
        </FadeIn>

        {/* Section Headline – Single line on desktop/tablet */}
        <FadeIn delay={0.1}>
          <h2 className={`${fc} text-[clamp(22px,2.8vw,34px)] ${locale === "ar" ? "leading-[1.4] font-bold" : "leading-[1.2] font-semibold"} text-white mb-12 w-full md:whitespace-nowrap overflow-visible pb-1`}>
            {headline}
          </h2>
        </FadeIn>

        {/* 4 Reasons Grid - Premium Glassmorphic Cards */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {reasons.map((reason, i) => (
            <RevealItem key={i}>
              <div className="group relative bg-white/[0.01] backdrop-blur-xl border border-white/[0.06] p-4 xs:p-5 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold/25 hover:bg-white/[0.03] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between rounded-sm overflow-hidden">
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Index Indicator */}
                <span className={`absolute top-4 ${rtl ? 'left-5' : 'right-5'} text-[36px] font-bold text-white/[0.04] group-hover:text-gold/[0.1] transition-all duration-500 select-none`}>
                  0{i + 1}
                </span>

                {/* Animated Vertical Accent bar */}
                <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/20 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />
                
                <div className="relative z-10">
                  <h3 className={`${fcBody} font-bold text-white group-hover:text-gold transition-colors duration-300 text-[15px] sm:text-[16px] mb-3`}>
                    {reason.title}
                  </h3>
                  <p className={`${fcBody} text-silver/65 group-hover:text-silver/85 transition-colors duration-300 ${locale === "ar" ? "text-[14px] leading-[1.8]" : "text-[13px] leading-[1.6]"} font-light`}>
                    {reason.desc}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
