import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, ProgressRing, StatCard, Surface } from "@/components/common";
import { MaterialCard } from "@/components/cards";
import { materials } from "@/lib/data";

export const Route = createFileRoute("/app/learn")({
  head: () => ({
    meta: [
      { title: "Learning Hub — CampuSphere" },
      { name: "description", content: "Notes, PDFs, lecture videos and previous-year papers with progress tracking and bookmarks." },
      { property: "og:title", content: "Learning Hub — CampuSphere" },
      { property: "og:description", content: "Notes, PDFs, lecture videos and previous-year papers with progress tracking and bookmarks." },
    ],
  }),
  component: LearnPage,
});

const tabs = ["All", "Notes", "PDF", "Video", "Paper", "Bookmarked"];

function LearnPage() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const list = materials.filter((m) => {
    const matchTab = tab === "All" || (tab === "Bookmarked" ? m.bookmarked : m.type === tab);
    return matchTab && m.title.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Learning Hub" title="Everything you need to study" description="Curated notes, papers and lecture videos from faculty and toppers." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Resources" value="1,284" />
        <StatCard label="Downloads" value="42k" tone="cyan" />
        <StatCard label="Bookmarked" value="3" tone="violet" />
        <Surface><ProgressRing value={57} label="Overall completion" /></Surface>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes, papers, videos…" className="h-11 rounded-xl pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((t) => <Button key={t} size="sm" variant={tab === t ? "hero" : "outline"} onClick={() => setTab(t)}>{t}</Button>)}
        </div>
      </div>
      {list.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((m) => <MaterialCard key={m.id} material={m} />)}
        </div>
      ) : (
        <EmptyState icon={<Search className="h-6 w-6" />} title="Nothing here yet" description="Try another filter or search term." />
      )}
    </div>
  );
}
