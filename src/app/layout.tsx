import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Syne, Cairo, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-chinese",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Kafaah Industrial Solutions — Chemical Plant Commissioning & Operations | Cairo, Egypt",
    template: "%s | Kafaah Industrial Solutions",
  },
  description:
    "Independent specialists in inorganic chemical and fertilizer plant commissioning, startup, troubleshooting, and performance optimization. 20 years of direct operational expertise across H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants.",
  keywords: [
    "chemical plant commissioning",
    "fertilizer plant consultant",
    "industrial plant operations",
    "owner's engineer",
    "sulfuric acid plant",
    "phosphoric acid plant",
    "SOP plant commissioning",
    "Egypt",
    "MENA",
  ],
  metadataBase: new URL("https://kafaahsolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kafaah Industrial Solutions",
  },
  icons: {
    icon: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${syne.variable} ${cairo.variable} ${notoSerifSC.variable} bg-navy`}
    >
      <body className="bg-navy text-silver antialiased min-h-screen flex flex-col">
        <LayoutShell>{children}</LayoutShell>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kafaah Industrial Solutions",
              url: "https://kafaahsolutions.com",
              logo: "https://kafaahsolutions.com/logo1.webp",
              description:
                "Independent specialists in inorganic chemical and fertilizer plant commissioning, startup, troubleshooting, and performance optimization.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cairo",
                addressCountry: "EG",
              },
              areaServed: ["Egypt", "Saudi Arabia", "UAE", "Kuwait", "Jordan", "MENA"],
              knowsAbout: [
                "Chemical Plant Commissioning",
                "Sulfuric Acid Plants",
                "Phosphoric Acid Plants",
                "Sulfate of Potash Plants",
                "NPK Fertilizer Plants",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
