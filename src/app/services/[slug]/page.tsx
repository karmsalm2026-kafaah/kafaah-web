import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { ServicePageClient } from "./ServicePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.seoKeywords,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedTechs = technologies.filter((t) =>
    service.relatedTech.includes(t.slug)
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-dark border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        <div
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(100px,15vw,220px)] text-navy-mid/20 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          {service.num}
        </div>
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Service
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-4">
            {service.title}
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed">
            {service.heroTagline}
          </p>
        </div>
      </section>

      <ServicePageClient service={service} relatedTechs={relatedTechs} />
    </div>
  );
}
