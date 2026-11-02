import { ContactForm } from "@/components/forms/contact-form";
import { PageHero, Block, Tiles, Lines } from "@/components/sections/blocks";
import { Reveal } from "@/components/shared/reveal";
import { MizarLogo } from "@/components/shared/mizar-logo";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";
import { site } from "@/data/site";

export function MizarPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const m = c.mizar;

  return (
    <>
      <PageHero
        label={m.badge}
        title={m.h1}
        mark={m.h1Mark}
        intro={m.intro}
        aside={
          <div className="flex items-center justify-center rounded-2xl border border-line bg-paper/[0.03] px-6 py-14">
            <MizarLogo className="h-auto w-[80%] max-w-[22rem]" />
          </div>
        }
      >
        <p className="max-w-2xl rounded-[3px] border border-dashed border-[#ffb938]/50 bg-[#ffb938]/[0.05] p-5 text-sm leading-relaxed text-paper/85 md:text-base">
          {m.notice}
        </p>
      </PageHero>

      <Block tone="deep" title={m.forTitle}>
        <Lines items={m.forList} />
      </Block>

      <Block tone="ocean" title={m.doesTitle} intro={m.doesIntro}>
        <Tiles items={m.does} cols={m.does.length % 3 === 0 ? 3 : 2} />
        <p className="mt-10 text-sm text-accent-soft md:text-base">{m.languageNote}</p>
      </Block>

      <section className="relative overflow-hidden bg-deep py-24 md:py-36">
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper md:text-6xl">
              {m.formTitle}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg">{m.formText}</p>
            <p className="mt-8 text-sm text-paper/70">
              {m.parentLine}{" "}
              <a
                href={site.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4"
              >
                {site.parent.name}
              </a>
            </p>
          </Reveal>
          <ContactForm
            lang={lang}
            kind="mizar"
            labels={c.form}
            submitLabel={m.formButton}
            doneTitle={m.formDone}
          />
        </div>
      </section>
    </>
  );
}
