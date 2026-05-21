"use client";

import Link from "next/link";
import { 
  UserCheck, 
  LineChart, 
  Settings, 
  Wrench, 
  ClipboardCheck, 
  Zap, 
  ShieldAlert, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  FileText, 
  ArrowRight 
} from "lucide-react";
import { services as allServices } from "@/data/services";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import type { ServicesContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { services as svcDict, getFontClass, isRtl } from "@/lib/i18n";

const serviceIcons: Record<string, any> = {
  "owners-engineer": UserCheck,
  "investor-advisory": LineChart,
  "process-engineering-support": Settings,
  "construction-commissioning-support": Wrench,
  "operation-readiness": ClipboardCheck,
  "commissioning": Zap,
  "troubleshooting": ShieldAlert,
  "operator-training": GraduationCap,
  "production-optimization": TrendingUp,
  "startup-performance-guarantee": Award,
  "claims-technical-documentation": FileText,
};

interface Props {
  content?: ServicesContent;
}

export function ServicesSection({ content }: Props) {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  // Headline & Labels
  const sectionLabel = content?.sectionLabel?.[locale] ?? svcDict.sectionLabel[locale];
  const headline = content?.headline?.[locale] ?? svcDict.headline[locale];
  const closingLine = svcDict.closingLine[locale];
  const viewScopeLabel = svcDict.exploreService[locale];

  // Filter services by role-specific slugs, or show all if no content
  const filteredServices = content?.visibleSlugs
    ? allServices.filter((s) => content.visibleSlugs.includes(s.slug))
    : allServices;

  // Group services by phase mapping
  const phaseMappings = [
    {
      num: "01",
      slugs: ["owners-engineer", "investor-advisory", "process-engineering-support"]
    },
    {
      num: "02",
      slugs: ["construction-commissioning-support", "operation-readiness"]
    },
    {
      num: "03",
      slugs: ["commissioning", "troubleshooting", "operator-training"]
    },
    {
      num: "04",
      slugs: ["production-optimization", "startup-performance-guarantee", "claims-technical-documentation"]
    }
  ];

  const localizedPhases = svcDict.phases[locale];

  return (
    <section id="services" dir={rtl ? "rtl" : "ltr"} className="relative py-20 sm:py-28 bg-navy-dark overflow-hidden border-b border-white/[0.05]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
              {sectionLabel}
            </span>
          </div>
          <h2 className={`${fc} text-[clamp(28px,4vw,40px)] ${locale === "ar" ? "leading-[1.4] font-bold" : "leading-[1.2] font-semibold"} text-white max-w-3xl`}>
            {headline}
          </h2>
        </FadeIn>

        {/* Phases Container */}
        <div className="space-y-12 sm:space-y-16">
          {phaseMappings.map((pMap, idx) => {
            // Filter phase services
            const phaseServices = filteredServices.filter((s) => pMap.slugs.includes(s.slug));
            if (phaseServices.length === 0) return null;

            const localizedPhase = localizedPhases.find((p) => p.num === pMap.num) || localizedPhases[idx];

            return (
              <div key={pMap.num} className="space-y-6">
                {/* Phase Divider (except for first one) */}
                {idx > 0 && <div className="border-t border-white/[0.06] pt-12 sm:pt-16" />}

                {/* Phase Title & Subtitle */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3.5">
                    <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.15em]" : fcBody + " text-[12px]"} font-bold text-gold`}>
                      {pMap.num} —
                    </span>
                    <h3 className={`${isEn ? "font-[family-name:var(--font-display)] text-[16px] sm:text-[18px]" : fcBody + " text-[16px] sm:text-[18px] font-bold"} text-white uppercase tracking-wider`}>
                      {localizedPhase.title}
                    </h3>
                  </div>
                  <p className={`${fcBody} text-silver/70 text-[13px] sm:text-[14px] leading-relaxed max-w-2xl font-light`}>
                    {localizedPhase.sub}
                  </p>
                </div>

                {/* Phase Services Grid */}
                <StaggerChildren 
                  className={`grid grid-cols-1 gap-4 ${
                    phaseServices.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
                  }`} 
                  staggerDelay={0.05}
                >
                  {phaseServices.map((svc) => {
                    const localSvc = svcDict.serviceList[svc.slug] || { title: { [locale]: svc.title }, desc: { [locale]: svc.shortDesc } };
                    const svcTitle = localSvc.title[locale] || svc.title;
                    const svcDesc = localSvc.desc[locale] || svc.shortDesc;
                    const Icon = serviceIcons[svc.slug] || Settings;

                    return (
                      <RevealItem key={svc.slug} className="h-full">
                        <Link
                          href={`/services/${svc.slug}/`}
                          className="group relative flex flex-col justify-between bg-navy-card/20 border border-white/[0.06] p-5 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-navy-card-hover/30 hover:shadow-[0_8px_24px_-8px_rgba(240,160,32,0.04)] transition-all duration-500 rounded-sm h-full overflow-hidden"
                        >
                          <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-4 bottom-4 w-[3px] bg-gold/40 group-hover:bg-gold transition-colors duration-500`} />
                          
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div className="min-w-0 flex-1 space-y-2">
                              <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.1em] text-[11px]" : fcBody + " text-[13px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase`}>
                                {svcTitle}
                              </h4>
                              <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12px] sm:text-[12.5px] leading-[1.6] font-light text-justify`}>
                                {svcDesc}
                              </p>
                            </div>
                          </div>

                          <div className={`mt-6 ${rtl ? 'pr-[52px]' : 'pl-[52px]'} flex items-center gap-1.5 text-gold/80 group-hover:text-gold text-[10px] sm:text-[11px] font-bold tracking-wider transition-colors duration-300`}>
                            <span className={isEn ? "font-[family-name:var(--font-ui)]" : fcBody}>
                              {viewScopeLabel}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                          </div>
                        </Link>
                      </RevealItem>
                    );
                  })}
                </StaggerChildren>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/[0.06] flex items-start gap-4">
          <div className="w-1.5 h-1.5 bg-gold shrink-0 mt-2 rounded-full" />
          <p className={`${fcBody} text-silver/80 text-[13px] sm:text-[14px] leading-relaxed max-w-3xl`}>
            {closingLine.split(" — ").map((part, index) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-gold font-medium">
                    — {part}
                  </span>
                );
              }
              return part;
            })}
          </p>
        </div>

      </div>
    </section>
  );
}
