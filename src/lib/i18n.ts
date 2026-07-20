/* ══════════════════════════════════════════════
   CENTRAL i18n DICTIONARY — EN / AR / ZH
   All UI text across the site lives here.
   ══════════════════════════════════════════════ */

import type { GatewayLocale } from "./cookies";

export type Locale = GatewayLocale;

type L = Record<GatewayLocale, string>;
type LArr = Record<GatewayLocale, string[]>;

/* ── Helper ── */
export function getFontClass(locale: GatewayLocale, type: "display" | "ui" | "body" = "ui") {
  if (locale === "ar") return "font-[family-name:var(--font-arabic)] tracking-normal";
  if (locale === "zh") return "font-[family-name:var(--font-chinese)] tracking-normal";
  return `font-[family-name:var(--font-${type})]`;
}

export function getLangName(locale: GatewayLocale): string {
  if (locale === "ar") return "العربية";
  if (locale === "zh") return "中文";
  return "English";
}

export function isRtl(locale: GatewayLocale): boolean {
  return locale === "ar";
}

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
export const nav = {
  home: { en: "Home", ar: "الرئيسية", zh: "首页" } as L,
  whoWeAre: { en: "Who We Are", ar: "من نحن", zh: "关于我们" } as L,
  technologies: { en: "Technologies", ar: "التقنيات", zh: "技术" } as L,
  services: { en: "Services", ar: "الخدمات", zh: "服务" } as L,
  experience: { en: "Experience", ar: "الخبرات", zh: "经验" } as L,
  insights: { en: "Insights", ar: "رؤى", zh: "洞察" } as L,
  getInTouch: { en: "Get in Touch", ar: "تواصل معنا", zh: "联系我们" } as L,
  language: { en: "Language", ar: "اللغة", zh: "语言" } as L,
};

export const megaMenu = {
  owners: { en: "Plant Owners / Operators", ar: "مُلاك ومشغلو المصانع", zh: "工厂业主/运营商" } as L,
  epc: { en: "EPC Contractors", ar: "مقاولون EPC", zh: "EPC承包商" } as L,
  comingSoon: { en: "Coming Soon", ar: "سيتم إضافتها قريباً", zh: "即将推出" } as L,
};

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
export const footer = {
  brandDesc: {
    en: "Independent specialists in inorganic chemical and fertilizer plant commissioning, startup, troubleshooting, and performance optimization.",
    ar: "متخصصون مستقلون في بدء تشغيل مصانع الكيماويات غير العضوية والأسمدة، واستكشاف أعطالها، وتحسين أدائها.",
    zh: "无机化工与化肥工厂调试、启动、故障排除及性能优化领域的独立专家。",
  } as L,
  technologies: { en: "Technologies", ar: "التقنيات", zh: "技术" } as L,
  services: { en: "Services", ar: "الخدمات", zh: "服务" } as L,
  company: { en: "Company", ar: "الشركة", zh: "公司" } as L,
  contactUs: { en: "Contact Us", ar: "تواصل معنا", zh: "联系我们" } as L,
  address: { en: "Office Address", ar: "عنوان المكتب", zh: "办公地址" } as L,
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "埃及开罗" } as L,
  phone: { en: "Phone", ar: "رقم الهاتف", zh: "电话" } as L,
  email: { en: "Email", ar: "البريد الإلكتروني", zh: "电子邮件" } as L,
  socialMedia: { en: "Follow Us", ar: "تابعنا", zh: "关注我们" } as L,
  copyright: { en: "© 2026 Kafaah Industrial Solutions", ar: "© 2026 كفاءة للحلول الصناعية", zh: "© 2026 Kafaah 工业解决方案" } as L,
  independent: { en: "Independent", ar: "مستقلون", zh: "独立" } as L,
  technical: { en: "Technical", ar: "تقنيون", zh: "技术" } as L,
  operational: { en: "Operational", ar: "تشغيليون", zh: "运营" } as L,
  forOwners: { en: "For Owners", ar: "للملاك والمشغلين", zh: "面向业主" } as L,
  sharedServices: { en: "Shared Services", ar: "خدمات مشتركة", zh: "共享服务" } as L,
  forEpc: { en: "For EPCs", ar: "لمقاولي EPC", zh: "面向 EPC 承包商" } as L,
  servicesDesc: {
    en: "Specialized engineering, commissioning, and advisory support across the full project lifecycle.",
    ar: "دعم هندسي وتشغيلي واستشاري متخصص عبر كامل دورة حياة المشروع الصناعي.",
    zh: "横跨整个项目生命周期的专业工程、调试和顾问支持。"
  } as L,
  exploreServices: {
    en: "Explore All Services",
    ar: "استكشف جميع الخدمات",
    zh: "浏览所有服务"
  } as L,
  techDesc: {
    en: "Expertise in core inorganic chemical processes, including sulfuric acid, phosphoric acid, and complex fertilizers.",
    ar: "خبرة عميقة في العمليات الكيميائية غير العضوية الأساسية، بما في ذلك حمض الكبريتيك والفسفوريك والأسمدة المركبة.",
    zh: "在核心无机化工工艺方面的专业知识，包括硫酸、磷酸和复合肥。"
  } as L,
  exploreTech: {
    en: "Explore All Technologies",
    ar: "استكشف جميع التقنيات",
    zh: "浏览所有技术"
  } as L,
};

/* ══════════════════════════════════════════════
   HOMEPAGE SECTIONS
   ══════════════════════════════════════════════ */
export const hero = {
  eyebrow: { 
    en: "INDEPENDENT TECHNICAL EXPERTS | FOR FERTILIZER & CHEMICAL PLANTS", 
    ar: "خبراء فنيون مستقلون | لمصانع الأسمدة والكيماويات", 
    zh: "化肥与化学工厂的 | 独立技术专家" 
  } as L,
  headline: {
    en: ["Where Industrial Projects", "Become Operating Plants."],
    ar: ["حيث تتحول المشاريع الصناعية", "إلى مصانع تشغيلية."],
    zh: ["让工业项目", "真正投入运营。"],
  } as LArr,
  subCopy: {
    en: "From design review and commissioning to startup and stable operation — Kafaah supports the phases where industrial projects succeed or fail.",
    ar: "من مراجعة التصميم والتشغيل التجريبي إلى بدء التشغيل والتشغيل المستقر — تدعم كفاءة المراحل التي تنجح فيها المشاريع الصناعية أو تفشل.",
    zh: "从设计审查和调试到启动和稳定运行——Kafaah 支持工业项目成败的关键阶段。",
  } as L,
  exploreServices: { en: "VIEW CAPABILITIES", ar: "اكتشف خدماتنا", zh: "查看能力" } as L,
  discussPlant: { en: "PROJECT EXPERIENCE", ar: "خبرات المشاريع", zh: "项目经验" } as L,
  ourTrackRecord: { en: "Our Track Record", ar: "سجلّ إنجازاتنا", zh: "我们的业绩" } as L,
  statsLabels: {
    en: ["Years of Operation", "Core Technologies", "Service Verticals", "Independent"],
    ar: ["عامًا من الخبرة", "تقنيات أساسية", "قطاعات خدمية", "مستقلون"],
    zh: ["年运营经验", "核心技术", "服务领域", "独立运营"],
  } as LArr,
  stats: {
    en: [
      { value: "20+", label: "YEARS OF HANDS-ON PLANT EXPERIENCE" },
      { value: "6", label: "INDUSTRIAL PROCESSES" },
      { value: "11", label: "SERVICE OFFERINGS" },
      { value: "MENA", label: "& BEYOND" }
    ],
    ar: [
      { value: "20+", label: "عاماً من الخبرة الميدانية بالمصانع" },
      { value: "6", label: "عمليات صناعية متكاملة" },
      { value: "11", label: "خدمة هندسية متخصصة" },
      { value: "MENA", label: "والشرق الأوسط وأكثر" }
    ],
    zh: [
      { value: "20+", label: "年工厂实践经验" },
      { value: "6", label: "工业流程" },
      { value: "11", label: "服务产品" },
      { value: "MENA", label: "及更广泛地区" }
    ]
  } as Record<GatewayLocale, { value: string; label: string }[]>,
  builtInside: {
    title: { en: "BUILT INSIDE REAL PLANTS", ar: "بُنيت داخل مصانع حقيقية", zh: "在真实工厂内构建" } as L,
    items: {
      en: ["Commissioning & Startup", "Operational Stabilization", "Performance Optimization", "Independent Technical Oversight", "Fertilizer & Chemical Facilities"],
      ar: ["التشغيل التجريبي وبدء التشغيل", "الاستقرار التشغيلي", "تحسين الأداء", "الإشراف الفني المستقل", "مصانع الأسمدة والكيماويات"],
      zh: ["调试与启动", "运营稳定化", "性能优化", "独立技术监督", "化肥与化工设施"]
    } as LArr,
    location: { en: "EGYPT · GULF · MENA REGION", ar: "مصر · الخليج · منطقة الشرق الأوسط", zh: "埃及 · 海湾 · 中东北非地区" } as L
  },
};

export const ticker = {
  label: { en: "Technologies", ar: "التقنيات", zh: "技术" } as L,
  names: {
    en: ["Sulfuric Acid", "Phosphoric Acid", "Sulfate of Potash", "Compound Fertilizers (Multi-nutrient)", "Magnesium Sulphate", "Single Superphosphate"],
    ar: ["حمض الكبريتيك", "حمض الفوسفوريك", "كبريتات البوتاسيوم", "NPK سماد مركب", "كبريتات المغنيسيوم", "سوبر فوسفات أحادي"],
    zh: ["硫酸", "磷酸", "硫酸钾", "氮磷钾复合肥", "硫酸镁", "普通过磷酸钙"],
  } as LArr,
};

export const problem = {
  sectionLabel: { en: "01 — The Problem", ar: "01 — المشكلة", zh: "01 — 问题" } as L,
  headline: { en: "Most plant failures ", ar: "معظم أعطال المصانع ", zh: "大多数工厂故障" } as L,
  headlineAccent: { en: "aren't", ar: "ليست", zh: "并非" } as L,
  subHeadline: { en: " engineering failures.", ar: " أعطالًا هندسية.", zh: "工程故障。" } as L,
  tagline: { en: "We don't consult — we operate.", ar: "لا نقدّم استشارات — نحن نشغّل.", zh: "我们不做咨询——我们亲自运营。" } as L,
  painLabels: {
    en: ["Yield Loss", "Delayed Ramp-up", "Unplanned Shutdowns"],
    ar: ["فقدان الإنتاجية", "تأخّر بدء التشغيل", "توقّف غير مخطّط"],
    zh: ["产量损失", "延迟启动", "计划外停机"],
  } as LArr,
  challenge: {
    sectionLabel: { en: "01 — THE CHALLENGE", ar: "01 — التحدي", zh: "01 — 挑战" } as L,
    headline: { en: "Most industrial failures begin long before the first shutdown.", ar: "معظم الأعطال الصناعية تبدأ قبل وقت طويل من أول توقف.", zh: "大多数工业故障在首次停机之前很久就已经开始。" } as L,
    paragraph: {
      en: "Misaligned expectations, weak technical oversight, and rushed commissioning rarely appear until the damage is done — and their impact can affect plant performance for years.",
      ar: "التوقعات غير المتوافقة، والإشراف الفني الضعيف، والتشغيل التجريبي المتسرع نادراً ما تظهر حتى يقع الضرر — وتأثيرها يمكن أن يلازم أداء المصنع لسنوات.",
      zh: "不匹配的预期、薄弱的技术监督和仓促的调试，往往直到损害已经造成才会显现——而其影响可能会持续影响工厂性能多年。"
    } as L,
    cards: [
      {
        title: { en: "COMMISSIONING DELAYS", ar: "تأخيرات التشغيل التجريبي", zh: "调试延误" },
        desc: { en: "Lost revenue for owners. Extended costs for EPC contractors. The result of commissioning without process-specific expertise.", ar: "خسارة الإيرادات للمُلاك. تكاليف إضافية لمقاولي EPC. نتيجة التشغيل التجريبي بدون خبرة متخصصة في العمليات.", zh: "业主收入损失。EPC承包商成本增加。缺乏工艺特定专业知识进行调试的结果。" }
      },
      {
        title: { en: "OPERATIONAL INSTABILITY", ar: "عدم الاستقرار التشغيلي", zh: "运营不稳定" },
        desc: { en: "Unplanned shutdowns and repeated tuning cycles hurt both sides — owners miss performance targets, contractors face contractual risk.", ar: "التوقفات غير المخططة ودورات الضبط المتكررة تضر بالطرفين — المُلاك يفوتون أهداف الأداء، والمقاولون يواجهون مخاطر تعاقدية.", zh: "计划外停机和反复调试周期损害双方——业主错过性能目标，承包商面临合同风险。" }
      },
      {
        title: { en: "HIDDEN PERFORMANCE LOSSES", ar: "خسائر أداء مخفية", zh: "隐性性能损失" },
        desc: { en: "When design doesn't translate to real operation, owners lose returns and contractors lose reputation.", ar: "عندما لا يُترجم التصميم إلى تشغيل فعلي، يخسر المُلاك العوائد ويخسر المقاولون السمعة.", zh: "当设计无法转化为实际运营时，业主损失回报，承包商损失声誉。" }
      }
    ],
    quote: {
      en: "The real cost of poor execution is rarely immediate — it compounds through years of unstable operation.",
      ar: "التكلفة الحقيقية للتنفيذ السيء نادراً ما تكون فورية — بل تتراكم عبر سنوات من التشغيل غير المستقر.",
      zh: "糟糕执行的真正代价很少是即时的——它会在多年不稳定运营中不断累积。"
    } as L,
  },
  solution: {
    sectionLabel: { en: "02 — THE SOLUTION", ar: "02 — الحل", zh: "02 — 解决方案" } as L,
    headline: { en: "One Partner.", ar: "شريك واحد.", zh: "一个合作伙伴。" } as L,
    headlineAccent: { en: "One Side at a Time.", ar: "طرف واحد في كل مرة.", zh: "一次只服务一方。" } as L,
    paragraph: {
      en: "Kafaah supports both project owners and EPC contractors — independently. We provide the technical alignment, operational expertise, and commissioning depth required to move projects from construction into reliable operation.",
      ar: "تدعم كفاءة المُلاك ومقاولي EPC — بشكل مستقل. نوفر التوافق الفني والخبرة التشغيلية وعمق التشغيل التجريبي المطلوب لنقل المشاريع من البناء إلى التشغيل الموثوق.",
      zh: "Kafaah 独立支持项目业主和EPC承包商。我们提供将项目从建设推进到可靠运营所需的技术协调、运营专业知识和调试深度。"
    } as L,
    conflictTitle: {
      en: "ONE PROJECT. ONE CLIENT. NO CONFLICT OF INTEREST.",
      ar: "مشروع واحد. عميل واحد. لا تضارب في المصالح.",
      zh: "一个项目。一个客户。无利益冲突。"
    } as L,
    conflictDesc: {
      en: "Kafaah never represents both sides of the same project simultaneously.",
      ar: "لا تمثل كفاءة أبداً طرفي نفس المشروع في وقت واحد.",
      zh: "Kafaah 绝不同时代表同一项目的双方。"
    } as L,
    owners: {
      title: { en: "FOR PROJECT OWNERS", ar: "لمُلاك المشاريع", zh: "面向项目业主" },
      desc: { en: "Independent technical oversight that protects long-term operational performance — not just project delivery.", ar: "إشراف فني مستقل يحمي الأداء التشغيلي طويل المدى — وليس فقط تسليم المشروع.", zh: "保护长期运营绩效的独立技术监督——不仅仅是项目交付。" }
    },
    epc: {
      title: { en: "FOR EPC CONTRACTORS", ar: "لمقاولي EPC", zh: "面向EPC承包商" },
      desc: { en: "Specialist commissioning and startup expertise that closes the gap between mechanical completion and stable operation.", ar: "خبرة متخصصة في التشغيل التجريبي وبدء التشغيل تسد الفجوة بين الإنجاز الميكانيكي والتشغيل المستقر.", zh: "专业的调试和启动专业知识，弥合机械竣工和稳定运行之间的差距。" }
    }
  },
};

export const services = {
  sectionLabel: { en: "03 — Services", ar: "03 — الخدمات", zh: "03 — 服务" } as L,
  headline: { en: "Our Services", ar: "خدماتنا", zh: "我们的服务" } as L,
  headlineAccent: { en: "Across the Full Project Lifecycle", ar: "عبر دورة حياة المشروع الكاملة", zh: "横跨整个项目生命周期" } as L,
  allServices: { en: "All Services", ar: "جميع الخدمات", zh: "所有服务" } as L,
  exploreService: { en: "VIEW SCOPE", ar: "عرض تفاصيل الخدمة", zh: "查看详情" } as L,
  bottomTagline: { en: "End-to-end plant lifecycle support", ar: "دعم شامل لكامل دورة حياة المنشأة", zh: "全生命周期工厂支持" } as L,
  closingLine: {
    en: "From first engineering decision to stable plant operation — Kafaah is present at every phase where industrial projects succeed or fail.",
    ar: "من أول قرار هندسي وحتى التشغيل المستقر للمصنع — تتواجد كفاءة في كل مرحلة تنجح أو تفشل فيها المشاريع الصناعية.",
    zh: "从第一个工程决策到稳定的工厂运行——在工业项目成败的每个阶段，Kafaah 都与您同在。"
  } as L,
  phases: {
    en: [
      { num: "01", title: "Project & Design Phase", sub: "Early technical decisions determine whether a plant becomes profitable — or problematic." },
      { num: "02", title: "Construction & Pre-Startup", sub: "Most startup failures are created long before startup begins." },
      { num: "03", title: "Startup & Stabilization", sub: "The most critical — and most underestimated — phase of any industrial plant." },
      { num: "04", title: "Performance & Optimization", sub: "Stable operation is not the finish line — performance is." }
    ],
    ar: [
      { num: "01", title: "مرحلة المشروع والتصميم", sub: "القرارات الفنية المبكرة تحدد ما إذا كان المصنع سيصبح مربحاً — أو مليئاً بالمشاكل." },
      { num: "02", title: "البناء وما قبل بدء التشغيل", sub: "معظم إخفاقات بدء التشغيل تتولد قبل وقت طويل من بدء التشغيل نفسه." },
      { num: "03", title: "بدء التشغيل والاستقرار", sub: "المرحلة الأكثر حرجاً — والأكثر استهانة بها — في أي منشأة صناعية." },
      { num: "04", title: "الأداء والتحسين", sub: "التشغيل المستقر ليس نهاية المطاف — الأداء هو الغاية." }
    ],
    zh: [
      { num: "01", title: "项目与设计阶段", sub: "早期的技术决策决定了工厂是否盈利——还是问题重重。" },
      { num: "02", title: "建设与启动前", sub: "大多数启动失败在启动开始之前就已经埋下。" },
      { num: "03", title: "启动与稳定化", sub: "任何工业工厂中最关键——也最被低估的——阶段。" },
      { num: "04", title: "性能与优化", sub: "稳定运行不是终点——性能才是。" }
    ]
  } as Record<GatewayLocale, { num: string; title: string; sub: string }[]>,
  serviceList: {
    "owners-engineer": {
      title: { en: "Owner's Engineer", ar: "مهندس المالك", zh: "业主工程师" },
      desc: {
        en: "Independent technical representative from design review through contract award and project execution.",
        ar: "الممثل الفني المستقل من مراجعة التصميم إلى ترسية العقود وتنفيذ المشروع.",
        zh: "从设计审查到合同授予和项目执行的独立技术代表。"
      }
    },
    "investor-advisory": {
      title: { en: "Investor Advisory", ar: "الاستشارات الاستثمارية", zh: "投资者咨询" },
      desc: {
        en: "From feasibility to technology selection, with full technical accountability and no fragmented handoffs.",
        ar: "من دراسة الجدوى إلى اختيار التكنولوجيا، بمسؤولية فنية كاملة ودون تسليمات مُجزّأة.",
        zh: "从可行性到技术选择，全面的技术问责且无碎片化交接。"
      }
    },
    "process-engineering-support": {
      title: { en: "Process & Engineering Support", ar: "الدعم الهندسي والعملياتي", zh: "工艺与工程支持" },
      desc: {
        en: "Expert process engineering input during early design to ensure operability, reliability, and long-term performance.",
        ar: "مدخلات هندسة العمليات المتخصصة أثناء التصميم المبكر لضمان قابلية التشغيل والموثوقية والأداء طويل المدى.",
        zh: "在早期设计中提供专业的工艺工程输入，确保可操作性、可靠性和长期性能。"
      }
    },
    "construction-commissioning-support": {
      title: { en: "Construction & Commissioning Support", ar: "دعم البناء والتشغيل التجريبي", zh: "建设与调试支持" },
      desc: {
        en: "On-site technical support during construction to ensure mechanical completion is truly commissioning-ready.",
        ar: "الدعم الفني في الموقع أثناء البناء لضمان جاهزية الانتهاء الميكانيكي للتشغيل الفعلي.",
        zh: "施工期间的现场技术支持，以确保机械竣工真正做好调试准备。"
      }
    },
    "operation-readiness": {
      title: { en: "Operation Readiness", ar: "جاهزية التشغيل", zh: "运营准备就绪" },
      desc: {
        en: "HAZOP support, operating procedures, staffing readiness, and safety system verification before startup begins.",
        ar: "دعم دراسات HAZOP، وإجراءات التشغيل، وجاهزية الموظفين، والتحقق من أنظمة السلامة قبل بدء التشغيل.",
        zh: "在启动开始前提供 HAZOP 支持、操作规程、人员配备就绪和安全系统验证。"
      }
    },
    "commissioning": {
      title: { en: "Commissioning & Startup", ar: "التشغيل التجريبي وبدء التشغيل", zh: "调试与启动" },
      desc: {
        en: "From pre-commissioning through performance testing — leading the transition from cold systems to first product.",
        ar: "من ما قبل التشغيل التجريبي وحتى اختبارات الأداء — قيادة الانتقال من الأنظمة الباردة إلى أول منتج.",
        zh: "从预调试到性能测试——引领从冷态系统到首批产品的过渡。"
      }
    },
    "troubleshooting": {
      title: { en: "Technical Troubleshooting", ar: "استكشاف الأعطال الفنية", zh: "技术故障排除" },
      desc: {
        en: "Rapid-response diagnostics and root cause analysis for operational problems, bottlenecks, and production losses.",
        ar: "التشخيص السريع وتحليل الأسباب الجذرية للمشاكل التشغيلية والاختناقات وخسائر الإنتاج.",
        zh: "针对运营问题、瓶颈和生产损失的快速响应诊断和根本原因分析。"
      }
    },
    "operator-training": {
      title: { en: "Operator Training", ar: "تدريب المشغلين", zh: "操作员培训" },
      desc: {
        en: "Structured, plant-specific training programs that build real operational competence — not generic classroom theory.",
        ar: "برامج تدريبية منظمة ومخصصة للمصنع تبني كفاءة تشغيلية حقيقية — وليس نظريات فصول دراسية عامة.",
        zh: "结构化的工厂专用培训计划，建立真正的运营能力——而非通用的课堂理论。"
      }
    },
    "production-optimization": {
      title: { en: "Production Optimization", ar: "تحسين الإنتاج", zh: "生产优化" },
      desc: {
        en: "Systematic identification of production bottlenecks, yield losses, and energy inefficiencies — with measured results.",
        ar: "التحديد المنهجي لاختناقات الإنتاج وخسائر الإنتاجية وأوجه عدم كفاءة الطاقة — بنتائج مقاسة.",
        zh: "系统识别生产瓶颈、产量损失和能源低效——以可测量的结果为依据。"
      }
    },
    "startup-performance-guarantee": {
      title: { en: "Plant Startup & Performance Guarantee", ar: "بدء التشغيل وضمان الأداء", zh: "工厂启动与性能保证" },
      desc: {
        en: "Leading startup activities and performance test runs to support guarantee acceptance and operational stability.",
        ar: "قيادة أنشطة بدء التشغيل واختبارات الأداء لدعم قبول الضمان والاستقرار التشغيلي.",
        zh: "主导启动活动和性能测试运行，以支持保证验收和运营稳定。"
      }
    },
    "expert-witness-dispute-resolution": {
      title: { en: "Expert Witness & Technical Dispute Resolution", ar: "الشهادة الخبيرة وحل النزاعات التقنية", zh: "专家证人与技术争议解决" },
      desc: {
        en: "Clear, defensible technical analysis to support claims, arbitration, and contractual disputes.",
        ar: "تحليل فني واضح وقابل للدفاع عنه لدعم المطالبات والتحكيم والنزاعات التعاقدية.",
        zh: "清晰且立足稳固的技术分析，支持索赔、仲裁及合同争议。"
      }
    }
  } as Record<string, { title: Record<GatewayLocale, string>; desc: Record<GatewayLocale, string> }>,
  viewDetails: { en: "View Details", ar: "عرض التفاصيل", zh: "查看详情" } as L,
  bottomClosing: {
    en: "COMMITTED TO OPERATIONAL EXCELLENCE & RISK MITIGATION",
    ar: "ملتزمون بالتميز التشغيلي والحد من المخاطر",
    zh: "致力于卓越运营与降低风险"
  } as L,
  features: {
    en: [
      { title: "Independent Structure", subtitle: "Zero Conflict", desc: "We represent only one client per project to ensure fully independent oversight." },
      { title: "Operational Depth", subtitle: "20+ Years On-Site", desc: "Our technical expertise comes from inside operating plants, not theoretical theory." },
      { title: "Process-Specific Focus", subtitle: "Inorganic Acids & Fertilizers", desc: "Dedicated strictly to sulfuric acid, phosphoric acid, and complex fertilizer plants." },
      { title: "Documented Results", subtitle: "Measured Before & After", desc: "We prove our performance gains and stabilization metrics with actual plant data." }
    ],
    ar: [
      { title: "الاستقلالية الهيكلية", subtitle: "بدون تضارب مصالح", desc: "نحن نمثل طرفاً واحداً فقط في كل مشروع لضمان الحيادية." },
      { title: "خبرة تشغيلية ميدانية", subtitle: "أكثر من 20 عاماً في المصانع", desc: "معرفتنا تنبع من داخل المصانع الحقيقية وليس من النظريات." },
      { title: "تخصص كيميائي دقيق", subtitle: "الأحماض والأسمدة غير العضوية", desc: "تركيز كامل على العمليات الكيميائية المعقدة لضمان أعلى مستويات الكفاءة." },
      { title: "نتائج موثقة بالأرقام", subtitle: "قياس الأداء قبل وبعد", desc: "زيادة الإنتاجية وتقليل الفاقد موثقين بالبيانات الواقعية." }
    ],
    zh: [
      { title: "结构上高度独立", subtitle: "零利益冲突", desc: "我们在项目中仅代表单一客户，确保公正独立的立场。" },
      { title: "现场实操经验", subtitle: "20余年工厂一线经验", desc: "我们的专业知识提炼于正常运转 of 工厂内部，而非理论推导。" },
      { title: "专精化学工艺", subtitle: "无机酸与特种肥料", desc: "专注于特定的化工流程，深度掌握核心工艺细节。" },
      { title: "结果有据可查", subtitle: "量化对比前后数据", desc: "通过实际运营数据对比，证明产量提升与能耗降低的成果。" }
    ]
  } as Record<GatewayLocale, { title: string; subtitle: string; desc: string }[]>,
};

