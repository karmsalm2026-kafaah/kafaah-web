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
  GitMerge
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
      {/* 0. Hero Header Section with 100vh viewport height & transparent glassmorphism trust strip bar */}
      <header className="relative h-[100vh] min-h-[680px] flex flex-col justify-between overflow-hidden bg-navy-deep pt-32 sm:pt-36 pb-0 border-b border-white/[0.08]">
        {/* Chemical Engineering Process Background Image with Dark Left Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/expert_witness_engineer_blueprint.png"
            alt="Engineer with Hardhat and Blueprints — Expert Witness & Technical Dispute Resolution"
            className="w-full h-full object-cover object-right opacity-95 mix-blend-luminosity scale-105"
          />
          {/* Fading gradient matching Homepage Hero: dark deep navy overlay on the text side */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-t md:bg-gradient-to-l" : "max-md:bg-gradient-to-t md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator */}
            <div className="inline-flex items-center gap-2.5 mb-5 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold border border-gold/40 px-3.5 py-1.5 rounded-sm bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              {heroData.tag[locale]}
            </div>

            {/* H1 Title with Unbroken 2-Line Formatting */}
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.12] text-cloud mb-5 tracking-tight">
              <span className="block text-cloud mb-1">{heroData.titlePart1[locale]}</span>
              <span className="block text-gold font-bold whitespace-normal md:whitespace-nowrap drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-cloud mb-3 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-[15px] font-light text-silver/85 leading-relaxed max-w-[540px] mb-8">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons matching HTML btn-primary & btn-outline with equal size and single line text */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 min-w-[220px] sm:min-w-[240px] h-13 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-3 whitespace-nowrap text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 min-w-[220px] sm:min-w-[240px] h-13 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-3 whitespace-nowrap text-center"
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
                  <div key={i} className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-6 first:px-0">
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
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3vw,38px)] leading-[1.15] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-justify">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold tracking-tight">
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
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(22px,3vw,36px)] text-cloud font-semibold tracking-tight">
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
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold leading-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold tracking-tight">
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

              {/* 2-Line Heading with same smaller font size */}
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,36px)] text-cloud font-semibold leading-[1.25] tracking-tight">
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
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
      <header className="relative h-[100vh] min-h-[680px] flex flex-col justify-between overflow-hidden bg-navy-deep pt-32 sm:pt-36 pb-0 border-b border-white/[0.08]">
        {/* Background Image with Dark Left Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/construction_commissioning_hero_bg.png"
            alt="Construction & Commissioning Support — Kafaah Industrial"
            className="w-full h-full object-cover object-right opacity-95 mix-blend-luminosity scale-105"
          />
          {/* Fading gradient */}
          <div className={`absolute inset-0 ${rtl ? "max-md:bg-gradient-to-t md:bg-gradient-to-l" : "max-md:bg-gradient-to-t md:bg-gradient-to-r"} from-navy-deep via-navy-deep/85 via-45% to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
        </div>

        {/* Content Container (Centered Vertically) */}
        <div className="max-w-[1280px] w-full mx-auto px-8 relative z-10 my-auto">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 mb-5 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold border border-gold/40 px-3.5 py-1.5 rounded-sm bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              {heroData.tag[locale]}
            </div>

            {/* H1 Title */}
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.12] text-cloud mb-5 tracking-tight">
              <span className="block text-cloud mb-1">{heroData.titlePart1[locale]}</span>
              <span className="block text-gold font-bold whitespace-normal md:whitespace-nowrap drop-shadow-[0_2px_15px_rgba(240,160,32,0.2)]">
                {heroData.titlePart2[locale]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-cloud mb-3 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {heroData.sub[locale]}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-[15px] font-light text-silver/85 leading-relaxed max-w-[540px] mb-8">
              {heroData.desc[locale]}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 min-w-[220px] sm:min-w-[240px] h-13 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-3 whitespace-nowrap text-center"
              >
                <span>{heroData.btnPrimary[locale]}</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase px-8 py-3.5 min-w-[220px] sm:min-w-[240px] h-13 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-3 whitespace-nowrap text-center"
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
                  <div key={i} className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-6 first:px-0">
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
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3vw,38px)] leading-[1.15] text-cloud mb-6 tracking-tight">
                  {whyData.title[locale]}
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-6" />
                <p className="text-[15px] font-light text-silver/90 leading-relaxed text-justify">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold tracking-tight">
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
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(22px,3vw,36px)] text-cloud font-semibold tracking-tight">
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
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold leading-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,3.5vw,42px)] text-cloud font-semibold tracking-tight">
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

              <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.2vw,36px)] text-cloud font-semibold leading-[1.25] tracking-tight">
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
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Service Overview
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-6 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
                <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6 gold-line">
                  Why Kafaah
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud tracking-tight">
                  Proven Field Capabilities &amp; Technical Depth
                </h2>
              </FadeIn>
            </div>

            {/* Right Column: Paragraph blocks styled with gold left border */}
            <div className="lg:col-span-7 space-y-8">
              {service.whyKafaah.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-6 border-l-2 border-gold/40 hover:border-gold transition-colors duration-300">
                    <p className="text-[16px] font-light text-silver/90 leading-[1.8] text-justify">
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
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,3.5vw,42px)] leading-[1.1] text-cloud mb-12 tracking-tight">
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
            <span className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-5 inline-block">
              Request Technical Consult
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(22px,4.5vw,54px)] leading-[1.05] text-cloud mb-6 tracking-tight">
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
