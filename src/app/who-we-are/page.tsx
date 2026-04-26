import { Metadata } from "next";
import { WhoWeAreClient } from "./WhoWeAreClient";

export const metadata: Metadata = {
  title: "Who We Are — Independent Chemical Plant Specialists",
  description:
    "Kafaah Industrial Solutions is an independent group of specialists in inorganic chemical and fertilizer plant operations. 20 years of direct operational expertise across Egypt and the Gulf.",
};

export default function WhoWeArePage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(100px,18vw,260px)] text-navy-mid/15 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          K
        </div>
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            About
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4">
            Who We Are
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            An independent group of specialists — not project managers, not EPC
            subcontractors. Engineers who have operated these plants themselves.
          </p>
        </div>
      </section>

      <WhoWeAreClient />
    </div>
  );
}
