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
const SKY = "78,163,236";
const LIGHT = "156,196,255";
const PALE = "214,232,255";

/* Half the depth of the numeral, in canvas units (the canvas edge is 1). */
const DEPTH = 0.154;

const lerp = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);

type Layers = {
  S: number;
  body: HTMLCanvasElement;
  face: HTMLCanvasElement;
  word: HTMLCanvasElement;
  shNum: HTMLCanvasElement;
  shWord: HTMLCanvasElement;
};

type Speck = { x: number; y: number; z: number; sky: boolean; phase: number };

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
  const wordPx = 0.068 * S;
  const wordY = 0.628 * S;
  const track = 0.021 * S;

  const drawNumeral = (g: CanvasRenderingContext2D, fill: string | CanvasGradient, dx = 0) => {
    g.font = `700 ${numPx}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = fill;
    g.fillText("13", S / 2 + dx, numY);
  };

  /* "SERVICES" drawn letter by letter so the spacing is wide and even. */
  const drawWord = (
    g: CanvasRenderingContext2D,
    fill: string | CanvasGradient,
    dx = 0,
    outline = false,
  ) => {
    const text = "SERVICES";
    g.font = `700 ${wordPx}px ${family}`;
    g.textBaseline = "middle";
    g.textAlign = "left";
    const widths = [...text].map((ch) => g.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + track * (text.length - 1);
    let x = (S - total) / 2 + dx;
    g.fillStyle = fill;
    g.strokeStyle = fill;
    g.lineJoin = "round";
    [...text].forEach((ch, i) => {
      if (outline) g.strokeText(ch, x, wordY);
      else g.fillText(ch, x, wordY);
      x += widths[i] + track;
    });
  };

  /* Depth is a faint light-blue outline, repeated back through the numeral. */
  const body = makeCanvas(S);
  {
    const g = body.getContext("2d")!;
    g.font = `700 ${numPx}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.lineJoin = "round";
    g.lineWidth = 0.0025 * S;
    g.strokeStyle = `rgb(${LIGHT})`;
    g.strokeText("13", S / 2, numY);
  }

  const face = makeCanvas(S);
  {
    const g = face.getContext("2d")!;
    const gr = g.createLinearGradient(0, numY - 0.2 * S, 0, numY + 0.2 * S);
    /* The site's own navy (--color-navy), with a touch of --color-hover on top. */
    gr.addColorStop(0, "#0e2a4a");
    gr.addColorStop(1, "#0a1f44");
    drawNumeral(g, gr);
    /* A thin light rim keeps the dark numeral crisp against the glow. */
    g.lineJoin = "round";
    g.lineWidth = 0.0015 * S;
    g.strokeStyle = `rgba(${PALE},0.95)`;
    g.strokeText("13", S / 2, numY);
  }

  const shNum = makeCanvas(S);
  {
    const g = shNum.getContext("2d")!;
    g.shadowColor = "rgba(22,76,176,0.95)";
    g.shadowBlur = 0.024 * S;
    g.shadowOffsetX = OFF;
    drawNumeral(g, "#000", -OFF);
  }

  /* SERVICES: plain light lettering, so it stays easy to read. */
  const word = makeCanvas(S);
  {
    const g = word.getContext("2d")!;
    const gr = g.createLinearGradient(0, wordY - wordPx * 0.6, 0, wordY + wordPx * 0.6);
    gr.addColorStop(0, "#f4f8ff");
    gr.addColorStop(1, "#b7cff5");
    drawWord(g, gr);
  }

  const shWord = makeCanvas(S);
  {
    const g = shWord.getContext("2d")!;
    g.shadowColor = "rgba(22,76,176,0.95)";
    g.shadowBlur = 0.012 * S;
    g.shadowOffsetX = OFF;
    drawWord(g, "#000", -OFF);
  }

  return { S, body, face, word, shNum, shWord };
}

function ring(g: CanvasRenderingContext2D, r: number, w: number, col: string) {
  g.beginPath();
  g.arc(0, 0, r, 0, TAU);
  g.lineWidth = w;
  g.strokeStyle = col;
  g.stroke();
}

