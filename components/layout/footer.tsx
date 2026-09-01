import Link from "next/link";
import { navLinks, site, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = socialLinks.filter((link) => link.href.length > 0);

  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <p className="font-display text-3xl leading-tight text-paper md:text-4xl">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <div>
            <p className="section-label">Navigate</p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
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
    </footer>
  );
}
