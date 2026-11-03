"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { submitContact } from "@/app/actions/contact";
import {
  questionDefs,
  scoreAnswers,
  bandId,
  bandMark,
  buildPlan,
  type Answers,
} from "@/lib/gbp-audit";
import { gbpText } from "@/data/gbp-text";
import { path, type Lang } from "@/data/i18n";

type Stage = "intro" | "questions" | "result";

const field =
  "mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-base text-paper placeholder:text-muted/40 focus:border-accent-soft focus:outline-none md:text-sm";
const labelClass = "text-xs uppercase tracking-[0.14em] text-muted";
const primaryBtn =
  "group/btn relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-[2px] border border-accent bg-accent text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40";

/* True only where entry animations are safe to rely on */
function useAnimateSafe() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(wide && !reduce);
  }, []);
  return ok;
}

/*
  The Google Business Profile check, the same tool BizBuzz offers, in both
  languages. Twelve questions, a score, and a written plan.

  Every entry animation starts at opacity 0 and this screen is the whole
  payoff of the tool, so animation is gated the same way as the hero: it
  runs only on wide screens without reduced motion. A phone never waits on
  an animation to see its result.

  The plan sits behind a short contact step that comes AFTER the score,
  never before it. Someone who has just seen their score has a reason to
  hand over a way to reach them.
*/
/*
  embedded: shown inside another card (the contact form), so it drops its own
  outer card and width limit and fills the space it is given.
*/
export function GbpChecker({ lang, embedded = false }: { lang: Lang; embedded?: boolean }) {
  const t = gbpText[lang];
  const ui = t.ui;
  const canAnimate = useAnimateSafe();

  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [business, setBusiness] = useState({ name: "", type: "", city: "" });
  const [unlocked, setUnlocked] = useState(false);

  const def = questionDefs[step];
  const text = t.questions[def.id];
  const progress = ((step + 1) / questionDefs.length) * 100;
  const canStart = business.name.trim().length > 1 && business.type.trim().length > 1;

  function choose(value: string) {
    setAnswers({ ...answers, [def.id]: value });
    if (step < questionDefs.length - 1) setStep(step + 1);
    else setStage("result");
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setUnlocked(false);
    setStage("intro");
  }

  /* ---------------------------------------------------- intro */
  if (stage === "intro") {
    return (
      <div className={embedded ? "" : "mx-auto max-w-xl"}>
        <div
          className={
            embedded
              ? ""
              : "rounded-[3px] border border-line bg-paper/[0.04] p-6 backdrop-blur-sm sm:p-8 md:p-10"
          }
        >
          <p className="text-sm leading-relaxed text-muted">{ui.introText}</p>

          <div className="mt-8 space-y-5">
            <Field
              label={ui.nameLabel}
              value={business.name}
              onChange={(v) => setBusiness({ ...business, name: v })}
              placeholder={ui.namePlaceholder}
              autoComplete="organization"
            />
            <Field
              label={ui.typeLabel}
              value={business.type}
              onChange={(v) => setBusiness({ ...business, type: v })}
              placeholder={ui.typePlaceholder}
            />
            <Field
              label={ui.cityLabel}
              value={business.city}
              onChange={(v) => setBusiness({ ...business, city: v })}
              placeholder={ui.cityPlaceholder}
              optional={ui.optional}
              autoComplete="address-level2"
            />
          </div>

          <button
            type="button"
            disabled={!canStart}
            onClick={() => setStage("questions")}
            className={`${primaryBtn} mt-9`}
          >
            <FillLayer />
            <span className="relative z-10 transition-colors duration-300 group-enabled/btn:group-hover/btn:text-ink">
              {ui.start}
            </span>
          </button>

          <p className="mt-5 text-xs leading-relaxed text-muted/70">{ui.startNote}</p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ questions */
  if (stage === "questions") {
    return (
      <div className={embedded ? "" : "mx-auto max-w-xl"}>
        <div className="mb-8">
          <div className="flex items-baseline justify-between text-xs text-muted">
            <span className="uppercase tracking-[0.14em]">{t.sections[def.section]}</span>
            <span>
              {step + 1} {ui.questionOf} {questionDefs.length}
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
            key={def.id}
            initial={canAnimate ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper sm:text-2xl md:text-3xl">
              {text.question}
            </h2>

            {text.help && (
              <p className="mt-4 text-sm leading-relaxed text-muted">{text.help}</p>
            )}

            <div className="mt-8 space-y-2.5">
              {def.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => choose(option.value)}
                  className="group flex w-full items-center gap-4 rounded-[2px] border border-line bg-paper/[0.03] px-5 py-4 text-left text-sm text-paper/80 transition-all duration-300 hover:border-accent/60 hover:bg-paper/[0.06] hover:text-paper"
                >
                  <span className="h-px w-4 shrink-0 bg-accent-soft/60 transition-all duration-300 group-hover:w-7 group-hover:bg-accent-soft" />
                  {text.options[option.value]}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-8 text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
              >
                {ui.back}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* --------------------------------------------------- result */
  const score = scoreAnswers(answers);
  const id = bandId(score);
  const mark = bandMark[id];
  const band = t.bands[id];
  const plan = buildPlan(answers, lang, 5);
  const gated = !unlocked && plan.length > 0;

  return (
    <div className={embedded ? "" : "mx-auto max-w-2xl"}>
      <motion.div
        initial={canAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Score */}
        <div
          className="rounded-[3px] border bg-ink-raised p-7 text-center sm:p-9 md:p-12"
          style={{ borderColor: `${mark}55` }}
        >
          <p className="text-xs uppercase tracking-[0.14em] text-paper/50">{business.name}</p>

          <motion.p
            initial={canAnimate ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-6xl font-medium leading-none tracking-[-0.04em] sm:text-7xl md:text-8xl"
            style={{ color: mark }}
          >
            {score}
          </motion.p>

          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-paper/50">{ui.outOf}</p>

          <p
            className="mt-7 font-display text-2xl font-medium tracking-[-0.02em]"
            style={{ color: mark }}
          >
            {band.label}
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/65">
            {band.note}
          </p>
        </div>

        {gated && (
          <div className="mt-12">
            <PlanGate
              lang={lang}
              score={score}
              bandLabel={gbpText.en.bands[id].label}
              business={business}
              answers={answers}
              onUnlocked={() => setUnlocked(true)}
            />
          </div>
        )}

        {/* The plan, ranked by what each gap is costing them */}
        {!gated && (
          <div className="mt-12">
            <p className="section-label">
              {plan.length > 0 ? ui.planTitle : ui.planNoneTitle}
            </p>

            {plan.length === 0 && (
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
                {ui.planNoneText}
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
                    <span className="shrink-0 font-display text-sm text-[#ffb938]">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm leading-relaxed text-paper/85 md:text-base">
                        {item.action}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.why}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        )}

        {/* Next step */}
        <div className="mt-12 rounded-[3px] border border-line bg-paper/[0.04] p-6 sm:p-8 md:p-10">
          <p className="font-display text-xl font-medium tracking-[-0.02em] text-paper">
            {ui.nextTitle}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{ui.nextText}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={path("contact", lang)}
              className="inline-flex h-11 items-center rounded-[2px] border border-accent bg-accent px-7 text-xs font-medium uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-accent-soft"
            >
              {ui.nextButton}
            </Link>

            <button
              type="button"
              onClick={restart}
              className="text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
            >
              {ui.again}
            </button>

            <Link
              href={path("home", lang)}
              className="text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-paper"
            >
              {ui.backToSite}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* The short step between the score and the plan */
function PlanGate({
  lang,
  score,
  bandLabel,
  business,
  answers,
  onUnlocked,
}: {
  lang: Lang;
  score: number;
  bandLabel: string;
  business: { name: string; type: string; city: string };
  answers: Answers;
  onUnlocked: () => void;
}) {
  const ui = gbpText[lang].ui;
  const [name, setName] = useState(business.name);
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    /* The note we receive is always written in English, whatever language
       the visitor used, so the team reads every lead the same way. */
    const weakest = buildPlan(answers, "en", 3)
      .map((item) => item.question)
      .join("; ");
    const message = [
      `Free Google profile check. Score ${score}/100 (${bandLabel}).`,
      `Business: ${business.name} (${business.type})${business.city ? ` in ${business.city}` : ""}.`,
      website ? `Website or profile: ${website}` : "",
      weakest ? `Biggest gaps: ${weakest}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const result = await submitContact({
        lang,
        kind: "contact",
        topic: "audit",
        name,
        contact,
        business: business.name,
        message,
        company_site: honeypot,
      });
      if (result.ok) {
        onUnlocked();
        return;
      }
      setError(
        result.error === "name"
          ? ui.errName
          : result.error === "contact"
            ? ui.errContact
            : ui.errSend,
      );
    } catch {
      setError(ui.errSend);
    }
    setSending(false);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[3px] border border-line bg-paper/[0.04] p-6 backdrop-blur-sm sm:p-8 md:p-10"
    >
      <p className="font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
        {ui.gateTitle}
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{ui.gateText}</p>

      <div className="mt-7 space-y-4">
        <Field
          label={ui.gateBusiness}
          value={name}
          onChange={setName}
          placeholder=""
          autoComplete="organization"
          required
        />
        <Field
          label={ui.gateContact}
          value={contact}
          onChange={setContact}
          placeholder=""
          autoComplete="email"
          inputMode="email"
          required
        />
        <Field
          label={ui.gateWebsite}
          value={website}
          onChange={setWebsite}
          placeholder=""
          optional={ui.optional}
        />

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="company_site"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-[#ff7b80]">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className={`${primaryBtn} mt-7`}>
        <FillLayer />
        <span className="relative z-10 transition-colors duration-300 group-enabled/btn:group-hover/btn:text-ink">
          {sending ? ui.gateSending : ui.gateButton}
        </span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted/70">{ui.gateNote}</p>
    </form>
  );
}

/* The fill-on-hover layer shared by the primary buttons */
function FillLayer() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-enabled/btn:group-hover/btn:scale-y-100"
    />
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  optional,
  autoComplete,
  inputMode,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: string;
  autoComplete?: string;
  inputMode?: "email";
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {optional && <span className="ml-2 normal-case">{optional}</span>}
      </span>
      <input
        type="text"
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={field}
      />
    </label>
  );
}
