"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Clock, MapPin, Factory, Award, CheckCircle2, Globe, Flame, Settings, Zap, Cpu, Database, FlaskConical, Beaker, Mail, ShieldCheck, Microscope
} from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { experiencePage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

// Map domain icons
const techIcons: Record<string, any> = {
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

function InteractiveMap({ locale, rtl }: { locale: string; rtl: boolean }) {
  const isEn = locale === "en";
  return (
    <div className="relative w-full h-[360px] sm:h-[400px] bg-navy-deep border border-white/[0.08] rounded-sm overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Radar rings and coordinate grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,40,64,0.45)_0%,transparent_75%)] pointer-events-none" />
      
      {/* Coordinate metrics */}
      <div className="flex justify-between text-[9px] font-mono text-silver/40 relative z-10">
        <span>GRID RANGE: 20°N - 35°N / 25°E - 50°E</span>
        <span>SYS STATUS: ACTIVE [LOCAL_GRID]</span>
      </div>

      {/* Nodes and Connection visual */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Connection Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "100%" }}>
          <defs>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0a020" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#e5c158" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f0a020" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Curved path representing connection Suez <-> Yanbu */}
          <path
            d="M 120 120 Q 200 60 280 180"
            fill="none"
            stroke="url(#glowGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-[dash_10s_linear_infinite]"
          />
        </svg>

        {/* Pulse Node 1: Suez, Egypt */}
        <div className="absolute left-[40px] top-[90px] sm:left-[60px] sm:top-[100px] flex flex-col items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold"></span>
          </span>
          <span className="mt-2 text-[10.5px] font-bold text-white tracking-wider bg-navy-dark/95 px-2 py-0.5 border border-white/[0.12] rounded-sm whitespace-nowrap shadow-md">
            Suez, EG (K₂SO₄ SOP)
          </span>
          <span className="text-[8px] font-mono text-gold mt-0.5">29.96°N, 32.54°E</span>
        </div>

        {/* Pulse Node 2: Yanbu, Saudi Arabia */}
        <div className="absolute right-[40px] bottom-[60px] sm:right-[80px] sm:bottom-[70px] flex flex-col items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold"></span>
          </span>
          <span className="mt-2 text-[10.5px] font-bold text-white tracking-wider bg-navy-dark/95 px-2 py-0.5 border border-white/[0.12] rounded-sm whitespace-nowrap shadow-md">
            Yanbu, KSA (NPK Comp.)
          </span>
          <span className="text-[8px] font-mono text-gold mt-0.5">24.09°N, 38.06°E</span>
        </div>
      </div>

      {/* Coordinate footer */}
      <div className="flex justify-between text-[9px] font-mono text-silver/40 relative z-10">
        <span>SCALE: 1 : 12,500,000</span>
        <span>TARGETS: SUEZ_SOP | YANBU_NPK</span>
      </div>
    </div>
  );
}

export function ExperienceClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);
  const isEn = locale === "en";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-dark min-h-screen relative overflow-hidden">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[75vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/[0.06] bg-navy-deep overflow-hidden">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <picture>
            <source srcSet="/services-hero-bg.webp" type="image/webp" />
            <img
              src="/services-hero-bg.png"
              alt="Kafaah Experience Background"
              className="w-full h-full object-fill opacity-25 mix-blend-luminosity"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/45 to-navy-dark/35" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-5xl">
          <FadeIn className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUi + " text-[12px]"} font-bold text-gold uppercase`}>
                {dict.pageTitle[locale]}
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h1 className={`${fcDisplay} text-[clamp(32px,5.5vw,56px)] leading-[1.1] text-white font-medium`}>
              <HoverWords text={isEn ? "Proven Operational Footprint." : dict.completedProjects[locale]} locale={locale} />
            </h1>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-6 max-w-2xl">
            <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[17px] leading-[1.8] font-light`}>
              <HoverSubcopy 
                text={isEn 
                  ? "A record of engineering accountability inside chemical facilities. From Mannheim SOP furnaces to NPK compaction units, Kafaah leads critical projects to stable commercial yields." 
                  : dict.backgroundText[locale]} 
                locale={locale} 
              />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SELECTED COMPLETED PROJECTS SECTION ── */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <FadeIn className="mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase`}>
                {dict.completedProjects[locale]}
              </span>
            </div>
            <h2 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2`}>
              {isEn ? "Major Plant Deployments & Commissions" : dict.completedProjects[locale]}
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {dict.projects[locale].map((proj: any, idx: number) => (
              <FadeIn delay={0.1 * (idx + 1)} key={idx}>
                <div className="relative group bg-navy-card/40 hover:bg-navy-card-hover/55 border border-white/[0.08] hover:border-gold/35 rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(229,193,88,0.04)] overflow-hidden">
                  
                  {/* Glowing Vertical accent line */}
                  <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-gold/60 to-gold group-hover:w-[5px] transition-all duration-300" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`${fcUi} text-[9px] font-bold tracking-[0.18em] uppercase bg-gold/15 text-gold border border-gold/25 px-2.5 py-1 rounded-sm`}>
                          {proj.badge}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-silver/60">
                          <Clock className="w-3.5 h-3.5 text-gold/60" />
                          {proj.date}
                        </span>
                      </div>

                      <h3 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-medium leading-tight`}>
                        {proj.title}
                      </h3>

                      <div className="font-mono text-[10.5px] font-semibold tracking-wider text-gold/80 bg-white/[0.02] border border-white/[0.04] px-2.5 py-1 inline-block rounded-sm">
                        {proj.tags}
                      </div>

                      <p className={`${fcBody} text-[13.5px] leading-relaxed text-silver/85 font-light`}>
                        {proj.desc}
                      </p>
                    </div>

                    {/* Right Column: Dashboard Metrics block */}
                    <div className="lg:col-span-4 bg-navy-deep/80 border border-white/[0.08] group-hover:border-gold/25 rounded-sm p-5 space-y-4 transition-colors duration-300">
                      {/* Metric 1: Location */}
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {dict.location[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.location}
                          </span>
                        </div>
                      </div>

                      {/* Metric 2: Capacity / Milestone */}
                      <div className="flex items-start gap-3 border-t border-white/[0.06] pt-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          {proj.hasMilestone ? (
                            <Award className="w-4 h-4 text-gold" />
                          ) : (
                            <Factory className="w-4 h-4 text-gold" />
                          )}
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {proj.hasMilestone ? dict.milestone[locale] : dict.capacity[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.hasMilestone ? proj.milestone : proj.capacity}
                          </span>
                        </div>
                      </div>

                      {/* Metric 3: Outcome */}
                      <div className="flex items-start gap-3 border-t border-white/[0.06] pt-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {dict.outcome[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.outcome}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACKGROUND QUOTE SECTION ── */}
      <section className="relative py-24 bg-navy-dark border-t border-b border-white/[0.06] overflow-hidden">
        {/* Glow circle overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 bg-gold/10 border border-gold/20 rounded-full mb-6 text-gold">
              <Microscope className="w-6 h-6" />
            </div>
            
            <h3 className={`${fcDisplay} text-[clamp(20px,3vw,30px)] text-white leading-[1.5] font-light italic mb-8 max-w-3xl mx-auto`}>
              "{dict.backgroundText[locale]}"
            </h3>

            {/* Micro KPI grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/[0.08]">
              <div className="text-center space-y-1">
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  20+
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Years Field Operations" : "عاماً من العمليات الميدانية"}
                </span>
              </div>
              <div className="text-center space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-white/[0.08] py-4 sm:py-0">
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  6
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Core Plant Chemistries" : "عمليات صناعية متكاملة"}
                </span>
              </div>
              <div className="text-center space-y-1">
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  100%
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Independent Support" : "تمثيل فني مستقل"}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PERIODIC TABLE TECHNOLOGIES GRID ── */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <FadeIn className="mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase`}>
                {dict.techCovered[locale]}
              </span>
            </div>
            <h2 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2`}>
              {isEn ? "Chemical Plant Processes Covered" : dict.techCovered[locale]}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { formula: "H₂SO₄", name: { en: "Sulfuric Acid", ar: "حمض الكبريتيك", zh: "硫酸" }, index: "01" },
              { formula: "H₃PO₄", name: { en: "Phosphoric Acid", ar: "حمض الفوسفوريك", zh: "磷酸" }, index: "02" },
              { formula: "K₂SO₄", name: { en: "Sulfate of Potash", ar: "كبريتات البوتاسيوم", zh: "硫酸钾" }, index: "03" },
              { formula: "NPK", name: { en: "NPK Fertilizers", ar: "سماد مركب NPK", zh: "氮磷钾复合肥" }, index: "04" },
              { formula: "MgSO₄", name: { en: "Magnesium Sulphate", ar: "كبريتات المغنيسيوم", zh: "硫酸镁" }, index: "05" },
              { formula: "SSP", name: { en: "Single Superphosphate", ar: "سوبر فوسفات أحادي", zh: "普通过指酸钙" }, index: "06" },
            ].map((tech) => {
              const Icon = techIcons[tech.formula] || Beaker;
              return (
                <div 
                  key={tech.formula} 
                  className="relative group bg-navy-card/45 hover:bg-navy-card-hover/60 border border-white/[0.08] hover:border-gold/30 p-6 rounded-sm flex flex-col justify-between h-[160px] sm:h-[180px] transition-all duration-500 hover:-translate-y-1.5 shadow-md"
                >
                  {/* Top line detail */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-gold font-bold">
                      {tech.index}
                    </span>
                    <Icon className="w-5 h-5 text-gold/30 group-hover:text-gold/80 transition-colors duration-300" />
                  </div>
                  
                  {/* Chemical Element Symbol */}
                  <div className="text-center my-2">
                    <span className="block font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-white tracking-wide group-hover:scale-105 transition-transform duration-500" dir="ltr">
                      {tech.formula}
                    </span>
                  </div>

                  {/* Chemical Name */}
                  <div className="text-center border-t border-white/[0.06] pt-2">
                    <span className={`${fcUi} text-[10.5px] font-bold uppercase tracking-[0.1em] text-silver/60 group-hover:text-white transition-colors duration-300 block`}>
                      {tech.name[locale]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY SECTION (COORDINATES MAP) ── */}
      <section className="py-20 lg:py-28 bg-navy-dark border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text & Locations */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase`}>
                    {dict.geoFootprint[locale]}
                  </span>
                </div>
                
                <h2 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2 leading-tight`}>
                  {isEn ? "Serving Industrial Centers Across MENA" : dict.geoFootprint[locale]}
                </h2>
                
                <p className={`${fcBody} text-sm text-silver/80 font-light leading-relaxed mt-4`}>
                  {isEn 
                    ? "Our engineers actively deploy directly to client sites in critical industrial zones. We coordinate site mobilization across Egypt, Saudi Arabia, and regional hubs."
                    : "ينتشر مهندسونا مباشرة في مواقع العملاء في المناطق الصناعية الحيوية. نقوم بالتنسيق وحشد الكفاءات الهندسية عبر مصر والسعودية والمحاور الإقليمية."}
                </p>
              </FadeIn>

              {/* Geographic Tags */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {dict.geoList[locale].map((loc) => (
                  <span
                    key={loc}
                    className={`${fcUi} text-[10.5px] font-semibold tracking-wider uppercase text-silver bg-navy-deep border border-white/[0.08] px-4 py-2 rounded-sm shadow-sm`}
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Abstract Map Coordinate visual */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <InteractiveMap locale={locale} rtl={rtl} />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING CTA SECTION ── */}
      <section className="relative py-20 sm:py-28 bg-navy-deep/30 border-t border-white/[0.03]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            <div className="lg:col-span-6">
              <FadeIn>
                <h2 className={`${fcDisplay} text-[28px] sm:text-[36px] text-white font-bold leading-[1.3] text-center lg:text-start`}>
                  {locale === "ar" ? "هل لديك مشروع ترغب في مناقشته؟" : locale === "zh" ? "您有项目需要讨论吗？" : "Have a project to discuss?"}
                  <span className="block text-gold mt-1">
                    {locale === "ar" ? "تواصل مع كفاءة اليوم." : locale === "zh" ? "立即与 KAFAAH 联系。" : "Connect with Kafaah today."}
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify lg:text-start`}>
                  {dict.discussProject[locale]} {locale === "ar" 
                    ? "تواصل معنا لمراجعة تحديات مصنعك أو التشغيل التجريبي المقبل لمشروعك، وسيقوم أحد مهندسي العمليات لدينا بمراجعة طلبك والرد فوريًا." 
                    : locale === "zh" 
                    ? "与我们的技术团队取得联系，审查您的运营挑战或即将开始的项目调试，我们的工艺工程师将在24小时内与您对接。" 
                    : "Get in touch with our technical team to review your operational challenges or upcoming project commissioning. A principal process engineer will review your situation."}
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact/"
                  className={`group btn-premium-gold ${locale !== "en" ? fcUi + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.12em] uppercase"} font-bold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  {/* Premium animated light sweep */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{locale === "ar" ? "اتصل بكفاءة" : locale === "zh" ? "联系 KAFAAH" : "CONTACT KAFAAH"}</span>
                  </span>
                </Link>
                <Link
                  href="/services/"
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? fcUi + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.08em] uppercase"} font-semibold w-full sm:w-[270px] whitespace-nowrap justify-center`}
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
