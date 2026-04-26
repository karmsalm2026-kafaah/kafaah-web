"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";

export function ExperienceClient() {
  return (
    <>
      {/* Completed Projects */}
      <section className="py-20 bg-navy">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Completed Projects
            </div>
          </FadeIn>

          {/* Project 1 */}
          <FadeIn delay={0.1}>
            <div className="bg-navy-card border border-divider p-8 lg:p-10 mb-6 border-l-[3px] border-l-gold">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-[family-name:var(--font-ui)] text-[9px] font-bold tracking-[0.15em] uppercase bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5">
                  Commissioning & Startup
                </span>
                <span className="text-sm font-light text-muted">
                  November 2025 – January 2026
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] text-cloud leading-tight mb-2">
                Suez SOP Plant
              </h3>
              <div className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.08em] text-gold mb-4">
                K₂SO₄ · Mannheim Process · Chinese EPC
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-divider my-6">
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Location</div>
                  <div className="text-sm text-cloud">Suez, Egypt</div>
                </div>
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Capacity</div>
                  <div className="text-sm text-cloud">40,000 T/yr</div>
                </div>
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Outcome</div>
                  <div className="text-sm text-cloud">First product achieved</div>
                </div>
              </div>
              <p className="text-sm font-light text-silver leading-relaxed">
                Full commissioning from pre-startup to first product. Managed refractory curing, furnace first fire, HCl system startup, and product quality optimization. Both EPC contractor and plant owner expressed satisfaction with Kafaah&apos;s work.
              </p>
            </div>
          </FadeIn>

          {/* Project 2 */}
          <FadeIn delay={0.2}>
            <div className="bg-navy-card border border-divider p-8 lg:p-10 mb-6 border-l-[3px] border-l-gold">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-[family-name:var(--font-ui)] text-[9px] font-bold tracking-[0.15em] uppercase bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5">
                  Granulation & Startup
                </span>
                <span className="text-sm font-light text-muted">
                  March 2026
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-[28px] text-cloud leading-tight mb-2">
                Yanbu Granulation Facility
              </h3>
              <div className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.08em] text-gold mb-4">
                NPK · Granulation · Saudi Arabia
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-divider my-6">
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Location</div>
                  <div className="text-sm text-cloud">Yanbu Industrial City, KSA</div>
                </div>
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Milestone</div>
                  <div className="text-sm text-cloud">First GCC project</div>
                </div>
                <div className="bg-navy p-4">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1">Outcome</div>
                  <div className="text-sm text-cloud">On-schedule commissioning</div>
                </div>
              </div>
              <p className="text-sm font-light text-silver leading-relaxed">
                Kafaah&apos;s first project in the Gulf region. NPK granulation unit commissioned on schedule, establishing our presence in the Saudi industrial market.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Background Experience */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Background
            </div>
            <p className="font-[family-name:var(--font-display)] text-[clamp(20px,2.5vw,28px)] text-cloud leading-[1.4] italic mb-6">
              Beyond completed contracts, our team brings 20 years of direct
              operational experience across inorganic chemical and fertilizer
              facilities in Egypt and the region.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Technologies Covered
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-divider">
              {[
                { formula: "H₂SO₄", name: "Sulfuric Acid", check: true },
                { formula: "H₃PO₄", name: "Phosphoric Acid", check: true },
                { formula: "K₂SO₄", name: "Sulfate of Potash", check: true },
                { formula: "NPK", name: "NPK Fertilizers", check: true },
                { formula: "MgSO₄", name: "Magnesium Sulphate", check: true },
                { formula: "SSP", name: "Single Superphosphate", check: true },
              ].map((tech) => (
                <div key={tech.formula} className="bg-navy-card p-6 flex items-center gap-3">
                  <span className="text-gold text-lg">✓</span>
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-lg text-cloud">
                      {tech.formula}
                    </div>
                    <div className="text-xs text-muted">{tech.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Geographic Footprint
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Egypt (Cairo, Suez)",
                "Saudi Arabia (Yanbu)",
                "Expanding MENA",
              ].map((loc) => (
                <span
                  key={loc}
                  className="font-[family-name:var(--font-ui)] text-xs font-semibold tracking-[0.08em] uppercase text-silver bg-navy border border-divider px-5 py-2.5"
                >
                  {loc}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4">
              How can we <em className="text-gold-light">help you?</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              Discuss your project with our team.
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
