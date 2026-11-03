import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import { industryKeys, type Lang } from "@/data/i18n";

/*
  Who we help: a plain list of the kinds of business we work with. Nothing
  here is clickable, because every business gets the same three services.
*/
export function Industries({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;
  return (
    <section className="relative overflow-hidden bg-ink py-14 md:py-20">
      <Orbs tone="navy" intensity={0.5} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-label">{h.industriesEyebrow}</p>
            <h2 className="mt-5 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
              {h.industriesTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {h.industriesIntro}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-3 md:mt-10">
            {industryKeys.map((key) => (
              <li
                key={key}
                className="rounded-[3px] border border-line bg-paper/[0.04] px-5 py-3 font-display text-base font-medium tracking-[-0.02em] text-paper md:text-lg"
              >
                {c.industries[key].name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
