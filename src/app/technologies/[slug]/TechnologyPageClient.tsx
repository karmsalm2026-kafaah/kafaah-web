"use client";

import { useState } from "react";
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

const FLOW_COLORS = {
  sulfur: "#eab308",
  gas: "#f97316",
  acid: "#dc2626",
  utility: "#0ea5e9",
  exhaust: "#94a3b8",
};

interface PFDNodeData {
  title: string;
  badge: [string, "warn" | "danger" | "info" | "ok"];
  body: string;
  kafaah: string;
  challenge?: string;
}

const pfdData: Record<string, PFDNodeData> = {
  air: {
    title: "Air Drying Tower",
    badge: ["Feed Conditioning", "info"],
    body: "Atmospheric process air must be thoroughly dehydrated before entering the combustor. Moisture reacts with downstream sulfur gases to form highly corrosive sulfuric acid mist (H₂SO₄), which destroys downstream ducting and asset metallurgy. Drying is accomplished by circulating concentrated 98% H₂SO₄ counter-currently through packed columns to lower the dewpoint below -40°C. Kafaah audits prioritize tower pressure drop checks, acid spray distribution patterns, and concentration telemetry validation.",
    kafaah: "Acid circulation rate controls, moisture breakthrough telemetry, and cross-flow packing checks."
  },
  melter: {
    title: "Sulfur Melter & Filtration Unit",
    badge: ["Feed Preparation", "info"],
    body: "Solid elemental sulfur is melted using low-pressure steam coils to reach its optimum pumping viscosity window at 135–145°C. Outside this window, elemental sulfur polymerizes and experiences a sharp viscosity increase. Pre-coat leaf filters clean the molten stream of organic impurities and ash content to prevent fouling the converter catalyst bed. Kafaah verifies steam trace integrity, filtration cycle profiles, and molten sulfur pump seal reliability.",
    kafaah: "Viscosity control loops, steam jacket maintenance validation, ash filtration efficiency indexes."
  },
  burner: {
    title: "Sulfur Burner (Combustor)",
    badge: ["Exothermic Reaction", "warn"],
    body: "S(l) + O₂(g) → SO₂(g) | ΔH = -297 kJ/mol. Molten sulfur is atomized into dry air inside a refractory-lined furnace. Temperatures run between 1000°C and 1100°C to achieve an efficient 10.5–11.5% SO₂ gas concentration matrix. Excursions above 1200°C risk thermal structural degradation of the refractory wall lining and generation of unwanted NOx emissions. Kafaah evaluates flame signature analytics, combustion air balancing, and structural outer shell thermography.",
    kafaah: "Burner nozzle wear patterns, refractory hot-spot checks via thermography, SO₂/O₂ input ratio control."
  },
  whb: {
    title: "Waste Heat Boiler (WHB)",
    badge: ["Energy Recovery", "ok"],
    body: "The ultra-hot combustion gas must be cooled to the thermodynamic threshold required for the first catalytic bed entry (~420°C). This is achieved through a smoke-tube or water-tube waste heat boiler, generating high-pressure superheated steam (typically 40–60 bar) that drives a co-generation turbo-generator. Kafaah focuses heavily on water chemistry audits to eliminate scale formation, tracking bypass dampener responsiveness, and assessing gas-side thermal stress.",
    kafaah: "Boiler feed-water treatment specs, steam-side scale auditing, bypass butterfly-valve automation."
  },
  converter1: {
    title: "Converter Columns — Passes I, II & III",
    badge: ["Catalytic Conversion", "danger"],
    body: "SO₂ + 1/2 O₂ ⇌ SO₃ | ΔH = -99 kJ/mol. The primary reaction utilizes a porous Vanadium Pentoxide (V₂O₅) catalyst matrix promoted with potassium salts. Because the conversion reaction is highly exothermic and equilibrium-limited, it is split over multiple stages. Gases exit Pass I at over 600°C and pass through gas-to-gas heat exchangers to drop back to ~430°C before entering Pass II and Pass III. By Pass III, accumulated conversion hits ~95%. Kafaah audits catalyst bed screening cycles, structural pressure drops (ΔP), and bed temperature distribution matrices.",
    kafaah: "Catalytic conversion profiles per bed, catalyst dusting/screening optimization, and gas-to-gas heat exchanger effectiveness loops."
  },
  interpass: {
    title: "Interpass Absorption Tower (Stage 1 Absorption)",
    badge: ["Equilibrium Shift", "danger"],
    body: "To bypass the thermodynamic equilibrium ceiling of the SO₂ → SO₃ conversion, gas from Pass III is pulled out of the converter, cooled to ~180°C, and directed to the Interpass Absorber Tower. Here, SO₃ gas is absorbed in counter-currently flowing 98.4% H₂SO₄ to form oleum or high-concentration acid. Removing the product gas completely resets the equilibrium conditions according to Le Chatelier's Principle, allowing the remaining unreacted SO₂ gas to be re-processed. Kafaah assesses acid distribution grids, mist eliminator efficiencies, and pump tank level dynamics.",
    kafaah: "Mist eliminator breakthrough analytics, cross-flow velocity curves, acid pump tank circuit loops."
  },
  converter2: {
    title: "Converter Column — Pass IV",
    badge: ["Final Conversion", "warn"],
    body: "The lean gas loop returning from the Interpass Tower contains unreacted SO₂ alongside residual O₂. It is reheated to ~420°C and routed through the final V₂O₅ catalyst bed (Pass IV). Often, a specialized cesium-promoted catalyst is deployed here to lower activation temperature and drive equilibrium conversion efficiency past 99.7%. Kafaah targets tracking Pass IV conversion performance, emission reduction yields, and low-temperature bed tracking.",
    kafaah: "Cesium catalyst activity index tracking, low-temperature reaction profiling, conversion performance verification."
  },
  finalabs: {
    title: "Final Absorption Tower (Stage 2 Absorption)",
    badge: ["Gas Scrubbing", "info"],
    body: "Gas exiting Pass IV, rich in newly converted SO₃, is cooled and swept into the Final Absorber Tower. Counter-current scrubbing with 98% H₂SO₄ captures the remaining SO₃. Any trace acid mist is caught by heavy-duty Brink dimple-style candle demisters located at the top of the column to minimize emissions. Kafaah evaluates absorption mass transfer rates, packing alignment stability, and demister differential pressures.",
    kafaah: "Acid concentration balancing, candle filter health tracking, total SO₃ capture compliance."
  },
  stack: {
    title: "Exhaust Vent Stack",
    badge: ["Environmental HSE", "danger"],
    body: "The scrubbed tail gas, consisting primarily of inert nitrogen and oxygen with fractional trace levels of unreacted SO₂, is vented to the atmosphere through the main stack. Continuous Emissions Monitoring Systems (CEMS) measure compliance in real-time. Regulatory ceilings in GCC and Egyptian jurisdictions require emissions below 200–350 ppm of SO₂. Kafaah specializes in CEMS analyzer calibration validation and environmental regulatory compliance audits.",
    kafaah: "CEMS analyzer calibration, SO₂ emission trend analysis, local environmental code alignment verification."
  },
  acidcooler: {
    title: "Acid Cooling & Dilution Circuit",
    badge: ["Thermal Management", "warn"],
    body: "The absorption loops generate highly exothermic heat from both gas-liquid absorption and water dilution steps. Heavy-duty plate-and-frame heat exchangers (often fabricated from specialized alloys like Hastelloy or anodized stainless steel) cool the circulating acid loops from ~110°C to ~75°C. Automated injection valves introduce demineralized trim water to hold the product acid concentration steady at 98.4%. Kafaah provides heat exchanger efficiency curves, dilution control loop tuning, and corrosion monitoring.",
    kafaah: "Anodized plate heat exchanger heat balances, concentration control loop tuning, corrosion sensor verification."
  },
  product: {
    title: "98.4% H₂SO₄ Storage & Logistics",
    badge: ["Asset Management", "ok"],
    body: "Finished commercial-grade concentrated Sulfuric Acid (98.4% H₂SO₄) is safely transferred into large-scale carbon steel or specialized alloy storage tanks. Proper concentration monitoring is vital because slight drops toward 93–95% significantly accelerate the corrosion rate of conventional carbon steel tank walls. Kafaah monitors storage tank wall thicknesses via NDT, tank vent breathers, and modern, safe loading terminal protocols.",
    kafaah: "NDT tank thickness trending, ultrasonic corrosion array checks, loading bay high-level alarm configurations."
  }
};

function SulfuricAcidPFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeDetails = activeNode ? pfdData[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-yellow") {
      borderClass = "stroke-[#eab308]";
    } else if (category === "c-orange") {
      borderClass = "stroke-[#f97316]";
    } else if (category === "c-red") {
      borderClass = "stroke-[#dc2626]";
    } else if (category === "c-blue") {
      borderClass = "stroke-[#0ea5e9]";
    } else if (category === "c-gray") {
      borderClass = "stroke-[#94a3b8]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    }

    // Use solid backgrounds (100% opaque) to hide any connecting lines drawn behind the cards.
    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      {/* PFD Interactive Section */}
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive DCDA Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the double-contact double-absorption (DCDA) sulfuric acid production loop. Click on any process unit to view key chemical reactions, asset configurations, and Kafaah's engineering audit guidelines.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 720 1020" role="img" className="w-full h-auto text-silver select-none">
                  <title>Sulfuric Acid Production — DCDA Process Flow Diagram</title>
                  <desc>Interactive PFD illustrating a modern double-contact double-absorption sulfuric acid plant featuring a sulfur melter, waste heat boiler, 4-pass V₂O₅ converter, interpass tower, and final absorption tower.</desc>
                  <defs>
                    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <g id="node-air" className="node" onClick={() => setActiveNode("air")}>
                    <rect x={40} y={30} width={160} height={58} rx={8} className={getNodeClass("air", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={120} y={52} textAnchor="middle" dominantBaseline="central">Air Drying Tower</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={120} y={72} textAnchor="middle" dominantBaseline="central">98% H₂SO₄ circulation</text>
                  </g>
                  <line x1={120} y1={88} x2={120} y2={140} stroke={FLOW_COLORS.utility} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={75} y={115}>Dry Air</text>

                  <g id="node-melter" className="node" onClick={() => setActiveNode("melter")}>
                    <rect x={255} y={30} width={170} height={58} rx={8} className={getNodeClass("melter", "c-yellow")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={340} y={52} textAnchor="middle" dominantBaseline="central">Sulfur Melter & Filter</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={340} y={72} textAnchor="middle" dominantBaseline="central">Solid S → Liquid S (135–145°C)</text>
                  </g>
                  <path d="M340 88 L340 140" fill="none" stroke={FLOW_COLORS.sulfur} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={390} y={115}>Molten Sulfur</text>

                  <g id="node-burner" className="node" onClick={() => setActiveNode("burner")}>
                    <rect x={100} y={142} width={340} height={65} rx={8} className={getNodeClass("burner", "c-orange")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={270} y={165} textAnchor="middle" dominantBaseline="central">Sulfur Burner (Combustor)</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={185} textAnchor="middle" dominantBaseline="central">S + O₂ → SO₂ | Exothermic (~1000–1100°C)</text>
                  </g>
                  <line x1={270} y1={207} x2={270} y2={245} stroke={FLOW_COLORS.gas} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-whb" className="node" onClick={() => setActiveNode("whb")}>
                    <rect x={140} y={247} width={260} height={58} rx={8} className={getNodeClass("whb", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={270} y={268} textAnchor="middle" dominantBaseline="central">Waste Heat Boiler (WHB)</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={288} textAnchor="middle" dominantBaseline="central">Cooling gas to ~420°C | High-P Steam</text>
                  </g>
                  <line x1={270} y1={305} x2={270} y2={345} stroke={FLOW_COLORS.gas} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={210} y={325}>SO₂ Gas Feed</text>

                  <g id="node-converter1" className="node" onClick={() => setActiveNode("converter1")}>
                    <rect x={120} y={347} width={300} height={150} rx={10} className={getNodeClass("converter1", "c-orange")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={270} y={370} textAnchor="middle" dominantBaseline="central">V₂O₅ Converter (Passes I, II, III)</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={395} textAnchor="middle" dominantBaseline="central">Pass I: SO₂ → SO₃ (~60-65% conversion)</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={420} textAnchor="middle" dominantBaseline="central">Pass II & III: Inter-pass cooling recovery</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={445} textAnchor="middle" dominantBaseline="central">Accumulated Conversion Rate: ~95%</text>
                    <text className="text-[10px] fill-gold font-medium pointer-events-none" x={270} y={470} textAnchor="middle" dominantBaseline="central">Critical Catalyst Zone</text>
                  </g>

                  <path d="M420 422 L540 422 L540 495" fill="none" stroke={FLOW_COLORS.gas} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={485} y={410}>Rich SO₃ Gas</text>

                  <g id="node-interpass" className="node" onClick={() => setActiveNode("interpass")}>
                    <rect x={440} y={497} width={200} height={70} rx={8} className={getNodeClass("interpass", "c-red")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={540} y={522} textAnchor="middle" dominantBaseline="central">Interpass Absorber</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={540} y={542} textAnchor="middle" dominantBaseline="central">98% H₂SO₄ counter-current</text>
                  </g>
                  
                  <path d="M540 567 L540 615 L320 615 L320 645" fill="none" stroke={FLOW_COLORS.gas} strokeWidth={1.5} strokeDasharray="4 2" markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={430} y={605}>Unreacted SO₂ Loop</text>

                  <g id="node-converter2" className="node" onClick={() => setActiveNode("converter2")}>
                    <rect x={120} y={647} width={300} height={65} rx={8} className={getNodeClass("converter2", "c-orange")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={270} y={670} textAnchor="middle" dominantBaseline="central">V₂O₅ Converter (Pass IV)</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={270} y={690} textAnchor="middle" dominantBaseline="central">Final equilibrium conversion to &gt;99.7%</text>
                  </g>
                  <path d="M380 712 L380 765 L440 765" fill="none" stroke={FLOW_COLORS.gas} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={410} y={750} textAnchor="middle">Residual SO₃ Gas</text>

                  <g id="node-finalabs" className="node" onClick={() => setActiveNode("finalabs")}>
                    <rect x={440} y={730} width={200} height={70} rx={8} className={getNodeClass("finalabs", "c-red")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={540} y={755} textAnchor="middle" dominantBaseline="central">Final Absorber Tower</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={540} y={775} textAnchor="middle" dominantBaseline="central">Remaining SO₃ scrubbed</text>
                  </g>
                  <line x1={540} y1={800} x2={540} y2={855} stroke={FLOW_COLORS.exhaust} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-stack" className="node" onClick={() => setActiveNode("stack")}>
                    <rect x={450} y={857} width={180} height={52} rx={6} className={getNodeClass("stack", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={540} y={875} textAnchor="middle" dominantBaseline="central">Exhaust Stack</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={540} y={893} textAnchor="middle" dominantBaseline="central">Compliant tail gas vent</text>
                  </g>

                  <path d="M440 532 L60 532 L60 760 L120 760" fill="none" stroke={FLOW_COLORS.acid} strokeWidth={1.5}/>
                  <path d="M440 775 L60 775 L120 775" fill="none" stroke={FLOW_COLORS.acid} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  
                  <g id="node-acidcooler" className="node" onClick={() => setActiveNode("acidcooler")}>
                    <rect x={120} y={742} width={220} height={65} rx={8} className={getNodeClass("acidcooler", "c-red")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={230} y={765} textAnchor="middle" dominantBaseline="central">Acid Cooling & Dilution</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={230} y={785} textAnchor="middle" dominantBaseline="central">Heat exchangers + Trim water</text>
                  </g>
                  <line x1={230} y1={807} x2={230} y2={855} stroke={FLOW_COLORS.acid} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-product" className="node" onClick={() => setActiveNode("product")}>
                    <rect x={110} y={857} width={240} height={58} rx={8} className={getNodeClass("product", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={230} y={878} textAnchor="middle" dominantBaseline="central">98.4% H₂SO₄ Storage Tanks</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={230} y={898} textAnchor="middle" dominantBaseline="central">Product dispatch & distribution</text>
                  </g>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x={360} y={960} textAnchor="middle">↑ Click any process node above to view technical audit parameters.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  {/* Decorative gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="pt-4 border-t border-divider/60">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key reactions, and Kafaah's specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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

// ==================== NPK INTERACTIVE PFD COMPONENT ====================

const NPK_FLOW_COLORS = {
  solids: "#64748b",
  dust: "#a78bfa",
  utility: "#38bdf8",
  oil: "#fb7185",
};

interface NPKNodeData {
  title: string;
  badge: [string, "warn" | "danger" | "info" | "ok"];
  body: string;
  kafaah: string;
  challenge: string;
}

const npkData: Record<string, NPKNodeData> = {
  macrohoppers: {
    title: "Macro Granular Storage & Dosing Hoppers",
    badge: ["Primary Feeds", "info"],
    body: "Manages incoming high-purity granular elements (such as Urea, DAP, MAP, MOP, or SOP). Individual silos use loss-in-weight feeders or continuous weigh belts to regulate stream flows. Granule size distribution consistency across all ingredients is critical to prevent post-blending segregation.",
    kafaah: "Weigh controller loop calibration, checking input granule compatibility charts, and sizing symmetry analysis.",
    challenge: "Mismatched particle sizes (e.g., fine MOP blended with large urea granules) causing size segregation inside bulk trucks and bag streams, leading to off-spec commercial analysis."
  },
  microhoppers: {
    title: "Secondary & Minor Nutrient Hoppers",
    badge: ["Secondary Salts", "info"],
    body: "Feeds secondary macronutrients (such as Magnesium Sulfate, Calcium Sulfate, or Kieserite granular fractions) into the formulation batch. These components are accurately metered to fulfill customized commercial soil grade targets.",
    kafaah: "Dosing screw precision diagnostics, moisture tracking, and chemical formulation cross-checks.",
    challenge: "High moisture absorption in secondary salts causing bridging across hopper throats, stopping secondary element delivery."
  },
  traceelements: {
    title: "Trace Element & Micronutrient Addition Unit",
    badge: ["Micronutrients", "info"],
    body: "Controls the micro-addition of vital trace metals (Boron as borax, Zinc Sulfate, Iron Sulfate, Copper, Manganese). Because these elements make up a very low percentage of the total formulation, precise automated control loops are required to ensure uniform distribution.",
    kafaah: "Micro-gravimetric system tuning, validation of homogeneous pre-mixes, and tracer index checking.",
    challenge: "Poor dispersion patterns creating highly concentrated pockets of trace elements next to trace-deficient zones in the final product."
  },
  npkmixer: {
    title: "Low-Shear Homogeneous NPK Blender",
    badge: ["Blending Core", "danger"],
    body: "Blends all granular inputs into a uniform mixture. The unit leverages low-shear rotary drum actions or paddle configurations designed to achieve high blending uniformity within brief cycle windows while minimizing physical grain fracture.",
    kafaah: "Blending uniformity index testing, paddle tip clearance validation, and optimal retention timing logs.",
    challenge: "Excessive rotational velocity or extended blend times causing granule degradation and generating fine dust, which increases caking risks during storage."
  },
  scalpingscreen: {
    title: "Safety Scalping & De-dusting Screen",
    badge: ["Quality Control", "info"],
    body: "Processes the raw blend through a high-capacity screening deck prior to surface conditioning. This step removes oversize material lumps, raw material bag scraps, or fine debris to isolate the required target granule spectrum.",
    kafaah: "Screen cloth tension metrics, amplitude optimization, and oversized discharge tracing.",
    challenge: "Screen blinding from damp fines carryover, allowing oversize lumps to bypass the screen and block down-stream bagging scale gates."
  },
  surgebin: {
    title: "Coating Feed Surge Hopper",
    badge: ["Process Buffer", "info"],
    body: "Acts as a continuous production buffer between the blending section and the downstream rotary coating drum. Features an anti-segregation interior geometry to preserve blend uniformity during levels shifts.",
    kafaah: "Level sensor testing, mass-flow valve alignment, and structural shell wall auditing.",
    challenge: "Funnel-flow patterns causing funneling and granule size segregation, resulting in uneven NPK concentrations between bag batches."
  },
  coatingagent: {
    title: "Anticaking Compound Storage & Pump Loop",
    badge: ["Surface Protect", "warn"],
    body: "Manages the delivery of specialized oil- or fatty amine wax-based anticaking compounds. This coating creates a hydrophobic surface barrier on the granules, preventing moisture absorption and moisture-bridge crystal formatting during storage.",
    kafaah: "Pump calibration profiles, viscosity indexing against temperature variations, and consumption balancing.",
    challenge: "Fluctuations in compound viscosity due to seasonal tracking errors, leading to inadequate granule surface coverage."
  },
  heatinglump: {
    title: "Thermal Melt Tank & Utility Loop",
    badge: ["Thermal Control", "info"],
    body: "Heats solid or highly viscous anticaking waxes to their optimal fluid operational windows (typically 70–80 °C). Precise temperature control is required to achieve the low viscosity necessary for fine nozzle atomization.",
    kafaah: "Steam tracing efficiency audits, safety interlock checks, and thermal controller optimization.",
    challenge: "Heating line failures causing wax solidification inside the feed line, choking the spray array and interrupting plant operations."
  },
  coatingdrum: {
    title: "Rotary Conditioning & Coating Drum",
    badge: ["Coating Action", "danger"],
    body: "Granules pass through a rotating drum equipped with internal lifters that create a cascading curtain. Twin-fluid atomizing nozzles spray the heated anticaking agent onto the product. Inert talc or clay powder can also be added to form a non-sticky surface finish.",
    kafaah: "Nozzle spray pattern alignment, flight configuration reviews, and granule surface coverage evaluations.",
    challenge: "Nozzle blockage or poor atomization forming large liquid droplets, creating sticky product clusters that blind down-stream packaging chutes."
  },
  powderfeed: {
    title: "Inert Powder Coating Silo & Feeder",
    badge: ["Conditioning Dust", "info"],
    body: "Meters fine inert powders (such as micronized talc, kaolin clay, or diatomaceous earth) into the rear section of the coating drum. This powder adheres to the oiled granule surface, creating a protective layer that enhances anti-caking performance.",
    kafaah: "Powder feeder synchronization, loss-in-weight tracking, and powder-to-oil ratio balancing.",
    challenge: "Excessive powder addition generating free ambient dust in the drum, which loads the emission baghouse and increases raw material losses."
  },
  productpacking: {
    title: "Finished NPK Bagging Silo",
    badge: ["Inventory Stream", "ok"],
    body: "Receives the fully conditioned, caking-resistant granular NPK fertilizer. Product is held under controlled relative humidity conditions before transfer to automated 50kg bagging machines or big-bag packaging stations.",
    kafaah: "Bagging scale weight calibration checks, moisture ingress auditing, and product hardness analysis.",
    challenge: "Packaging product with high residual temperatures into plastic bags, causing moisture condensation on internal bag faces and driving localized granule dissolution."
  },
  baghouse: {
    title: "Pulse-Jet Aspiration Bag Filter",
    badge: ["Dust Extraction", "danger"],
    body: "Provides negative draft ventilation to key dust-generation sources (such as weigh scales, blenders, screens, and hopper drops). High-efficiency PTFE membrane bags filter out airborne dust particles, returning reclaimed materials back to the process.",
    kafaah: "Differential pressure monitoring, pulse valve sequence optimization, and bag structural inspections.",
    challenge: "Damp air ingress causing fertilizer dust to form a crust on the filter bags (\"mud-coaxing\"), which restricts ventilation draft and causes dust buildup around the blending machinery."
  },
  wetventuri: {
    title: "Wet Venturi Scrubber System",
    badge: ["Emission Clean", "danger"],
    body: "Processes air streams carrying ultra-fine or sticky fertilizer dust that cannot be managed by dry baghouses alone. High-velocity liquid shearing traps particulates into a recycling liquor stream, preventing environmental stack emissions.",
    kafaah: "Liquid-to-gas flow balances, throat delta-P monitoring, and liquor bleed control loops.",
    challenge: "Crystallization and scale buildup inside the Venturi throat section from highly saturated recycling liquors, reducing scrubbing draft efficiency."
  },
  exhauststack: {
    title: "Main Exhaust Fan & Stack Assembly",
    badge: ["Compliance", "danger"],
    body: "Draws treated process air from the filtration loops and discharges it to the atmosphere. Continuous monitoring guarantees total particulate emissions remain securely below 20 mg/Nm³ to fulfill strict industrial frameworks.",
    kafaah: "Fan impeller balance reviews, CEMS verification logs, and emission profile auditing.",
    challenge: "Aerosol or fine particulate carryover caused by upstream scrubber flooding, resulting in visible stack plume alerts."
  }
};

function NpkPFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeDetails = activeNode ? npkData[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-blue") {
      borderClass = "stroke-[#38bdf8]";
    } else if (category === "c-teal") {
      borderClass = "stroke-[#14b8a6]";
    } else if (category === "c-coral") {
      borderClass = "stroke-[#fb7185]";
    } else if (category === "c-purple") {
      borderClass = "stroke-[#a78bfa]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    } else if (category === "c-amber") {
      borderClass = "stroke-[#f59e0b]";
    } else if (category === "c-gray" || category === "class-gray") {
      borderClass = "stroke-[#94a3b8]";
    }

    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      {/* PFD Interactive Section */}
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive NPK Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the NPK physical blending and conditioning process loop. Click on any process unit to view bulk gravimetric dosing, secondary trace nutrient integration, coating mechanics, and dedusting circuits.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 720 1120" role="img" className="w-full h-auto text-silver select-none">
                  <title>NPK Physical Blending Plant — Process Flow Diagram</title>
                  <desc>Interactive PFD showing multi-bin gravimetric macro dosing, micronutrient trace integration, homogeneous mixing, screening, drum coating, and dedusting circuits.</desc>
                  <defs>
                    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <text x={35} y={25} className="text-[12px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 1: GRAVIMETRIC DOSING &amp; MIXING TRAIN</text>
                  <rect x={10} y={35} width={480} height={425} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-macrohoppers" className="node" onClick={() => setActiveNode("macrohoppers")}>
                    <rect x={25} y={55} width={130} height={65} rx={6} className={getNodeClass("macrohoppers", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={90} y={78} textAnchor="middle" dominantBaseline="central">NPK Macro Hoppers</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={90} y={98} textAnchor="middle" dominantBaseline="central">Urea, DAP, MOP, SOP</text>
                  </g>

                  <g id="node-microhoppers" className="node" onClick={() => setActiveNode("microhoppers")}>
                    <rect x={180} y={55} width={130} height={65} rx={6} className={getNodeClass("microhoppers", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={245} y={78} textAnchor="middle" dominantBaseline="central">Minor Nutrients</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={245} y={98} textAnchor="middle" dominantBaseline="central">Mg, Ca, S, Secondary</text>
                  </g>

                  <g id="node-traceelements" className="node" onClick={() => setActiveNode("traceelements")}>
                    <rect x={330} y={55} width={145} height={65} rx={6} className={getNodeClass("traceelements", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={402.5} y={78} textAnchor="middle" dominantBaseline="central">Trace Micronutrients</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={402.5} y={98} textAnchor="middle" dominantBaseline="central">B, Zn, Fe, Cu, Mn</text>
                  </g>

                  <line x1={90} y1={120} x2={90} y2={155} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <line x1={245} y1={120} x2={245} y2={155} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <line x1={402} y1={120} x2={402} y2={155} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  
                  <path d="M90 155 L402 155" fill="none" stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5}/>
                  <path d="M245 155 L245 175" fill="none" stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-npkmixer" className="node" onClick={() => setActiveNode("npkmixer")}>
                    <rect x={125} y={177} width={240} height={60} rx={6} className={getNodeClass("npkmixer", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={245} y={198} textAnchor="middle" dominantBaseline="central">Homogeneous Blender</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={245} y={218} textAnchor="middle" dominantBaseline="central">Low-Shear Paddle / Rotary</text>
                  </g>
                  <line x1={245} y1={237} x2={245} y2={275} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-scalpingscreen" className="node" onClick={() => setActiveNode("scalpingscreen")}>
                    <rect x={125} y={277} width={240} height={55} rx={6} className={getNodeClass("scalpingscreen", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={245} y={296} textAnchor="middle" dominantBaseline="central">Safety Scalping Screen</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={245} y={316} textAnchor="middle" dominantBaseline="central">Oversize Clump / Fines Isolation</text>
                  </g>
                  <line x1={245} y1={332} x2={245} y2={370} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-surgebin" className="node" onClick={() => setActiveNode("surgebin")}>
                    <rect x={125} y={372} width={240} height={50} rx={6} className={getNodeClass("surgebin", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={245} y={388} textAnchor="middle" dominantBaseline="central">Coating Feed Surge Hopper</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={245} y={408} textAnchor="middle" dominantBaseline="central">Mass Flow Anti-Segregation Design</text>
                  </g>

                  <path d="M365 207 L490 207" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M365 304 L490 304 L490 207" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M490 207 L530 207" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <text x={35} y={495} className="text-[12px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 2: SURFACE CONDITIONING &amp; ANTICAKING</text>
                  <rect x={10} y={505} width={480} height={425} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <path d="M245 422 L245 525" fill="none" stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x={175} y={465}>Uncoated Core Granules</text>

                  <g id="node-coatingagent" className="node" onClick={() => setActiveNode("coatingagent")}>
                    <rect x={15} y={525} width={160} height={55} rx={6} className={getNodeClass("coatingagent", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={95} y={544} textAnchor="middle" dominantBaseline="central">Anticaking Compound</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={95} y={564} textAnchor="middle" dominantBaseline="central">Oil / Fatty Amine Wax</text>
                  </g>

                  <g id="node-heatinglump" className="node" onClick={() => setActiveNode("heatinglump")}>
                    <rect x={15} y={615} width={160} height={50} rx={6} className={getNodeClass("heatinglump", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={95} y={632} textAnchor="middle" dominantBaseline="central">Thermal Melt Unit</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={95} y={650} textAnchor="middle" dominantBaseline="central">Target: 70–80 °C Liquid</text>
                  </g>
                  <line x1={95} y1={580} x2={95} y2={615} stroke={NPK_FLOW_COLORS.oil} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <path d="M95 665 L95 725 L180 725" fill="none" stroke={NPK_FLOW_COLORS.oil} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-coatingdrum" className="node" onClick={() => setActiveNode("coatingdrum")}>
                    <rect x={195} y={692} width={250} height={65} rx={6} className={getNodeClass("coatingdrum", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={320} y={715} textAnchor="middle" dominantBaseline="central">Rotary Conditioning Drum</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={320} y={735} textAnchor="middle" dominantBaseline="central">Twin-Fluid Nozzle Coating</text>
                  </g>
                  
                  <path d="M245 580 L245 692" fill="none" stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-powderfeed" className="node" onClick={() => setActiveNode("powderfeed")}>
                    <rect x={290} y={525} width={155} height={55} rx={6} className={getNodeClass("powderfeed", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={367} y={544} textAnchor="middle" dominantBaseline="central">Inert Talc/Clay Silo</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={367} y={564} textAnchor="middle" dominantBaseline="central">Dusting Agent Feeder</text>
                  </g>
                  <path d="M367 580 L367 692" fill="none" stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <line x1={320} y1={757} x2={320} y2={800} stroke={NPK_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-productpacking" className="node" onClick={() => setActiveNode("productpacking")}>
                    <rect x={195} y={802} width={250} height={55} rx={6} className={getNodeClass("productpacking", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={320} y={820} textAnchor="middle" dominantBaseline="central">Finished NPK Bagging Silo</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={320} y={840} textAnchor="middle" dominantBaseline="central">To Big-Bag / 50kg Packing Lines</text>
                  </g>

                  <path d="M445 725 L470 725" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M470 725 L470 550 L490 550" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M490 550 L530 550" fill="none" stroke={NPK_FLOW_COLORS.dust} strokeWidth={1} markerEnd="url(#ar)"/>

                  <text x={607} y={25} textAnchor="middle" className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">VENTILATION & DUST CONTROL</text>
                  <rect x={505} y={35} width={205} height={900} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-baghouse" className="node" onClick={() => setActiveNode("baghouse")}>
                    <rect x={515} y={165} width={185} height={75} rx={6} className={getNodeClass("baghouse", "c-purple")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={192} textAnchor="middle" dominantBaseline="central">Pulse-Jet Bag Filter</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={214} textAnchor="middle" dominantBaseline="central">Primary Granule Dust Hook</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={226} textAnchor="middle" dominantBaseline="central">PTFE Membrane Matrices</text>
                  </g>
                  <line x1={607} y1={240} x2={607} y2={390} stroke={NPK_FLOW_COLORS.utility} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-wetventuri" className="node" onClick={() => setActiveNode("wetventuri")}>
                    <rect x={515} y={392} width={185} height={70} rx={6} className={getNodeClass("wetventuri", "c-purple")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={415} textAnchor="middle" dominantBaseline="central">Wet Venturi Scrubber</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={435} textAnchor="middle" dominantBaseline="central">Soluble Fertilizer Fines Reclaim</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={448} textAnchor="middle" dominantBaseline="central">Liquor Recycle Balance</text>
                  </g>
                  <line x1={607} y1={462} x2={607} y2={760} stroke={NPK_FLOW_COLORS.utility} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-exhauststack" className="node" onClick={() => setActiveNode("exhauststack")}>
                    <rect x={515} y={762} width={185} height={60} rx={6} className={getNodeClass("exhauststack", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={785} textAnchor="middle" dominantBaseline="central">Exhaust Fan & Stack</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={805} textAnchor="middle" dominantBaseline="central">Particulates &lt; 20 mg/Nm³</text>
                  </g>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x={360} y={970} textAnchor="middle">↑ Click any process node above to view core technical advisory details.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  {/* Decorative gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-divider/60">
                        {/* Kafaah Optimization Focus */}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>

                        {/* Operational Challenge */}
                        {activeDetails.challenge && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                Operational Challenge
                              </h4>
                              <p className="text-xs font-light text-silver/80 leading-relaxed">
                                {activeDetails.challenge}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key parameters, and Kafaah's specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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

// ==================== SSP INTERACTIVE PFD COMPONENT ====================

const SSP_FLOW_COLORS = {
  solids: "#64748b",
  gas: "#a78bfa",
  utility: "#38bdf8",
  acid: "#fb7185",
};

interface SSPNodeData {
  title: string;
  badge: [string, "warn" | "danger" | "info" | "ok"];
  body: string;
  kafaah: string;
  challenge: string;
}

const sspData: Record<string, SSPNodeData> = {
  rockfeed: {
    title: "Ground Phosphate Rock Delivery Matrix",
    badge: ["Raw Stock Feed", "info"],
    body: "Dry pulverized fluorapatite rock is delivered into the system. Fine milling parameters require a strict particle size distribution profile (d₉₀ < 150 µm) to achieve complete surface contact with sulfuric acid, guaranteeing optimal P₂O₅ conversion yields.",
    kafaah: "Milling screen checks, particle size distribution tracking, and moisture content validation.",
    challenge: "Coarse rock over-sizing drops reaction velocity inside the paddle mixer, triggering unreacted rock carryover into the curing pile and lowering water-soluble P₂O₅ metrics."
  },
  acidfeed: {
    title: "Sulfuric Acid Dilution Loop",
    badge: ["Chemical Reagent", "info"],
    body: "Concentrated sulfuric acid is diluted to a steady operational baseline of 65–70% H₂SO₄. Dilution water management is used to control temperature balances, as heat from dilution helps ignite the subsequent decomposition kinetics.",
    kafaah: "Concentration loop verification, alloy life tracking, and temperature balancing logs.",
    challenge: "Localized concentration dips below 62% H₂SO₄ introduce excess moisture, altering crystallization kinetics and transforming the SSP into a sticky, unmanageable sludge."
  },
  acidmixer: {
    title: "High-Speed Paddle Acidulation Mixer",
    badge: ["Digestion Step", "danger"],
    body: "Ground rock and 65–70% H₂SO₄ are intensely blended here. The reaction (Ca₁₀(PO₄)₆F₂ + 7H₂SO₄ + 3H₂O → 3Ca(H₂PO₄)₂·H₂O + 7CaSO₄) initiates instantly, starting an energetic exotherm that triggers the rapid release of silicon tetrafluoride (SiF₄) vapor.",
    kafaah: "Paddle blade wear indexing, shaft vibration diagnostics, and accurate mass flow synchronization.",
    challenge: "High mechanical wear and scaling on paddle tips, creating dead spaces that lead to localized blockages and inconsistent acidulation ratios."
  },
  sspden: {
    title: "Continuous Solidification SSP Den",
    badge: ["Phase Transition", "warn"],
    body: "The active fluid mixture moves onto a slow-moving conveyor den channel where it sets into a solid mass. At the discharge head, a mechanical cutter cuts the fresh, hot matrix into a uniform powder before dispatching it to the storage building.",
    kafaah: "Drive gear load tracking, cutter blade profiling, and exhaust draft validation.",
    challenge: "Inadequate retention time due to mechanical over-speeding, causing the fluid slurry to reach the discharge cutter before fully setting, which clogs the cutter chamber."
  },
  curingpile: {
    title: "Curing Maturation Yard",
    badge: ["Chemical Finish", "ok"],
    body: "Fresh powder SSP is transferred to an open indoor floor for 2 to 4 weeks of maturation. This slow curing window allows free unreacted phosphoric acid to finish digesting remaining rock crystals, maximizing the plant water-soluble P₂O₅ yields.",
    kafaah: "Pile turnover logging, chemical conversion analysis, and moisture tracking indices.",
    challenge: "High baseline pile moisture conditions that cause premature compaction or hard crusting, stopping gas diffusion and extending the required curing time."
  },
  granulator: {
    title: "Rotary Drum Granulation Unit",
    badge: ["Granulation Core", "danger"],
    body: "Matured powder SSP is loaded into a rotating drum granulator. Injection arrays apply steam and water directly into the tumbling product bed, modifying plasticity and rolling fine powder particles into robust, spherical granules.",
    kafaah: "Steam-to-water injection ratios, drum shell alignment, and flight layout configuration.",
    challenge: "Improper water balancing that causes localized over-wetting, generating oversize mud lumps that blind the drum and overload downstream conveyors."
  },
  dryerdrum: {
    title: "Co-Current Rotary Drying Drum",
    badge: ["Thermal Loop", "warn"],
    body: "Wet granules are dried using a co-current stream of hot air from an automated combustion furnace. Moisture content must be lowered to less than 4–5% to ensure structural integrity and prevent granule caking during storage.",
    kafaah: "Furnace temperature loop tuning, lifter efficiency profiling, and exhaust duct velocity logs.",
    challenge: "Excessive inlet gas temperatures that overheat the granules, causing chemical decomposition of monocalcium phosphate into water-insoluble pyrophosphates."
  },
  classification: {
    title: "Screening & Milling Matrix",
    badge: ["Quality Isolation", "info"],
    body: "Dried product is sorted via double-deck mechanical screens. Correctly sized granules are sent to final cooling, oversize materials are directed to chain mills for crushing, and fines are recycled back to the granulator drum feed.",
    kafaah: "Screen cloth condition tracking, mill hammer life metrics, and recycle ratio balances.",
    challenge: "Blinded screen meshes caused by damp granule carryover, which compromises product size consistency and causes off-spec materials to enter the final product storage silo."
  },
  coolerdrum: {
    title: "Rotary Product Cooler",
    badge: ["Product Cooling", "ok"],
    body: "Warm granules move through a rotary drum against a counter-current air stream. Lowering the product temperature prevents post-precipitates and stops granules from caking or clumping during final storage and bag loading.",
    kafaah: "Cooling fan draft verification, product discharge logs, and dewpoint monitoring.",
    challenge: "High seasonal humidity in ambient intake cooling air streams, introducing condensation onto the granule surface and decreasing product hardness."
  },
  finalproduct: {
    title: "Granular SSP Storage Silo",
    badge: ["Inventory Stream", "ok"],
    body: "Finished granular Single Superphosphate is stored in ventilated bulk silos, ready for automated bagging or direct bulk transport.",
    kafaah: "Granule crush resistance tracking, inventory monitoring, and bagging scale calibration.",
    challenge: "Granule breakdown and dust generation during high-drop filling operations, caused by low initial hardness parameters in the granulation section."
  },
  primaryscrub: {
    title: "Stage 1: Void Gas Spray Tower",
    badge: ["HSE Scrubber", "danger"],
    body: "High-strength off-gases from the mixer and den pass through a void tower. Water sprays hydrolyze the silicon tetrafluoride (3SiF₄ + 2H₂O → 2H₂SiF₆ + SiO₂). This step generates fluosilicic acid while precipitating free silica solid particles.",
    kafaah: "Spray header pressure logging, recycle liquor concentration control, and nozzle geometry tracking.",
    challenge: "Silica gel solids sticking to the inner tower walls and choking the recycling lines, requiring frequent cleanouts to maintain pressure balances."
  },
  secondaryscrub: {
    title: "Stage 2: Packed Bed Polish Scrubber",
    badge: ["Polish Scrubber", "danger"],
    body: "Vapors pass up through a high-efficiency packed scrubber bed against a dilute water or alkaline spray loop. This packing design captures remaining fluorides, ensuring environmental compliance before gas release.",
    kafaah: "Packing differential pressure tracking, spray header distribution, and effluent pH tracking.",
    challenge: "Silica gel particulate carryover from Stage 1 depositing onto the packing faces, increasing pressure drop and causing severe gas channeling."
  },
  granulationscrub: {
    title: "Stage 3: Venturi Gas Coalescer",
    badge: ["Dust Recovery", "warn"],
    body: "Exhaust air streams from the granulation drum and rotary dryer carry high particulate loads. A high-energy Venturi scrubber uses high-velocity liquid shearing to trap airborne dust and reclaim residual chemical vapors.",
    kafaah: "Venturi throat pressure monitoring, nozzle wear indexing, and solids bleed control.",
    challenge: "Accelerated abrasive wear on the Venturi throat section from high rock dust recycling loops, decreasing dust collection efficiency."
  },
  exhauststack: {
    title: "Main Exhaust Fan & Stack Assembly",
    badge: ["Regulatory Compliance", "danger"],
    body: "An induced draft fan draws gases from the scrubbers and discharges clean air through an emission stack. Continuous Emission Monitoring Systems (CEMS) track gas data to guarantee total fluorine values stay safely below 10 mg/Nm³.",
    kafaah: "CEMS analyzer tracking, draft fan power profiles, and environmental report logging.",
    challenge: "Fan impeller unbalance from mineral scale deposits, causing high vibration alerts that require manual shutdown and cleanouts."
  }
};

function SspPFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeDetails = activeNode ? sspData[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-blue") {
      borderClass = "stroke-[#38bdf8]";
    } else if (category === "c-coral") {
      borderClass = "stroke-[#fb7185]";
    } else if (category === "c-teal") {
      borderClass = "stroke-[#14b8a6]";
    } else if (category === "c-purple") {
      borderClass = "stroke-[#a78bfa]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    } else if (category === "c-amber") {
      borderClass = "stroke-[#f59e0b]";
    } else if (category === "c-gray") {
      borderClass = "stroke-[#94a3b8]";
    }

    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      {/* PFD Interactive Section */}
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive SSP Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the Single Superphosphate (SSP) powder acidulation and drum granulation process. Click on any process unit to view chemical conversion steps, maturation details, and scrubbing technologies.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 720 1120" role="img" className="w-full h-auto text-silver select-none">
                  <title>Single Superphosphate (SSP) Plant — Process Flow Diagram</title>
                  <desc>Interactive PFD illustrating Powder Stage production, Drum Granulation loop, and integrated multi-stage Fluorine Scrubbing technology.</desc>
                  <defs>
                    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <text x={35} y={25} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 1: POWDER SSP PRODUCTION (RUN-OF-PILE)</text>
                  <rect x={10} y={35} width={480} height={425} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-rockfeed" className="node" onClick={() => setActiveNode("rockfeed")}>
                    <rect x={30} y={55} width={180} height={50} rx={6} className={getNodeClass("rockfeed", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={120} y={72} textAnchor="middle" dominantBaseline="central">Ground Phosphate Rock</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={120} y={90} textAnchor="middle" dominantBaseline="central">d₉₀ &lt; 150 µm Feed</text>
                  </g>

                  <g id="node-acidfeed" className="node" onClick={() => setActiveNode("acidfeed")}>
                    <rect x={280} y={55} width={180} height={50} rx={6} className={getNodeClass("acidfeed", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={370} y={72} textAnchor="middle" dominantBaseline="central">Dilute Sulfuric Acid</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={370} y={90} textAnchor="middle" dominantBaseline="central">65–70% H₂SO₄ Matrix</text>
                  </g>

                  <line x1={120} y1={105} x2={120} y2={145} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <line x1={370} y1={105} x2={370} y2={145} stroke={SSP_FLOW_COLORS.acid} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <path d="M370 145 L250 145" fill="none" stroke={SSP_FLOW_COLORS.acid} strokeWidth={1.2}/>
                  <path d="M120 145 L230 145" fill="none" stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.2}/>

                  <g id="node-acidmixer" className="node" onClick={() => setActiveNode("acidmixer")}>
                    <rect x={130} y={155} width={220} height={55} rx={6} className={getNodeClass("acidmixer", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={174} textAnchor="middle" dominantBaseline="central">High-Speed Paddle Mixer</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={194} textAnchor="middle" dominantBaseline="central">Rapid Exothermic Digestion</text>
                  </g>
                  <line x1={240} y1={210} x2={240} y2={240} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-sspden" className="node" onClick={() => setActiveNode("sspden")}>
                    <rect x={130} y={242} width={220} height={55} rx={6} className={getNodeClass("sspden", "c-amber")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={260} textAnchor="middle" dominantBaseline="central">Continuous SSP Den</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={280} textAnchor="middle" dominantBaseline="central">Solidification &amp; Cutter Extractor</text>
                  </g>
                  <line x1={240} y1={297} x2={240} y2={335} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-curingpile" className="node" onClick={() => setActiveNode("curingpile")}>
                    <rect x={130} y={337} width={220} height={55} rx={6} className={getNodeClass("curingpile", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={356} textAnchor="middle" dominantBaseline="central">Curing Maturation Yard</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={376} textAnchor="middle" dominantBaseline="central">2–4 Weeks Free P₂O₅ Conversion</text>
                  </g>

                  <path d="M350 182 L490 182" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} strokeDasharray="3 3"/>
                  <path d="M350 270 L490 270 L490 182" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} strokeDasharray="3 3"/>
                  <path d="M490 182 L530 182" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <text x={35} y={490} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 2: DRUM GRANULATION LOOP</text>
                  <rect x={10} y={500} width={480} height={435} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <path d="M240 392 L240 520" fill="none" stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/70 pointer-events-none font-light" x={180} y={450}>Matured Powder Feed</text>

                  <g id="node-granulator" className="node" onClick={() => setActiveNode("granulator")}>
                    <rect x={130} y={522} width={220} height={55} rx={6} className={getNodeClass("granulator", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={540} textAnchor="middle" dominantBaseline="central">Rotary Granulation Drum</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={560} textAnchor="middle" dominantBaseline="central">Steam &amp; Water Injection Bed</text>
                  </g>
                  <line x1={240} y1={577} x2={240} y2={615} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-dryerdrum" className="node" onClick={() => setActiveNode("dryerdrum")}>
                    <rect x={130} y={617} width={220} height={55} rx={6} className={getNodeClass("dryerdrum", "c-amber")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={636} textAnchor="middle" dominantBaseline="central">Rotary Drying Drum</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={656} textAnchor="middle" dominantBaseline="central">Co-Current Hot Air Moisture Cut</text>
                  </g>
                  <line x1={240} y1={672} x2={240} y2={705} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-classification" className="node" onClick={() => setActiveNode("classification")}>
                    <rect x={130} y={707} width={220} height={55} rx={6} className={getNodeClass("classification", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={726} textAnchor="middle" dominantBaseline="central">Screening &amp; Classification Matrix</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={746} textAnchor="middle" dominantBaseline="central">Oversize Crushing &amp; Fines Recycle</text>
                  </g>
                  <line x1={240} y1={762} x2={240} y2={800} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <path d="M130 735 L60 735 L60 550 L130 550" fill="none" stroke={SSP_FLOW_COLORS.solids} strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/70 pointer-events-none font-light" x={95} y={600} transform="rotate(-90 95 600)">Fines / Oversize Return</text>

                  <g id="node-coolerdrum" className="node" onClick={() => setActiveNode("coolerdrum")}>
                    <rect x={130} y={802} width={220} height={55} rx={6} className={getNodeClass("coolerdrum", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={820} textAnchor="middle" dominantBaseline="central">Rotary Product Cooler</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={840} textAnchor="middle" dominantBaseline="central">Counter-Current Ambient Air Bed</text>
                  </g>
                  <line x1={240} y1={857} x2={240} y2={890} stroke={SSP_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-finalproduct" className="node" onClick={() => setActiveNode("finalproduct")}>
                    <rect x={130} y={892} width={220} height={38} rx={6} className={getNodeClass("finalproduct", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={911} textAnchor="middle" dominantBaseline="central">Granular SSP Storage Silo</text>
                  </g>

                  <path d="M350 550 L470 550" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M350 644 L470 644 L470 550" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1} strokeDasharray="3 3"/>
                  <path d="M470 550 L530 550" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1} markerEnd="url(#ar)"/>

                  <text x={607.5} y={25} textAnchor="middle" className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">GAS SCRUBBING PATH</text>
                  <rect x={505} y={35} width={205} height={900} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-primaryscrub" className="node" onClick={() => setActiveNode("primaryscrub")}>
                    <rect x={515} y={150} width={185} height={70} rx={6} className={getNodeClass("primaryscrub", "c-purple")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={175} textAnchor="middle" dominantBaseline="central">Void Spray Tower</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={195} textAnchor="middle" dominantBaseline="central">Stage 1: Primary SiF₄</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={208} textAnchor="middle" dominantBaseline="central">Fluosilicic Acid Generation</text>
                  </g>
                  <line x1={607} y1={220} x2={607} y2={350} stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-secondaryscrub" className="node" onClick={() => setActiveNode("secondaryscrub")}>
                    <rect x={515} y={352} width={185} height={70} rx={6} className={getNodeClass("secondaryscrub", "c-purple")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={375} textAnchor="middle" dominantBaseline="central">Packed Scrubber Bed</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={395} textAnchor="middle" dominantBaseline="central">Stage 2: Trace Absorption</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={408} textAnchor="middle" dominantBaseline="central">Interfacial Clean Envelope</text>
                  </g>
                  <line x1={607} y1={422} x2={607} y2={520} stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  
                  <path d="M607 520 L580 520 L580 550" fill="none" stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2}/>

                  <g id="node-granulationscrub" className="node" onClick={() => setActiveNode("granulationscrub")}>
                    <rect x={515} y={522} width={185} height={70} rx={6} className={getNodeClass("granulationscrub", "c-purple")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={545} textAnchor="middle" dominantBaseline="central">Venturi Gas Coalescer</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={565} textAnchor="middle" dominantBaseline="central">Stage 3: Granulator Venting</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={578} textAnchor="middle" dominantBaseline="central">Particulate &amp; Ammonia Polish</text>
                  </g>
                  <line x1={607} y1={592} x2={607} y2={760} stroke={SSP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-exhauststack" className="node" onClick={() => setActiveNode("exhauststack")}>
                    <rect x={515} y={762} width={185} height={60} rx={6} className={getNodeClass("exhauststack", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={785} textAnchor="middle" dominantBaseline="central">Exhaust Fan &amp; Stack</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={805} textAnchor="middle" dominantBaseline="central">F Emissions &lt; 10 mg/Nm³</text>
                  </g>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x={360} y={970} textAnchor="middle">↑ Click any process node above to view core technical advisory details.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  {/* Decorative gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-divider/60">
                        {/* Kafaah Optimization Focus */}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>

                        {/* Operational Challenge */}
                        {activeDetails.challenge && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                Operational Challenge
                              </h4>
                              <p className="text-xs font-light text-silver/80 leading-relaxed">
                                {activeDetails.challenge}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key parameters, and Kafaah's specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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

// ==================== SOP INTERACTIVE PFD COMPONENT ====================

const SOP_FLOW_COLORS = {
  solids: "#64748b",
  gas: "#f59e0b",
  hcl: "#14b8a6",
  acid: "#fb7185",
  utility: "#38bdf8",
};

interface SOPNodeData {
  title: string;
  badge: [string, "warn" | "danger" | "info" | "ok"];
  body: string;
  kafaah: string;
  challenge: string;
}

const sopData: Record<string, SOPNodeData> = {
  kclfeed: {
    title: "Potassium Chloride Feeding System",
    badge: ["Raw Material", "info"],
    body: "Solid potassium chloride (KCl) is continuously fed from storage silos through gravimetric belt feeders. Precise weight control is critical because the subsequent calcination reaction is highly sensitive to the molar ratio of reactants.",
    kafaah: "Weigh-feeder calibration protocols, particle size classification analysis, and anti-segregation silo audits.",
    challenge: "Moisture carryover in raw KCl causing bridging in feed hoppers, interrupting continuous dosing and disturbing the furnace molar balance."
  },
  acidfeed: {
    title: "Sulfuric Acid Metering Loop",
    badge: ["Raw Material", "info"],
    body: "Concentrated Sulfuric Acid (98% H₂SO₄) is continuously metered at a specific molar ratio relative to KCl. The acid is often preheated using recovery heat exchangers to improve furnace thermal efficiency.",
    kafaah: "Corrosion-resistant dosing pump calibration, electromagnetic flowmeter auditing, and acid temperature tracking.",
    challenge: "Pump pulsation or flow deviations leading to localized excess H₂SO₄, causing sticky cake formation inside the furnace."
  },
  furnace: {
    title: "Mannheim Muffle Furnace",
    badge: ["Furnace Core", "danger"],
    body: "The heart of the SOP process. KCl and H₂SO₄ react at 600–650°C: 2KCl + H₂SO₄ → K₂SO₄ + 2HCl(g). The reaction is endothermic, heated externally by fuel burners. Rotating rabble arms with high-alloy mixing teeth stir and push the reactant bed.",
    kafaah: "Rabble arm mechanical alignment, drive shaft torque diagnostics, shell temperature profiling, and burner combustion balancing.",
    challenge: "Refractory dome cracking due to improper heat-up cycles, and accelerated corrosion of rabble teeth under hot HCl conditions."
  },
  "cooling-neutralizer": {
    title: "Rotary SOP Cooling & Neutralizer",
    badge: ["Thermal & Chemistry", "warn"],
    body: "Hot, acidic SOP powder discharging from the furnace is cooled in a rotary drum. Soda ash (Na₂CO₃) or calcium carbonate (CaCO₃) is injected to neutralize residual free acid, preventing corrosion of downstream classification and bagging equipment.",
    kafaah: "Soda ash dosing automation loops, cooling air draft velocity, and product acidity tracking.",
    challenge: "Inadequate cooling or neutralizing agent distribution, leading to hot, acidic powder that corrodes storage structures and clogs bagging scales."
  },
  compactor: {
    title: "SOP Granule Compactor",
    badge: ["Granulation Core", "danger"],
    body: "Neutralized SOP powder is fed into a high-pressure roll compactor. The rolls press the powder into a dense solid sheet (flake). A flake breaker subsequently crushes the sheet into coarse raw granules.",
    kafaah: "Hydraulic roll pressure optimization, roll surface wear tracking, and feed screw speed synchronization.",
    challenge: "Low compaction pressure or roll wear leading to weak flakes, causing excessive fines recycle rates and low granular yield."
  },
  screener: {
    title: "Screening & Classification Deck",
    badge: ["Quality Control", "ok"],
    body: "Coarse granules are sorted on double-deck mechanical screens. Sized granules (2.0–4.0 mm) are directed to bagging, oversized granules go to a cage mill for crushing, and fines are recycled back to the compactor.",
    kafaah: "Screen cloth tension checks, amplitude optimization, and recycle loop balancing.",
    challenge: "Screen blinding by fine particles under high relative humidity, allowing off-spec granules to enter the finished product stream."
  },
  bagging: {
    title: "Finished SOP Storage & Bagging",
    badge: ["Inventory Stream", "ok"],
    body: "Finished SOP (granular or soluble powder grade) is transferred to storage silos and packaged in 50kg or 1000kg big bags. Product quality (K₂O ≥ 50-52%, Cl⁻ < 1%) is verified before shipping.",
    kafaah: "Bagging scale weight calibration checks, moisture ingress auditing, and product bag seal inspections.",
    challenge: "Product caking during long-term storage in high-humidity climates due to residual moisture carryover."
  },
  hclcooler: {
    title: "HCl Gas Cooler & Condenser",
    badge: ["Thermal Recovery", "warn"],
    body: "Hot, corrosive HCl gas exiting the Mannheim furnace at ~300°C is cooled in graphite or glass shell-and-tube heat exchangers. Cooling below 80°C is required to achieve high absorption efficiency in the downstream towers.",
    kafaah: "Graphite tube bundle thermal checks, cooling water flow balances, and condensate drain monitoring.",
    challenge: "Acid condensation in non-corrosion resistant ducting, or thermal stress cracking of graphite tubes."
  },
  absorber: {
    title: "Adiabatic Falling Film HCl Absorber",
    badge: ["Absorption Loop", "danger"],
    body: "Cooled HCl gas is absorbed in water inside falling film columns. Water flows down the inner tube walls as a thin film, absorbing HCl gas to produce high-strength commercial hydrochloric acid (31-33% HCl) as a co-product.",
    kafaah: "Liquid film distribution grids, absorption water ratio controls, and product acid density monitoring.",
    challenge: "Inadequate water distribution leading to dry spots on graphite tubes, causing absorption loss and release of toxic HCl gas to the scrubbers."
  },
  scrubber: {
    title: "Tail Gas Polish Scrubber",
    badge: ["Environmental HSE", "danger"],
    body: "Processes vent streams from the absorbers and storage tanks. Scrubbing with water or dilute alkaline solution captures any remaining traces of HCl gas to ensure clean stack discharge.",
    kafaah: "Scrubber recirculating pump flow balance, delta-P monitoring, and liquid pH controls.",
    challenge: "Scrubbing liquid circulation failure during process upsets, leading to highly acidic gas carryover to the exhaust stack."
  },
  stack: {
    title: "Exhaust Vent Stack",
    badge: ["Regulatory Compliance", "ok"],
    body: "The clean exhaust air is discharged to the atmosphere. Continuous emissions monitoring (CEMS) validates that HCl concentration remains well below regulatory thresholds (typically < 10-20 mg/Nm³).",
    kafaah: "CEMS analyzer calibration, stack plume visual checks, and fan impeller vibration monitoring.",
    challenge: "Particulate or acid mist carryover from flooded scrubbers causing visible stack emissions."
  }
};

function SopPFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeDetails = activeNode ? sopData[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-blue") {
      borderClass = "stroke-[#38bdf8]";
    } else if (category === "c-coral") {
      borderClass = "stroke-[#fb7185]";
    } else if (category === "c-teal") {
      borderClass = "stroke-[#14b8a6]";
    } else if (category === "c-purple") {
      borderClass = "stroke-[#a78bfa]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    } else if (category === "c-amber") {
      borderClass = "stroke-[#f59e0b]";
    } else if (category === "c-gray") {
      borderClass = "stroke-[#94a3b8]";
    }

    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      {/* PFD Interactive Section */}
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive SOP Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the Sulfate of Potash (SOP) production process via the Mannheim furnace and gaseous HCl absorption system. Click on any process block to inspect technical specifications, parameters, and Kafaah&apos;s recommendations.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 720 780" role="img" className="w-full h-auto text-silver select-none">
                  <title>Sulfate of Potash (SOP) — Process Flow Diagram</title>
                  <desc>Interactive PFD illustrating the Mannheim furnace calcination loop, finished solid SOP classification, and gaseous HCl absorption system.</desc>
                  <defs>
                    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <text x={35} y={25} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 1: REACTANT PREPARATION &amp; FURNACE CORE</text>
                  <rect x={10} y={35} width={480} height={250} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-kclfeed" className="node" onClick={() => setActiveNode("kclfeed")}>
                    <rect x={30} y={55} width={180} height={50} rx={6} className={getNodeClass("kclfeed", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={120} y={72} textAnchor="middle" dominantBaseline="central">KCl Silo &amp; Weigh Feeder</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={120} y={90} textAnchor="middle" dominantBaseline="central">Gravimetric solid feed</text>
                  </g>

                  <g id="node-acidfeed" className="node" onClick={() => setActiveNode("acidfeed")}>
                    <rect x={280} y={55} width={180} height={50} rx={6} className={getNodeClass("acidfeed", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={370} y={72} textAnchor="middle" dominantBaseline="central">H₂SO₄ Metering Loop</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={370} y={90} textAnchor="middle" dominantBaseline="central">98% concentration feed</text>
                  </g>

                  <line x1={120} y1={105} x2={120} y2={145} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <line x1={370} y1={105} x2={370} y2={145} stroke={SOP_FLOW_COLORS.acid} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <path d="M370 145 L260 145" fill="none" stroke={SOP_FLOW_COLORS.acid} strokeWidth={1.2}/>
                  <path d="M120 145 L220 145" fill="none" stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.2}/>
                  <line x1={240} y1={145} x2={240} y2={195} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-furnace" className="node" onClick={() => setActiveNode("furnace")}>
                    <rect x={110} y={197} width={260} height={65} rx={6} className={getNodeClass("furnace", "c-amber")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={220} textAnchor="middle" dominantBaseline="central">Mannheim Muffle Furnace</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={240} textAnchor="middle" dominantBaseline="central">Endothermic Calcination (~600–650°C)</text>
                  </g>

                  <text x={35} y={325} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 2: SOP SOLID FINISHING PATH</text>
                  <rect x={10} y={335} width={480} height={425} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <line x1={240} y1={262} x2={240} y2={355} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={160} y={305}>Hot SOP Powder</text>

                  <g id="node-cooling-neutralizer" className="node" onClick={() => setActiveNode("cooling-neutralizer")}>
                    <rect x={130} y={357} width={220} height={55} rx={6} className={getNodeClass("cooling-neutralizer", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={375} textAnchor="middle" dominantBaseline="central">Rotary Cooling &amp; Neutralizer</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={395} textAnchor="middle" dominantBaseline="central">Soda ash addition | Acid control</text>
                  </g>
                  <line x1={240} y1={412} x2={240} y2={455} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-compactor" className="node" onClick={() => setActiveNode("compactor")}>
                    <rect x={130} y={457} width={220} height={55} rx={6} className={getNodeClass("compactor", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={475} textAnchor="middle" dominantBaseline="central">SOP Granule Compactor</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={495} textAnchor="middle" dominantBaseline="central">High pressure roll compaction</text>
                  </g>
                  <line x1={240} y1={512} x2={240} y2={555} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-screener" className="node" onClick={() => setActiveNode("screener")}>
                    <rect x={130} y={557} width={220} height={55} rx={6} className={getNodeClass("screener", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={575} textAnchor="middle" dominantBaseline="central">Screening &amp; Classification Deck</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={595} textAnchor="middle" dominantBaseline="central">Double-deck sizing (2–4mm target)</text>
                  </g>
                  <line x1={240} y1={612} x2={240} y2={655} stroke={SOP_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-bagging" className="node" onClick={() => setActiveNode("bagging")}>
                    <rect x={130} y={657} width={220} height={55} rx={6} className={getNodeClass("bagging", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={240} y={675} textAnchor="middle" dominantBaseline="central">Finished SOP Storage &amp; Bagging</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={240} y={695} textAnchor="middle" dominantBaseline="central">Powder / Granular bagging</text>
                  </g>

                  <text x={607.5} y={25} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider" textAnchor="middle">STAGE 3: HCl RECOVERY SYSTEM</text>
                  <rect x={510} y={35} width={195} height={505} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <path d="M370 230 L500 230 L500 90 L607 90 L607 105" fill="none" stroke={SOP_FLOW_COLORS.gas} strokeWidth={1.2} strokeDasharray="3 3"/>
                  <line x1={607} y1={98} x2={607} y2={105} stroke={SOP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={440} y={215}>Hot HCl Gas (~300°C)</text>

                  <g id="node-hclcooler" className="node" onClick={() => setActiveNode("hclcooler")}>
                    <rect x={520} y={115} width={175} height={60} rx={6} className={getNodeClass("hclcooler", "c-amber")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={135} textAnchor="middle" dominantBaseline="central">HCl Gas Cooler</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={155} textAnchor="middle" dominantBaseline="central">Graphite tube cooling (&lt;80°C)</text>
                  </g>
                  <line x1={607} y1={175} x2={607} y2={225} stroke={SOP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-absorber" className="node" onClick={() => setActiveNode("absorber")}>
                    <rect x={520} y={227} width={175} height={65} rx={6} className={getNodeClass("absorber", "c-coral")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={247} textAnchor="middle" dominantBaseline="central">Falling Film Absorber</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={267} textAnchor="middle" dominantBaseline="central">Adiabatic water absorption</text>
                    <text className="text-[9px] fill-[#14b8a6] pointer-events-none font-light animate-pulse" x={607.5} y={279} textAnchor="middle" dominantBaseline="central">Yields 32% HCl Acid</text>
                  </g>
                  <line x1={607} y1={292} x2={607} y2={340} stroke={SOP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>
                  <text className="text-[9px] fill-silver/60 pointer-events-none font-light" x={607.5} y={315} textAnchor="middle">Residual gas</text>

                  <g id="node-scrubber" className="node" onClick={() => setActiveNode("scrubber")}>
                    <rect x={520} y={342} width={175} height={60} rx={6} className={getNodeClass("scrubber", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={362} textAnchor="middle" dominantBaseline="central">Tail Gas Scrubber</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={382} textAnchor="middle" dominantBaseline="central">Water/alkaline polish spray</text>
                  </g>
                  <line x1={607} y1={402} x2={607} y2={450} stroke={SOP_FLOW_COLORS.gas} strokeWidth={1.2} markerEnd="url(#ar)"/>

                  <g id="node-stack" className="node" onClick={() => setActiveNode("stack")}>
                    <rect x={520} y={452} width={175} height={55} rx={6} className={getNodeClass("stack", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={607.5} y={470} textAnchor="middle" dominantBaseline="central">Exhaust Vent Stack</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={607.5} y={490} textAnchor="middle" dominantBaseline="central">CEMS telemetry monitoring</text>
                  </g>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x={360} y={750} textAnchor="middle">↑ Click any process node above to view core technical advisory details.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  {/* Decorative gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-divider/60">
                        {/* Kafaah Optimization Focus */}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>

                        {/* Operational Challenge */}
                        {activeDetails.challenge && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                Operational Challenge
                              </h4>
                              <p className="text-xs font-light text-silver/80 leading-relaxed">
                                {activeDetails.challenge}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key parameters, and Kafaah&apos;s specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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

// ==================== MGSO4 INTERACTIVE PFD COMPONENT ====================

const MGSO4_FLOW_COLORS = {
  acid: "#fb7185",
  solids: "#64748b",
  liquor: "#38bdf8",
};

interface MGSO4NodeData {
  title: string;
  badge: [string, "warn" | "danger" | "info" | "ok"];
  body: string;
  kafaah: string;
  challenge: string;
}

const mgso4Data: Record<string, MGSO4NodeData> = {
  mgosilo: {
    title: 'Magnesium Oxide (MgO) Storage & Pneumatic Dosing Silo',
    badge: ['Solid Feedstock','info'],
    body: 'Manages bulk chemical raw Magnesium Oxide powder. Features continuous gravimetric loss-in-weight discharge feeders to match stoichiometry balances inside the downstream neutralization reactor vessel.',
    kafaah: 'Powder flow fluidization index evaluation, raw material assay validation, and anti-bridging throat geometry reviews.',
    challenge: 'Fine powder compaction causing hopper rat-holing, leading to uneven stoichiometry dosing into the liquid reactor.'
  },
  acidsilo: {
    title: 'Sulfuric Acid (H₂SO₄) Storage & Metering Matrix',
    badge: ['Liquid Feedstock','danger'],
    body: 'Stores concentrated or diluted Sulfuric Acid streams safely. Automated chemical dosing pumps regulate delivery into the batch reactor loop to maintain target acid levels.',
    kafaah: 'Alloy lining integrity corrosion monitoring, dosing pump loop tuning, and safety mitigation reviews.',
    challenge: 'Exothermic heat spikes localized at the raw water dilution point can accelerate pipeline corrosion if velocity rules are bypassed.'
  },
  reactor: {
    title: 'Exothermic Batch Neutralization Reactor Tank',
    badge: ['Reaction Core','danger'],
    body: 'Blends MgO powder directly with diluted H₂SO₄ under strong mechanical agitation. The reaction is strongly exothermic, driving temperatures up to 85–95 °C, which speeds up dissolution and yields a highly saturated liquid Magnesium Sulfate solution.',
    kafaah: 'Batch cycle retention optimization, heat exchanger cooling load allocation, and pH endpoint logging.',
    challenge: 'Unreacted heavy MgO settling at the bottom of the tank if the agitator tip speed drops, causing off-spec batch acidity and material loss.'
  },
  crystallizer: {
    title: 'Temperature-Regulated Cooling Crystallizer Train',
    badge: ['Phase Growth','info'],
    body: 'Receives hot, clarified saturated liquor and cools it according to a strict thermal ramp. This process drives crystal formation to produce uniform Magnesium Sulfate Heptahydrate (Epsom salt, MgSO₄·7H₂O).',
    kafaah: 'Cooling curve setpoint tuning, cooling jacket scale prevention audits, and crystal sizing checks.',
    challenge: 'Cooling too quickly forms fine micro-crystals that trap impurities and resist dewatering in the centrifuge loop.'
  },
  centrifuge: {
    title: 'Mechanical Basket/Pusher Centrifuge Filtration System',
    badge: ['Solid Separation','warn'],
    body: 'Separates the crystal slurry at high speeds. Mechanical centrifugal force throws out the mother liquor while isolating a low-moisture crystalline cake inside the drum.',
    kafaah: 'Centrifugal G-force optimization, filter screen wear profiling, and cake washing balance tracking.',
    challenge: 'Uneven slurry feeding creating mechanical basket imbalances, causing high-vibration trips and bearing wear.'
  },
  dryer: {
    title: 'Low-Temperature Fluidized Bed Crystal Dryer',
    badge: ['Moisture Polish','info'],
    body: 'Gently conditions the centrifuge wet cake with warm air currents. The operating temperature is kept strictly below 45–50 °C to prevent dehydration of the heptahydrate structure into lower, less soluble hydrates.',
    kafaah: 'Air temperature automation loop tuning, product moisture profiling, and energy balance audits.',
    challenge: 'High air temperatures causing crystal melting or partial dehydration, resulting in sticky product surfaces that cake in storage.'
  },
  packing: {
    title: 'Direct Bagging & Final Inventory Station',
    badge: ['Inventory Stream','ok'],
    body: 'Weighs and packages the dried crystalline product into moisture-barrier bags to maintain stability and prevent compaction during warehousing.',
    kafaah: 'Packaging line scale calibration, relative humidity tracking, and storage stack stability reviews.',
    challenge: 'High ambient humidity during bagging causing surface moisture absorption, triggering severe product caking inside standard bags.'
  }
};

function Mgso4PFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeDetails = activeNode ? mgso4Data[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-blue") {
      borderClass = "stroke-[#38bdf8]";
    } else if (category === "c-coral") {
      borderClass = "stroke-[#fb7185]";
    } else if (category === "c-teal") {
      borderClass = "stroke-[#14b8a6]";
    } else if (category === "c-purple") {
      borderClass = "stroke-[#a78bfa]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    } else if (category === "c-amber") {
      borderClass = "stroke-[#f59e0b]";
    } else if (category === "c-gray") {
      borderClass = "stroke-[#94a3b8]";
    } else if (category === "c-red") {
      borderClass = "stroke-[#dc2626]";
    }

    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      {/* PFD Interactive Section */}
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive MgSO₄ Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the Magnesium Sulfate production process. Click on any process block to inspect raw material preparation, exothermic neutralization, crystallizer phase growth, centrifuge separation, and drying units.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 520 920" role="img" className="w-full h-auto text-silver select-none">
                  <title>Magnesium Sulfate Production Plant — Process Flow Diagram</title>
                  <desc>Interactive process flow chart showing raw material feeding, exothermic neutralization, crystallizer phase growth, centrifuge filtration separation, and product drying.</desc>
                  <defs>
                    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <text x={45} y={30} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 1: RAW MATERIAL PREPARATION</text>
                  <rect x={10} y={40} width={490} height={140} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <g id="node-mgosilo" className="node" onClick={() => setActiveNode("mgosilo")}>
                    <rect x={30} y={65} width={180} height={60} rx={6} className={getNodeClass("mgosilo", "c-gray")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={120} y={86} textAnchor="middle" dominantBaseline="central">MgO Powder Silo</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={120} y={106} textAnchor="middle" dominantBaseline="central">Magnesium Oxide Dosing</text>
                  </g>
                  
                  <g id="node-acidsilo" className="node" onClick={() => setActiveNode("acidsilo")}>
                    <rect x={290} y={65} width={180} height={60} rx={6} className={getNodeClass("acidsilo", "c-red")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={380} y={86} textAnchor="middle" dominantBaseline="central">H₂SO₄ Storage Tank</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={380} y={106} textAnchor="middle" dominantBaseline="central">Sulfuric Acid Feed (Dilute)</text>
                  </g>

                  <text x={45} y={225} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 2: EXOTHERMIC NEUTRALIZATION</text>
                  <rect x={10} y={235} width={490} height={165} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <path d="M120 125 L120 260 L200 260 L200 280" fill="none" stroke={MGSO4_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <path d="M380 125 L380 260 L240 260 L240 280" fill="none" stroke={MGSO4_FLOW_COLORS.acid} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-reactor" className="node" onClick={() => setActiveNode("reactor")}>
                    <rect x={135} y={280} width={170} height={70} rx={6} className={getNodeClass("reactor", "c-amber")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={220} y={305} textAnchor="middle" dominantBaseline="central">Neutralization Reactor</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={220} y={325} textAnchor="middle" dominantBaseline="central">Batch Agitated / Exothermic</text>
                    <text className="text-[10px] fill-[#fb7185] pointer-events-none font-light" x={220} y={338} textAnchor="middle" dominantBaseline="central">MgO + H₂SO₄ → MgSO₄ + H₂O</text>
                  </g>

                  <text x={45} y={445} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 3: CRYSTALLIZATION TRAIN</text>
                  <rect x={10} y={455} width={490} height={150} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <line x1={220} y1={350} x2={220} y2={485} stroke={MGSO4_FLOW_COLORS.liquor} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/70 pointer-events-none font-light" x={235} y={415}>Hot Saturated Liquor</text>

                  <g id="node-crystallizer" className="node" onClick={() => setActiveNode("crystallizer")}>
                    <rect x={105} y={485} width={230} height={65} rx={6} className={getNodeClass("crystallizer", "c-blue")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={220} y={510} textAnchor="middle" dominantBaseline="central">Cooling Crystallizer Unit</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={220} y={532} textAnchor="middle" dominantBaseline="central">Controlled Temperature Crystal Growth</text>
                  </g>

                  <text x={45} y={645} className="text-[11px] font-bold fill-silver/80 font-[family-name:var(--font-ui)] tracking-wider">STAGE 4: CENTRIFUGE FILTRATION &amp; DRYING</text>
                  <rect x={10} y={655} width={490} height={215} rx={8} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>

                  <line x1={220} y1={550} x2={220} y2={685} stroke={MGSO4_FLOW_COLORS.liquor} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/70 pointer-events-none font-light" x={235} y={615}>Crystalline Slurry</text>

                  <g id="node-centrifuge" className="node" onClick={() => setActiveNode("centrifuge")}>
                    <rect x={50} y={685} width={190} height={65} rx={6} className={getNodeClass("centrifuge", "c-teal")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={145} y={708} textAnchor="middle" dominantBaseline="central">Centrifuge Filter</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={145} y={728} textAnchor="middle" dominantBaseline="central">High-Speed Cake Separation</text>
                  </g>

                  <path d="M50 717 L20 717 L20 315 L135 315" fill="none" stroke={MGSO4_FLOW_COLORS.liquor} strokeWidth={1.2} strokeDasharray="4 4" markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={32} y={210} transform="rotate(-90 32 210)">Mother Liquor Recycle Loop</text>

                  <line x1={240} y1={717} x2={295} y2={717} stroke={MGSO4_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>
                  <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={268} y={698} textAnchor="middle">Wet Cake</text>

                  <g id="node-dryer" className="node" onClick={() => setActiveNode("dryer")}>
                    <rect x={295} y={685} width={185} height={65} rx={6} className={getNodeClass("dryer", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={387} y={708} textAnchor="middle" dominantBaseline="central">Fluidized Bed Dryer</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x={387} y={728} textAnchor="middle" dominantBaseline="central">Epsom Salt Final Dressing</text>
                  </g>

                  <line x1={387} y1={750} x2={387} y2={800} stroke={MGSO4_FLOW_COLORS.solids} strokeWidth={1.5} markerEnd="url(#ar)"/>

                  <g id="node-packing" className="node" onClick={() => setActiveNode("packing")}>
                    <rect x={280} y={800} width={210} height={50} rx={6} className={getNodeClass("packing", "c-green")}/>
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x={385} y={825} textAnchor="middle" dominantBaseline="central">Product Bagging Station</text>
                  </g>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x={260} y={890} textAnchor="middle">↑ Click any process node above to view core technical advisory details.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  {/* Decorative gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-divider/60">
                        {/* Kafaah Optimization Focus */}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>

                        {/* Operational Challenge */}
                        {activeDetails.challenge && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                Operational Challenge
                              </h4>
                              <p className="text-xs font-light text-silver/80 leading-relaxed">
                                {activeDetails.challenge}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key parameters, and Kafaah&apos;s specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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

const H3PO4_FLOW_COLORS = {
  solids: "#94a3b8",
  gas: "#8b5cf6",
  utility: "#0ea5e9",
  furnace: "#f43f5e",
  acid: "#10b981",
};

const h3po4PfdData: Record<string, PFDNodeData> = {
  rock: {
    title: 'Phosphate Rock Silo & Gravimetric Feeder',
    badge: ['Feed Quality', 'info'],
    body: 'Stores and delivers dry ground phosphate rock into the reaction loop. Feeder stability is critical to maintain a rock-to-acid ratio matched for a continuous 27% P₂O₅ reactor baseline. Shifts in calcium carbonate content cause immediate changes in acid demand and CO₂ venting requirements.',
    kafaah: 'Weigh belt calibration verification, tracking particle sizing parameters, and rock matrix benchmarking.',
    challenge: 'Fluctuating carbonate and organic levels in raw rock feeds causing localized gas-foaming, which blinds liquid level instrumentation and triggers slurry overflows.'
  },
  h2so4: {
    title: 'Concentrated Sulfuric Acid Feeding Loop',
    badge: ['Reagent Supply', 'info'],
    body: 'Concentrated 98% H₂SO₄ is metered to drive the phosphate decomposition. To secure optimal calcium sulfate crystallization paths under a 27% P₂O₅ concentration regime, free sulfate levels inside the liquid phase must be held within a narrow band.',
    kafaah: 'Corrosion profile auditing, mixing loop monitoring, and high-accuracy magnetic flow tuning.',
    challenge: 'Localized concentration spike near deteriorated acid sparger nozzles, causing structural passivation or "coating" of rock grains that arrests chemical digestion.'
  },
  reactor: {
    title: 'Attack Reactor System',
    badge: ['Reaction Zone', 'danger'],
    body: 'The central digestion reactor maintains a continuous slurry profile focused on delivering a direct 27% P₂O₅ concentration matrix. High-efficiency agitation loops are vital to prevent phase shortcutting, ensuring uniform crystal growth for clean downstream filtration.',
    kafaah: 'Free sulfate optimization checks, slurry solids density balance, and agitator tip-speed metrics.',
    challenge: 'Slurry short-circuiting or stagnant zones in the compartments, skewing localized sulfate ratios and leading to pockets of unreacted rock.'
  },
  flashcool: {
    title: 'Vacuum Flash Cooler System',
    badge: ['Thermal Control', 'warn'],
    body: 'Controls reaction exotherms by circulating digestion slurry through a vacuum flash room. The slurry temperature must be strictly controlled below 80 °C, focusing on a highly specific 74–76 °C operational target window to maintain ideal crystal morphology and prevent thermal acceleration of equipment scaling.',
    kafaah: 'Vacuum system integrity audits, condenser scale profiling, and flash pump velocity logs.',
    challenge: 'Vacuum fluctuation pushing slurry temperatures above the 80 °C limit, driving rapid scale crystallization within the recycle piping and choking circulation loops.'
  },
  offgas: {
    title: 'Fluorine Gas Stream Evolution',
    badge: ['Gas Stream', 'warn'],
    body: 'The digestion reaction releases silicon tetrafluoride (SiF₄) and hydrogen fluoride (HF) vapors into the reactor header spaces. Continuous negative draft ventilation must be maintained to clean the reactor environment.',
    kafaah: 'Header draft pressure balancing, duct scaling indexes, and alloy corrosion review.',
    challenge: 'Silica gel deposition inside off-gas headers caused by moisture vapor hydrolysis, restriction of draft fan efficiency, and venting risk.'
  },
  panfilter: {
    title: 'Tilting Pan Filter Technology',
    badge: ['Filtration Core', 'danger'],
    body: 'Processes the primary slurry stream through a multi-stage counter-current wash routine. Highly optimized for handling crystals produced under a 27% P₂O₅ baseline, ensuring maximum soluble phosphorus displacement prior to pan inversion.',
    kafaah: 'Vacuum distribution box profiling, pan alignment checks, and hydraulic wash distribution balance.',
    challenge: 'Structural vacuum leaks across the main rotary wear plate assemblies, reducing filtration differentials and increasing water carryover into the 27% P₂O₅ product stream.'
  },
  strongacid: {
    title: 'Product Acid Seal Tank',
    badge: ['Product Line', 'ok'],
    body: 'Receives the main first-stage filtrate under barometric down-take configurations, storing crude 27% P₂O₅ phosphoric acid prior to downstream clarification and storage.',
    kafaah: 'P₂O₅ mass yield balances, stream density logging, and down-take pipe hydraulic checks.',
    challenge: 'Gas entrainment and micro-bubble foaming inside the barometric down-take line, causing cavitation and premature impeller degradation in the transfer pumps.'
  },
  clarification: {
    title: 'Acid Clarification & Settling Cells',
    badge: ['Purification', 'warn'],
    body: 'The raw 27% P₂O₅ filtrate carries suspended fines and supersaturated chemical lattices. Settling basins leverage specialized flocculants to clean the acid, dropping the solid sludge out of the product phase.',
    kafaah: 'Flocculant dosing feedback loops, rake mechanical torque tracking, and overflow clarity checks.',
    challenge: 'Post-precipitation of complex sodium/potassium fluorosilicates onto clarifier components, creating hard scale that demands mechanical cleanouts.'
  },
  storage: {
    title: 'Clarified 27% P₂O₅ Storage Tank',
    badge: ['Asset Control', 'ok'],
    body: 'Stores clarified 27% P₂O₅ intermediate acid before pumping it to the evaporation section. Continuous, low-shear mechanical agitation is required to prevent the fallout and compaction of fine chemical residuals on the tank floors.',
    kafaah: 'Tank internal lining validation, floor sludge mapping, and intermediate transfer pump flow metrics.',
    challenge: 'Rapid crystallization of dissolved solids on tank bottom areas during mixer mechanical failures, forming dense, compacted mud beds that clog exit valves.'
  },
  evaporator: {
    title: '54% P₂O₅ Product Evaporator Unit',
    badge: ['Concentration', 'danger'],
    body: 'Concentrates the intermediate 27% P₂O₅ feedstock up to 54% P₂O₅ Merchant Grade Acid (MGA). This is achieved via a forced-circulation heat exchanger loop operating under high vacuum and heat input from medium-pressure steam. Fluosilicic acid vapors are drawn off overhead to prevent environmental carryover.',
    kafaah: 'Heat transfer coefficient optimization, steam economy validation, entrainment separator efficiency logs, and vacuum pump performance monitoring.',
    challenge: 'Severe fluorosilicic and calcium sulfate scaling along the inner walls of the graphite or special alloy heat exchanger tubes, restricting heat transfer and causing premature vacuum collapses.'
  },
  merchantstorage: {
    title: '54% MGA Product Storage',
    badge: ['Final Product', 'ok'],
    body: 'Stores the concentrated 54% P₂O₅ merchant grade phosphoric acid prior to dispatch or down-stream DAP/MAP fertilizer processing. Sludge post-precipitation is common as the acid cools, requiring continuous rake or agitation movement.',
    kafaah: 'MGA quality parameters compliance, post-precipitation solids ratio analysis, and tank loading safety validation.',
    challenge: 'High sludge settlement rates blocking secondary discharge manifolds, forcing offline high-pressure water blasting to clear product lines.'
  },
  cakedischarge: {
    title: 'Pan Inversion & Chute Discharge',
    badge: ['Solid Waste', 'info'],
    body: 'Mechanical guide paths rotate each filter pan 180 degrees over a discharge bunker. Gravity drops the crystal cake out of the cell, separating solids for lagoon or conveyor processing.',
    kafaah: 'Inversion roller tracking, chute wear lining audits, and rotation torque indexes.',
    challenge: 'High cake moisture caused by filtration vacuum loss, resulting in wet solids sticking inside the pan corners during inversion and unbalancing the structural frame.'
  },
  clothwash: {
    title: 'High-Pressure Cloth Wash Station',
    badge: ['Maintenance', 'info'],
    body: 'Cleans the overturned filter cloth with a targeted array of high-pressure hot water sprays, dissolving interstitial crystals to prevent cloth blinding before the pan rotates back to receive new reactor slurry.',
    kafaah: 'Spray header pressure logging, thermal balance evaluation, and spray nozzle placement checks.',
    challenge: 'Nozzle fouling from calcium scaling in the recycled wash water loop, creating unwashed areas on the filter cloths that blind the filter on subsequent runs.'
  },
  washliquor: {
    title: 'Return Wash Filtrate Matrix',
    badge: ['Recycle Loop', 'info'],
    body: 'Collects downstream wash filtrates from the filter deck, routing them backward counter-currently to serve as initial cake washes. This design optimizes global plant water balances while keeping the core reactor acid concentration steady at 27% P₂O₅.',
    kafaah: 'Dilution profile tracking, water loop integration, and filtrate stage density checks.',
    challenge: 'Internal precipitation of calcium sulfate scale inside intermediate filtrate collection channels, causing line restrictions and shifting stage wash volume ratios.'
  },
  scrubber: {
    title: 'Fluorine Gas Scrubber Column',
    badge: ['HSE Control', 'danger'],
    body: 'Vapor streams from both the attack reactor and the vacuum evaporator are processed through a gas scrubber to capture gaseous fluorine compounds. Rigorous fluid scrubbing cleans total emission lines, keeping discharge figures securely under 30 mg/Nm³ F to satisfy strict environmental frameworks.',
    kafaah: 'Circulation volume confirmation, column delta-P profiling, and emission monitor verification logs.',
    challenge: 'Sudden silica gel scaling across the internal packing beds during digestion upsets, spiking column differential pressures and overloading the ventilation draft fan.'
  }
};

function H3Po4PFD({ tech, relatedSvcs }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const activeDetails = activeNode ? h3po4PfdData[activeNode] : null;

  const getBadgeClass = (type: "warn" | "danger" | "info" | "ok") => {
    switch (type) {
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ok":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-silver/10 text-silver border-silver/20";
    }
  };

  const getNodeClass = (key: string, category: string) => {
    const isActive = activeNode === key;
    let borderClass = "stroke-silver/40";
    
    if (category === "c-blue") {
      borderClass = "stroke-[#0ea5e9]";
    } else if (category === "c-coral") {
      borderClass = "stroke-[#f43f5e]";
    } else if (category === "c-teal") {
      borderClass = "stroke-[#14b8a6]";
    } else if (category === "c-purple") {
      borderClass = "stroke-[#8b5cf6]";
    } else if (category === "c-green") {
      borderClass = "stroke-[#10b981]";
    } else if (category === "c-amber") {
      borderClass = "stroke-[#f59e0b]";
    } else if (category === "c-gray") {
      borderClass = "stroke-[#94a3b8]";
    }

    const fillClass = isActive ? "fill-[#2E4460]" : "fill-[#1E3045]";

    const activeClass = isActive 
      ? "stroke-gold stroke-[2.5px] scale-[1.01] drop-shadow-[0_0_12px_rgba(240,160,32,0.2)]" 
      : "stroke-[1px] hover:stroke-gold/60 hover:scale-[1.005]";

    return `transition-all duration-300 ease-in-out cursor-pointer origin-center ${borderClass} ${fillClass} ${activeClass}`;
  };

  return (
    <>
      <section className="py-24 bg-navy-deep relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/[0.005] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center justify-center gap-3 mb-6 gold-line">
                Process Flow Technology
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                Interactive H₃PO₄ Process Flow Diagram
              </h2>
              <p className="text-base font-light text-silver/80 leading-relaxed">
                Explore the complete Phosphoric Acid production process flow, from 27% P₂O₅ reaction circuit and vacuum flash cooling to tilting pan filtration and 54% P₂O₅ MGA evaporator loops. Click any process block to inspect technical specifications.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* SVG Interactive Diagram */}
            <div className="lg:col-span-7 xl:col-span-8 bg-navy-dark/30 border border-white/[0.08] p-4 sm:p-6 md:p-8 rounded-sm shadow-xl relative">
              <FadeIn delay={0.1}>
                <svg width="100%" viewBox="0 0 680 1020" role="img" className="w-full h-auto text-silver select-none">
                  <title>Phosphoric Acid Production Plant — Process Flow Diagram</title>
                  <desc>Interactive PFD including a 27% P2O5 reaction circuit, vacuum flash cooling, tilting pan filtration, and a 54% P2O5 product evaporation unit.</desc>
                  <defs>
                    <marker id="ar-h3po4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                  </defs>

                  <g id="node-rock" className="node" onClick={() => setActiveNode("rock")}>
                    <rect x="80" y="30" width="168" height="58" rx="8" className={getNodeClass("rock", "c-blue")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="164" y="52" textAnchor="middle" dominantBaseline="central">Phosphate Rock Silo</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="164" y="72" textAnchor="middle" dominantBaseline="central">Dry Ground Rock Feed</text>
                  </g>
                  <rect x="134" y="100" width="90" height="20" rx="4" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="0.5" opacity="0.5"/>
                  <text className="text-[11px] fill-silver/80 pointer-events-none" x="179" y="114" textAnchor="middle" dominantBaseline="central">~3.4 t/t P₂O₅</text>

                  <g id="node-h2so4" className="node" onClick={() => setActiveNode("h2so4")}>
                    <rect x="432" y="30" width="168" height="58" rx="8" className={getNodeClass("h2so4", "c-blue")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="516" y="52" textAnchor="middle" dominantBaseline="central">98% H₂SO₄ Storage</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="516" y="72" textAnchor="middle" dominantBaseline="central">Concentrated Acid Feed</text>
                  </g>
                  <rect x="456" y="100" width="90" height="20" rx="4" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="0.5" opacity="0.5"/>
                  <text className="text-[11px] fill-silver/80 pointer-events-none" x="501" y="114" textAnchor="middle" dominantBaseline="central">~2.7 t/t P₂O₅</text>

                  <line x1="164" y1="120" x2="164" y2="155" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>
                  <line x1="516" y1="120" x2="516" y2="155" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>
                  <path d="M164 155 L164 185 L295 185" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>
                  <path d="M516 155 L516 185 L465 185" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-flashcool" className="node" onClick={() => setActiveNode("flashcool")}>
                    <rect x="30" y="198" width="120" height="44" rx="6" className={getNodeClass("flashcool", "c-amber")} />
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x="90" y="214" textAnchor="middle" dominantBaseline="central">Vacuum Flash Cooler</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x="90" y="232" textAnchor="middle" dominantBaseline="central">Target: 74–76 °C (&lt;80 °C)</text>
                  </g>
                  <path d="M220 220 L150 220" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>
                  <path d="M90 198 L90 175 L204 175" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-reactor" className="node" onClick={() => setActiveNode("reactor")}>
                    <rect x="204" y="162" width="272" height="100" rx="10" className={getNodeClass("reactor", "c-coral")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="340" y="195" textAnchor="middle" dominantBaseline="central">Attack Reactor System</text>
                    <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x="340" y="217" textAnchor="middle" dominantBaseline="central">Reaction Zone Dynamics</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="340" y="238" textAnchor="middle" dominantBaseline="central">Controlled 27% P₂O₅ Output</text>
                  </g>

                  <g id="node-offgas" className="node" onClick={() => setActiveNode("offgas")}>
                    <rect x="534" y="190" width="120" height="44" rx="6" className={getNodeClass("offgas", "c-purple")} />
                    <text className="text-[12px] font-semibold fill-cloud tracking-wide pointer-events-none" x="594" y="205" textAnchor="middle" dominantBaseline="central">Fluorine Gases</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x="594" y="222" textAnchor="middle" dominantBaseline="central">To Scrubber</text>
                  </g>
                  <line x1="476" y1="212" x2="534" y2="212" stroke={H3PO4_FLOW_COLORS.gas} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <path d="M340 262 L340 305" fill="none" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.5" markerEnd="url(#ar-h3po4)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none" x="410" y="285" textAnchor="middle">Acid Slurry Feed</text>

                  <g id="node-panfilter" className="node" onClick={() => setActiveNode("panfilter")}>
                    <rect x="140" y="307" width="400" height="85" rx="8" className={getNodeClass("panfilter", "c-teal")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="340" y="330" textAnchor="middle" dominantBaseline="central">Tilting Pan Filter (Rotary Vacuum Matrix)</text>
                    <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x="340" y="352" textAnchor="middle" dominantBaseline="central">Optimized for 27% P₂O₅ Slurry Separation &amp; Multi-Stage Wash</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x="340" y="372" textAnchor="middle" dominantBaseline="central">Rapid Inversion Cake Discharge &amp; Cloth Rinse</text>
                  </g>

                  <path d="M220 392 L220 445" fill="none" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.5" markerEnd="url(#ar-h3po4)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none" x="160" y="420">27% P₂O₅ Filtrate</text>

                  <path d="M460 392 L460 445" fill="none" stroke={H3PO4_FLOW_COLORS.solids} strokeWidth="1.5" markerEnd="url(#ar-h3po4)"/>
                  <text className="text-[11px] fill-silver/70 pointer-events-none" x="525" y="420">By-Product Cake</text>

                  <g id="node-strongacid" className="node" onClick={() => setActiveNode("strongacid")}>
                    <rect x="110" y="447" width="210" height="58" rx="8" className={getNodeClass("strongacid", "c-green")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="215" y="468" textAnchor="middle" dominantBaseline="central">Product Acid Seal Tank</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="215" y="488" textAnchor="middle" dominantBaseline="central">Crude 27% P₂O₅ Production</text>
                  </g>
                  <line x1="215" y1="505" x2="215" y2="545" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-clarification" className="node" onClick={() => setActiveNode("clarification")}>
                    <rect x="110" y="547" width="210" height="58" rx="8" className={getNodeClass("clarification", "c-green")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="215" y="568" textAnchor="middle" dominantBaseline="central">Acid Clarification Settlers</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="215" y="588" textAnchor="middle" dominantBaseline="central">Suspended Solids Drop</text>
                  </g>
                  <line x1="215" y1="605" x2="215" y2="645" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-storage" className="node" onClick={() => setActiveNode("storage")}>
                    <rect x="110" y="647" width="210" height="58" rx="8" className={getNodeClass("storage", "c-green")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="215" y="668" textAnchor="middle" dominantBaseline="central">Clarified 27% P₂O₅ Tank</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="215" y="688" textAnchor="middle" dominantBaseline="central">Intermediate Evaporator Feed</text>
                  </g>
                  <line x1="215" y1="705" x2="215" y2="745" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.5" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-evaporator" className="node" onClick={() => setActiveNode("evaporator")}>
                    <rect x="110" y="747" width="210" height="68" rx="8" className={getNodeClass("evaporator", "c-coral")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="215" y="768" textAnchor="middle" dominantBaseline="central">54% P₂O₅ Evaporator</text>
                    <text className="text-[11px] fill-silver/70 pointer-events-none font-light" x="215" y="788" textAnchor="middle" dominantBaseline="central">Forced Circulation / Vacuum</text>
                    <text className="text-[10px] fill-silver/60 pointer-events-none font-light" x="215" y="802" textAnchor="middle" dominantBaseline="central">Merchant Grade Concentration</text>
                  </g>
                  <line x1="215" y1="815" x2="215" y2="855" stroke={H3PO4_FLOW_COLORS.furnace} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-merchantstorage" className="node" onClick={() => setActiveNode("merchantstorage")}>
                    <rect x="110" y="857" width="210" height="58" rx="8" className={getNodeClass("merchantstorage", "c-green")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="215" y="878" textAnchor="middle" dominantBaseline="central">54% MGA Storage Tank</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="215" y="898" textAnchor="middle" dominantBaseline="central">Final Merchant Acid Dispatch</text>
                  </g>

                  <g id="node-cakedischarge" className="node" onClick={() => setActiveNode("cakedischarge")}>
                    <rect x="370" y="447" width="200" height="58" rx="8" className={getNodeClass("cakedischarge", "c-gray")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="470" y="468" textAnchor="middle" dominantBaseline="central">Pan Inversion &amp; Chute</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="470" y="488" textAnchor="middle" dominantBaseline="central">Calcium Sulfate Discharges</text>
                  </g>
                  <line x1="470" y1="505" x2="470" y2="545" stroke={H3PO4_FLOW_COLORS.solids} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-clothwash" className="node" onClick={() => setActiveNode("clothwash")}>
                    <rect x="370" y="547" width="200" height="58" rx="8" className={getNodeClass("clothwash", "c-blue")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="470" y="568" textAnchor="middle" dominantBaseline="central">High-Pressure Cloth Wash</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="470" y="588" textAnchor="middle" dominantBaseline="central">Blind Prevention / Scald Removal</text>
                  </g>
                  <line x1="470" y1="605" x2="470" y2="645" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1.2" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-washliquor" className="node" onClick={() => setActiveNode("washliquor")}>
                    <rect x="370" y="647" width="200" height="58" rx="8" className={getNodeClass("washliquor", "c-blue")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="470" y="668" textAnchor="middle" dominantBaseline="central">Return Wash Filtrate Matrix</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="470" y="688" textAnchor="middle" dominantBaseline="central">Counter-Current Wash Loop Feed</text>
                  </g>
                  <path d="M370 676 L340 676 L340 370 L140 370" fill="none" stroke={H3PO4_FLOW_COLORS.utility} strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ar-h3po4)"/>

                  <g id="node-scrubber" className="node" onClick={() => setActiveNode("scrubber")}>
                    <rect x="350" y="755" width="240" height="52" rx="8" className={getNodeClass("scrubber", "c-gray")} />
                    <text className="text-[13px] font-semibold fill-cloud tracking-wide pointer-events-none" x="470" y="775" textAnchor="middle" dominantBaseline="central">Fluorine Gas Scrubber Column</text>
                    <text className="text-[11px] fill-silver/60 pointer-events-none font-light" x="470" y="794" textAnchor="middle" dominantBaseline="central">Emissions &lt; 30 mg/Nm³ to stack</text>
                  </g>
                  <path d="M594 234 L594 740 L470 740 L470 755" fill="none" stroke={H3PO4_FLOW_COLORS.gas} strokeWidth="1" strokeDasharray="4 3"/>
                  <path d="M320 781 L350 781" fill="none" stroke={H3PO4_FLOW_COLORS.gas} strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#ar-h3po4)"/>

                  <text className="text-[12px] fill-silver/40 pointer-events-none font-medium" x="340" y="965" textAnchor="middle">↑ Click any process block above to examine operational indicators.</text>
                </svg>
              </FadeIn>
            </div>

            {/* Dynamic Details Panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <FadeIn delay={0.2}>
                <div className="relative bg-navy-card/45 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-2xl transition-all duration-500 min-h-[200px] hover:border-gold/30 group">
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                  {activeDetails ? (
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-cloud font-bold tracking-tight">
                          {activeDetails.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase rounded-full border ${getBadgeClass(activeDetails.badge[1])}`}>
                          {activeDetails.badge[0]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-light text-silver/90 leading-relaxed mb-6">
                        {activeDetails.body}
                      </p>
                      
                      <div className="space-y-4 pt-4 border-t border-divider/60">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                              Optimization Advisory Focus
                            </h4>
                            <p className="text-xs font-light text-silver/80 leading-relaxed">
                              {activeDetails.kafaah}
                            </p>
                          </div>
                        </div>

                        {activeDetails.challenge && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                Operational Challenge
                              </h4>
                              <p className="text-xs font-light text-silver/80 leading-relaxed">
                                {activeDetails.challenge}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 animate-pulse">
                        <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-base text-cloud font-medium mb-2">
                        Interactive Optimization Advisor
                      </h3>
                      <p className="text-xs font-light text-silver/50 max-w-[280px] leading-relaxed">
                        Click on any process block in the diagram to inspect technical configurations, key parameters, and Kafaah&apos;s specialized engineering recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedSvcs.length > 0 && (
        <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                Synergies &amp; Solutions
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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

      {/* Enhanced CTA Section */}
      <section className="py-28 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#e5c158 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[860px] mx-auto px-8 text-center relative z-10">
          <FadeIn>
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-5 inline-block">
              Request Technical Consult
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
              Optimizing or Commissioning a {tech.name} Plant?
            </h2>
            <p className="text-base md:text-lg font-light text-silver/80 mb-10 max-w-[620px] mx-auto leading-relaxed">
              Partner with specialized engineers who have directly operated and commissioned the exact same systems. Let&apos;s discuss your project targets.
            </p>
            
            <Link
              href="/contact/"
              className="group btn-premium-gold font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.12em] uppercase inline-flex items-center"
            >
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

export function TechnologyPageClient({ tech, relatedSvcs }: Props) {
  if (tech.slug === "sulfuric-acid") {
    return <SulfuricAcidPFD tech={tech} relatedSvcs={relatedSvcs} />;
  }

  if (tech.slug === "phosphoric-acid") {
    return <H3Po4PFD tech={tech} relatedSvcs={relatedSvcs} />;
  }

  if (tech.slug === "npk") {
    return <NpkPFD tech={tech} relatedSvcs={relatedSvcs} />;
  }

  if (tech.slug === "ssp") {
    return <SspPFD tech={tech} relatedSvcs={relatedSvcs} />;
  }

  if (tech.slug === "sulfate-of-potash") {
    return <SopPFD tech={tech} relatedSvcs={relatedSvcs} />;
  }

  if (tech.slug === "magnesium-sulphate") {
    return <Mgso4PFD tech={tech} relatedSvcs={relatedSvcs} />;
  }




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
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Chemical Overview
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
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
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Process Flow
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Major Infrastructure
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Critical Risk Areas
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Kafaah&apos;s Field Expertise
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
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

            {/* Right Column: Featured Reference Project Card */}
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
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
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
