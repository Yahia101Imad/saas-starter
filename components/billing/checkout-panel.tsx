"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { createPaddleInstance } from "@/lib/paddle/client";

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
        const paddleInstance = await createPaddleInstance();

        if (cancelled || !paddleInstance) return;

        paddleInstance.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customer: { email: userEmail },
          customData: { userId },
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

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-dashed py-12 text-center">
        <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive h-5 w-5" />
        </div>
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4">
      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading checkout...</p>
      )}
      <div className="paddle-checkout-container" ref={containerRef} />
    </div>
  );
}
