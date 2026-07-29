import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 truncate font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="truncate font-display text-base font-semibold sm:text-lg">{title}</h2>
        {hint ? <p className="truncate text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Surface({
  className,
  children,
  hover,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 elevate",
        hover && "card-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "brand",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  tone?: "brand" | "violet" | "cyan" | "success" | "warning";
}) {
  const tones: Record<string, string> = {
    brand: "bg-primary/10 text-primary",
    violet: "bg-violet/10 text-violet",
    cyan: "bg-cyan/15 text-cyan",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <Surface hover className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
        {delta ? <p className="mt-1 text-xs font-medium text-success">{delta}</p> : null}
      </div>
      {icon ? (
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", tones[tone])}>
          {icon}
        </span>
      ) : null}
    </Surface>
  );
}

export function SoftBadge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "violet" | "cyan" | "success" | "warning" | "danger" | "muted";
  className?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-primary/10 text-primary",
    violet: "bg-violet/12 text-violet",
    cyan: "bg-cyan/18 text-cyan",
    success: "bg-success/15 text-success",
    warning: "bg-warning/18 text-warning",
    danger: "bg-destructive/12 text-destructive",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="mt-4 h-4 w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="mt-2 h-3 w-full" />
      ))}
    </div>
  );
}

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="7" className="stroke-muted" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-700"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
        />
      </svg>
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold">{value}%</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function Countdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card/15 px-3 py-2 text-center backdrop-blur-sm">
      <p className="font-display text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-[10px] uppercase tracking-widest opacity-80">{label}</p>
    </div>
  );
}
