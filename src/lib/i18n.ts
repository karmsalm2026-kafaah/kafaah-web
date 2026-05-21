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
};

/* ══════════════════════════════════════════════
   HOMEPAGE SECTIONS
   ══════════════════════════════════════════════ */
export const hero = {
  eyebrow: { 
    en: "INDEPENDENT TECHNICAL EXPERTS FOR FERTILIZER & CHEMICAL PLANTS", 
    ar: "خبراء فنيون مستقلون لمصانع الأسمدة والكيماويات", 
    zh: "化肥与化学工厂的独立技术专家" 
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
  discussPlant: { en: "SELECTED PROJECT EXPERIENCE", ar: "الخبرات المشاريعية المختارة", zh: "精选项目经验" } as L,
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
    en: ["Sulfuric Acid", "Phosphoric Acid", "Sulfate of Potash", "Nitrogen Phosphorus Potassium", "Magnesium Sulphate", "Single Superphosphate"],
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
  sectionLabel: { en: "02 — Services", ar: "02 — الخدمات", zh: "02 — 服务" } as L,
  headline: { en: "Our Services — ", ar: "خدماتنا — ", zh: "我们的服务——" } as L,
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
    "claims-technical-documentation": {
      title: { en: "Claims & Technical Documentation", ar: "المطالبات والتوثيق الفني", zh: "索赔与技术文件" },
      desc: {
        en: "Technical substantiation for claims, variation orders, and comprehensive operational documentation.",
        ar: "التأسيس الفني للمطالبات وأوامر التغيير والتوثيق التشغيلي الشامل.",
        zh: "为索赔、变更单提供技术依据，以及全面的运营文件编制。"
      }
    }
  } as Record<string, { title: Record<GatewayLocale, string>; desc: Record<GatewayLocale, string> }>,
};

export const tech = {
  sectionLabel: { en: "03 — Technologies", ar: "03 — التقنيات", zh: "03 — 技术" } as L,
  headline: { en: "Our domain in ", ar: "مجال تخصّصنا في ", zh: "我们的领域：" } as L,
  headlineAccent: { en: "inorganic chemistry", ar: "الكيمياء غير العضوية", zh: "无机化学" } as L,
  viewTech: { en: "View technology", ar: "استعراض التقنية", zh: "查看技术" } as L,
  completedProject: { en: "Completed project", ar: "مشروع مُنجَز", zh: "已完成项目" } as L,
  closingLine: {
    en: "If your plant is on this list, we've been inside one just like it — and we know where the problems hide.",
    ar: "إذا كان مصنعك في هذه القائمة، فقد عملنا من داخل مصنع مثله تماماً — ونعرف أين تختبئ المشاكل.",
    zh: "如果您的工厂在此列表中，我们曾在与之相同的工厂内部工作过——我们知道问题隐藏在哪里。"
  } as L,
};

