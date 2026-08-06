import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  GraduationCap,
  LibraryBig,
  Map,
  MessageSquareHeart,
  Sparkles,
  Users,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SoftBadge } from "@/components/common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampuSphere — One Platform. Every Campus Need." },
      {
        name: "description",
        content:
          "A centralized digital campus experience: events, clubs, mentorship, faculty skill sessions, navigation, learning resources and AI in one place.",
      },
      { property: "og:title", content: "CampuSphere — One Platform. Every Campus Need." },
      {
        property: "og:description",
        content:
          "The digital campus platform students actually want to open every day. Events, clubs, mentorship, learning and AI.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: CalendarDays,
    title: "Event Explorer",
    body: "Hackathons, fests and workshops with live seat counts, countdowns and one-tap registration.",
  },
  {
    icon: Users,
    title: "Club Explorer",
    body: "Discover every society on campus, see what they actually do, and join in a single click.",
  },
  {
    icon: GraduationCap,
    title: "Faculty Skill Hub",
    body: "Professors teach AI, DSA, cloud, photography and communication outside the syllabus.",
  },
  {
    icon: MessageSquareHeart,
    title: "Student Mentorship",
    body: "Book seniors by skill, branch or year for interviews, resumes and project guidance.",
  },
  {
    icon: Map,
    title: "Campus Navigation",
    body: "Find any block, lab or venue with walking times and live opening hours.",
  },
  {
    icon: LibraryBig,
    title: "Learning Hub",
    body: "Notes, PDFs, lecture videos and previous-year papers with progress tracking.",
  },
];

const stats = [
  { value: "18,420", label: "Active students" },
  { value: "126", label: "Events this month" },
  { value: "64", label: "Clubs & societies" },
  { value: "4.9", label: "Average rating" },
];

function Splash({ done }: { done: boolean }) {
  return (
    <div
      className={cnSplash(done)}
      aria-hidden={done}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-3xl gradient-brand text-primary-foreground animate-float">
          <Sparkles className="h-7 w-7" />
        </span>
        <p className="font-display text-xl font-semibold">CampuSphere</p>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading campus</p>
      </div>
    </div>
  );
}

function cnSplash(done: boolean) {
  return [
    "fixed inset-0 z-50 grid place-items-center bg-background transition-opacity duration-700",
    done ? "pointer-events-none opacity-0" : "opacity-100",
  ].join(" ");
}

function Landing() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen aurora">
      <Splash done={ready} />

      <header className="sticky top-0 z-40 border-b border-border glass">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="truncate font-display text-base font-semibold">CampuSphere</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#stats" className="hover:text-foreground">
              Impact
            </a>
            <a href="#universities" className="hover:text-foreground">
              For universities
            </a>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/app">Enter campus</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
          <SoftBadge tone="brand" className="mx-auto">
            <Sparkles className="h-3 w-3" /> Now live at Northgate University
          </SoftBadge>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
            One platform.
            <br />
            <span className="text-gradient">Every campus need.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            CampuSphere brings academics, clubs, events, mentorship, navigation and AI into a single
            experience students open every single day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/app">
                Explore the student experience <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/signup">Create an account</Link>
            </Button>
          </div>

          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card p-2 elevate">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-violet/10 to-cyan/10 p-6 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { t: "Today on campus", v: "4 events · 2 deadlines", i: CalendarDays },
                  { t: "Your learning", v: "68% through DSA Mastery", i: LibraryBig },
                  { t: "Ask AI", v: "\u201cWhere is Block C?\u201d", i: Bot },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl border border-border bg-card p-5 text-left elevate">
                    <c.i className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                      {c.t}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold">{c.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="border-y border-border bg-card/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-semibold text-gradient">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The platform
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Everything campus life needs, nothing it doesn&apos;t.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 elevate card-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="universities" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-border gradient-brand p-8 text-primary-foreground sm:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                  Built for universities. Loved by students.
                </h2>
                <p className="mt-4 max-w-lg text-sm opacity-90">
                  Roll out a single platform for students, faculty, club leaders, event organizers
                  and administration — with role-aware dashboards out of the box.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button variant="glass" size="lg" asChild>
                    <Link to="/app">Explore the platform</Link>
                  </Button>
                  <Button variant="glass" size="lg" asChild>
                    <Link to="/signup">Request a demo</Link>
                  </Button>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  "Role-based dashboards for every stakeholder",
                  "Event operations from listing to attendance",
                  "Faculty-led skill programmes and mentorship",
                  "Accessible, responsive and dark-mode ready",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2.5 rounded-xl bg-card/15 px-4 py-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CampuSphere · Northgate University</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              Sign up
            </Link>
            <Link to="/app/feedback" className="hover:text-foreground">
              Feedback
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
