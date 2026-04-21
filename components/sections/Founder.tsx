import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Founder() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="md:col-span-4">
            <div
              className="aspect-3/4 rounded-(--radius-card) overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(160deg, var(--color-clay-light) 0%, var(--color-clay-dark) 100%)",
              }}
            >
              {/* Decorative overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 40% 70%, oklch(99% 0.005 80 / 0.15), transparent 60%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="text-xl italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-warm-white)",
                  }}
                >
                  Founder Photo
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-8 md:pl-8">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{
                color: "var(--color-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              From the founder
            </p>
            <blockquote
              className="text-[clamp(1.5rem,3vw,2.5rem)] leading-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              &ldquo;I built this because I needed it. And I kept meeting people
              who did too.&rdquo;
            </blockquote>
            <p
              className="text-base leading-relaxed mb-4"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              After years of navigating mental health care that felt clinical,
              costly, and disconnected, I wanted to create something different.
              A space that felt more like a kitchen table than a waiting room.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              Come As You Are grew from one circle of five friends to a
              community of hundreds. We&apos;re still the same at heart: honest,
              warm, and deeply committed to meeting you wherever you are.
            </p>

            <div className="flex items-center gap-4">
              <div>
                <p
                  className="font-semibold"
                  style={{
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Jordan Ellis
                </p>
                <p
                  className="text-sm italic"
                  style={{
                    color: "var(--color-charcoal-soft)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Founder & Community Director
                </p>
              </div>
              <div
                className="h-10 w-px ml-2"
                style={{ background: "var(--color-clay-light)" }}
              />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/about">Full Story →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
