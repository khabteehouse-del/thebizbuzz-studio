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
  websites: "bg-sun",
  localSeo: "bg-mint",
  gbp: "bg-lilac",
};

export function HomePage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;
  const contact = path("contact", lang);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden border-b-2 border-ink bg-canvas py-14 md:py-24">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={eyebrow}>{h.eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink md:text-7xl">
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
      <section className={`${section} bg-cream`}>
        <div className="shell">
          <h2 className={`${h2} max-w-3xl`}>{h.soundsTitle}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {h.sounds.map((item) => (
              <li key={item.title} className={card}>
                <p className="font-display text-xl font-extrabold text-ink">{item.title}</p>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={`${section} bg-canvas`}>
        <div className="shell">
          <p className={eyebrow}>{h.servicesEyebrow}</p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.servicesTitle}</h2>
          <p className={`${lead} mt-5 max-w-2xl`}>{h.servicesIntro}</p>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {serviceKeys.map((key) => {
              const s = c.services[key];
              return (
                <li key={key} className={`${card} flex flex-col`}>
                  <span className={`h-3 w-16 rounded-full border-2 border-ink ${serviceAccent[key]}`} />
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">{s.cardLine}</p>
                  <ul className="mt-5 space-y-2 text-base text-ink">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
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
      <section className={`${section} on-dark bg-ink text-white`}>
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-block rounded-md bg-sun px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              {h.auditEyebrow}
            </p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
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
                className="rounded-lg border-2 border-white/30 bg-white/5 px-5 py-4 text-base font-semibold"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className={`${section} bg-canvas`}>
        <div className="shell">
          <p className={eyebrow}>{h.stepsEyebrow}</p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.stepsTitle}</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {h.steps.map((step, i) => (
              <li key={step.title} className={card}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-sun font-display text-lg font-extrabold">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-xl font-extrabold text-ink">{step.title}</p>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries */}
      <section className={`${section} bg-lilac`}>
        <div className="shell">
          <p className="inline-block rounded-md bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-deep">
            {h.industriesEyebrow}
          </p>
          <h2 className={`${h2} mt-5 max-w-3xl`}>{h.industriesTitle}</h2>
          <p className={`${lead} mt-5 max-w-2xl`}>{h.industriesIntro}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industryKeys.map((key) => (
              <li key={key}>
                <Link
                  href={industryPath(key, lang)}
                  className="block h-full rounded-xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)]"
                >
                  <span className="font-display text-xl font-extrabold text-ink">
                    {c.industries[key].name}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-violet-deep">
                    {c.industries[key].focus}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mizar teaser: honest, in development */}
      <section className={`${section} bg-cream`}>
        <div className="shell">
          <div className="rounded-2xl border-2 border-ink bg-white p-7 shadow-[8px_8px_0_0_var(--color-violet)] md:p-12">
            <span className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
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
      <section className={`${section} bg-canvas`}>
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
            <p className="rounded-xl border-2 border-dashed border-ink bg-white p-5 text-base leading-relaxed text-ink-soft">
              {h.proofNote}
            </p>
            <p className="font-display text-2xl font-extrabold text-ink">{h.whyTitle}</p>
            <ul className="space-y-3">
              {h.why.map((item) => (
                <li key={item.title} className="rounded-lg border-2 border-ink bg-mint p-4">
                  <p className="font-bold text-ink">{item.title}</p>
                  <p className="mt-1 text-base text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${section} bg-cream`}>
        <div className="shell max-w-3xl">
          <p className={eyebrow}>{h.faqEyebrow}</p>
          <h2 className={`${h2} mt-5`}>{h.faqTitle}</h2>
          <div className="mt-10 space-y-4">
            {h.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink">
                  {faq.q}
                  <ChevronDown
                    size={22}
                    aria-hidden="true"
                    className="shrink-0 transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="on-dark bg-violet py-16 text-white md:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
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
