"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/lib/RoleContext";
import { FadeIn } from "@/components/Animations";
import { insightsPage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

const articleImages: Record<string, string> = {
  "1": "/insights-construction-mistakes.png",
  "2": "/insights-commissioning-meaning.png",
  "3": "/insights-owners-engineer.png",
  "4": "/h2so4_plant.png",
  "5": "/insights-delayed-rampup.png",
  "6": "/k2so4_plant.png",
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

function parseMarkdown(content: string, fcDisplay: string, fcBody: string) {
  if (!content) return null;
  const blocks = content.split("\n\n");
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className={`${fcDisplay} text-xl sm:text-2xl text-white font-semibold mt-8 mb-4 border-b border-white/10 pb-2`}>
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} className={`${fcDisplay} text-lg sm:text-xl text-gold font-medium mt-6 mb-3`}>
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map(item => item.replace(/^[*-\s]+/, ""));
      return (
        <ul key={index} className="list-disc pl-5 rtl:pl-0 rtl:pr-5 text-silver/85 space-y-2 mb-4">
          {items.map((item, i) => (
            <li key={i} className={`${fcBody} text-sm sm:text-base font-light leading-relaxed`}>{item}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n").map(item => item.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={index} className="list-decimal pl-5 rtl:pl-0 rtl:pr-5 text-silver/85 space-y-2 mb-4">
          {items.map((item, i) => (
            <li key={i} className={`${fcBody} text-sm sm:text-base font-light leading-relaxed`}>{item}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={index} className={`${fcBody} text-silver/85 text-sm sm:text-base font-light leading-relaxed mb-4`}>
        {trimmed}
      </p>
    );
  });
}

export function InsightsClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);

  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeArticle]);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="w-full text-start">
      {/* Animated Blueprint Hero */}
      <section className="bg-navy-dark border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        {/* Schematic Grid Underlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(229, 193, 88, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(229, 193, 88, 0.055) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/80 to-navy-dark" />
          <div className="absolute -left-12 top-10 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <FadeIn className="space-y-4">
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-2 gold-line`}>
              {dict.knowledge[locale]}
            </div>
            
            <h1 className={`${fcDisplay} text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud font-medium`}>
              <HoverWords text={dict.pageTitle[locale]} locale={locale} />
            </h1>
            
            <p className={`${fcBody} text-base sm:text-lg font-light text-muted max-w-[640px] leading-relaxed`}>
              <HoverSubcopy text={dict.subtitle[locale]} locale={locale} />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-20 bg-navy relative">
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {dict.articles[locale].map((article: any) => {
                const coverImage = articleImages[article.id] || "/insights-commissioning.png";
                return (
                  <div
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="bg-navy-card/45 backdrop-blur-sm border border-white/[0.08] hover:border-gold/45 hover:bg-navy-card-hover/60 transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full group relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(229,193,88,0.06)] cursor-pointer"
                  >
                    {/* Card Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] z-0">
                      <img
                        src={coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
                      
                      {/* Premium Hover Light Sweep */}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10">
                      <div>
                        {/* Meta Tags */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2.5 py-1 rounded-sm border border-gold/10`}>
                            {article.category}
                          </span>
                          <span className={`${fcUi} text-[10px] text-silver/60 uppercase tracking-[0.1em]`} dir="ltr">
                            {article.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className={`${fcDisplay} text-xl sm:text-[22px] text-cloud leading-[1.3] mb-4 group-hover:text-gold transition-colors duration-300 font-medium`}>
                          <HoverWords text={article.title} locale={locale} />
                        </h2>

                        {/* Excerpt */}
                        <p className={`${fcBody} text-[13.5px] sm:text-[14.5px] font-light text-silver/80 leading-[1.7]`}>
                          <HoverSubcopy text={article.excerpt} locale={locale} />
                        </p>
                      </div>

                      {/* Footer Read Button */}
                      <div className="pt-6 mt-6 border-t border-white/[0.05]">
                        <span className={`${fcUi} text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-silver/50 flex items-center gap-2 group-hover:text-gold transition-colors duration-300`}>
                          <span className="flex items-center gap-2">
                            {dict.readArticle[locale]}
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-16 text-center border-t border-divider pt-16">
              <p className="text-silver/50 font-light text-sm tracking-wide">
                {dict.moreInsights[locale]}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox / Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-navy-dark/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-navy-dark/95 backdrop-blur border border-gold/30 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(229,193,88,0.04)] w-full max-w-[840px] max-h-[85vh] overflow-hidden flex flex-col relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className={`absolute top-4 ${rtl ? "left-4" : "right-4"} z-20 p-2 bg-navy-dark/60 border border-white/[0.08] hover:border-gold hover:text-gold rounded-full text-white/70 transition-all duration-300 focus:outline-none`}
                aria-label="Close reader"
              >
                <X className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
              </button>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Banner Image */}
                <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-white/[0.08]">
                  <img
                    src={articleImages[activeArticle.id] || "/insights-commissioning.png"}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/45 to-transparent" />
                  
                  {/* Category overlay */}
                  <div className="absolute bottom-6 left-8 right-8 flex flex-wrap items-center gap-3">
                    <span className={`${fcUi} text-[9px] font-bold tracking-[0.18em] uppercase text-gold bg-gold/15 border border-gold/25 px-2.5 py-1 rounded-sm`}>
                      {activeArticle.category}
                    </span>
                  </div>
                </div>

                {/* Main Body Content */}
                <div className="p-6 sm:p-10 md:p-12 space-y-6">
                  {/* Article Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-silver/45 border-b border-white/[0.06] pb-5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold/80" />
                      <span>{activeArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold/80" />
                      <span>{locale === "ar" ? "قراءة في 5 دقائق" : locale === "zh" ? "5分钟阅读" : "5 min read"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-gold/80" />
                      <span>Kafaah Operations</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className={`${fcDisplay} text-2xl sm:text-3xl md:text-[34px] leading-[1.2] text-white font-medium`}>
                    {activeArticle.title}
                  </h1>

                  {/* Excerpt Blockquote */}
                  <div className="border-s-2 border-gold/50 ps-4 py-1 my-4">
                    <p className={`${fcBody} text-silver/65 text-sm sm:text-base font-light italic leading-relaxed`}>
                      {activeArticle.excerpt}
                    </p>
                  </div>

                  {/* Render Rich Markdown Content */}
                  <div className="mt-8 space-y-6">
                    {parseMarkdown(activeArticle.content, fcDisplay, fcBody)}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:px-10 border-t border-white/[0.06] bg-navy-deep/60 flex items-center justify-between">
                <span className={`${fcUi} text-[10px] text-silver/45 tracking-wider`}>
                  {locale === "ar"
                    ? "حلول كفاءة الصناعية - المعرفة الميدانية"
                    : locale === "zh"
                    ? "Kafaah 工业解决方案 - 现场实战见解"
                    : "Kafaah Industrial Solutions - Direct Field Knowledge"}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className={`${fcUi} text-[10px] sm:text-xs font-bold tracking-[0.1em] text-gold hover:text-gold-light uppercase transition-colors duration-200`}
                >
                  {locale === "ar" ? "إغلاق القارئ" : locale === "zh" ? "关闭阅读器" : "Close Reader"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-navy-deep border-t border-divider relative overflow-hidden">
        {/* Decorative Grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,193,88,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,193,88,0.1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Golden radial glows */}
        <div className="absolute -left-1/4 -top-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-1/4 -bottom-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[960px] mx-auto px-8 relative z-10">
          <FadeIn>
            <div className="bg-navy-card/30 backdrop-blur-md border border-white/[0.08] hover:border-gold/30 transition-all duration-500 rounded-sm p-8 sm:p-12 md:p-16 text-center relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Corner decorative borders */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/30 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/30 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/30 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/30 rounded-br-sm pointer-events-none" />

              <h2 className={`${fcDisplay} text-[clamp(26px,3.5vw,42px)] leading-[1.2] text-white mb-4`}>
                <HoverWords text={dict.ctaTitle[locale]} locale={locale} />
                <HoverWords text={dict.ctaAccent[locale]} locale={locale} isGradient={true} />
              </h2>
              
              <p className={`${fcBody} text-sm sm:text-base font-light text-silver/85 mb-8 max-w-[540px] mx-auto leading-relaxed`}>
                <HoverSubcopy text={dict.ctaDesc[locale]} locale={locale} />
              </p>
              
              <Link
                href="/contact/"
                className={`group btn-premium-gold ${fcUi} text-xs font-bold tracking-[0.15em] uppercase inline-flex`}
              >
                {/* Premium animated light sweep */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-25 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <span className="relative z-10 flex items-center gap-2.5">
                  {shared.getInTouch[locale]}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
