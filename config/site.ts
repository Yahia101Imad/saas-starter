export const siteConfig = {
  name: "SaaS Starter",
  description: "Authentication, billing, and dashboards — ready to go.",
  logo: {
    light: "/logo-light.png", // public//logo-light
    dark: "/logo-dark.png", // public//logo-dark
  },
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
