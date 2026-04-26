import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Kafaah Industrial Solutions",
  description:
    "Get in touch with Kafaah Industrial Solutions. We respond to all inquiries within 24 hours. Based in Cairo, Egypt, serving the MENA region.",
};

export default function ContactPage() {
  return (
    <div className="pt-[68px]">
      <ContactClient />
    </div>
  );
}
