import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Space — Come As You Are",
  description:
    "A physical sanctuary designed for calm, connection, and peer community.",
};

const rooms = [
  {
    id: "sensory",
    name: "The Sensory Room",
    tagline: "Designed to calm your nervous system.",
    description:
      "Low lighting. Weighted blankets. Soft textures. Sound-dampening panels. This room has one purpose: to help you regulate. You can book it for solo time, or it becomes part of facilitated sessions when needed.",
    features: [
      "Adjustable warm lighting",
      "Weighted blankets & bolsters",
      "White noise machine",
      "No-phone-required atmosphere",
      "Book for 30 or 60 min slots",
    ],
    emoji: "🌙",
    accentColor: "var(--color-mist)",
    accentText: "oklch(42% 0.08 200)",
  },
  {
    id: "circles",
    name: "Circle Rooms",
    tagline: "Where sessions happen.",
    description:
      "Two intimate session rooms, each holding up to 12 people in a circle configuration. Comfortable seating, natural light, and design that signals safety. No clinical feeling — just a good room.",
    features: [
      "2 private rooms",
      "Circle seating for up to 12",
      "Natural light & plants",
      "Soundproofed",
      "Accessible entrance",
    ],
    emoji: "⭕",
    accentColor: "oklch(72% 0.09 38 / 0.15)",
    accentText: "var(--color-clay)",
  },
  {
    id: "lounge",
    name: "Community Lounge",
    tagline: "Open hours for unstructured connection.",
    description:
      "Some days you just need to be near people without pressure. The lounge is open most days for drop-in time. Tea, coffee, books, cozy corners. No program. No agenda. Just the option to not be alone.",
    features: [
      "Open Tuesday–Sunday",
      "Tea & coffee always brewing",
      "Little library",
      "Work-friendly tables",
      "Dogs welcome (calm ones)",
    ],
    emoji: "☕",
    accentColor: "oklch(82% 0.05 155 / 0.3)",
    accentText: "oklch(40% 0.08 155)",
  },
  {
    id: "resources",
    name: "Resource Corner",
    tagline: "A curated library of what actually helps.",
    description:
      "Zines, workbooks, local referral guides, crisis cards, and a printed community board of upcoming events and support groups across the city. Completely free to take what you need.",
    features: [
      "Free to take, free to leave",
      "Updated monthly",
      "Local therapist directory",
      "Crisis resource cards",
      "Community event board",
    ],
    emoji: "📚",
    accentColor: "oklch(88% 0.04 75 / 0.8)",
    accentText: "oklch(38% 0.06 75)",
  },
];

export default function TheSpacePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-24 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 0%, oklch(82% 0.05 155 / 0.15), transparent), var(--color-canvas)",
        }}
      >
        <div className="container-wide grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{
                color: "var(--color-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              Our physical home
            </p>
            <h1
              className="text-[clamp(3rem,6vw,5.5rem)] leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-charcoal)",
              }}
            >
              A space that feels like
              <span
                className="block italic"
                style={{ color: "var(--color-sage)" }}
              >
                {" "}
                exhaling.
              </span>
            </h1>
          </div>
          <div>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              We spent a long time thinking about what a room should feel like
              when you walk in and need to feel safe. The Space is the answer.
              Thoughtfully designed, free to enter, and always welcoming.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "var(--color-sand)",
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                📍 123 Elm Street, Suite 2
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "var(--color-sand)",
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                🕐 Tue–Sun, 10am–8pm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          <div className="flex flex-col gap-8">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                id={room.id}
                className="grid md:grid-cols-12 gap-8 items-start p-8 rounded-(--radius-card)"
                style={{
                  background: room.accentColor,
                  border: `1px solid ${room.accentColor}`,
                }}
              >
                {/* Left: emoji + name */}
                <div
                  className={`md:col-span-4 ${
                    i % 2 === 1 ? "md:order-last" : ""
                  }`}
                >
                  <span className="text-5xl block mb-4">{room.emoji}</span>
                  <h2
                    className="text-3xl mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {room.name}
                  </h2>
                  <p
                    className="text-base italic mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: room.accentText,
                    }}
                  >
                    {room.tagline}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {room.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm"
                        style={{
                          color: "var(--color-charcoal-soft)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <span
                          className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0"
                          style={{
                            background: room.accentText,
                            color: "var(--color-warm-white)",
                          }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: description + placeholder image */}
                <div className="md:col-span-8">
                  <div
                    className="aspect-16/8 rounded-2xl mb-6 flex items-end p-6"
                    style={{
                      background: `linear-gradient(135deg, ${room.accentColor} 0%, oklch(88% 0.04 75 / 0.4) 100%)`,
                      border: "1px solid oklch(22% 0.02 60 / 0.06)",
                    }}
                  >
                    <p
                      className="text-sm italic"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "oklch(38% 0.02 60 / 0.4)",
                      }}
                    >
                      Photo of {room.name}
                    </p>
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: "var(--color-charcoal-soft)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section
        className="section-pad"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-canvas), var(--color-sand))",
        }}
      >
        <div className="container-wide text-center max-w-xl mx-auto">
          <h2
            className="text-4xl mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
            }}
          >
            No appointment needed.
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            The lounge is open for drop-ins during all open hours. Sessions
            require booking. The sensory room can be reserved online or at the
            door, subject to availability.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/programs">Book a Session</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
