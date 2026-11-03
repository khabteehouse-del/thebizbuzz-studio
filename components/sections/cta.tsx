import Image from "next/image";
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
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:items-stretch lg:gap-10">
            <div className="flex flex-col">
              <p className="section-label">{c.nav.cta}</p>
              <h2 className="mt-8 font-display text-2xl font-medium leading-[1.1] tracking-[-0.035em] text-paper sm:text-3xl md:text-5xl">
                <Headline text={h.finalTitle} mark={h.h1Mark} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {h.finalText}
              </p>

              {/* The presenter, standing right beside the form and pointing at it */}
              <div
                aria-hidden="true"
                className="pointer-events-none relative mt-6 hidden min-h-[22rem] flex-1 lg:block"
              >
                <span className="absolute bottom-0 right-6 h-64 w-64 rounded-full bg-accent/25 blur-[90px]" />
                <Image
                  src="/images/anchor/women-anchor-v2.png"
                  alt=""
                  fill
                  sizes="420px"
                  className="object-contain object-bottom-right opacity-95"
                />
              </div>
            </div>
            <ContactForm lang={lang} kind="contact" labels={c.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
