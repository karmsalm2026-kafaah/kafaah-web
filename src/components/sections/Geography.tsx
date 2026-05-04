"use client";

import { useRole } from "@/lib/RoleContext";
import { geography as geoDict, getFontClass, isRtl } from "@/lib/i18n";

export function GeographySection() {
  const { locale } = useRole();
  const fc = getFontClass(locale);
  const rtl = isRtl(locale);
  const locations = geoDict.locations[locale];

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-deep py-12 border-b border-white/[0.04]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-6 md:gap-12 flex-wrap">
        <div className={`${fc} text-[10px] font-bold tracking-[0.3em] uppercase text-gold/70 shrink-0`}>
          {geoDict.label[locale]}
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-y-4">
          {locations.map((loc) => (
            <div
              key={loc}
              className={`${fc} text-[11px] font-semibold tracking-[0.15em] uppercase text-silver/60 px-5 md:px-7 border-${rtl ? "l" : "r"} border-white/[0.06] last:border-${rtl ? "l" : "r"}-0 hover:text-white transition-colors cursor-default`}
            >
              {loc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
