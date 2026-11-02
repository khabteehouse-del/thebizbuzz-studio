import { CtaLink } from "@/components/ui-kit/cta";
import { Marked } from "@/components/ui-kit/marked";
import { card, eyebrow, h2, lead, section } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export function AboutPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const a = c.about;
  const family = [a.familyParent, a.familyAgency, a.familyProduct];

  return (
    <>
      <section className="border-b border-line bg-ink py-14 md:py-24">
        <div className="shell max-w-4xl">
          <p className={eyebrow}>{a.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            <Marked text={a.h1} mark={a.h1Mark} />
          </h1>
          <p className={`${lead} mt-6 max-w-2xl`}>{a.intro}</p>
        </div>
      </section>

      <section className={`${section} bg-deep`}>
        <div className="shell max-w-3xl">
          <h2 className={h2}>{a.storyTitle}</h2>
          <div className="mt-8 space-y-5">
            {a.story.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-paper/75">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} bg-ink`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{a.valuesTitle}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {a.values.map((v) => (
              <li key={v.title} className={card}>
                <p className="font-display text-xl font-medium text-paper">{v.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${section} bg-navy`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{a.familyTitle}</h2>
          <p className={`${lead} mt-5 max-w-2xl`}>{a.familyIntro}</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {family.map((f) => (
              <li key={f.title} className={card}>
                <p className="font-display text-xl font-medium text-paper">{f.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-navy py-16 text-white md:py-24">
        <div className="shell max-w-3xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
            {a.honestTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">{a.honestText}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={path("contact", lang)} variant="light">
              {c.common.freeAudit}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
