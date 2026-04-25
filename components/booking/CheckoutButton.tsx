"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type CheckoutButtonProps = {
  disabled?: boolean;
  productId: string;
};

export function CheckoutButton({
  disabled = false,
  productId,
}: CheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function startCheckout() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start checkout.");
      }

      window.location.href = payload.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        type="button"
        size="lg"
        disabled={disabled || isLoading}
        onClick={startCheckout}
      >
        {isLoading ? "Opening checkout..." : "Pay and book"}
      </Button>
      {error ? (
        <p
          className="max-w-xs text-sm leading-relaxed"
          style={{
            color: "var(--color-caya-clay-dark)",
            fontFamily: "var(--font-body)",
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
