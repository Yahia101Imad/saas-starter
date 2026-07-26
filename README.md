# SaaS Starter

A production-ready SaaS starter built with Next.js 16, better-auth, Prisma, and Paddle. Designed to be cloned and extended for new B2C SaaS products without rebuilding the same foundation every time.

## Features

- **Authentication** — Email/password and Google OAuth via [better-auth](https://better-auth.com), with guest-only route protection and rate-limited auth endpoints
- **Dashboard** — Profile management (avatar upload with crop/zoom via Cloudinary), theme preferences, billing
- **Billing** — Paddle inline checkout with webhook-driven subscription state, cancellation flow
- **Admin Panel** — Read-only overview of users and subscriptions, protected by a single admin email
- **UI** — Toast notifications, loading/empty/error states, collapsible sidebar, light/dark theme with theme-aware logo
- **Security** — Rate limiting (Upstash Redis), secure HTTP headers, CSRF/XSS protection via Next.js and React defaults
- **Testing** — 41 unit and integration tests (Vitest), running automatically via GitHub Actions CI
- **SEO** — Per-page metadata, Open Graph tags, dynamic sitemap and robots.txt

## Tech Stack

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack) |
| Language      | TypeScript                         |
| Styling       | Tailwind CSS v4 + shadcn/ui        |
| Database      | PostgreSQL (Neon) + Prisma ORM     |
| Auth          | better-auth                        |
| Payments      | Paddle                             |
| Image storage | Cloudinary                         |
| Email         | Resend                             |
| Rate limiting | Upstash Redis                      |
| Testing       | Vitest                             |
| CI            | GitHub Actions                     |

## Prerequisites

- Node.js 22+
- npm
- Accounts (free tiers work for development):
  - [Neon](https://neon.tech) — PostgreSQL database
  - [Paddle](https://paddle.com) — Sandbox account for billing
  - [Cloudinary](https://cloudinary.com) — Image uploads
  - [Resend](https://resend.com) — Transactional email
  - [Upstash](https://upstash.com) — Redis for rate limiting
  - [Google Cloud Console](https://console.cloud.google.com) — OAuth credentials

## Getting Started

### 1. Clone and install

\`\`\`bash
git clone <your-repo-url></your>
cd saas-starter
npm install
\`\`\`

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in each value:

\`\`\`bash
cp .env.example .env
\`\`\`

See the [Environment Variables](#environment-variables) section below for details on where to get each value.

### 3. Set up the database

\`\`\`bash
npx prisma migrate dev
npx prisma generate
\`\`\`

Optionally seed a test plan (edit `prisma/seed.ts` with a real Paddle price ID first):

\`\`\`bash
npx tsx prisma/seed.ts
\`\`\`

### 4. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

### 5. Run tests

\`\`\`bash
npm run test
\`\`\`

## Environment Variables

| Variable                                              | Where to get it                                             |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`                                        | Neon dashboard — connection string                          |
| `TEST_DATABASE_URL`                                   | A**separate** Neon database, used only by the test suite    |
| `BETTER_AUTH_SECRET`                                  | Generate via`npx better-auth secret`                        |
| `BETTER_AUTH_URL`                                     | `http://localhost:3000` in development                      |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`           | Google Cloud Console → Credentials → OAuth Client ID        |
| `RESEND_API_KEY`                                      | Resend dashboard → API Keys                                 |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`                   | Cloudinary dashboard                                        |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`                | Cloudinary → Settings → Upload → unsigned preset            |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`        | Cloudinary dashboard → Access Keys                          |
| `PADDLE_API_KEY`                                      | Paddle → Developer Tools → Authentication                   |
| `PADDLE_WEBHOOK_SECRET`                               | Paddle → Developer Tools → Notifications → your destination |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`                     | Paddle → Developer Tools → Authentication                   |
| `NEXT_PUBLIC_PADDLE_ENV`                              | `sandbox` in development, `production` when live            |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash dashboard → your Redis database                     |
| `ADMIN_EMAIL`                                         | The email address that should have access to`/admin`        |
| `NEXT_PUBLIC_APP_URL`                                 | `http://localhost:3000` in development                      |
| `CONTACT_EMAIL`                                       | Where contact form submissions are sent                     |

## Project Structure

\`\`\`
app/
(marketing)/ # Public pages: home, pricing, about, contact, privacy, terms
(auth)/ # sign-in, sign-up, forgot/reset password
(dashboard)/
dashboard/ # Authenticated app: profile, settings, billing
admin/ # Admin-only panel
api/
auth/ # better-auth catch-all handler
webhooks/ # Paddle webhook handler

components/
ui/ # shadcn/ui primitives
shared/ # Reusable components (avatar, logo, empty state)
auth/, profile/, billing/, dashboard/, marketing/, settings/

lib/
auth.ts # better-auth server config
auth-client.ts # better-auth client
session.ts # getSession() helper
db.ts # Prisma client
paddle/ # Paddle server/client setup
validations/ # Zod schemas
rate-limit.ts # Upstash rate limiters

tests/
unit/ # Schema and utility tests
integration/ # Database-backed tests

prisma/
schema.prisma
migrations/
\`\`\`

## Local Development Notes

- **Google OAuth** requires the redirect URI `http://localhost:3000/api/auth/callback/google` to be added in Google Cloud Console.
- **Paddle webhooks** require a tunnel (e.g. [ngrok](https://ngrok.com)) since Paddle cannot reach `localhost` directly. Update the webhook destination URL and the "Default payment link" in Paddle each time your tunnel URL changes.
- **Paddle domain approval**: your webhook/checkout domain must be approved under Paddle → Checkout Settings → Request website approval. Sandbox domains are auto-approved.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full guide to deploying on Vercel.

## License

MIT (or your preferred license)
