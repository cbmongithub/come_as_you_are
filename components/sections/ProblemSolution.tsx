export function ProblemSolution() {
  return (
    <>
      {/* Problem */}
      <section
        id="problem"
        className="section-pad"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-canvas), oklch(93% 0.015 200 / 0.3))",
        }}
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
              The reality
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              Mental health care has a belonging problem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "1 in 5",
                label: "adults experience mental illness each year",
                note: "but most never receive support",
              },
              {
                stat: "6–8 weeks",
                label: "average wait time to see a therapist",
                note: "in most cities across the US",
              },
              {
                stat: "$200+",
                label: "average cost of a therapy session",
                note: "before insurance, if you have it",
              },
            ].map(({ stat, label, note }) => (
              <div
                key={stat}
                className="p-8 rounded-(--radius-card) text-center"
                style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-sand)",
                }}
              >
                <p
                  className="text-5xl mb-3 italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-clay)",
                  }}
                >
                  {stat}
                </p>
                <p
                  className="text-sm font-medium mb-2"
                  style={{
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {label}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "var(--color-charcoal-soft)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solution"
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual block */}
            <div className="relative">
              <div
                className="aspect-4/5 rounded-(--radius-card) overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-sand) 0%, var(--color-clay-light) 50%, var(--color-sage-light) 100%)",
                }}
              >
                {/* Decorative circle composition */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-64 h-64 rounded-full opacity-30"
                    style={{ background: "var(--color-canvas)" }}
                  />
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <blockquote
                    className="text-2xl leading-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-warm-white)",
                      fontStyle: "italic",
                    }}
                  >
                    "I finally felt like I didn't have to perform being okay."
                  </blockquote>
                  <p
                    className="mt-3 text-xs"
                    style={{
                      color: "oklch(99% 0.005 80 / 0.7)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    — Community member
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-(--shadow-warm)"
                style={{
                  background: "var(--color-charcoal)",
                  color: "var(--color-sand)",
                }}
              >
                <span
                  className="text-lg leading-none italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Free
                </span>
                <span
                  className="text-[9px] tracking-widest uppercase mt-0.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "oklch(88% 0.04 75 / 0.7)",
                  }}
                >
                  to start
                </span>
              </div>
            </div>

            {/* Text block */}
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{
                  color: "var(--color-clay)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Our answer
              </p>
              <h2
                className="text-[clamp(2rem,3.5vw,3rem)] leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                A space between alone and therapy
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Come As You Are is a peer-led community that fills the gap. Not
                a clinical service — a living room. A place where people
                who&apos;ve been through hard things hold space for others doing
                the same.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  "Facilitated peer circles — not group therapy",
                  "Trained community hosts, not clinicians",
                  "Free and sliding-scale options for all",
                  "A physical space designed for calm",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span
                      className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[10px]"
                      style={{
                        background: "var(--color-sage-light)",
                        color: "var(--color-sage)",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-charcoal)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
