export interface KeyStat {
  label: string;
  value: string;
}

export interface KeyEquipment {
  name: string;
  desc: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface Technology {
  formula: string;
  name: string;
  slug: string;
  fullName: string;
  shortDesc: string;
  completedProject?: boolean;
  heroTagline: string;
  heroImage: string;
  capacity: string;
  keyStats: KeyStat[];
  keyEquipment: KeyEquipment[];
  processSteps: ProcessStep[];
  chemicalIntro: string[];
  processOverview: string[];
  commissioningChallenges: string[];
  kafaahExperience: string[];
  relatedServices: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const technologies: Technology[] = [
  {
    formula: "H₂SO₄",
    name: "Sulfuric Acid",
    slug: "sulfuric-acid",
    fullName: "Sulfuric Acid — H₂SO₄",
    shortDesc: "Contact process · Converter design · Absorption tower",
    heroTagline: "World-Class Sulfuric Acid Plant Commissioning, Refractory Curing & Steady-State Operations",
    heroImage: "/h2so4_plant.webp",
    capacity: "500–5,000+ MTPD",
    keyStats: [
      { label: "Typical Capacity", value: "1,500–3,000 MTPD" },
      { label: "Catalyst Beds", value: "4-Pass Converter" },
      { label: "Conversion Rate", value: "> 99.7%" },
      { label: "Steam Generation", value: "1.2 t/t Acid" }
    ],
    keyEquipment: [
      { name: "Sulfur Burner", desc: "High-temperature refractory-lined furnace designed for complete liquid sulfur atomization and combustion." },
      { name: "Waste Heat Boiler", desc: "Heavy-duty firetube or watertube boiler that recovers exothermic reaction heat to generate high-pressure steam." },
      { name: "Multi-Pass Converter", desc: "Stainless steel catalytic vessel containing vanadium pentoxide (V₂O₅) beds for sequential SO₂ to SO₃ conversion." },
      { name: "Double Absorption Towers", desc: "Packed columns with high-efficiency distribution systems for absorption of SO₃ into circulating 98.5% H₂SO₄." },
      { name: "Anodic Acid Coolers", desc: "Anodically protected shell-and-tube heat exchangers or alloy plate coolers managing highly corrosive acid loops." }
    ],
    processSteps: [
      { title: "Sulfur Combustion", desc: "Liquid sulfur is pumped, atomized, and burned with dry combustion air in the furnace to produce SO₂ gas at 10.5–11.5% concentration." },
      { title: "Gas Cooling", desc: "Hot furnace gases pass through a waste heat boiler, cooling the SO₂ gas stream to the catalyst activation temperature (~420°C)." },
      { title: "Catalytic Conversion", desc: "SO₂ is oxidized to SO₃ inside a multi-bed converter containing V₂O₅ catalyst, with interbed cooling to maximize conversion." },
      { title: "Interpass Absorption", desc: "After the third catalyst pass, SO₃ is routed to the interpass tower where it is absorbed, shifting equilibrium for final conversion." },
      { title: "Final Absorption", desc: "The remaining SO₂ is converted in the fourth bed and absorbed in the final tower, achieving overall conversion rates exceeding 99.7%." }
    ],
    chemicalIntro: [
      "Sulfuric acid (H₂SO₄) is the world's most produced industrial chemical. It is the backbone of the fertilizer industry, used in the production of phosphoric acid, superphosphates, and ammonium sulfate. It is also essential in metallurgy, petroleum refining, and chemical synthesis.",
      "Modern sulfuric acid plants use the contact process — catalytic oxidation of SO₂ to SO₃ over vanadium pentoxide catalyst, followed by absorption in concentrated acid. Plant capacities range from 100 to 5,000+ tonnes per day.",
      "Managing a sulfuric acid facility requires extreme attention to detail in material selection, process temperature control, moisture ingress prevention, and catalyst activity monitoring to ensure safe, continuous, and highly efficient production."
    ],
    processOverview: [
      "The contact process involves four main stages: sulfur burning (or metallurgical gas cleaning), catalytic conversion in a multi-pass converter, absorption of SO₃ in concentrated acid, and heat recovery through steam generation.",
      "Key equipment includes the sulfur furnace, waste heat boiler, multi-pass converter with vanadium catalyst beds, interpass absorber (in double-absorption plants), final absorber, acid circulation system, and drying tower.",
      "Modern plants achieve conversion rates above 99.7% in double-absorption configuration, producing acid at concentrations from 93% to 98.5% H₂SO₄, with oleum (fuming sulfuric acid) as an optional product."
    ],
    commissioningChallenges: [
      "Converter catalyst activation requires precise temperature control — too cold and conversion is insufficient, too hot and catalyst is permanently damaged.",
      "Acid mist formation in the absorption system is a common startup problem that requires careful attention to acid distribution, temperature, and flow rates.",
      "The transition from startup to stable operation requires managing the heat balance across the entire plant — the converter is exothermic and the plant must be balanced before it can sustain itself.",
      "Refractory drying and curing in the sulfur furnace must follow strict temperature ramp schedules to prevent cracking and structural failure."
    ],
    kafaahExperience: [
      "Kafaah's team has 20 years of direct operational experience with sulfuric acid plants. We have operated contact process plants from startup through steady-state production.",
      "Our experience spans single and double absorption configurations, with sulfur, pyrites, and metallurgical gas as feedstocks.",
      "We provide comprehensive services from refractory dry-out supervision, cold and hot commissioning, gas-in startup protocols, and operator training to operational troubleshooting."
    ],
    relatedServices: ["owners-engineer", "commissioning", "operation-readiness", "troubleshooting", "production-optimization"],
    seoTitle: "Sulfuric Acid Plant Commissioning & Operations — H₂SO₄ Specialists",
    seoDescription: "Independent specialists in sulfuric acid (H₂SO₄) plant commissioning, startup, troubleshooting, and optimization. Contact process expertise. 20 years of operational experience.",
    seoKeywords: ["sulfuric acid plant commissioning", "H2SO4 plant startup", "contact process plant", "sulfuric acid plant consultant"],
  },
  {
    formula: "H₃PO₄",
    name: "Phosphoric Acid",
    slug: "phosphoric-acid",
    fullName: "Phosphoric Acid — H₃PO₄",
    shortDesc: "Wet process · Dihydrate & hemihydrate · Filtration",
    heroTagline: "High-Efficiency Phosphoric Acid Plant Digestion, Filtration & Concentration Optimization",
    heroImage: "/h3po4_plant.webp",
    capacity: "300–1,500+ MTPD P₂O₅",
    keyStats: [
      { label: "Acid Concentration", value: "28%–54% P₂O₅" },
      { label: "Rock Conversion", value: "> 98.5%" },
      { label: "Filtration Rate", value: "5.5 t/m²·day" },
      { label: "Reaction Temp", value: "75°C–80°C" }
    ],
    keyEquipment: [
      { name: "Digestion Reactor", desc: "Multi-compartment or single-tank reactor designed for rock dissolution and calcium sulfate crystallization control." },
      { name: "Vacuum Flash Cooler", desc: "Evaporative cooling system maintaining stable slurry temperature to govern crystal morphology." },
      { name: "Tilting Pan Filter", desc: "High-capacity horizontal rotary vacuum filter providing multi-stage counter-current washing of gypsum cake." },
      { name: "Forced Circulation Evaporator", desc: "High-vacuum heat-exchanged evaporator concentrating weak 28% acid up to 54% P₂O₅ merchant grade." },
      { name: "FSA Recovery Unit", desc: "Scrubbing towers designed to capture fluorine gas releases and produce hydrofluorosilicic acid byproduct." }
    ],
    processSteps: [
      { title: "Rock Feeding & Slurry", desc: "Finely ground phosphate rock is metered into the reactor along with recycled weak phosphoric acid to form a feed slurry." },
      { title: "Acidulation Reaction", desc: "Concentrated sulfuric acid is added to decompose the rock, forming phosphoric acid and calcium sulfate crystals." },
      { title: "Slurry Flash Cooling", desc: "The highly exothermic reaction heat is managed by circulating slurry through a vacuum flash cooler to maintain 78–82°C." },
      { title: "Vacuum Filtration", desc: "The slurry is separated on the vacuum filter. Active washing recovers water-soluble P₂O₅, producing clean gypsum cake." },
      { title: "Acid Concentration", desc: "The filtrate at 28% P₂O₅ is transferred to forced-circulation evaporators where vacuum boils off water to reach 54% P₂O₅." }
    ],
    chemicalIntro: [
      "Phosphoric acid (H₃PO₄) is the primary intermediate in phosphate fertilizer production. It is produced by reacting phosphate rock with sulfuric acid in what is known as the wet process.",
      "The wet process is the dominant production route worldwide, producing merchant-grade acid (MGA) at 54% P₂O₅ concentration. Phosphoric acid is used to produce DAP, MAP, TSP, and NPK fertilizers.",
      "Commissioning and operating a phosphoric acid plant is highly challenging due to the heavy abrasive nature of rock slurries, severe corrosive properties of hot acids, and crystallization kinetics of calcium sulfate."
    ],
    processOverview: [
      "The wet process involves three main stages: reaction of phosphate rock with sulfuric acid to form phosphoric acid and gypsum, filtration to separate the acid from the gypsum cake, and concentration of the acid to the desired P₂O₅ level.",
      "Two main process routes exist: the dihydrate process (most common, producing CaSO₄·2H₂O gypsum) and the hemihydrate process (producing CaSO₄·½H₂O, with higher acid concentration directly from filtration).",
      "Key equipment includes the reactor (single or multi-tank), vacuum flash cooler, tilting pan or belt filter, acid concentration evaporator, and gypsum disposal/processing system."
    ],
    commissioningChallenges: [
      "Reactor temperature and residence time control are critical — deviation leads to poor crystal formation and filtration bottlenecks.",
      "Filter performance is the most common bottleneck during startup. Cloth selection, cake washing efficiency, and vacuum system performance must be optimized simultaneously.",
      "Acid concentration through evaporation requires careful management of scaling (silicofluoride and sulfate deposits) from the first day of operation.",
      "Phosphate rock feed preparation (grinding, slurry preparation) must be matched to reactor requirements — particle size distribution directly affects reaction efficiency."
    ],
    kafaahExperience: [
      "Kafaah's team has operated phosphoric acid plants using both dihydrate and hemihydrate processes.",
      "Our experience includes reactor optimization, filtration performance improvement, and evaporator descaling program development.",
      "We troubleshoot filtration problems, perform chemical digestion audits, and train operators to recognize crystallization anomalies before they disrupt production."
    ],
    relatedServices: ["commissioning", "troubleshooting", "production-optimization", "operator-training"],
    seoTitle: "Phosphoric Acid Plant Commissioning & Operations — H₃PO₄ Specialists",
    seoDescription: "Independent specialists in phosphoric acid (H₃PO₄) plant commissioning and operations. Wet process expertise — dihydrate and hemihydrate. Filtration optimization.",
    seoKeywords: ["phosphoric acid plant commissioning", "H3PO4 plant consultant", "wet process phosphoric acid", "phosphoric acid filtration"],
  },
  {
    formula: "K₂SO₄",
    name: "Sulfate of Potash",
    slug: "sulfate-of-potash",
    fullName: "Sulfate of Potash (SOP) — K₂SO₄",
    shortDesc: "Mannheim process · Double salt route · SOP commissioning",
    completedProject: true,
    heroTagline: "Expert SOP Commissioning, Refractory Dry-out & Mannheim Process Optimization",
    heroImage: "/k2so4_plant.webp",
    capacity: "10,000–120,000 TPA",
    keyStats: [
      { label: "Furnace Temp", value: "600°C–650°C" },
      { label: "SOP K₂O Content", value: "≥ 50%–52%" },
      { label: "Chloride Content", value: "< 1.0% Cl⁻" },
      { label: "HCl Co-product Yield", value: "1.2 t/t SOP" }
    ],
    keyEquipment: [
      { name: "Mannheim Furnace", desc: "Mechanical furnace with a dome-shaped refractory muffle and a central rotating scraper shaft." },
      { name: "HCl Falling Film Absorber", desc: "Corrosion-resistant graphite or glass columns absorbing process gas in water to yield 32% HCl." },
      { name: "SOP Neutralization Drum", desc: "Rotary drum neutralizing raw product acidity with soda ash or calcium carbonate." },
      { name: "Scrubber & Off-Gas System", desc: "High-performance venturi scrubbers ensuring clean tail gas stack discharge." },
      { name: "Product Granulation Unit", desc: "Compaction and screening equipment converting fine SOP powder into high-value granules." }
    ],
    processSteps: [
      { title: "Reactant Metering", desc: "Solid potassium chloride (KCl) and liquid sulfuric acid (H₂SO₄) are continuously metered into the Mannheim furnace at precise molar ratios." },
      { title: "High-Temp Mannheim Calcination", desc: "The reactants are calcined at 600–650°C in an endothermic reaction. Central rabble arms scrape and push the material outward." },
      { title: "Cooling & Neutralization", desc: "Hot acidic SOP powder discharging from the furnace is cooled in a rotary drum and neutralized to control final product acidity." },
      { title: "HCl Adiabatic Absorption", desc: "Hydrogen chloride (HCl) gas produced during reaction is drawn into graphite coolers and falling film absorbers to produce 31-33% commercial acid." },
      { title: "Classification & Bagging", desc: "SOP is screened and classified into powder (soluble grade) or granular grades before automated packaging." }
    ],
    chemicalIntro: [
      "Sulfate of Potash (SOP, K₂SO₄) is a premium potassium fertilizer preferred for chloride-sensitive crops such as tobacco, fruits, vegetables, and potatoes. It provides both potassium and sulfur without chloride.",
      "Global SOP demand is growing as agriculture shifts toward high-value crops. Production routes include the Mannheim process (most common), natural mineral processing (langbeinite, kainite), and the double salt route.",
      "Due to the aggressive corrosive conditions of hot HCl gas combined with sulfuric acid, Mannheim furnaces require state-of-the-art refractory design, precise mechanical rabble arm calibration, and heavy-duty gas recovery systems."
    ],
    processOverview: [
      "The Mannheim process reacts potassium chloride (KCl) with sulfuric acid (H₂SO₄) in a muffle furnace at 600–700°C. The reaction produces K₂SO₄ and hydrochloric acid (HCl) as a co-product.",
      "Key equipment includes the Mannheim furnace (with mechanical rabble arm), HCl absorption system, product cooling and classification, and packaging system. The furnace design and rabble arm operation are critical to product quality.",
      "The double salt route is an alternative that reacts KCl with MgSO₄ or Na₂SO₄, avoiding the high temperatures and HCl co-production of the Mannheim process."
    ],
    commissioningChallenges: [
      "Mannheim furnace refractory curing and initial heating must follow strict temperature schedules — improper curing leads to premature refractory failure.",
      "Rabble arm alignment and speed control directly affect product quality and furnace throughput. Commissioning requires careful mechanical adjustment.",
      "HCl absorption system startup is safety-critical — any leak or absorption failure creates immediate environmental and health hazards.",
      "Achieving consistent product quality (K₂O content, chloride level, particle size) requires simultaneous optimization of furnace temperature, feed rate, and rabble arm speed.",
      "The transition from batch to continuous operation is a critical milestone that requires coordinated management of all plant systems."
    ],
    kafaahExperience: [
      "Kafaah successfully commissioned a 40,000 T/yr SOP plant in Suez, Egypt (Nov 2025 – Jan 2026) — Mannheim process, Chinese EPC. Full commissioning from pre-startup to first product.",
      "This is our most recent and most directly relevant project. We managed the entire commissioning sequence: refractory curing, furnace first fire, HCl system startup, product quality optimization, and handover to operations.",
      "Our team is directly experienced in the calibration of Mannheim furnace mechanics, acid-rock feed control, and Graphite absorption equipment troubleshooting."
    ],
    relatedServices: ["owners-engineer", "commissioning", "operation-readiness", "troubleshooting"],
    seoTitle: "SOP Plant Commissioning — Sulfate of Potash (K₂SO₄) Specialists",
    seoDescription: "Independent SOP plant commissioning specialists. Mannheim process expertise. Completed project: 40,000 T/yr Suez plant. From furnace first fire to first product.",
    seoKeywords: ["SOP plant commissioning", "K2SO4 plant startup", "sulfate of potash Mannheim process", "SOP plant consultant"],
  },
  {
    formula: "NPK",
    name: "NPK Fertilizers",
    slug: "npk",
    fullName: "NPK Compound Fertilizers",
    shortDesc: "Blending · Granulation · Coating · Quality control",
    completedProject: true,
    heroTagline: "Seamless NPK Drum Granulation, Pipe Reactor Commissioning & Recipe Tuning",
    heroImage: "/npk_plant.webp",
    capacity: "100,000–500,000+ TPA",
    keyStats: [
      { label: "Granulation Route", value: "Pipe Reactor / Drum" },
      { label: "Typical Grades", value: "15-15-15, 18-18-5, etc." },
      { label: "Granule Size", value: "2.0–4.0 mm (>90%)" },
      { label: "Moisture Content", value: "< 1.5%" }
    ],
    keyEquipment: [
      { name: "Cross-Pipe Reactor", desc: "Chemical reactor executing inline neutralization of ammonia and acids to produce ammonium phosphate-sulfate melt." },
      { name: "Granulator Drum", desc: "Rotary drum equipped with slurry spray headers, internal scraping, and solid product recycling bed." },
      { name: "Rotary Dryer & Cooler", desc: "High-volume air-flow rotary drums controlling granule moisture profile and mechanical hardening." },
      { name: "Vibrating Screen Classifiers", desc: "Double-deck high-frequency screens separating undersized, product-size, and oversized granules." },
      { name: "Coating & Conditioning Drum", desc: "Applies chemical anti-caking agent to the finished granules to prevent dust and storage clumping." }
    ],
    processSteps: [
      { title: "Slurry Reaction", desc: "Liquid ammonia and acids (phosphoric and sulfuric) are injected into the pipe reactor, generating a hot chemical slurry melt." },
      { title: "Granule Agglomeration", desc: "The chemical slurry is sprayed onto a rolling bed of recycled fine solids in the granulator, layering and bonding solid salts." },
      { title: "Rotary Drying", desc: "Wet granules are sent to a rotary dryer, bringing moisture down below 1.5% to trigger crystallization and mechanical strength." },
      { title: "Screening & Classification", desc: "The cooled granules pass through double-deck screens. Product size is isolated; oversize is crushed and returned with undersize." },
      { title: "Conditioning & Coating", desc: "Target-sized granules are coated with a thin layer of oil and powder to ensure anti-caking during bagging and storage." }
    ],
    chemicalIntro: [
      "NPK fertilizers are compound fertilizers containing nitrogen (N), phosphorus (P₂O₅), and potassium (K₂O) in various ratios tailored to crop and soil requirements. They are the backbone of modern agriculture.",
      "NPK production methods include physical blending (dry mixing of individual fertilizers), chemical granulation (reaction-based), and compaction. Granulation produces a more uniform, dust-free product with better handling properties.",
      "Commissioning an NPK granulation plant requires precise balancing of the solid recycle loop, reactor chemistry, slurry moisture, and raw material feed ratios to prevent line plugging and ensure high granule yield."
    ],
    processOverview: [
      "Chemical granulation involves reacting ammonia, phosphoric acid, and potassium sources in a granulator (rotary drum or pipe reactor), followed by drying, screening, coating, and cooling.",
      "Key equipment includes the pre-neutralizer or pipe reactor, granulation drum, rotary dryer, screens for product classification, rotary cooler, coating drum, and the recycle system that returns undersized and crushed oversized material.",
      "Product quality is defined by granule size distribution, N-P-K content uniformity, moisture content, crushing strength, and coating quality. Each parameter is controlled by specific process variables."
    ],
    commissioningChallenges: [
      "Granulation is inherently unstable during startup — the recycle ratio must be established before steady-state operation is possible.",
      "Dryer temperature and retention time must be optimized to achieve target moisture without damaging the granules or decomposing ammonium nitrate.",
      "Screen performance and the recycle system determine product yield — poor classification leads to excessive recycle and capacity loss.",
      "Dust and emissions control (scrubbing, cyclones) must be commissioned and optimized before production can reach full capacity."
    ],
    kafaahExperience: [
      "Kafaah successfully commissioned a large-scale NPK granulation unit in Yanbu Industrial City, Saudi Arabia (March 2026). This was our first GCC project — completed on schedule.",
      "Our team managed the hot commissioning phase, stabilized the recycle loop, fine-tuned the chemical slurry formulation, and verified the anti-caking system performance.",
      "We possess extensive operational knowledge in adjusting granulation recipes for 15-15-15, 18-18-5, and customized NPK formulations."
    ],
    relatedServices: ["commissioning", "operation-readiness", "troubleshooting", "production-optimization", "operator-training"],
    seoTitle: "NPK Fertilizer Plant Commissioning & Operations",
    seoDescription: "Independent NPK fertilizer plant commissioning and operations specialists. Granulation, blending, compaction. Yanbu project completed. Chemical-specific expertise.",
    seoKeywords: ["NPK plant commissioning", "NPK granulation startup", "fertilizer plant consultant", "NPK production optimization"],
  },
  {
    formula: "MgSO₄",
    name: "Magnesium Sulphate",
    slug: "magnesium-sulphate",
    fullName: "Magnesium Sulphate — MgSO₄",
    shortDesc: "Epsomite · Technical grade · Agricultural grade",
    heroTagline: "Magnesium Sulphate Reaction, Crystallization & Centrifugation Optimization Services",
    heroImage: "/mgso4_plant.webp",
    capacity: "10,000–50,000 TPA",
    keyStats: [
      { label: "Reaction Temp", value: "90°C–95°C" },
      { label: "Crystallizer Yield", value: "85%–90%" },
      { label: "Hydration States", value: "Heptahydrate / Monohydrate" },
      { label: "Purity Grades", value: "Agri / Tech / Pharma" }
    ],
    keyEquipment: [
      { name: "Magnesium Reactor", desc: "Agitated vessel lined with corrosion-proof material designed for highly exothermic magnesium-acid digestion." },
      { name: "Settling Clarifier", desc: "Clarification equipment separating unreacted ore residues and silica from the hot liquid sulfate." },
      { name: "Vacuum Crystallizer", desc: "Crystallization vessels controlling cooling rate and supersaturation to yield high-purity heptahydrate crystals." },
      { name: "Pusher Centrifuge", desc: "Mechanical dewatering centrifuge separating solid magnesium sulfate crystals from wet mother liquor." },
      { name: "Fluid Bed Dryer", desc: "Gentle low-temperature hot-air dryer removing surface moisture without decomposing hydration water." }
    ],
    processSteps: [
      { title: "Reactant Digestion", desc: "Magnesium oxide (MgO) or magnesium carbonate is reacted with sulfuric acid in an agitated tank under controlled temperature (90-95°C)." },
      { title: "Clarification & Filtration", desc: "The reactor slurry is clarified in a thickener and filtered through press filters to remove solid impurities, yielding a pure liquid filtrate." },
      { title: "Controlled Crystallization", desc: "The hot clear solution is fed to vacuum crystallizers where precise cooling prompts crystallization of heptahydrate (MgSO₄·7H₂O)." },
      { title: "Crystal Centrifugation", desc: "The crystal slurry is fed into a continuous pusher centrifuge where the liquid phase is separated and recycled as mother liquor." },
      { title: "Low-Temp Drying", desc: "The wet crystals are dried in a fluid bed dryer at temperatures below 50°C to prevent stripping the heptahydrate's crystalline water." }
    ],
    chemicalIntro: [
      "Magnesium sulphate (MgSO₄) is produced in several hydrated forms, most commonly as epsomite (MgSO₄·7H₂O — Epsom salt). It serves agricultural, pharmaceutical, technical, and industrial applications.",
      "Production routes include reaction of magnesium oxide or carbonate with sulfuric acid, extraction from natural mineral deposits, and as a byproduct of other chemical processes.",
      "Maintaining high product quality requires meticulous crystallization control, mother liquor recovery optimization, and precise drying temperatures to prevent physical caking and crystal degradation."
    ],
    processOverview: [
      "The synthetic route reacts MgO or MgCO₃ with H₂SO₄ in a reactor, followed by clarification, crystallization, centrifugation, and drying. Product grade (technical, agricultural, pharmaceutical) determines purity requirements.",
      "Key equipment includes the reactor, clarifier or settling tank, vacuum or cooling crystallizer, centrifuge, fluid bed dryer, and packaging system."
    ],
    commissioningChallenges: [
      "Crystal size and shape are controlled by crystallization parameters — temperature profile, supersaturation, and residence time.",
      "Product moisture content must be precisely controlled during drying to prevent caking during storage.",
      "Achieving pharmaceutical-grade purity requires careful attention to raw material quality and process water treatment."
    ],
    kafaahExperience: [
      "Kafaah's team has operational experience with magnesium sulphate production, including crystallization optimization and product quality management across agricultural and technical grades.",
      "We help plants fine-tune their crystallization curves, troubleshoot centrifuge separator bottlenecks, and optimize fluid bed dryers to reduce product caking."
    ],
    relatedServices: ["commissioning", "troubleshooting", "production-optimization"],
    seoTitle: "Magnesium Sulphate Plant Operations — MgSO₄ Specialists",
    seoDescription: "Specialists in magnesium sulphate (MgSO₄) plant commissioning, operations, and optimization. Epsomite production. Crystallization expertise.",
    seoKeywords: ["magnesium sulphate plant", "MgSO4 production", "epsom salt manufacturing", "magnesium sulphate commissioning"],
  },
  {
    formula: "SSP",
    name: "Sulfate of Potash",
    slug: "ssp",
    fullName: "Sulfate of Potash",
    shortDesc: "Acidulation · Curing · Granulation · Storage",
    heroTagline: "Sulfate of Potash Plant Acidulation, Curing & Off-Gas Scrubbing Support",
    heroImage: "/ssp_plant.webp",
    capacity: "50,000–300,000 TPA",
    keyStats: [
      { label: "Reaction Time", value: "2–5 minutes" },
      { label: "Curing Period", value: "2–4 weeks" },
      { label: "P₂O₅ Content", value: "16%–22%" },
      { label: "Sulfur Content", value: "11%–12% S" }
    ],
    keyEquipment: [
      { name: "Continuous Den Mixer", desc: "High-shear double-shaft mixer designed for rapid, uniform contact between rock dust and sulfuric acid." },
      { name: "Continuous Solidification Den", desc: "Slow-moving conveyor slat den allowing the react slurry to solidify and gaseous fluorine to vent." },
      { name: "Fluorine Scrubbing Towers", desc: "Multi-stage gas cleaning system designed to capture hydrofluoric acid and silicon tetrafluoride." },
      { name: "Curing Shed Cranes", desc: "High-capacity overhead crane and scraper systems managing heap turning for complete curing." },
      { name: "SSP Granulator", desc: "Rotary drum or pan granulator adding water/steam to form hard, transportable superphosphate granules." }
    ],
    processSteps: [
      { title: "Acidulation Mixing", desc: "Finely ground phosphate rock and 65-75% sulfuric acid are metered and intensely mixed in a continuous paddle mixer." },
      { title: "Slurry Digestion Den", desc: "The liquid slurry is discharged onto a slow conveyor den where it reacts and solidifies into a solid block over 15-30 minutes." },
      { title: "SSP Excavation", desc: "A rotary cutter at the end of the den cuts the solid block into fine powder, which is conveyed to the curing shed." },
      { title: "Shed Curing", desc: "The green SSP is stored in large piles for 2–4 weeks to complete the rock digestion and allow excess moisture to evaporate." },
      { title: "Optional Granulation", desc: "Cured powder SSP is crushed, granulated in a rotary drum with steam and binder, dried, and screened for bagging." }
    ],
    chemicalIntro: [
      "Single Superphosphate (SSP) is the oldest and simplest phosphate fertilizer. It is produced by reacting ground phosphate rock with sulfuric acid. SSP provides phosphorus, sulfur, and calcium — making it valuable for sulfur-deficient soils.",
      "Despite being a mature technology, SSP remains economically competitive in many markets due to low capital cost, simple process, and the ability to use lower-grade phosphate rock compared to DAP/MAP production.",
      "Successful SSP plant operation depends on managing rock-to-acid reaction ratios, optimizing pile curing dynamics to reduce free acidity, and ensuring high-efficiency off-gas scrubbing for fluorine containment."
    ],
    processOverview: [
      "The SSP process involves three stages: acidulation (reacting phosphate rock with 65–75% H₂SO₄ in a den or mixer), curing (allowing the reaction to complete over 2–4 weeks in a curing shed), and optional granulation.",
      "Key equipment includes the phosphate rock grinding system, den mixer or acidulator, curing belt or shed, granulation drum (optional), and storage/bagging system."
    ],
    commissioningChallenges: [
      "Acidulation ratio (acid to rock) must be precisely controlled — too much acid creates a wet, sticky product; too little leaves unreacted rock.",
      "Curing time and conditions affect final product quality — incomplete curing leads to high free acid content.",
      "Granulation of SSP requires careful control of moisture and temperature to achieve target granule hardness and size."
    ],
    kafaahExperience: [
      "Kafaah's team has operational experience with SSP production, including acidulation optimization, curing management, and granulation performance improvement.",
      "We troubleshoot chemical formulation imbalances, design dust mitigation and scrubbing systems, and help facilities upgrade powder operations to granular production."
    ],
    relatedServices: ["troubleshooting", "production-optimization", "operator-training"],
    seoTitle: "Sulfate of Potash Plant Operations — SOP Specialists",
    seoDescription: "Specialists in Sulfate of Potash (SOP) plant operations, troubleshooting, and optimization. Acidulation, curing, granulation expertise.",
    seoKeywords: ["SOP plant operations", "sulfate of potash production", "SOP granulation", "sulfate of potash plant consultant"],
  },
];
