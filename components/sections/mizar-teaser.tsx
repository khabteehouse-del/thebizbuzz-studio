import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Button } from "@/components/shared/button";
import { MizarLogo } from "@/components/shared/mizar-logo";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

/* Mizar is shown honestly: in development, waitlist only. */
export function MizarTeaser({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;

  return (
    <section className="relative overflow-hidden bg-ocean py-14 md:py-20">
      <Orbs tone="mixed" intensity={0.6} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="relative grid gap-10 overflow-hidden rounded-2xl border border-line bg-paper/[0.03] p-7 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16 md:p-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[90px]"
            />
            <div className="relative flex items-center justify-center rounded-xl border border-line bg-ink/70 px-6 py-12 md:py-16">
              <MizarLogo className="h-auto w-[78%] max-w-[22rem]" />
            </div>
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ffb938]/50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ffb938]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#ffb938]" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#ffb938]" />
                </span>
                {h.mizarBadge}
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper md:text-3xl">
                {h.mizarTitle}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{h.mizarText}</p>
              <div className="mt-8">
                <Button href={path("mizar", lang)} variant="ghost" size="lg" className="w-[16rem] justify-between">
                  {h.mizarCta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
