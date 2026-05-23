import { Metadata } from "next";
import { notFound } from "next/navigation";
import { technologies } from "@/data/technologies";
import { services } from "@/data/services";
import { TechnologyPageClient } from "./TechnologyPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = technologies.find((t) => t.slug === slug);
  if (!tech) return {};

  return {
    title: tech.seoTitle,
    description: tech.seoDescription,
    keywords: tech.seoKeywords,
  };
}

export default async function TechnologyPage({ params }: Props) {
  const { slug } = await params;
  const tech = technologies.find((t) => t.slug === slug);
  if (!tech) notFound();

  const relatedSvcs = services.filter((s) =>
    tech.relatedServices.includes(s.slug)
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy border-b border-divider pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
        <div
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(120px,20vw,300px)] text-navy-mid/20 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          {tech.formula}
        </div>
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Technology
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,64px)] leading-[1.05] text-cloud mb-2">
            {tech.fullName}
          </h1>
          <p className="text-lg font-light text-muted max-w-[640px] leading-relaxed mt-4">
            {tech.heroTagline}
          </p>
        </div>
      </section>

      <TechnologyPageClient tech={tech} relatedSvcs={relatedSvcs} />
    </div>
  );
}
