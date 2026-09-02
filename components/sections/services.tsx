"use client";

import { useState } from "react";
import type { Service } from "@/data/services";
import { localServices, studioServices } from "@/data/services";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

function Tile({
  service,
  index,
  hovered,
  setHovered,
}: {
  service: Service;
  index: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
}) {
  const isHovered = hovered === service.id;

  return (
    <Reveal delay={index * 0.05}>
      <article
        onMouseEnter={() => setHovered(service.id)}
        onMouseLeave={() => setHovered(null)}
        className="group relative h-full overflow-hidden p-7 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8 md:p-10"
        style={{
          backgroundColor: isHovered ? service.tintHover : service.tint,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${service.mark} 0%, transparent 70%)`,
            opacity: isHovered ? 0.28 : 0.12,
          }}
        />

        <div className="relative">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
              {service.title}
            </h3>
            <span
              className="shrink-0 font-display text-xs"
              style={{ color: service.mark, opacity: 0.75 }}
            >
              0{index + 1}
            </span>
          </div>

          <span
            aria-hidden="true"
            className="mt-5 block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              backgroundColor: service.mark,
              width: isHovered ? "5rem" : "2.5rem",
              opacity: isHovered ? 1 : 0.6,
            }}
          />

          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/55 transition-colors duration-500 group-hover:text-paper/75">
            {service.summary}
          </p>

          <ul className="mt-7 space-y-2.5">
            {service.capabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-paper/60 transition-colors duration-500 group-hover:text-paper/85"
              >
                <span
                  className="mt-2 h-px w-3 shrink-0 transition-opacity duration-500"
                  style={{
                    backgroundColor: service.mark,
                    opacity: isHovered ? 1 : 0.7,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ocean py-20 md:py-36"
    >
      <Orbs tone="navy" intensity={1.15} />

      <div className="shell relative z-10">
        <Reveal>
          <p className="section-label">What we do</p>
          <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            Eight services, two tracks, one team
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Most agencies hand you off between departments. Here the people who
            build the brand talk to the people who build the system, because
            they sit in the same room.
          </p>
        </Reveal>

        {/* Local track */}
        <div id="local-services" className="mt-20 scroll-mt-28">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-5">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-paper md:text-3xl">
                For local businesses
              </h3>
              <p className="text-sm text-muted">
                Clinics, salons, restaurants, showrooms, shops
              </p>
            </div>
          </Reveal>

          <div className="mt-px grid gap-px bg-line md:grid-cols-2">
            {localServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>

        {/* Studio track */}
        <div id="studio-services" className="mt-24 scroll-mt-28">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-5">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-paper md:text-3xl">
                For growing brands
              </h3>
              <p className="text-sm text-muted">
                Startups and companies scaling up
              </p>
            </div>
          </Reveal>

          <div className="mt-px grid gap-px bg-line md:grid-cols-2">
            {studioServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
