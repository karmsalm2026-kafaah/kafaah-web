"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { useRole } from "@/lib/RoleContext";
import { footer, nav, getFontClass, isRtl } from "@/lib/i18n";

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

  return (
    <footer dir={rtl ? "rtl" : "ltr"} className="relative bg-navy overflow-hidden border-t border-white/[0.08]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-16 pb-16 border-b border-white/[0.08]">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src="/logo1.webp"
                alt="Kafaah Industrial Solutions"
                width={160}
                height={68}
                className="h-[42px] w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
              />
            </Link>
            <p className={`${fc} ${isAr ? "text-[16px] leading-[2]" : "text-[14px] leading-[1.8]"} font-light text-silver/90 max-w-[320px]`}>
              {footer.brandDesc[locale]}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className={`${fc} ${isEn ? "text-[11px] tracking-[0.3em] uppercase" : "text-[14px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
              <span className="w-6 h-px bg-gold/50" />
              {footer.technologies[locale]}
            </h4>
            <ul className="space-y-4">
              {technologies.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/technologies/${t.slug}/`}
                    className="group flex items-center gap-3 text-[14px] font-light text-silver hover:text-white transition-colors duration-300"
                  >
                    <span className="font-[family-name:var(--font-ui)] text-gold/70 text-[11px] font-bold min-w-[36px] group-hover:text-gold transition-colors tracking-widest">
                      {t.formula}
                    </span>
                    <span className={`border-${rtl ? "r" : "l"} border-white/[0.1] ${rtl ? "pr-4" : "pl-4"} group-hover:border-gold/40 transition-colors`}>
                      {t.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`${fc} ${isEn ? "text-[11px] tracking-[0.3em] uppercase" : "text-[14px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
              <span className="w-6 h-px bg-gold/50" />
              {footer.services[locale]}
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`${fc} ${isEn ? "text-[11px] tracking-[0.3em] uppercase" : "text-[14px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
              <span className="w-6 h-px bg-gold/50" />
              {footer.company[locale]}
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3 ${fc}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left mt-8">
          <div className={`${fc} ${isEn ? "text-[10px] tracking-[0.15em] uppercase" : "text-[12px]"} font-medium text-silver/70`}>
            {footer.copyright[locale]}
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className={`${fc} ${isEn ? "text-[10px] tracking-[0.2em] uppercase" : "text-[12px]"} font-medium text-silver/70`}>
              {footer.independent[locale]}
            </span>
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <span className={`${fc} ${isEn ? "text-[10px] tracking-[0.2em] uppercase" : "text-[12px]"} font-medium text-silver/70`}>
              {footer.technical[locale]}
            </span>
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <span className={`${fc} ${isEn ? "text-[10px] tracking-[0.2em] uppercase" : "text-[12px]"} font-medium text-silver/50`}>
              {footer.operational[locale]}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
