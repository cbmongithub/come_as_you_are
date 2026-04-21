import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden grain-overlay"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(72% 0.09 38 / 0.18) 0%, transparent 70%), var(--color-canvas)",
      }}
    >
      {/* Decorative organic shapes */}
      <div
        aria-hidden
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "var(--color-clay)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "var(--color-sage)" }}
      />

      {/* Vertical rule decorations */}
      <div
        aria-hidden
        className="absolute left-8 top-1/3 bottom-1/3 w-px hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-clay-light), transparent)" }}
      />

      <div className="container-wide relative z-10 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full animate-fade-in"
            style={{
              background: "var(--color-sand)",
              animationDelay: "0.1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--color-clay)" }}
            />
            <span
              className="text-xs tracking-[0.18em] uppercase font-medium"
              style={{ color: "var(--color-charcoal-soft)", fontFamily: "var(--font-body)" }}
            >
              Peer-Led Mental Wellness
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] leading-[1.02] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            <span
              className="block animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              You don't need
            </span>
            <span
              className="block italic animate-fade-up"
              style={{
                color: "var(--color-clay)",
                animationDelay: "0.35s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              to be okay
            </span>
            <span
              className="block animate-fade-up"
              style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
            >
              to be here.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="text-lg leading-relaxed max-w-xl mb-12 animate-fade-up"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
              animationDelay: "0.65s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            A human-centered space for peer support, shared stories, and quiet
            community. No credentials required — just your honest, whole self.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{
              animationDelay: "0.8s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Button size="lg" asChild>
              <Link href="/programs">Find a Session</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>

          {/* Trust line */}
          <p
            className="mt-8 text-xs animate-fade-up"
            style={{
              color: "oklch(38% 0.02 60 / 0.5)",
              fontFamily: "var(--font-body)",
              animationDelay: "1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Free & sliding scale sessions available · Not a crisis service
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#problem"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "oklch(38% 0.02 60 / 0.4)" }}
        aria-label="Scroll down"
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
