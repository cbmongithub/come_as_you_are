import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Offerings } from "@/components/sections/Offerings";
import { Founder } from "@/components/sections/Founder";
import { HomeCTA } from "@/components/sections/HomeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Offerings />
      <Founder showAboutLink />
      <HomeCTA />
    </>
  );
}
