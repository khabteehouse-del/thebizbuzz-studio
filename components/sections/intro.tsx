"use client";

import { useEffect, useState } from "react";
import { MapPin, Search, Smartphone } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

const ACCENT = "#ffb938";
const icons = [MapPin, Smartphone, Search];

function usePulse(durationMs: number) {
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
  const phase = (t % durationMs) / durationMs;
  const wave = 0.5 - 0.5 * Math.cos(phase * 2 * Math.PI);
  return { opacity: 0.25 + 0.45 * wave, scale: 0.9 + 0.25 * wave };
}

/* The BizBuzz intro: one big statement, then three quiet pillars with pulsing rings. */
export function Intro({ lang }: { lang: Lang }) {
  const h = copy[lang].home;
  const pulse = usePulse(3000);

  return (
    <section className="relative overflow-hidden border-t border-line py-20 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-ink md:bg-gradient-to-b md:from-ink/85 md:via-ink/92 md:to-ink" />
      <Orbs tone="navy" intensity={0.9} />

      <div className="shell relative z-10">
        <Reveal>
          <p className="max-w-4xl font-display text-xl font-medium leading-[1.4] tracking-[-0.02em] text-paper sm:text-2xl md:text-4xl md:leading-[1.3]">
            {h.soundsTitle}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-16">
            {h.sounds.map((item, i) => {
              const Icon = icons[i] ?? Search;
              return (
                <div key={item.title}>
                  <div className="relative flex h-11 w-11 items-center justify-center">
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 0 1px ${ACCENT}`,
                        opacity: pulse.opacity,
                        transform: `scale(${pulse.scale})`,
                      }}
                    />
                    <Icon size={19} strokeWidth={1.6} style={{ color: ACCENT }} />
                  </div>
                  <p className="mt-5 font-display text-lg font-medium tracking-[-0.01em] text-paper">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
