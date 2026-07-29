import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between gradient-brand p-12 text-primary-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-card/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold">CampuSphere</span>
        </Link>
        <div>
          <h2 className="max-w-md font-display text-4xl font-semibold leading-tight">
            One platform. Every campus need.
          </h2>
          <p className="mt-4 max-w-sm text-sm opacity-90">
            Events, clubs, mentorship, faculty skill sessions, navigation and AI — all in one place.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["18,420", "Students"],
              ["64", "Clubs"],
              ["126", "Events / mo"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-card/15 p-4">
                <p className="font-display text-xl font-semibold">{v}</p>
                <p className="text-xs opacity-80">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs opacity-70">© 2026 Northgate University</p>
      </div>

      <div className="relative flex flex-col aurora">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-14">
          <div className="w-full max-w-sm animate-rise">
            <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-semibold">CampuSphere</span>
            </Link>
            <h1 className="font-display text-2xl font-semibold">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8 space-y-4">{children}</div>
            {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
