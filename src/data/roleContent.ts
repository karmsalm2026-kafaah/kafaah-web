/* ══════════════════════════════════════════════
   ROLE-BASED CONTENT — Owner vs EPC
   Each audience sees a tailored home page.
   ══════════════════════════════════════════════ */

import type { Locale } from "@/lib/i18n";

export type UserRole = "owner" | "epc";

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;
export type LocalizedStringTuple3 = Record<Locale, [string, string, string]>;

/* ── Hero Section ── */
export interface HeroContent {
  eyebrow: LocalizedString;
  headline: LocalizedStringTuple3;
  subCopy: LocalizedString;
  primaryCta: { label: LocalizedString; href: string };
  secondaryCta: { label: LocalizedString; href: string };
  stats: { num: string; label: LocalizedString }[];
}

/* ── Problem Section ── */
export interface ProblemContent {
  sectionLabel: LocalizedString;
  headline: LocalizedString;
  headlineAccent: LocalizedString;
  subHeadline: LocalizedString;
  paragraphs: LocalizedStringArray;
  painPoints: {
    stat: string;
    label: LocalizedString;
    desc: LocalizedString;
  }[];
  tagline: LocalizedString;
}

/* ── Services Section ── */
export interface ServicesContent {
  sectionLabel: LocalizedString;
  headline: LocalizedString;
  headlineAccent: LocalizedString;
  /** Service slug list to show for this role */
  visibleSlugs: string[];
  bottomTagline: LocalizedString;
}

/* ── Insight Banner ── */
export interface InsightContent {
  quote: LocalizedString;
  attribution: LocalizedString;
}

