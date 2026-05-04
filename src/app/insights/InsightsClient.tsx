"use client";

import { FadeIn } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/lib/RoleContext";
import { insightsPage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

export function InsightsClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");

  return (
    <>
      <section className="py-20 bg-navy">
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dict.articles[locale].map((article: any) => (
                <div
                  key={article.id}
                  className="bg-navy-card border border-divider hover:border-gold transition-colors flex flex-col h-full cursor-pointer group"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-1`}>
                        {article.category}
                      </span>
                      <span className={`${fcUi} text-[10px] text-muted uppercase tracking-[0.1em]`} dir="ltr">
                        {article.date}
                      </span>
                    </div>
                    <h2 className={`${fcDisplay} text-[22px] text-cloud leading-[1.3] mb-4 group-hover:text-gold transition-colors`}>
                      {article.title}
                    </h2>
                    <p className="text-[14px] font-light text-silver leading-[1.7]">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="p-8 pt-0 mt-auto">
                    <span className={`${fcUi} text-[11px] font-semibold tracking-[0.1em] uppercase text-muted flex items-center gap-2 group-hover:text-gold transition-colors`}>
                      <span className={`flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                        {dict.readArticle[locale]} <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "rotate-180" : ""}`} />
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center border-t border-divider pt-16">
               <p className="text-silver font-light mb-6 text-[16px]">
                  {dict.moreInsights[locale]}
               </p>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className={`${fcDisplay} text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4`}>
              {dict.ctaTitle[locale]}<em className="text-gold-light not-italic">{dict.ctaAccent[locale]}</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              {dict.ctaDesc[locale]}
            </p>
            <Link
              href="/contact/"
              className={`${fcUi} text-xs font-bold tracking-[0.12em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-colors inline-flex items-center gap-2`}
            >
              <span className={`relative z-10 flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                {shared.getInTouch[locale]}
                <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "rotate-180" : ""}`} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
