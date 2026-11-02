import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { IndustryRows } from "@/components/sections/industry-rows";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

export function Industries({ lang }: { lang: Lang }) {
  const h = copy[lang].home;
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-36">
      <Orbs tone="navy" intensity={0.5} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-label">{h.industriesEyebrow}</p>
            <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
              {h.industriesTitle}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {h.industriesIntro}
            </p>
          </div>
        </Reveal>
        <div className="mt-14 md:mt-20">
          <IndustryRows lang={lang} />
        </div>
      </div>
    </section>
  );
}
