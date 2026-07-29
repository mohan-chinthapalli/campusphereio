import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CampuSphere" },
      { name: "description", content: "Sign in to your CampuSphere account to access events, clubs, mentorship and learning resources." },
      { property: "og:title", content: "Log in — CampuSphere" },
      { property: "og:description", content: "Sign in to your CampuSphere account to access events, clubs, mentorship and learning resources." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in with your university account to continue."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Welcome back, Aarav");
          navigate({ to: "/app" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">University email</Label>
          <Input id="email" type="email" placeholder="aarav.sharma@campusphere.edu" required className="h-11 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" required className="h-11 rounded-xl" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox defaultChecked /> Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button variant="hero" size="lg" className="w-full" type="submit">
          Sign in
        </Button>
      </form>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => toast("Single sign-on is disabled in this demo")}>
          Google
        </Button>
        <Button variant="outline" onClick={() => toast("Single sign-on is disabled in this demo")}>
          University SSO
        </Button>
      </div>
    </AuthLayout>
  );
}