/* Everything behind the numeral: glow, track, comet and inner rings. */
function drawBack(g: CanvasRenderingContext2D, L: Layers, t: number) {
  const th = -Math.PI / 2 + t * 1.4;

  /* Every glow stays inside the outer edge of the track ring. */
  g.save();
  g.beginPath();
  g.arc(0, 0, 0.862, 0, TAU);
  g.clip();

  const gd = g.createRadialGradient(0, 0, 0, 0, 0, 0.86);
  gd.addColorStop(0, `rgba(${SKY},0.24)`);
  gd.addColorStop(0.55, `rgba(${SKY},0.1)`);
  gd.addColorStop(0.86, `rgba(${BLUE},0.12)`);
  gd.addColorStop(1, `rgba(${BLUE},0)`);
  g.fillStyle = gd;
  g.beginPath();
  g.arc(0, 0, 0.86, 0, TAU);
  g.fill();

  ring(g, 0.84, 0.036, `rgba(${BLUE},0.22)`);
  ring(g, 0.84, 0.004, `rgba(${SKY},0.09)`);

  /* Comet: deep blue tail, sky blue body, pale head, with a soft blue glow. */
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
      cr = lerp(59, 78, k);
      cg = lerp(130, 163, k);
      cb = lerp(246, 236, k);
    } else {
      const k = (f - 0.88) / 0.12;
      cr = lerp(78, 222, k);
      cg = lerp(163, 236, k);
      cb = lerp(236, 255, k);
    }
    if (f > 0.72) {
      g.shadowColor = `rgba(${SKY},0.9)`;
      g.shadowBlur = blur;
    } else {
      g.shadowColor = "transparent";
      g.shadowBlur = 0;
    }
    g.beginPath();
    g.arc(0, 0, 0.84, a0, a1 + 0.012);
    g.lineWidth = 0.0025 + 0.007 * f;
    g.strokeStyle = `rgba(${cr},${cg},${cb},${f * f})`;
    g.stroke();
  }
  g.shadowColor = "transparent";
  g.shadowBlur = 0;
  g.lineCap = "butt";

  const hx = Math.cos(th) * 0.84;
  const hy = Math.sin(th) * 0.84;
  const hg = g.createRadialGradient(hx, hy, 0, hx, hy, 0.05);
  hg.addColorStop(0, `rgba(${PALE},0.95)`);
  hg.addColorStop(0.4, `rgba(${SKY},0.4)`);
  hg.addColorStop(1, `rgba(${SKY},0)`);
  g.fillStyle = hg;
  g.beginPath();
  g.arc(hx, hy, 0.05, 0, TAU);
  g.fill();

  /* Inner rings turn the other way. */
  g.save();
  g.rotate(-t * 0.5);
  g.setLineDash([0.02, 0.07]);
  ring(g, 0.68, 0.007, `rgba(${SKY},0.17)`);
  g.restore();
  g.setLineDash([]);
  ring(g, 0.62, 0.002, `rgba(${LIGHT},0.075)`);
  g.restore();
}

/* The glass has a slow pulse: every few seconds the whole dial catches the light. */
const DOME_PERIOD = 8;
const DOME_LENGTH = 3;
const DOME_BASE = 0.14;

function domePulse(t: number) {
  const cycle = Math.floor(t / DOME_PERIOD);
  const p = (t - cycle * DOME_PERIOD) / DOME_LENGTH;
  const on = p >= 0 && p <= 1;
  return {
    cycle,
    p: on ? p : 0,
    pulse: on ? Math.pow(Math.sin(Math.PI * p), 2) : 0,
  };
}

/* Light spilling out past the ring, only while the glass is catching the light. */
function drawHalo(g: CanvasRenderingContext2D, t: number) {
  const { pulse } = domePulse(t);
  if (pulse < 0.01) return;
  const halo = g.createRadialGradient(0, 0, 0.85, 0, 0, 0.965);
  halo.addColorStop(0, `rgba(${SKY},${0.34 * pulse})`);
  halo.addColorStop(0.4, `rgba(${SKY},${0.13 * pulse})`);
  halo.addColorStop(1, `rgba(${SKY},0)`);
  g.fillStyle = halo;
  /* Only the band outside the ring, never the face. */
  g.beginPath();
  g.arc(0, 0, 0.965, 0, TAU);
  g.arc(0, 0, 0.85, 0, TAU, true);
  g.fill("evenodd");
}

/* The glass dome, in front of everything as real glass would be: a bright rim,
   a slightly darker edge so the face looks curved, and a soft highlight in the
   upper left that is always faintly there and flares with the pulse. */
