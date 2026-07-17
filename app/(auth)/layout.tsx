import type { ReactNode } from "react";
import Link from "next/link";

// import { ModeToggle } from "@/components/theme/mode-toggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            SaaS Starter
          </Link>

          {/* <ModeToggle /> */}
        </div>
      </header>

      {/* Content */}
      <section className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex h-16 max-w-7xl items-center justify-center px-6 text-sm">
          © 2026 SaaS Starter. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
