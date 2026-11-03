import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Button } from "@/components/shared/button";
import { TradeStrip } from "@/components/sections/trade-strip";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";
import { trades } from "@/data/trades";

/*
  Who we help: a slow strip of photos showing the kinds of business we work
  with. Nothing is a link to another page, because every business gets the
  same three services. The only action is the free check underneath.
*/
export function Industries({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;
  const items = trades.map((t) => ({ src: t.src, name: t.name[lang] }));

  return (
    <section className="relative overflow-hidden bg-ink py-14 md:py-20">
      <Orbs tone="navy" intensity={0.5} />
      <div className="relative z-10">
        <div className="shell">
          <Reveal>
            <div className="max-w-3xl">
              <p className="section-label">{h.industriesEyebrow}</p>
              <h2 className="mt-5 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                {h.industriesTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {h.industriesIntro}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-12">
          <TradeStrip items={items} />
        </div>

        <div className="shell mt-8 md:mt-10">
          <Button
            href={path("gbpCheck", lang)}
            variant="primary"
            size="lg"
            className="w-[17rem] justify-between"
          >
            {c.common.freeAudit}
          </Button>
        </div>
      </div>
    </section>
  );
}
