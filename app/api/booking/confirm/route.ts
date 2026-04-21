import { NextResponse } from "next/server";
import { getPaidBookingSession } from "@/lib/booking-session";
import {
  createBookingCalendarEvent,
  getBookingAvailability,
} from "@/lib/google-calendar";
import { sendBookingConfirmationEmail } from "@/lib/booking-email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      sessionId?: string;
      date?: string;
      start?: string;
      end?: string;
      disclaimerAccepted?: boolean;
    };

    if (!body.sessionId || !body.start || !body.end) {
      return NextResponse.json(
        {
          error: "Missing booking details.",
        },
        { status: 400 },
      );
    }

    if (!body.disclaimerAccepted) {
      return NextResponse.json(
        {
          error: "Disclaimer acknowledgement is required.",
        },
        { status: 400 },
      );
    }

    const { session, product, customerEmail, customerName } =
      await getPaidBookingSession(body.sessionId);
    const start = new Date(body.start);
    const end = new Date(body.end);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json(
        {
          error: "Invalid booking time.",
        },
        { status: 400 },
      );
    }

    const availability = await getBookingAvailability({
      date: body.date || body.start.slice(0, 10),
      durationMinutes: product.durationMinutes,
    });
    const selectedSlot = availability.slots.find(
      (slot) => slot.start === body.start && slot.end === body.end,
    );

    if (!selectedSlot) {
      return NextResponse.json(
        {
          error: "That time is no longer available.",
        },
        { status: 409 },
      );
    }

    const event = await createBookingCalendarEvent({
      start: body.start,
      end: body.end,
      summary: product.name,
      description: [
        `Booked through Come As You Are.`,
        `Product: ${product.name}`,
        `Stripe Checkout Session: ${session.id}`,
        customerName ? `Customer name: ${customerName}` : null,
        customerEmail ? `Customer email: ${customerEmail}` : null,
        `Disclaimer acknowledged: yes`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    let email:
      | Awaited<ReturnType<typeof sendBookingConfirmationEmail>>
      | {
          sent: false;
          skippedReason: string;
        };

    try {
      email = await sendBookingConfirmationEmail({
        to: customerEmail,
        customerName,
        productName: product.name,
        start: body.start,
        end: body.end,
        timeZone: availability.timeZone,
        calendarEventLink: event.htmlLink,
      });
    } catch (emailError) {
      email = {
        sent: false,
        skippedReason:
          emailError instanceof Error
            ? emailError.message
            : "Confirmation email failed.",
      };
    }

    return NextResponse.json({
      ok: true,
      event,
      slot: selectedSlot,
      email,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to confirm booking.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
