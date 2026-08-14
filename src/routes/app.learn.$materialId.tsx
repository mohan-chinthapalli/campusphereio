import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Bot,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SoftBadge, Surface } from "@/components/common";
import { AiDoubtPanel } from "@/components/ai-doubt-panel";
import { documentText, getDocumentPages, getMaterialById } from "@/lib/document-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/learn/$materialId")({
  loader: ({ params }) => {
    const material = getMaterialById(params.materialId);
    if (!material) throw notFound();
    return { title: material.title, subject: material.subject };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — CampuSphere` : "Study material — CampuSphere";
    const description = loaderData
      ? `Read ${loaderData.title} (${loaderData.subject}) and ask doubts to the built-in AI Study Assistant.`
      : "Read academic material with an in-context AI Study Assistant.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ReaderPage,
});

function ReaderPage() {
  const { materialId } = Route.useParams();
  const material = getMaterialById(materialId)!;
  const doc = useMemo(() => getDocumentPages(material), [material]);
  const [page, setPage] = useState(0);
  const [assistantOpen, setAssistantOpen] = useState(true);

  const current = doc.pages[page]!;
  // Context handed to the LLM: the whole document plus the section in focus.
  const context = useMemo(
    () => `${documentText(doc, page)}\n\n(Full document outline)\n${documentText(doc)}`,
    [doc, page],
  );

  const assistant = (
    <AiDoubtPanel
      documentTitle={material.title}
      currentSection={current.heading}
      documentContext={context}
    />
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/app/learn"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Learning Hub
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Bookmarked")}>
            <Bookmark /> Save
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Link copied")}>
            <Share2 /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Download started")}>
            <Download /> Download
          </Button>
          {/* Mobile / tablet: assistant as a slide-over */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="hero" size="sm" className="xl:hidden">
                <Bot /> Ask a Doubt
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full p-3 sm:max-w-md">
              <SheetTitle className="sr-only">AI Study Assistant</SheetTitle>
              <div className="h-full pt-6">{assistant}</div>
            </SheetContent>
          </Sheet>
          <Button
            variant="hero"
            size="sm"
            className="hidden xl:inline-flex"
            onClick={() => setAssistantOpen((v) => !v)}
          >
            <Bot /> {assistantOpen ? "Hide assistant" : "Ask a Doubt"}
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-5", assistantOpen ? "xl:grid-cols-[1fr_380px]" : "xl:grid-cols-1")}>
        <div className="min-w-0 space-y-4">
          <Surface className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-xl">
                {material.emoji}
              </span>
              <div className="min-w-0">
                <h1 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                  {material.title}
                </h1>
                <p className="mt-1 text-xs text-muted-foreground">
                  {doc.subjectName} · {material.subject} · Semester {material.semester} ·{" "}
                  {material.author} · {material.size}
                </p>
              </div>
              <SoftBadge tone="brand" className="ml-auto hidden shrink-0 sm:inline-flex">
                <FileText className="h-3 w-3" /> {material.type}
              </SoftBadge>
            </div>
          </Surface>

          {/* Section rail */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {doc.pages.map((p, i) => (
              <button
                key={p.heading}
                onClick={() => setPage(i)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs transition",
                  i === page
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30",
                )}
              >
                {p.heading.split("—")[0]!.trim()}
              </button>
            ))}
          </div>

          {/* Document surface */}
          <article className="rounded-2xl border border-border bg-card p-6 elevate sm:p-9">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Page {page + 1} of {doc.pages.length}
            </p>
            <h2 className="mt-2 font-display text-lg font-semibold sm:text-xl">{current.heading}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/90">
              {current.paragraphs.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </article>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {page + 1} / {doc.pages.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === doc.pages.length - 1}
              onClick={() => setPage((p) => Math.min(doc.pages.length - 1, p + 1))}
            >
              Next <ChevronRight />
            </Button>
          </div>
        </div>

        {assistantOpen ? (
          <aside className="hidden xl:block">
            <div className="sticky top-20 h-[calc(100vh-6.5rem)]">{assistant}</div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
