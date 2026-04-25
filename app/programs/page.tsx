"use client";

import { useState } from "react";
import { SessionCard, type Session } from "@/components/ui/SessionCard";
import { Search } from "lucide-react";

const sessions: Session[] = [
  {
    id: "grief-circle-01",
    title: "Grief & Loss Circle",
    host: "Maya Osei",
    category: "grief",
    date: "Tue, Apr 8",
    time: "6:30 PM",
    duration: "90 min",
    capacity: 10,
    spotsLeft: 4,
    location: "in-person",
    tagline:
      "A gentle, facilitated space for anyone navigating loss — recent or long-carried. No timeline for grief.",
  },
  {
    id: "anxiety-tools-01",
    title: "Living With Anxiety",
    host: "Darius Wade",
    category: "anxiety",
    date: "Wed, Apr 9",
    time: "7:00 PM",
    duration: "60 min",
    capacity: 12,
    spotsLeft: 8,
    location: "virtual",
    tagline:
      "Peer strategies and shared experience for managing day-to-day anxiety. No clinical framework — just what actually helps.",
  },
  {
    id: "identity-circle-01",
    title: "Identity & Belonging",
    host: "Priya Nair",
    category: "identity",
    date: "Thu, Apr 10",
    time: "6:00 PM",
    duration: "90 min",
    capacity: 8,
    spotsLeft: 2,
    location: "in-person",
    tagline:
      "Who are you when nobody's watching? A circle for exploring identity, culture, and the feeling of not fitting neatly.",
  },
  {
    id: "creative-writing-01",
    title: "Write It Out",
    host: "Sam Torres",
    category: "creative",
    date: "Sat, Apr 12",
    time: "11:00 AM",
    duration: "2 hrs",
    capacity: 10,
    spotsLeft: 6,
    location: "in-person",
    tagline:
      "Expressive writing for emotional processing. No writing experience needed. Just a pen and whatever's on your mind.",
  },
  {
    id: "connection-circle-01",
    title: "New In Town",
    host: "Leila Amara",
    category: "connection",
    date: "Sun, Apr 13",
    time: "3:00 PM",
    duration: "75 min",
    capacity: 14,
    spotsLeft: 9,
    location: "hybrid",
    tagline:
      "For people who've recently moved or feel like outsiders in their city. Because loneliness after relocation is deeply underrated.",
  },
  {
    id: "body-image-01",
    title: "Body Stories",
    host: "Talia Green",
    category: "body",
    date: "Mon, Apr 14",
    time: "6:00 PM",
    duration: "90 min",
    capacity: 8,
    spotsLeft: 0,
    location: "in-person",
    tagline:
      "An honest space to talk about body image, chronic illness, and the relationship we have with our physical selves.",
  },
  {
    id: "anxiety-tools-02",
    title: "Burnout & Recovery",
    host: "Darius Wade",
    category: "anxiety",
    date: "Wed, Apr 16",
    time: "7:00 PM",
    duration: "60 min",
    capacity: 12,
    spotsLeft: 5,
    location: "virtual",
    tagline:
      "For those running on empty. Sharing tools, naming the exhaustion, and building back toward something sustainable.",
  },
  {
    id: "creative-movement-01",
    title: "Movement as Medicine",
    host: "Ashley",
    category: "creative",
    date: "Fri, Apr 18",
    time: "10:00 AM",
    duration: "60 min",
    capacity: 10,
    spotsLeft: 7,
    location: "in-person",
    tagline:
      "Gentle, low-pressure movement for emotional release. Think slow dance, shaking it out, and breath — not a workout.",
  },
];

const categories = [
  "all",
  "grief",
  "anxiety",
  "connection",
  "identity",
  "creative",
  "body",
] as const;
const locations = ["all", "in-person", "virtual", "hybrid"] as const;

type Category = (typeof categories)[number];
type LocationFilter = (typeof locations)[number];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeLocation, setActiveLocation] = useState<LocationFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sessions.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchLoc = activeLocation === "all" || s.location === activeLocation;
    const matchSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchLoc && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-caya-gradient-programs-hero pt-36 pb-16">
        <div className="container-wide">
          <p className="mb-4 text-xs uppercase tracking-caya-eyebrow font-body text-caya-clay">
            Programs & Sessions
          </p>
          <h1 className="mb-4 text-caya-display-md leading-tight font-display text-caya-charcoal">
            Find your circle.
          </h1>
          <p className="max-w-xl text-base font-body text-caya-charcoal-soft">
            Every session is peer-facilitated, intimate, and free of charge.
            Some sessions offer sliding-scale suggested contributions to keep
            the space alive.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-18 z-30 border-b border-caya-sand bg-caya-canvas-95 py-4 backdrop-blur-caya">
        <div className="container-wide flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background:
                    activeCategory === cat
                      ? "var(--color-caya-clay)"
                      : "var(--color-caya-sand)",
                  color:
                    activeCategory === cat
                      ? "var(--color-caya-warm-white)"
                      : "var(--color-caya-charcoal-soft)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex gap-3 items-center">
            {/* Location filter */}
            <select
              value={activeLocation}
              onChange={(e) =>
                setActiveLocation(e.target.value as LocationFilter)
              }
              className="text-xs px-3 py-2 rounded-full border appearance-none cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                borderColor: "var(--color-caya-sand-deep)",
                color: "var(--color-caya-charcoal-soft)",
                background: "var(--color-caya-warm-white)",
              }}
            >
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l === "all"
                    ? "All locations"
                    : l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-caya-charcoal-soft"
              />
              <input
                type="text"
                placeholder="Search sessions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 ring-1 ring-clay-light rounded-full border text-xs outline-none focus:ring-1"
                style={{
                  fontFamily: "var(--font-body)",
                  borderColor: "var(--color-caya-sand-deep)",
                  color: "var(--color-caya-charcoal)",
                  background: "var(--color-caya-warm-white)",
                  width: "180px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section
        className="section-pad"
        style={{ background: "var(--color-caya-canvas)" }}
      >
        <div className="container-wide">
          {filtered.length > 0 ? (
            <>
              <p
                className="text-xs mb-6"
                style={{
                  color: "var(--color-caya-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {filtered.length} session{filtered.length !== 1 ? "s" : ""}{" "}
                available
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p
                className="text-4xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-caya-charcoal)",
                }}
              >
                No sessions found.
              </p>
              <p
                className="text-sm"
                style={{
                  color: "var(--color-caya-charcoal-soft)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Try adjusting your filters or{" "}
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveLocation("all");
                    setSearchQuery("");
                  }}
                  className="underline"
                  style={{ color: "var(--color-caya-clay)" }}
                >
                  clear all
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Request a session CTA */}
      <section className="bg-caya-sand py-16">
        <div className="container-wide flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3
              className="text-2xl mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-caya-charcoal)",
              }}
            >
              Don&apos;t see what you need?
            </h3>
            <p
              className="text-sm"
              style={{
                color: "var(--color-caya-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              Request a topic or ask about hosting a circle yourself.
            </p>
          </div>
          <a
            href="mailto:ashley@supportcomeasyou.org"
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-(--shadow-warm) hover:scale-[1.02]"
            style={{
              background: "var(--color-caya-clay)",
              color: "var(--color-caya-warm-white)",
              fontFamily: "var(--font-body)",
            }}
          >
            Request a Session
          </a>
        </div>
      </section>
    </>
  );
}
