import { Metadata } from "next";
import { notFound } from "next/navigation";
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

const getServiceHeroImage = (slug: string) => {
  const phase1 = ["owners-engineer", "investor-advisory", "process-engineering-support"];
  const phase2 = ["construction-commissioning-support", "operation-readiness"];
  const phase3 = ["commissioning", "troubleshooting", "operator-training"];
  const phase4 = ["production-optimization", "startup-performance-guarantee", "claims-technical-documentation"];

  if (phase1.includes(slug)) return "/our_services_1.webp";
  if (phase2.includes(slug)) return "/our_services_2.webp";
  if (phase3.includes(slug)) return "/our_services_3.webp";
  if (phase4.includes(slug)) return "/our_services_4.webp";
  return "/services-hero-bg.webp";
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedTechs = technologies.filter((t) =>
    service.relatedTech.includes(t.slug)
  );

  const heroImage = getServiceHeroImage(slug);

  const engagementStats = [
    { label: "Typical Duration", value: service.engagement.duration },
    { label: "Assigned Team", value: service.engagement.team },
    { label: "Location Model", value: service.engagement.location },
    {
      label: "Client Focus",
      value:
        service.audience === "owner"
          ? "Owner Rep"
          : service.audience === "epc"
          ? "EPC Support"
          : "Owner / EPC",
    },
  ];

  return (
    <div>
      {/* Immersive Service Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-navy-deep pt-36 pb-0 border-b border-divider">
        {/* Background Image with authoritative overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-70 mix-blend-luminosity scale-105 animate-subtle-zoom"
          />
          {/* Multi-layered Gradients for ultimate readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/60" />
          {/* Top dark overlay layer for navbar readability */}
          <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-navy-deep/90 to-transparent pointer-events-none" />
        </div>


        {/* Content Container */}
        <div className="max-w-[1280px] w-full mx-auto px-8 relative z-10 mt-auto pb-12 lg:pb-16">
          <div className="font-[family-name:var(--font-ui)] text-[10px] font-bold tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 gold-line">
            Service Advisory
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(36px,5vw,72px)] leading-[1.02] text-cloud mb-4 tracking-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl font-light text-silver/90 max-w-[720px] leading-relaxed">
            {service.heroTagline}
          </p>
        </div>

        {/* Bottom Key Stats Bar matching technology design with 96% opacity */}
        <div
          className="relative z-10 border-t border-white/[0.15]"
          style={{ backgroundColor: "rgba(78, 96, 120, 0.96)" }}
        >
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y md:border-y-0 md:border-x border-white/[0.08] max-md:divide-x-0 max-md:border-x-0">
              {engagementStats.map((stat, i) => (
                <div
                  key={i}
                  className="py-6 px-4 md:px-6 lg:px-8 group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="text-[clamp(0.8rem,1.05vw,1.15rem)] text-white font-medium font-[family-name:var(--font-display)] leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[9px] tracking-[0.15em] uppercase font-[family-name:var(--font-ui)] text-silver/50 group-hover:text-silver/85 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicePageClient service={service} relatedTechs={relatedTechs} />
    </div>
  );
}
