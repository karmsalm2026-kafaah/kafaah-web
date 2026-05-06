"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";
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
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-28 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: Projects */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                  {trDict.sectionLabel[locale]}
                </span>
              </div>
              <h2 className={`${fc} text-[clamp(28px,3.5vw,44px)] ${isAr ? "leading-[1.7] font-bold" : "leading-[1.1]"} text-white mb-10`}>
                {trDict.headline[locale]}<em className="text-gold not-italic">{trDict.headlineAccent[locale]}</em>
              </h2>

              <div className="flex flex-col gap-[1px] bg-white/[0.08]">
                {/* Project 1 */}
                <div className="group relative bg-navy p-8 transition-all duration-500 hover:bg-navy-card-hover">
                  <div className={`absolute ${rtl ? "right-0" : "left-0"} top-0 bottom-0 w-[2px] bg-navy-soft group-hover:bg-gold transition-colors duration-500`} />
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/85 mb-3 block`}>
                    Commissioning &amp; Startup · Nov 2025 – Jan 2026
                  </span>
                  <div className={`${isEn ? "font-[family-name:var(--font-display)] text-[22px]" : fcBody + " text-[20px] font-bold"} text-white leading-[1.2] mb-2 group-hover:text-gold transition-colors duration-300`}>
                    Suez SOP Plant
                  </div>
                  <div className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.1em]" : fcBody + " text-[13px]"} font-semibold text-gold`}>
                    K₂SO₄ · Mannheim Process · Chinese EPC
                  </div>
                  <div className={`flex gap-6 mt-5 ${fcBody} ${isAr ? "text-[13px]" : "text-[12px] uppercase tracking-[0.05em]"} font-light text-silver/90`}>
                    <span className="flex items-center gap-1.5">📍 Suez, Egypt</span>
                    <span className="flex items-center gap-1.5">⚙ 40,000 T/yr</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="group relative bg-navy p-8 transition-all duration-500 hover:bg-navy-card-hover">
                  <div className={`absolute ${rtl ? "right-0" : "left-0"} top-0 bottom-0 w-[2px] bg-navy-soft group-hover:bg-gold transition-colors duration-500`} />
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/70 mb-3 block`}>
                    Granulation &amp; Startup · March 2026
                  </span>
                  <div className={`${isEn ? "font-[family-name:var(--font-display)] text-[22px]" : fcBody + " text-[20px] font-bold"} text-white leading-[1.2] mb-2 group-hover:text-gold transition-colors duration-300`}>
                    Yanbu Granulation Facility
                  </div>
                  <div className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.1em]" : fcBody + " text-[13px]"} font-semibold text-gold`}>
                    NPK · Granulation · Saudi Arabia
                  </div>
                  <div className={`flex gap-6 mt-5 ${fcBody} ${isAr ? "text-[13px]" : "text-[12px] uppercase tracking-[0.05em]"} font-light text-silver/90`}>
                    <span className="flex items-center gap-1.5">📍 Yanbu, KSA</span>
                  </div>
                </div>
              </div>

              <Link
                href="/experience/"
                className={`group inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-semibold text-gold/80 hover:text-gold transition-colors mt-8`}
              >
                {trDict.fullTrackRecord[locale]}
                <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"} transition-transform duration-300`} />
              </Link>
            </div>
          </FadeIn>

          {/* Right: Statement + Disciplines */}
          <FadeIn delay={0.15}>
            <div className="pt-0 lg:pt-8">
              <p className={`${fc} text-[clamp(20px,2.5vw,30px)] text-white/90 leading-[1.4] mb-8 ${isAr ? "font-bold" : "italic"}`}>
                {trDict.quote[locale]}
              </p>
              <p className={`${fcBody} ${isAr ? "text-[17px] leading-[2]" : "text-[15px] leading-[1.8]"} font-light text-silver/90 mb-10`}>
                Our work spans Egypt, the Gulf, and MENA — serving EPC
                companies, plant investors, and operating facilities across the
                full life of an inorganic chemical plant.
              </p>

              <div className="flex flex-col border border-white/[0.10]">
                {trDict.disciplines[locale].map((d) => (
                  <div
                    key={d.label}
                    className={`px-6 py-5 border-b border-white/[0.10] last:border-b-0 flex items-center gap-4 ${fcBody} ${isAr ? "text-[15px]" : "text-[14px]"} text-silver hover:bg-white/[0.04] transition-colors`}
                  >
                    <div className="w-1.5 h-1.5 bg-gold shrink-0" />
                    <strong className="font-medium text-white min-w-[100px]">
                      {d.label}
                    </strong>
                    {d.desc}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
