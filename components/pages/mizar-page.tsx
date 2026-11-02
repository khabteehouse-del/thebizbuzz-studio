import { ContactForm } from "@/components/forms/contact-form";
import { Marked } from "@/components/ui-kit/marked";
import { card, h2, lead, section } from "@/components/ui-kit/styles";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";
import { site } from "@/data/site";

export function MizarPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const m = c.mizar;

  return (
    <>
      <section className="border-b border-line bg-ink py-14 md:py-24">
        <div className="shell max-w-4xl">
          <span className="inline-block rounded-full border border-line bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            {m.badge}
          </span>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
            <Marked text={m.h1} mark={m.h1Mark} />
          </h1>
          <p className={`${lead} mt-6 max-w-2xl`}>{m.intro}</p>
          <p className="mt-6 max-w-2xl rounded border border-dashed border-accent/50 bg-raised p-5 text-base font-semibold leading-relaxed text-paper">
            {m.notice}
          </p>
        </div>
      </section>

      <section className={`${section} bg-deep`}>
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className={h2}>{m.forTitle}</h2>
            <ul className="mt-8 space-y-3">
              {m.forList.map((line) => (
                <li
                  key={line}
                  className="rounded border border-line bg-raised px-5 py-4 text-base font-semibold text-paper"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h2}>{m.doesTitle}</h2>
            <p className={`${lead} mt-4`}>{m.doesIntro}</p>
            <ul className="mt-8 space-y-4">
              {m.does.map((d) => (
                <li key={d.title} className={card}>
                  <p className="font-display text-lg font-medium text-paper">{d.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-paper/75">{d.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold text-accent-soft">{m.languageNote}</p>
          </div>
        </div>
      </section>

      <section className={`${section} bg-navy`}>
        <div className="shell max-w-2xl">
          <h2 className={h2}>{m.formTitle}</h2>
          <p className={`${lead} mt-4`}>{m.formText}</p>
          <div className="mt-8">
            <ContactForm
              lang={lang}
              kind="mizar"
              labels={c.form}
              submitLabel={m.formButton}
              doneTitle={m.formDone}
            />
          </div>
          <p className="mt-6 text-sm font-semibold text-paper/75">
            {m.parentLine}{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {site.parent.name}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
