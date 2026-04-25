import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About — Come As You Are",
  description:
    "Our mission, story, philosophy, and vision for a new kind of mental wellness community.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-caya-gradient-about-hero pt-36 pb-24">
        <div className="container-wide max-w-3xl">
          <Reveal y={18}>
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              Who we are
            </p>
          </Reveal>
          <Reveal delay={0.08} y={28}>
            <h1 className="mb-6 text-caya-display-page leading-tight font-display text-caya-charcoal">
              Built by people who needed this.
              <span className="block italic text-caya-clay">
                For people who need this.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16} y={24}>
            <p className="text-lg leading-relaxed font-body text-caya-charcoal-soft">
              Come As You Are isn&apos;t an organization — it&apos;s a response.
              A community that grew out of lived experience with what it feels
              like when there&apos;s nowhere to go.
            </p>
          </Reveal>
        </div>
      </section>
      {/* Mission */}
      <section className="section-pad bg-caya-sand">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal y={24}>
              <div>
                <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
                  Our mission
                </p>
                <h2 className="mb-6 text-4xl leading-tight font-display text-caya-charcoal">
                  To make feeling less alone actually accessible.
                </h2>
                <p className="leading-relaxed font-body text-caya-charcoal-soft">
                  We believe connection is medicine. Not metaphorically — actual
                  peer connection, the kind where you look someone in the eye
                  and know they&apos;ve been there too. We exist to make that
                  available to everyone, regardless of income, diagnosis, or
                  background.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} y={24}>
              <div>
                <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
                  Our vision
                </p>
                <h2 className="mb-6 text-4xl leading-tight font-display text-caya-charcoal">
                  A world where everyone has a circle.
                </h2>
                <p className="leading-relaxed font-body text-caya-charcoal-soft">
                  Our long-term vision is a network of peer wellness spaces in
                  every city — community-run, trauma-informed, and radically
                  welcoming. We&apos;re starting with one space. But this is
                  meant to grow.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Philosophy */}
      <section className="section-pad bg-caya-canvas">
        <div className="container-wide">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center" y={22}>
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              How we do things
            </p>
            <h2 className="text-4xl font-display text-caya-charcoal">
              Our philosophy
            </h2>
          </Reveal>
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
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index} y={22}>
                <div className="rounded-(--radius-card) border border-caya-sand bg-caya-warm-white p-7">
                  <h3 className="mb-3 text-xl font-display text-caya-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-body text-caya-charcoal-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      //todo: comment out this story timeline for now.
      {/* Story timeline */}
      <section className="section-pad bg-caya-charcoal">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <Reveal y={16}>
              <p className="mb-4 text-center text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay-light">
                Our story
              </p>
            </Reveal>
            <Reveal delay={0.08} y={22}>
              <h2 className="mb-16 text-center text-4xl font-display text-caya-sand">
                How it began
              </h2>
            </Reveal>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute bottom-0 left-5 top-0 w-px bg-caya-sand-15" />
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
                ].map(({ year, event }, index) => (
                  <Reveal key={year} delay={0.05 * index} y={20}>
                    <div className="relative flex gap-8 pl-14">
                      <div className="absolute left-3 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-caya-charcoal bg-caya-clay" />
                      <div>
                        <p className="mb-1 text-sm font-semibold font-body text-caya-clay-light">
                          {year}
                        </p>
                        <p className="text-sm leading-relaxed font-body text-caya-sand-60">
                          {event}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="section-pad bg-caya-canvas">
        <div className="container-wide text-center">
          <Reveal y={20}>
            <h2 className="mb-6 text-4xl font-display text-caya-charcoal">
              Be part of what comes next.
            </h2>
          </Reveal>
          <Reveal delay={0.08} y={18}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/programs">Join a Session</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">Support the Space</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
