import { Metadata } from "next";
import { cookies } from "next/headers";
import { InsightsClient } from "./InsightsClient";
import { Locale, isRtl, getFontClass, insightsPage as dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Insights — Kafaah Industrial Solutions",
  description:
    "Technical perspectives on inorganic chemical plant commissioning, operation, and optimization from Kafaah's engineering team.",
};

export default async function InsightsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="pt-[68px]">
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line`}>
            {dict.knowledge[locale]}
          </div>
          <h1 className={`${fcDisplay} text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4`}>
            {dict.pageTitle[locale]}
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            {dict.subtitle[locale]}
          </p>
        </div>
      </section>

      <InsightsClient />
    </div>
  );
}
