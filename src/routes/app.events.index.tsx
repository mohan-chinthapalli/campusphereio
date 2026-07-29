import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, EmptyState } from "@/components/common";
import { EventCard } from "@/components/cards";
import { events } from "@/lib/data";

export const Route = createFileRoute("/app/events/")({
  head: () => ({
    meta: [
      { title: "Event Explorer — CampuSphere" },
      { name: "description", content: "Discover hackathons, fests, workshops and talks on campus with live seats, prizes and instant registration." },
      { property: "og:title", content: "Event Explorer — CampuSphere" },
      { property: "og:description", content: "Discover hackathons, fests, workshops and talks on campus with live seats, prizes and instant registration." },
    ],
  }),
  component: EventsPage,
});

const categories = ["All", "Hackathon", "Cultural", "Tech Talk", "Entrepreneurship", "Workshop", "Sports"];

function EventsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = events.filter(
    (e) => (cat === "All" || e.category === cat) && e.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Event Explorer"
        title="What's happening on campus"
        description="126 events this month across hackathons, culture, sport and industry talks."
        actions={<Button variant="hero"><SlidersHorizontal /> Filters</Button>}
      />

      <div className="sticky top-16 z-20 rounded-2xl border border-border p-3 glass">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events…" className="h-11 rounded-xl pl-9" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "hero" : "outline"} onClick={() => setCat(c)}>
                {c}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {list.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <EmptyState icon={<Search className="h-6 w-6" />} title="No events matched" description="Try a different category or clear your search." action={<Button variant="outline" onClick={() => { setCat("All"); setQ(""); }}>Reset filters</Button>} />
      )}
    </div>
  );
}
