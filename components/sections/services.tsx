"use client";

import { useState } from "react";
import Image from "next/image";
import type { Service } from "@/data/services";
import { localServices, studioServices } from "@/data/services";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

function Tile({
  service,
  index,
  spanFull,
}: {
  service: Service;
  index: number;
  /* True for the last tile when it carries an image: it takes a full row. */
  spanFull?: boolean;
}) {
  /* Touch devices have no hover, so a tap flips the tile. On devices that
     hover, the flip follows the pointer and a click does nothing extra. */
  const [flipped, setFlipped] = useState(false);
  const showImage = spanFull && Boolean(service.image);

  const toggle = () => {
    if (window.matchMedia("(hover: hover)").matches) return;
    setFlipped((v) => !v);
  };

  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px]"
      style={{
        background: `radial-gradient(circle, ${service.mark} 0%, transparent 70%)`,
        opacity: 0.16,
      }}
    />
  );

  return (
    <Reveal
      delay={index * 0.05}
      className={spanFull ? "md:col-span-2 lg:col-span-3" : undefined}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={`${service.title}. Shows what is included.`}
        data-flipped={flipped}
        className="group block h-[17rem] w-full text-left [perspective:1400px] focus-visible:outline-none"
      >
        <span
          className="relative block h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] group-data-[flipped=true]:[transform:rotateY(180deg)] motion-reduce:[transform:none]! motion-reduce:transition-none"
        >
          {/* Front */}
          <span
            className="absolute inset-0 flex overflow-hidden p-7 [backface-visibility:hidden] motion-reduce:transition-opacity motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-visible:opacity-0 motion-reduce:group-data-[flipped=true]:opacity-0 md:p-8"
            style={{ backgroundColor: service.tint }}
          >
            {glow}
            <span className="relative flex w-full flex-col">
              <span className="flex items-center justify-between gap-4">
                <span
                  className="svc-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] border"
                  style={
                    {
                      borderColor: `${service.mark}55`,
                      color: service.mark,
                      "--mark": service.mark,
                      "--i": index,
                    } as React.CSSProperties
                  }
                >
                  <service.icon size={18} strokeWidth={1.6} />
                </span>
                <span
                  className="shrink-0 font-display text-xs"
                  style={{ color: service.mark, opacity: 0.75 }}
                >
                  0{index + 1}
                </span>
              </span>
              <span className="mt-5 block font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                {service.title}
              </span>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-10"
                style={{ backgroundColor: service.mark, opacity: 0.6 }}
              />
              <span
                className={`mt-4 block text-sm leading-relaxed text-paper/65 ${
                  showImage ? "max-w-md lg:max-w-[46%]" : "line-clamp-4"
                }`}
              >
                {service.summary}
              </span>
              <span
                className="mt-auto pt-4 font-display text-[11px] uppercase tracking-[0.18em]"
                style={{ color: service.mark }}
              >
                What is included +
              </span>
            </span>
            {showImage && (
              <span
                className="absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden lg:block"
                aria-hidden="true"
              >
                <Image
                  src={service.image!}
                  alt=""
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <span
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, ${service.tint} 0%, transparent 45%), linear-gradient(135deg, ${service.mark}40 0%, transparent 60%)`,
                  }}
                />
              </span>
            )}
          </span>

          {/* Back */}
          <span
            className="absolute inset-0 flex overflow-hidden border p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:[transform:none] motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100 motion-reduce:group-data-[flipped=true]:opacity-100 md:p-8"
            style={{
              backgroundColor: service.tintHover,
              borderColor: `${service.mark}66`,
            }}
          >
            {glow}
            <span className="relative flex w-full flex-col">
              <span
                className="font-display text-sm font-medium"
                style={{ color: service.mark }}
              >
                {service.title}
              </span>
              {showImage && (
                <span className="mt-4 hidden max-w-xl text-base leading-relaxed text-paper/80 lg:block">
                  {service.summary}
                </span>
              )}
              <span
                className={`mt-4 block space-y-2.5 ${
                  showImage ? "lg:mt-auto lg:grid lg:grid-cols-2 lg:gap-x-10 lg:space-y-0 lg:gap-y-2.5" : ""
                }`}
              >
                {service.capabilities.map((item) => (
                  <span
                    key={item}
                    className="flex items-start gap-3 text-sm text-paper/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0"
                      style={{ backgroundColor: service.mark }}
                    />
                    {item}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

export function Services() {
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
            Thirteen services, two tracks, one team
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

          <div className="mt-px grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {localServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
                spanFull={index === localServices.length - 1 && Boolean(service.image)}
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

          <div className="mt-px grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {studioServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
                spanFull={index === studioServices.length - 1 && Boolean(service.image)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
