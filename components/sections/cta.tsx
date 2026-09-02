import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/shared/button";

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-deep">
      <Orbs tone="mixed" intensity={1} />

      <div className="shell relative py-24 md:py-44">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-label">Start here</p>
            <h2 className="mt-8 font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-4xl md:text-7xl">
              Tell us what you are trying to change
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              A short note about the business and the problem is enough to
              start. We will tell you honestly whether we are the right studio
              for it.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Magnetic strength={14}>
                <Button
                  href={`mailto:${site.email}`}
                  variant="primary"
                  size="lg"
                  external
                >
                  {site.email}
                </Button>
              </Magnetic>

              <Link
                href="#work"
                className="text-sm text-muted transition-colors duration-200 hover:text-paper"
              >
                Or look at the work first
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
