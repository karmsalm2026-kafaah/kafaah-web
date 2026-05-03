"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Building2, LayoutGrid, Globe, ChevronDown, MapPin } from "lucide-react";
import { setGatewayCookies } from "@/lib/cookies";
import type { GatewayRole, GatewayLocale } from "@/lib/cookies";

/* ═══════════════════════════════════════════
   COUNTRY DATA — Grouped by region
   ═══════════════════════════════════════════ */
const COUNTRY_GROUPS = [
  {
    label: "Egypt & Levant",
    countries: ["Egypt", "Jordan", "Lebanon", "Iraq"],
  },
  {
    label: "Gulf (GCC)",
    countries: [
      "Saudi Arabia",
      "UAE",
      "Kuwait",
      "Qatar",
      "Bahrain",
      "Oman",
    ],
  },
  {
    label: "North Africa",
    countries: ["Morocco", "Tunisia", "Algeria", "Libya"],
  },
  {
    label: "Asia-Pacific",
    countries: ["China", "India", "Indonesia", "Pakistan", "Bangladesh"],
  },
  {
    label: "Europe",
    countries: ["Germany", "France", "United Kingdom", "Spain", "Italy", "Netherlands"],
  },
  {
    label: "Other",
    countries: ["United States", "Brazil", "South Africa", "Nigeria", "Turkey", "Other"],
  },
];

/* ═══════════════════════════════════════════
   LOADING MESSAGES
   ═══════════════════════════════════════════ */
const LOADING_MESSAGES = {
  en: ["Authenticating...", "Loading your portal...", "Welcome to Kafaah"],
  ar: ["جاري التحميل...", "إعداد تجربتك...", "أهلاً بك في كفاءة"],
};

/* ═══════════════════════════════════════════
   GATEWAY CLIENT COMPONENT
   ═══════════════════════════════════════════ */
