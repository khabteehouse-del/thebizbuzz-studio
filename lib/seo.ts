import type { Metadata } from "next";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

/* Defaults applied to every page of one language */
export function layoutMetadata(lang: Lang): Metadata {
  const c = copy[lang];
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: { default: site.name, template: `%s | ${site.name}` },
    description: c.home.metaDescription,
    /* See site.indexable: previews must not be indexed */
    robots: site.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      siteName: site.name,
      locale: c.locale,
      type: "website",
    },
  };
}

type PageMeta = {
  lang: Lang;
  enPath: string;
  esPath: string;
  title: string;
  description: string;
};

/* Per-page title, description and the English/Spanish pairing for Google */
export function pageMetadata(meta: PageMeta): Metadata {
  const current = meta.lang === "en" ? meta.enPath : meta.esPath;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: current,
      languages: {
        en: meta.enPath,
        es: meta.esPath,
        "x-default": meta.enPath,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: current,
      locale: copy[meta.lang].locale,
    },
  };
}
