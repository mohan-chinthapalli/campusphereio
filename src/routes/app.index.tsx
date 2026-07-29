import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Bot, CalendarDays, CloudSun, Flame, GraduationCap, LibraryBig, MapPin,
  Megaphone, Newspaper, Sparkles, Timer, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, ProgressRing, SectionTitle, SoftBadge, StatCard, Surface } from "@/components/common";
import { EventCard } from "@/components/cards";
import {
  activity, announcements, classes, clubs, deadlines, events, learningProgress, news,
  skillSessions, student, weekActivity,
} from "@/lib/data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — CampuSphere" },
      { name: "description", content: "Your campus at a glance: today's classes, events, deadlines, clubs, learning progress and announcements." },
      { property: "og:title", content: "Student Dashboard — CampuSphere" },
      { property: "og:description", content: "Your campus at a glance: today's classes, events, deadlines, clubs, learning progress and announcements." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const max = Math.max(...weekActivity.map((d) => d.hours));
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-border gradient-brand p-6 text-primary-foreground sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="min-w-0">
            <SoftBadge tone="muted" className="bg-card/20 text-primary-foreground">
              <Sparkles className="h-3 w-3" /> Wednesday, 29 July
            </SoftBadge>
            <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Good morning, {student.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 max-w-lg text-sm opacity-90">
              You have 1 live class, 4 events happening today and an ML assignment due tomorrow.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="glass" size="sm" asChild><Link to="/app/events">Today&apos;s events</Link></Button>
              <Button variant="glass" size="sm" asChild><Link to="/app/ai"><Bot /> Ask AI</Link></Button>
              <Button variant="glass" size="sm" asChild><Link to="/app/navigate"><MapPin /> Find a room</Link></Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["CGPA", student.cgpa], ["Attendance", student.attendance + "%"], ["Credits", student.credits]].map(([l, v]) => (
              <div key={l as string} className="rounded-2xl bg-card/15 p-4 text-center">
                <p className="font-display text-xl font-semibold">{v}</p>
                <p className="text-[11px] opacity-80">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events joined" value="14" delta="+3 this month" icon={<CalendarDays className="h-4.5 w-4.5" />} />
        <StatCard label="Clubs" value="3" delta="Coding Club lead" icon={<Users className="h-4.5 w-4.5" />} tone="violet" />
        <StatCard label="Skill sessions" value="5" delta="2 in progress" icon={<GraduationCap className="h-4.5 w-4.5" />} tone="cyan" />
        <StatCard label="Study streak" value="21 days" delta="Personal best" icon={<Flame className="h-4.5 w-4.5" />} tone="warning" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Surface>
            <SectionTitle title="Today's classes" hint="Semester 6 · Computer Science" action={<Button variant="ghost" size="sm">Full timetable</Button>} />
            <ul className="space-y-2">
              {classes.map((c) => (
                <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3 sm:flex sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-xs font-semibold text-accent-foreground">
                      {c.code.split("-")[1]}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.room} · {c.faculty}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                    {c.status === "live" ? <SoftBadge tone="danger">● Live</SoftBadge> : null}
                    {c.status === "next" ? <SoftBadge tone="brand">Next</SoftBadge> : null}
                    {c.status === "done" ? <SoftBadge tone="muted">Done</SoftBadge> : null}
                  </div>
                </li>
              ))}
            </ul>
          </Surface>

          <div>
            <SectionTitle title="Happening on campus" hint="Registrations closing soon"
              action={<Button variant="ghost" size="sm" asChild><Link to="/app/events">All events <ArrowRight /></Link></Button>} />
            <div className="grid gap-5 md:grid-cols-2">
              {events.slice(0, 2).map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>

          <Surface>
            <SectionTitle title="Weekly activity" hint="Study hours and events attended" />
            <div className="flex h-40 items-end gap-3">
              {weekActivity.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div className="w-full rounded-t-lg gradient-brand transition-all duration-500"
                      style={{ height: `${(d.hours / max) * 100}%` }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </Surface>

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
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Campus weather</p>
                <p className="mt-1 font-display text-3xl font-semibold">29°C</p>
                <p className="text-xs text-muted-foreground">Light showers · Carry an umbrella</p>
              </div>
              <CloudSun className="h-10 w-10 shrink-0 text-primary" />
            </div>
          </Surface>

          <Surface>
            <SectionTitle title="Upcoming deadlines" />
            <ul className="space-y-2">
              {deadlines.map((d) => (
                <li key={d.id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <Timer className={d.urgency === "high" ? "mt-0.5 h-4 w-4 shrink-0 text-destructive" : "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.course} · {d.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface>
            <SectionTitle title="Learning progress" action={<Button variant="ghost" size="sm" asChild><Link to="/app/learn">Hub</Link></Button>} />
            <div className="space-y-4">
              <ProgressRing value={68} label="DSA Mastery · 14 modules" />
              {learningProgress.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between text-xs"><span>{p.name}</span><span className="text-muted-foreground">{p.value}%</span></div>
                  <Progress value={p.value} className="mt-1.5 h-1.5" />
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <SectionTitle title="Latest announcements" action={<Button variant="ghost" size="sm" asChild><Link to="/app/announcements">All</Link></Button>} />
            <ul className="space-y-3">
              {announcements.slice(0, 3).map((a) => (
                <li key={a.id} className="flex gap-3">
                  <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.author} · {a.ago}</p>
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

          <Surface>
            <SectionTitle title="Recent activity" />
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.id} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="leading-snug">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.ago}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface>
            <SectionTitle title="University news" />
            <ul className="space-y-3">
              {news.map((n) => (
                <li key={n.id} className="flex gap-3">
                  <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.source} · {n.ago}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface className="bg-gradient-to-br from-cyan/10 to-primary/10">
            <SectionTitle title="Study materials" hint="Picked for your semester" />
            <Button variant="hero" className="w-full" asChild>
              <Link to="/app/learn"><LibraryBig /> Open Learning Hub</Link>
            </Button>
          </Surface>
        </div>
      </div>
    </div>
  );
}
