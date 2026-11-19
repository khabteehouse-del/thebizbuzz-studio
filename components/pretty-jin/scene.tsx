"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

/* ---------- Glossy 3D orb (pure CSS, GPU friendly) ---------- */
export function Orb({
  size,
  x,
  y,
  depth = 1,
  scroll,
  rise = 0,
  orb,
  delay = 0,
  dur = 9,
  blur = 0,
}: {
  size: number | string;
  x: string;
  y: string;
  /* 0..2: how strongly it follows the pointer, which reads as distance */
  depth?: number;
  scroll?: MotionValue<number>;
  /* pixels it drifts upward across the scroll range */
  rise?: number;
  orb?: string;
  delay?: number;
  dur?: number;
  blur?: number;
}) {
  const zero = useMotionValue(0);
  const lift = useTransform(scroll ?? zero, [0, 1], [0, -rise]);
  const style = {
    "--k": depth,
    "--dur": `${dur}s`,
    "--del": `${delay}s`,
    ...(orb ? { "--orb": orb } : {}),
    ...(blur ? { filter: `blur(${blur}px)` } : {}),
  } as CSSProperties;

  return (
    <motion.div style={{ position: "absolute", left: x, top: y, y: lift, width: size, height: size }}>
      <div className="pj-orb pj-orb-par" style={{ ...style, width: "100%", height: "100%" }} />
    </motion.div>
  );
}

/* Pointer and gyro parallax for every orb inside the scene. */
export function useSceneParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;

    const apply = (nx: number, ny: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", nx.toFixed(3));
        el.style.setProperty("--py", ny.toFixed(3));
      });
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      apply(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      const g = Math.max(-30, Math.min(30, e.gamma ?? 0)) / 30;
      const b = Math.max(-30, Math.min(30, (e.beta ?? 45) - 45)) / 30;
      apply(g, b);
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    else window.addEventListener("deviceorientation", onTilt, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [ref]);
}

/* ---------- Drifting rose petals with a 3D flip (canvas) ---------- */
type Petal = {
  x: number; y: number; s: number; vx: number; vy: number;
  r: number; vr: number; f: number; vf: number; a: number; hue: number;
};

export function Petals({ count = 26, tone = "rose" }: { count?: number; tone?: "rose" | "gold" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const small = window.innerWidth < 760;
    const n = small ? Math.round(count * 0.45) : count;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let visible = true;
    let raf = 0;

    const make = (initial: boolean): Petal => ({
      x: Math.random() * W,
      y: initial ? Math.random() * H : -40,
      s: 0.5 + Math.random() * 0.9,
      vx: -0.2 + Math.random() * 0.5,
      vy: 0.25 + Math.random() * 0.55,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      f: Math.random() * Math.PI * 2,
      vf: 0.01 + Math.random() * 0.025,
      a: 0.45 + Math.random() * 0.45,
      hue: Math.random(),
    });

    let petals: Petal[] = [];
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!petals.length) petals = Array.from({ length: n }, () => make(true));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const colors = tone === "gold"
      ? ["#f3dfae", "#e6c27a", "#fff2cf"]
      : ["#f9d3d8", "#f1a9b8", "#fde6e8"];

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.vx + Math.sin(p.y * 0.012 + p.f) * 0.3;
        p.y += p.vy * p.s;
        p.r += p.vr;
        p.f += p.vf;
        if (p.y > H + 40 || p.x < -60 || p.x > W + 60) petals[i] = make(false);
        const w = 11 * p.s;
        const h = 18 * p.s;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.scale(Math.cos(p.f), 1);
        ctx.globalAlpha = p.a;
        ctx.fillStyle = colors[Math.floor(p.hue * colors.length)];
        ctx.beginPath();
        ctx.moveTo(0, -h);
        ctx.bezierCurveTo(w, -h * 0.6, w, h * 0.6, 0, h);
        ctx.bezierCurveTo(-w, h * 0.6, -w, -h * 0.6, 0, -h);
        ctx.fill();
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [count, tone]);

  return <canvas ref={ref} className="pj-petals" aria-hidden />;
}

/* ---------- Hero scroll helper ---------- */
export function useHeroScroll(target: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  return { scrollYProgress, bgY, bgScale, copyY, copyOpacity };
}
