import { ContactForm } from "@/components/forms/contact-form";
import { Orbs } from "@/components/shared/orbs";
import { Reveal } from "@/components/shared/reveal";
import { Headline } from "@/components/sections/headline";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

export function ContactPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const ct = c.contact;

  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-36 md:pb-40 md:pt-52">
      <Orbs tone="mixed" intensity={0.9} />
      <div className="shell relative z-10 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="section-label">{ct.eyebrow}</p>
          <h1 className="mt-8 font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-paper sm:text-5xl md:text-7xl">
            <Headline text={ct.h1} mark={ct.h1Mark} />
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">{ct.intro}</p>

          <p className="mt-12 text-xs uppercase tracking-[0.14em] text-muted">{ct.nextTitle}</p>
          <ol className="mt-5 border-t border-line">
            {ct.next.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-b border-line py-5">
                <span className="font-display text-sm text-[#ffb938]">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-lg font-medium text-paper">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-accent-soft">{ct.languageNote}</p>
          <p className="mt-2 text-sm text-muted">{ct.remoteNote}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm lang={lang} kind="contact" labels={c.form} />
        </Reveal>
      </div>
    </section>
  );
}
