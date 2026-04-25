import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function HomeCTA() {
  return (
    <section className="section-pad relative overflow-hidden grain-overlay bg-caya-charcoal">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-caya-cta-glow"
      />

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal y={18}>
            <p className="mb-6 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay-light">
              Ready when you are
            </p>
          </Reveal>
          <Reveal delay={0.08} y={26}>
            <h2 className="mb-6 text-caya-display-md leading-tight font-display text-caya-sand">
            There&apos;s a seat at the
            <span className="italic text-caya-clay-light">
              {" "}
              table{" "}
            </span>
            for you.
            </h2>
          </Reveal>
          <Reveal delay={0.16} y={24}>
            <p className="mb-10 text-base leading-relaxed font-body text-caya-sand-60">
            No intake form. No referral. No prerequisite for struggle. Just show
            up. We&apos;ll take it from there.
            </p>
          </Reveal>
          <Reveal delay={0.24} y={20}>
            <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/programs">Browse Sessions</Link>
            </Button>
            <Button
              size="lg"
              className="border-caya-clay-30 text-sand hover:bg-caya-sand-10"
              variant="outline"
              asChild
            >
              <Link href="/the-space">Visit The Space</Link>
            </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
