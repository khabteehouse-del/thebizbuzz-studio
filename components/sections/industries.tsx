import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { IndustryRows } from "@/components/sections/industry-rows";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

export function Industries({ lang }: { lang: Lang }) {
  const h = copy[lang].home;
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
        <div className="mt-8 md:mt-12">
          <IndustryRows lang={lang} />
        </div>
      </div>
    </section>
  );
}
