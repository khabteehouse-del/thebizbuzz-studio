"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { projects } from "@/data/projects";

/*
  The fork. The most important section on the page.

  A clinic owner and a scaling startup want different things at very
  different budgets. Showing both everything loses both. Two doors, near
  the top, so each visitor knows within one scroll which half is theirs.

  Each panel carries its own destination anchor, its own icon, an
  oversized track numeral, and a concrete next step at the bottom.

  Anchor characters: woman outside the left edge of the "local" card
  pointing right into it, man outside the right edge of the "studio"
  card pointing left into it. Desktop only, no room on mobile/tablet.

  The review proof is a <div> (not an <a>), since the whole card is
  already a <Link>, and an anchor cannot contain another anchor. Clicking
  it opens the Google Maps URL in a new tab via window.open instead.
*/

/*
  Five stars that power up one at a time when the review card scrolls
  into view: each starts dim, flares white-hot with a wide glow, then
  settles to a steady warm glow, powers down and goes again on a loop.
  The stagger and timing are in globals.css (.star).
*/
function PoweredStars() {
  const ref = useRef<HTMLSpanElement>(null);
  const lit = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span ref={ref} className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star text-lg leading-none ${lit ? "star-lit" : ""}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          ★
        </span>
      ))}
    </span>
  );
}

type IconProps = { size?: number; strokeWidth?: number };

/*
  The two track icons, drawn here instead of imported so their parts can
  move on their own. Same shapes as the lucide MapPin and Layers they
  replace. All motion is transform and opacity in globals.css (.pin-*,
  .layer-*), looping, and off under reduced motion.

  Pin: hops, lands, and a ripple spreads from its tip.
  Layers: the top and bottom sheets slide apart, then stack back.
*/
function AnimatedPin({ size = 19, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
    >
      <ellipse className="pin-ripple" cx="12" cy="22" rx="4" ry="1.2" />
      <g className="pin-body">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle className="pin-dot" cx="12" cy="10" r="3" />
      </g>
    </svg>
  );
}

function AnimatedLayers({ size = 19, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
    >
      <path
        className="layer-top"
        d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
      />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      <path className="layer-bot" d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    </svg>
  );
}

const doors = [
  {
    id: "local",
    numeral: "01",
    icon: AnimatedPin,
    eyebrow: "Local track",
    title: "For local businesses",
    line: "Own the map pack for what people near you actually search.",
    body: "Clinics, salons, restaurants, showrooms and shops. Profile, citations, reviews and a site that converts, run as one system and reported on calls, direction requests and bookings.",
    points: [
      "Google Business Profile",
      "Local search and maps",
      "Reviews and reputation",
      "Websites that convert",
    ],
    footnote: "Monthly retainers, priced for local business",
    tool: { label: "Free Google listing check", href: "/tools/gbp-check" },
    review: {
      quote:
        "Mobile cranes with full safety and certification. Great service.",
      client: "Sadat Transport & Contracting, Abu Dhabi",
      rating: 4.9,
      count: 40,
      href: "https://www.google.com/maps/place/Sadat+Transport+%26+Contracting+General/@24.369346,54.4996095,17z",
    },
    featuredProject: null,
    cta: "See local services",
    href: "#local-services",
    mark: "#4fd1c5",
    tint: "#0d2a2b",
    tintHover: "#123c3d",
  },
  {
    id: "studio",
    numeral: "02",
    icon: AnimatedLayers,
    eyebrow: "Studio track",
    title: "For growing brands",
    line: "Brand, product and AI infrastructure, designed together.",
    body: "For companies past their first version. Identity, web and product surfaces and AI systems, scoped against written acceptance criteria and built to production standard, not demo standard.",
    points: [
      "Brand identity and creative",
      "AI-integrated solutions",
      "Growth marketing",
      "Web and product design",
    ],
    footnote: "Scoped projects with written acceptance criteria and a phase schedule up front",
    tool: null,
    review: null,
    /* Real project from data/projects.ts, shown where the local card has its review */
    featuredProject: "fluxorx",
    cta: "See studio services",
    href: "#studio-services",
    mark: "#8b9dfa",
    tint: "#151a38",
    tintHover: "#1e2652",
  },
];

