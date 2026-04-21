import { createHmac, timingSafeEqual } from "node:crypto";

interface StripeSignatureParts {
  timestamp?: string;
  signatures: string[];
}

export interface StripeWebhookEvent<T = unknown> {
  id: string;
  type: string;
  data: {
    object: T;
  };
}

function parseStripeSignatureHeader(header: string): StripeSignatureParts {
  return header.split(",").reduce<StripeSignatureParts>(
    (parts, segment) => {
      const [key, value] = segment.split("=", 2);

      if (key === "t") {
        parts.timestamp = value;
      }

      if (key === "v1" && value) {
        parts.signatures.push(value);
      }

      return parts;
    },
    { signatures: [] },
  );
}

function verifySignature(payload: string, signatureHeader: string, secret: string) {
  const { timestamp, signatures } = parseStripeSignatureHeader(signatureHeader);

  if (!timestamp || signatures.length === 0) {
    throw new Error("Missing Stripe webhook signature.");
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const hasMatch = signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, "hex");

    return (
      signatureBuffer.length === expectedBuffer.length &&
      timingSafeEqual(signatureBuffer, expectedBuffer)
    );
  });

  if (!hasMatch) {
    throw new Error("Invalid Stripe webhook signature.");
  }
}

export function constructStripeWebhookEvent(
  payload: string,
  signatureHeader: string | null,
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET.");
  }

  if (!signatureHeader) {
    throw new Error("Missing Stripe-Signature header.");
  }

  verifySignature(payload, signatureHeader, webhookSecret);

  return JSON.parse(payload) as StripeWebhookEvent;
}
