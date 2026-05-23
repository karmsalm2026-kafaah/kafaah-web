import { Metadata } from "next";
import { ExperienceClient } from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Experience — Inorganic Chemical Plant Track Record",
  description:
    "Kafaah's completed projects and track record in inorganic chemical and fertilizer plant commissioning. Suez SOP Plant, Yanbu Granulation. 20 years of operational expertise.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}

