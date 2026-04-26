export interface Technology {
  formula: string;
  name: string;
  slug: string;
  fullName: string;
  shortDesc: string;
  completedProject?: boolean;
  heroTagline: string;
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
    heroTagline: "Sulfuric Acid Plant Commissioning & Operations",
    chemicalIntro: [
      "Sulfuric acid (H₂SO₄) is the world's most produced industrial chemical. It is the backbone of the fertilizer industry, used in the production of phosphoric acid, superphosphates, and ammonium sulfate. It is also essential in metallurgy, petroleum refining, and chemical synthesis.",
      "Modern sulfuric acid plants use the contact process — catalytic oxidation of SO₂ to SO₃ over vanadium pentoxide catalyst, followed by absorption in concentrated acid. Plant capacities range from 100 to 5,000+ tonnes per day.",
    ],
    processOverview: [
      "The contact process involves four main stages: sulfur burning (or metallurgical gas cleaning), catalytic conversion in a multi-pass converter, absorption of SO₃ in concentrated acid, and heat recovery through steam generation.",
      "Key equipment includes the sulfur furnace, waste heat boiler, multi-pass converter with vanadium catalyst beds, interpass absorber (in double-absorption plants), final absorber, acid circulation system, and drying tower.",
      "Modern plants achieve conversion rates above 99.7% in double-absorption configuration, producing acid at concentrations from 93% to 98.5% H₂SO₄, with oleum (fuming sulfuric acid) as an optional product.",
    ],
    commissioningChallenges: [
      "Converter catalyst activation requires precise temperature control — too cold and conversion is insufficient, too hot and catalyst is permanently damaged.",
      "Acid mist formation in the absorption system is a common startup problem that requires careful attention to acid distribution, temperature, and flow rates.",
      "The transition from startup to stable operation requires managing the heat balance across the entire plant — the converter is exothermic and the plant must be balanced before it can sustain itself.",
      "Refractory drying and curing in the sulfur furnace must follow strict temperature ramp schedules to prevent cracking.",
    ],
    kafaahExperience: [
      "Kafaah's team has 20 years of direct operational experience with sulfuric acid plants. We have operated contact process plants from startup through steady-state production.",
      "Our experience spans single and double absorption configurations, with sulfur, pyrites, and metallurgical gas as feedstocks.",
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
    heroTagline: "Phosphoric Acid Plant Commissioning & Operations",
    chemicalIntro: [
      "Phosphoric acid (H₃PO₄) is the primary intermediate in phosphate fertilizer production. It is produced by reacting phosphate rock with sulfuric acid in what is known as the wet process.",
      "The wet process is the dominant production route worldwide, producing merchant-grade acid (MGA) at 54% P₂O₅ concentration. Phosphoric acid is used to produce DAP, MAP, TSP, and NPK fertilizers.",
    ],
    processOverview: [
      "The wet process involves three main stages: reaction of phosphate rock with sulfuric acid to form phosphoric acid and gypsum, filtration to separate the acid from the gypsum cake, and concentration of the acid to the desired P₂O₅ level.",
      "Two main process routes exist: the dihydrate process (most common, producing CaSO₄·2H₂O gypsum) and the hemihydrate process (producing CaSO₄·½H₂O, with higher acid concentration directly from filtration).",
      "Key equipment includes the reactor (single or multi-tank), vacuum flash cooler, tilting pan or belt filter, acid concentration evaporator, and gypsum disposal/processing system.",
    ],
    commissioningChallenges: [
      "Reactor temperature and residence time control are critical — deviation leads to poor crystal formation and filtration problems.",
      "Filter performance is the most common bottleneck during startup. Cloth selection, cake washing efficiency, and vacuum system performance must be optimized simultaneously.",
      "Acid concentration through evaporation requires careful management of scaling (silicofluoride and sulfate deposits) from the first day of operation.",
      "Phosphate rock feed preparation (grinding, slurry preparation) must be matched to reactor requirements — particle size distribution directly affects reaction efficiency.",
    ],
    kafaahExperience: [
      "Kafaah's team has operated phosphoric acid plants using both dihydrate and hemihydrate processes.",
      "Our experience includes reactor optimization, filtration performance improvement, and evaporator descaling program development.",
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
    heroTagline: "SOP Plant Commissioning & Operations — Mannheim Process Specialists",
    chemicalIntro: [
      "Sulfate of Potash (SOP, K₂SO₄) is a premium potassium fertilizer preferred for chloride-sensitive crops such as tobacco, fruits, vegetables, and potatoes. It provides both potassium and sulfur without chloride.",
      "Global SOP demand is growing as agriculture shifts toward high-value crops. Production routes include the Mannheim process (most common), natural mineral processing (langbeinite, kainite), and the double salt route.",
    ],
    processOverview: [
      "The Mannheim process reacts potassium chloride (KCl) with sulfuric acid (H₂SO₄) in a muffle furnace at 600–700°C. The reaction produces K₂SO₄ and hydrochloric acid (HCl) as a co-product.",
      "Key equipment includes the Mannheim furnace (with mechanical rabble arm), HCl absorption system, product cooling and classification, and packaging system. The furnace design and rabble arm operation are critical to product quality.",
      "The double salt route is an alternative that reacts KCl with MgSO₄ or Na₂SO₄, avoiding the high temperatures and HCl co-production of the Mannheim process.",
    ],
    commissioningChallenges: [
      "Mannheim furnace refractory curing and initial heating must follow strict temperature schedules — improper curing leads to premature refractory failure.",
      "Rabble arm alignment and speed control directly affect product quality and furnace throughput. Commissioning requires careful mechanical adjustment.",
      "HCl absorption system startup is safety-critical — any leak or absorption failure creates immediate environmental and health hazards.",
      "Achieving consistent product quality (K₂O content, chloride level, particle size) requires simultaneous optimization of furnace temperature, feed rate, and rabble arm speed.",
      "The transition from batch to continuous operation is a critical milestone that requires coordinated management of all plant systems.",
    ],
    kafaahExperience: [
      "Kafaah commissioned a 40,000 T/yr SOP plant in Suez, Egypt (Nov 2025 – Jan 2026) — Mannheim process, Chinese EPC. Full commissioning from pre-startup to first product.",
      "This is our most recent and most directly relevant project. We managed the entire commissioning sequence: refractory curing, furnace first fire, HCl system startup, product quality optimization, and handover to operations.",
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
    heroTagline: "NPK Fertilizer Plant Commissioning & Operations",
    chemicalIntro: [
      "NPK fertilizers are compound fertilizers containing nitrogen (N), phosphorus (P₂O₅), and potassium (K₂O) in various ratios tailored to crop and soil requirements. They are the backbone of modern agriculture.",
      "NPK production methods include physical blending (dry mixing of individual fertilizers), chemical granulation (reaction-based), and compaction. Granulation produces a more uniform, dust-free product with better handling properties.",
    ],
    processOverview: [
      "Chemical granulation involves reacting ammonia, phosphoric acid, and potassium sources in a granulator (rotary drum or pipe reactor), followed by drying, screening, coating, and cooling.",
      "Key equipment includes the pre-neutralizer or pipe reactor, granulation drum, rotary dryer, screens for product classification, rotary cooler, coating drum, and the recycle system that returns undersized and crushed oversized material.",
      "Product quality is defined by granule size distribution, N-P-K content uniformity, moisture content, crushing strength, and coating quality. Each parameter is controlled by specific process variables.",
    ],
    commissioningChallenges: [
      "Granulation is inherently unstable during startup — the recycle ratio must be established before steady-state operation is possible.",
      "Dryer temperature and retention time must be optimized to achieve target moisture without damaging the granules or decomposing ammonium nitrate.",
      "Screen performance and the recycle system determine product yield — poor classification leads to excessive recycle and capacity loss.",
      "Dust and emissions control (scrubbing, cyclones) must be commissioned and optimized before production can reach full capacity.",
    ],
    kafaahExperience: [
      "Kafaah commissioned an NPK granulation unit in Yanbu Industrial City, Saudi Arabia (March 2026). This was our first GCC project — completed on schedule.",
      "Our team has experience with both pipe reactor and rotary drum granulation technologies across multiple NPK formulations.",
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
    heroTagline: "Magnesium Sulphate Plant Operations & Optimization",
    chemicalIntro: [
      "Magnesium sulphate (MgSO₄) is produced in several hydrated forms, most commonly as epsomite (MgSO₄·7H₂O — Epsom salt). It serves agricultural, pharmaceutical, technical, and industrial applications.",
      "Production routes include reaction of magnesium oxide or carbonate with sulfuric acid, extraction from natural mineral deposits, and as a byproduct of other chemical processes.",
    ],
    processOverview: [
      "The synthetic route reacts MgO or MgCO₃ with H₂SO₄ in a reactor, followed by clarification, crystallization, centrifugation, and drying. Product grade (technical, agricultural, pharmaceutical) determines purity requirements.",
      "Key equipment includes the reactor, clarifier or settling tank, vacuum or cooling crystallizer, centrifuge, fluid bed dryer, and packaging system.",
    ],
    commissioningChallenges: [
      "Crystal size and shape are controlled by crystallization parameters — temperature profile, supersaturation, and residence time.",
      "Product moisture content must be precisely controlled during drying to prevent caking during storage.",
      "Achieving pharmaceutical-grade purity requires careful attention to raw material quality and process water treatment.",
    ],
    kafaahExperience: [
      "Kafaah's team has operational experience with magnesium sulphate production, including crystallization optimization and product quality management across agricultural and technical grades.",
    ],
    relatedServices: ["commissioning", "troubleshooting", "production-optimization"],
    seoTitle: "Magnesium Sulphate Plant Operations — MgSO₄ Specialists",
    seoDescription: "Specialists in magnesium sulphate (MgSO₄) plant commissioning, operations, and optimization. Epsomite production. Crystallization expertise.",
    seoKeywords: ["magnesium sulphate plant", "MgSO4 production", "epsom salt manufacturing", "magnesium sulphate commissioning"],
  },
  {
    formula: "SSP",
    name: "Single Superphosphate",
    slug: "ssp",
    fullName: "Single Superphosphate — SSP",
    shortDesc: "Acidulation · Curing · Granulation · Storage",
    heroTagline: "SSP Plant Operations & Production Optimization",
    chemicalIntro: [
      "Single Superphosphate (SSP) is the oldest and simplest phosphate fertilizer. It is produced by reacting ground phosphate rock with sulfuric acid. SSP provides phosphorus, sulfur, and calcium — making it valuable for sulfur-deficient soils.",
      "Despite being a mature technology, SSP remains economically competitive in many markets due to low capital cost, simple process, and the ability to use lower-grade phosphate rock compared to DAP/MAP production.",
    ],
    processOverview: [
      "The SSP process involves three stages: acidulation (reacting phosphate rock with 65–75% H₂SO₄ in a den or mixer), curing (allowing the reaction to complete over 2–4 weeks in a curing shed), and optional granulation.",
      "Key equipment includes the phosphate rock grinding system, den mixer or acidulator, curing belt or shed, granulation drum (optional), and storage/bagging system.",
    ],
    commissioningChallenges: [
      "Acidulation ratio (acid to rock) must be precisely controlled — too much acid creates a wet, sticky product; too little leaves unreacted rock.",
      "Curing time and conditions affect final product quality — incomplete curing leads to high free acid content.",
      "Granulation of SSP requires careful control of moisture and temperature to achieve target granule hardness and size.",
    ],
    kafaahExperience: [
      "Kafaah's team has operational experience with SSP production, including acidulation optimization, curing management, and granulation performance improvement.",
    ],
    relatedServices: ["troubleshooting", "production-optimization", "operator-training"],
    seoTitle: "Single Superphosphate Plant Operations — SSP Specialists",
    seoDescription: "Specialists in Single Superphosphate (SSP) plant operations, troubleshooting, and optimization. Acidulation, curing, granulation expertise.",
    seoKeywords: ["SSP plant operations", "single superphosphate production", "SSP granulation", "superphosphate plant consultant"],
  },
];
