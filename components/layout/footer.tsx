import Link from "next/link";
import { footerGroups, site, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = socialLinks.filter((link) => link.href.length > 0);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <p className="font-display text-2xl font-medium leading-tight tracking-[-0.02em] text-paper sm:text-3xl md:text-4xl">
              Get found. Get built.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="section-label">{group.title}</p>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="section-label">Contact</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-sm text-muted">
                {site.locations.join(", ")}
              </li>
            </ul>

            {activeSocials.length > 0 && (
              <ul className="mt-8 flex gap-5">
                {activeSocials.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {year} {site.name}. All rights reserved.
          </p>
          <p>Karachi, Pakistan and Dubai, UAE</p>
        </div>
      </div>

      {/*
        The name at scale. Deliberately cropped by the viewport and sunk
        into the background, so it reads as a watermark rather than a
        heading competing with the content above it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-6 md:px-12"
      >
        <p className="translate-y-[18%] whitespace-nowrap text-center font-display text-[clamp(4rem,22vw,26rem)] font-medium leading-none tracking-[-0.055em] text-paper/[0.05]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
