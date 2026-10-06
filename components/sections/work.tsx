import { projects } from "@/data/projects";
import { Reveal } from "@/components/shared/reveal";
import { WorkTiles } from "@/components/sections/work-tiles";

export function Work() {
  return (
    <section id="work" className="overflow-hidden bg-ink py-20 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="section-label">Selected work</p>
          <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            Systems we built and shipped
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Client builds and our own products, each with what it does and
            what it measured. Open the live ones and judge the engineering
            before we speak.
          </p>
        </Reveal>

        <WorkTiles items={projects} />
      </div>
    </section>
  );
}
