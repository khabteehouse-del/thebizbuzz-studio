/*
  Languages and routes.

  English lives at the root (/). Spanish lives under /es with Spanish URL
  words, so each language reads naturally in search results. Every English
  page has exactly one Spanish twin, and the language switch uses this table
  to jump between them.
*/

export type Lang = "en" | "es";

export const langs: Lang[] = ["en", "es"];

export type RouteKey =
  | "home"
  | "websites"
  | "localSeo"
  | "gbp"
  | "mizar"
  | "about"
  | "contact"
  | "ads"
  | "video"
  | "privacy"
  | "terms"
  | "gbpCheck";

export const routes: Record<RouteKey, Record<Lang, string>> = {
  home: { en: "/", es: "/es" },
  websites: { en: "/website-development", es: "/es/desarrollo-web" },
  localSeo: { en: "/local-seo", es: "/es/seo-local" },
  gbp: {
    en: "/google-business-profile",
    es: "/es/perfil-de-negocio-de-google",
  },
  ads: { en: "/ad-campaigns", es: "/es/campanas-publicitarias" },
  video: { en: "/video-and-ugc-ads", es: "/es/video-y-anuncios-ugc" },
  mizar: { en: "/mizar", es: "/es/mizar" },
  about: { en: "/about", es: "/es/nosotros" },
  contact: { en: "/contact", es: "/es/contacto" },
  privacy: { en: "/privacy", es: "/es/privacidad" },
  terms: { en: "/terms", es: "/es/terminos" },
  gbpCheck: {
    en: "/tools/gbp-check",
    es: "/es/herramientas/perfil-de-google",
  },
};

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/* Every English and Spanish path pair, for the language switch and sitemap */
export function allPairs(): { en: string; es: string }[] {
  const pairs: { en: string; es: string }[] = [];
  const keys = Object.keys(routes) as RouteKey[];
  for (const key of keys) {
    pairs.push({ en: routes[key].en, es: routes[key].es });
  }
  return pairs;
}

export function langOfPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/* The same page in the other language. Falls back to that language's home. */
export function alternatePath(pathname: string, to: Lang): string {
  const clean =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  for (const pair of allPairs()) {
    if (pair.en === clean || pair.es === clean) return pair[to];
  }
  return routes.home[to];
}
