import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Come As You Are",
  description:
    "Our mission, story, philosophy, and vision for a new kind of mental wellness community.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-24 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 0%, oklch(72% 0.09 38 / 0.12), transparent), var(--color-canvas)",
        }}
      >
        <div className="container-wide max-w-3xl">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--color-clay)",
              fontFamily: "var(--font-body)",
            }}
          >
            Who we are
          </p>
          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] leading-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
            }}
          >
            Built by people who needed this.
            <span
              className="block italic"
              style={{ color: "var(--color-clay)" }}
            >
              For people who need this.
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Come As You Are isn&apos;t an organization — it&apos;s a response. A
            community that grew out of lived experience with what it feels like
            when there&apos;s nowhere to go.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        className="section-pad"
        style={{ background: "var(--color-sand)" }}
      >
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{
                  color: "var(--color-clay)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Our mission
              </p>
              <h2
                className="text-4xl leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                To make feeling less alone actually accessible.
              </h2>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                We believe connection is medicine. Not metaphorically — actual
                peer connection, the kind where you look someone in the eye and
                know they&apos;ve been there too. We exist to make that
                available to everyone, regardless of income, diagnosis, or
                background.
              </p>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{
                  color: "var(--color-clay)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Our vision
              </p>
              <h2
                className="text-4xl leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                A world where everyone has a circle.
              </h2>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Our long-term vision is a network of peer wellness spaces in
                every city — community-run, trauma-informed, and radically
                welcoming. We&apos;re starting with one space. But this is meant
                to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{
                color: "var(--color-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              How we do things
            </p>
            <h2
              className="text-4xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              Our philosophy
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Peer, not professional",
                body: "Our hosts are trained community members who've been through their own stuff. That lived experience is the credential.",
              },
              {
                title: "Presence, not performance",
                body: "You don't need to have a breakthrough or seem like you're healing. You just need to show up. That's it.",
              },
              {
                title: "Access, not gatekeeping",
                body: "Free sessions, sliding scales, open doors. No insurance. No diagnosis. No referral. Anyone can walk in.",
              },
              {
                title: "Safety without surveillance",
                body: "What's shared in the room stays in the room. No notes. No records. No one tracking your progress.",
              },
              {
                title: "Grief is welcome here",
                body: "We don't rush you past the hard parts. You're allowed to sit in what's difficult for as long as it takes.",
              },
              {
                title: "Joy is welcome too",
                body: "This isn't only a space for suffering. Laughter, lightness, and hope are part of healing too.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-(--radius-card)"
                style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-sand)",
                }}
              >
                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--color-charcoal-soft)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section
        className="section-pad"
        style={{ background: "var(--color-charcoal)" }}
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 text-center"
              style={{
                color: "var(--color-clay-light)",
                fontFamily: "var(--font-body)",
              }}
            >
              Our story
            </p>
            <h2
              className="text-4xl text-center mb-16"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-sand)",
              }}
            >
              How it began
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ background: "oklch(88% 0.04 75 / 0.15)" }}
              />
              <div className="flex flex-col gap-12">
                {[
                  {
                    year: "2019",
                    event:
                      "Ashley hosts the first peer circle — a group of five friends sitting on a living room floor, talking about what wasn't working.",
                  },
                  {
                    year: "2021",
                    event:
                      "Word spreads. The circle outgrows the living room. The community hosts its first public session in a borrowed studio.",
                  },
                  {
                    year: "2022",
                    event:
                      "Come As You Are officially incorporates as a nonprofit. First grant received. First paid community host.",
                  },
                  {
                    year: "2023",
                    event:
                      "The physical space opens. A former retail unit transformed into a sensory room, community lounge, and session rooms.",
                  },
                  {
                    year: "Now",
                    event:
                      "Hundreds of community members. Weekly sessions. A waitlist. And a model beginning to replicate in other cities.",
                  },
                ].map(({ year, event }) => (
                  <div key={year} className="flex gap-8 pl-14 relative">
                    <div
                      className="absolute left-3 top-2 w-4 h-4 rounded-full border-2 -translate-x-1/2"
                      style={{
                        background: "var(--color-clay)",
                        borderColor: "var(--color-charcoal)",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{
                          color: "var(--color-clay-light)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {year}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "oklch(88% 0.04 75 / 0.6)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide text-center">
          <h2
            className="text-4xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
            }}
          >
            Be part of what comes next.
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/programs">Join a Session</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/support">Support the Space</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
