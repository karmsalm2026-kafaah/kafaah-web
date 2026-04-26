"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import type { Technology } from "@/data/technologies";
import type { Service } from "@/data/services";

interface Props {
  tech: Technology;
  relatedSvcs: Service[];
}

export function TechnologyPageClient({ tech, relatedSvcs }: Props) {
  return (
    <>
      {/* Chemical Intro */}
      <section className="py-20 bg-navy-dark">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Chemical Overview
            </div>
            {tech.chemicalIntro.map((p, i) => (
              <p key={i} className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Process Overview
            </div>
            {tech.processOverview.map((p, i) => (
              <p key={i} className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Commissioning Challenges */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Commissioning Challenges
            </div>
            <ul className="space-y-4">
              {tech.commissioningChallenges.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-silver">
                  <div className="w-1.5 h-1.5 bg-gold mt-2 shrink-0" />
                  <span className="text-[15px] font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Kafaah's Experience */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Kafaah&apos;s Experience
            </div>
            {tech.kafaahExperience.map((p, i) => (
              <p key={i} className="text-[16.5px] font-light text-silver leading-[1.8] mb-5">
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      {relatedSvcs.length > 0 && (
        <section className="py-16 bg-navy-dark border-t border-divider">
          <div className="max-w-[860px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-4">
                Related Services
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedSvcs.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}/`}
                    className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.08em] uppercase text-silver bg-navy-card border border-divider px-4 py-2 hover:border-gold hover:text-gold transition-colors"
                  >
                    {svc.title}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-navy-mid border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] leading-[1.1] text-cloud mb-4">
              Working on a {tech.name} plant?
            </h2>
            <p className="text-base font-light text-silver mb-8">
              How can we help you?
            </p>
            <Link
              href="/contact/"
              className="font-[family-name:var(--font-ui)] text-xs font-bold tracking-[0.12em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-colors inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
