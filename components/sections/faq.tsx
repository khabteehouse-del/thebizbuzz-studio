import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

/*
  Native <details>/<summary> accordion: no React state, no animation
  library. The open/close toggle itself is handled entirely by the
  browser, which is why the earlier "stops responding after one click"
  bug (actually the hero video sitting on top of this section, fixed in
  hero.tsx) can't recur here regardless.

  The smooth expand/collapse below is pure CSS driven off the native
  [open] attribute via Tailwind's group-open: variant (grid-template-rows
  0fr -> 1fr). No JavaScript runs the animation, so there's no
  mount/unmount lifecycle to desync — same reliability guarantee, just
  with a real transition instead of an instant snap.
*/
export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36"
    >
      <Orbs tone="accent" intensity={0.7} />

      <div className="shell relative z-10">
        <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32">
              <p className="section-label">Questions</p>
              <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-5xl">
                Before you write in
              </h2>
            </div>
          </Reveal>

          <div className="border-t border-line">
            {faq.map((item, index) => (
              <details
                key={item.id}
                name="faq"
                open={index === 0}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 text-left transition-colors duration-300 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    {/* Breathing accent dot, only visible on the open item */}
                    <span className="relative hidden h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft group-open:block">
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent-soft" />
                    </span>
                    <span className="font-display text-lg font-medium tracking-[-0.01em] text-paper/75 transition-colors duration-300 group-open:text-accent-soft md:text-xl">
                      {item.question}
                    </span>
                  </span>
                  <span className="mt-1 shrink-0 text-paper/40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45 group-open:text-accent-soft">
                    <Plus size={18} />
                  </span>
                </summary>

                {/*
                  grid-rows 0fr -> 1fr is the only reliable way to
                  transition height when the target height is unknown
                  ("auto"), without measuring it in JS. The inner
                  overflow-hidden clips the content while collapsed.
                */}
                <div className="!grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    {/*
                      Frosted tile behind the answer. Opacity/translate
                      transition is deliberately a touch slower than the
                      grid-rows one above, so the tile visibly settles in
                      just after the space for it opens up.
                    */}
                    <div className="mb-8 origin-top -translate-y-1.5 rounded-[6px] border border-accent-soft/15 bg-accent-soft/[0.06] px-5 py-5 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:translate-y-0 group-open:opacity-100 md:px-6 md:py-6">
                      <p className="max-w-xl pr-4 text-sm leading-relaxed text-muted md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
