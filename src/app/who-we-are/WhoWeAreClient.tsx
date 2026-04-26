"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";

export function WhoWeAreClient() {
  return (
    <>
      {/* Positioning */}
      <section className="py-20 bg-navy">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <p className="font-[family-name:var(--font-display)] text-[clamp(22px,3vw,34px)] leading-[1.35] text-cloud italic mb-8">
              Kafaah Industrial Solutions is an independent Egyptian-founded
              consultancy specializing in inorganic chemical and fertilizer plant
              commissioning, startup, troubleshooting, and performance
              optimization.
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              We bring 20 years of direct operational expertise across H₂SO₄,
              H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants. Our team has not only
              consulted on these plants — we have operated them. We have managed
              startups, resolved production crises, optimized yields, and trained
              the operators who run these facilities every day.
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              The word <strong className="text-cloud font-medium">Kafaah</strong>{" "}
              (كفاءة) means competence in Arabic. It is not a marketing name — it
              is our standard. Every engagement we accept must meet it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              What Makes Us Different
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-divider">
              {[
                {
                  title: "Independent",
                  desc: "We have no relationships with EPC contractors, equipment vendors, or technology licensors. Our only obligation is to you.",
                },
                {
                  title: "Operational",
                  desc: "We have run these plants. When we troubleshoot, we draw on real experience — not theoretical knowledge.",
                },
                {
                  title: "Chemical-Specific",
                  desc: "We specialize in inorganic acids and specialty fertilizers. We do not try to cover every industry.",
                },
                {
                  title: "Results-Documented",
                  desc: "We measure before and after. Our recommendations are backed by data, and our results are documented.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-navy-card p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Domain */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Our Domain
            </div>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-8">
              We work exclusively in the inorganic chemical and fertilizer space.
              Our domain covers:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-divider">
              {[
                { formula: "H₂SO₄", name: "Sulfuric Acid" },
                { formula: "H₃PO₄", name: "Phosphoric Acid" },
                { formula: "K₂SO₄", name: "Sulfate of Potash" },
                { formula: "NPK", name: "NPK Fertilizers" },
                { formula: "MgSO₄", name: "Magnesium Sulphate" },
                { formula: "SSP", name: "Single Superphosphate" },
              ].map((tech) => (
                <div key={tech.formula} className="bg-navy-card p-6 text-center">
                  <div className="font-[family-name:var(--font-display)] text-3xl text-navy-soft/60 mb-2">
                    {tech.formula}
                  </div>
                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase text-cloud">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Where We Work
            </div>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              Kafaah is based in Cairo, Egypt. Our work spans the MENA region —
              from industrial zones in Egypt (Cairo, Suez) to Saudi Arabia
              (Yanbu Industrial City) and the broader Gulf.
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8]">
              We provide on-site services wherever the plant is located, with
              remote advisory and documentation review available between site
              visits.
            </p>
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
              Whether you are building, operating, or investing — we bring 20
              years of direct experience to your problem.
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
