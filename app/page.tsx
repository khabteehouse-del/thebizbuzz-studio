/*
  Placeholder only. Phase 3 replaces this with the real hero,
  Phase 4 adds the remaining sections.
  The section ids match the nav links so anchor scrolling works today.
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
      <section className="flex min-h-dvh items-center">
        <div className="shell">
          <p className="section-label">Creative and technology studio</p>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] text-paper md:text-7xl lg:text-8xl">
            Where Brand Meets Intelligence
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
            Layout shell checkpoint. The hero lands in Phase 3.
          </p>
        </div>
      </section>

      {placeholders.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-t border-line py-32"
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
