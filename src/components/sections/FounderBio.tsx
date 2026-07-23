"use client";

import Image from "next/image";
import { useRole } from "@/lib/RoleContext";
import { founderBio as bioDict, getFontClass, isRtl } from "@/lib/i18n";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { Award, Layers, Globe, Zap } from "lucide-react";

const cardIcons = [Award, Layers, Globe, Zap];

export function FounderBioSection() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  const cards = bioDict.cards[locale] || [];

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-20 sm:py-28 bg-navy overflow-hidden border-b border-white/[0.05]">
      {/* Background elements */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── LEFT COLUMN: FOUNDER BIOGRAPHY (7 cols) ── */}
          <StaggerChildren className="lg:col-span-7 space-y-6 sm:space-y-8" staggerDelay={0.08}>
            {/* Eyebrow */}
            <RevealItem>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                  {bioDict.sectionLabel[locale]}
                </span>
                <div className="block sm:hidden w-10 h-px bg-gradient-to-l from-gold to-gold/0" />
              </div>
            </RevealItem>

            {/* Founder Profile Layout */}
            <RevealItem>
              <div className="flex flex-row gap-4 sm:gap-6 items-center sm:items-start">
                {/* Founder Photo */}
                <div className="relative w-20 h-20 sm:w-36 sm:h-36 shrink-0 border border-gold/30 p-1 rounded-sm bg-navy-card/60">
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src="/FOUNDER & MANAGING DIRECTOR.webp"
                      alt={bioDict.name[locale]}
                      fill
                      sizes="(max-width: 640px) 112px, 144px"
                      priority
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Founder Name & Role */}
                <div className="space-y-1 sm:space-y-1.5 self-center sm:self-start">
                  <h3 className={`${fc} text-[17px] xs:text-[19px] sm:text-[26px] font-bold text-white leading-tight`}>
                    {bioDict.name[locale]}
                  </h3>
                  <div className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em]" : fcBody + " text-[11px] sm:text-[13px]"} font-semibold text-gold uppercase leading-normal`}>
                    {bioDict.role[locale]}
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* Founder Quote */}
            <RevealItem>
              <blockquote className={`${fcBody} text-gold text-[13.5px] xs:text-[14.5px] sm:text-[16.5px] italic border-s-2 border-gold/40 ps-4 sm:ps-5 py-1 leading-[1.6] sm:leading-[1.7] font-light max-w-2xl`}>
                {bioDict.quote[locale]}
              </blockquote>
            </RevealItem>

            {/* Founder Description */}
            <RevealItem>
              <p className={`${fcBody} text-silver/80 text-[12.5px] sm:text-[15px] leading-[1.65] sm:leading-[1.75] text-start font-light max-w-2xl`}>
                {bioDict.desc[locale]}
              </p>
            </RevealItem>
          </StaggerChildren>

          {/* ── RIGHT COLUMN: CORE PILLARS GRID (5 cols) ── */}
          <StaggerChildren className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.08}>
            {cards.map((card, idx) => {
              const Icon = cardIcons[idx % cardIcons.length];
              return (
                <RevealItem key={idx} className="h-full">
                  <div className="group relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/60 p-4 sm:p-6 h-full transition-all duration-300 rounded-sm flex flex-row sm:flex-col gap-4 sm:gap-4 items-center sm:items-start">
                    {/* Visual bar */}
                    <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[2.5px] bg-gold/50 group-hover:bg-gold transition-colors duration-300`} />
                    
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center border border-gold/20 bg-gold/[0.04] text-gold shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-1 sm:space-y-1.5 flex-1">
                      <h4 className={`${fcBody} font-bold text-white text-[12px] sm:text-[14px] tracking-wide`}>
                        {card.title}
                      </h4>
                      <p className={`${fcBody} text-silver/70 text-[10.5px] sm:text-[12px] leading-relaxed font-light`}>
                        {card.sub}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </StaggerChildren>

        </div>
      </div>
    </section>
  );
}
