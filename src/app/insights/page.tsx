import { Metadata } from "next";
import { cookies } from "next/headers";
import { InsightsClient } from "./InsightsClient";
import { Locale, isRtl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Insights — Kafaah Industrial Solutions",
  description:
    "Technical perspectives on inorganic chemical plant commissioning, operation, and optimization from Kafaah's engineering team.",
};

export default async function InsightsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <InsightsClient />
    </div>
  );
}
