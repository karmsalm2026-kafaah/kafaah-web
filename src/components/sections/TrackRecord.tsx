"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { trackRecord as trDict, getFontClass, isRtl } from "@/lib/i18n";

export function TrackRecordSection() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";
  const isAr = locale === "ar";

  return (
    <section id="experience" dir={rtl ? "rtl" : "ltr"} className="relative py-14 xs:py-20 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-3 sm:px-6 lg:px-8">
        {/* Title & Section Description */}
        <div className="max-w-4xl mb-12">
          <StaggerChildren>
            <RevealItem>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                  {trDict.sectionLabel[locale]}
                </span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className={`${fc} text-[clamp(22px,4.5vw,56px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.1]"} text-white mb-6`}>
                {trDict.headline[locale]}<span className="text-gold">{trDict.headlineAccent[locale]}</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className={`${fcBody} ${isAr ? "text-[16px] leading-[1.8]" : "text-[14px] leading-[1.8]"} font-light text-silver/80 pb-6 border-b border-white/[0.08] max-w-3xl`}>
                {trDict.description[locale]}
              </p>
            </RevealItem>
          </StaggerChildren>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Projects */}
          <StaggerChildren className="flex flex-col gap-4 sm:gap-6" staggerDelay={0.1}>
            {(trDict.projects?.[locale] || []).map((proj, index) => (
              <RevealItem key={index}>
                <Link
                  href="/experience/"
                  className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-3.5 xs:p-5 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] rounded-sm overflow-hidden block"
                >
                  {/* Animated Vertical Accent bar */}
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/30 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />
                  
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/85 mb-3 block`}>
                    {proj.phase}
                  </span>
                  
                  <div className={`${isEn ? "font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[22px]" : fcBody + " text-[16px] xs:text-[18px] sm:text-[20px] font-bold"} text-white leading-[1.2] mb-3 group-hover:text-gold transition-colors duration-300`}>
                    {proj.title}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4 z-10 relative">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded-[3px] bg-white/[0.05] text-gold tracking-wide font-medium inline-block border border-gold/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className={`${fcBody} ${isAr ? "text-[12.5px] xs:text-[14px] leading-[1.7]" : "text-[11.5px] xs:text-[12px] leading-[1.6]"} font-light text-silver/70 mb-4`}>
                    {proj.desc}
                  </p>

                  <div className={`flex gap-6 mt-4 ${fcBody} ${isAr ? "text-[13px]" : "text-[11px] uppercase tracking-[0.05em]"} font-light text-silver/90`}>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <circle cx="12" cy="11" r="3" strokeWidth="1.8" />
                      </svg>
                      {proj.location}
                    </span>
                    {proj.capacity && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gold/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
                        </svg>
                        {proj.capacity}
                      </span>
                    )}
                  </div>
                </Link>
              </RevealItem>
            ))}

            <RevealItem>
              <Link
                href="/experience/"
                className={`group inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-semibold text-gold/80 hover:text-gold transition-colors mt-2`}
              >
                {trDict.fullTrackRecord[locale]}
                <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"} transition-transform duration-300`} />
              </Link>
            </RevealItem>
          </StaggerChildren>

          {/* Right: Statement + Disciplines */}
          <StaggerChildren className="space-y-6 lg:mt-0" staggerDelay={0.15}>
            <RevealItem>
              <div className={`relative p-5 xs:p-6 bg-navy-card/50 backdrop-blur-md border border-white/[0.12] hover:border-gold/30 transition-all duration-300 rounded-sm ${rtl ? "border-r-3 border-r-gold" : "border-l-3 border-l-gold"}`}>
                <p className={`${fcBody} text-white/95 ${isAr ? "text-[15px] leading-[1.8]" : "text-[14px] leading-[1.8] italic"} font-light`}>
                  {trDict.quote[locale]}
                </p>
              </div>
            </RevealItem>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4" staggerDelay={0.08}>
              {trDict.disciplines[locale].map((d, index) => (
                <RevealItem key={index}>
                  <div
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 p-5 rounded-sm transition-all duration-300 flex flex-col gap-2 h-full"
                  >
                    {/* Accent line */}
                    <div className={`absolute top-4 bottom-4 ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} w-[2px] bg-gold/20 group-hover:bg-gold transition-colors duration-300`} />
                    
                    <p className={`${fcBody} text-[11px] tracking-[0.1em] uppercase font-bold text-gold`}>
                      {d.label}
                    </p>
                    <p className={`${fcBody} text-silver/70 text-[11px] leading-[1.5] font-light`}>
                      {d.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </StaggerChildren>

            <RevealItem>
              <div className="pt-6 border-t border-white/[0.06] flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-gold shrink-0 mt-2 rounded-full" />
                <p className={`${fcBody} text-silver/80 text-[13px] sm:text-[14px] leading-relaxed font-light`}>
                  {trDict.closingLine[locale].split(" — ").map((part, index) => {
                    if (index === 1) {
                      return (
                        <span key={index} className="text-gold font-medium">
                          {part}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              </div>
            </RevealItem>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
