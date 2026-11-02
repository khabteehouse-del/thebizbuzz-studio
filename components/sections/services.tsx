import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe, MapPin, Star } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

type ServiceKey = "websites" | "localSeo" | "gbp";

const items: { key: ServiceKey; Icon: typeof Globe; colour: string }[] = [
  { key: "websites", Icon: Globe, colour: "#ffb938" },
  { key: "localSeo", Icon: MapPin, colour: "#8a9cff" },
  { key: "gbp", Icon: Star, colour: "#4fd1c5" },
];

/*
  Service tiles, BizBuzz style: a draw-on icon in the tile's own colour,
  a glow and tinted border on hover, a line that grows next to the link.
*/
export function Services({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-ocean py-14 md:py-20">
      <Orbs tone="mixed" intensity={0.6} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-label">{h.servicesEyebrow}</p>
            <h2 className="mt-5 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
              {h.servicesTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {h.servicesIntro}
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-3">
          {items.map(({ key, Icon, colour }, i) => {
            const s = c.services[key];
            const vars = { "--c": colour, "--mark": colour, "--i": i } as CSSProperties;
            return (
              <li key={key}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    href={path(key, lang)}
                    style={vars}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper/[0.03] p-6 transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[color-mix(in_srgb,var(--c)_55%,transparent)] hover:bg-paper/[0.05] hover:shadow-[0_0_38px_-10px_var(--c)] md:p-7"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.14] blur-[70px] transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: "var(--c)" }}
                    />
                    <span className="relative flex items-center justify-between">
                      <span
                        className="svc-icon flex h-11 w-11 items-center justify-center rounded-[3px] border"
                        style={{
                          color: colour,
                          borderColor: `color-mix(in srgb, ${colour} 40%, transparent)`,
                        }}
                      >
                        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="text-paper/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c)]"
                      />
                    </span>

                    <h3 className="relative mt-6 font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-paper/65 md:text-base">
                      {s.cardLine}
                    </p>

                    <ul className="relative mt-6 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-paper/80">
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] h-px w-3 shrink-0"
                            style={{ background: colour }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <span
                      className="relative mt-auto flex items-center gap-3 pt-8 text-[11px] uppercase tracking-[0.18em]"
                      style={{ color: colour }}
                    >
                      {c.common.learnMore}
                      <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-12" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
