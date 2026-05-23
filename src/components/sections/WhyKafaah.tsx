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
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {sectionLabel}
            </span>
          </div>
        </FadeIn>

        {/* Section Headline */}
        <FadeIn delay={0.1}>
          <h2 className={`${fc} text-[clamp(24px,3vw,36px)] ${locale === "ar" ? "leading-[1.5] font-bold" : "leading-[1.25] font-semibold"} text-white mb-12 max-w-[800px] whitespace-pre-line`}>
            {headline}
          </h2>
        </FadeIn>

        {/* 4 Reasons Grid */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {reasons.map((reason, i) => (
            <RevealItem key={i}>
              <div className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] h-full flex flex-col justify-between rounded-sm overflow-hidden">
                {/* Index Indicator */}
                <span className={`absolute top-4 ${rtl ? 'left-5' : 'right-5'} text-[36px] font-bold text-white/[0.06] group-hover:text-gold/[0.12] transition-all duration-500 select-none`}>
                  0{i + 1}
                </span>

                {/* Animated Vertical Accent bar */}
                <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/30 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />
                
                <div className="relative z-10">
                  <h3 className={`${fcBody} font-bold text-white group-hover:text-gold transition-colors duration-300 text-[15px] sm:text-[16px] mb-3`}>
                    {reason.title}
                  </h3>
                  <p className={`${fcBody} text-silver/70 group-hover:text-silver/90 transition-colors duration-300 ${locale === "ar" ? "text-[14px] leading-[1.8]" : "text-[13px] leading-[1.6]"} font-light`}>
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
