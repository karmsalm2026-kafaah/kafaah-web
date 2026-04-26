/* ── SERVICE DATA ── */

export interface Service {
  num: string;
  title: string;
  slug: string;
  shortDesc: string;
  featured?: boolean;
  badge?: string;
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
    heroTagline:
      "Your independent technical representative — from design review through plant handover.",
    intro: [
      "When you invest in a chemical plant, the EPC contractor manages the project. But the EPC works for the project — not for you. Their priority is schedule and budget compliance. Your priority is a plant that actually works.",
      "Kafaah's Owner's Engineer service places an independent technical representative on your side of the table. We review the EPC's work, protect your interests during construction, and ensure the plant you receive is the plant you paid for.",
      "This is the highest-value engagement Kafaah offers — because the decisions made during construction determine the next 20 years of plant performance.",
    ],
    scope: [
      "Design review and P&ID verification against process guarantees",
      "Equipment specification review and Factory Acceptance Test (FAT) attendance",
      "Construction quality surveillance — materials, welding, alignment",
      "Pre-commissioning and commissioning oversight",
      "Performance test witnessing and acceptance criteria verification",
      "Punch list management and handover documentation review",
      "Monthly progress reporting with independent technical assessment",
    ],
    engagement: {
      duration: "12–24 months (full EPC cycle)",
      team: "1–3 specialists (process, mechanical, electrical/instrumentation)",
      location: "On-site with periodic remote review phases",
    },
    whyKafaah: [
      "We have operated the same plants we now review. When we examine a P&ID, we see it from the operator's perspective — not the designer's.",
      "Our team brings 20 years of direct experience inside H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP facilities. We know what works in the field — and what fails.",
      "We are fully independent. We have no relationships with EPC contractors, equipment vendors, or technology licensors. Our only obligation is to the plant owner.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk"],
    seoTitle: "Owner's Engineer for Chemical Plants — Independent Technical Representation",
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
    heroTagline: "From cold equipment to first product — managed by engineers who have done it before.",
    intro: [
      "Commissioning is the most critical phase of any chemical plant project. It is where years of design and construction are tested against reality — and where most problems emerge.",
      "Kafaah provides experienced commissioning teams who have managed startup of inorganic chemical plants across multiple technologies. We bring systematic methodology, chemical-specific knowledge, and the calm judgment that comes from having seen these situations before.",
    ],
    scope: [
      "Pre-commissioning planning and checklist development",
      "Mechanical completion verification",
      "Utility systems startup (steam, cooling water, compressed air, nitrogen)",
      "Chemical charging and initial circulation",
      "Process startup sequencing — technology-specific procedures",
      "Performance testing against design guarantees",
      "Operator mentoring during initial production period",
    ],
    engagement: {
      duration: "2–6 months",
      team: "2–5 specialists depending on plant complexity",
      location: "Full-time on-site",
    },
    whyKafaah: [
      "We have commissioned H₂SO₄ contact process plants, H₃PO₄ wet process units, K₂SO₄ Mannheim furnaces, NPK granulation lines, and SSP acidulation plants.",
      "Our most recent commissioning: a 40,000 T/yr SOP plant in Suez, Egypt — from pre-startup to first product in under 3 months.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk", "magnesium-sulphate", "ssp"],
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
    heroTagline: "Making sure your plant is ready to operate — before you turn it on.",
    intro: [
      "A plant that is mechanically complete is not necessarily ready to operate. Operation Readiness bridges the gap between construction completion and safe, reliable startup.",
      "Kafaah reviews your operational preparedness across all disciplines — from operating procedures to staffing plans to safety systems — and identifies gaps before they become problems during commissioning.",
    ],
    scope: [
      "Operational readiness review (ORR) against industry standards",
      "Operating procedure development and review",
      "HAZOP study support and action item follow-up",
      "Pre-commissioning checklist development per system",
      "Staffing plan review — competency assessment",
      "Safety systems verification (interlocks, trips, alarms)",
      "Spare parts inventory review for commissioning phase",
    ],
    engagement: {
      duration: "1–3 months",
      team: "1–2 specialists",
      location: "On-site with remote documentation review",
    },
    whyKafaah: [
      "We prepare plants for startup based on real operational experience — not theoretical checklists. Every item we review reflects a lesson learned from actual plant operations.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk"],
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
    heroTagline: "When your plant is underperforming — we find the root cause and fix it.",
    intro: [
      "Chemical plants lose money every day they underperform. Production loss, quality deviation, unplanned downtime, excessive energy consumption — these problems have specific causes, and they have solutions.",
      "Kafaah provides rapid technical troubleshooting for inorganic chemical and fertilizer plants. Our approach is methodical: measure first, diagnose second, recommend third. We do not guess.",
    ],
    scope: [
      "Rapid plant assessment — on-site within 48 hours for critical issues",
      "Process data analysis and mass/energy balance review",
      "Equipment inspection and performance evaluation",
      "Root cause analysis using systematic methodology",
      "Corrective action recommendations with implementation support",
      "Post-fix verification and performance documentation",
    ],
    engagement: {
      duration: "1–4 weeks",
      team: "1–2 specialists",
      location: "On-site for assessment, remote for analysis and reporting",
    },
    whyKafaah: [
      "We have operated these plants ourselves. When we troubleshoot, we draw on 20 years of direct experience with the same equipment, the same reactions, and the same failure modes.",
      "We have resolved issues in H₂SO₄ converter efficiency, H₃PO₄ filtration performance, K₂SO₄ furnace operations, and NPK granulation quality.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk", "magnesium-sulphate", "ssp"],
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
    heroTagline: "Measurable improvements in yield, energy, and unit cost — documented, not estimated.",
    intro: [
      "Most chemical plants operate below their design capacity or above their design energy consumption. The gap between actual and optimal performance represents significant lost revenue.",
      "Kafaah provides systematic production optimization based on engineering analysis — not generic consulting. We measure current performance, identify specific improvement opportunities, and quantify the results after implementation.",
    ],
    scope: [
      "Comprehensive process audit with baseline measurement",
      "Mass and energy balance analysis",
      "Equipment performance evaluation against design specifications",
      "Yield improvement identification and implementation",
      "Energy consumption reduction opportunities",
      "Unit cost analysis and reduction strategy",
      "Post-implementation verification and documentation",
    ],
    engagement: {
      duration: "2–8 weeks",
      team: "1–3 specialists",
      location: "On-site for data collection, remote for analysis",
    },
    whyKafaah: [
      "We measure before and after. Our recommendations are based on real plant data, and our results are documented — not estimated.",
      "We understand the specific optimization levers for each technology: converter pass efficiency in H₂SO₄, filtration yield in H₃PO₄, furnace thermal efficiency in K₂SO₄, granulation parameters in NPK.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk", "magnesium-sulphate", "ssp"],
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
    heroTagline: "Training developed by operators, for operators — in Arabic and English.",
    intro: [
      "The best equipment in the world is only as good as the people who operate it. Operator competency is the single largest factor in plant reliability, safety, and production consistency.",
      "Kafaah develops and delivers plant-specific training programs based on real operational experience. Our training is not theoretical — it is built from the actual procedures, failure modes, and best practices of inorganic chemical plants.",
    ],
    scope: [
      "Training needs assessment and competency gap analysis",
      "Plant-specific training material development",
      "Classroom training: process theory, safety, emergency procedures",
      "On-the-job training: startup sequences, normal operations, shutdown",
      "Assessment and certification of operator competency",
      "Training-of-trainers for long-term capability building",
    ],
    engagement: {
      duration: "2–6 weeks per program",
      team: "1–2 trainers",
      location: "On-site at the plant",
    },
    whyKafaah: [
      "Our trainers have operated these plants themselves. They teach from experience — not from textbooks.",
      "All training materials are available in Arabic and English, adapted for the specific plant configuration and technology.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk"],
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
    heroTagline:
      "One advisor from feasibility to first product — no handoffs, full chain accountability.",
    intro: [
      "Investing in a chemical plant is a 10–20 year commitment. The decisions made before construction — technology selection, EPC contractor evaluation, plant sizing — determine the entire financial trajectory of the project.",
      "Kafaah provides end-to-end advisory for investors entering the inorganic chemical and fertilizer manufacturing space. We bring the operational perspective that financial advisors and market consultants cannot — because we have built and run these plants.",
    ],
    scope: [
      "Technology selection advisory — process routes, licensors, proven vs. novel",
      "EPC contractor evaluation and shortlisting",
      "Feasibility review from an operational perspective",
      "Capital cost benchmarking against completed projects",
      "Operating cost estimation based on real plant data",
      "Owner's Engineer service during construction (see separate service)",
      "Commissioning and startup oversight through first product",
    ],
    engagement: {
      duration: "3–30 months (feasibility through startup)",
      team: "1–2 senior advisors",
      location: "Remote advisory with on-site visits at key milestones",
    },
    whyKafaah: [
      "We are the only advisor who stays with the project from the first feasibility question to the first ton of product. No handoffs between consulting phases.",
      "Our advice is grounded in 20 years of operating the same plants we advise on. When we say a technology works — it is because we have operated it.",
    ],
    relatedTech: ["sulfuric-acid", "phosphoric-acid", "sulfate-of-potash", "npk", "magnesium-sulphate", "ssp"],
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
];
