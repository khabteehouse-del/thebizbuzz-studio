import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { ScorePreview } from "@/components/shared/score-preview";

/*
  A single free tool, given its own band on the page.

  This is the entry point for the local track. Someone who would never
  fill in a contact form will answer twelve questions about their own
  business, and the score gives them a reason to write in.
*/
export function ToolsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-[#0d2a2b] py-20 md:py-28">
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
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-14">
            <div className="shrink-0 self-center">
              <ScorePreview colour="#4fd1c5" />
            </div>

            <div className="max-w-xl md:flex-1">
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

            <Link
              href="/tools/gbp-check"
              className="fuse-btn group/btn relative isolate inline-flex h-[3.1rem] w-full shrink-0 items-center justify-center gap-3 rounded-[2px] px-7 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_0_32px_-4px_rgba(79,209,197,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_-2px_rgba(79,209,197,0.85)] sm:w-auto md:h-[3.4rem] md:px-10 md:text-[0.8125rem]"
              style={
                {
                  backgroundColor: "#4fd1c5",
                  "--fuse-color": "#ffffff",
                  "--fuse-duration": "6s",
                } as React.CSSProperties
              }
            >
              <span className="relative z-10">Run the check</span>
              <span
                aria-hidden="true"
                className="relative z-10 h-px w-4 bg-ink transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:w-7"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
