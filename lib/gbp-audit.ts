import { adviceFor, type Advice } from "@/lib/gbp-advice";

/*
  Google Business Profile audit.

  Weights are not arbitrary. They follow what actually moves map pack
  ranking and conversion: verification and primary category first,
  then reviews, then completeness, then engagement signals.

  Everything here runs locally. No API call, no cost, no rate limit.
*/

export type Option = {
  value: string;
  label: string;
  /* 0 to 1, how much of this question's weight the answer earns */
  score: number;
};

export type Question = {
  id: string;
  section: string;
  question: string;
  help?: string;
  weight: number;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "verified",
    section: "Foundation",
    question: "Is your profile claimed and verified?",
    help: "A verified profile shows a dashboard when you search your own business name while signed in.",
    weight: 14,
    options: [
      { value: "yes", label: "Yes, verified", score: 1 },
      { value: "claimed", label: "Claimed but not verified", score: 0.4 },
      { value: "no", label: "No, or I am not sure", score: 0 },
    ],
  },
  {
    id: "category",
    section: "Foundation",
    question: "How specific is your primary category?",
    help: "Specific beats broad. Dental clinic outranks health service for someone searching for a dentist.",
    weight: 12,
    options: [
      { value: "specific", label: "Specific to what I actually do", score: 1 },
      { value: "broad", label: "Broad or generic", score: 0.4 },
      { value: "unsure", label: "I have not looked at it", score: 0 },
    ],
  },
  {
    id: "secondary",
    section: "Foundation",
    question: "Have you added secondary categories?",
    weight: 5,
    options: [
      { value: "several", label: "Three or more", score: 1 },
      { value: "few", label: "One or two", score: 0.6 },
      { value: "none", label: "None", score: 0 },
    ],
  },
  {
    id: "nap",
    section: "Foundation",
    question:
      "Are your name, address and phone identical everywhere online?",
    help: "Directories, your website, social profiles. Google reads inconsistency as uncertainty.",
    weight: 9,
    options: [
      { value: "yes", label: "Yes, consistent everywhere", score: 1 },
      { value: "mostly", label: "Mostly, with a few old listings", score: 0.5 },
      { value: "no", label: "No, or I have never checked", score: 0 },
    ],
  },
  {
    id: "reviews",
    section: "Reviews",
    question: "How many Google reviews do you have?",
    weight: 13,
    options: [
      { value: "many", label: "More than 50", score: 1 },
      { value: "some", label: "15 to 50", score: 0.65 },
      { value: "few", label: "1 to 14", score: 0.3 },
      { value: "none", label: "None", score: 0 },
    ],
  },
  {
    id: "responses",
    section: "Reviews",
    question: "Do you reply to reviews?",
    help: "Replying is a ranking signal and it visibly changes how a stranger reads a bad review.",
    weight: 10,
    options: [
      { value: "all", label: "Yes, to nearly all of them", score: 1 },
      { value: "negative", label: "Only the negative ones", score: 0.55 },
      { value: "rarely", label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "asking",
    section: "Reviews",
    question: "Do you have a system for asking customers for reviews?",
    weight: 8,
    options: [
      { value: "system", label: "Yes, a repeatable process", score: 1 },
      { value: "ad-hoc", label: "Sometimes, when I remember", score: 0.4 },
      { value: "no", label: "No", score: 0 },
    ],
  },
  {
    id: "photos",
    section: "Content",
    question: "How many photos are on your profile?",
    help: "Profiles with photos get significantly more direction requests and calls.",
    weight: 8,
    options: [
      { value: "many", label: "More than 20, added regularly", score: 1 },
      { value: "some", label: "Between 5 and 20", score: 0.6 },
      { value: "few", label: "Fewer than 5", score: 0.2 },
      { value: "none", label: "None", score: 0 },
    ],
  },
  {
    id: "posts",
    section: "Content",
    question: "Do you publish Google Posts?",
    weight: 6,
    options: [
      { value: "weekly", label: "Weekly or more", score: 1 },
      { value: "sometimes", label: "Occasionally", score: 0.5 },
      { value: "never", label: "Never", score: 0 },
    ],
  },
  {
    id: "services",
    section: "Content",
    question: "Are your services or products listed on the profile?",
    weight: 6,
    options: [
      { value: "full", label: "Yes, with descriptions and prices", score: 1 },
      { value: "partial", label: "A few, without detail", score: 0.5 },
      { value: "none", label: "No", score: 0 },
    ],
  },
  {
    id: "hours",
    section: "Details",
    question: "Are your hours complete and kept current?",
    help: "Wrong hours on a public holiday is the fastest way to earn a one star review.",
    weight: 5,
    options: [
      { value: "yes", label: "Yes, including holiday hours", score: 1 },
      { value: "basic", label: "Regular hours only", score: 0.6 },
      { value: "no", label: "Incomplete or out of date", score: 0 },
    ],
  },
  {
    id: "website",
    section: "Details",
    question: "Does your profile link to a working website?",
    weight: 4,
    options: [
      { value: "yes", label: "Yes, a site built for the business", score: 1 },
      { value: "social", label: "It links to a social page", score: 0.4 },
      { value: "no", label: "No website linked", score: 0 },
    ],
  },
];

export const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0);

export type Answers = Record<string, string>;

export function scoreAnswers(answers: Answers) {
  let earned = 0;

  for (const q of questions) {
    const chosen = q.options.find((o) => o.value === answers[q.id]);
    if (chosen) earned += chosen.score * q.weight;
  }

  return Math.round((earned / totalWeight) * 100);
}

export function bandFor(score: number) {
  if (score >= 80)
    return {
      label: "Strong",
      note: "Your profile is in good shape. The remaining gains are in consistency and volume rather than setup.",
      mark: "#4fd1c5",
    };
  if (score >= 60)
    return {
      label: "Competitive",
      note: "The foundations are there. A few specific gaps are holding you back from the top three results.",
      mark: "#4eb8ec",
    };
  if (score >= 35)
    return {
      label: "Underperforming",
      note: "You are visible but losing customers to businesses with better profiles, not better service.",
      mark: "#e8a33d",
    };
  return {
    label: "At risk",
    note: "Nearby customers searching right now are very unlikely to find you. This is fixable, and quickly.",
    mark: "#e5484d",
  };
}

/*
  Builds the full action plan from the answers.
  Weakest areas first, each paired with its written advice.
  Runs entirely locally, so it never fails and never costs anything.
*/

export type PlanItem = {
  id: string;
  question: string;
  action: string;
  why: string;
  lost: number;
};

export function buildPlan(answers: Answers, count = 5): PlanItem[] {
  return questions
    .map((q) => {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      const lost = chosen ? (1 - chosen.score) * q.weight : q.weight;
      const written: Advice | null = chosen
        ? adviceFor(q.id, chosen.value)
        : null;

      if (!written || lost <= 0) return null;

      return {
        id: q.id,
        question: q.question,
        action: written.action,
        why: written.why,
        lost,
      };
    })
    .filter((item): item is PlanItem => item !== null)
    .sort((a, b) => b.lost - a.lost)
    .slice(0, count);
}
