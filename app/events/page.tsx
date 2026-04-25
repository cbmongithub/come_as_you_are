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
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Events — Come As You Are",
  description: "Upcoming peer sessions, workshops, and community gatherings.",
};

const typeColors: Record<SiteEvent["type"], string> = {
  Community: "bg-caya-terra-soft text-caya-terra",
  Conversation: "bg-caya-clay-soft text-caya-clay",
  Workshop: "bg-caya-gold-soft text-caya-gold-dark",
  Training: "bg-caya-sand-80 text-caya-earth-dark",
  Event: "bg-caya-sand text-caya-charcoal",
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
      className={`${className} flex items-center justify-center border border-caya-sand-8 bg-caya-event-fallback`}
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
    <div className="rounded-2xl border border-caya-sand-18 bg-caya-warm-white-70 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-caya-clay" />
        <span className="text-caya-micro uppercase tracking-caya-kicker font-body text-caya-charcoal-70">
          {label}
        </span>
      </div>
      <p className="text-sm leading-snug font-body text-caya-charcoal">
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
        <p className="mb-5 text-sm font-body text-caya-charcoal-soft">
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
        <details className="group overflow-hidden rounded-2xl border border-caya-sand-18 bg-caya-warm-white-58">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-body text-caya-charcoal">
            <span className="text-sm font-medium">
              See more about this event
            </span>
            <span className="text-xs text-caya-clay">
              <span className="group-open:hidden">Expand</span>
              <span className="hidden group-open:inline">Collapse</span>
            </span>
          </summary>
          <div className="px-5 pb-5 pt-1">
            <div
              className="text-sm leading-relaxed font-body text-caya-charcoal-soft [&_li]:mb-1 [&_p]:mb-4 [&_strong]:font-semibold [&_ul]:mb-4 [&_ul]:pl-5"
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
      <section className="relative overflow-hidden bg-caya-gradient-events-hero pt-36 pb-20">
        <div className="container-wide">
          <Reveal y={18}>
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              What&apos;s happening
            </p>
          </Reveal>
          <Reveal delay={0.08} y={28}>
            <h1 className="mb-4 text-caya-display-page leading-tight font-display text-caya-charcoal">
              Upcoming events
            </h1>
          </Reveal>
          <Reveal delay={0.16} y={24}>
            <p className="max-w-lg text-lg font-body text-caya-charcoal-soft">
              From open community nights to intensive workshops, ticketing runs
              through Eventbrite for now so checkout stays simple.
            </p>
          </Reveal>
          {source === "fallback" ? (
            <Reveal delay={0.24} y={16}>
              <p className="mt-4 text-xs font-body text-caya-charcoal-70">
                Eventbrite is not configured yet. Showing placeholder events.
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section-pad bg-caya-canvas">
        <div className="container-wide">
          {featured ? (
            <>
              <Reveal
                className="mb-8 grid items-start gap-8 rounded-(--radius-card) border border-caya-sand-10 bg-caya-sand p-8 md:grid-cols-2 md:p-12"
                y={30}
                scale={0.985}
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{featured.emoji}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-body ${typeColors[featured.type] ?? "bg-caya-sand text-caya-charcoal"}`}
                    >
                      {featured.type}
                    </span>
                  </div>
                  <h2 className="mb-3 text-4xl font-display text-caya-charcoal">
                    {featured.title}
                  </h2>
                  <p className="mb-6 leading-relaxed font-body text-caya-charcoal-soft">
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
                        className="flex items-center gap-1.5 text-sm font-body text-caya-charcoal-soft"
                      >
                        <Icon size={13} className="text-caya-clay" />
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
                      <span className="text-xs font-body text-caya-charcoal-soft">
                        Tickets are currently unavailable.
                      </span>
                    ) : null}
                  </div>
                </div>
                <EventVisual
                  event={featured}
                  className="aspect-4/3 rounded-2xl overflow-hidden"
                />
              </Reveal>

              {featuredDetails ? (
                <div className="mb-12 grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  {featuredDetails.addressDisplay ? (
                    <Reveal
                      className="rounded-2xl border border-caya-sand bg-caya-warm-white-70 p-5"
                      delay={0.08}
                      y={20}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Ticket size={14} className="text-caya-clay" />
                        <p className="text-caya-micro uppercase tracking-caya-kicker font-body text-caya-charcoal-70">
                          Event location
                        </p>
                      </div>
                      <p className="text-sm font-body text-caya-charcoal">
                        {featuredDetails.addressDisplay}
                      </p>
                    </Reveal>
                  ) : (
                    <div />
                  )}
                  <Reveal className="min-w-0" delay={0.12} y={20}>
                    <FeaturedDetails details={featuredDetails} />
                  </Reveal>
                </div>
              ) : null}

              <div className="flex flex-col gap-4">
                {rest.map((event, index) => {
                  const colors =
                    typeColors[event.type] ?? "bg-caya-sand text-caya-charcoal";
                  const ticketHref = `/api/events/${event.id}/ticket`;
                  const row = (
                    <>
                      <span className="text-3xl shrink-0">{event.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-body ${colors}`}
                          >
                            {event.type}
                          </span>
                          <h3 className="text-xl font-display text-caya-charcoal transition-colors group-hover:text-clay">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-sm font-body text-caya-charcoal-soft">
                          {event.description}
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col gap-1 text-right">
                        <span className="text-sm font-medium font-body text-caya-charcoal">
                          {event.date}
                        </span>
                        <span className="text-xs font-body text-caya-charcoal-soft">
                          {event.time} · {event.location}
                        </span>
                        <span className="mt-1 flex items-center justify-end gap-1 text-xs font-body text-caya-clay transition-all group-hover:gap-2">
                          {event.url ? "Get tickets" : "Tickets soon"}{" "}
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    </>
                  );
                  if (!event.url)
                    return (
                      <Reveal key={event.id} delay={0.04 * index} y={18}>
                        <div className="group flex flex-col items-start gap-4 rounded-2xl border border-caya-sand bg-caya-warm-white p-6 sm:flex-row sm:items-center sm:gap-8">
                          {row}
                        </div>
                      </Reveal>
                    );
                  return (
                    <Reveal key={event.id} delay={0.04 * index} y={18}>
                      <a
                        href={ticketHref}
                        className="group flex flex-col items-start gap-4 rounded-2xl border border-caya-sand bg-caya-warm-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-card) sm:flex-row sm:items-center sm:gap-8"
                      >
                        {row}
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </>
          ) : (
            <Reveal className="py-16" y={24}>
              <div>
                <h2 className="mb-3 text-4xl font-display text-caya-charcoal">
                  No upcoming events right now.
                </h2>
                <p className="text-base font-body text-caya-charcoal-soft">
                  Check back soon or follow along on Eventbrite once the next
                  round is published.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* <section id="newsletter" className="section-pad bg-caya-sand">
        <div className="container-wide max-w-xl text-center mx-auto">
          <Reveal y={20}>
            <h2 className="mb-3 text-4xl font-display text-caya-charcoal">
              Stay in the loop.
            </h2>
          </Reveal>
          <Reveal delay={0.08} y={18}>
            <p className="mb-8 text-base leading-relaxed font-body text-caya-charcoal-soft">
              Get a calm, monthly email with upcoming events, new sessions, and
              the occasional note from the founder.
            </p>
          </Reveal>
          <Reveal delay={0.16} y={16}>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-caya-sand-deep bg-caya-warm-white px-5 py-3 text-sm font-body text-caya-charcoal outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="hover-scale-caya shrink-0 rounded-full bg-caya-clay px-6 py-3 text-sm font-medium font-body text-caya-warm-white transition-all duration-300 hover:shadow-(--shadow-warm)"
              >
                Subscribe
              </button>
            </form>
          </Reveal>
          <Reveal delay={0.22} y={12}>
            <p className="mt-3 text-xs font-body text-caya-sand-60">
              No spam. Unsubscribe any time.
            </p>
          </Reveal>
        </div>
      </section> */}
    </>
  );
}
