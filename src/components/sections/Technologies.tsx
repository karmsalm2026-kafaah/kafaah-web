"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { technologies } from "@/data/technologies";
import { FadeIn } from "@/components/Animations";
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
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-28 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {techDict.sectionLabel[locale]}
            </span>
          </div>
          <h2 className={`${fc} text-[clamp(32px,4.5vw,56px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.1]"} text-white mb-16 lg:mb-20`}>
            {techDict.headline[locale]}<em className="text-gold not-italic">{techDict.headlineAccent[locale]}</em>
          </h2>
        </FadeIn>

        {/* Tech Grid */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/[0.04]">
            {technologies.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technologies/${tech.slug}/`}
                className="group relative bg-navy p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:bg-navy-card-hover border-e border-b border-white/[0.04] last:border-e-0 md:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500 z-10" />

                {/* Visible Formula */}
                <div className="font-[family-name:var(--font-display)] text-[48px] leading-none text-white/50 mb-4 transition-colors duration-500 group-hover:text-gold/90">
                  {tech.formula}
                </div>

                <h3 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[13px] tracking-[0.1em] uppercase" : fcBody + " text-[15px]"} font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300`}>
                  {tech.name}
                </h3>

                <p className={`${fcBody} ${isAr ? "text-[15px] leading-[1.9]" : "text-[13px] leading-[1.7]"} font-light text-silver/50 mb-6`}>
                  {tech.shortDesc}
                </p>

                <span className={`inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.15em] uppercase" : fcBody + " text-[12px]"} font-semibold text-silver/35 group-hover:text-gold transition-colors duration-300`}>
                  {tech.completedProject ? (
                    <>
                      {techDict.completedProject[locale]}
                      <ArrowRight className={`w-3 h-3 translate-x-0 ${rtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"} transition-transform duration-300`} />
                    </>
                  ) : (
                    <>
                      {techDict.viewTech[locale]}
                      <ArrowRight className={`w-3 h-3 translate-x-0 ${rtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"} transition-transform duration-300`} />
                    </>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
