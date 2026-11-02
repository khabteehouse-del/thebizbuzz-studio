import { PageHero, Block, Tiles, Lines, CtaBand } from "@/components/sections/blocks";
import { Button } from "@/components/shared/button";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export type ServiceKey = "websites" | "localSeo" | "gbp";

export function ServicePage({ lang, service }: { lang: Lang; service: ServiceKey }) {
  const c = copy[lang];
  const s = c.services[service];
  const contact = path("contact", lang);

  return (
    <>
      <PageHero label={s.eyebrow} title={s.h1} mark={s.h1Mark} intro={s.intro}>
        <Button href={contact} variant="primary" size="lg" className="w-[17rem] justify-between">
          {c.common.freeAudit}
        </Button>
      </PageHero>

      <Block tone="deep" title={s.featuresTitle}>
        <Tiles items={s.features} cols={s.features.length % 3 === 0 ? 3 : 2} />
      </Block>

      <ServiceSteps title={s.stepsTitle} steps={s.steps} />

      <Block tone="ocean" title={s.fitTitle}>
        <Lines items={s.fit} />
      </Block>

      <CtaBand title={s.ctaTitle} text={s.ctaText} label={c.common.bookConsultation} href={contact} />
    </>
  );
}

/* The steps, laid out as the same scroll-filled timeline as the home page */
function ServiceSteps({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  return (
    <Block title={title}>
      <Tiles items={steps} cols={steps.length === 4 ? 2 : 3} />
    </Block>
  );
}

