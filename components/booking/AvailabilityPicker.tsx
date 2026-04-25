"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type BookingSlot = {
  start: string;
  end: string;
  label: string;
};

type AvailabilityResponse = {
  date: string;
  timeZone: string;
  durationMinutes: number;
  slots: BookingSlot[];
  error?: string;
};

type AvailabilityPickerProps = {
  sessionId: string;
  productName: string;
  customerEmail?: string | null;
};

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getInitialDate() {
  const tomorrow = addDays(new Date(), 1);

  return toDateInputValue(tomorrow);
}

function getMonthDates(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());

  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

export function AvailabilityPicker({
  sessionId,
  productName,
  customerEmail,
}: AvailabilityPickerProps) {
  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedEventLink, setConfirmedEventLink] = useState<string | null>(
    null,
  );
  const [confirmationEmail, setConfirmationEmail] = useState<{
    sent: boolean;
    skippedReason?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const monthDates = useMemo(() => getMonthDates(visibleMonth), [visibleMonth]);
  const selectedDateObject = useMemo(
    () => new Date(`${selectedDate}T12:00:00`),
    [selectedDate],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      setIsLoading(true);
      setError(null);
      setSelectedSlot(null);
      setAvailability(null);

      try {
        const response = await fetch(
          `/api/booking/availability?session_id=${encodeURIComponent(
            sessionId,
          )}&date=${encodeURIComponent(selectedDate)}`,
        );
        const payload = (await response.json()) as AvailabilityResponse;

        if (!response.ok) {
          throw new Error(payload.error || "Unable to load availability.");
        }

        if (!cancelled) {
          setAvailability(payload);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load availability.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, sessionId]);

  async function confirmBooking() {
    if (!selectedSlot) {
      return;
    }

    setIsConfirming(true);
    setError(null);

    try {
      const response = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          date: selectedDate,
          start: selectedSlot.start,
          end: selectedSlot.end,
          disclaimerAccepted: true,
        }),
      });
      const payload = (await response.json()) as {
        event?: {
          htmlLink?: string;
        };
        email?: {
          sent: boolean;
          skippedReason?: string;
        };
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to confirm booking.");
      }

      setConfirmedEventLink(payload.event?.htmlLink || null);
      setConfirmationEmail(payload.email || null);
      setIsConfirmed(true);
      setShowDisclaimer(false);
    } catch (confirmError) {
      setError(
        confirmError instanceof Error
          ? confirmError.message
          : "Unable to confirm booking.",
      );
    } finally {
      setIsConfirming(false);
    }
  }

  if (isConfirmed) {
    return (
      <div
        className="rounded-(--radius-card) p-8 shadow-(--shadow-warm)"
        style={{
          background: "var(--color-caya-warm-white)",
          border: "1px solid var(--color-caya-sand)",
        }}
      >
        <p
          className="mb-4 text-xs uppercase tracking-[0.2em]"
          style={{
            color: "var(--color-caya-clay)",
            fontFamily: "var(--font-body)",
          }}
        >
          Booking confirmed
        </p>
        <h2
          className="text-4xl"
          style={{
            color: "var(--color-caya-charcoal)",
            fontFamily: "var(--font-display)",
          }}
        >
          You&apos;re on the calendar.
        </h2>
        <p
          className="mt-4 max-w-2xl leading-relaxed"
          style={{
            color: "var(--color-caya-charcoal-soft)",
            fontFamily: "var(--font-body)",
          }}
        >
          Your session has been added to the Come As You Are calendar
          {confirmationEmail?.sent && customerEmail
            ? ` and a confirmation email was sent to ${customerEmail}`
            : ""}
          .
        </p>
        {confirmationEmail && !confirmationEmail.sent ? (
          <p
            className="mt-4 max-w-2xl leading-relaxed"
            style={{
              color: "var(--color-caya-clay-dark)",
              fontFamily: "var(--font-body)",
            }}
          >
            The calendar event was created, but the confirmation email was not
            sent: {confirmationEmail.skippedReason}
          </p>
        ) : null}
        {confirmedEventLink ? (
          <div className="mt-7">
            <Button asChild>
              <a href={confirmedEventLink} target="_blank" rel="noreferrer">
                View calendar event
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="rounded-(--radius-card) p-6 shadow-(--shadow-warm) md:p-8"
      style={{
        background: "var(--color-caya-warm-white)",
        border: "1px solid var(--color-caya-sand)",
      }}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p
            className="mb-3 text-xs uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-caya-clay)",
              fontFamily: "var(--font-body)",
            }}
          >
            Schedule
          </p>
          <h2
            className="text-4xl"
            style={{
              color: "var(--color-caya-charcoal)",
              fontFamily: "var(--font-display)",
            }}
          >
            {productName}
          </h2>
          <p
            className="mt-3 max-w-xl leading-relaxed"
            style={{
              color: "var(--color-caya-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Choose a date, then select one of the available times pulled from
            the Come As You Are calendar.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-between gap-4 rounded-full border px-5 py-3 text-left transition hover:bg-[oklch(88%_0.04_75/0.45)] md:w-64"
            style={{
              borderColor: "var(--color-caya-sand-deep)",
              color: "var(--color-caya-charcoal)",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setIsCalendarOpen((open) => !open)}
          >
            <span>{dayFormatter.format(selectedDateObject)}</span>
            <ChevronDown size={18} />
          </button>

          {isCalendarOpen ? (
            <div
              className="absolute right-0 z-20 mt-3 w-80 rounded-(--radius-card) p-4 shadow-(--shadow-card)"
              style={{
                background: "var(--color-caya-warm-white)",
                border: "1px solid var(--color-caya-sand)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  className="rounded-full p-2 hover:bg-[oklch(88%_0.04_75/0.5)]"
                  onClick={() =>
                    setVisibleMonth(
                      new Date(
                        visibleMonth.getFullYear(),
                        visibleMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <p
                  className="font-medium"
                  style={{
                    color: "var(--color-caya-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {monthFormatter.format(visibleMonth)}
                </p>
                <button
                  type="button"
                  className="rounded-full p-2 hover:bg-[oklch(88%_0.04_75/0.5)]"
                  onClick={() =>
                    setVisibleMonth(
                      new Date(
                        visibleMonth.getFullYear(),
                        visibleMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="py-2"
                    style={{ color: "var(--color-caya-charcoal-soft)" }}
                  >
                    {day}
                  </div>
                ))}
                {monthDates.map((date) => {
                  const dateValue = toDateInputValue(date);
                  const isCurrentMonth =
                    date.getMonth() === visibleMonth.getMonth();
                  const isSelected = dateValue === selectedDate;
                  const isPast = date < new Date(new Date().toDateString());

                  return (
                    <button
                      key={dateValue}
                      type="button"
                      disabled={!isCurrentMonth || isPast}
                      className="aspect-square rounded-full text-sm transition disabled:cursor-not-allowed disabled:opacity-25"
                      style={{
                        background: isSelected
                          ? "var(--color-caya-clay)"
                          : "transparent",
                        color: isSelected
                          ? "var(--color-caya-warm-white)"
                          : "var(--color-caya-charcoal)",
                      }}
                      onClick={() => {
                        setSelectedDate(dateValue);
                        setIsCalendarOpen(false);
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <p
          className="mb-4 text-sm font-medium"
          style={{
            color: "var(--color-caya-charcoal)",
            fontFamily: "var(--font-body)",
          }}
        >
          Available times
        </p>
        {isLoading ? (
          <p style={{ color: "var(--color-caya-charcoal-soft)" }}>
            Loading available times...
          </p>
        ) : availability?.slots.length ? (
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4">
            {availability.slots.map((slot) => {
              const selected = selectedSlot?.start === slot.start;

              return (
                <button
                  key={slot.start}
                  type="button"
                  className="rounded-full border px-4 py-3 text-sm font-medium transition hover:scale-[1.02]"
                  style={{
                    background: selected
                      ? "var(--color-caya-clay)"
                      : "transparent",
                    borderColor: selected
                      ? "var(--color-caya-clay)"
                      : "var(--color-caya-sand-deep)",
                    color: selected
                      ? "var(--color-caya-warm-white)"
                      : "var(--color-caya-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p style={{ color: "var(--color-caya-charcoal-soft)" }}>
            No times are open for this date. Try another day.
          </p>
        )}
      </div>

      {error ? (
        <p
          className="mt-5 leading-relaxed"
          style={{ color: "var(--color-caya-clay-dark)" }}
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          size="lg"
          disabled={!selectedSlot}
          onClick={() => setShowDisclaimer(true)}
        >
          Submit selected time
        </Button>
      </div>

      {showDisclaimer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(22%_0.02_60/0.5)] p-5">
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-(--radius-card) p-7 shadow-(--shadow-warm)"
            style={{
              background: "var(--color-caya-warm-white)",
              border: "1px solid var(--color-caya-sand)",
            }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.2em]"
              style={{
                color: "var(--color-caya-clay)",
                fontFamily: "var(--font-body)",
              }}
            >
              Before we confirm
            </p>
            <h2
              className="text-4xl"
              style={{
                color: "var(--color-caya-charcoal)",
                fontFamily: "var(--font-display)",
              }}
            >
              Support disclaimer
            </h2>
            <div
              className="mt-5 space-y-4 leading-relaxed"
              style={{
                color: "var(--color-caya-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              <p>
                Come As You Are offers peer support and wellness-centered
                conversation. This is not therapy, medical care, diagnosis, or
                crisis intervention.
              </p>
              <p>
                If you are in immediate danger or experiencing a crisis, call
                local emergency services or 988 in the United States.
              </p>
              <p>
                By confirming, you acknowledge this disclaimer and agree to use
                the session as a supportive, non-clinical space.
              </p>
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                disabled={isConfirming}
                onClick={() => setShowDisclaimer(false)}
              >
                Go back
              </Button>
              <Button
                type="button"
                disabled={isConfirming}
                onClick={confirmBooking}
              >
                {isConfirming ? "Confirming..." : "Acknowledge and confirm"}
              </Button>
            </div>
            {error ? (
              <p
                className="mt-5 leading-relaxed"
                style={{
                  color: "var(--color-caya-clay-dark)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {error}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
