"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MapPin, ArrowRight, Clock, Building, Check, ChevronDown, PhoneCall, Award
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
    // Simulate API call for now
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row pt-[72px] bg-navy-dark overflow-hidden relative">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 hero-noise opacity-15 pointer-events-none z-0" />

      {/* Left side - Info Panel */}
      <div className="flex-1 p-8 sm:p-12 lg:p-16 xl:p-24 border-b lg:border-b-0 lg:border-e border-white/[0.06] flex flex-col justify-center relative overflow-hidden z-10">
        
        {/* Dark Industrial Hero Image underlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <picture>
            <source srcSet="/contact-hero-bg.webp" type="image/webp" />
            <img
              src="/contact-hero-bg.png"
              alt="Kafaah Engineering Complex"
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-100"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy-dark/95 to-navy-dark/85" />
          <div className="absolute -left-1/4 top-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-[520px]">
          <FadeIn className="space-y-6">
            <div className="flex items-center gap-3">
              <span className={`${fcUi} text-[10px] font-bold tracking-[0.25em] text-gold uppercase`}>
                {dict.pageTitle[locale]}
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>

            <h1 className={`${fcDisplay} text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white font-medium`}>
              <HoverWords text={dict.letsTalk[locale]} locale={locale} />
              <HoverWords text={dict.letsTalkAccent[locale]} locale={locale} isGradient={true} />
            </h1>

            <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[16px] leading-[1.8] font-light`}>
              <HoverSubcopy text={dict.respondTime[locale]} locale={locale} />
            </p>

            {/* Premium Headquarters and Contact card */}
            <div className="bg-navy-card/35 backdrop-blur-sm border border-white/[0.08] hover:border-gold/30 hover:bg-navy-card-hover/45 p-6 sm:p-8 rounded-sm transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.35)] space-y-6 mt-8">
              
              {/* Headquarters */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5 text-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] text-silver/45 uppercase block`}>
                    {dict.headquarters[locale]}
                  </span>
                  <span className={`${fcBody} text-sm font-semibold text-white mt-1 block`}>
                    {locale === "ar" ? "القاهرة، جمهورية مصر العربية" : locale === "zh" ? "埃及开罗" : "Cairo, Egypt"}
                  </span>
                  <span className="text-xs text-silver/50 font-light mt-0.5 block">
                    {locale === "ar" ? "التجمع الخامس، القاهرة الجديدة" : locale === "zh" ? "新开罗，第五定居点" : "Fifth Settlement, New Cairo"}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border-t border-white/[0.06] pt-5">
                <div className="p-2.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5 text-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] text-silver/45 uppercase block`}>
                    {dict.email[locale]}
                  </span>
                  <a 
                    href="mailto:info@kafaahsolutions.com" 
                    className="text-gold hover:text-gold-light transition-all text-sm font-semibold mt-1 inline-block hover:underline"
                    dir="ltr"
                  >
                    info@kafaahsolutions.com
                  </a>
                </div>
              </div>

              {/* Service response hours badge */}
              <div className="flex items-center gap-2.5 border-t border-white/[0.06] pt-5 text-[11px] font-mono text-silver/60">
                <Clock className="w-4 h-4 text-gold/80" />
                <span>{locale === "ar" ? "متاحون لحشد العمليات الهندسية على مدار الساعة طوال أيام الأسبوع" : "Engineering mobilization available 24/7"}</span>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="flex-1 p-8 sm:p-12 lg:p-16 xl:p-24 bg-navy-deep/40 flex flex-col justify-center relative z-10">
        
        {/* Glow corner element */}
        <div className="absolute -right-1/4 -bottom-1/4 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <FadeIn delay={0.15}>
          <div className="max-w-[520px] w-full mx-auto lg:mx-0">
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-navy-card/45 backdrop-blur border border-gold/40 p-8 sm:p-10 text-center rounded-sm shadow-[0_20px_50px_rgba(229,193,88,0.04)]"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 border border-gold/30 text-gold mb-5">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className={`${fcDisplay} text-2xl text-white font-semibold mb-3`}>
                    {dict.successTitle[locale]}
                  </h3>
                  <p className={`${fcBody} text-sm text-silver/80 font-light leading-relaxed`}>
                    {dict.successDesc[locale]}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Name & Company Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/45 block mb-2`}>
                        {dict.fullName[locale]} <span className="text-gold">*</span>
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="John Doe"
                        className={`w-full bg-navy-dark/60 backdrop-blur-sm border ${
                          errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-gold"
                        } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-3 rounded-sm`}
                      />
                      {errors.name && (
                        <span className="text-red-400 text-[11px] mt-1.5 block">{errors.name.message}</span>
                      )}
                    </div>
                    
                    <div>
                      <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/45 block mb-2`}>
                        {dict.companyLabel[locale]} <span className="text-gold">*</span>
                      </label>
                      <input
                        {...register("company")}
                        type="text"
                        placeholder="Acme Chemical Corp"
                        className={`w-full bg-navy-dark/60 backdrop-blur-sm border ${
                          errors.company ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-gold"
                        } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-3 rounded-sm`}
                      />
                      {errors.company && (
                        <span className="text-red-400 text-[11px] mt-1.5 block">{errors.company.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/45 block mb-2`}>
                      {dict.workEmail[locale]} <span className="text-gold">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="johndoe@company.com"
                      className={`w-full bg-navy-dark/60 backdrop-blur-sm border ${
                        errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-gold"
                      } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-3 rounded-sm`}
                    />
                    {errors.email && (
                      <span className="text-red-400 text-[11px] mt-1.5 block">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Custom Styled Select Dropdown */}
                  <div ref={dropdownRef} className="relative">
                    <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/45 block mb-2`}>
                      {dict.serviceLabel[locale]} <span className="text-gold">*</span>
                    </label>
                    
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectOpen(!selectOpen);
                      }}
                      className={`w-full flex items-center justify-between bg-navy-dark/60 backdrop-blur-sm border ${
                        errors.service ? "border-red-500/50" : selectOpen ? "border-gold" : "border-white/[0.08] hover:border-white/20"
                      } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white ${fcBody} text-sm font-light px-4 py-3 rounded-sm cursor-pointer select-none`}
                    >
                      <span className={selectedService ? "text-white" : "text-silver/30"}>
                        {selectedService 
                          ? (serviceLabels[selectedService]?.[locale] || selectedService) 
                          : dict.selectService[locale]}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${selectOpen ? "rotate-180" : ""}`} />
                    </div>

                    <AnimatePresence>
                      {selectOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-30 left-0 right-0 mt-1.5 bg-navy-dark border border-white/[0.12] rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden max-h-[250px] overflow-y-auto"
                        >
                          {selectOptions.map((opt) => (
                            <div 
                              key={opt.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                setValue("service", opt.value, { shouldValidate: true });
                                setSelectOpen(false);
                              }}
                              className={`px-4 py-3 text-xs sm:text-sm cursor-pointer transition-colors duration-200 text-start flex items-center justify-between ${
                                selectedService === opt.value 
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
                      <span className="text-red-400 text-[11px] mt-1.5 block">{errors.service.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className={`${fcUi} text-[9.5px] font-bold tracking-[0.2em] uppercase text-silver/45 block mb-2`}>
                      {dict.messageLabel[locale]} <span className="text-gold">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder={locale === "ar" ? "أخبرنا بالتفصيل عن احتياجات مصنعك..." : "Tell us about your chemical plant challenges..."}
                      className={`w-full bg-navy-dark/60 backdrop-blur-sm border ${
                        errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/[0.08] focus:border-gold"
                      } focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-300 text-white placeholder-silver/20 ${fcBody} text-sm font-light px-4 py-3 rounded-sm resize-none`}
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-400 text-[11px] mt-1.5 block">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full relative overflow-hidden rounded-sm bg-gradient-to-r from-gold via-gold-light to-gold text-navy py-4 transition-all duration-300 shadow-md ${fcUi} text-xs font-bold tracking-[0.18em] uppercase disabled:opacity-75 disabled:cursor-not-allowed`}
                  >
                    {/* Animated Shimmer sweep */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-25 group-hover:animate-shimmer" />
                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>{isSubmitting ? dict.sending[locale] : dict.submit[locale]}</span>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1`} />
                    </span>
                  </button>

                </form>
              )}
            </AnimatePresence>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
