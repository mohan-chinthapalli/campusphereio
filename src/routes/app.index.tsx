import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Bot, CalendarDays, GraduationCap, Lock, MapPin, Megaphone, Sparkles, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle, SoftBadge, Surface } from "@/components/common";
import { EventCard } from "@/components/cards";
import { announcements, clubs, events, skillSessions, student } from "@/lib/data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — CampuSphere" },
      { name: "description", content: "Your campus at a glance: today's events, clubs, skill sessions and announcements." },
      { property: "og:title", content: "Student Dashboard — CampuSphere" },
      { property: "og:description", content: "Your campus at a glance: today's events, clubs, skill sessions and announcements." },
    ],
  }),
  component: Dashboard,
});

const quickLinks = [
  { to: "/app/events", label: "Events", icon: CalendarDays },
  { to: "/app/clubs", label: "Clubs", icon: Users },
  { to: "/app/skills", label: "Skill Hub", icon: GraduationCap },
  { to: "/app/navigate", label: "Navigate", icon: MapPin },
] as const;

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-border gradient-brand p-6 text-primary-foreground sm:p-8">
        <SoftBadge tone="muted" className="bg-card/20 text-primary-foreground">
          <Sparkles className="h-3 w-3" /> Wednesday, 29 July
        </SoftBadge>
        <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          Good morning, {student.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 max-w-lg text-sm opacity-90">
          4 events are happening on campus today.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="glass" size="sm" asChild><Link to="/app/events">Today&apos;s events</Link></Button>
          <Button variant="glass" size="sm" asChild><Link to="/app/ai"><Bot /> Ask AI</Link></Button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickLinks.map((q) => (
          <Link key={q.to} to={q.to}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent/50">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
              <q.icon className="h-4.5 w-4.5" />
            </span>
            <span className="truncate text-sm font-medium">{q.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div>
            <SectionTitle title="Happening on campus" hint="Registrations closing soon"
              action={<Button variant="ghost" size="sm" asChild><Link to="/app/events">All events <ArrowRight /></Link></Button>} />
            <div className="grid gap-5 md:grid-cols-2">
              {events.slice(0, 2).map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>

          <Surface>
            <SectionTitle title="Trending clubs" action={<Button variant="ghost" size="sm" asChild><Link to="/app/clubs">Explore</Link></Button>} />
            <ul className="grid gap-3 sm:grid-cols-2">
              {clubs.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link to="/app/clubs/$clubId" params={{ clubId: c.id }}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-lg">{c.emoji}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.members.toLocaleString()} members</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Surface>
        </div>

        <div className="space-y-6">
          <Surface className="bg-gradient-to-br from-primary/10 to-violet/10">
            <SectionTitle title="My academics" hint="Grades, attendance, timetable" />
            <p className="text-sm text-muted-foreground">
              Your CGPA, attendance and deadlines are kept private in a separate space.
            </p>
            <Button variant="hero" className="mt-4 w-full" asChild>
              <Link to="/app/academics"><Lock /> Open my academics</Link>
            </Button>
          </Surface>

          <Surface>
            <SectionTitle title="Latest announcements" action={<Button variant="ghost" size="sm" asChild><Link to="/app/announcements">All</Link></Button>} />
            <ul className="space-y-3">
              {announcements.slice(0, 3).map((a) => (
                <li key={a.id} className="flex gap-3">
                  <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.tag} · {a.ago}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface>
            <SectionTitle title="Faculty skill sessions" action={<Button variant="ghost" size="sm" asChild><Link to="/app/skills">Browse</Link></Button>} />
            <ul className="space-y-2">
              {skillSessions.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent">{s.emoji}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.faculty} · {s.schedule}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>
    </div>
  );
}
