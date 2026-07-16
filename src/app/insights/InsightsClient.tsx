"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Layers, Award, Terminal } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/lib/RoleContext";
import { FadeIn } from "@/components/Animations";
import { insightsPage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";
import { slugify } from "@/lib/slugify";

const articleImages: Record<string, string> = {
  "1": "/insights-construction-mistakes.png",
  "2": "/insights-commissioning-meaning.png",
  "3": "/insights-owners-engineer.png",
  "4": "/h2so4_plant.webp",
  "5": "/insights-delayed-rampup.png",
  "6": "/k2so4_plant.webp",
  "7": "/insights-epc-protection.png",
  "8": "/insights-granulation.png",
  "9": "/insights-handover-problem.png",
  "10": "/insights-refractory.png",
  "11": "/insights-handover-critical.png",
  "12": "/insights-refractory.png",
  "13": "/insights-granulation.png",
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
              ? "bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold font-semibold"
              : ""
            }`}
          whileHover={{
            scale: 1.08,
            y: -2,
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

export function InsightsClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);

  // Dynamic filter state
  const allLabel = locale === "ar" ? "الكل" : locale === "zh" ? "全部" : "All";
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  const allArticles = useMemo(() => dict.articles[locale] || [], [locale]);
  
  // Highlight the flagship article as Featured in the Hero
  const featuredArticle = useMemo(() => allArticles[0], [allArticles]);
  const featuredSlug = useMemo(() => {
    if (!featuredArticle) return "";
    const englishArticle = dict.articles["en"].find((a: any) => a.id === featuredArticle.id);
    return englishArticle ? slugify(englishArticle.title) : featuredArticle.id;
  }, [featuredArticle]);

  // Rest of articles go to grid
  const gridArticles = useMemo(() => allArticles.slice(1), [allArticles]);

  // Extract unique categories dynamically based on the current locale
  const categories = useMemo(() => {
    const list = new Set<string>();
    gridArticles.forEach((a: any) => {
      if (a.category) list.add(a.category);
    });
    return [allLabel, ...Array.from(list)];
  }, [gridArticles, allLabel]);

  // Filter grid articles dynamically
  const filteredArticles = useMemo(() => {
    if (selectedCategory === allLabel) return gridArticles;
    return gridArticles.filter((a: any) => a.category === selectedCategory);
  }, [gridArticles, selectedCategory, allLabel]);

  if (!featuredArticle) return null;

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="w-full text-start bg-navy">
      
      {/* ── IMMERSIVE EDITORIAL SPLIT HERO ── */}
      <section className="relative bg-navy-deep border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
        
        {/* Schematic Grid and Ambient Orbs underlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(229, 193, 88, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(229, 193, 88, 0.05) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Subtle scanning laser line inside background */}
          <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent top-[40%] animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-navy-deep/60 to-navy-deep" />
          
          {/* Neon gold radial glows */}
          <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial context & Stats */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <FadeIn className="space-y-4">
                <div className={`${fcUi} text-[10px] font-bold tracking-[0.25em] uppercase text-gold flex items-center gap-3 gold-line`}>
                  {dict.knowledge[locale]}
                </div>
                
                <h1 className={`${fcDisplay} text-[clamp(24px,4.5vw,56px)] leading-[1.1] text-cloud font-medium tracking-tight`}>
                  <HoverWords text={dict.pageTitle[locale]} locale={locale} />
                </h1>
                
                <p className={`${fcBody} text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-[540px]`}>
                  <HoverSubcopy text={dict.subtitle[locale]} locale={locale} />
                </p>
              </FadeIn>

              {/* Schematic details/Stats grid for Owner's Engineer theme */}
              <FadeIn delay={0.15} className="pt-4">
                <div className="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6 max-w-[480px]">
                  <div className="space-y-1">
                    <span className="block font-mono text-[9px] text-gold/50 tracking-widest uppercase">database</span>
                    <span className="block font-sans text-lg sm:text-xl font-bold text-white leading-none">13 Insights</span>
                  </div>
                  <div className="space-y-1 border-x border-white/[0.08] px-4">
                    <span className="block font-mono text-[9px] text-gold/50 tracking-widest uppercase">field depth</span>
                    <span className="block font-sans text-lg sm:text-xl font-bold text-white leading-none">20+ Years</span>
                  </div>
                  <div className="space-y-1 px-2">
                    <span className="block font-mono text-[9px] text-gold/50 tracking-widest uppercase">operational base</span>
                    <span className="block font-sans text-xs font-semibold text-white leading-normal uppercase">Cairo, Egypt</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Featured flagship article card */}
            <div className="lg:col-span-6">
              <FadeIn delay={0.25}>
                <Link
                  href={`/insights/${featuredSlug}/`}
                  className="group block bg-navy-card/60 backdrop-blur-xl border border-gold/25 hover:border-gold transition-all duration-500 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative hover:shadow-[0_25px_60px_rgba(240,160,32,0.08)]"
                >
                  {/* Decorative corners to look like a blueprint spec drawing */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/45 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/45 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/45 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/45 rounded-br-sm pointer-events-none" />

                  {/* Pulsing Featured Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-navy-deep/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-gold/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold absolute" />
                    <span className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase">Featured Case Study</span>
                  </div>

                  {/* Cover image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.08]">
                    <picture>
                      <source media="(max-width: 768px)" srcSet={featuredArticle.id === "6" ? "/k2so4_plant-mobile.webp" : undefined} />
                      <img
                        src={articleImages[featuredArticle.id] || "/insights-commissioning.png"}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 group-hover:brightness-105"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
                    {/* Light shine animation */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                  </div>

                  {/* Card Info */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 rounded-sm border border-gold/10`}>
                        {featuredArticle.category}
                      </span>
                      <span className={`${fcUi} text-[10px] text-silver/50 tracking-wider`} dir="ltr">
                        {featuredArticle.date}
                      </span>
                    </div>

                    <h2 className={`${fcDisplay} text-xl sm:text-2xl text-white group-hover:text-gold transition-colors duration-300 font-medium leading-snug`}>
                      {featuredArticle.title}
                    </h2>

                    <p className={`${fcBody} text-xs sm:text-sm font-light text-silver/70 leading-relaxed line-clamp-3`}>
                      {featuredArticle.excerpt}
                    </p>

                    <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                      <span className={`${fcUi} text-[10px] font-bold tracking-[0.15em] uppercase text-gold flex items-center gap-1.5`}>
                        {dict.readArticle[locale]}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 ${rtl ? "rotate-180" : ""}`} />
                      </span>
                      <Terminal className="w-3.5 h-3.5 text-gold/30" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── ARTICLES DIRECTORY + CATEGORY FILTERS ── */}
      <section className="py-20 sm:py-28 bg-navy relative border-b border-divider">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          
          {/* Header & Filter Controls Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 border-b border-white/[0.06] pb-8">
            <FadeIn className="space-y-2">
              <span className="font-mono text-[9px] text-gold/50 tracking-[0.25em] uppercase">technical resources</span>
              <h2 className={`${fcDisplay} text-2xl sm:text-3xl text-cloud font-medium tracking-tight`}>
                {locale === "ar" ? "دليل المعرفة الميدانية" : locale === "zh" ? "现场知识指南" : "Field Knowledge Directory"}
              </h2>
            </FadeIn>

            {/* Category Filter Tabs */}
            <FadeIn delay={0.1} className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                      isActive
                        ? "bg-gold border-gold text-navy-deep font-bold shadow-[0_0_15px_rgba(240,160,32,0.2)]"
                        : "border-white/[0.08] hover:border-gold/30 text-silver/60 hover:text-white bg-navy-card/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </FadeIn>
          </div>

          {/* Staggered Grid of Remaining Articles */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article: any) => {
                const coverImage = articleImages[article.id] || "/insights-commissioning.png";
                const englishArticle = dict.articles["en"].find((a: any) => a.id === article.id);
                const slug = englishArticle ? slugify(englishArticle.title) : article.id;
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={article.id}
                  >
                    <Link
                      href={`/insights/${slug}/`}
                      className="bg-navy-card/45 backdrop-blur-sm border border-white/[0.08] hover:border-gold/45 hover:bg-navy-card-hover/70 transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full group relative shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_45px_rgba(240,160,32,0.05)] cursor-pointer"
                    >
                      {/* Cover Image */}
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] z-0">
                        <picture>
                          <source media="(max-width: 768px)" srcSet={article.id === "6" ? "/k2so4_plant-mobile.webp" : undefined} />
                          <img
                            src={coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                            loading="lazy"
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                        {/* Premium shimmer beam */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                      </div>

                      {/* Content details */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className={`${fcUi} text-[8.5px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-sm border border-gold/10`}>
                              {article.category}
                            </span>
                            <span className={`${fcUi} text-[9.5px] text-silver/50 tracking-wider`} dir="ltr">
                              {article.date}
                            </span>
                          </div>

                          <h3 className={`${fcDisplay} text-lg sm:text-[20px] text-cloud leading-[1.3] group-hover:text-gold transition-colors duration-300 font-medium`}>
                            {article.title}
                          </h3>

                          <p className={`${fcBody} text-xs sm:text-[13px] font-light text-silver/75 leading-[1.65] line-clamp-3`}>
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/[0.05]">
                          <span className={`${fcUi} text-[10px] font-bold tracking-[0.15em] uppercase text-silver/50 flex items-center gap-1.5 group-hover:text-gold transition-colors duration-300`}>
                            {dict.readArticle[locale]}
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* No results placeholder */}
          {filteredArticles.length === 0 && (
            <FadeIn>
              <div className="text-center py-16 border border-dashed border-white/10 rounded-sm bg-navy-card/5">
                <Layers className="w-8 h-8 text-gold/30 mx-auto mb-4" />
                <p className="text-silver/50 font-light text-sm">
                  {locale === "ar" ? "لا توجد مقالات ضمن هذا القسم حالياً." : locale === "zh" ? "此类别下暂无文章。" : "No articles published under this category yet."}
                </p>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <div className="mt-16 text-center border-t border-white/[0.06] pt-16">
              <p className="text-silver/45 font-light text-xs tracking-wide">
                {dict.moreInsights[locale]}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CAPABILITIES / CTA SECTION ── */}
      <section className="py-24 bg-navy-deep border-t border-divider relative overflow-hidden">
        {/* Backdrop Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,193,88,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,193,88,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Ambient background halos */}
        <div className="absolute -left-1/4 -top-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-1/4 -bottom-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[960px] mx-auto px-6 sm:px-8 relative z-10">
          <FadeIn>
            <div className="bg-navy-card/50 backdrop-blur-md border border-white/[0.08] hover:border-gold/20 transition-all duration-500 rounded-sm p-8 sm:p-12 md:p-16 text-center relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Engineering corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/30 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/30 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/30 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/30 rounded-br-sm pointer-events-none" />

              <h2 className={`${fcDisplay} text-[clamp(20px,3.5vw,38px)] leading-[1.2] text-white mb-4`}>
                <HoverWords text={dict.ctaTitle[locale]} locale={locale} />
                <HoverWords text={dict.ctaAccent[locale]} locale={locale} isGradient={true} />
              </h2>
              
              <p className={`${fcBody} text-xs sm:text-sm font-light text-silver/80 mb-8 max-w-[500px] mx-auto leading-relaxed`}>
                <HoverSubcopy text={dict.ctaDesc[locale]} locale={locale} />
              </p>
              
              <Link
                href="/contact/"
                className={`group btn-premium-gold ${fcUi} text-xs font-bold tracking-[0.15em] uppercase inline-flex`}
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-25 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <span className="relative z-10 flex items-center gap-2.5">
                  {shared.getInTouch[locale]}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 ${rtl ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
