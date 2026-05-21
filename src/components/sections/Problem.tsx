"use client";

import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { TrendingDown, Clock, ShieldAlert, ShieldCheck, UserCheck, Briefcase } from "lucide-react";
import { useRole } from "@/lib/RoleContext";
import { problem as problemDict, getFontClass, isRtl } from "@/lib/i18n";

const challengeIcons = [TrendingDown, Clock, ShieldAlert];

export function ProblemSection() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  const chal = problemDict.challenge;
  const sol = problemDict.solution;

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-20 sm:py-28 bg-navy-deep overflow-hidden border-b border-white/[0.05]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerChildren 
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-6 lg:gap-y-8 items-stretch lg:grid-rows-[auto_auto_1fr_1fr_1fr_auto]"
          staggerDelay={0.08}
        >
          {/* ────────────────────────────────────────── */}
          {/* ── LEFT COLUMN: THE CHALLENGE (DOM first) ── */}
          {/* ────────────────────────────────────────── */}

          {/* 1. Challenge Label */}
          <RevealItem className="lg:col-start-1 lg:row-start-1 flex items-center gap-4">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {chal.sectionLabel[locale]}
            </span>
          </RevealItem>

          {/* 2. Challenge Headline & Paragraph */}
          <RevealItem className="lg:col-start-1 lg:row-start-2 flex flex-col justify-start">
            <h2 className={`${fc} text-[clamp(24px,3vw,34px)] ${locale === "ar" ? "leading-[1.4] font-bold" : "leading-[1.2] font-semibold"} text-white mb-4`}>
              {chal.headline[locale]}
            </h2>
            <p className={`${fcBody} text-silver/80 text-[14px] sm:text-[15px] leading-[1.7] text-justify font-light`}>
              {chal.paragraph[locale]}
            </p>
          </RevealItem>

          {/* 3. Challenge Card 1 */}
          <RevealItem className="lg:col-start-1 lg:row-start-3 flex">
            {(() => {
              const card = chal.cards[0];
              const Icon = challengeIcons[0];
              return (
                <div className="group relative bg-navy-card/20 border border-white/[0.06] p-5 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 rounded-sm flex-1 flex items-start gap-4 overflow-hidden">
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />
                  
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 mb-1.5 uppercase`}>
                      {card.title[locale]}
                    </h4>
                    <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12.5px] sm:text-[13px] leading-[1.6] font-light`}>
                      {card.desc[locale]}
                    </p>
                  </div>
                </div>
              );
            })()}
          </RevealItem>

          {/* 4. Challenge Card 2 */}
          <RevealItem className="lg:col-start-1 lg:row-start-4 flex">
            {(() => {
              const card = chal.cards[1];
              const Icon = challengeIcons[1];
              return (
                <div className="group relative bg-navy-card/20 border border-white/[0.06] p-5 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 rounded-sm flex-1 flex items-start gap-4 overflow-hidden">
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />
                  
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 mb-1.5 uppercase`}>
                      {card.title[locale]}
                    </h4>
                    <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12.5px] sm:text-[13px] leading-[1.6] font-light`}>
                      {card.desc[locale]}
                    </p>
                  </div>
                </div>
              );
            })()}
          </RevealItem>

          {/* 5. Challenge Card 3 */}
          <RevealItem className="lg:col-start-1 lg:row-start-5 flex">
            {(() => {
              const card = chal.cards[2];
              const Icon = challengeIcons[2];
              return (
                <div className="group relative bg-navy-card/20 border border-white/[0.06] p-5 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 rounded-sm flex-1 flex items-start gap-4 overflow-hidden">
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />
                  
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 mb-1.5 uppercase`}>
                      {card.title[locale]}
                    </h4>
                    <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12.5px] sm:text-[13px] leading-[1.6] font-light`}>
                      {card.desc[locale]}
                    </p>
                  </div>
                </div>
              );
            })()}
          </RevealItem>

          {/* 6. Challenge Quote */}
          <RevealItem className="lg:col-start-1 lg:row-start-6 flex items-center">
            <p className={`${fcBody} text-gold text-[13px] sm:text-[14px] italic border-s-2 border-gold/40 ps-4 py-1 leading-[1.6]`}>
              {chal.quote[locale]}
            </p>
          </RevealItem>


          {/* ─────────────────────────────────────────── */}
          {/* ── RIGHT COLUMN: THE SOLUTION (DOM second) ─ */}
          {/* ─────────────────────────────────────────── */}

          {/* 7. Solution Label */}
          <RevealItem className="lg:col-start-2 lg:row-start-1 flex items-center gap-4">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {sol.sectionLabel[locale]}
            </span>
          </RevealItem>

          {/* 8. Solution Headline & Paragraph */}
          <RevealItem className="lg:col-start-2 lg:row-start-2 flex flex-col justify-start">
            <h2 className={`${fc} text-[clamp(24px,3vw,34px)] ${locale === "ar" ? "leading-[1.4] font-bold" : "leading-[1.2] font-semibold"} text-white mb-4`}>
              {sol.headline[locale]}
            </h2>
            <p className={`${fcBody} text-silver/80 text-[14px] sm:text-[15px] leading-[1.7] text-justify font-light`}>
              {sol.paragraph[locale]}
            </p>
          </RevealItem>

          {/* 9. Solution Conflict Box (Decreased height: matches exactly Card 1 in Row 3) */}
          <RevealItem className="lg:col-start-2 lg:row-start-3 flex">
            <div className="group relative bg-gold/[0.03] border border-gold/15 p-5 rounded-sm flex-1 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 overflow-hidden flex flex-col justify-center">
              <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />
              
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.06] text-gold shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  {/* Title color is now Gold by default */}
                  <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-gold transition-colors duration-300 mb-1.5 uppercase`}>
                    {sol.conflictTitle[locale]}
                  </h4>
                  <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12.5px] sm:text-[13px] leading-[1.6] font-light`}>
                    {sol.conflictDesc[locale]}
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* 10. Solution Owners & EPC Cards (Decreased height: matches exactly Card 2 in Row 4) */}
          <RevealItem className="lg:col-start-2 lg:row-start-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Owners */}
            <div className="group relative bg-navy-card/20 border border-white/[0.06] p-5 rounded-sm flex-1 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />

              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0">
                    <UserCheck className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase`}>
                    {sol.owners.title[locale]}
                  </h5>
                </div>
                <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12px] sm:text-[12.5px] leading-[1.6] font-light`}>
                  {sol.owners.desc[locale]}
                </p>
              </div>
            </div>

            {/* EPC */}
            <div className="group relative bg-navy-card/20 border border-white/[0.06] p-5 rounded-sm flex-1 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />

              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0">
                    <Briefcase className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase`}>
                    {sol.epc.title[locale]}
                  </h5>
                </div>
                <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12px] sm:text-[12.5px] leading-[1.6] font-light`}>
                  {sol.epc.desc[locale]}
                </p>
              </div>
            </div>
          </RevealItem>

        </StaggerChildren>
      </div>
    </section>
  );
}
