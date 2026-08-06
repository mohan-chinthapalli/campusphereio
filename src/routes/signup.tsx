import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — CampuSphere" },
      { name: "description", content: "Join CampuSphere to discover events, clubs, mentors and faculty-led skill sessions on your campus." },
      { property: "og:title", content: "Create your account — CampuSphere" },
      { property: "og:description", content: "Join CampuSphere to discover events, clubs, mentors and faculty-led skill sessions on your campus." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join 18,000+ students already on CampuSphere."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account created — welcome to CampuSphere");
          navigate({ to: "/app" });
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="first">First name</Label>
            <Input id="first" placeholder="Aarav" required className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Sharma" required className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email2">University email</Label>
          <Input id="email2" type="email" placeholder="you@campusphere.edu" required className="h-11 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>I am a</Label>
          <Select defaultValue="student">
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
              <SelectItem value="admin">Administration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw2">Password</Label>
          <Input id="pw2" type="password" placeholder="At least 8 characters" required className="h-11 rounded-xl" />
        </div>
        <Button variant="hero" size="lg" className="w-full" type="submit">
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to the campus code of conduct.
        </p>
      </form>
    </AuthLayout>
  );
}
