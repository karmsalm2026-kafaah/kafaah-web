export function GeographySection() {
  const locations = [
    "Egypt",
    "Saudi Arabia",
    "UAE",
    "Kuwait",
    "Jordan",
    "MENA Region",
  ];

  return (
    <div className="bg-navy-deep py-12 border-b border-white/[0.04]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-6 md:gap-12 flex-wrap">
        <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold/70 shrink-0">
          Geographic Reach
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-y-4">
          {locations.map((loc) => (
            <div
              key={loc}
              className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.15em] uppercase text-silver/60 px-5 md:px-7 border-r border-white/[0.06] last:border-r-0 hover:text-white transition-colors cursor-default"
            >
              {loc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
