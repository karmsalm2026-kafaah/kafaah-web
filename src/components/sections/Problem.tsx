"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { TrendingDown, Clock, ShieldAlert } from "lucide-react";
import type { ProblemContent } from "@/data/roleContent";
import { defaultContent } from "@/data/roleContent";
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
  const contentToUse = content ?? defaultContent.problem;
  const sectionLabel = contentToUse.sectionLabel[locale] ?? problemDict.sectionLabel[locale];
  const headline = contentToUse.headline[locale] ?? problemDict.headline[locale];
  const headlineAccent = contentToUse.headlineAccent[locale] ?? problemDict.headlineAccent[locale];
  const subHeadline = contentToUse.subHeadline[locale] ?? problemDict.subHeadline[locale];
  const paragraphs = contentToUse.paragraphs[locale];
  const painPoints = contentToUse.painPoints.map((p) => ({
    stat: p.stat,
    label: p.label[locale],
    desc: p.desc[locale]
  }));
  const tagline = contentToUse.tagline[locale] ?? problemDict.tagline[locale];

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
        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-start mb-20" staggerDelay={0.15}>
          <div>
            <RevealItem>
              <h2 className={`${fc} text-[clamp(26px,3.5vw,42px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.2]"} text-white mb-8`}>
                {headline}
                <span className="text-gold not-italic">{headlineAccent}</span>
                {subHeadline}
              </h2>
            </RevealItem>
            
            <RevealItem>
              <div className="group relative mt-10 mx-auto lg:mx-0 w-full max-w-[420px] aspect-square">
                {/* Side custom border */}
                <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[4px] bg-gold transition-all duration-500 z-20`} />
                
                {/* Top gold accent line */}
                <div className="absolute top-0 left-6 right-6 h-[4px] bg-gold rounded-b-sm opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                
                <div className="absolute inset-0">
                  <Image 
                    src="/logo-compelet.webp" 
                    alt="Kafaah Logo" 
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-fill opacity-95 transition-opacity group-hover:opacity-100 drop-shadow-[0_0_20px_rgba(212,175,55,0.15)] rounded-sm"
                  />
                </div>
              </div>
            </RevealItem>
          </div>

          <div className="space-y-10">
            {/* Owner Block */}
            <RevealItem className="space-y-5">
              {paragraphs.slice(0, 3).map((p, i) => (
                <p key={`owner-${i}`} className={`${fcBody} text-white/85 text-justify ${isAr ? "text-[14px] sm:text-[15px] leading-[1.9] font-normal" : "font-light text-[14px] sm:text-[15px] leading-[1.75]"} ${rtl ? "text-justify" : ""}`}>
                  {i === 0 && (
                    <span className={`text-gold font-bold ${rtl ? 'ml-2' : 'mr-2'} tracking-wide uppercase`}>
                      {locale === 'en' ? 'OWNERS —' : locale === 'ar' ? 'للمُلاك والمستثمرين —' : '对于业主 —'}
                    </span>
                  )}
                  {p}
                </p>
              ))}
            </RevealItem>

            {/* Decorative Separator */}
            <RevealItem>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </RevealItem>

            {/* EPC Block */}
            <RevealItem className="space-y-5">
              {paragraphs.slice(3, 6).map((p, i) => (
                <p key={`epc-${i}`} className={`${fcBody} text-white/85 text-justify ${isAr ? "text-[14px] sm:text-[15px] leading-[1.9] font-normal" : "font-light text-[14px] sm:text-[15px] leading-[1.75]"} ${rtl ? "text-justify" : ""}`}>
                  {i === 0 && (
                    <span className={`text-gold font-bold ${rtl ? 'ml-2' : 'mr-2'} tracking-wide uppercase`}>
                      {locale === 'en' ? 'EPC CONTRACTORS —' : locale === 'ar' ? 'لمقاولي EPC —' : '对于EPC承包商 —'}
                    </span>
                  )}
                  {p}
                </p>
              ))}
            </RevealItem>
          </div>
        </StaggerChildren>

        {/* Pain Point Cards */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {painPoints.map((point, i) => {
            const IconComp = defaultIcons[i % defaultIcons.length];
            return (
              <RevealItem key={i}>
                <div
                  className="group relative bg-navy-card/60 border border-white/[0.10] p-8 transition-all duration-500 hover:border-gold/30 hover:bg-navy-card-hover/80 h-full"
                >
                  {/* Side custom border - shortened from edges */}
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[4px] bg-gold`} />

                  {/* Top gold accent line - shortened from edges, appears on hover */}
                  <div className="absolute top-0 left-4 right-4 h-[4px] bg-gold rounded-b-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

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

                  <p className={`${fcBody} text-silver/75 ${isAr ? "text-[15px] leading-[1.9]" : "text-[14px] leading-[1.7]"} font-light`}>
                    {point.desc}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </StaggerChildren>

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
