"use client";

import { FadeIn } from "@/components/Animations";
import type { InsightContent } from "@/data/roleContent";

interface Props {
  content?: InsightContent;
}

export function InsightBanner({ content }: Props) {
  const quote = content?.quote ?? "We measure before and after — results are not estimated, they are documented.";
  const attribution = content?.attribution ?? "— Kafaah — Production Optimization";

  return (
    <section className="relative py-24 sm:py-28 bg-navy overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/[0.03] rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <FadeIn>
        <div className="relative container mx-auto px-6 sm:px-8 lg:px-16 text-center">
          {/* Decorative quotes */}
          <div className="font-[family-name:var(--font-display)] text-[80px] sm:text-[120px] leading-none text-gold/[0.08] select-none mb-[-40px] sm:mb-[-60px]">
            &ldquo;
          </div>

          <p className="font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,40px)] leading-[1.35] text-white italic max-w-[800px] mx-auto mb-8">
            {quote}
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-gold/40" />
            <span className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] uppercase text-gold/80">
              {attribution}
            </span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
