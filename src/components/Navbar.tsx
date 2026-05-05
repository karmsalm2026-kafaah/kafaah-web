"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Globe, Home, Briefcase, FlaskConical, Wrench, Award, Lightbulb, Mail } from "lucide-react";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { useRole } from "@/lib/RoleContext";
import { nav, megaMenu, getFontClass, getLangName, isRtl } from "@/lib/i18n";
import type { GatewayLocale } from "@/lib/cookies";

const techDropdown = technologies.map((t) => ({
  href: `/technologies/${t.slug}/`,
  slug: t.slug,
  formula: t.formula,
  label: t.name,
}));

const svcDropdown = services.map((s) => ({
  href: `/services/${s.slug}/`,
  label: s.title,
  sub: s.featured ? "Highest-value engagement" : undefined,
}));

const LOCALES: GatewayLocale[] = ["en", "ar", "zh"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useRole();
  const langRef = useRef<HTMLDivElement>(null);

  const t = (key: keyof typeof nav) => nav[key][locale];
  const fc = getFontClass(locale);
  const rtl = isRtl(locale);
  /* Locale-aware nav styling: English keeps uppercase + tracking, Arabic/Chinese use natural casing */
  const navFont = locale !== "en"
    ? `${fc} text-[13px] font-semibold`
    : `font-[family-name:var(--font-ui)] text-[11.5px] font-medium tracking-[0.08em] uppercase`;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    const normalizedPath = path.replace(/\/$/, "");
    const normalizedCurrent = pathname.replace(/\/$/, "");
    return normalizedCurrent === normalizedPath || normalizedCurrent.startsWith(normalizedPath + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      dir={rtl ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-white/[0.04]"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.webp"
            alt="Kafaah Industrial Solutions"
            width={160}
            height={68}
            className="h-[42px] w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          <Link href="/" className={`nav-link-premium ${navFont} gap-1.5 ${isActive("/") ? "nav-link-active" : ""}`}>
            <Home className="w-3.5 h-3.5 opacity-50" />
            {t("home")}
          </Link>
          <Link href="/who-we-are/" className={`nav-link-premium ${navFont} gap-1.5 ${isActive("/who-we-are/") ? "nav-link-active" : ""}`}>
            <Briefcase className="w-3.5 h-3.5 opacity-50" />
            {t("whoWeAre")}
          </Link>

          {/* Technologies Dropdown */}
          <div className="nav-item-drop relative">
            <span className={`nav-link-premium flex items-center ${navFont} gap-1.5 ${isActive("/technologies") ? "nav-link-active" : ""}`}>
              <FlaskConical className="w-3.5 h-3.5 opacity-50" />
              {t("technologies")}
              <ChevronDown className={`w-3 h-3 opacity-40 transition-transform duration-300`} />
            </span>
            <div className={`nav-dropdown absolute top-[72px] pt-4 ${rtl ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} min-w-[300px]`}>
              <div className="bg-[#071222] border border-white/[0.12] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
              <div className="p-2">
                {techDropdown.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-gold/[0.08] transition-all duration-200 group/item"
                  >
                    <span className="text-gold font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-normal min-w-[48px]">
                      {item.formula}
                    </span>
                    <span className={`${fc} text-[12px] font-medium ${locale === "en" ? "tracking-[0.06em] uppercase" : ""} text-cloud/80 group-hover/item:text-white transition-colors`}>
                      {item.label}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${rtl ? "mr-auto rotate-180" : "ml-auto"} text-gold/0 group-hover/item:text-gold translate-x-[-4px] group-hover/item:translate-x-0 transition-all duration-200`} />
                  </Link>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services Mega Menu */}
          <div className="nav-item-drop relative">
            <span className={`nav-link-premium flex items-center ${navFont} gap-1.5 ${isActive("/services") ? "nav-link-active" : ""}`}>
              <Wrench className="w-3.5 h-3.5 opacity-50" />
              {t("services")}
              <ChevronDown className={`w-3 h-3 opacity-40 transition-transform duration-300`} />
            </span>
            {/* Mega Menu Dropdown */}
            <div className={`nav-dropdown absolute top-[72px] pt-4 ${rtl ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} w-[650px]`}>
              <div className="bg-navy-deep border border-white/[0.12] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
              <div className="grid grid-cols-2">
                {/* Owners Column */}
                <div className="p-4 border-e border-white/[0.06]">
                  <div className={`mb-3 pb-2 border-b border-white/[0.06] ${fc} text-[11px] font-bold text-gold uppercase tracking-[0.1em]`}>
                    {megaMenu.owners[locale]}
                  </div>
                  <div className="space-y-1">
                    {svcDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-sm hover:bg-gold/[0.08] transition-all duration-200 group/item"
                      >
                        <span className={`${fc} text-[12px] font-medium ${locale === "en" ? "tracking-[0.06em] uppercase" : ""} text-cloud/80 group-hover/item:text-white transition-colors`}>
                          {item.label}
                        </span>
                        {item.sub && (
                          <span className="block font-[family-name:var(--font-body)] text-[10.5px] text-gold/80 tracking-normal mt-0.5">
                            {item.sub}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* EPC Column */}
                <div className="p-4 bg-white/[0.02]">
                  <div className={`mb-3 pb-2 border-b border-white/[0.06] ${fc} text-[11px] font-bold text-silver/60 uppercase tracking-[0.1em]`}>
                    {megaMenu.epc[locale]}
                  </div>
                  <div className="h-full min-h-[150px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] mb-3">
                        <Wrench className="w-4 h-4 text-silver/30" />
                      </div>
                      <p className={`${fc} text-[12px] font-medium text-silver/40`}>
                        {megaMenu.comingSoon[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <Link href="/experience/" className={`nav-link-premium ${navFont} gap-1.5 ${isActive("/experience/") ? "nav-link-active" : ""}`}>
            <Award className="w-3.5 h-3.5 opacity-50" />
            {t("experience")}
          </Link>

          <Link href="/insights/" className={`nav-link-premium ${navFont} gap-1.5 ${isActive("/insights/") ? "nav-link-active" : ""}`}>
            <Lightbulb className="w-3.5 h-3.5 opacity-50" />
            {t("insights")}
          </Link>
        </div>

        {/* CTA + Language + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="group/lang flex items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-all duration-300 px-3 py-1.5 rounded-sm"
              aria-label={nav.language[locale]}
            >
              <Globe className="w-4 h-4 text-white group-hover/lang:text-gold transition-colors" />
              <span className="hidden sm:inline text-[10px] font-[family-name:var(--font-ui)] font-bold tracking-[0.1em] uppercase text-white group-hover/lang:text-gold transition-colors">
                {locale.toUpperCase()}
              </span>
            </button>
            {langOpen && (
              <div className={`absolute top-full ${rtl ? "left-0" : "right-0"} mt-2 min-w-[140px] bg-[#071222] border border-white/[0.12] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50`}>
                <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
                <div className="p-1.5">
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`w-full text-start px-4 py-2.5 rounded-sm text-[13px] transition-all duration-200 ${
                        locale === l
                          ? "bg-gold/[0.12] text-gold font-medium"
                          : "text-silver/70 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {getLangName(l)} <span className="text-silver/40 text-[11px] ml-1">({l.toUpperCase()})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact/"
            className={`hidden md:inline-flex group relative items-center gap-2 ${locale !== "en" ? fc + " text-[13px] font-bold" : fc + " text-[11px] font-bold tracking-[0.15em] uppercase"} px-6 py-2.5 overflow-hidden transition-all duration-300 bg-gold text-navy-deep rounded-sm gw-btn-shimmer hover:bg-gold-light hover:scale-105`}
          >
            <Mail className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">{t("getInTouch")}</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-silver/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div dir={rtl ? "rtl" : "ltr"} className="lg:hidden bg-navy-deep/98 backdrop-blur-2xl border-t border-white/[0.06] max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="px-6 py-5 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className={`block py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors`}>
              {t("home")}
            </Link>
            <Link href="/who-we-are/" onClick={() => setMobileOpen(false)} className={`block py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors`}>
              {t("whoWeAre")}
            </Link>

            <div className="border-b border-white/[0.06]">
              <button
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
                className={`flex items-center justify-between w-full py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 hover:text-white transition-colors`}
              >
                {t("technologies")}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileTechOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileTechOpen ? "max-h-[600px] opacity-100 pb-3" : "max-h-0 opacity-0"}`}>
                {techDropdown.map((item) => (
                  <Link key={item.slug} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-2 py-2.5 ${rtl ? "pr-3" : "pl-3"} text-[13px] text-silver/50 hover:text-white transition-colors`}>
                    <span className="text-gold text-[11px] min-w-[40px]">{item.formula}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-white/[0.06]">
              <button
                onClick={() => setMobileSvcOpen(!mobileSvcOpen)}
                className={`flex items-center justify-between w-full py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 hover:text-white transition-colors`}
              >
                {t("services")}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSvcOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSvcOpen ? "max-h-[800px] opacity-100 pb-3" : "max-h-0 opacity-0"}`}>
                <div className={`mb-2 pt-1 ${rtl ? "pr-3" : "pl-3"} ${fc} text-[10px] font-bold text-gold uppercase tracking-[0.1em]`}>
                  {megaMenu.owners[locale]}
                </div>
                {svcDropdown.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block py-2 ${rtl ? "pr-3" : "pl-3"} text-[13px] text-silver/50 hover:text-white transition-colors`}>
                    {item.label}
                  </Link>
                ))}
                
                <div className={`mt-4 mb-2 ${rtl ? "pr-3" : "pl-3"} ${fc} text-[10px] font-bold text-silver/60 uppercase tracking-[0.1em]`}>
                  {megaMenu.epc[locale]}
                </div>
                <div className={`py-2 ${rtl ? "pr-3" : "pl-3"} text-[12px] text-silver/30 italic`}>
                  {megaMenu.comingSoon[locale]}
                </div>
              </div>
            </div>

            <Link href="/experience/" onClick={() => setMobileOpen(false)} className={`block py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors`}>
              {t("experience")}
            </Link>

            <Link href="/insights/" onClick={() => setMobileOpen(false)} className={`block py-3.5 ${fc} text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors`}>
              {t("insights")}
            </Link>

            {/* Mobile Language Picker */}
            <div className="py-3.5 border-b border-white/[0.06]">
              <div className={`${fc} text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-3`}>
                {nav.language[locale]}
              </div>
              <div className="flex gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); }}
                    className={`px-4 py-2 text-[13px] rounded-sm border transition-all ${
                      locale === l ? "border-gold/50 bg-gold/10 text-gold" : "border-white/10 text-silver/50 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {getLangName(l)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-2">
              <Link
                href="/contact/"
                onClick={() => setMobileOpen(false)}
                className={`relative overflow-hidden flex items-center justify-center gap-2 w-full ${fc} text-[12px] font-bold tracking-[0.2em] uppercase bg-gold text-navy-deep py-4 rounded-sm transition-all gw-btn-shimmer`}
              >
                {t("getInTouch")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
