"use client";

import { useEffect, useRef } from "react";

/*
  The "13" dial beside the services heading.

  Plain 2D canvas, no 3D library, so it adds no weight to the page. The 13 is
  thirteen stacked copies of the numeral, shifted a little against each other
  as it sways, so it reads as a solid object that turns. Around it a comet
  runs a loading ring, with one dot per service that lights as it passes.

  It is decoration only (the heading says the same in words), so it is hidden
  from screen readers. It pauses when off screen, shows one still frame for
  visitors who prefer reduced motion, and never runs where it is not shown.
*/

const TAU = Math.PI * 2;
const N = 13;
const BLUE = "59,130,246";
const TEAL = "45,212,191";
const LIGHT = "156,226,230";
const PALE = "205,245,238";

/* Half the depth of the numeral, in canvas units (the canvas edge is 1). */
const DEPTH = 0.154;

const lerp = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);
const angOf = (i: number) => -Math.PI / 2 + (i * TAU) / N;
const since = (theta: number, a: number) => (((theta - a) % TAU) + TAU) % TAU;

type Layers = {
  S: number;
  body: HTMLCanvasElement;
  face: HTMLCanvasElement;
  word: HTMLCanvasElement;
  shNum: HTMLCanvasElement;
  shWord: HTMLCanvasElement;
  bezel: HTMLCanvasElement;
};

type Speck = { x: number; y: number; z: number; teal: boolean; phase: number };

function makeCanvas(S: number) {
  const c = document.createElement("canvas");
  c.width = c.height = S;
  return c;
}

