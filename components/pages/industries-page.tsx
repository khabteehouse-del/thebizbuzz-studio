import { PageHero, Block, Tiles, Lines, CtaBand } from "@/components/sections/blocks";
import { IndustryRows } from "@/components/sections/industry-rows";
import { Button } from "@/components/shared/button";
import { copy } from "@/data/copy";
import { path, type IndustryKey, type Lang } from "@/data/i18n";

export function IndustriesIndexPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const i = c.industriesIndex;

  return (
    <>
      <PageHero label={c.nav.industries} title={i.h1} mark={i.h1Mark} intro={i.intro} />
      <Block tone="ocean">
        <IndustryRows lang={lang} />
      </Block>
      <CtaBand title={i.otherTitle} text={i.otherText} label={c.nav.cta} href={path("contact", lang)} />
    </>
  );
}

export function IndustryPage({ lang, industry }: { lang: Lang; industry: IndustryKey }) {
  const c = copy[lang];
  const ind = c.industries[industry];
  const contact = path("contact", lang);

  return (
    <>
      <PageHero label={ind.focus} title={ind.h1} mark={ind.h1Mark} intro={ind.intro}>
        <Button href={contact} variant="primary" size="lg" className="w-[17rem] justify-between">
          {c.common.freeAudit}
        </Button>
      </PageHero>
      <Block tone="deep" title={ind.painsTitle}>
        <Tiles items={ind.pains} />
      </Block>
      <Block tone="ocean" title={ind.includedTitle}>
        <Lines items={ind.included} />
      </Block>
      <CtaBand title={ind.closing} label={c.common.bookConsultation} href={contact} />
    </>
  );
}
