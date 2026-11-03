import type { Lang } from "@/data/i18n";
import { gbpText, type SectionId } from "@/data/gbp-text";

/*
  Google Business Profile check: the scoring.

  This file holds only what does not change with language: which questions
  exist, how much each is worth, and how each answer scores. All wording
  (questions, answers, advice) lives in data/gbp-text.ts in English and
  Spanish, so the score is identical in both languages.

  Weights follow what actually moves map pack ranking and conversion:
  verification and primary category first, then reviews, then completeness,
  then engagement signals.

  Everything runs in the browser. No API call, no cost, no rate limit.
*/

export type OptionDef = {
  value: string;
  /* 0 to 1, how much of this question's weight the answer earns */
  score: number;
};

export type QuestionDef = {
  id: string;
  section: SectionId;
  weight: number;
  options: OptionDef[];
};

export const questionDefs: QuestionDef[] = [
  {
    id: "verified",
    section: "foundation",
    weight: 14,
    options: [
      { value: "yes", score: 1 },
      { value: "claimed", score: 0.4 },
      { value: "no", score: 0 },
    ],
  },
  {
    id: "category",
    section: "foundation",
    weight: 12,
    options: [
      { value: "specific", score: 1 },
      { value: "broad", score: 0.4 },
      { value: "unsure", score: 0 },
    ],
  },
  {
    id: "secondary",
    section: "foundation",
    weight: 5,
    options: [
      { value: "several", score: 1 },
      { value: "few", score: 0.6 },
      { value: "none", score: 0 },
    ],
  },
  {
    id: "nap",
    section: "foundation",
    weight: 9,
    options: [
      { value: "yes", score: 1 },
      { value: "mostly", score: 0.5 },
      { value: "no", score: 0 },
    ],
  },
  {
    id: "reviews",
    section: "reviews",
    weight: 13,
    options: [
      { value: "many", score: 1 },
      { value: "some", score: 0.65 },
      { value: "few", score: 0.3 },
      { value: "none", score: 0 },
    ],
  },
  {
    id: "responses",
    section: "reviews",
    weight: 10,
    options: [
      { value: "all", score: 1 },
      { value: "negative", score: 0.55 },
      { value: "rarely", score: 0 },
    ],
  },
  {
    id: "asking",
    section: "reviews",
    weight: 8,
    options: [
      { value: "system", score: 1 },
      { value: "ad-hoc", score: 0.4 },
      { value: "no", score: 0 },
    ],
  },
  {
    id: "photos",
    section: "content",
    weight: 8,
    options: [
      { value: "many", score: 1 },
      { value: "some", score: 0.6 },
      { value: "few", score: 0.2 },
      { value: "none", score: 0 },
    ],
  },
  {
    id: "posts",
    section: "content",
    weight: 6,
    options: [
      { value: "weekly", score: 1 },
      { value: "sometimes", score: 0.5 },
      { value: "never", score: 0 },
    ],
  },
  {
    id: "services",
    section: "content",
    weight: 6,
    options: [
      { value: "full", score: 1 },
      { value: "partial", score: 0.5 },
      { value: "none", score: 0 },
    ],
  },
  {
    id: "hours",
    section: "details",
    weight: 5,
    options: [
      { value: "yes", score: 1 },
      { value: "basic", score: 0.6 },
      { value: "no", score: 0 },
    ],
  },
  {
    id: "website",
    section: "details",
    weight: 4,
    options: [
      { value: "yes", score: 1 },
      { value: "social", score: 0.4 },
      { value: "no", score: 0 },
    ],
  },
];

export const totalWeight = questionDefs.reduce((sum, q) => sum + q.weight, 0);

export type Answers = Record<string, string>;

export function scoreAnswers(answers: Answers): number {
  let earned = 0;
  for (const q of questionDefs) {
    const chosen = q.options.find((o) => o.value === answers[q.id]);
    if (chosen) earned += chosen.score * q.weight;
  }
  return Math.round((earned / totalWeight) * 100);
}

export type BandId = "strong" | "competitive" | "underperforming" | "atRisk";

export function bandId(score: number): BandId {
  if (score >= 80) return "strong";
  if (score >= 60) return "competitive";
  if (score >= 35) return "underperforming";
  return "atRisk";
}

/* Band colours, tuned for the dark background */
export const bandMark: Record<BandId, string> = {
  strong: "#4fd1c5",
  competitive: "#8a9cff",
  underperforming: "#ffb938",
  atRisk: "#ff7b80",
};

export type PlanItem = {
  id: string;
  question: string;
  action: string;
  why: string;
  lost: number;
};

/*
  The action plan: weakest areas first, each paired with its written advice.
  A question the visitor skipped counts as fully lost.
*/
export function buildPlan(answers: Answers, lang: Lang, count = 5): PlanItem[] {
  const t = gbpText[lang];
  const items: PlanItem[] = [];

  for (const q of questionDefs) {
    const chosen = q.options.find((o) => o.value === answers[q.id]);
    const lost = chosen ? (1 - chosen.score) * q.weight : q.weight;
    const written = chosen ? t.advice[q.id]?.[chosen.value] : undefined;
    if (!written || lost <= 0) continue;
    items.push({
      id: q.id,
      question: t.questions[q.id].question,
      action: written.action,
      why: written.why,
      lost,
    });
  }

  return items.sort((a, b) => b.lost - a.lost).slice(0, count);
}
