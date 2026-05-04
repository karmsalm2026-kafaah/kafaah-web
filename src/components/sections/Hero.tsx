"use client";

import Link from "next/link";
import { ArrowRight, FileText, Rocket, BarChart3 } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import type { HeroContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { hero as heroDict, isRtl, getFontClass } from "@/lib/i18n";

interface Props {
  content?: HeroContent;
}

export function HeroSection({ content }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const defaultLabels = heroDict.statsLabels[locale];
  /* Fallback to EPC defaults when no content is passed (direct navigation) */
  const eyebrow = content?.eyebrow?.[locale] ?? heroDict.eyebrow[locale];
  const headline = content?.headline?.[locale] ?? heroDict.headline[locale];
  const sub = content?.subCopy?.[locale] ?? heroDict.subCopy[locale];
  const primary = {
    label: content?.primaryCta?.label?.[locale] ?? heroDict.exploreServices[locale],
    href: content?.primaryCta?.href ?? "/services/owners-engineer/",
  };
  const secondary = {
    label: content?.secondaryCta?.label?.[locale] ?? heroDict.ourTrackRecord[locale],
    href: content?.secondaryCta?.href ?? "/experience/",
  };
  const stats = content?.stats?.map(s => ({ num: s.num, label: s.label[locale] })) ?? [
    { num: "20+", label: defaultLabels[0] },
    { num: "6", label: defaultLabels[1] },
    { num: "7", label: defaultLabels[2] },
    { num: "100%", label: defaultLabels[3] },
  ];

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative h-[100dvh] flex flex-col overflow-hidden bg-navy-deep">
      {/* Image Background with authoritative overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile: same image for all locales */}
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" />
          {/* Desktop: RTL-specific image for Arabic */}
          {rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-rtl.webp" />}
          <img
            src="/hero-bg.webp"
            alt="Engineering Team"
            className="w-full h-full object-fill object-right lg:object-center opacity-100 mix-blend-luminosity"
          />
        </picture>
        {/* Authoritative Gradient Overlays — flipped for RTL on desktop */}
        <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-r md:bg-gradient-to-l" : "bg-gradient-to-r"} from-navy-deep via-navy-deep/80 sm:via-navy-deep/80 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 sm:via-navy-deep/40 via-transparent to-navy-deep" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-6 sm:px-8 lg:px-16 pt-20 pb-4 sm:pt-24 sm:pb-6">

        {/* Eyebrow with gold line */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-3 md:mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${locale !== "en" ? getFontClass(locale) + " text-[11px] sm:text-[12px] font-semibold" : "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase"} text-gold`}>
              {eyebrow}
            </span>
          </div>
        </FadeIn>

        {/* Headline – 3 lines, typographic drama */}
        <FadeIn delay={0.12}>
          <h1 className={`${locale === "ar" ? getFontClass(locale) + " text-[clamp(40px,5vw,70px)] leading-[1.5] tracking-normal font-black"
            : locale === "zh" ? getFontClass(locale) + " text-[clamp(36px,6.5vw,90px)] leading-[1.15] tracking-normal font-bold"
              : "font-[family-name:var(--font-display)] text-[clamp(40px,7.5vw,110px)] leading-[0.95] tracking-[-0.02em]"
            } mb-3 sm:mb-5 ${locale === "ar" ? "max-w-full" : "max-w-[850px]"}`}
          >
            <span className="block text-white pb-1 pt-2 overflow-visible">{headline[0]}</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold pb-1 pt-2 overflow-visible">
              {headline[1]}
            </span>
            <span className="block text-muted pt-2 overflow-visible">{headline[2]}</span>
          </h1>
        </FadeIn>

        {/* Sub copy - Increased brightness for readability */}
        <FadeIn delay={0.24}>
          <p className={`${locale !== "en" ? getFontClass(locale) : ""} text-[14px] sm:text-lg md:text-[19px] text-silver/90 max-w-[520px] leading-[1.6] sm:leading-[1.85] mb-4 sm:mb-6 font-medium`}>
            {sub}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.36}>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
            <Link
              href={primary.href}
              className={`group relative inline-flex items-center justify-center gap-3 ${locale !== "en" ? getFontClass(locale) + " text-[13px] font-bold" : "font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] uppercase"} text-navy-deep w-full sm:w-[240px] py-3.5 sm:py-4 bg-gold hover:bg-gold-light transition-all duration-300 overflow-hidden`}
            >
              {/* Light sweep on hover */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <Rocket className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{primary.label}</span>
              <ArrowRight className={`w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300 ${rtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
            </Link>

            <Link
              href={secondary.href}
              className={`group inline-flex items-center justify-center gap-3 ${locale !== "en" ? getFontClass(locale) + " text-[13px] font-semibold" : "font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase"} text-silver/80 w-full sm:w-[240px] py-3.5 sm:py-4 border border-white/30 hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm bg-white/[0.02]`}
            >
              <BarChart3 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span>{secondary.label}</span>
              <FileText className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <FadeIn delay={0.48} y={0}>
        <div className="relative z-10 border-t border-white/[0.12] bg-navy-deep/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-2.5 sm:py-4 md:py-5 px-2 sm:px-4 md:px-8 group cursor-default border-white/[0.12] ${i === 1 || i === 3 ? "border-l" : ""
                    } ${i === 2 ? "max-md:border-l-0 md:border-l" : ""} ${i < 2 ? "border-b md:border-b-0" : ""
                    }`}
                >
                  <div className={`${locale !== "en" ? getFontClass(locale) + " font-bold" : "font-[family-name:var(--font-display)]"} text-xl md:text-[32px] text-white mb-1 md:mb-1.5 group-hover:text-gold transition-colors duration-300`}>
                    {stat.num}
                  </div>
                  <div className={`text-[10px] md:text-[11px] text-silver/50 ${locale !== "en" ? getFontClass(locale) + " font-medium" : "tracking-[0.1em] uppercase font-[family-name:var(--font-ui)]"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Removed Scroll indicator as requested */}
    </section>
  );
}
