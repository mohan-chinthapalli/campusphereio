import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, CalendarDays, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoftBadge, Surface } from "@/components/common";
import { clubs, type Club } from "@/lib/data";

export const Route = createFileRoute("/app/clubs/$clubId")({
  loader: ({ params }) => {
    const club = clubs.find((c) => c.id === params.clubId);
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Club not found — CampuSphere" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.club;
    return {
      meta: [
        { title: `${c.name} — CampuSphere Clubs` },
        { name: "description", content: c.about.slice(0, 155) },
        { property: "og:title", content: `${c.name} — CampuSphere Clubs` },
        { property: "og:description", content: c.tagline },
      ],
    };
  },
  component: ClubDetail,
});

function ClubDetail() {
  const { club } = Route.useLoaderData();
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl border border-border bg-card elevate">
        <div className={`h-40 bg-gradient-to-br sm:h-52 ${club.gradient}`} />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 p-6 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <span className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-border bg-card text-4xl elevate">{club.emoji}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-display text-2xl font-semibold">{club.name}</h1>
                <SoftBadge tone="muted">{club.category}</SoftBadge>
                {club.recruiting ? <SoftBadge tone="success">Recruiting</SoftBadge> : null}
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">{club.tagline}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" onClick={() => toast.success("Following club")}>Follow</Button>
            <Button variant="hero" onClick={() => toast.success(`Application sent to ${club.name}`)}>Join club</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="about">
            <TabsList className="rounded-xl">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="wins">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4 space-y-4">
              <Surface>
                <h2 className="font-display text-sm font-semibold">About</h2>
                <p className="mt-2 text-sm text-muted-foreground">{club.about}</p>
                <h2 className="mt-5 font-display text-sm font-semibold">Mission</h2>
                <p className="mt-2 text-sm text-muted-foreground">{club.mission}</p>
              </Surface>
            </TabsContent>
            <TabsContent value="events" className="mt-4 grid gap-4 sm:grid-cols-2">
              <Surface>
                <h3 className="font-display text-sm font-semibold">Upcoming</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {club.upcoming.map((e: string) => (
                    <li key={e} className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-primary" />{e}</li>
                  ))}
                </ul>
              </Surface>
              <Surface>
                <h3 className="font-display text-sm font-semibold">Past</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {club.past.map((e: string) => <li key={e}>{e}</li>)}
                </ul>
              </Surface>
            </TabsContent>
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {club.gallery.map((g: string, i: number) => (
                  <div key={g} className={`grid aspect-square place-items-center rounded-2xl bg-gradient-to-br p-3 text-center text-xs font-medium text-primary-foreground ${club.gradient}`} style={{ opacity: 1 - i * 0.12 }}>{g}</div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="wins" className="mt-4">
              <Surface>
                <ul className="space-y-3 text-sm">
                  {club.achievements.map((a: string) => (
                    <li key={a} className="flex gap-3"><Award className="h-4 w-4 shrink-0 text-warning" />{a}</li>
                  ))}
                </ul>
              </Surface>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Surface>
            <p className="font-display text-sm font-semibold">Team</p>
            <p className="mt-3 text-xs text-muted-foreground">Faculty coordinator</p>
            <p className="text-sm font-medium">{club.coordinator}</p>
            <p className="mt-4 text-xs text-muted-foreground">Student leads</p>
            <ul className="mt-2 space-y-2">
              {club.leads.map((l: Club["leads"][number]) => (
                <li key={l.name} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-xs font-semibold text-accent-foreground">
                    {l.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{l.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Surface>
          <Surface>
            <p className="flex items-center gap-2 font-display text-sm font-semibold"><Users className="h-4 w-4" /> {club.members.toLocaleString()} members</p>
            <div className="mt-3 flex flex-wrap gap-2">
            {club.socials.map((s: Club["socials"][number]) => <SoftBadge key={s.label} tone="brand">{s.label} · {s.handle}</SoftBadge>)}
            </div>
          </Surface>
          <Surface>
            <p className="font-display text-sm font-semibold">Other clubs</p>
            <ul className="mt-3 space-y-2">
              {clubs.filter((c) => c.id !== club.id).slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link to="/app/clubs/$clubId" params={{ clubId: c.id }} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/50">
                    <span className="text-lg">{c.emoji}</span>
                    <span className="truncate text-sm font-medium">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>
    </div>
  );
}
