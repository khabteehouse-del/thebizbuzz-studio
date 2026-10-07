"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/shared/reveal";
import { DecodeText } from "@/components/shared/decode-text";

/*
  Landscape project tiles in a two-column grid.

  The tile shows the picture with the name and one line. Pointing at it
  (or focusing it with the keyboard) slides a panel up over the picture
  with the problem, solution, stack and figures. Phones have no hover, so
  a tap opens and closes the panel instead. Links inside stay clickable.
  The text is always in the page, so nothing is hidden from search.
*/
export function WorkTiles({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {items.map((project, index) => (
        <Reveal key={project.id} delay={(index % 2) * 0.08}>
          <Tile project={project} />
        </Reveal>
      ))}
    </div>
  );
}

function Tile({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const client = project.kind === "client";

  return (
    <div>
      <header className="mb-3 flex items-start justify-between gap-4 px-1 md:mb-4">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-paper md:text-3xl">
            <DecodeText text={project.name} watch quick />
          </h3>
          <p className="mt-1.5 text-sm text-paper/60">{project.blurb}</p>
        </div>
        <span
          className="mt-1.5 shrink-0 rounded-full px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.14em]"
          style={
            client
              ? { backgroundColor: "rgba(79,209,197,0.18)", color: "#7de8dc", boxShadow: "inset 0 0 0 1px rgba(79,209,197,0.45)" }
              : { backgroundColor: "rgba(10,14,26,0.6)", color: "rgba(245,248,255,0.7)", boxShadow: "inset 0 0 0 1px rgba(245,248,255,0.18)" }
          }
        >
          {client ? "Client work" : "Own product"}
        </span>
      </header>

    <article
      tabIndex={0}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if ((e.target as HTMLElement).closest("a")) return;
          e.preventDefault();
          setOpen((v) => !v);
        }
        if (e.key === "Escape") setOpen(false);
      }}
      data-open={open ? "true" : "false"}
      className="work-tile group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border border-line bg-paper/[0.03] outline-none transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:border-accent [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-paper/25 [@media(hover:hover)]:hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] md:aspect-[16/9]"
    >
      {!project.image && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(79,209,197,0.22), transparent 60%), linear-gradient(135deg, #0d2a2b, #0a1a24)",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-20 w-20 text-[#4fd1c5]/70" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
        </div>
      )}
      {project.image && (
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes="(min-width: 768px) 46vw, 92vw"
          className={`${
            project.imageFit === "contain"
              ? "object-contain p-3"
              : project.imageFit === "fill-top"
                ? "object-cover object-[50%_30%]"
                : "object-cover object-top"
          } transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:scale-[1.05]`}
        />
      )}

      {/* Detail panel */}
      <div className="work-panel absolute inset-0 flex flex-col overflow-y-auto bg-[#0a0e1a]/[0.97] p-5 md:p-6">
        <p className="section-label panel-item" style={{ "--i": 0 } as React.CSSProperties}>{project.category}</p>
        <h3 style={{ "--i": 1 } as React.CSSProperties} className="panel-item mt-2 font-display text-lg font-medium tracking-[-0.02em] text-paper md:text-xl">
          {project.name}
        </h3>
        <p style={{ "--i": 2 } as React.CSSProperties} className="panel-item mt-3 text-[0.8125rem] leading-relaxed text-paper/75">
          {project.problem}
        </p>
        <p style={{ "--i": 3 } as React.CSSProperties} className="panel-item mt-2 text-[0.8125rem] leading-relaxed text-muted">
          {project.solution}
        </p>

        <ul style={{ "--i": 4 } as React.CSSProperties} className="panel-item mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] text-paper/60"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.stats.length > 0 && (
          <dl style={{ "--i": 5 } as React.CSSProperties} className="panel-item mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.5625rem] uppercase tracking-[0.1em] text-muted/70">
                  {stat.label}
                </dt>
                <dd className="font-display text-sm font-medium text-paper">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div style={{ "--i": 6 } as React.CSSProperties} className="panel-item mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-2 text-paper transition-colors hover:text-accent-soft"
            >
              View live
              <span className="h-px w-5 bg-accent transition-all duration-300 group-hover/link:w-8" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted transition-colors hover:text-paper"
            >
              Source code
            </a>
          )}
          <span className="ml-auto text-[0.625rem] uppercase tracking-[0.12em] text-muted/60 md:hidden">
            Tap to close
          </span>
        </div>
      </div>
    </article>
    </div>
  );
}
