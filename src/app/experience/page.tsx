import { Metadata } from "next";
import { cookies } from "next/headers";
import { ExperienceClient } from "./ExperienceClient";
import { Locale, getFontClass, isRtl, experiencePage as dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Experience — Inorganic Chemical Plant Track Record",
  description:
    "Kafaah's completed projects and track record in inorganic chemical and fertilizer plant commissioning. Suez SOP Plant, Yanbu Granulation. 20 years of operational expertise.",
};

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            {dict.pageTitle[locale]}
          </div>
          <h1 className={`${fcDisplay} text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4`}>
            {dict.pageTitle[locale]}
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            {dict.background[locale]}
          </p>
        </div>
      </section>

      <ExperienceClient />
    </div>
  );
}
