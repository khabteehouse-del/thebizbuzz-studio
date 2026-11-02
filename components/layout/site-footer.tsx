import Link from "next/link";
import { LogoMark } from "@/components/ui-kit/logo";
import { copy } from "@/data/copy";
import { industryKeys, industryPath, path, type Lang } from "@/data/i18n";
import { site } from "@/data/site";

/* Server component. Pure links, no state. */

export function SiteFooter({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const year = new Date().getFullYear();

  const services = [
    { label: c.services.websites.navLabel, href: path("websites", lang) },
    { label: c.services.localSeo.navLabel, href: path("localSeo", lang) },
    { label: c.services.gbp.navLabel, href: path("gbp", lang) },
  ];

  const company = [
    { label: c.nav.about, href: path("about", lang) },
    { label: c.nav.mizar, href: path("mizar", lang) },
    { label: c.nav.cta, href: path("contact", lang) },
  ];

  const linkClass = "text-ink-soft underline-offset-4 hover:text-ink hover:underline";
  const titleClass = "text-xs font-bold uppercase tracking-[0.16em] text-muted";

  return (
    <footer className="border-t-2 border-ink bg-cream">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={path("home", lang)} className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-ink-soft">
            {c.footer.tagline}
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">{c.footer.remote}</p>
        </div>

        <div>
          <p className={titleClass}>{c.footer.servicesTitle}</p>
          <ul className="mt-4 space-y-3">
            {services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={titleClass}>{c.footer.industriesTitle}</p>
          <ul className="mt-4 space-y-3">
            {industryKeys.map((key) => (
              <li key={key}>
                <Link href={industryPath(key, lang)} className={linkClass}>
                  {c.industries[key].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={titleClass}>{c.footer.companyTitle}</p>
          <ul className="mt-4 space-y-3">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-ink">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {c.footer.rights}
          </p>
          <p>
            {c.footer.poweredBy}{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-ink underline underline-offset-4"
            >
              {site.parent.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
