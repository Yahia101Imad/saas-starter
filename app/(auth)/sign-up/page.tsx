import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthCard,
  AuthDivider,
  AuthFooter,
  GoogleSignInButton,
} from "@/components/auth";

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Start building with SaaS Starter"
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>

          <Input id="name" type="text" placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input id="email" type="email" placeholder="john@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>

          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>

        <Button className="w-full">Create Account</Button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <GoogleSignInButton />

      <div className="mt-6">
        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </div>
    </AuthCard>
  );
}