export const tech = {
  sectionLabel: { en: "04 — Technologies", ar: "04 — التقنيات", zh: "04 — 技术" } as L,
  headline: { en: "Industrial Processes We've ", ar: "العمليات الصناعية التي قمنا بـ ", zh: "我们 " } as L,
  headlineAccent: { en: "Operated, Commissioned & Optimized", ar: "تشغيلها وتدشينها وتحسينها", zh: "运营、调试与优化的工业流程" } as L,
  viewTech: { en: "View technology", ar: "استعراض التقنية", zh: "查看技术" } as L,
  completedProject: { en: "Completed project", ar: "مشروع مُنجَز", zh: "已完成项目" } as L,
  closingLine: {
    en: "If your plant is on this list, we've been inside one just like it — and we know where the problems hide.",
    ar: "إذا كان مصنعك في هذه القائمة، فقد عملنا من داخل مصنع مثله تماماً — ونعرف أين تختبئ المشاكل.",
    zh: "如果您的工厂在此列表中，我们曾在与之相同的工厂内部工作过——我们知道问题隐藏在哪里。"
  } as L,
  list: {
    "sulfuric-acid": {
      name: { en: "Sulfuric Acid", ar: "حمض الكبريتيك", zh: "硫酸" },
      desc: {
        en: "From sulfur burning and converter systems to absorption and emission control — complete sulfuric acid plant experience.",
        ar: "من حرق الكبريت وأنظمة المحولات إلى التحكم في الامتصاص والانبعاثات — خبرة متكاملة في مصانع حمض الكبريتيك.",
        zh: "从硫磺燃烧和转化器系统到吸收和排放控制——完整的硫酸厂实操经验。"
      }
    },
    "phosphoric-acid": {
      name: { en: "Phosphoric Acid", ar: "حمض الفوسفوريك", zh: "磷酸" },
      desc: {
        en: "Wet process across dihydrate and hemihydrate routes, from reactor systems to filtration, concentration, and purification.",
        ar: "العملية الرطبة عبر مساري ثنائي الهيدرات ونصف الهيدرات، من أنظمة المفاعلات إلى الفلترة والتركيز والنقاء.",
        zh: "涵盖二水和半水流程的湿法工艺，从反应器系统到过滤、浓缩和净化。"
      }
    },
    "sulfate-of-potash": {
      name: { en: "Sulfate of Potash", ar: "كبريتات البوتاسيوم", zh: "硫酸钾" },
      desc: {
        en: "Mannheim process and double salt route — including successful SOP commissioning and operational stabilization.",
        ar: "طريقة مانهايم ومسار الملح المزدوج — بما في ذلك التشغيل الناجح واستقرار العمليات لكبريتات البوتاسيوم (SOP).",
        zh: "曼海姆工艺和双盐路线——包括成功的硫酸钾（SOP）调试与运营稳定化。"
      }
    },
    "npk": {
      name: { en: "NPK Fertilizers", ar: "NPK سماد مركب", zh: "氮磷钾复合肥" },
      desc: {
        en: "Complete granulation and finishing lines — blending, coating, quality control, and performance testing.",
        ar: "خطوط التحبيب والتشطيب المتكاملة — الخلط، والطلاء، ومراقبة الجودة، واختبارات الأداء.",
        zh: "完整的造粒和精制生产线——混合、包裹机涂覆、质量控制和性能测试。"
      }
    },
    "magnesium-sulphate": {
      name: { en: "Magnesium Sulphate", ar: "كبريتات المغنيسيوم", zh: "硫酸镁" },
      desc: {
        en: "Epsomite production across technical and agricultural grades — from commissioning through stable continuous operation.",
        ar: "إنتاج الإبسوميت عبر الدرجات التقنية والزراعية — من التشغيل التجريبي إلى التشغيل المستمر والمستقر.",
        zh: "涵盖工业级和农业级七水硫酸镁（Epsomite）生产——从试车调试到稳定持续运行。"
      }
    },
    "ssp": {
      name: { en: "Single Superphosphate", ar: "سوبر فوسفات أحادي", zh: "普通过磷酸钙" },
      desc: {
        en: "Acidulation, curing, granulation, and storage — complete startup and performance optimization support.",
        ar: "المعاملة الحمضية، والتعتيق، والتحبيب، والتخزين — دعم كامل لبدء التشغيل وتحسين الأداء (SSP).",
        zh: "酸化反应、熟化、造粒和储存——提供完整的启动与性能优化支持。"
      }
    }
  } as Record<string, { name: Record<GatewayLocale, string>; desc: Record<GatewayLocale, string> }>,
};

export const trackRecord = {
  sectionLabel: { en: "05 — Experience", ar: "05 — الخبرات", zh: "05 — 经验" } as L,
  headline: { en: "Selected ", ar: "خبرة ", zh: "精选" } as L,
  headlineAccent: { en: "Project Experience", ar: "المشاريع", zh: "项目经验" } as L,
  description: {
    en: "Kafaah assembles project-specific technical teams built around the exact operational expertise each plant requires. Our network includes process specialists, commissioning engineers, and operational experts with firsthand experience across fertilizer and chemical facilities in Egypt, the Gulf, and the wider MENA region.",
    ar: "تقوم كفاءة بتشكيل فرق فنية مخصصة لكل مشروع تدور حول الخبرة التشغيلية الدقيقة التي يتطلبها كل مصنع. تضم شبكتنا أخصائيي عمليات، ومهندسي تشغيل، وخبراء تشغيل لديهم خبرة مباشرة في مصانع الأسمدة والمواد الكيميائية في مصر والخليج ومنطقة الشرق الأوسط وشمال أفريقيا الأوسع.",
    zh: "Kafaah 根据每家工厂所需的具体运营专长，组建特定项目的技术团队。我们的网络包括工艺专家、调试工程师和运营专家，他们在埃及、海湾及更广泛的中东北非地区的化肥和化工设施中拥有第一手经验。"
  } as L,
  fullTrackRecord: { en: "FULL TRACK RECORD", ar: "السجل الكامل للمشاريع", zh: "完整业绩记录" } as L,
  quote: {
    en: "“Every project is supported by a dedicated team of named specialists — engineers who have operated these plants themselves, assembled specifically for your scope.”",
    ar: "“كل مشروع مدعوم بفريق مخصص من متخصصين معروفين بالاسم — مهندسون قاموا بتشغيل هذه المصانع بأنفسهم، وتم تجميعهم خصيصًا لتغطية نطاق عملك.”",
    zh: "“每个项目都由专属的实名专家团队提供支持——他们是亲自运营过这些工厂的工程师，专门为您的项目范围而组建。”",
  } as L,
  closingLine: {
    en: "No fixed templates. No generic teams. — Only the expertise the plant actually requires.",
    ar: "لا قوالب ثابتة. لا فرق عمل عامة. — فقط الخبرة التي يتطلبها المصنع بالفعل.",
    zh: "无固定模板。无通用团队。 — 只有工厂实际需要的专业技术。"
  } as L,
  disciplines: {
    en: [
      { label: "Process", desc: "Engineering, commissioning, optimization" },
      { label: "Mechanical", desc: "Equipment selection, FAT, maintenance" },
      { label: "Electrical", desc: "Instrumentation, control & safety systems" },
    ],
    ar: [
      { label: "العمليات", desc: "الهندسة، التشغيل التجريبي، التحسين" },
      { label: "الميكانيكا", desc: "اختيار المعدات، حضور FAT، الصيانة" },
      { label: "الكهرباء", desc: "الأجهزة، أنظمة التحكم والسلامة" },
    ],
    zh: [
      { label: "工艺", desc: "工程、调试、优化" },
      { label: "机械", desc: "设备选型、FAT、维护" },
      { label: "电气", desc: "仪表、控制与安全系统" },
    ],
  } as Record<GatewayLocale, { label: string; desc: string }[]>,
  projects: {
    en: [
      {
        phase: "COMMISSIONING & STARTUP · NOV 2025 – JAN 2026",
        title: "Suez SOP Plant",
        tags: ["K₂SO₄", "Mannheim Process", "International EPC"],
        desc: "Provided independent commissioning and operational stabilization support for a 40,000 T/YR K₂SO₄ plant — working with an international EPC contractor through the critical startup phase to achieve stable, on-spec production.",
        location: "Suez, Egypt",
        capacity: "40,000 T/YR"
      },
      {
        phase: "COMMISSIONING & STARTUP · MARCH 2026",
        title: "Yanbu Compaction Granulation Facility",
        tags: ["Compaction Granulation", "Multi-grade Fertilizer", "KSA"],
        desc: "Delivered commissioning and startup support for a fertilizer compaction granulation facility in Yanbu, KSA — ensuring stable operation across multiple fertilizer grades through ramp-up and into early continuous production.",
        location: "Yanbu, KSA"
      }
    ],
    ar: [
      {
        phase: "التشغيل التجريبي وبدء التشغيل · نوفمبر 2025 - يناير 2026",
        title: "مصنع سلفات البوتاسيوم بالسويس",
        tags: ["كبريتات البوتاسيوم K₂SO₄", "طريقة مانهايم", "مقاول EPC دولي"],
        desc: "قدمنا دعماً مستقلاً للتشغيل التجريبي والاستقرار التشغيلي لمصنع كبريتات البوتاسيوم (K₂SO₄) بطاقة 40,000 طن/سنة — بالتعاون مع مقاول EPC دولي خلال مرحلة بدء التشغيل الحرجة لتحقيق إنتاج مستقر ومطابق للمواصفات.",
        location: "السويس، مصر",
        capacity: "40,000 طن/سنة"
      },
      {
        phase: "التشغيل التجريبي وبدء التشغيل · مارس 2026",
        title: "منشأة تحبيب الأسمدة بالضغط بينبع",
        tags: ["التحبيب بالضغط", "أسمدة متعددة الدرجات", "المملكة العربية السعودية"],
        desc: "قدمنا دعماً للتشغيل التجريبي وبدء التشغيل لمنشأة تحبيب الأسمدة بالضغط في ينبع، المملكة العربية السعودية — لضمان التشغيل المستقر عبر درجات أسمدة متعددة خلال مرحلة زيادة الإنتاج والدخول في الإنتاج المستمر المبكر.",
        location: "ينبع، السعودية"
      }
    ],
    zh: [
      {
        phase: "调试与启动 · 2025年11月 – 2026年1月",
        title: "苏伊士 SOP 硫酸钾厂",
        tags: ["硫酸钾 (K₂SO₄)", "曼海姆工艺", "国际 EPC 承包商"],
        desc: "为 40,000 吨/年硫酸钾（K₂SO₄）工厂提供独立的调试和运营稳定化支持——在关键的启动阶段与国际 EPC 承包商合作，以实现稳定、合格的生产。",
        location: "埃及，苏伊士",
        capacity: "40,000 吨/年"
      },
      {
        phase: "调试与启动 · 2026年3月",
        title: "延布挤压造粒工厂",
        tags: ["挤压造粒", "多级肥料", "沙特阿拉伯"],
        desc: "为沙特延布的肥料挤压造粒设施提供调试和启动支持——确保在产能爬坡和早期连续生产过程中，多种肥料级别都能稳定运行。",
        location: "沙特，延布"
      }
    ]
  } as Record<GatewayLocale, { phase: string; title: string; tags: string[]; desc: string; location: string; capacity?: string }[]>,
};

export const geography = {
  label: { en: "Geographic Reach", ar: "النطاق الجغرافي", zh: "地理覆盖" } as L,
  locations: {
    en: ["Egypt", "Saudi Arabia", "UAE", "Kuwait", "Jordan", "MENA Region"],
    ar: ["مصر", "السعودية", "الإمارات", "الكويت", "الأردن", "منطقة الشرق الأوسط"],
    zh: ["埃及", "沙特阿拉伯", "阿联酋", "科威特", "约旦", "中东北非地区"],
  } as LArr,
};

export const insightBanner = {
  quote: {
    en: "We measure before and after — results are not estimated, they are documented.",
    ar: "نقيس قبل وبعد — النتائج ليست تقديرية، بل موثقة.",
    zh: "我们在前后都进行测量——结果不是估算的，而是有据可查的。",
  } as L,
  attribution: { en: "Kafaah — Production Optimization", ar: "كفاءة — تحسين الإنتاج", zh: "Kafaah — 生产优化" } as L,
};

export const contactCta = {
  eyebrow: { en: "Start the conversation", ar: "ابدأ المحادثة", zh: "开始对话" } as L,
  headline: { en: "How can we", ar: "كيف يمكننا", zh: "我们如何" } as L,
  headlineAccent: { en: "help you?", ar: "مساعدتك؟", zh: "帮助您？" } as L,
  subCopy: {
    en: "Whether you are building a new inorganic chemical plant, running an existing facility, or evaluating an investment — Kafaah brings 20 years of direct operational expertise to your problem. We respond within 24 hours.",
    ar: "سواء كنت تبني مصنعاً كيميائياً غير عضوي جديداً، أو تدير منشأة قائمة، أو تقيّم استثماراً — تضع كفاءة 20 عاماً من الخبرة التشغيلية المباشرة في خدمتك. نرد خلال 24 ساعة.",
    zh: "无论您是在建设新的无机化工厂、运营现有设施还是评估投资——Kafaah 将20年的直接运营经验带到您的问题中。我们在24小时内回复。"
  } as L,
  getInTouch: { en: "Get in Touch", ar: "تواصل معنا", zh: "联系我们" } as L,
  sendEmail: { en: "Send Email", ar: "إرسال بريد", zh: "发送邮件" } as L,
  fullName: { en: "Full Name", ar: "الاسم الكامل", zh: "全名" } as L,
  fullNamePlaceholder: { en: "Dr. Ahmed Al-Rashid", ar: "د. أحمد الرشيد", zh: "阿里·拉希德 博士" } as L,
  company: { en: "Company", ar: "الشركة", zh: "公司" } as L,
  companyPlaceholder: { en: "SIPCHEM", ar: "سبكيم", zh: "沙特基础工业公司" } as L,
  email: { en: "Email Address", ar: "البريد الإلكتروني", zh: "电子邮件" } as L,
  emailPlaceholder: { en: "name@company.com", ar: "name@company.com", zh: "name@company.com" } as L,
  serviceOfInterest: { en: "Service of Interest", ar: "الخدمة المطلوبة", zh: "感兴趣的服务" } as L,
  selectService: { en: "Select a service…", ar: "اختر خدمة…", zh: "选择服务…" } as L,
  message: { en: "Message", ar: "الرسالة", zh: "留言" } as L,
  messagePlaceholder: { en: "Briefly describe your situation or question…", ar: "صف بإيجاز وضعك أو سؤالك…", zh: "简要描述您的情况或问题…" } as L,
  sendRequest: { en: "Send Consultation Request", ar: "إرسال طلب استشارة", zh: "发送咨询请求" } as L,
  locationLabel: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "开罗，埃及" } as L,
  responseTime: { en: "Response within 24 hours", ar: "الرد خلال 24 ساعة", zh: "24小时内回复" } as L,
  confidential: { en: "Confidential", ar: "سري", zh: "保密" } as L,
};

export const whyKafaah = {
  eyebrow: { en: "WHY KAFAAH", ar: "لماذا كفاءة", zh: "为什么选择 KAFAAH" } as L,
  headline: {
    en: "Four reasons clients trust us with their most critical phases.",
    ar: "أربعة أسباب تجعل العملاء يثقون بنا في أكثر مراحلهم حرجاً.",
    zh: "客户在最关键的阶段信任我们的四个原因。"
  } as L,
  cards: {
    en: [
      {
        title: "Independent by Structure",
        desc: "We work with owners and EPC contractors — but never on opposite sides of the same project."
      },
      {
        title: "Built Around Operations",
        desc: "Our expertise comes from inside operating plants, not from generic consulting frameworks."
      },
      {
        title: "Project-Specific Expertise",
        desc: "Every assignment is supported by specialists selected specifically for the plant, process, and startup phase involved."
      },
      {
        title: "Focused on Critical Phases",
        desc: "We operate where industrial risk is highest: commissioning, startup, stabilization, and operational performance."
      }
    ],
    ar: [
      {
        title: "مستقلون هيكلياً",
        desc: "نحن نعمل مع الملاك ومقاولي EPC - ولكن لا نكون أبداً على طرفي نقيض في نفس المشروع."
      },
      {
        title: "التشغيل أولاً",
        desc: "تأتي خبرتنا من داخل المصانع التشغيلية، وليس من أطر استشارية عامة."
      },
      {
        title: "خبرة مخصصة للمشروع",
        desc: "كل مهمة يدعمها متخصصون تم اختيارهم خصيصاً للمصنع والعملية التشغيلية ومرحلة بدء التشغيل المعنية."
      },
      {
        title: "التركيز على المراحل الحرجة",
        desc: "نعمل حيث تكون المخاطر الصناعية في أعلى مستوياتها: التشغيل التجريبي، وبدء التشغيل، والاستقرار، والأداء التشغيلي."
      }
    ],
    zh: [
      {
        title: "结构独立",
        desc: "我们与业主和 EPC 承包商合作——但绝不会在同一个项目的对立面工作。"
      },
      {
        title: "立足于运营",
        desc: "我们的专业知识来自运营中的工厂内部，而非通用的咨询框架。"
      },
      {
        title: "特定项目的专业技术",
        desc: "每项任务都由专门针对相关工厂、工艺和启动阶段选拔的专家提供支持。"
      },
      {
        title: "专注于关键阶段",
        desc: "我们在工业风险最高的环节开展工作：调试、启动、稳定化和运营绩效。"
      }
    ]
  } as Record<GatewayLocale, { title: string; desc: string }[]>
};

export const founderBio = {
  sectionLabel: { en: "06 — BUILT ON OPERATIONAL EXPERIENCE", ar: "06 — بنيت على الخبرة التشغيلية", zh: "06 — 立足于运营经验" } as L,
  name: { en: "Eng. Mostafa Abdel Ghaffar", ar: "م. مصطفى عبد الغفار", zh: "莫斯塔法·阿卜杜勒·加法尔 工程师" } as L,
  role: { en: "FOUNDER & MANAGING DIRECTOR", ar: "المؤسس والمدير التنفيذي", zh: "创始人兼常务董事" } as L,
  quote: {
    en: "\"Kafaah was founded to bring technical accountability back to industrial projects. We operate inside the plant, because that is where the real problems are solved.\"",
    ar: "\"تأسست كفاءة لإعادة المسؤولية الفنية إلى المشاريع الصناعية. نحن نعمل من داخل المصنع، لأن هذا هو المكان الوحيد الذي تُحل فيه المشاكل الحقيقية.\"",
    zh: "\"Kafaah 的创立是为了将技术问责制带回工业项目。我们在工厂内部进行操作，因为那才是解决真实问题的地方。\""
  } as L,
  desc: {
    en: "20+ years of hands-on experience inside fertilizer and chemical plants — across commissioning, startup, troubleshooting, and operational stabilization. Our approach is shaped by real industrial environments, where technical decisions directly affect production reliability, operating cost, and long-term plant performance.",
    ar: "أكثر من 20 عاماً من الخبرة العملية داخل مصانع الأسمدة والكيماويات — عبر التشغيل التجريبي وبدء التشغيل واستكشاف الأعطال والاستقرار التشغيلي. يتشكل نهجنا بالبيئات الصناعية الحقيقية، حيث تؤثر القرارات الفنية مباشرة على موثوقية الإنتاج وتكلفة التشغيل والأداء طويل المدى للمصنع.",
    zh: "在化肥和化工厂内拥有20多年的实际操作经验——横跨调试、启动、故障排除和运营稳定化。我们的方法是在真实的工业环境中塑造的，在这些环境中，技术决策直接影响生产可靠性、运营成本和长期工厂绩效。"
  } as L,
  cards: {
    en: [
      { title: "20+ Years Experience", sub: "Fertilizer & Chemical Plants" },
      { title: "Commissioning & Startup", sub: "From cold systems to first product" },
      { title: "Egypt · Gulf · MENA", sub: "Regional operational presence" },
      { title: "Hands-on Leadership", sub: "Operations & Optimization" }
    ],
    ar: [
      { title: "خبرة 20+ عاماً", sub: "مصانع الأسمدة والكيماويات" },
      { title: "التشغيل التجريبي والتدشين", sub: "من الأنظمة الباردة إلى أول منتج" },
      { title: "مصر · الخليج · الشرق الأوسط", sub: "تواجد تشغيلي إقليمي" },
      { title: "قيادة ميدانية عملية", sub: "التشغيل والتحسين المستمر" }
    ],
    zh: [
      { title: "20年以上经验", sub: "化肥与化工厂" },
      { title: "调试与启动", sub: "从冷态系统到首批产品" },
      { title: "埃及 · 海湾 · 中东北非", sub: "区域运营足迹" },
      { title: "亲力亲为的领导", sub: "运营与优化" }
    ]
  } as Record<GatewayLocale, { title: string; sub: string }[]>
};

