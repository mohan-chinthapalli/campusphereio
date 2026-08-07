import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, SoftBadge, StatCard, Surface } from "@/components/common";
import { MaterialCard } from "@/components/cards";
import { materials, materialTypes, semesterCatalog } from "@/lib/data";
import type { MaterialType } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/learn")({
  head: () => ({
    meta: [
      { title: "Learning Hub — CampuSphere" },
      { name: "description", content: "Search semester-wise notes, handwritten notes, question papers, PDFs, lab manuals and lecture videos for semesters 1 to 8." },
      { property: "og:title", content: "Learning Hub — CampuSphere" },
      { property: "og:description", content: "Semester 1 to 8 study materials: notes, handwritten notes, previous year papers, PDFs, lab manuals and videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnPage,
});

const quickSearches = ["Operating Systems", "Handwritten", "Previous Year", "Machine Learning", "Lab Manual"];

function LearnPage() {
  const [semester, setSemester] = useState<number>(6);
  const [type, setType] = useState<MaterialType | "All">("All");
  const [subject, setSubject] = useState<string>("All");
  const [onlySaved, setOnlySaved] = useState(false);
  const [q, setQ] = useState("");

  const sem = semesterCatalog.find((s) => s.semester === semester)!;

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return materials.filter((m) => {
      if (query) {
        const hit = `${m.title} ${m.subject} ${m.author} ${m.type}`.toLowerCase().includes(query);
        if (!hit) return false;
      } else if (m.semester !== semester) {
        return false;
      }
      if (type !== "All" && m.type !== type) return false;
      if (!query && subject !== "All" && m.subject !== subject) return false;
      if (onlySaved && !m.bookmarked) return false;
      return true;
    });
  }, [q, semester, type, subject, onlySaved]);

  const searching = q.trim().length > 0;

  const countFor = (t: MaterialType) =>
    materials.filter((m) => m.semester === semester && m.type === t).length;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Learning Hub"
        title="Find any material, semester 1 to 8"
        description="Search across notes, handwritten notes, question papers, textbooks, lab manuals and lecture videos."
      />

      {/* Floating search */}
      <Surface className="relative overflow-hidden p-5 sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search “DBMS question papers”, “handwritten DSA notes”, “Sem 3 lab manual”…"
            aria-label="Search study materials"
            className="h-12 rounded-2xl border-border/70 pl-11 pr-11 text-sm shadow-sm"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Try
          </span>
          {quickSearches.map((s) => (
            <button
              key={s}
              onClick={() => setQ(s)}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </Surface>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total resources" value={materials.length.toLocaleString()} />
        <StatCard label="Semesters covered" value="1 – 8" tone="cyan" />
        <StatCard label="Saved by you" value={materials.filter((m) => m.bookmarked).length.toString()} tone="violet" />
        <StatCard label="Subjects" value={semesterCatalog.reduce((n, s) => n + s.subjects.length, 0).toString()} />
      </div>

      {/* Semester blocks */}
      <section className="space-y-3">
        <h2 className="font-display text-sm font-semibold text-muted-foreground">Browse by semester</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {semesterCatalog.map((s) => {
            const active = !searching && s.semester === semester;
            return (
              <button
                key={s.semester}
                onClick={() => {
                  setSemester(s.semester);
                  setSubject("All");
                  setQ("");
                }}
                className={cn(
                  "rounded-2xl border p-3 text-left transition card-lift",
                  active
                    ? "border-primary/50 bg-primary/10 shadow-sm"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <p className="font-display text-base font-semibold">Sem {s.semester}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.year}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {materials.filter((m) => m.semester === s.semester).length} files
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section filters */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-semibold">
            {searching ? `Results for “${q}”` : `${sem.label} · ${sem.year}`}
          </h2>
          <span className="text-xs text-muted-foreground">{list.length} items</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <Button size="sm" variant={type === "All" ? "hero" : "outline"} onClick={() => setType("All")}>
            All sections
          </Button>
          {materialTypes.map((t) => (
            <Button key={t} size="sm" variant={type === t ? "hero" : "outline"} onClick={() => setType(t)} className="shrink-0">
              {t === "Handwritten" ? "Handwritten notes" : t === "Paper" ? "Question papers" : t}
              {!searching && <span className="ml-1.5 opacity-60">{countFor(t)}</span>}
            </Button>
          ))}
          <Button size="sm" variant={onlySaved ? "hero" : "outline"} onClick={() => setOnlySaved((v) => !v)} className="shrink-0">
            Bookmarked
          </Button>
        </div>

        {!searching && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSubject("All")}>
              <SoftBadge tone={subject === "All" ? "brand" : "muted"}>All subjects</SoftBadge>
            </button>
            {sem.subjects.map((s) => (
              <button key={s.code} onClick={() => setSubject(s.code)}>
                <SoftBadge tone={subject === s.code ? "brand" : "muted"}>
                  {s.emoji} {s.name}
                </SoftBadge>
              </button>
            ))}
          </div>
        )}
      </section>

      {list.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((m) => (
            <MaterialCard key={m.id} material={m} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="h-6 w-6" />}
          title="No materials found"
          description="Try another semester, section or search term."
        />
      )}
    </div>
  );
}
