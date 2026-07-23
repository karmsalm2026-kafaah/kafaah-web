"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Users,
  FlaskConical,
  Handshake,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft
} from "lucide-react";
import { services as allServices } from "@/data/services";
import { FadeIn, StaggerChildren, RevealItem, HoverWords, HoverSubcopy } from "@/components/Animations";
import type { ServicesContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { services as svcDict, getFontClass, isRtl } from "@/lib/i18n";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";

// Custom premium Crane SVG icon
function CraneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Vertical Tower */}
      <path d="M9 22V8h2v14" />
      <path d="M8 22h4" />
      {/* Horizontal Jib */}
      <path d="M3 8h18" />
      {/* Truss support */}
      <path d="M9 8L5 4h8l-4 4" />
      {/* Counterweight */}
      <path d="M4 8v3h2V8" />
      {/* Hook cable & hook */}
      <path d="M17 8v5" />
      <path d="M17 13a1 1 0 0 1-1 1" />
    </svg>
  );
}

const featureIcons = [
  ShieldCheck,
  Users,
  FlaskConical,
  Handshake
];

// Helper to get structured split title text for white and gold parts
const getSplitTitle = (phaseNum: string, locale: string) => {
  if (locale === "ar") {
    if (phaseNum === "01") return { white: "مرحلة المشروع", gold: "والتصميم" };
    if (phaseNum === "02") return { white: "البناء", gold: "وما قبل بدء التشغيل" };
    if (phaseNum === "03") return { white: "بدء التشغيل", gold: "والاستقرار" };
    if (phaseNum === "04") return { white: "الأداء", gold: "والتحسين" };
  }
  if (locale === "zh") {
    if (phaseNum === "01") return { white: "项目与设计", gold: "阶段" };
    if (phaseNum === "02") return { white: "建设与", gold: "启动前" };
    if (phaseNum === "03") return { white: "启动与", gold: "稳定化" };
    if (phaseNum === "04") return { white: "性能与", gold: "优化" };
  }
  // English default
  if (phaseNum === "01") return { white: "PROJECT & DESIGN", gold: "PHASE" };
  if (phaseNum === "02") return { white: "CONSTRUCTION &", gold: "PRE-STARTUP" };
  if (phaseNum === "03") return { white: "STARTUP &", gold: "STABILIZATION" };
  if (phaseNum === "04") return { white: "PERFORMANCE &", gold: "OPTIMIZATION" };
  return { white: "", gold: "" };
};

interface Props {
  content?: ServicesContent;
}