export const whoWeAre = {
  pageTitle: { en: "Who We Are", ar: "من نحن", zh: "关于我们" } as L,
  heroEyebrow: { en: "WHO WE ARE", ar: "من نحن", zh: "关于我们" } as L,
  heroTitle: {
    en: "An independent consultancy built inside real industrial plants.",
    ar: "مكتب استشاري مستقل تأسس من قلب المصانع الإنتاجية الحقيقية.",
    zh: "一个在真实工业厂房中建立起来的独立咨询机构。"
  } as L,
  heroSub1: {
    en: "Kafaah specializes in inorganic chemical and fertilizer plant commissioning, startup, troubleshooting, and performance optimization. We don't consult from a distance — we have managed startups, resolved production issues, optimized yields, and trained the operators who run these facilities every day.",
    ar: "تتخصص كفاءة في بدء تشغيل وتجريب ومعالجة مشكلات وتحسين أداء مصانع الأسمدة والكيماويات غير العضوية. نحن لا نقدم استشاراتنا عن بُعد — بل أدرنا عمليات بدء التشغيل، وحللنا أعقد مشاكل الإنتاج، وحسّنا الكفاءة، ودرّبنا المشغلين الذين يديرون هذه المرافق يومياً.",
    zh: "Kafaah 专注于无机化工与化肥厂的系统调试、启动运行、故障排除及性能优化。我们不进行远程空谈——我们曾亲手管理启动、解决生产瓶颈、优化产量产出，并培训着每天运行 these 设施的操作员们。"
  } as L,
  heroSub2: {
    en: "We bring nearly 20 years of direct operational expertise across H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants — not as observers, but as engineers who have operated them.",
    ar: "نحن نجلب ما يقرب من 20 عاماً من الخبرة التشغيلية المباشرة عبر مصانع H₂SO₄ و H₃PO₄ و K₂SO₄ و NPK و MgSO₄ و SSP — ليس كمراقبين، بل كمهندسين قاموا بتشغيلها بأنفسهم.",
    zh: "我们在 H₂SO₄、H₃PO₄、K₂SO₄、NPK、MgSO₄ 和 SSP 工厂拥有近 20 年的直接运营经验——并非作为旁观者，而是作为亲自操作过这些工厂的工程师。"
  } as L,
  heroKafaahMean: {
    en: "The word Kafaah (كفاءة) means competence in Arabic. It is not a marketing name — it is our standard. Every engagement we accept must meet it.",
    ar: "كلمة كفاءة (كفاءة) تعني الجدارة والقدرة باللغة العربية. إنها ليست مجرد اسم تسويقي — بل هي معيارنا الخاص. وكل مشروع نقبله يجب أن يرقى إليه.",
    zh: "Kafaah（كفاءة）在阿拉伯语中意为“能力与胜任”。这不仅是一个营销名称——更是我们的标准。我们所承接的每个项目都必须达到这一标准。"
  } as L,
  heroBuiltLabel: {
    en: "BUILT INSIDE REAL PLANTS",
    ar: "تأسست من قلب المصانع الإنتاجية",
    zh: "源于真实的工业生产一线"
  } as L,
  heroBuiltSub: {
    en: "H₂SO₄ · H₃PO₄ · K₂SO₄ · NPK · MgSO₄ · SSP\nEgypt · Saudi Arabia · MENA & Beyond",
    ar: "H₂SO₄ · H₃PO₄ · K₂SO₄ · NPK · MgSO₄ · SSP\nمصر · المملكة العربية السعودية · الشرق الأوسط وشمال أفريقيا وخارجها",
    zh: "H₂SO₄ · H₃PO₄ · K₂SO₄ · NPK · MgSO₄ · SSP\n埃及 · 沙特阿拉伯 · 中东北非及其他地区"
  } as L,
  founderEyebrow: { en: "THE FOUNDER", ar: "المؤسس", zh: "创始人" } as L,
  founderName: { en: "Moustafa Abdelghaffar", ar: "مصطفى عبد الغفار", zh: "Moustafa Abdelghaffar" } as L,
  founderRole: {
    en: "FOUNDER & PRINCIPAL PROCESS ENGINEER",
    ar: "المؤسس وكبير مهندسي العمليات",
    zh: "创始人兼首席工艺工程师"
  } as L,
  founderQuote: {
    en: "\"I have spent nearly two decades inside fertilizer and chemical plants across Egypt and Saudi Arabia — not managing from a distance, but on the floor, solving real problems. Over the years, I discovered that my deepest value isn't in following a process — it's in understanding why a plant isn't performing, and knowing exactly what to do about it. Kafaah was built on that conviction: that the most critical phases of any industrial project deserve engineers who have truly been there.\"",
    ar: "\"لقد أمضيت ما يقرب من عقدين من الزمن داخل مصانع الكيماويات والأسمدة في مصر والمملكة العربية السعودية — لم أكن أديرها عن بُعد، بل كنت متواجداً في صالة الإنتاج لحل المشكلات الحقيقية. وعلى مر السنين، اكتشفت أن قيمتي الحقيقية لا تكمن في مجرد اتباع العمليات — بل في فهم سبب عدم أداء المصنع بالشكل المطلوب، ومعرفة ما يجب فعله بالضبط. لقد تأسست كفاءة بناءً على هذا الاقتناع: أن المراحل الأكثر أهمية في أي مشروع صناعي تستحق مهندسين عايشوا الواقع وتواجدوا هناك بالفعل.\"",
    zh: "“我在埃及和沙特阿拉伯的化肥与化工厂里度过了近二十年的光阴——并非远距离管理，而是在生产车间一线解决实际问题。多年来，我发现自己最核心的价值并非在于按部就班，而是在于洞察工厂未能发挥应有性能的根本原因，并准确知晓如何加以解决。Kafaah 正是建立在这一信念之上：任何工业项目中最关键的阶段，都应当由那些真正经历过实操磨炼的工程师来保驾护航。”"
  } as L,
  founderBio: {
    en: "Since 2006, Moustafa Abdelghaffar has worked hands-on inside sulfuric acid, phosphoric acid, potassium sulfate, and fertilizer plants across Egypt and Saudi Arabia — leading commissioning operations, resolving operational challenges, and optimizing plant performance from the inside. Kafaah was founded to bring that depth of operational experience directly to project owners and EPC contractors who need more than advice — they need engineers who know where the problems hide.",
    ar: "منذ عام 2006، عمل مصطفى عبد الغفار بشكل مباشر وعملي داخل مصانع حمض الكبريتيك وحمض الفوسفوريك وكبريتات البوتاسيوم والأسمدة في مصر والمملكة العربية السعودية — حيث قاد عمليات تجريب التشغيل وحل التحديات التشغيلية وتحسين أداء المصانع من الداخل. تأسست كفاءة لجلب هذا العمق من الخبرة التشغيلية مباشرة إلى أصحاب المشاريع ومقاولي الهندسة والمشتريات والبناء (EPC) الذين يحتاجون إلى ما هو أكثر من مجرد المشورة — إنهم بحاجة إلى مهندسين يعرفون أين تكمن المشكلات.",
    zh: "自2006年以来，Moustafa Abdelghaffar 一直在埃及和沙特阿拉伯的硫酸、磷酸、硫酸钾和化肥厂从事一线实操工作——从内部主导调试运营、解决运行难题并优化装置表现。创立 Kafaah 的宗旨是，将这种深厚的运营实战经验直接带给项目业主 and EPC 承包商。对于他们而言，不仅需要方案建议，更需要能够洞悉故障根源的实干工程师。"
  } as L,
  founderStats: {
    en: [
      { label: "Since 2006", text: "Nearly 20 years of hands-on plant experience" },
      { label: "6 Processes", text: "H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, SSP" },
      { label: "Egypt & Saudi Arabia", text: "Direct operational presence across the region" },
      { label: "Commissioning & Startup", text: "From cold systems to stable, on-spec production" }
    ],
    ar: [
      { label: "منذ عام 2006", text: "ما يقرب من 20 عاماً من الخبرة العملية المباشرة" },
      { label: "6 عمليات صناعية", text: "H₂SO₄، H₃PO₄، K₂SO₄، NPK، MgSO₄، SSP" },
      { label: "مصر والسعودية", text: "تواجد تشغيلي مباشر عبر أنحاء المنطقة" },
      { label: "بدء التشغيل والتجريب", text: "من الأنظمة الباردة إلى الإنتاج المستقر والمطابق للمواصفات" }
    ],
    zh: [
      { label: "始于 2006 年", text: "近 20 年的装置一线实操经验" },
      { label: "6 大工艺流程", text: "H₂SO₄、H₃PO₄、K₂SO₄、NPK、MgSO₄、SSP" },
      { label: "埃及与沙特阿拉伯", text: "在整个区域内拥有直接的运营足迹" },
      { label: "调试与启动运行", text: "从冷态系统到稳定、达标的商业化生产" }
    ]
  } as Record<GatewayLocale, { label: string; text: string }[]>,
  diffEyebrow: { en: "WHAT MAKES US DIFFERENT", ar: "ما يميّزنا عن غيرنا", zh: "我们的独特优势" } as L,
  diffTitle: {
    en: "Four things that set Kafaah apart from every other consultancy.",
    ar: "أربعة أمور تميز كفاءة عن أي مكتب استشاري آخر.",
    zh: "让 Kafaah 在众多咨询机构中脱颖而出的四个核心支柱。"
  } as L,
  diffFeatures: {
    en: [
      { title: "Independent by Structure", desc: "We serve both project owners and EPC contractors — but never on opposite sides of the same project. When we take an engagement, our full accountability is to one client only." },
      { title: "Built Around Operations", desc: "Our expertise comes from inside operating plants, not from generic consulting frameworks. When we troubleshoot, we draw on real experience — not theoretical knowledge." },
      { title: "Chemical-Specific Depth", desc: "We specialize exclusively in inorganic acids and specialty fertilizers. We do not try to cover every industry — because depth of expertise matters more than breadth of portfolio." },
      { title: "Results Documented", desc: "We measure before and after. Our recommendations are backed by data, and our results are documented — because 'measured before and after' means more than any claim we could make." }
    ],
    ar: [
      { title: "الاستقلالية الهيكلية", desc: "نحن نخدم أصحاب المشاريع ومقاولي الـ EPC — ولكن ليس أبداً على طرفي نقيض في المشروع نفسه. عندما نقبل أي مهمة، فإن مسؤوليتنا الكاملة تكون تجاه عميل واحد فقط." },
      { title: "تأسست حول التشغيل", desc: "تأتي خبرتنا من داخل المصانع العاملة، وليس من أطر عمل استشارية عامة. عندما نقوم باستكشاف الأخطاء وإصلاحها، فإننا نعتمد على الخبرة الواقعية — وليس المعرفة النظرية." },
      { title: "العمق التخصصي الكيميائي", desc: "نحن متخصصون حصرياً في الأحماض غير العضوية والأسمدة الخاصة. لا نحاول تغطية كل صناعة — لأن عمق الخبرة أكثر أهمية من اتساع محفظة الأعمال." },
      { title: "النتائج الموثقة بالبيانات", desc: "نحن نقيس الأداء قبل وبعد عملنا. توصياتنا مدعومة بالبيانات، ونتائجنا موثقة — لأن مقياس 'قبل وبعد التعديل' يعني أكثر بكثير من أي ادعاء نطلقه." }
    ],
    zh: [
      { title: "结构上高度独立", desc: "我们既服务于项目业主，也服务于 EPC 承包商——但绝不会在同一个项目中同时代表利益对立的两方。一旦我们接受委任，我们将对单一客户履行全部责任。" },
      { title: "以现场运营为本", desc: "我们的专业知识提炼于正常运转的工厂内部，而非来自空泛 of 通用咨询框架。当我们排除故障时，我们依托的是实战经验——而非理论推导。" },
      { title: "精细化工 of 专精深度", desc: "我们仅专注于无机酸与特种肥料领域。我们不谋求涵盖所有行业——因为专业深度远比业务范围的宽泛更加关键。" },
      { title: "结果有据可查", desc: "我们坚持进行实施前后的数据比对。我们的所有建议均有客观数据支持，成果皆有案可查——因为“前后的实际数据对比”胜过一切空洞的承诺。" }
    ]
  } as Record<GatewayLocale, { title: string; desc: string }[]>,
  workEyebrow: { en: "HOW WE WORK", ar: "طريقة عملنا", zh: "工作模式" } as L,
  workTitle: {
    en: "One project. One client. No conflicts.",
    ar: "مشروع واحد. عميل واحد. بدون تضارب مصالح.",
    zh: "单一项目，单一客户，绝无利益冲突。"
  } as L,
  workP1: {
    en: "Kafaah works alongside both project owners and EPC contractors — bringing independent technical expertise to whichever side we represent. Each engagement has one client, one scope, and full accountability.",
    ar: "تعمل كفاءة جنباً إلى جنب مع كل من أصحاب المشاريع ومقاولي الـ EPC — جالبةً الخبرة الفنية المستقلة للطرف الذي نمثله. كل مشروع نلتزم به يتميز بوجود عميل واحد، نطاق عمل واحد، ومسؤولية كاملة.",
    zh: "Kafaah 既能与项目业主并肩作战，也能为 EPC 承包商提供强力支撑——为我们代表的任意一方引入完全独立的专业技术力量。每一次合作都包含明确的客户、专注的范围以及百分之百的责任履行。"
  } as L,
  workP2: {
    en: "We never represent both sides on the same project simultaneously. When we work for an owner, we work for the owner alone. When we support an EPC contractor, our accountability is to them alone.",
    ar: "لا نمثل كلا الطرفين في المشروع نفسه في وقت واحد مطلقاً. عندما نعمل لصالح المالك، نعمل من أجل المالك وحده. وعندما ندعم مقاول الـ EPC، فإن مسؤوليتنا الكاملة تكون تجاهه وحده.",
    zh: "We never represent both sides on the same project simultaneously. When we work for an owner, we work for the owner alone. When we support an EPC contractor, our accountability is to them alone."
  } as L,
  workQuote: {
    en: "This isn't just a policy — it's the foundation of the independent advice you're paying for.",
    ar: "هذه ليست مجرد سياسة متبعة — بل هي الأساس للاستشارة الفنية المستقلة التي تدفع مقابل الحصول عليها.",
    zh: "这不仅仅是一项准则——更是您所付费获取的独立客观建议的坚实基石。"
  } as L,
  workOwnersTitle: { en: "FOR PROJECT OWNERS", ar: "لأصحاب المشاريع", zh: "面向项目业主" } as L,
  workOwnersDesc: {
    en: "Independent technical oversight that protects your investment — from design review through operational handover. We act as your dedicated technical representative throughout the project.",
    ar: "إشراف فني مستقل يحمي استثمارك — من مراجعة التصاميم وحتى التسليم التشغيلي الفعلي. نحن نعمل كممثل فني مخصص لك طوال فترة المشروع.",
    zh: "独立的工程技术监督，全力保障您的项目投资——从最初的设计审查直至最终的装置运营交接。我们在整个项目周期中充当您专属的技术护航代表。"
  } as L,
  workEpcTitle: { en: "FOR EPC CONTRACTORS", ar: "لمقاولي الـ EPC", zh: "面向 EPC 承包商" } as L,
  workEpcDesc: {
    en: "Specialist commissioning and startup support that closes the gap between mechanical completion and reliable, steady-state operations. We embed in your team with the operational depth you need.",
    ar: "دعم تشغيل وتجريب متخصص يسد الفجوة بين الاكتمال الميكانيكي والتشغيل الموثوق والمستقر. نحن نندمج في فريقك لنمنحه العمق التشغيلي الذي تحتاج إليه.",
    zh: "专业的系统调试与启动技术支持，弥合机械竣工与装置稳定、可靠运行之间的鸿沟。我们融入您的项目团队，为您提供亟需的现场深层运营能力。"
  } as L,
  domainEyebrow: { en: "OUR DOMAIN", ar: "مجالات تخصصنا", zh: "专业领域" } as L,
  domainTitle: {
    en: "Industrial Processes We've Operated, Commissioned & Optimized",
    ar: "العمليات الصناعية التي قمنا بتشغيلها وتجريبها وتحسين أدائها",
    zh: "我们曾亲自操作、调试和优化的工业流程"
  } as L,
  domainSub: {
    en: "We work exclusively in the inorganic chemical and fertilizer space. This is not a limitation — it is a deliberate choice that ensures every client gets engineers who know their plant inside out.",
    ar: "نحن نعمل حصرياً في قطاع الأسمدة والكيماويات غير العضوية. هذا ليس قيداً — بل هو خيار مدروس يضمن حصول كل عميل على مهندسين يعرفون مصانعهم وتفاصيلها من الداخل والخارج.",
    zh: "我们专门服务于无机化工和化肥行业。这并非是局限性——而是一种深思熟虑的选择，旨在确保每一位客户都能获得彻底洞悉其工厂细节的实战型工程师的支持。"
  } as L,
  domainCards: {
    en: [
      { formula: "H₂SO₄", title: "SULFURIC ACID", desc: "From sulfur burning and converter systems to absorption and emission control — complete sulfuric acid plant experience." },
      { formula: "H₃PO₄", title: "PHOSPHORIC ACID", desc: "Wet process across dihydrate and hemihydrate routes, from reactor systems to filtration, concentration, and purification." },
      { formula: "K₂SO₄", title: "SULFATE OF POTASH", desc: "Mannheim process and double salt route — including successful SOP commissioning and operational stabilization." },
      { formula: "NPK", title: "NPK FERTILIZERS", desc: "Complete granulation and finishing lines — blending, coating, quality control, and performance testing." },
      { formula: "MgSO₄", title: "MAGNESIUM SULPHATE", desc: "Epsomite production across technical and agricultural grades — from commissioning through stable continuous operation." },
      { formula: "SSP", title: "SINGLE SUPERPHOSPHATE", desc: "Acidulation, curing, granulation, and storage — complete startup and performance optimization support." }
    ],
    ar: [
      { formula: "H₂SO₄", title: "حمض الكبريتيك", desc: "من حرق الكبريت وأنظمة المحولات إلى امتصاص التحكم في الانبعاثات — خبرة كاملة في مصانع حمض الكبريتيك." },
      { formula: "H₃PO₄", title: "حمض الفوسفوريك", desc: "العملية الرطبة عبر مساري ثنائي الهيدرات ونصف الهيدرات، من أنظمة المفاعلات إلى الفلترة والتركيز والنقاء." },
      { formula: "K₂SO₄", title: "كبريتات البوتاسيوم", desc: "طريقة فرن مانهايم ومسار الملح المزدوج — بما في ذلك تشغيل كبريتات البوتاسيوم بنجاح والاستقرار التشغيلي لها." },
      { formula: "NPK", title: "الأسمدة المركبة NPK", desc: "خطوط التحبيب والتشطيب الكاملة — الخلط، والطلاء، ومراقبة الجودة، واختبارات الأداء." },
      { formula: "MgSO₄", title: "كبريتات المغنيسيوم", desc: "إنتاج الإبسوميت (ملح إنجليزي) للدرجات الفنية والزراعية — من بدء التشغيل والتشغيل المستمر والمستقر." },
      { formula: "SSP", title: "سوبر فوسفات أحادي", desc: "المعالجة بالحمض، والتعتيق، والتحبيب، والتخزين — دعم كامل لبدء التشغيل وتحسين الأداء." }
    ],
    zh: [
      { formula: "H₂SO₄", title: "硫酸", desc: "从硫磺燃烧与转化器系统，到吸收与尾气排放控制——拥有硫酸工厂全套深厚的系统运营经验。" },
      { formula: "H₃PO₄", title: "磷酸", desc: "涵盖二水法与半水法的湿法工艺，从反应器系统到过滤、浓缩及精制净化流程。" },
      { formula: "K₂SO₄", title: "硫酸钾", desc: "曼海姆工艺与双盐路线——包括多次成功的硫酸钾（SOP）系统调试与装置稳定化运行。" },
      { formula: "NPK", title: "氮磷钾复合肥", desc: "完整的造粒与后处理成品线——涵盖掺混、涂膜包衣、全面质控与整线性能测试。" },
      { formula: "MgSO₄", title: "硫酸镁", desc: "涉及工业级与农业级的泻利盐生产——提供从系统调试直至稳定连续商业运行的全程服务。" },
      { formula: "SSP", title: "普通过磷酸钙", desc: "酸解酸化、熟化化解、造粒以及仓储物流——提供成熟 of 启动运行与产量优化技术支持。" }
    ]
  } as Record<GatewayLocale, { formula: string; title: string; desc: string }[]>,
  domainClosing: {
    en: "If your plant is on this list, we've been inside one just like it — and we know where the problems hide.",
    ar: "إذا كان مصنعك مدرجاً في هذه القائمة، فقد عملنا داخل مصنع مماثل تماماً له — ونحن نعرف جيداً أين تكمن المشكلات.",
    zh: "如果您的装置属于上述工艺，那么我们必然曾身处同样的车间之中——并且，我们极具针对性地深知故障的隐蔽所在。"
  } as L,
  ctaTitle: {
    en: "Ready to discuss",
    ar: "هل أنت مستعد",
    zh: "准备好探讨"
  } as L,
  ctaTitleAccent: {
    en: "your project?",
    ar: "لمناقشة مشروعك؟",
    zh: "您的项目了吗？"
  } as L,
  ctaDesc: {
    en: "Let's talk about where your project stands — and where Kafaah can provide the technical support it needs.",
    ar: "دعنا نتحدث عن تقدم سير مشروعك حالياً — وكيف يمكن لكفاءة تقديم الدعم الفني اللازم له.",
    zh: "让我们开诚布公地聊聊您项目的当前进展——以及 Kafaah 如何为其注入所需的高价值技术支持。"
  } as L,
  btnContact: { en: "CONTACT KAFAAH", ar: "اتصل بكفاءة", zh: "联系 KAFAAH" } as L,
  btnServices: { en: "VIEW OUR SERVICES", ar: "عرض خدماتنا", zh: "浏览我们的服务" } as L,

};

