import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import memberImage from "@/app/assets/img/member.jpg";

export function ProblemSolution() {
  return (
    <>
      {/* Problem */}
      <section
        id="problem"
        className="section-pad bg-caya-gradient-canvas-mist"
      >
        <div className="container-wide">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              The reality
            </p>
            <h2 className="text-caya-heading-xl leading-tight font-display text-caya-charcoal">
              Mental health care has a belonging problem
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "1 in 5",
                label: "adults experience mental illness each year",
                note: "but most never receive support",
              },
              {
                stat: "6–8 weeks",
                label: "average wait time to see a therapist",
                note: "in most cities across the US",
              },
              {
                stat: "$200+",
                label: "average cost of a therapy session",
                note: "before insurance, if you have it",
              },
            ].map(({ stat, label, note }, index) => (
              <Reveal key={stat} delay={0.06 * index} y={20}>
                <div className="rounded-(--radius-card) border border-caya-sand bg-caya-warm-white p-8 text-center">
                  <p className="mb-3 text-5xl italic font-display text-caya-clay">
                    {stat}
                  </p>
                  <p className="mb-2 text-sm font-medium font-body text-caya-charcoal">
                    {label}
                  </p>
                  <p className="text-xs font-body text-caya-charcoal-soft">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="section-pad bg-caya-canvas">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual block */}
            <Reveal className="relative" y={32} scale={0.98}>
              <div className="aspect-4/5 rounded-(--radius-card) overflow-hidden bg-caya-gradient-solution-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-caya-white-55 shadow-caya-portrait">
                    <Image
                      src={memberImage}
                      alt="Community member portrait"
                      fill
                      sizes="256px"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-caya-gradient-member-overlay"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0">
                  <div className="bg-caya-testimonial-panel px-8 pb-8 pt-24">
                    <blockquote className="max-w-[18ch] text-[1.85rem] leading-[1.16] font-display italic text-caya-warm-white">
                    "I finally felt like I didn't have to perform being okay."
                    </blockquote>
                    <p className="mt-4 text-sm font-body text-caya-warm-white-90">
                    — Community member
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Text block */}
            <Reveal className="" delay={0.08} y={30}>
              <div>
                <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
                  Our answer
                </p>
                <h2 className="mb-6 text-caya-heading-lg leading-tight font-display text-caya-charcoal">
                  A space between alone and therapy
                </h2>
                <p className="mb-6 text-base leading-relaxed font-body text-caya-charcoal-soft">
                  Come As You Are is a peer-led community that fills the gap.
                  Not a clinical service — a living room. A place where people
                  who&apos;ve been through hard things hold space for others
                  doing the same.
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  {[
                    "Facilitated peer circles — not group therapy",
                    "Trained community hosts, not clinicians",
                    "Free and sliding-scale options for all",
                    "A physical space designed for calm",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caya-clay text-caya-2xs text-caya-warm-white shadow-caya-check">
                        ✓
                      </span>
                      <span className="text-sm font-body text-caya-charcoal">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
