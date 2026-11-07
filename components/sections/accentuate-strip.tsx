import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/shared/button";

/*
  Homepage band for Accentuate Your Revenues, the US-facing arm of
  BizBuzz. Colours follow the Accentuate site itself: deep navy base,
  electric blue border and glow, amber highlight. The worker sits on
  the right on desktop and is hidden on phones to keep the tile light.
  Button goes straight to the standalone site.
*/
const BLUE = "#4f6bff";
const AMBER = "#ffb938";

export function AccentuateStrip() {
  return (
    <section id="accentuate" className="relative z-10 bg-ink pb-16 md:pb-28">
      <div className="shell">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl border p-7 sm:p-10 md:min-h-[22rem] md:p-14"
            style={{ backgroundColor: "#0c1c2b", borderColor: `${BLUE}40` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-28 h-96 w-96 rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)`,
                opacity: 0.28,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-[6%] hidden h-80 w-80 rounded-full blur-[100px] md:block"
              style={{
                background: `radial-gradient(circle, ${AMBER} 0%, transparent 70%)`,
                opacity: 0.22,
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-4 hidden w-[30rem] max-w-[42%] md:block"
            >
              <Image
                src="/images/accentuate/worker.webp"
                alt=""
                width={800}
                height={769}
                sizes="(min-width: 768px) 30rem, 0px"
                className="h-auto w-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.55)]"
              />
            </div>

            <div className="relative max-w-xl md:max-w-[52%]">
              <span
                aria-hidden="true"
                className="block h-px w-10"
                style={{ backgroundColor: AMBER }}
              />
              <p className="section-label mt-5">Part of BizBuzz</p>
              <h2 className="mt-6 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-5xl">
                Accentuate Your Revenues
              </h2>
              <p className="mt-4 font-display text-lg leading-snug text-paper/80 md:text-xl">
                Our US-facing arm, for businesses across the United States.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-paper/60">
                Websites, local SEO, Google Business Profile, ad campaigns and
                video ads, run by the same BizBuzz team and held to the same
                standard of work.
              </p>
              <div className="mt-8">
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
