"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
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
        <StaggerChildren className={`grid grid-cols-1 md:grid-cols-2 ${filteredServices.length > 2 ? "lg:grid-cols-3" : ""} gap-[1px] bg-white/[0.08]`} staggerDelay={0.08}>
          {filteredServices.map((svc, index) => {
            const isLast = index === filteredServices.length - 1;
            const remainderLg = filteredServices.length % 3;
            const remainderMd = filteredServices.length % 2;
            
            const lgSpan = isLast ? (remainderLg === 1 ? "lg:col-span-3" : remainderLg === 2 ? "lg:col-span-2" : "") : "";
            const mdSpan = isLast ? (remainderMd === 1 ? "md:col-span-2" : "") : "";

            return (
              <RevealItem key={svc.slug} className={`${lgSpan} ${mdSpan}`}>
                <Link
                  href={`/services/${svc.slug}/`}
                  className={`group relative bg-navy-deep p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:bg-navy-card-hover block h-full`}
                >
                  {/* Side custom border - shortened from edges, stable */}
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[4px] bg-gold transition-all duration-500`} />

                  {/* Top gold accent line - shortened from edges, appears on hover */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[4px] bg-gold rounded-b-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />

                  <div className={`flex flex-col`}>
                    <div>
                      <div className="flex items-center gap-4 mb-6 transform transition-all duration-500 group-hover:-translate-y-1">
                        <span className={`${isEn ? "font-[family-name:var(--font-display)]" : fcBody + " font-bold"} text-[24px] font-medium tracking-widest text-gold/80`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`inline-flex items-center ${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-[0.15em] uppercase" : fcBody + " text-[11px]"} font-bold px-3 py-1 ${
                          svc.audience === "owner" ? "bg-blue-500/10 text-blue-400 border border-blue-400/25" :
                          svc.audience === "epc" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/25" :
                          "bg-white/5 text-silver/80 border border-white/15"
                        }`}>
                          {svc.audience === "owner" ? (locale === "ar" ? "للملاك" : locale === "zh" ? "业主" : "Owner") : 
                           svc.audience === "epc" ? (locale === "ar" ? "للمقاولين" : locale === "zh" ? "EPC" : "EPC") :
                           (locale === "ar" ? "للملاك والمقاولين" : locale === "zh" ? "业主与EPC" : "Owner & EPC")}
                        </span>
                      </div>

                      {svc.badge && (
                        <div className="flex flex-wrap gap-2 mb-5 transform transition-all duration-500 delay-75 group-hover:-translate-y-1">
                          <span className={`inline-flex items-center ${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-[0.15em] uppercase" : fcBody + " text-[11px]"} font-bold bg-gold/10 text-gold border border-gold/25 px-3 py-1`}>
                            {svc.badge}
                          </span>
                        </div>
                      )}

                      <h3 className={`${isEn ? "font-[family-name:var(--font-display)] text-[22px]" : fcBody + " text-[20px] font-bold"} text-white leading-[1.25] mb-3 transform transition-all duration-500 delay-100 group-hover:-translate-y-1 group-hover:text-gold`}>
                        {svc.title}
                      </h3>

                      <p className={`${fcBody} ${isAr ? "text-[16px] leading-[1.9]" : "text-[14px] leading-[1.75]"} font-light text-silver/90 mb-8 transform transition-all duration-500 delay-150 group-hover:-translate-y-1 group-hover:text-silver`}>
                        {svc.shortDesc}
                      </p>

                      <span className={`inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.12em] uppercase" : fcBody + " text-[13px]"} font-semibold text-silver/90 transform transition-all duration-500 delay-200 group-hover:-translate-y-1 group-hover:text-gold`}>
                        {svcDict.exploreService[locale]}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-500 ${rtl ? "translate-x-0 group-hover:-translate-x-1.5 rotate-180" : "translate-x-0 group-hover:translate-x-1.5"}`} />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </StaggerChildren>

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