export function GatewayClient() {
  const router = useRouter();

  // State
  const [selectedRole, setSelectedRole] = useState<GatewayRole | null>(null);
  const [selectedLocale, setSelectedLocale] = useState<GatewayLocale>("en");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phase, setPhase] = useState<"select" | "loading">("select");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Mount animation and auto-detect country
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);

    // Auto-detect country via IP
    const detectCountry = async () => {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await res.json();
        const countryName = data.country;

        let foundCountry = "";
        for (const group of COUNTRY_GROUPS) {
          if (group.countries.includes(countryName)) {
            foundCountry = countryName;
            break;
          }
        }

        if (foundCountry) {
          setSelectedCountry(foundCountry);
          // Check if it's an Arab country to switch language
          const arabCountries = ["Egypt", "Jordan", "Lebanon", "Iraq", "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Bahrain", "Oman", "Morocco", "Tunisia", "Algeria", "Libya"];
          if (arabCountries.includes(foundCountry)) {
            setSelectedLocale("ar");
          }
        }
      } catch (err) {
        // Silently fail if IP detection is blocked
      }
    };

    detectCountry();

    return () => clearTimeout(t);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Loading sequence
  useEffect(() => {
    if (phase !== "loading") return;

    const msgs = LOADING_MESSAGES[selectedLocale];
    if (loadingMsgIndex < msgs.length - 1) {
      const t = setTimeout(() => setLoadingMsgIndex((i) => i + 1), 800);
      return () => clearTimeout(t);
    } else {
      // Final message shown — redirect after a beat
      const t = setTimeout(() => {
        router.push("/");
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase, loadingMsgIndex, selectedLocale, router]);

  // Handle enter
  const handleEnter = useCallback(() => {
    if (!selectedRole) return;
    setGatewayCookies(selectedRole, selectedLocale, selectedCountry || undefined);
    setLoadingMsgIndex(0);
    setPhase("loading");
  }, [selectedRole, selectedLocale, selectedCountry]);

  // Skip gateway
  const handleSkip = useCallback(() => {
    router.push("/");
  }, [router]);

  const canEnter = selectedRole !== null;

  const enterLabel =
    selectedRole === "owner"
      ? selectedLocale === "ar"
        ? "دخول كفاءة — بوابة المالك والمستثمر"
        : "Enter Kafaah — Owner & Investor Portal"
      : selectedRole === "epc"
        ? selectedLocale === "ar"
          ? "دخول كفاءة — بوابة المقاول"
          : "Enter Kafaah — EPC & Contractor Portal"
        : selectedLocale === "ar"
          ? "اختر دورك أولاً"
          : "Select your role first";

  /* ═══════════════════════════════════════════
     LOADING SCREEN (Handled via overlay in main render)
     ═══════════════════════════════════════════ */
  /* ═══════════════════════════════════════════
     MAIN GATEWAY (Single Screen)
     ═══════════════════════════════════════════ */
  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      dir={selectedLocale === "ar" ? "rtl" : "ltr"}
    >
      {/* ── Background Layers ── */}
      <div className="fixed inset-0 z-0 bg-navy-deep">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" />
          <img
            src="/hero-bg.webp"
            alt="Engineering Team"
            className="w-full h-full object-fill object-right lg:object-center opacity-80 mix-blend-luminosity"
          />
        </picture>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/50 sm:via-navy-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/5 via-transparent to-navy-deep/80" />
        {/* Top gold line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Loading Overlay ── */}
        {phase === "loading" && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep/50 backdrop-blur-xl animate-in fade-in duration-700">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />

            {/* Main Logo in center */}
            <div className="relative z-10 gw-logo-pulse mb-12">
              <Image
                src="/logo.webp"
                alt="Kafaah"
                width={200}
                height={85}
                className="w-auto h-[48px] sm:h-[56px] object-contain brightness-110"
                priority
              />
            </div>

            {/* Loading messages */}
            <div className="relative z-10 h-8 flex items-center mb-8">
              <p
                key={loadingMsgIndex}
                className={`gw-msg-fade text-white/90 font-medium ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)] text-[16px]" : "font-[family-name:var(--font-ui)] text-[13px] tracking-[0.2em] uppercase"}`}
              >
                {LOADING_MESSAGES[selectedLocale][loadingMsgIndex]}
              </p>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full shadow-[0_0_15px_rgba(232,146,10,0.2)]">
              <div className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 gw-progress-fill rounded-full" />
            </div>
          </div>
        )}

        {/* ── Top Bar ── */}
        <header
          className={`flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 sm:py-5 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
        >
          <Image
            src="/logo.webp"
            alt="Kafaah Industrial Solutions"
            width={160}
            height={68}
            className="h-[36px] sm:h-[42px] w-auto object-contain brightness-110"
            priority
          />
          {/* Chemical ticker */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-[family-name:var(--font-ui)] tracking-[0.2em] uppercase text-silver/80 font-medium">
            <span className="hover:text-gold transition-colors">H₂SO₄</span>
            <span className="w-1 h-1 bg-gold/40 rotate-45 shadow-[0_0_8px_rgba(232,146,10,0.5)]" />
            <span className="hover:text-gold transition-colors">H₃PO₄</span>
            <span className="w-1 h-1 bg-gold/40 rotate-45 shadow-[0_0_8px_rgba(232,146,10,0.5)]" />
            <span className="hover:text-gold transition-colors">K₂SO₄</span>
            <span className="w-1 h-1 bg-gold/40 rotate-45 shadow-[0_0_8px_rgba(232,146,10,0.5)]" />
            <span className="hover:text-gold transition-colors">NPK</span>
          </div>
        </header>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-4 sm:py-6">
          {/* Heading */}
          <div
            className={`text-center mb-6 sm:mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold/50" />
              <span className="font-[family-name:var(--font-ui)] text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-gold">
                {selectedLocale === "ar" ? "بوابة الدخول" : "Gateway Portal"}
              </span>
              <div className="w-8 h-px bg-gold/50" />
            </div>
            <h1 className={`text-[clamp(28px,5vw,52px)] leading-[1.05] tracking-[-0.02em] mb-3 sm:mb-5 text-white max-w-[850px] mx-auto ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)]" : "font-[family-name:var(--font-display)]"}`}>
              {selectedLocale === "ar" ? (
                <>
                  كيف يمكننا{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">مساعدتك؟</span>
                </>
              ) : (
                <>
                  How can we{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">help you?</span>
                </>
              )}
            </h1>
            <p className={`text-[14px] sm:text-[15px] md:text-[16px] text-white max-w-[560px] mx-auto leading-[1.6] sm:leading-[1.8] mb-4 sm:mb-5 font-normal ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
              {selectedLocale === "ar"
                ? "مستشارون فنيون مستقلون يخدمون المالكين والمقاولين على حد سواء في المنشآت الكيميائية والأسمدة."
                : "Independent technical consultants serving both project owners and EPC contractors across chemical and fertilizer plants."}
            </p>
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
              <span className="text-[10px] font-[family-name:var(--font-ui)] tracking-[0.1em] uppercase text-silver/100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6ECFA3]/40" />
                {selectedLocale === "ar" ? "+٢٠ سنة خبرة" : "20+ Years"}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-[10px] font-[family-name:var(--font-ui)] tracking-[0.1em] uppercase text-silver/100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                {selectedLocale === "ar" ? "مستقلون" : "Independent"}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-[10px] font-[family-name:var(--font-ui)] tracking-[0.1em] uppercase text-silver/100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]/40" />
                {selectedLocale === "ar" ? "سري" : "Confidential"}
              </span>
            </div>
          </div>

          {/* ═══ Role Selection Cards ═══ */}
          <div
            className={`w-full max-w-[960px] grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/[0.06] mb-6 sm:mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Owner / Investor Card */}
            <button
              onClick={() => setSelectedRole("owner")}
              className={`group relative gw-glass border border-white/5 text-start transition-all duration-500 p-5 sm:p-6 lg:p-8 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${selectedRole === "owner"
                  ? "bg-[#0D1F32]/80 ring-1 ring-[#6ECFA3]/30 gw-glow-owner"
                  : "hover:bg-[#0C1A2C]/60 hover:border-white/10"
                }`}
              tabIndex={0}
              aria-pressed={selectedRole === "owner"}
            >
              <div className="animated-border-box" />
              {/* Gold bottom border on selected/hover */}
              <div
                className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${selectedRole === "owner"
                    ? "bg-[#6ECFA3]"
                    : "bg-transparent group-hover:bg-gold/50"
                  }`}
              />

              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-[family-name:var(--font-ui)] text-[12px] font-bold tracking-[0.4em] uppercase px-3 py-1 border transition-colors ${selectedRole === "owner"
                      ? "text-[#6ECFA3] border-[#6ECFA3]/40 bg-[#6ECFA3]/[0.06]"
                      : "text-muted/70 border-white/10"
                    }`}
                >
                  {selectedLocale === "ar" ? "مالك / مستثمر" : "Owner / Investor"}
                </span>
                {selectedRole === "owner" && (
                  <div className="w-2 h-2 bg-[#6ECFA3] rounded-full gw-dot-pulse" />
                )}
              </div>

              {/* Icon */}
              <Building2
                className={`w-8 h-8 sm:w-9 sm:h-9 mb-5 transition-colors duration-300 ${selectedRole === "owner" ? "text-gold" : "text-gold/60 group-hover:text-gold/90"
                  }`}
                strokeWidth={1.2}
              />

              {/* Title */}
              <h3 className={`text-[16px] sm:text-[18px] font-bold tracking-[0.05em] uppercase text-white mb-3 ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)] tracking-normal" : "font-[family-name:var(--font-ui)]"}`}>
                {selectedLocale === "ar"
                  ? "مالك مشروع أو مستثمر"
                  : "Project Owner or Investor"}
              </h3>

              {/* Description */}
              <p className={`text-[13px] sm:text-[14px] text-white/80 leading-[1.7] mb-5 ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                {selectedLocale === "ar"
                  ? "تقوم ببناء أو الاستثمار في منشأة أسمدة أو كيميائية. تحتاج إلى رقابة فنية مستقلة لحماية رأس مالك وقراراتك."
                  : "You're building or investing in a fertilizer or chemical facility. You need independent technical oversight to protect your capital and decisions."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(selectedLocale === "ar"
                  ? ["مهندس المالك", "العناية الواجبة", "استشارات استثمارية", "التحكم بالمخاطر"]
                  : ["Owner's Engineer", "Due Diligence", "Investment Advisory", "Risk Control"]
                ).map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] sm:text-[12px] font-medium tracking-wide uppercase text-silver/80 border border-white/[0.12] px-2.5 py-1.5 transition-colors group-hover:border-white/25 group-hover:text-white ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)] tracking-normal" : "font-[family-name:var(--font-ui)]"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div
                className={`flex items-center gap-2 font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${selectedRole === "owner"
                    ? "text-[#6ECFA3]"
                    : "text-silver/30 group-hover:text-gold"
                  }`}
              >
                <span>
                  {selectedLocale === "ar"
                    ? "← الدخول كمالك / مستثمر"
                    : "Enter as Owner / Investor →"}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${selectedLocale === "ar"
                      ? "rotate-180 group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                    }`}
                />
              </div>
            </button>

            {/* EPC / Contractor Card */}
            <button
              onClick={() => setSelectedRole("epc")}
              className={`group relative gw-glass border border-white/5 text-start transition-all duration-500 p-5 sm:p-6 lg:p-8 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${selectedRole === "epc"
                  ? "bg-[#0D1F32]/80 ring-1 ring-[#A78BFA]/30 gw-glow-epc"
                  : "hover:bg-[#0C1A2C]/60 hover:border-white/10"
                }`}
              tabIndex={0}
              aria-pressed={selectedRole === "epc"}
            >
              <div className="animated-border-box" />
              {/* Bottom border */}
              <div
                className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${selectedRole === "epc"
                    ? "bg-[#A78BFA]"
                    : "bg-transparent group-hover:bg-gold/50"
                  }`}
              />

              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-[family-name:var(--font-ui)] text-[12px] font-bold tracking-[0.4em] uppercase px-3 py-1 border transition-colors ${selectedRole === "epc"
                      ? "text-[#A78BFA] border-[#A78BFA]/40 bg-[#A78BFA]/[0.06]"
                      : "text-muted/70 border-white/10"
                    }`}
                >
                  {selectedLocale === "ar" ? "المقاول" : "EPC/Contractor"}
                </span>
                {selectedRole === "epc" && (
                  <div className="w-2 h-2 bg-[#A78BFA] rounded-full gw-dot-pulse" />
                )}
              </div>

              {/* Icon */}
              <LayoutGrid
                className={`w-8 h-8 sm:w-9 sm:h-9 mb-5 transition-colors duration-300 ${selectedRole === "epc" ? "text-gold" : "text-gold/60 group-hover:text-gold/90"
                  }`}
                strokeWidth={1.2}
              />

              {/* Title */}
              <h3 className={`text-[16px] sm:text-[18px] font-bold tracking-[0.05em] uppercase text-white mb-3 ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)] tracking-normal" : "font-[family-name:var(--font-ui)]"}`}>
                {selectedLocale === "ar"
                  ? "مقاول EPC أو متخصص"
                  : "EPC Contractor or Specialist"}
              </h3>

              {/* Description */}
              <p className={`text-[13px] sm:text-[14px] text-white/80 leading-[1.7] mb-5 ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                {selectedLocale === "ar"
                  ? "تقوم بتنفيذ مشروع صناعي وتحتاج إلى دعم خبراء في التشغيل والصيانة واستكشاف الأخطاء في المنشآت الكيميائية أو الأسمدة."
                  : "You're executing an industrial project and need expert commissioning, startup, or troubleshooting support for chemical or fertilizer plants."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(selectedLocale === "ar"
                  ? ["التشغيل", "استكشاف الأخطاء", "دعم بدء التشغيل", "التحسين"]
                  : ["Commissioning", "Troubleshooting", "Startup Support", "Optimization"]
                ).map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] sm:text-[12px] font-medium tracking-wide uppercase text-silver/80 border border-white/[0.12] px-2.5 py-1.5 transition-colors group-hover:border-white/25 group-hover:text-white ${selectedLocale === "ar" ? "font-[family-name:var(--font-arabic)] tracking-normal" : "font-[family-name:var(--font-ui)]"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div
                className={`flex items-center gap-2 font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${selectedRole === "epc"
                    ? "text-[#A78BFA]"
                    : "text-silver/30 group-hover:text-gold"
                  }`}
              >
                <span>
                  {selectedLocale === "ar"
                    ? "← الدخول كمقاول / متخصص"
                    : "Enter as EPC / Contractor →"}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${selectedLocale === "ar"
                      ? "rotate-180 group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                    }`}
                />
              </div>
            </button>
          </div>

          {/* ═══ Language + Country + Enter ═══ */}
          <div
            className={`w-full max-w-[960px] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Language + Country row */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4 mb-4">
              {/* ── Custom Language Dropdown ── */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => { setLangOpen(!langOpen); setCountryOpen(false); }}
                  className="w-full flex items-center gap-3 bg-[#0A1118]/60 backdrop-blur-md border border-white/10 text-white font-[family-name:var(--font-ui)] text-[12px] sm:text-[13px] tracking-[0.08em] uppercase py-3 px-4 cursor-pointer hover:border-white/25 hover:bg-[#0A1118]/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  aria-label={selectedLocale === "ar" ? "اللغة" : "Language"}
                  aria-expanded={langOpen}
                >
                  <Globe className="w-4 h-4 text-white/50 shrink-0" />
                  <span className="text-[10px] uppercase tracking-wider text-white/50 hidden sm:inline-block">
                    {selectedLocale === "ar" ? "اللغة:" : "Lang:"}
                  </span>
                  <span className="flex-1 text-start">{selectedLocale === "ar" ? "العربية" : "English"}</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${langOpen ? "rotate-180 text-gold" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-[#0A1118]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                    {[
                      { value: "en" as GatewayLocale, label: "English" },
                      { value: "ar" as GatewayLocale, label: "العربية" },
                    ].map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => { setSelectedLocale(lang.value); setLangOpen(false); }}
                        className={`w-full text-start px-4 py-3 text-[12px] sm:text-[13px] tracking-[0.08em] uppercase font-[family-name:var(--font-ui)] transition-colors cursor-pointer ${selectedLocale === lang.value
                            ? "bg-gold/10 text-gold border-s-2 border-gold"
                            : "text-white/80 hover:bg-white/5 hover:text-white border-s-2 border-transparent"
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Custom Country Dropdown ── */}
              <div className="relative" ref={countryRef}>
                <button
                  type="button"
                  onClick={() => { setCountryOpen(!countryOpen); setLangOpen(false); }}
                  className="w-full flex items-center gap-3 bg-[#0A1118]/60 backdrop-blur-md border border-white/10 text-white font-[family-name:var(--font-ui)] text-[12px] sm:text-[13px] tracking-[0.08em] uppercase py-3 px-4 cursor-pointer hover:border-white/25 hover:bg-[#0A1118]/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  aria-label={selectedLocale === "ar" ? "البلد" : "Country"}
                  aria-expanded={countryOpen}
                >
                  <MapPin className="w-4 h-4 text-white/50 shrink-0" />
                  <span className="text-[10px] uppercase tracking-wider text-white/50 hidden sm:inline-block">
                    {selectedLocale === "ar" ? "الدولة:" : "Region:"}
                  </span>
                  <span className={`flex-1 text-start ${selectedCountry ? "text-white" : "text-white/40"}`}>
                    {selectedCountry || (selectedLocale === "ar" ? "اختر الدولة" : "Select Country")}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${countryOpen ? "rotate-180 text-gold" : ""}`} />
                </button>
                {countryOpen && (
                  <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-[#0A1118]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 max-h-[280px] overflow-y-auto gw-custom-scroll">
                    {COUNTRY_GROUPS.map((group) => (
                      <div key={group.label}>
                        <div className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase text-gold/60 font-[family-name:var(--font-ui)] font-bold border-b border-white/5 bg-white/[0.02] sticky top-0">
                          {group.label}
                        </div>
                        {group.countries.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setCountryOpen(false);
                              const arabCountries = ["Egypt", "Jordan", "Lebanon", "Iraq", "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Bahrain", "Oman", "Morocco", "Tunisia", "Algeria", "Libya"];
                              if (arabCountries.includes(c)) setSelectedLocale("ar");
                              else setSelectedLocale("en");
                            }}
                            className={`w-full text-start px-4 py-2.5 text-[12px] tracking-[0.05em] uppercase font-[family-name:var(--font-ui)] transition-colors cursor-pointer ${selectedCountry === c
                                ? "bg-gold/10 text-gold border-s-2 border-gold"
                                : "text-white/70 hover:bg-white/5 hover:text-white border-s-2 border-transparent"
                              }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enter Button — visible on sm+ */}
              <button
                onClick={handleEnter}
                disabled={!canEnter}
                className={`hidden sm:flex items-center justify-center gap-2 px-10 py-4 font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 backdrop-blur-md border border-transparent ${canEnter
                    ? "bg-gold/90 text-navy-deep hover:bg-gold hover:scale-[1.02] gw-btn-shimmer shadow-[0_0_30px_rgba(232,146,10,0.2)]"
                    : "bg-white/5 text-silver/20 cursor-not-allowed border-white/10"
                  }`}
                tabIndex={0}
              >
                <span>
                  {selectedLocale === "ar" ? "دخول" : "Enter"}
                </span>
                <ArrowRight className={`w-4 h-4 ${selectedLocale === "ar" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Enter Button — full width on mobile (PREMIUM) */}
            <button
              onClick={handleEnter}
              disabled={!canEnter}
              className={`sm:hidden w-full flex items-center justify-center gap-3 py-4 rounded-sm font-[family-name:var(--font-ui)] text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 border ${canEnter
                  ? "bg-gradient-to-r from-gold via-[#E89A0A] to-gold text-navy-deep hover:brightness-110 gw-btn-shimmer shadow-[0_4px_24px_rgba(232,146,10,0.25)] border-gold/30"
                  : "bg-white/5 text-silver/20 cursor-not-allowed border-white/10"
                }`}
              tabIndex={0}
            >
              {enterLabel}
              <ArrowRight className={`w-4 h-4 ${selectedLocale === "ar" ? "rotate-180" : ""}`} />
            </button>

            {/* Dynamic label under the row on desktop */}
            <div className="hidden sm:block">
              <p
                className={`text-center font-[family-name:var(--font-ui)] text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${canEnter ? "text-gold/60" : "text-silver/20"
                  }`}
              >
                {enterLabel}
              </p>
            </div>
          </div>
        </main>

        {/* ── Bottom ── */}
        <footer
          className={`px-6 sm:px-10 lg:px-16 py-3 sm:py-4 flex items-center justify-between border-t border-white/[0.08] transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"
            }`}
        >
          <button
            onClick={handleSkip}
            className="font-[family-name:var(--font-ui)] text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-silver/25 hover:text-silver/50 transition-colors cursor-pointer focus:outline-none"
            tabIndex={0}
          >
            {selectedLocale === "ar"
              ? "تخطي → الدخول للموقع"
              : "Skip for now → Enter site"}
          </button>
          <span className="font-[family-name:var(--font-ui)] text-[8px] tracking-[0.2em] uppercase text-silver/15">
            kafaahsolutions.com
          </span>
        </footer>
      </div>
    </div>
  );
}
