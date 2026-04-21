import { getBookingProduct } from "@/lib/booking-products";
import { getBookingCheckoutSession } from "@/lib/stripe";

export async function getPaidBookingSession(sessionId: string) {
  const session = await getBookingCheckoutSession(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Payment has not been confirmed for this session.");
  }

  const productId = session.metadata?.booking_product_id;
  const product = productId ? getBookingProduct(productId) : undefined;

  if (!product) {
    throw new Error("Could not determine the booking product for this payment.");
  }

  return {
    session,
    product,
    customerEmail: session.customer_details?.email || null,
    customerName: session.customer_details?.name || null,
  };
}
