"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { localServices, studioServices } from "@/data/services";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { MizarLogo } from "@/components/shared/mizar-logo";
import { ServicesDial } from "@/components/shared/services-dial";

/* Touch screens cannot hover, and few people tap a tile that does not look
   tappable. So on touch, a tile flips by itself once it has rested under the
   middle of the screen. The timings are deliberate:
   - IN: a fast flick past a tile (over roughly 600px per second) never flips
     it, because the tile leaves the middle before this delay runs out (tested:
     800px/s and up never flips, about 500px/s and below does). A
     slow scroll or a pause flips it.
   - OUT: a short grace, so a tile does not snap back on a tiny wobble. */
const AUTO_FLIP_IN_MS = 500;
const AUTO_FLIP_OUT_MS = 250;
/* A thin line across the middle of the screen. Only the tile under that line
   counts, so on a one-column phone layout one tile is flipped at a time. */
const MIDDLE_LINE = "-49% 0px -49% 0px";

function useAutoFlip(
  ref: React.RefObject<HTMLElement | null>,
  setFlipped: (value: boolean) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const touch = window.matchMedia("(hover: none)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let wasInside = false;

    const stop = () => {
      io?.disconnect();
      io = null;
      clearTimeout(timer);
      wasInside = false;
    };

    const start = () => {
      stop();
      /* Devices that hover keep hover. People who asked for less motion keep
         tap only, because content that changes by itself is not what they chose. */
      if (!touch.matches || calm.matches) return;
      io = new IntersectionObserver(
        ([entry]) => {
          const inside = entry.isIntersecting;
          clearTimeout(timer);
          if (!inside && !wasInside) return;
          wasInside = inside;
          timer = setTimeout(
            () => setFlipped(inside),
            inside ? AUTO_FLIP_IN_MS : AUTO_FLIP_OUT_MS,
          );
        },
        { rootMargin: MIDDLE_LINE },
      );
      io.observe(el);
    };

    start();
    touch.addEventListener("change", start);
    calm.addEventListener("change", start);
    return () => {
      stop();
      touch.removeEventListener("change", start);
      calm.removeEventListener("change", start);
    };
  }, [ref, setFlipped]);
}

