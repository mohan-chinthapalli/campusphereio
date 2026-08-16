import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Surface, SoftBadge } from "@/components/common";

export const Route = createFileRoute("/app/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — CampuSphere" },
      { name: "description", content: "Share platform feedback and anonymous faculty course feedback for the semester." },
      { property: "og:title", content: "Feedback — CampuSphere" },
      { property: "og:description", content: "Share platform feedback and anonymous faculty course feedback for the semester." },
    ],
  }),
  component: FeedbackPage,
});

const topics = ["Product", "Events", "Clubs", "Facilities", "Courses"];

type FacultyEntry = {
  id: string;
  name: string;
  initials: string;
  subject: string;
  code: string;
  window: string;
  status: "open" | "submitted";
};

const facultyList: FacultyEntry[] = [
  { id: "f1", name: "Dr. Vikram Iyer", initials: "VI", subject: "Machine Learning", code: "CS601", window: "Closes 24 Aug", status: "open" },
  { id: "f2", name: "Dr. Shalini Reddy", initials: "SR", subject: "Compiler Design", code: "CS602", window: "Closes 24 Aug", status: "open" },
  { id: "f3", name: "Prof. Rajeev Menon", initials: "RM", subject: "Cloud Computing", code: "CS603", window: "Closes 24 Aug", status: "open" },
  { id: "f4", name: "Dr. Kavya Rao", initials: "KR", subject: "Cryptography & Security", code: "CS604", window: "Submitted 04 Aug", status: "submitted" },
];

const criteria = [
  { key: "clarity", label: "Clarity of teaching" },
  { key: "pace", label: "Pace & coverage" },
  { key: "support", label: "Doubt support" },
  { key: "fairness", label: "Fair evaluation" },
];

function Stars({ value, onChange, size = "h-7 w-7" }: { value: number; onChange: (n: number) => void; size?: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} aria-label={`${n} stars`} className="p-0.5 transition-transform hover:scale-110">
          <Star className={n <= value ? `${size} fill-warning text-warning` : `${size} text-muted-foreground`} />
        </button>
      ))}
    </div>
  );
}

function FacultyFeedbackForm({ entry, onDone }: { entry: FacultyEntry; onDone: () => void }) {
  const [scores, setScores] = useState<Record<string, number>>({ clarity: 4, pace: 4, support: 4, fairness: 4 });
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(`Anonymous feedback submitted for ${entry.name}`);
        onDone();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {criteria.map((c) => (
          <div key={c.key} className="space-y-1.5 rounded-xl border border-border p-3">
            <p className="text-sm font-medium">{c.label}</p>
            <Stars value={scores[c.key]} size="h-6 w-6" onChange={(n) => setScores((s) => ({ ...s, [c.key]: n }))} />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fac-notes">Comments (optional)</Label>
        <Textarea id="fac-notes" placeholder="What helped you most? What could be better?" className="min-h-28 rounded-xl" />
      </div>
      <p className="text-xs text-muted-foreground">Responses are anonymous and shared with faculty only as an aggregate after the window closes.</p>
      <div className="flex gap-2">
        <Button variant="hero" type="submit">Submit feedback</Button>
        <Button variant="outline" type="button" onClick={onDone}>Cancel</Button>
      </div>
    </form>
  );
}

function FeedbackPage() {
  const [rating, setRating] = useState(4);
  const [topic, setTopic] = useState("Product");
  const [openFaculty, setOpenFaculty] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>(["f4"]);

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <PageHeader eyebrow="Feedback" title="Help us make campus better" description="Every submission is read by the student council, platform team and the academic office." />

      <Tabs defaultValue="platform" className="space-y-5">
        <TabsList className="rounded-xl">
          <TabsTrigger value="platform" className="rounded-lg">Platform</TabsTrigger>
          <TabsTrigger value="faculty" className="rounded-lg">Faculty feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <Surface>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Thanks — your feedback was submitted");
              }}
            >
              <div className="space-y-2">
                <Label>Topic</Label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <Button key={t} type="button" size="sm" variant={topic === t ? "hero" : "outline"} onClick={() => setTopic(t)}>{t}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>How is your experience?</Label>
                <Stars value={rating} onChange={setRating} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Short summary" className="h-11 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea id="details" placeholder="What worked, what didn't, what you'd change…" className="min-h-32 rounded-xl" required />
              </div>
              <Button variant="hero" size="lg" className="w-full" type="submit">Submit feedback</Button>
            </form>
          </Surface>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <Surface className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">Semester 6 course feedback</p>
              <p className="mt-1 text-xs text-muted-foreground">Rate each faculty on teaching, pace, support and evaluation. All responses are anonymous.</p>
            </div>
          </Surface>

          {facultyList.map((f) => {
            const submitted = f.status === "submitted" || done.includes(f.id);
            const open = openFaculty === f.id;
            return (
              <Surface key={f.id} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-sm font-semibold">{f.initials}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold">{f.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{f.code} · {f.subject} · {f.window}</p>
                  </div>
                  {submitted ? (
                    <SoftBadge tone="success">Submitted</SoftBadge>
                  ) : (
                    <Button size="sm" variant={open ? "outline" : "hero"} onClick={() => setOpenFaculty(open ? null : f.id)}>
                      {open ? "Close" : "Give feedback"}
                    </Button>
                  )}
                </div>
                {open && !submitted ? (
                  <FacultyFeedbackForm
                    entry={f}
                    onDone={() => {
                      setDone((d) => [...d, f.id]);
                      setOpenFaculty(null);
                    }}
                  />
                ) : null}
              </Surface>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
