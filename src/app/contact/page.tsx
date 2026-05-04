import { Metadata } from "next";
import { cookies } from "next/headers";
import { ContactClient } from "./ContactClient";
import { Locale, isRtl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact — Kafaah Industrial Solutions",
  description:
    "Get in touch with Kafaah Industrial Solutions. We respond to all inquiries within 24 hours. Based in Cairo, Egypt, serving the MENA region.",
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("kafaah_locale")?.value || "en") as Locale;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="pt-[68px]">
      <ContactClient />
    </div>
  );
}
