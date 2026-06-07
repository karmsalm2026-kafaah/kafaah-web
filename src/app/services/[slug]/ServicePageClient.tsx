"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Settings, 
  Award,
  Globe,
  Briefcase,
  AlertTriangle
} from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import type { Service } from "@/data/services";
import type { Technology } from "@/data/technologies";

interface Props {
  service: Service;
  relatedTechs: Technology[];
}

const getAudienceLabel = (audience: "owner" | "epc" | "both") => {
  if (audience === "owner") return "Project Owner Representative";
  if (audience === "epc") return "EPC Contractor Technical Partner";
  return "Flexible Owner & EPC Advisory";
};

export function ServicePageClient({ service, relatedTechs }: Props) {
  const audienceLabel = getAudienceLabel(service.audience);

  return (
    <>
      {/* Intro & Overview — Two-column layout in dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Rich Text Content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Service Overview
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-6 tracking-tight">
                  Independent Technical representation &amp; Field Support
                </h2>
                <div className="space-y-6">
                  {service.intro.map((p, i) => (
                    <p key={i} className="text-[16px] font-light text-silver/90 leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Premium Glassmorphic Service Details Card */}
            <div className="lg:col-span-5 w-full">
              <FadeIn delay={0.15}>
                <div className="relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-xl hover:border-gold/35 transition-all duration-500">
                  {/* Decorative gold stripe */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/50 via-gold to-gold/50" />
                  
                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] text-gold uppercase mb-6">
                    Service Specifications
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Service Number</div>
                      <div className="font-[family-name:var(--font-display)] text-2xl text-cloud font-semibold tracking-wide">
                        Service {service.num}
                      </div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Target Client Group</div>
                      <div className="text-silver font-medium text-sm flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gold" />
                        {audienceLabel}
                      </div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Operational Model</div>
                      <div className="text-silver font-light text-sm leading-relaxed">
                        Dedicated engineering support focusing on execution quality, risk mitigation, and performance guarantees.
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>

      {/* Scope & Deliverables Section — Dynamic cards grid in light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.005] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Scope of Service
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              Scope of Deliverables &amp; Core Execution
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.scope.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] group transition-all duration-500 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm bg-navy-deep flex items-center justify-center shrink-0 border border-white/[0.12] group-hover:border-gold/35 group-hover:bg-navy-deep transition-all duration-500">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-display)] text-[16px] text-cloud font-semibold mb-2 group-hover:text-gold transition-colors">
                      Deliverable {(idx + 1).toString().padStart(2, "0")}
                    </h4>
                    <p className="text-sm font-light text-silver/80 leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Execution Workflow Section — Custom visual timeline layout with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.005] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Execution Roadmap
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              Service Engagement &amp; Execution Workflow
            </h2>
          </FadeIn>

          {/* Process Timeline Grid */}
          <div className="relative mt-8">
            {/* Horizontal timeline connector bar on desktop — centered vertically inside the 48px circles (top-6) */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold/50 via-gold/10 to-gold/5 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {service.workflow.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="relative group flex flex-col h-full">
                  
                  {/* Step Bubble & Vertical Connector centered horizontally */}
                  <div className="flex flex-col items-center w-full relative">
                    <div className="w-12 h-12 rounded-full bg-navy-dark border border-white/[0.12] flex items-center justify-center font-[family-name:var(--font-display)] text-lg font-bold text-gold group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(229,193,88,0.25)] transition-all duration-500 z-10 relative">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    {/* Vertical line connecting the circle bubble to the card below */}
                    <div className="w-[1.5px] h-6 bg-gradient-to-b from-gold/40 to-white/[0.12] z-0" />
                  </div>
                  
                  {/* Step Info Card styled like Homepage with equal height sizing */}
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm flex-1 flex flex-col group-hover:border-gold/35 group-hover:bg-navy-card-hover/55 group-hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] transition-all duration-500">
                    <h3 className="font-[family-name:var(--font-display)] text-[15px] text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-light text-silver/80 leading-relaxed flex-1">
                      {step.desc}
                    </p>
                  </div>
                  
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Kafaah — Light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Why Kafaah
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud tracking-tight">
                  Proven Field Capabilities &amp; Technical Depth
                </h2>
              </FadeIn>
            </div>

            {/* Right Column: Paragraph blocks styled with gold left border */}
            <div className="lg:col-span-7 space-y-8">
              {service.whyKafaah.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-6 border-l-2 border-gold/40 hover:border-gold transition-colors duration-300">
                    <p className="text-[16px] font-light text-silver/90 leading-[1.8] text-justify">
                      {p}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Key Risks Managed & Mitigated Section with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/[0.005] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Risk Management
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              Critical Risks Managed &amp; Mitigated
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.risksMitigated.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full flex gap-5 items-start p-6 bg-amber-500/[0.01] hover:bg-amber-500/[0.02] border border-amber-500/20 hover:border-amber-500/40 rounded-sm transition-all duration-500">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-cloud/90 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-silver/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Technologies — Converted to cards in light (navy-dark) background */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section in dark (navy-deep) background */}
      <section className="py-28 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#e5c158 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[860px] mx-auto px-8 text-center relative z-10">
          <FadeIn>
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-5 inline-block">
              Request Technical Consult
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,4.5vw,54px)] leading-[1.05] text-cloud mb-6 tracking-tight">
              Ready to Secure Your {service.title} Deliverables?
            </h2>
            <p className="text-base md:text-lg font-light text-silver/80 mb-10 max-w-[620px] mx-auto leading-relaxed">
              Partner with independent technical advisors to safeguard your construction phase, pre-commissioning readiness, or operational efficiency.
            </p>
            
            <Link
              href="/contact/"
              className="group btn-premium-gold font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.12em] uppercase inline-flex items-center"
            >
              {/* Premium animated light sweep */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

              <span className="relative z-10 flex items-center gap-3 py-1">
                Consult with our experts
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
