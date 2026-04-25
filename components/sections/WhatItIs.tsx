import { Reveal } from "@/components/ui/Reveal";

const WHAT_IT_IS = [
  "A peer-led mental wellness community rooted in lived experience.",
  "A welcoming space for conversation, reflection, and connection.",
  "A place to find support through events, circles, and one-on-one sessions.",
];

const WHAT_IT_ISNT = [
  "Not therapy.",
  "Not crisis care.",
  "Not a clinical or diagnostic program.",
];

export function WhatItIs() {
  return (
    <section id="what-it-is" className="section-pad bg-caya-canvas">
      <div className="container-wide">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center" y={22}>
          <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
            What Come As You Are Is
          </p>
          <h2 className="text-caya-heading-xl leading-tight font-display text-caya-charcoal">
            Support that feels human.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal y={22}>
            <div className="rounded-(--radius-card) border border-caya-sand bg-caya-warm-white p-8">
              <p className="mb-5 text-sm uppercase tracking-caya-kicker font-body text-caya-clay">
                What it is
              </p>
              <div className="space-y-4">
                {WHAT_IT_IS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caya-clay text-caya-2xs text-caya-warm-white shadow-caya-check">
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed font-body text-caya-charcoal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={22}>
            <div className="rounded-(--radius-card) border border-caya-clay-30 bg-caya-clay-15 p-8">
              <p className="mb-5 text-sm uppercase tracking-caya-kicker font-body text-caya-clay">
                What it isn&apos;t
              </p>
              <div className="space-y-4">
                {WHAT_IT_ISNT.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-caya-clay bg-caya-warm-white text-caya-2xs text-caya-clay">
                      —
                    </span>
                    <p className="text-sm leading-relaxed font-body text-caya-charcoal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed font-body text-caya-charcoal-soft">
                If you need immediate crisis support, please call or text `988`.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
