"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
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
  Scale,
  ArrowRight,
  CheckCircle,
  Mail
} from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { servicesPage, services as svcDict, getFontClass, isRtl } from "@/lib/i18n";

// Map service slugs to their respective Lucide icons
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
  "expert-witness-dispute-resolution": Scale,
};

// Define structure for service mapping corresponding to the 4 phases
const phaseServicesMapping = [
  {
    num: "01",
    services: [
      { slug: "owners-engineer", featured: true, audience: "owner", proofKey: "owners-engineer" },
      { slug: "investor-advisory", featured: false, audience: "owner" },
      { slug: "process-engineering-support", featured: false, audience: "both", proofKey: "process-engineering-support" },
    ]
  },
  {
    num: "02",
    services: [
      { slug: "construction-commissioning-support", featured: false, audience: "both" },
      { slug: "operation-readiness", featured: false, audience: "both" },
    ]
  },
  {
    num: "03",
    services: [
      { slug: "commissioning", featured: true, audience: "both", proofKey: "commissioning" },
      { slug: "troubleshooting", featured: false, audience: "both", proofKey: "troubleshooting" },
      { slug: "operator-training", featured: false, audience: "both", proofKey: "operator-training" },
    ]
  },
  {
    num: "04",
    services: [
      { slug: "production-optimization", featured: true, audience: "owner" },
      { slug: "startup-performance-guarantee", featured: false, audience: "epc", proofKey: "startup-performance-guarantee" },
      { slug: "expert-witness-dispute-resolution", featured: false, audience: "both" },
    ]
  }
];

