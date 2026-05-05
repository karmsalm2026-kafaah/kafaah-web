"use client";

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
  return (
    <>
      <HeroSection />
      <Ticker />
      <ProblemSection />
      <ServicesSection />
      <TechnologiesSection />
      <InsightBanner />
      <TrackRecordSection />
      <GeographySection />
      <ContactCTA />
    </>
  );
}
