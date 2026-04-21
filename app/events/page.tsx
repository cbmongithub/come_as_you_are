import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Ticket,
  Users,
  BadgeInfo,
} from "lucide-react";
import {
  getEventDetailsForSite,
  getEventsForSite,
  type SiteEvent,
  type SiteEventDetails,
} from "@/lib/eventbrite";

export const metadata: Metadata = {
  title: "Events — Come As You Are",
  description: "Upcoming peer sessions, workshops, and community gatherings.",
};

const typeColors: Record<SiteEvent["type"], { bg: string; text: string }> = {
  Community: { bg: "oklch(82% 0.05 155 / 0.3)", text: "oklch(40% 0.08 155)" },
  Conversation: { bg: "oklch(72% 0.09 38 / 0.15)", text: "var(--color-clay)" },
  Workshop: { bg: "oklch(90% 0.05 90 / 0.4)", text: "oklch(40% 0.09 90)" },
  Training: { bg: "oklch(88% 0.04 75 / 0.8)", text: "oklch(38% 0.06 75)" },
  Event: { bg: "var(--color-sand)", text: "var(--color-charcoal)" },
};

function EventCta({ event, label }: { event: SiteEvent; label: string }) {
  if (!event.url) {
    return (
      <Button size="md" disabled>
        Tickets Soon
      </Button>
    );
  }

  return (
    <Button size="md" asChild>
      <a href={`/api/events/${event.id}/ticket`}>{label}</a>
    </Button>
  );
}

