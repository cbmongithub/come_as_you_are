export const bookingProducts = [
  {
    id: "deep-dive-60",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_60_MIN_DEEP_DIVE_SESSION",
    name: "60-Minute Deep Dive Support Session",
    priceLabel: "$100",
    durationLabel: "60 minutes",
    durationMinutes: 60,
    description:
      "A focused one-on-one support session for deeper processing, grounding, and next-step clarity.",
  },
  {
    id: "weekly-support-monthly",
    checkoutMode: "subscription",
    envKey: "STRIPE_PRICE_ONGOING_WEEKLY_SUPPORT_MONTHLY",
    name: "Ongoing Weekly Support (Monthly Package)",
    priceLabel: "$444",
    durationLabel: "Monthly package",
    durationMinutes: 60,
    description:
      "Weekly continuity for people who want steadier support and recurring space to work through what is happening.",
  },
  {
    id: "clarity-30",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_30_MIN_SUPPORT_CLARITY_SESSION",
    name: "30-min Support & Clarity Session",
    priceLabel: "$50",
    durationLabel: "30 minutes",
    durationMinutes: 30,
    description:
      "A shorter check-in for immediate support, reflection, and help sorting through a specific moment or decision.",
  },
  {
    id: "same-day-emergency",
    checkoutMode: "payment",
    envKey: "STRIPE_PRICE_EMERGENCY_SAME_DAY_SUPPORT_SESSION",
    name: "Emergency / Same-Day Support Session",
    priceLabel: "$100",
    durationLabel: "Same-day support",
    durationMinutes: 60,
    description:
      "Priority support for urgent situations when you need a responsive, human place to land.",
  },
] as const;

export type BookingProductId = (typeof bookingProducts)[number]["id"];

export function getBookingProduct(productId: string) {
  return bookingProducts.find((product) => product.id === productId);
}

export function getBookingProductsWithConfig() {
  return bookingProducts.map((product) => ({
    ...product,
    hasPriceId: Boolean(process.env[product.envKey]),
  }));
}
