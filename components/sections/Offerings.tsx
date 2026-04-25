import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

const offerings = [
  {
    emoji: "🌀",
    title: "Peer Circles",
    description:
      "Small facilitated groups around shared themes — grief, anxiety, identity, life transitions. A place to be witnessed.",
    href: "/programs",
    colorClass: "text-caya-clay-light",
  },
  {
    emoji: "🌿",
    title: "The Sensory Room",
    description:
      "Drop in. Breathe. Rest. A physical space designed to calm your nervous system with no agenda and no pressure.",
    href: "/the-space",
    colorClass: "text-caya-sage",
  },
  {
    emoji: "🎨",
    title: "Creative Workshops",
    description:
      "Art, writing, movement — expressive sessions for when words aren't enough. No talent required. Just presence.",
    href: "/programs",
    colorClass: "text-caya-gold",
  },
  {
    emoji: "☕",
    title: "Community Lounge",
    description:
      "Open hours for unstructured connection. Grab a tea. Talk. Or don't. You're allowed to just be here.",
    href: "/the-space",
    colorClass: "text-caya-earth",
  },
];

export function Offerings() {
  return (
    <section className="section-pad bg-caya-gradient-canvas-sand">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal>
            <div>
            <p className="mb-3 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              What we offer
            </p>
            <h2 className="text-caya-heading-xl font-display text-caya-charcoal">
              Ways to find your people
            </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Button variant="outline" size="md" asChild>
              <Link href="/programs" className="flex items-center gap-2">
                See all sessions <ArrowRight size={14} />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offerings.map((item, index) => (
            <Reveal key={item.title} delay={0.06 * index} y={22}>
              <Link
                href={item.href}
                className="group flex flex-col rounded-(--radius-card) border border-caya-sand bg-caya-warm-white p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-(--shadow-card)"
              >
                <span className="text-3xl mb-4">{item.emoji}</span>
                <h3 className="mb-2 text-lg font-display text-caya-charcoal transition-colors group-hover:text-caya-clay">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed font-body text-caya-charcoal-soft">
                  {item.description}
                </p>
                <span
                  className={`flex items-center gap-1.5 text-xs font-body transition-[gap,color] duration-300 group-hover:gap-2.5 ${item.colorClass}`}
                >
                  Learn more <ArrowRight size={11} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
