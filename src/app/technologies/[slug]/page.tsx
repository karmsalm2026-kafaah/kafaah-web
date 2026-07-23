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
    <div className="w-full overflow-x-hidden">
      {/* Immersive Technology Hero Section aligned with UI Playbook.md */}
      <header className="relative min-h-[100svh] h-auto lg:h-[100vh] lg:min-h-[680px] flex flex-col justify-center overflow-hidden bg-navy-deep pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 border-b border-white/[0.08]">
        {/* Background Image with authoritative dark overlay & directional gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet={tech.slug === "sulfate-of-potash" ? "/k2so4_plant-mobile.webp" : tech.heroImage} />
            <img
              src={tech.heroImage}
              alt={tech.name}
              className="w-full h-full object-cover object-center lg:object-right opacity-95 mix-blend-luminosity"
            />
          </picture>
          {/* Softened gradient overlay: bright clear image on mobile with top readability */}
          <div className="absolute inset-0 max-md:bg-gradient-to-b md:bg-gradient-to-r md:rtl:bg-gradient-to-l max-md:from-navy-deep/70 max-md:via-navy-deep/35 max-md:to-transparent from-navy-deep via-navy-deep/85 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/60 max-md:from-navy-deep/40 max-md:to-navy-deep/30" />
          {/* Mobile soft contrast layer */}
          <div className="absolute inset-0 max-md:bg-gradient-to-b max-md:from-navy-deep/35 max-md:via-transparent max-md:to-navy-deep/20 md:hidden pointer-events-none" />
        </div>

        {/* Content Container (Bottom-left on Desktop, 100svh centered on Mobile with 0 scroll jump) */}
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center lg:justify-end lg:mt-auto lg:mb-10 lg:my-0 py-8 lg:py-0">
          <div className="max-w-[720px] text-left rtl:text-right">
            {/* Eyebrow Tag with pulse indicator (plain text + dot, no border box) */}
            <div className="inline-flex items-center gap-2.5 mb-4 font-[family-name:var(--font-ui)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping flex-shrink-0" />
              <span>Technology Specialist</span>
            </div>

            {/* H1 Title matching UI Playbook scale */}
            <h1 className="font-[family-name:var(--font-display)] text-[20px] xs:text-[23px] sm:text-[31px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.18] sm:leading-[1.12] text-cloud mb-4 tracking-tight">
              {tech.fullName}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-medium text-cloud mb-4 font-[family-name:var(--font-ui)] tracking-wide max-w-[620px]">
              {tech.heroTagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mt-6">
              <a
                href="mailto:info@kafaahsolutions.com"
                className="btn-premium-gold bg-gold text-navy-deep hover:bg-gold-light font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>Request Process Audit</span>
              </a>
              <a
                href="/contact/"
                className="border border-white/40 hover:border-white text-cloud hover:bg-white/10 font-[family-name:var(--font-ui)] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase px-5 sm:px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px] h-12 sm:h-14 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 text-center"
              >
                <span>Talk to a Process Expert →</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <TechnologyPageClient tech={tech} relatedSvcs={relatedSvcs} />
    </div>
  );
}