/*
  First fully opaque section on the page. The fixed hero video ends
  here: this background covers it for everything below.
*/
export function Tracks() {
  return (
    <section id="tracks" className="relative z-10 bg-ink py-16 md:py-32">
      <div className="shell relative z-10">
        <Reveal>
          <p className="section-label">Two ways in</p>
          <h2 className="mt-7 max-w-3xl font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] text-paper sm:text-3xl md:text-5xl">
            Two practices, one standard of work.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 bottom-0 z-20 hidden h-[300px] w-[140px] lg:block xl:-left-28 xl:h-[340px] xl:w-[160px]"
          >
            <Image
              src="/images/anchor/women-anchor.png"
              alt=""
              fill
              className="object-contain object-bottom opacity-90"
              sizes="160px"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 bottom-0 z-20 hidden h-[300px] w-[140px] lg:block xl:-right-28 xl:h-[340px] xl:w-[160px]"
          >
            <Image
              src="/images/anchor/man-anchor.png"
              alt=""
              fill
              className="object-contain object-bottom opacity-90"
              sizes="160px"
            />
          </div>

          {doors.map((door, index) => {
            const Icon = door.icon;

            return (
              <Reveal key={door.id} delay={index * 0.08}>
                <Link
                  href={door.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 sm:p-9 md:p-12"
                  style={{
                    backgroundColor: door.tint,
                    borderColor: `${door.mark}33`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-8 select-none font-display text-[7rem] font-medium leading-none tracking-[-0.05em] transition-opacity duration-500 group-hover:opacity-20 sm:text-[11rem] md:text-[15rem]"
                    style={{ color: door.mark, opacity: 0.09 }}
                  >
                    {door.numeral}
                  </span>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 bottom-[-30%] h-80 w-80 rounded-full blur-[90px] transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${door.mark} 0%, transparent 70%)`,
                      opacity: 0.2,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-[3px] border transition-colors duration-500"
                        style={{
                          borderColor: `${door.mark}55`,
                          color: door.mark,
                        }}
                      >
                        <Icon size={19} strokeWidth={1.6} />
                      </span>
                      <p
                        className="text-xs uppercase tracking-[0.14em]"
                        style={{ color: door.mark, opacity: 0.85 }}
                      >
                        {door.eyebrow}
                      </p>
                    </div>

                    <h3 className="mt-8 font-display text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-paper sm:text-3xl md:text-4xl">
                      {door.title}
                    </h3>

                    <p className="mt-4 max-w-sm font-display text-lg leading-snug text-paper/80 md:text-xl">
                      {door.line}
                    </p>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/55">
                      {door.body}
                    </p>

                    <ul className="mt-9 grid gap-2.5 border-t border-paper/10 pt-8">
                      {door.points.map((point, pointIndex) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-paper/70"
                        >
                          <span
                            aria-hidden="true"
                            className="dash-glow mt-2 h-px w-3 shrink-0"
                            style={
                              {
                                backgroundColor: door.mark,
                                "--mark": door.mark,
                                "--i": pointIndex,
                              } as React.CSSProperties
                            }
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-8 text-xs leading-relaxed text-paper/40">
                      {door.footnote}
                    </p>

                    {door.tool && (
                      <span
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-[2px] border px-3 py-2 text-xs transition-colors duration-300"
                        style={{
                          borderColor: `${door.mark}55`,
                          color: door.mark,
                        }}
                      >
                        {door.tool.label}
                      </span>
                    )}

                    {door.review && (
                      <div
                        role="link"
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            door.review!.href,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.stopPropagation();
                            window.open(
                              door.review!.href,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                        className="mt-4 block w-fit cursor-pointer rounded-[3px] border border-[#fbbf24]/30 bg-[#fbbf24]/[0.07] px-4 py-3.5 transition-colors duration-300 hover:bg-[#fbbf24]/[0.12]"
                      >
                        <div className="flex items-center gap-1">
                          <PoweredStars />
                          <span className="ml-1.5 text-sm font-medium text-paper">
                            {door.review.rating}
                          </span>
                          <span className="text-xs text-paper/60">
                            ({door.review.count} reviews)
                          </span>
                        </div>
                        <p className="mt-2 max-w-xs text-xs italic leading-relaxed text-paper/60">
                          &ldquo;{door.review.quote}&rdquo;
                        </p>
                        <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-paper/40">
                          {door.review.client}, verified on Google
                        </p>
                      </div>
                    )}

                    {door.featuredProject && (() => {
                      const project = projects.find(
                        (p) => p.id === door.featuredProject
                      );
                      if (!project) return null;

                      /*
                        Sits at the bottom of the card, directly above the
                        call to action, at roughly the height of the local
                        card's tool button plus review box, so the two cards
                        line up across. mt-auto pushes it down; the CTA
                        below drops its own mt-auto when this is present.
                      */
                      return (
                        <div
                          className="relative mt-8 h-48 w-full max-w-[29.5rem] overflow-hidden rounded-[3px] border md:mt-auto"
                          style={{ borderColor: `${door.mark}40` }}
                        >
                          <Image
                            src="/images/work/fluxorx-phase2.jpg"
                            alt={`${project.name} architecture and deployment overview`}
                            fill
                            sizes="(min-width: 768px) 30rem, 92vw"
                            className="object-cover object-[50%_35%]"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <p
                              className="text-[0.6875rem] uppercase tracking-[0.14em]"
                              style={{ color: door.mark }}
                            >
                              Recent build
                            </p>
                            <p className="mt-1 font-display text-lg font-medium leading-tight text-paper">
                              {project.name}
                              <span className="ml-2 text-xs font-normal text-paper/60">
                                {project.category}
                              </span>
                            </p>
                            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs">
                              {project.stats.slice(0, 2).map((stat) => (
                                <span key={stat.label}>
                                  <span className="font-medium text-paper">
                                    {stat.value}
                                  </span>{" "}
                                  <span className="text-paper/55">
                                    {stat.label.toLowerCase()}
                                  </span>
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    <span
                      className={`flex items-center gap-3 pt-8 text-xs uppercase tracking-[0.12em] text-paper ${
                        door.featuredProject ? "" : "mt-auto"
                      }`}
                    >
                      {door.cta}
                      <span
                        className="h-px w-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
                        style={{ backgroundColor: door.mark }}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
