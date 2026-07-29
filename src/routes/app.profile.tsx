import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Download, FileBadge, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoftBadge, StatCard, Surface } from "@/components/common";
import { clubs, events, mentors, student } from "@/lib/data";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — CampuSphere" },
      { name: "description", content: "Skills, projects, certificates, badges, registered events, clubs and mentorship history." },
      { property: "og:title", content: "Student Profile — CampuSphere" },
      { property: "og:description", content: "Skills, projects, certificates, badges, registered events, clubs and mentorship history." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl border border-border bg-card elevate">
        <div className="h-32 gradient-brand sm:h-40" />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 p-6 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <span className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-border bg-card font-display text-2xl font-semibold elevate">
              {student.initials}
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-semibold">{student.name}</h1>
              <p className="truncate text-sm text-muted-foreground">{student.roll} · {student.branch}</p>
              <p className="truncate text-xs text-muted-foreground">{student.year}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline"><Mail /> Message</Button>
            <Button variant="hero"><Download /> Resume</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="CGPA" value={String(student.cgpa)} />
        <StatCard label="Attendance" value={`${student.attendance}%`} tone="success" />
        <StatCard label="Credits" value={String(student.credits)} tone="violet" />
        <StatCard label="Badges" value={String(student.badges.length)} tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Tabs defaultValue="overview">
          <TabsList className="rounded-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certs">Certificates</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <Surface>
              <h2 className="font-display text-sm font-semibold">About</h2>
              <p className="mt-2 text-sm text-muted-foreground">{student.bio}</p>
              <h2 className="mt-5 font-display text-sm font-semibold">Skills</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {student.skills.map((s) => <SoftBadge key={s} tone="brand">{s}</SoftBadge>)}
              </div>
              <h2 className="mt-5 font-display text-sm font-semibold">Badges</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {student.badges.map((b) => <SoftBadge key={b} tone="warning"><Award className="h-3 w-3" />{b}</SoftBadge>)}
              </div>
            </Surface>
          </TabsContent>
          <TabsContent value="projects" className="mt-4 space-y-3">
            {student.projects.map((p) => (
              <Surface key={p.name} hover>
                <h3 className="font-display text-sm font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-2 text-xs text-primary">{p.stack}</p>
              </Surface>
            ))}
          </TabsContent>
          <TabsContent value="certs" className="mt-4 space-y-3">
            {student.certificates.map((c) => (
              <Surface key={c.name} hover className="flex items-center gap-3">
                <FileBadge className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
                </div>
              </Surface>
            ))}
          </TabsContent>
          <TabsContent value="events" className="mt-4 space-y-3">
            {events.slice(0, 4).map((e) => (
              <Surface key={e.id} hover className="flex items-center gap-3">
                <span className="text-xl">{e.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.date} · {e.venue}</p>
                </div>
              </Surface>
            ))}
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <Surface>
            <h2 className="font-display text-sm font-semibold">Clubs</h2>
            <ul className="mt-3 space-y-2">
              {clubs.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <Link to="/app/clubs/$clubId" params={{ clubId: c.id }} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/50">
                    <span className="text-lg">{c.emoji}</span>
                    <span className="truncate text-sm font-medium">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Surface>
          <Surface>
            <h2 className="font-display text-sm font-semibold">Mentorship history</h2>
            <ul className="mt-3 space-y-2">
              {mentors.slice(0, 3).map((m) => (
                <li key={m.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="text-lg">{m.emoji}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.skills[0]} session</p>
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
