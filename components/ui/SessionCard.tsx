import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export type Session = {
  id: string;
  title: string;
  host: string;
  category:
    | "grief"
    | "anxiety"
    | "connection"
    | "identity"
    | "creative"
    | "body";
  date: string;
  time: string;
  duration: string;
  capacity: number;
  spotsLeft: number;
  location: "in-person" | "virtual" | "hybrid";
  tagline: string;
};

const categoryColors: Record<
  Session["category"],
  { badge: string; dot: string }
> = {
  grief: {
    badge: "bg-caya-mist-soft text-caya-mist-dark",
    dot: "bg-caya-mist-mid",
  },
  anxiety: {
    badge: "bg-caya-clay-soft text-caya-clay-dark",
    dot: "bg-caya-clay",
  },
  connection: {
    badge: "bg-caya-sage-40 text-caya-sage",
    dot: "bg-caya-sage",
  },
  identity: {
    badge: "bg-caya-sand-80 text-caya-earth-dark",
    dot: "bg-caya-earth",
  },
  creative: {
    badge: "bg-caya-gold-soft-strong text-caya-gold-dark",
    dot: "bg-caya-gold",
  },
  body: {
    badge: "bg-caya-terra-soft text-caya-terra",
    dot: "bg-caya-terra-mid",
  },
};

export function SessionCard({ session }: { session: Session }) {
  const color = categoryColors[session.category];
  const isFull = session.spotsLeft === 0;
  const isAlmostFull = session.spotsLeft <= 3 && session.spotsLeft > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-(--radius-card) border border-caya-sand bg-caya-warm-white transition-all duration-400 hover:-translate-y-1 hover:shadow-(--shadow-warm)">
      {/* Top accent bar */}
      <div
        className={cn(
          "h-1 w-full transition-all duration-300 group-hover:h-1.5",
          color.dot,
        )}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize font-body",
              color.badge,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", color.dot)} />
            {session.category}
          </span>

          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-body",
              session.location === "virtual"
                ? "bg-caya-sage-30 text-caya-sage"
                : "bg-caya-sand-60 text-caya-earth-dark",
            )}
          >
            {session.location}
          </span>
        </div>

        {/* Title & Host */}
        <h3 className="mb-1 text-xl font-display text-caya-charcoal transition-colors duration-300 group-hover:text-clay">
          {session.title}
        </h3>
        <p className="mb-4 text-sm font-body text-caya-charcoal-soft">
          Hosted by {session.host}
        </p>

        <p className="mb-6 flex-1 text-sm leading-relaxed font-body text-caya-charcoal-75">
          {session.tagline}
        </p>

        {/* Meta info */}
        <div className="mb-5 flex flex-wrap gap-3 border-t border-caya-sand pt-4">
          {[
            { icon: Calendar, label: session.date },
            { icon: Clock, label: `${session.time} · ${session.duration}` },
            {
              icon: MapPin,
              label: session.location === "virtual" ? "Online" : "The Space",
            },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-xs font-body text-caya-charcoal-soft"
            >
              <Icon size={12} className="text-caya-clay-light" />
              {label}
            </span>
          ))}
        </div>

        {/* Spots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1" aria-hidden>
              {Array.from({
                length: Math.min(3, session.capacity - session.spotsLeft),
              }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-2 border-caya-warm-white bg-clay-light"
                />
              ))}
            </div>
            <span
              className={cn(
                "text-xs font-medium font-body",
                isFull
                  ? "text-caya-alert"
                  : isAlmostFull
                    ? "text-caya-warning"
                    : "text-caya-sage",
              )}
            >
              {isFull
                ? "Session full"
                : isAlmostFull
                  ? `Only ${session.spotsLeft} spots left`
                  : `${session.spotsLeft} spots available`}
            </span>
          </div>

          <Button
            size="sm"
            variant={isFull ? "outline" : "primary"}
            disabled={isFull}
            asChild={!isFull}
          >
            {isFull ? (
              "Join Waitlist"
            ) : (
              <Link href={`/programs/${session.id}`}>Book</Link>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
