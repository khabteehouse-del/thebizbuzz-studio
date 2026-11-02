import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/shared/button";
import { Headline } from "@/components/sections/headline";

/*
  Building blocks for the inner pages. Same look as the home page: section
  label, large tight headings, orbs behind, reveal on scroll, bordered
  tiles with the BizBuzz hover.
*/

export function PageHero({
  label,
  title,
  mark,
  intro,
  children,
  aside,
}: {
  label: string;
  title: string;
  mark: string;
  intro: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink pb-10 pt-28 md:pb-16 md:pt-40">
      <Orbs tone="mixed" intensity={0.85} />
      <div className="shell relative z-10">
        <Reveal>
          <div className={aside ? "grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center" : ""}>
            <div className="max-w-4xl">
              <p className="section-label">{label}</p>
              <h1 className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-paper sm:text-4xl md:text-5xl">
                <Headline text={title} mark={mark} />
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg md:leading-relaxed">
                {intro}
              </p>
              {children && <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>}
            </div>
            {aside}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Block({
  tone = "ink",
  label,
  title,
  intro,
  children,
}: {
  tone?: "ink" | "deep" | "ocean";
  label?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
}) {
  const bg = tone === "deep" ? "bg-deep" : tone === "ocean" ? "bg-ocean" : "bg-ink";
  return (
    <section className={`relative overflow-hidden ${bg} py-14 md:py-20`}>
      <Orbs tone={tone === "ink" ? "navy" : "accent"} intensity={0.4} />
      <div className="shell relative z-10">
        {title && (
          <Reveal>
            <div className="mb-8 max-w-3xl md:mb-10">
              {label && <p className="section-label">{label}</p>}
              <h2 className="mt-5 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                {title}
              </h2>
              {intro && <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function Tiles({
  items,
  cols = 3,
}: {
  items: { title: string; text: string }[];
  cols?: 2 | 3;
}) {
  return (
    <ul className={`grid gap-5 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((item, i) => (
        <li key={item.title}>
          <Reveal delay={i * 0.07} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper/[0.03] p-6 transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-soft/45 hover:bg-paper/[0.05] hover:shadow-[0_0_38px_-12px_var(--color-accent-soft)] md:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative block font-display text-xs text-[#ffb938]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative mt-4 font-display text-lg font-medium tracking-[-0.02em] text-paper md:text-xl">
                {item.title}
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-paper/65 md:text-base">{item.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function Lines({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((line, i) => (
        <li key={line} className="border-b border-line">
          <Reveal delay={i * 0.04}>
            <div className="group flex items-start gap-5 px-2 py-4 transition-colors duration-500 hover:bg-accent-soft/[0.06] md:px-5 md:py-5">
              <span className="mt-1.5 h-px w-6 shrink-0 bg-[#ffb938] transition-all duration-300 group-hover:w-10" />
              <span className="font-display text-base font-medium tracking-[-0.01em] text-paper/90 md:text-xl">{line}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title,
  text,
  label,
  href,
}: {
  title: string;
  text?: string;
  label: string;
  href: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deep py-16 md:py-24">
      <Orbs tone="mixed" intensity={1} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-3xl md:text-4xl">
              {title}
            </h2>
            {text && <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{text}</p>}
            <div className="mt-10">
              <Magnetic strength={14}>
                <Button href={href} variant="primary" size="lg" className="w-[17rem] justify-between">
                  {label}
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
