"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import {
  questions,
  scoreAnswers,
  bandFor,
  buildPlan,
  type Answers,
} from "@/lib/gbp-audit";
import { LeadGate } from "@/components/tools/lead-gate";

type Stage = "start" | "questions" | "score" | "plan";

const LOGO_BLUE = "#1dd5ff";

/*
  Floating entry point for the GBP check.

  Launcher redesigned as a "reactor core": a glowing orb that breathes
  on a 3s cycle (scale + glow expand/contract together) with two dashed
  rings rotating around it at different speeds, plus two small orbiting
  particles. On hover, the breathing stops, the core flares and locks
  larger, and the rings/particles spin much faster, an "activation"
  moment rather than a color change.

  The click-to-open panel below is untouched from the original.
*/
export function GbpWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("start");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [business, setBusiness] = useState({ name: "", type: "", city: "" });
  const [emailed, setEmailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
      {/* Launcher: reactor core */}
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
                className="reactor-widget group flex w-full items-center gap-[18px] rounded-[8px] border px-5 py-4 backdrop-blur-xl transition-colors duration-300 md:w-auto"
                style={{
                  borderColor: `${LOGO_BLUE}40`,
                  backgroundColor: "rgba(10,15,26,0.85)",
                }}
              >
                <div className="reactor-core-wrap relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
                  <div className="reactor-ring reactor-ring-outer absolute h-[52px] w-[52px] rounded-full border border-dashed"
                       style={{ borderColor: `${LOGO_BLUE}59` }} />
                  <div className="reactor-ring reactor-ring-mid absolute h-[38px] w-[38px] rounded-full border"
                       style={{ borderColor: `${LOGO_BLUE}59` }} />
                  <span
                    className="reactor-particle absolute h-[4px] w-[4px] rounded-full"
                    style={{ backgroundColor: LOGO_BLUE, boxShadow: `0 0 6px 1px ${LOGO_BLUE}cc` }}
                  />
                  <span
                    className="reactor-particle reactor-particle-2 absolute h-[4px] w-[4px] rounded-full"
                    style={{ backgroundColor: LOGO_BLUE, boxShadow: `0 0 6px 1px ${LOGO_BLUE}cc` }}
                  />
                  <div
                    className="reactor-core relative h-[16px] w-[16px] rounded-full"
                    style={{
                      background: `radial-gradient(circle, #bff3ff 0%, ${LOGO_BLUE} 55%, transparent 80%)`,
                    }}
                  />
                </div>

                <span className="flex flex-col items-start gap-[3px] text-left">
                  <span
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: `${LOGO_BLUE}d9` }}
                  >
                    Test your Google Business Profile, free in 60 seconds
                  </span>
                  <span className="text-[0.8125rem] font-medium text-paper">
                    Free 60-second scan
                  </span>
                </span>
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
                borderColor: `${LOGO_BLUE}44`,
                backgroundColor: "#0a0f1a",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-between border-b px-6 py-4"
                style={{ borderColor: "rgba(245,248,255,0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: LOGO_BLUE }}
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
                {stage === "start" && (
                  <div>
                    <h2 className="font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-paper">
                      Free 60-second scan
                    </h2>
                    <p className="mt-2 text-base font-medium text-paper/80">
                      Is your Google listing costing you leads?
                    </p>
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
                      style={{ backgroundColor: LOGO_BLUE }}
                    >
                      Start
                    </button>
                  </div>
                )}

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
                        style={{ backgroundColor: LOGO_BLUE }}
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
                                style={{ backgroundColor: LOGO_BLUE }}
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
                              style={{ color: LOGO_BLUE }}
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

      <style jsx global>{`
        @keyframes reactorBreathe {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.7;
            box-shadow: 0 0 10px 2px rgba(29, 213, 255, 0.35);
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            box-shadow: 0 0 26px 8px rgba(29, 213, 255, 0.75);
          }
        }
        @keyframes reactorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reactorSpinRev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes reactorOrbit {
          from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
        .reactor-core {
          animation: reactorBreathe 3s ease-in-out infinite;
        }
        .reactor-ring-outer {
          animation: reactorSpin 10s linear infinite;
        }
        .reactor-ring-mid {
          animation: reactorSpinRev 7s linear infinite;
        }
        .reactor-particle {
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          animation: reactorOrbit 4.5s linear infinite;
        }
        .reactor-particle-2 {
          animation-duration: 6s;
          animation-direction: reverse;
        }
        .reactor-widget:hover .reactor-core {
          animation: none;
          transform: scale(1.35);
          box-shadow: 0 0 30px 8px rgba(29, 213, 255, 0.85);
        }
        .reactor-widget:hover .reactor-ring-outer {
          animation-duration: 3s;
        }
        .reactor-widget:hover .reactor-ring-mid {
          animation-duration: 2.2s;
        }
        .reactor-widget:hover .reactor-particle {
          animation-duration: 1.4s;
        }
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .reactor-ring-outer,
          .reactor-ring-mid,
          .reactor-particle,
          .reactor-particle-2 {
            animation: none;
          }
          .reactor-core {
            animation-duration: 4s;
          }
        }
      `}</style>
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