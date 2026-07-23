"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, ArrowRight, Clock, Building, Check, ChevronDown, PhoneCall, Award, Loader2,
  Copy, ExternalLink, ShieldCheck, Zap, Globe, Sparkles, CheckCircle2
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
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
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
  const messageContent = watch("message") || "";

  const selectOptions = [
    { value: "owners-engineer" },
    { value: "commissioning" },
    { value: "readiness" },
    { value: "troubleshooting" },
    { value: "optimization" },
    { value: "training" },
    { value: "advisory" }
  ];

  const quickChips = [
    "owners-engineer",
    "commissioning",
    "optimization",
    "troubleshooting"
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

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

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
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Contact form error:", err);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="w-full text-start bg-navy-deep min-h-screen lg:h-screen lg:max-h-screen relative overflow-hidden font-body flex flex-col justify-between">

      {/* Global Background Image across BOTH sides & Glowing Blur Orbs */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <picture>
          <source srcSet="/contact-full-bg.png" type="image/png" />
          <img
            src="/contact-full-bg.png"
            alt="Kafaah Industrial Engineering & Global Network"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105 transition-transform duration-[30s] ease-out hover:scale-100"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/90 to-navy-dark/95" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,193,88,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,193,88,0.05) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Soft glowing ambient lighting orbs */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8s]" />
        <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] bg-gold/5 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[12s]" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row pt-[72px] lg:pt-[68px] relative z-10 lg:overflow-hidden min-h-0">

        {/* Desktop Premium Divider */}
        <div className="hidden lg:block absolute left-[56%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)] border border-navy-deep" />
        </div>

        {/* Left side - Info Panel (Border-free, Sitting Directly on Page Background) */}
        <div className="w-full lg:w-[56%] xl:w-[58%] px-4 py-4 sm:p-6 lg:px-12 lg:py-4 xl:px-16 flex flex-col justify-center relative overflow-hidden shrink-0">

          <div className="relative z-10 max-w-[640px] w-full mx-auto">
            <FadeIn className="space-y-3.5 sm:space-y-4">

              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className={`${fcUi} text-[10px] font-bold tracking-[0.25em] text-gold uppercase flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {dict.pageTitle[locale]}
                </span>
                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
              </div>

              {/* Headline */}
              <h1 className={`${fcDisplay} text-[clamp(24px,3.8vw,48px)] leading-[1.15] text-white font-medium`}>
                <HoverWords text={dict.letsTalk[locale]} locale={locale} />
                <HoverWords text={dict.letsTalkAccent[locale]} locale={locale} isGradient={true} />
              </h1>

              {/* Paragraph */}
              <p className={`${fcBody} text-silver/85 text-xs sm:text-sm leading-[1.7] font-light max-w-[580px]`}>
                <HoverSubcopy text={dict.respondTime[locale]} locale={locale} />
              </p>

              {/* Trust SLA badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 pb-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-mono font-medium shadow-sm">
                  <Zap className="w-3 h-3 text-gold shrink-0" />
                  <span>{locale === "ar" ? "استجابة خلال 24 ساعة" : locale === "zh" ? "24小时内回复" : "24h Response SLA"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{locale === "ar" ? "سرية تامة وإتفاقية NDA" : locale === "zh" ? "严格保密协议" : "Strict NDA & Confidentiality"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-mono font-medium shadow-sm">
                  <Globe className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>{locale === "ar" ? "انتشار تشغيلي عالمي" : locale === "zh" ? "全球部署" : "Global Plant Deployment"}</span>
                </div>
              </div>

              {/* Location & Direct Phone Grid Sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Address Card */}
                <a
                  href="https://maps.google.com/?q=Cairo,Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/loc bg-gradient-to-b from-[#1b2b3d]/75 to-[#121f2d]/75 border border-white/[0.08] hover:border-gold/40 hover:bg-navy-card-hover/80 rounded-xl p-3 transition-all duration-300 flex flex-col gap-1 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover/loc:scale-110 transition-transform">
                      <MapPin className="w-3 h-3" />
                    </div>
                    <ExternalLink className="w-3 h-3 text-silver/40 group-hover/loc:text-gold transition-colors" />
                  </div>
                  <div>
                    <span className={`${fcUi} text-[8.5px] font-bold tracking-[0.18em] text-silver/45 uppercase block`}>
                      {dict.headquarters[locale]}
                    </span>
                    <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block group-hover/loc:text-gold transition-colors`}>
                      {locale === "ar" ? "القاهرة، جمهورية مصر العربية" : locale === "zh" ? "埃及开罗" : "Cairo, Egypt"}
                    </span>
                    <span className="text-[10.5px] text-silver/50 font-light block">
                      {locale === "ar" ? "التجمع الخامس، القاهرة الجديدة" : locale === "zh" ? "新开罗，第五定居点" : "Fifth Settlement, New Cairo"}
                    </span>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href="tel:+201018081191"
                  className="group/phone bg-gradient-to-b from-[#1b2b3d]/75 to-[#121f2d]/75 border border-white/[0.08] hover:border-gold/40 hover:bg-navy-card-hover/80 rounded-xl p-3 transition-all duration-300 flex flex-col gap-1 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover/phone:scale-110 transition-transform">
                      <PhoneCall className="w-3 h-3" />
                    </div>
                    <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                      {locale === "ar" ? "مباشر" : "Direct"}
                    </span>
                  </div>
                  <div>
                    <span className={`${fcUi} text-[8.5px] font-bold tracking-[0.18em] text-silver/45 uppercase block`}>
                      {locale === "ar" ? "الهاتف المباشر" : "Direct Line"}
                    </span>
                    <span className="text-xs font-semibold text-gold group-hover/phone:text-gold-light transition-colors mt-0.5 block" dir="ltr">
                      +20 10 18081191
                    </span>
                    <span className="text-[10.5px] text-silver/50 font-light block">
                      {locale === "ar" ? "اتصال فوري أو واتساب" : "Instant Call or WhatsApp"}
                    </span>
                  </div>
                </a>
              </div>

              {/* Email Sub-cards Section */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-gold/10 rounded-md border border-gold/15 shrink-0 text-gold">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className={`${fcUi} text-[9px] font-bold tracking-[0.2em] text-silver/45 uppercase block`}>
                    {dict.email[locale]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {[
                    { label: locale === "ar" ? "استعلامات عامة" : locale === "zh" ? "一般咨询" : "General Inquiries", email: "info@kafaahsolutions.com" },
                    { label: locale === "ar" ? "المدير التنفيذي" : locale === "zh" ? "首席执行官" : "CEO Direct", email: "moustafa@kafaahsolutions.com" },
                    { label: locale === "ar" ? "المشاريع والهندسة" : locale === "zh" ? "项目与工程" : "Projects & Eng", email: "projects@kafaahsolutions.com" },
                    { label: locale === "ar" ? "تطوير الأعمال" : locale === "zh" ? "商务拓展" : "Business Dev", email: "business@kafaahsolutions.com" },
                  ].map((item) => {
                    const isCopied = copiedEmail === item.email;
                    return (
                      <div
                        key={item.email}
                        className="group/card bg-gradient-to-b from-[#1b2b3d]/75 to-[#121f2d]/75 border border-white/[0.08] hover:border-gold/40 hover:bg-navy-card-hover/80 rounded-xl p-2.5 transition-all duration-300 flex flex-col gap-1 shadow-md relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`${fcBody} text-[9.5px] font-medium text-silver/50 tracking-wide`}>
                            {item.label}
                          </span>
                          <button
                            onClick={(e) => handleCopyEmail(e, item.email)}
                            title="Copy Email"
                            className="text-silver/30 hover:text-gold transition-colors p-0.5 rounded hover:bg-white/5"
                          >
                            {isCopied ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-[11.5px] font-semibold text-gold group-hover/card:text-gold-light transition-colors break-all leading-tight"
                          dir="ltr"
                        >
                          {item.email}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service response hours badge */}
              <div className="flex items-center gap-2.5 pt-1 text-[10.5px] font-mono text-silver/65">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{locale === "ar" ? "متاحون لحشد العمليات الهندسية على مدار الساعة" : "Engineering mobilization available 24/7"}</span>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Right side - Contact Form (Compact 44% Layout) */}
        <div className="w-full lg:w-[44%] xl:w-[42%] px-4 py-4 sm:p-6 lg:px-8 lg:py-4 bg-navy-deep/20 flex flex-col justify-center relative shrink-0">

          {/* Mobile Premium Divider */}
          <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)] border border-navy-deep" />
          </div>

          {/* Glow corner element */}
          <div className="absolute -right-1/4 -bottom-1/4 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

          <FadeIn delay={0.15}>
            <div className="max-w-[480px] w-full mx-auto">

              {/* Form Card wrapper with Glassmorphism and Compact Paddings */}
              <div className="bg-gradient-to-br from-navy-card/45 via-navy-card/20 to-navy-dark/40 backdrop-blur-[20px] border border-white/[0.06] hover:border-gold/25 transition-all duration-500 rounded-xl p-4 sm:p-7 relative group shadow-[0_15px_40px_rgba(0,0,0,0.4)]">

                {/* Architectural corner highlights matching the card's rounded border */}
                <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-gold/70 rounded-tl-xl pointer-events-none" />
                <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-gold/70 rounded-tr-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-gold/70 rounded-bl-xl pointer-events-none" />
                <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-gold/70 rounded-br-xl pointer-events-none" />

                {/* Thin golden top border line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none" />

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8 px-4 sm:px-6 relative overflow-hidden"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 text-gold mb-6 shadow-[0_0_30px_rgba(240,160,32,0.2)] animate-pulse">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className={`${fcDisplay} text-2xl text-white font-semibold mb-4 tracking-wide`}>
                        {dict.successTitle[locale]}
                      </h3>
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
                      <p className={`${fcBody} text-sm text-silver/85 font-light leading-relaxed max-w-[380px] mx-auto`}>
                        {dict.successDesc[locale]}
                      </p>

                      <button
                        onClick={() => setIsSuccess(false)}
                        className={`mt-6 px-5 py-2 rounded-lg border border-gold/45 text-gold hover:bg-gold/10 transition-all duration-300 ${fcUi} text-xs font-bold tracking-[0.15em] uppercase`}
                      >
                        {locale === "ar" ? "إرسال رسالة أخرى" : locale === "zh" ? "发送另一条消息" : "Send Another Message"}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

                      {/* Name & Company Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.fullName[locale]} <span className="text-gold">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              {...register("name")}
                              type="text"
                              placeholder="John Doe"
                              className={`w-full bg-white/[0.03] border ${errors.name ? "border-red-500/40 focus:border-red-500" : "border-white/[0.08] hover:border-white/20 focus:border-gold"
                                } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-xs sm:text-sm font-light px-3.5 py-2.5 rounded-lg`}
                            />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                          </div>
                          {errors.name && (
                            <span className="text-red-400 text-[10.5px] mt-0.5 block">{errors.name.message}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.companyLabel[locale]} <span className="text-gold">*</span>
                          </label>
                          <div className="relative group">
                            <input
                              {...register("company")}
                              type="text"
                              placeholder="Acme Chemical Corp"
                              className={`w-full bg-white/[0.03] border ${errors.company ? "border-red-500/40 focus:border-red-500" : "border-white/[0.08] hover:border-white/20 focus:border-gold"
                                } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-xs sm:text-sm font-light px-3.5 py-2.5 rounded-lg`}
                            />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                          </div>
                          {errors.company && (
                            <span className="text-red-400 text-[10.5px] mt-0.5 block">{errors.company.message}</span>
                          )}
                        </div>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                          <span className="w-1 h-1 rounded-full bg-gold/60" />
                          {dict.workEmail[locale]} <span className="text-gold">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="johndoe@company.com"
                            className={`w-full bg-white/[0.03] border ${errors.email ? "border-red-500/40 focus:border-red-500" : "border-white/[0.08] hover:border-white/20 focus:border-gold"
                              } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-xs sm:text-sm font-light px-3.5 py-2.5 rounded-lg`}
                          />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                        </div>
                        {errors.email && (
                          <span className="text-red-400 text-[10.5px] mt-0.5 block">{errors.email.message}</span>
                        )}
                      </div>

                      {/* Service of Interest */}
                      <div ref={dropdownRef} className="relative space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.serviceLabel[locale]} <span className="text-gold">*</span>
                          </label>
                        </div>

                        {/* Quick Selection Service Chips */}
                        <div className="flex flex-wrap gap-1 pb-0.5">
                          {quickChips.map((chipKey) => {
                            const isSelected = selectedService === chipKey;
                            return (
                              <button
                                key={chipKey}
                                type="button"
                                onClick={() => setValue("service", chipKey, { shouldValidate: true })}
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-all border ${
                                  isSelected
                                    ? "bg-gold text-navy-deep border-gold font-bold shadow-[0_0_8px_rgba(240,160,32,0.3)]"
                                    : "bg-white/[0.03] text-silver/70 border-white/[0.08] hover:border-gold/40 hover:text-white"
                                }`}
                              >
                                {serviceLabels[chipKey]?.[locale] || chipKey}
                              </button>
                            );
                          })}
                        </div>

                        <div className="relative group">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectOpen(!selectOpen);
                            }}
                            className={`w-full flex items-center justify-between bg-white/[0.03] border ${errors.service ? "border-red-500/40" : selectOpen ? "border-gold shadow-[0_0_15px_rgba(240,160,32,0.25)]" : "border-white/[0.08] hover:border-white/20"
                              } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white ${fcBody} text-xs sm:text-sm font-light px-3.5 py-2.5 rounded-lg cursor-pointer select-none`}
                          >
                            <span className={selectedService ? "text-white font-medium" : "text-silver/30"}>
                              {selectedService
                                ? (serviceLabels[selectedService]?.[locale] || selectedService)
                                : dict.selectService[locale]}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${selectOpen ? "rotate-180" : ""}`} />
                          </div>
                          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out rounded-full pointer-events-none ${selectOpen ? 'w-[80%]' : 'w-0'}`} />
                        </div>

                        <AnimatePresence>
                          {selectOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-30 left-0 right-0 mt-1 bg-navy-dark/95 backdrop-blur-xl border border-white/[0.12] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden max-h-[220px] overflow-y-auto"
                            >
                              {selectOptions.map((opt) => (
                                <div
                                  key={opt.value}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setValue("service", opt.value, { shouldValidate: true });
                                    setSelectOpen(false);
                                  }}
                                  className={`px-3.5 py-2.5 text-xs cursor-pointer transition-colors duration-200 text-start flex items-center justify-between ${selectedService === opt.value
                                      ? "bg-gold/15 text-gold font-semibold"
                                      : "text-silver/80 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                >
                                  <span>{serviceLabels[opt.value]?.[locale] || opt.value}</span>
                                  {selectedService === opt.value && <Check className="w-3.5 h-3.5 text-gold" />}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {errors.service && (
                          <span className="text-red-400 text-[10.5px] mt-0.5 block">{errors.service.message}</span>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/40 block flex items-center gap-1.5`}>
                            <span className="w-1 h-1 rounded-full bg-gold/60" />
                            {dict.messageLabel[locale]} <span className="text-gold">*</span>
                          </label>
                          <span className="text-[9.5px] font-mono text-silver/30">
                            {messageContent.length} / 500
                          </span>
                        </div>
                        <div className="relative group">
                          <textarea
                            {...register("message")}
                            rows={3}
                            maxLength={500}
                            placeholder={locale === "ar" ? "أخبرنا بالتفصيل عن احتياجات مصنعك..." : "Tell us about your chemical plant challenges..."}
                            className={`w-full bg-white/[0.03] border ${errors.message ? "border-red-500/40 focus:border-red-500" : "border-white/[0.08] hover:border-white/20 focus:border-gold"
                              } focus:bg-navy-dark/95 focus:shadow-[0_0_15px_rgba(240,160,32,0.25)] outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-xs sm:text-sm font-light px-3.5 py-2.5 rounded-lg resize-none`}
                          ></textarea>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 ease-out group-focus-within:w-[80%] rounded-full pointer-events-none" />
                        </div>
                        {errors.message && (
                          <span className="text-red-400 text-[10.5px] mt-0.5 block">{errors.message.message}</span>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold text-navy py-3 transition-all duration-300 shadow-[0_8px_20px_rgba(240,160,32,0.2)] hover:shadow-[0_12px_25px_rgba(240,160,32,0.35)] hover:-translate-y-0.5 active:translate-y-0 ${fcUi} text-xs font-bold tracking-[0.18em] uppercase disabled:opacity-75 disabled:cursor-not-allowed`}
                      >
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
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-navy" />
                              <span>{dict.sending[locale]}</span>
                            </>
                          ) : (
                            <>
                              <span>{dict.submit[locale]}</span>
                              <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
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

      {/* Bottom Industrial Trust & Assurance Banner */}
      <div className="w-full border-t border-white/[0.08] bg-navy-dark/90 backdrop-blur-xl py-3.5 px-4 sm:px-8 relative z-20 shrink-0">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-start">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 shadow-[0_0_10px_rgba(240,160,32,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className={`${fcDisplay} text-xs font-semibold text-white`}>
                {locale === "ar" ? "تواصل مباشر مع كبار مستشاري هندسة المصانع" : locale === "zh" ? "直接与高级工业顾问沟通" : "Direct Access to Senior Industrial Consultants"}
              </h4>
              <p className="text-[10.5px] font-light text-silver/60">
                {locale === "ar" ? "بدون وسطاء مبيعات — استجابة فنية مباشرة لمشروعك" : locale === "zh" ? "无销售中介 — 为您的项目提供直接技术响应" : "No sales intermediaries — direct technical engineering response for your project"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10.5px] text-silver/70 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-gold shrink-0" />
              {locale === "ar" ? "تقييم فني سري" : locale === "zh" ? "保密技术评估" : "Confidential Review"}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-gold shrink-0" />
              {locale === "ar" ? "جاهزية تعبئة سريعة" : locale === "zh" ? "快速部署准备" : "Rapid Mobilization"}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
