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
  | "industries"
  | "mizar"
  | "about"
  | "contact"
  | "gbpCheck";

export const routes: Record<RouteKey, Record<Lang, string>> = {
  home: { en: "/", es: "/es" },
  websites: { en: "/website-development", es: "/es/desarrollo-web" },
  localSeo: { en: "/local-seo", es: "/es/seo-local" },
  gbp: {
    en: "/google-business-profile",
    es: "/es/perfil-de-negocio-de-google",
  },
  industries: { en: "/industries", es: "/es/industrias" },
  mizar: { en: "/mizar", es: "/es/mizar" },
  about: { en: "/about", es: "/es/nosotros" },
  contact: { en: "/contact", es: "/es/contacto" },
  gbpCheck: {
    en: "/tools/gbp-check",
    es: "/es/herramientas/perfil-de-google",
  },
};

export const industryKeys = [
  "house-painters",
  "mobile-beauty",
  "cleaning-companies",
  "contractors",
  "mobile-pet-services",
] as const;

export type IndustryKey = (typeof industryKeys)[number];

/* The last path segment of each industry page, per language */
export const industrySlug: Record<IndustryKey, Record<Lang, string>> = {
  "house-painters": { en: "house-painters", es: "pintores" },
  "mobile-beauty": { en: "mobile-beauty", es: "belleza-movil" },
  "cleaning-companies": { en: "cleaning-companies", es: "empresas-de-limpieza" },
  contractors: { en: "contractors", es: "contratistas" },
  "mobile-pet-services": { en: "mobile-pet-services", es: "mascotas-moviles" },
};

export function industryPath(key: IndustryKey, lang: Lang): string {
  return `${routes.industries[lang]}/${industrySlug[key][lang]}`;
}

export function industryFromSlug(slug: string, lang: Lang): IndustryKey | null {
  for (const key of industryKeys) {
    if (industrySlug[key][lang] === slug) return key;
  }
  return null;
}

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
  for (const key of industryKeys) {
    pairs.push({ en: industryPath(key, "en"), es: industryPath(key, "es") });
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
