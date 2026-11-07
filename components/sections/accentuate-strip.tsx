import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/shared/button";

/*
  Homepage band for Accentuate Your Revenues, the US-facing arm of
  BizBuzz. Sits between the two practices and the intro. Links to our
  own /accentuate page first; the standalone site is one more click.
*/
export function AccentuateStrip() {
  return (
    <section id="accentuate" className="relative z-10 bg-ink pb-16 md:pb-28">
      <div className="shell">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl border p-7 sm:p-10 md:p-14"
            style={{ backgroundColor: "#16120a", borderColor: "#e8b64a33" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[90px]"
              style={{
                background:
                  "radial-gradient(circle, #e8b64a 0%, transparent 70%)",
                opacity: 0.16,
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-14">
              <div>
                <p className="section-label">Part of BizBuzz</p>
                <h2 className="mt-6 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-5xl">
                  Accentuate Your Revenues
                </h2>
                <p className="mt-4 font-display text-lg leading-snug text-paper/80 md:text-xl">
                  Our US-facing arm, for businesses across the United States.
                </p>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-paper/60">
                  Websites, local SEO, Google Business Profile, ad campaigns and
                  video ads, run by the same BizBuzz team and held to the same
                  standard of work.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <Button
                  href="https://accentuateyourrevenues.com"
                  size="lg"
                  external
                >
                  Visit Accentuate
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
