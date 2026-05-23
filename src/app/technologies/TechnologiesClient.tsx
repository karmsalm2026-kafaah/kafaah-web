"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Settings, Zap, Cpu, Database, Award, ShieldAlert, FlaskConical, Beaker, ClipboardCopy, Mail } from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { technologiesPage as dict, getFontClass, isRtl } from "@/lib/i18n";
import { technologies } from "@/data/technologies";

const domainIcons: Record<string, any> = {
  "H₂SO₄": Flame,
  "H₃PO₄": Settings,
  "K₂SO₄": Zap,
  "NPK": Cpu,
  "MgSO₄": Database,
  "SSP": Award,
};

const keyMap: Record<string, any> = {
  "sulfuric-acid": "h2so4",
  "phosphoric-acid": "h3po4",
  "sulfate-of-potash": "k2so4",
  "npk": "npk",
  "magnesium-sulphate": "mgso4",
  "ssp": "ssp"
};

const imageMap: Record<string, string> = {
  "sulfuric-acid": "/h2so4_plant.png",
  "phosphoric-acid": "/h3po4_plant.png",
  "sulfate-of-potash": "/k2so4_plant.png",
  "npk": "/npk_plant.png",
  "magnesium-sulphate": "/mgso4_plant.png",
  "ssp": "/ssp_plant.png"
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

export function TechnologiesClient() {
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
      <section className="relative min-h-[90vh] lg:h-[90vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/[0.06] bg-navy-deep overflow-hidden">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/services-hero-bg.png"
            alt="Kafaah Technologies Background"
            className="w-full h-full object-fill opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/45 to-navy-dark/35" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <FadeIn className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUI + " text-[12px]"} font-bold text-gold uppercase`}>
                {dict.heroEyebrow[locale]}
              </span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className={`${fc} text-[clamp(32px,5vw,52px)] ${locale === "ar" ? "leading-[1.3] font-bold" : "leading-[1.1] font-semibold"} text-white italic`}>
              <HoverWords text={dict.heroTitle[locale]} locale={locale} />
            </h1>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-6">
            <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[17px] leading-[1.8] font-light text-center`}>
              <HoverSubcopy text={dict.heroDesc[locale]} locale={locale} />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── alternatING DETAILED PROCESSES SECTION ── */}
      <section className="py-20 lg:py-32 space-y-24 lg:space-y-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-28 lg:space-y-36">
            {technologies.map((tech, index) => {
              const techKey = keyMap[tech.slug];
              const tData = dict[techKey as keyof typeof dict] as any;
              if (!tData) return null;

              const Icon = domainIcons[tech.formula] || Beaker;
              const isEven = index % 2 === 0;

              return (
                <div key={tech.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Visual Image container */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <FadeIn delay={0.05}>
                      <div className="relative group rounded-sm overflow-hidden border border-white/[0.08] bg-navy-card/15 backdrop-blur-md p-4 sm:p-5 flex flex-col gap-4">
                        {/* Process rendered image */}
                        <div className="relative w-full h-[280px] sm:h-[350px] rounded-sm overflow-hidden bg-navy-deep border border-white/[0.06]">
                          <img
                            src={imageMap[tech.slug]}
                            alt={tech.fullName}
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent z-10" />
                          
                          {/* Formula badge overlay */}
                          <div className="absolute top-4 left-4 z-20 bg-navy-dark/80 backdrop-blur-md border border-white/[0.12] px-3 py-1.5 rounded-sm">
                            <span className="font-[family-name:var(--font-display)] text-lg text-gold font-bold" dir="ltr">
                              {tech.formula}
                            </span>
                          </div>
                        </div>

                        {/* Quick detail caption */}
                        <div className="bg-navy-card/45 border border-white/[0.06] p-4 rounded-sm flex items-center justify-between">
                          <div className="space-y-1">
                            <span className={`${fcUI} text-[9px] font-bold tracking-[0.2em] text-gold uppercase block`}>
                              {isEn ? "PROCESS CLASSIFICATION" : locale === "ar" ? "تصنيف العملية الصناعية" : "工艺分类"}
                            </span>
                            <span className={`${fcBody} text-xs text-silver/80 font-medium`}>
                              {tData.sub[locale]}
                            </span>
                          </div>
                          <Icon className="w-8 h-8 text-gold/30 shrink-0" />
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Technical Information container */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <FadeIn delay={0.1}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gold font-[family-name:var(--font-display)] text-2xl font-bold" dir="ltr">
                            {tech.formula}
                          </span>
                          <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                          <span className={`${fcUI} text-[10px] tracking-[0.2em] font-bold text-silver/60 uppercase`}>
                            {tech.name}
                          </span>
                        </div>
                        <h2 className={`${fc} text-[26px] sm:text-[34px] font-semibold text-white tracking-wide leading-tight`}>
                          {tData.title[locale]}
                        </h2>
                      </div>
                    </FadeIn>

                    {/* Scientific Grid Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                      {/* Chemistry block */}
                      <div className="bg-navy-card/15 border border-white/[0.06] hover:border-gold/20 p-4 rounded-sm transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <FlaskConical className="w-3.5 h-3.5 text-gold/70" />
                          <span className={`${fcUI} text-[10px] font-bold tracking-[0.15em] text-gold uppercase`}>
                            {dict.chemistryLabel[locale]}
                          </span>
                        </div>
                        <p className="font-[family-name:var(--font-body)] text-xs text-silver/80 font-light leading-relaxed" dir="ltr">
                          {tData.chemistry[locale]}
                        </p>
                      </div>

                      {/* Equipment block */}
                      <div className="bg-navy-card/15 border border-white/[0.06] hover:border-gold/20 p-4 rounded-sm transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Beaker className="w-3.5 h-3.5 text-gold/70" />
                          <span className={`${fcUI} text-[10px] font-bold tracking-[0.15em] text-gold uppercase`}>
                            {dict.equipmentLabel[locale]}
                          </span>
                        </div>
                        <p className={`${fcBody} text-xs text-silver/85 font-light leading-relaxed`}>
                          {tData.equipment[locale]}
                        </p>
                      </div>

                      {/* Challenges block */}
                      <div className="bg-navy-card/15 border border-white/[0.06] hover:border-gold/20 p-4 rounded-sm transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldAlert className="w-3.5 h-3.5 text-gold/70" />
                          <span className={`${fcUI} text-[10px] font-bold tracking-[0.15em] text-gold uppercase`}>
                            {dict.challengesLabel[locale]}
                          </span>
                        </div>
                        <p className={`${fcBody} text-xs text-silver/85 font-light leading-relaxed`}>
                          {tData.challenges[locale]}
                        </p>
                      </div>

                      {/* Experience block */}
                      <div className="bg-navy-card/15 border border-white/[0.06] hover:border-gold/20 p-4 rounded-sm transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <ClipboardCopy className="w-3.5 h-3.5 text-gold/70" />
                          <span className={`${fcUI} text-[10px] font-bold tracking-[0.15em] text-gold uppercase`}>
                            {dict.experienceLabel[locale]}
                          </span>
                        </div>
                        <p className={`${fcBody} text-xs text-silver/85 font-light leading-relaxed`}>
                          {tData.experience[locale]}
                        </p>
                      </div>
                    </div>

                    {/* CTA explore page link */}
                    <div className="pt-4 flex justify-start">
                      <Link
                        href={`/technologies/${tech.slug}/`}
                        className={`group inline-flex items-center gap-2 ${fcUI} text-[10.5px] font-bold tracking-[0.15em] text-gold hover:text-gold-light transition-colors`}
                      >
                        <span>{dict.exploreBtn[locale]}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${rtl ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  {locale === "ar" ? "جاهز لتحسين مصنعك؟" : locale === "zh" ? "准备好优化您的工厂了吗？" : "Ready to optimize your plant?"}
                  <span className="block text-gold mt-1">
                    {locale === "ar" ? "دعنا نبدأ المحادثة." : locale === "zh" ? "让我们开始对话。" : "Let's start the conversation."}
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify lg:text-start`}>
                  {locale === "ar" 
                    ? "تواصل مع كفاءة اليوم للحصول على دعم فني متخصص لمشروعك الصناعي ومراجعة التحديات التشغيلية." 
                    : locale === "zh" 
                    ? "立即与 Kafaah 联系，为您的工业项目提供专业的技术支持，并审视现场运营挑战。" 
                    : "Connect with Kafaah today to get dedicated technical oversight for your industrial project and review operational challenges."}
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact/"
                  className={`group btn-premium-gold ${locale !== "en" ? fcUI + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.12em] uppercase"} font-bold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{locale === "ar" ? "اتصل بكفاءة" : locale === "zh" ? "联系 KAFAAH" : "CONTACT KAFAAH"}</span>
                  </span>
                </Link>
                <Link
                  href="/services/"
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? fcUI + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.08em] uppercase"} font-semibold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-gold" />
                    <span>{locale === "ar" ? "عرض خدماتنا" : locale === "zh" ? "浏览我们的服务" : "VIEW OUR SERVICES"}</span>
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
