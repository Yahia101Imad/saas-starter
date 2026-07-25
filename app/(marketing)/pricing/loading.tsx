import { Skeleton } from "@/components/ui/skeleton";

export default function PricingLoading() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 space-y-2 text-center">
        <Skeleton className="mx-auto h-9 w-64" />
        <Skeleton className="mx-auto h-4 w-80" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-md border p-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}
