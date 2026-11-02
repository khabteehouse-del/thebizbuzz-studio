import { Check } from "lucide-react";
import { CtaLink } from "@/components/ui-kit/cta";
import { Marked } from "@/components/ui-kit/marked";
import { card, eyebrow, h2, lead, section } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

export type ServiceKey = "websites" | "localSeo" | "gbp";

export function ServicePage({ lang, service }: { lang: Lang; service: ServiceKey }) {
  const c = copy[lang];
  const s = c.services[service];
  const contact = path("contact", lang);

  return (
    <>
      <section className="border-b border-line bg-ink py-14 md:py-24">
        <div className="shell max-w-4xl">
          <p className={eyebrow}>{s.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            <Marked text={s.h1} mark={s.h1Mark} />
          </h1>
          <p className={`${lead} mt-6 max-w-2xl`}>{s.intro}</p>
          <div className="mt-8">
            <CtaLink href={contact}>{c.common.freeAudit}</CtaLink>
          </div>
        </div>
      </section>

      <section className={`${section} bg-deep`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{s.featuresTitle}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {s.features.map((f) => (
              <li key={f.title} className={card}>
                <p className="font-display text-xl font-medium text-paper">{f.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${section} bg-ink`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{s.stepsTitle}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {s.steps.map((step, i) => (
              <li key={step.title} className={card}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-amber font-display text-lg font-medium text-ink">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-xl font-medium text-paper">{step.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${section} bg-ocean`}>
        <div className="shell max-w-3xl">
          <h2 className={h2}>{s.fitTitle}</h2>
          <ul className="mt-8 space-y-4">
            {s.fit.map((line) => (
              <li key={line} className="flex gap-3 text-lg text-paper">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-raised">
                  <Check size={14} aria-hidden="true" />
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-navy py-16 text-white md:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            {s.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{s.ctaText}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={contact} variant="light">
              {c.common.bookConsultation}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