function drawDome(g: CanvasRenderingContext2D, t: number) {
  const { cycle, p, pulse } = domePulse(t);
  const inten = DOME_BASE + (1 - DOME_BASE) * pulse;
  /* The light drifts a little while it flares, and differs slightly each time. */
  const drift = (-0.05 + p * 0.1 + (((cycle * 2.399) % 1) - 0.5) * 0.1) * pulse;

  /* Rim: brightest where the light hits, from the upper left. */
  const rim = g.createLinearGradient(-0.6, -0.6, 0.6, 0.6);
  rim.addColorStop(0, `rgba(${PALE},${0.5 + 0.3 * pulse})`);
  rim.addColorStop(0.5, `rgba(${LIGHT},0.14)`);
  rim.addColorStop(1, `rgba(${LIGHT},0.2)`);
  g.beginPath();
  g.arc(0, 0, 0.862, 0, TAU);
  g.lineWidth = 0.004;
  g.strokeStyle = rim;
  g.stroke();

  g.save();
  g.beginPath();
  g.arc(0, 0, 0.835, 0, TAU);
  g.clip();

  /* Curved edge: a little deeper blue towards the rim. */
  const edge = g.createRadialGradient(0, 0, 0.55, 0, 0, 0.835);
  edge.addColorStop(0, "rgba(6,24,60,0)");
  edge.addColorStop(1, "rgba(6,24,60,0.34)");
  g.fillStyle = edge;
  g.fillRect(-1, -1, 2, 2);

  g.globalCompositeOperation = "lighter";

  const cx = -0.42 + drift;
  const cy = -0.46 + drift;
  const glow = g.createRadialGradient(cx, cy, 0, cx, cy, 1.15);
  glow.addColorStop(0, `rgba(${PALE},${0.3 * inten})`);
  glow.addColorStop(0.45, `rgba(${LIGHT},${0.12 * inten})`);
  glow.addColorStop(1, `rgba(${LIGHT},0)`);
  g.fillStyle = glow;
  g.fillRect(-1, -1, 2, 2);

  /* Curved highlight hugging the inside of the rim, fading out at both ends.
     One stroke with a conic gradient, so it stays smooth. */
  const a0 = -2.95 + drift;
  const span = 1.2;
  const f = span / TAU;
  const streak = (width: number, peak: number, shrink: number) => {
    const start = a0 + (span * (1 - shrink)) / 2;
    const fr = f * shrink;
    const cg = g.createConicGradient(start, 0, 0);
    cg.addColorStop(0, `rgba(${PALE},0)`);
    cg.addColorStop(fr / 2, `rgba(${PALE},${peak * inten})`);
    cg.addColorStop(fr, `rgba(${PALE},0)`);
    cg.addColorStop(1, `rgba(${PALE},0)`);
    g.beginPath();
    g.arc(0, 0, 0.79, 0, TAU);
    g.lineWidth = width;
    g.strokeStyle = cg;
    g.stroke();
  };
  streak(0.034, 0.22, 1);
  streak(0.012, 0.55, 0.7);
  g.restore();
}

/* Thirteen short arcs in front of the numeral, for depth. */
function drawFront(g: CanvasRenderingContext2D, t: number) {
  const seg = (TAU / N) * 0.7;
  g.save();
  g.rotate(t * 0.22);
  g.lineWidth = 0.01;
  g.strokeStyle = `rgba(${LIGHT},0.135)`;
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
    const a = 0.3 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.8 + p.phase));
    g.fillStyle = `rgba(${p.sky ? SKY : BLUE},${a})`;
    g.beginPath();
    g.arc(x, y, 0.003 + 0.004 * (p.z + 1), 0, TAU);
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
  drawHalo(ctx, t);
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

  /* Outline copies stacked back through the numeral, then the face on top. */
  const stack = (bodyImg: HTMLCanvasElement, faceImg: HTMLCanvasElement) => {
    for (let i = 0; i < N; i++) {
      const d = (i / (N - 1)) * 2 - 1;
      const last = i === N - 1;
      ctx.save();
      ctx.translate(d * DEPTH * sinY, bob - d * DEPTH * sinP);
      ctx.scale(cosY, 1);
      ctx.globalAlpha = last ? 1 : 0.05 + 0.08 * (i / N);
      ctx.drawImage(last ? faceImg : bodyImg, -1, -1, 2, 2);
      ctx.restore();
    }
  };
  stack(L.body, L.face);

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

  drawDome(ctx, t);
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
    const specks: Speck[] = Array.from({ length: 36 }, () => {
      const a = Math.random() * TAU;
      const r = Math.sqrt(Math.random()) * 0.76;
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        z: Math.random() * 2 - 1,
        sky: Math.random() > 0.4,
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
