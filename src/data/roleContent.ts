/* ══════════════════════════════════════════════
   ROLE-BASED CONTENT — Owner vs EPC
   Each audience sees a tailored home page.
   ══════════════════════════════════════════════ */

export type UserRole = "owner" | "epc";

/* ── Hero Section ── */
export interface HeroContent {
  eyebrow: string;
  headline: [string, string, string]; // 3-line headline
  subCopy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: { num: string; label: string }[];
}

/* ── Problem Section ── */
export interface ProblemContent {
  sectionLabel: string;
  headline: string;
  headlineAccent: string;
  subHeadline: string;
  paragraphs: string[];
  painPoints: {
    stat: string;
    label: string;
    desc: string;
  }[];
  tagline: string;
}

/* ── Services Section ── */
export interface ServicesContent {
  sectionLabel: string;
  headline: string;
  headlineAccent: string;
  /** Service slug list to show for this role */
  visibleSlugs: string[];
  bottomTagline: string;
}

/* ── Insight Banner ── */
export interface InsightContent {
  quote: string;
  attribution: string;
}

/* ── Contact CTA ── */
export interface ContactContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subCopy: string;
}

/* ── Combined ── */
export interface RoleContent {
  hero: HeroContent;
  problem: ProblemContent;
  services: ServicesContent;
  insight: InsightContent;
  contact: ContactContent;
}

/* ═══════════════════════════════════════════════
   OWNER / INVESTOR CONTENT
   ═══════════════════════════════════════════════ */
const ownerContent: RoleContent = {
  hero: {
    eyebrow: "Owner & Investor Portal · Egypt & Gulf",
    headline: [
      "Protecting",
      "your investment",
      "from day one.",
    ],
    subCopy:
      "Independent technical oversight for chemical and fertilizer plant owners — from feasibility studies and due diligence to commissioning and handover.",
    primaryCta: { label: "Owner's Engineer", href: "/services/owners-engineer/" },
    secondaryCta: { label: "Investment Advisory", href: "/services/investor-advisory/" },
    stats: [
      { num: "20+", label: "Years of Operation" },
      { num: "6", label: "Core Technologies" },
      { num: "100%", label: "Independent" },
      { num: "0", label: "EPC Affiliations" },
    ],
  },
  problem: {
    sectionLabel: "01 — The Risk",
    headline: "Most investors lose money not on ",
    headlineAccent: "bad projects",
    subHeadline: "— but on good projects with no independent oversight.",
    paragraphs: [
      "When you invest in a chemical plant, the EPC contractor manages the project. But the EPC works for the project — not for you. Their priority is schedule and budget compliance. Your priority is a plant that actually works.",
      "Without an independent technical representative on your side of the table, design decisions, equipment substitutions, and construction shortcuts go unchallenged — and their consequences appear years after the EPC has left.",
      "Kafaah places 20 years of direct operational experience on your side. We review what the EPC delivers, challenge what doesn't meet the standard, and ensure the plant you receive is the plant you paid for.",
    ],
    painPoints: [
      {
        stat: "40%",
        label: "Performance Gap",
        desc: "Average gap between design guarantees and actual first-year performance without owner representation.",
      },
      {
        stat: "$2–5M",
        label: "Hidden Cost Overruns",
        desc: "Typical undetected cost escalation in plant projects without independent technical review.",
      },
      {
        stat: "3×",
        label: "Warranty Disputes",
        desc: "More frequent when the owner lacks independent documentation of construction quality.",
      },
    ],
    tagline: "Your capital deserves independent protection.",
  },
  services: {
    sectionLabel: "02 — Owner Services",
    headline: "What we do ",
    headlineAccent: "for you",
    visibleSlugs: [
      "owners-engineer",
      "operation-readiness",
      "production-optimization",
      "investor-advisory",
    ],
    bottomTagline: "Full lifecycle protection for your investment",
  },
  insight: {
    quote:
      "The decisions made during construction determine the next 20 years of plant performance. An independent engineer pays for themselves in the first commissioning month.",
    attribution: "— Kafaah Advisory Team",
  },
  contact: {
    eyebrow: "Start the conversation",
    headline: "Protect your ",
    headlineAccent: "investment",
    subCopy:
      "Whether you're evaluating a new project, in the middle of construction, or facing performance issues — we bring independent expertise to protect your capital.",
  },
};

/* ═══════════════════════════════════════════════
   EPC / CONTRACTOR CONTENT
   ═══════════════════════════════════════════════ */
const epcContent: RoleContent = {
  hero: {
    eyebrow: "EPC & Contractor Portal · Egypt & Gulf",
    headline: [
      "Engineering",
      "certainty",
      "for critical plants.",
    ],
    subCopy:
      "Expert commissioning, startup, and troubleshooting support for EPC contractors and plant operators — H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP.",
    primaryCta: { label: "Commissioning", href: "/services/commissioning/" },
    secondaryCta: { label: "Troubleshooting", href: "/services/troubleshooting/" },
    stats: [
      { num: "20+", label: "Years of Operation" },
      { num: "6", label: "Core Technologies" },
      { num: "7", label: "Service Verticals" },
      { num: "100%", label: "Independent" },
    ],
  },
  problem: {
    sectionLabel: "01 — The Problem",
    headline: "Most plant failures ",
    headlineAccent: "aren't",
    subHeadline: " engineering failures.",
    paragraphs: [
      "A plant is only as reliable as the people who commissioned it. The commissioning phase is where years of engineering design get translated into real operations — and where most critical decisions are made under pressure, in real time.",
      "EPC companies manage projects. They do not manage operations. When a plant underperforms — low yield, quality deviation, unplanned downtime — the EPC has already left.",
      "Kafaah exists to bridge that gap. We bring 20 years of direct operational experience inside inorganic chemical and fertilizer plants — not consulting experience, operational experience.",
    ],
    painPoints: [
      {
        stat: "40%",
        label: "Yield Loss",
        desc: "Average performance gap in first-year operations without specialist commissioning.",
      },
      {
        stat: "6–18 mo",
        label: "Delayed Ramp-up",
        desc: "Typical time lost when commissioning teams lack plant-specific operational depth.",
      },
      {
        stat: "3×",
        label: "Unplanned Shutdowns",
        desc: "More frequent in plants commissioned by EPC generalists vs. process specialists.",
      },
    ],
    tagline: "We don't consult — we operate.",
  },
  services: {
    sectionLabel: "02 — Services",
    headline: "What we ",
    headlineAccent: "do",
    visibleSlugs: [
      "commissioning",
      "troubleshooting",
      "production-optimization",
      "operator-training",
    ],
    bottomTagline: "End-to-end plant lifecycle support",
  },
  insight: {
    quote:
      "The gap between a plant that works and a plant that works reliably is operational experience. Not more engineering — better commissioning.",
    attribution: "— Kafaah Engineering Team",
  },
  contact: {
    eyebrow: "Start the conversation",
    headline: "Need specialist ",
    headlineAccent: "support?",
    subCopy:
      "Whether you need a commissioning team, troubleshooting support, or operational optimization — our specialists have done it before.",
  },
};

/* ═══════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════ */
export const roleContentMap: Record<UserRole, RoleContent> = {
  owner: ownerContent,
  epc: epcContent,
};

/** Default content when no role is selected (fallback to EPC = original site) */
export const defaultContent = epcContent;
