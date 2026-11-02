import Link from "next/link";
import { CtaLink } from "@/components/ui-kit/cta";
import { Marked } from "@/components/ui-kit/marked";
import { card, eyebrow, h2, lead, section } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import {
  industryKeys,
  industryPath,
  path,
  type IndustryKey,
  type Lang,
} from "@/data/i18n";

export function IndustriesIndexPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const i = c.industriesIndex;

  return (
    <>
      <section className="border-b border-line bg-ink py-14 md:py-24">
        <div className="shell max-w-4xl">
          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            <Marked text={i.h1} mark={i.h1Mark} />
          </h1>
          <p className={`${lead} mt-6 max-w-2xl`}>{i.intro}</p>
        </div>
      </section>

      <section className={`${section} bg-navy`}>
        <div className="shell">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industryKeys.map((key) => (
              <li key={key}>
                <Link
                  href={industryPath(key, lang)}
                  className={`${card} block h-full transition `}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent-soft">
                    {c.industries[key].focus}
                  </span>
                  <span className="mt-3 block font-display text-2xl font-medium text-paper">
                    {c.industries[key].name}
                  </span>
                  <span className="mt-3 block text-base leading-relaxed text-paper/75">
                    {c.industries[key].metaDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${section} bg-ink`}>
        <div className="shell max-w-3xl text-center">
          <h2 className={h2}>{i.otherTitle}</h2>
          <p className={`${lead} mt-5`}>{i.otherText}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={path("contact", lang)}>{c.nav.cta}</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function IndustryPage({ lang, industry }: { lang: Lang; industry: IndustryKey }) {
  const c = copy[lang];
  const ind = c.industries[industry];

  return (
    <>
      <section className="border-b border-line bg-ink py-14 md:py-24">
        <div className="shell max-w-4xl">
          <p className={eyebrow}>{ind.focus}</p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            <Marked text={ind.h1} mark={ind.h1Mark} />
          </h1>
          <p className={`${lead} mt-6 max-w-2xl`}>{ind.intro}</p>
          <div className="mt-8">
            <CtaLink href={path("contact", lang)}>{c.common.freeAudit}</CtaLink>
          </div>
        </div>
      </section>

      <section className={`${section} bg-deep`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{ind.painsTitle}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {ind.pains.map((p) => (
              <li key={p.title} className={card}>
                <p className="font-display text-xl font-medium text-paper">{p.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${section} bg-ocean`}>
        <div className="shell max-w-3xl">
          <h2 className={h2}>{ind.includedTitle}</h2>
          <ul className="mt-8 space-y-3">
            {ind.included.map((line) => (
              <li
                key={line}
                className="rounded border border-line bg-raised px-5 py-4 text-base font-semibold text-paper"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-navy py-16 text-white md:py-24">
        <div className="shell text-center">
          <p className="mx-auto max-w-3xl font-display text-2xl font-medium leading-snug md:text-4xl">
            {ind.closing}
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={path("contact", lang)} variant="light">
              {c.common.bookConsultation}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
