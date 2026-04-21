import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const offerings = [
  {
    emoji: "🌀",
    title: "Peer Circles",
    description:
      "Small facilitated groups around shared themes — grief, anxiety, identity, life transitions. A place to be witnessed.",
    href: "/programs",
    color: "var(--color-clay-light)",
  },
  {
    emoji: "🌿",
    title: "The Sensory Room",
    description:
      "Drop in. Breathe. Rest. A physical space designed to calm your nervous system with no agenda and no pressure.",
    href: "/the-space",
    color: "var(--color-sage)",
  },
  {
    emoji: "🎨",
    title: "Creative Workshops",
    description:
      "Art, writing, movement — expressive sessions for when words aren't enough. No talent required. Just presence.",
    href: "/programs",
    color: "oklch(58% 0.11 90)",
  },
  {
    emoji: "☕",
    title: "Community Lounge",
    description:
      "Open hours for unstructured connection. Grab a tea. Talk. Or don't. You're allowed to just be here.",
    href: "/the-space",
    color: "oklch(55% 0.08 75)",
  },
];

export function Offerings() {
  return (
    <section
      className="section-pad"
      style={{
        background:
          "linear-gradient(to bottom, var(--color-canvas), var(--color-sand))",
      }}
    >
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className="text-xs uppercase tracking-[0.2em] mb-3"
              style={{
                color: "var(--color-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              What we offer
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              Ways to find your people
            </h2>
          </div>
          <Button variant="outline" size="md" asChild>
            <Link href="/programs" className="flex items-center gap-2">
              See all sessions <ArrowRight size={14} />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offerings.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-6 rounded-(--radius-card) flex flex-col transition-all duration-400 hover:shadow-(--shadow-card) hover:-translate-y-1"
              style={{
                background: "var(--color-warm-white)",
                border: "1px solid var(--color-sand)",
              }}
            >
              <span className="text-3xl mb-4">{item.emoji}</span>
              <h3
                className="text-lg mb-2 group-hover:text-clay transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed flex-1 mb-4"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.description}
              </p>
              <span
                className="text-xs flex items-center gap-1.5 transition-gap duration-300 group-hover:gap-2.5"
                style={{ color: item.color, fontFamily: "var(--font-body)" }}
              >
                Learn more <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
