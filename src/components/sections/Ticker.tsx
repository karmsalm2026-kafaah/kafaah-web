import React from "react";

export function Ticker() {
  const items = [
    { formula: "H₂SO₄", name: "Sulfuric Acid" },
    { formula: "H₃PO₄", name: "Phosphoric Acid" },
    { formula: "K₂SO₄", name: "Sulfate of Potash" },
    { formula: "NPK", name: "Nitrogen Phosphorus Potassium" },
    { formula: "MgSO₄", name: "Magnesium Sulphate" },
    { formula: "SSP", name: "Single Superphosphate" },
  ];

  return (
    <div className="bg-navy-deep border-y border-white/[0.04] overflow-hidden h-14 flex items-center relative z-10">
      {/* Subtle background noise */}
      <div className="absolute inset-0 hero-noise opacity-30 pointer-events-none" />

      {/* Label */}
      <div className="hidden md:flex font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] uppercase text-gold bg-navy-deep px-8 h-full items-center shrink-0 border-r border-white/[0.04] relative z-20 shadow-[8px_0_16px_rgba(4,12,24,0.6)]">
        Technologies
      </div>

      {/* Ticker Container with gradient masks for smooth fade in/out */}
      <div className="overflow-hidden flex-1 flex relative w-full h-full items-center ticker-mask">
        <div className="ticker-track flex gap-8 items-center w-max will-change-transform">
          {[...Array(4)].map((_, arrayIndex) => (
            <React.Fragment key={arrayIndex}>
              {items.map((item, i) => (
                <div
                  key={`${arrayIndex}-${i}`}
                  className="group font-[family-name:var(--font-ui)] text-xs font-medium tracking-[0.05em] text-white/90 whitespace-nowrap flex items-center gap-4 transition-all hover:text-white cursor-default"
                >
                  <div className="flex items-center justify-center h-8 px-4 rounded-sm bg-gold/10 border border-gold/30 shadow-[0_0_15px_rgba(232,146,10,0.1)] transition-all group-hover:border-gold/50 group-hover:bg-gold/20 group-hover:shadow-[0_0_20px_rgba(232,146,10,0.2)]">
                    <span className="text-gold-light text-[12px] font-bold tracking-widest">{item.formula}</span>
                  </div>
                  <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.15em] font-bold">{item.name}</span>

                  {/* Separator dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40 ml-4 transition-all group-hover:bg-gold group-hover:scale-125 shadow-[0_0_8px_rgba(232,146,10,0.5)]" aria-hidden="true" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
