import Link from "next/link";
import { Wordmark } from "@/components/shared/wordmark";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";
import { site } from "@/data/site";

/* The BizBuzz footer: link columns, then the name at scale as a watermark. */

export function Footer({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const year = new Date().getFullYear();

  const services = [
    { label: c.services.websites.navLabel, href: path("websites", lang) },
    { label: c.services.localSeo.navLabel, href: path("localSeo", lang) },
    { label: c.services.gbp.navLabel, href: path("gbp", lang) },
    { label: c.services.ads.navLabel, href: path("ads", lang) },
    { label: c.services.video.navLabel, href: path("video", lang) },
  ];
  const company = [
    { label: c.nav.about, href: path("about", lang) },
    { label: c.nav.mizar, href: path("mizar", lang) },
    { label: c.nav.cta, href: path("gbpCheck", lang) },
  ];

  const link =
    "text-sm text-paper/70 transition-colors duration-200 hover:text-paper";

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark name={site.shortName} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {c.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-paper/70">{c.footer.remote}</p>
          </div>

          <div>
            <p className="section-label">{c.footer.servicesTitle}</p>
            <ul className="mt-6 space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">{c.footer.companyTitle}</p>
            <ul className="mt-6 space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {year} {site.name}. {c.footer.rights}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href={path("privacy", lang)} className="transition-colors hover:text-paper">
              {c.footer.privacy}
            </Link>
            <Link href={path("terms", lang)} className="transition-colors hover:text-paper">
              {c.footer.terms}
            </Link>
          </p>
          <p>
            {c.footer.poweredBy}{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/80 underline underline-offset-4 transition-colors hover:text-paper"
            >
              {site.parent.name}
            </a>
          </p>
        </div>
      </div>

      {/* The name at scale, cropped and sunk into the background */}
      <div aria-hidden="true" className="pointer-events-none select-none px-6 md:px-12">
        <p
          className="translate-y-[18%] whitespace-nowrap bg-clip-text text-center font-display text-[clamp(4rem,19vw,22rem)] font-medium italic leading-none tracking-[-0.055em] text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(245,248,255,0.05) 0%, rgba(245,248,255,0.05) 22%, rgba(255,211,122,0.22) 55%, rgba(255,211,122,0.42) 82%)",
          }}
        >
          {site.shortName}
        </p>
      </div>
    </footer>
  );
}
