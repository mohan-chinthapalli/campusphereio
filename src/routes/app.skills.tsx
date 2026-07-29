import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader, StatCard } from "@/components/common";
import { SessionCard } from "@/components/cards";
import { skillSessions } from "@/lib/data";

export const Route = createFileRoute("/app/skills")({
  head: () => ({
    meta: [
      { title: "Faculty Skill Hub — CampuSphere" },
      { name: "description", content: "Faculty-led sessions in AI, web development, DSA, cloud, photography, research and communication." },
      { property: "og:title", content: "Faculty Skill Hub — CampuSphere" },
      { property: "og:description", content: "Faculty-led sessions in AI, web development, DSA, cloud, photography, research and communication." },
    ],
  }),
  component: SkillsPage,
});

const cats = ["All", "AI", "Web Development", "DSA", "Cloud", "Photography", "Research", "Communication"];

function SkillsPage() {
  const [cat, setCat] = useState("All");
  const list = skillSessions.filter((s) => cat === "All" || s.category === cat);
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Faculty Skill Hub" title="Learn from the people who teach you" description="Professors run practical, outside-the-syllabus programmes every semester." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live programmes" value="38" />
        <StatCard label="Enrolments" value="4,231" tone="violet" />
        <StatCard label="Faculty teaching" value="52" tone="cyan" />
        <StatCard label="Avg. rating" value="4.8" tone="warning" />
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map((c) => <Button key={c} size="sm" variant={cat === c ? "hero" : "outline"} onClick={() => setCat(c)}>{c}</Button>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => <SessionCard key={s.id} session={s} />)}
      </div>
    </div>
  );
}
