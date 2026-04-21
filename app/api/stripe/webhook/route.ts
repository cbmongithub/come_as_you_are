import { NextResponse } from "next/server";
import { constructStripeWebhookEvent } from "@/lib/stripe-webhook";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let event;

  try {
    const payload = await request.text();
    event = constructStripeWebhookEvent(
      payload,
      request.headers.get("stripe-signature"),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe webhook.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      // Payment fulfillment will be made durable when booking storage is added.
      break;
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed":
      break;
    default:
      break;
  }

  return NextResponse.json({
    received: true,
  });
}
