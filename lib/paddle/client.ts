"use client";

import { initializePaddle } from "@paddle/paddle-js";

export async function createPaddleInstance() {
  const paddleInstance = await initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    environment:
      process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
        ? "production"
        : "sandbox",
    checkout: {
      settings: {
        displayMode: "inline",
        theme: "light",
        frameTarget: "paddle-checkout-container",
        frameInitialHeight: 450,
        frameStyle:
          "width: 100%; min-width: 312px; background-color: transparent; border: none;",
      },
    },
  });

  return paddleInstance;
}
