import { Metadata } from "next";
import { ExperienceClient } from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Experience — Inorganic Chemical Plant Track Record",
  description:
    "Kafaah's completed projects and track record in inorganic chemical and fertilizer plant commissioning. Suez SOP Plant, Yanbu Granulation. 20 years of operational expertise.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Track Record
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4">
            Our Experience
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            Our credentials are built in the field. Every project listed here
            represents the standard we hold ourselves to.
          </p>
        </div>
      </section>

      <ExperienceClient />
    </div>
  );
}
