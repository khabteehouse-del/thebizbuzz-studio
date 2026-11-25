import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/shared/button";
import { MizarLogo } from "@/components/shared/mizar-logo";
import { SophiaVoice } from "@/components/sections/sophia-voice";
import { site } from "@/data/site";

/*
  Mizar is our own product, so it has its own section apart from the
  thirteen services. Status: deployed. No plans, no prices.
  Two real app screens sit in rounded frames (the .shot-frame style), floating in
  front of Sophia, the assistant, who stands behind them as a transparent cutout.
  The Hear Sophia button plays a short real voice sample (tap only, no autoplay).
  Styles: .mz-* in app/globals.css.
*/
const BLUE = "#4ea3ec";

const screens = [
  {
    src: "/images/mizar/home.webp",
    alt: "Mizar home screen with answered calls, message counts and today's jobs.",
  },
  {
    src: "/images/mizar/talk.webp",
    alt: "Mizar screen where the assistant Sophia answers questions about your day.",
  },
];

export function MizarFlagship() {
  return (
    <section id="mizar" className="relative z-10 overflow-hidden bg-deep py-16 md:py-28">
      <div className="shell">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl border p-7 sm:p-10 md:p-14"
            style={{ backgroundColor: "#0a1220", borderColor: `${BLUE}40` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-28 h-96 w-96 rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)`,
                opacity: 0.25,
              }}
            />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <p className="section-label">Our flagship app</p>
                <div className="mt-7 flex items-center gap-4">
                  <MizarLogo className="h-auto w-44 md:w-56" />
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-display text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: BLUE, borderColor: `${BLUE}66` }}
                  >
                    Deployed
                  </span>
                </div>
                <h2 className="mt-8 max-w-xl font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-5xl">
                  The assistant for people who work at the customer&rsquo;s door
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/70">
                  Mizar answers your calls and messages while you are on the
                  job, collects the details and keeps your day in order, by
                  voice. Built for beauticians, painters, vets and every
                  professional who comes to the customer.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href="/services/mizar" size="lg">
                    See Mizar
                  </Button>
                  <Button href={site.whatsapp.mizarHref} variant="ghost" size="lg" external>
                    Message us for early access
                  </Button>
                </div>
                <SophiaVoice />
              </div>

              <div className="mz-visual" style={{ "--c": BLUE } as React.CSSProperties}>
                <div className="mz-sophia">
                  <span className="mz-sophia-glow" aria-hidden="true" />
                  <Image
                    src="/images/mizar/sophia.webp"
                    alt="Sophia, Mizar's AI voice assistant, wearing a headset."
                    width={900}
                    height={962}
                    sizes="(min-width: 1024px) 28vw, 70vw"
                    className="mz-sophia-img"
                  />
                  <span className="mz-sophia-tag">
                    <span className="mz-sophia-dot" aria-hidden="true" />
                    Sophia, AI voice assistant
                  </span>
                </div>
                <ul className="mz-phones flex items-start gap-5">
                  {screens.map((shot, i) => (
                    <li
                      key={shot.src}
                      className={`shot-float w-1/2 ${i === 1 ? "mt-10" : ""}`}
                    >
                      <div className="shot-frame">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={640}
                          height={1276}
                          sizes="(min-width: 1024px) 20vw, 40vw"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