/* ── Contact CTA ── */
export interface ContactContent {
  eyebrow: LocalizedString;
  headline: LocalizedString;
  headlineAccent: LocalizedString;
  subCopy: LocalizedString;
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
    eyebrow: {
      en: "Owner & Investor Portal · Egypt & Gulf",
      ar: "بوابة الملاك والمستثمرين · مصر والخليج",
      zh: "业主与投资者门户 · 埃及与海湾地区"
    },
    headline: {
      en: ["Protecting", "your investment", "from day one."],
      ar: ["نحمي", "استثماراتك", "منذ اليوم الأول."],
      zh: ["从第一天起", "保护", "您的投资。"]
    },
    subCopy: {
      en: "Independent technical oversight for chemical and fertilizer plant owners — from feasibility studies and due diligence to commissioning and handover.",
      ar: "إشراف فني مستقل لملاك مصانع الكيماويات والأسمدة — من دراسات الجدوى والفحص النافي للجهالة إلى التشغيل والتسليم.",
      zh: "为化工和化肥工厂业主提供独立的监督——从可行性研究和尽职调查到调试和移交。"
    },
    primaryCta: { 
      label: { en: "Owner's Engineer", ar: "مهندس المالك", zh: "业主工程师" }, 
      href: "/services/owners-engineer/" 
    },
    secondaryCta: { 
      label: { en: "Investment Advisory", ar: "الاستشارات الاستثمارية", zh: "投资咨询" }, 
      href: "/services/investor-advisory/" 
    },
    stats: [
      { num: "20+", label: { en: "Years of Operation", ar: "عاماً من التشغيل", zh: "年运营经验" } },
      { num: "6", label: { en: "Core Technologies", ar: "تقنيات أساسية", zh: "核心技术" } },
      { num: "100%", label: { en: "Independent", ar: "مستقل", zh: "独立自主" } },
      { num: "0", label: { en: "EPC Affiliations", ar: "ارتباط بمقاولين", zh: "EPC关联" } },
    ],
  },
  problem: {
    sectionLabel: { en: "01 — The Risk", ar: "01 — المخاطر", zh: "01 — 风险" },
    headline: { en: "Most investors lose money not on ", ar: "معظم المستثمرين لا يخسرون أموالهم في ", zh: "大多数投资者亏损的并不是 " },
    headlineAccent: { en: "bad projects", ar: "المشاريع السيئة", zh: "糟糕的项目" },
    subHeadline: { 
      en: "— but on good projects with no independent oversight.", 
      ar: "— بل في المشاريع الجيدة التي تفتقر إلى الإشراف المستقل.", 
      zh: "— 而是缺乏独立监督的好项目。" 
    },
    paragraphs: {
      en: [
        "When you invest in a chemical plant, the EPC contractor manages the project. But the EPC works for the project — not for you. Their priority is schedule and budget compliance. Your priority is a plant that actually works.",
        "Without an independent technical representative on your side of the table, design decisions, equipment substitutions, and construction shortcuts go unchallenged — and their consequences appear years after the EPC has left.",
        "Kafaah places 20 years of direct operational experience on your side. We review what the EPC delivers, challenge what doesn't meet the standard, and ensure the plant you receive is the plant you paid for."
      ],
      ar: [
        "عند الاستثمار في مصنع كيماويات، يتولى المقاول إدارة المشروع. لكن المقاول يعمل لصالح المشروع — وليس لصالحك. أولويتهم هي الالتزام بالجدول الزمني والميزانية. أما أولويتك فهي مصنع يعمل بكفاءة.",
        "بدون ممثل فني مستقل بجانبك، تمر قرارات التصميم واستبدال المعدات واختصارات البناء دون مساءلة — وتظهر عواقبها بعد سنوات من مغادرة المقاول.",
        "تضع كفاءة 20 عاماً من الخبرة التشغيلية المباشرة في صفك. نقوم بمراجعة ما يسلمه المقاول، ونعترض على ما لا يلبي المعايير، ونضمن أن المصنع الذي تتسلمه هو المصنع الذي دفعت ثمنه."
      ],
      zh: [
        "当您投资一家化工厂时，EPC承包商负责管理项目。但EPC是为项目工作——而不是为您。他们的首要任务是遵守进度和预算。您的首要任务是一家真正运转的工厂。",
        "如果没有独立的技术代表站在您这一边，设计决策、设备更换和施工捷径将无人质疑——而它们的后果将在EPC离开数年后显现出来。",
        "Kafaah将20年的直接运营经验放在您这一边。我们审查EPC交付的内容，质疑不符合标准的地方，并确保您收到的工厂是您所期望的工厂。"
      ]
    },
    painPoints: [
      {
        stat: "40%",
        label: { en: "Performance Gap", ar: "فجوة الأداء", zh: "性能差距" },
        desc: { 
          en: "Average gap between design guarantees and actual first-year performance without owner representation.", 
          ar: "متوسط الفجوة بين ضمانات التصميم والأداء الفعلي في السنة الأولى دون تمثيل المالك.", 
          zh: "没有业主代表的情况下，设计保证与实际首年性能之间的平均差距。" 
        },
      },
      {
        stat: "$2–5M",
        label: { en: "Hidden Cost Overruns", ar: "تجاوزات التكلفة الخفية", zh: "隐藏的成本超支" },
        desc: { 
          en: "Typical undetected cost escalation in plant projects without independent technical review.", 
          ar: "التصعيد النموذجي غير المكتشف للتكاليف في مشاريع المصانع دون مراجعة فنية مستقلة.", 
          zh: "在没有独立技术审查的情况下，工厂项目中典型的未被发现的成本上升。" 
        },
      },
      {
        stat: "3×",
        label: { en: "Warranty Disputes", ar: "نزاعات الضمان", zh: "保修纠纷" },
        desc: { 
          en: "More frequent when the owner lacks independent documentation of construction quality.", 
          ar: "تحدث بشكل متكرر عندما يفتقر المالك إلى وثائق مستقلة حول جودة البناء.", 
          zh: "当业主缺乏施工质量的独立记录时更为频繁。" 
        },
      },
    ],
    tagline: { 
      en: "Your capital deserves independent protection.", 
      ar: "رأس مالك يستحق حماية مستقلة.", 
      zh: "您的资本值得独立的保护。" 
    },
  },
  services: {
    sectionLabel: { en: "02 — Owner Services", ar: "02 — خدمات الملاك", zh: "02 — 业主服务" },
    headline: { en: "What we do ", ar: "ما نفعله ", zh: "我们为" },
    headlineAccent: { en: "for you", ar: "من أجلك", zh: "您做的事" },
    visibleSlugs: [
      "owners-engineer",
      "operation-readiness",
      "production-optimization",
      "investor-advisory",
    ],
    bottomTagline: { 
      en: "Full lifecycle protection for your investment", 
      ar: "حماية شاملة لدورة حياة استثمارك", 
      zh: "为您的投资提供全生命周期保护" 
    },
  },
  insight: {
    quote: { 
      en: "The decisions made during construction determine the next 20 years of plant performance. An independent engineer pays for themselves in the first commissioning month.", 
      ar: "القرارات المتخذة أثناء البناء تحدد أداء المصنع للـ 20 عاماً القادمة. المهندس المستقل يغطي تكاليفه في أول شهر من التشغيل.", 
      zh: "施工期间做出的决策决定了工厂未来20年的性能。独立工程师的成本在第一个调试月就能收回。" 
    },
    attribution: { 
      en: "— Kafaah Advisory Team", 
      ar: "— فريق استشارات كفاءة", 
      zh: "— Kafaah咨询团队" 
    },
  },
  contact: {
    eyebrow: { en: "Start the conversation", ar: "ابدأ المحادثة", zh: "开始对话" },
    headline: { en: "Protect your ", ar: "احمِ ", zh: "保护您的" },
    headlineAccent: { en: "investment", ar: "استثمارك", zh: "投资" },
    subCopy: { 
      en: "Whether you're evaluating a new project, in the middle of construction, or facing performance issues — we bring independent expertise to protect your capital.", 
      ar: "سواء كنت تقيّم مشروعاً جديداً، أو في منتصف عملية البناء، أو تواجه مشكلات في الأداء — نحن نقدم خبرة مستقلة لحماية رأس مالك.", 
      zh: "无论您是在评估新项目、在施工阶段还是面临性能问题——我们都能提供独立的专业知识来保护您的资本。" 
    },
  },
};

