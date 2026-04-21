import type { Metadata } from "next";
import Link from "next/link";
import { getBookingCheckoutSession } from "@/lib/stripe";
import { Button } from "@/components/ui/Button";
import { AvailabilityPicker } from "@/components/booking/AvailabilityPicker";
import { getBookingProduct } from "@/lib/booking-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Schedule Your Session — Come As You Are",
  description: "Choose a session time after payment.",
};

interface BookSuccessPageProps {
  searchParams: Promise<{
    session_id?: string | string[];
  }>;
}

export default async function BookSuccessPage({
  searchParams,
}: BookSuccessPageProps) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;
  let paymentStatus = "missing";
  let customerEmail: string | null | undefined;
  let productName: string | null = null;
  let error: string | null = null;

  if (sessionId) {
    try {
      const session = await getBookingCheckoutSession(sessionId);
      paymentStatus = session.payment_status || "unknown";
      customerEmail = session.customer_details?.email;
      const product = session.metadata?.booking_product_id
        ? getBookingProduct(session.metadata.booking_product_id)
        : undefined;
      productName =
        product?.name || session.metadata?.booking_product_name || "Session";
    } catch (sessionError) {
      error =
        sessionError instanceof Error
          ? sessionError.message
          : "Unable to verify payment.";
    }
  }

  const isPaid = paymentStatus === "paid";

  return (
    <section
      className="pt-36 pb-24"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-4 text-xs uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-clay)",
              fontFamily: "var(--font-body)",
            }}
          >
            {isPaid ? "Payment complete" : "Payment verification"}
          </p>
          <h1
            className="mb-5 text-[clamp(3rem,6vw,5.5rem)] leading-tight"
            style={{
              color: "var(--color-charcoal)",
              fontFamily: "var(--font-display)",
            }}
          >
            {isPaid ? "Choose your session time." : "We need to verify payment."}
          </h1>
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{
              color: "var(--color-charcoal-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            {isPaid
              ? "Your payment is confirmed. Choose an available time from the calendar, then acknowledge the session disclaimer to finalize your booking."
              : "We could not confirm a paid Checkout Session from this link. Return to booking and try checkout again."}
          </p>

          <div className="mt-10">
            {isPaid && sessionId ? (
              <AvailabilityPicker
                sessionId={sessionId}
                productName={productName || "Session"}
                customerEmail={customerEmail}
              />
            ) : (
              <div
                className="rounded-(--radius-card) p-8 shadow-(--shadow-warm)"
                style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-sand)",
                }}
              >
                {error ? (
                  <p
                    className="mb-5 leading-relaxed"
                    style={{
                      color: "var(--color-clay-dark)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {error}
                  </p>
                ) : null}
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--color-clay)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Payment status
                    </dt>
                    <dd
                      className="mt-2 text-2xl"
                      style={{
                        color: "var(--color-charcoal)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {paymentStatus}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--color-clay)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Email
                    </dt>
                    <dd
                      className="mt-2 break-words text-2xl"
                      style={{
                        color: "var(--color-charcoal)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {customerEmail || "Not available"}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Button asChild>
                    <Link href="/book">Return to checkout</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