export const technologiesPage = {
  pageTitle: { en: "Technologies", ar: "التقنيات", zh: "技术" } as L,
  heroEyebrow: { en: "TECHNICAL CAPABILITIES", ar: "القدرات الفنية", zh: "技术实力" } as L,
  heroTitle: {
    en: "Six industrial processes. Decades of operational command.",
    ar: "ست عمليات صناعية. عقود من الريادة والقيادة التشغيلية.",
    zh: "六大工业流程。数十年的现场运营掌控。"
  } as L,
  heroDesc: {
    en: "We specialize exclusively in the chemical processes we have operated, commissioned, and optimized. We do not work from a distance — we deliver operational clarity where mechanical and chemical complexity is highest.",
    ar: "نحن نتخصص حصرياً في العمليات الكيميائية التي قمنا بتشغيلها وتجريبها وتحسين كفاءتها. لا نقدم استشاراتنا عن بعد — بل نضمن الوضوح التشغيلي حيث تبلغ التعقيدات الميكانيكية والكيميائية ذروتها.",
    zh: "我们专注于我们亲自操作、调试和优化过的化学工艺。我们绝非置身事外——我们在机械与化学复杂性最高的环节，为您带来清晰明确的现场运营掌控力。"
  } as L,
  chemistryLabel: { en: "Main Chemistry", ar: "التفاعلات الكيميائية الأساسية", zh: "核心化学反应" } as L,
  equipmentLabel: { en: "Primary Systems", ar: "الأنظمة والمعدات الرئيسية", zh: "主要工艺系统" } as L,
  challengesLabel: { en: "Critical Startup Gates", ar: "مراحل بدء التشغيل الحرجة", zh: "启动运行关键点" } as L,
  experienceLabel: { en: "Kafaah Handprint", ar: "خبرة كفاءة الميدانية", zh: "Kafaah 现场实绩" } as L,
  exploreBtn: { en: "EXPLORE DETAILED PROFILE", ar: "عرض الملف التقني التفصيلي", zh: "浏览详细技术档案" } as L,
  articles: {
    en: [
      {
        id: "1",
        title: "Why EPC Handover is the Most Critical Phase of Your Plant",
        category: "Commissioning",
        date: "April 2026",
        excerpt:
          "The gap between 'mechanically complete' and 'operationally viable' is where most investors lose money. How an Owner's Engineer bridges this gap.",
        content: `## The EPC Handover Gap: From Steel to Synergy

Many investors assume that when an Engineering, Procurement, and Construction (EPC) contractor declares a plant "mechanically complete," the facility is ready to produce chemical output. This is a costly misconception. The gap between mechanical completion and stable operation is where projects succeed or fail.

### Suez & Yanbu Case Studies

In our commissioning work at Suez (magnesium sulphate) and Yanbu (NPK and phosphoric acid plants), we identified key systemic errors in the transitional phase:

1. **Pre-commissioning Checklist Oversights**: Piping loop checks, hydrostatic tests, and instrument calibrations must be independently verified by an Owner's Engineer, rather than solely relying on the EPC contractor's self-certification.
2. **Operations Readiness (OR) Integration**: Operations staff must be integrated during the late construction phase to ensure proper hand-on training and ownership transfer.

### Key EPC Handover Checkpoints

* **Punch List Management**: Categorizing deficiencies into Category A (must resolve before startup) and Category B (can resolve post-startup).
* **Performance Guarantee Runs (PGR)**: Validating specific raw material consumption rates, utility usage, and product specifications over continuous 72-hour test windows under nominal load.`,
      },
      {
        id: "2",
        title: "Common Pitfalls in Mannheim Furnace Refractory Curing",
        category: "Technical Troubleshooting",
        date: "March 2026",
        excerpt:
          "Incorrect curing of the SOP furnace refractory leads to premature failure and costly downtime. We review the standard procedure and where it usually goes wrong.",
        content: `## Mannheim Furnace Refractory: Curing to Prevent Failure

Mannheim furnaces operate at extreme temperatures (500°C to 650°C) with highly corrosive reactants (potassium chloride and sulfuric acid producing potassium sulfate and hydrochloric acid gas). The silica brick and high-alumina refractory lining inside the furnace chamber are critical assets. Proper curing during the initial heating phase determines whether the bricks will survive years of operation or crack within months.

### The Curing Curve

Refractory curing requires a precise thermal schedule to drive off free water first, and then chemically bound water.

* **Ambient to 110°C**: Rate not exceeding 10°C/hr. Hold at 110°C for 24 hours to evaporate free moisture.
* **110°C to 350°C**: Rate not exceeding 15°C/hr. Hold at 350°C for 18 hours to release bound water without creating internal steam pressure.
* **350°C to Operating Temp (approx. 550°C)**: Rate of 20°C/hr. Hold at operating temperature for 24 hours for thermal equilibrium.

### Common Failures in the Field

In multiple troubleshooting interventions, we discovered operators accelerating the curing curve to meet construction deadlines. This causes "spalling"—where trapped moisture vaporizes into high-pressure steam, cracking the bricks from within. Our team enforces certified digital temperature monitoring and independent gas burner calibration to prevent refractory failures.`,
      },
      {
        id: "3",
        title: "Optimizing NPK Granulation for High Ambient Humidity",
        category: "Production Optimization",
        date: "February 2026",
        excerpt:
          "Operating a granulation plant in the Gulf or Red Sea coast requires specific operational adjustments to maintain product quality and avoid caking.",
        content: `## NPK Granulation in High Ambient Humidity: Challenges and Control

NPK (Nitrogen, Phosphorus, Potassium) compound fertilizer granulation is highly sensitive to humidity. In coastal regions with high ambient humidity, such as the Gulf or Red Sea coasts, fertilizer salts absorb atmospheric moisture rapidly. This makes the material sticky, leading to build-up in the drum granulator, screen clogging, and product caking in storage silos.

### Thermodynamics of Salt Hydration

Every NPK formulation has a Critical Relative Humidity (CRH). If the ambient air's relative humidity exceeds the CRH, the fertilizer will actively absorb moisture. In coastal zones, ambient humidity regularly exceeds 80%, while NPK formulas containing urea and ammonium nitrate can have a CRH as low as 55-60%.

### Operational Tricks to Avoid Caking

1. **Optimizing Recycle Ratio**: Increasing the recycle ratio of dry, cool fines to the granulator buffer zone helps to absorb raw material moisture fluctuations.
2. **Controlling Dryer Exhaust Air Temp**: Raising exhaust air temperature from the dryer drum to ensure internal grain moisture is strictly below 1.0%.
3. **Post-Treatment Coating**: Applying high-quality anti-caking agent (oil-wax-dust coating) immediately after cooling to create a hydrophobic barrier on granules.`,
      },
    ]
  },
  
  h2so4: {
    title: { en: "Sulfuric Acid — H₂SO₄", ar: "حمض الكبريتيك — H₂SO₄", zh: "硫酸 — H₂SO₄" } as L,
    sub: {
      en: "Catalytic conversion, double absorption (DCDA), heat recovery, and mist control.",
      ar: "الأكسدة الحفزية، الامتصاص المزدوج (DCDA)، استعادة الطاقة الحرارية، والتحكم في ضباب الحمض.",
      zh: "催化转化、双转双吸 (DCDA)、余热回收及酸雾控制。"
    } as L,
    chemistry: {
      en: "S + O₂ → SO₂ | Catalytic conversion: SO₂ + ½O₂ ⇌ SO₃ over V₂O₅ catalyst beds | Absorption: SO₃ + H₂O → H₂SO₄",
      ar: "S + O₂ → SO₂ | الأكسدة الحفزية: SO₂ + ½O₂ ⇌ SO₃ فوق أسِرّة عامل حفاز V₂O₅ | الامتصاص: SO₃ + H₂O → H₂SO₄",
      zh: "S + O₂ → SO₂ | 催化转化: V₂O₅ 催化床层上 SO₂ + ½O₂ ⇌ SO₃ | 吸收: SO₃ + H₂O → H₂SO₄"
    } as L,
    equipment: {
      en: "Sulfur burning furnace, waste heat boilers, 4-pass catalytic converter vessel, interpass & final absorption towers, concentrated acid circulation pumps, plate & frame acid coolers.",
      ar: "فرن حرق الكبريت، غلايات استعادة الحرارة المفقودة، وعاء المحول الحفزي ذو الأربع مراحل، أبراج الامتصاص البيني والنهائي، مضخات تدوير الحمض المركز، مبردات الحمض ذات الصفائح والإطار.",
      zh: "硫磺燃烧炉、余热锅炉、四段催化转化器、中间与终点吸收塔、浓酸循环泵、板式酸冷却器。"
    } as L,
    challenges: {
      en: "Refractory heat-up profiles, catalyst temperature management (avoiding cold bypass or catalyst sintering), acid concentration control (preventing absorption bypass), and gas dew point prevention.",
      ar: "منحنيات تسخين الطوب الحراري، إدارة درجات حرارة العامل الحفاز (تجنب الالتفاف البارد أو تلبيد الحفاز)، التحكم في تركيز الحمض (منع التفاف الامتصاص)، وتجنب نقطة ندى الغاز.",
      zh: "耐火材料升温曲线、催化剂温度管理（避免低温旁路或催化剂烧结）、酸浓度控制（防止吸收旁路）、防止气体露点结露。"
    } as L,
    experience: {
      en: "Over 20 years of direct operation and commissioning of contact process plants across Egypt and the Middle East, resolving catalytic conversion bottlenecks and reducing emissions.",
      ar: "أكثر من 20 عاماً من التشغيل المباشر وتجريب تشغيل مصانع العمليات التلامسية في مصر والشرق الأوسط، وحل اختناقات التحويل الحفزي وتقليل الانبعاثات.",
      zh: "在埃及和中东地区拥有超过 20 年的接触法装置直接运营和调试经验，成功解决催化转化瓶颈并降低排放。"
    } as L,
  },

  h3po4: {
    title: { en: "Phosphoric Acid — H₃PO₄", ar: "حمض الفوسفوريك — H₃PO₄", zh: "磷酸 — H₃PO₄" } as L,
    sub: {
      en: "Wet process dihydrate/hemihydrate reaction, tilting pan/belt filtration, and vacuum evaporation.",
      ar: "تفاعل العملية الرطبة ثنائي الهيدرات/نصف الهيدرات، فلترة الفلاتر الدوارة/الأحزمة، والتبخير تحت تفريغ الهواء.",
      zh: "湿法二水物/半水物反应、翻盘式/带式过滤及真空蒸发。"
    } as L,
    chemistry: {
      en: "Ca₅(PO₄)₃F + 5H₂SO₄ + 10H₂O → 3H₃PO₄ + 5CaSO₄·2H₂O (Gypsum) + HF",
      ar: "Ca₅(PO₄)₃F + 5H₂SO₄ + 10H₂O → 3H₃PO₄ + 5CaSO₄·2H₂O (الجبس) + HF",
      zh: "Ca₅(PO₄)₃F + 5H₂SO₄ + 10H₂O → 3H₃PO₄ + 5CaSO₄·2H₂O (石膏) + HF"
    } as L,
    equipment: {
      en: "Agitated multi-compartment reactors, vacuum flash coolers, rotary tilting pan filters, multi-stage forced circulation vacuum evaporators, fluorine scrubbing and recovery units.",
      ar: "مفاعلات مجهزة بمحرك وخلاطات متعددة الحجرات، مبردات تفريغ الهواء المفاجئة، فلاتر الفلاتر الدوارة المائلة، مبخرات تفريغ الهواء ذات الدوران القسري متعددة المراحل، وحدات غسيل واستعادة الفلور.",
      zh: "搅拌式多格反应器、真空闪蒸冷却器、旋转翻盘式过滤器、多效强制循环真空蒸发器、氟洗涤与回收装置。"
    } as L,
    challenges: {
      en: "Gypsum crystallization control (crystal size distribution directly dictates filtration speed), scale prevention (silicofluorides and calcium sulfate deposits) in evaporators, rock slurry density optimization.",
      ar: "التحكم في بلورة الجبس (توزيع حجم البلورات يحدد بشكل مباشر سرعة الفلترة)، منع التكلس (ترسبات السليكوفلوريد وكبريتات الكالسيوم) في المبخرات، وتحسين كثافة ملاط الصخور.",
      zh: "石膏结晶控制（晶体粒径分布直接决定过滤速度）、蒸发器防垢（氟硅酸盐和硫酸钙沉积）、矿浆浓度优化。"
    } as L,
    experience: {
      en: "Expertise in optimizing reactor slurry chemistry, improving gypsum washing efficiency to minimize P₂O₅ loss, and implementing highly effective chemical cleaning (descaling) schedules.",
      ar: "خبرة واسعة في تحسين كيمياء ملاط المفاعل، تحسين كفاءة غسيل الجبس لتقليل فقد P₂O₅، وتطبيق جداول تنظيف كيميائي (إزالة التكلس) عالية الفعالية.",
      zh: "在优化反应器浆料化学性质、提高石膏洗涤效率以最大程度减少 P₂O₅ 损失、以及实施高效的化学清洗（除垢）计划方面拥有丰富经验。"
    } as L,
  },

  k2so4: {
    title: { en: "Sulfate of Potash (SOP) — K₂SO₄", ar: "كبريتات البوتاسيوم (SOP) — K₂SO₄", zh: "硫酸钾 (SOP) — K₂SO₄" } as L,
    sub: {
      en: "Mannheim muffle furnace process, high-temperature reaction, and gaseous HCl absorption.",
      ar: "عملية فرن مانهايم غير المباشر، التفاعل عند درجات حرارة مرتفعة، وامتصاص غاز كلوريد الهيدروجين.",
      zh: "曼海姆炉工艺、高温反应及气态 HCl 吸收。"
    } as L,
    chemistry: {
      en: "2KCl + H₂SO₄ → K₂SO₄ + 2HCl (Endothermic reaction at 600°C–700°C inside the furnace muffle)",
      ar: "2KCl + H₂SO₄ → K₂SO₄ + 2HCl (تفاعل ماص للحرارة عند 600-700 درجة مئوية داخل تجويف الفرن)",
      zh: "2KCl + H₂SO₄ → K₂SO₄ + 2HCl (炉膛内 600°C–700°C 下的吸热反应)"
    } as L,
    equipment: {
      en: "Mannheim muffle furnaces, central drive rabble arms with high-alloy mixing teeth, HCl gas cooling ducts, adiabatic HCl absorption towers, product cooling drums, screening & compaction units.",
      ar: "أفران مانهايم، أذرع خلط مركزية ذات أسنان خلط مصنوعة من سبائك عالية التحمل، قنوات تبريد غاز HCl، أبراء امتصاص HCl الأديباتية، أسطوانات تبريد المنتج، وحدات الغربلة والكبس.",
      zh: "曼海姆炉、带高合金搅拌齿的的中心传动耙臂、HCl 气体冷却管道、绝热 HCl 吸收塔、产品冷却滚筒、筛分与造粒挤压机。"
    } as L,
    challenges: {
      en: "Mannheim furnace refractory curing (demanding 10+ days precise ramp), rabble arm mechanical alignment at high temperatures, maintaining furnace draft balance, handling hot, highly corrosive HCl gases.",
      ar: "معالجة طوب أفران مانهايم الحراري (تتطلب تسخيناً دقيقاً لأكثر من 10 أيام)، محاذاة أذرع الخلط ميكانيكياً عند درجات حرارة مرتفعة، الحفاظ على توازن سحب الهواء بالفرن، والتعامل مع غازات HCl الساخنة وشديدة التآكل.",
      zh: "曼海姆炉耐火材料烘炉（需 10 天以上精确升温）、高温下耙臂机械对中、维持炉膛负压平衡、处理高温且高腐蚀性的 HCl 气体。"
    } as L,
    experience: {
      en: "Successfully commissioned a 40,000 T/yr SOP plant in Suez, Egypt (Nov 2025 – Jan 2026), supervising refractory curing, furnace first fire, HCl absorption setup, and final product quality stabilization.",
      ar: "تم بنجاح تشغيل مصنع كبريتات البوتاسيوم بطاقة 40,000 طن/سنة في السويس، مصر (نوفمبر 2025 - يناير 2026)، والإشراف على معالجة الطوب الحراري، أول إشعال للفرن، إعداد امتصاص HCl، وتثبيت جودة المنتج النهائي.",
      zh: "在埃及苏伊士成功调试了一套年产 4 万吨的硫酸钾装置（2025年11月 – 2026年1月），指导耐火材料烘炉、烘窑、炉窑点火、HCl 吸收装置安装以及最终产品质量稳定化。"
    } as L,
  },

  npk: {
    title: { en: "NPK Compound Fertilizers", ar: "الأسمدة المركبة NPK", zh: "氮磷钾复合肥" } as L,
    sub: {
      en: "Pipe reactor/pre-neutralizer drum granulation, rotary drying, and multi-stage classification.",
      ar: "تحبيب أسطوانة المفاعل الأنبوبي/المعادل المسبق، التجفيف الدوار، والتصنيف متعدد المراحل للحبوب.",
      zh: "管式反应器/前段中和器鼓式造粒、回转干燥及多级分级。"
    } as L,
    chemistry: {
      en: "NH₃ + H₃PO₄ → NH₄H₂PO₄ | NH₃ + HNO₃ → NH₄NO₃ | Mixing of solid KCl / K₂SO₄ and filler elements",
      ar: "NH₃ + H₃PO₄ → NH₄H₂PO₄ | NH₃ + HNO₃ → NH₄NO₃ | خلط أملاح KCl / K₂SO₄ الصلبة وعناصر الملء",
      zh: "NH₃ + H₃PO₄ → NH₄H₂PO₄ | NH₃ + HNO₃ → NH₄NO₃ | 固体 KCl / K₂SO₄ 及填充元素的混合"
    } as L,
    equipment: {
      en: "Rotary drum granulators, pipe reactors (cross-pipe designs), co-current rotary dryers, vibrating double-deck screens, counter-current rotary coolers, coating drums, scrubbing systems (cyclones and venturi).",
      ar: "محصنات التحبيب الدوارة، المفاعلات الأنبوبية (تصميم الأنبوب المتقاطع)، مجففات دوارة ذات تدفق مشترك، غربال اهتزازي ذو طابقين، مبردات دوارة ذات تدفق معاكس، أسطوانات الطلاء، وأنظمة الغسيل (الأعاصير وفينتوري).",
      zh: "回转转鼓造粒机、管式反应器（对喷管式设计）、并流回转干燥机、双层振动筛、逆流回转冷却器、包衣滚筒、洗涤系统（旋风分离器和文丘里洗涤器）。"
    } as L,
    challenges: {
      en: "Establishing optimal recycle-to-feed ratio during startup, granule moisture control, temperature limits to prevent ammonium nitrate decomposition, dryer burner tuning, screening efficiency.",
      ar: "تحديد النسبة المثلى للمواد المعاد تدويرها إلى التغذية أثناء بدء التشغيل، التحكم في رطوبة الحبيبات، حدود درجة الحرارة لمنع تحلل نترات الأمونيوم، ضبط حارق المجفف، وكفاءة الغربلة.",
      zh: "启动期间建立最佳的返料与给料比、颗粒水分控制、防止硝酸铵分解的的温度限制、干燥机燃烧器调节、筛分效率。"
    } as L,
    experience: {
      en: "Successfully commissioned an NPK granulation unit in Yanbu Industrial City, Saudi Arabia (March 2026), establishing recycle balances, adjusting pipe reactor steam injection, and stabilizing granule yields.",
      ar: "تم بنجاح تجريب تشغيل وحدة تحبيب NPK في مدينة ينبع الصناعية، المملكة العربية السعودية (مارس 2026)، وتحديد توازنات إعادة التدوير، وضبط حقن البخار في المفاعل الأنبوبي، وتثبيت إنتاجية الحبيبات.",
      zh: "在沙特阿拉伯延布工业城成功调试了一套 NPK 造粒装置（2026年3月），建立返料平衡、调整管式反应器蒸汽喷射并稳定颗粒收率。"
    } as L,
  },

  mgso4: {
    title: { en: "Magnesium Sulphate — MgSO₄", ar: "كبريتات المغنيسيوم — MgSO₄", zh: "硫酸镁 — MgSO₄" } as L,
    sub: {
      en: "Acid-base neutralization, vacuum crystallization, centrifugation, and fluid bed drying.",
      ar: "التعادل الحمضي القاعدي، البلورة تحت تفريغ الهواء، الطرد المركزي، والتجفيف بالطبقة المميعة.",
      zh: "酸碱中和、真空结晶、离心分离及流化床干燥。"
    } as L,
    chemistry: {
      en: "MgO + H₂SO₄ + 6H₂O → MgSO₄·7H₂O (Epsomite / Epsom salt crystallization)",
      ar: "MgO + H₂SO₄ + 6H₂O → MgSO₄·7H₂O (بلورة الإبسومات / ملح إنجليزي)",
      zh: "MgO + H₂SO₄ + 6H₂O → MgSO₄·7H₂O (泻利盐/泻盐结晶)"
    } as L,
    equipment: {
      en: "Neutralization reactor tanks with agitators, settler clarifiers, vacuum crystallizers / cooling crystallizers, continuous pusher centrifuges, fluid-bed dryers and product coolers.",
      ar: "خزانات مفاعل التعادل مع خلاطات، مجاري الترسيب والتوضيح، مبلورات تفريغ الهواء / مبلورات التبريد، أجهزة الطرد المركزي ذات الدفع المستمر، مجففات ومبردات الطبقة المميعة.",
      zh: "带搅拌的中和反应釜、沉降澄清槽、真空结晶器/冷却结晶器、连续活塞推料离心机、流化床干燥器及产品冷却器。"
    } as L,
    challenges: {
      en: "Crystallization cooling curves control (critical for uniform grain size), preventing product caking and lump formation during centrifuging, optimizing fluid bed dryer inlet temperatures to prevent dehydration.",
      ar: "التحكم في منحنيات تبريد البلورة (مهم جداً للحصول على حجم حبيبات موحد)، منع تكتل المنتج وتشكيل الكتل أثناء الطرد المركزي، وتحسين درجات حرارة مدخل مجفف الطبقة المميعة لمنع فقدان ماء التبلور.",
      zh: "结晶冷却曲线控制（对于均匀粒径至关重要）、防止离心过程中产品结块和成团、优化流化床干燥器入口温度以防止脱水。"
    } as L,
    experience: {
      en: "Operational expertise in adjusting crystallization residence times, resolving centrifuge salt moisture bottlenecks, and setting up multi-grade (technical and agricultural) processes.",
      ar: "خبرة تشغيلية في ضبط أوقات بقاء المواد في المبلورات، حل اختناقات رطوبة ملح أجهزة الطرد المركزي، وإعداد عمليات لدرجات متعددة (الفنية والزراعية).",
      zh: "在调整结晶停留时间、解决离心机盐水分瓶颈、以及配置多级（工业级和农业级）工艺流程方面拥有深厚的现场运营经验。"
    } as L,
  },

  ssp: {
    title: { en: "Single Superphosphate — SSP", ar: "سوبر فوسفات أحادي — SSP", zh: "普通过邻酸钙 — SSP" } as L,
    sub: {
      en: "Phosphate rock acidulation, continuous den curing, and aging stabilization.",
      ar: "معالجة صخور الفوسفات بالحمض، التعتيق المستمر في حجرات خاصة، وتثبيت وتعتيق المنتج.",
      zh: "磷矿石酸解、连续化熟化及老化稳定。"
    } as L,
    chemistry: {
      en: "2Ca₅(PO₄)₃F + 7H₂SO₄ + 3H₂O → 3Ca(H₂PO₄)₂·H₂O + 7CaSO₄ + 2HF",
      ar: "2Ca₅(PO₄)₃F + 7H₂SO₄ + 3H₂O → 3Ca(H₂PO₄)₂·H₂O + 7CaSO₄ + 2HF",
      zh: "2Ca₅(PO₄)₃F + 7H₂SO₄ + 3H₂O → 3Ca(H₂PO₄)₂·H₂O + 7CaSO₄ + 2HF"
    } as L,
    equipment: {
      en: "Phosphate rock roller mills, paddle mixers (acidulators), continuous conveyor curing dens, aging/curing shed excavators, rotary granulator drums, venturi gas scrubbers.",
      ar: "طواحين صخور الفوسفات الأسطوانية، خلاطات ذات ريش (معالجة بالحمض)، سيور تعتيق مستمرة، حفارات عنابر التعتيق، أسطوانات التحبيب الدوارة، غسالات غاز فينتوري.",
      zh: "磷矿辊式磨机、桨叶式混合器（酸解器）、连续输送熟化仓、熟化库挖掘机、回转造粒转鼓、文丘里气体洗涤器。"
    } as L,
    challenges: {
      en: "Acidulation ratio monitoring (excess H₂SO₄ makes the den product sticky mud, insufficient acid leaves rock unreacted), managing curing pile thermics, gas ventilation & fluorine recovery.",
      ar: "مراقبة نسبة المعالجة بالحمض (زيادة H₂SO₄ تحول منتج الحجرة إلى طين لزج، ونقص الحمض يترك الصخور دون تفاعل)، إدارة حراريات كومة التعتيق، تهوية الغاز واستعادة الفلور.",
      zh: "酸解配比监控（过量 H₂SO₄ 会使熟化仓物料变成粘稠泥状，酸不足则会使矿石未反应）、管理熟化堆温、气体通风与氟回收。"
    } as L,
    experience: {
      en: "Deep history in upgrading curing den configurations, optimizing acid concentration, and successfully converting cured SSP powder into high-quality granular fertilizer.",
      ar: "تاريخ طويل في ترقية تكوينات حجرات التعتيق، تحسين تركيز الحمض، والنجاح في تحويل مسحوق SSP المعتّق إلى سماد حبيبي عالي الجودة.",
      zh: "在升级熟化仓配置、优化酸浓度、以及成功将熟化后的 SSP 粉末转化为优质颗粒肥料方面拥有深厚业绩。"
    } as L,
  },
};

export const experiencePage = {
  pageTitle: { en: "Experience", ar: "الخبرات", zh: "经验" } as L,
  completedProjects: { en: "Completed Projects", ar: "المشاريع المُنجزة", zh: "已完成项目" } as L,
  background: { en: "Background", ar: "الخلفية", zh: "背景" } as L,
  techCovered: { en: "Technologies Covered", ar: "التقنيات المُغطّاة", zh: "涵盖的技术" } as L,
  geoFootprint: { en: "Geographic Footprint", ar: "الانتشار الجغرافي", zh: "地理足迹" } as L,
  discussProject: { en: "Discuss your project with our team.", ar: "ناقش مشروعك مع فريقنا.", zh: "与我们的团队讨论您的项目。" } as L,
  location: { en: "Location", ar: "الموقع", zh: "位置" } as L,
  capacity: { en: "Capacity", ar: "الطاقة الإنتاجية", zh: "产能" } as L,
  outcome: { en: "Outcome", ar: "النتيجة", zh: "成果" } as L,
  milestone: { en: "Milestone", ar: "إنجاز بارز", zh: "里程碑" } as L,
  backgroundText: {
    en: "Beyond completed contracts, our team brings 20 years of direct operational experience across inorganic chemical and fertilizer facilities in Egypt and the region.",
    ar: "بخلاف العقود المكتملة، يمتلك فريقنا 20 عامًا من الخبرة التشغيلية المباشرة في منشآت الكيماويات غير العضوية والأسمدة في مصر والمنطقة.",
    zh: "除已完成的合同外，我们的团队还拥有在埃及及周边地区无机化工和化肥设施方面20年的直接运营经验。"
  } as L,
  geoList: {
    en: ["Egypt (Cairo, Suez)", "Saudi Arabia (Yanbu)", "Expanding MENA"],
    ar: ["مصر (القاهرة، السويس)", "السعودية (ينبع)", "توسع في الشرق الأوسط"],
    zh: ["埃及 (开罗, 苏伊士)", "沙特阿拉伯 (延布)", "扩展中的中东北非"]
  } as LArr,
  projects: {
    en: [
      {
        badge: "Commissioning & Startup",
        date: "November 2025 – January 2026",
        title: "Suez SOP Plant",
        tags: "K₂SO₄ · Mannheim Process · Chinese EPC",
        location: "Suez, Egypt",
        capacity: "40,000 T/yr",
        outcome: "First product achieved",
        desc: "Full commissioning from pre-startup to first product. Managed refractory curing, furnace first fire, HCl system startup, and product quality optimization. Both EPC contractor and plant owner expressed satisfaction with Kafaah's work.",
        hasMilestone: false,
      },
      {
        badge: "Granulation & Startup",
        date: "March 2026",
        title: "Yanbu Granulation Facility",
        tags: "NPK · Granulation · Saudi Arabia",
        location: "Yanbu Industrial City, KSA",
        milestone: "First GCC project",
        outcome: "On-schedule commissioning",
        desc: "Kafaah's first project in the Gulf region. NPK granulation unit commissioned on schedule, establishing our presence in the Saudi industrial market.",
        hasMilestone: true,
      }
    ],
    ar: [
      {
        badge: "التشغيل وبدء التشغيل",
        date: "نوفمبر 2025 – يناير 2026",
        title: "مصنع سلفات البوتاسيوم بالسويس",
        tags: "K₂SO₄ · عملية مانهايم · مقاول صيني",
        location: "السويس، مصر",
        capacity: "40,000 طن/سنة",
        outcome: "تم إنتاج أول منتج",
        desc: "تشغيل كامل من مرحلة ما قبل التشغيل إلى أول منتج. أدرنا معالجة الحراريات، وأول إشعال للفرن، وبدء تشغيل نظام HCl، وتحسين جودة المنتج. أعرب كل من مقاول EPC ومالك المصنع عن رضاهم عن عمل كفاءة.",
        hasMilestone: false,
      },
      {
        badge: "التحبيب وبدء التشغيل",
        date: "مارس 2026",
        title: "منشأة التحبيب بينبع",
        tags: "NPK · تحبيب · السعودية",
        location: "مدينة ينبع الصناعية، السعودية",
        milestone: "أول مشروع في دول الخليج",
        outcome: "تشغيل في الموعد المحدد",
        desc: "أول مشروع لشركة كفاءة في منطقة الخليج. تم تشغيل وحدة تحبيب NPK في الموعد المحدد، مما رسخ وجودنا في السوق الصناعية السعودية.",
        hasMilestone: true,
      }
    ],
    zh: [
      {
        badge: "调试与启动",
        date: "2025年11月 – 2026年1月",
        title: "苏伊士SOP工厂",
        tags: "K₂SO₄ · 曼海姆工艺 · 中国EPC",
        location: "埃及，苏伊士",
        capacity: "40,000 吨/年",
        outcome: "实现首批产品",
        desc: "从试运行前到首批产品的全面调试。管理耐火材料养护、熔炉首次点火、HCl系统启动和产品质量优化。EPC承包商和工厂所有者都对Kafaah的工作表示满意。",
        hasMilestone: false,
      },
      {
        badge: "造粒与启动",
        date: "2026年3月",
        title: "延布造粒设施",
        tags: "NPK · 造粒 · 沙特阿拉伯",
        location: "沙特，延布工业城",
        milestone: "首个海湾合作委员会项目",
        outcome: "按期调试",
        desc: "Kafaah在海湾地区的第一个项目。NPK造粒装置按期调试，确立了我们在沙特工业市场中的地位。",
        hasMilestone: true,
      }
    ]
  } as Record<GatewayLocale, any[]>
};

export const contactPage = {
  pageTitle: { en: "Contact", ar: "تواصل معنا", zh: "联系" } as L,
  letsTalk: { en: "Let's talk about your ", ar: "لنتحدّث عن ", zh: "让我们谈谈您的" } as L,
  letsTalkAccent: { en: "plant.", ar: "منشأتك.", zh: "工厂。" } as L,
  headquarters: { en: "Headquarters", ar: "المقر الرئيسي", zh: "总部" } as L,
  email: { en: "Email", ar: "البريد الإلكتروني", zh: "邮箱" } as L,
  fullName: { en: "Full Name", ar: "الاسم الكامل", zh: "全名" } as L,
  companyLabel: { en: "Company", ar: "الشركة", zh: "公司" } as L,
  workEmail: { en: "Work Email", ar: "البريد المهني", zh: "工作邮箱" } as L,
  serviceLabel: { en: "Service of Interest", ar: "الخدمة المطلوبة", zh: "感兴趣的服务" } as L,
  selectService: { en: "Select a service...", ar: "اختر خدمة...", zh: "选择服务..." } as L,
  messageLabel: { en: "Message", ar: "الرسالة", zh: "留言" } as L,
  submit: { en: "Submit Inquiry", ar: "إرسال الاستفسار", zh: "提交咨询" } as L,
  sending: { en: "Sending...", ar: "جارِ الإرسال...", zh: "发送中..." } as L,
  successTitle: { en: "Message Sent Successfully", ar: "تم إرسال الرسالة بنجاح", zh: "消息发送成功" } as L,
  successDesc: { en: "Thank you for reaching out. A specialist from our team will review your inquiry and respond within 24 hours.", ar: "شكرًا لتواصلك. سيقوم أحد متخصصينا بمراجعة استفسارك والرد خلال 24 ساعة.", zh: "感谢您的联系。我们团队的专家将审核您的咨询并在24小时内回复。" } as L,
  respondTime: { en: "We respond to all inquiries within 24 hours. Whether you need an Owner's Engineer, are facing a technical crisis, or need operators trained, we are ready to deploy.", ar: "نرد على جميع الاستفسارات خلال 24 ساعة. سواء كنت بحاجة إلى مهندس مالك، أو تواجه أزمة تقنية، أو تحتاج تدريب مشغّلين — نحن جاهزون.", zh: "我们在24小时内回复所有咨询。无论您需要业主工程师、面临技术危机还是需要操作员培训，我们随时准备部署。" } as L,
};

