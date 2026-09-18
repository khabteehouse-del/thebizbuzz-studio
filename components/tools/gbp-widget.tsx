"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import {
  questions,
  scoreAnswers,
  bandFor,
  buildPlan,
  type Answers,
} from "@/lib/gbp-audit";
import { LeadGate } from "@/components/tools/lead-gate";

type Stage = "start" | "questions" | "score" | "plan";

/*
  Floating entry point for the GBP check.

  Placement: below the nav on the right at desktop, a bottom bar on
  mobile. Not top-right on phones, where it would sit over the hero
  video and fight the menu button.

  It collapses to a pill so it never blocks reading, and the panel is
  scrollable because twelve questions plus a form will not fit a phone
  screen.
*/
export function GbpWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("start");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [business, setBusiness] = useState({ name: "", type: "", city: "" });
  const [emailed, setEmailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  /* Appear after the visitor has actually engaged with the page */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (dismissed) return null;

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  function choose(value: string) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStage("score");
    }
  }

  const score = stage === "start" ? 0 : scoreAnswers(answers);
  const band = bandFor(score);
  const plan = buildPlan(answers, 5);

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {ready && !open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-5 z-40 md:inset-x-auto md:bottom-auto md:right-6 md:top-28"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group flex w-full items-center gap-3 rounded-[3px] border px-5 py-3.5 backdrop-blur-xl transition-colors duration-300 md:w-auto"
                style={{
                  borderColor: "#4fd1c555",
                  backgroundColor: "rgba(13,42,43,0.85)",
                }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                    style={{ backgroundColor: "#4fd1c5" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#4fd1c5" }}
                  />
                </span>

                <span className="flex-1 text-left text-[0.8125rem] font-medium text-paper md:flex-none">
                  Score my Google listing
                </span>

                <Sparkles
                  size={15}
                  strokeWidth={1.7}
                  style={{ color: "#4fd1c5" }}
                />
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-ink text-muted transition-colors duration-200 hover:text-paper"
              >
                <X size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 bottom-3 top-20 z-50 flex flex-col overflow-hidden rounded-[4px] border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:inset-x-auto md:bottom-auto md:right-6 md:top-28 md:h-[min(78vh,760px)] md:w-[430px]"
              style={{
                borderColor: "#4fd1c544",
                backgroundColor: "#0b1f22",
              }}
            >
              {/* Header */}
              <div
                className="flex shrink-0 items-center justify-between border-b px-6 py-4"
                style={{ borderColor: "rgba(245,248,255,0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#4fd1c5" }}
                  />
                  <p className="text-xs uppercase tracking-[0.14em] text-paper/70">
                    Listing check
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-muted transition-colors duration-200 hover:text-paper"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* ---------------- start ---------------- */}
                {stage === "start" && (
                  <div>
                    <h2 className="font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-paper">
                      How good is your Google listing?
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-paper/60">
                      Twelve quick questions. You get a score out of 100 and
                      the five things costing you the most customers.
                    </p>

                    <div className="mt-7 space-y-4">
                      <MiniField
                        label="Business name"
                        value={business.name}
                        onChange={(v) =>
                          setBusiness({ ...business, name: v })
                        }
                        placeholder="Al Noor Dental"
                      />
                      <MiniField
                        label="What kind of business"
                        value={business.type}
                        onChange={(v) =>
                          setBusiness({ ...business, type: v })
                        }
                        placeholder="Dental clinic"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={!business.name.trim()}
                      onClick={() => setStage("questions")}
                      className="mt-7 h-12 w-full rounded-[2px] text-xs font-medium uppercase tracking-[0.12em] text-ink transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                      style={{ backgroundColor: "#4fd1c5" }}
                    >
                      Start
                    </button>
                  </div>
                )}

                {/* -------------- questions -------------- */}
                {stage === "questions" && (
                  <div>
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
                        className="h-px"
                        style={{ backgroundColor: "#4fd1c5" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="mt-7"
                      >
                        <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.015em] text-paper">
                          {current.question}
                        </h3>

                        {current.help && (
                          <p className="mt-3 text-xs leading-relaxed text-muted">
                            {current.help}
                          </p>
                        )}

                        <div className="mt-6 space-y-2">
                          {current.options.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => choose(option.value)}
                              className="group flex w-full items-center gap-3 rounded-[2px] border border-line bg-paper/[0.02] px-4 py-3.5 text-left text-sm text-paper/80 transition-all duration-300 hover:bg-paper/[0.06] hover:text-paper"
                            >
                              <span
                                className="h-px w-3 shrink-0 transition-all duration-300 group-hover:w-6"
                                style={{ backgroundColor: "#4fd1c5" }}
                              />
                              {option.label}
                            </button>
                          ))}
                        </div>

                        {step > 0 && (
                          <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="mt-6 text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
                          >
                            Back
                          </button>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {/* ---------------- score ---------------- */}
                {stage === "score" && (
                  <div>
                    <div
                      className="rounded-[3px] border p-7 text-center"
                      style={{
                        borderColor: `${band.mark}44`,
                        backgroundColor: "rgba(245,248,255,0.03)",
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-paper/50">
                        {business.name}
                      </p>
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-4 font-display text-6xl font-medium leading-none tracking-[-0.04em]"
                        style={{ color: band.mark }}
                      >
                        {score}
                      </motion.p>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-paper/50">
                        out of 100
                      </p>
                      <p
                        className="mt-5 font-display text-xl font-medium"
                        style={{ color: band.mark }}
                      >
                        {band.label}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-paper/65">
                        {band.note}
                      </p>
                    </div>

                    <div className="mt-8">
                      <LeadGate
                        answers={answers}
                        seed={{
                          businessName: business.name,
                          businessType: business.type,
                          city: business.city,
                        }}
                        onUnlocked={(sent) => {
                          setEmailed(sent);
                          setStage("plan");
                        }}
                        compact
                      />
                    </div>
                  </div>
                )}

                {/* ---------------- plan ---------------- */}
                {stage === "plan" && (
                  <div>
                    <p className="section-label">Your action plan</p>

                    {emailed && (
                      <p className="mt-5 text-sm leading-relaxed text-paper/70">
                        A copy is on its way to your inbox.
                      </p>
                    )}

                    <ol className="mt-6 space-y-5">
                      {plan.map((item, index) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.07 }}
                          className="border-b border-line pb-5 last:border-0"
                        >
                          <div className="flex gap-4">
                            <span
                              className="shrink-0 font-display text-sm"
                              style={{ color: "#4fd1c5" }}
                            >
                              0{index + 1}
                            </span>
                            <div>
                              <p className="text-sm leading-relaxed text-paper/85">
                                {item.action}
                              </p>
                              <p className="mt-2 text-sm leading-relaxed text-muted">
                                {item.why}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ol>

                    {plan.length === 0 && (
                      <p className="mt-5 text-sm leading-relaxed text-muted">
                        Your profile is in good shape across everything we
                        asked. Check it once a quarter.
                      </p>
                    )}

                    <p className="mt-8 text-sm leading-relaxed text-paper/70">
                      We will be in touch shortly with what we would do
                      first if you want it handled for you.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MiniField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-muted/40 focus:outline-none"
        style={{ borderColor: "rgba(245,248,255,0.12)" }}
      />
    </label>
  );
}
