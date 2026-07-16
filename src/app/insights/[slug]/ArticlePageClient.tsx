"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  Briefcase, 
  Award,
  CheckCircle,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/lib/RoleContext";
import { FadeIn, StaggerChildren, RevealItem } from "@/components/Animations";
import { insightsPage, shared, getFontClass, isRtl } from "@/lib/i18n";
import { slugify } from "@/lib/slugify";

const articleImages: Record<string, string> = {
  "1": "/insights-construction-mistakes.png",
  "2": "/insights-commissioning-meaning.png",
  "3": "/insights-owners-engineer.png",
  "4": "/h2so4_plant.webp",
  "5": "/insights-delayed-rampup.png",
  "6": "/k2so4_plant.webp",
  "7": "/insights-epc-protection.png",
  "8": "/insights-granulation.png",
  "9": "/insights-handover-problem.png",
  "10": "/insights-refractory.png",
  "11": "/insights-handover-critical.png",
  "12": "/insights-refractory.png",
  "13": "/insights-granulation.png",
};

// Executive takeaways for each article to show in the sticky sidebar
const articleTakeaways: Record<string, Record<string, string[]>> = {
  "1": {
    en: [
      "Commissioning is a separate discipline, not just an extension of construction.",
      "Yield gaps during the first year compound financially over the plant's lifetime.",
      "Operational specialists must be engaged early to establish the design envelope."
    ],
    ar: [
      "التشغيل التجريبي هو علم منفصل، وليس مجرد امتداد لأعمال البناء.",
      "فجوات الإنتاجية في السنة الأولى تتراكم مالياً على مدى عمر المصنع.",
      "يجب إشراك أخصائيي التشغيل مبكراً لتحديد بيئة العمل التصميمية."
    ],
    zh: [
      "调试是一门独立的专业学科，而不仅仅是建设阶段的延伸。",
      "投产第一年的产量缺口会在工厂运行寿命内产生累积的财务损失。",
      "必须尽早引入现场运营专家，以确立合理的设计工况范围。"
    ]
  },
  "2": {
    en: [
      "Mechanical completeness does not equal operational readiness.",
      "In complex plants, systems behave interdependently under real process loads.",
      "Pre-commissioning loops prevent expensive hot shutdown troubleshooting."
    ],
    ar: [
      "الاكتمال الميكانيكي لا يعني الجاهزية التشغيلية.",
      "في المصانع المعقدة، تتصرف الأنظمة بشكل مترابط تحت أحمال التشغيل الفعلية.",
      "دائرات ما قبل التشغيل تمنع الاضطرار لاستكشاف الأعطال الساخنة والمكلفة."
    ],
    zh: [
      "机械竣工并不等同于运营就绪。",
      "在复杂工厂中，各个系统在实际工艺负载下会表现出相互关联的行为。",
      "预调试回路的核验可以避免在热态运行期间进行昂贵的停机排故。"
    ]
  },
  "3": {
    en: [
      "EPC contractors optimize for delivery; owners need to optimize for 20-year performance.",
      "An Owner's Engineer defends long-term operability during design and welding reviews.",
      "Saves cost retrospectively by preventing rushed handovers and compressed schedules."
    ],
    ar: [
      "مقاول الـ EPC يعمل لتسليم المشروع؛ والمالك يحتاج لتحسين الأداء لعشرين عاماً.",
      "مهندس المالك يحمي كفاءة التشغيل أثناء مراجعة التصاميم وجودة اللحام.",
      "يوفر التكاليف بأثر رجعي عبر منع التسليم المتسرع والخطط الزمنية المضغوطة."
    ],
    zh: [
      "EPC 总包商优化的是交付；而业主需要优化的是未来 20 年的运行性能。",
      "业主工程师在设计审查和焊接质量把关中，极力捍卫工厂的长期可操作性。",
      "通过防止仓促的移交和被压缩的调试工期，在后期能节省巨大的整改成本。"
    ]
  },
  "4": {
    en: [
      "Converter catalyst bed temperatures must reach light-off limits safely.",
      "Catalyst protection against acid condensation and moisture is absolute.",
      "Operations staff need dynamic process understanding over rigid procedure checklists."
    ],
    ar: [
      "يجب أن تصل حرارة أسِرّة محفز المحول إلى حدود بدء التفاعل بأمان.",
      "حماية العامل الحفاز من تكثف الحمض والرطوبة هي ضرورة مطلقة.",
      "يحتاج موظفو التشغيل لفهم ديناميكي للعمليات بدلاً من مجرد اتباع قوائم فحص جامدة."
    ],
    zh: [
      "转化器催化剂床层温度必须安全地达到点火反应极限温度。",
      "严防催化剂发生酸冷凝和水分吸附是绝对的红线要求。",
      "运营人员需要对工艺过程有动态的理解，而不仅仅是死板地执行操作清单。"
    ]
  },
  "5": {
    en: [
      "Delayed ramp-ups cause invisible cash drains via lower yields and energy loss.",
      "Establish strict operational utility and material balance baselines from day one.",
      "Develop rapid diagnostic loops to target root causes rather than symptoms."
    ],
    ar: [
      "تأخر بدء التشغيل يسبب خسائر نقدية غير مرئية عبر انخفاض الإنتاجية وهدر الطاقة.",
      "حدد خطوط أساس دقيقة للمرافق وموازنة المواد من اليوم الأول.",
      "قم بتطوير دوائر تشخيص سريعة لاستهداف الأسباب الجذرية بدلاً من الأعراض."
    ],
    zh: [
      "产能爬坡延迟会通过收率降低和能源浪费导致隐性的资金流失。",
      "从第一天起就建立严格的公用工程和物料平衡运行基准。",
      "建立快速诊断回路，旨在针对根本原因进行整改，而非头痛医头。"
    ]
  },
  "6": {
    en: [
      "Mannheim furnaces operate at 600°C–700°C under aggressive chemical conditions.",
      "Refractory heat-up takes 10 to 14 days to prevent silica brick spalling.",
      "Absorption system must handle full HCl gas volumes from the first reaction."
    ],
    ar: [
      "تعمل أفران مانهايم في حرارة 600-700 درجة مئوية تحت ظروف كيميائية قاسية.",
      "تسخين الفرن يستغرق 10 إلى 14 يوماً لتجنب تشظي الطوب السيليكي.",
      "يجب أن يتعامل نظام الامتصاص مع كامل حمل غاز HCl من اللحظة الأولى للتفاعل."
    ],
    zh: [
      "曼海姆窑炉在 600°C–700°C 的强腐蚀性化学工况下运行。",
      "耐火材料的升温需要 10 到 14 天的缓慢曲线，以防硅砖发生热应力炸裂。",
      "吸收系统必须在反应发生的第一时间，就具备处理全部氯化氢气体的能力。"
    ]
  },
  "7": {
    en: [
      "EPC risk concentrations peaks during the final commissioning and startup phase.",
      "Keep commissioning teams managerially independent from construction teams.",
      "Loop checks and cold lines validation save major costs post chemical feed."
    ],
    ar: [
      "مخاطر الـ EPC تتركز بشكل كبير خلال المرحلة النهائية للتشغيل وبدء التشغيل.",
      "حافظ على استقلالية فرق التشغيل التجريبي إدارياً عن فرق البناء.",
      "اختبارات الدوائر والتحقق من الأنابيب الباردة يوفر تكاليف باهظة بعد التغذية الكيميائية."
    ],
    zh: [
      "EPC 承包商的合同风险在最后的调试和启动阶段达到最高点。",
      "使调试团队在管理层级上独立于负责施工进度的建设团队。",
      "在通料前进行彻底的回路检查 and 冷态管道校验，可以规避重大的后期返工成本。"
    ]
  },
  "8": {
    en: [
      "NPK granulation relies heavily on managing liquid phase and steam quality.",
      "Recycle-to-feed ratios should stay in the strict 3:1 to 4:1 design window.",
      "Neglecting screen selection leads to blinding and drop in throughput capacity."
    ],
    ar: [
      "يعتمد تحبيب NPK بشكل كبير على إدارة المرحلة السائلة وجودة البخار.",
      "يجب أن تظل نسبة المواد المعاد تدويرها ضمن نافذة التصميم البالغة 3:1 إلى 4:1.",
      "إهمال اختيار الغرابيل يؤدي لانسدادها وانخفاض الطاقة الإنتاجية."
    ],
    zh: [
      "NPK 复合肥的造粒过程极度依赖于液相平衡和蒸汽品质的控制。",
      "返料与新鲜给料的比率应严格保持在 3:1 到 4:1 的设计窗口内。",
      "忽视筛网的选型与清理会导致筛孔堵塞，进而使系统的通过能力大幅下降。"
    ]
  },
  "9": {
    en: [
      "Handover is a core knowledge transfer event, not just a legal signature.",
      "DCS control parameters and baseline vibrations must be documented early.",
      "Classroom training is secondary to hands-on site diagnostic scenarios."
    ],
    ar: [
      "التسليم هو حدث أساسي لنقل المعرفة، وليس مجرد توقيع قانوني ورقي.",
      "يجب توثيق بارامترات تحكم DCS والاهتزازات الأساسية للمعدات مبكراً.",
      "التدريب النظري يأتي في المرتبة الثانية بعد سيناريوهات التشخيص الميدانية العملية."
    ],
    zh: [
      "装置移交是一次核心的技术知识转移，而非仅仅是法律上的签字手续。",
      "必须尽早记录 DCS 控制参数的实际整定值和设备的运行振动基准值。",
      "与课堂培训相比，现场实操的诊断故障演练对操作员来说更为重要。"
    ]
  },
  "10": {
    en: [
      "Process systems are deeply interconnected; avoid isolated troubleshooting.",
      "Field operator sensory feedback must complement DCS control charts.",
      "80% correct diagnosis in hours is better than a 2-week comprehensive study."
    ],
    ar: [
      "أنظمة العمليات مترابطة بعمق؛ تجنب استكشاف الأعطال بشكل معزول.",
      "يجب أن تتكامل الملاحظات الحسية لمشغل الميدان مع مخططات تحكم DCS.",
      "تشخيص صحيح بنسبة 80% في ساعات أفضل من دراسة شاملة تستغرق أسبوعين."
    ],
    zh: [
      "工艺系统是高度关联的整体，切忌进行孤立的“头痛医头”式排故。",
      "现场操作人员的感官触觉反馈必须与 DCS 控制室的数据曲线互为补充。",
      "在几小时内做出 80% 准确度的及时诊断，远比耗时两周的全面报告更有商业价值。"
    ]
  },
  "11": {
    en: [
      "Owner representative presence during pre-commissioning is vital for contract security.",
      "Punch lists must clearly prioritize safety and operation-critical items (Category A).",
      "Validate PGR runs under strict feedstock and utility nominal consumption."
    ],
    ar: [
      "وجود ممثل المالك أثناء ما قبل التشغيل حيوي لضمان أمان العقد.",
      "قوائم الملاحظات يجب أن تعطي الأولوية لعناصر الأمان والتشغيل الحرج (فئة أ).",
      "تحقق من أداء PGR في ظل استهلاك اسمي صارم للمواد الخام والمرافق."
    ],
    zh: [
      "预调试期间业主代表的现场见证对于合同安全和质量把关至关重要。",
      "尾项清单（Punch list）必须清晰地划分出安全和运行关键项（A 类项）。",
      "在原料和公用工程消耗完全符合额定设计的条件下验证 72 小时性能保证测试。"
    ]
  },
  "12": {
    en: [
      "Slow heating curve ensures refractory bricks release free water safely.",
      "Rushing oven temperatures causes spalling and structural crack failures.",
      "Digital thermocouple maps provide certified monitoring profiles."
    ],
    ar: [
      "منحنى التسخين البطيء يضمن خروج المياه الحرة من الطوب الحراري بأمان.",
      "تسريع حرارة الفرن يسبب التشظي وتصدعات هيكلية في بطانة الفرن.",
      "مخططات المزدوجات الحرارية الرقمية توفر ملفات مراقبة موثقة للحرارة."
    ],
    zh: [
      "缓慢的升温曲线能够确保耐火砖安全地排出游离水分。",
      "赶工期强行快速升温会造成水分急剧汽化，导致耐火材料剥落和结构裂纹。",
      "建立数字化热电偶温度测绘图，可提供可追溯的温控曲线监测记录。"
    ]
  },
  "13": {
    en: [
      "Ambient humidity exceeding salt Critical Relative Humidity (CRH) causes sticky caking.",
      "Boost fines recycle ratio to dry out granulator buffers dynamically.",
      "Post-cooler hydrophobic coatings prevent compaction and storage caking."
    ],
    ar: [
      "تجاوز الرطوبة المحيطة للرطوبة الحرجة للأملاح يسبب التكتل اللزج.",
      "زد من نسبة تدوير المواد الناعمة لتجفيف منطقة التحبيب ديناميكياً.",
      "طلاءات طرد المياه بعد المبرد تمنع الانضغاط وتكتل المنتج في الصوامع."
    ],
    zh: [
      "环境湿度一旦超过物料的临界相对湿度（CRH），就会导致粘结和吸湿结块。",
      "提高细料的循环比，可在造粒机缓冲区域起到动态干燥和调节水分的作用。",
      "在冷却器后涂敷憎水防结块剂，能有效防止产品在库房和筒仓中发生压实结块。"
    ]
  }
};

