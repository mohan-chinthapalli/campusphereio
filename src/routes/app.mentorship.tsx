import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, StatCard } from "@/components/common";
import { MentorCard } from "@/components/cards";
import { mentors } from "@/lib/data";

export const Route = createFileRoute("/app/mentorship")({
  head: () => ({
    meta: [
      { title: "Student Mentorship — CampuSphere" },
      { name: "description", content: "Find senior mentors by skill, branch or year and book sessions on interviews, resumes and projects." },
      { property: "og:title", content: "Student Mentorship — CampuSphere" },
      { property: "og:description", content: "Find senior mentors by skill, branch or year and book sessions on interviews, resumes and projects." },
    ],
  }),
  component: MentorshipPage,
});

const skills = ["All", "DSA", "Interview", "Resume", "React", "Communication", "Robotics"];

function MentorshipPage() {
  const [skill, setSkill] = useState("All");
  const [q, setQ] = useState("");
  const list = mentors.filter(
    (m) => (skill === "All" || m.skills.includes(skill)) &&
      (m.name.toLowerCase().includes(q.toLowerCase()) || m.branch.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Mentorship" title="Seniors who've been exactly where you are" description="Book a 30-minute session on interviews, resumes, projects or picking a specialisation." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active mentors" value="312" />
        <StatCard label="Sessions booked" value="5,940" tone="violet" />
        <StatCard label="Avg. rating" value="4.8" tone="warning" />
        <StatCard label="Median reply" value="3h" tone="cyan" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or branch…" className="h-11 rounded-xl pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {skills.map((s) => <Button key={s} size="sm" variant={skill === s ? "hero" : "outline"} onClick={() => setSkill(s)}>{s}</Button>)}
        </div>
      </div>
      {list.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{list.map((m) => <MentorCard key={m.id} mentor={m} />)}</div>
      ) : (
        <EmptyState icon={<Search className="h-6 w-6" />} title="No mentors matched" description="Try a different skill filter." />
      )}
    </div>
  );
}
