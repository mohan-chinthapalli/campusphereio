import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, Surface } from "@/components/common";

export const Route = createFileRoute("/app/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — CampuSphere" },
      { name: "description", content: "Tell us what to improve about your campus platform — courses, events, facilities or the product itself." },
      { property: "og:title", content: "Feedback — CampuSphere" },
      { property: "og:description", content: "Tell us what to improve about your campus platform — courses, events, facilities or the product itself." },
    ],
  }),
  component: FeedbackPage,
});

const topics = ["Product", "Events", "Clubs", "Facilities", "Courses"];

function FeedbackPage() {
  const [rating, setRating] = useState(4);
  const [topic, setTopic] = useState("Product");
  return (
    <div className="mx-auto max-w-2xl space-y-7">
      <PageHeader eyebrow="Feedback" title="Help us make campus better" description="Every submission is read by the student council and platform team." />
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
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`} className="p-1">
                  <Star className={n <= rating ? "h-7 w-7 fill-warning text-warning" : "h-7 w-7 text-muted-foreground"} />
                </button>
              ))}
            </div>
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
    </div>
  );
}
