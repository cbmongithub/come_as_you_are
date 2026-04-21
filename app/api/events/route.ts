import { NextResponse } from "next/server";
import { getEventsForSite } from "@/lib/eventbrite";

export const revalidate = 300;

export async function GET() {
  try {
    const result = await getEventsForSite();
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load events";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 502 },
    );
  }
}
