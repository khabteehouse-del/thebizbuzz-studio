import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { MapPinPulse } from "@/components/shared/map-pin-pulse";

/*
  A single free tool, given its own band on the page.

  This is the entry point for the local track. Someone who would never
  fill in a contact form will answer twelve questions about their own
  business, and the score gives them a reason to write in.
*/
export function ToolsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-[#0d2a2b] py-16 md:py-24">
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
            <div className="scale-[0.8] md:scale-100">
              <MapPinPulse colour="#4fd1c5" size={132} />
            </div>

            <div className="max-w-xl md:flex-1">
              <p
                className="text-xs uppercase tracking-[0.14em]"
                style={{ color: "#4fd1c5", opacity: 0.85 }}
              >
                Free tool
              </p>

              <h2 className="mt-5 font-display text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                Check your Google listing in two minutes
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-paper/60 md:text-base">
                Twelve questions about your profile. You get a score out of
                100, the three things costing you the most customers, and a
                written plan. No account, no email required.
              </p>
            </div>

            <Link
              href="/tools/gbp-check"
              className="group/btn relative inline-flex h-[3.1rem] w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-[2px] border px-6 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-paper sm:w-auto md:h-[3.4rem] md:px-9 md:text-[0.8125rem]"
              style={{ borderColor: "#4fd1c5", backgroundColor: "#4fd1c51a" }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100"
              />
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-ink">
                Run the check
              </span>
              <span
                aria-hidden="true"
                className="relative z-10 h-px w-4 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:w-7 group-hover/btn:bg-ink"
                style={{ backgroundColor: "#4fd1c5" }}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
