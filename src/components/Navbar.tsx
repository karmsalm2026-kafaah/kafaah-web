"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, RefreshCw } from "lucide-react";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { useRole } from "@/lib/RoleContext";

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

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { role } = useRole();

  const roleBadge = role === "owner"
    ? { label: "Owner Portal", color: "text-[#6ECFA3] hover:text-white hover:opacity-100" }
    : role === "epc"
    ? { label: "EPC Portal", color: "text-[#A78BFA] hover:text-white hover:opacity-100" }
    : null;

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-white/[0.04]"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 h-[72px] flex items-center justify-between">
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

        {/* Role Badge */}
        {roleBadge && (
          <Link
            href="/gateway"
            className={`hidden md:inline-flex items-center gap-1.5 ml-3 px-2 py-1 text-[10px] font-[family-name:var(--font-ui)] font-bold tracking-[0.15em] uppercase transition-all duration-300 opacity-80 ${roleBadge.color}`}
            title="Switch portal"
            onClick={() => { document.cookie = 'kafaah_role=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax'; }}
          >
            {roleBadge.label}
            <RefreshCw className="w-2.5 h-2.5 opacity-50" />
          </Link>
        )}

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          <Link
            href="/"
            className={`nav-link-premium ${isActive("/") ? "nav-link-active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/who-we-are/"
            className={`nav-link-premium ${isActive("/who-we-are/") ? "nav-link-active" : ""}`}
          >
            Who We Are
          </Link>

          {/* Technologies Dropdown */}
          <div className="nav-item-drop relative">
            <span className={`nav-link-premium flex items-center ${isActive("/technologies") ? "nav-link-active" : ""}`}>
              Technologies
              <ChevronDown className="w-3 h-3 ml-1 opacity-40 transition-transform duration-300" />
            </span>
            <div className="nav-dropdown absolute top-[72px] left-1/2 -translate-x-1/2 min-w-[300px] bg-[#071222] border border-white/[0.12] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Gold accent top */}
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
                    <span className="font-[family-name:var(--font-ui)] text-[12px] font-medium tracking-[0.06em] uppercase text-cloud/80 group-hover/item:text-white transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-auto text-gold/0 group-hover/item:text-gold translate-x-[-4px] group-hover/item:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="nav-item-drop relative">
            <span className={`nav-link-premium flex items-center ${isActive("/services") ? "nav-link-active" : ""}`}>
              Services
              <ChevronDown className="w-3 h-3 ml-1 opacity-40 transition-transform duration-300" />
            </span>
            <div className="nav-dropdown absolute top-[72px] left-1/2 -translate-x-1/2 min-w-[300px] bg-[#071222] border border-white/[0.12] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
              <div className="p-2">
                {svcDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-sm hover:bg-gold/[0.08] transition-all duration-200 group/item"
                  >
                    <span className="font-[family-name:var(--font-ui)] text-[12px] font-medium tracking-[0.06em] uppercase text-cloud/80 group-hover/item:text-white transition-colors">
                      {item.label}
                    </span>
                    {item.sub && (
                      <span className="block font-[family-name:var(--font-body)] text-[11px] text-gold/80 tracking-normal mt-0.5">
                        {item.sub}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/experience/"
            className={`nav-link-premium ${isActive("/experience/") ? "nav-link-active" : ""}`}
          >
            Experience
          </Link>

          <Link
            href="/insights/"
            className={`nav-link-premium ${isActive("/insights/") ? "nav-link-active" : ""}`}
          >
            Insights
          </Link>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact/"
            className="hidden md:inline-flex group relative items-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-2.5 overflow-hidden transition-all duration-300 border border-gold/80 text-gold hover:text-navy-deep hover:border-gold"
          >
            {/* Fill animation on hover */}
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Get in Touch</span>
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
        <div className="lg:hidden bg-navy-deep/98 backdrop-blur-2xl border-t border-white/[0.06] max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="px-6 py-5 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 font-[family-name:var(--font-ui)] text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/who-we-are/"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 font-[family-name:var(--font-ui)] text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors"
            >
              Who We Are
            </Link>

            <div className="py-3.5 border-b border-white/[0.06]">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-3">
                Technologies
              </div>
              {techDropdown.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2.5 pl-3 text-[13px] text-silver/50 hover:text-white transition-colors"
                >
                  <span className="text-gold text-[11px] min-w-[40px]">{item.formula}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="py-3.5 border-b border-white/[0.06]">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-3">
                Services
              </div>
              {svcDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 pl-3 text-[13px] text-silver/50 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/experience/"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 font-[family-name:var(--font-ui)] text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 border-b border-white/[0.06] hover:text-white transition-colors"
            >
              Experience
            </Link>

            <Link
              href="/insights/"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 font-[family-name:var(--font-ui)] text-[13px] font-medium uppercase tracking-[0.1em] text-silver/70 hover:text-white transition-colors"
            >
              Insights
            </Link>

            <div className="pt-6 pb-2">
              <Link
                href="/contact/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full font-[family-name:var(--font-ui)] text-[12px] font-bold tracking-[0.2em] uppercase bg-gold text-navy-deep py-4 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
