import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Pin } from "lucide-react";
import { PageHeader, SoftBadge, Surface } from "@/components/common";
import { announcements } from "@/lib/data";

export const Route = createFileRoute("/app/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — CampuSphere" },
      { name: "description", content: "Official announcements from the examination cell, placements, library and campus operations." },
      { property: "og:title", content: "Announcements — CampuSphere" },
      { property: "og:description", content: "Official announcements from the examination cell, placements, library and campus operations." },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Announcements" title="Everything official, in one feed" description="Academics, placements, campus operations and research updates." />
      <ul className="space-y-4">
        {announcements.map((a) => (
          <li key={a.id}>
            <Surface hover className="flex gap-4">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${a.priority === "high" ? "bg-destructive/12 text-destructive" : "bg-primary/10 text-primary"}`}>
                {a.priority === "high" ? <Pin className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-base font-semibold">{a.title}</h2>
                  <SoftBadge tone={a.priority === "high" ? "danger" : "muted"}>{a.tag}</SoftBadge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">{a.author} · {a.ago}</p>
              </div>
            </Surface>
          </li>
        ))}
      </ul>
    </div>
  );
}