export const insightsPage = {
  pageTitle: { en: "Insights", ar: "رؤى", zh: "见解" } as L,
  knowledge: { en: "Knowledge", ar: "المعرفة", zh: "知识" } as L,
  subtitle: {
    en: "Technical perspectives on commissioning, operation, and optimization — drawn directly from the field.",
    ar: "رؤى تقنية حول التشغيل والعمليات والتحسين — مستمدّة مباشرة من الميدان.",
    zh: "关于调试、运营和优化的技术观点——直接源自现场经验。"
  } as L,
  readArticle: { en: "Read Article", ar: "اقرأ المقال", zh: "阅读文章" } as L,
  moreInsights: {
    en: "More insights and technical whitepapers are currently being compiled from our recent site work.",
    ar: "يجري حاليًا إعداد المزيد من المقالات والأوراق التقنية من أعمالنا الميدانية الأخيرة.",
    zh: "目前正在从我们最近的现场工作中汇编更多见解和技术白皮书。"
  } as L,
  ctaTitle: { en: "Have a specific ", ar: "هل لديك ", zh: "有特定的" } as L,
  ctaAccent: { en: "technical issue?", ar: "مشكلة تقنية محدّدة؟", zh: "技术问题吗？" } as L,
  ctaDesc: {
    en: "Discuss your plant's challenges directly with our engineering team.",
    ar: "ناقش تحديات منشأتك مباشرة مع فريقنا الهندسي.",
    zh: "直接与我们的工程团队讨论您工厂面临的挑战。"
  } as L,
  articles: {
    en: [
      {
        id: "1",
        title: "Why the Most Expensive Mistakes in Chemical Plants Happen After Construction Ends",
        content: `## The Transition Gap: From Construction to Operation

Most project budgets are built around engineering and construction. The assumption is simple: once the plant is built, the hard part is over.

It isn't.

The commissioning and startup phase — the period between mechanical completion and stable, on-spec production — is where the majority of lifetime performance gaps are created. Not because the engineering was wrong. Not because the equipment failed. But because the transition from a constructed asset to an operating plant is a discipline in itself, and it is almost never treated that way.

### The True Cost of Yield Gaps

Plants that commission without process-specific operational expertise routinely experience yield gaps in their first year of operation. Tuning cycles that should take weeks stretch into months. Equipment that was installed correctly fails to perform at design intent because the operating envelope was never properly established during startup.

The cost compounds. Every month of suboptimal operation is not just lost revenue — it is a baseline that the plant may never recover from. Operators learn to work around problems rather than solve them. Workarounds become procedures. Procedures become the new normal.

### The Solution: Operational Application

The solution is not more engineering. It is operational expertise applied at the right moment — during commissioning, during startup, and during the critical first months of production. Engineers who have operated plants like yours, not engineers who have designed them.

This is the phase Kafaah focuses on. Not because it is the most visible — but because it is where the difference between a plant that performs and a plant that underperforms is made.`,
        category: "Strategic",
        date: "May 2026",
        excerpt: "Most project budgets are built around engineering and construction, but the commissioning and startup phase is where the majority of lifetime performance gaps are created."
      },
      {
        id: "2",
        title: "What Commissioning Actually Means — And Why Most Projects Get It Wrong",
        content: `## Transforming Assets into Systems

Commissioning is one of the most misused terms in industrial project management. Ask ten project managers to define it and you will get ten different answers — most of them mistaking mechanical completeness for operational readiness. They are not the same thing.

True commissioning is a systematic process of transforming individual installed systems into an integrated, operating plant. It requires understanding not just whether each component works in isolation — but how the plant behaves as a system under real process conditions.

### System Behavior in Complex Plants

This distinction matters most in inorganic chemical and fertilizer plants, where process interactions are complex and the margin for error during startup is narrow. A sulfuric acid plant that has been mechanically completed but not properly pre-commissioned will expose its gaps the moment sulfur combustion begins. A phosphoric acid plant with inadequately verified instrumentation will struggle to maintain the process parameters that determine product quality.

The failures are rarely dramatic. They appear as instability — temperatures that drift, concentrations that won't hold, equipment that cycles when it should run steadily. Each symptom has a root cause. But finding it during startup, under pressure to produce, is expensive.

### Moving Beyond Checklists

Proper commissioning prevents this by doing the diagnostic work before it matters. It is not a checklist. It is a methodical process of building confidence — system by system, loop by loop — that the plant is ready to operate.`,
        category: "Technical",
        date: "May 2026",
        excerpt: "True commissioning is a systematic process of transforming individual installed systems into an integrated, operating plant, rather than just running a mechanical checklist."
      },
      {
        id: "3",
        title: "What an Owner's Engineer Actually Does — And What Happens Without One",
        content: `## Protecting the Owner's Interests

When a project owner contracts an EPC company, they are buying a promise: deliver a working plant, on time, within budget, to specification. The EPC's job is to fulfill that promise as efficiently as possible — which means managing cost, schedule, and constructability from their perspective.

That perspective is not the same as the owner's.

An EPC company manages dozens of projects simultaneously. They have established relationships with equipment vendors, preferred engineering approaches, and contractual incentives that may not always align with long-term plant performance. The EPC is optimizing for project delivery. The owner needs to optimize for a plant that performs reliably for the next twenty years.

### The Value of Technical Representation

Without independent technical representation, the owner's interests in that equation are undefended.

An Owner's Engineer fills that gap. Not as an adversary to the EPC — but as the owner's technical voice throughout the project. 

Key responsibilities include:
* Reviewing engineering deliverables and questioning assumptions that could affect operability.
* Monitoring construction quality and welding standards.
* Ensuring that the commissioning and startup phase receives the attention it deserves rather than being compressed to meet handover deadlines.

### The Cost of the Lesson

The value is difficult to quantify in advance and obvious in retrospect. Owners who have experienced a poorly executed handover — a plant that technically met contract specifications but failed to perform at design intent — understand exactly what independent technical oversight is worth.

Those who haven't yet had that experience often question whether they need it. The answer is that they do — they simply haven't paid for the lesson yet.`,
        category: "Strategic",
        date: "May 2026",
        excerpt: "An Owner's Engineer acts as the owner's technical voice throughout the project, protecting long-term plant performance against misaligned incentives."
      },
      {
        id: "4",
        title: "The Sulfuric Acid Plant Startup Sequence: Where Things Go Wrong and Why",
        content: `## Process Demands of Contact Plants

A sulfuric acid plant using the contact process is, in principle, well-understood technology. The chemistry is established, the equipment configurations are mature, and licensors provide detailed operating manuals.

And yet, sulfuric acid plant startups — particularly in facilities with less experienced operations teams — are among the most operationally demanding in the inorganic chemicals sector. The reason is not the chemistry. It is the sequence.

### Staging the Sequence

A contact process H₂SO₄ plant must be brought to operating conditions in a carefully controlled order:
1. **Converter Heating**: The converter must reach catalyst light-off temperature before sulfur combustion begins.
2. **Moisture Protection**: The catalyst beds must be protected from condensation at all costs to prevent sulfuric acid condensation and catalyst degradation.
3. **Absorption Readiness**: The absorption system must be fully active and circulating acid at correct concentrations to handle SO₃ gas before it is produced.

Deviation from the sequence — rushing a step, misjudging a temperature, starting flows in the wrong order — does not always produce an immediate visible failure. Instead, it creates conditions that degrade performance gradually. Catalyst poisoning that reduces conversion efficiency over time. Absorber upsets that affect acid concentration. Emission control systems that struggle to maintain compliance under off-design conditions.

### Process Understanding vs. Procedures

The most common startup errors we encounter are not the dramatic ones. They are the subtle ones: insufficient pre-commissioning of instrumentation loops, inadequate purging before light-off, temperature ramp rates that are too aggressive, and operators who have been trained on procedures rather than on process understanding.

Process understanding is the difference. An operator who knows why the sequence matters — not just what the sequence is — can respond correctly when conditions deviate from the manual. That knowledge comes from experience inside operating plants.`,
        category: "Technical",
        date: "May 2026",
        excerpt: "Sulfuric acid startups are operationally demanding. Deviations from the sequence create conditions that degrade catalyst and absorption performance gradually."
      },
      {
        id: "5",
        title: "The Real Cost of Delayed Ramp-Up: A Framework for Project Owners",
        content: `## Evaluating Ramp-up Economics

Every project financial model includes a production ramp-up curve. Most assume that the plant will reach design capacity within a defined period — typically three to six months after first production.

Most are wrong. And the financial consequences of being wrong are rarely visible until they have already occurred.

### Accumulating Small Losses

A delayed ramp-up does not appear as a single large cost. It appears as a series of smaller, ongoing losses that accumulate over months:
* **Lower Yields**: Producing less product from the same quantity of raw materials.
* **Energy Inefficiency**: Higher utility consumption (steam, electricity, gas) per unit of product because the plant is operating below its optimal design window.
* **Maintenance Spikes**: Repeated thermal cycling or start-stops causing premature mechanical failures.
* **Overtime Labor**: Operator and engineering resources spent on firefighting rather than optimizing.

Together, these items reshape the project's return profile and delay pay-back periods significantly.

### The Mitigation Framework

To protect project returns, owners should implement a structured transition framework:

1. **Operational Commissioning**: Commissioning must verify integrated system behavior under hot conditions, not just check off mechanical installation.
2. **Prioritize Prior Experience**: Staff the startup team with engineers who have run similar plants. The learning curve of an inexperienced operations team during startup is an expensive asset to fund on-site.
3. **Establish Baselines Early**: Document utility and raw material balances from day one. Do not allow off-design metrics to become accepted as the temporary normal.
4. **Plan for Diagnosis**: Establish diagnostic loops so that when a deviation occurs, the engineering response focuses on root-cause analysis rather than symptom chasing.`,
        category: "Strategic",
        date: "May 2026",
        excerpt: "A delayed ramp-up accumulates ongoing losses through lower yields and higher energy consumption. Mitigate this by treating transition as a technical discipline."
      },
      {
        id: "6",
        title: "Understanding the Mannheim Process: Operational Challenges and Startup Considerations",
        content: `## High-Temperature Acid Reactivity

Potassium sulfate (SOP) production via the Mannheim process is among the more operationally demanding fertilizer technologies in widespread commercial use. The process is well-established, but its steady-state operation requires a level of process discipline that is frequently underestimated during project planning.

The Mannheim furnace operates at high temperatures (600°C–700°C) within a highly corrosive process environment. The reaction between potassium chloride (KCl) and sulfuric acid (H₂SO₄) produces potassium sulfate and hydrochloric acid (HCl) gas simultaneously, requiring integrated management of both product streams from the moment the process begins.

### Critical Mannheim Startup Stages

Startup presents specific challenges that differ from steady-state operation:

* **Furnace Heat-Up**: Furnace heat-up must be managed carefully over 10 to 14 days to avoid thermal shock to refractory materials and to establish the correct temperature profile across the furnace bed before reagent introduction. Rushing this phase is the primary source of early brick failure.
* **Staged Reagent Feed**: Reagent introduction must be staged to allow the process to stabilize incrementally. The interaction between feed rates, furnace temperature, and product quality is non-linear; small deviations early can produce out-of-spec product that takes hours to clear.
* **HCl Absorption Readiness**: The adiabatic absorption system must be capable of handling the full gaseous HCl load from the first moment of reaction. Gaps in absorption water circulation or temperature control will immediately cause environmental emissions or low-concentration acid product.
* **Muller & Conveying Integration**: Product handling systems must be integrated with furnace operations. High-temperature discharge handling failures during startup create back-pressure on the furnace seals, forcing corrosive HCl gas into the building.

### Realizing Operational Success

Our commissioning work on the Suez SOP project demonstrated that stable operations are not achieved by chasing symptoms during run-time. They are achieved by enforcing rigorous pre-commissioning gates before a single burner is lit.`,
        category: "Technical",
        date: "May 2026",
        excerpt: "Potassium sulfate production via the Mannheim process requires strict temperature and reagent control. Startup presents refractory and absorption challenges."
      },
      {
        id: "7",
        title: "How EPC Contractors Can Protect Themselves During Commissioning and Startup",
        content: `## EPC Risk Concentration at Project End

EPC contractors carry a concentration of risk during commissioning and startup that is disproportionate to the value they receive from this final phase. The engineering is complete, the procurement is closed, and construction is essentially done. Yet contractual liabilities — liquidated damages, performance guarantees, and defect liability periods — remain active and depend entirely on a phase that the EPC organization may be ill-equipped to execute.

EPC companies are structurally optimized for engineering and construction. The highly specialized process engineers and operational troubleshooters needed to execute startup effectively are rarely part of the permanent EPC workforce. They are often sub-contracted or mobilized on short notice, sometimes lacking familiarity with the specific process design details of the plant.

### The Exposure in Figures

A startup that is delayed by just a few months extends site overhead costs, traps working capital in retention bonds, and can lead to performance test failures that generate costly defect claims.

### Recommended Risk Mitigation Strategies

To protect their balance sheets and reputations, EPC contractors should follow four rules:

1. **Deploy Process Specialists Early**: Do not rely on general construction managers to run commissioning. Engage specialists who have operated this specific plant technology before.
2. **Establish a Separate Commissioning Team**: The commissioning team should be managerially independent of the construction team. Construction wants to finish checklists; commissioning must verify system functionality.
3. **Validate Pre-commissioning Thoroughly**: Ensure that no loop or line is signed off without verification. Finding an instrument error or a piping obstruction after chemical feed has started is ten times more expensive than finding it during cold checks.
4. **Independent Diagnostic Support**: Retain third-party operational troubleshooting support to resolve deviations quickly during startup before they become contractual disputes with the owner.`,
        category: "Strategic",
        date: "May 2026",
        excerpt: "EPC contractors carry high risk during startup. Mitigation requires separate commissioning teams and process specialists who have operated the plant technology before."
      },
      {
        id: "8",
        title: "NPK Fertilizer Production: Why Granulation Lines Fail to Reach Design Capacity",
        content: `## Process Sensitivity of Granulation Systems

NPK (Nitrogen, Phosphorus, Potassium) fertilizer granulation is, on paper, a relatively straightforward physical process. The technology is mature, the equipment is standard, and the operating parameters are less extreme than those found in acid plants.

Yet, NPK granulation lines — particularly drum granulation and compaction granulation systems — consistently struggle to reach design capacity during their first months of operation. The causes are almost always related to three process bottlenecks: moisture, recycle ratios, and screen efficiency.

### Main Granulation Bottlenecks

* **Moisture Management**: Granulation depends entirely on liquid phase optimization. A minor variation in raw material moisture, ambient humidity, or steam quality disrupts this balance. If too wet, the drum granulator experiences mud buildup; if too dry, the material fails to agglomerate, generating excessive fines.
* **Recycle Ratio Control**: Most plants are designed to operate within a specific recycle-to-feed range (typically between 3:1 and 4:1). Inexperienced operations teams often try to run with lower recycle ratios to increase throughput, only to overload the dryers and coolers with off-spec product, causing a cycle of shut-downs.
* **Screen Blinding**: Screen selection and cleaning are frequently neglected during commissioning. Blinding (mesh clogging) by moist or warm fertilizer particles reduces screening efficiency. Unscreened oversize recirculates, while fines bypass to product streams, dragging down overall throughput.
* **Dryer Thermal Balancing**: The dryer burner must maintain precise exit temperatures to ensure granule moisture is strictly below the limit required for storage stability (typically <1.0%), without overheating and melting heat-sensitive fertilizer salts like urea.

### The Suez & Yanbu Lessons

Stabilizing a granulation line is not about adjusting raw material inputs theoretically. It requires operators who can read the texture of the material inside the drum, adjust steam injects dynamically, and balance recycle loops based on actual ambient conditions.`,
        category: "Technical",
        date: "May 2026",
        excerpt: "NPK granulation lines often struggle due to poor moisture management, recycle ratio control, and screen performance. Finding the balance requires field experience."
      },
      {
        id: "9",
        title: "The Handover Problem: Why Plants Underperform After EPC Completion",
        content: `## The Structural Gap in Industrial Projects

There is a structural discontinuity at the heart of most industrial plant projects. The organization that builds the plant and the organization that will operate it are completely different. The transfer of knowledge, responsibility, and operational understanding between them is consistently undermanaged.

This is the handover problem. And it is responsible for more long-term plant underperformance than any engineering or equipment design error.

### Signs of a Bad Handover

The symptoms of a legal-only handover are familiar:
* **The Performance Test Paradox**: A plant that passes its nominal 72-hour performance test under optimized conditions but struggles to maintain design output under normal operating conditions.
* **Procedure-Bound Operators**: An operations team that knows how to follow operating procedures in normal conditions but lacks the process understanding to respond when temperatures drift or concentrations drop.
* **Reactive Maintenance**: A maintenance team that is permanently reactive because the baseline vibrations and mechanical limits were never established during cold and hot testing.

### Reframing Handover as Knowledge Transfer

Closing this operational gap requires a deliberate investment by the plant owner in three areas:

1. **Process-Specific Training**: Operator training must move beyond classroom lectures. It must involve hands-on, plant-specific scenario training where operators learn how to diagnose deviations.
2. **Operational Baseline Documentation**: The plant's actual operating envelopes, valve positions, and temperature profiles must be documented during the first weeks of operation before wear and workarounds alter the baseline.
3. **Early Operations Technical Support**: Plant owners must retain specialized engineering support for the first three to six months of commercial operations. This is the period when design anomalies are discovered and must be corrected before they become permanent operational constraints.`,
        category: "Strategic",
        date: "May 2026",
        excerpt: "Handover is often treated as a legal event rather than a knowledge transfer event, leaving operations teams without the process understanding to troubleshoot deviations."
      },
      {
        id: "10",
        title: "What Twenty Years Inside Chemical Plants Teaches You That Engineering Textbooks Don't",
        content: `## Textbooks vs. Field Realities

Process engineering education is excellent at teaching the theory of chemical plant operations. Thermodynamics, reaction kinetics, control theory, and mass balances are essential building blocks.

However, formal education cannot provide the knowledge that comes from standing inside an operating plant when the pressure drops, the converter temperatures spike, and you have to find the answer. After nearly two decades inside sulfuric acid, phosphoric acid, potassium sulfate, and NPK facilities across Egypt and the Middle East, five core lessons stand out.

### Five Core Lessons from the Field

1. **Plants Behave as Systems, Not Unit Operations**: A textbook splits a plant into a reactor, a heat exchanger, and an absorber. In reality, they are deeply interconnected. An temperature spike in the sulfur burner will alter the acid temperature in the final absorption tower hours later. Diagnosing symptoms in isolation leads to circular troubleshooting.
2. **Operators Hear What Instruments Don't Measure**: Modern DCS displays provide invaluable data. But experienced operators develop a physical sensitivity to plant conditions — the pitch of a blower, the smell of gas leaks, or the specific vibration of a slurry pump. Effective troubleshooting integrates DCS data with direct physical feedback from the field.
3. **The Design is a Starting Point, Not the Answer**: No feedstock is pure, and no ambient conditions are static. Every plant operates outside its design basis due to feedstock fluctuations, climate conditions, and equipment wear. Optimizing performance requires finding the plant's actual, real-world operating limits, not relying on the design specifications.
4. **Diagnostic Speed Matters Most**: In a chemical plant, every hour of underperformance carries a direct financial cost. An 80% correct diagnosis delivered in two hours that allows immediate corrective action is far more valuable than a 100% comprehensive study that takes two weeks.
5. **Trust is Earned on the Deck, Not in the Boardroom**: Plant operators and engineers learn quickly whether outside consultants add value or just add paperwork. Credibility is built by standing alongside them on the structure, explaining why a temperature is drifting, and proving it with practical, measurable changes.`,
        category: "Technical",
        date: "May 2026",
        excerpt: "Engineering textbooks teach theory, but field experience reveals that plants behave as systems, operators have unmeasured insights, and design is only a starting point."
      },
      {
        id: "11",
        title: "Why EPC Handover is the Most Critical Phase of Your Plant",
        content: `## The EPC Handover Gap: From Steel to Synergy

Many investors assume that when an Engineering, Procurement, and Construction (EPC) contractor declares a plant "mechanically complete," the facility is ready to produce chemical output. This is a costly misconception. The gap between mechanical completion and stable operation is where projects succeed or fail.

### Suez & Yanbu Case Studies

In our commissioning work at Suez (magnesium sulphate) and Yanbu (NPK and phosphoric acid plants), we identified key systemic errors in the transitional phase:

1. **Pre-commissioning Checklist Oversights**: Piping loop checks, hydrostatic tests, and instrument calibrations must be independently verified by an Owner's Engineer, rather than solely relying on the EPC contractor's self-certification.
2. **Operations Readiness (OR) Integration**: Operations staff must be integrated during the late construction phase to ensure proper hand-on training and ownership transfer.

### Key EPC Handover Checkpoints

* **Punch List Management**: Categorizing deficiencies into Category A (must resolve before startup) and Category B (can resolve post-startup).
* **Performance Guarantee Runs (PGR)**: Validating specific raw material consumption rates, utility usage, and product specifications over continuous 72-hour test windows under nominal load.`,
        category: "Commissioning",
        date: "April 2026",
        excerpt: "The gap between 'mechanically complete' and 'operationally viable' is where most investors lose money. How an Owner's Engineer bridges this gap."
      },
      {
        id: "12",
        title: "Common Pitfalls in Mannheim Furnace Refractory Curing",
        content: `## Mannheim Furnace Refractory: Curing to Prevent Failure

Mannheim furnaces operate at extreme temperatures (500°C to 650°C) with highly corrosive reactants (potassium chloride and sulfuric acid producing potassium sulfate and hydrochloric acid gas). The silica brick and high-alumina refractory lining inside the furnace chamber are critical assets. Proper curing during the initial heating phase determines whether the bricks will survive years of operation or crack within months.

### The Curing Curve

Refractory curing requires a precise thermal schedule to drive off free water first, and then chemically bound water.

* **Ambient to 110°C**: Rate not exceeding 10°C/hr. Hold at 110°C for 24 hours to evaporate free moisture.
* **110°C to 350°C**: Rate not exceeding 15°C/hr. Hold at 350°C for 18 hours to release bound water without creating internal steam pressure.
* **350°C to Operating Temp (approx. 550°C)**: Rate of 20°C/hr. Hold at operating temperature for 24 hours for thermal equilibrium.

### Common Failures in the Field

In multiple troubleshooting interventions, we discovered operators accelerating the curing curve to meet construction deadlines. This causes "spalling"—where trapped moisture vaporizes into high-pressure steam, cracking the bricks from within. Our team enforces certified digital temperature monitoring and independent gas burner calibration to prevent refractory failures.`,
        category: "Technical Troubleshooting",
        date: "March 2026",
        excerpt: "Incorrect curing of the SOP furnace refractory leads to premature failure and costly downtime. We review the standard procedure and where it usually goes wrong."
      },
      {
        id: "13",
        title: "Optimizing NPK Granulation for High Ambient Humidity",
        content: `## NPK Granulation in High Ambient Humidity: Challenges and Control

NPK (Nitrogen, Phosphorus, Potassium) compound fertilizer granulation is highly sensitive to humidity. In coastal regions with high ambient humidity, such as the Gulf or Red Sea coasts, fertilizer salts absorb atmospheric moisture rapidly. This makes the material sticky, leading to build-up in the drum granulator, screen clogging, and product caking in storage silos.

### Thermodynamics of Salt Hydration

Every NPK formulation has a Critical Relative Humidity (CRH). If the ambient air's relative humidity exceeds the CRH, the fertilizer will actively absorb moisture. In coastal zones, ambient humidity regularly exceeds 80%, while NPK formulas containing urea and ammonium nitrate can have a CRH as low as 55-60%.

### Operational Tricks to Avoid Caking

1. **Optimizing Recycle Ratio**: Increasing the recycle ratio of dry, cool fines to the granulator buffer zone helps to absorb raw material moisture fluctuations.
2. **Controlling Dryer Exhaust Air Temp**: Raising exhaust air temperature from the dryer drum to ensure internal grain moisture is strictly below 1.0%.
3. **Post-Treatment Coating**: Applying high-quality anti-caking agent (oil-wax-dust coating) immediately after cooling to create a hydrophobic barrier on granules.`,
        category: "Production Optimization",
        date: "February 2026",
        excerpt: "Operating a granulation plant in the Gulf or Red Sea coast requires specific operational adjustments to maintain product quality and avoid caking."
      }
    ],
    ar: [
      {
        id: "1",
        title: "لماذا تحدث الأخطاء الأكثر كلفة في المصانع الكيميائية بعد انتهاء أعمال البناء",
        content: `## فجوة الانتقال: من البناء إلى التشغيل

تُبنى معظم ميزانيات المشاريع حول هندسة التصميم والإنشاءات. الافتراض السائد بسيط للغاية: بمجرد بناء المصنع، يكون الجزء الصعب قد انتهى.

لكنه ليس كذلك.

إن مرحلة التشغيل التجريبي وبدء التشغيل — وهي الفترة الممتدة بين الاكتمال الميكانيكي والوصول إلى إنتاج مستقر ومطابق للمواصفات — هي المرحلة التي تنشأ فيها غالبية فجوات الأداء طويلة المدى للمصنع. ليس لأن التصميم الهندسي كان خاطئاً، وليس لأن المعدات فشلت، بل لأن الانتقال من كونه مجرد أصل تم بناؤه إلى مصنع تشغيلي متكامل هو علم بحد ذاته، ونادراً ما يُعامل بهذه الطريقة.

### التكلفة الحقيقية لفجوات الإنتاجية

المصانع التي تبدأ تشغيلها دون الاستعانة بخبرة تشغيلية متخصصة في العمليات الإنتاجية تعاني عادة من فجوات في الإنتاجية خلال عامها الأول من التشغيل. وتمتد دورات الضبط والمعايرة التي ينبغي أن تستغرق أسابيع لتصل إلى شهور. كما تفشل المعدات التي تم تركيبها بشكل صحيح في العمل وفقاً للغرض من تصميمها لأن بيئة التشغيل المناسبة لم يتم تحديدها بشكل صحيح أثناء بدء التشغيل.

تتراكم التكلفة بمرور الوقت. كل شهر من التشغيل دون المستوى المطلوب لا يمثل فقط خسارة في الإيرادات، بل يمثل خطاً أساسياً منخفضاً للأداء قد لا يتعافى منه المصنع أبداً. يعتاد المشغلون على التعايش مع المشكلات وحلولها المؤقتة بدلاً من حلها جذرياً. وتتحول الحلول المؤقتة إلى إجراءات متبعة، وتصبح هذه الإجراءات هي الواقع الجديد للمصنع.

### الحل: توظيف الخبرة الميدانية

الحل لا يكمن في المزيد من الهندسة النظرية. بل في تطبيق الخبرة التشغيلية الميدانية في اللحظة المناسبة — أثناء التشغيل التجريبي، وبدء التشغيل، وخلال الأشهر الأولى الحرجة من الإنتاج. المهندسون الذين أداروا مصانع تشبه مصنعك، وليس المهندسين الذين صمموها فقط.

هذه هي المرحلة التي تركز عليها كفاءة. ليس لأنها الأكثر ظهوراً، بل لأنها المرحلة التي تصنع الفارق الفعلي بين مصنع يعمل بكفاءة ومصنع يعاني من ضعف الأداء.`,
        category: "استراتيجي",
        date: "مايو 2026",
        excerpt: "تُبنى معظم ميزانيات المشاريع حول الهندسة والبناء، ولكن مرحلة التشغيل التجريبي وبدء التشغيل هي التي تشهد نشوء أغلب فجوات الأداء طويلة المدى."
      },
      {
        id: "2",
        title: "ما يعنيه التشغيل التجريبي فعلياً — ولماذا تخطئ معظم المشاريع في فهمه",
        content: `## تحويل الأصول إلى أنظمة متكاملة

التشغيل التجريبي (Commissioning) هو أحد أكثر المصطلحات إساءة للاستخدام في إدارة المشاريع الصناعية. إذا طلبت من عشرة مدراء مشاريع تعريفه، فستحصل على عشرة إجابات مختلفة — ومعظمها يخلط بين الاكتمال الميكانيكي والجاهزية التشغيلية. وهما ليسا الشيء نفسه على الإطلاق.

التشغيل التجريبي الحقيقي هو عملية منهجية لتحويل الأنظمة الفردية المركبة إلى مصنع متكامل يعمل بانسجام. يتطلب هذا الفهم ليس فقط ما إذا كان كل مكون يعمل بشكل منفصل، بل كيف يتصرف المصنع كمنظومة واحدة تحت ظروف التشغيل الفعلية.

### سلوك الأنظمة في المصانع المعقدة

هذا الاختلاف يظهر بوضوح في مصانع الكيماويات غير العضوية والأسمدة، حيث تتسم تفاعلات العمليات بالتعقيد ويكون هامش الخطأ أثناء بدء التشغيل ضيقاً للغاية. إن مصنع حمض الكبريتيك الذي تم اكتماله ميكانيكياً ولكن لم يتم إعداده وتشغيله تجريبياً بشكل صحيح سيكشف عن فجواته في اللحظة التي يبدأ فيها احتراق الكبريت. كما أن مصنع حمض الفوسفوريك الذي يعاني من عدم التحقق الكافي من أجهزته الدقيقة سيواجه صعوبة بالغة في الحفاظ على بارامترات التشغيل التي تحدد جودة المنتج.

نادراً ما تكون الإخفاقات دراماتيكية أو مفاجئة؛ بل تظهر في صورة عدم استقرار تشغيلي — درجات حرارة تتذبذب، وتركيزات لا تثبت، ومعدات تفصل وتعمل بشكل متكرر بينما يجب أن تعمل بثبات. كل عرض من هذه الأعراض له سبب جذري، لكن العثور عليه أثناء بدء التشغيل، وتحت ضغط إنتاج عاجل، يكون مكلفاً للغاية.

### تجاوز مجرد قوائم الفحص التقليدية

التشغيل التجريبي السليم يمنع حدوث ذلك عن طريق إجراء العمل التشخيصي للمصنع قبل بدء الإنتاج الفعلي. إنه ليس مجرد قائمة فحص يتم التأشير عليها، بل هو عملية منهجية لبناء الثقة — نظاماً تلو نظام، ودائرة تلو دائرة — بأن المصنع جاهز للعمل بشكل موثوق وآمن.`,
        category: "تقني",
        date: "مايو 2026",
        excerpt: "التشغيل التجريبي الحقيقي هو عملية منهجية لتحويل الأنظمة الفردية المثبتة إلى مصنع متكامل قيد التشغيل، وليس مجرد مراجعة قائمة فحص ميكانيكية."
      },
      {
        id: "3",
        title: "ما يفعله مهندس المالك فعلياً — وما يحدث بغيابه",
        content: `## حماية مصالح المالك الاستثمارية

عندما يتعاقد مالك المشروع مع شركة مقاولات هندسية وإنشائية (EPC)، فإنه يشتري وعداً: تقديم مصنع يعمل، في الوقت المحدد، ووفقاً للميزانية والمواصفات المتفق عليها. وتكمن مهمة مقاول الـ EPC في الوفاء بهذا الوعد بأكبر قدر ممكن من الكفاءة والربحية من وجهة نظره — مما يعني إدارة التكلفة والجدول الزمني وقابلية البناء وفقاً لأولوياته الخاصة.

هذه الأولويات تختلف تماماً عن أولويات المالك.

تدير شركة الـ EPC عشرات المشاريع في وقت واحد. ولديهم علاقات راسخة مع موردي المعدات، وأساليب هندسية مفضلة، وحوافز تعاقدية قد لا تتوافق دائماً مع أداء المصنع على المدى الطويل. مقاول الـ EPC يعمل على تحسين تسليم المشروع في حينه، بينما يحتاج المالك إلى مصنع يعمل بكفاءة وموثوقية للعقدين القادمين من الزمن.

### قيمة التمثيل الفني المستقل

بدون تمثيل فني مستقل، تظل مصالح المالك في هذه المعادلة غير محمية.

هنا يأتي دور مهندس المالك (Owner's Engineer) ليسد هذه الفجوة. ليس كخصم لمقاول الـ EPC، بل كصوت فني وخبير للمالك طوال عمر المشروع.

وتشمل مسؤولياته الأساسية:
* مراجعة التصاميم الهندسية والتشكيك في الافتراضات التي قد تؤثر على سهولة وموثوقية التشغيل لاحقاً.
* مراقبة جودة البناء ومعايير اللحام والتركيبات الميدانية.
* ضمان حصول مرحلة التشغيل التجريبي وبدء التشغيل على الاهتمام الكافي الذي تستحقه بدلاً من اختصارها للوفاء بالمواعيد النهائية للتسليم.

### تكلفة الدرس العملي

من الصعب قياس قيمة مهندس المالك مسبقاً، لكنها تبدو واضحة للغاية عند النظر إلى الوراء. إن الملاك الذين عانوا من تسليم سيئ للمصنع — مصنع يطابق مواصفات العقد ورقياً ولكنه يفشل في تحقيق الطاقة التصميمية عملياً — يدركون تماماً قيمة الإشراف الفني المستقل.

أما أولئك الذين لم يخوضوا هذه التجربة بعد، فغالباً ما يتساءلون عما إذا كانوا بحاجة إليها فعلاً. والإجابة هي أنهم بحاجة إليها بلا شك — لكنهم ببساطة لم يدفعوا ثمن هذا الدرس بعد.`,
        category: "استراتيجي",
        date: "مايو 2026",
        excerpt: "يعمل مهندس المالك كصوت فني للمالك طوال المشروع، مما يحمي الأداء طويل المدى للمصنع ضد المصالح المتعارضة."
      },
      {
        id: "4",
        title: "تسلسل بدء تشغيل مصنع حمض الكبريتيك: أين تقع الأخطاء ولماذا",
        content: `## المتطلبات التشغيلية لمصانع التلامس

يعتبر مصنع حمض الكبريتيك الذي يعمل بطريقة التلامس تكنولوجيا مفهومة جيداً من حيث المبدأ. الكيمياء معروفة ومستقرة، وتكوينات المعدات ناضجة، ويقدم مانحو التراخيص أدلة تشغيل مفصلة.

ومع ذلك، فإن عمليات بدء تشغيل مصانع حمض الكبريتيك — لا سيما في المنشآت التي تضم فرق تشغيل أقل خبرة — تعد من بين أكثر العمليات تطلباً للدقة في قطاع الكيماويات غير العضوية. والسبب لا يكمن في التفاعلات الكيميائية، بل في تسلسل الخطوات.

### تنظيم وتتابع خطوات التشغيل

يجب إحضار مصنع حمض الكبريتيك (H₂SO₄) ذو العملية التلامسية إلى ظروف التشغيل بترتيب دقيق ومراقب بعناية:
1. **تسخين المحول**: يجب أن يصل المحول إلى درجة حرارة بدء التفاعل الكيميائي للحفاز (light-off temperature) قبل بدء احتراق الكبريت.
2. **الحماية من الرطوبة**: يجب حماية أسِرّة العامل الحفاز من التكثف بأي ثمن لمنع تآكل الحفاز وتلفه بالحمض.
3. **جاهزية الامتصاص**: يجب أن يكون نظام الامتصاص نشطاً بالكامل ويقوم بتدوير الحمض بالتركيزات الصحيحة للتعامل مع غاز ثالث أكسيد الكبريت (SO₃) بمجرد إنتاجه.

إن أي انحراف عن هذا التسلسل — مثل الاستعجال في خطوة ما، أو سوء تقدير درجات الحرارة، أو بدء التدفقات بترتيب خاطئ — لا ينتج عنه دائماً فشل فوري مرئي. بل على العكس، يفرز ظروفاً تؤدي لتدهور تدريجي في الأداء؛ مثل تلف الحفاز الذي يقلل من كفاءة التحويل بمرور الوقت، أو اضطرابات برج الامتصاص التي تؤثر على تركيز الحمض، أو كفاح أنظمة التحكم في الانبعاثات للحفاظ على الامتثال البيئي في ظل ظروف تشغيل غير قياسية.

### فهم العمليات مقابل مجرد تطبيق الإجراءات

أخطاء بدء التشغيل الأكثر شيوعاً التي نواجهها ليست الأخطاء الكبيرة أو الدراماتيكية. بل هي الأخطاء الدقيقة: عدم كفاية اختبارات التشغيل التجريبي المسبق لدوائر الأجهزة الدقيقة، وعدم كفاية عمليات التطهير والPurging قبل إشعال الفرن، ومعدلات رفع درجات الحرارة العنيفة والسريعة جداً، وتدريب المشغلين على الإجراءات الجافة بدلاً من فهم طبيعة العمليات نفسها.

فهم طبيعة العمليات الكيميائية هو الفارق الحقيقي. المشغل الذي يعرف *لماذا* تكتسب الخطوات أهميتها — وليس فقط *ما هي* الخطوات — يمكنه الاستجابة بشكل صحيح عندما تنحرف ظروف التشغيل عن الدليل المكتوب. هذه المعرفة تأتي حصرياً من واقع الخبرة العملية داخل المصانع.`,
        category: "تقني",
        date: "مايو 2026",
        excerpt: "عمليات بدء تشغيل مصانع حمض الكبريتيك تتطلب دقة تشغيلية عالية. أي انحراف عن التسلسل الصحيح يؤدي إلى تدهور تدريجي في أداء الحفاز والامتصاص."
      },
      {
        id: "5",
        title: "التكلفة الحقيقية لتأخر زيادة الإنتاج: إطار عمل لمُلاك المشاريع",
        content: `## تقييم اقتصاديات زيادة الإنتاج

يتضمن النموذج المالي لأي مشروع صناعي منحنى افتراضياً لزيادة الإنتاج (ramp-up curve). تفترض معظم النماذج أن المصنع سيصل لسرعته الإنتاجية التصميمية الكاملة خلال فترة محددة — تتراوح عادة بين ثلاثة إلى ستة أشهر بعد الإنتاج الأول.

لكن معظم هذه التقديرات تخطئ؛ ونادراً ما تكون العواقب المالية لهذا الخطأ واضحة حتى تقع بالفعل وتتكشف الأرقام.

### تراكم الخسائر التشغيلية الصغيرة

لا يظهر تأخر زيادة الإنتاج كفاتورة واحدة ضخمة. بل يظهر في صورة سلسلة من الخسائر التشغيلية الأصغر والمستمرة التي تتراكم على مدار شهور:
* **انخفاض الإنتاجية**: استخراج كمية منتج أقل من نفس كميات المواد الخام المغذاة.
* **عدم كفاءة الطاقة**: زيادة استهلاك المرافق (بخار، كهرباء، غاز) لكل وحدة منتج لأن المصنع يعمل خارج نطاق الكفاءة المثالي لتصميمه.
* **طفرات الصيانة**: التوقف والتشغيل المتكرر والتغيرات الحرارية تتسبب في حدوث أعطال ميكانيكية مبكرة للمعدات.
* **تكاليف العمالة الإضافية**: استهلاك وقت المشغلين والمهندسين في معالجة الأزمات اليومية والحرائق بدلاً من تحسين الأداء.

تعمل هذه العناصر مجتمعة على إعادة تشكيل العائد الاستثماري للمشروع وتأخير فترات استرداد رأس المال بشكل كبير.

### إطار عمل للحد من المخاطر

لحماية العوائد المالية للمشروع، يجب على المُلاك تطبيق إطار عمل منظم لانتقال المصنع إلى مرحلة التشغيل المستمر:

1. **التشغيل التجريبي التشغيلي**: يجب أن يتحقق التشغيل التجريبي من سلوك الأنظمة المتكاملة في ظل الظروف الحارة والفعلية، وليس مجرد مراجعة تركيب المعدات ميكانيكياً.
2. **منح الأولوية للخبرة السابقة**: توظيف مشغلين ومهندسين قاموا بتشغيل مصانع مماثلة من قبل. إن منحنى التعلم لفريق تشغيل عديم الخبرة أثناء بدء التشغيل هو رفاهية مكلفة للغاية يتحملها المالك في الموقع.
3. **تحديد خطوط الأساس للأداء مبكراً**: توثيق موازين المرافق والمواد الخام من اليوم الأول. لا تسمح باعتماد القراءات والمؤشرات غير القياسية على أنها الوضع الطبيعي المؤقت للمصنع.
4. **التخطيط للتشخيص الفعال**: وضع بروتوكولات للتشخيص وحل المشكلات بحيث عندما يحدث انحراف في المعايير، يركز الجهد الهندسي فوراً على تحليل الأسباب الجذرية بدلاً من مطاردة الأعراض السطحية.`,
        category: "استراتيجي",
        date: "مايو 2026",
        excerpt: "يتسبب تأخر زيادة الإنتاج في تراكم الخسائر المستمرة عبر انخفاض الإنتاجية وزيادة استهلاك الطاقة. تجنب ذلك بمعاملة الانتقال كعلم تقني قائم بذاته."
      },
      {
        id: "6",
        title: "فهم عملية مانهايم: التحديات التشغيلية واعتبارات بدء التشغيل",
        content: `## تفاعلية الأحماض عند درجات الحرارة المرتفعة

يعتبر إنتاج كبريتات البوتاسيوم (SOP) باستخدام فرن مانهايم من أكثر تكنولوجيات الأسمدة تطلباً من الناحية التشغيلية بين التقنيات المستخدمة تجارياً. هذه العملية معروفة وقديمة، لكن تشغيلها المستقر يتطلب مستوى من الانضباط العملياتي غالباً ما يتم التقليل من شأنه أثناء التخطيط للمشروع.

يعمل فرن مانهايم عند درجات حرارة مرتفعة جداً (600 إلى 700 درجة مئوية) في بيئة تشغيلية شديدة التآكل. وينتج عن التفاعل بين كلوريد البوتاسيوم (KCl) وحمض الكبريتيك (H₂SO₄) كبريتات البوتاسيوم وغاز حمض الهيدروكلوريك (HCl) في آن واحد، مما يتطلب إدارة متكاملة لكلا تيارين المنتجات من اللحظة الأولى لبدء التفاعل.

### مراحل بدء التشغيل الحرجة لأفران مانهايم

يفرض بدء التشغيل تحديات محددة تختلف عن ظروف التشغيل المستقر:

* **تسخين الفرن وتجفيف الطوب الحراري**: يجب إدارة عملية تسخين الفرن وتجفيفه بعناية فائقة على مدار فترة تتراوح بين 10 إلى 14 يوماً لتجنب حدوث صدمة حرارية للمواد المقاومة للحرارة (الRefractory)، ولتأسيس منحنى توزيع درجات الحرارة الصحيح عبر أرضية الفرن قبل إدخال المواد المتفاعلة. إن استعجال هذه المرحلة هو السبب الرئيسي لتلف وتصدع الطوب في البداية.
* **التغذية المتدرجة للمتفاعلات**: يجب أن يتم إدخال المواد المتفاعلة على مراحل متدرجة للسماح للعملية بالاستقرار التشغيلي التدريجي. إن العلاقة بين معدلات التغذية، ودرجة حرارة الفرن، وجودة المنتج هي علاقة غير خطية؛ ويمكن للانحرافات الصغيرة في البداية أن تنتج منتجاً غير مطابق للمواصفات يستغرق ساعات طويلة لتصريفه وتنظيف النظام منه.
* **جاهزية امتصاص غاز HCl**: يجب أن يكون نظام الامتصاص الأديباتي قادراً على التعامل مع كامل حمل غاز كلوريد الهيدروكلوريك المتولد منذ اللحظة الأولى للتفاعل. إن أي خلل في تدوير مياه الامتصاص أو التحكم في درجات الحرارة سيؤدي فوراً إلى انبعاثات بيئية خطيرة أو إنتاج حمض هيدروكلوريك منخفض التركيز.
* **تكامل نظام النقل والتبريد**: يجب دمج أنظمة معالجة ونقل المنتج مع تشغيل الفرن. إن أي عطل في نقل وتداول المنتج الساخن الخارج من الفرن أثناء بدء التشغيل يتسبب في إحداث ضغط عكسي على موانع تسرب الفرن (Seals)، مما يجبر غاز HCl الآكل على التسرب إلى مبنى الفرن.

### تحقيق النجاح التشغيلي

لقد أثبتت أعمال التشغيل التجريبي التي قمنا بها في مشروع كبريتات البوتاسيوم بالسويس أن العمليات المستقرة لا تتحقق بمطاردة الأعراض أثناء التشغيل. بل تتحقق من خلال تطبيق بوابات صارمة للتحقق ما قبل التشغيل (pre-commissioning gates) قبل إشعال موقد واحد في الفرن.`,
        category: "تقني",
        date: "مايو 2026",
        excerpt: "يتطلب إنتاج كبريتات البوتاسيوم عبر عملية مانهايم تحكماً صارماً في درجة الحرارة والمواد المتفاعلة. يواجه بدء التشغيل تحديات تتعلق بالحراريات والامتصاص."
      },
      {
        id: "7",
        title: "كيف يمكن لمقاولي EPC حماية أنفسهم أثناء التشغيل التجريبي وبدء التشغيل",
        content: `## تركيز مخاطر الـ EPC في نهاية المشروع

يتحمل مقاولو الهندسة والمشتريات والبناء (EPC) تركيزاً كبيراً من المخاطر المالية والتعاقدية أثناء مرحلتي التشغيل التجريبي وبدء التشغيل، وهو ما لا يتناسب مع القيمة التي يحصلون عليها من هذه المرحلة النهائية للمشروع. تكون الأعمال الهندسية قد اكتملت، والمشتريات أغلقت، والبناء انتهى تقريباً؛ ومع ذلك، تظل الالتزامات التعاقدية الكبرى — مثل غرامات التأخير، وضمانات الأداء، وفترات المسؤولية عن العيوب — معلقة بالكامل وتعتمد على مرحلة قد لا يكون مقاول الـ EPC مؤهلاً بالكامل لتنفيذها.

تأسست شركات الـ EPC هيكلياً للتركيز على التصميم والتوريد والبناء. ونادراً ما يكون مهندسو العمليات المتخصصون والخبراء القادرون على حل المشكلات التشغيلية جزءاً من الهيكل الدائم لموظفي شركات الـ EPC. وغالباً ما يتم تعيينهم بعقود مؤقتة أو استدعاؤهم في غضون مهلة قصيرة للمشروع، مما يجعلهم أحياناً يفتقرون للمعرفة العميقة بتفاصيل تصميم هذا المصنع بعينه.

### حجم المخاطرة التشغيلية والمالية

إن تأخر بدء التشغيل لبضعة أشهر فقط يؤدي إلى زيادة التكاليف غير المباشرة للموقع، واحتجاز رأس المال العامل في خطابات الضمان، وقد يؤدي إلى فشل اختبارات الأداء مما يعرض المقاول لمطالبات تعويض ضخمة عن العيوب والأداء.

### استراتيجيات موصى بها للحد من المخاطر

لحماية ملاءتهم المالية وسمعتهم المهنية، ينبغي لمقاولي الـ EPC اتباع أربع قواعد أساسية:

1. **الاستعانة بأخصائيي العمليات مبكراً**: لا تعتمد على مدراء الإنشاءات العامين لإدارة عملية التشغيل التجريبي. استعن بمهندسين متخصصين قاموا بتشغيل هذه التكنولوجيا المحددة من قبل.
2. **تأسيس فريق تشغيل تجريبي مستقل**: يجب أن يكون فريق التشغيل التجريبي مستقلاً إدارياً عن فريق الإنشاءات. يركز الإنشاء على إغلاق بنود قوائم الفحص ميكانيكياً، بينما يجب أن يركز فريق التشغيل التجريبي على التحقق من أداء الأنظمة وسلامتها.
3. **التحقق الدقيق من ما قبل التشغيل (Pre-commissioning)**: تأكد من عدم التوقيع على أي دائرة تحكم أو خط أنابيب دون التحقق الفعلي منه. إن اكتشاف خطأ في المعايرة أو انسداد في الأنابيب بعد بدء تغذية المواد الكيميائية يكون مكلفاً بعشرة أضعاف كلفة اكتشافه أثناء الاختبارات الباردة.
4. **توفير دعم تشخيصي خارجي مستقل**: الاستعانة بطرف ثالث متخصص لحل المشكلات التشغيلية واستكشاف الأعطال بسرعة أثناء بدء التشغيل، قبل أن تتحول المشكلات التقنية إلى نزاعات تعاقدية وقانونية مع مالك المصنع.`,
        category: "استراتيجي",
        date: "مايو 2026",
        excerpt: "يتحمل مقاولو EPC مخاطر عالية أثناء بدء التشغيل. يتطلب الحد منها فرق تشغيل تجريبي منفصلة وأخصائيي عمليات لديهم خبرة سابقة في تشغيل هذه التقنية."
      },
      {
        id: "8",
        title: "إنتاج أسمدة NPK: لماذا تفشل خطوط التحبيب في الوصول إلى طاقتها التصميمية",
        content: `## الحساسية التشغيلية لأنظمة التحبيب

يعتبر تحبيب الأسمدة المركبة NPK (النيتروجين والفوسفور والبوتاسيوم) على الورق عملية فيزيائية مباشرة نسبياً. التكنولوجيا ناضجة، والمعدات قياسية، وبارامترات التشغيل أقل حدة وخطورة من تلك الموجودة في مصانع الأحماض.

ومع ذلك، فإن خطوط تحبيب NPK — ولا سيما أنظمة التحبيب بالأسطوانة الدوارة (drum) والتحبيب بالضغط والكبس (compaction) — تفشل باستمرار في الوصول إلى طاقتها التصميمية خلال الأشهر الأولى من التشغيل. وتعود الأسباب دائماً تقريباً إلى ثلاثة اختناقات تشغيلية رئيسية: الرطوبة، ونسبة المواد المعاد تدويرها، وكفاءة الغربلة.

### الاختناقات الرئيسية لعملية التحبيب

* **إدارة الرطوبة**: تعتمد عملية التحبيب بالكامل على تحسين الطور السائل (liquid phase). أي تغير طفيف في رطوبة المواد الخام، أو الرطوبة المحيطة، أو جودة البخار المحقون يخل بهذا التوازن. إذا زادت الرطوبة، يحدث تراكم للطين لزج داخل أسطوانة التحبيب، وإذا جفت المادة، تفشل الجزيئات في التماسك، مما ينتج عنه كميات كبيرة من المسحوق الناعم غير المحبب.
* **التحكم في نسبة المواد المعاد تدويرها (Recycle Ratio)**: تم تصميم معظم المصانع لتعمل ضمن نطاق محدد لإعادة التدوير بالنسبة للتغذية الجديدة (يتراوح عادة بين 3:1 إلى 4:1). غالباً ما تحاول فرق التشغيل غير الخبيرة تقليل نسبة إعادة التدوير لزيادة الإنتاج الفوري، مما يؤدي فقط إلى تحميل المجففات والمبردات بمنتجات غير مطابقة للمواصفات، مما يتسبب في حلقة مفرغة من التوقفات المتكررة.
* **انسداد الغرابيل (Screen Blinding)**: كثيراً ما يتم إهمال اختيار الغرابيل وآلية تنظيفها أثناء التشغيل التجريبي. يؤدي انسداد شبكة الغربال بواسطة جزيئات الأسمدة الرطبة أو الدافئة إلى تقليل كفاءة الفصل بشكل كبير، مما يتسبب في إعادة تدوير الأحجام الكبيرة دون داعٍ وتسلل المواد الناعمة إلى المنتج النهائي، مما يعوق الوصول للطاقة الإنتاجية الكاملة.
* **التوازن الحراري للمجفف**: يجب أن يحافظ حارق المجفف على درجات حرارة خروج دقيقة لضمان بقاء رطوبة الحبيبات بصرامة تحت الحد المطلوب لاستقرار التخزين (أقل من 1.0% عادة)، دون زيادة مفرطة في الحرارة تؤدي إلى انصهار أملاح الأسمدة الحساسة للحرارة مثل اليوريا.

### دروس السويس وينبع المستفادة

إن تثبيت خط تحبيب الأسمدة لا يقتصر على ضبط نسب المواد الخام نظرياً. بل يتطلب مشغلين قادرين على قراءة ملمس ولزوجة المادة داخل الأسطوانة الدوارة بالعين المجردة، وضبط حقن البخار ديناميكياً، وموازنة دوائر إعادة التدوير بناءً على الظروف البيئية والجوية الفعلية للموقع.`,
        category: "تقني",
        date: "مايو 2026",
        excerpt: "تواجه خطوط تحبيب NPK صعوبات بسبب الإدارة الضعيفة للرطوبة، والتحكم في نسبة إعادة التدوير، وأداء الغربلة. يتطلب تحقيق التوازن خبرة ميدانية."
      },
      {
        id: "9",
        title: "مشكلة التسليم: لماذا يقل أداء المصانع عن المتوقع بعد اكتمال أعمال EPC",
        content: `## الفجوة الهيكلية في المشاريع الصناعية

هناك انقطاع هيكلي في قلب معظم مشاريع المصانع الصناعية. فالجهة التي تبني وتنشئ المصنع والجهة التي ستقوم بتشغيله هما كيانان مختلفان تماماً؛ ونادراً ما تتم إدارة نقل المعرفة والمسؤولية والفهم التشغيلي بينهما بشكل كافٍ.

هذه هي مشكلة تسليم المصنع (handover problem). وهي مسؤولة عن ضعف الأداء طويل المدى للمصانع أكثر من أي أخطاء أخرى في التصميم الهندسي أو تصميم المعدات.

### علامات وأعراض التسليم السيئ

تعد أعراض التسليم الذي يقتصر على الجانب القانوني والورقي مألوفة لدى أصحاب الخبرة:
* **مفارقة اختبار الأداء**: مصنع ينجح في اجتياز اختبار الأداء الاسمي لمدة 72 ساعة تحت ظروف مثالية ومراقبة، ولكنه يعاني لاحقاً للحفاظ على الطاقة الإنتاجية التصميمية تحت ظروف التشغيل العادية.
* **مشغلون مقيدون بالإجراءات**: فريق تشغيل يعرف كيفية اتباع إجراءات التشغيل في الظروف الطبيعية فقط، ولكنه يفتقر إلى الفهم العملي للعمليات للاستجابة عندما تنحرف درجات الحرارة أو تنخفض التركيزات.
* **صيانة تفاعلية وغير مخططة**: فريق صيانة يعمل بشكل دائم برد الفعل (reactive) لأن خطوط الأساس للاهتزازات والحدود الميكانيكية للمعدات لم يتم تأسيسها وتوثيقها أبداً أثناء مرحلة الاختبارات الباردة والساخنة.

### إعادة صياغة التسليم كعملية لنقل المعرفة

يتطلب سد هذه الفجوة التشغيلية استثماراً مدروساً من قبل مالك المصنع في ثلاثة مجالات أساسية:

1. **التدريب العملي التخصصي**: يجب أن يتجاوز تدريب المشغلين محاضرات الفصول الدراسية النظرية. يجب أن يتضمن تدريباً عملياً وتفاعلياً داخل المصنع على سيناريوهات التشغيل المختلفة، حيث يتعلم المشغلون كيفية تشخيص الانحرافات وحل المشكلات.
2. **توثيق خط الأساس التشغيلي**: يجب توثيق نطاقات التشغيل الفعلية للمصنع، ومواضع الصمامات الفتح/الإغلاق، ومنحنيات درجات الحرارة الفعلية خلال الأسابيع الأولى من التشغيل، قبل أن تؤدي التآكلات والحلول المؤقتة إلى تغيير معايير المصنع.
3. **الدعم الفني للعمليات المبكرة**: يجب على ملاك المصانع الاحتفاظ بدعم هندسي متخصص ومستقل طوال الأشهر الثلاثة إلى الستة الأولى من العمليات التجارية. هذه هي الفترة التي يتم فيها اكتشاف العيوب التصميمة وتعديلها قبل أن تصبح قيوداً تشغيلية دائمة للمصنع.`,
        category: "استراتيجي",
        date: "مايو 2026",
        excerpt: "غالباً ما يتم التعامل مع التسليم كحدث قانوني وليس كعملية لنقل المعرفة، مما يترك فرق التشغيل دون فهم كافٍ للعمليات لحل الانحرافات."
      },
      {
        id: "10",
        title: "ما تعلمك إياه عشرون عاماً داخل المصانع الكيميائية ولا تجده في الكتب الهندسية",
        content: `## الكتب الأكاديمية مقابل الواقع الميداني

التعليم الأكاديمي في هندسة العمليات الكيميائية ممتاز في تدريس النظريات. الديناميكا الحرارية، وحركية التفاعل، ونظريات التحكم، وموازين الكتلة والطاقة هي لبنات بناء أساسية لا غنى عنها.

ومع ذلك، لا يمكن للتعليم الأكاديمي الرسمي أن يمنحك المعرفة التي تكتسبها عندما تقف داخل مصنع حقيقي قيد التشغيل بينما ينخفض الضغط، وتتصاعد درجات حرارة المحول فجأة، ويتعين عليك العثور على حل فوري. بعد ما يقرب من عقدين من العمل داخل منشآت حمض الكبريتيك، وحمض الفوسفوريك، وسلفات البوتاسيوم، وأسمدة NPK في مصر والشرق الأوسط، تبرز خمسة دروس أساسية لا تجدها في الكتب.

### خمسة دروس تشغيلية أساسية من الواقع الميداني

1. **المصانع تتصرف كأنظمة متكاملة، وليس كعمليات منفصلة**: يقسم الكتاب المصنع إلى مفاعل، ومبادل حراري، وبرج امتصاص. في الواقع العملي، هذه الوحدات مترابطة بشكل وثيق. إن ارتفاع درجة الحرارة في حارق الكبريت سيغير درجة حرارة الحمض في برج الامتصاص النهائي بعد ساعات. تشخيص الأعراض بمعزل عن بقية الأجزاء يؤدي إلى مطاردة عقيمة للمشكلات.
2. **المشغلون يستمعون لما لا تقيسه الأجهزة**: توفر شاشات أنظمة التحكم الموزع (DCS) الحديثة بيانات لا تقدر بثمن. ولكن المشغلين ذوي الخبرة يطورون حساسية جسدية تجاه ظروف المصنع — صوت المروحة (blower), أو رائحة تسرب الغاز، أو الاهتزاز الخاص لمضخة الملاط (slurry pump). إن حل المشكلات بفعالية يدمج بيانات الـ DCS مع الاستجابة الجسدية المباشرة من الميدان.
3. **التصميم الهندسي هو نقطة انطلاق وليس الإجابة النهائية**: لا توجد مواد خام نقية تماماً، كما لا توجد ظروف جوية ثابتة. يعمل كل مصنع خارج نطاق تصميم أساسي محدد بسبب تقلبات التغذية، والظروف المناخية، وتآكل المعدات. يتطلب تحسين الأداء العثور على حدود التشغيل الحقيقية للمصنع على أرض الواقع، وليس الاعتماد فقط على مواصفات التصميم الورقية.
4. **سرعة التشخيص هي الأهم على الإطلاق**: في مصنع الكيماويات، كل ساعة تشغيل بأداء ضعيف تعني خسارة مالية مباشرة ومستمرة. إن تشخيصاً دقيقاً بنسبة 80% يتم تقديمه في غضون ساعتين ويسمح باتخاذ إجراء تصحيحي فوري هو أكثر قيمة بكثير من دراسة شاملة بنسبة 100% تستغرق أسبوعين للوصول إليها.
5. **الثقة تُبنى على أرضية المصنع، وليس في قاعات الاجتماعات**: يدرك مشغلو ومهندسو المصنع سريعاً ما إذا كان المستشار الخارجي يضيف قيمة حقيقية أم مجرد أوراق وتقارير إضافية. تُبنى المصداقية بالوقوف معهم على الهياكل المعدنية للمصنع، وشرح سبب تذبذب درجات الحرارة، وإثبات ذلك بتغييرات عملية وقابلة للقياس.`,
        category: "تقني",
        date: "مايو 2026",
        excerpt: "تعلم الكتب الهندسية النظريات، ولكن الخبرة الميدانية تكشف أن المصانع تعمل كأنظمة متكاملة، وأن لدى المشغلين رؤى لا تقيسها الأجهزة."
      },
      {
        id: "11",
        title: "لماذا يعتبر تسليم EPC المرحلة الأكثر حرجاً لمنشأتك",
        content: `## فجوة تسليم EPC: من الهيكل المعدني إلى التكامل التشغيلي

يفترض العديد من المستثمرين أنه عندما يعلن مقاول الهندسة والمشتريات والإنشاءات (EPC) أن المصنع "مكتمل ميكانيكياً"، فإن المنشأة جاهزة لبدء الإنتاج الكيميائي. هذا اعتقاد خاطئ ومكلف. الفجوة بين الاكتمال الميكانيكي والتشغيل المستقر هي المرحلة التي تتحدد فيها نجاح المشاريع أو فشلها.

### دراسات حالة: السويس وينبع

في أعمال التشغيل التجريبي التي قمنا بها في السويس (كبريتات المغنيسيوم) وينبع (مصانع NPK وحمض الفوسفوريك)، حددنا أخطاء نظامية رئيسية في المرحلة الانتقالية:

1. **إغفال قوائم فحص ما قبل التشغيل**: يجب التحقق من اختبارات الدوائر الهيدروليكية، والاختبارات الهيدروستاتيكية، ومعايرة الأجهزة بشكل مستقل من قبل مهندس المالك، بدلاً من الاعتماد فقط على شهادة المقاول الذاتية.
2. **تكامل جاهزية العمليات**: يجب دمج موظفي التشغيل خلال مرحلة البناء المتأخرة لضمان التدريب العملي السليم ونقل الملكية.

### نقاط فحص تسليم EPC الرئيسية

* **إدارة قائمة الملاحظات (Punch List)**: تصنيف العيوب إلى الفئة أ (يجب حلها قبل بدء التشغيل) والفئة ب (يمكن حلها بعد بدء التشغيل).
* **تشغيل ضمان الأداء (PGR)**: التحقق من معدلات استهلاك المواد الخام، واستخدام المرافق، ومواصفات المنتج خلال فترات اختبار مستمرة لمدة 72 ساعة تحت الحمل الاسمي.`,
        category: "التشغيل",
        date: "أبريل 2026",
        excerpt: "الفجوة بين 'مكتمل ميكانيكياً' و 'جاهز للتشغيل' هي حيث يخسر معظم المستثمرين أموالهم. كيف يسد مهندس المالك هذه الفجوة."
      },
      {
        id: "12",
        title: "الأخطاء الشائعة في معالجة حراريات فرن مانهايم",
        content: `## حراريات فرن مانهايم: المعالجة لتجنب الفشل

تعمل أفران مانهايم في درجات حرارة قصوى (500 إلى 650 درجة مئوية) مع وجود متفاعلات شديدة التآكل (كلوريد البوتاسيوم وحمض الكبريتيك لإنتاج كبريتات البوتاسيوم وغاز حمض الهيدروكلوريك). تعتبر الطوب السيليكي والبطانة الحرارية عالية الألومينا داخل غرفة الفرن من الأصول الحيوية. تحدد المعالجة الصحيحة أثناء مرحلة التسخين الأولية ما إذا كان الطوب سيعيش لسنوات من التشغيل أو يتصدع في غضون أشهر.

### منحنى المعالجة الحراري

تتطلب معالجة المواد الحرارية جدولاً حرارياً دقيقاً لطرد المياه الحرة أولاً، ثم المياه المرتبطة كيميائياً.

* **من درجة الحرارة المحيطة إلى 110 درجة مئوية**: بمعدل لا يتجاوز 10 درجات مئوية/ساعة. الثبات عند 110 درجات مئوية لمدة 24 ساعة لتبخير الرطوبة الحرة.
* **من 110 إلى 350 درجة مئوية**: بمعدل لا يتجاوز 15 درجة مئوية/ساعة. الثبات عند 350 درجة مئوية لمدة 18 ساعة لإطلاق الماء المرتبط دون إحداث ضغط بخار داخلي.
* **من 350 درجة مئوية إلى حرارة التشغيل (حوالي 550 درجة مئوية)**: بمعدل 20 درجة مئوية/ساعة. الثبات عند حرارة التشغيل لمدة 24 ساعة لتحقيق التوازن الحراري.

### الأخطاء الشائعة في الموقع

في العديد من التدخلات لحل المشاكل التقنية، اكتشفنا قيام المشغلين بتسريع منحنى المعالجة للوفاء بالمواعيد النهائية للبناء. يؤدي هذا إلى حدوث "التشظي" (spalling) — حيث تتبخر الرطوبة المحاصرة وتتحول إلى بخار عالي الضغط، مما يؤدي إلى تصدع الطوب من الداخل. يفرض فريقنا مراقبة رقمية معتمدة لدرجات الحرارة ومعايرة مستقلة للشعلات لتجنب فشل الحراريات.`,
        category: "استكشاف الأخطاء الفنية",
        date: "مارس 2026",
        excerpt: "المعالجة غير الصحيحة لحراريات فرن سلفات البوتاسيوم تؤدي إلى الفشل المبكر وفترات التوقف المكلفة. نستعرض الإجراء القياسي وأين يحدث الخطأ عادة."
      },
      {
        id: "13",
        title: "تحسين تحبيب NPK في ظروف الرطوبة المحيطة العالية",
        content: `## تحبيب NPK في الرطوبة المحيطة العالية: التحديات والتحكم

عملية تحبيب الأسمدة المركبة NPK (النيتروجين والفوسفور والبوتاسيوم) حساسة للغاية للرطوبة. في المناطق الساحلية ذات الرطوبة المحيطة العالية، مثل سواحل الخليج أو البحر الأحمر، تمتص أملاح الأسمدة الرطوبة الجوية بسرعة. وهذا يجعل المادة لزجة، مما يؤدي إلى تراكمها في أسطوانة التحبيب، وانسداد الغرابيل، وتكتل المنتج في صوامع التخزين.

### ديناميكا الحرارة لتميؤ الأملاح

لكل تركيبة NPK درجة رطوبة نسبية حرجة (CRH). إذا تجاوزت الرطوبة النسبية للهواء المحيط هذه الدرجة، فإن السماد سيمتص الرطوبة بنشاط. في المناطق الساحلية، تتجاوز الرطوبة المحيطة بانتظام 80%، بينما يمكن أن تصل درجة الرطوبة النسبية الحرجة لتركيبات NPK التي تحتوي على اليوريا ونترات الأمونيوم إلى 55-60%.

### حيل تشغيلية لتجنب التكتل

1. **تحسين نسبة إعادة التدوير**: زيادة نسبة إعادة تدوير المواد الناعمة والجافة والباردة إلى منطقة Granulator يساعد في امتصاص تقلبات الرطوبة.
2. **التحكم في درجة حرارة عادم المجفف**: رفع درجة حرارة هواء العادم من أسطوانة التجفيف لضمان أن رطوبة الحبيبات الداخلية أقل بدقة من 1.0%.
3. **طلاء ما بعد المعالجة**: تطبيق عامل مضاد للتكتل عالي الجودة (طلاء الزيت والشمع والغبار) مباشرة بعد التبريد لتشكيل حاجز كاره للماء على الحبيبات.`,
        category: "تحسين الإنتاج",
        date: "فبراير 2026",
        excerpt: "تشغيل مصنع تحبيب في الخليج أو ساحل البحر الأحمر يتطلب تعديلات تشغيلية محددة للحفاظ على جودة المنتج وتجنب التكتل."
      }
    ],
    zh: [
      {
        id: "1",
        title: "为什么化工项目中代价最昂贵的错误发生在建设结束之后",
        content: `## 过渡期鸿沟：从项目建设到装置运营

大多数项目的预算主要围绕工程设计和工程建设来编制。其背后有一个简单的假设：一旦工厂建好，最困难的部分就结束了。

事实并非如此。

调试和启动阶段——即从机械竣工到实现稳定、合格生产之间的时期——是造成工厂运行寿命内大部分性能差距的阶段。这并非因为设计工程出错，也不是因为设备发生故障，而是因为“从一个建好的资产过渡到一家运转的工厂”本身就是一门独立的专业学科，而人们几乎从未以这种态度对待过它。

### 产能缺口的真实代价

在调试过程中如果缺乏针对具体工艺的现场运营专业知识，工厂在投产的第一年内普遍会出现产量缺口。原本只需几周的调整周期往往被拉长到几个月。由于在启动期间未能正确建立最佳的运行工况范围，原本安装完好的设备也无法发挥其设计意图。

这种代价会不断累积。每一个月低效运行带来的不仅是当前收入的流失，更会成为工厂后续难以摆脱的低绩效基准。操作人员学会了绕过问题工作，而不是去解决问题。临时应对方案变成了标准操作规程，而这些规程则成为了新的常态。

### 解决方案：引入实操经验

解决方案不是去做更多的图纸设计，而是在最关键的时刻——在调试期间、启动期间以及投产后的最初几个月——引入现场运营专业知识。您需要的是实际操作过类似工厂的工程师，而不仅仅是做过图纸设计的工程师。

这正是 Kafaah 聚焦的阶段。并非因为它最瞩目，而是因为在这里，高效运转的工厂与低效运转的工厂之间的分水岭被真正划定。`,
        category: "战略",
        date: "2026年5月",
        excerpt: "大多数项目预算是围绕设计和建设制定的，但调试和启动阶段才是造成大部分运行寿命绩效差距的根源。"
      },
      {
        id: "2",
        title: "调试的真正含义——以及为什么大多数项目都会搞错",
        content: `## 将资产转化为协同系统

“调试”（Commissioning）是工业项目管理中被误用最频的术语之一。让十位项目经理给它下定义，您会得到十种不同的答案——其中大多数人都把“机械竣工”等同于“运营就绪”。两者有着本质的区别。

真正的调试是一个系统化的过程，旨在将各个已安装的独立系统转变为一个有机集成的、可投入运行的工厂。这不仅需要验证每个组件是否能孤立运转，更需要理解在实际的工艺条件下，整个工厂作为一个集成系统会如何协同运作。

### 复杂工厂中的系统行为

在工艺交互错综复杂且启动容错空间极窄的无机化工与化肥厂中，这种区分尤为关键。一个仅完成机械竣工但未经过妥善预调试的硫酸厂，在硫磺开始燃烧的瞬间就会暴露其工艺缺陷。一个仪表未经充分验证的磷酸厂，在启动时将很难维持决定产品质量的工艺参数。

这类系统失败很少表现为戏剧性的设备损毁，而是呈现出长期的不稳定性——温度漂移、浓度不稳定、设备异常启停等。每个症状背后都有其根本原因，但在巨大的投产压力下，在启动期间再去寻找这些原因是非常昂贵且滞后的。

### 摆脱单纯的清单式验收

科学规范的调试可以通过在正式运行前完成这些诊断工作，来杜绝此类隐患。它不仅仅是一张确认勾选的清单，而是一个循序渐进构建信心的过程——系统到系统、回路到回路——确保工厂在点火前已做好全面运营准备。`,
        category: "技术",
        date: "2026年5月",
        excerpt: "真正的调试是将各个已安装的系统转化为一个集成的、处于运行状态的工厂的系统化过程，而不仅仅是执行机械验收清单。"
      },
      {
        id: "3",
        title: "业主工程师的真正职责——以及缺乏该角色的后果",
        content: `## 捍卫项目业主的切身利益

当项目业主与 EPC 总承包商签约时，他们实际上买下了一个承诺：按时、保质、在预算范围内交付一个合格运行的工厂。EPC 承包商的工作是尽可能高效地兑现这一承诺——这意味着从他们的立场出发来管理成本、工期和可施工性。

而这一立场，与业主的利益并不完全等同。

一家 EPC 承包商同时管理着数十个项目。他们与特定的设备厂商有着长期的合作关系，也有其首选的工程设计习惯，而合同中的激励机制也可能并不完全有利于工厂的长期性能。EPC 优化的是“项目交付”；而业主需要优化的，是一个在未来二十年里都能高效稳定运转的工厂。

### 独立技术代表的商业价值

缺乏独立的技术代表，业主在这一博弈天平上的利益便无人捍卫。

业主工程师（Owner's Engineer）正是为了填补这一空白。他们并非 EPC 的对立面，而是在整个项目生命周期中，作为业主在技术层面的忠实代言人。

其核心职责包括：
* 审查工程设计交付物，质疑可能影响后续可操作性的设计假设。
* 监督施工质量和焊接等关键工程标准。
* 确保调试和启动阶段获得应有的资源与时间，防止总包商为赶工期而压缩测试时间。

### 学费的昂贵代价

业主工程师的价值在项目前期很难被精确量化，但投产后却往往一目了然。那些亲身经历过糟糕移交的业主——工厂在技术指标上通过了合同验收，但投产后却始终无法稳定达到设计产能——会深刻明白独立技术监管的意义。

而尚未经历过这种挫折的业主，往往会质疑该角色的必要性。答案是他们确实需要——他们只不过是还没为这堂昂贵的课买单而已。`,
        category: "战略",
        date: "2026年5月",
        excerpt: "业主工程师在整个项目期间充当业主的技术代表，保护工厂的长期性能免受利益不一致的影响。"
      },
      {
        id: "4",
        title: "硫酸厂启动顺序：哪些环节容易出错及原因",
        content: `## 接触法装置的工艺要求

从原理上讲，使用接触法工艺的硫酸厂是一项非常成熟的技术。化学原理明确，设备配置定型，技术授权方也提供了非常详尽的操作手册。

然而，硫酸厂的启动——特别是在操作团队经验不足的装置中——仍是无机化工领域中对操作要求最严苛的任务之一。其根本原因不在于化学原理，而在于“启动顺序”。

### 启动步骤的阶段划分

接触法硫酸（H₂SO₄）装置必须严格按照受控顺序进入运行状态：
1. **转化器预热**：在硫磺开始燃烧之前，转化器温度必须达到催化剂的活性引发温度（点火温度）。
2. **水分防护**：必须不惜一切代价防止催化床层发生水分结露，以防硫酸冷凝并导致催化剂粉化降级。
3. **吸收系统就绪**：吸收系统必须完全投入运行，并以正确的浓度循环酸液，以便在生成 SO₃ 气体时能够立即进行吸收。

偏离这一顺序——无论是仓促进行某一步骤、误判温度，还是以错误的顺序开启物料流动——并不总是会导致立刻察觉的设备故障。相反，它会造成导致性能逐渐恶化的隐性条件：例如，催化剂中毒导致转化率随着时间的推移而逐渐降低；吸收塔波动影响成品酸的浓度；排放控制系统在偏离设计工况下难以实现环保达标等。

### “工艺理解”与“流程操作”的区别

我们在现场遇到的最常见的启动错误并不是那些灾难性的误操作。而是那些容易被忽视的细节：仪表回路预调试不充分、点火前吹扫不彻底、升温曲线过快，以及仅接受过流程培训但缺乏“工艺理解”的操作人员。

对工艺本质的理解决定了运行水平 of 差距。一个明白启动顺序背后的“为什么”而不仅仅是“是什么”的操作员，在工况偏离手册时能做出正确的判断和调整。而这种知识只能来自于真实的工厂一线经验。`,
        category: "技术",
        date: "2026年5月",
        excerpt: "硫酸厂启动顺序：哪些环节容易出错及原因。偏离启动顺序会导致催化剂和吸收性能逐渐降级。"
      },
      {
        id: "5",
        title: "产能爬坡延迟的真实代价：项目业主的分析框架",
        content: `## 评估产能爬坡的经济性

每个项目的财务模型中都包含一条产量爬坡曲线。大多数模型假设工厂将在首次投产后的既定期限内（通常为三到六个月）达到设计产能。

但绝大多数这类预测都是错误的。而预测错误的财务后果在实际发生并造成损失之前，很少能引起业主的足够重视。

### 累积隐性损失的危害

产能爬坡的延迟并不会以单一的大额账单形式出现，而是表现为数月内持续累积的一系列较小损失：
* **收率降低**：消耗同等数量的原材料，产出的合格成品却更少。
* **能效低下**：由于工厂在低于最佳设计工况下运行，导致单位产品的公用工程消耗（蒸汽、电力、天然气）大幅增加。
* **维护成本激增**：反复启停或温度剧烈波动导致机械设备过早疲劳损坏。
* **人工加班增加**：操作和工程资源全部消耗在日常“救火”中，无暇顾及系统优化。

这些项目累加起来，将重塑整个项目的投资回报曲线，并显著推迟资金回笼周期。

### 产能爬坡防范框架

为了保护项目投资回报，业主应实施结构化的过渡框架：

1. **注重“运营性调试”**：调试工作必须验证整线系统在热态运行工况下的集成行为，而不是仅核对机械安装是否到位。
2. **重用实战人才**：将运行团队交由有类似工厂操作经验的工程师带领。在投产现场出资让没有经验的操作团队去慢慢摸索，其试错学费是非常高昂的。
3. **及早确立性能基准**：从第一天起就记录和梳理公用工程与原材料的平衡数据。绝对不要默许偏离设计的指标成为“临时的常态”。
4. **建立规范的诊断流程**：确保工况发生偏差时，技术支持团队能专注于根本原因分析，而不是盲目应对表面现象。`,
        category: "战略",
        date: "2026年5月",
        excerpt: "产能爬坡延迟会因产量降低和能耗升高而造成持续累积的损失。通过将这一过渡视为一门技术学科来减轻这种风险。"
      },
      {
        id: "6",
        title: "深入理解曼海姆工艺：运营挑战与启动注意事项",
        content: `## 高温下的强酸反应特征

通过曼海姆炉工艺生产硫酸钾（SOP）是商业应用中对操作要求极高的化肥技术之一。虽然该工艺历史悠久且众所周知，但其稳定运行所需的工艺纪律和精细操作在项目前期经常被严重低估。

曼海姆炉在极高温度（600°C–700°C）且极具腐蚀性的环境下运行。氯化钾（KCl）与硫酸（H₂SO₄）在炉内的反应同时产生固体硫酸钾和气态氯化氢（HCl）气体，这就要求从工艺启动的瞬间起，必须对这两种物料流实施一体化集成管理。

### 曼海姆炉启动的关键阶段

与稳态运行相比，启动阶段面临着独特的挑战：

* **炉温升温与耐火材料烘炉**：必须在 10 到 14 天的时间里非常缓慢地控制炉温上升，以避免炉膛耐火砖发生热震损坏，并在投料前在炉床建立起正确的温度梯度。仓促缩减烘窑升温时间是造成后期耐火砖开裂失效的最主要原因。
* **反应物分阶段投料**：反应物的投加必须分阶段逐步增加，以使反应过程平稳过渡。给料量、炉温和产品质量之间的相互关系是非线性的；启动初期的微小偏差就可能产生大量不合格品，且需要花费数小时去清理系统。
* **HCl 吸收系统就绪度**：绝热吸收系统必须在反应启动的第一时间，就能够处理全部气态 HCl 负荷。吸收水循环量或温度控制的任何疏漏，都会立刻导致尾气排放超标或副产盐酸浓度偏低。
* **出料与输送系统集成**：产品后处理输送设备必须与窑炉运行步调一致。启动时如果发生高温物料输送故障，会导致炉体出料口物料堆积，从而使炉内产生正压，迫使具有高腐蚀性的 HCl 气体溢出至厂房内。

### 实现稳定的商业化运营

我们在苏伊士硫酸钾（SOP）调试项目中的实操经验表明：要实现稳定运行，不能靠在运转中被动地应对故障；而必须靠在点燃第一个燃烧器之前，严格执行各项预调试检查关卡。`,
        category: "技术",
        date: "2026年5月",
        excerpt: "通过曼海姆法生产硫酸钾需要严格控制温度和反应物。启动过程面临耐火材料和吸收系统的双重挑战。"
      },
      {
        id: "7",
        title: "EPC承包商如何在调试与启动期间保护自身利益",
        content: `## 项目尾期的 EPC 风险集中特征

在调试和启动期间，EPC（工程、采购与施工）总承包商承担着与其在此项目最后阶段所获收益完全不成比例的巨大风险。虽然此时设计已经结束、采购已经结算、建设也已基本完工，但是诸如误工罚款、性能保证和缺陷责任期等关键合同义务依然完全有效，且全盘取决于总包商可能并不擅长执行的调试和启动阶段。

从组织架构上看，EPC 公司的核心优势在于设计和施工。而现场开车启动所需的专业工艺工程师和故障排除专家，极少属于 EPC 公司的永久编制。他们往往是通过分包或临时招募而来的，有时甚至缺乏对该工厂工艺细节的深入了解。

### 潜在风险暴露

仅仅延迟开车几个月，就会大幅拉长现场的管理性开支，让质保金长期滞留在银行账户中，甚至由于性能测试失败而导致高昂的索赔。

### EPC 承包商风险防范策略

为了保障自身的资产负债表安全和商业声誉，EPC 承包商应遵循以下四条原则：

1. **及早部署工艺专家**：切勿依赖普通的现场施工经理来主导系统调试。必须聘请实际操作过该特定工艺流程的专家。
2. **成立独立的调试团队**：调试部门在管理上应独立于施工部门。施工关注的是机械检查表上的签字确认；而调试必须验证系统的整体实际功能。
3. **彻底验证预调试质量**：确保每一个控制回路和管道在未经验证前不予签字接收。在投料后才发现仪表接线错误或管道堵塞，其处理成本是冷态测试阶段的十倍以上。
4. **引入独立诊断支持**：聘请第三方的专业现场排障机构，在开车阶段快速解决发生的工艺偏差，避免技术偏差演变成与业主之间的法律合同纠纷。`,
        category: "战略",
        date: "2026年5月",
        excerpt: "EPC承包商在调试与启动期间承担了极大风险。防范措施包括设立独立的调试组织，并聘请曾操作过该类工厂的工艺专家。"
      },
      {
        id: "8",
        title: "NPK复合肥生产：为什么造粒线无法达到设计产能",
        content: `## 造粒系统的工艺敏感性

在图纸上，氮磷钾（NPK）复合肥造粒是一个相对简单的物理过程。技术非常成熟，设备也是标准化配置，且其操作参数远没有酸厂那样极端。

然而，NPK 造粒线——特别是转鼓造粒和挤压造粒系统——在投产后的最初几个月内却普遍难以达到设计产能。其背后的根本原因几乎总是集中在三个工艺瓶颈上：水分、循环料比例以及筛分效率。

### 造粒过程的核心瓶颈

* **水分管理**：造粒完全依赖于液相的优化。原材料水分、环境湿度或蒸汽质量的微小波动都会打破这一平衡。水分过高会导致转鼓造粒机内部积泥结疤；水分过低则会导致物料无法成粒，从而产生大量的细粉。
* **循环料比例控制**：大多数装置在设计上都要求在特定的返料与给料比范围内运行（通常在 3:1 到 4:1 之间）。缺乏经验的操作团队往往试图通过降低返料比来增加即时产量，结果却导致大量不合格的产品使干燥机和冷却器过载，从而引发反复停机的恶性循环。
* **筛网堵眼（Screen Blinding）**：在调试期间，筛网的选择和清理机制常常被忽视。潮湿或温热的肥料颗粒极易堵塞筛网眼，大幅降低筛分效率。这导致本应分出的超大颗粒被重新带入系统，而细粉则混入成品物流中，从而拉低了整条线的合格品产能。
* **干燥机热平衡**：干燥机燃烧器必须精确维持出口温度，确保成品颗粒水分严格控制在仓储稳定限度以下（通常 <1.0%），同时又不能温度过高，以防像尿素这样对温度敏感的肥料盐发生熔化。

### 延布与苏伊士的实操启示

稳定一条造粒生产线并不仅是按照图纸理论去调节原料配比。它需要操作人员能够凭借经验判断鼓内物料的粘稠度和形态，动态微调蒸汽喷射量，并结合实际的环境气候条件来调节循环回路的平衡。`,
        category: "技术",
        date: "2026年5月",
        excerpt: "NPK造粒线常因水分管理不善、循环料比例控制以及振动筛性能等问题而受阻。取得这种平衡需要丰富的现场实战经验。"
      },
      {
        id: "9",
        title: "移交交接难题：为什么工厂在 EPC 完工后表现不佳",
        content: `## 移交交接难题：为什么工厂在 EPC 完工后表现不佳

在大多数工业装置项目中，普遍存在着一个组织架构上的断层。负责建设工厂的组织与负责后续运营的组织是两个完全不同的团队。而这两个团队之间的知识传递、责任划分和运营理解的交接工作，往往严重缺乏系统管理。

这就是所谓的“移交交接难题”。它是导致工厂投产后长期运行绩效低下最主要的因素，甚至超过了设计和设备选型本身的漏洞。

### 糟糕移交的典型症状

纯粹流于法律和合同形式的工厂移交有着非常典型的症状：
* **性能测试悖论**：工厂在各项指标优化配置的情况下，能够勉强通过额定的 72 小时性能考核测试，但在日常的正常运行中却始终无法稳定达到设计产能。
* **被操作手册束缚的操作员**：操作团队只知道在正常工况下如何照本宣科，但在面对温度漂移、浓度下降等异常波动时，由于缺乏对工艺原理的本质理解而无法做出正确应对。
* **被动的抢修维护**：由于在冷态和热态测试期间未能建立起设备的振动和机械性能基准，维护团队始终处于疲于奔命的被动抢修状态。

### 将移交重塑为系统化的知识传递

弥合这一运营断层，需要项目业主在以下三个关键领域进行针对性的投入：

1. **针对特定装置工艺的系统培训**：操作人员培训必须摆脱单纯的课堂讲座。它必须包含在工厂现场进行的、针对特定装置的实操演练，让操作员学会如何诊断工艺偏差。
2. **记录并确立实际运行性能基准**：在投产的最初几周内，必须对工厂的实际运行工况范围、阀门开度、温度曲线等进行详细记录和归档。防止设备磨损和临时应对方案改变系统基准。
3. **引入投产早期的技术运营支持**：业主应在投产后的前 3 到 6 个月的商业运行期内，保留专业的外部工艺运营支持。这是发现设计隐藏缺陷并加以整改的关键时期，切勿让设计隐患变成工厂长期的运行限制。`,
        category: "战略",
        date: "2026年5月",
        excerpt: "工厂移交往往被视为一个法律和合同事件，而不是知识传递事件，这导致运营团队缺乏排除异常工况所需的工艺理解。"
      },
      {
        id: "10",
        title: "真实化工厂一线工作20年教给您的道理（工程教科书上学不到）",
        content: `## 来自化工现场的五条核心经验

1. **工厂是以协同系统运转，而非独立的单元操作**：教科书把工厂分割为反应器、换热器和吸收塔。而在现实中，它们深度交织。换热器或转化器的温度波动，会在几个小时后改变最终吸收塔的酸液温度。孤立地诊断某些工况症状，只会让排障陷入循环迷宫。
2. **操作工能感知到仪表无法测量的细节**：现代 DCS（分散控制系统）中控屏幕提供了极有价值的数据。但经验丰富的操作工对装置的状况产生了一种近乎物理的直觉——例如主鼓风机的音调变化、极其微弱的介质泄漏气味，或者是渣浆泵的特定振动频率。高效的排障需将 DCS 的数字数据与来自现场的第一手物理反馈结合。
3. **设计图纸是起点，而非终点**：没有任何原材料是绝对纯净的，也没有任何环境气候条件是恒定不变的。由于原料波动、气候变化和设备磨损，每家工厂实际上都在偏离其设计基准的轨道上运行。优化性能意味着需要找出工厂在现实环境下的实际运行极限，而不是死守设计指标。
4. **迅速诊断的价值胜过一切**：在化工厂里，每一小时的低效运行都对应着直接的财务损失。在两小时内做出一个 80% 正确、并能立即指导采取纠偏行动的诊断，其商业价值远远超过一个耗时两周才做出的 100% 完美的分析报告。
5. **信任在设备旁建立，而非在会议室里**：工厂的操作人员和现场工程师很快就能看穿外部专家是在提供实打实的价值，还是在制造空洞的报告。真正的信誉是和他们一起站在布满钢结构的车间里，指出温度漂移的缘由，并通过实际、可测量的操作调整来证明。`,
        category: "技术",
        date: "2026年5月",
        excerpt: "工程教科书传授理论，但现场经验表明：工厂是一个整体系统，操作工拥有仪表无法测量的直觉，而设计仅仅是个起点。"
      },
      {
        id: "11",
        title: "为什么EPC交接是您工厂最关键的阶段",
        content: `## EPC 交接差距：从钢结构到系统协同

许多投资者认为，当工程、采购和施工（EPC）承包商宣布工厂“机械完工”时，设施就已准备好进行化学品生产。这是一个代价高昂的误解。“机械完工”与“稳定运营”之间的差距是项目成败的关键所在。

### 苏伊士与延布案例研究

在苏伊士（硫酸镁）和延布（复合肥与磷酸装置）的调试工作中，我们发现了过渡阶段的几个关键系统性错误：

1. **试车前清单遗漏**：管道回路检查、水压试验和仪表校准必须由业主工程师进行独立验证，而不能仅仅依赖 EPC 承包商的自我认证。
2. **运营就绪（OR）整合**：运营人员必须在建设后期介入，以确保适当的实际操作培训和所有权顺利转移。

### EPC 交接关键检查点

* **尾项清单管理**：将缺陷分类为 A 类（启动前必须解决）和 B 类（启动后可解决）。
* **性能保证测试（PGR）**：在额定负载下连续 72 小时的测试窗口期内，验证特定的原材料消耗率、公用工程消耗和产品规格。`,
        category: "调试",
        date: "2026年4月",
        excerpt: "“机械完工”和“运营可行”之间的差距是大多数投资者亏损的地方。业主工程师如何弥合这一差距。"
      },
      {
        id: "12",
        title: "曼海姆熔炉耐火材料养护的常见陷阱",
        content: `## 曼海姆熔炉耐火材料：通过养护防止失效

曼海姆熔炉在极端温度（500°C 至 650°C）以及高腐蚀性反应物（氯化钾与硫酸反应生成硫酸钾和氯化氢气体）下运行。炉腔内部的硅砖和高铝耐火内衬是极其关键的资产。在初始升温阶段进行适当 of 烘炉养护，决定了耐火砖是能承受多年的运行，还是会在几个月内开裂。

### 烘炉养护曲线

耐火材料的烘干和养护需要精确的温度控制，以首先排出游离水，然后排出化学结合水。

* **环境温度至 110°C**：升温速率不超过 10°C/小时。在 110°C 保温 24 小时以蒸发游离水分。
* **110°C 至 350°C**：升温速率不超过 15°C/小时。在 350°C 保温 18 小时以释放结合水，避免产生内部蒸汽压。
* **350°C 至运行温度（约 550°C）**：升温速率为 20°C/小时。在运行温度下保温 24 小时以达到热平衡。

### 现场常见故障

在多次技术故障排除干预中，我们发现操作人员为了赶工期而加速烘炉曲线。这会导致“剥落”——残留的水分汽化为高压蒸汽，从而将耐火砖从内部胀裂。我们的团队通过采用经过认证的数字温度监控和独立的燃气燃烧器校准，彻底防止耐火材料失效。`,
        category: "技术故障排除",
        date: "2026年3月",
        excerpt: "SOP熔炉耐火材料的错误养护会导致过早失效和昂贵的停机时间。我们回顾标准程序以及通常出错的地方。"
      },
      {
        id: "13",
        title: "针对高环境湿度优化NPK造粒",
        content: `## 高环境湿度下的 NPK 造粒：挑战与控制

NPK（氮、慢、钾）复合肥造粒对湿度极为敏感。在海湾地区或红海沿岸等高湿度沿海地区，肥料盐会迅速吸收空气中的水分。这会导致物料变粘，进而引起转鼓造粒机内部结疤、振动筛堵塞以及储料斗中的产品结块。

### 肥料盐吸湿热力学

每种 NPK 配方都有一个临界相对湿度（CRH）。如果周围空气的相对湿度超过该 CRH，肥料将主动吸湿。在沿海地区，环境湿度经常超过 80%，而含有尿素和硝酸铵的 NPK 配方的 CRH 可能低至 55-60%。

### 避免结块的运营技巧

1. **优化循环料比例**：增加干燥、冷却的细料返回造粒机的循环比例，有助于缓冲原材料中的水分波动。
2. **控制干燥机排风温度**：提高干燥机排风温度，确保颗粒内部水分严格控制在 1.0% 以下。
3. **后处理防结块包膜**：冷却后立即喷涂优质防结块剂（油-蜡-粉包裹），以在颗粒表面形成疏水保护层。`,
        category: "生产优化",
        date: "2026年2月",
        excerpt: "在海湾地区或红海沿岸运营造粒厂需要特定的运营调整，以保持产品质量并避免结块。"
      }
    ]
  } as Record<GatewayLocale, any[]>
};

