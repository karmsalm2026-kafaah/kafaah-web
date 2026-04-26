"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FadeIn } from "@/components/Animations";

export function ContactCTA() {
  return (
    <section className="bg-navy py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* K watermark */}
      <div
        className="absolute right-[-60px] bottom-[-40px] font-[family-name:var(--font-display)] text-[280px] text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter"
        aria-hidden="true"
      >
        K
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left CTA */}
        <FadeIn>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-gold to-gold/0" />
              <span className="font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold">
                05 — Contact
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,60px)] leading-[1.1] text-white mb-6">
              How can we
              <br />
              <em className="text-gold">help you?</em>
            </h2>
            <p className="text-[16px] font-light text-silver/70 leading-[1.8] mb-10">
              Whether you are building a new inorganic chemical plant, running an
              existing facility, or evaluating an investment — Kafaah brings 20
              years of direct operational expertise to your problem. We respond
              within 24 hours.
            </p>
            <div className="flex gap-4 sm:gap-6 flex-col sm:flex-row items-stretch w-full sm:w-auto">
              <Link
                href="/contact/"
                className="flex-1 group relative inline-flex items-center justify-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 overflow-hidden transition-all duration-300 border border-gold bg-gold text-navy-deep hover:bg-transparent hover:text-gold"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <a
                href="mailto:info@kafaahsolutions.com"
                className="flex-1 group relative inline-flex items-center justify-center gap-2 font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 overflow-hidden transition-all duration-300 border border-white/20 text-white hover:border-white hover:bg-white/5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Email
                  <Mail className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right: Quick Contact Panel */}
        <FadeIn delay={0.15}>
          <div className="bg-navy-card border border-white/[0.1] p-8 lg:p-10 relative group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-silver/80 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Dr. Ahmed Al-Rashid"
                  className="w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/40 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none"
                />
              </div>
              <div>
                <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-silver/80 block mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="SIPCHEM"
                  className="w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/40 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-silver/80 block mb-2">
                Service of Interest
              </label>
              <select 
                className="custom-select w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none cursor-pointer"
                aria-label="Service of Interest"
              >
                <option value="" className="bg-navy text-silver/50">Select a service…</option>
                <option className="bg-navy text-cloud">Owner&apos;s Engineer</option>
                <option className="bg-navy text-cloud">Commissioning &amp; Startup</option>
                <option className="bg-navy text-cloud">Operation Readiness</option>
                <option className="bg-navy text-cloud">Technical Troubleshooting</option>
                <option className="bg-navy text-cloud">Production Optimization</option>
                <option className="bg-navy text-cloud">Operator Training</option>
                <option className="bg-navy text-cloud">Investor Advisory</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-silver/80 block mb-2">
                Message
              </label>
              <textarea
                placeholder="Briefly describe your situation or question…"
                className="w-full bg-navy-deep/50 border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[14px] font-light px-4 py-3.5 placeholder:text-silver/40 focus:border-gold/60 focus:bg-white/[0.03] transition-colors outline-none resize-y min-h-[100px]"
                rows={3}
              />
            </div>

            <button className="w-full font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.15em] uppercase bg-white/5 border border-white/10 text-white py-4 hover:bg-gold hover:border-gold hover:text-navy-deep transition-all duration-300">
              Send Consultation Request
            </button>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex gap-x-6 gap-y-3 flex-wrap">
              <span className="text-[12px] font-light text-silver/50 flex items-center gap-1.5 uppercase tracking-[0.05em]">
                📍 Cairo, Egypt
              </span>
              <span className="text-[12px] font-light text-silver/50 flex items-center gap-1.5 uppercase tracking-[0.05em]">
                ⚡ Response within 24 hours
              </span>
              <span className="text-[12px] font-light text-silver/50 flex items-center gap-1.5 uppercase tracking-[0.05em]">
                🔒 Confidential
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