function HoverWords({ text, locale, isGradient = false }: { text: string; locale: string; isGradient?: boolean }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.28em] rtl:mr-0 rtl:ml-[0.28em]"
            } ${isGradient
              ? "bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold font-black"
              : ""
            }`}
          whileHover={{
            scale: 1.08,
            y: -3,
            filter: isGradient ? "drop-shadow(0 0 8px rgba(229, 193, 88, 0.6))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            color: isGradient ? undefined : "#f3e1b3",
            transition: { type: "spring", stiffness: 350, damping: 10 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function HoverSubcopy({ text, locale }: { text: string; locale: string }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.25em] rtl:mr-0 rtl:ml-[0.25em]"
            }`}
          whileHover={{
            scale: 1.04,
            y: -1,
            color: "#ffffff",
            textShadow: "0 0 4px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 12 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function ServicesClient() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcUI = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  // Translate top-level texts
  const eyebrowText = servicesPage.eyebrow[locale];
  const titleText = servicesPage.heroTitle[locale];
  const titleAccentText = servicesPage.heroTitleAccent[locale];
  const descText = servicesPage.heroDesc[locale];
  const taglineText = servicesPage.heroTagline[locale];
  const viewScopeLabel = svcDict.exploreService[locale];

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-dark min-h-screen relative overflow-hidden">
      {/* Ambient background textures */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[95vh] lg:h-[80vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/[0.06] bg-navy-deep overflow-hidden">
        {/* Premium Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <picture>
            <source srcSet="/services-hero-bg.webp" type="image/webp" />
            <img
              src="/services-hero-bg.png"
              alt="Kafaah Industrial Services Background"
              className="w-full h-full object-fill opacity-45 mix-blend-luminosity"
            />
          </picture>
          {/* Brand-aligned gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/35 via-navy-dark/40 to-navy-dark/30" />
          <div className={`absolute inset-0 ${rtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-navy-dark/50 via-navy-dark/20 to-transparent`} />
          {/* Top fade to blend seamlessly with transparent navbar */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUI + " text-[12px]"} font-bold text-gold uppercase`}>
                    {eyebrowText}
                  </span>
                </div>
                <h1 className={`${fc} text-[clamp(24px,5vw,50px)] ${locale === "ar" ? "leading-[1.3] font-bold" : "leading-[1.15] font-semibold"} text-white`}>
                  <HoverWords text={titleText} locale={locale} />
                  <span className="block text-gold mt-1">
                    <HoverWords text={titleAccentText} locale={locale} isGradient={true} />
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[14.5px] sm:text-[16px] leading-[1.8] font-light max-w-2xl text-justify`}>
                  <HoverSubcopy text={descText} locale={locale} />
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="border-s-3 border-gold/40 ps-5 py-0.5">
                <p className={`${fcBody} text-gold text-[13.5px] sm:text-[15px] italic leading-relaxed`}>
                  <HoverSubcopy text={taglineText} locale={locale} />
                </p>
              </FadeIn>

              {/* Badges Legend */}
              <FadeIn delay={0.3} className="pt-4 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-[11px] text-silver/70 font-light">
                  <div className="w-2.5 h-2.5 rounded-xs bg-sky-500/30 border border-sky-400" />
                  <span className={fcBody}>{servicesPage.legendOwners[locale]}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-silver/70 font-light">
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/30 border border-emerald-400" />
                  <span className={fcBody}>{servicesPage.legendEpc[locale]}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-silver/70 font-light">
                  <div className="w-2.5 h-2.5 rounded-xs bg-gold/30 border border-gold" />
                  <span className={fcBody}>{servicesPage.legendBoth[locale]}</span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Interactive HTML Project Lifecycle Timeline */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/15 border border-white/[0.08] p-6 sm:p-8 rounded-sm backdrop-blur-md overflow-hidden flex gap-6">
                  {/* Subtle ambient radial glow inside timeline */}
                  <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

                  {/* Rotated Eyebrow Text (for desktop/tablet) */}
                  <div className={`hidden sm:block [writing-mode:vertical-lr] ${rtl ? "rotate-0 border-s ps-4" : "rotate-180 border-e pe-4"} border-white/[0.08] text-[9px] text-gold tracking-[0.25em] font-bold text-center select-none uppercase shrink-0 opacity-80`}>
                    {servicesPage.lifecycleLabel[locale]}
                  </div>

                  {/* Timeline entries */}
                  <div className="relative flex-1 space-y-8 py-2">
                    {/* Glowing vertical connector line */}
                    <div className={`absolute ${rtl ? "right-[7px]" : "left-[7px]"} top-4 bottom-4 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent opacity-40`} />

                    {servicesPage.lifecyclePhases.map((phase, idx) => {
                      const phaseTitle = phase.title[locale];
                      const phaseDesc = phase.desc[locale];
                      return (
                        <div key={idx} className={`relative ${rtl ? "pr-7" : "pl-7"} group`}>
                          {/* Glowing Bullet Circle */}
                          <div className={`absolute ${rtl ? "right-0" : "left-0"} top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-[3px] border-navy-dark group-hover:scale-125 group-hover:shadow-[0_0_12px_#F0A020] transition-all duration-300 z-10`} />

                          {/* Content block */}
                          <div className="space-y-0.5">
                            <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px]" : fcUI + " text-[11px]"} text-gold/75 tracking-wider font-bold block`}>
                              {phase.num}
                            </span>
                            <h4 className={`${isEn ? "font-[family-name:var(--font-ui)]" : fcBody} text-white font-semibold text-[13px] sm:text-[14px] uppercase tracking-wide group-hover:text-gold transition-colors duration-300`}>
                              {phaseTitle}
                            </h4>
                            <p className={`${fcBody} text-silver/65 text-[11px] leading-relaxed font-light`}>
                              {phaseDesc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES LISTING BY LIFEPHASES ── */}
      <section className="relative py-20 bg-navy-deep/20 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">

            {phaseServicesMapping.map((pMap, idx) => {
              // Retrieve localized phase text
              const localizedPhases = svcDict.phases[locale];
              const localizedPhase = localizedPhases.find((p) => p.num === pMap.num) || localizedPhases[idx];

              return (
                <div key={pMap.num} className="space-y-8">
                  {/* Phase header info */}
                  <FadeIn className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.2em]" : fcUI + " text-[13px]"} font-bold text-gold`}>
                        {pMap.num} —
                      </span>
                      <h3 className={`${fc} text-[20px] sm:text-[24px] text-white uppercase tracking-wider font-semibold`}>
                        <HoverWords text={localizedPhase.title} locale={locale} />
                      </h3>
                    </div>
                    <p className={`${fcBody} text-silver/70 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-2xl font-light border-s border-gold/30 ps-4 italic`}>
                      <HoverSubcopy text={localizedPhase.sub} locale={locale} />
                    </p>
                  </FadeIn>

                  {/* Services Grid inside the Phase */}
                  <StaggerChildren
                    className={`grid grid-cols-1 gap-6 ${pMap.services.length === 2 ? "md:grid-cols-2 max-w-4xl" : "sm:grid-cols-2 lg:grid-cols-3"
                      }`}
                    staggerDelay={0.06}
                  >
                    {pMap.services.map((svc) => {
                      const svcText = svcDict.serviceList[svc.slug];
                      const title = svcText?.title[locale] || "";
                      const desc = svcText?.desc[locale] || "";
                      const Icon = serviceIcons[svc.slug] || Settings;

                      // Resolve audience styling classes
                      let audienceBadgeClass = "";
                      let audienceBadgeText = "";
                      if (svc.audience === "owner") {
                        audienceBadgeClass = "bg-sky-500/10 text-sky-400 border border-sky-500/25";
                        audienceBadgeText = servicesPage.badgeOwner[locale];
                      } else if (svc.audience === "epc") {
                        audienceBadgeClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25";
                        audienceBadgeText = servicesPage.badgeEpc[locale];
                      } else {
                        audienceBadgeClass = "bg-gold/10 text-gold border border-gold/25";
                        audienceBadgeText = servicesPage.badgeBoth[locale];
                      }

                      // Resolve proof details
                      const proofText = svc.proofKey ? servicesPage.proofs[svc.proofKey]?.[locale] : null;

                      return (
                        <RevealItem key={svc.slug} className="h-full">
                          <Link
                            href={`/services/${svc.slug}/`}
                            className={`group relative flex flex-col justify-between p-3.5 xs:p-5 sm:p-6 bg-navy-card/30 backdrop-blur-md border rounded-sm h-full overflow-hidden transition-all duration-500 ${svc.featured
                                ? "border-gold/35 shadow-[0_0_24px_rgba(240,160,32,0.06)] hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.12)] hover:border-gold/50"
                                : "border-white/[0.08] hover:border-gold/30 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)]"
                              } hover:-translate-y-1.5 hover:bg-navy-card/45`}
                          >
                            {/* Premium glowing accent border line */}
                            <div className={`absolute ${rtl ? "right-0 rounded-l-xs" : "left-0 rounded-r-xs"} top-6 bottom-6 w-[3px] bg-gold/15 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />

                            <div className="flex-1">
                              {/* Badges container */}
                              <div className="flex flex-wrap gap-2 items-center mb-5">
                                {svc.featured && (
                                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-wider" : fcUI + " text-[10px]"} px-2 py-0.5 bg-gold text-navy-deep font-bold rounded-xs`}>
                                    {servicesPage.badgeHighestValue[locale]}
                                  </span>
                                )}
                                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-wider" : fcUI + " text-[10px]"} px-2 py-0.5 font-semibold rounded-xs ${audienceBadgeClass}`}>
                                  {audienceBadgeText}
                                </span>
                              </div>

                              {/* Icon */}
                              <div className="w-9 h-9 rounded-xs flex items-center justify-center border border-gold/15 bg-gold/[0.03] text-gold mb-4 group-hover:scale-105 transition-transform duration-300">
                                <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                              </div>

                              {/* Title */}
                              <h4 className={`${isEn ? "font-[family-name:var(--font-ui)] tracking-[0.08em] text-[12px]" : fcBody + " text-[14.5px]"} font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase mb-2`}>
                                {title}
                              </h4>

                              {/* Description */}
                              <p className={`${fcBody} text-silver/70 group-hover:text-silver/85 transition-colors duration-300 text-[12.5px] leading-[1.65] font-light text-justify`}>
                                {desc}
                              </p>
                            </div>

                            {/* Bottom: Proof or CTA label */}
                            <div className="mt-6 pt-4 border-t border-white/[0.04]">
                              {proofText ? (
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] text-silver/70 bg-navy-deep/60 border border-white/[0.05] rounded-xs tracking-wide">
                                  <CheckCircle className="w-3 h-3 text-gold shrink-0" />
                                  <span className={`${fcBody} font-light`}>{proofText}</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-gold/80 group-hover:text-gold text-[10.5px] font-bold tracking-wider transition-colors duration-300">
                                  <span className={isEn ? "font-[family-name:var(--font-ui)]" : fcBody}>
                                    {viewScopeLabel}
                                  </span>
                                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                                </div>
                              )}
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

          {/* ── FOUNDER BIOGRAPHY BLOCK ── */}
          <FadeIn delay={0.1} className="mt-28">
            <div className="relative bg-navy-card/10 border border-white/[0.08] rounded-sm p-6 sm:p-8 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl mx-auto">
              {/* Radial glow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

              {/* Founder Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden border border-gold/30 p-0.5 bg-navy-card/50">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/FOUNDER & MANAGING DIRECTOR.webp"
                    alt={servicesPage.founderRole[locale]}
                    fill
                    sizes="96px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Founder Quote Content */}
              <div className="space-y-3 text-center md:text-start flex-1">
                <blockquote className={`${fcBody} text-silver/85 text-[14px] sm:text-[15.5px] italic leading-[1.75] font-light`}>
                  &ldquo;{servicesPage.founderQuote[locale]}&rdquo;
                </blockquote>
                <div className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9.5px] tracking-[0.18em]" : fcUI + " text-[11.5px]"} font-bold text-gold uppercase`}>
                  {servicesPage.founderRole[locale]}
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── HOW WE STAFF EVERY ENGAGEMENT ── */}
      <section className="relative py-20 sm:py-28 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left side: Information */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn className="space-y-4">
                <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUI + " text-[12px]"} font-bold text-gold uppercase block`}>
                  {servicesPage.staffEyebrow[locale]}
                </span>
                <h2 className={`${fc} text-[28px] sm:text-[34px] text-white font-semibold leading-[1.25]`}>
                  <HoverWords text={servicesPage.staffTitle[locale]} locale={locale} />
                  <span className="block text-gold mt-1">
                    <HoverWords text={servicesPage.staffTitleAccent[locale]} locale={locale} isGradient={true} />
                  </span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.1} className="space-y-4">
                <p className={`${fcBody} text-silver/70 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify`}>
                  <HoverSubcopy text={servicesPage.staffDesc1[locale]} locale={locale} />
                </p>
                <p className={`${fcBody} text-silver/70 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify`}>
                  <HoverSubcopy text={servicesPage.staffDesc2[locale]} locale={locale} />
                </p>
              </FadeIn>
            </div>

            {/* Right side: Categories list */}
            <div className="lg:col-span-7">
              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.05}>
                {servicesPage.staffCategories.map((cat, idx) => {
                  const catTitle = cat.title[locale];
                  const catDesc = cat.desc[locale];
                  return (
                    <RevealItem key={idx}>
                      <div className="group relative bg-navy-card/25 border border-white/[0.08] hover:border-gold/30 hover:bg-navy-card/35 transition-all duration-300 p-3.5 xs:p-5 rounded-sm h-full">
                        {/* Interactive top line highlight */}
                        <div className="absolute top-0 left-4 right-4 h-[2px] bg-white/[0.05] group-hover:bg-gold transition-colors duration-300" />

                        <h4 className={`${fc} text-white text-[15px] sm:text-[16px] font-semibold tracking-wide mb-1.5`}>
                          {catTitle}
                        </h4>
                        <p className={`${fcBody} text-silver/65 text-[12px] sm:text-[12.5px] leading-relaxed font-light`}>
                          {catDesc}
                        </p>
                      </div>
                    </RevealItem>
                  );
                })}
              </StaggerChildren>
            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING CTA SECTION ── */}
      <section className="relative py-20 sm:py-28 bg-navy-deep/30 border-t border-white/[0.03]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">

            <div className="lg:col-span-6">
              <FadeIn>
                <h2 className={`${fc} text-[28px] sm:text-[36px] text-white font-bold leading-[1.3] text-center lg:text-start`}>
                  <HoverWords text={servicesPage.ctaTitle[locale]} locale={locale} />
                  <span className="block text-gold mt-1">
                    <HoverWords text={servicesPage.ctaTitleAccent[locale]} locale={locale} isGradient={true} />
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify lg:text-start`}>
                  <HoverSubcopy text={servicesPage.ctaDesc[locale]} locale={locale} />
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact/"
                  className={`group btn-premium-gold ${locale !== "en" ? fcUI + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.12em] uppercase"} font-bold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  {/* Premium animated light sweep */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{servicesPage.btnDiscuss[locale]}</span>
                  </span>
                </Link>
                <Link
                  href="/experience/"
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? fcUI + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.08em] uppercase"} font-semibold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-gold" />
                    <span>{servicesPage.btnExperience[locale]}</span>
                  </span>
                </Link>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
