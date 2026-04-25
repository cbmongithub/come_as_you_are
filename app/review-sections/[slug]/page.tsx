import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Founder } from "@/components/sections/Founder";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { PreEventActions } from "@/components/sections/PreEventActions";
import { RevealProvider } from "@/components/ui/Reveal";
import { getEventsForSite } from "@/lib/eventbrite";

type ReviewSectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReviewSectionPage({
  params,
}: ReviewSectionPageProps) {
  const { slug } = await params;
  const { events } = await getEventsForSite();
  const featuredEvent = events[0] ?? null;

  const sectionMap = {
    hero: <Hero />,
    "what-it-is": <WhatItIs />,
    actions: <PreEventActions featuredEvent={featuredEvent} />,
    reality: <ProblemSolution />,
    founder: <Founder />,
  } as const;

  const section = sectionMap[slug as keyof typeof sectionMap];

  if (!section) {
    notFound();
  }

  return <RevealProvider disabled>{section}</RevealProvider>;
}
