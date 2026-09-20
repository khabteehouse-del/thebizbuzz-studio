import { approach } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";

export function Approach() {
  return (
    <section id="approach" className="relative overflow-hidden bg-deep py-20 md:py-36">
      {/*
        Background flowing-light banner, subtle: low opacity, masked to
        fade into the section's own background at top and bottom, so it
        reads as texture rather than an inserted image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.09]"
        style={{
          backgroundImage: "url(/images/banners/banner-3.jpg)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32">
              <p className="section-label">How we work</p>
              <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
                Fewer surprises, by design
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
                The process below is not a philosophy. It is what we do on
                every engagement, in this order, because it is the sequence
                that stops projects going wrong.
              </p>
            </div>
          </Reveal>

          <ol className="space-y-px bg-line">
            {approach.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.06}>
                <li className="bg-ink py-7 md:py-11">
                  <div className="flex gap-5 md:gap-10">
                    <span className="shrink-0 pt-1 font-display text-sm text-accent">
                      {step.id}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
