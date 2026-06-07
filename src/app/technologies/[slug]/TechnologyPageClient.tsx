"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Layers, 
  Gauge, 
  Wrench, 
  RotateCw, 
  Flame, 
  Zap, 
  Thermometer, 
  Filter, 
  Cpu,
  Globe
} from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import type { Technology } from "@/data/technologies";
import type { Service } from "@/data/services";

interface Props {
  tech: Technology;
  relatedSvcs: Service[];
}

// Facts mapping for the sidebar card based on the slug
const getFacts = (slug: string) => {
  switch (slug) {
    case "sulfuric-acid":
      return {
        formula: "H₂SO₄",
        classification: "Strong Mineral Acid",
        state: "Liquid (Concentrated)",
        feedstocks: ["Elemental Sulfur", "Atmospheric Oxygen", "Process Water"],
        primaryUse: "Phosphate Fertilizers, Metal Leaching, Chemical Synthesis",
      };
    case "phosphoric-acid":
      return {
        formula: "H₃PO₄",
        classification: "Mineral Triprotic Acid",
        state: "Liquid (typically 54% P₂O₅)",
        feedstocks: ["Phosphate Rock (Apatite)", "Concentrated Sulfuric Acid"],
        primaryUse: "DAP, MAP, and TSP Fertilizer Production",
      };
    case "sulfate-of-potash":
      return {
        formula: "K₂SO₄",
        classification: "Premium Potassium Fertilizer",
        state: "Soluble Powder / Granular",
        feedstocks: ["Potassium Chloride (KCl)", "Sulfuric Acid (H₂SO₄)"],
        primaryUse: "Chloride-Sensitive Crops (Tobacco, Fruits, Vegetables)",
      };
    case "npk":
      return {
        formula: "N-P-K",
        classification: "Multicomponent Compound Fertilizer",
        state: "Granular / Solid Complex",
        feedstocks: ["Anhydrous Ammonia", "Phosphoric & Sulfuric Acid", "KCl / SOP"],
        primaryUse: "Balanced Crop Nutrition & Soil Amendment",
      };
    case "magnesium-sulphate":
      return {
        formula: "MgSO₄",
        classification: "Hydrated Magnesium Salt",
        state: "Crystalline Heptahydrate (Epsom Salt)",
        feedstocks: ["Magnesium Oxide (MgO)", "Sulfuric Acid (H₂SO₄)"],
        primaryUse: "Magnesium/Sulfur Deficient Soils, Industrial Applications",
      };
    case "ssp":
      return {
        formula: "Ca(H₂PO₄)₂·H₂O + CaSO₄",
        classification: "Simple Superphosphate",
        state: "Powder / Granular Compound",
        feedstocks: ["Phosphate Rock", "Sulfuric Acid (65-75% concentration)"],
        primaryUse: "Low-Cost Phosphorus & Calcium Soil Nutrition",
      };
    default:
      return {
        formula: "Chemical Compound",
        classification: "Industrial Chemistry",
        state: "Process Stream",
        feedstocks: ["Raw chemical ingredients"],
        primaryUse: "Industrial Manufacturing",
      };
  }
};

// Map equipment indices to suitable Lucide icons
const getEquipmentIcon = (index: number) => {
  const icons = [Settings, Layers, Gauge, Wrench, RotateCw, Flame, Filter, Zap, Thermometer];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-5 h-5 text-gold" />;
};

