"use client";

import { useRole } from "@/lib/RoleContext";
import { geography as geoDict, getFontClass, isRtl } from "@/lib/i18n";
import { StaggerChildren, RevealItem } from "@/components/Animations";

export function GeographySection() {
  const { locale } = useRole();
  const fc = getFontClass(locale);
  const rtl = isRtl(locale);
  const locations = geoDict.locations[locale];

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-deep py-12 border-b border-white/[0.08]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 md:gap-12 flex-wrap">
        <div className={`${fc} text-[10px] font-bold tracking-[0.3em] uppercase text-gold/70 shrink-0`}>
          {geoDict.label[locale]}
        </div>
        <StaggerChildren className="flex flex-wrap justify-center md:justify-start gap-y-4" staggerDelay={0.05}>
          {locations.map((loc) => (
            <RevealItem key={loc}>
              <div
                className={`${fc} text-[11px] font-semibold tracking-[0.15em] uppercase text-silver/80 px-5 md:px-7 border-${rtl ? "l" : "r"} border-white/[0.10] last:border-${rtl ? "l" : "r"}-0 hover:text-white transition-colors cursor-default`}
              >
                {loc}
              </div>
            </RevealItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
