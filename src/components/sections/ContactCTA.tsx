"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import type { ContactContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { contactCta as ctaDict, getFontClass, isRtl } from "@/lib/i18n";

const serviceOptions = [
  "Owner's Engineer",
  "Commissioning & Startup",
  "Operation Readiness",
  "Technical Troubleshooting",
  "Production Optimization",
  "Operator Training",
  "Investor Advisory"
];

function CustomSelect({ placeholder }: { placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full bg-navy-deep/50 border ${isOpen ? 'border-gold/60 bg-white/[0.03]' : 'border-white/[0.15] hover:border-white/[0.25]'} text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 transition-colors outline-none cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? "text-white" : "text-silver/60"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-silver/40'}`} />
      </div>
      
      <div 
        className={`absolute z-50 top-full left-0 w-full mt-2 bg-[#1A2E44] border border-white/[0.12] shadow-2xl transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
      >
        <div className="max-h-[240px] overflow-y-auto py-2">
          {serviceOptions.map((opt) => (
            <div
              key={opt}
              className={`px-4 py-3 text-[14px] font-light cursor-pointer transition-colors ${selected === opt ? 'bg-gold/10 text-gold' : 'text-silver/85 hover:bg-white/[0.08] hover:text-white'}`}
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  content?: ContactContent;
}

export function ContactCTA({ content }: Props) {
  const { locale } = useRole();
  const fc = getFontClass(locale, "display");
  const fcBody = getFontClass(locale);
  const rtl = isRtl(locale);
  const isEn = locale === "en";
  const isAr = locale === "ar";
  const eyebrow = content?.eyebrow?.[locale] ?? ctaDict.eyebrow[locale];
  const headline = content?.headline?.[locale] ?? ctaDict.headline[locale];
  const headlineAccent = content?.headlineAccent?.[locale] ?? ctaDict.headlineAccent[locale];
  const subCopy = content?.subCopy?.[locale] ?? ctaDict.subCopy[locale];

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="bg-navy py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left CTA */}
        <FadeIn>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                {eyebrow}
              </span>
            </div>
            <h2 className={`${fc} text-[clamp(36px,5vw,60px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.1]"} text-white mb-6`}>
              {headline}
              <br />
              <em className="text-gold not-italic">{headlineAccent}</em>
            </h2>
            <p className={`${fcBody} ${isAr ? "text-[17px] leading-[2]" : "text-[16px] leading-[1.8]"} font-light text-silver/85 mb-10`}>
              {subCopy}
            </p>
            <div className="flex gap-4 sm:gap-6 flex-col sm:flex-row items-stretch w-full sm:w-auto">
              <Link
                href="/contact/"
                className={`flex-1 group btn-premium-gold ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-bold`}
              >
                {/* Premium animated light sweep */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <span className={`relative z-10 flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                  {ctaDict.getInTouch[locale]}
                  <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "rotate-180" : ""}`} />
                </span>
              </Link>
              <a
                href="mailto:info@kafaahsolutions.com"
                className={`flex-1 group btn-premium-glass border border-white/20 hover:border-white/40 ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-bold`}
              >
                {/* Premium animated border */}
                <div className="animated-border-box rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className={`relative z-10 flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                  {ctaDict.sendEmail[locale]}
                  <Mail className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right: Quick Contact Panel */}
        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="bg-gradient-to-br from-navy-card/90 to-navy-deep/95 backdrop-blur-xl border border-white/[0.14] p-8 lg:p-10 relative group shadow-2xl z-10">
              {/* Left custom border - shortened from edges, stable */}
              <div className={`absolute ${rtl ? "right-0" : "left-0"} top-4 bottom-4 w-[4px] bg-gold rounded-${rtl ? "l" : "r"}-sm transition-all duration-500`} />
              
              {/* Top gold accent line - shortened from edges, appears on hover */}
              <div className="absolute top-0 left-4 right-4 h-[4px] bg-gold rounded-b-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[13px]"} font-bold text-silver/90 block mb-2`}>
                    {ctaDict.fullName[locale]}
                  </label>
                  <input
                    type="text"
                    placeholder={ctaDict.fullNamePlaceholder[locale]}
                    className={`w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/55 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none ${rtl ? "text-right" : ""}`}
                  />
                </div>
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[13px]"} font-bold text-silver/80 block mb-2`}>
                    {ctaDict.company[locale]}
                  </label>
                  <input
                    type="text"
                    placeholder={ctaDict.companyPlaceholder[locale]}
                    className={`w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/40 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none ${rtl ? "text-right" : ""}`}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[13px]"} font-bold text-silver/80 block mb-2`}>
                  {ctaDict.serviceOfInterest[locale]}
                </label>
                <CustomSelect placeholder={ctaDict.selectService[locale]} />
              </div>

              <div className="mb-6">
                <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[13px]"} font-bold text-silver/80 block mb-2`}>
                  {ctaDict.message[locale]}
                </label>
                <textarea
                  placeholder={ctaDict.messagePlaceholder[locale]}
                  className={`w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/40 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none resize-y min-h-[100px] ${rtl ? "text-right" : ""}`}
                  rows={3}
                />
              </div>

              <button className={`w-full group btn-premium-gold ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-bold`}>
                {/* Premium animated light sweep */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <span className="relative z-10">{ctaDict.sendRequest[locale]}</span>
              </button>

              <div className={`mt-8 pt-6 border-t border-white/[0.10] flex gap-x-6 gap-y-3 flex-wrap`}>
                <span className={`${fcBody} ${isAr ? "text-[13px]" : "text-[12px] uppercase tracking-[0.05em]"} font-light text-silver/70 flex items-center gap-1.5`}>
                  {ctaDict.locationLabel[locale]}
                </span>
                <span className={`${fcBody} ${isAr ? "text-[13px]" : "text-[12px] uppercase tracking-[0.05em]"} font-light text-silver/70 flex items-center gap-1.5`}>
                  {ctaDict.responseTime[locale]}
                </span>
                <span className={`${fcBody} ${isAr ? "text-[13px]" : "text-[12px] uppercase tracking-[0.05em]"} font-light text-silver/70 flex items-center gap-1.5`}>
                  {ctaDict.confidential[locale]}
                </span>
              </div>
            </div>

            {/* Brand watermark - centered directly under the form */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-30 font-[family-name:var(--font-display)] text-[120px] text-white/[0.05] leading-none pointer-events-none select-none tracking-tighter uppercase z-0"
              aria-hidden="true"
            >
              Kafaah
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