// Formatter to render **bold** text inside paragraphs elegantly
function formatBoldText(text: string) {
  if (!text) return "";
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <strong key={i} className="text-white font-semibold mx-[1px]">
              {part}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

// Markdown parser optimized for dynamic article viewing
function parseMarkdown(content: string, fcDisplay: string, fcBody: string) {
  if (!content) return null;
  const blocks = content.split("\n\n");
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 
          key={index} 
          className={`${fcDisplay} text-xl sm:text-2xl text-white font-medium mt-10 mb-5 border-b border-white/10 pb-2.5`}
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 
          key={index} 
          className={`${fcDisplay} text-lg sm:text-xl text-gold font-medium mt-8 mb-4`}
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map(item => item.replace(/^[*-\s]+/, ""));
      return (
        <ul key={index} className="list-disc pl-5 rtl:pl-0 rtl:pr-5 text-silver/85 space-y-3 mb-6">
          {items.map((item, i) => (
            <li key={i} className={`${fcBody} text-sm sm:text-base font-light leading-relaxed`}>
              {formatBoldText(item)}
            </li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n").map(item => item.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={index} className="list-decimal pl-5 rtl:pl-0 rtl:pr-5 text-silver/85 space-y-3 mb-6">
          {items.map((item, i) => (
            <li key={i} className={`${fcBody} text-sm sm:text-base font-light leading-relaxed`}>
              {formatBoldText(item)}
            </li>
          ))}
        </ol>
      );
    }
    return (
      <p 
        key={index} 
        className={`${fcBody} text-silver/85 text-sm sm:text-base font-light leading-relaxed mb-5 text-justify`}
      >
        {formatBoldText(trimmed)}
      </p>
    );
  });
}

interface ArticlePageClientProps {
  articleId: string;
}

export function ArticlePageClient({ articleId }: ArticlePageClientProps) {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);

  // Fetch translated article details
  const article = insightsPage.articles[locale].find((a: any) => a.id === articleId);
  const coverImage = articleImages[articleId] || "/insights-commissioning.png";

  // Fetch 3 related articles (excluding the active one)
  const otherArticles = insightsPage.articles[locale].filter((a: any) => a.id !== articleId);
  const relatedArticles = otherArticles.slice(0, 3);

  // Takeaways from custom dictionary
  const takeawaysList = articleTakeaways[articleId]?.[locale] || [];

  if (!article) return null;

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="w-full text-start bg-navy-deep">
      
      {/* 1. Immersive Article Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] flex flex-col justify-end overflow-hidden bg-navy-deep pt-36 pb-0 border-b border-divider">
        {/* Background cover image with multi-layered blending */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={articleId === "6" ? "/k2so4_plant-mobile.webp" : undefined} />
            <img
              src={coverImage}
              alt={article.title}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 animate-subtle-zoom"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/60" />
          <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-navy-deep/90 to-transparent pointer-events-none" />
        </div>

        {/* Back navigation & hero content */}
        <div className="max-w-[1280px] w-full mx-auto px-8 relative z-10 mt-auto pb-12 sm:pb-16">
          <div className="mb-6">
            <Link 
              href="/insights/" 
              className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300 ${fcUi}`}
            >
              <ArrowLeft className={`w-3.5 h-3.5 transition-transform duration-300 ${rtl ? "rotate-180 hover:translate-x-1" : "hover:-translate-x-1"}`} />
              {locale === "ar" ? "العودة إلى المقالات" : locale === "zh" ? "返回文章列表" : "Back to Insights"}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2.5 py-1 rounded-sm border border-gold/15`}>
              {article.category}
            </span>
          </div>

          <h1 className={`${fcDisplay} text-[clamp(22px,4.5vw,56px)] leading-[1.1] text-cloud mb-5 tracking-normal font-medium max-w-[960px] display-font-spacing`}>
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-silver/50 border-t border-white/[0.08] pt-5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold/80" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold/80" />
              <span>{locale === "ar" ? "قراءة في 5 دقائق" : locale === "zh" ? "5分钟阅读" : "5 min read"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gold/80" />
              <span>Kafaah Operations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Body Content & Sticky Sidebar layout */}
      <section className="py-20 bg-navy-deep relative">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Markdown Article Body */}
            <div className="lg:col-span-8">
              <FadeIn>
                {/* Excerpt blockquote callout */}
                <div className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-gold/50 pl-5 rtl:pl-0 rtl:pr-5 py-2 mb-8 bg-navy-card/15 rounded-r-sm">
                  <p className={`${fcBody} text-silver/70 text-sm sm:text-base font-light italic leading-relaxed`}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Body Content */}
                <div className="article-body-content">
                  {parseMarkdown(article.content, fcDisplay, fcBody)}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Premium Sticky Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              
              {/* Executive Takeaways Card */}
              {takeawaysList.length > 0 && (
                <FadeIn delay={0.15}>
                  <div className="relative bg-navy-card/30 backdrop-blur-md border border-white/[0.1] p-6 sm:p-8 rounded-sm hover:border-gold/30 transition-all duration-500">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/30 via-gold to-gold/30" />
                    
                    <h4 className={`${fcUi} text-[11px] font-bold tracking-[0.2em] text-gold uppercase mb-5 flex items-center gap-2`}>
                      <ShieldCheck className="w-4 h-4 text-gold" />
                      {locale === "ar" ? "أهم النقاط والملخص" : locale === "zh" ? "核心要点总结" : "Key Takeaways"}
                    </h4>
                    
                    <ul className="space-y-4">
                      {takeawaysList.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <p className={`${fcBody} text-[13px] font-light text-silver/85 leading-relaxed`}>
                            {takeaway}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Sidebar Action Consult Card */}
              <FadeIn delay={0.25}>
                <div className="relative bg-gradient-to-br from-navy-card/40 to-navy-deep/20 border border-white/[0.08] p-6 sm:p-8 rounded-sm hover:border-gold/25 transition-all duration-500 text-center">
                  <Briefcase className="w-8 h-8 text-gold mx-auto mb-4 opacity-80" />
                  
                  <h4 className={`${fcDisplay} text-[17px] text-white font-medium mb-2`}>
                    {locale === "ar" ? "تواجه تحدي في منشأتك؟" : locale === "zh" ? "装置面临技术难题？" : "Facing a Plant Challenge?"}
                  </h4>
                  
                  <p className={`${fcBody} text-xs font-light text-silver/70 leading-relaxed mb-6`}>
                    {locale === "ar" 
                      ? "تواصل مع مهندسينا لحل مشاكل التشغيل والإنتاجية." 
                      : locale === "zh" 
                      ? "与我们的项目工程师直接沟通，解决运行与调试难题。" 
                      : "Engage our process engineering lead for startup or optimization advice."}
                  </p>
                  
                  <Link 
                    href="/contact/" 
                    className={`group btn-premium-gold ${fcUi} text-[10px] font-bold tracking-[0.1em] uppercase py-2.5 px-5 flex items-center justify-center w-full`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {locale === "ar" ? "استشر مهندسينا" : locale === "zh" ? "咨询技术专家" : "Discuss Your Plant"}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </FadeIn>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Related Articles Grid Section (with bg-navy-dark) */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-navy-dark border-y border-white/[0.05] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <FadeIn className="mb-12">
              <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-4 gold-line`}>
                {locale === "ar" ? "رؤى فنية ذات صلة" : locale === "zh" ? "相关工程洞察" : "Related Insights"}
              </div>
              <h2 className={`${fcDisplay} text-2xl sm:text-[34px] text-cloud font-medium tracking-tight`}>
                {locale === "ar" ? "أوراق وتقارير هندسية مقترحة" : locale === "zh" ? "为您推荐的技术白皮书" : "Recommended Engineering Reading"}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((art: any) => {
                const img = articleImages[art.id] || "/insights-commissioning.png";
                return (
                  <Link
                    key={art.id}
                    href={`/insights/${slugify(art.title)}/`}
                    className="bg-navy-card/45 backdrop-blur-sm border border-white/[0.08] hover:border-gold/45 hover:bg-navy-card-hover/60 transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full group relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(229,193,88,0.06)]"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                      <picture>
                        <source media="(max-width: 768px)" srcSet={art.id === "6" ? "/k2so4_plant-mobile.webp" : undefined} />
                        <img
                          src={img}
                          alt={art.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/30 to-transparent" />
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-sm`}>
                            {art.category}
                          </span>
                        </div>
                        <h3 className={`${fcDisplay} text-lg text-cloud leading-[1.3] mb-3 group-hover:text-gold transition-colors duration-300 font-medium`}>
                          {art.title}
                        </h3>
                        <p className={`${fcBody} text-xs font-light text-silver/70 leading-[1.7] line-clamp-3`}>
                          {art.excerpt}
                        </p>
                      </div>
                      <div className="pt-5 mt-5 border-t border-white/[0.05] flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-silver/50 group-hover:text-gold transition-colors duration-300">
                        {locale === "ar" ? "اقرأ المقال" : locale === "zh" ? "阅读文章" : "Read Article"}
                        <ArrowRight className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Unified Services & Technologies CTA Section */}
      <section className="py-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,193,88,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,193,88,0.1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-1/4 -top-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-1/4 -bottom-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          
          {/* Header */}
          <FadeIn className="text-center mb-16">
            <span className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4 inline-block`}>
              {locale === "ar" ? "قدرات كفاءة الصناعية" : locale === "zh" ? "Kafaah 工业能力" : "Kafaah Industrial Capabilities"}
            </span>
            <h2 className={`${fcDisplay} text-3xl sm:text-4xl md:text-[44px] text-white leading-[1.1] mb-5`}>
              {locale === "ar" ? "من الهندسة إلى التشغيل المستقر" : locale === "zh" ? "从设计审查到稳定运行" : "From Design Review to Stable Operations"}
            </h2>
            <p className={`${fcBody} text-sm sm:text-base font-light text-silver/70 max-w-[640px] mx-auto leading-relaxed`}>
              {locale === "ar"
                ? "ندعم المشاريع والمنشآت الصناعية المعقدة عبر طاقم من المهندسين الخبراء في الكيماويات والأسمدة."
                : locale === "zh"
                ? "我们通过拥有一线实操经验的项目工程师团队，为复杂的化工和化肥工厂提供强有力的技术保障。"
                : "We support complex industrial facilities through a specialized team of fertilizer and inorganic chemical plant specialists."}
            </p>
          </FadeIn>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Services CTA Card */}
            <FadeIn delay={0.1}>
              <div className="h-full bg-navy-card/45 backdrop-blur-sm border border-white/[0.08] hover:border-gold/30 transition-all duration-500 rounded-sm p-8 sm:p-10 relative flex flex-col justify-between group shadow-xl">
                {/* Corner details */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-gold/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-gold/30 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-gold/30 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-gold/30 rounded-br-sm pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-sm bg-navy-deep border border-white/10 flex items-center justify-center group-hover:border-gold/30 transition-all duration-300">
                      <Briefcase className="w-5 h-5 text-gold" />
                    </div>
                    <span className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-gold`}>
                      {locale === "ar" ? "الخدمات الهندسية" : locale === "zh" ? "专业服务" : "Technical Services"}
                    </span>
                  </div>

                  <h3 className={`${fcDisplay} text-xl sm:text-2xl text-white font-medium mb-4`}>
                    {locale === "ar" ? "11 خدمة تغطي دورة حياة المشروع" : locale === "zh" ? "覆盖项目全生命周期的11项服务" : "11 Services Across Project Lifecycles"}
                  </h3>

                  <p className={`${fcBody} text-xs sm:text-sm font-light text-silver/80 leading-relaxed mb-6`}>
                    {locale === "ar"
                      ? "من مراجعة التصاميم والهندسة التفصيلية، إلى الإشراف على التشغيل التجريبي، وتدريب المشغلين، وضمان الأداء وتحسين الإنتاج."
                      : locale === "zh"
                      ? "从设计审查、业主工程师代表、施工与调试配合，到操作员现场实操培训、产能爬坡与技术索赔支持。"
                      : "From design audit and Owner's Engineer oversight, to commissioning, operator training, startup performance guarantees, and production troubleshooting."}
                  </p>

                  <ul className="space-y-2.5 mb-8 text-xs font-light text-silver/70">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "مهندس المالك ومراجعة التصاميم" : locale === "zh" ? "业主工程师代表与设计审查" : "Owner's Engineer & Design Review"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "التشغيل التجريبي وبدء تشغيل المصانع" : locale === "zh" ? "现场调试与冷热态启动管理" : "Commissioning & Plant Startup"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "تحسين الإنتاجية وتوقعات الضمان" : locale === "zh" ? "产能爬坡优化与性能测试担保" : "Production Optimization & Performance Test Runs"}</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/services/"
                  className={`group relative overflow-hidden bg-navy-deep hover:bg-navy-deep/80 border border-white/10 hover:border-gold/30 text-white font-[family-name:var(--font-ui)] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-center py-3.5 px-6 rounded-sm w-full block transition-all duration-300`}
                >
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {locale === "ar" ? "استكشف خدماتنا الـ 11" : locale === "zh" ? "浏览所有11项服务" : "Explore All 11 Services"}
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                  </span>
                </Link>
              </div>
            </FadeIn>

            {/* Technologies CTA Card */}
            <FadeIn delay={0.2}>
              <div className="h-full bg-navy-card/45 backdrop-blur-sm border border-white/[0.08] hover:border-gold/30 transition-all duration-500 rounded-sm p-8 sm:p-10 relative flex flex-col justify-between group shadow-xl">
                {/* Corner details */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-gold/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-gold/30 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-gold/30 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-gold/30 rounded-br-sm pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-sm bg-navy-deep border border-white/10 flex items-center justify-center group-hover:border-gold/30 transition-all duration-300">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <span className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-gold`}>
                      {locale === "ar" ? "العمليات التقنية" : locale === "zh" ? "工艺技术" : "Process Technologies"}
                    </span>
                  </div>

                  <h3 className={`${fcDisplay} text-xl sm:text-2xl text-white font-medium mb-4`}>
                    {locale === "ar" ? "6 تقنيات كيميائية غير عضوية أساسية" : locale === "zh" ? "深耕6项核心无机化工工艺" : "6 Core Inorganic Chemical Technologies"}
                  </h3>

                  <p className={`${fcBody} text-xs sm:text-sm font-light text-silver/80 leading-relaxed mb-6`}>
                    {locale === "ar"
                      ? "خبرة عملية متخصصة في مصانع الأحماض والأسمدة التجارية، بما في ذلك الأفران الحرارية المعقدة وخطوط التحبيب الميكانيكية."
                      : locale === "zh"
                      ? "在硫酸、磷酸、硫酸钾（曼海姆法窑炉）、复合肥造粒线以及单超磷等核心工艺装置上拥有丰富的实战业绩。"
                      : "Hands-on engineering and commissioning expertise in commercial acid and fertilizer facilities, supporting complex high-temperature reactors and physical granulation loops."}
                  </p>

                  <ul className="space-y-2.5 mb-8 text-xs font-light text-silver/70">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "حمض الكبريتيك والفسفوريك" : locale === "zh" ? "硫酸法、湿法磷酸工艺装置" : "Sulfuric Acid & Phosphoric Acid"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "كبريتات البوتاسيوم (عملية مانهايم)" : locale === "zh" ? "曼海姆法硫酸钾 (K₂SO₄ / SOP)" : "Sulfate of Potash (Mannheim Process)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 rtl:rotate-180" />
                      <span>{locale === "ar" ? "أسمدة NPK المركبة والتحبيب" : locale === "zh" ? "NPK 复合肥生产与造粒系统" : "NPK Compound Fertilizers & Granulation"}</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/technologies/"
                  className={`group relative overflow-hidden bg-navy-deep hover:bg-navy-deep/80 border border-white/10 hover:border-gold/30 text-white font-[family-name:var(--font-ui)] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-center py-3.5 px-6 rounded-sm w-full block transition-all duration-300`}
                >
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {locale === "ar" ? "استكشف تقنياتنا الـ 6" : locale === "zh" ? "浏览所有6项核心技术" : "Explore All 6 Technologies"}
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${rtl ? "rotate-180" : ""}`} />
                  </span>
                </Link>
              </div>
            </FadeIn>

          </div>

          {/* Core Action Call */}
          <FadeIn delay={0.3} className="text-center">
            <div className="bg-navy-card/20 backdrop-blur-md border border-white/[0.08] hover:border-gold/30 transition-all duration-500 rounded-sm p-8 max-w-[960px] mx-auto relative shadow-2xl">
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/30 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/30 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/30 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/30 rounded-br-sm pointer-events-none" />

              <h4 className={`${fcDisplay} text-xl sm:text-2xl text-white font-medium mb-3`}>
                {locale === "ar" ? "هل تحتاج إلى استشاري تقني متخصص؟" : locale === "zh" ? "需要针对您工厂的专属技术评估？" : "Need Direct Operational Advisory?"}
              </h4>
              <p className={`${fcBody} text-xs sm:text-sm font-light text-silver/75 max-w-[600px] mx-auto leading-relaxed mb-6`}>
                {locale === "ar"
                  ? "ناقش تحديات بدء تشغيل مصنعك أو انخفاض معدل الإنتاجية مباشرة مع كبار مهندسينا الميدانيين."
                  : locale === "zh"
                  ? "直接与我们资深的项目和工艺工程师对接，讨论解决公用工程负荷不足或造粒不稳定等具体装置瓶颈。"
                  : "Discuss your startup schedules, commissioning punch lists, or low yields directly with our lead field directors."}
              </p>

              <Link
                href="/contact/"
                className="group btn-premium-gold font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.15em] uppercase inline-flex items-center"
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                <span className="relative z-10 flex items-center gap-3 py-1">
                  {locale === "ar" ? "تواصل مع خبرائنا" : locale === "zh" ? "与我们的团队对接" : "Consult with our team"}
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 ${rtl ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
