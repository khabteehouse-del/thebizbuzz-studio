import { Hero } from "@/components/sections/hero";

/*
  Hero is real from this phase on.
  The sections below stay as placeholders until Phase 4 fills them,
  and keep their ids so nav anchors work today.
*/

const placeholders = [
  { id: "work", label: "Selected work", title: "Featured Work" },
  { id: "services", label: "What we do", title: "Services" },
  { id: "approach", label: "How we work", title: "Approach" },
  { id: "team", label: "Who we are", title: "Team" },
  { id: "contact", label: "Start here", title: "Contact" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {placeholders.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="relative border-t border-line bg-ink py-32"
        >
          <div className="shell">
            <p className="section-label">{section.label}</p>
            <h2 className="mt-6 font-display text-4xl text-paper md:text-5xl">
              {section.title}
            </h2>
          </div>
        </section>
      ))}
    </>
  );
}
