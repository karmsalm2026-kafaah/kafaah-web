/* ── SERVICE DATA ── */

export interface Service {
  num: string;
  title: string;
  slug: string;
  shortDesc: string;
  featured?: boolean;
  badge?: string;
  audience: "owner" | "epc" | "both";
  /* Full page content */
  heroTagline: string;
  intro: string[];
  scope: string[];
  engagement: {
    duration: string;
    team: string;
    location: string;
  };
  whyKafaah: string[];
  relatedTech: string[];
  workflow: { title: string; desc: string }[];
  risksMitigated: { title: string; desc: string }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Owner's Engineer",
    slug: "owners-engineer",
    shortDesc:
      "When you are building a chemical plant, the EPC company works for the project. Kafaah works for you. Your independent technical representative from design review through handover.",
    featured: true,
    badge: "Highest Value",
    audience: "owner",
    heroTagline:
      "Your independent technical representative — from design review through plant handover.",
    intro: [
      "In complex chemical plant construction, the EPC contractor's primary drivers are project schedule and budget compliance. However, long-term operability, mechanical integrity, and raw material conversion efficiency are the owner's primary concerns.",
      "Kafaah's Owner's Engineer service embeds elite technical representation directly on your side. We act as an extension of your team, providing rigorous engineering reviews, construction quality monitoring, and independent commissioning oversight to protect your investment.",
      "By establishing this oversight from the earliest design phases, we ensure that design assumptions translate to a reliable, high-performing asset that meets process guarantees for the next 20+ years."
    ],
    scope: [
      "Comprehensive process design audit and P&ID verification against process guarantees",
      "Critical equipment data sheet review and QA/QC inspection of core components",
      "Factory Acceptance Test (FAT) witness and inspection of high-criticality assets",
      "On-site construction surveillance focusing on piping layout, metallurgy, and weld integrity",
      "Independent pre-commissioning walkthroughs, loop testing, and system punch-listing",
      "Performance Test Run (PTR) auditing and mass/energy balance verification",
      "Handover documentation audit, Standard Operating Procedures (SOP) review, and asset sign-off"
    ],
    engagement: {
      duration: "12–24 months (full EPC cycle)",
      team: "1–3 specialists (process, mechanical, electrical/instrumentation)",
      location: "On-site with periodic remote review phases",
    },
    whyKafaah: [
      "Operational Perspective: Having operated these exact plants, we analyze design drawings not just for compliance, but for ease of maintenance and long-term operating safety.",
      "Deep Process Domain: Our core team has decades of hands-on experience inside Mannheim furnaces, DCDA sulfuric acid units, and phosphoric acid reaction loops.",
      "Absolute Independence: Kafaah maintains no financial ties to licensors, EPC contractors, or equipment vendors, ensuring unbiased advocacy for the plant owner."
    ],
    workflow: [
      {
        title: "Design & Bid Audit",
        desc: "Review EPC technical proposals, PFDs, P&IDs, and vendor selections to eliminate design bottlenecks."
      },
      {
        title: "Fabrication Surveillance",
        desc: "Witness major equipment fabrication and sign off on Factory Acceptance Tests (FAT) for critical assets."
      },
      {
        title: "Construction Quality Oversight",
        desc: "Conduct systematic on-site inspections of piping layouts, welding quality, alignment, and instrumentation."
      },
      {
        title: "Commissioning & Loop Verification",
        desc: "Validate pre-commissioning protocols, dry-run sequences, and interlock loop checks before hot startup."
      },
      {
        title: "Performance Guarantee Witnessing",
        desc: "Witness performance test runs, verify mass and energy balance outputs, and oversee plant handover."
      }
    ],
    risksMitigated: [
      {
        title: "EPC Design Deviations",
        desc: "Prevent contractors from substituting lower-grade alloys or making layout modifications that compromise long-term maintenance access."
      },
      {
        title: "Substandard Equipment Integration",
        desc: "Detect manufacturing flaws, metallurgical defects, or faulty instrument integrations during FATs before delivery."
      },
      {
        title: "Unsubstantiated Performance Claims",
        desc: "Avoid accepting a plant that only meets guarantees under unrealistic, optimized testing conditions."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
    ],
    seoTitle:
      "Owner's Engineer for Chemical Plants — Independent Technical Representation",
    seoDescription:
      "Independent Owner's Engineer service for inorganic chemical and fertilizer plant projects. Design review, construction surveillance, commissioning oversight. 20 years of operational expertise.",
    seoKeywords: [
      "owner's engineer chemical plant",
      "independent technical representative",
      "chemical plant construction oversight",
      "fertilizer plant owner's engineer",
    ],
  },
  {
    num: "02",
    title: "Commissioning & Startup",
    slug: "commissioning",
    shortDesc:
      "Pre-commissioning through performance testing. We have managed startup of H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants from cold to first product.",
    featured: true,
    audience: "both",
    heroTagline:
      "From cold mechanical completion to stable hot operations — managed by field-tested operators.",
    intro: [
      "The transition from mechanical completion to hot chemical operation is the most volatile phase of any industrial project. It is where engineering abstractions meet physical reality, and where latent construction errors or design gaps inevitably manifest.",
      "Kafaah provides specialized, hands-on commissioning managers and process engineers who lead cold and hot commissioning sequences. We don't just check boxes; we coordinate the systems, charge the raw materials, start the reactions, and stabilize the loops.",
      "We bring a proven startup methodology tailored specifically for acid, sulfate, and fertilizer plants, minimizing startup schedules while ensuring total safety and compliance with international standards."
    ],
    scope: [
      "Development of detailed, system-by-system cold and hot commissioning procedures",
      "Verification of mechanical completion and systems boundary isolation",
      "Utility systems commissioning including high-pressure steam, demineralized water, and air loops",
      "Chemical charging, catalyst loading, and system drying/purging protocols",
      "Burner lighting, refractory curing, and furnace heating cycle execution",
      "Process stabilization, cascade loop tuning, and first-product quality target achievement",
      "Dynamic startup sequence execution under various load conditions"
    ],
    engagement: {
      duration: "2–6 months",
      team: "2–5 specialists depending on plant complexity",
      location: "Full-time on-site",
    },
    whyKafaah: [
      "Proven Track Record: Our engineers have successfully started up heavy inorganic chemical assets across Egypt, the GCC, and North Africa.",
      "Hands-on Operators: We are field engineers who operate the control panels and manual valves. We don't just write reports from the trailer.",
      "Suez Success: Our most recent commissioning includes the rapid startup of a 40,000 TPA SOP Mannheim plant in Suez, reaching design capacity in record time."
    ],
    workflow: [
      {
        title: "Boundary Isolation & Walkdown",
        desc: "Define clear commissioning subsystems, carry out thorough walkdowns, and build the pre-commissioning punch list."
      },
      {
        title: "Utility & Cold Run",
        desc: "Commission utility networks (steam, air, DM water) and perform water runs or dry runs on process equipment."
      },
      {
        title: "Heating & Refractory Curing",
        desc: "Manage critical furnace heating profiles and catalyst bed pre-heating sequences according to vendor curves."
      },
      {
        title: "Chemical Feed & Startup",
        desc: "Introduce acid/feedstock feeds, initiate chemical conversion, and stabilize main control loop feedback."
      },
      {
        title: "Performance Run Stabilization",
        desc: "Sustain continuous operation, tune process parameters, and achieve guaranteed product quality standards."
      }
    ],
    risksMitigated: [
      {
        title: "Refractory Thermal Shock",
        desc: "Prevent cracking or structural failure of furnace linings by strictly enforcing slow, thermal gradient curves."
      },
      {
        title: "Catalyst Bed Deactivation",
        desc: "Avoid thermal excursions or moisture contamination in catalytic converters (e.g., V₂O₅ beds) during initial startup."
      },
      {
        title: "Process Interlock Trips",
        desc: "Prevent repetitive, costly plant shutdowns by conducting extensive dry loop checking and logic verification beforehand."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
      "magnesium-sulphate",
      "ssp",
    ],
    seoTitle: "Chemical Plant Commissioning & Startup Services",
    seoDescription:
      "Expert commissioning and startup services for inorganic chemical and fertilizer plants. H₂SO₄, H₃PO₄, K₂SO₄, NPK. From pre-commissioning to performance testing.",
    seoKeywords: [
      "chemical plant commissioning",
      "fertilizer plant startup",
      "plant commissioning services",
      "inorganic acid plant startup",
    ],
  },
  {
    num: "03",
    title: "Operation Readiness",
    slug: "operation-readiness",
    shortDesc:
      "Pre-startup review, HAZOP support, operating procedures, pre-commissioning checklists, staffing readiness, and safety systems verification.",
    audience: "owner",
    heroTagline:
      "Bridging the gap between construction completion and safe, high-performance operations.",
    intro: [
      "A plant that is mechanically complete is not necessarily ready to operate. Operational readiness is the organizational and technical framework that ensures your staff, safety protocols, standard procedures, and maintenance systems are fully integrated before startup.",
      "Kafaah's Operational Readiness service identifies organizational gaps that lead to delayed startups or premature shutdowns. We establish operational procedures, safety logic, spare parts inventories, and plant organizations based on real operational workflows."
    ],
    scope: [
      "Comprehensive Operational Readiness Review (ORR) audit against international best practices",
      "Development of Standard Operating Procedures (SOPs) for normal, startup, shutdown, and emergency modes",
      "Functional safety reviews, HAZOP participation, and process safety management alignment",
      "Pre-Startup Safety Review (PSSR) checklist execution and verification",
      "Establishment of commissioning and operation spare parts inventories",
      "Operational staffing structure design, job descriptions, and competency matrices"
    ],
    engagement: {
      duration: "1–3 months",
      team: "1–2 specialists",
      location: "On-site with remote documentation review",
    },
    whyKafaah: [
      "Direct Operational Experience: We translate complex vendor manuals into concise, operator-friendly SOPs.",
      "Refining Safety Logic: We review trips, alarms, and safety interlock matrices from a practical, preventative operational perspective."
    ],
    workflow: [
      {
        title: "Gap Analysis & ORR",
        desc: "Audit the current readiness checklist, procedures, and staffing plans to spot operational gaps."
      },
      {
        title: "SOP & Manual Development",
        desc: "Draft clear, process-specific Standard Operating Procedures and emergency response manuals."
      },
      {
        title: "PSSR & Safety Audit",
        desc: "Perform a complete Pre-Startup Safety Review (PSSR) to check piping, safety loops, and emergency relief."
      },
      {
        title: "Spares & Asset Setup",
        desc: "Organize initial spare parts, chemicals inventory, laboratory testing procedures, and logging systems."
      },
      {
        title: "Staff Competency Handover",
        desc: "Conduct final walk-throughs with operational teams, validating shift handover and log sheet practices."
      }
    ],
    risksMitigated: [
      {
        title: "Emergency Response Failure",
        desc: "Ensure operators know exactly how to isolate feedstock lines and purge systems safely during power failures."
      },
      {
        title: "Critical Spares Stockouts",
        desc: "Prevent commissioning delays caused by missing specialized gaskets, instrument probes, or valve rebuild kits."
      },
      {
        title: "Unsynchronized Operator Handover",
        desc: "Establish clear log structures to prevent communication errors during shift handovers during critical startups."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
    ],
    seoTitle: "Operation Readiness Review for Chemical Plants",
    seoDescription:
      "Comprehensive operation readiness services for inorganic chemical plants. Pre-startup review, HAZOP support, operating procedures, safety verification.",
    seoKeywords: [
      "operation readiness review",
      "pre-startup safety review",
      "chemical plant HAZOP",
      "operational preparedness",
    ],
  },
  {
    num: "04",
    title: "Technical Troubleshooting",
    slug: "troubleshooting",
    shortDesc:
      "Production loss, quality deviation, equipment failure. We have seen most problems before — and resolved them. Rapid diagnosis using chemical-specific methodology.",
    audience: "both",
    heroTagline:
      "Rapid, root-cause diagnosis and resolution for underperforming process units.",
    intro: [
      "Process upsets, yield degradation, rapid equipment wear, or off-spec product runs cost chemical operations thousands of dollars daily. Treating symptoms rather than root causes leads to recurring failures and high operating costs.",
      "Kafaah provides rapid-mobilization engineering teams to diagnose and resolve complex technical problems. We apply rigorous chemical process engineering methodologies to isolate the true root causes of underperformance."
    ],
    scope: [
      "Rapid on-site process assessment and system-wide data collection",
      "Detailed mass and energy balance calculations based on live process data",
      "Mechanical and process inspections of reactors, absorbers, heat exchangers, and filters",
      "Root Cause Analysis (RCA) using Ishikawa, Kepner-Tregoe, and thermodynamic modeling",
      "Actionable, engineering-backed rectification recommendations with detailed cost-benefit analysis",
      "Implementation supervision, process parameter adjustment, and post-fix validation"
    ],
    engagement: {
      duration: "1–4 weeks",
      team: "1–2 specialists",
      location: "On-site for assessment, remote for analysis and reporting",
    },
    whyKafaah: [
      "We speak the language of the plant. We look at the reactor internals, analyze the lab samples, and inspect the control loop responses to find the root cause.",
      "We have resolved long-standing issues including Mannheim furnace refractory cracking, converter temperature runaway, and sulfuric acid mist carryover."
    ],
    workflow: [
      {
        title: "Emergency Assessment",
        desc: "Mobilize process specialists to the site within 48 hours for immediate data acquisition and inspection."
      },
      {
        title: "Data Analytics & Modeling",
        desc: "Review DCS history, perform material/heat balances, and model process chemistry deviations."
      },
      {
        title: "Root Cause Identification",
        desc: "Isolate equipment degradation, chemical imbalances, or instrumentation drift causing the upset."
      },
      {
        title: "Solution Engineering",
        desc: "Design specific, low-cost process adjustments or mechanical modifications to rectify the issue."
      },
      {
        title: "Validation & Verification",
        desc: "Supervise implementation, restart the system, and document the restored performance metrics."
      }
    ],
    risksMitigated: [
      {
        title: "Symptom-only Mitigation",
        desc: "Prevent repetitive process shutdowns by fixing the underlying chemical or physical bottleneck, not just the alarm."
      },
      {
        title: "Equipment Damage Excursions",
        desc: "Stop ongoing corrosion or thermal degradation caused by running under improper process parameters."
      },
      {
        title: "Production Downtime Extension",
        desc: "Avoid prolonged, costly investigation cycles through rapid, experience-based diagnostic mobilization."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
      "magnesium-sulphate",
      "ssp",
    ],
    seoTitle: "Chemical Plant Troubleshooting — Rapid Technical Diagnosis",
    seoDescription:
      "Expert troubleshooting for inorganic chemical and fertilizer plants. Production loss, quality deviation, equipment failure. Rapid on-site diagnosis by experienced plant operators.",
    seoKeywords: [
      "chemical plant troubleshooting",
      "fertilizer plant problems",
      "production loss diagnosis",
      "plant performance issues",
    ],
  },
  {
    num: "05",
    title: "Production Optimization",
    slug: "production-optimization",
    shortDesc:
      "Process audit, energy balance review, yield improvement, unit cost reduction. We measure before and after — results are not estimated, they are documented.",
    audience: "both",
    heroTagline:
      "Maximizing product yield, reducing energy intensity, and lowering unit cost of production.",
    intro: [
      "Many chemical assets operate below their nameplate capacity or consume more raw materials and energy than designed. Over time, heat exchanger fouling, catalyst aging, and unoptimized loop parameters erode operating margins.",
      "Kafaah conducts comprehensive process audits and optimization studies. We identify low-capital process improvements, heat integration loops, and parameter tuning that unlock capacity and reduce the cost per ton of product."
    ],
    scope: [
      "Process debottlenecking studies and nameplate capacity verification",
      "Energy efficiency audits and waste heat recovery integration (steam generation)",
      "Reactants ratio optimization (e.g., sulfur-to-air, rock-to-acid) to increase conversion yield",
      "Catalyst and filter media optimization for longer lifetimes and lower pressure drops",
      "Advanced control loop tuning and process parameters optimization",
      "Raw material specific consumption reduction and cost-of-production benchmarking"
    ],
    engagement: {
      duration: "2–8 weeks",
      team: "1–3 specialists",
      location: "On-site for data collection, remote for analysis",
    },
    whyKafaah: [
      "Operational benchmarks based on real-world reference plants in the MENA region.",
      "We measure success in tons per day and gigajoules per ton. We benchmark your plant against top-performing global assets."
    ],
    workflow: [
      {
        title: "Baseline Process Audit",
        desc: "Perform full-plant measurements to document current raw material and energy consumption baselines."
      },
      {
        title: "Bottleneck & Waste Audit",
        desc: "Pinpoint pressure drops, thermodynamic losses, unreacted raw materials, and heat leaks."
      },
      {
        title: "Optimization Simulation",
        desc: "Simulate process changes to predict yield improvements, steam generation gains, and utility savings."
      },
      {
        title: "Parameter Implementation",
        desc: "Supervise parameter adjustments, catalyst upgrades, or small piping modifications on-site."
      },
      {
        title: "Performance Verification",
        desc: "Benchmark the plant's updated specific consumption metrics and document actual cost savings."
      }
    ],
    risksMitigated: [
      {
        title: "Capital Over-investment",
        desc: "Unlock additional plant capacity through process optimization, avoiding expensive capital expenditures."
      },
      {
        title: "Catalyst Sintering / Poisoning",
        desc: "Protect expensive catalytic converters from degradation by optimizing temperature profiles and gas flow distribution."
      },
      {
        title: "Carbon & Emission Violations",
        desc: "Reduce flue gas sulfur dioxide (SO₂) emissions by optimizing conversion efficiency and absorption column performance."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
      "magnesium-sulphate",
      "ssp",
    ],
    seoTitle: "Chemical Plant Production Optimization Services",
    seoDescription:
      "Production optimization for inorganic chemical and fertilizer plants. Process audit, yield improvement, energy reduction. Measurable results documented by experienced specialists.",
    seoKeywords: [
      "chemical plant optimization",
      "production optimization",
      "plant performance improvement",
      "energy reduction chemical plant",
    ],
  },
  {
    num: "06",
    title: "Operator Training",
    slug: "operator-training",
    shortDesc:
      "Plant-specific training programs in Arabic and English. Developed by engineers who have operated these plants — not generic training consultants.",
    audience: "both",
    heroTagline:
      "Developing high-competency control room and field operators through custom, bilingual programs.",
    intro: [
      "No matter how advanced your control system or how premium your equipment, plant profitability, safety, and reliability rest on the competency of your operations team. Operators who run processes manually, override safety trips, or fail to recognize precursor alarms cause millions of dollars in damages.",
      "Kafaah develops custom, site-specific training programs designed by plant operators, for plant operators. Available in Arabic and English, our training translates complex chemical theory into practical field actions."
    ],
    scope: [
      "Plant operations competency gap assessment and training needs analysis",
      "Development of customized, site-specific process and safety manuals",
      "Classroom training: process chemistry, thermodynamics, control philosophy, and safety",
      "On-the-job field training: valve routing, equipment inspection, and troubleshooting",
      "DCS simulation exercises: startup sequences, loop tuning, and emergency response",
      "Formal operator examination, testing, and competency certification"
    ],
    engagement: {
      duration: "2–6 weeks per program",
      team: "1–2 trainers",
      location: "On-site at the plant",
    },
    whyKafaah: [
      "Bilingual Delivery: All training, documentation, and exams are delivered in both Arabic and English, ensuring total comprehension by local field staff.",
      "Operated Same Systems: We teach operators how to handle the exact Mannheim furnaces, sulfur burners, and phosphoric reaction slurry loops they run every day."
    ],
    workflow: [
      {
        title: "Competency Assessment",
        desc: "Conduct interviews and field tests to assess the baseline skills of control room and field staff."
      },
      {
        title: "Curriculum Customization",
        desc: "Develop site-specific process manuals, drawings, P&IDs, and control logic study guides."
      },
      {
        title: "Bilingual Instruction",
        desc: "Deliver classroom courses covering process theory, chemical hazards, and DCS control concepts."
      },
      {
        title: "On-site Field Training",
        desc: "Execute physical walkthroughs, valve operations, emergency manual actions, and panel simulation."
      },
      {
        title: "Examination & Certification",
        desc: "Administer written, oral, and practical field tests to certify operators and issue competency badges."
      }
    ],
    risksMitigated: [
      {
        title: "DCS Loop Overrides",
        desc: "Prevent operators from switching critical cascade loops to manual control due to lack of understanding."
      },
      {
        title: "Delayed Emergency Actions",
        desc: "Train operators to react instantly and correctly to compressor surges, furnace overheating, or toxic leaks."
      },
      {
        title: "Unnecessary Plant Trips",
        desc: "Minimize startup and shutdown frequency by training operators to stabilize processes before interlocks trigger."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
    ],
    seoTitle: "Chemical Plant Operator Training — Arabic & English",
    seoDescription:
      "Plant-specific operator training for inorganic chemical and fertilizer plants. Arabic and English. Developed and delivered by experienced plant operators.",
    seoKeywords: [
      "chemical plant operator training",
      "fertilizer plant training",
      "operator competency",
      "plant-specific training Arabic",
    ],
  },
  {
    num: "07",
    title: "Investor Advisory",
    slug: "investor-advisory",
    shortDesc:
      "From feasibility through first product — one advisor, no handoffs, full chain accountability. Technology selection, EPC evaluation, and startup oversight.",
    audience: "owner",
    heroTagline:
      "Providing technical due diligence, technology selection, and CAPEX/OPEX auditing for industrial investors.",
    intro: [
      "Investing in heavy chemical or fertilizer projects requires committing millions of dollars in CAPEX over a 15–30 year asset lifecycle. Financial consultants and market researchers can model margins, but they cannot assess whether a process technology will work in a specific region, or if an EPC's cost estimate is realistic.",
      "Kafaah provides specialized investor advisory services that bridge the gap between investment banking and practical chemical plant engineering. We provide the hard technical due diligence needed to de-risk your project before financial close."
    ],
    scope: [
      "Technology selection due diligence — comparing licensors, process routes, and track records",
      "EPC contractor technical proposal review, shortlisting, and contract risk evaluation",
      "Detailed CAPEX auditing and OPEX benchmarking based on real-world reference plants",
      "Technical feasibility review focusing on regional feedstock, utilities, and logistics constraints",
      "Project risk assessment matrix development covering construction, startup, and operational phases",
      "Lender's Engineer services for banks and development finance institutions"
    ],
    engagement: {
      duration: "3–30 months (feasibility through startup)",
      team: "1–2 senior advisors",
      location: "Remote advisory with on-site visits at key milestones",
    },
    whyKafaah: [
      "End-to-End Alignment: We stay with you from the first feasibility review to the first commercial ton of product, ensuring no information is lost.",
      "Real Operating Cost Benchmarks: We estimate utilities, chemical consumption, and maintenance costs based on actual plant data — not vendor models."
    ],
    workflow: [
      {
        title: "Feasibility Audit",
        desc: "Evaluate raw material specifications, utilities availability, environmental constraints, and logistics options."
      },
      {
        title: "Technology Selection",
        desc: "Review competing technology licensors, process efficiency guarantees, licensing costs, and operational track records."
      },
      {
        title: "EPC Proposal Review",
        desc: "Analyze EPC bid designs, battery limit specifications, scope exclusions, and execution schedules."
      },
      {
        title: "CAPEX & OPEX Validation",
        desc: "Verify equipment pricing, local construction labor costs, specific energy consumptions, and spares requirements."
      },
      {
        title: "Risk Matrix & De-Risking",
        desc: "Build a comprehensive technical risk matrix with mitigation strategies to present to lenders and partners."
      }
    ],
    risksMitigated: [
      {
        title: "Unproven Technology Risk",
        desc: "Identify issues with novel or unproven process variants before committing license fees."
      },
      {
        title: "EPC Cost Creep & Variations",
        desc: "Spot exclusions, weak battery limits, and vague performance run specifications in EPC bids that lead to variation claims."
      },
      {
        title: "Operational OPEX Discrepancies",
        desc: "Prevent investment model failures by replacing idealistic vendor opex models with actual, field-documented operating costs."
      }
    ],
    relatedTech: [
      "sulfuric-acid",
      "phosphoric-acid",
      "sulfate-of-potash",
      "npk",
      "magnesium-sulphate",
      "ssp",
    ],
    seoTitle: "Chemical Plant Investor Advisory — Feasibility to Startup",
    seoDescription:
      "End-to-end investor advisory for inorganic chemical and fertilizer plant projects. Technology selection, EPC evaluation, construction oversight, startup. 20 years of plant operating experience.",
    seoKeywords: [
      "chemical plant investment advisory",
      "fertilizer plant feasibility",
      "technology selection chemical plant",
      "industrial investment advisor MENA",
    ],
  },
  {
    num: "08",
    title: "Process & Engineering Support",
    slug: "process-engineering-support",
    shortDesc:
      "Expert process engineering support during EPC phases to ensure robust design, technology compliance, and operability.",
    audience: "epc",
    heroTagline:
      "Delivering rigorous process design verification, PFD/P&ID audits, and HAZOP support for EPC contractors.",
    intro: [
      "During the detailed engineering phase of an EPC project, minor design oversights or configuration conflicts can lead to major field modifications, schedule slippage, and performance failures. EPC process teams are often under pressure to deliver drawings without operational validation.",
      "Kafaah provides expert process engineering support that integrates directly with EPC design offices. We review PFDs, P&IDs, hydraulics, and equipment specifications to ensure they conform to operational reality and licensor standards."
    ],
    scope: [
      "Detailed review of Process Flow Diagrams (PFDs) and Piping & Instrumentation Diagrams (P&IDs)",
      "Verification of process calculations, hydraulic line sizing, control valves, and pressure relief systems (PSVs)",
      "Critical equipment data sheet review (reactors, absorbers, boilers, Mannheim furnaces)",
      "Active participation and technical support during HAZOP, SIL, and HAZID studies",
      "Technology licensor interface management and design compliance audits",
      "Material selection and corrosion management review for highly corrosive process lines"
    ],
    engagement: {
      duration: "Flexible (Engineering phase)",
      team: "Process Engineers, SMEs",
      location: "Remote / EPC Home Office"
    },
    whyKafaah: [
      "Design for Operability: We review process designs based on how they will behave in transient states (startup, shutdown, trip) and not just steady-state.",
      "Corrosive Media Expertise: We specialize in handling highly corrosive fluids (concentrated sulfuric, phosphoric, and hydrochloric acids)."
    ],
    workflow: [
      {
        title: "Design Basis Verification",
        desc: "Review process design bases, meteorological data, and feed conditions against project specifications."
      },
      {
        title: "PFD & P&ID Optimization",
        desc: "Conduct detailed reviews of PFDs, P&IDs, control logic, start-up loops, and bypass lines."
      },
      {
        title: "Hydraulics & Sizing Audit",
        desc: "Re-calculate lines hydraulics, pressure drops, control valve CVs, and safety relief valve capacities."
      },
      {
        title: "HAZOP & Safety Integrity",
        desc: "Participate in HAZOP sessions, bringing operational risk scenarios and validating interlocks."
      },
      {
        title: "Licensor Compliance Audit",
        desc: "Cross-check detail drawings against the technology package requirements to secure licensor approval."
      }
    ],
    risksMitigated: [
      {
        title: "Lines Piping Bottlenecks",
        desc: "Prevent high backpressures or pipe vibrations caused by undersized lines, wrong fittings, or poor layouts."
      },
      {
        title: "Process Safety Hazards",
        desc: "Identify runaway reactions, gas pocket accumulation, or toxic backflows during HAZOP reviews before fabrication."
      },
      {
        title: "Licensor Warranty Violations",
        desc: "Ensure detail engineering changes do not inadvertently violate licensor process guarantees and void warranties."
      }
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "npk"],
    seoTitle: "Process & Engineering Support for EPCs | Kafaah",
    seoDescription: "Process engineering support for EPC contractors during chemical plant design and engineering phases.",
    seoKeywords: ["EPC process engineering", "chemical plant design review", "P&ID review"]
  },
  {
    num: "09",
    title: "Construction & Commissioning Support",
    slug: "construction-commissioning-support",
    shortDesc:
      "On-site support during construction and mechanical completion to prepare for a smooth transition to commissioning.",
    audience: "epc",
    heroTagline:
      "Bridging construction completion and commissioning sequences with structured pre-startup verification.",
    intro: [
      "The transition from construction completion to pre-commissioning is the primary source of project delays. Out-of-sequence handovers, system boundary confusion, and unorganized punch-listing lead to friction between construction and commissioning teams, delaying hot startup.",
      "Kafaah provides field-tested engineers who integrate with EPC construction teams to align progress with commissioning priorities. We divide the plant into logical, commissionable subsystems, compile punch-lists, and manage system handovers."
    ],
    scope: [
      "Defining system boundaries, markup of P&IDs, and subsystem commissionability analysis",
      "Developing pre-commissioning test packages (hydro-testing, flushing, air-blowing)",
      "System-by-system mechanical completion walkdowns and punch-list generation",
      "Verification of piping cleanliness, instrument calibrations, and valve alignments",
      "Management of construction-to-commissioning handover documentation and boundary control",
      "On-site field safety audits, safety-barriers validation, and initial loop check tracking"
    ],
    engagement: {
      duration: "Project specific (Construction to pre-commissioning)",
      team: "Commissioning Managers, Field Engineers",
      location: "On-site"
    },
    whyKafaah: [
      "Commissioning-Driven Construction: We guide construction teams to finish systems in the exact order required for a logical startup sequence.",
      "Field Integrity: We perform thorough inspects of complex piping, critical refractory installations, and specialized chemical liners."
    ],
    workflow: [
      {
        title: "System Boundary Definition",
        desc: "Markup P&IDs to divide the plant into distinct, commissionable packages (by system, not just area)."
      },
      {
        title: "Pre-Commissioning Setup",
        desc: "Draft detailed protocols for piping flushes, chemical washes, mechanical tests, and loop checking."
      },
      {
        title: "Walkdown & Punch-listing",
        desc: "Perform joint inspections with construction and owner teams to list outstanding tasks (Category A/B/C)."
      },
      {
        title: "System Turnover Tracking",
        desc: "Manage the sign-off of mechanical completion dossiers, ensuring all test sheets are compiled."
      },
      {
        title: "Pre-Startup Verification",
        desc: "Oversee loop checks, valve configurations, safety equipment readiness, and pressure tests."
      }
    ],
    risksMitigated: [
      {
        title: "Out-of-Sequence Completion",
        desc: "Prevent construction teams from finishing non-critical systems first, which leaves the main commissioning path blocked."
      },
      {
        title: "Outstanding Category A Defects",
        desc: "Ensure no critical safety or pressure containment items remain unresolved before piping is pressurized."
      },
      {
        title: "Piping Internal Contamination",
        desc: "Avoid damage to compressors, pumps, and catalyst beds by enforcing rigorous piping flushing and blowing protocols."
      }
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash"],
    seoTitle: "Construction & Commissioning Support for EPCs",
    seoDescription: "Expert support for EPCs during the transition from construction to commissioning in chemical plants.",
    seoKeywords: ["EPC commissioning support", "mechanical completion chemical plant", "pre-commissioning"]
  },
  {
    num: "10",
    title: "Plant Startup and Performance Guarantee",
    slug: "startup-performance-guarantee",
    shortDesc:
      "Leading the critical startup phase and conducting performance test runs to secure guarantee acceptance.",
    audience: "epc",
    heroTagline:
      "Safely executing hot startups and managing performance test runs to secure contract handovers.",
    intro: [
      "The final milestone of an EPC contract is the hot startup and the official Performance Test Run (PTR). Successfully starting up the reactions, running continuously under design load, and meeting all product quality, yield, and utility guarantees requires expert process control and crisis-free coordination.",
      "Kafaah leads the execution of hot startups and PTR protocols on behalf of EPC contractors. We direct control room panel operations, manage process stabilization, handle load ramp-ups, and coordinate the formal PTR recording."
    ],
    scope: [
      "Hot startup execution, control loop tuning, and process stabilization",
      "Development of detailed Performance Test Run (PTR) protocols and acceptance criteria",
      "Managing process optimization to achieve design capacity, yields, and product specifications",
      "DCS control room panel supervision and field operations coordination during the PTR",
      "PTR data logging, mass/energy balance auditing, and specific utility consumption calculation",
      "Preparation of the official PTR report for final client acceptance and contract handover sign-off"
    ],
    engagement: {
      duration: "1 to 3 months (Startup phase)",
      team: "Startup Managers, Lead Operators, Process Experts",
      location: "On-site"
    },
    whyKafaah: [
      "Startup Leadership: We bring a systematic approach to hot operations, coordinating field and DCS operators calmly during transient upsets.",
      "Securing Handover: We structure and execute the PTR to meet all contractual terms, minimizing the EPC's liabilities and securing payments."
    ],
    workflow: [
      {
        title: "Pre-Startup Logic Run",
        desc: "Verify safety interlocks, emergency ESD systems, control valve calibrations, and hot-air dry runs."
      },
      {
        title: "Hot Feed Introduction",
        desc: "Execute burner light-off, heat-up cycles, catalyst bed activations, and feed chemical introduction."
      },
      {
        title: "Process Stabilization",
        desc: "Tune control loop parameters, stabilize pressures and temperatures, and reach stable low-load production."
      },
      {
        title: "Capacity Ramp-up",
        desc: "Gradually ramp up plant throughput to design load, checking equipment limits and product quality trends."
      },
      {
        title: "PTR Execution & Reporting",
        desc: "Conduct the continuous performance test run (72-hour or per contract), log parameters, and compile the final report."
      }
    ],
    risksMitigated: [
      {
        title: "Unstable Reactor Runaway",
        desc: "Prevent localized catalyst overheating or thermal runaways during feed introduction by tracking thermodynamic parameters."
      },
      {
        title: "PTR Failure & Penalties",
        desc: "Execute the PTR only when loops are stabilized and raw materials meet specifications to avoid costly re-runs."
      },
      {
        title: "Choked Process Loops",
        desc: "Avoid slurry line blockages, reactor fouling, or absorber flooding during load ramp-up through careful flow monitoring."
      }
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "ssp"],
    seoTitle: "Plant Startup & Performance Guarantee | Kafaah",
    seoDescription: "Specialized startup and performance guarantee services for EPCs building chemical and fertilizer plants.",
    seoKeywords: ["chemical plant startup", "performance test run EPC", "plant performance guarantee"]
  },
  {
    num: "11",
    title: "Claims & Technical Documentation",
    slug: "claims-technical-documentation",
    shortDesc:
      "Technical substantiation for claims, variation orders, and comprehensive operational documentation.",
    audience: "epc",
    heroTagline:
      "Protecting your project with sound technical justification and clear documentation.",
    intro: [
      "Disputes, delays, and variation orders are common in large industrial projects. When EPC contractors or owners face claims, generic legal arguments fail. Resolving these issues requires robust, forensic chemical process engineering analysis and clear documentation.",
      "We provide independent technical analysis to support or defend claims, as well as the development of comprehensive plant operating manuals."
    ],
    scope: [
      "Forensic analysis of process data and DCS logs to substantiate or defend technical claims",
      "Preparation of technical reports for variation orders, design additions, and scope changes",
      "Root Cause Analysis (RCA) of process or equipment failures for insurance and dispute purposes",
      "Development of plant operating manuals, SOPs, laboratory manuals, and safety guides",
      "Preparation of technical documentation packages for environmental or regulatory compliance",
      "Expert witness support and technical advisory during contract disputes or arbitrations"
    ],
    engagement: {
      duration: "As required",
      team: "Senior Engineers, Technical Writers",
      location: "Remote / On-site as needed"
    },
    whyKafaah: [
      "Data-Driven Justifications: We base our reports on chemical engineering thermodynamics, mass/energy balances, and DCS trends.",
      "By Engineers for Operators: The manuals and guides we develop are not generic templates — they are practical tools tailored to your plant configuration."
    ],
    workflow: [
      {
        title: "Information Gathering",
        desc: "Collect DCS archives, laboratory reports, design criteria, project correspondence, and log sheets."
      },
      {
        title: "Technical Investigation",
        desc: "Execute process event reconstructions, kinetic simulations, and physical inspections of failed components."
      },
      {
        title: "Data Analysis & Synthesis",
        desc: "Perform material/heat balances, metallurgical checks, or flow modeling to substantiate findings."
      },
      {
        title: "Report Drafting",
        desc: "Compile detailed, technical reports with clear timelines, chemical justifications, and reference standards."
      },
      {
        title: "Documentation Delivery",
        desc: "Hand over finalized reports for claims or release finalized operating and maintenance manuals."
      }
    ],
    risksMitigated: [
      {
        title: "Unsubstantiated Variation Claims",
        desc: "De-risk variation claims by backing them with thermodynamic calculations and DCS proof."
      },
      {
        title: "Generic SOP Incidents",
        desc: "Prevent accidents or quality deviations caused by operators following generic, non-site-specific operating guides."
      },
      {
        title: "Disagreement on Delays",
        desc: "Resolve disputes regarding commissioning delays by detailing exact process reasons (e.g. off-spec feed, utility lack)."
      }
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk", "magnesium-sulphate", "ssp"],
    seoTitle: "Claims & Technical Documentation for EPCs",
    seoDescription: "Technical justification for EPC claims and development of operational documentation for chemical plants.",
    seoKeywords: ["EPC claims technical support", "chemical plant operating manuals", "SOP development"]
  }
];
