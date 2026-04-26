"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";

export function TrackRecordSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: Projects */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
                <span className="font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold">
                  04 — Experience
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,44px)] leading-[1.1] text-white mb-10">
                Selected <em className="text-gold">Projects</em>
              </h2>

              <div className="flex flex-col gap-[1px] bg-white/[0.04]">
                {/* Project 1 */}
                <div className="group relative bg-navy p-8 transition-all duration-500 hover:bg-navy-card-hover">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-navy-soft group-hover:bg-gold transition-colors duration-500" />
                  <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] uppercase text-silver/70 mb-3 block">
                    Commissioning &amp; Startup · Nov 2025 – Jan 2026
                  </span>
                  <div className="font-[family-name:var(--font-display)] text-[22px] text-white leading-[1.2] mb-2 group-hover:text-gold transition-colors duration-300">
                    Suez SOP Plant
                  </div>
                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.1em] text-gold">
                    K₂SO₄ · Mannheim Process · Chinese EPC
                  </div>
                  <div className="flex gap-6 mt-5 text-[12px] font-light text-silver/90 uppercase tracking-[0.05em]">
                    <span className="flex items-center gap-1.5">📍 Suez, Egypt</span>
                    <span className="flex items-center gap-1.5">⚙ 40,000 T/yr</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="group relative bg-navy p-8 transition-all duration-500 hover:bg-navy-card-hover">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-navy-soft group-hover:bg-gold transition-colors duration-500" />
                  <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] uppercase text-silver/70 mb-3 block">
                    Granulation &amp; Startup · March 2026
                  </span>
                  <div className="font-[family-name:var(--font-display)] text-[22px] text-white leading-[1.2] mb-2 group-hover:text-gold transition-colors duration-300">
                    Yanbu Granulation Facility
                  </div>
                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.1em] text-gold">
                    NPK · Granulation · Saudi Arabia
                  </div>
                  <div className="flex gap-6 mt-5 text-[12px] font-light text-silver/90 uppercase tracking-[0.05em]">
                    <span className="flex items-center gap-1.5">📍 Yanbu, KSA</span>
                  </div>
                </div>
              </div>

              <Link
                href="/experience/"
                className="group inline-flex items-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-gold/80 hover:text-gold transition-colors mt-8"
              >
                Full track record
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>

          {/* Right: Statement + Disciplines */}
          <FadeIn delay={0.15}>
            <div className="pt-0 lg:pt-8">
              <p className="font-[family-name:var(--font-display)] text-[clamp(20px,2.5vw,30px)] text-white/90 leading-[1.4] mb-8 italic">
                &ldquo;We are an independent group of specialists — not project
                managers, not EPC subcontractors. Engineers who have operated
                these plants themselves.&rdquo;
              </p>
              <p className="text-[15px] font-light text-silver/90 leading-[1.8] mb-10">
                Our work spans Egypt, the Gulf, and MENA — serving EPC
                companies, plant investors, and operating facilities across the
                full life of an inorganic chemical plant.
              </p>

              <div className="flex flex-col border border-white/[0.06]">
                {[
                  {
                    label: "Process",
                    desc: "Process engineering, commissioning, optimization",
                  },
                  {
                    label: "Mechanical",
                    desc: "Equipment selection, FAT attendance, maintenance",
                  },
                  {
                    label: "Electrical",
                    desc: "Instrumentation, control systems, safety systems",
                  },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="px-6 py-5 border-b border-white/[0.06] last:border-b-0 flex items-center gap-4 text-[14px] text-silver/90 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-gold shrink-0" />
                    <strong className="font-medium text-white min-w-[100px]">
                      {d.label}
                    </strong>
                    {d.desc}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
