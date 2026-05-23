import { Metadata } from "next";
import { cookies } from "next/headers";
import { ServicesClient } from "./ServicesClient";
import { Locale, isRtl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our Services — Across the Full Project Lifecycle",
  description:
    "Kafaah supports both project owners and EPC contractors across every phase where industrial projects succeed or fail — from early design through commissioning, startup, and performance optimization.",
};

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <ServicesClient />
    </div>
  );
}
