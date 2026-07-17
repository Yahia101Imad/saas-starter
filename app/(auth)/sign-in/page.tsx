import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthCard,
  AuthDivider,
  AuthFooter,
  GoogleSignInButton,
} from "@/components/auth";

export default function SignInPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to your account">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input id="email" type="email" placeholder="john@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <Button className="w-full">Sign In</Button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <GoogleSignInButton />

      <div className="mt-6">
        <AuthFooter
          text="Don't have an account?"
          linkText="Create one"
          href="/sign-up"
        />
      </div>
    </AuthCard>
  );
}
