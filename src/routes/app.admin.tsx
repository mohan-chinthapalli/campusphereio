import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SoftBadge, StatCard, Surface } from "@/components/common";
import { Button } from "@/components/ui/button";
import { adminStats, announcements, departmentSplit, events, weekActivity } from "@/lib/data";

export const Route = createFileRoute("/app/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — CampuSphere" },
      { name: "description", content: "University-wide view of engagement, events, clubs and skill programme adoption." },
      { property: "og:title", content: "Admin Console — CampuSphere" },
      { property: "og:description", content: "University-wide view of engagement, events, clubs and skill programme adoption." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const maxDept = Math.max(...departmentSplit.map((d) => d.value));
  const maxWeek = Math.max(...weekActivity.map((d) => d.hours));
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Administration" title="Campus at a glance" description="Engagement, operations and programme adoption across Northgate University." actions={<Button variant="hero">Export report</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((s) => <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Surface>
          <h2 className="font-display text-base font-semibold">Students by school</h2>
          <ul className="mt-4 space-y-3">
            {departmentSplit.map((d) => (
              <li key={d.name}>
                <div className="flex justify-between text-xs"><span>{d.name}</span><span className="text-muted-foreground">{d.value.toLocaleString()}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full gradient-brand" style={{ width: `${(d.value / maxDept) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface>
          <h2 className="font-display text-base font-semibold">Platform engagement this week</h2>
          <div className="mt-6 flex h-44 items-end gap-3">
            {weekActivity.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-primary/80" style={{ height: `${(d.hours / maxWeek) * 100}%` }} />
                </div>
                <span className="text-[11px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </Surface>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Surface>
          <h2 className="font-display text-base font-semibold">Events awaiting approval</h2>
          <ul className="mt-4 space-y-2">
            {events.slice(0, 4).map((e) => (
              <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.emoji} {e.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.organizer.club} · {e.date}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline">Review</Button>
                  <Button size="sm" variant="hero">Approve</Button>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface>
          <h2 className="font-display text-base font-semibold">Recent notices published</h2>
          <ul className="mt-4 space-y-3">
            {announcements.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.author} · {a.ago}</p>
                </div>
                <SoftBadge tone={a.priority === "high" ? "danger" : "muted"}>{a.tag}</SoftBadge>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </div>
  );
}
