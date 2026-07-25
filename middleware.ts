import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { authRateLimit, webhookRateLimit } from "@/lib/rate-limit";

const guestOnlyPaths = ["/sign-in", "/sign-up", "/forgot-password"];

const authApiPaths = [
  "/api/auth/sign-in/email",
  "/api/auth/sign-up/email",
  "/api/auth/forget-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (authApiPaths.some((path) => pathname.startsWith(path))) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const { success } = await authRateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }
  }

  if (pathname === "/api/webhooks/paddle") {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const { success } = await webhookRateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }
  }

  if (guestOnlyPaths.includes(pathname)) {
    const sessionCookie = getSessionCookie(request);
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/api/auth/sign-in/:path*",
    "/api/auth/sign-up/:path*",
    "/api/auth/forget-password/:path*",
    "/api/webhooks/paddle",
  ],
};
