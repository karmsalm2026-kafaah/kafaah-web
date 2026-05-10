"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { useRole } from "@/lib/RoleContext";
import { footer, nav, getFontClass, isRtl } from "@/lib/i18n";
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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
          
          {/* Brand & Contact (Left Col on Desktop) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src="/logo1.webp"
                alt="Kafaah Industrial Solutions"
                width={180}
                height={76}
                className="h-[48px] w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]"
              />
            </Link>
            <p className={`${fc} ${isAr ? "text-[16px] leading-[2]" : "text-[15px] leading-[1.8]"} font-light text-silver/80 mb-10 max-w-[360px]`}>
              {footer.brandDesc[locale]}
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px]"} text-silver/50 mb-1`}>
                    {footer.address ? footer.address[locale] : "Office Address"}
                  </h5>
                  <p className={`${fc} text-[14px] text-white/90`}>
                    {footer.location ? footer.location[locale] : "Cairo, Egypt"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px]"} text-silver/50 mb-1`}>
                    {footer.phone ? footer.phone[locale] : "Phone"}
                  </h5>
                  <a href="tel:+201000000000" className={`${fc} text-[14px] text-white/90 hover:text-gold transition-colors block`} dir="ltr">
                    +20 100 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px]"} text-silver/50 mb-1`}>
                    {footer.email ? footer.email[locale] : "Email"}
                  </h5>
                  <a href="mailto:info@kafaah.com" className={`${fc} text-[14px] text-white/90 hover:text-gold transition-colors block`}>
                    info@kafaah.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px]"} text-silver/50 mb-4`}>
                {footer.socialMedia ? footer.socialMedia[locale] : "Follow Us"}
              </h5>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-gold hover:bg-gold/10 hover:text-gold text-silver transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-gold hover:bg-gold/10 hover:text-gold text-silver transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links Grid (Right Col on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-4">
            
            {/* Services */}
            <div className="md:col-span-1">
              <h4 className={`${fc} ${isEn ? "text-[12px] tracking-[0.3em] uppercase" : "text-[15px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
                <span className="w-6 h-px bg-gold/50" />
                {footer.services[locale]}
              </h4>
              
              <div className="space-y-8">
                {/* Owners */}
                {ownerServices.length > 0 && (
                  <div>
                    <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px] font-bold"} text-white/40 mb-4 pb-2 border-b border-white/[0.05]`}>
                      {isEn ? "For Owners" : isAr ? "للملاك والمستثمرين" : "对于业主"}
                    </h5>
                    <ul className="space-y-3">
                      {ownerServices.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}/`} className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors shrink-0" />
                            <span className="leading-[1.4]">{s.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Both / General */}
                {bothServices.length > 0 && (
                  <div>
                    <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px] font-bold"} text-white/40 mb-4 pb-2 border-b border-white/[0.05]`}>
                      {isEn ? "Shared Services" : isAr ? "خدمات مشتركة" : "共享服务"}
                    </h5>
                    <ul className="space-y-3">
                      {bothServices.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}/`} className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors shrink-0" />
                            <span className="leading-[1.4]">{s.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* EPC */}
                {epcServices.length > 0 && (
                  <div>
                    <h5 className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fc + " text-[12px] font-bold"} text-white/40 mb-4 pb-2 border-b border-white/[0.05]`}>
                      {isEn ? "For EPCs" : isAr ? "لمقاولي EPC" : "对于EPC"}
                    </h5>
                    <ul className="space-y-3">
                      {epcServices.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}/`} className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors shrink-0" />
                            <span className="leading-[1.4]">{s.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="md:col-span-1">
              <h4 className={`${fc} ${isEn ? "text-[12px] tracking-[0.3em] uppercase" : "text-[15px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
                <span className="w-6 h-px bg-gold/50" />
                {footer.technologies[locale]}
              </h4>
              <ul className="space-y-4">
                {technologies.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/technologies/${t.slug}/`}
                      className="group flex flex-col gap-1 text-[14px] font-light text-silver hover:text-white transition-colors duration-300 bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-sm border border-white/[0.04] hover:border-gold/20"
                    >
                      <span className="font-[family-name:var(--font-ui)] text-gold/80 text-[12px] font-bold tracking-widest group-hover:text-gold transition-colors">
                        {t.formula}
                      </span>
                      <span className="opacity-90">
                        {t.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-1">
              <h4 className={`${fc} ${isEn ? "text-[12px] tracking-[0.3em] uppercase" : "text-[15px]"} font-bold text-gold mb-8 flex items-center gap-4`}>
                <span className="w-6 h-px bg-gold/50" />
                {footer.company[locale]}
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group text-[15px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3 ${fc} py-2`}
                    >
                      <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                      <span className={`transform transition-transform duration-300 ${rtl ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className={`${fc} ${isEn ? "text-[11px] tracking-[0.15em] uppercase" : "text-[13px]"} font-medium text-silver/60`}>
            {footer.copyright[locale]}
          </div>
          <div className="flex items-center justify-center gap-6">
            <span className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/60`}>
              {footer.independent[locale]}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <span className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/60`}>
              {footer.technical[locale]}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <span className={`${fc} ${isEn ? "text-[11px] tracking-[0.2em] uppercase" : "text-[13px]"} font-medium text-silver/40`}>
              {footer.operational[locale]}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
