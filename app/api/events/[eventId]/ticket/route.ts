import { NextResponse } from "next/server";
import { getEventForSite } from "@/lib/eventbrite";

interface RouteContext {
  params: Promise<{
    eventId: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventForSite(eventId);

  if (!event?.url) {
    return NextResponse.json(
      {
        error: "Ticket URL not found for this event.",
      },
      { status: 404 },
    );
  }

  return NextResponse.redirect(event.url);
}
