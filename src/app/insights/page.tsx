import { Metadata } from "next";
import { InsightsClient } from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights — Kafaah Industrial Solutions",
  description:
    "Technical perspectives on inorganic chemical plant commissioning, operation, and optimization from Kafaah's engineering team.",
};

export default function InsightsPage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Knowledge
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4">
            Insights
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            Technical perspectives on commissioning, operation, and optimization
            — drawn directly from the field.
          </p>
        </div>
      </section>

      <InsightsClient />
    </div>
  );
}
