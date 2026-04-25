import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import heroImage from "@/app/assets/img/hero.jpg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <Image
        src={heroImage}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[58%_center]"
      />
      <div aria-hidden className="absolute inset-0 bg-caya-hero-overlay" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-36 bg-caya-hero-fade"
      />
      <div
        aria-hidden
        className="absolute bottom-1/3 left-8 top-1/3 hidden w-px bg-caya-vertical-rule lg:block"
      />

      <div className="container-wide relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          <h1 className="mb-8 text-caya-display-hero leading-[1.02] font-display font-normal text-caya-warm-white text-shadow-caya-hero">
            <Reveal
              as="span"
              delay={0.14}
              duration={0.72}
              y={28}
              className="block"
            >
              You don&apos;t need
            </Reveal>
            <Reveal
              as="span"
              delay={0.26}
              duration={0.72}
              y={28}
              className="block italic text-caya-clay-light"
            >
              to be okay
            </Reveal>
            <Reveal
              as="span"
              delay={0.38}
              duration={0.72}
              y={28}
              className="block"
            >
              to be here.
            </Reveal>
          </h1>

          <Reveal delay={0.5} duration={0.72} y={24}>
            <p className="mb-12 max-w-lg text-lg leading-relaxed font-body text-caya-warm-white-86">
              A peer-led mental wellness community built for honest connection,
              shared experience, and support that feels human. Not therapy. Not
              crisis care. A place to begin as you are.
            </p>
          </Reveal>

          <Reveal delay={0.62} duration={0.72} y={24}>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/events">Find an Event</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-caya-white-65 text-caya-warm-white hover:bg-caya-sand-12"
                asChild
              >
                <Link href="/book">Book a Session</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.76} duration={0.72} y={16}>
            <p className="mt-8 text-xs font-body text-caya-warm-white-66">
              Event details and booking are live now · More of the site is still
              on the way
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#what-it-is"
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-caya-charcoal"
        aria-label="Scroll down"
      >
        <span className="text-caya-micro uppercase tracking-caya-eyebrow font-body">
          Scroll
        </span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
