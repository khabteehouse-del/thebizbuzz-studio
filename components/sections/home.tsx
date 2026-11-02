import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Services } from "@/components/sections/services";
import { AuditBand } from "@/components/sections/audit-band";
import { Approach } from "@/components/sections/approach";
import { Industries } from "@/components/sections/industries";
import { MizarTeaser } from "@/components/sections/mizar-teaser";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import type { Lang } from "@/data/i18n";

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Services lang={lang} />
      <AuditBand lang={lang} />
      <Approach lang={lang} />
      <Industries lang={lang} />
      <MizarTeaser lang={lang} />
      <Faq lang={lang} />
      <Cta lang={lang} />
    </>
  );
}
