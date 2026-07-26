# Deployment Guide (Vercel)

This guide covers deploying this starter to production on Vercel.

## 1. Push to GitHub

Make sure your repository is up to date and `main` is passing CI (check the **Actions** tab on GitHub).

## 2. Create a production database

Create a **new** Neon database (separate from your development one). Run migrations against it before your first deploy:

\`\`\`bash
DATABASE_URL="<production-connection-string></production>" npx prisma migrate deploy
\`\`\`

## 3. Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: Next.js (auto-detected)

## 4. Set environment variables on Vercel

Under **Project Settings → Environment Variables**, add every variable from `.env.example`, using **production** values:

- `DATABASE_URL` → your production Neon connection string
- `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` → your production domain (e.g. `https://yourapp.com`)
- `NEXT_PUBLIC_PADDLE_ENV` → `production`
- `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` → from your **live** Paddle account (not sandbox)
- All other variables (Cloudinary, Resend, Upstash, Google OAuth) — production values from each service

⚠️ Do **not** reuse sandbox Paddle credentials in production — Paddle requires a separate verified vendor account for live payments.

## 5. Update external service configuration for your production domain

### Google OAuth

Add to **Authorized redirect URIs** in Google Cloud Console:
\`\`\`
https://yourapp.com/api/auth/callback/google
\`\`\`

### Paddle

1. Under **Checkout Settings**, request approval for your production domain and set it as the **Default payment link**.
2. Under **Developer Tools → Notifications**, create a new webhook destination pointing to:
   \`\`\`
   https://yourapp.com/api/webhooks/paddle
   \`\`\`
   Copy the new signing secret into `PADDLE_WEBHOOK_SECRET` on Vercel.

### Cloudinary

No changes needed — the unsigned upload preset works the same in production.

## 6. Deploy

Trigger a deploy (push to `main`, or click **Deploy** on Vercel). Vercel runs `next build` automatically.

## 7. Post-deploy checklist

- [ ] Sign up with a new account and confirm the full flow works (sign-up → dashboard → profile → billing)
- [ ] Complete a real (or Paddle sandbox-to-live test) checkout and confirm the webhook updates the subscription
- [ ] Confirm `/sitemap.xml` and `/robots.txt` are reachable
- [ ] Confirm `/admin` is only accessible with `ADMIN_EMAIL`
- [ ] Replace the placeholder content in `/privacy` and `/terms` with real policies (a tool like Termly can help)

## Notes on Vercel's serverless environment

- Rate limiting relies on Upstash Redis (not in-memory), since Vercel functions don't share memory between invocations — this is already handled in `lib/rate-limit.ts`.
- Prisma uses the `@prisma/adapter-pg` driver adapter, which works correctly in serverless environments without connection pool exhaustion issues, provided Neon's connection pooling is used (the default `DATABASE_URL` from Neon already points to the pooled connection).
