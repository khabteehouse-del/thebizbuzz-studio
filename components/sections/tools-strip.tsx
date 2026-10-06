import { Button } from "@/components/shared/button";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";

/*
  A single free tool, given its own band on the page.

  This is the entry point for the local track. Someone who would never
  fill in a contact form will answer twelve questions about their own
  business, and the score gives them a reason to write in.
*/
export function ToolsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-[#0d2a2b] py-20 md:py-28">
      {/* Picture: sits under the glows so they tint it, which keeps it
          blended with the band. Fades into the band colour at the edges. */}
      <div
        aria-hidden="true"
        className="relative -mt-20 mb-10 h-64 w-full md:absolute md:inset-y-0 md:right-0 md:m-0 md:h-auto md:w-[60%]"
      >
        <Image
          src="/images/free-tool-hero.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover object-[75%_20%] md:object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d2a2b_0%,rgba(13,42,43,0.9)_15%,rgba(13,42,43,0.5)_32%,transparent_60%)] max-md:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0d2a2b_0%,transparent_18%,transparent_75%,#0d2a2b_100%)]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #4fd1c5 50%, transparent)",
          boxShadow: "0 0 24px 2px rgba(79,209,197,0.55)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[56rem] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,209,197,0.20) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, #4fd1c5 0%, transparent 70%)",
          opacity: 0.16,
        }}
      />

      <div className="shell relative z-10">
        <Reveal>
          <div className="flex flex-col items-start gap-8 md:max-w-[48%]">
            <div className="max-w-xl">
              <p
                className="text-xs uppercase tracking-[0.14em]"
                style={{ color: "#4fd1c5", opacity: 0.85 }}
              >
                Free tool
              </p>

              <h2 className="mt-5 font-display text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                Check your Google listing in{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #0d93fd, #11e1f7 60%, #4fd1c5)",
                  }}
                >
                  two minutes
                </span>
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-paper/60 md:text-base">
                Twelve questions about your profile. You get a score out of
                100, the three things costing you the most customers, and a
                written plan. No account needed.
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.6875rem] uppercase tracking-[0.12em] text-paper/70">
                {["Takes 2 min", "No signup", "Results on screen"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="#4fd1c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.2 3.2L13 4.8" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <Button href="/tools/gbp-check" size="lg" accent="#4fd1c5" className="w-full sm:w-auto">
              Run the check
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
