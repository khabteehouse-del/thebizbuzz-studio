import Link from "next/link";
import { MapPin, Layers } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

/*
  The fork. The most important section on the page.

  A clinic owner and a scaling startup want different things at very
  different budgets. Showing both everything loses both. Two doors, near
  the top, so each visitor knows within one scroll which half is theirs.

  Each panel carries its own destination anchor, its own icon, an
  oversized track numeral, and a concrete next step at the bottom.
*/

const doors = [
  {
    id: "local",
    numeral: "01",
    icon: MapPin,
    eyebrow: "Local track",
    title: "For local businesses",
    line: "Get found by people nearby who are ready to buy.",
    body: "Clinics, salons, restaurants, showrooms and shops. We put you on the map, keep you there, and turn the search into a walk-in.",
    points: [
      "Google Business Profile",
      "Local search and maps",
      "Reviews and reputation",
      "Websites that convert",
    ],
    footnote: "Monthly retainers, priced for local business",
    tool: { label: "Free Google listing check", href: "/tools/gbp-check" },
    cta: "See local services",
    href: "#local-services",
    mark: "#4fd1c5",
    tint: "#0d2a2b",
    tintHover: "#123c3d",
  },
  {
    id: "studio",
    numeral: "02",
    icon: Layers,
    eyebrow: "Studio track",
    title: "For growing brands",
    line: "Build the brand and the systems behind it.",
    body: "Companies scaling past whatever they started with. Identity, product and AI systems built to production standard, not to demo standard.",
    points: [
      "Brand identity and creative",
      "Web and product design",
      "Growth marketing",
      "AI-integrated solutions",
    ],
    footnote: "Scoped projects with a phase schedule up front",
    tool: null,
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
            We do two things. Pick the one that sounds like you.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
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
                  {/* Oversized numeral, sunk into the panel */}
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
                      {door.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-paper/70"
                        >
                          <span
                            className="mt-2 h-px w-3 shrink-0"
                            style={{ backgroundColor: door.mark }}
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

                    <span className="mt-auto flex items-center gap-3 pt-8 text-xs uppercase tracking-[0.12em] text-paper">
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
