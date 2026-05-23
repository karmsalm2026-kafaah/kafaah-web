import { Metadata } from "next";
import { cookies } from "next/headers";
import { WhoWeAreClient } from "./WhoWeAreClient";
import { Locale, getFontClass, isRtl, whoWeAre as dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Who We Are — Independent Chemical Plant Specialists",
  description:
    "Kafaah Industrial Solutions is an independent group of specialists in inorganic chemical and fertilizer plant operations. 20 years of direct operational expertise across Egypt and the Gulf.",
};

export default async function WhoWeArePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        <div
          className={`absolute ${rtl ? "left-[-40px]" : "right-[-40px]"} top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(100px,18vw,260px)] text-navy-mid/15 leading-none pointer-events-none select-none`}
          aria-hidden="true"
        >
          K
        </div>
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            {dict.heroEyebrow[locale]}
          </div>
          <h1 className={`${fcDisplay} text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4`}>
            {dict.heroTitle[locale]}
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            {dict.heroSub[locale]}
          </p>
        </div>
      </section>

      <WhoWeAreClient />
    </div>
  );
}
