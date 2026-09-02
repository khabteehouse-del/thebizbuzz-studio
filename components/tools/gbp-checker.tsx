"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  questions,
  scoreAnswers,
  bandFor,
  buildPlan,
  type Answers,
} from "@/lib/gbp-audit";
import { site } from "@/data/site";

type Stage = "intro" | "questions" | "result";

/* True only where entry animations are safe to rely on */
function useAnimateSafe() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setOk(wide && !reduce);
  }, []);

  return ok;
}

export function GbpChecker() {
  /*
    Entry animations are gated the same way as the hero. Every one of
    these starts at opacity 0, and this screen is the entire payoff of
    the tool. If an animation fails the user answers twelve questions
    and gets a blank page.
  */
  const canAnimate = useAnimateSafe();

  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [business, setBusiness] = useState({ name: "", type: "", city: "" });

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const canStart = business.name.trim() && business.type.trim();

  function choose(value: string) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    setStage("result");
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setStage("intro");
  }

  /* ---------------------------------------------------- intro */
  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-[3px] border border-line bg-paper/[0.03] p-6 sm:p-8 md:p-10">
          <p className="text-sm leading-relaxed text-muted">
            Twelve questions about your Google listing. Takes about two
            minutes. You get a score, the three things costing you the most
            customers, and a written plan you can act on yourself.
          </p>

          <div className="mt-8 space-y-5">
            <Field
              label="Business name"
              value={business.name}
              onChange={(v) => setBusiness({ ...business, name: v })}
              placeholder="Al Noor Dental"
            />
            <Field
              label="What kind of business"
              value={business.type}
              onChange={(v) => setBusiness({ ...business, type: v })}
              placeholder="Dental clinic"
            />
            <Field
              label="City"
              value={business.city}
              onChange={(v) => setBusiness({ ...business, city: v })}
              placeholder="Karachi"
              optional
            />
          </div>

          <button
            type="button"
            disabled={!canStart}
            onClick={() => setStage("questions")}
            className="group/btn relative mt-9 inline-flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-[2px] border border-accent bg-accent text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-enabled:group-hover/btn:scale-y-100"
            />
            <span className="relative z-10 transition-colors duration-300 group-enabled:group-hover/btn:text-ink">
              Start the check
            </span>
          </button>

          <p className="mt-5 text-xs leading-relaxed text-muted/70">
            Nothing is stored and no account is needed. We do not email you
            unless you ask us to.
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ questions */
  if (stage === "questions") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <div className="flex items-baseline justify-between text-xs text-muted">
            <span className="uppercase tracking-[0.14em]">
              {current.section}
            </span>
            <span>
              {step + 1} of {questions.length}
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-line">
            <motion.div
              className="h-px bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={canAnimate ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper sm:text-2xl md:text-3xl">
              {current.question}
            </h2>

            {current.help && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {current.help}
              </p>
            )}

            <div className="mt-8 space-y-2.5">
              {current.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => choose(option.value)}
                  className="group flex w-full items-center gap-4 rounded-[2px] border border-line bg-paper/[0.02] px-5 py-4 text-left text-sm text-paper/80 transition-all duration-300 hover:border-accent/50 hover:bg-paper/[0.05] hover:text-paper"
                >
                  <span className="h-px w-4 shrink-0 bg-accent/50 transition-all duration-300 group-hover:w-7 group-hover:bg-accent" />
                  {option.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-8 text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
              >
                Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* --------------------------------------------------- result */
  const score = scoreAnswers(answers);
  const band = bandFor(score);
  const plan = buildPlan(answers, 5);

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={canAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Score */}
        <div
          className="rounded-[3px] border p-7 text-center sm:p-9 md:p-12"
          style={{ borderColor: `${band.mark}44`, backgroundColor: "#0d2a2b" }}
        >
          <p className="text-xs uppercase tracking-[0.14em] text-paper/50">
            {business.name}
          </p>

          <motion.p
            initial={canAnimate ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-6xl font-medium leading-none tracking-[-0.04em] sm:text-7xl md:text-8xl"
            style={{ color: band.mark }}
          >
            {score}
          </motion.p>

          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-paper/50">
            out of 100
          </p>

          <p
            className="mt-7 font-display text-2xl font-medium tracking-[-0.02em]"
            style={{ color: band.mark }}
          >
            {band.label}
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/65">
            {band.note}
          </p>
        </div>

        {/* The plan. Ranked by what each gap is actually costing them. */}
        <div className="mt-12">
          <p className="section-label">
            {plan.length > 0 ? "Your action plan" : "Nothing urgent"}
          </p>

          {plan.length === 0 && (
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
              Your profile is in good shape across every question we asked.
              Check it once a quarter, since categories get suggested, hours go
              stale and competitors catch up.
            </p>
          )}

          <ol className="mt-7 space-y-px bg-line">
            {plan.map((item, index) => (
              <motion.li
                key={item.id}
                initial={canAnimate ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.07 }}
                className="bg-ink p-6 sm:p-7 md:p-8"
              >
                <div className="flex gap-5 md:gap-7">
                  <span className="shrink-0 font-display text-sm text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed text-paper/85 md:text-base">
                      {item.action}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.why}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Next step */}
        <div className="mt-12 rounded-[3px] border border-line bg-paper/[0.03] p-6 sm:p-8 md:p-10">
          <p className="font-display text-xl font-medium tracking-[-0.02em] text-paper">
            Want us to do it instead?
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Send this score with a line about your business and we will tell
            you honestly whether it needs an agency or an afternoon.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${site.email}?subject=GBP score ${score} for ${encodeURIComponent(
                business.name
              )}`}
              className="inline-flex h-11 items-center rounded-[2px] border border-accent bg-accent px-7 text-xs font-medium uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-accent-soft"
            >
              Send us the score
            </a>

            <button
              type="button"
              onClick={restart}
              className="text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
            >
              Start again
            </button>

            <Link
              href="/"
              className="text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
            >
              Back to site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-muted">
        {label}
        {optional && <span className="ml-2 normal-case">optional</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-muted/40 focus:border-accent focus:outline-none"
      />
    </label>
  );
}
