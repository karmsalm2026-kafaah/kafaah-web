"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { useRole } from "@/lib/RoleContext";
import { footer, nav, services as svcDict, tech, getFontClass, isRtl } from "@/lib/i18n";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const { locale } = useRole();
  const fc = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";
  const isAr = locale === "ar";

  const companyLinks = [
    { href: "/who-we-are/", label: nav.whoWeAre[locale] },
    { href: "/experience/", label: nav.experience[locale] },
    { href: "/insights/", label: nav.insights[locale] },
    { href: "/contact/", label: nav.getInTouch[locale] },
  ];

  const ownerServices = services.filter(s => s.audience === "owner");
  const bothServices = services.filter(s => s.audience === "both");
  const epcServices = services.filter(s => s.audience === "epc");

  return (
    <footer dir={rtl ? "rtl" : "ltr"} className="relative bg-navy-deep overflow-hidden border-t border-white/[0.08]">
      {/* Background Enhancements */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-start gap-8 mb-8">
          
          {/* Brand & Contact (Column 1) */}
          <div className="w-full lg:max-w-[340px] flex flex-col items-start text-justify">
            <Link href="/" className="inline-block mb-3 group">
              <Image
                src="/logo1.webp"
                alt="Kafaah Industrial Solutions"
                width={180}
                height={76}
                className="h-[44px] w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]"
              />
            </Link>
            <p className={`${fc} ${isAr ? "text-[15px] leading-[1.8]" : "text-[14px] leading-[1.6]"} font-light text-silver/70 mb-2.5 w-full text-justify`}>
              {footer.brandDesc[locale]}
            </p>

            {/* Contact Info (Address & Phone side-by-side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 w-full text-start">
              {/* Address Card */}
              <div className="bg-white/[0.02] border border-white/[0.08] hover:border-gold/30 hover:bg-gold/[0.02] rounded-md p-3 transition-all duration-300 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="min-w-0">
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[8px] tracking-[0.15em] uppercase" : fc + " text-[10px]"} text-silver/50 mb-0.5`}>
                    {footer.address ? footer.address[locale] : "Office Address"}
                  </h5>
                  <a 
                    href="https://maps.google.com/?q=Cairo,Egypt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${fc} text-[11px] text-white/90 hover:text-gold transition-colors block truncate`}
                  >
                    {footer.location ? footer.location[locale] : "Cairo, Egypt"}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white/[0.02] border border-white/[0.08] hover:border-gold/30 hover:bg-gold/[0.02] rounded-md p-3 transition-all duration-300 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="min-w-0">
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[8px] tracking-[0.15em] uppercase" : fc + " text-[10px]"} text-silver/50 mb-0.5`}>
                    {footer.phone ? footer.phone[locale] : "Phone"}
                  </h5>
                  <a href="tel:+201018081191" className={`${fc} text-[11px] text-white/90 hover:text-gold transition-colors block truncate`} dir="ltr">
                    +20 10 18081191
                  </a>
                </div>
              </div>
            </div>

            {/* Follow Us (Social Media) */}
            <div className="pt-1.5 flex flex-col items-start gap-2 w-full text-start">
              <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[9px] tracking-[0.15em] uppercase" : fc + " text-[11px]"} text-silver/50`}>
                {footer.socialMedia ? footer.socialMedia[locale] : "Follow Us"}
              </h5>
              <div className="flex items-center justify-start gap-2">
                <a href="https://wa.me/201018081191" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-[#0077B5] hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>
                <a href="#" aria-label="X" className="w-9 h-9 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Services (Column 2) */}
          <div className="w-full lg:max-w-[260px] flex flex-col items-start text-start">
            <h4 className={`${fc} ${isEn ? "text-[10.5px] tracking-[0.2em] uppercase" : "text-[13px]"} font-bold text-gold mb-2.5 flex items-center gap-2.5 w-full`}>
              <span className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              <span>{footer.services[locale]}</span>
              <div className="flex-grow flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/70 shrink-0" />
                <span className="flex-grow h-[1px] bg-gradient-to-r from-gold/40 to-transparent rtl:bg-gradient-to-l" />
              </div>
            </h4>
            <div className="flex flex-col gap-1.5 mb-2.5 w-full">
              <Link
                href="/services/"
                className="flex items-center justify-center h-8 text-[10px] font-bold font-[family-name:var(--font-ui)] bg-navy-card/45 border border-white/[0.08] hover:border-gold/50 hover:bg-gold/5 text-white/85 hover:text-gold rounded-sm transition-all duration-300 text-center px-4"
              >
                {locale === "ar" ? "خدمات الملاك والمشغلين" : locale === "zh" ? "业主与运营商服务" : "Plant Owners & Operators"}
              </Link>
              <Link
                href="/services/"
                className="flex items-center justify-center h-8 text-[10px] font-bold font-[family-name:var(--font-ui)] bg-navy-card/45 border border-white/[0.08] hover:border-gold/50 hover:bg-gold/5 text-white/85 hover:text-gold rounded-sm transition-all duration-300 text-center px-4"
              >
                {locale === "ar" ? "خدمات مقاولي EPC" : locale === "zh" ? "EPC 承包商服务" : "EPC Contractor Services"}
              </Link>
            </div>
            <div className="pt-1 w-full text-start">
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-[10px] font-bold tracking-wider transition-all duration-300 uppercase font-[family-name:var(--font-ui)] group"
              >
                <span>{footer.exploreServices[locale]}</span>
                <span className={`transition-transform duration-300 ${rtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>→</span>
              </Link>
            </div>
          </div>

          {/* Technologies (Column 3) */}
          <div className="w-full lg:max-w-[260px] flex flex-col items-start text-start">
            <h4 className={`${fc} ${isEn ? "text-[10.5px] tracking-[0.2em] uppercase" : "text-[13px]"} font-bold text-gold mb-2.5 flex items-center gap-2.5 w-full`}>
              <span className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              <span>{footer.technologies[locale]}</span>
              <div className="flex-grow flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/70 shrink-0" />
                <span className="flex-grow h-[1px] bg-gradient-to-r from-gold/40 to-transparent rtl:bg-gradient-to-l" />
              </div>
            </h4>
            <div className="grid grid-cols-3 gap-1.5 mb-2.5 w-full">
              {[
                { formula: "H₂SO₄", slug: "sulfuric-acid" },
                { formula: "H₃PO₄", slug: "phosphoric-acid" },
                { formula: "K₂SO₄", slug: "sulfate-of-potash" },
                { formula: "NPK", slug: "npk" },
                { formula: "SSP", slug: "ssp" },
                { formula: "MgSO₄", slug: "magnesium-sulphate" },
              ].map((t) => (
                <Link
                  key={t.formula}
                  href={`/technologies/${t.slug}/`}
                  className="flex items-center justify-center h-8 text-[10px] font-bold font-[family-name:var(--font-ui)] bg-navy-card/45 border border-white/[0.08] hover:border-gold/50 hover:bg-gold/5 text-white/85 hover:text-gold rounded-sm transition-all duration-300"
                >
                  {t.formula}
                </Link>
              ))}
            </div>
            <div className="pt-1 w-full text-start">
              <Link
                href="/technologies/"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-[10px] font-bold tracking-wider transition-all duration-300 uppercase font-[family-name:var(--font-ui)] group"
              >
                <span>{footer.exploreTech[locale]}</span>
                <span className={`transition-transform duration-300 ${rtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>→</span>
              </Link>
            </div>
          </div>

          {/* Company (Column 4) */}
          <div className="w-full lg:max-w-[260px] flex flex-col items-start text-start">
            <h4 className={`${fc} ${isEn ? "text-[10.5px] tracking-[0.2em] uppercase" : "text-[13px]"} font-bold text-gold mb-2.5 flex items-center gap-2.5 w-full`}>
              <span className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              <span>{footer.company[locale]}</span>
              <div className="flex-grow flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/70 shrink-0" />
                <span className="flex-grow h-[1px] bg-gradient-to-r from-gold/40 to-transparent rtl:bg-gradient-to-l" />
              </div>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 mb-3.5 w-full">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 h-8 text-[10px] font-bold font-[family-name:var(--font-ui)] bg-navy-card/45 border border-white/[0.08] hover:border-gold/50 hover:bg-gold/5 text-white/85 hover:text-gold rounded-sm transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Emails Card (Moved under Company links) */}
            <div className="bg-white/[0.02] border border-white/[0.08] hover:border-gold/30 hover:bg-gold/[0.02] rounded-md p-3.5 transition-all duration-300 flex flex-col gap-2.5 w-full mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                </div>
                <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[8px] tracking-[0.15em] uppercase" : fc + " text-[10px]"} text-silver/50`}>
                  {locale === "ar" ? "البريد الإلكتروني" : locale === "zh" ? "电子邮件" : "Email Addresses"}
                </h5>
              </div>
              
              <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06] text-[11px] w-full min-w-0">
                {/* General Email */}
                <div className="flex items-center justify-start gap-2 w-full min-w-0">
                  <span className="text-silver/40 text-[10px] shrink-0 w-16">{locale === "ar" ? "العام:" : locale === "zh" ? "一般:" : "General:"}</span>
                  <a href="mailto:info@kafaahsolutions.com" className={`${fc} text-white/95 hover:text-gold transition-colors truncate flex-1 min-w-0`} title="info@kafaahsolutions.com">
                    info@kafaahsolutions.com
                  </a>
                </div>
                
                {/* Admin Email */}
                <div className="flex items-center justify-start gap-2 w-full min-w-0">
                  <span className="text-silver/40 text-[10px] shrink-0 w-16">{locale === "ar" ? "الإدارة:" : locale === "zh" ? "行政:" : "Admin:"}</span>
                  <a href="mailto:admin@kafaahsolutions.com" className={`${fc} text-white/95 hover:text-gold transition-colors truncate flex-1 min-w-0`} title="admin@kafaahsolutions.com">
                    admin@kafaahsolutions.com
                  </a>
                </div>

                {/* Support Email */}
                <div className="flex items-center justify-start gap-2 w-full min-w-0">
                  <span className="text-silver/40 text-[10px] shrink-0 w-16">{locale === "ar" ? "الدعم الفني:" : locale === "zh" ? "技术支持:" : "Support:"}</span>
                  <a href="mailto:support@kafaahsolutions.com" className={`${fc} text-white/95 hover:text-gold transition-colors truncate flex-1 min-w-0`} title="support@kafaahsolutions.com">
                    support@kafaahsolutions.com
                  </a>
                </div>

                {/* Sales Email */}
                <div className="flex items-center justify-start gap-2 w-full min-w-0">
                  <span className="text-silver/40 text-[10px] shrink-0 w-16">{locale === "ar" ? "المبيعات:" : locale === "zh" ? "销售:" : "Sales:"}</span>
                  <a href="mailto:sales@kafaahsolutions.com" className={`${fc} text-white/95 hover:text-gold transition-colors truncate flex-1 min-w-0`} title="sales@kafaahsolutions.com">
                    sales@kafaahsolutions.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-start w-full">
          <Link href="/" className={`${fc} ${isEn ? "text-[11px] tracking-[0.15em] uppercase" : "text-[13px]"} font-medium text-silver/60 hover:text-gold transition-colors w-full md:w-auto`}>
            {footer.copyright[locale]}
          </Link>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 md:gap-6 w-full md:w-auto px-2 md:px-0">
            <Link href="/who-we-are/" className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/60 hover:text-gold transition-colors`}>
              {footer.independent[locale]}
            </Link>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gold/40" />
            <Link href="/who-we-are/" className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/60 hover:text-gold transition-colors`}>
              {footer.technical[locale]}
            </Link>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gold/40" />
            <Link href="/who-we-are/" className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/60 hover:text-gold transition-colors`}>
              {footer.operational[locale]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
