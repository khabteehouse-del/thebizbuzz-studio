"use server";

import { questions, scoreAnswers, weakestAreas } from "@/lib/gbp-audit";
import type { Answers } from "@/lib/gbp-audit";

export type AdviceResult =
  | { ok: true; plan: string[] }
  | { ok: false; reason: "no-key" | "failed" };

/*
  Turns the audit answers into a written action plan.

  Runs on the server so the API key never reaches the browser. If no key
  is configured the tool still works: the scoring and the priority list
  are computed locally, and the caller falls back to those.
*/
export async function getGbpAdvice(
  answers: Answers,
  business: { name: string; type: string; city: string }
): Promise<AdviceResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, reason: "no-key" };

  const score = scoreAnswers(answers);
  const weak = weakestAreas(answers, 5);

  const summary = questions
    .map((q) => {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      return `${q.question} -> ${chosen ? chosen.label : "no answer"}`;
    })
    .join("\n");

  const prompt = `You are a local search consultant writing to a business owner.

Business: ${business.name}
Type: ${business.type}
City: ${business.city}
Google Business Profile score: ${score} out of 100

Their answers:
${summary}

Biggest gaps by impact:
${weak.map((w) => `- ${w.question.question}`).join("\n")}

Write exactly 5 actions, most important first. Rules:
- One action per line, no numbering, no bullets, no markdown
- Each action is 2 sentences: what to do, then why it matters to them specifically
- Reference their business type and city where it is genuinely relevant
- Plain language, no jargon, no em dashes
- Be concrete. "Add 15 photos of your treatment rooms this week" not "improve your photos"
- Do not mention hiring an agency`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) return { ok: false, reason: "failed" };

    const data = await response.json();
    const text = data.content
      ?.filter((block: { type: string }) => block.type === "text")
      ?.map((block: { text: string }) => block.text)
      ?.join("\n");

    if (!text) return { ok: false, reason: "failed" };

    const plan = text
      .split("\n")
      .map((line: string) => line.replace(/^[-*\d.\s]+/, "").trim())
      .filter((line: string) => line.length > 20)
      .slice(0, 5);

    if (plan.length === 0) return { ok: false, reason: "failed" };

    return { ok: true, plan };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
