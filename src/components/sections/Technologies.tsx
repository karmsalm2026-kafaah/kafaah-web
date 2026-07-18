"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { technologies } from "@/data/technologies";
import { FadeIn, StaggerChildren, RevealItem, HoverWords } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { tech as techDict, getFontClass, isRtl } from "@/lib/i18n";

export function TechnologiesSection() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";
  const isAr = locale === "ar";
  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-14 xs:py-20 sm:py-28 bg-navy-deep overflow-hidden border-b border-white/[0.05]">
      {/* Background */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16 lg:mb-20">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                {techDict.sectionLabel[locale]}
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className={`${fc} text-[clamp(20px,2.8vw,42px)] ${isAr ? "leading-[1.4] font-bold" : "leading-[1.1]"} text-white md:whitespace-nowrap overflow-visible`}>
              {locale === "en" && (
                <>
                  <HoverWords text="Industrial Processes We've" locale={locale} />{" "}
                  <span className="text-gold font-normal font-[family-name:var(--font-display)] italic md:inline-block overflow-visible">
                    <HoverWords text="Operated, Commissioned & Optimized" locale={locale} isGradient={true} />
                  </span>
                </>
              )}
              {locale === "ar" && (
                <>
                  <HoverWords text="العمليات الصناعية التي قمنا بـ" locale={locale} />{" "}
                  <span className="text-gold font-bold md:inline-block overflow-visible">
                    <HoverWords text="تشغيلها وتدشينها وتحسينها" locale={locale} isGradient={true} />
                  </span>
                </>
              )}
              {locale === "zh" && (
                <>
                  <HoverWords text="我们" locale={locale} />{" "}
                  <span className="text-gold font-bold md:inline-block overflow-visible">
                    <HoverWords text="运营、调试与优化的" locale={locale} isGradient={true} />
                  </span>{" "}
                  <HoverWords text="工业流程" locale={locale} />
                </>
              )}
            </h2>
          </FadeIn>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 auto-rows-fr">
          {technologies.map((tech, i) => {
            const localizedName = techDict.list[tech.slug]?.name[locale] || tech.name;
            const localizedDesc = techDict.list[tech.slug]?.desc[locale] || tech.shortDesc;
            return (
              <FadeIn key={tech.slug} delay={i * 0.08} y={20} duration={0.6}>
                <Link
                  href={`/technologies/${tech.slug}/`}
                  className="group relative bg-gradient-to-b from-[#1b2b3d]/60 to-[#121f2d]/60 backdrop-blur-md border border-white/[0.06] p-3.5 xs:p-5 sm:p-7 lg:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(240,160,32,0.12)] h-full flex flex-col justify-between rounded-sm overflow-hidden block shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Index Indicator */}
                  <span className={`absolute top-4 ${rtl ? 'left-5' : 'right-5'} text-[44px] font-extrabold text-white/[0.06] group-hover:text-gold/[0.18] transition-all duration-500 select-none font-[family-name:var(--font-display)]`}>
                    0{i + 1}
                  </span>

                  {/* Animated Vertical Accent bar */}
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/20 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />
                  
                  {/* Content wrapper */}
                  <div className="relative z-10">
                    {/* Visible Formula */}
                    <div className="font-[family-name:var(--font-display)] text-[26px] xs:text-[32px] sm:text-[38px] lg:text-[44px] leading-none text-white/60 mb-5 transition-all duration-500 group-hover:text-gold/95 group-hover:scale-[1.03] origin-left rtl:origin-right">
                      {tech.formula}
                    </div>

                    <h3 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[13px] xs:text-[14px] tracking-wider uppercase" : fcBody + " text-[14.5px] xs:text-[15.5px] sm:text-[16px]"} font-bold text-white mb-2.5 group-hover:text-gold transition-colors duration-300`}>
                      {localizedName}
                    </h3>

                    <p className={`${fcBody} ${isAr ? "text-[12px] xs:text-[13px] sm:text-[15px] leading-[1.7]" : "text-[11.5px] xs:text-[12px] sm:text-[13px] leading-[1.6]"} font-light text-silver/70 group-hover:text-silver/90 transition-colors duration-500 mb-6`}>
                      {localizedDesc}
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.15em] uppercase" : fcBody + " text-[12.5px]"} font-semibold text-silver/55 group-hover:text-gold transition-colors duration-500 relative z-10 mt-auto`}>
                    {tech.completedProject ? (
                      <>
                        {techDict.completedProject[locale]}
                        <ArrowRight className={`w-3.5 h-3.5 translate-x-0 ${rtl ? "group-hover:-translate-x-1.5 rotate-180" : "group-hover:translate-x-1.5"} transition-transform duration-300`} />
                      </>
                    ) : (
                      <>
                        {techDict.viewTech[locale]}
                        <ArrowRight className={`w-3.5 h-3.5 translate-x-0 ${rtl ? "group-hover:-translate-x-1.5 rotate-180" : "group-hover:translate-x-1.5"} transition-transform duration-300`} />
                      </>
                    )}
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Closing Tagline */}
        <FadeIn delay={0.1} y={15}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.06] flex items-start gap-4">
            <div className="w-1.5 h-1.5 bg-gold shrink-0 mt-2 rounded-full" />
            <p className={`${fcBody} text-silver/80 text-[13px] sm:text-[14px] leading-relaxed max-w-3xl font-light`}>
              {techDict.closingLine[locale].split(" — ").map((part, index) => {
                if (index === 1) {
                  return (
                    <span key={index} className="text-gold font-medium">
                      — {part}
                    </span>
                  );
                }
                return part;
              })}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
