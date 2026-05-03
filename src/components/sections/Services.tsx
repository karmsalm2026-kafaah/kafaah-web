"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/Animations";
import type { ServicesContent } from "@/data/roleContent";

interface Props {
  content?: ServicesContent;
}

export function ServicesSection({ content }: Props) {
  const sectionLabel = content?.sectionLabel ?? "02 — Services";
  const headline = content?.headline ?? "What we ";
  const headlineAccent = content?.headlineAccent ?? "do";
  const bottomTagline = content?.bottomTagline ?? "End-to-end plant lifecycle support";

  /* Filter services by role-specific slugs, or show all if no content */
  const filteredServices = content?.visibleSlugs
    ? services.filter((s) => content.visibleSlugs.includes(s.slug))
    : services;

  return (
    <section className="relative py-28 sm:py-36 bg-navy overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-16">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 lg:mb-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className="font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold">
                  {sectionLabel}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white">
                {headline}<em className="text-gold">{headlineAccent}</em>
              </h2>
            </div>
            <Link
              href="/services/owners-engineer/"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-gold/80 hover:text-gold transition-colors mt-6 sm:mt-0"
            >
              All Services
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </FadeIn>

        {/* Service Cards Grid */}
        <FadeIn delay={0.1}>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${filteredServices.length > 2 ? "lg:grid-cols-3" : ""} gap-[1px] bg-white/[0.04]`}>
            {filteredServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}/`}
                className={`group relative bg-navy-deep p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:bg-navy-card-hover ${
                  svc.featured ? "bg-navy-featured/60" : ""
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 h-[2px] transition-all duration-500 ${
                    svc.featured
                      ? "w-full bg-gradient-to-r from-gold to-gold-light"
                      : "w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full"
                  }`}
                />

                <span className="font-[family-name:var(--font-display)] text-[24px] font-medium tracking-widest text-gold/80 mb-6 block">
                  {svc.num}
                </span>

                {svc.badge && (
                  <span className="inline-flex items-center font-[family-name:var(--font-ui)] text-[9px] font-bold tracking-[0.15em] uppercase bg-gold/10 text-gold border border-gold/25 px-3 py-1 mb-5">
                    {svc.badge}
                  </span>
                )}

                <h3 className="font-[family-name:var(--font-display)] text-[22px] text-white leading-[1.25] mb-3 group-hover:text-gold transition-colors duration-300">
                  {svc.title}
                </h3>

                <p className="text-[14px] font-light text-silver/80 leading-[1.75] mb-8">
                  {svc.shortDesc}
                </p>

                <span className="inline-flex items-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.12em] uppercase text-silver/80 group-hover:text-gold transition-colors duration-300">
                  Explore service
                  <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Bottom accent */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-10 h-[2px] bg-gold" />
          <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-gold/80">
            {bottomTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
