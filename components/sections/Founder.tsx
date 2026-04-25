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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
          <Reveal className="relative h-105 sm:h-130 lg:h-155" y={34} scale={0.98}>
            <div
              aria-hidden
              className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-caya-sage-light opacity-30 blur-3xl"
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

          <div className="max-w-2xl lg:pt-4">
            <Reveal delay={0.06} y={22}>
              <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              Meet the founder
              </p>
            </Reveal>
            <Reveal delay={0.12} y={28}>
              <h2 className="mb-6 text-caya-display-lg leading-[1.02] font-display text-caya-charcoal">
              Built from lived experience, not distance.
              </h2>
            </Reveal>
            <Reveal delay={0.18} y={30}>
              <div className="space-y-5">
              <p className="text-lg leading-relaxed font-body text-caya-charcoal-soft">
                I&apos;m not a therapist. I&apos;m not a life coach. I&apos;m
                someone who&apos;s lived through it.
              </p>
              <p className="leading-relaxed font-body text-caya-charcoal-soft">
                I&apos;m a single mom, a survivor, and a woman who&apos;s had to
                rebuild herself more times than I can count. I created Come As
                You Are because I know what it feels like to be drowning and
                still expected to show up like everything is fine.
              </p>
              <p className="leading-relaxed font-body text-caya-charcoal-soft">
                This space is everything I wish existed when I needed help: a
                place where healing is human, not clinical. No judgment. No
                shame. Just honesty, growth, and people who get it.
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
              <div className="h-px w-16 bg-clay-light" />
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
