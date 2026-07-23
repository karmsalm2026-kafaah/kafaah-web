"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Settings,
  Award,
  Globe,
  Briefcase,
  AlertTriangle,
  Scale,
  FileText,
  Search,
  Mic,
  FolderOpen,
  TrendingDown,
  Wrench,
  Clock,
  Ruler,
  FlaskConical,
  Factory,
  Coins,
  X,
  Check,
  Plus,
  ClipboardList,
  Layers,
  ShieldAlert,
  CheckCircle2,
  Activity,
  FileCheck,
  GitMerge,
  TrendingUp
} from "lucide-react";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { isRtl } from "@/lib/i18n";
import type { Service } from "@/data/services";
import type { Technology } from "@/data/technologies";

interface Props {
  service: Service;
  relatedTechs: Technology[];
}

const getAudienceLabel = (audience: "owner" | "epc" | "both") => {
  if (audience === "owner") return "Project Owner Representative";
  if (audience === "epc") return "EPC Contractor Technical Partner";
  return "Flexible Owner & EPC Advisory";
};

// Dictionary for the high-fidelity Expert Witness service page matching HTML structure
const expertWitnessDict: Record<string, any> = {
  hero: {
    tag: { en: "Service Advisory", ar: "استشارات فنية متخصصة", zh: "专业服务咨询" },
    titlePart1: { en: "Expert Witness & ", ar: "الشهادة الخبيرة و", zh: "专家证人与 " },
    titlePart2: { en: "Technical Dispute Resolution", ar: "حل النزاعات التقنية", zh: "技术争议解决" },
    sub: {
      en: "Independent Technical Opinion for Chemical, Fertilizer & Industrial Project Disputes",
      ar: "رأي فني مستقل لنزاعات مشاريع الكيماويات والأسمدة والصناعة",
      zh: "化工、肥料及工业项目争议的独立技术意见"
    },
    desc: {
      en: "Clear, defensible technical analysis to support claims, arbitration, and contractual disputes — built on 20+ years of hands-on process engineering experience.",
      ar: "تحليل فني واضح وقابل للدفاع عنه لدعم المطالبات والتحكيم والنزاعات التعاقدية — مبني على أكثر من 20 عاماً من الخبرة العملية في هندسة العمليات.",
      zh: "清晰且立足稳固的技术分析，支持索赔、仲裁及合同争议——基于 20 余年一线工艺工程实践经验。"
    },
    btnPrimary: { en: "Request Consultation →", ar: "طلب استشارة فنية ←", zh: "请求技术咨询 →" },
    btnSecondary: { en: "Download Brochure ⬇", ar: "تحميل الملف التعريفي ⬇", zh: "下载服务说明 ⬇" }
  },
  trustStrip: {
    en: [
      { title: "Independent Opinion", desc: "Unbiased technical assessment of the facts", icon: Scale },
      { title: "Defensible Reports", desc: "Evidence-based findings, clearly documented", icon: FileText },
      { title: "Root Cause Analysis", desc: "Technical investigation into process & equipment failures", icon: Search },
      { title: "Testimony Support", desc: "Clear presentation for arbitration & litigation", icon: Mic },
    ],
    ar: [
      { title: "رأي مستقل", desc: "تقييم فني محايد للحقائق بناءً على البيانات والمستندات", icon: Scale },
      { title: "تقارير قابلة للدفاع", desc: "نتائج موثقة ومبنية على الأدلة والتحليلات الفنية", icon: FileText },
      { title: "تحليل الأسباب الجذرية", desc: "تحقيق فني في أعطال العمليات والمعدات الصناعية", icon: Search },
      { title: "دعم الشهادة", desc: "تقديم فني واضح أمام هيئات التحكيم والمحاكم", icon: Mic },
    ],
    zh: [
      { title: "独立技术意见", desc: "对事实进行无偏见的技术评估", icon: Scale },
      { title: "立足稳固的报告", desc: "基于事实证据、记录清晰的调查结果", icon: FileText },
      { title: "根本原因分析", desc: "针对工艺和设备故障的技术调查", icon: Search },
      { title: "庭审证言支持", desc: "为仲裁和诉讼 provide 清晰的技术呈堂证供", icon: Mic },
    ]
  },
  whySection: {
    eyebrow: { en: "Why Expert Witness Support?", ar: "لماذا الدعم كشاهد خبير؟", zh: "为什么需要专家证人支持？" },
    title: {
      en: "Why Do Industrial Disputes Need an Independent Technical Expert?",
      ar: "لماذا تحتاج النزاعات الصناعية إلى خبير فني مستقل؟",
      zh: "为什么工业项目争议需要独立的工程技术专家？"
    },
    desc: {
      en: "Disputes on chemical and fertilizer projects are rarely just commercial — at their core they involve process design, equipment performance, and engineering judgment. An independent technical expert translates the engineering facts into a clear, defensible opinion the parties, arbitrators, or courts can rely on.",
      ar: "النزاعات في مشاريع الكيماويات والأسمدة نادراً ما تكون تجارية فقط — فهي ترتكز في جوهرها على تصميم العمليات، وأداء المعدات، والتقدير الهندسي. يقوم الخبير الفني المستقل بترجمة الحقائق الهندسية إلى رأي واضح وقابل للدفاع عنه تعتمد عليه الأطراف أو المحكّمون أو المحاكم.",
      zh: "化工和化肥项目的争议很少仅仅是商业争议——其核心往往涉及工艺设计、设备性能和工程判断。独立的工程专家将复杂工程事实转化为清晰、立足稳固的意见，供各方、仲裁员或法院参考依赖。"
    },
    challengesCard: {
      title: { en: "Common Dispute Challenges", ar: "تحديات النزاعات الشائعة", zh: "常见争议挑战" },
      items: {
        en: [
          "Conflicting technical narratives",
          "Ambiguous contract & guarantee wording",
          "Unclear root cause of failure",
          "Disputed performance test results",
          "Delay & extension of time claims",
          "Lack of independent technical record"
        ],
        ar: [
          "روايات فنية متضاربة بين الأطراف",
          "صياغة غامضة للعقود والضمانات",
          "عدم وضوح السبب الجذر للعطل",
          "نتائج اختبارات الأداء المتنازع عليها",
          "مطالبات التأخير وتمديد الوقت (EOT)",
          "غياب السجل الفني المستقل"
        ],
        zh: [
          "各方技术陈述相互冲突",
          "合同和性能保证条款措辞模糊",
          "故障根本原因难以厘清",
          "性能测试结果存在争议",
          "工期延误与工期索赔",
          "缺乏独立的第三方技术记录"
        ]
      }
    },
    contributionCard: {
      title: { en: "Our Contribution", ar: "مساهمتنا في حسم النزاع", zh: "我们的核心价值" },
      items: {
        en: [
          "Independent technical investigation",
          "Root cause & causation analysis",
          "Guarantee & specification interpretation",
          "Performance data review & verification",
          "Formal expert reports",
          "Testimony & hearing support"
        ],
        ar: [
          "تحقيق فني هندسي مستقل",
          "تحليل السبب الجذر والسبية",
          "تفسير مواصفات التصميم والضمانات",
          "مراجعة وتحقيق بيانات الأداء التشغيلي",
          "إعداد تقارير الخبراء الرسمية",
          "الشهادة ودعم الجلسات التحكيمية"
        ],
        zh: [
          "独立客观的技术调查",
          "根本原因与因果关系分析",
          "性能保证与技术规范履约解读",
          "运行数据审阅与交叉验证",
          "出具正式专家报告",
          "仲裁庭审证言与技术答辩支持"
        ]
      }
    }
  },
  scopeSection: {
    eyebrow: { en: "Service Scope", ar: "نطاق الخدمة", zh: "服务范围" },
    title: { en: "Our Service Scope", ar: "نطاق خدماتنا التفصيلي", zh: "服务范围与核心交付" },
    cards: {
      en: [
        {
          num: "1", title: "1. Case Assessment", icon: FolderOpen,
          items: ["Document & Contract Review", "Technical Merit Screening", "Guarantee & Spec Interpretation", "Preliminary Findings Memo", "Scope & Fee Proposal"]
        },
        {
          num: "2", title: "2. Technical Investigation", icon: Search,
          items: ["Site Inspection & Data Review", "Root Cause Analysis", "Process & Equipment Assessment", "Performance Data Verification", "Causation Analysis"]
        },
        {
          num: "3", title: "3. Expert Reporting", icon: FileText,
          items: ["Formal Expert Report", "Independent Technical Opinion", "Quantum-Supporting Technical Basis", "Response to Opposing Expert", "Report Revisions"]
        },
        {
          num: "4", title: "4. Hearing & Testimony", icon: Mic,
          items: ["Arbitration / Litigation Support", "Expert Testimony", "Cross-Examination Preparation", "Technical Presentations", "Settlement & Mediation Support"]
        }
      ],
      ar: [
        {
          num: "1", title: "1. تقييم القضية", icon: FolderOpen,
          items: ["مراجعة المستندات والعقود", "الفحص الفني لاستحقاق المطالبة", "تفسير الضمانات والمواصفات", "مذكرة النتائج الأولية", "مقترح نطاق العمل والأتعاب"]
        },
        {
          num: "2", title: "2. التحقيق الفني", icon: Search,
          items: ["المعاينة الميدانية ومراجعة البيانات", "تحليل الأسباب الجذرية (RCA)", "تقييم العمليات والمعدات", "التحقق من بيانات الأداء", "تحليل السببية"]
        },
        {
          num: "3", title: "3. تقرير الخبير", icon: FileText,
          items: ["تقرير الخبير الرسمي", "الرأي الفني المستقل", "الأساس الفني الداعم للمطالبة المالية", "الرد على تقارير خبراء الخصوم", "مراجعات وتنقيب التقرير"]
        },
        {
          num: "4", title: "4. الجلسات والشهادة", icon: Mic,
          items: ["دعم جلسات التحكيم والقضاء", "تقديم الشهادة الخبيرة", "الإعداد لاستجواب الخصوم", "العروض الفنية التوضيحية", "دعم الوساطة والتسوية"]
        }
      ],
      zh: [
        {
          num: "1", title: "1. 案件评估", icon: FolderOpen,
          items: ["文件与合同审查", "技术合理性初筛", "性能保证与规范解读", "初步调查结果备忘录", "工作范围与费用建议"]
        },
        {
          num: "2", title: "2. 技术调查", icon: Search,
          items: ["现场勘查与运行数据审查", "根本原因分析 (RCA)", "工艺与设备评估", "性能测试数据核实", "因果关系推导"]
        },
        {
          num: "3", title: "3. 专家报告", icon: FileText,
          items: ["正式专家出证报告", "独立技术意见书", "支持索赔金额的技术依据", "对反方专家报告的辩驳回应", "报告修订与完善"]
        },
        {
          num: "4", title: "4. 庭审与质询", icon: Mic,
          items: ["仲裁/诉讼全流程支持", "专家出庭作证", "交叉质询准备", "技术演示文稿制备", "和解与调解技术支持"]
        }
      ]
    }
  },
  risksSection: {
    eyebrow: { en: "Cases & Disputes", ar: "القضايا والنزاعات", zh: "支持的案件与争议类型" },
    title: { en: "Disputes & Claims We Support", ar: "النزاعات والمطالبات التي ندعمها", zh: "我们支持的争议与索赔类型" },
    cards: {
      en: [
        { title: "Performance Guarantee Disputes", icon: TrendingDown },
        { title: "Equipment Non-Conformance Claims", icon: Wrench },
        { title: "Delay & Extension of Time Claims", icon: Clock },
        { title: "Design & Process Deviation Disputes", icon: Ruler },
        { title: "Product Quality & Off-Spec Claims", icon: FlaskConical },
        { title: "Scope & Specification Interpretation", icon: FileText },
        { title: "Plant Failure & Incident Investigation", icon: Factory },
        { title: "Cost & Variation Claims", icon: Coins },
      ],
      ar: [
        { title: "نزاعات ضمانات الأداء", icon: TrendingDown },
        { title: "مطالبات عدم مطابقة المعدات", icon: Wrench },
        { title: "مطالبات التأخير وتمديد الوقت", icon: Clock },
        { title: "نزاعات الانحراف عن التصميم", icon: Ruler },
        { title: "مطالبات جودة المنتج والإنتاج المخالف", icon: FlaskConical },
        { title: "تفسير نطاق العمل والمواصفات", icon: FileText },
        { title: "التحقيق في حوادث وأعطال المصانع", icon: Factory },
        { title: "مطالبات التكاليف وأوامر التغيير", icon: Coins },
      ],
      zh: [
        { title: "性能保证违约争议", icon: TrendingDown },
        { title: "设备不合格与缺陷索赔", icon: Wrench },
        { title: "工期延误与延长工期索赔", icon: Clock },
        { title: "设计与工艺偏离争议", icon: Ruler },
        { title: "产品质量与不合格品索赔", icon: FlaskConical },
        { title: "工作范围与技术规范解读", icon: FileText },
        { title: "工厂故障与事故责任调查", icon: Factory },
        { title: "变更单与费用追加索赔", icon: Coins },
      ]
    }
  },
  whyKafaah: {
    eyebrow: { en: "Why Kafaah?", ar: "لماذا كفاءة؟", zh: "为什么选择 Kafaah？" },
    title: { en: "Why Choose Kafaah as Your Technical Expert?", ar: "لماذا تختار كفاءة كخبير فني لستشارتك؟", zh: "为什么选择 Kafaah 作为您的技术专家？" },
    items: {
      en: [
        "Independent & Unbiased Technical Opinion",
        "Chemical & Fertilizer Process Specialists",
        "20+ Years of Hands-On Plant Experience",
        "Experience Representing Both Owners & EPC Contractors",
        "Clear, Well-Documented Technical Reporting",
        "Comfortable Presenting Findings Under Scrutiny"
      ],
      ar: [
        "رأي فني مستقل وغير محيز بدون تضارب مصالح",
        "متخصصون دقيقون في عمليات الكيماويات والأسمدة",
        "أكثر من 20 عاماً من الخبرة التشغيلية الميدانية",
        "خبرة واسعة في تمثيل كل من الملاك ومقاولي EPC",
        "تقارير فنية واضحة وموثقة بدقة للأطراف غير الفنية",
        "تمكّن احترافي من تقديم وتفنيد النتائج أمام جلسات التحكيم"
      ],
      zh: [
        "独立客观、无利益冲突的技术意见",
        "深耕无机化工与特种肥料工艺",
        "20余年工厂一线实操与运营经验",
        "具备代表业主与代表EPC承包商的双向经验",
        "面向非技术法官/仲裁员的严谨清晰报告",
        "在严苛的交叉质询下从容呈堂证供"
      ]
    }
  },
  faqSection: {
    eyebrow: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", zh: "常见问题解答" },
    title: { en: "Questions Parties Ask Before Engaging a Technical Expert", ar: "أسئلة تطرحها الأطراف قبل الاستعانة بخبير فني", zh: "聘请技术专家前各方常问的问题" },
    items: {
      en: [
        {
          q: "What does an expert witness do?",
          a: "An expert witness provides an independent, evidence-based technical opinion on the engineering questions at the heart of a dispute — such as whether a design met specification, whether equipment failed due to a manufacturing defect or operating conditions, or whether a performance guarantee was met. The opinion is prepared to support arbitration, litigation, or direct negotiation between the parties."
        },
        {
          q: "What kinds of disputes does Kafaah support?",
          a: "Kafaah's expertise centers on sulfuric acid, phosphoric acid, potassium sulfate (Mannheim process), NPK, MgSO₄, SSP, and CaCl₂ facilities. We support performance guarantee disputes, equipment non-conformance claims, delay and extension of time claims, off-spec product claims, and process design or specification disagreements between owners, EPC contractors, and licensors."
        },
        {
          q: "Who can engage Kafaah as an expert?",
          a: "Kafaah can be engaged by plant owners, EPC contractors, insurers, or legal counsel — but never by more than one party on the same dispute. This keeps our technical opinion independent and free of conflicts of interest, which is essential for the opinion to carry weight in arbitration or before a court."
        },
        {
          q: "What does an expert report include?",
          a: "A Kafaah expert report sets out the technical facts, the methodology used to investigate them, and a reasoned, evidence-based opinion on the questions in dispute. Reports are written to be understood by non-technical readers — legal counsel, arbitrators, judges — while remaining rigorous enough to withstand cross-examination by an opposing expert."
        },
        {
          q: "How early should Kafaah be engaged in a dispute?",
          a: "As early as possible. Early engagement allows Kafaah to review site conditions, data, and documentation before evidence degrades or is lost, and to help legal counsel frame the technical questions correctly from the outset — which strengthens the case regardless of which stage it eventually reaches."
        }
      ],
      ar: [
        {
          q: "ماذا يفعل الشاهد الخبير؟",
          a: "يقدم الشاهد الخبير رأياً فنياً مستقلاً وقائماً على الأدلة حول الأسئلة الهندسية التي تشكل جوهر النزاع — مثل ما إذا كان التصميم قد استوفى المواصفات، أو ما إذا كانت المعدات قد تعطلت بسبب عيب تصنيعي أو ظروف تشغيلية، أو ما إذا كان ضمان الأداء قد تحقق. يُعد التقرير لدعم التحكيم أو القضاء أو المفاوضات المباشرة بين الأطراف."
        },
        {
          q: "ما هي أنواع النزاعات التي تدعمها كفاءة؟",
          a: "تتركز خبرة كفاءة في مصانع حمض الكبريتيك، حمض الفوسفوريك، سلفات البوتاسيوم (عملية مانهايم)، NPK، كبريتات المغنيسيوم، وسوبر فوسفات أحادي. ندعم نزاعات ضمانات الأداء، ومطالبات عدم مطابقة المعدات، ومطالبات التأخير وتمديد الوقت، ومطالبات المنتجات المخالفة للمواصفات، وخلافات تصميم العمليات بين الملاك ومقاولي EPC والمرخصين."
        },
        {
          q: "من يمكنه التعاقد مع كفاءة كخبير فني؟",
          a: "يمكن التعاقد مع كفاءة من قبل ملاك المصانع، أو مقاولي EPC، أو شركات التأمين، أو المكاتب القانونية — ولكن لا يمكن التعاقد مع أكثر من طرف واحد في نفس النزاع لضمان استقلالية رأينا الفني وعدم وجود أي تضارب في المصالح."
        },
        {
          q: "ماذا يتضمن تقرير الخبير الفني؟",
          a: "يحدد تقرير الخبير من كفاءة الحقائق الهندسية، والمنهجية المستخدمة في التحقيق، ورأياً مستنداً إلى الأدلة حول الأسئلة المتنازع عليها. تُصاغ التقارير ليفهمها غير المتخصصين فنياً — المحامون، المحكّمون، القضاة — مع الحفاظ على الرصانة الهندسية الصارمة الصامدة أمام الاستجواب."
        },
        {
          q: "متى يجب الاستعانة بـ كفاءة في النزاع؟",
          a: "في أبكر وقت ممكن. يتيح التدخل المبكر لكفاءة مراجعة ظروف الموقع والبيانات والمستندات قبل تلف الأدلة أو ضياعها، ومساعدة الفريق القانوني على صياغة الأسئلة الفنية بشكل صحيح منذ البداية."
        }
      ],
      zh: [
        {
          q: "专家证人主要承担什么工作？",
          a: "专家证人针对争议核心的工程问题提供独立、基于证据的技术意见——例如设计是否符合规范、设备故障是由制造缺陷还是运行条件引起的，或者是否达到了性能保证指标。该意见旨在支持仲裁、诉讼或各方之间的直接谈判。"
        },
        {
          q: "Kafaah 支持哪些类型的工业争议？",
          a: "Kafaah 的专业知识集中在硫酸、磷酸、硫酸钾（曼海姆法）、NPK、硫酸镁和单超磷酸钙设施。我们支持业主、EPC 承包商和专利商之间的性能保证争议、设备不合格索赔、工期延误索赔、不合格产品索赔以及工艺设计争议。"
        },
        {
          q: "谁可以聘请 Kafaah 作为技术专家？",
          a: "工厂业主、EPC 承包商、保险公司或法律顾问均可聘请 Kafaah——但在同一争议中绝不同时代表多方。这保证了我们技术意见的独立性，避免利益冲突。"
        },
        {
          q: "专家出证报告包含哪些内容？",
          a: "Kafaah 专家报告阐明了工程事实、调查方法以及针对争议问题的合理证据意见。报告的书写旨在使非技术读者（法律顾问、仲裁员、法官）能够理解，同时保持严谨性，能够承受反方专家的质询。"
        },
        {
          q: "应在争议的什么阶段聘请 Kafaah？",
          a: "越早越好。早期介入使 Kafaah 能够在证据恶化或丢失前审查现场条件和数据，并帮助法律团队从一开始就准确界定技术问题。"
        }
      ]
    }
  },
  finalCta: {
    eyebrow: { en: "Request Technical Consult", ar: "طلب استشارة فنية", zh: "请求技术咨询" },
    titleLine1: {
      en: "Get an Independent,",
      ar: "احصل على رأي فني مستقل",
      zh: "获取独立且立足稳固的"
    },
    titleLine2: {
      en: "Defensible Technical Opinion",
      ar: "وقابل للدفاع عنه",
      zh: "技术意见"
    },
    desc: {
      en: "Whether you are preparing a claim, defending one, or heading into arbitration, Kafaah brings independent process engineering expertise to the table.",
      ar: "سواء كنت تجهّز مطالبات، أو تدافع عنها، أو تتجه إلى التحكيم، تقدم كفاءة خبرة هندسة العمليات المستقلة لطاولة المفاوضات.",
      zh: "无论您是在准备索赔、抗辩索赔还是前往仲裁，Kafaah 都能为您带来独立的工艺工程专业知识。"
    },
    primaryBtn: { en: "Talk to an Expert →", ar: "التحدث مع خبير ←", zh: "与专家交谈 →" },
    secondaryBtn: { en: "Download Capability Statement ⬇", ar: "تحميل ملف القدرات ⬇", zh: "下载能力说明书 ⬇" }
  }
};

