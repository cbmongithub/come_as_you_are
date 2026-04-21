import { NextResponse } from "next/server";
import { getPaidBookingSession } from "@/lib/booking-session";
import { getBookingAvailability } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");
    const date = url.searchParams.get("date");

    if (!sessionId || !date) {
      return NextResponse.json(
        {
          error: "Missing session_id or date.",
        },
        { status: 400 },
      );
    }

    const { product } = await getPaidBookingSession(sessionId);
    const availability = await getBookingAvailability({
      date,
      durationMinutes: product.durationMinutes,
    });

    return NextResponse.json({
      productId: product.id,
      productName: product.name,
      ...availability,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load availability.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
