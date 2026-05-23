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
    en: "Ready to discuss your project?",
    ar: "هل أنت مستعد لمناقشة مشروعك؟",
    zh: "准备好探讨您的项目了吗？"
  } as L,
  ctaDesc: {
    en: "Let's talk about where your project stands — and where Kafaah can provide the technical support it needs.",
    ar: "دعنا نتحدث عن تقدم سير مشروعك حالياً — وكيف يمكن لكفاءة تقديم الدعم الفني اللازم له.",
    zh: "让我们开诚布公地聊聊您项目的当前进展——以及 Kafaah 如何为其注入所需的高价值技术支持。"
  } as L,
  btnContact: { en: "CONTACT KAFAAH", ar: "اتصل بكفاءة", zh: "联系 KAFAAH" } as L,
  btnServices: { en: "VIEW OUR SERVICES", ar: "عرض خدماتنا", zh: "浏览我们的服务" } as L,
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