/* ═══════════════════════════════════════════════
   EPC / CONTRACTOR CONTENT
   ═══════════════════════════════════════════════ */
const epcContent: RoleContent = {
  hero: {
    eyebrow: {
      en: "EPC & Contractor Portal · Egypt & Gulf",
      ar: "بوابة المقاولين (EPC) · مصر والخليج",
      zh: "EPC与承包商门户 · 埃及与海湾地区"
    },
    headline: {
      en: ["Engineering", "certainty", "for critical plants."],
      ar: ["نهندس", "اليقين", "للمصانع الحرجة."],
      zh: ["为关键工厂", "提供", "工程确定性。"]
    },
    subCopy: {
      en: "Expert commissioning, startup, and troubleshooting support for EPC contractors and plant operators — H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP.",
      ar: "دعم متخصص في التشغيل والتسليم واستكشاف الأخطاء وإصلاحها لمقاولي EPC ومشغلي المصانع — حمض الكبريتيك، حمض الفوسفوريك، سلفات البوتاسيوم، NPK، سلفات المغنيسيوم، و SSP.",
      zh: "为EPC承包商和工厂运营商提供专业的调试、启动和故障排除支持——包括硫酸、磷酸、硫酸钾、NPK、硫酸镁和SSP工厂。"
    },
    primaryCta: { 
      label: { en: "Commissioning", ar: "التشغيل", zh: "调试" }, 
      href: "/services/commissioning/" 
    },
    secondaryCta: { 
      label: { en: "Troubleshooting", ar: "حل المشكلات", zh: "故障排除" }, 
      href: "/services/troubleshooting/" 
    },
    stats: [
      { num: "20+", label: { en: "Years of Operation", ar: "عاماً من التشغيل", zh: "年运营经验" } },
      { num: "6", label: { en: "Core Technologies", ar: "تقنيات أساسية", zh: "核心技术" } },
      { num: "7", label: { en: "Service Verticals", ar: "قطاعات خدمية", zh: "服务领域" } },
      { num: "100%", label: { en: "Independent", ar: "مستقل", zh: "独立自主" } },
    ],
  },
  problem: {
    sectionLabel: { en: "01 — The Problem", ar: "01 — المشكلة", zh: "01 — 问题" },
    headline: { en: "Most plant failures ", ar: "معظم إخفاقات المصانع ", zh: "大多数工厂的失败 " },
    headlineAccent: { en: "aren't", ar: "ليست", zh: "并不是" },
    subHeadline: { 
      en: " engineering failures.", 
      ar: " إخفاقات هندسية.", 
      zh: " 工程上的失败。" 
    },
    paragraphs: {
      en: [
        "A plant is only as reliable as the people who commissioned it. The commissioning phase is where years of engineering design get translated into real operations — and where most critical decisions are made under pressure, in real time.",
        "EPC companies manage projects. They do not manage operations. When a plant underperforms — low yield, quality deviation, unplanned downtime — the EPC has already left.",
        "Kafaah exists to bridge that gap. We bring 20 years of direct operational experience inside inorganic chemical and fertilizer plants — not consulting experience, operational experience."
      ],
      ar: [
        "موثوقية المصنع تعتمد بالأساس على كفاءة من قام بتشغيله. مرحلة التشغيل هي حيث تُترجم سنوات من التصميم الهندسي إلى عمليات حقيقية — وحيث تُتخذ القرارات الحاسمة تحت الضغط، في الوقت الفعلي.",
        "شركات المقاولات تدير المشاريع. هي لا تدير العمليات التشغيلية. عندما يضعف أداء المصنع — انخفاض الإنتاجية، انحراف الجودة، التوقف غير المخطط له — يكون المقاول قد غادر بالفعل.",
        "وُجدت كفاءة لسد هذه الفجوة. نحن نقدم 20 عاماً من الخبرة التشغيلية المباشرة داخل مصانع الكيماويات غير العضوية والأسمدة — ليست خبرة استشارية، بل خبرة تشغيلية على أرض الواقع."
      ],
      zh: [
        "工厂的可靠性取决于负责调试它的人员。调试阶段是将多年的工程设计转化为实际运营的阶段——在这一阶段，最关键的决策都是在压力下实时做出的。",
        "EPC公司管理项目。他们不管理运营。当工厂表现不佳时——产量低、质量偏差、计划外停机——EPC往往已经离开了。",
        "Kafaah的存在就是为了弥合这一差距。我们在无机化学和化肥工厂内拥有20年的直接运营经验——不是咨询经验，而是实战运营经验。"
      ]
    },
    painPoints: [
      {
        stat: "40%",
        label: { en: "Yield Loss", ar: "خسارة الإنتاجية", zh: "产量损失" },
        desc: { 
          en: "Average performance gap in first-year operations without specialist commissioning.", 
          ar: "متوسط الفجوة في الأداء خلال عمليات السنة الأولى بدون تشغيل متخصص.", 
          zh: "在没有专家调试的情况下，首年运营的平均性能差距。" 
        },
      },
      {
        stat: "6–18 mo",
        label: { en: "Delayed Ramp-up", ar: "تأخر الوصول للإنتاج", zh: "产能提升延迟" },
        desc: { 
          en: "Typical time lost when commissioning teams lack plant-specific operational depth.", 
          ar: "الوقت الضائع المعتاد عندما تفتقر فرق التشغيل إلى العمق التشغيلي الخاص بالمصنع.", 
          zh: "当调试团队缺乏针对特定工厂的深度运营经验时，通常会损失的时间。" 
        },
      },
      {
        stat: "3×",
        label: { en: "Unplanned Shutdowns", ar: "توقفات غير مجدولة", zh: "计划外停机" },
        desc: { 
          en: "More frequent in plants commissioned by EPC generalists vs. process specialists.", 
          ar: "تحدث بشكل متكرر في المصانع التي يتم تشغيلها بواسطة مقاولين عامين مقابل متخصصي العمليات.", 
          zh: "与由工艺专家调试的工厂相比，由EPC通才调试的工厂更频繁发生。" 
        },
      },
    ],
    tagline: { 
      en: "We don't consult — we operate.", 
      ar: "نحن لا نقدم الاستشارات فقط — بل نقوم بالتشغيل.", 
      zh: "我们不只是咨询——我们亲自运营。" 
    },
  },
  services: {
    sectionLabel: { en: "02 — Services", ar: "02 — الخدمات", zh: "02 — 服务" },
    headline: { en: "What we ", ar: "ما نـ", zh: "我们做" },
    headlineAccent: { en: "do", ar: "ـفعله", zh: "的事" },
    visibleSlugs: [
      "commissioning",
      "troubleshooting",
      "production-optimization",
      "operator-training",
    ],
    bottomTagline: { 
      en: "End-to-end plant lifecycle support", 
      ar: "دعم متكامل لدورة حياة المصنع من البداية للنهاية", 
      zh: "端到端的工厂全生命周期支持" 
    },
  },
  insight: {
    quote: { 
      en: "The gap between a plant that works and a plant that works reliably is operational experience. Not more engineering — better commissioning.", 
      ar: "الفجوة بين مصنع يعمل ومصنع يعمل بموثوقية عالية هي الخبرة التشغيلية. ليس بمزيد من الهندسة — بل بتشغيل أفضل.", 
      zh: "一家能运转的工厂和一家运转可靠的工厂之间的差距在于运营经验。不是更多的工程设计——而是更好的调试。" 
    },
    attribution: { 
      en: "— Kafaah Engineering Team", 
      ar: "— فريق هندسة كفاءة", 
      zh: "— Kafaah工程团队" 
    },
  },
  contact: {
    eyebrow: { en: "Start the conversation", ar: "ابدأ المحادثة", zh: "开始对话" },
    headline: { en: "Need specialist ", ar: "هل تحتاج إلى ", zh: "需要专业" },
    headlineAccent: { en: "support?", ar: "دعم متخصص؟", zh: "支持？" },
    subCopy: { 
      en: "Whether you need a commissioning team, troubleshooting support, or operational optimization — our specialists have done it before.", 
      ar: "سواء كنت بحاجة إلى فريق تشغيل، أو دعم في حل المشكلات، أو تحسين للعمليات — خبراؤنا قاموا بذلك من قبل.", 
      zh: "无论您是需要调试团队、故障排除支持，还是运营优化——我们的专家都曾经历过。" 
    },
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
