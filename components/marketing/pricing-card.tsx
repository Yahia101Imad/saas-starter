import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    currency: string;
    interval: string;
  };
  isAuthenticated: boolean;
}

export function PricingCard({ plan, isAuthenticated }: PricingCardProps) {
  const formattedPrice = (plan.price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: plan.currency,
    minimumFractionDigits: 0,
  });

  const ctaHref = isAuthenticated
    ? `/dashboard/billing?plan=${plan.id}`
    : `/sign-up?plan=${plan.id}`;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        {plan.description && (
          <CardDescription>{plan.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-3xl font-semibold">{formattedPrice}</span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </div>

        <ul className="text-muted-foreground space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            All core features
          </li>
        </ul>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={ctaHref}>Choose {plan.name}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
