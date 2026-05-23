import { Metadata } from "next";
import { cookies } from "next/headers";
import { TechnologiesClient } from "./TechnologiesClient";
import { Locale, isRtl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Industrial Chemical Technologies — Kafaah Industrial Solutions",
  description:
    "Explore our core technical capabilities across Sulfuric Acid, Phosphoric Acid, Sulfate of Potash (SOP), NPK fertilizers, Magnesium Sulphate, and Single Superphosphate plants. Backed by decades of real-world operations.",
};

export default async function TechnologiesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <TechnologiesClient />
    </div>
  );
}
