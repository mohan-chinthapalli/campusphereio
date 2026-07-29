import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CampuSphere" },
      { name: "description", content: "Request a password reset link for your CampuSphere university account." },
      { property: "og:title", content: "Reset your password — CampuSphere" },
      { property: "og:description", content: "Request a password reset link for your CampuSphere university account." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "We sent a secure reset link to your university email. It expires in 20 minutes."
          : "Enter your university email and we will send you a reset link."
      }
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center elevate">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/15 text-success">
            <MailCheck className="h-5 w-5" />
          </span>
          <p className="mt-4 text-sm text-muted-foreground">
            Didn&apos;t receive it? Check spam or{" "}
            <button onClick={() => setSent(false)} className="text-primary hover:underline">
              try another address
            </button>
            .
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="femail">University email</Label>
            <Input id="femail" type="email" placeholder="you@campusphere.edu" required className="h-11 rounded-xl" />
          </div>
          <Button variant="hero" size="lg" className="w-full" type="submit">
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
