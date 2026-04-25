import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Founder } from "@/components/sections/Founder";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { PreEventActions } from "@/components/sections/PreEventActions";
import { RevealProvider } from "@/components/ui/Reveal";
import { getEventsForSite } from "@/lib/eventbrite";

export default async function ReviewHomePage() {
  const { events } = await getEventsForSite();
  const featuredEvent = events[0] ?? null;

  return (
    <RevealProvider disabled>
      <Hero />
      <WhatItIs />
      <PreEventActions featuredEvent={featuredEvent} />
      <ProblemSolution />
      <Founder />
    </RevealProvider>
  );
}
