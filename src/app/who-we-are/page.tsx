import { Metadata } from "next";
import { cookies } from "next/headers";
import { WhoWeAreClient } from "./WhoWeAreClient";
import { Locale, isRtl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Who We Are — Independent Chemical Plant Specialists",
  description:
    "Kafaah Industrial Solutions is an independent group of specialists in inorganic chemical and fertilizer plant operations. 20 years of direct operational expertise across H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants.",
};

export default async function WhoWeArePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <WhoWeAreClient />
    </div>
  );
}
