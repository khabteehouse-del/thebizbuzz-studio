import { ContactForm } from "@/components/forms/contact-form";
import { Marked } from "@/components/ui-kit/marked";
import { card, eyebrow, lead } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

export function ContactPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const ct = c.contact;

  return (
    <section className="bg-canvas py-14 md:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className={eyebrow}>{ct.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <Marked text={ct.h1} mark={ct.h1Mark} />
          </h1>
          <p className={`${lead} mt-6`}>{ct.intro}</p>

          <div className={`${card} mt-10`}>
            <p className="font-display text-xl font-extrabold text-ink">{ct.nextTitle}</p>
            <ol className="mt-5 space-y-4">
              {ct.next.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun font-display font-extrabold">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{step.title}</span>
                    <span className="mt-1 block text-base text-ink-soft">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-base font-semibold text-violet-deep">{ct.languageNote}</p>
          <p className="mt-2 text-sm text-muted">{ct.remoteNote}</p>
        </div>

        <ContactForm lang={lang} kind="contact" labels={c.form} />
      </div>
    </section>
  );
}
