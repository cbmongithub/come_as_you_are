import type { Metadata } from "next";
import { CheckoutButton } from "@/components/booking/CheckoutButton";
import { getStripeConfigStatus } from "@/lib/stripe";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Book — Come As You Are",
  description: "Book a session with Come As You Are.",
};

export default function BookPage() {
  const stripeConfig = getStripeConfigStatus();
  const canStartAnyCheckout =
    stripeConfig.hasSecretKey && stripeConfig.hasAnyBookingPriceId;

  return (
    <section
      className="pt-36 pb-24"
      style={{ background: "var(--color-caya-canvas)" }}
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-xs uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-caya-clay)",
              fontFamily: "var(--font-body)",
            }}
          >
            Booking
          </p>
          <h1
            className="mb-5 text-[clamp(3rem,6vw,5.5rem)] leading-tight"
            style={{
              color: "var(--color-caya-charcoal)",
              fontFamily: "var(--font-display)",
            }}
          >
            Book a one-on-one session.
          </h1>
          <p
            className="mx-auto max-w-xl text-lg leading-relaxed"
            style={{
              color: "var(--color-caya-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Secure checkout comes first. After payment, you&apos;ll choose an
            available time from our calendar and review the session disclaimer
            before your booking is finalized.
          </p>
        </div>

        <div
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-(--radius-card) shadow-(--shadow-warm)"
          style={{
            background: "var(--color-caya-warm-white)",
            border: "1px solid var(--color-caya-sand)",
          }}
        >
          <div className="grid gap-0 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Payment",
                body: "Complete Stripe checkout for the session.",
              },
              {
                step: "02",
                title: "Calendar",
                body: "Pick from available Google Calendar time slots.",
              },
              {
                step: "03",
                title: "Disclaimer",
                body: "Acknowledge the session disclaimer after selecting a time.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 md:border-r md:last:border-r-0"
                style={{ borderColor: "var(--color-caya-sand)" }}
              >
                <p
                  className="mb-5 text-xs uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--color-caya-clay)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.step}
                </p>
                <h2
                  className="mb-3 text-3xl"
                  style={{
                    color: "var(--color-caya-charcoal)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--color-caya-charcoal-soft)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div
            className="flex flex-col items-start justify-between gap-5 border-t p-8 md:flex-row md:items-center"
            style={{ borderColor: "var(--color-caya-sand)" }}
          >
            <p
              className="max-w-2xl leading-relaxed"
              style={{
                color: "var(--color-caya-charcoal-soft)",
                fontFamily: "var(--font-body)",
              }}
            >
              {canStartAnyCheckout
                ? "Choose the kind of support you need. Stripe checkout opens first; after payment, you will return to choose a session time."
                : "Stripe is partially configured. Add the product Price IDs to activate checkout."}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
          {stripeConfig.products.map((product) => (
            <article
              key={product.id}
              className="flex min-h-full flex-col justify-between rounded-(--radius-card) p-7 shadow-(--shadow-card)"
              style={{
                background: "var(--color-caya-warm-white)",
                border: "1px solid var(--color-caya-sand)",
              }}
            >
              <div>
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--color-caya-clay)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {product.durationLabel}
                    </p>
                    <h2
                      className="mt-2 text-3xl"
                      style={{
                        color: "var(--color-caya-charcoal)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {product.name}
                    </h2>
                  </div>
                  <p
                    className="text-3xl"
                    style={{
                      color: "var(--color-caya-charcoal)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {product.priceLabel}
                  </p>
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    color: "var(--color-caya-charcoal-soft)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <CheckoutButton
                  productId={product.id}
                  disabled={!stripeConfig.hasSecretKey || !product.hasPriceId}
                />
                {!product.hasPriceId ? (
                  <p
                    className="mt-3 text-xs leading-relaxed"
                    style={{
                      color: "var(--color-caya-charcoal-soft)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Add <code>{product.envKey}</code> to enable this checkout.
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