export function TechnologyPageClient({ tech, relatedSvcs }: Props) {
  const facts = getFacts(tech.slug);

  return (
    <>
      {/* Chemical Intro — Redesigned as dynamic 2-column layout */}
      <section className="py-24 bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Rich Text Content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Chemical Overview
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-6 tracking-tight">
                  Digesting the Chemistry &amp; Industry Role
                </h2>
                <div className="space-y-6">
                  {tech.chemicalIntro.map((p, i) => (
                    <p key={i} className="text-[16px] font-light text-silver/90 leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Premium Glassmorphic Quick Facts Card */}
            <div className="lg:col-span-5 w-full">
              <FadeIn delay={0.15}>
                <div className="relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-xl hover:border-gold/35 transition-all duration-500">
                  {/* Decorative gold stripe */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/50 via-gold to-gold/50" />
                  
                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] text-gold uppercase mb-6">
                    Quick Reference Card
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Chemical Formula</div>
                      <div className="font-[family-name:var(--font-display)] text-2xl text-cloud font-semibold tracking-wide">
                        {facts.formula}
                      </div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Classification</div>
                      <div className="text-silver font-medium text-sm">{facts.classification}</div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Physical State</div>
                      <div className="text-silver font-medium text-sm">{facts.state}</div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-2">Primary Feedstock</div>
                      <div className="flex flex-wrap gap-2">
                        {facts.feedstocks.map((item, idx) => (
                          <span key={idx} className="text-[11px] font-medium px-3 py-1 bg-navy-deep/60 border border-divider/60 text-silver rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-px bg-divider/60" />
                    
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Main Application</div>
                      <div className="text-silver font-light text-sm leading-relaxed">{facts.primaryUse}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>

      {/* Process Flow Section — Custom visual timeline layout with light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.005] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Process Flow
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              The Production &amp; Conversion Sequence
            </h2>
          </FadeIn>

          {/* Process Timeline Grid */}
          <div className="relative mt-8">
            {/* Horizontal timeline connector bar on desktop — centered vertically inside the 48px circles (top-6) */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold/50 via-gold/10 to-gold/5 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {tech.processSteps.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="relative group flex flex-col h-full">
                  
                  {/* Step Bubble & Vertical Connector centered horizontally */}
                  <div className="flex flex-col items-center w-full relative">
                    <div className="w-12 h-12 rounded-full bg-navy-deep border border-white/[0.12] flex items-center justify-center font-[family-name:var(--font-display)] text-lg font-bold text-gold group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(229,193,88,0.25)] transition-all duration-500 z-10 relative">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    {/* Vertical line connecting the circle bubble to the card below */}
                    <div className="w-[1.5px] h-6 bg-gradient-to-b from-gold/40 to-white/[0.12] z-0" />
                  </div>
                  
                  {/* Step Info Card styled like Homepage with equal height sizing */}
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm flex-1 flex flex-col group-hover:border-gold/35 group-hover:bg-navy-card-hover/55 group-hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] transition-all duration-500">
                    <h3 className="font-[family-name:var(--font-display)] text-[16px] text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
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

      {/* Key Equipment Grid Section with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Major Infrastructure
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              Key Equipment &amp; Machinery Assets
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tech.keyEquipment.map((eq, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] group transition-all duration-500">
                  <div className="w-10 h-10 rounded-sm bg-navy-deep flex items-center justify-center mb-5 border border-white/[0.12] group-hover:border-gold/30 group-hover:bg-navy-deep transition-all duration-500">
                    {getEquipmentIcon(idx)}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[17px] text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                    {eq.name}
                  </h3>
                  <p className="text-sm font-light text-silver/75 leading-relaxed">
                    {eq.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Commissioning Challenges Section with light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/[0.005] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Critical Risk Areas
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
              Commissioning Challenges &amp; Startup Risks
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tech.commissioningChallenges.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full flex gap-5 items-start p-6 bg-amber-500/[0.01] hover:bg-amber-500/[0.02] border border-amber-500/20 hover:border-amber-500/40 rounded-sm transition-all duration-500">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-cloud/90 mb-2">
                      Hurdle {(i + 1).toString().padStart(2, "0")}
                    </h3>
                    <p className="text-sm font-light text-silver/85 leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Kafaah's Experience — Highlighted completed project section with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className={`${tech.completedProject ? "lg:col-span-7" : "lg:col-span-12"}`}>
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Kafaah&apos;s Field Expertise
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-6 tracking-tight">
                  Operated. Started. Optimized.
                </h2>
                <div className="space-y-6">
                  {tech.kafaahExperience.map((p, i) => (
                    <p key={i} className="text-[16px] font-light text-silver/90 leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right: Immersive Project Highlight Banner (Only for Suez / Yanbu projects) */}
            {tech.completedProject && (
              <div className="lg:col-span-5 w-full">
                <FadeIn delay={0.2}>
                  <div className="relative group bg-navy-card/40 backdrop-blur-md border border-gold/30 p-8 rounded-sm shadow-2xl overflow-hidden hover:border-gold/50 transition-all duration-500">
                    {/* Glowing circular overlay */}
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gold/[0.03] group-hover:bg-gold/[0.06] rounded-full blur-3xl transition-all duration-500" />
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                      </div>
                      <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
                        Commissioned Project Profile
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-bold mb-4 tracking-tight leading-snug">
                      {tech.slug === "sulfate-of-potash" 
                        ? "Suez 40,000 TPA Mannheim SOP Plant" 
                        : "Yanbu Industrial NPK Granulation Unit"}
                    </h3>

                    <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                      {tech.slug === "sulfate-of-potash" 
                        ? "Successfully executed complete hot & cold commissioning sequences, refractory curing, HCl graphite absorption, and final quality parameter optimization for high-purity agricultural grade SOP." 
                        : "Led complete loop stabilization, chemical slurry recipe optimization, pipe reactor commissioning, and performance guarantee trials on-schedule for Kafaah's first GCC project."}
                    </p>

                    <div className="flex items-center gap-6 pt-5 border-t border-divider/60">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gold/80" />
                        <span className="text-xs font-semibold text-silver/90 uppercase tracking-wider font-[family-name:var(--font-ui)]">
                          {tech.slug === "sulfate-of-potash" ? "Suez, Egypt" : "Yanbu, KSA"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-gold/80" />
                        <span className="text-xs font-semibold text-silver/90 uppercase tracking-wider font-[family-name:var(--font-ui)]">
                          {tech.slug === "sulfate-of-potash" ? "Nov 2025" : "March 2026"}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Related Services Section with light (navy-dark) background */}
      {relatedSvcs.length > 0 && (
        <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                Synergies &amp; Solutions
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
                Related Advisory &amp; Engineering Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedSvcs.map((svc, idx) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-[9px] text-gold font-bold">
                          {svc.num}
                        </span>
                        Service Profile
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {svc.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Service Scope
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section with dark (navy-deep) background */}
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
              Optimizing or Commissioning a {tech.name} Plant?
            </h2>
            <p className="text-base md:text-lg font-light text-silver/80 mb-10 max-w-[620px] mx-auto leading-relaxed">
              Partner with specialized engineers who have directly operated and commissioned the exact same systems. Let&apos;s discuss your project targets.
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
