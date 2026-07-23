"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, ArrowRight, Clock, Building, Check, ChevronDown, PhoneCall, Award, Loader2
} from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { contactPage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const serviceLabels: Record<string, Record<string, string>> = {
  "owners-engineer": { en: "Owner's Engineer", ar: "مهندس المالك", zh: "业主工程师" },
  "commissioning": { en: "Commissioning & Startup", ar: "التشغيل والبدء التجريبي", zh: "调试与启动" },
  "readiness": { en: "Operation Readiness", ar: "جاهزية التشغيل والعمليات", zh: "运营准备就绪" },
  "troubleshooting": { en: "Technical Troubleshooting", ar: "استكشاف الأعطال الفنية", zh: "技术故障排除" },
  "optimization": { en: "Production Optimization", ar: "تحسين الأداء والإنتاج", zh: "生产优化" },
  "training": { en: "Operator Training", ar: "تدريب المشغلين والمهندسين", zh: "操作员培训" },
  "advisory": { en: "Investor Advisory", ar: "استشارات المستثمرين والملاك", zh: "投资者咨询" }
};

function HoverWords({ text, locale, isGradient = false }: { text: string; locale: string; isGradient?: boolean }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.28em] rtl:mr-0 rtl:ml-[0.28em]"
            } ${isGradient
              ? "bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold font-black"
              : ""
            }`}
          whileHover={{
            scale: 1.08,
            y: -3,
            filter: isGradient ? "drop-shadow(0 0 8px rgba(229, 193, 88, 0.6))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            color: isGradient ? undefined : "#f3e1b3",
            transition: { type: "spring", stiffness: 350, damping: 10 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function HoverSubcopy({ text, locale }: { text: string; locale: string }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.25em] rtl:mr-0 rtl:ml-[0.25em]"
            }`}
          whileHover={{
            scale: 1.04,
            y: -1,
            color: "#ffffff",
            textShadow: "0 0 4px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 12 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: ""
    }
  });

  const selectedService = watch("service");

  const selectOptions = [
    { value: "owners-engineer" },
    { value: "commissioning" },
    { value: "readiness" },
    { value: "troubleshooting" },
    { value: "optimization" },
    { value: "training" },
    { value: "advisory" }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSelectOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
      reset();
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      // Show error state — set a generic error the user can see
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="w-full text-start bg-navy-deep min-h-screen relative overflow-hidden font-body">

      {/* Global Blueprint Grid Underlay & Glowing Blur Orbs */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,193,88,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,193,88,0.05) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/95 to-navy-dark" />

        {/* Soft glowing ambient lighting orbs */}
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[12s]" />
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row pt-[72px] relative z-10">

        {/* Desktop Premium Divider */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)] border border-navy-deep" />
        </div>

        {/* Left side - Info Panel */}
        <div className="flex-1 px-4 py-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-center relative overflow-hidden">

          {/* Dark Industrial Hero Image underlay */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <picture>
              <source srcSet="/contact-hero-bg.webp" type="image/webp" />
              <img
                src="/contact-hero-bg.png"
                alt="Kafaah Engineering Complex"
                className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy-dark/95 to-navy-dark/85" />
            <div className="absolute -left-1/4 top-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-[540px] w-full mx-auto p-4 sm:p-8 border border-white/[0.02] rounded-xl bg-navy-card/5 backdrop-blur-[5px]">
            {/* Architectural L-shaped corner marks framing the left content */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />

            <FadeIn className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`${fcUi} text-[10px] font-bold tracking-[0.25em] text-gold uppercase flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {dict.pageTitle[locale]}
                </span>
                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
              </div>

              <h1 className={`${fcDisplay} text-[clamp(24px,4.5vw,56px)] leading-[1.1] text-white font-medium`}>
                <HoverWords text={dict.letsTalk[locale]} locale={locale} />
                <HoverWords text={dict.letsTalkAccent[locale]} locale={locale} isGradient={true} />
              </h1>

              <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[16px] leading-[1.8] font-light`}>
                <HoverSubcopy text={dict.respondTime[locale]} locale={locale} />
              </p>

              {/* Premium Headquarters and Contact glassmorphic dashboard card with Live Gold Border */}
              <div className="bg-gradient-to-br from-navy-card/45 via-navy-card/25 to-navy-dark/40 backdrop-blur-[20px] border border-white/[0.08] hover:border-gold/30 hover:bg-navy-card-hover/20 p-4 xs:p-5 sm:p-7 rounded-xl transition-all duration-500 mt-8 relative group shadow-[0_15px_40px_rgba(0,0,0,0.5)]">

                {/* Architectural corner highlights matching the card's rounded border (Bentley/ROSHN style) */}
                <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-gold/70 rounded-tl-xl pointer-events-none" />
                <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-gold/70 rounded-tr-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-gold/70 rounded-bl-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-gold/70 rounded-br-xl pointer-events-none" />

                {/* Content wrapper to isolate space-y-6 from absolute positioned elements */}
                <div className="space-y-6">
                  {/* Headquarters Info Item */}
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="p-2.5 sm:p-3 bg-gold/10 rounded-lg border border-gold/15 shrink-0 mt-0.5 text-gold group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(240,160,32,0.1)]">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className={`${fcUi} text-[9px] sm:text-[9.5px] font-bold tracking-[0.2em] text-silver/45 uppercase block`}>
                        {dict.headquarters[locale]}
                      </span>
                      <span className={`${fcBody} text-sm sm:text-base font-semibold text-white mt-0.5 block`}>
                        {locale === "ar" ? "القاهرة، جمهورية مصر العربية" : locale === "zh" ? "埃及开罗" : "Cairo, Egypt"}
                      </span>
                      <span className="text-xs text-silver/50 font-light mt-0.5 block">
                        {locale === "ar" ? "التجمع الخامس، القاهرة الجديدة" : locale === "zh" ? "新开罗，第五定居点" : "Fifth Settlement, New Cairo"}
                      </span>
                    </div>
                  </div>

                  {/* Email Info Section */}
                  <div className="border-t border-white/[0.08] pt-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 sm:p-3 bg-gold/10 rounded-lg border border-gold/15 shrink-0 text-gold group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(240,160,32,0.1)]">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] text-silver/45 uppercase block`}>
                        {dict.email[locale]}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {[
                        { label: locale === "ar" ? "استعلامات عامة" : locale === "zh" ? "一般咨询" : "General Inquiries", email: "info@kafaahsolutions.com" },
                        { label: locale === "ar" ? "المدير التنفيذي" : locale === "zh" ? "首席执行官" : "CEO Direct", email: "moustafa@kafaahsolutions.com" },
                        { label: locale === "ar" ? "المشاريع" : locale === "zh" ? "项目" : "Projects", email: "projects@kafaahsolutions.com" },
                        { label: locale === "ar" ? "تطوير الأعمال" : locale === "zh" ? "商务拓展" : "Business Dev", email: "business@kafaahsolutions.com" },
                      ].map((item) => (
                        <a
                          key={item.email}
                          href={`mailto:${item.email}`}
                          className="group/card bg-gradient-to-b from-[#1b2b3d]/70 to-[#121f2d]/70 border border-white/[0.08] hover:border-gold/40 hover:bg-navy-card-hover/80 rounded-lg p-3 transition-all duration-300 flex flex-col gap-1 shadow-md relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <span className={`${fcBody} text-[10px] font-medium text-silver/50 tracking-wide`}>
                            {item.label}
                          </span>
                          <span className="text-[12px] sm:text-[12.5px] font-semibold text-gold group-hover/card:text-gold-light transition-colors break-all leading-tight" dir="ltr">
                            {item.email}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Service response hours badge */}
                  <div className="flex items-center gap-3 border-t border-white/[0.08] pt-4 text-[11px] font-mono text-silver/65">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{locale === "ar" ? "متاحون لحشد العمليات الهندسية على مدار الساعة طوال أيام الأسبوع" : "Engineering mobilization available 24/7"}</span>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="flex-1 px-4 py-8 sm:p-12 lg:p-16 xl:p-24 bg-navy-deep/20 flex flex-col justify-center relative">

          {/* Mobile Premium Divider */}
          <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)] border border-navy-deep" />
          </div>

          {/* Glow corner element */}
          <div className="absolute -right-1/4 -bottom-1/4 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

          <FadeIn delay={0.15}>
            <div className="max-w-[520px] w-full mx-auto">

              {/* Form Card wrapper with true Glassmorphism and Live Gold corners */}
              <div className="bg-gradient-to-br from-navy-card/30 via-navy-card/10 to-navy-dark/25 backdrop-blur-[20px] border border-white/[0.04] hover:border-gold/25 transition-all duration-500 rounded-xl p-4 sm:p-10 relative group">

                {/* Architectural corner highlights matching the card's rounded border */}
                <div className="absolute -top-[1px] -left-[1px] w-10 h-10 border-t-2 border-l-2 border-gold/70 rounded-tl-xl pointer-events-none" />
                <div className="absolute -top-[1px] -right-[1px] w-10 h-10 border-t-2 border-r-2 border-gold/70 rounded-tr-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -left-[1px] w-10 h-10 border-b-2 border-l-2 border-gold/70 rounded-bl-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -right-[1px] w-10 h-10 border-b-2 border-r-2 border-gold/70 rounded-br-xl pointer-events-none" />

                {/* Thin golden top border line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none" />

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12 px-6 sm:px-10 relative overflow-hidden"
                    >
                      {/* Success Card corner highlights */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/70 rounded-tl-xl pointer-events-none" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/70 rounded-tr-xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/70 rounded-bl-xl pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/70 rounded-br-xl pointer-events-none" />

                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/30 text-gold mb-8 shadow-[0_0_30px_rgba(240,160,32,0.2)] animate-pulse">
                        <Check className="w-10 h-10" />
                      </div>
                      <h3 className={`${fcDisplay} text-3xl text-white font-semibold mb-6 tracking-wide`}>
                        {dict.successTitle[locale]}
                      </h3>
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
                      <p className={`${fcBody} text-base text-silver/85 font-light leading-relaxed max-w-[420px] mx-auto`}>
                        {dict.successDesc[locale]}
                      </p>

                      <button
                        onClick={() => setIsSuccess(false)}
                        className={`mt-10 px-6 py-2.5 rounded-lg border border-gold/45 text-gold hover:bg-gold/10 transition-all duration-300 ${fcUi} text-xs font-bold tracking-[0.15em] uppercase`}
                      >
                        {locale === "ar" ? "إرسال رسالة أخرى" : locale === "zh" ? "发送另一条消息" : "Send Another Message"}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                      {/* Name & Company Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.fullName[locale]} <span className="text-gold">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              {...register("name")}
                              type="text"
                              placeholder="John Doe"
                              className={`w-full bg-white/[0.02] border ${errors.name ? "border-red-500/40 focus:border-red-500" : "border-white/[0.06] hover:border-white/15 focus:border-gold"
                                } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-[14px] rounded-lg`}
                            />
                            {/* Underline animation expanding from center */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                          </div>
                          {errors.name && (
                            <span className="text-red-400 text-[11px] mt-1 block">{errors.name.message}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.companyLabel[locale]} <span className="text-gold">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              {...register("company")}
                              type="text"
                              placeholder="Acme Chemical Corp"
                              className={`w-full bg-white/[0.02] border ${errors.company ? "border-red-500/40 focus:border-red-500" : "border-white/[0.06] hover:border-white/15 focus:border-gold"
                                } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-[14px] rounded-lg`}
                            />
                            {/* Underline animation expanding from center */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                          </div>
                          {errors.company && (
                            <span className="text-red-400 text-[11px] mt-1 block">{errors.company.message}</span>
                          )}
                        </div>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-2">
                        <label className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                          <span className="w-1 h-1 rounded-full bg-gold/60" />
                          {dict.workEmail[locale]} <span className="text-gold">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="johndoe@company.com"
                            className={`w-full bg-white/[0.02] border ${errors.email ? "border-red-500/40 focus:border-red-500" : "border-white/[0.06] hover:border-white/15 focus:border-gold"
                              } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-[14px] rounded-lg`}
                          />
                          {/* Underline animation expanding from center */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                        </div>
                        {errors.email && (
                          <span className="text-red-400 text-[11px] mt-1 block">{errors.email.message}</span>
                        )}
                      </div>

                      {/* Custom Styled Select Dropdown */}
                      <div ref={dropdownRef} className="relative space-y-2">
                        <label className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                          <span className="w-1 h-1 rounded-full bg-gold/60" />
                          {dict.serviceLabel[locale]} <span className="text-gold">*</span>
                        </label>

                        <div className="relative group">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectOpen(!selectOpen);
                            }}
                            className={`w-full flex items-center justify-between bg-white/[0.02] border ${errors.service ? "border-red-500/40" : selectOpen ? "border-gold shadow-[0_0_15px_rgba(240,160,32,0.25)]" : "border-white/[0.06] hover:border-white/15"
                              } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white ${fcBody} text-sm font-light px-4 py-[14px] rounded-lg cursor-pointer select-none`}
                          >
                            <span className={selectedService ? "text-white" : "text-silver/30"}>
                              {selectedService
                                ? (serviceLabels[selectedService]?.[locale] || selectedService)
                                : dict.selectService[locale]}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${selectOpen ? "rotate-180" : ""}`} />
                          </div>
                          {/* Underline animation expanding from center based on selectOpen state */}
                          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out rounded-full pointer-events-none ${selectOpen ? 'w-[80%]' : 'w-0'}`} />
                        </div>

                        <AnimatePresence>
                          {selectOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-30 left-0 right-0 mt-1.5 bg-navy-dark/95 backdrop-blur-xl border border-white/[0.12] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden max-h-[250px] overflow-y-auto"
                            >
                              {selectOptions.map((opt) => (
                                <div
                                  key={opt.value}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setValue("service", opt.value, { shouldValidate: true });
                                    setSelectOpen(false);
                                  }}
                                  className={`px-4 py-3 text-xs sm:text-sm cursor-pointer transition-colors duration-200 text-start flex items-center justify-between ${selectedService === opt.value
                                      ? "bg-gold/15 text-gold font-semibold"
                                      : "text-silver/80 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                >
                                  <span>{serviceLabels[opt.value]?.[locale] || opt.value}</span>
                                  {selectedService === opt.value && <Check className="w-4 h-4 text-gold" />}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {errors.service && (
                          <span className="text-red-400 text-[11px] mt-1 block">{errors.service.message}</span>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                          <span className="w-1 h-1 rounded-full bg-gold/60" />
                          {dict.messageLabel[locale]} <span className="text-gold">*</span>
                        </label>
                        <div className="relative group">
                          <textarea
                            {...register("message")}
                            rows={4}
                            placeholder={locale === "ar" ? "أخبرنا بالتفصيل عن احتياجات مصنعك..." : "Tell us about your chemical plant challenges..."}
                            className={`w-full bg-white/[0.02] border ${errors.message ? "border-red-500/40 focus:border-red-500" : "border-white/[0.06] hover:border-white/15 focus:border-gold"
                              } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-[14px] rounded-lg resize-none`}
                          ></textarea>
                          {/* Underline animation expanding from center */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                        </div>
                        {errors.message && (
                          <span className="text-red-400 text-[11px] mt-1 block">{errors.message.message}</span>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold text-navy py-4 transition-all duration-300 shadow-[0_10px_25px_rgba(240,160,32,0.2)] hover:shadow-[0_15px_30px_rgba(240,160,32,0.35)] hover:-translate-y-0.5 active:translate-y-0 ${fcUi} text-xs font-bold tracking-[0.18em] uppercase disabled:opacity-75 disabled:cursor-not-allowed`}
                      >
                        {/* Premium Automatic Looping Shimmer Sweep */}
                        <motion.div
                          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                          initial={{ x: "-150%" }}
                          animate={{ x: "150%" }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2.2,
                            ease: "easeInOut",
                            repeatDelay: 1.5
                          }}
                        />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-navy" />
                              <span>{dict.sending[locale]}</span>
                            </>
                          ) : (
                            <>
                              <span>{dict.submit[locale]}</span>
                              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                            </>
                          )}
                        </span>
                      </button>

                    </form>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
