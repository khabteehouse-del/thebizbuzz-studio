import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/shared/button";
import { MizarLogo } from "@/components/shared/mizar-logo";
import { site } from "@/data/site";

/*
  Mizar is our own product, so it has its own section apart from the
  thirteen services. Honest status: in testing. No plans, no prices.
  Two real app screens sit in rounded frames (the .shot-frame style).
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
                    In testing
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
              </div>

              <ul
                className="mx-auto flex w-full max-w-[26rem] items-start gap-5 lg:max-w-none"
                style={{ "--c": BLUE } as React.CSSProperties}
              >
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
        </Reveal>
      </div>
    </section>
  );
}
