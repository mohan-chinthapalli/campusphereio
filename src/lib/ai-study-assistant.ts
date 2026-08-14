/**
 * ============================================================
 *  AI STUDY ASSISTANT — SINGLE SWAP POINT FOR A REAL LLM
 * ============================================================
 * Everything the doubt-solver needs goes through `askStudyAssistant()`.
 * To go live, replace ONLY the body of `askStudyAssistant` with a call to
 * your backend server function (which holds the API key — never the browser):
 *
 *   export async function askStudyAssistant(req: DoubtRequest): Promise<string> {
 *     const res = await fetch("/api/ask-doubt", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(req),
 *     });
 *     const { answer } = await res.json();
 *     return answer;
 *   }
 *
 * The request object already carries the extracted document context, so the
 * prompt below can be reused verbatim server-side.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type DoubtRequest = {
  /** Student's question. */
  question: string;
  /** Text extracted from the document currently open in the reader. */
  documentContext: string;
  /** Title of the open document, for citation in the answer. */
  documentTitle: string;
  /** Section/page heading the student is currently reading. */
  currentSection: string;
  /** Prior turns of this reading session. */
  history: ChatMessage[];
};

/** Prompt sent to the model — keep in sync when moving server-side. */
export function buildPrompt(req: DoubtRequest) {
  return {
    system:
      "You are an AI study assistant embedded in a university learning platform. " +
      "Answer strictly using the provided course material. If the material does not " +
      "cover the question, say so and suggest what to consult. Be concise and precise.",
    user:
      `DOCUMENT: ${req.documentTitle}\n` +
      `CURRENT SECTION: ${req.currentSection}\n\n` +
      `--- COURSE MATERIAL ---\n${req.documentContext}\n--- END MATERIAL ---\n\n` +
      `STUDENT QUESTION: ${req.question}`,
  };
}

export const AI_DISCLAIMER =
  "AI-generated answers — verify with your course material or instructor.";

export const SUGGESTED_DOUBTS = [
  "Summarise this section in 5 bullet points",
  "Explain this with a simple example",
  "What is likely to be asked in the exam from here?",
  "Define the key terms on this page",
];

/* ------------------------------------------------------------------
 * MOCK IMPLEMENTATION — delete when the real API is wired in.
 * ------------------------------------------------------------------ */

function excerpt(text: string, words = 45) {
  return text.replace(/\s+/g, " ").split(" ").slice(0, words).join(" ").trim();
}

function mockAnswer(req: DoubtRequest) {
  const q = req.question.toLowerCase();
  const body = excerpt(req.documentContext, 60);

  if (q.includes("summar")) {
    return [
      `Here is a summary of **${req.currentSection}** from *${req.documentTitle}*:`,
      "",
      "• The section defines the core abstractions and the contract each layer exposes.",
      "• Correctness is argued through invariants preserved across every transition.",
      "• Techniques are compared by assumptions, procedure and asymptotic cost.",
      "• Trade-offs are always workload-relative — state assumptions before quoting results.",
      "• Marks in the exam come from justification, not the final numeric answer.",
    ].join("\n");
  }

  if (q.includes("example")) {
    return (
      `Using the material in **${req.currentSection}**:\n\n` +
      "Take a system with three components sharing one resource. Enumerate the reachable " +
      "configurations, mark the ones that break mutual exclusion, then show the protocol makes " +
      "those states unreachable. That is exactly the reasoning pattern the section describes — " +
      "the example is only a concrete instance of the invariant argument."
    );
  }

  if (q.includes("exam") || q.includes("asked")) {
    return (
      `From **${req.currentSection}** of *${req.documentTitle}*, expect:\n\n` +
      "1. Define the core abstractions and give one example of each.\n" +
      "2. Prove the protocol satisfies mutual exclusion and is deadlock-free.\n" +
      "3. Compare two techniques for a high-update workload.\n" +
      "4. A numerical question on amortised cost or Amdahl's law."
    );
  }

  if (q.includes("define") || q.includes("term")) {
    return (
      "Key terms in this section:\n\n" +
      "**Configuration** — a complete snapshot of system state at a point in time.\n" +
      "**Transition** — a permitted mapping from one configuration to another.\n" +
      "**Execution** — a sequence of transitions from an initial configuration.\n" +
      "**Invariant** — a property that must hold before and after every operation."
    );
  }

  return (
    `Based on *${req.documentTitle}* — ${req.currentSection}:\n\n` +
    `${body}…\n\n` +
    "In short: the section wants you to reason from the stated assumptions to a justified " +
    "choice, rather than memorise a result. If your doubt is about a specific line, quote it " +
    "and I will work through it step by step."
  );
}

/** ⬅️ THE ONE FUNCTION TO REPLACE WITH A REAL LLM CALL. */
export async function askStudyAssistant(req: DoubtRequest): Promise<string> {
  // buildPrompt(req) is what you will send to the model.
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  return mockAnswer(req);
}
