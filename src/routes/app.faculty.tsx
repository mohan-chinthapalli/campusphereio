import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Mail, MapPin, Quote, Users } from "lucide-react";
import { PageHeader, SoftBadge, StatCard, Surface } from "@/components/common";
import { Button } from "@/components/ui/button";
import { classes, faculty, skillSessions } from "@/lib/data";

export const Route = createFileRoute("/app/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty Console — CampuSphere" },
      { name: "description", content: "Faculty dashboard for classes, skill sessions, mentees and research at a glance." },
      { property: "og:title", content: "Faculty Console — CampuSphere" },
      { property: "og:description", content: "Faculty dashboard for classes, skill sessions, mentees and research at a glance." },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Faculty Console" title={faculty.name} description={faculty.title} actions={<Button variant="hero">Create session</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Classes today" value="4" icon={<BookOpen className="h-4.5 w-4.5" />} />
        <StatCard label="Skill enrolments" value="486" tone="violet" icon={<GraduationCap className="h-4.5 w-4.5" />} />
        <StatCard label="Mentees" value={String(faculty.students)} tone="cyan" icon={<Users className="h-4.5 w-4.5" />} />
        <StatCard label="Citations" value={faculty.citations.toLocaleString()} tone="warning" icon={<Quote className="h-4.5 w-4.5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Surface>
          <h2 className="font-display text-base font-semibold">Today&apos;s teaching schedule</h2>
          <ul className="mt-4 space-y-2">
            {classes.map((c) => (
              <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.code} · {c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.room}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
              </li>
            ))}
          </ul>
        </Surface>
        <div className="space-y-6">
          <Surface>
            <h2 className="font-display text-base font-semibold">Office</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{faculty.office}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" />{faculty.email}</li>
              <li>Office hours: {faculty.hours}</li>
            </ul>
          </Surface>
          <Surface>
            <h2 className="font-display text-base font-semibold">Research interests</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {faculty.interests.map((i) => <SoftBadge key={i} tone="brand">{i}</SoftBadge>)}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{faculty.bio}</p>
          </Surface>
        </div>
      </div>
      <Surface>
        <h2 className="font-display text-base font-semibold">My skill programmes</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {skillSessions.slice(0, 4).map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-lg">{s.emoji}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{s.title}</p>
                <p className="truncate text-xs text-muted-foreground">{s.enrolled} enrolled · {s.schedule}</p>
              </div>
            </li>
          ))}
        </ul>
      </Surface>
    </div>
  );
}
