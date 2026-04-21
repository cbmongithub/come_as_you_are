import {
  getBookingProduct,
  getBookingProductsWithConfig,
} from "@/lib/booking-products";

interface StripeCheckoutSession {
  id: string;
  mode?: string;
  url?: string | null;
  payment_status?: string;
  metadata?: Record<string, string> | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
}

const stripeApiBaseUrl = "https://api.stripe.com/v1";

function getStripeSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  return secretKey;
}

export function getStripeConfigStatus() {
  const products = getBookingProductsWithConfig();

  return {
    hasSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    hasPublishableKey: Boolean(process.env.STRIPE_PUBLISHABLE_KEY),
    hasAnyBookingPriceId: products.some((product) => product.hasPriceId),
    products,
    hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}

export async function createBookingCheckoutSession(
  origin: string,
  productId: string,
) {
  const product = getBookingProduct(productId);

  if (!product) {
    throw new Error("Unknown booking product.");
  }

  const priceId = process.env[product.envKey];

  const submitType =
    product.id === "weekly-support-monthly" ? "subscribe" : "book";

  if (!priceId) {
    throw new Error(`Missing ${product.envKey}.`);
  }

  const body = new URLSearchParams({
    mode: product.checkoutMode,
    submit_type: submitType,
    "automatic_tax[enabled]": "true",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book`,
    "metadata[source]": "native_booking",
    "metadata[booking_product_id]": product.id,
    "metadata[booking_product_name]": product.name,
  });

  if (product.checkoutMode === "subscription") {
    body.set("subscription_data[metadata][source]", "native_booking");
    body.set("subscription_data[metadata][booking_product_id]", product.id);
    body.set("subscription_data[metadata][booking_product_name]", product.name);
    body.set("subscription_data[description]", product.name);
  }

  const response = await fetch(`${stripeApiBaseUrl}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStripeSecretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const session = (await response.json()) as StripeCheckoutSession & {
    error?: {
      message?: string;
    };
  };

  if (!response.ok || !session.url) {
    throw new Error(
      session.error?.message || "Stripe failed to create a Checkout Session.",
    );
  }

  return session;
}

export async function getBookingCheckoutSession(sessionId: string) {
  const response = await fetch(
    `${stripeApiBaseUrl}/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${getStripeSecretKey()}`,
      },
      cache: "no-store",
    },
  );
  const session = (await response.json()) as StripeCheckoutSession & {
    error?: {
      message?: string;
    };
  };

  if (!response.ok) {
    throw new Error(
      session.error?.message || "Stripe failed to load the Checkout Session.",
    );
  }

  return session;
}
