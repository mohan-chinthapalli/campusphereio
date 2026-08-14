import { useEffect, useRef, useState } from "react";
import { Bot, Info, Loader2, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  AI_DISCLAIMER,
  SUGGESTED_DOUBTS,
  askStudyAssistant,
} from "@/lib/ai-study-assistant";
import type { ChatMessage } from "@/lib/ai-study-assistant";

type Props = {
  documentTitle: string;
  currentSection: string;
  /** Extracted text of the open document / current section — the LLM grounding. */
  documentContext: string;
  onClose?: () => void;
  className?: string;
};

export function AiDoubtPanel({
  documentTitle,
  currentSection,
  documentContext,
  onClose,
  className,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: q };
    const history = messages;
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const answer = await askStudyAssistant({
        question: q,
        documentContext,
        documentTitle,
        currentSection,
        history,
      });
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: "Sorry — I couldn't reach the study assistant. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card elevate",
        className,
      )}
    >
      <header className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground">
          <Bot className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold leading-tight">AI Study Assistant</p>
          <p className="truncate text-[11px] text-muted-foreground">
            Reading context: {currentSection}
          </p>
        </div>
        {onClose ? (
          <Button variant="ghost" size="icon" aria-label="Close assistant" onClick={onClose}>
            <X />
          </Button>
        ) : null}
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 no-scrollbar">
        {messages.length === 0 && !loading ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-border bg-accent/40 p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask a doubt about this document
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Answers are grounded in “{documentTitle}” — not the open internet.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_DOUBTS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-left text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "gradient-brand text-primary-foreground"
                  : "border border-border bg-accent/40 text-foreground",
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-accent/40 px-3.5 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Reading your material…
            </div>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void ask(input);
        }}
        className="border-t border-border p-3"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a doubt from this page…"
            aria-label="Ask a doubt"
            className="h-10 rounded-xl"
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            className="h-10 w-10 shrink-0"
            aria-label="Send question"
            disabled={loading || !input.trim()}
          >
            <Send />
          </Button>
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-[10px] leading-snug text-muted-foreground">
          <Info className="mt-px h-3 w-3 shrink-0" /> {AI_DISCLAIMER}
        </p>
      </form>
    </div>
  );
}
