import Image from "next/image";
import ashleyPortrait from "@/app/assets/img/ashley.jpg";

export function AboutFounder() {
  return (
    <section
      className="section-pad overflow-hidden"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
          <div className="relative h-105 sm:h-130 lg:h-155">
            <div
              aria-hidden
              className="absolute -left-8 -top-8 h-36 w-36 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--color-sage-light)" }}
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
          </div>

          <div className="max-w-2xl lg:pt-4">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{
                color: "var(--color-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              Meet the founder
            </p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.02] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              Built from lived experience, not distance.
            </h2>
            <div className="space-y-5">
              <p
                className="text-lg leading-relaxed"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                I&apos;m not a therapist. I&apos;m not a life coach. I&apos;m
                someone who&apos;s lived through it.
              </p>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                I&apos;m a single mom, a survivor, and a woman who&apos;s had to
                rebuild herself more times than I can count. I created Come As
                You Are because I know what it feels like to be drowning and
                still expected to show up like everything is fine.
              </p>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                This space is everything I wish existed when I needed help: a
                place where healing is human, not clinical. No judgment. No
                shame. Just honesty, growth, and people who get it.
              </p>
            </div>
            <blockquote
              className="mt-8 border-l pl-6 text-2xl leading-snug italic md:text-3xl"
              style={{
                borderColor: "var(--color-clay-light)",
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              &ldquo;I don&apos;t want to save people. I want them to know they
              never needed fixing in the first place.&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="h-px w-16 bg-clay-light" />
              <p
                className="text-sm uppercase tracking-[0.18em]"
                style={{
                  color: "var(--color-clay)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Ashley, Founder of Come As You Are
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