function Tile({
  service,
  index,
  half,
}: {
  service: Service;
  index: number;
  /* True for the last two tiles of a group: each takes half a row, so the
     final row has no gap. */
  half?: boolean;
}) {
  /* Touch devices have no hover, so a tap flips the tile. On devices that
     hover, the flip follows the pointer and a click does nothing extra. */
  const [flipped, setFlipped] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  useAutoFlip(tileRef, setFlipped);
  const gallery = service.gallery;
  const link = service.link;
  /* A tile back can be a full picture: the design gallery, or a product shot. */
  const art = gallery
    ? { image: gallery.image, alt: gallery.alt, width: gallery.width, height: gallery.height, fit: "cover" as const, background: "#12030a", position: undefined, bullets: undefined }
    : service.backImage;
  const artCta = gallery?.cta ?? link?.cta;

  const toggle = () => {
    if (window.matchMedia("(hover: hover)").matches) return;
    setFlipped((v) => !v);
  };

  /* A tile with a gallery or a link is a real link. On a device that hovers, a click
     goes straight to the page. On touch, a tap on a tile that has not
     flipped yet flips it first, and the next tap goes in. */
  const onLinkClick = (event: React.MouseEvent) => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (!flipped) {
      event.preventDefault();
      setFlipped(true);
    }
  };

  const tileClass = `group block h-[17rem] w-full rounded-2xl text-left focus-visible:outline-none ${
    half ? "[perspective:2000px]" : "[perspective:1400px]"
  }`;

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

  const faces = (
    <span className="pointer-events-none relative block h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] group-data-[flipped=true]:[transform:rotateY(180deg)] motion-reduce:[transform:none]! motion-reduce:transition-none">
      {/* Front */}
      <span
        className="absolute inset-0 flex overflow-hidden rounded-2xl p-7 [backface-visibility:hidden] motion-reduce:transition-opacity motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-visible:opacity-0 motion-reduce:group-data-[flipped=true]:opacity-0 md:p-8"
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
            <span className="flex shrink-0 items-center gap-3">
              {service.badge && (
                <span
                  className="rounded-full border px-2.5 py-0.5 font-display text-[10px] uppercase tracking-[0.14em]"
                  style={{
                    color: service.mark,
                    borderColor: `${service.mark}66`,
                  }}
                >
                  {service.badge}
                </span>
              )}
              <span
                className="font-display text-xs"
                style={{ color: service.mark, opacity: 0.75 }}
              >
                0{index + 1}
              </span>
            </span>
          </span>
          {service.logo ? (
            <span className="mt-2 flex min-h-0 flex-1 items-center">
              {service.logo.animated ? (
                <MizarLogo className="h-auto w-[60%] max-w-[13.5rem]" />
              ) : (
                <Image
                  src={service.logo.src}
                  alt={service.logo.alt}
                  width={service.logo.width}
                  height={service.logo.height}
                  sizes="(min-width: 1024px) 24vw, 70vw"
                  className="h-auto w-[60%] max-w-[13.5rem]"
                />
              )}
            </span>
          ) : (
            <>
              <span className="mt-5 block font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                {service.title}
              </span>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-10"
                style={{ backgroundColor: service.mark, opacity: 0.6 }}
              />
            </>
          )}
          <span
            className={`block text-paper/65 ${service.logo ? "mt-2 line-clamp-3 text-[13px] leading-snug" : "mt-4 line-clamp-4 text-sm leading-relaxed"}`}
          >
            {service.summary}
          </span>
          <span
            className="mt-auto pt-4 font-display text-[11px] uppercase tracking-[0.18em]"
            style={{ color: service.mark }}
          >
            {gallery
              ? "See our work +"
              : link
                ? "What it does +"
                : "What is included +"}
          </span>
        </span>
      </span>

      {/* Back */}
      {art ? (
        <span
          className="absolute inset-0 overflow-hidden rounded-2xl border [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:[transform:none] motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100 motion-reduce:group-data-[flipped=true]:opacity-100"
          style={{
            backgroundColor: art.background ?? "#12030a",
            borderColor: `${service.mark}66`,
          }}
        >
          <Image
            src={art.image}
            alt={art.alt}
            width={art.width}
            height={art.height}
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
            className={`h-full w-full ${art.fit === "contain" ? "object-contain" : "object-cover"}`}
            style={art.position ? { objectPosition: art.position } : undefined}
          />
          {art.bullets && (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[62%]"
                style={{
                  background: `linear-gradient(180deg, ${art.background ?? "#090f1e"} 0%, ${art.background ?? "#090f1e"}f2 38%, transparent 100%)`,
                }}
              />
              <span className="absolute inset-x-5 top-5 block space-y-2">
                {art.bullets.map((item) => (
                  <span
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-snug text-paper/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-3 shrink-0"
                      style={{ backgroundColor: service.mark }}
                    />
                    {item}
                  </span>
                ))}
              </span>
            </>
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,3,10,0) 50%, rgba(18,3,10,0.88) 100%)",
            }}
          />
          <span
            className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
            style={
              gallery
                ? {
                    backgroundColor: "rgba(18,3,10,0.82)",
                    borderColor: "rgba(255,196,204,0.22)",
                  }
                : {
                    /* A solid dark base under the tint. No blur here: backdrop filters
                       make a flipped face show through its own back. */
                    backgroundColor: "rgba(9,15,30,0.92)",
                    backgroundImage: `linear-gradient(${service.mark}38, ${service.mark}38)`,
                    borderColor: `${service.mark}99`,
                  }
            }
          >
            <span className="font-display text-sm font-medium text-paper">
              {artCta}
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              style={{ color: gallery ? "#ff7a8a" : service.mark }}
            />
          </span>
        </span>
      ) : (
        <span
          className="absolute inset-0 flex overflow-hidden rounded-2xl border p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:[transform:none] motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100 motion-reduce:group-data-[flipped=true]:opacity-100 md:p-8"
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
            <span className="mt-4 block space-y-2.5">
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
            {link && (
              <span
                className="mt-auto flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5"
                style={{
                  borderColor: `${service.mark}55`,
                  backgroundColor: "rgba(0,0,0,0.25)",
                }}
              >
                <span className="font-display text-sm font-medium text-paper">
                  {link.cta}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  style={{ color: service.mark }}
                />
              </span>
            )}
          </span>
        </span>
      )}
    </span>
  );

  return (
    <Reveal
      delay={index * 0.05}
      className={half ? "lg:col-span-3" : "lg:col-span-2"}
    >
      {/* The wrapper is a hover group too, so a link laid over the tile
            (the Mizar strip) does not end the hover and flip the tile back. */}
      <div
        ref={tileRef}
        data-flipped={flipped}
        className="group group/tile relative"
      >
        {gallery ? (
          <Link
            href={gallery.href}
            onClick={onLinkClick}
            data-flipped={flipped}
            aria-label={`${service.title}. Opens the design gallery.`}
            className={tileClass}
          >
            {faces}
          </Link>
        ) : (
          <button
            type="button"
            onClick={toggle}
            aria-pressed={flipped}
            aria-label={`${service.title}. Shows what is included.`}
            data-flipped={flipped}
            className={tileClass}
          >
            {faces}
          </button>
        )}

        {/* Only the strip on the back is a link, so the rest of the tile just flips. */}
        {link && (
          <a
            href={link.href}
            aria-label={`${link.cta} on WhatsApp`}
            style={{ "--c": service.mark } as React.CSSProperties}
            className={`absolute z-10 h-[2.9rem] cursor-pointer rounded-xl border border-transparent transition-[visibility,background-color,border-color,box-shadow] [transition-duration:0s,200ms,200ms,200ms] hover:border-[var(--c)] hover:bg-[color-mix(in_srgb,var(--c)_28%,transparent)] hover:shadow-[0_0_26px_-2px_var(--c)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 ${
              art ? "inset-x-3 bottom-3" : "inset-x-7 bottom-7 md:inset-x-8 md:bottom-8"
            } ${
              flipped
                ? "visible [transition-delay:700ms,0s,0s,0s]"
                : "invisible group-hover/tile:visible group-hover/tile:[transition-delay:700ms,0s,0s,0s]"
            }`}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          />
        )}
      </div>
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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
          <Reveal>
            <p className="section-label">What we do</p>
            <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
              Thirteen services, a flagship product, one team
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Most agencies hand you off between departments. Here the people
              who build the brand talk to the people who build the system,
              because they sit in the same room.
            </p>
          </Reveal>

          {/* Large screens only: on phones it would add page length. */}
          <Reveal delay={0.15} className="hidden lg:block">
            <ServicesDial className="lg:translate-y-6" />
          </Reveal>
        </div>

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

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {localServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
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

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {studioServices.map((service, index) => (
              <Tile
                key={service.id}
                service={service}
                index={index}
                half={index >= studioServices.length - 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
