"use client";

import { useEffect, useRef, useState } from "react";
import { getPaddleInstance } from "@/lib/paddle/client";

interface CheckoutPanelProps {
  priceId: string;
  userId: string;
  userEmail: string;
}

export function CheckoutPanel({
  priceId,
  userId,
  userEmail,
}: CheckoutPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function openCheckout() {
      try {
        const paddleInstance = await getPaddleInstance();

        if (cancelled || !paddleInstance || !containerRef.current) return;

        paddleInstance.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customer: { email: userEmail },
          customData: { userId },
          settings: {
            displayMode: "inline",
            frameTarget: containerRef.current.id,
            frameInitialHeight: 450,
            frameStyle: "width: 100%; min-height: 450px; border: none;",
          },
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Paddle checkout error:", err);
        setError("Failed to load checkout. Please try again.");
        setIsLoading(false);
      }
    }

    openCheckout();

    return () => {
      cancelled = true;
    };
  }, [priceId, userId, userEmail]);

  return (
    <div className="rounded-md border p-4">
      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading checkout...</p>
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div id="paddle-checkout-container" ref={containerRef} />
    </div>
  );
}
