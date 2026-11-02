import type { MetadataRoute } from "next";
import { allPairs } from "@/data/i18n";
import { site } from "@/data/site";

/* Empty while the site is a noindex preview */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return allPairs().flatMap((pair) => [
    {
      url: `${site.url}${pair.en === "/" ? "" : pair.en}`,
      alternates: {
        languages: { en: `${site.url}${pair.en}`, es: `${site.url}${pair.es}` },
      },
    },
    { url: `${site.url}${pair.es}` },
  ]);
}
