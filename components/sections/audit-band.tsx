import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/shared/button";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

const TEAL = "#4fd1c5";

/* The free-audit band, in the same teal BizBuzz uses for its free tool. */
export function AuditBand({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;

  return (
    <section className="relative overflow-hidden bg-deep py-20 md:py-36">
      <Orbs tone="accent" intensity={0.55} />
      <div className="shell relative z-10">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <p className="section-label" style={{ color: TEAL }}>
                {h.auditEyebrow}
              </p>
              <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
                {h.auditTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {h.auditText}
              </p>
              <div className="mt-10">
                <Magnetic strength={14}>
                  <Button
                    href={path("contact", lang)}
                    variant="primary"
                    size="lg"
                    accent={TEAL}
                    className="w-[17rem] justify-between"
                  >
                    {c.common.freeAudit}
                  </Button>
                </Magnetic>
              </div>
            </div>

            <ul className="space-y-3">
              {h.auditPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 rounded-[3px] border border-line bg-paper/[0.04] px-5 py-4 text-sm text-paper/90 transition-colors duration-300 hover:border-[#4fd1c5]/40 md:text-base"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: `${TEAL}99`, color: TEAL }}
                  >
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
