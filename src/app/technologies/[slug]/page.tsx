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
      {/* Immersive Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-navy-deep pt-36 pb-0 border-b border-divider">
        {/* Background Image with authoritative overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={tech.heroImage}
            alt={tech.name}
            className="w-full h-full object-fill opacity-70 mix-blend-luminosity scale-105 animate-subtle-zoom"
          />
          {/* Multi-layered Softer Gradients to increase image visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/60" />
        </div>

        {/* Content Container */}
        <div className="max-w-[1280px] w-full mx-auto px-8 relative z-10 mt-auto pb-12 lg:pb-16">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Technology Specialist
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5.5vw,72px)] leading-[1.02] text-cloud mb-4 tracking-tight">
            {tech.fullName}
          </h1>
          <p className="text-lg md:text-xl font-light text-silver/90 max-w-[720px] leading-relaxed">
            {tech.heroTagline}
          </p>
        </div>

        {/* Bottom Key Stats Bar */}
        <div className="relative z-10 border-t border-white/[0.15]" style={{ backgroundColor: "rgba(78, 96, 120, 0.96)" }}>
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y md:border-y-0 md:border-x border-white/[0.08] max-md:divide-x-0 max-md:border-x-0">
              {tech.keyStats.map((stat, i) => (
                <div key={i} className="py-6 px-4 md:px-6 lg:px-8 group hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="text-[clamp(0.9rem,1.25vw,1.4rem)] text-white font-bold font-[family-name:var(--font-display)] leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase font-[family-name:var(--font-ui)] text-silver/50 group-hover:text-silver/85 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TechnologyPageClient tech={tech} relatedSvcs={relatedSvcs} />
    </div>
  );
}
