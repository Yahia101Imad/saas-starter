import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
      <h1>Build your SaaS faster</h1>
      <p className="text-muted-foreground text-lg">
        Authentication, billing, and dashboards — ready to go, so you can focus
        on what makes your product different.
      </p>

      <div className="flex gap-3">
        <Button size="lg" asChild>
          <Link href="/sign-up">Get started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/pricing">View pricing</Link>
        </Button>
      </div>
    </section>
  );
}
