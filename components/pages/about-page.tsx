import { PageHero, Block, Tiles, CtaBand } from "@/components/sections/blocks";
import { Reveal } from "@/components/shared/reveal";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export function AboutPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const a = c.about;

  return (
    <>
      <PageHero label={a.eyebrow} title={a.h1} mark={a.h1Mark} intro={a.intro} />

      <Block tone="deep" title={a.storyTitle}>
        <div className="max-w-3xl space-y-6">
          {a.story.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-paper/75 md:text-xl md:leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title={a.valuesTitle}>
        <Tiles items={a.values} />
      </Block>

      <Block tone="ocean" title={a.familyTitle} intro={a.familyIntro}>
        <Tiles items={[a.familyParent, a.familyAgency, a.familyProduct]} />
      </Block>

      <CtaBand title={a.honestTitle} text={a.honestText} label={c.common.freeAudit} href={path("gbpCheck", lang)} />
    </>
  );
}
