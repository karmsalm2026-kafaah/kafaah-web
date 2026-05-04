"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { experiencePage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

export function ExperienceClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  return (
    <>
      {/* Completed Projects */}
      <section className="py-20 bg-navy">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.completedProjects[locale]}
            </div>
          </FadeIn>

          {dict.projects[locale].map((proj: any, idx: number) => (
            <FadeIn delay={0.1 * (idx + 1)} key={idx}>
              <div className={`bg-navy-card border border-divider p-8 lg:p-10 mb-6 border-l-[3px] border-l-gold ${rtl ? "border-r-[3px] border-r-gold border-l-0" : ""}`}>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] uppercase bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5`}>
                    {proj.badge}
                  </span>
                  <span className="text-sm font-light text-muted">
                    {proj.date}
                  </span>
                </div>
                <h3 className={`${fcDisplay} text-[28px] text-cloud leading-tight mb-2`}>
                  {proj.title}
                </h3>
                <div className={`${fcUi} text-[11px] font-semibold tracking-[0.08em] text-gold mb-4`} dir="ltr">
                  {proj.tags}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-divider my-6">
                  <div className="bg-navy p-4">
                    <div className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1`}>{dict.location[locale]}</div>
                    <div className="text-sm text-cloud">{proj.location}</div>
                  </div>
                  <div className="bg-navy p-4">
                    <div className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1`}>
                      {proj.hasMilestone ? dict.milestone[locale] : dict.capacity[locale]}
                    </div>
                    <div className="text-sm text-cloud">{proj.hasMilestone ? proj.milestone : proj.capacity}</div>
                  </div>
                  <div className="bg-navy p-4">
                    <div className={`${fcUi} text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-1`}>{dict.outcome[locale]}</div>
                    <div className="text-sm text-cloud">{proj.outcome}</div>
                  </div>
                </div>
                <p className="text-sm font-light text-silver leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Background Experience */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.background[locale]}
            </div>
            <p className={`${fcDisplay} text-[clamp(20px,2.5vw,28px)] text-cloud leading-[1.4] italic mb-6`}>
              {dict.backgroundText[locale]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.techCovered[locale]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-divider">
              {[
                { formula: "H₂SO₄", name: { en: "Sulfuric Acid", ar: "حمض الكبريتيك", zh: "硫酸" } },
                { formula: "H₃PO₄", name: { en: "Phosphoric Acid", ar: "حمض الفوسفوريك", zh: "磷酸" } },
                { formula: "K₂SO₄", name: { en: "Sulfate of Potash", ar: "كبريتات البوتاسيوم", zh: "硫酸钾" } },
                { formula: "NPK", name: { en: "NPK Fertilizers", ar: "سماد مركب NPK", zh: "氮磷钾复合肥" } },
                { formula: "MgSO₄", name: { en: "Magnesium Sulphate", ar: "كبريتات المغنيسيوم", zh: "硫酸镁" } },
                { formula: "SSP", name: { en: "Single Superphosphate", ar: "سوبر فوسفات أحادي", zh: "普通过磷酸钙" } },
              ].map((tech) => (
                <div key={tech.formula} className="bg-navy-card p-6 flex items-center gap-3">
                  <span className="text-gold text-lg">✓</span>
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-lg text-cloud" dir="ltr">
                      {tech.formula}
                    </div>
                    <div className={`${fcUi} text-[11px] font-bold uppercase tracking-[0.1em] text-muted`}>{tech.name[locale]}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[960px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.geoFootprint[locale]}
            </div>
            <div className="flex flex-wrap gap-3">
              {dict.geoList[locale].map((loc) => (
                <span
                  key={loc}
                  className={`${fcUi} text-xs font-semibold tracking-[0.08em] uppercase text-silver bg-navy border border-divider px-5 py-2.5`}
                >
                  {loc}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className={`${fcDisplay} text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4`}>
              {shared.howCanWeHelp[locale]}<em className="text-gold-light not-italic">{shared.helpAccent[locale]}</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              {dict.discussProject[locale]}
            </p>
            <Link
              href="/contact/"
              className={`${fcUi} text-xs font-bold tracking-[0.12em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-colors inline-flex items-center gap-2`}
            >
              <span className={`relative z-10 flex items-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
                {shared.getInTouch[locale]}
                <ArrowRight className={`w-3.5 h-3.5 ${rtl ? "rotate-180" : ""}`} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