/* Pre-draws everything that does not change from frame to frame. */
function buildLayers(S: number, family: string): Layers {
  const OFF = S * 2;
  const numPx = 0.276 * S;
  const numY = 0.465 * S;
  const wordPx = 0.054 * S;
  const wordY = 0.668 * S;
  const track = 0.0176 * S;

  const drawNumeral = (g: CanvasRenderingContext2D, fill: string | CanvasGradient, dx = 0) => {
    g.font = `700 ${numPx}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = fill;
    g.fillText("13", S / 2 + dx, numY);
  };

  /* "SERVICES" drawn letter by letter so the spacing is wide and even. */
  const drawWord = (g: CanvasRenderingContext2D, fill: string | CanvasGradient, dx = 0) => {
    const text = "SERVICES";
    g.font = `700 ${wordPx}px ${family}`;
    g.textBaseline = "middle";
    g.textAlign = "left";
    const widths = [...text].map((ch) => g.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + track * (text.length - 1);
    let x = (S - total) / 2 + dx;
    g.fillStyle = fill;
    [...text].forEach((ch, i) => {
      g.fillText(ch, x, wordY);
      x += widths[i] + track;
    });
  };

  const body = makeCanvas(S);
  drawNumeral(body.getContext("2d")!, "#0b2138");

  const face = makeCanvas(S);
  {
    const g = face.getContext("2d")!;
    const gr = g.createLinearGradient(0, numY - 0.2 * S, 0, numY + 0.2 * S);
    gr.addColorStop(0, "#ffffff");
    gr.addColorStop(1, "#a9f0e4");
    drawNumeral(g, gr);
  }

  const shNum = makeCanvas(S);
  {
    const g = shNum.getContext("2d")!;
    g.shadowColor = "rgba(0,6,16,0.95)";
    g.shadowBlur = 0.024 * S;
    g.shadowOffsetX = OFF;
    drawNumeral(g, "#000", -OFF);
  }

  const word = makeCanvas(S);
  {
    const g = word.getContext("2d")!;
    const gr = g.createLinearGradient(0, wordY - wordPx * 0.6, 0, wordY + wordPx * 0.6);
    gr.addColorStop(0, "#d9fbf5");
    gr.addColorStop(1, "#43dcc6");
    g.shadowColor = `rgba(${TEAL},0.7)`;
    g.shadowBlur = 0.02 * S;
    drawWord(g, gr);
  }

  const shWord = makeCanvas(S);
  {
    const g = shWord.getContext("2d")!;
    g.shadowColor = "rgba(0,6,16,0.95)";
    g.shadowBlur = 0.012 * S;
    g.shadowOffsetX = OFF;
    drawWord(g, "#000", -OFF);
  }

  /* The watch-style scale around the edge turns very slowly, so draw it once. */
  const bezel = makeCanvas(S);
  {
    const g = bezel.getContext("2d")!;
    const u = S / 2;
    g.setTransform(u, 0, 0, u, u, u);
    for (let i = 0; i < 120; i++) {
      const a = (i * TAU) / 120;
      const long = i % 10 === 0;
      const r0 = long ? 0.95 : 0.968;
      g.strokeStyle = `rgba(${PALE},${long ? 0.6 : 0.2})`;
      g.lineWidth = long ? 0.006 : 0.003;
      g.beginPath();
      g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
      g.lineTo(Math.cos(a) * 0.99, Math.sin(a) * 0.99);
      g.stroke();
    }
  }

  return { S, body, face, word, shNum, shWord, bezel };
}

function ring(g: CanvasRenderingContext2D, r: number, w: number, col: string) {
  g.beginPath();
  g.arc(0, 0, r, 0, TAU);
  g.lineWidth = w;
  g.strokeStyle = col;
  g.stroke();
}

/* Everything behind the numeral: glow, scale, track, comet, inner rings, dots. */
function drawBack(g: CanvasRenderingContext2D, L: Layers, t: number) {
  const th = -Math.PI / 2 + t * 1.4;

  const gd = g.createRadialGradient(0, 0, 0, 0, 0, 0.92);
  gd.addColorStop(0, `rgba(${TEAL},0.24)`);
  gd.addColorStop(0.55, `rgba(${TEAL},0.1)`);
  gd.addColorStop(0.86, `rgba(${BLUE},0.12)`);
  gd.addColorStop(1, `rgba(${BLUE},0)`);
  g.fillStyle = gd;
  g.beginPath();
  g.arc(0, 0, 0.92, 0, TAU);
  g.fill();

  g.save();
  g.rotate(t * 0.03);
  g.drawImage(L.bezel, -1, -1, 2, 2);
  g.restore();

  ring(g, 0.9, 0.003, `rgba(${TEAL},0.18)`);
  ring(g, 0.84, 0.036, "rgba(8,44,60,0.45)");
  ring(g, 0.84, 0.004, `rgba(${TEAL},0.16)`);

  /* Comet: deep blue tail, teal body, pale head, with a teal glow. */
  const seg = 40;
  const span = TAU * 0.44;
  const blur = 0.02 * L.S;
  g.lineCap = "round";
  for (let i = 0; i < seg; i++) {
    const a0 = th - span * (1 - i / seg);
    const a1 = th - span * (1 - (i + 1) / seg);
    const f = (i + 1) / seg;
    let cr: number, cg: number, cb: number;
    if (f < 0.88) {
      const k = f / 0.88;
      cr = lerp(59, 45, k);
      cg = lerp(130, 212, k);
      cb = lerp(246, 191, k);
    } else {
      const k = (f - 0.88) / 0.12;
      cr = lerp(45, 215, k);
      cg = lerp(212, 250, k);
      cb = lerp(191, 244, k);
    }
    if (f > 0.72) {
      g.shadowColor = `rgba(${TEAL},0.9)`;
      g.shadowBlur = blur;
    } else {
      g.shadowColor = "transparent";
      g.shadowBlur = 0;
    }
    g.beginPath();
    g.arc(0, 0, 0.84, a0, a1 + 0.012);
    g.lineWidth = 0.005 + 0.014 * f;
    g.strokeStyle = `rgba(${cr},${cg},${cb},${f * f})`;
    g.stroke();
  }
  g.shadowColor = "transparent";
  g.shadowBlur = 0;
  g.lineCap = "butt";

  const hx = Math.cos(th) * 0.84;
  const hy = Math.sin(th) * 0.84;
  const hg = g.createRadialGradient(hx, hy, 0, hx, hy, 0.09);
  hg.addColorStop(0, `rgba(${PALE},0.95)`);
  hg.addColorStop(0.4, `rgba(${TEAL},0.4)`);
  hg.addColorStop(1, `rgba(${TEAL},0)`);
  g.fillStyle = hg;
  g.beginPath();
  g.arc(hx, hy, 0.09, 0, TAU);
  g.fill();

  /* Inner rings turn the other way. */
  g.save();
  g.rotate(-t * 0.5);
  g.setLineDash([0.02, 0.07]);
  ring(g, 0.68, 0.007, `rgba(${TEAL},0.3)`);
  g.restore();
  g.setLineDash([]);
  ring(g, 0.62, 0.002, `rgba(${LIGHT},0.14)`);

  /* One dot per service, lit as the comet passes. */
  for (let i = 0; i < N; i++) {
    const d = angOf(i);
    const lit = Math.exp(-since(th, d) / 1.2);
    const dx = Math.cos(d) * 0.915;
    const dy = Math.sin(d) * 0.915;
    if (lit > 0.3) {
      const dg = g.createRadialGradient(dx, dy, 0, dx, dy, 0.05);
      dg.addColorStop(0, `rgba(${TEAL},${0.6 * lit})`);
      dg.addColorStop(1, `rgba(${TEAL},0)`);
      g.fillStyle = dg;
      g.beginPath();
      g.arc(dx, dy, 0.05, 0, TAU);
      g.fill();
    }
    g.fillStyle = `rgba(${lit > 0.5 ? PALE : LIGHT},${0.3 + 0.7 * lit})`;
    g.beginPath();
    g.arc(dx, dy, 0.011 + 0.012 * lit, 0, TAU);
    g.fill();
  }
}

/* Thirteen short arcs in front of the numeral, for depth. */
function drawFront(g: CanvasRenderingContext2D, t: number) {
  const seg = (TAU / N) * 0.7;
  g.save();
  g.rotate(t * 0.22);
  g.lineWidth = 0.01;
  g.strokeStyle = `rgba(${LIGHT},0.26)`;
  for (let i = 0; i < N; i++) {
    const a = (i * TAU) / N;
    g.beginPath();
    g.arc(0, 0, 0.73 * 1.09, a, a + seg);
    g.stroke();
  }
  g.restore();
}

function drawSpecks(
  g: CanvasRenderingContext2D,
  specks: Speck[],
  t: number,
  tx: number,
  ty: number,
) {
  const rot = t * 0.02;
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  g.globalCompositeOperation = "lighter";
  for (const p of specks) {
    const x = p.x * c - p.y * s - tx * p.z * 0.12;
    const y = p.x * s + p.y * c - ty * p.z * 0.12;
    const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.8 + p.phase));
    g.fillStyle = `rgba(${p.teal ? TEAL : BLUE},${a})`;
    g.beginPath();
    g.arc(x, y, 0.004 + 0.005 * (p.z + 1), 0, TAU);
    g.fill();
  }
  g.globalCompositeOperation = "source-over";
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  L: Layers,
  specks: Speck[],
  t: number,
  tx: number,
  ty: number,
) {
  const S = L.S;
  const u = S / 2;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, S, S);
  ctx.setTransform(u, 0, 0, u, u, u);

  /* Back layer sits furthest away, so it shifts the most against the pointer. */
  ctx.save();
  ctx.translate(-tx * 0.03, -ty * 0.03);
  drawBack(ctx, L, t);
  ctx.restore();

  drawSpecks(ctx, specks, t, tx, ty);

  /* The 13 keeps drifting: slow turn, slight pitch, gentle float. */
  const yaw = Math.sin(t * 0.5) * 0.36 + tx * 0.7;
  const pitch = Math.sin(t * 0.37 + 1) * 0.1 + ty * 0.5;
  const bob = Math.sin(t * 0.6) * 0.02;
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const sinP = Math.sin(pitch);

  /* Soft shadows fall on the dial behind and slide as the figure turns. */
  const sx = 0.06 - sinY * 0.08;
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.translate(sx, bob + 0.065);
  ctx.scale(cosY, 1);
  ctx.drawImage(L.shNum, -1, -1, 2, 2);
  ctx.restore();

  for (let i = 0; i < N; i++) {
    const d = (i / (N - 1)) * 2 - 1;
    const last = i === N - 1;
    ctx.save();
    ctx.translate(d * DEPTH * sinY, bob - d * DEPTH * sinP);
    ctx.scale(cosY, 1);
    ctx.globalAlpha = last ? 1 : 0.34 + 0.3 * (i / N);
    ctx.drawImage(last ? L.face : L.body, -1, -1, 2, 2);
    ctx.restore();
  }

  /* The word has its own tight shadow that travels with it. The 13 keeps the
     wider shadow cast on the dial. */
  ctx.save();
  ctx.translate(DEPTH * sinY + 0.012, bob - DEPTH * sinP + 0.022);
  ctx.scale(cosY, 1);
  ctx.globalAlpha = 0.95;
  ctx.drawImage(L.shWord, -1, -1, 2, 2);
  ctx.restore();

  ctx.save();
  ctx.translate(DEPTH * sinY, bob - DEPTH * sinP);
  ctx.scale(cosY, 1);
  ctx.drawImage(L.word, -1, -1, 2, 2);
  ctx.restore();

  ctx.save();
  ctx.translate(tx * 0.04, ty * 0.04);
  drawFront(ctx, t);
  ctx.restore();
}

export function ServicesDial({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const specks: Speck[] = Array.from({ length: 110 }, () => {
      const a = Math.random() * TAU;
      const r = Math.sqrt(Math.random()) * 0.9;
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        z: Math.random() * 2 - 1,
        teal: Math.random() > 0.4,
        phase: Math.random() * TAU,
      };
    });

    let layers: Layers | null = null;
    let raf = 0;
    let visible = true;
    let alive = true;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      if (!layers) return;
      const t = reduce ? 0.8 : (now - t0) / 1000;
      drawFrame(ctx, layers, specks, t, cx, cy);
    };

    const build = () => {
      const r = box.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const S = Math.round(r.width * dpr);
      if (layers && layers.S === S) return;
      canvas.width = canvas.height = S;
      const family = getComputedStyle(canvas).fontFamily || "sans-serif";
      layers = buildLayers(S, family);
      if (reduce) draw(performance.now());
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !layers) return;
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      draw(now);
    };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(box);

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
    });
    io.observe(box);

    if (!reduce) {
      box.addEventListener("pointermove", onMove);
      box.addEventListener("pointerleave", onLeave);
    }

    /* Wait for the site font so the numeral is drawn in it, not a fallback. */
    const family = getComputedStyle(canvas).fontFamily || "sans-serif";
    const ready = Promise.race([
      document.fonts.load(`700 100px ${family}`),
      new Promise((res) => setTimeout(res, 1500)),
    ]);
    ready.then(() => {
      if (!alive) return;
      build();
      if (!reduce) raf = requestAnimationFrame(loop);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`relative aspect-square w-full ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="font-display absolute inset-0 h-full w-full"
      />
    </div>
  );
}
