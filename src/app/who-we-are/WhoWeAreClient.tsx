"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { whoWeAre as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

export function WhoWeAreClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  return (
    <>
      {/* Positioning */}
      <section className="py-20 bg-navy">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <p className={`${fcDisplay} text-[clamp(22px,3vw,34px)] leading-[1.35] text-cloud italic mb-8`}>
              {dict.intro[locale]}
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              {dict.p1[locale]}
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              {dict.p2[locale]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.whatMakesDifferent[locale]}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-divider">
              {dict.diffFeatures[locale].map((item) => (
                <div key={item.title} className="bg-navy-card p-8">
                  <h3 className={`${fcDisplay} text-xl text-cloud mb-3`}>
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Domain */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.ourDomain[locale]}
            </div>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-8">
              {dict.domainSub[locale]}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-divider">
              {[
                { formula: "H₂SO₄", name: { en: "Sulfuric Acid", ar: "حمض الكبريتيك", zh: "硫酸" } },
                { formula: "H₃PO₄", name: { en: "Phosphoric Acid", ar: "حمض الفوسفوريك", zh: "磷酸" } },
                { formula: "K₂SO₄", name: { en: "Sulfate of Potash", ar: "كبريتات البوتاسيوم", zh: "硫酸钾" } },
                { formula: "NPK", name: { en: "NPK Fertilizers", ar: "سماد مركب NPK", zh: "氮磷钾复合肥" } },
                { formula: "MgSO₄", name: { en: "Magnesium Sulphate", ar: "كبريتات المغنيسيوم", zh: "硫酸镁" } },
                { formula: "SSP", name: { en: "Single Superphosphate", ar: "سوبر فوسفات أحادي", zh: "普通过磷酸钙" } },
              ].map((tech) => (
                <div key={tech.formula} className="bg-navy-card p-6 text-center">
                  <div className="font-[family-name:var(--font-display)] text-3xl text-navy-soft/60 mb-2" dir="ltr">
                    {tech.formula}
                  </div>
                  <div className={`${fcUi} text-[11px] font-bold tracking-[0.1em] uppercase text-cloud`}>
                    {tech.name[locale]}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className={`${fcUi} text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line`}>
              {dict.whereWeWork[locale]}
            </div>
            <p className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
              {dict.whereP1[locale]}
            </p>
            <p className="text-[16.5px] font-light text-silver leading-[1.8]">
              {dict.whereP2[locale]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className={`${fcDisplay} text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4`}>
              {dict.howCanWeHelp[locale]}<em className="text-gold-light not-italic">{dict.helpAccent[locale]}</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              {dict.ctaSub[locale]}
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
