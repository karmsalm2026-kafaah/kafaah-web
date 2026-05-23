"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Database, Award, Milestone, User, Globe2, Briefcase, Zap, Flame, Settings, Mail } from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { whoWeAre as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

// Map domain formula to relevant process icons
const domainIcons: Record<string, any> = {
  "H₂SO₄": Flame,
  "H₃PO₄": Settings,
  "K₂SO₄": Zap,
  "NPK": Cpu,
  "MgSO₄": Database,
  "SSP": Award,
};

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

export function WhoWeAreClient() {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcUI = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-dark min-h-screen relative overflow-hidden">
      {/* Ambient background noise & grid lines */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] lg:h-[80vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/[0.06] bg-navy-deep overflow-hidden">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/services-hero-bg.png"
            alt="Kafaah Who We Are Background"
            className="w-full h-full object-fill opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/45 to-navy-dark/35" />
          <div className={`absolute inset-0 ${rtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-navy-dark/50 via-navy-dark/25 to-transparent`} />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUI + " text-[12px]"} font-bold text-gold uppercase`}>
                    {dict.heroEyebrow[locale]}
                  </span>
                </div>
                <h1 className={`${fc} text-[clamp(32px,4.5vw,46px)] ${locale === "ar" ? "leading-[1.3] font-bold" : "leading-[1.15] font-semibold"} text-white italic`}>
                  <HoverWords text={dict.heroTitle[locale]} locale={locale} />
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/85 text-[14.5px] sm:text-[16px] leading-[1.8] font-light max-w-2xl text-justify`}>
                  <HoverSubcopy text={dict.heroSub1[locale]} locale={locale} />
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className={`${fcBody} text-silver/85 text-[14.5px] sm:text-[16px] leading-[1.8] font-light max-w-2xl text-justify`}>
                  <HoverSubcopy text={dict.heroSub2[locale]} locale={locale} />
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="border-s-3 border-gold/45 ps-5 py-1">
                <p className={`${fcBody} text-gold/90 text-[13.5px] sm:text-[14.5px] italic leading-relaxed`}>
                  <HoverSubcopy text={dict.heroKafaahMean[locale]} locale={locale} />
                </p>
              </FadeIn>
            </div>

            {/* Right Column: Founder Industrial Display */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="relative group overflow-hidden rounded-sm border border-white/[0.08] bg-navy-card/10 backdrop-blur-md p-4 sm:p-5 flex flex-col gap-4">
                  {/* Founder graphic with subtle gold glow */}
                  <div className="relative w-full h-[320px] rounded-sm overflow-hidden bg-navy-deep border border-white/[0.06]">
                    <div className="absolute inset-0 bg-navy-dark/10 z-10" />
                    <img
                      src="/FOUNDER & MANAGING DIRECTOR.webp"
                      alt="Moustafa Abdelghaffar - Kafaah Founder"
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent z-25" />
                  </div>

                  {/* Built inside real plants description */}
                  <div className="bg-navy-card/30 border border-white/[0.06] p-4 rounded-sm">
                    <p className={`${fcUI} text-[10px] font-bold tracking-[0.2em] text-gold uppercase mb-1`}>
                      {dict.heroBuiltLabel[locale]}
                    </p>
                    <p className={`${fcBody} text-[12px] text-silver/70 leading-relaxed font-light whitespace-pre-line`}>
                      {dict.heroBuiltSub[locale]}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── THE FOUNDER SECTION ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.04] bg-navy-deep/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${fcUI} text-[10px] tracking-[0.25em] font-bold text-gold uppercase`}>
                  {dict.founderEyebrow[locale]}
                </span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Image, Name & Bio */}
              <div className="lg:col-span-7 space-y-6">
                <FadeIn delay={0.05} className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 h-40 rounded-sm overflow-hidden border border-white/[0.08] bg-navy-card flex-shrink-0 relative group">
                    <img
                      src="/FOUNDER & MANAGING DIRECTOR.webp"
                      alt="Moustafa Abdelghaffar Profile"
                      className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1s] object-top"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className={`${fc} text-2xl font-bold text-white tracking-wide`}>
                      {dict.founderName[locale]}
                    </h3>
                    <p className={`${fcUI} text-[10px] tracking-[0.15em] font-bold text-gold uppercase`}>
                      {dict.founderRole[locale]}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1} className="border-s-3 border-gold/45 ps-5 py-0.5">
                  <p className={`${fcBody} text-cloud text-[14px] sm:text-[15.5px] italic leading-[1.8]`}>
                    {dict.founderQuote[locale]}
                  </p>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light max-w-2xl text-justify`}>
                    {dict.founderBio[locale]}
                  </p>
                </FadeIn>
              </div>

              {/* Right Column: Stats Grid */}
              <div className="lg:col-span-5">
                <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                  {dict.founderStats[locale].map((stat, idx) => (
                    <RevealItem key={idx}>
                      <div className="relative group bg-navy-card/20 border border-white/[0.08] hover:border-gold/30 p-5 rounded-sm transition-all duration-300 flex flex-col justify-between min-h-[120px] backdrop-blur-sm overflow-hidden select-none cursor-default">
                        {/* Corner gold pulse */}
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gold/3 opacity-0 group-hover:opacity-100 blur-md rounded-full transition-opacity duration-500" />
                        <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-[0.2em]" : fcUI + " text-[11px]"} font-bold text-gold/80 uppercase block mb-2`}>
                          {stat.label}
                        </span>
                        <p className={`${fcBody} text-silver/70 text-[12px] leading-relaxed font-light`}>
                          {stat.text}
                        </p>
                      </div>
                    </RevealItem>
                  ))}
                </StaggerChildren>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT SECTION ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            <FadeIn className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${fcUI} text-[10px] tracking-[0.25em] font-bold text-gold uppercase`}>
                  {dict.diffEyebrow[locale]}
                </span>
              </div>
              <h2 className={`${fc} text-[24px] sm:text-[32px] text-white tracking-wide font-semibold`}>
                <HoverWords text={dict.diffTitle[locale]} locale={locale} />
              </h2>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.06}>
              {dict.diffFeatures[locale].map((feat, idx) => (
                <RevealItem key={idx}>
                  <div className="relative group bg-navy-card/20 border border-white/[0.08] hover:border-gold/30 border-s-3 hover:border-s-gold/80 p-6 rounded-sm transition-all duration-300 flex flex-col gap-3 backdrop-blur-sm h-full select-none cursor-default">
                    {/* Glowing highlight */}
                    <div className="absolute inset-0 bg-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <h4 className={`${fc} text-cloud text-base font-semibold group-hover:text-gold transition-colors duration-300`}>
                      {feat.title}
                    </h4>
                    <p className={`${fcBody} text-silver/65 text-[12px] leading-relaxed font-light text-justify`}>
                      {feat.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </StaggerChildren>

          </div>
        </div>
      </section>

      {/* ── HOW WE WORK SECTION ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.04] bg-navy-deep/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            <FadeIn className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${fcUI} text-[10px] tracking-[0.25em] font-bold text-gold uppercase`}>
                  {dict.workEyebrow[locale]}
                </span>
              </div>
              <h2 className={`${fc} text-[24px] sm:text-[32px] text-white tracking-wide font-semibold`}>
                <HoverWords text={dict.workTitle[locale]} locale={locale} />
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Context Paragraphs */}
              <div className="lg:col-span-6 space-y-6">
                <FadeIn delay={0.05}>
                  <p className={`${fcBody} text-silver/80 text-[14px] sm:text-[15px] leading-[1.8] font-light text-justify`}>
                    {dict.workP1[locale]}
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className={`${fcBody} text-silver/80 text-[14px] sm:text-[15px] leading-[1.8] font-light text-justify`}>
                    {dict.workP2[locale]}
                  </p>
                </FadeIn>
                <FadeIn delay={0.15} className="border-s-3 border-gold/45 ps-5 py-0.5">
                  <p className={`${fcBody} text-gold/90 text-[13px] sm:text-[14px] italic leading-relaxed`}>
                    {dict.workQuote[locale]}
                  </p>
                </FadeIn>
              </div>

              {/* Right Column: EPC vs Owner Cards */}
              <div className="lg:col-span-6">
                <StaggerChildren className="grid grid-cols-1 gap-5" staggerDelay={0.1}>
                  <RevealItem>
                    <div className="relative group bg-navy-card/25 border border-white/[0.08] hover:border-gold/30 p-6 rounded-sm transition-all duration-300 flex flex-col gap-2 backdrop-blur-sm border-s-3 border-s-sky-400/60 hover:border-s-sky-400 select-none cursor-default">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-sky-400/2 opacity-0 group-hover:opacity-100 blur-md rounded-full transition-opacity duration-500" />
                      <h4 className={`${fcUI} text-[11px] tracking-[0.15em] font-bold text-sky-400 uppercase`}>
                        {dict.workOwnersTitle[locale]}
                      </h4>
                      <p className={`${fcBody} text-silver/70 text-[12.5px] leading-relaxed font-light text-justify`}>
                        {dict.workOwnersDesc[locale]}
                      </p>
                    </div>
                  </RevealItem>
                  <RevealItem>
                    <div className="relative group bg-navy-card/25 border border-white/[0.08] hover:border-gold/30 p-6 rounded-sm transition-all duration-300 flex flex-col gap-2 backdrop-blur-sm border-s-3 border-s-emerald-400/60 hover:border-s-emerald-400 select-none cursor-default">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-400/2 opacity-0 group-hover:opacity-100 blur-md rounded-full transition-opacity duration-500" />
                      <h4 className={`${fcUI} text-[11px] tracking-[0.15em] font-bold text-emerald-400 uppercase`}>
                        {dict.workEpcTitle[locale]}
                      </h4>
                      <p className={`${fcBody} text-silver/70 text-[12.5px] leading-relaxed font-light text-justify`}>
                        {dict.workEpcDesc[locale]}
                      </p>
                    </div>
                  </RevealItem>
                </StaggerChildren>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── OUR DOMAIN SECTION ── */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            <FadeIn className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className={`${fcUI} text-[10px] tracking-[0.25em] font-bold text-gold uppercase`}>
                  {dict.domainEyebrow[locale]}
                </span>
              </div>
              <h2 className={`${fc} text-[24px] sm:text-[32px] text-white tracking-wide font-semibold`}>
                <HoverWords text={dict.domainTitle[locale]} locale={locale} />
              </h2>
              <p className={`${fcBody} text-silver/75 text-[14px] sm:text-[15px] leading-relaxed font-light max-w-3xl italic border-s border-gold/30 ps-4`}>
                <HoverSubcopy text={dict.domainSub[locale]} locale={locale} />
              </p>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
              {dict.domainCards[locale].map((tech, idx) => {
                const Icon = domainIcons[tech.formula] || Cpu;
                return (
                  <RevealItem key={idx}>
                    <div className="relative group bg-navy-card/25 border border-white/[0.08] hover:border-gold/30 border-s-3 border-s-gold/75 hover:border-s-gold p-6 rounded-sm transition-all duration-300 flex flex-col justify-between min-h-[170px] backdrop-blur-sm h-full select-none cursor-default">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <span className="font-[family-name:var(--font-display)] text-2xl text-navy-soft/60 block font-bold" dir="ltr">
                            {tech.formula}
                          </span>
                          <h4 className={`${fcUI} text-[11px] tracking-[0.1em] font-bold text-cloud uppercase`}>
                            {tech.title}
                          </h4>
                        </div>
                        <Icon className="w-5 h-5 text-gold/50 group-hover:text-gold group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <p className={`${fcBody} text-silver/65 text-[11px] sm:text-[12px] leading-relaxed font-light text-justify`}>
                        {tech.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </StaggerChildren>

            <FadeIn delay={0.2} className="pt-6 border-t border-white/[0.04]">
              <p className={`${fcBody} text-gold/80 text-[13px] sm:text-[14px] italic leading-relaxed text-center`}>
                {dict.domainClosing[locale]}
              </p>
            </FadeIn>

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
                  <HoverWords text={dict.ctaTitle[locale]} locale={locale} />
                  <span className="block text-gold mt-1">
                    <HoverWords text={dict.ctaTitleAccent[locale]} locale={locale} isGradient={true} />
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify lg:text-start`}>
                  <HoverSubcopy text={dict.ctaDesc[locale]} locale={locale} />
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
                    <span>{dict.btnContact[locale]}</span>
                  </span>
                </Link>
                <Link
                  href="/services/"
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? fcUI + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.08em] uppercase"} font-semibold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-gold" />
                    <span>{dict.btnServices[locale]}</span>
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
