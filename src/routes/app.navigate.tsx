import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footprints, MapPin, Navigation, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, SoftBadge, Surface } from "@/components/common";
import { campusPlaces } from "@/lib/data";

export const Route = createFileRoute("/app/navigate")({
  head: () => ({
    meta: [
      { title: "Campus Navigation — CampuSphere" },
      { name: "description", content: "Find any block, lab, library or venue on campus with walking times and opening hours." },
      { property: "og:title", content: "Campus Navigation — CampuSphere" },
      { property: "og:description", content: "Find any block, lab, library or venue on campus with walking times and opening hours." },
    ],
  }),
  component: NavigatePage,
});

function NavigatePage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(campusPlaces[0].id);
  const list = campusPlaces.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const selected = campusPlaces.find((p) => p.id === active)!;

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Campus Navigation" title="Never be late again" description="Search any building, lab or venue and get walking directions from where you are." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a place…" className="h-11 rounded-xl pl-9" />
          </div>
          <ul className="space-y-2">
            {list.map((p) => (
              <li key={p.id}>
                <button onClick={() => setActive(p.id)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${active === p.id ? "border-primary bg-accent" : "border-border hover:bg-accent/50"}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{p.type} · {p.open}</span>
                  </span>
                  <SoftBadge tone="muted"><Footprints className="h-3 w-3" />{p.walk}</SoftBadge>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Surface className="p-0">
          <div className="relative h-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-cyan/10 to-violet/10 sm:h-[560px]">
            <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="var(--color-border)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {campusPlaces.map((p) => (
              <button key={p.id} onClick={() => setActive(p.id)} style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${active === p.id ? "gradient-brand text-primary-foreground scale-110 shadow-[var(--shadow-glow)]" : "bg-card text-foreground elevate hover:scale-105"}`}>
                <MapPin className="mr-1 inline h-3 w-3" />{p.name.split(" — ")[0]}
              </button>
            ))}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-4 glass">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold">{selected.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{selected.type} · {selected.floors} floors · Open {selected.open}</p>
                </div>
                <Button variant="hero" size="sm"><Navigation /> {selected.walk} walk</Button>
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}
