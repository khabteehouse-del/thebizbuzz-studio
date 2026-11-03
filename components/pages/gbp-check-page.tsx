import { GbpChecker } from "@/components/tools/gbp-checker";
import { Headline } from "@/components/sections/headline";
import { Orbs } from "@/components/shared/orbs";
import { gbpText } from "@/data/gbp-text";
import type { Lang } from "@/data/i18n";

/* The free Google Business Profile check, as its own page */
export function GbpCheckPage({ lang }: { lang: Lang }) {
  const p = gbpText[lang].page;

  return (
    <section className="relative min-h-dvh overflow-hidden bg-ink pb-20 pt-28 md:pb-28 md:pt-40">
      <Orbs tone="mixed" intensity={0.9} />
      <div className="shell relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label justify-center">{p.eyebrow}</p>
          <h1 className="mt-6 font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-paper sm:text-4xl md:text-5xl">
            <Headline text={p.h1} mark={p.h1Mark} />
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted">{p.intro}</p>
        </div>

        <div className="mt-12 md:mt-14">
          <GbpChecker lang={lang} />
        </div>
      </div>
    </section>
  );
}
