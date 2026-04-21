import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface Session {
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
}

const categoryColors: Record<
  Session["category"],
  { bg: string; text: string; dot: string }
> = {
  grief: {
    bg: "oklch(93% 0.015 200 / 0.6)",
    text: "oklch(42% 0.08 200)",
    dot: "oklch(55% 0.1 200)",
  },
  anxiety: {
    bg: "oklch(72% 0.09 38 / 0.15)",
    text: "oklch(42% 0.10 38)",
    dot: "oklch(55% 0.12 38)",
  },
  connection: {
    bg: "oklch(82% 0.05 155 / 0.4)",
    text: "oklch(40% 0.08 155)",
    dot: "oklch(55% 0.08 155)",
  },
  identity: {
    bg: "oklch(88% 0.04 75 / 0.8)",
    text: "oklch(38% 0.06 75)",
    dot: "oklch(55% 0.08 75)",
  },
  creative: {
    bg: "oklch(90% 0.05 90 / 0.5)",
    text: "oklch(40% 0.09 90)",
    dot: "oklch(58% 0.11 90)",
  },
  body: {
    bg: "oklch(85% 0.06 45 / 0.4)",
    text: "oklch(40% 0.08 45)",
    dot: "oklch(55% 0.1 45)",
  },
};

export function SessionCard({ session }: { session: Session }) {
  const color = categoryColors[session.category];
  const isFull = session.spotsLeft === 0;
  const isAlmostFull = session.spotsLeft <= 3 && session.spotsLeft > 0;

  return (
    <article
      className="group flex flex-col rounded-(--radius-card) overflow-hidden transition-all duration-400 hover:shadow-(--shadow-warm) hover:-translate-y-1"
      style={{
        background: "var(--color-warm-white)",
        border: "1px solid var(--color-sand)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: `oklch(from ${color.dot} l c h)` }}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full capitalize"
            style={{
              background: color.bg,
              color: color.text,
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color.dot }}
            />
            {session.category}
          </span>

          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background:
                session.location === "virtual"
                  ? "oklch(82% 0.05 155 / 0.3)"
                  : "oklch(88% 0.04 75 / 0.6)",
              color:
                session.location === "virtual"
                  ? "oklch(40% 0.08 155)"
                  : "oklch(38% 0.06 75)",
              fontFamily: "var(--font-body)",
            }}
          >
            {session.location}
          </span>
        </div>

        {/* Title & Host */}
        <h3
          className="text-xl mb-1 group-hover:text-clay transition-colors duration-300"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-charcoal)",
          }}
        >
          {session.title}
        </h3>
        <p
          className="text-sm mb-4"
          style={{
            color: "var(--color-charcoal-soft)",
            fontFamily: "var(--font-body)",
          }}
        >
          Hosted by {session.host}
        </p>

        <p
          className="text-sm leading-relaxed mb-6 flex-1"
          style={{
            color: "oklch(38% 0.02 60 / 0.75)",
            fontFamily: "var(--font-body)",
          }}
        >
          {session.tagline}
        </p>

        {/* Meta info */}
        <div
          className="flex flex-wrap gap-3 mb-5 pt-4"
          style={{ borderTop: "1px solid var(--color-sand)" }}
        >
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
              className="flex items-center gap-1.5 text-xs"
              style={{
                color: "var(--color-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Icon size={12} style={{ color: "var(--color-clay-light)" }} />
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
                  className="w-5 h-5 rounded-full border-2"
                  style={{
                    background: "var(--color-clay-light)",
                    borderColor: "var(--color-warm-white)",
                  }}
                />
              ))}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                isFull
                  ? "text-[oklch(55%_0.15_15)]"
                  : isAlmostFull
                    ? "text-[oklch(55%_0.12_55)]"
                    : "text-[oklch(40%_0.08_155)]",
              )}
              style={{ fontFamily: "var(--font-body)" }}
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
