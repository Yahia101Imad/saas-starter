import { ContactForm } from "@/components/marketing/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question? Send us a message and we'll respond as soon as possible.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-lg px-6 py-20">
      <div className="mb-8">
        <h1>Contact us</h1>
        <p className="text-muted-foreground">
          Have a question? Send us a message and we&apos;ll respond as soon as
          possible.
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
