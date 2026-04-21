import { NextResponse } from "next/server";
import { getGoogleCalendarHealth } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const health = await getGoogleCalendarHealth();

    return NextResponse.json({
      ok: true,
      ...health,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Google Calendar health check failed.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
