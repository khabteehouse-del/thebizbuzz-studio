import Image from "next/image";
import type { Member } from "@/data/team";
import { partners, specialists } from "@/data/team";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

/*
  Two rows, deliberately separated.

  Partners are the four founders and equity holders. Specialists work
  with the team but hold no ownership, and the layout must never imply
  otherwise: different heading, smaller cards, its own row.
*/

function Card({
  member,
  index,
  compact = false,
}: {
  member: Member;
  index: number;
  compact?: boolean;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group">
        <div
          className={`relative overflow-hidden rounded-sm border border-line bg-paper/[0.03] transition-colors duration-500 group-hover:border-paper/20 ${
            compact ? "aspect-square" : "aspect-[4/5]"
          }`}
        >
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes={
                compact
                  ? "(min-width: 768px) 20vw, 45vw"
                  : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
              }
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-4xl font-medium text-paper/15">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          )}
        </div>

        <h3
          className={`mt-5 font-display font-medium tracking-[-0.01em] text-paper ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          {member.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-accent-soft">
          {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {member.focus}
        </p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-paper/60 transition-colors duration-200 hover:text-paper"
          >
            LinkedIn
            <span className="h-px w-4 bg-accent" />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-ocean py-20 md:py-36"
    >
      <Orbs tone="mixed" intensity={0.95} />

      <div className="shell relative z-10">
        <Reveal>
          <p className="section-label">Who we are</p>
          <h2 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            A small team, not a set of departments
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Four partners who each run their own side of the work, and the
            specialists we bring in for the parts that need them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-10 md:mt-20 lg:grid-cols-4">
          {partners.map((member, index) => (
            <Card key={member.id} member={member} index={index} />
          ))}
        </div>

        {specialists.length > 0 && (
          <div className="mt-20 border-t border-line pt-14 md:mt-24">
            <Reveal>
              <p className="section-label">Working with us</p>
            </Reveal>

            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
              {specialists.map((member, index) => (
                <Card
                  key={member.id}
                  member={member}
                  index={index}
                  compact
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
