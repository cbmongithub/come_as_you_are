import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import heroImage from "@/app/assets/img/hero.jpg";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[58%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, oklch(18% 0.025 60 / 0.84) 0%, oklch(18% 0.025 60 / 0.62) 39%, oklch(18% 0.025 60 / 0.24) 72%, oklch(18% 0.025 60 / 0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-36"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-canvas))",
        }}
      />
      <div
        aria-hidden
        className="absolute left-8 top-1/3 bottom-1/3 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(88% 0.04 75 / 0.5), transparent)",
        }}
      />

      <div className="container-wide relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full animate-fade-in"
            style={{
              background: "oklch(99% 0.005 80 / 0.13)",
              border: "1px solid oklch(99% 0.005 80 / 0.2)",
              backdropFilter: "blur(12px)",
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
              style={{
                color: "var(--color-sand)",
                fontFamily: "var(--font-body)",
              }}
            >
              Peer-Led Mental Wellness
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] leading-[1.02] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-warm-white)",
              fontWeight: 400,
              textShadow: "0 3px 36px oklch(10% 0.02 60 / 0.35)",
            }}
          >
            <span
              className="block animate-fade-up"
              style={{
                animationDelay: "0.2s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              You don't need
            </span>
            <span
              className="block italic animate-fade-up"
              style={{
                color: "var(--color-clay-light)",
                animationDelay: "0.35s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              to be okay
            </span>
            <span
              className="block animate-fade-up"
              style={{
                animationDelay: "0.5s",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              to be here.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="text-lg leading-relaxed max-w-xl mb-12 animate-fade-up"
            style={{
              color: "oklch(96% 0.015 80 / 0.86)",
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
            <Button
              size="lg"
              variant="outline"
              className="border-[oklch(99%_0.005_80/0.65)] text-[oklch(99%_0.005_80)] hover:bg-[oklch(99%_0.005_80/0.12)]"
              asChild
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>

          {/* Trust line */}
          <p
            className="mt-8 text-xs animate-fade-up"
            style={{
              color: "oklch(96% 0.015 80 / 0.66)",
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
        style={{ color: "oklch(96% 0.015 80 / 0.62)" }}
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
