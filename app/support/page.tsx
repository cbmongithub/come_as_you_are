import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support the Space — Come As You Are",
  description: "Sponsor, donate, or partner with Come As You Are to keep peer wellness accessible to all.",
};

const tiers = [
  {
    name: "Community Friend",
    amount: "$25/mo",
    description: "Cover the cost of tea and coffee for one open lounge month.",
    perks: [
      "Name in monthly newsletter",
      "Warm, genuine gratitude",
    ],
    featured: false,
  },
  {
    name: "Circle Keeper",
    amount: "$100/mo",
    description: "Fund one full peer circle session every month.",
    perks: [
      "Name on session page",
      "Quarterly community call invite",
      "Personal thank-you from a host",
    ],
    featured: true,
  },
  {
    name: "Space Sustainer",
    amount: "$500/mo",
    description: "Help cover rent and utilities for a portion of The Space.",
    perks: [
      "Founding supporter recognition",
      "Logo on website & in-space signage",
      "Invitation to annual donor gathering",
      "Direct line to the founder",
    ],
    featured: false,
  },
];

const servicePartners = [
  { name: "Therapy Referrals", description: "Help us build a trusted directory of low-cost therapy options we can refer community members to." },
  { name: "Body Work & Somatic Practitioners", description: "Offer sessions or discounts to community members navigating trauma in the body." },
  { name: "Event Space Partners", description: "Host a Come As You Are circle in your venue when we need overflow capacity." },
  { name: "Employers & HR Teams", description: "Bring peer wellness into your workplace. We offer facilitated employee circles." },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(55% 0.12 38 / 0.1), transparent), var(--color-canvas)",
        }}
      >
        <div className="container-wide max-w-2xl">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--color-clay)", fontFamily: "var(--font-body)" }}
          >
            Keep it alive
          </p>
          <h1
            className="text-[clamp(3rem,6vw,5rem)] leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
          >
            This space exists because people
            <span className="italic" style={{ color: "var(--color-clay)" }}>
              {" "}care for it.
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-charcoal-soft)", fontFamily: "var(--font-body)" }}
          >
            We are a nonprofit. Our sessions are free or sliding-scale. Our
            space stays open because of people like you. Every contribution goes
            directly to keeping the lights on — literally and figuratively.
          </p>
        </div>
      </section>

      {/* Membership tiers */}
      <section
        id="sponsor"
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          <div className="max-w-xl mb-12">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--color-clay)", fontFamily: "var(--font-body)" }}
            >
              Monthly support
            </p>
            <h2
              className="text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Become a sustaining supporter
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="relative flex flex-col p-8 rounded-[var(--radius-card)] transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: tier.featured ? "var(--color-charcoal)" : "var(--color-warm-white)",
                  border: tier.featured
                    ? "1px solid var(--color-clay)"
                    : "1px solid var(--color-sand)",
                  boxShadow: tier.featured ? "var(--shadow-warm)" : "none",
                }}
              >
                {tier.featured && (
                  <div
                    className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--color-clay)",
                      color: "var(--color-warm-white)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <h3
                  className="text-2xl mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: tier.featured ? "var(--color-sand)" : "var(--color-charcoal)",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-3xl font-light mb-4 italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: tier.featured ? "var(--color-clay-light)" : "var(--color-clay)",
                  }}
                >
                  {tier.amount}
                </p>
                <p
                  className="text-sm leading-relaxed mb-6 flex-1"
                  style={{
                    color: tier.featured
                      ? "oklch(88% 0.04 75 / 0.6)"
                      : "var(--color-charcoal-soft)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {tier.description}
                </p>
                <ul className="flex flex-col gap-2 mb-8">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="text-sm flex items-start gap-2"
                      style={{
                        color: tier.featured
                          ? "oklch(88% 0.04 75 / 0.7)"
                          : "var(--color-charcoal-soft)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span
                        className="mt-0.5 text-[10px]"
                        style={{ color: tier.featured ? "var(--color-clay-light)" : "var(--color-clay)" }}
                      >
                        ✦
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: tier.featured ? "var(--color-clay)" : "var(--color-sand)",
                    color: tier.featured ? "var(--color-warm-white)" : "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Become a {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-time donation */}
      <section
        id="donate"
        className="section-pad"
        style={{ background: "var(--color-sand)" }}
      >
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--color-clay)", fontFamily: "var(--font-body)" }}
              >
                One-time giving
              </p>
              <h2
                className="text-4xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
              >
                Give what you can.
              </h2>
              <p
                className="leading-relaxed mb-6"
                style={{ color: "var(--color-charcoal-soft)", fontFamily: "var(--font-body)" }}
              >
                A one-time donation of any size makes a real difference. $10
                covers sensory room supplies. $50 covers materials for a creative
                workshop. $200 sponsors a community member&apos;s free session access
                for a month.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {["$10", "$25", "$50", "$100", "$200", "Custom"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: amount === "$50" ? "var(--color-clay)" : "var(--color-warm-white)",
                      color: amount === "$50" ? "var(--color-warm-white)" : "var(--color-charcoal)",
                      border: "1px solid var(--color-sand-deep)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <button
                className="mt-6 w-full py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[var(--shadow-warm)]"
                style={{
                  background: "var(--color-charcoal)",
                  color: "var(--color-sand)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Donate Now →
              </button>
            </div>
            <div
              className="p-8 rounded-[var(--radius-card)]"
              style={{
                background: "var(--color-warm-white)",
                border: "1px solid var(--color-sand-deep)",
              }}
            >
              <h3
                className="text-2xl mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
              >
                Where the money goes
              </h3>
              {[
                { label: "Free & sliding-scale sessions", pct: 52 },
                { label: "Space operations & rent", pct: 28 },
                { label: "Host training & support", pct: 12 },
                { label: "Community resources & printing", pct: 8 },
              ].map(({ label, pct }) => (
                <div key={label} className="mb-5">
                  <div className="flex justify-between mb-1.5">
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-clay)", fontFamily: "var(--font-body)" }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "var(--color-sand)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(to right, var(--color-clay-light), var(--color-clay))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Partners */}
      <section
        id="partners"
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          <div className="max-w-xl mb-12">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--color-clay)", fontFamily: "var(--font-body)" }}
            >
              Service partners
            </p>
            <h2
              className="text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Partner with us
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: "var(--color-charcoal-soft)", fontFamily: "var(--font-body)" }}
            >
              We&apos;re always looking for aligned practitioners, venues, and
              organizations to grow our network of community care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {servicePartners.map((partner) => (
              <div
                key={partner.name}
                className="p-7 rounded-[var(--radius-card)]"
                style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-sand)",
                }}
              >
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
                >
                  {partner.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-charcoal-soft)", fontFamily: "var(--font-body)" }}
                >
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="mailto:partners@comeasyouare.co"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[var(--shadow-warm)] hover:scale-[1.02]"
              style={{
                background: "var(--color-clay)",
                color: "var(--color-warm-white)",
                fontFamily: "var(--font-body)",
              }}
            >
              Get in touch about partnering →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
