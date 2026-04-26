"use client";

import { FadeIn } from "@/components/Animations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for now. In reality, this would hit /api/contact
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="min-h-[calc(100vh-68px)] flex flex-col lg:flex-row">
      {/* Left side - Info */}
      <div className="flex-1 bg-navy-dark p-8 lg:p-16 xl:p-24 border-r border-divider flex flex-col justify-center relative overflow-hidden">
        <div
          className="absolute right-[-40px] bottom-[-40px] font-[family-name:var(--font-display)] text-[clamp(120px,25vw,360px)] text-navy-mid/20 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          K
        </div>
        
        <div className="relative z-10 max-w-[500px]">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
              Contact
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-8">
              Let&apos;s talk about your <em className="text-gold">plant.</em>
            </h1>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-12">
              We respond to all inquiries within 24 hours. Whether you need an Owner&apos;s Engineer, are facing a technical crisis, or need operators trained, we are ready to deploy.
            </p>

            <div className="space-y-8">
              <div>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-2">
                  Headquarters
                </div>
                <div className="text-cloud text-[15px] font-light leading-relaxed">
                  Cairo, Egypt
                </div>
              </div>
              
              <div>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-2">
                  Email
                </div>
                <a href="mailto:info@kafaahsolutions.com" className="text-gold hover:text-gold-light transition-colors text-[15px] font-light">
                  info@kafaahsolutions.com
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 bg-navy p-8 lg:p-16 xl:p-24 flex flex-col justify-center">
        <FadeIn delay={0.1}>
          <div className="max-w-[540px] w-full mx-auto lg:mx-0">
            {isSuccess ? (
               <div className="bg-gold/10 border border-gold p-8 text-center">
                  <div className="text-gold mb-3 text-2xl">✓</div>
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] text-cloud mb-2">Message Sent Successfully</h3>
                  <p className="text-sm text-silver font-light">
                     Thank you for reaching out. A specialist from our team will review your inquiry and respond within 24 hours.
                  </p>
               </div>
            ) : (
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                   <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted block mb-2">
                     Full Name <span className="text-gold">*</span>
                   </label>
                   <input
                     {...register("name")}
                     type="text"
                     className={`w-full bg-navy-dark border ${errors.name ? 'border-red-500/50' : 'border-divider'} focus:border-gold outline-none transition-colors text-cloud font-[family-name:var(--font-body)] text-sm font-light px-4 py-3`}
                   />
                   {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                 </div>
                 
                 <div>
                   <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted block mb-2">
                     Company <span className="text-gold">*</span>
                   </label>
                   <input
                     {...register("company")}
                     type="text"
                     className={`w-full bg-navy-dark border ${errors.company ? 'border-red-500/50' : 'border-divider'} focus:border-gold outline-none transition-colors text-cloud font-[family-name:var(--font-body)] text-sm font-light px-4 py-3`}
                   />
                   {errors.company && <span className="text-red-400 text-xs mt-1 block">{errors.company.message}</span>}
                 </div>
               </div>
 
               <div>
                 <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted block mb-2">
                   Work Email <span className="text-gold">*</span>
                 </label>
                 <input
                   {...register("email")}
                   type="email"
                   className={`w-full bg-navy-dark border ${errors.email ? 'border-red-500/50' : 'border-divider'} focus:border-gold outline-none transition-colors text-cloud font-[family-name:var(--font-body)] text-sm font-light px-4 py-3`}
                 />
                 {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
               </div>
 
               <div>
                 <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted block mb-2">
                   Service of Interest <span className="text-gold">*</span>
                 </label>
                 <select
                   {...register("service")}
                   className={`custom-select w-full bg-navy-dark border ${errors.service ? 'border-red-500/50' : 'border-divider'} focus:border-gold outline-none transition-colors text-cloud font-[family-name:var(--font-body)] text-sm font-light px-4 py-3 cursor-pointer`}
                 >
                   <option value="">Select a service...</option>
                   <option value="owners-engineer">Owner&apos;s Engineer</option>
                   <option value="commissioning">Commissioning & Startup</option>
                   <option value="readiness">Operation Readiness</option>
                   <option value="troubleshooting">Technical Troubleshooting</option>
                   <option value="optimization">Production Optimization</option>
                   <option value="training">Operator Training</option>
                   <option value="advisory">Investor Advisory</option>
                 </select>
                 {errors.service && <span className="text-red-400 text-xs mt-1 block">{errors.service.message}</span>}
               </div>
 
               <div>
                 <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted block mb-2">
                   Message <span className="text-gold">*</span>
                 </label>
                 <textarea
                   {...register("message")}
                   className={`w-full bg-navy-dark border ${errors.message ? 'border-red-500/50' : 'border-divider'} focus:border-gold outline-none transition-colors text-cloud font-[family-name:var(--font-body)] text-sm font-light px-4 py-3 resize-y min-h-[120px]`}
                 ></textarea>
                 {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
               </div>
 
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full font-[family-name:var(--font-ui)] text-[13px] font-bold tracking-[0.15em] uppercase bg-gold text-navy py-4 hover:bg-gold-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isSubmitting ? "Sending..." : "Submit Inquiry"}
               </button>
             </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
