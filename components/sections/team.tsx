import Image from "next/image";
import type { Member } from "@/data/team";
import { partners, specialists } from "@/data/team";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import dynamic from "next/dynamic";

/* Below the fold and only needed once a visitor reaches this row. Still server-rendered. */
const SpecialistCard = dynamic(() =>
  import("@/components/sections/specialist-card").then((m) => m.SpecialistCard)
);

/*
  Two rows, deliberately separated.

  Partners are the four founders and equity holders. Specialists work
  with the team but hold no ownership, and the layout must never imply
  otherwise: different heading, smaller cards, its own row.
*/

function Card({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group flex items-center gap-4 border-b border-line pb-5 sm:gap-5">
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-line bg-paper/[0.03] transition-colors duration-500 group-hover:border-paper/25 sm:h-[88px] sm:w-[88px]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="88px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-xl font-medium text-paper/20">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-paper">
            {member.name}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-accent-soft">
            {member.role}
          </p>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {member.focus}
          </p>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-paper/60 transition-colors duration-200 hover:text-paper"
            >
              LinkedIn
              <span className="h-px w-4 bg-accent" />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-ocean py-14 md:py-20"
    >
      <Orbs tone="mixed" intensity={0.95} />

      <div className="shell relative z-10">
        <Reveal>
          <p className="section-label">Who we are</p>
          <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            A small team, not a set of departments
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            A small team who each run their own side of the work, and the
            specialists we bring in for the parts that need them.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-6 md:mt-12 md:grid-cols-2">
          {partners.map((member, index) => (
            <Card key={member.id} member={member} index={index} />
          ))}
        </div>

        {specialists.length > 0 && (
          <div className="mt-12 border-t border-line pt-10 md:mt-14">
            <Reveal>
              <p className="section-label">Working with us</p>
            </Reveal>

            <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
              {specialists.map((member, index) => (
                <Card
                  key={member.id}
                  member={member}
                  index={index}
                />
              ))}
              <SpecialistCard index={specialists.length} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