/* ══════════════════════════════════════════════
   SERVICES PAGE
   ══════════════════════════════════════════════ */
export const servicesPage = {
  eyebrow: { en: "SERVICES", ar: "الخدمات", zh: "服务" } as L,
  heroTitle: { en: "Our Services", ar: "خدماتنا", zh: "我们的服务" } as L,
  heroTitleAccent: { en: "Across the Full Project Lifecycle", ar: "عبر دورة حياة المشروع الكاملة", zh: "横跨整个项目生命周期" } as L,
  heroDesc: {
    en: "Kafaah supports both project owners and EPC contractors across every phase where industrial projects succeed or fail — from early design through commissioning, startup, and long-term performance.",
    ar: "تدعم كفاءة كلاً من ملاك المشاريع ومقاولي EPC عبر كل مرحلة تنجح أو تفشل فيها المشاريع الصناعية — بدءاً من التصميم المبكر إلى التشغيل التجريبي، وبدء التشغيل، والأداء طويل المدى.",
    zh: "Kafaah 在工业项目成败的每个阶段，包括从早期设计到调试、启动和长期性能，为项目业主和 EPC 承包商提供支持。"
  } as L,
  heroTagline: { en: "One project. One client. No conflicts — ever.", ar: "مشروع واحد. عميل واحد. لا تضارب في المصالح — أبداً.", zh: "一个项目。一个客户。无利益冲突——绝无例外。" } as L,
  
  // Legends
  legendOwners: { en: "Project Owners", ar: "مُلاك المشاريع", zh: "项目业主" } as L,
  legendEpc: { en: "EPC Contractors", ar: "مقاولو EPC", zh: "EPC 承包商" } as L,
  legendBoth: { en: "Both", ar: "كلاهما", zh: "两者" } as L,

  // Lifecycle Diagram text
  lifecycleLabel: { en: "OPERATIONAL SUPPORT ACROSS", ar: "الدعم التشغيلي عبر", zh: "运营支持贯穿" } as L,
  lifecyclePhases: [
    {
      num: "01",
      title: { en: "Project & Design Phase", ar: "مرحلة المشروع والتصميم", zh: "项目与设计阶段" },
      desc: { en: "Owner's Engineer · Investor Advisory · Process Support", ar: "مهندس المالك · الاستشارات الاستثمارية · دعم العمليات", zh: "业主工程师 · 投资者咨询 · 工艺支持" }
    },
    {
      num: "02",
      title: { en: "Construction & Pre-Startup", ar: "البناء وما قبل بدء التشغيل", zh: "建设与启动前" },
      desc: { en: "Commissioning Support · Operation Readiness", ar: "دعم التشغيل التجريبي · جاهزية التشغيل", zh: "调试支持 · 运营准备就绪" }
    },
    {
      num: "03",
      title: { en: "Startup & Stabilization", ar: "بدء التشغيل والاستقرار", zh: "启动与稳定化" },
      desc: { en: "Commissioning · Troubleshooting · Operator Training", ar: "التشغيل التجريبي · استكشاف الأعطال · تدريب المشغلين", zh: "调试 · 故障排除 · 操作员培训" }
    },
    {
      num: "04",
      title: { en: "Performance & Optimization", ar: "الأداء والتحسين", zh: "性能与优化" },
      desc: { en: "Optimization · Performance Guarantee · Documentation", ar: "التحسين · ضمان الأداء · التوثيق", zh: "优化 · 性能保证 · 文件编制" }
    }
  ],

  // Badge Translations
  badgeHighestValue: { en: "HIGHEST VALUE", ar: "القيمة الأعلى", zh: "最高价值" } as L,
  badgeOwner: { en: "OWNER", ar: "المالك", zh: "业主" } as L,
  badgeEpc: { en: "EPC", ar: "مقاول EPC", zh: "EPC" } as L,
  badgeBoth: { en: "OWNER & EPC", ar: "المالك ومقاول EPC", zh: "业主与 EPC" } as L,

  // Proof texts mapping
  proofs: {
    "owners-engineer": { en: "K₂SO₄ SOP Plant · 40,000 T/YR · Suez", ar: "مصنع كبريتات البوتاسيوم K₂SO₄ · 40,000 طن/سنة · السويس", zh: "硫酸钾 (K₂SO₄) 厂 · 40,000 吨/年 · 苏伊士" } as L,
    "process-engineering-support": { en: "H₂SO₄ · H₃PO₄ · K₂SO₄ process design", ar: "تصميم عمليات حمض الكبريتيك · الفوسفوريك · كبريتات البوتاسيوم", zh: "硫酸 · 磷酸 · 硫酸钾 工艺设计" } as L,
    "commissioning": { en: "Mannheim K₂SO₄ · NPK Compaction Lines · Yanbu", ar: "كبريتات البوتاسيوم بطريقة مانهايم · خطوط تحبيب NPK بالضغط · ينبع", zh: "曼海姆 K₂SO₄ · NPK 挤压造粒线 · 延布" } as L,
    "troubleshooting": { en: "Wet Process H₃PO₄ · SSP · MgSO₄", ar: "حمض الفوسفوريك بالعملية الرطبة · SSP · كبريتات المغنيسيوم MgSO₄", zh: "湿法磷酸 · SSP · 硫酸镁 MgSO₄" } as L,
    "operator-training": { en: "H₂SO₄ · NPK · MgSO₄ operations", ar: "عمليات حمض الكبريتيك · NPK · كبريتات المغنيسيوم", zh: "硫酸 · NPK · 硫酸镁 运营" } as L,
    "startup-performance-guarantee": { en: "Yanbu Compaction Granulation · Multi-grade Fertilizer", ar: "التحبيب بالضغط بينبع · أسمدة متعددة الدرجات", zh: "延布挤压造粒 · 多级肥料" } as L,
  } as Record<string, L>,

  // Founder Quote
  founderQuote: {
    en: "The most expensive mistakes in chemical plant projects happen in the phases most people underestimate — commissioning, startup, and the first months of operation. That's exactly where we focus.",
    ar: "أكثر الأخطاء كلفة في مشاريع مصانع الكيماويات تحدث في المراحل التي يستهين بها معظم الناس — التشغيل التجريبي، وبدء التشغيل، والأشهر الأولى من التشغيل. هذا هو بالضبط موضع تركيزنا.",
    zh: "化肥和化工项目中代价最昂贵的错误，往往发生在大多数人低估的阶段——调试、启动以及运营的最初几个月。这正是我们的关注焦点。"
  } as L,
  founderRole: {
    en: "MOUSTAFA ABDELGHAFFAR — FOUNDER & PRINCIPAL PROCESS ENGINEER",
    ar: "مصطفى عبد الغفار — المؤسس وكبير مهندسي العمليات",
    zh: "莫斯塔法·阿卜杜勒·加法尔 — 创始人兼首席工艺工程师"
  } as L,

  // How We Staff
  staffEyebrow: { en: "HOW WE STAFF EVERY ENGAGEMENT", ar: "كيفية تعيين فرق العمل لكل مشروع", zh: "我们如何配备每个项目的团队" } as L,
  staffTitle: { en: "No fixed teams.", ar: "لا توجد فرق عمل ثابتة.", zh: "无固定团队。" } as L,
  staffTitleAccent: { en: "Only the expertise your plant requires.", ar: "فقط الخبرات التي تتطلبها منشأتك.", zh: "فقط الخبرات التي تتطلبها منشأتك。" } as L,
  staffDesc1: {
    en: "Each engagement is staffed with engineers who have direct operational experience in your specific process — not generalists assembled from a roster.",
    ar: "يتم تعيين مهندسين في كل مشروع ممن لديهم خبرة تشغيلية مباشرة في عمليتك الإنتاجية المحددة — وليس عامين أو إداريين يتم تجميعهم من قائمة عامة.",
    zh: "每个项目均配备在您的特定工艺中拥有直接运营经验的工程师，而非从花名册中临时组建的通用人员。"
  } as L,
  staffDesc2: {
    en: "Every assignment is matched to the plant, process, and project phase involved.",
    ar: "يتم تكييف ومطابقة كل مهمة مع المصنع والعملية الإنتاجية ومرحلة المشروع المعنية.",
    zh: "每项任务都与相关的工厂、工艺和项目阶段相匹配。"
  } as L,
  staffCategories: [
    {
      title: { en: "Process", ar: "العمليات", zh: "工艺" },
      desc: { en: "Engineering, commissioning, optimization", ar: "الهندسة، التشغيل التجريبي، التحسين", zh: "工程、调试、优化" }
    },
    {
      title: { en: "Mechanical", ar: "الميكانيكا", zh: "机械" },
      desc: { en: "Equipment selection, FAT attendance, maintenance", ar: "اختيار المعدات، حضور اختبارات قبول المصنع (FAT)، الصيانة", zh: "设备选型、参加工厂验收测试（FAT）、维护" }
    },
    {
      title: { en: "Electrical & Instrumentation", ar: "الكهرباء والأجهزة", zh: "电气与仪表" },
      desc: { en: "Control systems, safety systems, DCS", ar: "أنظمة التحكم، أنظمة السلامة، نظام التحكم الموزع (DCS)", zh: "控制系统、安全系统、分散控制系统（DCS）" }
    },
    {
      title: { en: "Operations & Training", ar: "العمليات والتدريب", zh: "运营与培训" },
      desc: { en: "Operator readiness, procedures, plant-specific training", ar: "جاهزية المشغلين، الإجراءات، تدريب مخصص لكل مصنع", zh: "操作员准备就绪、规程、特定工厂培训" }
    }
  ],

  // Bottom CTA
  ctaTitle: { en: "Industrial projects rarely fail ", ar: "نادراً ما تفشل المشاريع الصناعية ", zh: "工业项目的失败很少 " } as L,
  ctaTitleAccent: { en: "for one reason.", ar: "لسبب واحد.", zh: "是由于单一原因。" } as L,
  ctaDesc: {
    en: "Let's identify where technical execution, startup readiness, or operational performance may be at risk — and where Kafaah can make the difference.",
    ar: "دعنا نحدد التحديات التي قد تعرض التنفيذ الفني، أو جاهزية بدء التشغيل، أو الأداء التشغيلي للخطر — ونبين أين يمكن لـ 'كفاءة' أن تصنع الفارق.",
    zh: "让我们找出技术执行、启动准备就绪或运营绩效可能面临风险的环节——以及 Kafaah 在哪里可以发挥关键作用。"
  } as L,
  btnDiscuss: { en: "DISCUSS YOUR PROJECT", ar: "ناقش مشروعك معنا", zh: "商讨您的项目" } as L,
  btnExperience: { en: "VIEW OUR EXPERIENCE", ar: "استعرض خبراتنا", zh: "查看我们的经验" } as L,
};

/* ── Shared CTA ── */
export const shared = {
  getInTouch: { en: "Get in Touch", ar: "تواصل معنا", zh: "联系我们" } as L,
  howCanWeHelp: { en: "How can we ", ar: "كيف يمكننا ", zh: "我们如何" } as L,
  helpAccent: { en: "help you?", ar: "مساعدتك؟", zh: "帮助您？" } as L,
  cairoEgypt: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "开罗，埃及" } as L,
};
