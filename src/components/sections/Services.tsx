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
    <section dir={rtl ? "rtl" : "ltr"} className="relative py-28 sm:py-36 bg-navy overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-16">
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
            <Link
              href="/services/owners-engineer/"
              className={`group inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-semibold text-gold/80 hover:text-gold transition-colors mt-6 sm:mt-0`}
            >
              {svcDict.allServices[locale]}
              <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
            </Link>
          </div>
        </FadeIn>

        {/* Service Cards Grid */}
        <FadeIn delay={0.1}>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${filteredServices.length > 2 ? "lg:grid-cols-3" : ""} gap-[1px] bg-white/[0.04]`}>
            {filteredServices.map((svc, index) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}/`}
                className={`group relative bg-navy-deep p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:bg-navy-card-hover ${
                  svc.featured ? "bg-navy-featured/60" : ""
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 h-[2px] transition-all duration-500 ${
                    svc.featured
                      ? "w-full bg-gradient-to-r from-gold to-gold-light"
                      : "w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full"
                  }`}
                />

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

                <p className={`${fcBody} ${isAr ? "text-[16px] leading-[1.9]" : "text-[14px] leading-[1.75]"} font-light text-silver/80 mb-8`}>
                  {svc.shortDesc}
                </p>

                <span className={`inline-flex items-center gap-2 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.12em] uppercase" : fcBody + " text-[13px]"} font-semibold text-silver/80 group-hover:text-gold transition-colors duration-300`}>
                  {svcDict.exploreService[locale]}
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "translate-x-0 group-hover:-translate-x-1.5 rotate-180" : "translate-x-0 group-hover:translate-x-1.5"}`} />
                </span>
              </Link>
            ))}
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
