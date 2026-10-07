import { socialLinks } from "@/data/site";

/*
  LinkedIn and Instagram, drawn as plain SVG so nothing extra is loaded.
  Entries without a link in data/site.ts are skipped.

  "round": icon buttons only, for the contact area.
  "list": icon with the handle beside it, for the footer.
*/
function Icon({ name }: { name: string }) {
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialLinks({ variant = "list" }: { variant?: "round" | "list" }) {
  const links = socialLinks.filter((l) => l.href.length > 0);
  if (links.length === 0) return null;

  if (variant === "round") {
    return (
      <ul className="flex items-center gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${l.label}: ${l.handle}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04] text-paper/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1dd5ff]/60 hover:text-[#1dd5ff] hover:shadow-[0_0_22px_rgba(29,213,255,0.28)]"
            >
              <Icon name={l.label} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/soc inline-flex items-center gap-3 text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04] text-paper/75 transition-all duration-300 group-hover/soc:border-[#1dd5ff]/60 group-hover/soc:text-[#1dd5ff] group-hover/soc:shadow-[0_0_16px_rgba(29,213,255,0.25)]">
              <Icon name={l.label} />
            </span>
            <span>{l.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
