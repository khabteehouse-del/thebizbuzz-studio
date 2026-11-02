import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { ContactForm } from "@/components/forms/contact-form";
import { Headline } from "@/components/sections/headline";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

/* The closing band with the enquiry form, as on BizBuzz (#contact). */
export function Cta({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-deep">
      <Orbs tone="mixed" intensity={1} />
      <div className="shell relative py-16 md:py-24">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
            <div className="max-w-3xl">
              <p className="section-label">{c.nav.cta}</p>
              <h2 className="mt-8 font-display text-2xl font-medium leading-[1.1] tracking-[-0.035em] text-paper sm:text-3xl md:text-5xl">
                <Headline text={h.finalTitle} mark={h.h1Mark} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {h.finalText}
              </p>
            </div>
            <ContactForm lang={lang} kind="contact" labels={c.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
