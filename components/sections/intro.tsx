import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

export function Intro() {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 md:py-40">
      {/*
        No solid background here. The fixed hero video sits behind this
        section too, so a scrim carries the readability instead of a
        fill. Without this the video would be cut off at the fold.
      */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-ink md:bg-gradient-to-b md:from-ink/85 md:via-ink/92 md:to-ink" />
      <Orbs tone="navy" intensity={0.9} />

      <div className="shell relative z-10">
        <Reveal>
          <p className="max-w-4xl font-display text-xl font-medium leading-[1.4] tracking-[-0.02em] text-paper sm:text-2xl md:text-4xl md:leading-[1.3]">
            We get businesses found, and we build what people find when they
            get there. Local visibility at one end, brand and AI systems at
            the other, run by one small team.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-16">
            <p className="text-sm leading-relaxed text-muted">
              Based in Karachi with a presence in Dubai, working with local
              businesses across Pakistan and with brands across the Gulf and
              further out.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Small enough that the people you meet are the people who do the
              work. Every engagement is run by a founder.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Our own AI products are live and public. You can judge the
              engineering before you commission any of it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
