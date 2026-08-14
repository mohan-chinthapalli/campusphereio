/**
 * Mock document bodies for the reader.
 * ------------------------------------
 * Each material is rendered as a paginated academic document. Replace
 * `getDocumentPages()` with a real fetch + PDF text extraction later — the
 * reader and the AI assistant both consume ONLY this function's output.
 */

import { materials, semesterCatalog } from "@/lib/data";
import type { Material } from "@/lib/data";

export type DocumentPage = {
  heading: string;
  paragraphs: string[];
};

export type StudyDocument = {
  material: Material;
  subjectName: string;
  pages: DocumentPage[];
};

function subjectName(code: string) {
  for (const sem of semesterCatalog) {
    const hit = sem.subjects.find((s) => s.code === code);
    if (hit) return hit.name;
  }
  return code;
}

const OUTLINE: { heading: string; body: (subject: string) => string[] }[] = [
  {
    heading: "Unit 1 — Introduction and Scope",
    body: (s) => [
      `${s} studies the principles, models and trade-offs that engineers apply when designing dependable systems. This unit establishes the vocabulary used throughout the course and situates ${s} within the broader computer science curriculum.`,
      `Formally, we treat the subject as a set of abstractions layered over a physical or mathematical substrate. Each abstraction hides detail from the layer above while exposing a contract the layer above may rely on. Understanding where an abstraction leaks is the single most valuable skill this course develops.`,
      `Learning outcomes: explain the core terminology of ${s}; compare competing designs using explicit criteria; analyse a given scenario and justify a choice of technique; and evaluate the cost of an approach in time, space and complexity of implementation.`,
    ],
  },
  {
    heading: "Unit 2 — Core Models and Definitions",
    body: (s) => [
      `A model is a deliberate simplification. In ${s} the standard model isolates three concerns: the state held by the system, the operations permitted on that state, and the invariants that must hold before and after every operation. Reasoning about correctness means proving invariants are preserved.`,
      `Definition 2.1 — A configuration is a complete snapshot of system state at a point in time. Definition 2.2 — A transition is a permitted mapping from one configuration to another. Definition 2.3 — An execution is a finite or infinite sequence of transitions beginning at an initial configuration.`,
      `Worked example: given a system with three components and a shared resource, enumerate the reachable configurations, mark those that violate the mutual-exclusion invariant, and show that a correct protocol makes those configurations unreachable rather than merely unlikely.`,
    ],
  },
  {
    heading: "Unit 3 — Algorithms and Techniques",
    body: (s) => [
      `The techniques introduced here are the practical core of ${s}. Each is presented as: the problem it solves, the assumptions it requires, a step-by-step procedure, and its asymptotic cost.`,
      `Technique A (divide and structure): partition the input into independent sub-problems, solve each recursively, and combine. Cost is typically O(n log n) when the combine step is linear. This applies whenever the sub-problems do not share mutable state.`,
      `Technique B (incremental refinement): begin with a feasible but poor solution and repeatedly apply improving transformations until no improvement is possible. Termination requires a monotonically decreasing potential function bounded below.`,
      `Technique C (caching and memoisation): trade space for time by storing the results of expensive deterministic computations. Correctness depends on the cached function being pure; invalidation strategy dominates real-world performance.`,
    ],
  },
  {
    heading: "Unit 4 — Analysis, Trade-offs and Case Studies",
    body: (s) => [
      `Analysis in ${s} is comparative rather than absolute. A technique is never "best"; it is best given a workload, a failure model and a cost budget. Always state your assumptions before quoting a result.`,
      `Case study: a university-scale deployment serving 50,000 concurrent users. The naive design saturates at 4,000 requests per second because of a single serialising bottleneck. Applying Technique C at the read path and Technique A at the batch path raises throughput by roughly an order of magnitude with no change to the correctness argument.`,
      `Common examination question: given two designs with identical asymptotic complexity, argue which is preferable in practice and justify your answer using constant factors, memory locality and operational complexity.`,
    ],
  },
  {
    heading: "Unit 5 — Revision, Formulae and Question Bank",
    body: (s) => [
      `Key formulae: amortised cost = total cost of a sequence / number of operations; speed-up S(p) = T(1) / T(p); Amdahl's law S ≤ 1 / ((1 - f) + f/p) where f is the parallelisable fraction.`,
      `Frequently asked (previous years): 1. Define the three core abstractions of ${s} and give one example of each. 2. Prove that the protocol in Unit 2 satisfies mutual exclusion and is deadlock-free. 3. Compare Technique A and Technique B for a workload with high update frequency. 4. Explain, with a diagram, how caching alters the failure model.`,
      `Revision advice: work the numerical problems before re-reading theory. Most marks in this paper are awarded for a correct justification, not for the final value.`,
    ],
  },
];

export function getDocumentPages(material: Material): StudyDocument {
  const name = subjectName(material.subject);
  return {
    material,
    subjectName: name,
    pages: OUTLINE.map((section) => ({
      heading: section.heading,
      paragraphs: section.body(name),
    })),
  };
}

export function getMaterialById(id: string) {
  return materials.find((m) => m.id === id);
}

/** Flattened plain text used as LLM grounding context. */
export function documentText(doc: StudyDocument, pageIndex?: number) {
  const pages = pageIndex === undefined ? doc.pages : [doc.pages[pageIndex]!];
  return pages
    .map((p) => `## ${p.heading}\n${p.paragraphs.join("\n")}`)
    .join("\n\n");
}
