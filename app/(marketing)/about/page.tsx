import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about our mission and what we're building.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1>About us</h1>
      <p className="text-muted-foreground mt-4">
        We&apos;re building tools that help teams ship faster. Our mission is to
        remove the repetitive setup work so you can focus on what makes your
        product unique.
      </p>
    </section>
  );
}
