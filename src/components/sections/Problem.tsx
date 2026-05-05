"use client";

import { FadeIn } from "@/components/Animations";
import { TrendingDown, Clock, ShieldAlert } from "lucide-react";
import type { ProblemContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { problem as problemDict, getFontClass, isRtl } from "@/lib/i18n";

const defaultIcons = [TrendingDown, Clock, ShieldAlert];

interface Props {
  content?: ProblemContent;
}

export function ProblemSection({ content }: Props) {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isAr = locale === "ar";
  const isEn = locale === "en";
  const painLabels = problemDict.painLabels[locale];
  const sectionLabel = content?.sectionLabel?.[locale] ?? problemDict.sectionLabel[locale];
  const headline = content?.headline?.[locale] ?? problemDict.headline[locale];
  const headlineAccent = content?.headlineAccent?.[locale] ?? problemDict.headlineAccent[locale];
  const subHeadline = content?.subHeadline?.[locale] ?? problemDict.subHeadline[locale];
  const paragraphs = content?.paragraphs?.[locale] ?? [
    "A plant is only as reliable as the people who commissioned it. The commissioning phase is where years of engineering design get translated into real operations — and where most critical decisions are made under pressure, in real time.",
    "EPC companies manage projects. They do not manage operations. When a plant underperforms — low yield, quality deviation, unplanned downtime — the EPC has already left.",
    "Kafaah exists to bridge that gap. We bring 20 years of direct operational experience inside inorganic chemical and fertilizer plants — not consulting experience, operational experience.",
  ];
  const painPoints = content?.painPoints?.map((p, idx) => ({ 
    stat: p.stat, 
    label: p.label[locale], 
    desc: p.desc[locale] 
  })) ?? [
    { stat: "40%", label: painLabels[0], desc: "Average performance gap in first-year operations without specialist commissioning." },
    { stat: "6–18 mo", label: painLabels[1], desc: "Typical time lost when commissioning teams lack plant-specific operational depth." },
    { stat: "3×", label: painLabels[2], desc: "More frequent in plants commissioned by EPC generalists vs. process specialists." },
  ];
  const tagline = content?.tagline?.[locale] ?? problemDict.tagline[locale];

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-28 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {sectionLabel}
            </span>
          </div>
        </FadeIn>

        {/* Main Statement */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-start mb-20">
            <div>
              <h2 className={`${fc} text-[clamp(26px,3.5vw,42px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.2]"} text-white mb-6`}>
                {headline}
                <span className="text-gold not-italic">{headlineAccent}</span>
                {subHeadline}
              </h2>
            </div>

            <div className="space-y-5">
              {paragraphs.map((p, i) => {
                const has20Years = locale === 'en' && p.includes("20 years of direct operational experience");
                return (
                  <p key={i} className={`${fcBody} text-silver/80 ${isAr ? "text-[17px] leading-[2] font-normal" : "font-light text-[16px] leading-[1.85]"} ${rtl ? "text-right" : ""}`}>
                    {has20Years ? (
                      <>{p.split("20 years")[0]}<strong className="text-white font-medium">20 years of direct operational experience</strong>{p.split("20 years of direct operational experience")[1] ?? ""}</>
                    ) : (
                      p
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Pain Point Cards */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((point, i) => {
              const IconComp = defaultIcons[i % defaultIcons.length];
              return (
                <div
                  key={i}
                  className="group relative bg-navy-card/60 border border-white/[0.06] p-8 transition-all duration-500 hover:border-gold/30 hover:bg-navy-card-hover/80"
                >
                  {/* Top gold accent line */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 bg-gold/[0.06] group-hover:bg-gold/[0.12] transition-colors duration-300">
                      <IconComp className="w-5 h-5 text-gold" />
                    </div>
                    <span className={`${isEn ? "font-[family-name:var(--font-display)]" : fcBody + " font-bold"} text-[32px] leading-none text-white`}>
                      {point.stat}
                    </span>
                  </div>

                  <h3 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.2em] uppercase" : fcBody + " text-[14px]"} font-bold text-gold mb-3`}>
                    {point.label}
                  </h3>

                  <p className={`${fcBody} text-silver/60 ${isAr ? "text-[15px] leading-[1.9]" : "text-[14px] leading-[1.7]"} font-light`}>
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Bottom Tagline */}
        <FadeIn delay={0.35}>
          <div className="mt-16 flex items-center gap-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-semibold text-gold/80`}>
              {tagline}
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
