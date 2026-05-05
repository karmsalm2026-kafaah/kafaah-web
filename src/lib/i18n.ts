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
  copyright: { en: "© 2026 Kafaah Industrial Solutions", ar: "© 2026 كفاءة للحلول الصناعية", zh: "© 2026 Kafaah 工业解决方案" } as L,
  independent: { en: "Independent", ar: "مستقلون", zh: "独立" } as L,
  technical: { en: "Technical", ar: "تقنيون", zh: "技术" } as L,
  operational: { en: "Operational", ar: "تشغيليون", zh: "运营" } as L,
};

/* ══════════════════════════════════════════════
   HOMEPAGE SECTIONS
   ══════════════════════════════════════════════ */
export const hero = {
  eyebrow: { en: "Independent Experts for Owners & EPCs", ar: "خبراء مستقلون لخدمة المُلّاك ومقاولي EPC", zh: "为业主和EPC提供独立专业支持" } as L,
  headline: {
    en: ["Engineering", "certainty", "for critical plants."],
    ar: ["نُهندس", "اليقين", "للمصانع الحرجة."],
    zh: ["为关键工厂", "铸造", "工程确定性。"],
  } as LArr,
  subCopy: {
    en: "Independent technical oversight for Owners, and expert commissioning support for EPCs — bringing 20 years of direct operational experience to H₂SO₄, H₃PO₄, K₂SO₄, NPK, MgSO₄, and SSP plants.",
    ar: "إشراف فني مستقل لحماية المُلّاك، ودعم متخصص في التشغيل لمقاولي EPC — نضع 20 عاماً من الخبرة التشغيلية المباشرة في مصانع H₂SO₄ و H₃PO₄ و K₂SO₄ و NPK و MgSO₄ و SSP.",
    zh: "为业主提供独立的技术监督，为EPC提供专业的调试支持——将20年的直接运营经验应用于 H₂SO₄、H₃PO₄、K₂SO₄、NPK、MgSO₄ 及 SSP 工厂。",
  } as L,
  exploreServices: { en: "Explore Services", ar: "اكتشف خدماتنا", zh: "探索服务" } as L,
  ourTrackRecord: { en: "Our Track Record", ar: "سجلّ إنجازاتنا", zh: "我们的业绩" } as L,
  statsLabels: {
    en: ["Years of Operation", "Core Technologies", "Service Verticals", "Independent"],
    ar: ["عامًا من الخبرة", "تقنيات أساسية", "قطاعات خدمية", "مستقلون"],
    zh: ["年运营经验", "核心技术", "服务领域", "独立运营"],
  } as LArr,
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
};

export const services = {
  sectionLabel: { en: "02 — Services", ar: "02 — الخدمات", zh: "02 — 服务" } as L,
  headline: { en: "What we ", ar: "ما الذي ", zh: "我们" } as L,
  headlineAccent: { en: "do", ar: "نقدّمه", zh: "做什么" } as L,
  allServices: { en: "All Services", ar: "جميع الخدمات", zh: "所有服务" } as L,
  exploreService: { en: "Explore service", ar: "اكتشف الخدمة", zh: "了解服务" } as L,
  bottomTagline: { en: "End-to-end plant lifecycle support", ar: "دعم شامل لكامل دورة حياة المنشأة", zh: "全生命周期工厂支持" } as L,
};

export const tech = {
  sectionLabel: { en: "03 — Technologies", ar: "03 — التقنيات", zh: "03 — 技术" } as L,
  headline: { en: "Our domain in ", ar: "مجال تخصّصنا في ", zh: "我们的领域：" } as L,
  headlineAccent: { en: "inorganic chemistry", ar: "الكيمياء غير العضوية", zh: "无机化学" } as L,
  viewTech: { en: "View technology", ar: "استعراض التقنية", zh: "查看技术" } as L,
  completedProject: { en: "Completed project", ar: "مشروع مُنجَز", zh: "已完成项目" } as L,
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
  getInTouch: { en: "Get in Touch", ar: "تواصل معنا", zh: "联系我们" } as L,
  sendEmail: { en: "Send Email", ar: "إرسال بريد", zh: "发送邮件" } as L,
  fullName: { en: "Full Name", ar: "الاسم الكامل", zh: "全名" } as L,
  company: { en: "Company", ar: "الشركة", zh: "公司" } as L,
  serviceOfInterest: { en: "Service of Interest", ar: "الخدمة المطلوبة", zh: "感兴趣的服务" } as L,
  selectService: { en: "Select a service…", ar: "اختر خدمة…", zh: "选择服务…" } as L,
  message: { en: "Message", ar: "الرسالة", zh: "留言" } as L,
  messagePlaceholder: { en: "Briefly describe your situation or question…", ar: "صف بإيجاز وضعك أو سؤالك…", zh: "简要描述您的情况或问题…" } as L,
  sendRequest: { en: "Send Consultation Request", ar: "إرسال طلب استشارة", zh: "发送咨询请求" } as L,
  locationLabel: { en: "📍 Cairo, Egypt", ar: "📍 القاهرة، مصر", zh: "📍 开罗，埃及" } as L,
  responseTime: { en: "⚡ Response within 24 hours", ar: "⚡ الرد خلال 24 ساعة", zh: "⚡ 24小时内回复" } as L,
  confidential: { en: "🔒 Confidential", ar: "🔒 سري", zh: "🔒 保密" } as L,
};

/* ══════════════════════════════════════════════
   INNER PAGES
   ══════════════════════════════════════════════ */
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
