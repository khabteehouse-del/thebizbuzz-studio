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

function useReactorClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

export function GbpWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("start");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [business, setBusiness] = useState({ name: "", type: "", city: "" });
  const [emailed, setEmailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const t = useReactorClock();

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
      setStep(step	