"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | undefined;

export async function getPaddleInstance() {
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    environment:
      process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
        ? "production"
        : "sandbox",
  });

  return paddleInstance;
}