export function ServicesSection({ content }: Props) {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const fcUI = getFontClass(locale, "ui");
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  // Headline & Labels
  const sectionLabel = content?.sectionLabel?.[locale] ?? svcDict.sectionLabel[locale];
  const viewDetailsLabel = svcDict.viewDetails[locale];

  // Filter services by role-specific slugs, or show all if no content
  const filteredServices = content?.visibleSlugs
    ? allServices.filter((s) => content.visibleSlugs.includes(s.slug))
    : allServices;

  // Group services by phase mapping and specify Lucide icons
  const phaseMappings = [
    {
      num: "01",
      slugs: ["owners-engineer", "investor-advisory", "process-engineering-support"],
      icon: ClipboardCheck
    },
    {
      num: "02",
      slugs: ["construction-commissioning-support", "operation-readiness"],
      icon: CraneIcon
    },
    {
      num: "03",
      slugs: ["commissioning", "troubleshooting", "operator-training"],
      icon: TrendingUp
    },
    {
      num: "04",
      slugs: ["production-optimization", "startup-performance-guarantee", "expert-witness-dispute-resolution"],
      icon: BarChart3
    }
  ];

  const localizedPhases = svcDict.phases[locale];
  const ChevronIcon = rtl ? ChevronLeft : ChevronRight;
  const BulletChevron = rtl ? ChevronsLeft : ChevronsRight;

  return (
    <section id="services" dir={rtl ? "rtl" : "ltr"} className="relative py-14 xs:py-20 sm:py-28 bg-navy-dark overflow-hidden border-b border-white/[0.05]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeIn className="group/header mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-6 group-hover/header:w-16 h-px bg-gradient-to-r from-transparent to-gold transition-all duration-700 ease-out" />
            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcUI + " text-[13px] sm:text-[14px]"} font-semibold text-gold transition-all duration-500 group-hover/header:tracking-[0.35em] group-hover/header:scale-105 inline-block`}>
              {sectionLabel}
            </span>
            <div className="w-6 group-hover/header:w-16 h-px bg-gradient-to-l from-transparent to-gold transition-all duration-700 ease-out" />
          </div>

          <h2 className={`${fc} text-[clamp(22px,4.5vw,46px)] leading-[1.2] text-white max-w-4xl mx-auto font-semibold transition-all duration-500 group-hover/header:text-shadow-[0_0_20px_rgba(240,160,32,0.15)] group-hover/header:-translate-y-0.5 overflow-visible`}>
            {locale === "en" && (
              <>
                <HoverWords text="Services Across the" locale={locale} />{" "}
                <span className="text-gold font-normal font-[family-name:var(--font-display)] italic overflow-visible inline-block">
                  <HoverWords text="Full Project Lifecycle" locale={locale} isGradient={true} />
                </span>
              </>
            )}
            {locale === "ar" && (
              <>
                <HoverWords text="الخدمات عبر" locale={locale} />{" "}
                <span className="text-gold font-bold overflow-visible inline-block">
                  <HoverWords text="دورة حياة المشروع الكاملة" locale={locale} isGradient={true} />
                </span>
              </>
            )}
            {locale === "zh" && (
              <>
                <HoverWords text="横跨" locale={locale} />{" "}
                <span className="text-gold font-bold overflow-visible inline-block">
                  <HoverWords text="整个项目生命周期" locale={locale} isGradient={true} />
                </span>{" "}
                <HoverWords text="的服务" locale={locale} />
              </>
            )}
          </h2>

          <p className={`${fcBody} text-silver/60 text-[14px] sm:text-[15.5px] leading-relaxed max-w-3xl mx-auto mt-4 font-light transition-all duration-700 group-hover/header:text-silver/80`}>
            <HoverSubcopy 
              text={
                locale === "en" ? "From early engineering decisions to stable plant operations, we support both Owners and EPCs with independent expertise at every critical stage."
                : locale === "ar" ? "من القرارات الهندسية المبكرة وحتى استقرار عمليات المصنع، ندعم كلاً من الملاك ومقاولي EPC بخبرة مستقلة في كل مرحلة حرجة."
                : "从早期的工程决策到稳定的工厂运营，我们在每个关键阶段为业主和 EPC 提供独立的专业支持。"
              } 
              locale={locale} 
            />
          </p>
        </FadeIn>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {phaseMappings.map((pMap, idx) => {
            // Filter phase services
            const phaseServices = filteredServices.filter((s) => pMap.slugs.includes(s.slug));
            if (phaseServices.length === 0) return null;

            const localizedPhase = localizedPhases.find((p) => p.num === pMap.num) || localizedPhases[idx];
            const splitTitle = getSplitTitle(pMap.num, locale);
            const Icon = pMap.icon;

            // RTL-aware diagonal cut and border path for card image
            const cardClipPath = rtl
              ? "polygon(0 0, 100% 0, 100% 80%, 85% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 80%)";
            const borderPath = rtl
              ? "M 0,100 L 85,100 L 100,80"
              : "M 100,100 L 15,100 L 0,80";

            return (
              <FadeIn key={pMap.num} delay={idx * 0.08} y={20} duration={0.6} className="relative h-full">
                {/* Arrow between cards (desktop only) */}
                {idx < 3 && (
                  <div className={`hidden lg:flex absolute top-[110px] ${rtl ? "-left-[16px]" : "-right-[16px]"} z-20 w-8 h-8 rounded-full border border-gold/40 bg-navy-dark items-center justify-center text-gold shadow-lg`}>
                    <ChevronIcon className="w-4 h-4" />
                  </div>
                )}

                {/* Card Container */}
                <div className="group/card relative flex flex-col bg-gradient-to-b from-[#1b2b3d] to-[#121f2d] backdrop-blur-md border border-white/[0.06] p-3.5 xs:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(240,160,32,0.12)] hover:border-gold/30 hover:-translate-y-2 rounded-sm transition-all duration-500 ease-out h-full overflow-hidden">
                  {/* Subtle hover accent bar */}
                  <div className={`absolute ${rtl ? 'right-0 rounded-l-md' : 'left-0 rounded-r-md'} top-6 bottom-6 w-[2px] bg-gold/10 group-hover/card:bg-gold group-hover/card:top-4 group-hover/card:bottom-4 transition-all duration-500`} />

                  {/* Card Image Wrapper with Diagonal bottom-left/right cut */}
                  <div
                    className="relative -mt-3.5 -mx-3.5 w-[calc(100%+1.75rem)] xs:-mt-5 xs:-mx-5 xs:w-[calc(100%+2.5rem)] h-52 sm:h-56 overflow-hidden shrink-0"
                    style={{
                      clipPath: cardClipPath
                    }}
                  >
                    <ImageWithSkeleton
                      src={`/our_services_${parseInt(pMap.num)}.webp`}
                      alt={localizedPhase.title}
                      className="w-full h-full object-cover group-hover/card:scale-108 group-hover/card:opacity-90 transition-all duration-700 ease-out"
                      containerClassName="w-full h-full"
                      loading="lazy"
                    />
                    {/* Absolute positioned Number Pill */}
                    <div dir="ltr" className={`absolute top-4 ${rtl ? 'right-4' : 'left-4'} z-10 bg-navy-dark/95 border border-gold/30 px-3 py-1 rounded-sm shadow-md transition-colors duration-350 group-hover/card:border-gold`}>
                      <span className="text-gold font-bold text-xs tracking-widest font-[family-name:var(--font-ui)]">
                        {pMap.num}
                      </span>
                    </div>
                    {/* Gold border line tracing the cut and bottom of image */}
                    <svg
                      className="absolute inset-0 w-full h-full text-white/[0.25] group-hover/card:text-gold/35 transition-all duration-500 pointer-events-none overflow-visible -translate-y-[2px] drop-shadow-[0_3px_4px_rgba(0,0,0,0.75)] group-hover/card:drop-shadow-[0_0_8px_rgba(240,160,32,0.35)]"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={borderPath}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mt-6">
                    <div className="w-10 h-10 rounded-sm border border-gold/25 bg-gold/[0.02] text-gold flex items-center justify-center shrink-0 transition-all duration-500 group-hover/card:border-gold group-hover/card:bg-gold/[0.06] group-hover/card:scale-110 group-hover/card:shadow-[0_0_15px_rgba(240,160,32,0.15)]">
                      <Icon className="w-4 h-4 transition-transform duration-500 group-hover/card:rotate-6" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className={`${locale === "ar" ? "text-[14.5px] xs:text-[16px] sm:text-[18px] font-bold leading-snug" : "text-[13px] xs:text-[14px] sm:text-[15px] tracking-wider font-black uppercase leading-tight"} text-white transition-all duration-500 ${rtl ? "group-hover/card:-translate-x-1" : "group-hover/card:translate-x-1"} group-hover/card:text-gold`}>
                        {splitTitle.white}
                        <span className="text-gold block mt-0.5 transition-colors duration-500 group-hover/card:text-white">{splitTitle.gold}</span>
                      </h4>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className={`${fcBody} text-silver/60 text-[11.5px] xs:text-[12.5px] leading-relaxed mt-4 font-light text-start h-auto md:h-12 transition-all duration-500 ${rtl ? "group-hover/card:-translate-x-0.5" : "group-hover/card:translate-x-0.5"} group-hover/card:text-silver/80`}>
                    {localizedPhase.sub}
                  </p>

                  {/* Divider Line */}
                  <div className="h-px w-full bg-white/[0.08] group-hover/card:bg-gold/25 transition-all duration-500 my-5 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.5)] group-hover/card:shadow-[0_0_4px_rgba(240,160,32,0.15)]" />

                  {/* Services List */}
                  <ul className="space-y-3.5 flex-1 shrink-0">
                    {phaseServices.map((svc) => {
                      const localSvc = svcDict.serviceList[svc.slug] || { title: { [locale]: svc.title } };
                      const svcTitle = localSvc.title[locale] || svc.title;

                      return (
                        <li key={svc.slug}>
                          <Link
                            href={`/services/${svc.slug}/`}
                            className="group/item flex items-start gap-2 text-silver/70 hover:text-gold transition-colors duration-300 text-[12.5px] sm:text-[13px] leading-snug"
                          >
                            <BulletChevron className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:translate-x-1.5 rtl:group-hover/item:-translate-x-1.5" />
                            <span className={`font-light transition-transform duration-300 ${rtl ? "group-hover/item:-translate-x-1" : "group-hover/item:translate-x-1"}`}>{svcTitle}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Card CTA Link at bottom */}
                  <div className="mt-8 pt-4 shrink-0">
                    <Link
                      href={`/services/${phaseServices[0].slug}/`}
                      className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-[11px] font-bold tracking-wider transition-colors duration-300 uppercase font-[family-name:var(--font-ui)]"
                    >
                      <span>{viewDetailsLabel}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "rotate-180 group-hover/card:-translate-x-1.5" : "group-hover/card:translate-x-1.5"}`} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Values/Features & Centered Closing line */}
        <div className="mt-6">
          <FadeIn y={25} duration={0.7}>
            <div className="bg-gradient-to-b from-[#1b2b3d] to-[#121f2d] backdrop-blur-md border border-white/[0.06] py-4.5 px-3.5 xs:py-6 xs:px-6 sm:py-7 sm:px-8 shadow-[0_12px_36px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(240,160,32,0.12)] hover:border-gold/30 rounded-sm transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-10 lg:gap-y-0 relative">
                {svcDict.features[locale].map((feat, idx) => {
                  const FeatIcon = featureIcons[idx];
                  return (
                    <div
                      key={idx}
                      className={`
                        group/feat flex flex-col items-center lg:items-start text-center lg:text-start px-2 xs:px-4 lg:px-8 first:pl-0 last:pr-0
                        /* Mobile: vertical stack separated by top border/padding */
                        border-t border-white/10 first:border-t-0 pt-6 first:pt-0
                        /* Tablet: 2x2 grid adjustments */
                        md:border-t-0 md:pt-0
                        ${idx === 1 ? 'md:border-l md:border-white/10 rtl:md:border-r rtl:md:border-l-0 md:pl-8 md:pr-0 rtl:md:pl-0 rtl:md:pr-8' : ''}
                        ${idx === 2 ? 'md:border-t md:border-white/10 md:pt-6 lg:md:border-t-0 lg:md:pt-0' : ''}
                        ${idx === 3 ? 'md:border-t md:border-l md:border-white/10 rtl:md:border-r rtl:md:border-l-0 md:pt-6 md:pl-8 md:pr-0 rtl:md:pl-0 rtl:md:pr-8 lg:md:border-t-0 lg:md:pt-0' : ''}
                        /* Desktop: 1x4 horizontal row adjustments */
                        lg:border-t-0 lg:border-l lg:border-white/10 lg:first:border-l-0 lg:pt-0 lg:px-8 lg:first:pl-0 lg:last:pr-0
                        rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:border-white/10 rtl:lg:first:border-r-0
                      `}
                    >
                      <div className="flex flex-col items-center lg:items-start">
                        {/* Hexagon Outline Icon */}
                        <div className="relative w-10 h-10 flex items-center justify-center shrink-0 mb-3 transition-all duration-500 group-hover/feat:scale-110 group-hover/feat:rotate-6">
                          <svg
                            className="absolute inset-0 w-full h-full text-gold/25 fill-none stroke-current transition-colors duration-300 group-hover/feat:text-gold"
                            viewBox="0 0 100 100"
                            strokeWidth="4"
                          >
                            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
                          </svg>
                          <FeatIcon className="w-4 h-4 text-gold relative z-10" />
                        </div>
                        {/* Text Details */}
                        <div className="min-w-0">
                          <h5 className={`${locale === "ar" ? "text-[14.5px] xs:text-[16px] sm:text-[18px] font-bold leading-snug" : "text-[12px] xs:text-[13px] sm:text-[14px] tracking-wider font-black uppercase leading-tight"} text-white transition-all duration-500 ${rtl ? "group-hover/feat:-translate-x-1" : "group-hover/feat:translate-x-1"} group-hover/feat:text-gold`}>
                            {feat.title}
                          </h5>
                          <h6 className={`text-silver/90 text-[11.5px] xs:text-[12.5px] sm:text-[13px] font-semibold mt-0.5 transition-all duration-500 ${rtl ? "group-hover/feat:-translate-x-0.5" : "group-hover/feat:translate-x-0.5"} group-hover/feat:text-white`}>
                            {feat.subtitle}
                          </h6>
                          <p className={`text-silver/50 text-[11px] xs:text-[12px] sm:text-[12.5px] leading-relaxed mt-2.5 font-light transition-all duration-500 ${rtl ? "group-hover/feat:-translate-x-0.5" : "group-hover/feat:translate-x-0.5"} group-hover/feat:text-silver/70`}>
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Centered Closing Line */}
          <FadeIn y={15} delay={0.1} duration={0.6}>
            <div className="group/closing flex items-center justify-center gap-4 sm:gap-6 mt-16 sm:mt-20 px-4 sm:px-0">
              <div className="hidden sm:block h-px w-16 sm:w-28 group-hover/closing:w-24 sm:group-hover/closing:w-40 bg-gradient-to-r from-transparent to-gold/30 transition-all duration-500 ease-out" />
              <span className="text-gold/90 text-[10.5px] sm:text-[13px] tracking-[0.15em] sm:tracking-[0.2em] font-bold uppercase text-center sm:whitespace-nowrap transition-all duration-500 group-hover/closing:scale-105 group-hover/closing:text-white leading-relaxed">
                {svcDict.bottomClosing[locale]}
              </span>
              <div className="hidden sm:block h-px w-16 sm:w-28 group-hover/closing:w-24 sm:group-hover/closing:w-40 bg-gradient-to-l from-transparent to-gold/30 transition-all duration-500 ease-out" />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
