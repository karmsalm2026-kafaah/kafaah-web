"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Cpu, 
  Shield, 
  Award, 
  Factory, 
  Globe,
  FlaskConical,
  Power,
  TrendingUp,
  ShieldCheck,
  BriefcaseBusiness
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import type { HeroContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { hero as heroDict, isRtl, getFontClass } from "@/lib/i18n";

interface Props {
  content?: HeroContent;
}

function HoverWords({ text, locale, isGradient = false }: { text: string; locale: string; isGradient?: boolean }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${
            isChinese ? "" : "mr-[0.28em] rtl:mr-0 rtl:ml-[0.28em]"
          } ${
            isGradient 
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
          className={`inline-block origin-center ${
            isChinese ? "" : "mr-[0.25em] rtl:mr-0 rtl:ml-[0.25em]"
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

export function HeroSection({ content }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const eyebrow = content?.eyebrow?.[locale] ?? heroDict.eyebrow[locale];
  const headline = content?.headline?.[locale] ?? heroDict.headline[locale];
  const sub = content?.subCopy?.[locale] ?? heroDict.subCopy[locale];
  const primary = {
    label: content?.primaryCta?.label?.[locale] ?? heroDict.exploreServices[locale],
    href: content?.primaryCta?.href ?? "#services",
  };
  const secondary = {
    label: content?.secondaryCta?.label?.[locale] ?? heroDict.discussPlant[locale],
    href: content?.secondaryCta?.href ?? "#experience",
  };
  const stats = content?.stats?.map(s => ({ num: s.num, label: s.label[locale] })) ?? 
    heroDict.stats[locale].map(s => ({ num: s.value, label: s.label }));

  const builtInside = heroDict.builtInside;

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="relative h-[100dvh] flex flex-col overflow-hidden bg-navy-deep">
      {/* Image Background with authoritative overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile: same image for all locales */}
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile-828.webp" />
          {/* Desktop: Specific image for LTR languages (English, Chinese) */}
          {!rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-extended.webp" />}
          {/* Desktop: RTL-specific image for Arabic */}
          {rtl && <source media="(min-width: 769px)" srcSet="/hero-bg-rtl-1920.webp" />}
          <img
            src="/hero-bg-extended.webp"
            alt="Engineering Team"
            className="w-full h-full object-fill object-right lg:object-center opacity-100 mix-blend-luminosity"
          />
        </picture>
        {/* Lighter Gradient Overlays for better image visibility */}
        <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-t md:bg-gradient-to-l" : "max-md:bg-gradient-to-t md:bg-gradient-to-r"} from-navy-deep/80 md:from-navy-deep/90 via-navy-deep/60 md:via-navy-deep/70 sm:via-navy-deep/50 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 sm:via-transparent via-transparent to-navy-deep/60" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4 sm:pt-24 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column (Content) */}
          <StaggerChildren className="relative lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow with gold line */}
            <RevealItem>
              <motion.div 
                className="flex items-center gap-4 mb-4 sm:mb-6 cursor-default group/eyebrow"
                whileHover="hover"
              >
                <motion.div 
                  className="w-10 h-px bg-gradient-to-r from-gold to-gold/0"
                  variants={{
                    hover: { width: 56 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
                <motion.span 
                  className={`${locale !== "en" ? getFontClass(locale) : "font-[family-name:var(--font-ui)] tracking-[0.3em] uppercase"} text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold text-gold`}
                  variants={{
                    hover: { x: 4 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {eyebrow}
                </motion.span>
              </motion.div>
            </RevealItem>

            {/* Headline – 2 lines, typographic drama */}
            <RevealItem>
              <h1 className={`${locale === "ar" ? getFontClass(locale) + " text-[clamp(1.8rem,3.2vw,3.25rem)] leading-[1.3] tracking-normal font-black"
                : locale === "zh" ? getFontClass(locale) + " text-[clamp(1.6rem,2.8vw,3.25rem)] leading-[1.25] tracking-normal font-bold"
                  : "font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,4.25rem)] leading-[1.05] tracking-[-0.01em]"
                } mb-5 sm:mb-8`}
              >
                <span className="block text-white overflow-visible pb-1 sm:pb-2">
                  <HoverWords text={headline[0]} locale={locale} />
                </span>
                <span className="block overflow-visible pb-1">
                  <HoverWords text={headline[1]} locale={locale} isGradient={true} />
                </span>
              </h1>
            </RevealItem>

            {/* Sub copy - Increased brightness for readability */}
            <RevealItem>
              <p className={`${locale !== "en" ? getFontClass(locale) : ""} text-[clamp(0.85rem,1vw,1rem)] text-silver max-w-2xl leading-[1.6] sm:leading-[1.8] mb-8 sm:mb-10 font-medium text-justify`}>
                <HoverSubcopy text={sub} locale={locale} />
              </p>
            </RevealItem>

            {/* CTAs */}
            <RevealItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 w-full max-w-[min(720px,100%)]">
                <Link
                  href={primary.href}
                  className={`group btn-premium-gold !gap-2 sm:!gap-3 !px-3 sm:!px-4 md:!px-6 !py-4 sm:!py-[18px] ${locale !== "en" ? getFontClass(locale) + " text-[clamp(0.7rem,0.8vw,0.75rem)] font-bold" : "font-[family-name:var(--font-ui)] text-[clamp(0.6875rem,0.8vw,0.75rem)] font-bold tracking-[0.12em] uppercase"} w-full justify-center`}
                >
                  {/* Premium animated light sweep */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <Cpu className="w-[18px] h-[18px] flex-shrink-0 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="relative z-10 whitespace-nowrap">{primary.label}</span>
                  <ArrowRight className={`w-[18px] h-[18px] flex-shrink-0 relative z-10 transition-transform duration-500 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </Link>

                <Link
                  href={secondary.href}
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 !gap-2 sm:!gap-3 !px-3 sm:!px-4 md:!px-6 !py-4 sm:!py-[18px] ${locale !== "en" ? getFontClass(locale) + " text-[clamp(0.7rem,0.8vw,0.75rem)] font-semibold" : "font-[family-name:var(--font-ui)] text-[clamp(0.6875rem,0.8vw,0.75rem)] font-semibold tracking-[0.08em] uppercase"} w-full justify-center`}
                >
                  {/* Premium animated border */}
                  <div className="animated-border-box rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Factory className="w-[18px] h-[18px] flex-shrink-0 relative z-10 opacity-90 group-hover:opacity-100 group-hover:text-gold transition-all duration-500 group-hover:scale-110" />
                  <span className="relative z-10 whitespace-nowrap">{secondary.label}</span>
                  <ArrowRight className={`w-[18px] h-[18px] flex-shrink-0 relative z-10 opacity-80 group-hover:opacity-100 transition-transform duration-500 ${rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </Link>
              </div>
            </RevealItem>
          </StaggerChildren>

          {/* Right Column (Floating Built-Inside Card) */}
          <FadeIn delay={0.2} y={20} className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end mt-10 lg:mt-0 w-full z-10">
            <div className="group relative bg-[#162234]/25 backdrop-blur-md border border-white/[0.06] p-6 sm:p-8 rounded-sm transition-all duration-500 hover:border-gold/20 hover:bg-[#162234]/35 w-full max-w-[420px] shadow-2xl">
              {/* Visual gold accent line */}
              <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/60 group-hover:bg-gold transition-colors duration-300`} />
              
              <p className={`${locale !== "en" ? getFontClass(locale) + " font-bold" : "font-[family-name:var(--font-ui)] tracking-[0.2em] font-semibold text-[11px] sm:text-[12px] uppercase"} text-gold mb-5`}>
                {builtInside.title[locale]}
              </p>
              
              <ul className="space-y-4">
                {(builtInside.items[locale] || []).map((item, index) => {
                  let Icon = Power;
                  if (index === 0) Icon = Power;        // Commissioning & Startup
                  if (index === 1) Icon = Shield;       // Operational Stabilization
                  if (index === 2) Icon = TrendingUp;   // Performance Optimization
                  if (index === 3) Icon = ShieldCheck;  // Independent Technical Oversight
                  if (index === 4) Icon = Factory;      // Fertilizer & Chemical Facilities
                  
                  return (
                    <li key={index} className="flex items-center gap-3.5">
                      <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className={`${locale !== "en" ? getFontClass(locale) + " text-[14px]" : "text-[13px] font-medium"} text-silver`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                <Globe className="w-4 h-4 text-gold flex-shrink-0 animate-pulse" />
                <span className={`${locale !== "en" ? getFontClass(locale) + " text-[13px] font-bold" : "text-[12px] font-bold uppercase tracking-wider"} text-gold`}>
                  {builtInside.location[locale]}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <FadeIn delay={0.48} y={0}>
        <div className="relative z-10 border-t border-white/[0.16] bg-navy-deep/35 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => {
                let Icon = Award;
                if (i === 0) Icon = Award;         // 20+ Years
                if (i === 1) Icon = FlaskConical;  // 6 Industrial Processes
                if (i === 2) Icon = BriefcaseBusiness; // 11 Service Offerings
                if (i === 3) Icon = Globe;         // MENA & Beyond

                return (
                  <div
                    key={stat.label}
                    className={`py-4 sm:py-5 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8 group cursor-default border-white/[0.12] transition-colors duration-300 hover:bg-white/[0.01] ${i === 1 || i === 3 ? "border-s" : ""
                      } ${i === 2 ? "max-md:border-s-0 md:border-s" : ""} ${i < 2 ? "border-b md:border-b-0" : ""
                      }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Premium Gold Outline Icon */}
                      <Icon className="w-8 h-8 md:w-[38px] md:h-[38px] text-gold flex-shrink-0 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.2} />
                      
                      <div className="min-w-0 flex-1">
                        <div className={`${locale !== "en" ? getFontClass(locale) + " font-bold" : "font-[family-name:var(--font-display)]"} text-[clamp(1.25rem,2.2vw,2.25rem)] text-white font-bold leading-none mb-1 group-hover:text-gold transition-colors duration-300`}>
                          {stat.num}
                        </div>
                        <div className={`text-[clamp(0.6rem,0.725vw,0.675rem)] leading-tight text-silver/60 group-hover:text-silver/85 transition-colors duration-300 ${locale !== "en" ? getFontClass(locale) + " font-medium" : "tracking-[0.08em] uppercase font-[family-name:var(--font-ui)]"}`}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Removed Scroll indicator as requested */}
    </section>
  );
}
