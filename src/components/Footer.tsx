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
            <p className={`${fc} ${isAr ? "text-[16px] leading-[2]" : "text-[15px] leading-[1.8]"} font-light text-silver/80 mb-10 max-w-[360px] text-justify`}>
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
                  <a href="tel:+201018081191" className={`${fc} text-[14px] text-white/90 hover:text-gold transition-colors block`} dir="ltr">
                    +20 10 18081191
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
                  <a href="mailto:info@kafaahsolutions.com" className={`${fc} text-[14px] text-white/90 hover:text-gold transition-colors block`}>
                    info@kafaahsolutions.com
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
                <a href="https://wa.me/201018081191" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-[#0077B5] hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-gold hover:bg-gold/10 hover:text-gold hover:-translate-y-1 hover:scale-105 backdrop-blur-sm text-silver transition-all duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links Grid (Right Col on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-4">
            
            {/* Services */}
            <div className="md:col-span-1">
              <h4 className={`${fc} ${isEn ? "text-[12px] tracking-[0.3em] uppercase" : "text-[15px]"} font-bold text-gold mb-6 flex items-center gap-4`}>
                <span className="w-6 h-px bg-gold/50" />
                {footer.services[locale]}
              </h4>
              <p className={`${fc} ${isAr ? "text-[15px] leading-[1.8]" : "text-[13.5px] leading-[1.6]"} font-light text-silver/80 mb-6 text-justify`}>
                {footer.servicesDesc[locale]}
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/services/" className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors shrink-0" />
                    <span className="leading-[1.4]">{locale === "ar" ? "خدمات الملاك والمشغلين" : locale === "zh" ? "业主与运营商服务" : "Plant Owners & Operators"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/" className="group text-[14px] font-light text-silver hover:text-white transition-colors duration-300 flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold transition-colors shrink-0" />
                    <span className="leading-[1.4]">{locale === "ar" ? "خدمات مقاولي EPC" : locale === "zh" ? "EPC 承包商服务" : "EPC Contractor Services"}</span>
                  </Link>
                </li>
              </ul>
              <div className="pt-2">
                <Link 
                  href="/services/" 
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-[11px] font-bold tracking-wider transition-all duration-300 uppercase font-[family-name:var(--font-ui)] group"
                >
                  <span>{footer.exploreServices[locale]}</span>
                  <span className={`transition-transform duration-300 ${rtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>→</span>
                </Link>
              </div>
            </div>

            {/* Technologies */}
            <div className="md:col-span-1">
              <h4 className={`${fc} ${isEn ? "text-[12px] tracking-[0.3em] uppercase" : "text-[15px]"} font-bold text-gold mb-6 flex items-center gap-4`}>
                <span className="w-6 h-px bg-gold/50" />
                {footer.technologies[locale]}
              </h4>
              <p className={`${fc} ${isAr ? "text-[15px] leading-[1.8]" : "text-[13.5px] leading-[1.6]"} font-light text-silver/80 mb-6 text-justify`}>
                {footer.techDesc[locale]}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["H₂SO₄", "H₃PO₄", "K₂SO₄", "NPK", "SSP", "MgSO₄"].map((formula) => (
                  <span key={formula} className="text-[11px] font-bold font-[family-name:var(--font-ui)] px-2.5 py-1 bg-navy-card/45 border border-white/[0.08] text-gold/80 rounded-sm">
                    {formula}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <Link 
                  href="/technologies/" 
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-[11px] font-bold tracking-wider transition-all duration-300 uppercase font-[family-name:var(--font-ui)] group"
                >
                  <span>{footer.exploreTech[locale]}</span>
                  <span className={`transition-transform duration-300 ${rtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>→</span>
                </Link>
              </div>
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
