import { projects } from "@/data/projects";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/shared/button";
import { WorkTiles } from "@/components/sections/work-tiles";

/* The home page shows the lead four. Everything else lives on /work. */
const HOME_COUNT = 4;

export function Work() {
  return (
    <section id="work" className="bg-ink py-20 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="section-label">Selected work</p>
          <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            Systems we built and shipped
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            AI systems and client builds, each with what it does and what it
            measured. Point at a tile for the detail, open the live ones and
            judge the engineering before we speak.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <WorkTiles items={projects.slice(0, HOME_COUNT)} />
        </div>

        <Reveal>
          <p className="mx-auto mt-14 max-w-xl text-center font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper md:mt-20 md:text-2xl">
            A premium brand site, built in one night.
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted">
            Qadir Q is proof that boutique brands can launch with a site that
            looks and feels premium, in days instead of months.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/work" size="lg">
              See all work
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
