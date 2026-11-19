"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Btn, Lines, Up } from "./ui";
import { Orb, Petals } from "./scene";
import { scrollToY } from "./shell";
import { brand, journey, marquee, menu, milkyway, services } from "./data";

/* ---------- Trust marquee ---------- */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="pj-marquee" aria-hidden>
      <div className="track">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Milkyway: pinned, colour-shifting, scroll driven ---------- */
export function Milkyway() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const orbY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const v = milkyway[i];

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = Math.min(milkyway.length - 1, Math.max(0, Math.floor(p * milkyway.length)));
    setI((prev) => (prev === n ? prev : n));
  });

  const go = (idx: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const room = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((idx + 0.5) / milkyway.length) * room);
  };

  return (
    <section
      ref={ref}
      id="milkyway"
      className="pj-mw pj-sheet"
      style={{ "--mw-bg": v.bg, "--mw-ink": v.ink } as CSSProperties}
    >
      <div className="stick">
        <div className="wrap grid">
          <div>
            <span className="eyebrow">Signature &middot; Milkyway</span>
            <h2 key={v.id} className="mw-swap">
              {v.name}
              <br />
              <span className="em">{v.tag}</span>
            </h2>
            <p key={`${v.id}-d`} className="desc mw-swap">
              {v.line}
            </p>
            <div className="pj-tabs" role="tablist" aria-label="Milkyway variants">
              {milkyway.map((m, idx) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={idx === i}
                  onClick={() => go(idx)}
                >
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Btn label={`Book ${v.name}`} />
            </div>
          </div>

          <div className="stage">
            <motion.div style={{ rotateY: tilt, position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
              {milkyway.map((m, idx) => (
                <div key={m.id} className={`card${idx === i ? " on" : ""}`}>
                  <Image
                    src={m.image}
                    alt={`Milkyway ${m.name} scrub in a white bowl`}
                    fill
                    sizes="(max-width: 900px) 80vw, 40vw"
                    quality={80}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </motion.div>
            <motion.div style={{ y: orbY, position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div className="pj-orb" style={{ "--orb": v.orb } as CSSProperties} />
            </motion.div>
            <div className="count" aria-hidden>
              0{i + 1}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services: horizontal scroll with 3D tilt cards ---------- */
function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} className="pj-card3d" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -max]);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const measure = () => setMax(Math.max(0, t.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={ref} id="services" className="pj-svc pj-sheet">
      <div className="stick">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <Lines lines={["Care for every", <span key="e" className="em">detail.</span>]} />
        </div>
        <motion.div ref={track} className="track" style={{ x }}>
          {services.map((s, idx) => (
            <Tilt key={s.name}>
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 760px) 70vw, 340px"
                quality={80}
              />
              <span className="no">0{idx + 1}</span>
              <div className="meta">
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </div>
            </Tilt>
          ))}
        </motion.div>
        <div className="wrap hint">Keep scrolling &rarr;</div>
      </div>
    </section>
  );
}

/* ---------- Full treatment list ---------- */
export function Menu() {
  return (
    <section id="menu" className="pj-menu pj-sheet">
      <div className="wrap">
        <span className="eyebrow">All treatments</span>
        <Lines lines={["The full", <span key="e" className="em">menu.</span>]} />
        <ul>
          {menu.map((m, idx) => (
            <li key={m} data-reveal="up" style={{ "--d": idx % 2 } as CSSProperties}>
              {m}
              <small>{String(idx + 1).padStart(2, "0")}</small>
            </li>
          ))}
        </ul>
        <Up className="menu-cta">
          <div style={{ marginTop: 48 }}>
            <Btn variant="gold" label="Ask about a treatment" />
          </div>
        </Up>
      </div>
    </section>
  );
}

/* ---------- Experience collage ---------- */
export function Experience() {
  return (
    <section className="pj-exp pj-sheet">
      <div className="wrap grid">
        <div className="pj-collage" data-reveal="up">
          <div className="a" data-reveal="clip">
            <Image src="/images/pretty-jin/treatment-room.webp" alt="Treatment room with blush bedding and an illuminated mirror" fill sizes="(max-width: 900px) 80vw, 40vw" quality={80} />
          </div>
          <div className="b" data-reveal="clip">
            <Image src="/images/pretty-jin/consultation.webp" alt="A consultation in a calm clinic office" fill sizes="(max-width: 900px) 60vw, 28vw" quality={80} />
          </div>
          <div className="c" data-reveal="clip">
            <Image src="/images/pretty-jin/flatlay-products.webp" alt="Skincare jars on pink satin" fill sizes="(max-width: 900px) 34vw, 16vw" quality={80} />
          </div>
        </div>
        <div>
          <span className="eyebrow">The Pretty Jin way</span>
          <Lines lines={["Korean technique,", <span key="e" className="em">personal care.</span>]} />
          <Up d={1}>
            <p className="body">
              Every visit starts with a conversation, not a menu. We learn your skin,
              your goals and your comfort level, then recommend only what makes sense
              for you.
            </p>
          </Up>
          <Up d={2} className="stats">
            <div>
              <b>{brand.followers}</b>
              <span>Followers</span>
            </div>
            <div>
              <b>{brand.recommend}</b>
              <span>Recommend</span>
            </div>
          </Up>
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking journey ---------- */
export function Journey() {
  return (
    <section className="pj-journey pj-sheet">
      <div className="wrap">
        <span className="eyebrow">How it works</span>
        <Lines lines={["Three easy", <span key="e" className="em">steps.</span>]} />
        <div className="pj-steps">
          {journey.map((s, idx) => (
            <div key={s.n} className="pj-step" data-reveal="up" style={{ "--d": idx } as CSSProperties}>
              <div className="n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Visit ---------- */
export function Visit() {
  const q = encodeURIComponent(brand.mapQuery);
  return (
    <section id="visit" className="pj-visit pj-sheet">
      <div className="wrap grid">
        <div>
          <span className="eyebrow">Visit us</span>
          <Lines lines={["Come as you", <span key="e" className="em">are.</span>]} />
          <Up>
            <dl>
              <div>
                <dt>Studio</dt>
                <dd>
                  <MapPin size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                  {brand.address}
                </dd>
              </div>
              <div>
                <dt>Call</dt>
                <dd>
                  <Phone size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                  <a href={brand.phoneHref}>{brand.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <Mail size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd>{brand.handle} on Instagram and TikTok</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Message us for available slots.</dd>
              </div>
            </dl>
          </Up>
        </div>
        <div className="map" data-reveal="clip">
          <iframe
            title="Map to Pretty Jin Aesthetics"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Final call to action ---------- */
export function Final() {
  return (
    <section className="pj-final pj-sheet">
      <div style={{ position: "absolute", inset: 0, zIndex: -1 }} aria-hidden>
        <Orb size="clamp(110px, 16vw, 240px)" x="6%" y="14%" depth={0} orb="#fff, #f9c4d0 50%, #d9738f" dur={10} />
        <Orb size="clamp(70px, 10vw, 150px)" x="82%" y="62%" depth={0} orb="#fff, #f3dfae 50%, #c9a15b" delay={1.4} dur={8} />
        <Petals count={22} tone="gold" />
      </div>
      <div className="wrap">
        <span className="eyebrow">Your turn</span>
        <Lines lines={["Ready to", <span key="e" className="em">glow?</span>]} />
        <Up d={1}>
          <p className="sub">Send us a message and tell us what you would like to improve. We reply with honest advice.</p>
        </Up>
        <Up d={2}>
          <Btn />
        </Up>
      </div>
    </section>
  );
}

/* ---------- Footer with BizBuzz credit ---------- */
export function Foot() {
  return (
    <footer className="pj-foot">
      <div className="wrap row">
        <span>&copy; {brand.full}. Demo preview.</span>
        <span>
          Website by{" "}
          <a href="https://www.thebizbuzz.studio" target="_blank" rel="noopener noreferrer">
            BizBuzz
          </a>
        </span>
      </div>
    </footer>
  );
}
