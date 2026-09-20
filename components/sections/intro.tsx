"use client";

import { Globe2, UserCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

const LOGO_BLUE = "#1dd5ff";

const pillars = [
  {
    Icon: Globe2,
    text: "Based in Karachi with a presence in Dubai, working with local businesses across Pakistan and with brands across the Gulf and further out.",
  },
  {
    Icon: UserCheck,
    text: "Small enough that the people you meet are the people who do the work. Every engagement is run by a founder.",
  },
  {
    Icon: Sparkles,
    text: "Our own AI products are live and public. You can judge the engineering before you commission any of it.",
  },
];

export function Intro() {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 md:py-40">
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
            {pillars.map(({ Icon, text }, i) => (
              <div key={i}>
                <div className="pillar-icon-wrap relative flex h-11 w-11 items-center justify-center">
                  <span
                    className="pillar-pulse pointer-events-none absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 0 1px ${LOGO_BLUE}` }}
                  />
                  <Icon size={19} strokeWidth={1.6} style={{ color: LOGO_BLUE }} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @keyframes pillarPulse {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        .pillar-pulse {
          animation: pillarPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}