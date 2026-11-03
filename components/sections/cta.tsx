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
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-stretch lg:gap-10">
            <div className="flex flex-col">
              <p className="section-label">{c.nav.cta}</p>
              <h2 className="mt-8 font-display text-2xl font-medium leading-[1.1] tracking-[-0.035em] text-paper sm:text-3xl md:text-5xl">
                <Headline text={h.finalTitle} mark={h.h1Mark} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {h.finalText}
              </p>

              {/* Phones: a different shot of the presenter, both hands pointing down at the form.
                  No blurred glow here, the crop would show it as a box. A soft shadow instead. */}
              <div
                aria-hidden="true"
                className="pointer-events-none relative mx-auto mt-6 w-[78%] max-w-[18rem] lg:hidden"
              >
                <Image
                  src="/images/anchor/specialist-pointing-v4.png"
                  alt=""
                  width={1029}
                  height={969}
                  quality={90}
                  sizes="(max-width: 1023px) 18rem, 1px"
                  className="h-auto w-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.6)] [-webkit-mask-image:linear-gradient(to_bottom,black_93%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_93%,transparent_100%)]"
                />
              </div>

              {/* Desktop: the presenter, standing right beside the form and pointing at it */}
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
