"use client";

import { useRole } from "@/lib/RoleContext";
import { roleContentMap, defaultContent } from "@/data/roleContent";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { HeroSection } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { ProblemSection } from "@/components/sections/Problem";
import { ServicesSection } from "@/components/sections/Services";
import { TechnologiesSection } from "@/components/sections/Technologies";
import { TrackRecordSection } from "@/components/sections/TrackRecord";
import { GeographySection } from "@/components/sections/Geography";
import { InsightBanner } from "@/components/sections/InsightBanner";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  const { role } = useRole();
  const content = role ? roleContentMap[role] : defaultContent;

  return (
    <>
      <HeroSection content={content.hero} />
      <Ticker />
      <ProblemSection content={content.problem} />
      <ServicesSection content={content.services} />
      <TechnologiesSection />
      <InsightBanner content={content.insight} />
      <TrackRecordSection />
      <GeographySection />
      <ContactCTA content={content.contact} />
    </>
  );
}
