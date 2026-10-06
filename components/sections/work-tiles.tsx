"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/shared/reveal";
import { DecodeText } from "@/components/shared/decode-text";

/*
  Compact project tiles that zigzag down the page, left then right.

  Each tile keeps to a short card: picture, name, one line, up to two key
  figures. The long problem, solution and stack sit behind "Details" so six
  projects do not turn into six full screens. Everything is real text in the
  page, nothing is hidden from search, and on phones the tiles simply stack.
*/
export function WorkTiles({ items }: { items: Project[] }) {
  return (
    <div className="mt-14 space-y-8 md:mt-20 md:space-y-0">
      {items.map((project, index) => {
        const right = index % 2 === 1;
        return (
          <Reveal
            key={project.id}
            from={right ? "right" : "left"}
            className={`md:w-[48%] ${right ? "md:ml-auto" : ""} ${
              index > 0 ? "md:-mt-14" : ""
            } md:pb-10`}
          >
            <Tile project={project} />
          </Reveal>
        );
      })}
    </div>
  );
}

function Tile({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const client = project.kind === "client";
  const keyStats = project.stats.slice(0, 2);
  const moreStats = project.stats.slice(2);

  return (
    <article className="group overflow-hidden rounded-sm border border-line bg-paper/[0.025] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-paper/20 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
      <div className="relative aspect-[16/8] overflow-hidden bg-paper/[0.03]">
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
            } transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
          />
        )}
        <span
          className="absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] backdrop-blur-sm"
          style={
            client
              ? { backgroundColor: "rgba(79,209,197,0.18)", color: "#7de8dc", boxShadow: "inset 0 0 0 1px rgba(79,209,197,0.45)" }
              : { backgroundColor: "rgba(10,14,26,0.6)", color: "rgba(245,248,255,0.7)", boxShadow: "inset 0 0 0 1px rgba(245,248,255,0.15)" }
          }
        >
          {client ? "Client work" : "Own product"}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <p className="section-label">{project.category}</p>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.03em] text-paper md:text-3xl">
          <DecodeText text={project.name} />
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          {project.blurb}
        </p>

        {keyStats.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-4">
            {keyStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.625rem] uppercase tracking-[0.1em] text-muted/70">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-base font-medium text-paper">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 text-sm text-paper transition-colors hover:text-accent-soft"
          >
            {open ? "Hide details" : "Details"}
            <span
              aria-hidden="true"
              className={`inline-block text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              &#9662;
            </span>
          </button>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm text-paper transition-colors hover:text-accent-soft"
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
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              Source code
            </a>
          )}
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-5 text-sm leading-relaxed">
              <p className="text-paper/75">{project.problem}</p>
              <p className="text-muted">{project.solution}</p>
              <ul className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-line px-2.5 py-1 text-xs text-paper/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {moreStats.length > 0 && (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4">
                  {moreStats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-[0.625rem] uppercase tracking-[0.1em] text-muted/70">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 font-display text-base font-medium text-paper">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
