import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Button } from "@/components/shared/button";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";
import { site } from "@/data/site";

/* The honest proof section: no invented results, a link to real BizBuzz work. */
export function Proof({ lang }: { lang: Lang }) {
  const h = copy[lang].home;

  return (
    <section className="relative overflow-hidden bg-deep py-20 md:py-36">
      <Orbs tone="accent" intensity={0.45} />
      <div className="shell relative z-10 grid gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="section-label">{h.proofEyebrow}</p>
          <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-5xl">
            {h.proofTitle}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">{h.proofText}</p>
          <div className="mt-9">
            <Button href={site.parent.url} variant="ghost" size="lg" external className="w-[18rem] justify-between">
              {h.proofLink}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="rounded-[3px] border border-dashed border-accent-soft/40 bg-accent-soft/[0.05] p-5 text-sm leading-relaxed text-paper/75 md:text-base">
            {h.proofNote}
          </p>
          <p className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-paper">
            {h.whyTitle}
          </p>
          <ul className="mt-5 border-t border-line">
            {h.why.map((item) => (
              <li key={item.title} className="border-b border-line py-5">
                <p className="font-display text-lg font-medium text-paper">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
