import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CtaLink, TextLink } from "@/components/ui-kit/cta";
import { HeroArt } from "@/components/ui-kit/hero-art";
import { Marked } from "@/components/ui-kit/marked";
import { card, chip, eyebrow, h2, lead, section } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import { industryKeys, industryPath, path, type Lang } from "@/data/i18n";
import { site } from "@/data/site";

type ServiceKey = "websites" | "localSeo" | "gbp";
const serviceKeys: ServiceKey[] = ["websites", "localSeo", "gbp"];
const serviceAccent: Record<ServiceKey, string> = {
  websites: "bg-amber",
  localSeo: "bg-accent-soft",
  gbp: "bg-teal",
};

export function HomePage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;
  const contact = path("contact", lang);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden border-b border-line bg-ink py-14 md:py-24">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={eyebrow}>{h.eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-paper md:text-7xl">
              {h.h1Before}
              <span className="mark">{h.h1Mark}</span>
              {h.h1After}
            </h1>
            <p className={`${lead} mt-6 max-w-xl`}>{h.sub}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaLink href={contact}>{c.common.freeAudit}</CtaLink>
              <CtaLink href="#services" variant="outline" arrow={false}>
                {c.common.seeServices}
              </CtaLink>
            </div>
            <p className="mt-5 text-sm font-semibold text-muted">{h.note}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {h.chips.map((label) => (
                <li key={label} className={chip}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <HeroArt
            title={h.heroCardTitle}
            chips={h.heroCardChips}
            caption={c.common.illustration}
          />
        </div>
      </section>

      {/* Problems */}
      <section className={`${section} bg-deep`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{h.soundsTitle}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {h.sounds.map((item) => (
              <li key={item.title} className={card}>
                <p className="font-display text-xl font-medium text-paper">{item.title}</p>
                <p className="mt-3 text-base leading-relaxed text-paper/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={`${section} bg-ink`}>
        <div className="shell">
          <p className={eyebrow}>{h.servicesEyebrow}</p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.servicesTitle}</h2>
          <p className={`${lead} mt-5 max-w-2xl`}>{h.servicesIntro}</p>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {serviceKeys.map((key) => {
              const s = c.services[key];
              return (
                <li key={key} className={`${card} flex flex-col`}>
                  <span className={`h-1 w-12 rounded-full ${serviceAccent[key]}`} />
                  <h3 className="mt-5 font-display text-2xl font-medium text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-paper/75">{s.cardLine}</p>
                  <ul className="mt-5 space-y-2 text-base text-paper">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <TextLink href={path(key, lang)}>{c.common.learnMore}</TextLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Free audit */}
      <section className={`${section} on-dark bg-navy text-white`}>
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-block rounded bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              {h.auditEyebrow}
            </p>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {h.auditTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{h.auditText}</p>
            <div className="mt-8">
              <CtaLink href={contact} variant="light">
                {c.common.freeAudit}
              </CtaLink>
            </div>
          </div>
          <ul className="space-y-3">
            {h.auditPoints.map((point) => (
              <li
                key={point}
                className="rounded border border-line bg-white/5 px-5 py-4 text-base font-semibold"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className={`${section} bg-ink`}>
        <div className="shell">
          <p className={eyebrow}>{h.stepsEyebrow}</p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.stepsTitle}</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {h.steps.map((step, i) => (
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

      {/* Industries */}
      <section className={`${section} bg-navy`}>
        <div className="shell">
          <p className="inline-block rounded bg-raised px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-soft">
            {h.industriesEyebrow}
          </p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.industriesTitle}</h2>
          <p className={`${lead} mt-5 max-w-2xl`}>{h.industriesIntro}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industryKeys.map((key) => (
              <li key={key}>
                <Link
                  href={industryPath(key, lang)}
                  className="block h-full rounded border border-line bg-raised p-5 transition "
                >
                  <span className="font-display text-xl font-medium text-paper">
                    {c.industries[key].name}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-accent-soft">
                    {c.industries[key].focus}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mizar teaser: honest, in development */}
      <section className={`${section} bg-deep`}>
        <div className="shell">
          <div className="rounded border border-line bg-raised p-7 md:p-12">
            <span className="inline-block rounded-full border border-line bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              {h.mizarBadge}
            </span>
            <h2 className={`${h2} mt-5 max-w-2xl`}>{h.mizarTitle}</h2>
            <p className={`${lead} mt-4 max-w-2xl`}>{h.mizarText}</p>
            <div className="mt-8">
              <CtaLink href={path("mizar", lang)} variant="dark">
                {h.mizarCta}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* Proof: honest, no invented results */}
      <section className={`${section} bg-ink`}>
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>{h.proofEyebrow}</p>
            <h2 className={`${h2} mt-5`}>{h.proofTitle}</h2>
            <p className={`${lead} mt-5`}>{h.proofText}</p>
            <div className="mt-7">
              <CtaLink href={site.parent.url} variant="outline" external>
                {h.proofLink}
              </CtaLink>
            </div>
          </div>
          <div className="space-y-4">
            <p className="rounded border border-dashed border-accent/50 bg-raised p-5 text-base leading-relaxed text-paper/75">
              {h.proofNote}
            </p>
            <p className="font-display text-2xl font-medium text-paper">{h.whyTitle}</p>
            <ul className="space-y-3">
              {h.why.map((item) => (
                <li key={item.title} className="rounded border border-line bg-ocean p-4">
                  <p className="font-bold text-paper">{item.title}</p>
                  <p className="mt-1 text-base text-paper/75">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${section} bg-deep`}>
        <div className="shell max-w-3xl">
          <p className={eyebrow}>{h.faqEyebrow}</p>
          <h2 className={`${h2} mt-5`}>{h.faqTitle}</h2>
          <div className="mt-10 space-y-4">
            {h.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded border border-line bg-raised p-5 "
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-paper">
                  {faq.q}
                  <ChevronDown
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-base leading-relaxed text-paper/75">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="on-dark bg-accent py-16 text-white md:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            <Marked text={h.finalTitle} mark={h.h1Mark} tone="block" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 md:text-xl">{h.finalText}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={contact} variant="light">
              {c.common.freeAudit}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
