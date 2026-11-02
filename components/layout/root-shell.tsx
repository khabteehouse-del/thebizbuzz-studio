import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";
import { site } from "@/data/site";
import { display, sans } from "@/lib/fonts";

/*
  The whole page frame for one language. Each language group has its own
  root layout (so the html lang attribute is right from the first byte),
  and both just hand over to this.
*/

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const c = copy[lang];

  const links = [
    { label: c.nav.websites, href: path("websites", lang) },
    { label: c.nav.localSeo, href: path("localSeo", lang) },
    { label: c.nav.gbp, href: path("gbp", lang) },
    { label: c.nav.industries, href: path("industries", lang) },
    { label: c.nav.mizar, href: path("mizar", lang) },
    { label: c.nav.about, href: path("about", lang) },
  ];

  return (
    <html lang={c.htmlLang} className={`${display.variable} ${sans.variable}`}>
      <body className="bg-canvas font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border-2 focus:border-ink focus:bg-sun focus:px-4 focus:py-2 focus:font-bold"
        >
          {lang === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <SiteHeader
          lang={lang}
          brandMain={site.shortName}
          brandRest={lang === "en" ? "Your Revenue" : "Sus Ingresos"}
          homeHref={path("home", lang)}
          homeLabel={c.nav.home}
          links={links}
          cta={{ label: c.nav.cta, href: path("contact", lang) }}
          switchLabel={c.nav.switchLabel}
          switchAria={c.nav.switchAria}
          menuOpen={c.nav.menuOpen}
          menuClose={c.nav.menuClose}
        />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
