import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bookmark, CalendarDays, Clock, MapPin, Share2, Trophy, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Countdown, SoftBadge, Surface } from "@/components/common";
import { events } from "@/lib/data";

export const Route = createFileRoute("/app/events/$eventId")({
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event not found — CampuSphere" }, { name: "robots", content: "noindex" }] };
    }
    const e = loaderData.event;
    return {
      meta: [
        { title: `${e.title} — CampuSphere Events` },
        { name: "description", content: e.description.slice(0, 155) },
        { property: "og:title", content: `${e.title} — CampuSphere Events` },
        { property: "og:description", content: e.tagline },
      ],
    };
  },
  component: EventDetail,
});

function useCountdown(iso: string) {
  const [left, setLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(iso).getTime() - Date.now());
      const p = (n: number) => String(n).padStart(2, "0");
      setLeft({
        d: p(Math.floor(diff / 86400000)),
        h: p(Math.floor(diff / 3600000) % 24),
        m: p(Math.floor(diff / 60000) % 60),
        s: p(Math.floor(diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [iso]);
  return left;
}

function EventDetail() {
  const { event } = Route.useLoaderData();
  const t = useCountdown(event.startsAt);
  const [saved, setSaved] = useState(false);
  const fill = Math.round(((event.seatsTotal - event.seatsLeft) / event.seatsTotal) * 100);

  return (
    <div className="space-y-7">
      <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-primary-foreground sm:p-10 ${event.gradient}`}>
        <div className="flex flex-wrap items-center gap-2">
          <SoftBadge tone="muted" className="bg-card/20 text-primary-foreground">{event.category}</SoftBadge>
          {event.tags.map((tag) => (
            <SoftBadge key={tag} tone="muted" className="bg-card/15 text-primary-foreground">{tag}</SoftBadge>
          ))}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{event.emoji} {event.title}</h1>
        <p className="mt-2 max-w-xl text-sm opacity-90">{event.tagline}</p>
        <div className="mt-6 grid max-w-md grid-cols-4 gap-2">
          <Countdown label="Days" value={t.d} />
          <Countdown label="Hrs" value={t.h} />
          <Countdown label="Min" value={t.m} />
          <Countdown label="Sec" value={t.s} />
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          <Button variant="glass" size="lg" onClick={() => toast.success(`Registered for ${event.title}`)}>Register now</Button>
          <Button variant="glass" size="lg" onClick={() => { setSaved(!saved); toast.success(saved ? "Removed" : "Bookmarked"); }}>
            <Bookmark className={saved ? "fill-current" : ""} /> {saved ? "Saved" : "Bookmark"}
          </Button>
          <Button variant="glass" size="lg" onClick={() => toast.success("Link copied")}><Share2 /> Share</Button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="about">
            <TabsList className="rounded-xl">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <Surface><p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p></Surface>
            </TabsContent>
            <TabsContent value="agenda" className="mt-4">
              <Surface>
                <ul className="space-y-3">
                  {event.agenda.map((a) => (
                    <li key={a.time} className="flex gap-4 border-l-2 border-primary pl-4">
                      <span className="w-14 shrink-0 font-display text-sm font-semibold">{a.time}</span>
                      <span className="text-sm text-muted-foreground">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </Surface>
            </TabsContent>
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {event.gallery.map((g, i) => (
                  <div key={g} className={`grid aspect-square place-items-center rounded-2xl bg-gradient-to-br p-3 text-center text-xs font-medium text-primary-foreground ${event.gradient}`} style={{ opacity: 1 - i * 0.12 }}>
                    {g}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="discussion" className="mt-4">
              <Surface>
                <ul className="space-y-4">
                  {event.discussion.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-xs font-semibold text-accent-foreground">
                        {d.user.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{d.user} <span className="text-xs font-normal text-muted-foreground">· {d.ago}</span></p>
                        <p className="text-sm text-muted-foreground">{d.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="soft" className="mt-4 w-full" onClick={() => toast("Discussion is read-only in this demo")}>
                  <MessageSquare /> Join the discussion
                </Button>
              </Surface>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Surface>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><CalendarDays className="h-4 w-4 shrink-0 text-primary" />{event.date}</li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 shrink-0 text-primary" />{event.time}</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" />{event.venue}</li>
              <li className="flex items-center gap-3"><Trophy className="h-4 w-4 shrink-0 text-primary" />{event.prize}</li>
              <li className="flex items-center gap-3"><Users className="h-4 w-4 shrink-0 text-primary" />{event.participants.toLocaleString()} participants</li>
            </ul>
            <div className="mt-4">
              <Progress value={fill} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">{event.seatsLeft} of {event.seatsTotal} seats left</p>
            </div>
            <Button variant="hero" className="mt-4 w-full" onClick={() => toast.success("Seat reserved")}>Reserve my seat</Button>
          </Surface>

          <Surface>
            <p className="font-display text-sm font-semibold">Organizer</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground">
                {event.organizer.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{event.organizer.name}</p>
                <p className="truncate text-xs text-muted-foreground">{event.organizer.club}</p>
              </div>
            </div>
            <p className="mt-3 truncate text-xs text-muted-foreground">{event.organizer.email}</p>
            <Button variant="outline" className="mt-4 w-full" asChild><Link to="/app/clubs">View organizing club</Link></Button>
          </Surface>

          <Surface>
            <p className="font-display text-sm font-semibold">More events</p>
            <ul className="mt-3 space-y-2">
              {events.filter((e) => e.id !== event.id).slice(0, 3).map((e) => (
                <li key={e.id}>
                  <Link to="/app/events/$eventId" params={{ eventId: e.id }} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/50">
                    <span className="text-lg">{e.emoji}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{e.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{e.date}</p>
                    </div>
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
