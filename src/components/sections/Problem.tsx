"use client";

import { FadeIn } from "@/components/Animations";
import { AlertTriangle, TrendingDown, Clock, ShieldAlert } from "lucide-react";

const painPoints = [
  {
    icon: TrendingDown,
    stat: "40%",
    label: "Yield Loss",
    desc: "Average performance gap in first-year operations without specialist commissioning.",
  },
  {
    icon: Clock,
    stat: "6–18 mo",
    label: "Delayed Ramp-up",
    desc: "Typical time lost when commissioning teams lack plant-specific operational depth.",
  },
  {
    icon: ShieldAlert,
    stat: "3×",
    label: "Unplanned Shutdowns",
    desc: "More frequent in plants commissioned by EPC generalists vs. process specialists.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-navy-deep overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-16">
        {/* Section Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
            <span className="font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold">
              01 — The Problem
            </span>
          </div>
        </FadeIn>

        {/* Main Statement */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-start mb-20">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(26px,3.5vw,42px)] leading-[1.2] text-white mb-6">
                Most plant failures{" "}
                <span className="text-gold italic">aren&apos;t</span>{" "}
                engineering failures.
              </h2>
              <p className="font-[family-name:var(--font-display)] text-[clamp(18px,2vw,24px)] leading-[1.5] text-cloud/70 italic">
                They&apos;re commissioning failures — the gap between what was designed
                and what actually runs.
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-silver/80 font-light text-[16px] leading-[1.85]">
                A plant is only as reliable as the people who commissioned it. The
                commissioning phase is where years of engineering design get
                translated into real operations — and where most critical
                decisions are made under pressure, in real time.
              </p>
              <p className="text-silver/80 font-light text-[16px] leading-[1.85]">
                EPC companies manage projects. They do not manage operations. When
                a plant underperforms — low yield, quality deviation, unplanned
                downtime — the EPC has already left.
              </p>
              <p className="text-silver/80 font-light text-[16px] leading-[1.85]">
                Kafaah exists to bridge that gap. We bring{" "}
                <strong className="text-white font-medium">
                  20 years of direct operational experience
                </strong>{" "}
                inside inorganic chemical and fertilizer plants — not consulting
                experience, <em className="text-gold/90">operational experience</em>.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Pain Point Cards */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="group relative bg-navy-card/60 border border-white/[0.06] p-8 transition-all duration-500 hover:border-gold/30 hover:bg-navy-card-hover/80"
              >
                {/* Top gold accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/20 bg-gold/[0.06] group-hover:bg-gold/[0.12] transition-colors duration-300">
                    <point.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-[32px] leading-none text-white">
                    {point.stat}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-3">
                  {point.label}
                </h3>

                <p className="text-silver/60 text-[14px] leading-[1.7] font-light">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom Tagline */}
        <FadeIn delay={0.35}>
          <div className="mt-16 flex items-center gap-4">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-gold/80">
              We don&apos;t consult — we operate.
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
