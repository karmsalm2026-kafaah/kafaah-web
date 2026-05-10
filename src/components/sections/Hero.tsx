"use client";

import Link from "next/link";
import { ArrowRight, FileText, Rocket, BarChart3 } from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
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
    href: content?.primaryCta?.href ?? "#services",
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
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile-828.webp" />
          {/* Desktop: Specific image for LTR languages (English, Chinese) */}
          {!rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-extended.webp" />}
          {/* Desktop: RTL-specific image for Arabic */}
          {rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-rtl-1920.webp" />}
          <img
            src="/hero-bg-extended.webp"
            alt="Engineering Team"
            className="w-full h-full object-fill object-right lg:object-center opacity-100 mix-blend-luminosity"
          />
        </picture>
        {/* Lighter Gradient Overlays for better image visibility */}
        <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-t md:bg-gradient-to-l" : "max-md:bg-gradient-to-t md:bg-gradient-to-r"} from-navy-deep/80 md:from-navy-deep/90 via-navy-deep/60 md:via-navy-deep/70 sm:via-navy-deep/50 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 sm:via-transparent via-transparent to-navy-deep/60" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4 sm:pt-24 sm:pb-6">
        <StaggerChildren className="relative max-w-[1000px]">
          {/* Eyebrow with gold line */}
          <RevealItem>
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
              <span className={`${locale !== "en" ? getFontClass(locale) + " text-[clamp(0.75rem,1vw,0.875rem)] font-semibold" : "font-[family-name:var(--font-ui)] text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold tracking-[0.3em] uppercase"} text-gold`}>
                {eyebrow}
              </span>
            </div>
          </RevealItem>

          {/* Headline – 2 lines, typographic drama */}
          <RevealItem>
            <h1 className={`${locale === "ar" ? getFontClass(locale) + " text-[clamp(2rem,3.8vw,3.75rem)] leading-[1.3] tracking-normal font-black"
              : locale === "zh" ? getFontClass(locale) + " text-[clamp(1.75rem,3.2vw,3.75rem)] leading-[1.15] tracking-normal font-bold"
                : "font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              } mb-5 sm:mb-8`}
            >
              <div className="flex flex-wrap gap-[0.3em] items-baseline pb-1 pt-2">
                <span className="text-white overflow-visible">{headline[0]}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold overflow-visible">
                  {headline[1]}
                </span>
              </div>
              <span className="block text-muted pt-2 overflow-visible">{headline[2]}</span>
            </h1>
          </RevealItem>

          {/* Sub copy - Increased brightness for readability */}
          <RevealItem>
            <p className={`${locale !== "en" ? getFontClass(locale) : ""} text-[clamp(0.85rem,1vw,1rem)] text-silver max-w-[min(590px,79vw)] leading-[1.6] sm:leading-[1.8] mb-8 sm:mb-10 font-medium text-justify`}>
              {sub}
            </p>
          </RevealItem>

          {/* CTAs */}
          <RevealItem>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4">
              <Link
                href={primary.href}
                className={`group btn-premium-gold ${locale !== "en" ? getFontClass(locale) + " text-[clamp(0.8125rem,1vw,0.875rem)] font-bold" : "font-[family-name:var(--font-ui)] text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold tracking-[0.2em] uppercase"} w-full sm:w-auto min-w-[240px]`}
              >
                {/* Premium animated light sweep */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <Rocket className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="relative z-10">{primary.label}</span>
                <ArrowRight className={`w-4 h-4 relative z-10 transition-transform duration-500 ${rtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
              </Link>

              <Link
                href={secondary.href}
                className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? getFontClass(locale) + " text-[clamp(0.8125rem,1vw,0.875rem)] font-semibold" : "font-[family-name:var(--font-ui)] text-[clamp(0.7rem,0.9vw,0.8rem)] font-semibold tracking-[0.15em] uppercase"} w-full sm:w-auto min-w-[240px]`}
              >
                {/* Premium animated border */}
                <div className="animated-border-box rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <BarChart3 className="w-4 h-4 relative z-10 opacity-50 group-hover:opacity-100 group-hover:text-gold transition-all duration-500 group-hover:scale-110" />
                <span className="relative z-10">{secondary.label}</span>
                <FileText className="w-4 h-4 relative z-10 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
              </Link>
            </div>
          </RevealItem>
        </StaggerChildren>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <FadeIn delay={0.48} y={0}>
        <div className="relative z-10 border-t border-white/[0.16] bg-navy-deep/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-8 group cursor-default border-white/[0.12] ${i === 1 || i === 3 ? "border-s" : ""
                    } ${i === 2 ? "max-md:border-s-0 md:border-s" : ""} ${i < 2 ? "border-b md:border-b-0" : ""
                    }`}
                >
                  <div className={`${locale !== "en" ? getFontClass(locale) + " font-bold" : "font-[family-name:var(--font-display)]"} text-[clamp(1.5rem,2.5vw,2.5rem)] text-white mb-1 md:mb-1.5 group-hover:text-gold transition-colors duration-300`}>
                    {stat.num}
                  </div>
                  <div className={`text-[clamp(0.625rem,0.8vw,0.75rem)] text-silver/70 ${locale !== "en" ? getFontClass(locale) + " font-medium" : "tracking-[0.1em] uppercase font-[family-name:var(--font-ui)]"}`}>
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
