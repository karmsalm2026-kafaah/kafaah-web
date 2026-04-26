"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { FadeIn } from "@/components/Animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-navy-deep">
      {/* Image Background with authoritative overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" />
          <img 
            src="/hero-bg.webp" 
            alt="Engineering Team" 
          className="w-full h-full object-fill object-right lg:object-center opacity-100 mix-blend-luminosity"
          />
        </picture>
        {/* Stronger Authoritative Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 sm:via-navy-deep/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 sm:via-navy-deep/40 via-transparent to-navy-deep" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-8 sm:pt-36 sm:pb-16">

        {/* Eyebrow with gold line */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-8 md:mb-14">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className="font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold">
              Independent Specialists · Egypt &amp; Gulf
            </span>
          </div>
        </FadeIn>

        {/* Headline – 3 lines, typographic drama */}
        <FadeIn delay={0.12}>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(44px,7.5vw,110px)] leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 max-w-[850px]">
            <span className="text-white">Engineering</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
              certainty
            </span>
            <br />
            <span className="text-silver/70">for critical plants.</span>
          </h1>
        </FadeIn>

        {/* Sub copy - Increased brightness for readability */}
        <FadeIn delay={0.24}>
          <p className="text-base sm:text-lg md:text-[19px] text-silver/90 max-w-[520px] leading-[1.85] mb-8 sm:mb-12 font-medium">
            Direct expertise in H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP
            — from feasibility studies to full-scale commissioning.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.36}>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            <Link
              href="/services/owners-engineer/"
              className="group relative inline-flex items-center justify-center gap-3 font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] uppercase text-navy-deep w-full sm:w-[220px] py-3.5 sm:py-4 bg-gold hover:bg-gold-light transition-all duration-300 overflow-hidden"
            >
              {/* Light sweep on hover */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <span className="relative z-10">Explore Services</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/experience/"
              className="group inline-flex items-center justify-center gap-3 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-silver/80 w-full sm:w-[220px] py-3.5 sm:py-4 border border-white/30 hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm bg-white/[0.02]"
            >
              <span>Our Track Record</span>
              <FileText className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <FadeIn delay={0.48} y={0}>
        <div className="relative z-10 border-t border-white/[0.12] bg-navy-deep/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { num: "20+", label: "Years of Operation" },
                { num: "6", label: "Core Technologies" },
                { num: "7", label: "Service Verticals" },
                { num: "100%", label: "Independent" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-5 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8 group cursor-default border-white/[0.12] ${
                    i === 1 || i === 3 ? "border-l" : ""
                  } ${i === 2 ? "max-md:border-l-0 md:border-l" : ""} ${
                    i < 2 ? "border-b md:border-b-0" : ""
                  }`}
                >
                  <div className="font-[family-name:var(--font-display)] text-2xl md:text-[32px] text-white mb-1.5 group-hover:text-gold transition-colors duration-300">
                    {stat.num}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-silver/50 tracking-[0.1em] uppercase font-[family-name:var(--font-ui)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Removed Scroll indicator as requested */}
    </section>
  );
}
