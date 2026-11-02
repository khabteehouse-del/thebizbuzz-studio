import { Plus } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

/*
  Native details/summary accordion, exactly as on BizBuzz: no React state,
  and the open/close is a pure CSS grid-rows transition, so it cannot desync.
*/
export function Faq({ lang }: { lang: Lang }) {
  const h = copy[lang].home;

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-ink py-14 md:py-20">
      <Orbs tone="accent" intensity={0.7} />

      <div className="shell relative z-10">
        <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32">
              <p className="section-label">{h.faqEyebrow}</p>
              <h2 className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                {h.faqTitle}
              </h2>
            </div>
          </Reveal>

          <div className="border-t border-line">
            {h.faqs.map((item, index) => (
              <details key={item.q} name="faq" open={index === 0} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors duration-300 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <span className="relative hidden h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft group-open:block">
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent-soft" />
                    </span>
                    <span className="font-display text-lg font-medium tracking-[-0.01em] text-paper/75 transition-colors duration-300 group-open:text-accent-soft md:text-xl">
                      {item.q}
                    </span>
                  </span>
                  <span className="mt-1 shrink-0 text-paper/40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45 group-open:text-accent-soft">
                    <Plus size={18} />
                  </span>
                </summary>

                <div className="!grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mb-8 origin-top -translate-y-1.5 rounded-[6px] border border-accent-soft/15 bg-accent-soft/[0.06] px-5 py-5 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:translate-y-0 group-open:opacity-100 md:px-6 md:py-6">
                      <p className="max-w-xl pr-4 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
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