export const trackRecord = {
  sectionLabel: { en: "04 — Experience", ar: "04 — الخبرات", zh: "04 — 经验" } as L,
  headline: { en: "Selected ", ar: "مشاريع ", zh: "精选" } as L,
  headlineAccent: { en: "Projects", ar: "مختارة", zh: "项目" } as L,
  fullTrackRecord: { en: "Full track record", ar: "السجل الكامل", zh: "完整业绩" } as L,
  quote: {
    en: "\u201cWe are an independent group of specialists — not project managers, not EPC subcontractors. Engineers who have operated these plants themselves.\u201d",
    ar: "\u201cنحن مجموعة مستقلة من المتخصصين — لسنا مدراء مشاريع ولا مقاولين من الباطن. مهندسون شغّلوا هذه المنشآت بأنفسهم.\u201d",
    zh: "\u201c我们是一群独立的专家——不是项目经理，不是EPC分包商。而是亲自运营过这些工厂的工程师。\u201d",
  } as L,
  disciplines: {
    en: [
      { label: "Process", desc: "Process engineering, commissioning, optimization" },
      { label: "Mechanical", desc: "Equipment selection, FAT attendance, maintenance" },
      { label: "Electrical", desc: "Instrumentation, control systems, safety systems" },
    ],
    ar: [
      { label: "العمليات", desc: "هندسة العمليات، التشغيل، التحسين" },
      { label: "الميكانيكا", desc: "اختيار المعدات، حضور FAT، الصيانة" },
      { label: "الكهرباء", desc: "الأجهزة، أنظمة التحكم، أنظمة السلامة" },
    ],
    zh: [
      { label: "工艺", desc: "工艺工程、调试、优化" },
      { label: "机械", desc: "设备选型、FAT出席、维护" },
      { label: "电气", desc: "仪表、控制系统、安全系统" },
    ],
  } as Record<GatewayLocale, { label: string; desc: string }[]>,
  projects: {
    en: [
      {
        phase: "Commissioning & Startup · Nov 2025 – Jan 2026",
        title: "Suez SOP Plant",
        tech: "K₂SO₄ · Mannheim Process · Chinese EPC",
        location: "Suez, Egypt",
        capacity: "40,000 T/yr"
      },
      {
        phase: "Granulation & Startup · March 2026",
        title: "Yanbu Granulation Facility",
        tech: "NPK · Granulation · Saudi Arabia",
        location: "Yanbu, KSA"
      }
    ],
    ar: [
      {
        phase: "التشغيل التجريبي وبدء التشغيل · نوفمبر 2025 - يناير 2026",
        title: "مصنع سلفات البوتاسيوم بالسويس",
        tech: "سلفات البوتاسيوم (K₂SO₄) · طريقة Mannheim · مقاول صيني",
        location: "السويس، مصر",
        capacity: "40,000 طن/سنة"
      },
      {
        phase: "التحبيب والتشغيل · مارس 2026",
        title: "منشأة تحبيب الأسمدة بينبع",
        tech: "NPK · التحبيب · المملكة العربية السعودية",
        location: "ينبع، السعودية"
      }
    ],
    zh: [
      {
        phase: "试车与启动 · 2025年11月 – 2026年1月",
        title: "苏伊士 SOP 硫酸钾厂",
        tech: "硫酸钾 (K₂SO₄) · 曼海姆法 · 中国总包商",
        location: "埃及，苏伊士",
        capacity: "40,000 吨/年"
      },
      {
        phase: "造粒与启动 · 2026年3月",
        title: "延布造粒装置",
        tech: "NPK · 造粒 · 沙特阿拉伯",
        location: "沙特，延布"
      }
    ]
  } as Record<GatewayLocale, { phase: string; title: string; tech: string; location: string; capacity?: string }[]>,
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
  attribution: { en: "— Kafaah — Production Optimization", ar: "— كفاءة — تحسين الإنتاج", zh: "— Kafaah — 生产优化" } as L,
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
  serviceOfInterest: { en: "Service of Interest", ar: "الخدمة المطلوبة", zh: "感兴趣的服务" } as L,
  selectService: { en: "Select a service…", ar: "اختر خدمة…", zh: "选择服务…" } as L,
  message: { en: "Message", ar: "الرسالة", zh: "留言" } as L,
  messagePlaceholder: { en: "Briefly describe your situation or question…", ar: "صف بإيجاز وضعك أو سؤالك…", zh: "简要描述您的情况或问题…" } as L,
  sendRequest: { en: "Send Consultation Request", ar: "إرسال طلب استشارة", zh: "发送咨询请求" } as L,
  locationLabel: { en: "📍 Cairo, Egypt", ar: "📍 القاهرة، مصر", zh: "📍 开罗，埃及" } as L,
  responseTime: { en: "⚡ Response within 24 hours", ar: "⚡ الرد خلال 24 ساعة", zh: "⚡ 24小时内回复" } as L,
  confidential: { en: "🔒 Confidential", ar: "🔒 سري", zh: "🔒 保密" } as L,
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
  name: { en: "Eng. Karim Hisham", ar: "م. كريم هشام", zh: "卡里姆·希沙姆 工程师" } as L,
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
  heroEyebrow: { en: "About", ar: "حول", zh: "关于" } as L,
  heroTitle: { en: "Who We Are", ar: "من نحن", zh: "关于我们" } as L,
  heroSub: {
    en: "An independent group of specialists — not project managers, not EPC subcontractors. Engineers who have operated these plants themselves.",
    ar: "مجموعة مستقلة من المتخصصين — لسنا مدراء مشاريع ولا مقاولين من الباطن. مهندسون شغّلوا هذه المنشآت بأنفسهم.",
    zh: "一群独立的专家——不是项目经理，不是EPC分包商。而是亲自运营过这些工厂的工程师。"
  } as L,
  intro: {
    en: "Kafaah Industrial Solutions is an independent Egyptian-founded consultancy specializing in inorganic chemical and fertilizer plant commissioning, startup, troubleshooting, and performance optimization.",
    ar: "كفاءة للحلول الصناعية شركة استشارية مستقلة تأسّست في مصر، متخصصة في بدء تشغيل مصانع الكيماويات غير العضوية والأسمدة واستكشاف أعطالها وتحسين أدائها.",
    zh: "Kafaah 工业解决方案是一家在埃及创立的独立咨询公司，专注于无机化工和化肥工厂的调试、启动、故障排除及性能优化。"
  } as L,
  p1: {
    en: "We bring 20 years of direct operational expertise across H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants. Our team has not only consulted on these plants — we have operated them. We have managed startups, resolved production crises, optimized yields, and trained the operators who run these facilities every day.",
    ar: "نمتلك 20 عامًا من الخبرة التشغيلية المباشرة في مصانع H₂SO₄ و H₃PO₄ و K₂SO₄ و NPK و MgSO₄ و SSP. فريقنا لم يكتفِ بتقديم الاستشارات لهذه المصانع — بل شغّلها بنفسه. أدرنا عمليات بدء التشغيل، وعالجنا أزمات الإنتاج، وحسّنّا الإنتاجية، ودرّبنا المشغّلين الذين يديرون هذه المرافق يوميًا.",
    zh: "我们在 H₂SO₄、H₃PO₄、K₂SO₄、NPK、MgSO₄ 和 SSP 工厂拥有20年直接运营经验。我们的团队不仅提供咨询——还亲自运营这些工厂。我们管理启动流程、解决生产危机、优化产量，并培训每天运行设施的操作员。"
  } as L,
  p2: {
    en: "The word Kafaah (كفاءة) means competence in Arabic. It is not a marketing name — it is our standard. Every engagement we accept must meet it.",
    ar: "كلمة كفاءة تعني الجدارة والإتقان. ليست مجرد اسم تسويقي — بل هي معيارنا. كل مشروع نقبله يجب أن يرقى إلى هذا المعيار.",
    zh: "Kafaah（كفاءة）在阿拉伯语中意为“能力与胜任”。这不是营销名称——而是我们的标准。我们承接的每个项目都必须达到这一标准。"
  } as L,
  whatMakesDifferent: { en: "What Makes Us Different", ar: "ما يميّزنا", zh: "我们的独特之处" } as L,
  diffFeatures: {
    en: [
      { title: "Independent", desc: "We have no relationships with EPC contractors, equipment vendors, or technology licensors. Our only obligation is to you." },
      { title: "Operational", desc: "We have run these plants. When we troubleshoot, we draw on real experience — not theoretical knowledge." },
      { title: "Chemical-Specific", desc: "We specialize in inorganic acids and specialty fertilizers. We do not try to cover every industry." },
      { title: "Results-Documented", desc: "We measure before and after. Our recommendations are backed by data, and our results are documented." }
    ],
    ar: [
      { title: "مستقلون", desc: "لا نرتبط بأي مقاول EPC أو مورّد معدات أو مرخّص تكنولوجيا. التزامنا الوحيد هو خدمة مشروعك." },
      { title: "تشغيليون", desc: "شغّلنا هذه المصانع بأنفسنا. حين نستكشف الأعطال نعتمد على خبرة واقعية، لا معرفة نظرية." },
      { title: "متخصصون كيميائيًا", desc: "نركّز حصريًا على الأحماض غير العضوية والأسمدة المتخصصة. لا نحاول تغطية كل صناعة." },
      { title: "نتائج موثّقة", desc: "نقيس الأداء قبل التدخّل وبعده. توصياتنا مدعومة بالبيانات، ونتائجنا موثّقة." }
    ],
    zh: [
      { title: "独立", desc: "我们与EPC承包商、设备供应商或技术许可方没有任何关系。我们的唯一义务是为您服务。" },
      { title: "实操性", desc: "我们曾经运营过这些工厂。当我们排除故障时，我们依靠真实的经验——而不是理论知识。" },
      { title: "专注于化学", desc: "我们专注于无机酸和特种肥料。我们不试图涵盖所有行业。" },
      { title: "结果有据可查", desc: "我们在前后进行测量。我们的建议有数据支持，并且我们的结果有据可查。" }
    ]
  } as Record<GatewayLocale, { title: string; desc: string }[]>,
  ourDomain: { en: "Our Domain", ar: "مجال تخصصنا", zh: "我们的领域" } as L,
  domainSub: {
    en: "We work exclusively in the inorganic chemical and fertilizer space. Our domain covers:",
    ar: "نعمل حصريًا في مجال الكيماويات غير العضوية والأسمدة. يغطّي تخصّصنا:",
    zh: "我们专注于无机化工和化肥领域。我们的领域涵盖："
  } as L,
  whereWeWork: { en: "Where We Work", ar: "أين نعمل", zh: "我们的工作地点" } as L,
  whereP1: {
    en: "Kafaah is based in Cairo, Egypt. Our work spans the MENA region — from industrial zones in Egypt (Cairo, Suez) to Saudi Arabia (Yanbu Industrial City) and the broader Gulf.",
    ar: "مقرّنا في القاهرة، مصر. يمتد عملنا عبر منطقة الشرق الأوسط وشمال أفريقيا — من المناطق الصناعية في مصر (القاهرة والسويس) إلى السعودية (مدينة ينبع الصناعية) ومنطقة الخليج العربي.",
    zh: "Kafaah总部位于埃及开罗。我们的业务覆盖中东北非地区——从埃及的工业区（开罗、苏伊士）到沙特阿拉伯（延布工业城）以及更广泛的海湾地区。"
  } as L,
  whereP2: {
    en: "We provide on-site services wherever the plant is located, with remote advisory and documentation review available between site visits.",
    ar: "نقدّم خدماتنا في الموقع أينما كان المصنع، مع إتاحة الاستشارات عن بُعد ومراجعة الوثائق بين الزيارات الميدانية.",
    zh: "无论工厂位于何处，我们都提供现场服务，并在现场访问之间提供远程咨询和文件审查。"
  } as L,
  howCanWeHelp: { en: "How can we ", ar: "كيف يمكننا ", zh: "我们如何" } as L,
  helpAccent: { en: "help you?", ar: "مساعدتك؟", zh: "帮助您？" } as L,
  ctaSub: { en: "Whether you are building, operating, or investing — we bring 20 years of direct experience to your problem.", ar: "سواء كنت تبني أو تشغّل أو تستثمر — نضع 20 عاماً من الخبرة المباشرة في خدمتك.", zh: "无论您是在建设、运营还是投资——我们将20年的直接经验带到您的项目中。" } as L,
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
        title: "Why EPC Handover is the Most Critical Phase of Your Plant",
        category: "Commissioning",
        date: "April 2026",
        excerpt:
          "The gap between 'mechanically complete' and 'operationally viable' is where most investors lose money. How an Owner's Engineer bridges this gap.",
      },
      {
        id: "2",
        title: "Common Pitfalls in Mannheim Furnace Refractory Curing",
        category: "Technical Troubleshooting",
        date: "March 2026",
        excerpt:
          "Incorrect curing of the SOP furnace refractory leads to premature failure and costly downtime. We review the standard procedure and where it usually goes wrong.",
      },
      {
        id: "3",
        title: "Optimizing NPK Granulation for High Ambient Humidity",
        category: "Production Optimization",
        date: "February 2026",
        excerpt:
          "Operating a granulation plant in the Gulf or Red Sea coast requires specific operational adjustments to maintain product quality and avoid caking.",
      },
    ],
    ar: [
      {
        id: "1",
        title: "لماذا يعتبر تسليم EPC المرحلة الأكثر حرجاً لمنشأتك",
        category: "التشغيل",
        date: "أبريل 2026",
        excerpt: "الفجوة بين 'مكتمل ميكانيكياً' و 'جاهز للتشغيل' هي حيث يخسر معظم المستثمرين أموالهم. كيف يسد مهندس المالك هذه الفجوة.",
      },
      {
        id: "2",
        title: "الأخطاء الشائعة في معالجة حراريات فرن مانهايم",
        category: "استكشاف الأخطاء الفنية",
        date: "مارس 2026",
        excerpt: "المعالجة غير الصحيحة لحراريات فرن سلفات البوتاسيوم تؤدي إلى الفشل المبكر وفترات التوقف المكلفة. نستعرض الإجراء القياسي وأين يحدث الخطأ عادة.",
      },
      {
        id: "3",
        title: "تحسين تحبيب NPK في ظروف الرطوبة المحيطة العالية",
        category: "تحسين الإنتاج",
        date: "فبراير 2026",
        excerpt: "تشغيل مصنع تحبيب في الخليج أو ساحل البحر الأحمر يتطلب تعديلات تشغيلية محددة للحفاظ على جودة المنتج وتجنب التكتل.",
      }
    ],
    zh: [
      {
        id: "1",
        title: "为什么EPC交接是您工厂最关键的阶段",
        category: "调试",
        date: "2026年4月",
        excerpt: "“机械完工”和“运营可行”之间的差距是大多数投资者亏损的地方。业主工程师如何弥合这一差距。",
      },
      {
        id: "2",
        title: "曼海姆熔炉耐火材料养护的常见陷阱",
        category: "技术故障排除",
        date: "2026年3月",
        excerpt: "SOP熔炉耐火材料的错误养护会导致过早失效和昂贵的停机时间。我们回顾标准程序以及通常出错的地方。",
      },
      {
        id: "3",
        title: "针对高环境湿度优化NPK造粒",
        category: "生产优化",
        date: "2026年2月",
        excerpt: "在海湾地区或红海沿岸运营造粒厂需要特定的运营调整，以保持产品质量并避免结块。",
      }
    ]
  } as Record<GatewayLocale, any[]>
};


/* ── Shared CTA ── */
export const shared = {
  getInTouch: { en: "Get in Touch", ar: "تواصل معنا", zh: "联系我们" } as L,
  howCanWeHelp: { en: "How can we ", ar: "كيف يمكننا ", zh: "我们如何" } as L,
  helpAccent: { en: "help you?", ar: "مساعدتك؟", zh: "帮助您？" } as L,
  cairoEgypt: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "开罗，埃及" } as L,
};
