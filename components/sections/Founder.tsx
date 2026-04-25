import Image from "next/image";
import Link from "next/link";
import ashleyPortrait from "@/app/assets/img/ashley.jpg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type FounderProps = {
  showAboutLink?: boolean;
};

export function Founder({ showAboutLink = false }: FounderProps) {
  return (
    <section className="section-pad overflow-hidden bg-caya-sand">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-16">
          <Reveal
            className="relative h-96 sm:h-[34rem] lg:h-[40rem]"
            y={34}
            scale={0.98}
          >
            <div
              aria-hidden
              className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-caya-sage-light opacity-25 blur-3xl"
            />
            <div className="absolute inset-0 overflow-hidden rounded-(--radius-card) shadow-(--shadow-warm)">
              <Image
                src={ashleyPortrait}
                alt="Ashley, founder of Come As You Are"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <div className="max-w-2xl lg:pt-2">
            <Reveal delay={0.06} y={22}>
              <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
                Meet the founder
              </p>
            </Reveal>
            <Reveal delay={0.12} y={28}>
              <h2 className="mb-5 text-caya-heading-founder leading-[1.04] font-display text-caya-charcoal">
                Built from lived experience.
              </h2>
            </Reveal>
            <Reveal delay={0.18} y={30}>
              <div className="space-y-5">
                <p className="text-lg leading-relaxed font-body text-caya-charcoal-soft">
                  Ashley created Come As You Are from a place of real need, not
                  professional distance. She knows what it feels like to carry a
                  lot and still be expected to look fine on the outside.
                </p>
                <p className="leading-relaxed font-body text-caya-charcoal-soft">
                  This space is meant to feel human, welcoming, and honest: a
                  place where people can show up without performing, explain
                  less, and feel less alone.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.28} y={24}>
              <blockquote className="mt-8 border-l border-caya-clay-light pl-6 text-2xl leading-snug italic font-display text-caya-charcoal md:text-3xl">
                &ldquo;I don&apos;t want to save people. I want them to know they
                never needed fixing in the first place.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.34} y={16}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <div className="h-px w-16 bg-caya-clay-light" />
                <p className="text-sm uppercase tracking-caya-kicker font-body text-caya-clay">
                  Ashley, Founder of Come As You Are
                </p>
                {showAboutLink ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/about">Full Story</Link>
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
