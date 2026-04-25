import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { SiteEvent } from "@/lib/eventbrite";

type PreEventActionsProps = {
  featuredEvent: SiteEvent | null;
};

export function PreEventActions({ featuredEvent }: PreEventActionsProps) {
  return (
    <section className="section-pad bg-caya-sand">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-card border border-caya-sand-deep bg-caya-warm-white p-8 md:p-10">
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
              Upcoming Event
            </p>
            {featuredEvent ? (
              <>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-3xl">{featuredEvent.emoji}</span>
                  <span className="rounded-full bg-caya-clay-soft px-3 py-1 text-xs font-body text-caya-clay">
                    {featuredEvent.type}
                  </span>
                </div>
                <h2 className="mb-3 text-4xl leading-tight font-display text-caya-charcoal">
                  {featuredEvent.title}
                </h2>
                <p className="mb-6 max-w-2xl text-base leading-relaxed font-body text-caya-charcoal-soft">
                  {featuredEvent.description}
                </p>
                <div className="mb-8 flex flex-wrap gap-4 text-sm font-body text-caya-charcoal-soft">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-caya-clay" />
                    {featuredEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-caya-clay" />
                    {featuredEvent.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-caya-clay" />
                    {featuredEvent.location}
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-3 text-4xl leading-tight font-display text-caya-charcoal">
                  Find the latest event details.
                </h2>
                <p className="mb-8 max-w-2xl text-base leading-relaxed font-body text-caya-charcoal-soft">
                  We&apos;re keeping event information current on the events
                  page while the full site is still being built out.
                </p>
              </>
            )}

            <Button size="lg" asChild>
              <Link href="/events" className="flex items-center gap-2">
                Find an Event <ArrowRight size={14} />
              </Link>
            </Button>
          </div>

          <div className="rounded-card border border-caya-charcoal bg-caya-charcoal p-8 md:p-10">
            <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay-light">
              Book a Session
            </p>
            <h2 className="mb-4 text-4xl leading-tight font-display text-caya-sand">
              Need a quieter starting point?
            </h2>
            <p className="mb-8 text-base leading-relaxed font-body text-caya-sand-72">
              If you&apos;re not ready for a group yet, you can book a
              one-on-one session and start with a more personal conversation.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-caya-white-65 text-caya-warm-white hover:bg-caya-sand-12"
              asChild
            >
              <Link href="/book">Book a Session</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
