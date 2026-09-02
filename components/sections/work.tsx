import Image from "next/image";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/shared/reveal";

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
            Every project below is live and public. Open them, use them, then
            decide whether we are worth a conversation. Local client results
            are published separately, with permission.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-40">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;

            return (
              <Reveal key={project.id}>
                <article className="group grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  {/* Visual */}
                  <div className={flipped ? "md:order-2" : ""}>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-paper/[0.03] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:border-paper/20 group-hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.name} interface`}
                          fill
                          sizes="(min-width: 768px) 46vw, 92vw"
                          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                          <span className="font-display text-3xl font-medium tracking-[-0.02em] text-paper/25">
                            {project.name}
                          </span>
                          <span className="text-xs text-muted/50">
                            Screenshot to follow
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={flipped ? "md:order-1" : ""}>
                    <p className="section-label">{project.category}</p>

                    <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.03em] text-paper sm:text-3xl md:text-5xl">
                      {project.name}
                    </h3>

                    <p className="mt-6 text-sm leading-relaxed text-paper/75 md:text-base">
                      {project.problem}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                      {project.solution}
                    </p>

                    <ul className="mt-8 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-sm border border-line px-3 py-1.5 text-xs text-paper/60"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-6">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 text-sm text-paper transition-colors duration-200 hover:text-accent-soft"
                        >
                          View live
                          <span className="h-px w-6 bg-accent transition-all duration-300 group-hover/link:w-9" />
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted transition-colors duration-200 hover:text-paper"
                        >
                          Source code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
