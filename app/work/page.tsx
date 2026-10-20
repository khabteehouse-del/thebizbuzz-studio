import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { WorkTiles } from "@/components/sections/work-tiles";
import { Button } from "@/components/shared/button";
import { ShipArt } from "@/components/shared/ship-art";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "AI systems and client builds from BizBuzz: enterprise AI, autonomous agents, self-hosted RAG, clinical vision and inventory systems.",
};

export default function WorkPage() {
  return (
    <div className="relative min-h-dvh bg-ink pb-24 pt-32 md:pb-32 md:pt-48">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
          <p className="section-label">Our work</p>
          <h1 className="mt-7 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-paper sm:text-4xl md:text-6xl">
            Everything we have built and shipped
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            AI systems first, then client builds. Point at a tile for the
            detail, or tap it on a phone.
          </p>
          </div>
          <ShipArt className="ship-art mx-auto h-auto w-64 shrink-0 sm:w-80 md:mx-0 md:w-[26rem]" />
        </div>

        <div className="mt-14 md:mt-20">
          <WorkTiles items={projects} />
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="/#contact" size="lg">
            Start a project
          </Button>
        </div>
      </div>
    </div>
  );
}