function EventVisual({
  event,
  className,
}: {
  event: SiteEvent;
  className: string;
}) {
  if (event.imageUrl) {
    return (
      <div className={className}>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center`}
      style={{
        background:
          "radial-gradient(circle at 40% 40%, oklch(0% 0.4 38 / 0.3), transparent), oklch(88% 0.04 75 / 0.05)",
        border: "1px solid oklch(88% 0.04 75 / 0.08)",
      }}
    >
      <span className="text-7xl opacity-60">{event.emoji}</span>
    </div>
  );
}

function DetailChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "oklch(99% 0.005 80 / 0.7)",
        border: "1px solid oklch(88% 0.04 75 / 0.18)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color: "var(--color-clay)" }} />
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{
            color: "oklch(38% 0.02 60 / 0.7)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-sm leading-snug"
        style={{
          color: "var(--color-charcoal)",
          fontFamily: "var(--font-body)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function FeaturedDetails({ details }: { details: SiteEventDetails | null }) {
  if (!details) return null;

  const chips = [
    details.durationLabel
      ? { icon: Clock, label: "Duration", value: details.durationLabel }
      : null,
    details.capacity
      ? { icon: Users, label: "Capacity", value: `${details.capacity} seats` }
      : null,
    details.refundPolicy
      ? { icon: BadgeInfo, label: "Refunds", value: details.refundPolicy }
      : null,
  ].filter(Boolean) as {
    icon: typeof Calendar;
    label: string;
    value: string;
  }[];

  return (
    <>
      {details.organizerName ? (
        <p
          className="text-sm mb-5"
          style={{
            color: "var(--color-charcoal-soft)",
            fontFamily: "var(--font-body)",
          }}
        >
          Hosted by{" "}
          {details.organizerUrl ? (
            <a
              href={details.organizerUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {details.organizerName}
            </a>
          ) : (
            details.organizerName
          )}
        </p>
      ) : null}

      {chips.length > 0 ? (
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {chips.map((chip) => (
            <DetailChip key={chip.label} {...chip} />
          ))}
        </div>
      ) : null}

      {details.fullDescriptionHtml ? (
        <details
          className="group rounded-2xl overflow-hidden"
          style={{
            background: "oklch(99% 0.005 80 / 0.58)",
            border: "1px solid oklch(88% 0.04 75 / 0.18)",
          }}
        >
          <summary
            className="list-none cursor-pointer px-5 py-4 flex items-center justify-between"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-charcoal)",
            }}
          >
            <span className="text-sm font-medium">
              See more about this event
            </span>
            <span className="text-xs" style={{ color: "var(--color-clay)" }}>
              <span className="group-open:hidden">Expand</span>
              <span className="hidden group-open:inline">Collapse</span>
            </span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <div
              className="text-sm leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
              dangerouslySetInnerHTML={{ __html: details.fullDescriptionHtml }}
            />
          </div>
        </details>
      ) : null}
    </>
  );
}

export default async function EventsPage() {
  const { events, source } = await getEventsForSite();
  const featured = events[0];
  const rest = events.slice(1);
  const featuredDetails = featured
    ? await getEventDetailsForSite(featured.id)
    : null;

  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, oklch(88% 0.04 75 / 0.3), transparent), var(--color-canvas)",
        }}
      >
        <div className="container-wide">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{
              color: "var(--color-clay)",
              fontFamily: "var(--font-body)",
            }}
          >
            What's happening
          </p>
          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
            }}
          >
            Upcoming events
          </h1>
          <p
            className="text-lg max-w-lg"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            From open community nights to intensive workshops, ticketing runs
            through Eventbrite for now so checkout stays simple.
          </p>
          {source === "fallback" ? (
            <p
              className="text-xs mt-4"
              style={{
                color: "oklch(38% 0.02 60 / 0.7)",
                fontFamily: "var(--font-body)",
              }}
            >
              Eventbrite is not configured yet. Showing placeholder events.
            </p>
          ) : null}
        </div>
      </section>

      <section
        className="section-pad"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="container-wide">
          {featured ? (
            <>
              <div
                className="mb-8 p-8 md:p-12 rounded-(--radius-card) grid md:grid-cols-2 gap-8 items-start"
                style={{
                  background: "var(--color-sand)",
                  border: "1px solid oklch(88% 0.04 75 / 0.1)",
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{featured.emoji}</span>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background:
                          typeColors[featured.type]?.bg || "var(--color-sand)",
                        color:
                          typeColors[featured.type]?.text ||
                          "var(--color-charcoal)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {featured.type}
                    </span>
                  </div>
                  <h2
                    className="text-4xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="leading-relaxed mb-6"
                    style={{
                      color: "var(--color-charcoal-soft)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {[
                      { icon: Calendar, label: featured.date },
                      { icon: Clock, label: featured.time },
                      { icon: MapPin, label: featured.location },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 text-sm"
                        style={{
                          color: "var(--color-charcoal-soft)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <Icon
                          size={13}
                          style={{ color: "var(--color-clay)" }}
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 items-center mb-6">
                    <EventCta
                      event={featured}
                      label={
                        featuredDetails?.isSoldOut
                          ? "Join Waitlist"
                          : "Get Tickets"
                      }
                    />
                    {featuredDetails?.hasAvailableTickets === false ? (
                      <span
                        className="text-xs"
                        style={{
                          color: "var(--color-charcoal-soft)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Tickets are currently unavailable.
                      </span>
                    ) : null}
                  </div>
                </div>
                <EventVisual
                  event={featured}
                  className="aspect-4/3 rounded-2xl overflow-hidden"
                />
              </div>

              {featuredDetails ? (
                <div className="mb-12 grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  {featuredDetails.addressDisplay ? (
                    <div
                      className="p-5 rounded-2xl"
                      style={{
                        background: "oklch(99% 0.005 80 / 0.7)",
                        border: "1px solid var(--color-sand)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Ticket
                          size={14}
                          style={{ color: "var(--color-clay)" }}
                        />
                        <p
                          className="text-[10px] uppercase tracking-[0.18em]"
                          style={{
                            color: "oklch(38% 0.02 60 / 0.7)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Event location
                        </p>
                      </div>
                      <p
                        className="text-sm"
                        style={{
                          color: "var(--color-charcoal)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {featuredDetails.addressDisplay}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}
                  <div className="min-w-0">
                    <FeaturedDetails details={featuredDetails} />
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-4">
                {rest.map((event) => {
                  const colors = typeColors[event.type] || {
                    bg: "var(--color-sand)",
                    text: "var(--color-charcoal)",
                  };
                  const ticketHref = `/api/events/${event.id}/ticket`;
                  const row = (
                    <>
                      <span className="text-3xl shrink-0">{event.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full"
                            style={{
                              background: colors.bg,
                              color: colors.text,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {event.type}
                          </span>
                          <h3
                            className="text-xl group-hover:text-clay transition-colors"
                            style={{
                              fontFamily: "var(--font-display)",
                              color: "var(--color-charcoal)",
                            }}
                          >
                            {event.title}
                          </h3>
                        </div>
                        <p
                          className="text-sm"
                          style={{
                            color: "var(--color-charcoal-soft)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {event.description}
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col gap-1 text-right">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: "var(--color-charcoal)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {event.date}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            color: "var(--color-charcoal-soft)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {event.time} · {event.location}
                        </span>
                        <span
                          className="text-xs flex items-center gap-1 justify-end mt-1 group-hover:gap-2 transition-all"
                          style={{
                            color: "var(--color-clay)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {event.url ? "Get tickets" : "Tickets soon"}{" "}
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </>
                  );
                  if (!event.url)
                    return (
                      <div
                        key={event.id}
                        className="group flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center p-6 rounded-2xl"
                        style={{
                          background: "var(--color-warm-white)",
                          border: "1px solid var(--color-sand)",
                        }}
                      >
                        {row}
                      </div>
                    );
                  return (
                    <a
                      key={event.id}
                      href={ticketHref}
                      className="group flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center p-6 rounded-2xl transition-all duration-300 hover:shadow-(--shadow-card) hover:-translate-y-0.5"
                      style={{
                        background: "var(--color-warm-white)",
                        border: "1px solid var(--color-sand)",
                      }}
                    >
                      {row}
                    </a>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-16">
              <h2
                className="text-4xl mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-charcoal)",
                }}
              >
                No upcoming events right now.
              </h2>
              <p
                className="text-base"
                style={{
                  color: "var(--color-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Check back soon or follow along on Eventbrite once the next
                round is published.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="newsletter"
        className="section-pad"
        style={{ background: "var(--color-sand)" }}
      >
        <div className="container-wide max-w-xl text-center mx-auto">
          <h2
            className="text-4xl mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
            }}
          >
            Stay in the loop.
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Get a calm, monthly email with upcoming events, new sessions, and
            the occasional note from the founder.
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full border text-sm outline-none focus:ring-2"
              style={{
                fontFamily: "var(--font-body)",
                borderColor: "var(--color-sand-deep)",
                background: "var(--color-warm-white)",
                color: "var(--color-charcoal)",
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-(--shadow-warm) hover:scale-[1.02] shrink-0"
              style={{
                background: "var(--color-clay)",
                color: "var(--color-warm-white)",
                fontFamily: "var(--font-body)",
              }}
            >
              Subscribe
            </button>
          </form>
          <p
            className="text-xs mt-3"
            style={{
              color: "oklch(38% 0.02 60 / 0.6)",
              fontFamily: "var(--font-body)",
            }}
          >
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>
    </>
  );
}
