import type { Metadata } from "next";
import { copy } from "@/data/copy";
import { gbpText } from "@/data/gbp-text";
import {
  path,
  type Lang,
  type RouteKey,
} from "@/data/i18n";
import { pageMetadata } from "@/lib/seo";

/* Metadata for each route, built from the copy so EN and ES stay paired */

function texts(key: RouteKey, lang: Lang): { title: string; description: string } {
  const c = copy[lang];
  switch (key) {
    case "home":
      return { title: c.home.metaTitle, description: c.home.metaDescription };
    case "websites":
      return {
        title: c.services.websites.metaTitle,
        description: c.services.websites.metaDescription,
      };
    case "localSeo":
      return {
        title: c.services.localSeo.metaTitle,
        description: c.services.localSeo.metaDescription,
      };
    case "gbp":
      return { title: c.services.gbp.metaTitle, description: c.services.gbp.metaDescription };
    case "ads":
      return { title: c.services.ads.metaTitle, description: c.services.ads.metaDescription };
    case "video":
      return {
        title: c.services.video.metaTitle,
        description: c.services.video.metaDescription,
      };
    case "privacy":
      return {
        title: c.legal.privacy.metaTitle,
        description: c.legal.privacy.metaDescription,
      };
    case "terms":
      return { title: c.legal.terms.metaTitle, description: c.legal.terms.metaDescription };
    case "mizar":
      return { title: c.mizar.metaTitle, description: c.mizar.metaDescription };
    case "about":
      return { title: c.about.metaTitle, description: c.about.metaDescription };
    case "contact":
      return { title: c.contact.metaTitle, description: c.contact.metaDescription };
    case "gbpCheck":
      return { title: gbpText[lang].meta.title, description: gbpText[lang].meta.description };
  }
}

export function metaFor(key: RouteKey, lang: Lang): Metadata {
  const t = texts(key, lang);
  return pageMetadata({
    lang,
    enPath: path(key, "en"),
    esPath: path(key, "es"),
    ...t,
  });
}
