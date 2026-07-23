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
  const phase4 = ["production-optimization", "startup-performance-guarantee", "expert-witness-dispute-resolution"];

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

  if (slug === "expert-witness-dispute-resolution" || slug === "commissioning" || slug === "construction-commissioning-support" || slug === "process-engineering-support" || slug === "investor-advisory" || slug === "owners-engineer") {
    return <ServicePageClient service={service} relatedTechs={relatedTechs} />;
  }

  const heroImage = getServiceHeroImage(slug);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Immersive Service Hero Section aligned with UI Playbook.md */}
      <header className="relative min-h-[100dvh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-center overflow-hidden bg-navy-deep pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 border-b border-white/[0.08]">
        {/* Background Image with authoritative dark overlay & directional gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
          />
          {/* Fading gradient */}
          <div className="absolute inset-0 max-md:bg-gradient-to-b md:bg-gradient-to-r md:rtl:bg-gradient-to-l from-navy-deep via-navy-deep/85 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />
          {/* Mobile overlay for high text contrast */}
          <div className="absolute inset-0 max-md:bg-navy-deep/40 max-md:bg-gradient-to-b max-md:from-navy-deep/65 max-md:via-navy-deep/40 max-md:to-navy-deep/75 md:hidden" />
        </div>

        {/* Content Container (Bottom-left on Desktop, 100vh centered on Mobile) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[calc(100dvh-6rem)] lg:min-h-0 flex flex-col justify-center lg:justify-end lg:mt-auto lg:mb-10 lg:my-0 pb-12 lg:pb-0">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>Service Advisory</span>
            </div>

            {/* H1 Title matching UI Playbook scale */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-4 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {service.heroTagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mt-6">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>Request Technical Consult</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>Talk to an Expert →</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <ServicePageClient service={service} relatedTechs={relatedTechs} />
    </div>
  );
}
