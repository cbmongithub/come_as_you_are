import { NextResponse } from "next/server";
import { createBookingCheckoutSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const body = (await request.json().catch(() => ({}))) as {
      productId?: string;
    };
    const session = await createBookingCheckoutSession(
      origin,
      body.productId || "",
    );

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
