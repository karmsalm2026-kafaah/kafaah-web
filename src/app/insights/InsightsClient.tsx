"use client";

import { FadeIn } from "@/components/Animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function InsightsClient() {
  const articles = [
    {
      id: "1",
      title: "Why EPC Handover is the Most Critical Phase of Your Plant",
      category: "Commissioning",
      date: "April 2026",
      excerpt:
        "The gap between 'mechanically complete' and 'operationally viable' is where most investors lose money. How an Owner's Engineer bridges this gap.",
    },
    {
      id: "2",
      title: "Common Pitfalls in Mannheim Furnace Refractory Curing",
      category: "Technical Troubleshooting",
      date: "March 2026",
      excerpt:
        "Incorrect curing of the SOP furnace refractory leads to premature failure and costly downtime. We review the standard procedure and where it usually goes wrong.",
    },
    {
      id: "3",
      title: "Optimizing NPK Granulation for High Ambient Humidity",
      category: "Production Optimization",
      date: "February 2026",
      excerpt:
        "Operating a granulation plant in the Gulf or Red Sea coast requires specific operational adjustments to maintain product quality and avoid caking.",
    },
  ];

  return (
    <>
      <section className="py-20 bg-navy">
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-navy-card border border-divider hover:border-gold transition-colors flex flex-col h-full cursor-pointer group"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-[family-name:var(--font-ui)] text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-1">
                        {article.category}
                      </span>
                      <span className="font-[family-name:var(--font-ui)] text-[10px] text-muted uppercase tracking-[0.1em]">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] text-[22px] text-cloud leading-[1.3] mb-4 group-hover:text-gold transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[14px] font-light text-silver leading-[1.7]">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="p-8 pt-0 mt-auto">
                    <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.1em] uppercase text-muted flex items-center gap-2 group-hover:text-gold transition-colors">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center border-t border-divider pt-16">
               <p className="text-silver font-light mb-6 text-[16px]">
                  More insights and technical whitepapers are currently being compiled from our recent site work.
               </p>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4">
              Have a specific <em className="text-gold-light">technical issue?</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              Discuss your plant&apos;s challenges directly with our engineering team.
            </p>
            <Link
              href="/contact/"
              className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.12em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-colors inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
