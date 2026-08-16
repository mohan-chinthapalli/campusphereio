import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Loader2, ShieldCheck, Presentation } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ROLES,
  signInWithGoogle,
  signInWithPassword,
  type UserRole,
} from "@/lib/auth-mock";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CampuSphere" },
      { name: "description", content: "Sign in to CampuSphere as a student or faculty member with your institution account." },
      { property: "og:title", content: "Log in — CampuSphere" },
      { property: "og:description", content: "Sign in to CampuSphere as a student or faculty member with your institution account." },
    ],
  }),
  component: LoginPage,
});

/** Google "G" mark — per Google branding guidelines (full-colour on white surface). */
function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

const roleIcon = { student: GraduationCap, faculty: Presentation } as const;

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState<null | "google" | "password">(null);

  const finish = (name: string) => {
    toast.success(`Welcome back, ${name}`);
    navigate({ to: "/app" });
  };

  return (
    <AuthLayout
      title="Sign in to CampuSphere"
      subtitle="Choose your role and continue with your institution account."
      footer={
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          Accounts are provided by your institution — there is no public sign-up.
        </span>
      }
    >
      {/* Role selector */}
      <div className="space-y-2">
        <Label>I am signing in as</Label>
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-muted/40 p-1.5">
          {ROLES.map((r) => {
            const Icon = roleIcon[r.value];
            const active = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "gradient-brand text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {r.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {ROLES.find((r) => r.value === role)?.hint}
        </p>
      </div>

      {/* Primary: Google OAuth (mock handler in src/lib/auth-mock.ts) */}
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-3 rounded-xl bg-card font-medium"
        disabled={pending !== null}
        onClick={async () => {
          setPending("google");
          const res = await signInWithGoogle(role);
          setPending(null);
          if (res.ok) finish(res.name);
          else toast.error(res.error);
        }}
      >
        {pending === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleMark />}
        Sign in with Google
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or use your email{" "}
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending("password");
          const res = await signInWithPassword(role, email, password);
          setPending(null);
          if (res.ok) finish(res.name);
          else toast.error(res.error);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">{role === "faculty" ? "Staff email" : "University email"}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={role === "faculty" ? "m.iyer@campusphere.edu" : "aarav.sharma@campusphere.edu"}
            required
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="h-11 rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox defaultChecked /> Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button variant="hero" size="lg" className="w-full" type="submit" disabled={pending !== null}>
          {pending === "password" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Sign in as {role === "faculty" ? "faculty" : "student"}
        </Button>
      </form>
    </AuthLayout>
  );
}
