import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  return (
    <section
      className="section-pad relative overflow-hidden grain-overlay"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ background: "var(--color-clay)" }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-6"
            style={{
              color: "var(--color-clay-light)",
              fontFamily: "var(--font-body)",
            }}
          >
            Ready when you are
          </p>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-sand)",
            }}
          >
            There&apos;s a seat at the
            <span
              className="italic"
              style={{ color: "var(--color-clay-light)" }}
            >
              {" "}
              table{" "}
            </span>
            for you.
          </h2>
          <p
            className="text-base leading-relaxed mb-10"
            style={{
              color: "oklch(88% 0.04 75 / 0.6)",
              fontFamily: "var(--font-body)",
            }}
          >
            No intake form. No referral. No prerequisite for struggle. Just show
            up. We&apos;ll take it from there.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/programs">Browse Sessions</Link>
            </Button>
            <Button
              size="lg"
              className="border-[oklch(88%_0.04_75/0.3)] text-sand hover:bg-[oklch(88%_0.04_75/0.1)]"
              variant="outline"
              asChild
            >
              <Link href="/the-space">Visit The Space</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
