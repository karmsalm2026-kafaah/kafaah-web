"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/Animations";
import type { ServicesContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { services as svcDict, getFontClass, isRtl } from "@/lib/i18n";

interface Props {
  content?: ServicesContent;
}

export function ServicesSection({ content }: Props) {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";
  const isAr = locale === "ar";
  const sectionLabel = content?.sectionLabel?.[locale] ?? svcDict.sectionLabel[locale];
  const headline = content?.headline?.[locale] ?? svcDict.headline[locale];
  const headlineAccent = content?.headlineAccent?.[locale] ?? svcDict.headlineAccent[locale];
  const bottomTagline = content?.bottomTagline?.[locale] ?? svcDict.bottomTagline[locale];

  /* Filter services by role-specific slugs, or show all if no content */
  const filteredServices = content?.visibleSlugs
    ? services.filter((s) => content.visibleSlugs.includes(s.slug))
    : services;

  return (
    <section id="services" dir={rtl ? "rtl" : "ltr"} className="relative py-28 sm:py-36 bg-navy overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 lg:mb-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                  {sectionLabel}
                </span>
              </div>
              <h2 className={`${fc} text-[clamp(32px,4.5vw,56px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.1]"} text-white`}>
                {headline}<em className="text-gold not-italic">{headlineAccent}</em>
              </h2>
            </div>
          </div>
        </FadeIn>

        {/* Service Cards Grid */}
        <FadeIn delay={0.1}>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${filteredServices.length > 2 ? "lg:grid-cols-3" : ""} gap-[1px] bg-white/[0.08]`}>
            {filteredServices.map((svc, index) => {
              const isLast = index === filteredServices.length - 1 && filteredServices.length === 7;
              
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}/`}
                  className={`group relative bg-navy-deep p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:bg-navy-card-hover ${
                    isLast ? "lg:col-span-3 md:col-span-2" : ""
                  }`}
                >
                  {/* Left custom border - shortened from edges, stable */}
                  <div className="absolute left-0 top-4 bottom-4 w-[4px] bg-gold rounded-r-sm transition-all duration-500" />
                  
                  {/* Top gold accent line - shortened from edges, appears on hover */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[4px] bg-gold rounded-b-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />

                  <div className={`flex flex-col ${isLast ? "lg:flex-row lg:items-center lg:justify-between gap-10" : ""}`}>
                    <div className={isLast ? "lg:max-w-[60%]" : ""}>
                      <span className={`${isEn ? "font-[family-name:var(--font-display)]" : fcBody + " font-bold"} text-[24px] font-medium tracking-widest text-gold/80 mb-6 block`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {svc.badge && (
                        <span className={`inline-flex items-center ${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-[0.15em] uppercase" : fcBody + " text-[11px]"} font-bold bg-gold/10 text-gold border border-gold/25 px-3 py-1 mb-5`}>
                          {svc.badge}
                        </span>
                      )}

                      <h3 className={`${isEn ? "font-[family-name:var(--font-display)] text-[22px]" : fcBody + " text-[20px] font-bold"} text-white leading-[1.25] mb-3 group-hover:text-gold transition-colors duration-300`}>
                        {svc.title}
                      </h3>

                      <p className={`${fcBody} ${isAr ? "text-[16px] leading-[1.9]" : "text-[14px] leading-[1.75]"} font-light text-silver/90 mb-8`}>
                        {svc.shortDesc}
                      </p>

                      <span className={`inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.12em] uppercase" : fcBody + " text-[13px]"} font-semibold text-silver/90 group-hover:text-gold transition-colors duration-300`}>
                        {svcDict.exploreService[locale]}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "translate-x-0 group-hover:-translate-x-1.5 rotate-180" : "translate-x-0 group-hover:translate-x-1.5"}`} />
                      </span>
                    </div>

                    {isLast && (
                      <div className="flex-1 lg:border-s lg:border-white/[0.08] lg:ps-12 py-4">
                        <div className="mb-6">
                          <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} text-gold/60 font-bold`}>
                            {locale === 'en' ? 'Expertise Across Technologies' : 'خبرة عبر التقنيات'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                          {/* Placeholder Logos/Names with professional styling */}
                          {['ThyssenKrupp', 'Sinopec', 'Casale', 'Stamicarbon', 'Toyo', 'Haldor Topsoe'].map((partner) => (
                            <div key={partner} className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                              <span className="text-[11px] font-bold text-white tracking-wider text-center">{partner}</span>
                              <div className="h-px w-6 bg-gold/30 mt-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </FadeIn>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-10 h-[2px] bg-gold" />
          <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-semibold text-gold/80`}>
            {bottomTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
