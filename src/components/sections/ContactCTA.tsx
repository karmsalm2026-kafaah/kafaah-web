"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ChevronDown, Loader2, Check } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import type { ContactContent } from "@/data/roleContent";
import { useRole } from "@/lib/RoleContext";
import { contactCta as ctaDict, getFontClass, isRtl } from "@/lib/i18n";

const serviceOptions = [
  { value: "owners-engineer", label: "Owner's Engineer" },
  { value: "commissioning", label: "Commissioning & Startup" },
  { value: "readiness", label: "Operation Readiness" },
  { value: "troubleshooting", label: "Technical Troubleshooting" },
  { value: "optimization", label: "Production Optimization" },
  { value: "training", label: "Operator Training" },
  { value: "advisory", label: "Investor Advisory" },
];

function CustomSelect({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = serviceOptions.find((o) => o.value === value);

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
        className={`w-full bg-navy-deep/40 border ${
          isOpen 
            ? 'border-gold/50 bg-navy-deep/60 shadow-[0_0_15px_rgba(240,160,32,0.05)]' 
            : 'border-white/[0.08] hover:border-white/[0.18]'
        } text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 rounded-sm transition-all duration-300 outline-none cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-white" : "text-silver/45"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-silver/40'}`} />
      </div>
      
      <div 
        className={`absolute z-50 top-full left-0 w-full mt-2 bg-navy-card/90 backdrop-blur-xl border border-white/[0.06] shadow-[0_12px_30px_-10px_rgba(240,160,32,0.05)] rounded-sm transition-all duration-300 origin-top ${
          isOpen 
            ? 'opacity-100 scale-y-100 pointer-events-auto' 
            : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="max-h-[240px] overflow-y-auto py-2">
          {serviceOptions.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-3 text-[14px] font-light cursor-pointer transition-colors duration-200 ${
                value === opt.value 
                  ? 'bg-gold/10 text-gold font-medium' 
                  : 'text-silver/80 hover:bg-white/[0.05] hover:text-white'
              }`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
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

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !company.trim() || !service || !message.trim()) {
      setError(locale === "ar" ? "يرجى ملء جميع الحقول" : locale === "zh" ? "请填写所有字段" : "Please fill in all fields");
      setTimeout(() => setError(""), 4000);
      return;
    }

    if (!email.includes("@")) {
      setError(locale === "ar" ? "يرجى إدخال بريد إلكتروني صحيح" : locale === "zh" ? "请输入有效的电子邮件地址" : "Please enter a valid email address");
      setTimeout(() => setError(""), 4000);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          service,
          message: message.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to send");
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setCompany("");
      setService("");
      setMessage("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("CTA form error:", err);
      setError(locale === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : locale === "zh" ? "发送失败，请重试" : "Something went wrong. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section dir={rtl ? "rtl" : "ltr"} className="bg-navy pt-16 pb-24 xs:pt-20 xs:pb-32 sm:pt-28 sm:pb-40 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10">
        {/* Left CTA */}
        <FadeIn>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" : fcBody + " text-[13px] sm:text-[14px]"} font-semibold text-gold`}>
                {eyebrow}
              </span>
            </div>
            <h2 className={`${fc} text-[clamp(26px,5vw,60px)] ${isAr ? "leading-[1.5] font-bold" : "leading-[1.1]"} text-white mb-6`}>
              {headline}
              <br />
              <em className="text-gold not-italic">{headlineAccent}</em>
            </h2>
            <p className={`${fcBody} ${isAr ? "text-[14.5px] xs:text-[17px] leading-[1.8]" : "text-[13.5px] xs:text-[16px] leading-[1.7]"} font-light text-silver/85 mb-8 sm:mb-10`}>
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
                href="mailto:business@kafaahsolutions.com"
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
          <div className="relative group">
            <div className="bg-navy-card/45 backdrop-blur-xl border border-white/[0.12] group-hover:border-gold/35 group-hover:bg-navy-card-hover/60 p-3.5 xs:p-5 sm:p-8 lg:p-10 relative group shadow-2xl transition-all duration-500 rounded-sm z-10 group-hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)]">
              {/* Animated Vertical Accent bar */}
              <div className={`absolute ${rtl ? 'right-0 rounded-l-sm' : 'left-0 rounded-r-sm'} top-6 bottom-6 w-[3px] bg-gold/30 group-hover:bg-gold group-hover:top-4 group-hover:bottom-4 transition-all duration-500`} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/60 block mb-2 transition-colors duration-300`}>
                    {ctaDict.fullName[locale]}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={ctaDict.fullNamePlaceholder[locale]}
                    className={`w-full bg-navy-deep/40 border border-white/[0.08] hover:border-white/[0.18] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 rounded-sm placeholder:text-silver/45 focus:border-gold/50 focus:bg-navy-deep/60 focus:shadow-[0_0_15px_rgba(240,160,32,0.05)] transition-all duration-300 outline-none ${rtl ? "text-right" : ""}`}
                  />
                </div>
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/60 block mb-2 transition-colors duration-300`}>
                    {ctaDict.company[locale]}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={ctaDict.companyPlaceholder[locale]}
                    className={`w-full bg-navy-deep/40 border border-white/[0.08] hover:border-white/[0.18] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 rounded-sm placeholder:text-silver/45 focus:border-gold/50 focus:bg-navy-deep/60 focus:shadow-[0_0_15px_rgba(240,160,32,0.05)] transition-all duration-300 outline-none ${rtl ? "text-right" : ""}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/60 block mb-2 transition-colors duration-300`}>
                    {ctaDict.email[locale]}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={ctaDict.emailPlaceholder[locale]}
                    className={`w-full bg-navy-deep/40 border border-white/[0.08] hover:border-white/[0.18] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 rounded-sm placeholder:text-silver/45 focus:border-gold/50 focus:bg-navy-deep/60 focus:shadow-[0_0_15px_rgba(240,160,32,0.05)] transition-all duration-300 outline-none ${rtl ? "text-right" : ""}`}
                  />
                </div>
                <div>
                  <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/60 block mb-2 transition-colors duration-300`}>
                    {ctaDict.serviceOfInterest[locale]}
                  </label>
                  <CustomSelect
                    placeholder={ctaDict.selectService[locale]}
                    value={service}
                    onChange={setService}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase" : fcBody + " text-[12px]"} font-bold text-silver/60 block mb-2 transition-colors duration-300`}>
                  {ctaDict.message[locale]}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={ctaDict.messagePlaceholder[locale]}
                  className={`w-full bg-navy-deep/40 border border-white/[0.08] hover:border-white/[0.18] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 rounded-sm placeholder:text-silver/45 focus:border-gold/50 focus:bg-navy-deep/60 focus:shadow-[0_0_15px_rgba(240,160,32,0.05)] transition-all duration-300 outline-none resize-y min-h-[100px] ${rtl ? "text-right" : ""}`}
                  rows={3}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className={`${fcBody} text-red-400 text-[13px] mb-4 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-sm`}>
                  {error}
                </div>
              )}

              {/* Success Message */}
              {isSuccess && (
                <div className={`${fcBody} text-emerald-400 text-[13px] mb-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-sm flex items-center gap-2`}>
                  <Check className="w-4 h-4 shrink-0" />
                  {locale === "ar" ? "تم إرسال طلبك بنجاح! سنتواصل معك قريباً." : locale === "zh" ? "您的请求已成功发送！我们将尽快与您联系。" : "Your request has been sent successfully! We'll be in touch soon."}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full group btn-premium-gold ${isEn ? "font-[family-name:var(--font-ui)] text-[11px] tracking-[0.15em] uppercase" : fcBody + " text-[14px]"} font-bold ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {/* Premium animated light sweep */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {locale === "ar" ? "جاري الإرسال..." : locale === "zh" ? "正在发送..." : "Sending..."}
                    </>
                  ) : (
                    ctaDict.sendRequest[locale]
                  )}
                </span>
              </button>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-3">
                <span className={`${fcBody} text-[11px] px-2.5 py-1 rounded-[3px] bg-gold/[0.03] text-gold tracking-wide font-medium border border-gold/10 flex items-center gap-1.5 hover:bg-gold/[0.08] transition-colors duration-300`}>
                  <svg className="w-3.5 h-3.5 text-gold/90 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="11" r="3" strokeWidth="1.8" />
                  </svg>
                  {ctaDict.locationLabel[locale]}
                </span>
                <span className={`${fcBody} text-[11px] px-2.5 py-1 rounded-[3px] bg-gold/[0.03] text-gold tracking-wide font-medium border border-gold/10 flex items-center gap-1.5 hover:bg-gold/[0.08] transition-colors duration-300`}>
                  <svg className="w-3.5 h-3.5 text-gold/90 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {ctaDict.responseTime[locale]}
                </span>
                <span className={`${fcBody} text-[11px] px-2.5 py-1 rounded-[3px] bg-gold/[0.03] text-gold tracking-wide font-medium border border-gold/10 flex items-center gap-1.5 hover:bg-gold/[0.08] transition-colors duration-300`}>
                  <svg className="w-3.5 h-3.5 text-gold/90 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
                    <path d="M17 11V7a5 5 0 00-10 0v4" />
                  </svg>
                  {ctaDict.confidential[locale]}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
