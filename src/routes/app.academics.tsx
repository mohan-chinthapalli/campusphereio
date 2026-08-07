import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, ProgressRing, SectionTitle, SoftBadge, StatCard, Surface } from "@/components/common";
import { classes, enrolledSessions, skillSessions, student, weekActivity } from "@/lib/data";

export const Route = createFileRoute("/app/academics")({
  head: () => ({
    meta: [
      { title: "My Academics — CampuSphere" },
      { name: "description", content: "Private academic record: CGPA, attendance, credits, timetable and Skill Hub learning progress." },
      { property: "og:title", content: "My Academics — CampuSphere" },
      { property: "og:description", content: "Private academic record: CGPA, attendance, credits, timetable and Skill Hub learning progress." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Academics,
});


function Academics() {
  const max = Math.max(...weekActivity.map((d) => d.hours));
  return (
    <div className="space-y-8">
      <PageHeader
        title="My academics"
        description="Your private academic record. Only visible to you."
        actions={
          <SoftBadge tone="muted">
            <Lock className="h-3 w-3" /> Confidential
          </SoftBadge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="CGPA" value={String(student.cgpa)} delta="Semester 6" />
        <StatCard label="Attendance" value={`${student.attendance}%`} delta="Above requirement" tone="cyan" />
        <StatCard label="Credits earned" value={String(student.credits)} delta="On track" tone="violet" />
        <StatCard label="Study streak" value="21 days" delta="Personal best" tone="warning" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Surface>
            <SectionTitle title="Today's classes" hint="Semester 6 · Computer Science" />
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

          <Surface>
            <SectionTitle title="Weekly study activity" hint="Hours logged this week" />
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
        </div>

        <div className="space-y-6">
          <Surface>
            <SectionTitle
              title="Learning progress"
              hint="From your Faculty Skill Hub enrolments"
              action={<Button variant="ghost" size="sm" asChild><Link to="/app/skills">Skill Hub <ArrowRight /></Link></Button>}
            />
            <div className="space-y-5">
              <ProgressRing value={overall} label={`${totalDone} of ${totalModules} modules completed`} />
              {enrolled.map((e) => (
                <div key={e.session.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent">{e.session.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{e.session.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{e.session.faculty} · {e.session.schedule}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">{e.value}%</span>
                  </div>
                  <Progress value={e.value} className="mt-3 h-1.5" />
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{e.completed}/{e.session.sessions} modules</span>
                    <span>Last activity · {e.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
