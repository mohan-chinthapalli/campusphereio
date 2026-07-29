import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, StatCard } from "@/components/common";
import { ClubCard } from "@/components/cards";
import { clubs } from "@/lib/data";

export const Route = createFileRoute("/app/clubs/")({
  head: () => ({
    meta: [
      { title: "Club Explorer — CampuSphere" },
      { name: "description", content: "Find every club and society on campus, see what they do, and join in one click." },
      { property: "og:title", content: "Club Explorer — CampuSphere" },
      { property: "og:description", content: "Find every club and society on campus, see what they do, and join in one click." },
    ],
  }),
  component: ClubsPage,
});

const cats = ["All", "Technology", "Arts", "Business", "Literary"];

function ClubsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = clubs.filter((c) => (cat === "All" || c.category === cat) && c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Club Explorer" title="Find your people" description="64 clubs and societies. 9,318 memberships. Most are recruiting right now." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clubs" value="64" />
        <StatCard label="Recruiting now" value="41" tone="success" />
        <StatCard label="Events this month" value="126" tone="violet" />
        <StatCard label="Members" value="9,318" tone="cyan" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clubs…" className="h-11 rounded-xl pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {cats.map((c) => (
            <Button key={c} size="sm" variant={cat === c ? "hero" : "outline"} onClick={() => setCat(c)}>{c}</Button>
          ))}
        </div>
      </div>
      {list.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => <ClubCard key={c.id} club={c} />)}
        </div>
      ) : (
        <EmptyState icon={<Search className="h-6 w-6" />} title="No clubs found" description="Try another category." />
      )}
    </div>
  );
}