// High-Fidelity Custom View for Expert Witness & Technical Dispute Resolution (matching HTML layout & exact content)
function ExpertWitnessView({ service, relatedTechs }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroData = expertWitnessDict.hero;
  const trustStripItems = expertWitnessDict.trustStrip[locale] || expertWitnessDict.trustStrip.en;
  const whyData = expertWitnessDict.whySection;
  const scopeData = expertWitnessDict.scopeSection.cards[locale] || expertWitnessDict.scopeSection.cards.en;
  const risksData = expertWitnessDict.risksSection.cards[locale] || expertWitnessDict.risksSection.cards.en;
  const whyKafaahItems = expertWitnessDict.whyKafaah.items[locale] || expertWitnessDict.whyKafaah.items.en;
  const faqItems = expertWitnessDict.faqSection.items[locale] || expertWitnessDict.faqSection.items.en;
  const ctaData = expertWitnessDict.finalCta;

  return (
    <>
      {/* 0. Hero Header Section with responsive viewport height & transparent glassmorphism trust strip bar */}
      <header className="relative min-h-[100dvh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-between bg-navy-deep pt-28 sm:pt-32 lg:pt-36 pb-0 border-b border-white/[0.08]">
        {/* Chemical Engineering Process Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/expert_witness_mobile.webp" />
            <source media="(min-width: 769px)" srcSet="/expert_witness_engineer_blueprint.webp" />
            <img
              src="/expert_witness_engineer_blueprint.webp"
              alt="Engineer with Hardhat and Blueprints — Expert Witness & Technical Dispute Resolution"
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Fading gradient matching Homepage Hero: dark deep navy overlay on the text side */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-b md:bg-gradient-to-l" : "max-md:bg-gradient-to-b md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>{heroData.tag[locale]}</span>
            </div>

            {/* H1 Title with Natural Inline Title Flow */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              <span className="text-cloud">{heroData.titlePart1[locale]} </span>
              <span className="text-gold font-bold drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle - slightly reduced size */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-2.5 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description - slightly reduced size */}
            <p className="text-[12.5px] xs:text-[13px] sm:text-[14px] font-light text-silver/80 leading-relaxed max-w-[530px] mb-7">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons optimized for 360px mobile view */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnSecondary[locale]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. Trust Strip Bar at bottom of 100vh with 92% opacity and clear dividers */}
        <div
          className="relative z-10 w-full backdrop-blur-md border-t border-white/[0.2] py-6 transition-all duration-500"
          style={{ backgroundColor: "rgba(10, 24, 48, 0.92)" }}
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.22]">
              {trustStripItems.map((item: any, i: number) => {
                const IconComp = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 pt-4 pb-4 sm:py-0 sm:px-6 first:px-0 first:pt-0 sm:first:pt-0">
                    <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center shrink-0 text-gold bg-gold/10 shadow-[0_0_12px_rgba(229,193,88,0.2)]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-semibold text-cloud mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-light text-silver/85 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Why Expert Witness Support? (With 2-Card Comparison Box) */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Section Header & Overview text */}
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line">
                  {whyData.eyebrow[locale]}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-start">
                  {whyData.desc[locale]}
                </p>
              </FadeIn>
            </div>

            {/* Right: 2-Card Comparison Box matching HTML structure */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

                  {/* Card 1: Common Dispute Challenges */}
                  <div className="flex-1 bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-rose-400 mb-5 pb-3 border-b border-white/10">
                      {whyData.challengesCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.challengesCard.items[locale] || whyData.challengesCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/85">
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-navy-dark shrink-0">
                      <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  {/* Card 2: Our Contribution */}
                  <div className="flex-1 bg-navy-card/60 backdrop-blur-md border border-gold/30 p-6 rounded-sm shadow-lg">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-gold/20">
                      {whyData.contributionCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.contributionCard.items[locale] || whyData.contributionCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-cloud">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Scope (4-Column Card Grid matching HTML scope-grid) */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {expertWitnessDict.scopeSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {expertWitnessDict.scopeSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeData.map((card: any, idx: number) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 rounded-sm hover:border-gold/40 hover:bg-navy-card-hover/60 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6 bg-navy-deep group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-4 group-hover:text-gold transition-colors">
                        {card.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {card.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="text-xs font-light text-silver/80 flex items-start gap-2">
                            <span className="text-gold font-semibold">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Disputes & Claims We Support (8-Card Cases Grid matching HTML risk-grid-cards) */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {expertWitnessDict.risksSection.eyebrow[locale]}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {expertWitnessDict.risksSection.title[locale]}
            </h3>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risksData.map((item: any, idx: number) => {
              const CaseIcon = item.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.06}>
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.1] hover:border-gold/30 p-6 rounded-sm text-center flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CaseIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-cloud leading-snug">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Kafaah Section matching HTML why-projects-section */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
                  {expertWitnessDict.whyKafaah.eyebrow[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2]">
                  {expertWitnessDict.whyKafaah.title[locale]}
                </h3>
                <div className="w-12 h-[2px] bg-gold mt-4" />
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {whyKafaahItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-navy-card/30 border border-white/[0.08] rounded-sm hover:border-gold/30 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <p className="text-sm font-light text-silver/90 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section matching HTML toggle feature */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn className="mb-14">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {expertWitnessDict.faqSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {expertWitnessDict.faqSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="border border-white/[0.12] bg-navy-card/40 rounded-sm overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-base font-medium text-cloud">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm font-light text-silver/80 leading-relaxed border-t border-white/[0.05]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section (Content on left side, stacked equal-size buttons on right side) */}
      <section className="py-24 bg-navy-dark relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Content Side (2-Line Heading & Paragraph) */}
            <div className="text-left rtl:text-right max-w-2xl flex-1">
              {/* Eyebrow Tag */}
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3 inline-block">
                {ctaData.eyebrow[locale]}
              </div>

              {/* 2-Line Heading with standardized section title font size */}
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.25] tracking-tight">
                <span className="block text-cloud">{ctaData.titleLine1[locale]}</span>
                <span className="block text-gold">{ctaData.titleLine2[locale]}</span>
              </h2>

              {/* Gold Divider */}
              <div className="w-12 h-[2px] bg-gold my-4" />

              {/* Paragraph Description Underneath */}
              <p className="text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-xl">
                {ctaData.desc[locale]}
              </p>
            </div>

            {/* Vertically Stacked Equal-Size Buttons Side (Centered text & icon inside) */}
            <div className="flex flex-col items-center gap-3.5 w-full sm:w-[340px] shrink-0">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 text-navy-deep bg-gold hover:bg-gold-light transition-all rounded-sm shadow-md whitespace-nowrap w-full"
              >
                <span>{ctaData.primaryBtn[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/30 hover:border-white text-cloud font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 hover:bg-white/5 transition-all rounded-sm whitespace-nowrap w-full"
              >
                <span>{ctaData.secondaryBtn[locale]}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-deep relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

// Dictionary for Construction & Commissioning Support matching HTML structure
const constructionCommissioningDict: Record<string, any> = {
  hero: {
    tag: { en: "Service Advisory", ar: "استشارات فنية متخصصة", zh: "专业服务咨询" },
    titlePart1: { en: "Construction & ", ar: "دعم الإنشاءات و", zh: "施工与 " },
    titlePart2: { en: "Commissioning Support", ar: "بدء التشغيل والدخول في الخدمة", zh: "试车与调试支持" },
    sub: {
      en: "Bridging Construction Completion and Commissioning Sequences",
      ar: "الربط المحكم بين اكتمال الأعمال الميكانيكية ومتتاليات بدء التشغيل",
      zh: "桥接机械竣工与试车调试序列"
    },
    desc: {
      en: "Structured pre-startup verification that connects mechanical completion to a safe, systematic start-up — closing the gap where schedule pressure creates the most risk.",
      ar: "تحقق منهجي مسبق يربط بين الإنجاز الميكانيكي والتشغيل المنظم والآمن — لغلق الفجوة في أكثر مراحل المشروع انضغاطاً وخطورة.",
      zh: "结构化的开车前验证，将机械竣工与安全、系统的试车连接起来——填补工期压力带来最大风险的中间空白。"
    },
    btnPrimary: { en: "Request Consultation →", ar: "طلب استشارة فنية ←", zh: "请求技术咨询 →" },
    btnSecondary: { en: "Download Brochure ⬇", ar: "تحميل الملف التعريفي ⬇", zh: "下载服务说明 ⬇" }
  },
  trustStrip: {
    en: [
      { title: "Mechanical Completion", desc: "Verify systems are complete & ready to test", icon: ShieldCheck },
      { title: "Punch List Management", desc: "Structured tracking & closure of open items", icon: ClipboardList },
      { title: "Systemization", desc: "Organize plant into testable, handoverable systems", icon: Layers },
      { title: "Pre-Startup Safety Review", desc: "Confirm readiness before introducing feed", icon: ShieldAlert },
    ],
    ar: [
      { title: "الإنجاز الميكانيكي", desc: "التحقق من اكتمال الأنظمة وجاهزيتها للاختبار", icon: ShieldCheck },
      { title: "إدارة قائمة النقاط (Punch List)", desc: "تتبع منهجي وإغلاق دقيق للنقاط المتبقية", icon: ClipboardList },
      { title: "تقسيم الأنظمة (Systemization)", desc: "تنظيم المصنع إلى أنظمة قابلة للاختبار والتسليم", icon: Layers },
      { title: "مراجعة السلامة (PSSR)", desc: "تأكيد الجاهزية التامة قبل تغذية المواد الخام", icon: ShieldAlert },
    ],
    zh: [
      { title: "机械竣工验证", desc: "核实系统是否完整并具备测试条件", icon: ShieldCheck },
      { title: "尾项清单管理", desc: "尾项的结构化跟踪与闭环销项", icon: ClipboardList },
      { title: "系统化划分", desc: "将工厂划分为可测试、可交付的独立系统", icon: Layers },
      { title: "开车前安全审查", desc: "在进料前全面确认系统安全就绪", icon: ShieldAlert },
    ]
  },
  whySection: {
    eyebrow: { en: "Why Structured Handover Support?", ar: "لماذا الدعم المنهجي لتسليم المصانع؟", zh: "为什么需要结构化的交接支持？" },
    title: {
      en: "Why Bridge Construction and Commissioning Deliberately?",
      ar: "لماذا الجسر المحكم بين الإنشاءات وبدء التشغيل ضرورة؟",
      zh: "为什么必须审慎地桥接施工与试车阶段？"
    },
    desc: {
      en: "The handover from construction to commissioning is where schedule pressure is highest and documentation discipline tends to slip — yet it's also where gaps become safety incidents or start-up delays. A structured, independent bridge between the two phases keeps completion status honest and start-up readiness real, not assumed.",
      ar: "إن مرحلة التسليم من الإنشاءات إلى بدء التشغيل هي المرحلة التي يصل فيها الضغط الزمني إلى أقصاه وتبدأ فيها انضباطية التوثيق بالتراجع — ومع ذلك، فهي نفس المرحلة التي تتحول فيها الفجوات الصغيرة إلى حوادث سلامة أو تأخيرات تشغيلية باهظة. وجود جسر مستقل ومنهجي بين المرحلتين يحافظ على مصداقية حالة الاكتمال ويضمن الجاهزية الفعلية وليس المفترضة.",
      zh: "从施工到试车的交接是工期压力最大、文档纪律最易松懈的时期——但这也正是遗漏极易演变成安全事故或开车延误的地方。在两阶段之间建立独立、结构化的桥梁，能保持竣工状态真实透明，确保开车就绪切实可行而非凭空假设。"
    },
    challengesCard: {
      title: { en: "Common Handover Risks", ar: "مخاطر التسليم الشائعة", zh: "常见交接风险" },
      items: {
        en: [
          "Incomplete punch lists",
          "Poorly sequenced systemization",
          "Untested utility & instrument loops",
          "Missing pre-commissioning records",
          "Rushed pre-startup safety reviews",
          "Unclear system handover boundaries"
        ],
        ar: [
          "قوائم نقاط غير مكتملة (Incomplete Punch Lists)",
          "تقسيم أنظمة سيئ التسلسل الزمني",
          "دوائر مرافق وأجهزة قياس غير مختبرة",
          "سجلات وسندات ما قبل التشغيل المفقودة",
          "مراجعات سلامة مسبقة مستعجلة قبل الفيد",
          "حدود مبهمة وغير واضحة لتسليم الأنظمة"
        ],
        zh: [
          "尾项清单整改不彻底",
          "系统化划分与逻辑顺序混乱",
          "公用工程与仪表回路未经测试",
          "预试车记录与交接档案缺失",
          "仓促开展开车前安全审查 (PSSR)",
          "系统交接界区划分模糊"
        ]
      }
    },
    contributionCard: {
      title: { en: "Our Contribution", ar: "مساهمتنا في النجاح", zh: "我们的核心交付" },
      items: {
        en: [
          "Mechanical completion verification",
          "Structured punch list closure",
          "System-by-system pre-commissioning",
          "Loop & function testing oversight",
          "PSSR facilitation",
          "Formal handover certification"
        ],
        ar: [
          "تحقق واثبات ميداني للاكتمال الميكانيكي",
          "إغلاق وتتبع منهجي لقوائم الملاحظات",
          "إعداد واختبار كل نظام على حدة (System-by-System)",
          "إشراف دقيق على اختبار الحلقات والدوال (Loop Testing)",
          "تيسير وتسهيل مراجعة السلامة المسبقة (PSSR)",
          "إصدار شهادات واعتمادات التسليم الرسمية"
        ],
        zh: [
          "严谨的机械竣工现场核验",
          "结构化的尾项销项闭环管理",
          "逐个系统的预试车与单机调试",
          "回路与功能测试全程监督",
          "主导与推进开车前安全审查 (PSSR)",
          "颁发正式的系统交接与竣工认证"
        ]
      }
    }
  },
  scopeSection: {
    eyebrow: { en: "Service Scope", ar: "نطاق الخدمة", zh: "服务范围" },
    title: { en: "Our Service Scope", ar: "نطاق خدماتنا التفصيلي", zh: "服务范围与核心交付" },
    cards: {
      en: [
        {
          num: "1", title: "1. Mechanical Completion", icon: ShieldCheck,
          items: ["Completion Verification", "Punch List Categorization (A/B/C)", "Walkdown Inspections", "As-Built Reconciliation", "Completion Certification"]
        },
        {
          num: "2", title: "2. Systemization", icon: Layers,
          items: ["System Boundary Definition", "System Turnover Packages", "Utility & Instrument Loop Checks", "Pre-Commissioning Test Records", "System Acceptance"]
        },
        {
          num: "3", title: "3. Pre-Commissioning & Testing", icon: FlaskConical,
          items: ["Flushing & Cleaning Verification", "Loop & Function Testing", "Rotating Equipment Checks", "Interlock & Safety System Testing", "Punch List B/C Closure"]
        },
        {
          num: "4", title: "4. Pre-Startup Readiness", icon: CheckCircle2,
          items: ["Pre-Startup Safety Review (PSSR)", "Start-Up Procedure Review", "Readiness Checklist Sign-Off", "Commissioning Sequence Verification", "Handover to Operations"]
        }
      ],
      ar: [
        {
          num: "1", title: "1. الإنجاز الميكانيكي", icon: ShieldCheck,
          items: ["التحقق الميداني من الإنجاز الميكانيكي", "تصنيف قائمة الملاحظات (A / B / C)", "جولات التفتيش المعاينية (Walkdowns)", "مطابقة الرسومات التنفيذية (As-Built)", "إصدار شهادات الإنجاز الرسمي"]
        },
        {
          num: "2", title: "2. تقسيم الأنظمة", icon: Layers,
          items: ["تحديد حدود ونطاق كل نظام (Boundaries)", "حزم تسليم الأنظمة (Turnover Packages)", "فحص دوائر الأجهزة والمرافق", "سجلات اختبارات ما قبل التشغيل", "قبول وتسلم الأنظمة المستقلة"]
        },
        {
          num: "3", title: "3. ما قبل التشغيل والاختبار", icon: FlaskConical,
          items: ["التحقق من غسيل وتنظيف الأنابيب", "اختبار الوظائف والحلقات (Loop Testing)", "فحص المعدات الدوارة (Rotating Eq.)", "اختبار أنظمة الأمان والأنترلوك", "إغلاق ملاحظات الفئة B و C"]
        },
        {
          num: "4", title: "4. الجاهزية المسبقة للبدء", icon: CheckCircle2,
          items: ["مراجعة السلامة قبل التشغيل (PSSR)", "مراجعة واعتماد إجراءات بدء التشغيل", "توقيع قوائم مراجعة الجاهزية", "التحقق من متتاليات خطط التشغيل", "التسليم الرسمي لفريق التشغيل"]
        }
      ],
      zh: [
        {
          num: "1", title: "1. 机械竣工", icon: ShieldCheck,
          items: ["机械竣工核实与现场巡检", "尾项清单分类 (A/B/C)", "现场联合走字 (Walkdown)", "竣工图纸 (As-Built) 对账", "竣工证书签发"]
        },
        {
          num: "2", title: "2. 系统化划分", icon: Layers,
          items: ["系统交接界区划分 (Boundaries)", "系统 Turnover Packages 包编制", "公用工程与仪表回路检查", "预试车测试记录归档", "系统单体签署与接收"]
        },
        {
          num: "3", title: "3. 预试车与单机吹扫", icon: FlaskConical,
          items: ["管道吹扫与清洗吹洗验证", "回路与连锁功能测试", "动设备单体试运转检查", "安全联锁与 SIS 系统测试", "B/C 类尾项销项闭环"]
        },
        {
          num: "4", title: "4. 开车前就绪确认", icon: CheckCircle2,
          items: ["开车前安全审查 (PSSR) 主导", "开车操作规程审阅", "就绪检查表 (Checklist) 销号", "试车逻辑与步骤验证", "正式移交生产运营团队"]
        }
      ]
    }
  },
  risksSection: {
    eyebrow: { en: "Handover Risks Caught", ar: "المخاطر التي نكتشفها ونمنعها", zh: "我们排查与化解的交接风险" },
    title: { en: "Handover-Stage Risks We Catch", ar: "مخاطر مرحلة التسليم التي نكتشفها ونمنعها", zh: "我们排查与化解的交接阶段风险" },
    cards: {
      en: [
        { title: "Incomplete Punch Lists", icon: ClipboardList },
        { title: "Untested Instrument Loops", icon: Activity },
        { title: "Missing Pre-Commissioning Records", icon: FileCheck },
        { title: "Systemization Gaps", icon: Layers },
        { title: "Rushed PSSR Reviews", icon: ShieldAlert },
        { title: "Interlock & Safety System Gaps", icon: AlertTriangle },
        { title: "Unclear Handover Boundaries", icon: GitMerge },
        { title: "Sequencing Conflicts", icon: Clock },
      ],
      ar: [
        { title: "قوائم ملاحظات غامضة أو غير مكتملة", icon: ClipboardList },
        { title: "دوائر أجهزة وأنابيب غير مختبرة", icon: Activity },
        { title: "سجلات واختبارات مفككة أو مفقودة", icon: FileCheck },
        { title: "فجوات في تحديد حدود الأنظمة", icon: Layers },
        { title: "مراجعات سلامة (PSSR) متسرعة", icon: ShieldAlert },
        { title: "ثغرات في أنظمة الأنترلوك والسلامة", icon: AlertTriangle },
        { title: "حدود تسليم مبهمة بين المقاول والمالك", icon: GitMerge },
        { title: "تعارضات خطط ومتتاليات التشغيل", icon: Clock },
      ],
      zh: [
        { title: "尾项清单整改遗漏", icon: ClipboardList },
        { title: "仪表回路未完成校验", icon: Activity },
        { title: "预试车文件与记录缺失", icon: FileCheck },
        { title: "系统划分界区混乱", icon: Layers },
        { title: "PSSR 审查走过场与流于形式", icon: ShieldAlert },
        { title: "联锁与安全保护逻辑缺陷", icon: AlertTriangle },
        { title: "施工与运营交接界区不明", icon: GitMerge },
        { title: "试车逻辑与工期顺序冲突", icon: Clock },
      ]
    }
  },
  whyKafaah: {
    eyebrow: { en: "Why Kafaah?", ar: "لماذا كفاءة؟", zh: "为什么选择 Kafaah？" },
    title: { en: "Why Choose Kafaah for Construction & Commissioning Support?", ar: "لماذا تختار كفاءة لدعم الإنشاءات وبدء التشغيل؟", zh: "为什么选择 Kafaah 作为施工与试车支持团队？" },
    items: {
      en: [
        "Independent Verification of Completion Status",
        "Chemical & Fertilizer Process Specialists",
        "20+ Years of Hands-On Commissioning Experience",
        "Structured, Checklist-Driven Methodology",
        "Works Alongside Construction & Commissioning Teams",
        "Reduces Start-Up Delays & Rework"
      ],
      ar: [
        "تحقق فني مستقل ومحايد من حالة اكتمال الأعمال الميكانيكية",
        "متخصصون دقيقون في عمليات الكيماويات والأسمدة الثقيلة",
        "أكثر من 20 عاماً من الخبرة العملية الميدانية في تشغيل المصانع",
        "منهجية صارمة قائمة على قوائم تدقيق واختبارات موثقة",
        "العمل جنباً إلى جنب مع فرق الإنشاءات والتشغيل للطرفين",
        "تقليل تأخيرات بدء التشغيل وإلغاء الحاجة لإعادة الأعمال (Rework)"
      ],
      zh: [
        "独立客观核验工程竣工与真实完成状态",
        "深耕无机化工与化肥工艺核心技术",
        "20余年一线工厂试车与开车实操经验",
        "基于 Checklist 表格的标准化管理方法",
        "与施工团队及业主运营团队高效无缝协同",
        "大幅缩短试车延误，减少现场返工"
      ]
    }
  },
  faqSection: {
    eyebrow: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", zh: "常见问题解答" },
    title: { en: "Questions Owners Ask Before the Commissioning Handover", ar: "أسئلة يطرحها الملاك قبل تسليم بدء التشغيل", zh: "业主在试车交接前常问的问题" },
    items: {
      en: [
        {
          q: "What is Construction & Commissioning Support?",
          a: "It's independent, structured verification of the handover between construction completion and commissioning — confirming mechanical completion, organizing the plant into testable systems, and driving pre-startup readiness so start-up begins on a verified, documented basis rather than an assumed one."
        },
        {
          q: "What's the difference between mechanical completion and systemization?",
          a: "Mechanical completion confirms that construction work on an individual piece of equipment or line is physically finished and matches the design. Systemization groups completed equipment into logical, testable systems with defined boundaries, so pre-commissioning and testing can proceed system by system rather than piecemeal."
        },
        {
          q: "Does Kafaah participate in Pre-Startup Safety Reviews (PSSR)?",
          a: "Yes. Kafaah facilitates or participates in PSSRs to confirm that punch list items, safety system testing, procedures, and training are genuinely complete before feed is introduced — not just scheduled or assumed complete under time pressure."
        },
        {
          q: "Can Kafaah help close out punch lists?",
          a: "Yes, this is a core part of the service. Kafaah categorizes punch items by priority, tracks closure against the commissioning schedule, and verifies that items marked complete actually meet the design and construction requirements before sign-off."
        },
        {
          q: "At what stage should Kafaah be engaged?",
          a: "Ideally a few months before mechanical completion, so that systemization and pre-commissioning planning can be established ahead of time. Kafaah can also be brought in mid-handover if punch lists or testing records are already falling behind schedule."
        },
        {
          q: "How is this different from the Owner's Engineer service?",
          a: "Owner's Engineer support spans the full project lifecycle, from engineering through construction and commissioning. Construction & Commissioning Support is a focused engagement on the handover window itself — often engaged directly by owners who need dedicated attention on this specific, high-risk stage."
        }
      ],
      ar: [
        {
          q: "ما هو دعم الإنشاءات وبدء التشغيل؟",
          a: "هو تحقق مستقل ومنهجي لعملية التسليم بين اكتمال الأعمال الميكانيكية وبدء التشغيل — يتضمن تأكيد الإنجاز الميكانيكي، وتنظيم المصنع إلى أنظمة قابلة للاختبار، وقيادة الجاهزية المسبقة لتبدأ عمليات التشغيل على أساس موثق ومثبت بدلاً من الافتراضات."
        },
        {
          q: "ما الفرق بين الإنجاز الميكانيكي وتقسيم الأنظمة (Systemization)؟",
          a: "الإنجاز الميكانيكي يؤكد أن أعمال الإنشاء لمعدة أو خط معين قد انتهت فيزيائياً وتطابق التصميم. بينما يقوم تقسيم الأنظمة بتجميع المعدات المكتملة في أنظمة منطقية وقابلة للاختبار بذاتها وبحدود واضحة."
        },
        {
          q: "هل تشارك كفاءة في مراجعات السلامة قبل التشغيل (PSSR)؟",
          a: "نعم. تقود كفاءة وتشارك في مراجعات PSSR لتأكيد أن بنود قائمة الملاحظات واختبارات أنظمة الأمان والإجراءات قد اكتملت بالفعل قبل التغذية بالمواد الخام."
        },
        {
          q: "هل يمكن لـ كفاءة المساعدة في إغلاق قائمة الملاحظات (Punch Lists)؟",
          a: "نعم، هذا جزء محوري من الخدمة. تقوم كفاءة بتصنيف الملاحظات حسب الأولوية، وتتبع إغلاقها ومطابقتها للتصميم قبل التوقيع النهائي."
        },
        {
          q: "في أي مرحلة ينبغي الاستعانة بـ كفاءة؟",
          a: "مثالياً، قبل أشهر قليلة من الإنجاز الميكانيكي لتأسيس تقسيم الأنظمة وخطط ما قبل التشغيل. كما يمكن الاستعانة بنا في منتصف مرحلة التسليم إذا كان التوثيق متأخراً."
        },
        {
          q: "كيف تختلف هذه الخدمة عن خدمة مهندس المالك (Owner's Engineer)؟",
          a: "تغطي خدمة مهندس المالك الدورة الكاملة للمشروع من التصميم حتى التسليم. أما دعم الإنشاءات والتشغيل فيركز تحديداً على نافذة التسليم الحرجة بين الإنجاز والتشغيل."
        }
      ],
      zh: [
        {
          q: "什么是施工与试车支持服务？",
          a: "它是对施工竣工与试车交接过程进行的独立、结构化核验——确认机械竣工状态、将工厂划分为可测试系统，并推进开车前就绪确认，确保试车在真实验证、文档齐全的基础上展开。"
        },
        {
          q: "机械竣工与系统化划分 (Systemization) 有何区别？",
          a: "机械竣工确认单个设备或管道的施工在物理上已完成并符合设计。系统化划分则是将已竣工的设备组合成逻辑独立、界区清晰的可测试系统，以便逐个系统推进预试车。"
        },
        {
          q: "Kafaah 是否参与开车前安全审查 (PSSR)？",
          a: "是的。Kafaah 主导或参与 PSSR，以确认尾项销项、安全系统测试、操作规程和人员培训在投料进料前确实已真实完成。"
        },
        {
          q: "Kafaah 能否协助闭环销号尾项清单 (Punch Lists)？",
          a: "可以，这是该服务的心部分。Kafaah 按优先级对尾项进行分类，对照试车计划跟踪整改进度，并在签署销号前核验整改质量。"
        },
        {
          q: "应该在项目的什么阶段聘请 Kafaah？",
          a: "理想情况下应在机械竣工前数月介入，以便提前建立系统划分与预试车计划。若交接中途尾项或测试记录落后于计划，也可随时引入 Kafaah。"
        },
        {
          q: "该服务与业主工程师 (Owner's Engineer) 服务有何区别？",
          a: "业主工程师服务贯穿全生命周期（工程、采购、施工、试车）。而施工与试车支持服务则是专注于交接窗口期的高强度针对性支持。"
        }
      ]
    }
  },
  finalCta: {
    eyebrow: { en: "Request Technical Consult", ar: "طلب استشارة فنية", zh: "请求技术咨询" },
    titleLine1: {
      en: "Ensure a Safe, Structured Path",
      ar: "ضمن مساراً آمناً ومنظماً",
      zh: "确保从施工到开车的"
    },
    titleLine2: {
      en: "from Construction to Start-Up",
      ar: "من الإنشاءات إلى بدء التشغيل",
      zh: "安全结构化通途"
    },
    desc: {
      en: "Close the gap between mechanical completion and commissioning with structured, independent pre-startup verification.",
      ar: "أغلق الفجوة بين الإنجاز الميكانيكي وبدء التشغيل مع التحقق المنهجي المستقل قبل البدء.",
      zh: "通过结构化、独立的开车前验证，弥合机械竣工与试车调试之间的缝隙。"
    },
    primaryBtn: { en: "Talk to an Expert →", ar: "التحدث مع خبير ←", zh: "与专家交谈 →" },
    secondaryBtn: { en: "Download Capability Statement ⬇", ar: "تحميل ملف القدرات ⬇", zh: "下载能力说明书 ⬇" }
  }
};

function ConstructionCommissioningView({ service, relatedTechs }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroData = constructionCommissioningDict.hero;
  const trustStripItems = constructionCommissioningDict.trustStrip[locale] || constructionCommissioningDict.trustStrip.en;
  const whyData = constructionCommissioningDict.whySection;
  const scopeData = constructionCommissioningDict.scopeSection.cards[locale] || constructionCommissioningDict.scopeSection.cards.en;
  const risksData = constructionCommissioningDict.risksSection.cards[locale] || constructionCommissioningDict.risksSection.cards.en;
  const whyKafaahItems = constructionCommissioningDict.whyKafaah.items[locale] || constructionCommissioningDict.whyKafaah.items.en;
  const faqItems = constructionCommissioningDict.faqSection.items[locale] || constructionCommissioningDict.faqSection.items.en;
  const ctaData = constructionCommissioningDict.finalCta;

  return (
    <>
      {/* 0. Hero Header Section matching Homepage Hero structure */}
      <header className="relative min-h-[100dvh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-between bg-navy-deep pt-28 sm:pt-32 lg:pt-36 pb-0 border-b border-white/[0.08]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/construction_commissioning_mobile.webp" />
            <source media="(min-width: 769px)" srcSet="/construction_commissioning_hero_bg.webp" />
            <img
              src="/construction_commissioning_hero_bg.webp"
              alt="Construction & Commissioning Support — Kafaah Industrial"
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Fading gradient */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-b md:bg-gradient-to-l" : "max-md:bg-gradient-to-b md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>{heroData.tag[locale]}</span>
            </div>

            {/* H1 Title with Natural Inline Title Flow */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              <span className="text-cloud">{heroData.titlePart1[locale]} </span>
              <span className="text-gold font-bold drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-2.5 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-[12.5px] xs:text-[13px] sm:text-[14px] font-light text-silver/80 leading-relaxed max-w-[530px] mb-7">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons optimized for 360px mobile view */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnSecondary[locale]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. Trust Strip Bar at bottom of 100vh with 92% opacity and clear dividers */}
        <div
          className="relative z-10 w-full backdrop-blur-md border-t border-white/[0.2] py-6 transition-all duration-500"
          style={{ backgroundColor: "rgba(10, 24, 48, 0.92)" }}
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.22]">
              {trustStripItems.map((item: any, i: number) => {
                const IconComp = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 pt-4 pb-4 sm:py-0 sm:px-6 first:px-0 first:pt-0 sm:first:pt-0">
                    <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center shrink-0 text-gold bg-gold/10 shadow-[0_0_12px_rgba(229,193,88,0.2)]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-semibold text-cloud mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-light text-silver/85 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Why Section with 2-Card Comparison Box */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line">
                  {whyData.eyebrow[locale]}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-start">
                  {whyData.desc[locale]}
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

                  <div className="flex-1 bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-rose-400 mb-5 pb-3 border-b border-white/10">
                      {whyData.challengesCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.challengesCard.items[locale] || whyData.challengesCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/85">
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-navy-dark shrink-0">
                      <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <div className="flex-1 bg-navy-card/60 backdrop-blur-md border border-gold/30 p-6 rounded-sm shadow-lg">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-gold/20">
                      {whyData.contributionCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.contributionCard.items[locale] || whyData.contributionCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-cloud">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Scope */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {constructionCommissioningDict.scopeSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {constructionCommissioningDict.scopeSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeData.map((card: any, idx: number) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 rounded-sm hover:border-gold/40 hover:bg-navy-card-hover/60 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6 bg-navy-deep group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-4 group-hover:text-gold transition-colors">
                        {card.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {card.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="text-xs font-light text-silver/80 flex items-start gap-2">
                            <span className="text-gold font-semibold">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Risks We Catch (8 Cards) */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {constructionCommissioningDict.risksSection.eyebrow[locale]}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {constructionCommissioningDict.risksSection.title[locale]}
            </h3>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risksData.map((item: any, idx: number) => {
              const CaseIcon = item.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.06}>
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.1] hover:border-gold/30 p-6 rounded-sm text-center flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CaseIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-cloud leading-snug">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Kafaah */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
                  {constructionCommissioningDict.whyKafaah.eyebrow[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2]">
                  {constructionCommissioningDict.whyKafaah.title[locale]}
                </h3>
                <div className="w-12 h-[2px] bg-gold mt-4" />
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {whyKafaahItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-navy-card/30 border border-white/[0.08] rounded-sm hover:border-gold/30 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <p className="text-sm font-light text-silver/90 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn className="mb-14">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {constructionCommissioningDict.faqSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {constructionCommissioningDict.faqSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="border border-white/[0.12] bg-navy-card/40 rounded-sm overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-base font-medium text-cloud">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm font-light text-silver/80 leading-relaxed border-t border-white/[0.05]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 bg-navy-dark relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="text-left rtl:text-right max-w-2xl flex-1">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3 inline-block">
                {ctaData.eyebrow[locale]}
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.25] tracking-tight">
                <span className="block text-cloud">{ctaData.titleLine1[locale]}</span>
                <span className="block text-gold">{ctaData.titleLine2[locale]}</span>
              </h2>

              <div className="w-12 h-[2px] bg-gold my-4" />

              <p className="text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-xl">
                {ctaData.desc[locale]}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full sm:w-[340px] shrink-0">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 text-navy-deep bg-gold hover:bg-gold-light transition-all rounded-sm shadow-md whitespace-nowrap w-full"
              >
                <span>{ctaData.primaryBtn[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/30 hover:border-white text-cloud font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 hover:bg-white/5 transition-all rounded-sm whitespace-nowrap w-full"
              >
                <span>{ctaData.secondaryBtn[locale]}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-deep relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

// Dictionary for Expert Process & Engineering Support matching HTML structure
const processEngineeringSupportDict: Record<string, any> = {
  hero: {
    tag: { en: "Service Advisory", ar: "استشارات فنية متخصصة", zh: "专业工程咨询" },
    titlePart1: { en: "Expert Process & ", ar: "الدعم الهندسي و", zh: "专业工艺与 " },
    titlePart2: { en: "Engineering Support", ar: "عمليات الهندسة المستقلة", zh: "工程技术支持" },
    sub: {
      en: "Independent Process Engineering Review Through Basic & Detailed Engineering",
      ar: "مراجعة مستقلة لهندسة العمليات خلال مراحل التصميم الأساسي والتفصيلي",
      zh: "基础工程与详细设计阶段的独立工艺工程审查"
    },
    desc: {
      en: "Catch design gaps before they reach procurement and construction — independent review of PFDs, P&IDs, heat & mass balances, and engineering deliverables, built on 20+ years of hands-on process experience.",
      ar: "كشف الفجوات التصميمية قبل وصولها لمراحل التوريد والإنشاءات — مراجعة مستقلة لمخططات التدفق PFDs و P&IDs وموازنات الحرارة والمادة، مبنية على أكثر من 20 عاماً من الخبرة العملية.",
      zh: "在项目进入采购与施工前及时发现设计缺陷——基于 20 余年一线工艺经验，对 PFD、P&ID、热与物料衡算及工程交付物进行独立审查。"
    },
    btnPrimary: { en: "Request Consultation →", ar: "طلب استشارة فنية ←", zh: "请求技术咨询 →" },
    btnSecondary: { en: "Download Brochure ⬇", ar: "تحميل الملف التعريفي ⬇", zh: "下载服务说明 ⬇" }
  },
  trustStrip: {
    en: [
      { title: "Process Design Review", desc: "Independent check of PFDs, P&IDs & balances", icon: Ruler },
      { title: "Deliverable QA", desc: "Verify engineering packages meet design basis", icon: ClipboardList },
      { title: "HAZOP & Safety Support", desc: "Participate in HAZOP/HAZID studies", icon: ShieldAlert },
      { title: "Early Issue Detection", desc: "Catch design gaps while still cheap to fix", icon: Clock },
    ],
    ar: [
      { title: "مراجعة تصميم العمليات", desc: "فحص مستقل لمخططات PFDs و P&IDs والموازنات", icon: Ruler },
      { title: "ضمان جودة المخرجات", desc: "التحقق من مطابقة الحزم الهندسية لأساس التصميم", icon: ClipboardList },
      { title: "دعم HAZOP والسلامة", desc: "المشاركة المباشرة في دراسات HAZOP و HAZID", icon: ShieldAlert },
      { title: "الاكتشاف المبكر للمشكلات", desc: "كشف أخطاء التصميم وهي ما تزال منخفضة التكلفة للتقويم", icon: Clock },
    ],
    zh: [
      { title: "工艺设计审查", desc: "独立检查 PFD、P&ID 及物料衡算", icon: Ruler },
      { title: "交付物质量保证", desc: "验证工程软件包符合设计基础", icon: ClipboardList },
      { title: "HAZOP 与安全支持", desc: "深度参与 HAZOP/HAZID 风险评估分析", icon: ShieldAlert },
      { title: "早期问题识别", desc: "在修改成本低廉的阶段消除设计隐患", icon: Clock },
    ]
  },
  whySection: {
    eyebrow: { en: "Why Independent Engineering Review?", ar: "لماذا المراجعة الهندسية المستقلة؟", zh: "为什么需要独立工程审查？" },
    title: {
      en: "Why Review Basic & Detailed Engineering Independently?",
      ar: "لماذا تتم مراجعة الهندسة الأساسية والتفصيلية بشكل مستقل؟",
      zh: "为什么需要在基础工程与详细设计阶段引入独立审查？"
    },
    desc: {
      en: "Design errors are cheapest to fix on paper and most expensive once they reach the field. An independent process engineering review during Basic and Detailed Engineering gives the owner a second set of experienced eyes on the design — catching inconsistencies, sizing errors, and design basis deviations before they are locked into procurement and construction.",
      ar: "تكون أخطاء التصميم أقل تكلفة بكثير عند معالجتها على الورق، وتصبح باهظة التكلفة فور وصولها للموقع. تمنح المراجعة المستقلة لمهندسي العمليات صاحب المشروع عيناً خبيرة ثانية على التصميم — لكشف التناقضات وأخطاء الأحجام والحيود عن أسس التصميم قبل اعتمادها للتوريد والإنشاءات.",
      zh: "设计图纸上的修改成本最低，而一旦进入施工现场，修改费用将成倍增加。ใน基础工程和详细设计阶段引入独立工艺工程审查，为业主 provide 第二双专业的眼睛——在采购和施工锁定前，及时发现不一致、尺寸计算错误及偏差。"
    },
    challengesCard: {
      title: { en: "Common Engineering-Stage Risks", ar: "المخاطر الشائعة في مرحلة الهندسة", zh: "工程阶段常见风险" },
      items: {
        en: [
          "Inconsistent PFDs & P&IDs",
          "Heat & mass balance errors",
          "Equipment under/oversizing",
          "Missed HAZOP actions",
          "Design basis deviations",
          "Late-stage design changes"
        ],
        ar: [
          "عدم اتساق مخططات PFDs و P&IDs",
          "أخطاء في موازنات الحرارة والمادة",
          "حسابات خطأ لإنقاص/زيادة أحجام المعدات",
          "إغفال مخرجات وإجراءات HAZOP",
          "الحيود والانحراف عن أسس التصميم",
          "تعديلات التصميم المتأخرة باهظة التكلفة"
        ],
        zh: [
          "PFD 与 P&ID 存在不一致",
          "热与物料衡算计算错误",
          "设备选型尺寸过大或过小",
          "遗漏 HAZOP 风险追踪项",
          "背离项目设计基础要求",
          "后期产生高昂的设计变更"
        ]
      }
    },
    contributionCard: {
      title: { en: "Our Contribution", ar: "مساهمتنا وحلولنا", zh: "我們的核心价值与贡献" },
      items: {
        en: [
          "Independent PFD & P&ID review",
          "Heat & mass balance verification",
          "Equipment sizing & datasheet review",
          "HAZOP / HAZID participation",
          "Design basis compliance checks",
          "Early issue detection & resolution"
        ],
        ar: [
          "مراجعة مستقلة ودقيقة لمخططات PFD و P&ID",
          "التحقق الفني من موازنات الحرارة والمادة",
          "مراجعة أوراق بيانات المعدات وحسابات أحجامها",
          "المشاركة الفعالة في جلسات HAZOP / HAZID",
          "فحص مطابقة أسس التصميم والاشتراطات",
          "الاكتشاف والحل المبكر للمشكلات التصميمية"
        ],
        zh: [
          "独立的 PFD 与 P&ID 全面审查",
          "热与物料衡算数据精准复核",
          "设备选型尺寸及数据表核查",
          "全程参与 HAZOP / HAZID 风险评估",
          "严格核查设计基础符合性",
          "早期发现问题并ᨀ供解决方案"
        ]
      }
    }
  },
  scopeSection: {
    eyebrow: { en: "Service Scope", ar: "نطاق الخدمة", zh: "服务范围" },
    title: { en: "Our Service Scope", ar: "نطاق خدماتنا الهندسية", zh: "<ctrl42>我們的工程服务范围" },
    cards: {
      en: [
        {
          title: "1. Design Basis Review",
          icon: FileCheck,
          items: [
            "Feed & Product Specifications",
            "Process Design Criteria",
            "Site & Utility Conditions",
            "Licensor Basic Design Package",
            "Feasibility Cross-Check"
          ]
        },
        {
          title: "2. Basic Engineering Review",
          icon: Ruler,
          items: [
            "PFD & Heat/Mass Balance Review",
            "Equipment List & Sizing Review",
            "P&ID Development Review",
            "HAZOP / HAZID Participation",
            "Utility & Offsite Requirements"
          ]
        },
        {
          title: "3. Detailed Engineering Review",
          icon: FlaskConical,
          items: [
            "Detailed P&ID Review",
            "Line Sizing & Hydraulics",
            "Equipment Datasheets & Specs",
            "Instrumentation & Control Philosophy",
            "Vendor Drawing Review"
          ]
        },
        {
          title: "4. Design Assurance & Handover",
          icon: CheckCircle2,
          items: [
            "Constructability Review",
            "Deviation & Change Management",
            "Engineering Query Resolution",
            "Final Design Package Verification",
            "Handover to Procurement"
          ]
        }
      ],
      ar: [
        {
          title: "1. مراجعة أسس التصميم",
          icon: FileCheck,
          items: [
            "مواصفات اللقيم والمنتج النهائي",
            "معايير واشتراطات تصميم العمليات",
            "ظروف الموقع والخدمات المرافقية",
            "حزمة التصميم الأساسية من المانح (Licensor)",
            "فحص وجدوى الملاءمة الفنية"
          ]
        },
        {
          title: "2. مراجعة الهندسة الأساسية (FEED)",
          icon: Ruler,
          items: [
            "مراجعة PFD وموازنات الحرارة والمادة",
            "مراجعة قائمة المعدات وحسابات الأحجام",
            "مراجعة وتطوير مخططات P&ID",
            "المشاركة المباشرة في دراسات HAZOP / HAZID",
            "متطلبات المرافق والخدمات الخارجية"
          ]
        },
        {
          title: "3. مراجعة الهندسة التفصيلية",
          icon: FlaskConical,
          items: [
            "مراجعة مخططات P&ID التفصيلية",
            "أحجام الأنابيب والحسابات الهيدروليكية",
            "أوراق بيانات المعدات والمواصفات الفنية",
            "فلسفة أجهزة القياس والتحكم الآلي",
            "مراجعة رسومات ومخططات الموردين"
          ]
        },
        {
          title: "4. ضمان التصميم والتسليم للتوريد",
          icon: CheckCircle2,
          items: [
            "مراجعة قابلية الإنشاء والتنفيذ (Constructability)",
            "إدارة التغيير والحيود عن التصميم",
            "حل الاستفسارات الهندسية (RFIs/EQs)",
            "التحقق النهائي من حزمة التصميم المقفلة",
            "التسليم السلس لمرحلة التوريد والشراء"
          ]
        }
      ],
      zh: [
        {
          title: "1. 设计基础审查",
          icon: FileCheck,
          items: [
            "原料及产品规格书",
            "工艺设计基准与准则",
            "现场与公用工程条件",
            "专利商基础设计包",
            "可行性与合理性复核"
          ]
        },
        {
          title: "2. 基础工程设计审查",
          icon: Ruler,
          items: [
            "PFD 与热物料衡算审查",
            "设备清单与选型尺寸复核",
            "P&ID 图纸深化与审查",
            "HAZOP / HAZID 分析参与",
            "公用工程与界外设施需求"
          ]
        },
        {
          title: "3. 详细工程设计审查",
          icon: FlaskConical,
          items: [
            "详细 P&ID 图纸深度审查",
            "管径选型与水力学计算",
            "设备数据表与技术规格书",
            "仪表与控制哲学方案",
            "供应商设备图纸审核"
          ]
        },
        {
          title: "4. 设计保证与采购移交",
          icon: CheckCircle2,
          items: [
            "可施工性深度评估",
            "偏差与设计变更管理",
            "工程疑问 (EQ) 解答与核销",
            "最终设计软件包核销",
            "移交采购阶段的安全衔接"
          ]
        }
      ]
    }
  },
  risksSection: {
    eyebrow: { en: "Engineering-Stage Risks We Catch", ar: "مخاطر مرحلة الهندسة التي نكشفها ونمنعها", zh: "<ctrl42>我們在工程阶段捕获的致命风险" },
    title: { en: "Risks Mitigated During Process Engineering Review", ar: "المخاطر التي يتم الحد منها أثناء مراجعة هندسة العمليات", zh: "工艺工程审查期间规避的核心风险" },
    cards: {
      en: [
        { title: "PFD/P&ID Inconsistencies", icon: Ruler },
        { title: "Heat & Mass Balance Errors", icon: Scale },
        { title: "Equipment Sizing Errors", icon: Wrench },
        { title: "Missed HAZOP Actions", icon: ShieldAlert },
        { title: "Design Basis Deviations", icon: FileText },
        { title: "Line Sizing & Hydraulics Issues", icon: Activity },
        { title: "Instrumentation Gaps", icon: GitMerge },
        { title: "Late-Stage Design Changes", icon: Clock },
      ],
      ar: [
        { title: "تناقضات واختلافات PFD / P&ID", icon: Ruler },
        { title: "أخطاء موازنات الحرارة والمادة", icon: Scale },
        { title: "أخطاء أحجام وسعات المعدات", icon: Wrench },
        { title: "إغفال إجراءات وتوصيات HAZOP", icon: ShieldAlert },
        { title: "الانحرافات عن أسس التصميم المعتمدة", icon: FileText },
        { title: "مشاكل الهيدروليك وأحجام الأنابيب", icon: Activity },
        { title: "ثغرات ونقص أجهزة القياس والتحكم", icon: GitMerge },
        { title: "تغييرات التصميم المتأخرة المكلفة", icon: Clock },
      ],
      zh: [
        { title: "PFD 与 P&ID 图纸不一致", icon: Ruler },
        { title: "热与物料衡算计算失误", icon: Scale },
        { title: "设备选型尺寸偏差错误", icon: Wrench },
        { title: "遗漏 HAZOP 核心安全动作", icon: ShieldAlert },
        { title: "偏离既定项目设计基础", icon: FileText },
        { title: "管径与水力学计算缺陷", icon: Activity },
        { title: "控制与测量仪表设置盲区", icon: GitMerge },
        { title: "后期高昂的设计变更", icon: Clock },
      ]
    }
  },
  whyKafaah: {
    eyebrow: { en: "Why Kafaah?", ar: "لماذا كفاءة؟", zh: "为什么选择 Kafaah？" },
    title: { en: "Why Trust Kafaah for Engineering Support?", ar: "لماذا تثق بكفاءة للدعم الهندسي والتصميمي؟", zh: "为什么选择 Kafaah Provide 工程技术支持？" },
    items: {
      en: [
        "Independent Process Design Review",
        "Chemical & Fertilizer Process Specialists",
        "20+ Years of Hands-On Process Engineering",
        "Familiar with Major Licensor Design Packages",
        "Practical, Constructability-Focused Reviews",
        "Early Issue Detection Reduces Downstream Cost"
      ],
      ar: [
        "مراجعة مستقلة ومحايدة تماماً لتصميم العمليات",
        "متخصصون محترفون في عمليات الكيماويات والأسمدة",
        "أكثر من 20 عاماً من الخبرة العملية الميدانية",
        "معرفة عميقة بحزم تصميم كبار المانحين العالميين",
        "مراجعات عملية تركز على سهولة التشغيل والإنشاء",
        "الكشف المبكر يقلل تكاليف التوريد والتنفيذ اللاحقة"
      ],
      zh: [
        "完全独立的工艺设计第三方审查",
        "精通化工与化肥工艺的行业专家",
        "20 余年一线工艺工程实践积累",
        "熟悉全球主要专利商的基础设计包",
        "注重实际可施工性与可操作性的审查",
        "早期问题识别大幅降低后续变造成本"
      ]
    }
  },
  faqSection: {
    eyebrow: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", zh: "常见问题解答" },
    title: { en: "Questions Owners Ask Before Engaging an Engineering Reviewer", ar: "أسئلة يطرحها أصحاب المشاريع قبل تعيين مراجع هندسي", zh: "业主聘请工程审查专家前常问的问题" },
    items: {
      en: [
        {
          q: "What is Expert Process & Engineering Support?",
          a: "It's an independent technical review of the process engineering package during Basic and Detailed Engineering — covering PFDs, P&IDs, heat & mass balances, equipment sizing, and design deliverables — to confirm the design meets the design basis before it moves into procurement and construction."
        },
        {
          q: "At what stage should Kafaah get involved?",
          a: "Ideally at the start of Basic Engineering, once the licensor's or EPC contractor's design basis package is available. Early involvement allows issues to be flagged while changes are still inexpensive. Kafaah can also join partway through Detailed Engineering if a review has not yet been carried out."
        },
        {
          q: "What deliverables does Kafaah review?",
          a: "Typical deliverables include process flow diagrams, heat and mass balances, P&IDs, equipment lists and datasheets, line sizing calculations, and instrumentation and control philosophy — reviewed against the design basis, licensor guarantees, and applicable codes and standards."
        },
        {
          q: "Does Kafaah participate in HAZOP/HAZID studies?",
          a: "Yes. Kafaah can join HAZOP and HAZID sessions as an independent process reviewer, contributing process engineering perspective and following up to confirm that resulting actions are properly closed out in the design."
        },
        {
          q: "Can Kafaah review licensor engineering packages?",
          a: "Yes. Kafaah has direct working familiarity with process technologies and licensor packages common in the fertilizer and inorganic chemicals sector, and reviews these packages for internal consistency and alignment with the owner's operating requirements."
        },
        {
          q: "How is this different from the Owner's Engineer service?",
          a: "Owner's Engineer support spans the full project lifecycle, from engineering through construction and commissioning. Expert Process & Engineering Support is a focused engagement on the process design itself during Basic and Detailed Engineering — often the starting point before broader Owner's Engineer oversight begins."
        }
      ],
      ar: [
        {
          q: "ما هو الدعم الهندسي ودعم العمليات المتخصص؟",
          a: "هو مراجعة فنية مستقلة لحزمة هندسة العمليات خلال مرحلتي الهندسة الأساسية والتفصيلية — تشمل مخططات PFDs و P&IDs وموازنات الحرارة والمادة وأحجام المعدات ومخرجات التصميم — لضمان مطابقة التصميم لأسس المشروع قبل انتقاله للتوريد والإنشاءات."
        },
        {
          q: "في أي مرحلة ينبغي إشراك فريق كفاءة؟",
          a: "مثالياً في بداية الهندسة الأساسية (FEED)، فور توفر حزمة أسس التصميم من المانح أو مقاول EPC. يسمح التدخل المبكر بتحديد المشكلات وهي ما تزال منخفضة التكلفة للتعديل. كما يمكن لكفاءة الانضمام خلال الهندسة التفصيلية إذا لم تكن المراجعة قد تمت."
        },
        {
          q: "ما هي المخرجات والتصاميم التي تقوم كفاءة بمراجعتها؟",
          a: "تشمل المخرجات النموذجية مخططات تدفق العمليات (PFD)، موازنات الحرارة والمادة، مخططات P&ID، قوائم المعدات وأوراق البيانات، حسابات أحجام الأنابيب، وفلسفة التحكم والأجهزة — بمراجعتها مقابل أسس التصميم وضمانات المانح والمعايير الهندسية."
        },
        {
          q: "هل تشارك كفاءة في دراسات HAZOP و HAZID؟",
          a: "نعم. تشارك كفاءة في جلسات HAZOP و HAZID كمراجع عمليات مستقل، مع تقديم الرؤية الهندسية ومتابعة إغلاق التوصيات والإجراءات الناتجة في المخططات النهائية."
        },
        {
          q: "هل يمكن لكفاءة مراجعة حزم تصاميم المانحين العالميّين (Licensors)؟",
          a: "نعم. يمتلك فريق كفاءة معرفة وممارسة مباشرة بتقنيات العمليات وحزم المانحين الشائعة في قطاع الأسمدة والكيماويات غير العضوية، ونراجع هذه الحزم لضمان اتساقها الداخلي وملاءمتها لمتطلبات مالك المصنع."
        },
        {
          q: "ما الفرق بين هذه الخدمة وخدمة مهندس المالك (Owner's Engineer)؟",
          a: "تغطي خدمة مهندس المالك دائمًا دورة حياة المشروع كاملة، من الهندسة وحتى الإنشاءات وبدء التشغيل. بينما يُعد الدعم الهندسي المتخصص تركيزاً شاملاً مكثفاً على تصميم العمليات نفسه خلال الهندسة الأساسية والتفصيلية — وغالباً ما يكون نقطة البداية قبل التوسع في رقابة مهندس المالك."
        }
      ],
      zh: [
        {
          q: "什么是专业工艺与工程支持服务？",
          a: "这是在基础工程与详细设计阶段对工艺工程软件包进行的独立技术审查——涵盖 PFD、P&ID、热物料衡算、设备选型及交付物——以确认设计在进入采购与施工前完全符合设计基础。"
        },
        {
          q: "Kafaah 应该在哪个阶段介入项目？",
          a: "最理想的阶段是在基础设计开始时，即专利商或 EPC 承包商的设计基础包准备就绪时。早期介入能在修改成本最低时发现问题。如果尚未进行审查，Kafaah 也可以在详细设计阶段中期介入。"
        },
        {
          q: "Kafaah 负责审查哪些工程交付物？",
          a: "典型交付物包括工艺流程图 (PFD)、热与物料衡算、P&ID 图纸、设备清单与数据表、管径计算书以及仪表控制哲学——对照设计基础、专利商担保和适用代码标准进行全面核查。"
        },
        {
          q: "Kafaah 是否参与 HAZOP/HAZID 评估？",
          a: "是的。Kafaah 能作为独立工艺审查员全程参与 HAZOP 和 HAZID 研讨会，ᨀ供工艺工程视角，并跟踪确认相关安全措施在设计中得到闭环落实。"
        },
        {
          q: "Kafaah 能否审查专利商 (Licensor) 的工程包？",
          a: "是的。Kafaah 团队对化肥及无机化工领域常见的工艺技术和专利商设计包具有丰富的直接经验，能针对软件包的内部一致性以及与业主操作要求的契合度进行深入审查。"
        },
        {
          q: "这项服务与业主工程师 (Owner's Engineer) 有何区别？",
          a: "业主工程师服务贯穿项目全生命周期（从工程设计到施工与试车）。而专业工艺与工程支持则是针对基础设计和详细设计阶段工艺设计本身的专项服务——通常是开展全面业主工程师监督前的核心起点。"
        }
      ]
    }
  },
  finalCta: {
    eyebrow: { en: "Request Technical Consult", ar: "طلب استشارة فنية", zh: "<ctrl42>请求技术咨询" },
    titleLine1: { en: "Get Independent Process Review", ar: "احصل على مراجعة مستقلة للعمليات", zh: "在施工开始前获取" },
    titleLine2: { en: "Before Construction Begins", ar: "قبل بدء أعمال الإنشاءات", zh: "<ctrl42>独立的工艺审查服务" },
    desc: {
      en: "Catch design gaps while they're still cheap to fix — independent process engineering review through Basic and Detailed Engineering.",
      ar: "اكتشف الفجوات التصميمية وهي ما تزال منخفضة التكلفة للتقويم — مراجعة مستقلة لمهندسي العمليات خلال مراحل التصميم الأساسي والتفصيلي.",
      zh: "在修改成本低廉的阶段消除设计缺陷——基础工程与详细设计阶段的独立工艺工程审查。"
    },
    primaryBtn: { en: "Talk to an Expert →", ar: "التحدث مع خبير ←", zh: "<ctrl42>与专家交谈 →" },
    secondaryBtn: { en: "Download Capability Statement ⬇", ar: "تحميل ملف القدرات ⬇", zh: "<ctrl42>下载能力说明书 ⬇" }
  }
};

function ProcessEngineeringSupportView({ service, relatedTechs }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroData = processEngineeringSupportDict.hero;
  const trustStripItems = processEngineeringSupportDict.trustStrip[locale] || processEngineeringSupportDict.trustStrip.en;
  const whyData = processEngineeringSupportDict.whySection;
  const scopeData = processEngineeringSupportDict.scopeSection.cards[locale] || processEngineeringSupportDict.scopeSection.cards.en;
  const risksData = processEngineeringSupportDict.risksSection.cards[locale] || processEngineeringSupportDict.risksSection.cards.en;
  const whyKafaahItems = processEngineeringSupportDict.whyKafaah.items[locale] || processEngineeringSupportDict.whyKafaah.items.en;
  const faqItems = processEngineeringSupportDict.faqSection.items[locale] || processEngineeringSupportDict.faqSection.items.en;
  const ctaData = processEngineeringSupportDict.finalCta;

  return (
    <>
      {/* 0. Hero Header Section matching Homepage Hero structure */}
      <header className="relative min-h-[100dvh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-between bg-navy-deep pt-28 sm:pt-32 lg:pt-36 pb-0 border-b border-white/[0.08]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/process_engineering_mobile.webp" />
            <source media="(min-width: 769px)" srcSet="/process_engineering_hero_bg.webp" />
            <img
              src="/process_engineering_hero_bg.webp"
              alt="Expert Process & Engineering Support — Kafaah Industrial"
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Fading gradient */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-b md:bg-gradient-to-l" : "max-md:bg-gradient-to-b md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>{heroData.tag[locale]}</span>
            </div>

            {/* H1 Title with Natural Inline Title Flow */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              <span className="text-cloud">{heroData.titlePart1[locale]} </span>
              <span className="text-gold font-bold drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-2.5 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-[12.5px] xs:text-[13px] sm:text-[14px] font-light text-silver/80 leading-relaxed max-w-[530px] mb-7">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons optimized for 360px mobile view */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnSecondary[locale]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. Trust Strip Bar at bottom of 100vh with 92% opacity and clear dividers */}
        <div
          className="relative z-10 w-full backdrop-blur-md border-t border-white/[0.2] py-6 transition-all duration-500"
          style={{ backgroundColor: "rgba(10, 24, 48, 0.92)" }}
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.22]">
              {trustStripItems.map((item: any, i: number) => {
                const IconComp = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 pt-4 pb-4 sm:py-0 sm:px-6 first:px-0 first:pt-0 sm:first:pt-0">
                    <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center shrink-0 text-gold bg-gold/10 shadow-[0_0_12px_rgba(229,193,88,0.2)]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-semibold text-cloud mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-light text-silver/85 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Why Section with 2-Card Comparison Box */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line">
                  {whyData.eyebrow[locale]}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-start">
                  {whyData.desc[locale]}
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

                  <div className="flex-1 bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-rose-400 mb-5 pb-3 border-b border-white/10">
                      {whyData.challengesCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.challengesCard.items[locale] || whyData.challengesCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/85">
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-navy-dark shrink-0">
                      <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <div className="flex-1 bg-navy-card/60 backdrop-blur-md border border-gold/30 p-6 rounded-sm shadow-lg">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-gold/20">
                      {whyData.contributionCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.contributionCard.items[locale] || whyData.contributionCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-cloud">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Scope */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {processEngineeringSupportDict.scopeSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {processEngineeringSupportDict.scopeSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeData.map((card: any, idx: number) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 rounded-sm hover:border-gold/40 hover:bg-navy-card-hover/60 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6 bg-navy-deep group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-4 group-hover:text-gold transition-colors">
                        {card.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {card.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="text-xs font-light text-silver/80 flex items-start gap-2">
                            <span className="text-gold font-semibold">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Engineering Risks We Catch (8 Cards) */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {processEngineeringSupportDict.risksSection.eyebrow[locale]}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {processEngineeringSupportDict.risksSection.title[locale]}
            </h3>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risksData.map((item: any, idx: number) => {
              const CaseIcon = item.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.06}>
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.1] hover:border-gold/30 p-6 rounded-sm text-center flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CaseIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-cloud leading-snug">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Kafaah */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
                  {processEngineeringSupportDict.whyKafaah.eyebrow[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2]">
                  {processEngineeringSupportDict.whyKafaah.title[locale]}
                </h3>
                <div className="w-12 h-[2px] bg-gold mt-4" />
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {whyKafaahItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-navy-card/30 border border-white/[0.08] rounded-sm hover:border-gold/30 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <p className="text-sm font-light text-silver/90 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn className="mb-14">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {processEngineeringSupportDict.faqSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {processEngineeringSupportDict.faqSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="border border-white/[0.12] bg-navy-card/40 rounded-sm overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-base font-medium text-cloud">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm font-light text-silver/80 leading-relaxed border-t border-white/[0.05]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 bg-navy-dark relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="text-left rtl:text-right max-w-2xl flex-1">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3 inline-block">
                {ctaData.eyebrow[locale]}
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.25] tracking-tight">
                <span className="block text-cloud">{ctaData.titleLine1[locale]}</span>
                <span className="block text-gold">{ctaData.titleLine2[locale]}</span>
              </h2>

              <div className="w-12 h-[2px] bg-gold my-4" />

              <p className="text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-xl">
                {ctaData.desc[locale]}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full sm:w-[340px] shrink-0">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 text-navy-deep bg-gold hover:bg-gold-light transition-all rounded-sm shadow-md whitespace-nowrap w-full"
              >
                <span>{ctaData.primaryBtn[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/30 hover:border-white text-cloud font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 hover:bg-white/5 transition-all rounded-sm whitespace-nowrap w-full"
              >
                <span>{ctaData.secondaryBtn[locale]}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-deep relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

// Dictionary for Investor Advisory Services matching HTML structure
const investorAdvisoryDict: Record<string, any> = {
  hero: {
    tag: { en: "Service Advisory", ar: "استشارات فنية واستثمارية", zh: "专业投资工程咨询" },
    titlePart1: { en: "Investor Advisory ", ar: "خدمات الاستشارات ", zh: "投资者工程 " },
    titlePart2: { en: "Services", ar: "الاستثمارية والفنية", zh: "咨询服务" },
    sub: {
      en: "Independent Technical & Financial Insight for Chemical & Fertilizer Plant Investments",
      ar: "رؤية فنية ومالية مستقلة لمشاريع واستثمارات مصانع الكيماويات والأسمدة",
      zh: "化工及化肥工厂投资的独立技术与财务洞察"
    },
    desc: {
      en: "Whether you're evaluating a new acquisition or preparing to sell or expand an existing facility, Kafaah gives you the independent technical clarity to make confident capital decisions.",
      ar: "سواء كنت تقيّم استحواذاً جديداً أو تستعد لبيع أو توسعة منشأة قائمة، تمنحك كفاءة الوضوح الفني المستقل لاتخاذ قرارات رأس مالية بثقة تامة.",
      zh: "无论您是在评估新的收购，还是准备出售或扩张现有设施，Kafaah 都能为您提供独立的工程明晰度，助您做出自信的资本决策。"
    },
    btnPrimary: { en: "Request Consultation →", ar: "طلب استشارة فنية ←", zh: "请求技术咨询 →" },
    btnSecondary: { en: "Download Brochure ⬇", ar: "تحميل الملف التعريفي ⬇", zh: "下载服务说明 ⬇" }
  },
  whoWeServe: {
    eyebrow: { en: "Who This Is For", ar: "الفئات المستهدفة", zh: "服务目标受众" },
    title: {
      en: "Independent Technical Insight for Every Side of the Deal",
      ar: "رؤية فنية مستقلة لكل طرف في الصفقة",
      zh: "为交易各方提供独立的工程技术洞察"
    },
    desc: {
      en: "Chemical and fertilizer assets are technically complex and capital intensive. Whether you're entering a new investment or positioning an existing facility for sale or expansion, an independent technical opinion protects your capital and strengthens your position at the table.",
      ar: "تتميز أصول الكيماويات والأسمدة بالتعقيد الفني والكتلة الرأسمالية الضخمة. سواء كنت تدخل استثماراً جديداً أو تجهّز مصنعاً قائماً للبيع أو التوسعة، فإن الرأي الفني المستقل يحمي رأس مالك ويدعم موقفك التفاوضي.",
      zh: "化工与化肥资产属于高技术复杂性与资本密集型项目。无论您是开展新投资，还是定位现有工厂进行出售或扩建，独立的第三方技术意见都能保护您的资本并巩固您的谈判优势。"
    },
    investorsCard: {
      title: { en: "For New Investors", ar: "للمستثمرين الجدد", zh: "面向新投资者" },
      items: {
        en: [
          "Technical & financial due diligence before commitment",
          "Process technology and licensing terms review",
          "CAPEX and OPEX assumption verification",
          "Site and equipment condition assessment",
          "Independent investment committee reporting"
        ],
        ar: [
          "العناية الواجبة الفنية والمالية قبل الالتزام بالاستثمار",
          "مراجعة تقنيات العمليات وشروط التراخيص الهندسية",
          "التحقق الفني من افتراضات النفقات الرأسمالية والتشغيلية",
          "تقييم ميداني شامل للموقع وحالة المعدات القائمة",
          "تقارير فنية مستقلة مخصصة للجان الاستثمار"
        ],
        zh: [
          "投资前的工程与财务尽职调查",
          "工艺技术与专利许可条款审查",
          "CAPEX 与 OPEX 核心假设数据复核",
          "现场与设备实际状态评估",
          "为投资委员会提供独立技术报告"
        ]
      }
    },
    ownersCard: {
      title: { en: "For Plant Owners", ar: "لمالكي المصانع القائمة", zh: "面向现有工厂业主" },
      items: {
        en: [
          "Asset valuation grounded in technical condition",
          "Pre-sale technical readiness review",
          "Expansion & debottlenecking feasibility",
          "Performance benchmarking vs. design guarantees",
          "Buyer due diligence support & data room preparation"
        ],
        ar: [
          "تقييم الأصول المبني على الحالة الفنية الميدانية الحقيقية",
          "مراجعة الجاهزية الفنية قبل البدء بإجراءات البيع",
          "دراسات جدوى التوسعة وإزالة الاختناقات التشغيلية",
          "مقارنة الأداء الفعلي مقابل الضمانات التصميمية",
          "دعم العناية الواجبة للمشترين وتجهيز غرفة البيانات"
        ],
        zh: [
          "基于实际技术状态的资产评估",
          "出售前技术就绪状态审查",
          "扩建与去瓶颈改造成本可行性",
          "实际性能与设计担保对标分析",
          "买方尽调支持与数据室资料准备"
        ]
      }
    }
  },
  experienceBar: {
    eyebrow: { en: "Proven Experience", ar: "خبرة عملية موثوقة", zh: "深厚实践经验" },
    stats: {
      en: [
        { value: "20+", label: "Years Industry Experience", icon: Clock },
        { value: "50+", label: "Industrial Projects", icon: Factory },
        { value: "10+", label: "Countries Worldwide", icon: Globe },
        { value: "Specialists", label: "Chemical & Fertilizer", icon: FlaskConical },
        { value: "Expertise", label: "Investor & Owner Representation", icon: Award },
      ],
      ar: [
        { value: "+20", label: "عاماً من الخبرة الصناعية", icon: Clock },
        { value: "+50", label: "مشروعاً صناعياً تم تقييمه", icon: Factory },
        { value: "+10", label: "دول حول العالم", icon: Globe },
        { value: "متخصصون", label: "في الكيماويات والأسمدة", icon: FlaskConical },
        { value: "خبرة ممتازة", label: "في تمثيل المستثمرين والمالكين", icon: Award },
      ],
      zh: [
        { value: "20+", label: "年行业实践经验", icon: Clock },
        { value: "50+", label: "个工业项目评估", icon: Factory },
        { value: "10+", label: "个国家与地区", icon: Globe },
        { value: "专家团队", label: "精通化工与化肥", icon: FlaskConical },
        { value: "专业代表", label: "投资者与业主代理", icon: Award },
      ]
    }
  },
  scopeSection: {
    eyebrow: { en: "Service Scope", ar: "نطاق الخدمة", zh: "服务范围" },
    title: { en: "Our Service Scope", ar: "نطاق خدماتنا الهندسية", zh: "我們的工程服务范围" },
    cards: {
      en: [
        {
          title: "1. Technical Assessment",
          icon: Search,
          items: [
            "Process Technology Review",
            "Equipment Condition Audit",
            "Capacity & Yield Verification",
            "Technology & Licensing Review",
            "Site Visit & Inspection"
          ]
        },
        {
          title: "2. Financial Modeling Support",
          icon: TrendingUp,
          items: [
            "CAPEX Estimate Validation",
            "OPEX & Utility Benchmarking",
            "Production Cost Modeling",
            "Sensitivity Analysis Input",
            "Technical Risk Quantification"
          ]
        },
        {
          title: "3. Reporting & Disclosure",
          icon: FileText,
          items: [
            "Independent Technical Report",
            "Investment Committee Briefing",
            "Key Findings Summary",
            "Data Room Documentation",
            "Valuation Input Package"
          ]
        },
        {
          title: "4. Transaction Support",
          icon: Briefcase,
          items: [
            "Negotiation Technical Backup",
            "Warranty & Guarantee Review",
            "Post-Deal Technical Monitoring",
            "Expansion Feasibility Input",
            "Ongoing Advisory Retainer"
          ]
        }
      ],
      ar: [
        {
          title: "1. التقييم الفني",
          icon: Search,
          items: [
            "مراجعة تقنيات العمليات الصناعية",
            "تدقيق ومراجعة حالة المعدات",
            "التحقق من الطاقة الإنتاجية ومعدلات الإنتاج",
            "مراجعة التكنولوجيا واتفاقيات التراخيص",
            "الزيارات الميدانية والتفتيش في الموقع"
          ]
        },
        {
          title: "2. دعم النمذجة المالية",
          icon: TrendingUp,
          items: [
            "التحقق من تقديرات النفقات الرأسمالية (CAPEX)",
            "مقارنة النفقات التشغيلية واستهلاك المرافق",
            "نمذجة تكلفة الإنتاج الحقيقية",
            "مدخلات تحليلات الحساسية الفنية",
            "تقدير وتكميم المخاطر الفنية مالياً"
          ]
        },
        {
          title: "3. التقارير والإفصاح الفني",
          icon: FileText,
          items: [
            "إعداد التقرير الفني المستقل (ITR)",
            "تقديم العروض للجان الاستثمار",
            "ملخص النتائج الفنية والمخاطر",
            "تجهيز وتدقيق وثائق غرفة البيانات",
            "حزمة مدخلات تقييم الأصول"
          ]
        },
        {
          title: "4. دعم الصفقة والمفاوضات",
          icon: Briefcase,
          items: [
            "الدعم الفني المباشر أثناء المفاوضات",
            "مراجعة الضمانات والتعهدات التعاقدية",
            "المتابعة الفنية بعد إغلاق الصفقة",
            "مدخلات دراسات جدوى التوسعة",
            "خدمات الاستشارات الفنية المستمرة"
          ]
        }
      ],
      zh: [
        {
          title: "1. 技术评估",
          icon: Search,
          items: [
            "工艺技术可行性审查",
            "设备健康状态审计",
            "产能与产率精准复核",
            "技术许可与专利条款核查",
            "现场考察与实地勘察"
          ]
        },
        {
          title: "2. 财务模型技术支持",
          icon: TrendingUp,
          items: [
            "CAPEX 预算合理性校验",
            "OPEX 与公用工程消耗对标",
            "实际生产成本模型构建",
            "敏感性分析技术参数输入",
            "技术风险的定量化评估"
          ]
        },
        {
          title: "3. 报告与技术披露",
          icon: FileText,
          items: [
            "编制独立技术报告 (ITR)",
            "投资委员会技术汇报",
            "核心评估结果摘要",
            "数据室技术文档整理",
            "资产评估技术数据包"
          ]
        },
        {
          title: "4. 交易谈判支持",
          icon: Briefcase,
          items: [
            "谈判全程技术支持",
            "合同质保与 Performance 担保审查",
            "交易完成后的技术跟踪",
            "扩建可行性技术输入",
            "常年技术顾问咨询服务"
          ]
        }
      ]
    }
  },
  dualTrack: {
    eyebrow: { en: "Core Capabilities", ar: "القدرات الجوهرية", zh: "核心能力" },
    title: { en: "Two Disciplines. One Independent Opinion.", ar: "تخصصان هندسيان. رأي فني مستقل واحد.", zh: "两大专业领域。一个独立的专业意见。" },
    dueDiligenceCard: {
      label: { en: "For Acquisitions & New Investment", ar: "للاستحواذ والاستثمارات الجديدة", zh: "面向收购与新项目投资" },
      title: { en: "Technical Due Diligence", ar: "العناية الواجبة الفنية", zh: "技术尽职调查" },
      desc: {
        en: "Before capital is committed, we verify that the process technology, equipment condition, and performance assumptions behind the deal hold up to independent scrutiny.",
        ar: "قبل الالتزام برأس المال، نتحقق من أن تقنيات العمليات وحالة المعدات وافتراضات الأداء تصمد أمام الفحص المستقل.",
        zh: "在资本投入前，我们严密复核工艺技术、设备状况和性能假设，确保交易基础经得起独立审查。"
      },
      items: {
        en: [
          "Process design and P&ID review against stated capacity and guarantees",
          "Equipment condition, maintenance history, and remaining useful life assessment",
          "Licensing agreement and technology transfer review",
          "CAPEX/OPEX assumption testing against industry benchmarks",
          "Clear summary report highlighting deal-relevant technical considerations"
        ],
        ar: [
          "مراجعة تصميم العمليات ومخططات P&ID مقابل السعة والضمانات",
          "تقييم حالة المعدات وسجل الصيانة والعمر الافتراضي المتبقي",
          "مراجعة اتفاقيات التراخيص ونقل التكنولوجيا",
          "اختبار افتراضات CAPEX/OPEX مقابل المعايير الصناعية",
          "تقرير ملخص واضح يسلط الضوء على الاعتبارات الفنية للصفقة"
        ],
        zh: [
          "对照设计产能和担保复核工艺设计与 P&ID",
          "评估设备状况、维保历史及剩余使用寿命",
          "审查技术许可协议与技术转让条款",
          "对照行业基准检验 CAPEX/OPEX 假设",
          "提供突显交易关键技术考量的清晰总结报告"
        ]
      }
    },
    valuationCard: {
      label: { en: "For Owners & Sellers", ar: "لمالكي المصانع والبائعين", zh: "面向工厂业主与出售方" },
      title: { en: "Asset Valuation Support", ar: "دعم تقييم الأصول الصناعية", zh: "资产评估技术支持" },
      desc: {
        en: "We ground your asset's valuation in verified technical reality — strengthening your negotiating position and giving buyers confidence in the numbers.",
        ar: "نربط تقييم مصنعك بالواقع الفني الميداني الموثق — مما يقوي موقفك التفاوضي ويمنح المشترين الثقة في الأرقام.",
        zh: "我们将您的工厂估值建立在已验证的工程现实之上——巩固您的谈判立场，让买方对估值数据倍添信心。"
      },
      items: {
        en: [
          "Plant condition assessment benchmarked against original design",
          "Performance verification against licensed guarantees",
          "Remaining asset life and CAPEX requirement estimation",
          "Expansion or debottlenecking upside quantification",
          "Technical data room preparation for buyer due diligence"
        ],
        ar: [
          "تقييم حالة المصنع مقارنة بالتصميم الأصلي",
          "التحقق من الأداء مقابل الضمانات المرخصة",
          "تقدير العمر الافتراضي المتبقي ومتطلبات النفقات الرأسمالية",
          "تقدير وتكميم فرص التوسعة وإزالة الاختناقات",
          "إعداد وتجهيز غرفة البيانات الفنية لعمليات تدقيق المشترين"
        ],
        zh: [
          "对照原始设计评估工厂实际运行与维护状况",
          "对照许可担保验证实际生产与消耗性能",
          "估算资产剩余使用寿命及后续 CAPEX 需求",
          "定量评估工厂扩建或去瓶颈改造的潜在价值",
          "为买方尽调精心准备技术数据室文档"
        ]
      }
    }
  },
  risksSection: {
    eyebrow: { en: "Risk Mitigation", ar: "إزالة الغموض وإدارة المخاطر", zh: "风险澄清与化解" },
    title: { en: "What Our Review Helps You Clarify", ar: "ما يساعدك تقييمنا الفني في توضيحه وتحديده", zh: "<ctrl42>我們的工程审查助您明确的核心问题" },
    cards: {
      en: [
        { title: "Capacity & Yield Assumptions", icon: TrendingDown },
        { title: "Equipment Condition & Remaining Life", icon: Wrench },
        { title: "CAPEX Requirement Accuracy", icon: Coins },
        { title: "Technology & Licensing Terms", icon: FileText },
        { title: "Performance Guarantee Verification", icon: Scale },
        { title: "Process Technology Fit", icon: Factory },
        { title: "OPEX & Utility Benchmarking", icon: Activity },
        { title: "Regulatory & Compliance Readiness", icon: ShieldCheck },
      ],
      ar: [
        { title: "افتراضات الطاقة الإنتاجية ومعدلات الاستخلاص", icon: TrendingDown },
        { title: "حالة المعدات والعمر التشغيلي المتبقي", icon: Wrench },
        { title: "دقة تقديرات النفقات الرأسمالية المطلوبة", icon: Coins },
        { title: "شروط التكنولوجيا والتراخيص الهندسية", icon: FileText },
        { title: "التحقق من ضمانات الأداء واستهلاك الطاقة", icon: Scale },
        { title: "ملاءمة تقنية العمليات للمشروع واللقيم", icon: Factory },
        { title: "مقارنة المصاريف التشغيلية واستهلاك المرافق", icon: Activity },
        { title: "الجاهزية للالتزام بالمعايير البيئية والتنظيمية", icon: ShieldCheck },
      ],
      zh: [
        { title: "产能与产率核心假设", icon: TrendingDown },
        { title: "设备状况与剩余寿命", icon: Wrench },
        { title: "CAPEX 预算需求精准度", icon: Coins },
        { title: "技术与许可协议条款", icon: FileText },
        { title: "性能与消耗指标担保复核", icon: Scale },
        { title: "工艺技术方案契合度", icon: Factory },
        { title: "OPEX 与公用工程消耗对标", icon: Activity },
        { title: "法规与合规合规就绪状态", icon: ShieldCheck },
      ]
    }
  },
  whyKafaah: {
    eyebrow: { en: "Why Kafaah?", ar: "لماذا كفاءة؟", zh: "为什么选择 Kafaah？" },
    title: { en: "Why Trust Kafaah for Investor Advisory?", ar: "لماذا تثق بكفاءة للاستشارات الاستثمارية والفنية؟", zh: "为什么选择 Kafaah 提供投资工程咨询？" },
    items: {
      en: [
        "Independent Technical Opinion You Can Rely On — Our Only Obligation Is to You",
        "Chemical & Fertilizer Process Specialists With Hands-On Plant Operating Experience",
        "Extensive Track Record Across H₂SO₄, H₃PO₄, SOP, NPK, MgSO₄, SSP & CaCl₂ Facilities",
        "Technical Findings Translated Into Clear, Investor-Ready Reporting",
        "Trusted by Both Investors and Plant Owners — Across the Same Transaction",
        "Regional Expertise Across Egypt, the GCC & Wider MENA Markets"
      ],
      ar: [
        "رأي فني مستقل يمكنك الاعتماد عليه — التزامنا الوحيد هو تجاهك فقط",
        "خبراء عمليات الأسمدة والكيماويات بخبرة تشغيلية ميدانية مباشرة",
        "سجل حافل في مصانع الكبريتيك والفوسفوريك والبوتاسيوم والـ NPK والماغنسيوم والـ SSP",
        "ترجمة النتائج الهندسية المعقدة إلى تقارير استثمارية واضحة وجاهزة",
        "محل ثقة كبار المستثمرين ومالكي المصانع في مختلف الصفقات",
        "خبرة إقليمية واسعة في مصر ودول الخليج العربي وأسواق الشرق الأوسط"
      ],
      zh: [
        "可信赖的独立技术意见——我们唯一的责任就是对您负责",
        "具备一线工厂操作经验的化肥与化工工艺专家",
        "在硫酸、磷酸、硫酸钾、NPK、硫酸镁及 SSP 领域拥有丰富经验",
        "将复杂的工程结果转化为清晰、适合投资者的报告",
        "深得投资者与工厂业主的共同信赖",
        "深耕埃及、海湾国家 (GCC) 及中东北非 (MENA) 市场的本土经验"
      ]
    }
  },
  faqSection: {
    eyebrow: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", zh: "常见问题解答" },
    title: { en: "Questions Investors & Owners Ask Before Engaging Kafaah", ar: "أسئلة يطرحها المستثمرون ومالكو المصانع قبل التعامل مع كفاءة", zh: "投资者与业主聘请 Kafaah 前常问的问题" },
    items: {
      en: [
        {
          q: "What is technical due diligence and why does it matter?",
          a: "Technical due diligence is an independent review of a plant's process technology, equipment condition, and performance claims before a transaction closes. It matters because financial models are only as reliable as the technical assumptions behind them — capacity, maintenance needs, and OPEX figures can meaningfully shift the real value of a deal once independently verified."
        },
        {
          q: "When should we engage Kafaah in an acquisition process?",
          a: "Ideally during the early evaluation stage, before significant capital or time is committed to a deal. Early engagement allows us to flag deal-relevant technical risks while there is still room to adjust valuation, negotiate terms, or walk away. We can also support later-stage diligence if the timeline requires it."
        },
        {
          q: "How does Kafaah support plant owners preparing to sell?",
          a: "We conduct an independent technical assessment of your facility's condition, performance, and remaining asset life, and translate that into a clear valuation input package. This strengthens your negotiating position with buyers, since your asking price is backed by verified technical findings rather than assumptions alone — and it speeds up the buyer's own due diligence process."
        },
        {
          q: "Can Kafaah work for both the buyer and the seller?",
          a: "Yes, though never on the same transaction simultaneously. Kafaah maintains strict independence on every engagement — we represent one party's interests at a time, which is precisely why both investors and plant owners trust our findings across the MENA chemical and fertilizer sector."
        },
        {
          q: "What types of plants does Kafaah cover?",
          a: "Our core technical coverage spans sulfuric acid (H₂SO₄), phosphoric acid (H₃PO₄), sulfate of potash (SOP/Mannheim process), NPK compound fertilizers, magnesium sulfate (MgSO₄), single superphosphate (SSP), and calcium chloride (CaCl₂) facilities — across both greenfield investment evaluation and existing asset assessment."
        },
        {
          q: "What does Kafaah deliver at the end of an engagement?",
          a: "A clear, independent technical report tailored to the audience — an investment committee briefing for new investors, or a valuation input package for plant owners. Reports include a summary of key findings, supporting data, and direct input usable in financial modeling or negotiation."
        }
      ],
      ar: [
        {
          q: "ما هي العناية الواجبة الفنية ولماذا هي مهمة للغاية؟",
          a: "العناية الواجبة الفنية هي مراجعة مستقلة لتقنية عمليات المصنع وحالة معداته وادعاءات الأداء قبل إغلاق الصفقة. تكمن أهميتها في أن النماذج المالية تكون دقيقة فقط بدقة الافتراضات الفنية — حيث يمكن للطاقة الإنتاجية واحتياجات الصيانة والمصاريف التشغيلية أن تغير القيمة الحقيقية للصفقة بشكل جوهري عند تدقيقها."
        },
        {
          q: "متى ينبغي إشراك فريق كفاءة في عملية الاستحواذ؟",
          a: "مثالياً في مرحلة التقييم المبكرة، قبل الالتزام برأس مال أو وقت كبير. يتيح التدخل المبكر تحديد المخاطر الفنية المؤثرة في الصفقة بينما ما زال هناك مجال لتعديل التقييم، أو تفاوض الشروط، أو التراجع. كما نقدم الدعم في المراحل المتأخرة إذا تطلب الجدول الزمني ذلك."
        },
        {
          q: "كيف تدعم كفاءة مالكي المصانع الذين يستعدون للبيع؟",
          a: "نجري تقييماً فنياً مستقلاً لحالة منشأتك وأدائها وعمرها الافتراضي المتبقي، ونترجم ذلك إلى حزمة مدخلات تقييم واضحة. يقوي هذا موقفك التفاوضي مع المشترين، لأن السعر المطلوب يعتمد على نتائج فنية موثقة وليس مجرد افتراضات — كما يُسرّع عملية العناية الواجبة للمشتري."
        },
        {
          q: "هل يمكن لكفاءة العمل لصالح كل من المشتري والبائع؟",
          a: "نعم، ولكن ليس في نفس الصفقة في وقت واحد مطلقاً. تحافظ كفاءة على الاستقلالية التامة في كل مهمة — فنحن نمثل مصالح طرف واحد فقط في كل صفقة، ولهذا السبب بالتحديد يثق المستثمرون ومالكو المصانع في نتائجنا عبر قطاع الكيماويات والأسمدة."
        },
        {
          q: "ما هي أنواع المصانع والتقنيات التي تغطيها كفاءة؟",
          a: "تغطي خبرتنا الفنية الأساسية مصانع حمض الكبريتيك (H₂SO₄)، وحمض الفوسفوريك (H₃PO₄)، وكبريتات البوتاسيوم (SOP/عملية مانهايم)، والأسمدة المركبة (NPK)، وكبريتات المغنيسيوم (MgSO₄)، والسوبر فوسفات الأحادي (SSP)، وكلوريد الكالسيوم (CaCl₂) — سواء لتقييم الاستثمارات الجديدة أو الأصول القائمة."
        },
        {
          q: "ما الذي تقدمه كفاءة في نهاية الاستشارة الفنية؟",
          a: "تقرير فني مستقل وواضح مصمم خصيصاً للمستهدفين — عرض موجز للجنة الاستثمار للمستثمرين الجدد، أو حزمة مدخلات تقييم لمالكي المصانع. تتضمن التقارير ملخصاً للنتائج الرئيسية، والبيانات الداعمة، والمدخلات المباشرة القابلة للاستخدام في النمذجة المالية أو المفاوضات."
        }
      ],
      zh: [
        {
          q: "什么是技术尽职调查？为什么它如此重要？",
          a: "技术尽职调查是在交易闭环前对工厂工艺技术、设备状况和性能数据进行的独立审查。它至关重要，因为财务模型的可靠性取决于其背后的工程假设——一旦通过独立核查，产能、维保需求和 OPEX 数据可能会显著改变交易的真实估值。"
        },
        {
          q: "我们应该在收购流程的哪个阶段聘请 Kafaah？",
          a: "最理想的阶段是在早期评估期间，即在投入大量资本或时间之前。早期介入使我们能够在仍有调整估值、谈判条款甚至放弃交易的空间时，指出与交易相关的工程风险。若时间允许，我们亦可提供后期尽调支持。"
        },
        {
          q: "Kafaah 如何支持准备出售工厂的业主？",
          a: "我们对您的设施状况、性能及剩余资产寿命进行独立工程评估，并将其转化为清晰的估值输入数据包。这能巩固您面对买方的谈判地位，因为您的要价有立足稳固的技术调查结果做后盾——同时也能加速买方自身的尽调流程。"
        },
        {
          q: "Kafaah 能否同时为买方和卖方服务？",
          a: "可以，但在同一笔交易中绝不会同时为两端服务。Kafaah 在每项业务中均保持严格的独立性——我们一次仅代表一方的利益，这正是中东和北非化工与化肥领域的投资者和工厂业主共同信赖我们评估结果的原因。"
        },
        {
          q: "Kafaah 覆盖哪些类型的工厂？",
          a: "我们的核心技术领域涵盖硫酸 (H₂SO₄)、磷酸 (H₃PO₄)、硫酸钾 (SOP/曼海姆工艺)、NPK 复合肥、硫酸镁 (MgSO₄)、过磷酸钙 (SSP) 及氯化钙 (CaCl₂) 设施——跨越新建项目投资评估与现有资产状态评估。"
        },
        {
          q: "Kafaah 在咨询项目结束时交付什么？",
          a: "一份量身定制的清晰独立技术报告——针对新投资者的投资委员会简报，或针对工厂业主的估值数据包。报告包括核心结论摘要、支撑数据以及可直接用于财务模型或谈判的输入参数。"
        }
      ]
    }
  },
  finalCta: {
    eyebrow: { en: "Request Technical Consult", ar: "طلب استشارة فنية", zh: "请求技术咨询" },
    titleLine1: { en: "Make Your Next Capital Decision", ar: "اتخذ قرارك الرأسمالي القادم", zh: "做出您的下一个资本决策" },
    titleLine2: { en: "With Independent Technical Confidence", ar: "بثقة فنية مستقلة وتامة", zh: "基于独立的技术自信" },
    desc: {
      en: "Whether you're evaluating an investment or preparing to sell, Kafaah gives you the independent technical insight to move forward with clarity.",
      ar: "سواء كنت تقيّم استثماراً أو تستعد للبيع، تمنحك كفاءة الرؤية الفنية المستقلة للمضي قدماً بوضوح وثقة.",
      zh: "无论您是在评估一项投资，还是准备出售工厂，Kafaah 都能为您提供独立的工程洞察，助您清晰、自信地前行。"
    },
    primaryBtn: { en: "Talk to an Expert →", ar: "التحدث مع خبير ←", zh: "与专家交谈 →" },
    secondaryBtn: { en: "Download Capability Statement ⬇", ar: "تحميل ملف القدرات ⬇", zh: "下载能力说明书 ⬇" }
  }
};

function InvestorAdvisoryView({ service, relatedTechs }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroData = investorAdvisoryDict.hero;
  const whoData = investorAdvisoryDict.whoWeServe;
  const expData = investorAdvisoryDict.experienceBar;
  const scopeData = investorAdvisoryDict.scopeSection.cards[locale] || investorAdvisoryDict.scopeSection.cards.en;
  const dualData = investorAdvisoryDict.dualTrack;
  const risksData = investorAdvisoryDict.risksSection.cards[locale] || investorAdvisoryDict.risksSection.cards.en;
  const whyKafaahItems = investorAdvisoryDict.whyKafaah.items[locale] || investorAdvisoryDict.whyKafaah.items.en;
  const faqItems = investorAdvisoryDict.faqSection.items[locale] || investorAdvisoryDict.faqSection.items.en;
  const ctaData = investorAdvisoryDict.finalCta;

  return (
    <>
      {/* 0. Hero Header Section (WITHOUT Stats/Trust Bar at bottom as explicitly requested) */}
      <header className="relative min-h-[85vh] h-auto flex flex-col justify-center overflow-hidden bg-navy-deep pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 border-b border-white/[0.08]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/investor_advisory_mobile.webp" />
            <source media="(min-width: 769px)" srcSet="/investor_advisory_hero_bg.webp" />
            <img
              src="/investor_advisory_hero_bg.webp"
              alt="Investor Advisory Services — Kafaah Industrial"
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Fading gradient */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-b md:bg-gradient-to-l" : "max-md:bg-gradient-to-b md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>{heroData.tag[locale]}</span>
            </div>

            {/* H1 Title with Natural Inline Title Flow */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              <span className="text-cloud">{heroData.titlePart1[locale]} </span>
              <span className="text-gold font-bold drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-2.5 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-[12.5px] xs:text-[13px] sm:text-[14px] font-light text-silver/80 leading-relaxed max-w-[530px] mb-7">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons optimized for 360px mobile view */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnSecondary[locale]}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Who We Serve (Comparison Box: New Investors vs Plant Owners) */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line">
                  {whoData.eyebrow[locale]}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  {whoData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-start">
                  {whoData.desc[locale]}
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

                  <div className="flex-1 bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-white/10">
                      {whoData.investorsCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whoData.investorsCard.items[locale] || whoData.investorsCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/85">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-navy-dark shrink-0">
                      <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <div className="flex-1 bg-navy-card/60 backdrop-blur-md border border-gold/30 p-6 rounded-sm shadow-lg">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-gold/20">
                      {whoData.ownersCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whoData.ownersCard.items[locale] || whoData.ownersCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-cloud">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Experience Bar */}
      <section className="py-12 bg-navy-dark border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 sm:p-8 rounded-sm">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-6">
              {expData.eyebrow[locale]}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {((expData.stats as any)[locale] || expData.stats.en).map((st: any, idx: number) => {
                const StatIcon = st.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 bg-gold/10">
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-cloud">
                        {st.value}
                      </div>
                      <div className="text-[11px] font-light text-silver/80 leading-snug">
                        {st.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Scope */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {investorAdvisoryDict.scopeSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {investorAdvisoryDict.scopeSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeData.map((card: any, idx: number) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 rounded-sm hover:border-gold/40 hover:bg-navy-card-hover/60 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6 bg-navy-deep group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-4 group-hover:text-gold transition-colors">
                        {card.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {card.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="text-xs font-light text-silver/80 flex items-start gap-2">
                            <span className="text-gold font-semibold">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Dual Track Section (Due Diligence / Asset Valuation) */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {dualData.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {dualData.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Track 1: Due Diligence */}
            <FadeIn delay={0.1}>
              <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm relative overflow-hidden group hover:border-gold/40 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-3">
                  {dualData.dueDiligenceCard.label[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-cloud font-semibold mb-4">
                  {dualData.dueDiligenceCard.title[locale]}
                </h3>
                <p className="text-sm font-light text-silver/80 leading-relaxed mb-6">
                  {dualData.dueDiligenceCard.desc[locale]}
                </p>
                <ul className="space-y-3">
                  {(dualData.dueDiligenceCard.items[locale] || dualData.dueDiligenceCard.items.en).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/90">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Track 2: Asset Valuation */}
            <FadeIn delay={0.2}>
              <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm relative overflow-hidden group hover:border-gold/40 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-3">
                  {dualData.valuationCard.label[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-cloud font-semibold mb-4">
                  {dualData.valuationCard.title[locale]}
                </h3>
                <p className="text-sm font-light text-silver/80 leading-relaxed mb-6">
                  {dualData.valuationCard.desc[locale]}
                </p>
                <ul className="space-y-3">
                  {(dualData.valuationCard.items[locale] || dualData.valuationCard.items.en).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/90">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. What Our Review Helps You Clarify (8 Cards) */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {investorAdvisoryDict.risksSection.eyebrow[locale]}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {investorAdvisoryDict.risksSection.title[locale]}
            </h3>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risksData.map((item: any, idx: number) => {
              const CaseIcon = item.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.06}>
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.1] hover:border-gold/30 p-6 rounded-sm text-center flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CaseIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-cloud leading-snug">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Kafaah */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
                  {investorAdvisoryDict.whyKafaah.eyebrow[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2]">
                  {investorAdvisoryDict.whyKafaah.title[locale]}
                </h3>
                <div className="w-12 h-[2px] bg-gold mt-4" />
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {whyKafaahItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-navy-card/30 border border-white/[0.08] rounded-sm hover:border-gold/30 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <p className="text-sm font-light text-silver/90 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn className="mb-14">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {investorAdvisoryDict.faqSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {investorAdvisoryDict.faqSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="border border-white/[0.12] bg-navy-card/40 rounded-sm overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-base font-medium text-cloud">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm font-light text-silver/80 leading-relaxed border-t border-white/[0.05]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-24 bg-navy-dark relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="text-left rtl:text-right max-w-2xl flex-1">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3 inline-block">
                {ctaData.eyebrow[locale]}
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.25] tracking-tight">
                <span className="block text-cloud">{ctaData.titleLine1[locale]}</span>
                <span className="block text-gold">{ctaData.titleLine2[locale]}</span>
              </h2>

              <div className="w-12 h-[2px] bg-gold my-4" />

              <p className="text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-xl">
                {ctaData.desc[locale]}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full sm:w-[340px] shrink-0">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 text-navy-deep bg-gold hover:bg-gold-light transition-all rounded-sm shadow-md whitespace-nowrap w-full"
              >
                <span>{ctaData.primaryBtn[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/30 hover:border-white text-cloud font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 hover:bg-white/5 transition-all rounded-sm whitespace-nowrap w-full"
              >
                <span>{ctaData.secondaryBtn[locale]}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-deep relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

// Dictionary for Owner's Engineer Services matching HTML structure
const ownersEngineerDict: Record<string, any> = {
  hero: {
    tag: { en: "Service Advisory", ar: "استشارات فنية وهندسية", zh: "业主工程师专业咨询" },
    titlePart1: { en: "Owner's Engineer ", ar: "خدمات هندسة ", zh: "业主工程师 " },
    titlePart2: { en: "Services", ar: "المشروع والمالك", zh: "专业服务" },
    sub: {
      en: "Independent Technical Oversight for Chemical, Fertilizer & Industrial Projects",
      ar: "الإشراف والرقابة الفنية المستقلة لمشاريع مصانع الكيماويات والأسمدة والصناعات الثقيلة",
      zh: "面向化工、化肥及工业项目的独立技术监督与工程代表"
    },
    desc: {
      en: "Protect your investment, minimize risks, and ensure project objectives are achieved from concept to commissioning.",
      ar: "احمِ استثمارك، وقلل المخاطر التشغيلية والتعاقدية، وضمان تحقيق أهداف المشروع من المفهوم وحتى بدء التشغيل.",
      zh: "保护您的投资，降低项目风险，确保项目目标从概念规划到竣工投产全过程完美实现。"
    },
    btnPrimary: { en: "Request Consultation →", ar: "طلب استشارة فنية ←", zh: "请求技术咨询 →" },
    btnSecondary: { en: "Download Brochure ⬇", ar: "تحميل الملف التعريفي ⬇", zh: "下载服务说明 ⬇" }
  },
  trustStrip: {
    en: [
      { title: "Protect Investment", desc: "Safeguard CAPEX & long-term value", icon: ShieldCheck },
      { title: "Reduce Project Risk", desc: "Identify issues early & prevent deviations", icon: AlertTriangle },
      { title: "Ensure Compliance", desc: "Verify technical & contractual requirements", icon: CheckCircle2 },
      { title: "Verify Performance", desc: "Confirm performance guarantees & acceptance criteria", icon: Settings },
    ],
    ar: [
      { title: "حماية الاستثمار", desc: "حماية النفقات الرأسمالية والقيمة طويلة الأجل", icon: ShieldCheck },
      { title: "تقليل مخاطر المشروع", desc: "اكتشاف المشاكل مبكراً ومنع الانحرافات", icon: AlertTriangle },
      { title: "ضمان الالتزام", desc: "التحقق من المتطلبات الفنية والتعاقدية", icon: CheckCircle2 },
      { title: "التحقق من الأداء", desc: "تأكيد ضمانات الأداء ومعايير القبول", icon: Settings },
    ],
    zh: [
      { title: "保护投资价值", desc: "保障 CAPEX 与项目长期资产价值", icon: ShieldCheck },
      { title: "降低项目风险", desc: "早期识别隐患并防止工程偏离", icon: AlertTriangle },
      { title: "确保合规达标", desc: "严格核查技术与合同规范", icon: CheckCircle2 },
      { title: "验证性能指标", desc: "确认 Performance 担保与验收标准", icon: Settings },
    ]
  },
  whyWeServe: {
    eyebrow: { en: "Why Owner's Engineer?", ar: "لماذا مهندس المالك؟", zh: "为什么需要业主工程师？" },
    title: {
      en: "Why Do Industrial Projects Need an Owner's Engineer?",
      ar: "لماذا تحتاج المشاريع الصناعية إلى مهندس المالك؟",
      zh: "为什么工业项目需要独立的业主工程师？"
    },
    desc: {
      en: "Large industrial projects involve significant investment, complex engineering, and multiple stakeholders. An independent Owner's Engineer acts as your technical guardian, ensuring your interests are protected throughout the project lifecycle.",
      ar: "تتطلب المشاريع الصناعية الضخمة استثمارات هائلة وهندسة معقدة وأطرافاً متعددة. يعمل مهندس المالك المستقل كحارس فني لاستثمارك، متأكداً من حماية مصالحك في جميع مراحل المشروع.",
      zh: "大型工业项目涉及巨额投资、复杂的工程技术与多方利益相关者。独立的业主工程师担任您的技术守护者，确保您的权益在整个项目生命周期中得到全面保护。"
    },
    risksCard: {
      title: { en: "Common Project Risks", ar: "مخاطر المشاريع الشائعة", zh: "常见项目风险" },
      items: {
        en: [
          "Design deviations",
          "Cost overruns",
          "Delayed schedules",
          "Performance shortfalls",
          "Unclear scope boundaries",
          "Contractual disputes"
        ],
        ar: [
          "انحرافات التصاميم الهندسية",
          "تجاوز الميزانية والنفقات",
          "تأخير الجداول الزمنية للتنفيذ",
          "قصور ومشاكل الأداء التشغيلي",
          "غموض حدود ونطاق العمل",
          "النزاعات والتقاضي التعاقدي"
        ],
        zh: [
          "设计偏离与方案缺陷",
          "成本超支与预算失控",
          "工期延误与进度滞后",
          "性能未达标与产能不足",
          "范围界限模糊与职责不清",
          "合同纠纷与商务争议"
        ]
      }
    },
    solutionsCard: {
      title: { en: "Our Solution", ar: "حلول كفاءة الهندسية", zh: "Kafaah 的解决方案" },
      items: {
        en: [
          "Independent technical review",
          "Construction monitoring",
          "Collaborative contractor coordination",
          "Commissioning supervision",
          "Performance verification",
          "Dispute prevention & resolution"
        ],
        ar: [
          "مراجعة فنية هندسية مستقلة",
          "مراقبة وإشراف أعمال البناء",
          "تنسيق فعال ومستمر مع المقاولين",
          "الإشراف على التجهيز وبدء التشغيل",
          "التحقق الميداني من ضمانات الأداء",
          "منع النزاعات والحل الودي للمشكلات"
        ],
        zh: [
          "独立的第三方技术审查",
          "施工过程严密监督",
          "高效的承包商协同管理",
          "试车与开工全过程督导",
          "性能与消耗指标精准验证",
          "预防与化解工程合同争议"
        ]
      }
    }
  },
  experienceBar: {
    eyebrow: { en: "Proven Experience", ar: "خبرة عملية موثوقة", zh: "深厚实践经验" },
    stats: {
      en: [
        { value: "20+", label: "Years Industry Experience", icon: Clock },
        { value: "50+", label: "Industrial Projects", icon: Factory },
        { value: "10+", label: "Countries Worldwide", icon: Globe },
        { value: "Specialists", label: "Chemical & Fertilizer", icon: FlaskConical },
        { value: "Expertise", label: "EPC & Owner Representation", icon: Award },
      ],
      ar: [
        { value: "+20", label: "عاماً من الخبرة الصناعية", icon: Clock },
        { value: "+50", label: "مشروعاً صناعياً تم تقييمه", icon: Factory },
        { value: "+10", label: "دول حول العالم", icon: Globe },
        { value: "متخصصون", label: "في الكيماويات والأسمدة", icon: FlaskConical },
        { value: "خبرة ممتازة", label: "في تمثيل المقاولين والمالكين", icon: Award },
      ],
      zh: [
        { value: "20+", label: "年行业实践经验", icon: Clock },
        { value: "50+", label: "个工业项目评估", icon: Factory },
        { value: "10+", label: "个国家与地区", icon: Globe },
        { value: "专家团队", label: "精通化工与化肥", icon: FlaskConical },
        { value: "专业代表", label: "EPC 与业主代理", icon: Award },
      ]
    }
  },
  scopeSection: {
    eyebrow: { en: "Service Scope", ar: "نطاق الخدمة", zh: "服务范围" },
    title: { en: "Our Service Scope", ar: "نطاق خدماتنا الهندسية", zh: "我們的工程服务范围" },
    cards: {
      en: [
        {
          title: "1. Engineering Phase",
          icon: FileText,
          items: [
            "Design Review",
            "Process Validation",
            "HAZOP Participation",
            "Specification Review",
            "Constructability Review"
          ]
        },
        {
          title: "2. Procurement Phase",
          icon: Briefcase,
          items: [
            "Technical Bid Evaluation",
            "Vendor Assessment",
            "FAT Witnessing",
            "Material Compliance",
            "Verification"
          ]
        },
        {
          title: "3. Construction Phase",
          icon: Ruler,
          items: [
            "Site Inspection",
            "Quality Surveillance",
            "Progress Monitoring",
            "Contractor Coordination",
            "Safety Compliance"
          ]
        },
        {
          title: "4. Commissioning Phase",
          icon: Settings,
          items: [
            "Start-Up Support",
            "Commissioning Supervision",
            "Performance Testing",
            "Acceptance Verification",
            "Punch List Closure"
          ]
        }
      ],
      ar: [
        {
          title: "1. مرحلة التصميم الهندسي",
          icon: FileText,
          items: [
            "مراجعة التصاميم الهندسية",
            "التحقق من سلامة العمليات",
            "المشاركة في دراسات مخاطر التشغيل (HAZOP)",
            "مراجعة المواصفات الكودية والمعايير",
            "مراجعة قابلية التنفيذ والبناء"
          ]
        },
        {
          title: "2. مرحلة التوريد والمشتريات",
          icon: Briefcase,
          items: [
            "التقييم الفني لعروض المناقصات",
            "تقييم وتدقيق الموردين والشركات",
            "حضور واختبار القبول في المصنع (FAT)",
            "مطابقة المواد والشهادات الفنية",
            "التحقق والتأكد من الجودة"
          ]
        },
        {
          title: "3. مرحلة التشييد والبناء",
          icon: Ruler,
          items: [
            "التفتيش والمعاينة الميدانية بالموقع",
            "مراقبة وتأكيد الجودة",
            "متابعة وتقييم تقدم الأعمال",
            "التنسيق الفني بين المقاولين",
            "الالتزام بمعايير السلامة والصحة المهنية"
          ]
        },
        {
          title: "4. مرحلة التجهيز والتشغيل",
          icon: Settings,
          items: [
            "دعم عمليات بدء التشغيل",
            "الإشراف على أعمال التجهيز",
            "متابعة واختبارات الأداء (PTR)",
            "التحقق من استيفاء معايير القبول",
            "إغلاق قائمة ملاحظات الاستلام (Punch List)"
          ]
        }
      ],
      zh: [
        {
          title: "1. 工程设计阶段",
          icon: FileText,
          items: [
            "详细设计与 PID 审查",
            "工艺可行性验证",
            "HAZOP 危险与可操作性分析",
            "工程技术规范与标准审查",
            "可施工性 (Constructability) 评估"
          ]
        },
        {
          title: "2. 采购与设备监造阶段",
          icon: Briefcase,
          items: [
            "技术投标书独立评估",
            "供应商与制造厂资质审查",
            "出厂验收测试 (FAT) 现场见证",
            "材料与设备合规性复核",
            "质量与规范精准验证"
          ]
        },
        {
          title: "3. 现场施工阶段",
          icon: Ruler,
          items: [
            "现场施工质量巡检",
            "质量监督与 Standard 管控",
            "施工进度与 Milestone 跟踪",
            "承包商界面与工程协调",
            "EHS 安全与合规监督"
          ]
        },
        {
          title: "4. 试车与竣工阶段",
          icon: Settings,
          items: [
            "开工投产技术支持",
            " Pre-commissioning 监督",
            "性能测试 (PTR) 见证与评估",
            "竣工验收与交付标准复核",
            "Punch List 尾项清零与关闭"
          ]
        }
      ]
    }
  },
  risksSection: {
    eyebrow: { en: "Risk Mitigation", ar: "إزالة الغموض وإدارة المخاطر", zh: "风险澄清与化解" },
    title: { en: "Risks We Protect Against", ar: "المخاطر التي نحمي مشروعك منها", zh: "我們助您防范的工程风险" },
    cards: {
      en: [
        { title: "Design Errors", icon: Ruler },
        { title: "Scope Gaps", icon: FileText },
        { title: "EPC Contract Disputes", icon: Scale },
        { title: "Equipment Non-Conformance", icon: Wrench },
        { title: "Schedule Delays", icon: Clock },
        { title: "Cost Escalation", icon: Coins },
        { title: "Performance Failures", icon: TrendingDown },
        { title: "Safety & Compliance Issues", icon: ShieldCheck },
      ],
      ar: [
        { title: "الأخطاء والعيوب التصميمية", icon: Ruler },
        { title: "الفجوات والغموض في نطاق العمل", icon: FileText },
        { title: "نزاعات وخلافات عقود الـ EPC", icon: Scale },
        { title: "عدم مطابقة المعدات للمواصفات", icon: Wrench },
        { title: "التأخير في الجدول الزمني", icon: Clock },
        { title: "ارتفاع وتجاوز النفقات الميزانية", icon: Coins },
        { title: "إخفاقات الأداء والإنتاجية", icon: TrendingDown },
        { title: "مشاكل السلامة والامتثال المعياري", icon: ShieldCheck },
      ],
      zh: [
        { title: "设计错误与方案缺陷", icon: Ruler },
        { title: "工作范围缝隙与遗漏", icon: FileText },
        { title: "EPC 合同履约商务争议", icon: Scale },
        { title: "设备与材料不合格缺陷", icon: Wrench },
        { title: "工期延误与进度滞后", icon: Clock },
        { title: "成本失控与预算失真", icon: Coins },
        { title: "性能保函违约与产能不足", icon: TrendingDown },
        { title: "EHS 安全与法规合规隐患", icon: ShieldCheck },
      ]
    }
  },
  whyKafaah: {
    eyebrow: { en: "Why Kafaah?", ar: "لماذا كفاءة؟", zh: "为什么选择 Kafaah？" },
    title: { en: "Why Trust Kafaah for Owner's Engineer Representation?", ar: "لماذا تثق بكفاءة لتمثيل المالك كمهندس مستقل؟", zh: "为什么选择 Kafaah 担任您的业主工程师？" },
    items: {
      en: [
        "Independent & Unbiased Technical Representation",
        "Chemical & Fertilizer Process Specialists",
        "Extensive EPC Project Experience",
        "Inspection, Quality & Commissioning Expertise",
        "Strong Contract & Technical Dispute Resolution",
        "Multi-disciplinary Engineering Team"
      ],
      ar: [
        "تمثيل فني مستقل وغير منحاز لحماية مصالح المالك فقط",
        "خبراء متخصصون في هندسة وتكنولوجيا الكيماويات والأسمدة",
        "خبرة واسعة وممتدة في إدارة وإشراف مشاريع عقود EPC",
        "خبرات متقدمة في التفتيش وضبط الجودة والتجهيز لبدء التشغيل",
        "قدرة قوية على تسوية النزاعات الفنية والتعاقدية ودياً",
        "فريق هندسي متكامل يغطي كافة التخصصات الصناعية"
      ],
      zh: [
        "独立且公正的技术代表——唯一使命是捍卫业主利益",
        "精通化工与化肥全流程的资深工艺专家团队",
        "在大型 EPC 工程中具备极为丰富的全周期管理经验",
        "精通出厂检验、现场 QA/QC 与试车开工技术",
        "擅长处理复杂的工程技术与合同争议问题",
        "跨学科的多专业资深工程团队全面支持"
      ]
    }
  },
  faqSection: {
    eyebrow: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", zh: "常见问题解答" },
    title: { en: "Questions Owners Ask Before Appointing an Owner's Engineer", ar: "أسئلة يطرحها مالكو المشاريع قبل تعيين مهندس المالك", zh: "业主在聘请业主工程师前常问的问题" },
    items: {
      en: [
        {
          q: "What is an Owner's Engineer?",
          a: "An Owner's Engineer is an independent technical advisor appointed directly by the plant owner — not the EPC contractor — to represent the owner's interests throughout a project. The role covers design review, vendor and contractor oversight, construction quality surveillance, and commissioning support, ensuring the finished plant matches the owner's technical and commercial expectations."
        },
        {
          q: "When should we appoint an Owner's Engineer?",
          a: "Ideally as early as the feasibility or FEED stage. Early involvement allows the Owner's Engineer to influence design decisions, validate process assumptions, and catch potential issues before they are locked into contracts or fabrication drawings — when they are far cheaper to correct. That said, Kafaah can also be appointed at procurement, construction, or commissioning stage if oversight has not yet been established."
        },
        {
          q: "Can Kafaah support ongoing projects?",
          a: "Yes. Kafaah regularly joins projects already underway — whether at the construction, pre-commissioning, or performance-testing stage. We begin with a rapid technical assessment to understand the current project status, identify any outstanding risks, and align our scope of work with what remains to be delivered."
        },
        {
          q: "Can Kafaah represent us during performance testing?",
          a: "Yes, this is one of our core services. Kafaah independently witnesses and verifies Performance Test Runs (PTRs) against the licensor's guaranteed parameters — covering capacity, conversion efficiency, utility consumption, and product quality — and issues a formal report documenting the results on the owner's behalf."
        },
        {
          q: "Do you support international projects?",
          a: "Yes. Kafaah has supported projects across the Middle East, North Africa, and Asia, and our team is set up to mobilize internationally — whether through resident site presence or periodic visit-based oversight, depending on project requirements and travel logistics."
        },
        {
          q: "How is Kafaah different from the EPC contractor?",
          a: "The EPC contractor is responsible for designing, procuring, and constructing the plant — typically under schedule and budget pressures tied to their own contract. Kafaah is appointed directly by the owner and has no commercial relationship with the EPC contractor, equipment vendors, or technology licensors involved. Our only obligation is to protect the owner's technical and commercial interests, working alongside the EPC team rather than against it."
        }
      ],
      ar: [
        {
          q: "ما هو دور مهندس المالك (Owner's Engineer)؟",
          a: "مهندس المالك هو مستشار فني مستقل يتم تعيينه مباشرة من قبل مالك المصنع — وليس مقاول الـ EPC — لتمثيل مصالح المالك طوال فترة المشروع. يشمل الدور مراجعة التصاميم، والإشراف على الموردين والمقاولين، ومراقبة جودة البناء، ودعم التجهيز، مما يضمن طابق المصنع النهائي للتوقعات الفنية والتجارية."
        },
        {
          q: "متى ينبغي لنا تعيين مهندس المالك في المشروع؟",
          a: "مثالياً في وقت مبكر جداً خلال مرحلة الجدوى أو التصاميم الهندسية الأوليّة (FEED). يتيح التدخل المبكر التأثير في قرارات التصميم والتحقق من العمليات قبل توثيقها في العقود، مما يقلل تكاليف التعديل. ومع ذلك، يمكن تعيين كفاءة في أي مرحلة لاحقة."
        },
        {
          q: "هل يمكن لكفاءة دعم المشاريع القائمة والجارية بالفعل؟",
          a: "نعم. تنضم كفاءة بانتظام إلى المشاريع الجارية — سواء في مرحلة البناء أو التجهيز أو اختبارات الأداء. نبدأ بتقييم فني سريع لفهم الحالة الحالية وتحديد المخاطر المتبقية وتوجيه نطاق عملنا وفقاً للمطلوب."
        },
        {
          q: "هل يمكن لكفاءة تمثيلنا أثناء اختبارات الأداء والتشغيل؟",
          a: "نعم، هذه إحدى خدماتنا الأساسية. تقوم كفاءة بالتدقيق والشهادة الميدانية المستقلة على تشغيل اختبارات الأداء (PTR) مقابل المعايير المضمونة من المرخّص — بما في ذلك الطاقة الإنتاجية وكفاءة التحويل واستهلاك المرافق وجودة المنتج — وإصدار تقرير رسمي."
        },
        {
          q: "هل تدعم كفاءة المشاريع الدولية خارج مصر والخليج؟",
          a: "نعم. دعمنا مشاريع عبر الشرق الأوسط وشمال أفريقيا وآسيا، وفريقنا مجهز للتواجد الدولي — سواء من خلال التواجد المقيم في الموقع أو الإشراف عبر الزيارات الميدانية الدورية."
        },
        {
          q: "ما الفرق بين كفاءة كمستشار للمالك ومقاول الـ EPC؟",
          a: "مقاول الـ EPC مسؤول عن تصميم وتوريد وبناء المصنع تحت ضغوط الميزانية والجدول الزمني الخاصة بعقده. بينما يتم تعيين كفاءة مباشرة من المالك دون أي علاقة تجارية مع المقاول أو الموردين، والتزامنا الوحيد هو حماية مصالح المالك الهندسية والتجارية بالتعاون مع فريق التنفيذ."
        }
      ],
      zh: [
        {
          q: "什么是业主工程师 (Owner's Engineer)？",
          a: "业主工程师是由工厂业主直接聘请（而非由 EPC 承包商聘请）的独立技术顾问，在整个项目期间代表业主的权益。其职责涵盖设计审查、供应商与承包商监督、施工质量监控及试车支持，确保最终交付的工厂符合业主的工程与商务期望。"
        },
        {
          q: "我们应该在项目的哪个阶段聘请业主工程师？",
          a: "最理想的阶段是在可行性研究或 FEED 前期设计阶段。早期参与允许业主工程师优化设计决策、验证工艺假设，并在方案锁定到合同或施工图之前发现隐患——此时修正成本最低。当然，如果在后续采购、施工或试车阶段需要，Kafaah 亦可随时进场提供督导。"
        },
        {
          q: "Kafaah 能否支持已经在推进中的项目？",
          a: "是的。Kafaah 经常中途受托支持已经在推进中的项目——无论是处于施工、预试车还是性能测试阶段。我们首先开展快速技术评估，掌握当前状态，识别残留风险，并针对后续交付内容精准设定工作范围。"
        },
        {
          q: "Kafaah 能否在 Performance 测试期间代表我们？",
          a: "是的，这是我们的核心服务之一。Kafaah 独立见证并核查 Performance Test Run (PTR) 性能测试，对照专利商担保参数（涵盖产能、转化率、公用工程消耗及产品质量），并代表业主出具权威的官方见证报告。"
        },
        {
          q: "Kafaah 是否支持跨国/海外项目？",
          a: "是的。Kafaah 已为中东、北非及亚洲的多个工程项目提供服务。我们的团队具备国际化履约能力——可根据项目需求与物流规划，提供常驻现场监理或定期现场巡检服务。"
        },
        {
          q: "Kafaah 与 EPC 总承包商有何区别？",
          a: "EPC 总承包商负责工厂的设计、采购与施工，通常受到自研合同的工期与成本压力束缚。而 Kafaah 由业主直接聘请，与任何 EPC 承包商、设备商或专利商均无利益往来。我们唯一的职责是保护业主的工程与商业利益，与 EPC 团队协同配合推进项目。"
        }
      ]
    }
  },
  finalCta: {
    eyebrow: { en: "Request Technical Consult", ar: "طلب استشارة فنية", zh: "请求技术咨询" },
    titleLine1: { en: "Protect Your Project Investment", ar: "احمِ استثمار مشروعك الهندسي", zh: "保障您的工程项目投资" },
    titleLine2: { en: "With Independent Technical Oversight", ar: "بإشراف ورقابة فنية مستقلة وتامة", zh: "基于全过程独立技术监督" },
    desc: {
      en: "Let our experts help you deliver your project safely, on time, and within budget — with guaranteed performance.",
      ar: "دع خبراء كفاءة يساعدونك في تسليم مشروعك بأمان وفي الوقت المحدد وضمن الميزانية — مع ضمان الأداء المعتمد.",
      zh: "让我們的工程专家助您安全、按时、在预算内交付项目——并确保各项 Performance 担保完美达成。"
    },
    primaryBtn: { en: "Talk to an Expert →", ar: "التحدث مع خبير ←", zh: "与专家交谈 →" },
    secondaryBtn: { en: "Download Capability Statement ⬇", ar: "تحميل ملف القدرات ⬇", zh: "下载能力说明书 ⬇" }
  }
};

function OwnersEngineerView({ service, relatedTechs }: Props) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroData = ownersEngineerDict.hero;
  const trustData = ownersEngineerDict.trustStrip[locale] || ownersEngineerDict.trustStrip.en;
  const whyData = ownersEngineerDict.whyWeServe;
  const expData = ownersEngineerDict.experienceBar;
  const scopeData = ownersEngineerDict.scopeSection.cards[locale] || ownersEngineerDict.scopeSection.cards.en;
  const risksData = ownersEngineerDict.risksSection.cards[locale] || ownersEngineerDict.risksSection.cards.en;
  const whyKafaahItems = ownersEngineerDict.whyKafaah.items[locale] || ownersEngineerDict.whyKafaah.items.en;
  const faqItems = ownersEngineerDict.faqSection.items[locale] || ownersEngineerDict.faqSection.items.en;
  const ctaData = ownersEngineerDict.finalCta;

  return (
    <>
      {/* 0. Hero Header Section */}
      <header className="relative min-h-[100dvh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-between overflow-hidden bg-navy-deep pt-28 sm:pt-32 lg:pt-36 border-b border-white/[0.08]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/owners_engineer_mobile_blueprint.webp" />
            <source media="(min-width: 769px)" srcSet="/owners_engineer_blueprint.webp" />
            <img
              src="/owners_engineer_blueprint.webp"
              alt="Owner's Engineer Services — Kafaah Industrial"
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Fading gradient */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-b md:bg-gradient-to-l" : "max-md:bg-gradient-to-b md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>{heroData.tag[locale]}</span>
            </div>

            {/* H1 Title with Natural Inline Title Flow */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              <span className="text-cloud">{heroData.titlePart1[locale]} </span>
              <span className="text-gold font-bold drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-2.5 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-[12.5px] xs:text-[13px] sm:text-[14px] font-light text-silver/80 leading-relaxed max-w-[530px] mb-7">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons optimized for 360px mobile view */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>{heroData.btnSecondary[locale]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Bottom Trust Bar (4 items with pt-4 pb-4 sm:py-0 on mobile) */}
        <div className="w-full border-t border-white/[0.12] bg-navy-dark/95 backdrop-blur-md relative z-10 mt-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/[0.08]">
              {trustData.map((item: any, idx: number) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="pt-4 pb-4 sm:py-4 px-3 sm:px-5 flex items-start gap-3.5 group hover:bg-white/[0.02] transition-colors">
                    <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5 group-hover:border-gold group-hover:scale-105 transition-all">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-ui)] text-[13px] sm:text-sm font-semibold text-cloud group-hover:text-gold transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-[12px] font-light text-silver/70 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 1. Why Owner's Engineer (Comparison Grid: Common Project Risks vs Our Solution) */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line">
                  {whyData.eyebrow[locale]}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-start">
                  {whyData.desc[locale]}
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

                  <div className="flex-1 bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-red-400 mb-5 pb-3 border-b border-white/10">
                      {whyData.risksCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.risksCard.items[locale] || whyData.risksCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-silver/85">
                          <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-navy-dark shrink-0">
                      <ArrowRight className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <div className="flex-1 bg-navy-card/60 backdrop-blur-md border border-gold/30 p-6 rounded-sm shadow-lg">
                    <h5 className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase text-gold mb-5 pb-3 border-b border-gold/20">
                      {whyData.solutionsCard.title[locale]}
                    </h5>
                    <ul className="space-y-3">
                      {(whyData.solutionsCard.items[locale] || whyData.solutionsCard.items.en).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-light text-cloud">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Experience Bar */}
      <section className="py-12 bg-navy-dark border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 sm:p-8 rounded-sm">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-6">
              {expData.eyebrow[locale]}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {((expData.stats as any)[locale] || expData.stats.en).map((st: any, idx: number) => {
                const StatIcon = st.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 bg-gold/10">
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-cloud">
                        {st.value}
                      </div>
                      <div className="text-[11px] font-light text-silver/80 leading-snug">
                        {st.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Scope */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold inline-block mb-3">
              {ownersEngineerDict.scopeSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {ownersEngineerDict.scopeSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeData.map((card: any, idx: number) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-7 rounded-sm hover:border-gold/40 hover:bg-navy-card-hover/60 transition-all duration-500 flex flex-col justify-between group">
                    <div>
                      <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6 bg-navy-deep group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-cloud font-semibold mb-4 group-hover:text-gold transition-colors">
                        {card.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {card.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="text-xs font-light text-silver/80 flex items-start gap-2">
                            <span className="text-gold font-semibold">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Risks We Protect Against (8 Cards) */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {ownersEngineerDict.risksSection.eyebrow[locale]}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {ownersEngineerDict.risksSection.title[locale]}
            </h3>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risksData.map((item: any, idx: number) => {
              const CaseIcon = item.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.06}>
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.1] hover:border-gold/30 p-6 rounded-sm text-center flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CaseIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-cloud leading-snug">
                      {item.title}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Kafaah */}
      <section className="py-24 bg-navy-deep relative border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
                  {ownersEngineerDict.whyKafaah.eyebrow[locale]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2]">
                  {ownersEngineerDict.whyKafaah.title[locale]}
                </h3>
                <div className="w-12 h-[2px] bg-gold mt-4" />
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {whyKafaahItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-navy-card/30 border border-white/[0.08] rounded-sm hover:border-gold/30 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <p className="text-sm font-light text-silver/90 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-navy-dark relative border-b border-white/[0.05]">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeIn className="mb-14">
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {ownersEngineerDict.faqSection.eyebrow[locale]}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.2] tracking-tight">
              {ownersEngineerDict.faqSection.title[locale]}
            </h2>
            <div className="w-12 h-[2px] bg-gold mt-4" />
          </FadeIn>

          <div className="space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="border border-white/[0.12] bg-navy-card/40 rounded-sm overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors gap-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-base font-medium text-cloud">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm font-light text-silver/80 leading-relaxed border-t border-white/[0.05]">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 bg-navy-deep relative overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="text-left rtl:text-right max-w-2xl flex-1">
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3 inline-block">
                {ctaData.eyebrow[locale]}
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-cloud font-semibold leading-[1.25] tracking-tight">
                <span className="block text-cloud">{ctaData.titleLine1[locale]}</span>
                <span className="block text-gold">{ctaData.titleLine2[locale]}</span>
              </h2>

              <div className="w-12 h-[2px] bg-gold my-4" />

              <p className="text-sm sm:text-base font-light text-silver/80 leading-relaxed max-w-xl">
                {ctaData.desc[locale]}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full sm:w-[340px] shrink-0">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 text-navy-deep bg-gold hover:bg-gold-light transition-all rounded-sm shadow-md whitespace-nowrap w-full"
              >
                <span>{ctaData.primaryBtn[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/30 hover:border-white text-cloud font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.1em] uppercase py-3.5 px-6 h-12 inline-flex items-center justify-center text-center gap-2.5 hover:bg-white/5 transition-all rounded-sm whitespace-nowrap w-full"
              >
                <span>{ctaData.secondaryBtn[locale]}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-dark relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

export function ServicePageClient({ service, relatedTechs }: Props) {
  if (service.slug === "expert-witness-dispute-resolution") {
    return <ExpertWitnessView service={service} relatedTechs={relatedTechs} />;
  }

  if (service.slug === "commissioning" || service.slug === "construction-commissioning-support") {
    return <ConstructionCommissioningView service={service} relatedTechs={relatedTechs} />;
  }

  if (service.slug === "process-engineering-support") {
    return <ProcessEngineeringSupportView service={service} relatedTechs={relatedTechs} />;
  }

  if (service.slug === "investor-advisory") {
    return <InvestorAdvisoryView service={service} relatedTechs={relatedTechs} />;
  }

  if (service.slug === "owners-engineer") {
    return <OwnersEngineerView service={service} relatedTechs={relatedTechs} />;
  }

  const audienceLabel = getAudienceLabel(service.audience);

  return (
    <>
      {/* Intro & Overview — Two-column layout in dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Rich Text Content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Service Overview
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-6 tracking-tight">
                  Independent Technical representation &amp; Field Support
                </h2>
                <div className="space-y-6">
                  {service.intro.map((p, i) => (
                    <p key={i} className="text-[16px] font-light text-silver/90 leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Premium Glassmorphic Service Details Card */}
            <div className="lg:col-span-5 w-full">
              <FadeIn delay={0.15}>
                <div className="relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-8 rounded-sm shadow-xl hover:border-gold/35 transition-all duration-500">
                  {/* Decorative gold stripe */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/50 via-gold to-gold/50" />

                  <div className="font-[family-name:var(--font-ui)] text-[11px] font-bold tracking-[0.2em] text-gold uppercase mb-6">
                    Service Specifications
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Service Number</div>
                      <div className="font-[family-name:var(--font-display)] text-2xl text-cloud font-semibold tracking-wide">
                        Service {service.num}
                      </div>
                    </div>

                    <div className="h-px bg-divider/60" />

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Target Client Group</div>
                      <div className="text-silver font-medium text-sm flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gold" />
                        {audienceLabel}
                      </div>
                    </div>

                    <div className="h-px bg-divider/60" />

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-silver/50 mb-1">Operational Model</div>
                      <div className="text-silver font-light text-sm leading-relaxed">
                        Dedicated engineering support focusing on execution quality, risk mitigation, and performance guarantees.
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Scope & Deliverables Section — Dynamic cards grid in light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.005] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Scope of Service
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
              Scope of Deliverables &amp; Core Execution
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.scope.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="h-full bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] group transition-all duration-500 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm bg-navy-deep flex items-center justify-center shrink-0 border border-white/[0.12] group-hover:border-gold/35 group-hover:bg-navy-deep transition-all duration-500">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-display)] text-[16px] text-cloud font-semibold mb-2 group-hover:text-gold transition-colors">
                      Deliverable {(idx + 1).toString().padStart(2, "0")}
                    </h4>
                    <p className="text-sm font-light text-silver/80 leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Execution Workflow Section — Custom visual timeline layout with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.005] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Execution Roadmap
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
              Service Engagement &amp; Execution Workflow
            </h2>
          </FadeIn>

          {/* Process Timeline Grid */}
          <div className="relative mt-8">
            {/* Horizontal timeline connector bar on desktop — centered vertically inside the 48px circles (top-6) */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold/50 via-gold/10 to-gold/5 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {service.workflow.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="relative group flex flex-col h-full">

                  {/* Step Bubble & Vertical Connector centered horizontally */}
                  <div className="flex flex-col items-center w-full relative">
                    <div className="w-12 h-12 rounded-full bg-navy-dark border border-white/[0.12] flex items-center justify-center font-[family-name:var(--font-display)] text-lg font-bold text-gold group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(229,193,88,0.25)] transition-all duration-500 z-10 relative">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    {/* Vertical line connecting the circle bubble to the card below */}
                    <div className="w-[1.5px] h-6 bg-gradient-to-b from-gold/40 to-white/[0.12] z-0" />
                  </div>

                  {/* Step Info Card styled like Homepage with equal height sizing */}
                  <div className="bg-navy-card/40 backdrop-blur-md border border-white/[0.12] p-6 rounded-sm flex-1 flex flex-col group-hover:border-gold/35 group-hover:bg-navy-card-hover/55 group-hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] transition-all duration-500">
                    <h3 className="font-[family-name:var(--font-display)] text-[15px] text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-light text-silver/80 leading-relaxed flex-1">
                      {step.desc}
                    </p>
                  </div>

                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Kafaah — Light (navy-dark) background */}
      <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Heading */}
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Why Kafaah
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud tracking-tight">
                  Proven Field Capabilities &amp; Technical Depth
                </h2>
              </FadeIn>
            </div>

            {/* Right Column: Paragraph blocks styled with gold left border */}
            <div className="lg:col-span-7 space-y-8">
              {service.whyKafaah.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-6 border-l-2 border-gold/40 hover:border-gold transition-colors duration-300">
                    <p className="text-[16px] font-light text-silver/90 leading-[1.8] text-start">
                      {p}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Key Risks Managed & Mitigated Section with dark (navy-deep) background */}
      <section className="py-24 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/[0.005] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
              Risk Management
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
              Critical Risks Managed &amp; Mitigated
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.risksMitigated.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full flex gap-5 items-start p-6 bg-amber-500/[0.01] hover:bg-amber-500/[0.02] border border-amber-500/20 hover:border-amber-500/40 rounded-sm transition-all duration-500">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-cloud/90 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-silver/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Technologies — Converted to cards in light (navy-dark) background */}
      {relatedTechs.length > 0 && (
        <section className="py-24 bg-navy-dark border-t border-white/[0.05] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                Process Synergies
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.2] text-cloud mb-12 tracking-tight">
                Applicable Plant Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="group relative bg-navy-card/40 backdrop-blur-md border border-white/[0.12] hover:border-gold/35 hover:bg-navy-card-hover/55 hover:shadow-[0_12px_30px_-10px_rgba(240,160,32,0.08)] hover:-translate-y-1.5 p-8 rounded-sm transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase mb-4 font-[family-name:var(--font-ui)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold" />
                        Chemical Process
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl text-cloud font-semibold mb-3 group-hover:text-gold transition-colors">
                        {tech.fullName}
                      </h3>
                      <p className="text-sm font-light text-silver/80 leading-relaxed mb-8">
                        {tech.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gold mt-auto pt-4 border-t border-divider/40">
                      Explore Technology
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section in dark (navy-deep) background */}
      <section className="py-28 bg-navy-deep border-t border-white/[0.05] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#e5c158 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[860px] mx-auto px-8 text-center relative z-10">
          <FadeIn>
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-5 inline-block">
              Request Technical Consult
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] text-cloud mb-6 tracking-tight">
              Ready to Secure Your {service.title} Deliverables?
            </h2>
            <p className="text-base md:text-lg font-light text-silver/80 mb-10 max-w-[620px] mx-auto leading-relaxed">
              Partner with independent technical advisors to safeguard your construction phase, pre-commissioning readiness, or operational efficiency.
            </p>

            <Link
              href="/contact/"
              className="group btn-premium-gold font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.12em] uppercase inline-flex items-center"
            >
              {/* Premium animated light sweep */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

              <span className="relative z-10 flex items-center gap-3 py-1">
                Consult with our experts
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
