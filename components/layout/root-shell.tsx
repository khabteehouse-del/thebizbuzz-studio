import type { ReactNode } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { OffscreenPause } from "@/components/shared/offscreen-pause";
import { Grain } from "@/components/shared/grain";
import { Cursor } from "@/components/shared/cursor";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";
import { site } from "@/data/site";
import { sans } from "@/lib/fonts";

/*
  The whole page frame for one language, same stack as BizBuzz: smooth
  scroll, grain, custom cursor, fixed header, footer. Each language group
  has its own root layout so the html lang attribute is right from the
  first byte.
*/

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const c = copy[lang];

  const links = [
    { label: c.nav.websites, href: path("websites", lang) },
    { label: c.nav.localSeo, href: path("localSeo", lang) },
    { label: c.nav.gbp, href: path("gbp", lang) },
    { label: c.nav.mizar, href: path("mizar", lang) },
    { label: c.nav.about, href: path("about", lang) },
  ];

  return (
    <html lang={c.htmlLang} className={sans.variable}>
      <body className="min-h-dvh bg-ink text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[3px] focus:bg-accent focus:px-4 focus:py-2 focus:text-paper"
        >
          {lang === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <SmoothScroll />
        <OffscreenPause />
        <Grain />
        <Cursor />
        <Nav
          lang={lang}
          brand={site.shortName}
          homeHref={path("home", lang)}
          homeLabel={c.nav.home}
          links={links}
          cta={{ label: c.nav.cta, href: path("gbpCheck", lang) }}
          switchLabel={c.nav.switchLabel}
          switchAria={c.nav.switchAria}
          menuOpen={c.nav.menuOpen}
          menuClose={c.nav.menuClose}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
