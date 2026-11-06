import { PageHero, Block } from "@/components/sections/blocks";
import { Reveal } from "@/components/shared/reveal";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

/* Privacy Policy and Terms: plain headed sections, no extras */
export function LegalPage({ lang, doc }: { lang: Lang; doc: "privacy" | "terms" }) {
  const l = copy[lang].legal[doc];

  return (
    <>
      <PageHero label={l.eyebrow} title={l.h1} mark={l.h1Mark} intro={l.intro}>
        <p className="text-sm text-muted">{l.updated}</p>
      </PageHero>

      <Block tone="deep" title="">
        <div className="max-w-3xl space-y-10">
          {l.sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.03}>
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.text.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-paper/75">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Block>
    </>
  );
}
