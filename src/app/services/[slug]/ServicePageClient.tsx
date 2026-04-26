"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import type { Service } from "@/data/services";
import type { Technology } from "@/data/technologies";

interface Props {
  service: Service;
  relatedTechs: Technology[];
}

export function ServicePageClient({ service, relatedTechs }: Props) {
  return (
    <>
      {/* Intro */}
      <section className="py-20 bg-navy">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            {service.intro.map((p, i) => (
              <p
                key={i}
                className="text-[16.5px] font-light text-silver leading-[1.8] mb-5"
              >
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Scope */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
              Scope & Deliverables
            </div>
            <ul className="space-y-4 mt-8">
              {service.scope.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-silver">
                  <div className="w-1.5 h-1.5 bg-gold mt-2 shrink-0" />
                  <span className="text-[15px] font-light leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-20 bg-navy border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Typical Engagement
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-divider">
              {[
                { label: "Duration", value: service.engagement.duration },
                { label: "Team", value: service.engagement.team },
                { label: "Location", value: service.engagement.location },
              ].map((item) => (
                <div key={item.label} className="bg-navy-card p-6">
                  <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-2">
                    {item.label}
                  </div>
                  <div className="text-cloud text-sm font-light">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Kafaah */}
      <section className="py-20 bg-navy-dark border-t border-divider">
        <div className="max-w-[860px] mx-auto px-8">
          <FadeIn>
            <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-8 gold-line">
              Why Kafaah
            </div>
            {service.whyKafaah.map((p, i) => (
              <p
                key={i}
                className="text-[16.5px] font-light text-silver leading-[1.8] mb-5"
              >
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Related Technologies */}
      {relatedTechs.length > 0 && (
        <section className="py-16 bg-navy border-t border-divider">
          <div className="max-w-[860px] mx-auto px-8">
            <FadeIn>
              <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-4">
                Related Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}/`}
                    className="font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.08em] uppercase text-silver bg-navy-card border border-divider px-4 py-2 hover:border-gold hover:text-gold transition-colors"
                  >
                    {tech.formula} — {tech.name}
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
              How can we <em className="text-gold-light">help you?</em>
            </h2>
            <p className="text-base font-light text-silver mb-8">
              Get in touch to discuss your {service.title.toLowerCase()} needs.
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
