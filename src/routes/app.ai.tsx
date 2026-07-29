import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Surface } from "@/components/common";

export const Route = createFileRoute("/app/ai")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CampuSphere" },
      { name: "description", content: "Ask the campus AI about rooms, events, deadlines, notes and concepts — answers grounded in campus data." },
      { property: "og:title", content: "AI Assistant — CampuSphere" },
      { property: "og:description", content: "Ask the campus AI about rooms, events, deadlines, notes and concepts — answers grounded in campus data." },
    ],
  }),
  component: AiPage,
});

const suggestions = [
  "Where is Block C?",
  "Summarize this PDF",
  "Recommend events for me",
  "Explain Binary Search",
  "Find AI workshops",
];

type Msg = { role: "user" | "assistant"; text: string };

const canned: Record<string, string> = {
  "Where is Block C?":
    "Block C (Innovation Arena) is on the north-east side of campus, a 6 minute walk from the Central Library. It's open 24 hours and houses Labs 1–6 plus the hackathon arena.",
  "Recommend events for me":
    "Based on your Coding Club membership and your ML coursework: **HackSpire 2026** (Aug 7, 64 seats left), **Applied AI Summit** (Aug 12, only 18 seats left) and **Founders' Pitch Day** if you want to pitch LectureLens.",
  "Explain Binary Search":
    "Binary search repeatedly halves a sorted range: compare the middle element to your target, discard the half that can't contain it, repeat. That gives O(log n) time. The classic pitfall is the loop invariant — keep `lo` inclusive and `hi` exclusive and you'll avoid off-by-one errors.",
};

function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            canned[text] ??
            "Here's what I found across campus data: I can pull up class schedules, event registrations, study material and building locations. This demo runs on sample data, so try one of the suggested prompts for a full answer.",
        },
      ]);
    }, 900);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-3xl gradient-brand text-primary-foreground animate-float">
            <Bot className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold">Ask CampuSphere AI</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Navigation, deadlines, event recommendations, concept explanations — grounded in your campus.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>
                <Sparkles /> {s}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-5 overflow-y-auto pb-6 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
              {m.role === "assistant" ? (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </span>
              ) : null}
              <div className={m.role === "user" ? "max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground" : "max-w-[80%] text-sm leading-relaxed"}>
                {m.text}
              </div>
            </div>
          ))}
          {thinking ? (
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <span className="animate-pulse text-sm text-muted-foreground">Thinking…</span>
            </div>
          ) : null}
        </div>
      )}

      <Surface className="p-2">
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your campus…"
            className="min-h-[52px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <Button variant="hero" size="icon" type="submit" aria-label="Send message" disabled={thinking}>
            <Send />
          </Button>
        </form>
      </Surface>
    </div>
  );
}
